const ORIGIN = new URL('https://sapala67.pages.dev');
const FORWARDED_HEADERS = ['accept', 'accept-language', 'if-modified-since', 'if-none-match', 'range'];

export default {
	async fetch(request: Request): Promise<Response> {
		if (!['GET', 'HEAD'].includes(request.method)) {
			return new Response('Mirror ini hanya untuk membaca situs publik.', {
				status: 405,
				headers: { Allow: 'GET, HEAD' }
			});
		}

		const mirrorUrl = new URL(request.url);
		const requestedPath = mirrorUrl.searchParams.get('path') || '/';
		const upstreamUrl = new URL(requestedPath, ORIGIN);

		if (upstreamUrl.origin !== ORIGIN.origin) {
			return new Response('Path tidak valid.', { status: 400 });
		}

		for (const [key, value] of mirrorUrl.searchParams) {
			if (key !== 'path') upstreamUrl.searchParams.append(key, value);
		}

		const headers = new Headers();
		for (const name of FORWARDED_HEADERS) {
			const value = request.headers.get(name);
			if (value) headers.set(name, value);
		}

		const upstream = await fetch(upstreamUrl, {
			method: request.method,
			headers,
			redirect: 'manual'
		});
		const responseHeaders = new Headers(upstream.headers);
		responseHeaders.delete('set-cookie');
		responseHeaders.delete('server');
		responseHeaders.set('x-robots-tag', 'noindex, nofollow');

		const location = responseHeaders.get('location');
		if (location) {
			const target = new URL(location, ORIGIN);
			if (target.origin === ORIGIN.origin) {
				responseHeaders.set('location', `${mirrorUrl.origin}${target.pathname}${target.search}${target.hash}`);
			}
		}

		return new Response(request.method === 'HEAD' ? null : upstream.body, {
			status: upstream.status,
			headers: responseHeaders
		});
	}
};
