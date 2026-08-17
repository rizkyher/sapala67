import { error, fail, redirect } from '@sveltejs/kit';
import { getDB } from '$lib/server/platform';
import { getArticleById, getArticle, updateArticle, deleteArticle } from '$lib/server/db';
import { parseArticle } from '$lib/server/forms';
import { uploadImage } from '$lib/server/upload';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, platform }) => {
	const article = await getArticleById(getDB(platform), Number(params.id));
	if (!article) throw error(404, 'Artikel tidak ditemukan');
	return { article };
};

export const actions: Actions = {
	update: async ({ request, params, platform }) => {
		const form = await request.formData();
		const data = parseArticle(form);
		const uploadedImage = await uploadImage(platform, form.get('upload'));
		if (uploadedImage) data.image = uploadedImage;
		if (!data.title) return fail(400, { error: 'Judul wajib diisi.', values: data });
		const db = getDB(platform);
		const existing = await getArticle(db, data.slug!);
		if (existing && existing.id !== Number(params.id)) return fail(400, { error: 'Slug sudah dipakai.', values: data });
		await updateArticle(db, Number(params.id), data);
		throw redirect(303, '/admin/articles');
	},
	delete: async ({ params, platform }) => {
		await deleteArticle(getDB(platform), Number(params.id));
		throw redirect(303, '/admin/articles');
	}
};
