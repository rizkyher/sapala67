import { siteData } from '$lib/data/site';
import { getDB } from '$lib/server/platform';
import { listArticles, listEvents } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform }) => {
	const base = siteData.url;
	const today = new Date().toISOString().split('T')[0];

	let dynamic: { loc: string; priority: string; changefreq: string }[] = [];
	try {
		const db = getDB(platform);
		const [articles, events] = await Promise.all([listArticles(db, true), listEvents(db, true)]);
		dynamic = [
			...articles.map((a) => ({ loc: `${base}/artikel/${a.slug}`, priority: '0.7', changefreq: 'monthly' })),
			...events.map((e) => ({ loc: `${base}/event/${e.slug}`, priority: '0.6', changefreq: 'monthly' }))
		];
	} catch {
		dynamic = [];
	}

	const urls = [
		{ loc: base, priority: '1.0', changefreq: 'weekly' },
		{ loc: `${base}/tentang`, priority: '0.9', changefreq: 'monthly' },
		{ loc: `${base}/kegiatan`, priority: '0.9', changefreq: 'weekly' },
		{ loc: `${base}/goal`, priority: '0.8', changefreq: 'monthly' },
		...dynamic
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) => `	<url>
		<loc>${u.loc}</loc>
		<lastmod>${today}</lastmod>
		<changefreq>${u.changefreq}</changefreq>
		<priority>${u.priority}</priority>
	</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'max-age=0, s-maxage=3600' }
	});
};
