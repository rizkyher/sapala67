import { slugify } from '$lib/utils/slug';
import type { Article, EventItem } from './db';

export function parseArticle(fd: FormData): Partial<Article> {
	const title = String(fd.get('title') ?? '').trim();
	return {
		title,
		slug: String(fd.get('slug') ?? '').trim() || slugify(title),
		category: String(fd.get('category') ?? '').trim() || 'Umum',
		author: String(fd.get('author') ?? '').trim() || 'Tim Redaksi',
		date: String(fd.get('date') ?? '').trim() || new Date().toISOString().slice(0, 10),
		read_time: String(fd.get('read_time') ?? '').trim() || '5 menit',
		image: String(fd.get('image') ?? '').trim(),
		excerpt: String(fd.get('excerpt') ?? '').trim(),
		content: String(fd.get('content') ?? '').trim(),
		published: fd.get('published') ? 1 : 0
	};
}

export function parseEvent(fd: FormData): Partial<EventItem> {
	const title = String(fd.get('title') ?? '').trim();
	return {
		title,
		slug: String(fd.get('slug') ?? '').trim() || slugify(title),
		category: String(fd.get('category') ?? '').trim() || 'Kegiatan',
		description: String(fd.get('description') ?? '').trim(),
		content: String(fd.get('content') ?? '').trim(),
		image: String(fd.get('image') ?? '').trim(),
		location: String(fd.get('location') ?? '').trim(),
		start_date: String(fd.get('start_date') ?? '').trim() || new Date().toISOString().slice(0, 10),
		end_date: String(fd.get('end_date') ?? '').trim(),
		published: fd.get('published') ? 1 : 0
	};
}
