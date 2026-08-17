import { deleteMessage, listMessages, markMessageRead } from '$lib/server/db';
import { getDB } from '$lib/server/platform';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => ({ messages: await listMessages(getDB(platform)) });

export const actions: Actions = {
	read: async ({ request, platform }) => {
		const id = Number((await request.formData()).get('id'));
		if (id) await markMessageRead(getDB(platform), id);
		return { read: true };
	},
	delete: async ({ request, platform }) => {
		const id = Number((await request.formData()).get('id'));
		if (id) await deleteMessage(getDB(platform), id);
		return { deleted: true };
	}
};
