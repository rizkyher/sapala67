import type { D1Database, R2Bucket } from '@cloudflare/workers-types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: { id: number; username: string; name: string } | null;
		}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				DB: D1Database;
				MEDIA: R2Bucket;
			};
			cf?: CfProperties;
			ctx?: ExecutionContext;
		}
	}
}

export {};
