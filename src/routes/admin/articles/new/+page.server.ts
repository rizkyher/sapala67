import { fail, redirect } from '@sveltejs/kit';
import { getDB } from '$lib/server/platform';
import { createArticle, getArticle } from '$lib/server/db';
import { parseArticle } from '$lib/server/forms';
import { uploadImage } from '$lib/server/upload';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, platform }) => {
		const form = await request.formData();
		const data = parseArticle(form);
		if (!data.title) return fail(400, { error: 'Judul wajib diisi.', values: data });
		const db = getDB(platform);
		const uploadedImage = await uploadImage(platform, form.get('upload'));
		if (uploadedImage) data.image = uploadedImage;
		if (await getArticle(db, data.slug!)) return fail(400, { error: 'Slug sudah dipakai, ganti judul/slug.', values: data });
		await createArticle(db, data);
		throw redirect(303, '/admin/articles');
	}
};
