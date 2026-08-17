import { error } from '@sveltejs/kit';
import { getDB } from '$lib/server/platform';
import { getEvent } from '$lib/server/db';
import { siteData } from '$lib/data/site';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, platform }) => {
	const db = getDB(platform);
	const event = await getEvent(db, params.slug);
	if (!event || !event.published) throw error(404, 'Agenda tidak ditemukan');

	const content = event.content.split(/\n{2,}/).filter(Boolean);
	return { event, content, siteUrl: siteData.url };
};
