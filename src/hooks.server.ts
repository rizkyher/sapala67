import type { Handle } from '@sveltejs/kit';
import { validateSession, SESSION_COOKIE } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = null;

	const db = event.platform?.env?.DB;
	const sessionId = event.cookies.get(SESSION_COOKIE);

	if (db && sessionId) {
		try {
			event.locals.user = await validateSession(db, sessionId);
		} catch {
			event.locals.user = null;
		}
	}

	return resolve(event);
};
