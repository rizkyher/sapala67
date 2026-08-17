import { getDB } from '$lib/server/platform';
import { listArticles, deleteArticle } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	return { articles: await listArticles(getDB(platform)) };
};

export const actions: Actions = {
	delete: async ({ request, platform }) => {
		const fd = await request.formData();
		const id = Number(fd.get('id'));
		if (id) await deleteArticle(getDB(platform), id);
		return { deleted: true };
	}
};
