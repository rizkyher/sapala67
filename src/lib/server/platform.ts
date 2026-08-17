import { error } from '@sveltejs/kit';
import type { D1Database } from '@cloudflare/workers-types';

/** Resolve the D1 binding, with a clear message when running without the CF runtime. */
export function getDB(platform: App.Platform | undefined): D1Database {
	const db = platform?.env?.DB;
	if (!db) {
		throw error(
			503,
			'Database tidak tersedia. Jalankan dengan binding D1 (npm run dev memakai platformProxy, atau npm run cf:dev).'
		);
	}
	return db;
}
