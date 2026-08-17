import { fail } from '@sveltejs/kit';
import { createGalleryItem, deleteGalleryItem, listGallery } from '$lib/server/db';
import { getDB } from '$lib/server/platform';
import { uploadImage } from '$lib/server/upload';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => ({ gallery: await listGallery(getDB(platform)) });

export const actions: Actions = {
	create: async ({ request, platform }) => {
		const form = await request.formData();
		const uploadedImage = await uploadImage(platform, form.get('upload'));
		const src = uploadedImage ?? String(form.get('src') ?? '').trim();
		if (!src) return fail(400, { error: 'URL gambar wajib diisi.' });
		await createGalleryItem(getDB(platform), {
			src,
			alt: String(form.get('alt') ?? '').trim(),
			category: String(form.get('category') ?? 'Umum').trim(),
			span: String(form.get('span') ?? 'col-span-1 row-span-1'),
			sort: Number(form.get('sort') ?? 0)
		});
		return { created: true };
	},
	delete: async ({ request, platform }) => {
		const id = Number((await request.formData()).get('id'));
		if (id) await deleteGalleryItem(getDB(platform), id);
		return { deleted: true };
	}
};
