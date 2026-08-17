import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { getDB } from '$lib/server/platform';
import { listArticles, listGallery, listEvents, createMessage } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDB(platform);
	const [articles, gallery, events] = await Promise.all([
		listArticles(db, true),
		listGallery(db),
		listEvents(db, true)
	]);
	return { articles, gallery, events };
};

const contactSchema = z.object({
	name: z.string().min(2, 'Nama minimal 2 karakter'),
	email: z.string().email('Format email tidak valid'),
	message: z.string().min(10, 'Pesan minimal 10 karakter')
});

export const actions: Actions = {
	contact: async ({ request, platform }) => {
		const form = await request.formData();
		const values = {
			name: String(form.get('name') ?? ''),
			email: String(form.get('email') ?? ''),
			message: String(form.get('message') ?? '')
		};

		const parsed = contactSchema.safeParse(values);
		if (!parsed.success) {
			const fe = parsed.error.flatten().fieldErrors;
			return fail(400, {
				contact: {
					values,
					errors: {
						name: fe.name?.[0],
						email: fe.email?.[0],
						message: fe.message?.[0]
					}
				}
			});
		}

		try {
			const db = getDB(platform);
			await createMessage(db, parsed.data);
		} catch {
			return fail(500, { contact: { values, errors: { message: 'Gagal mengirim. Coba lagi.' } } });
		}

		return { contact: { success: true } };
	}
};
