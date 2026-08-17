import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		prerender: {
			// Placeholder photos under /images/* are supplied later by the editors;
			// don't fail the build while they're still missing.
			handleHttpError: ({ path, message }) => {
				if (path.startsWith('/images/')) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
