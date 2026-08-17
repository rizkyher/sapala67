import { fail, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { getDB } from '$lib/server/platform';
import { countUsers, createUser, getUserByUsername } from '$lib/server/db';
import { hashPassword, createSession, SESSION_COOKIE } from '$lib/server/auth';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, platform, cookies }) => {
		const db = getDB(platform);
		if ((await countUsers(db)) > 0) throw redirect(303, '/admin/login');

		const fd = await request.formData();
		const name = String(fd.get('name') ?? '').trim() || 'Admin SAPALA 67';
		const username = String(fd.get('username') ?? '').trim().toLowerCase();
		const password = String(fd.get('password') ?? '');
		const confirm = String(fd.get('confirm') ?? '');

		if (!username.includes('@')) return fail(400, { error: 'Gunakan alamat email yang valid.', name, username });
		if (password.length < 8) return fail(400, { error: 'Password minimal 8 karakter.', name, username });
		if (password !== confirm) return fail(400, { error: 'Konfirmasi password tidak cocok.', name, username });

		await createUser(db, username, await hashPassword(password), name);
		const user = await getUserByUsername(db, username);
		const { id, expires } = await createSession(db, user!.id);
		cookies.set(SESSION_COOKIE, id, { path: '/', httpOnly: true, sameSite: 'lax', secure: !dev, expires });
		throw redirect(303, '/admin');
	}
};
