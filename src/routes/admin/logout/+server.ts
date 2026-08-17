import { redirect } from '@sveltejs/kit';
import { deleteSession, SESSION_COOKIE } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies, platform }) => {
	const sid = cookies.get(SESSION_COOKIE);
	if (sid && platform?.env?.DB) await deleteSession(platform.env.DB, sid);
	cookies.delete(SESSION_COOKIE, { path: '/' });
	throw redirect(303, '/admin/login');
};
