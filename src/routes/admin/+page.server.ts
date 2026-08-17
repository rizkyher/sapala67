import { getDB } from '$lib/server/platform';
import { listArticles, listGallery, listEvents, listMessages } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDB(platform);
	const [articles, gallery, events, messages] = await Promise.all([
		listArticles(db),
		listGallery(db),
		listEvents(db),
		listMessages(db)
	]);
	return {
		counts: {
			articles: articles.length,
			gallery: gallery.length,
			events: events.length,
			messages: messages.length,
			unread: messages.filter((m) => !m.is_read).length
		},
		recentMessages: messages.slice(0, 5)
	};
};
