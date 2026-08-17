import { redirect } from '@sveltejs/kit';
import { getDB } from '$lib/server/platform';
import { countUsers, unreadMessageCount } from '$lib/server/db';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url, platform }) => {
	const db = getDB(platform);
	const userCount = await countUsers(db);
	const path = url.pathname;

	// First-run: force creating the first admin account.
	if (userCount === 0 && path !== '/admin/setup') throw redirect(303, '/admin/setup');
	if (userCount > 0 && path === '/admin/setup') throw redirect(303, '/admin/login');

	const publicPaths = ['/admin/login', '/admin/setup'];
	if (!locals.user && !publicPaths.includes(path)) throw redirect(303, '/admin/login');
	if (locals.user && path === '/admin/login') throw redirect(303, '/admin');

	const unread = locals.user ? await unreadMessageCount(db) : 0;
	return { user: locals.user, unread };
};
