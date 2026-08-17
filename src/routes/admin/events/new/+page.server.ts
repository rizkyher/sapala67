import { fail, redirect } from '@sveltejs/kit';
import { getDB } from '$lib/server/platform';
import { createEvent, getEvent } from '$lib/server/db';
import { parseEvent } from '$lib/server/forms';
import { uploadImage } from '$lib/server/upload';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, platform }) => {
		const form = await request.formData();
		const data = parseEvent(form);
		if (!data.title) return fail(400, { error: 'Judul wajib diisi.', values: data });
		const db = getDB(platform);
		const uploadedImage = await uploadImage(platform, form.get('upload'));
		if (uploadedImage) data.image = uploadedImage;
		if (await getEvent(db, data.slug!)) return fail(400, { error: 'Slug sudah dipakai.', values: data });
		await createEvent(db, data);
		throw redirect(303, '/admin/events');
	}
};
