// Password hashing (PBKDF2 via WebCrypto — works on the Workers runtime) and
// session helpers for the SAPALA 67 admin CMS.
import type { D1Database } from '@cloudflare/workers-types';

const ITERATIONS = 100_000;
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function toB64(buf: ArrayBuffer): string {
	return btoa(String.fromCharCode(...new Uint8Array(buf)));
}
function fromB64(b64: string): Uint8Array {
	return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

async function derive(password: string, salt: Uint8Array): Promise<string> {
	const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, [
		'deriveBits'
	]);
	const bits = await crypto.subtle.deriveBits(
		{ name: 'PBKDF2', salt: salt as unknown as BufferSource, iterations: ITERATIONS, hash: 'SHA-256' },
		key,
		256
	);
	return toB64(bits);
}

export async function hashPassword(password: string): Promise<string> {
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const hash = await derive(password, salt);
	return `pbkdf2$${ITERATIONS}$${toB64(salt.buffer)}$${hash}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
	const parts = stored.split('$');
	if (parts.length !== 4) return false;
	const [, , saltB64, hashB64] = parts;
	const salt = fromB64(saltB64);
	const candidate = await derive(password, salt);
	// constant-time-ish compare
	if (candidate.length !== hashB64.length) return false;
	let diff = 0;
	for (let i = 0; i < candidate.length; i++) diff |= candidate.charCodeAt(i) ^ hashB64.charCodeAt(i);
	return diff === 0;
}

export function generateSessionId(): string {
	const bytes = crypto.getRandomValues(new Uint8Array(32));
	return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export type SessionUser = { id: number; username: string; name: string };

export async function createSession(db: D1Database, userId: number): Promise<{ id: string; expires: Date }> {
	const id = generateSessionId();
	const expires = new Date(Date.now() + SESSION_TTL_MS);
	await db
		.prepare('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)')
		.bind(id, userId, expires.getTime())
		.run();
	return { id, expires };
}

export async function validateSession(db: D1Database, sessionId: string): Promise<SessionUser | null> {
	const row = await db
		.prepare(
			`SELECT s.expires_at AS expires_at, u.id AS id, u.username AS username, u.name AS name
			 FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.id = ?`
		)
		.bind(sessionId)
		.first<{ expires_at: number; id: number; username: string; name: string }>();

	if (!row) return null;
	if (row.expires_at < Date.now()) {
		await deleteSession(db, sessionId);
		return null;
	}
	return { id: row.id, username: row.username, name: row.name };
}

export async function deleteSession(db: D1Database, sessionId: string): Promise<void> {
	await db.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run();
}

export const SESSION_COOKIE = 'sapala_session';
