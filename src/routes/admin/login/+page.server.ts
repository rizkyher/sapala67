import { fail, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { getDB } from '$lib/server/platform';
import { getUserByUsername } from '$lib/server/db';
import { verifyPassword, createSession, SESSION_COOKIE } from '$lib/server/auth';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, platform, cookies }) => {
		const fd = await request.formData();
		const username = String(fd.get('username') ?? '').trim().toLowerCase();
		const password = String(fd.get('password') ?? '');

		if (!username || !password) return fail(400, { error: 'Lengkapi username dan password.', username });

		const db = getDB(platform);
		const user = await getUserByUsername(db, username);
		if (!user || !(await verifyPassword(password, user.password_hash))) {
			return fail(400, { error: 'Username atau password salah.', username });
		}

		const { id, expires } = await createSession(db, user.id);
		cookies.set(SESSION_COOKIE, id, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: !dev,
			expires
		});
		throw redirect(303, '/admin');
	}
};
