<script lang="ts">
	import { Save } from 'lucide-svelte';
	import type { Article } from '$lib/server/db';

	let {
		values = {},
		error = '',
		submitLabel = 'Simpan',
		action = ''
	}: { values?: Partial<Article>; error?: string; submitLabel?: string; action?: string } = $props();

	const input =
		'min-h-12 w-full rounded-xl border border-sapala-ink/15 px-3 py-2.5 text-base text-sapala-ink focus:border-sapala-primary focus:outline-none focus:ring-2 focus:ring-sapala-primary/20 sm:text-sm';
	const label = 'mb-1.5 block text-sm font-medium text-sapala-ink/70';
</script>

<form method="POST" enctype="multipart/form-data" {action} class="space-y-5 rounded-2xl border border-sapala-ink/10 bg-white p-4 shadow-card sm:p-6">
	{#if error}
		<p class="rounded-lg border border-sapala-red/30 bg-sapala-red/10 px-3 py-2 text-sm text-sapala-red">{error}</p>
	{/if}

	<div>
		<label class={label} for="title">Judul</label>
		<input id="title" name="title" value={values.title ?? ''} required class={input} />
	</div>

	<div class="grid gap-4 sm:grid-cols-2">
		<div>
			<label class={label} for="slug">Slug <span class="font-normal text-sapala-ink/40">(opsional, otomatis dari judul)</span></label>
			<input id="slug" name="slug" value={values.slug ?? ''} placeholder="otomatis-dari-judul" class={input} />
		</div>
		<div>
			<label class={label} for="category">Kategori</label>
			<input id="category" name="category" value={values.category ?? ''} placeholder="Tips & Trik" class={input} />
		</div>
	</div>

	<div class="grid gap-4 sm:grid-cols-3">
		<div>
			<label class={label} for="author">Penulis</label>
			<input id="author" name="author" value={values.author ?? ''} class={input} />
		</div>
		<div>
			<label class={label} for="date">Tanggal</label>
			<input id="date" name="date" type="date" value={values.date ?? ''} class={input} />
		</div>
		<div>
			<label class={label} for="read_time">Waktu Baca</label>
			<input id="read_time" name="read_time" value={values.read_time ?? ''} placeholder="5 menit" class={input} />
		</div>
	</div>

	<div>
		<label class={label} for="upload">Upload gambar sampul</label>
		<input id="upload" name="upload" type="file" accept="image/jpeg,image/png,image/webp" class="block min-h-12 w-full text-sm text-sapala-ink file:mr-3 file:rounded-lg file:border-0 file:bg-sapala-primary file:px-3 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-sapala-deep" />
		<p class="mt-1.5 text-xs text-sapala-ink/50">JPG, PNG, atau WebP · maksimal 8 MB. Upload akan menggantikan URL di bawah ini.</p>
	</div>
	<div>
		<label class={label} for="image">URL gambar <span class="font-normal text-sapala-ink/40">(opsional)</span></label>
		<input id="image" name="image" value={values.image ?? ''} placeholder="Gunakan bila foto sudah tersedia online" class={input} />
	</div>

	<div>
		<label class={label} for="excerpt">Ringkasan</label>
		<textarea id="excerpt" name="excerpt" rows="2" class="{input} resize-none">{values.excerpt ?? ''}</textarea>
	</div>

	<div>
		<label class={label} for="content">Isi Artikel <span class="font-normal text-sapala-ink/40">(pisahkan paragraf dengan baris kosong)</span></label>
		<textarea id="content" name="content" rows="10" class="{input} resize-y font-body">{values.content ?? ''}</textarea>
	</div>

	<label class="flex items-center gap-2 text-sm text-sapala-ink/80">
		<input type="checkbox" name="published" value="1" checked={values.published === undefined ? true : !!values.published} class="h-4 w-4 rounded border-sapala-ink/30 text-sapala-primary" />
		Terbitkan (tampil di situs)
	</label>

	<div class="flex flex-col gap-2 pt-2 sm:flex-row sm:gap-3">
		<button class="btn-primary justify-center text-sm"><Save class="h-4 w-4" /> {submitLabel}</button>
		<a href="/admin/articles" class="btn-outline justify-center text-sm">Batal</a>
	</div>
</form>
