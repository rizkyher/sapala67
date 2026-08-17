import { getDB } from '$lib/server/platform';
import { listGallery, listEvents } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDB(platform);
	const [gallery, events] = await Promise.all([listGallery(db), listEvents(db, true)]);
	return { gallery, events };
};
