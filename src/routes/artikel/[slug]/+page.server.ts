import { error } from '@sveltejs/kit';
import { getDB } from '$lib/server/platform';
import { getArticle, relatedArticles } from '$lib/server/db';
import { siteData } from '$lib/data/site';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, platform }) => {
	const db = getDB(platform);
	const article = await getArticle(db, params.slug);
	if (!article || !article.published) throw error(404, 'Artikel tidak ditemukan');

	const related = await relatedArticles(db, article, 3);
	const content = article.content.split(/\n{2,}/).filter(Boolean);

	return { article, related, content, siteUrl: siteData.url };
};
