// D1 data-access layer for SAPALA 67.
import type { D1Database } from '@cloudflare/workers-types';

export type Article = {
	id: number;
	slug: string;
	title: string;
	category: string;
	excerpt: string;
	content: string;
	author: string;
	image: string;
	read_time: string;
	date: string;
	published: number;
	created_at: string;
};

export type GalleryItem = {
	id: number;
	src: string;
	alt: string;
	category: string;
	span: string;
	sort: number;
};

export type EventItem = {
	id: number;
	slug: string;
	title: string;
	category: string;
	description: string;
	content: string;
	image: string;
	location: string;
	start_date: string;
	end_date: string;
	published: number;
	created_at: string;
};

export type Message = {
	id: number;
	name: string;
	email: string;
	message: string;
	is_read: number;
	created_at: string;
};

/* ---------------- Articles ---------------- */
export async function listArticles(db: D1Database, publishedOnly = false): Promise<Article[]> {
	const where = publishedOnly ? 'WHERE published = 1' : '';
	const { results } = await db
		.prepare(`SELECT * FROM articles ${where} ORDER BY date DESC, id DESC`)
		.all<Article>();
	return results ?? [];
}

export async function getArticle(db: D1Database, slug: string): Promise<Article | null> {
	return (await db.prepare('SELECT * FROM articles WHERE slug = ?').bind(slug).first<Article>()) ?? null;
}

export async function getArticleById(db: D1Database, id: number): Promise<Article | null> {
	return (await db.prepare('SELECT * FROM articles WHERE id = ?').bind(id).first<Article>()) ?? null;
}

export async function relatedArticles(db: D1Database, article: Article, limit = 3): Promise<Article[]> {
	const { results } = await db
		.prepare(
			`SELECT * FROM articles WHERE published = 1 AND slug != ?
			 ORDER BY (category = ?) DESC, date DESC LIMIT ?`
		)
		.bind(article.slug, article.category, limit)
		.all<Article>();
	return results ?? [];
}

export async function createArticle(db: D1Database, a: Partial<Article>): Promise<void> {
	await db
		.prepare(
			`INSERT INTO articles (slug, title, category, excerpt, content, author, image, read_time, date, published)
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
		)
		.bind(
			a.slug,
			a.title,
			a.category,
			a.excerpt ?? '',
			a.content ?? '',
			a.author ?? 'Tim Redaksi',
			a.image ?? '',
			a.read_time ?? '5 menit',
			a.date ?? new Date().toISOString().slice(0, 10),
			a.published ?? 1
		)
		.run();
}

export async function updateArticle(db: D1Database, id: number, a: Partial<Article>): Promise<void> {
	await db
		.prepare(
			`UPDATE articles SET slug=?, title=?, category=?, excerpt=?, content=?, author=?, image=?, read_time=?, date=?, published=? WHERE id=?`
		)
		.bind(
			a.slug,
			a.title,
			a.category,
			a.excerpt ?? '',
			a.content ?? '',
			a.author ?? 'Tim Redaksi',
			a.image ?? '',
			a.read_time ?? '5 menit',
			a.date ?? new Date().toISOString().slice(0, 10),
			a.published ?? 1,
			id
		)
		.run();
}

export async function deleteArticle(db: D1Database, id: number): Promise<void> {
	await db.prepare('DELETE FROM articles WHERE id = ?').bind(id).run();
}

/* ---------------- Gallery ---------------- */
export async function listGallery(db: D1Database): Promise<GalleryItem[]> {
	const { results } = await db.prepare('SELECT * FROM gallery ORDER BY sort ASC, id ASC').all<GalleryItem>();
	return results ?? [];
}

export async function createGalleryItem(db: D1Database, g: Partial<GalleryItem>): Promise<void> {
	await db
		.prepare('INSERT INTO gallery (src, alt, category, span, sort) VALUES (?, ?, ?, ?, ?)')
		.bind(g.src, g.alt ?? '', g.category ?? 'Umum', g.span ?? 'col-span-1 row-span-1', g.sort ?? 0)
		.run();
}

export async function deleteGalleryItem(db: D1Database, id: number): Promise<void> {
	await db.prepare('DELETE FROM gallery WHERE id = ?').bind(id).run();
}

/* ---------------- Events ---------------- */
export async function listEvents(db: D1Database, publishedOnly = false): Promise<EventItem[]> {
	const where = publishedOnly ? 'WHERE published = 1' : '';
	const { results } = await db
		.prepare(`SELECT * FROM events ${where} ORDER BY start_date DESC, id DESC`)
		.all<EventItem>();
	return results ?? [];
}

export async function getEvent(db: D1Database, slug: string): Promise<EventItem | null> {
	return (await db.prepare('SELECT * FROM events WHERE slug = ?').bind(slug).first<EventItem>()) ?? null;
}

export async function getEventById(db: D1Database, id: number): Promise<EventItem | null> {
	return (await db.prepare('SELECT * FROM events WHERE id = ?').bind(id).first<EventItem>()) ?? null;
}

export async function createEvent(db: D1Database, e: Partial<EventItem>): Promise<void> {
	await db
		.prepare(
			`INSERT INTO events (slug, title, category, description, content, image, location, start_date, end_date, published)
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
		)
		.bind(
			e.slug,
			e.title,
			e.category ?? 'Kegiatan',
			e.description ?? '',
			e.content ?? '',
			e.image ?? '',
			e.location ?? '',
			e.start_date ?? new Date().toISOString().slice(0, 10),
			e.end_date ?? '',
			e.published ?? 1
		)
		.run();
}

export async function updateEvent(db: D1Database, id: number, e: Partial<EventItem>): Promise<void> {
	await db
		.prepare(
			`UPDATE events SET slug=?, title=?, category=?, description=?, content=?, image=?, location=?, start_date=?, end_date=?, published=? WHERE id=?`
		)
		.bind(
			e.slug,
			e.title,
			e.category ?? 'Kegiatan',
			e.description ?? '',
			e.content ?? '',
			e.image ?? '',
			e.location ?? '',
			e.start_date ?? new Date().toISOString().slice(0, 10),
			e.end_date ?? '',
			e.published ?? 1,
			id
		)
		.run();
}

export async function deleteEvent(db: D1Database, id: number): Promise<void> {
	await db.prepare('DELETE FROM events WHERE id = ?').bind(id).run();
}

/* ---------------- Messages ---------------- */
export async function createMessage(db: D1Database, m: { name: string; email: string; message: string }): Promise<void> {
	await db
		.prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)')
		.bind(m.name, m.email, m.message)
		.run();
}

export async function listMessages(db: D1Database): Promise<Message[]> {
	const { results } = await db.prepare('SELECT * FROM messages ORDER BY id DESC').all<Message>();
	return results ?? [];
}

export async function unreadMessageCount(db: D1Database): Promise<number> {
	const row = await db.prepare('SELECT COUNT(*) AS c FROM messages WHERE is_read = 0').first<{ c: number }>();
	return row?.c ?? 0;
}

export async function markMessageRead(db: D1Database, id: number): Promise<void> {
	await db.prepare('UPDATE messages SET is_read = 1 WHERE id = ?').bind(id).run();
}

export async function deleteMessage(db: D1Database, id: number): Promise<void> {
	await db.prepare('DELETE FROM messages WHERE id = ?').bind(id).run();
}

/* ---------------- Users ---------------- */
export async function countUsers(db: D1Database): Promise<number> {
	const row = await db.prepare('SELECT COUNT(*) AS c FROM users').first<{ c: number }>();
	return row?.c ?? 0;
}

export async function getUserByUsername(
	db: D1Database,
	username: string
): Promise<{ id: number; username: string; name: string; password_hash: string } | null> {
	return (
		(await db
			.prepare('SELECT id, username, name, password_hash FROM users WHERE username = ?')
			.bind(username)
			.first()) ?? null
	);
}

export async function createUser(
	db: D1Database,
	username: string,
	passwordHash: string,
	name: string
): Promise<void> {
	await db
		.prepare('INSERT INTO users (username, password_hash, name) VALUES (?, ?, ?)')
		.bind(username, passwordHash, name)
		.run();
}
