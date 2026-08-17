import { error, fail, redirect } from '@sveltejs/kit';
import { getDB } from '$lib/server/platform';
import { getEventById, getEvent, updateEvent, deleteEvent } from '$lib/server/db';
import { parseEvent } from '$lib/server/forms';
import { uploadImage } from '$lib/server/upload';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, platform }) => {
	const event = await getEventById(getDB(platform), Number(params.id));
	if (!event) throw error(404, 'Agenda tidak ditemukan');
	return { event };
};

export const actions: Actions = {
	update: async ({ request, params, platform }) => {
		const form = await request.formData();
		const data = parseEvent(form);
		const uploadedImage = await uploadImage(platform, form.get('upload'));
		if (uploadedImage) data.image = uploadedImage;
		if (!data.title) return fail(400, { error: 'Judul wajib diisi.', values: data });
		const db = getDB(platform);
		const existing = await getEvent(db, data.slug!);
		if (existing && existing.id !== Number(params.id)) return fail(400, { error: 'Slug sudah dipakai.', values: data });
		await updateEvent(db, Number(params.id), data);
		throw redirect(303, '/admin/events');
	},
	delete: async ({ params, platform }) => {
		await deleteEvent(getDB(platform), Number(params.id));
		throw redirect(303, '/admin/events');
	}
};
