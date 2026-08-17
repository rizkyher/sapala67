import { error } from '@sveltejs/kit';

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const allowedTypes = new Map([
	['image/jpeg', 'jpg'],
	['image/png', 'png'],
	['image/webp', 'webp']
]);

export async function uploadImage(platform: App.Platform | undefined, file: FormDataEntryValue | null): Promise<string | null> {
	if (!(file instanceof File) || file.size === 0) return null;
	const extension = allowedTypes.get(file.type);
	if (!extension) throw error(400, 'Gunakan gambar JPG, PNG, atau WebP.');
	if (file.size > MAX_IMAGE_SIZE) throw error(400, 'Ukuran gambar maksimal 8 MB.');

	const bucket = platform?.env.MEDIA;
	if (!bucket) throw error(503, 'Penyimpanan foto belum tersedia.');

	const key = `uploads/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;
	await bucket.put(key, await file.arrayBuffer(), {
		httpMetadata: { contentType: file.type, cacheControl: 'public, max-age=31536000, immutable' }
	});
	return `/media/${key}`;
}
