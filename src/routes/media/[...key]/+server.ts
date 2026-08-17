import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, platform }) => {
	const object = await platform?.env.MEDIA?.get(params.key);
	if (!object) throw error(404, 'Foto tidak ditemukan.');
	const headers = new Headers({
		'content-type': object.httpMetadata?.contentType ?? 'application/octet-stream',
		'cache-control': object.httpMetadata?.cacheControl ?? 'public, max-age=31536000, immutable'
	});
	headers.set('etag', object.httpEtag);
	return new Response(object.body as unknown as BodyInit, { headers });
};
