<script lang="ts">
	import { enhance } from '$app/forms';
	import { ImagePlus, Trash2 } from 'lucide-svelte';
	let { data, form } = $props();
	const input = 'mt-1 min-h-11 w-full rounded-lg border border-sapala-ink/15 bg-white px-3 text-sm text-sapala-ink outline-none focus:border-sapala-primary focus:ring-2 focus:ring-sapala-primary/15';
</script>

<svelte:head><title>Galeri — Admin SAPALA 67</title></svelte:head>

<div class="mb-7"><p class="goal-label text-sapala-clay">MEDIA PENGABDIAN</p><h1 class="mt-2 font-heading text-3xl font-bold text-sapala-ink">Galeri Foto</h1><p class="mt-1 text-sm text-sapala-ink/60">Tambahkan dokumentasi kegiatan agar perjalanan SAPALA selalu hidup.</p></div>

<div class="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
	<form method="POST" action="?/create" enctype="multipart/form-data" use:enhance class="rounded-2xl border border-sapala-ink/10 bg-white p-4 shadow-card sm:p-6">
		<div class="flex items-center gap-3"><span class="flex h-10 w-10 items-center justify-center rounded-full bg-sapala-primary text-white"><ImagePlus class="h-5 w-5" /></span><div><h2 class="font-heading text-lg font-bold text-sapala-ink">Tambah dokumentasi</h2><p class="text-xs text-sapala-ink/55">Gunakan URL gambar atau file yang telah diunggah.</p></div></div>
		{#if form?.error}<p class="mt-4 rounded-lg bg-sapala-red/10 px-3 py-2 text-sm text-sapala-red">{form.error}</p>{/if}
		<label class="mt-5 block text-sm font-medium text-sapala-ink" for="upload">Upload foto</label><input id="upload" name="upload" type="file" accept="image/jpeg,image/png,image/webp" class="mt-1 block min-h-12 w-full text-sm text-sapala-ink file:mr-3 file:rounded-lg file:border-0 file:bg-sapala-primary file:px-3 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-sapala-deep" /><p class="mt-1.5 text-xs text-sapala-ink/50">JPG, PNG, atau WebP · maksimal 8 MB.</p>
		<label class="mt-4 block text-sm font-medium text-sapala-ink" for="src">URL gambar <span class="font-normal text-sapala-ink/40">(opsional)</span></label><input id="src" name="src" placeholder="Gunakan bila foto sudah tersedia online" class={input} />
		<label class="mt-4 block text-sm font-medium text-sapala-ink" for="alt">Keterangan foto</label><input id="alt" name="alt" placeholder="Pendakian Gunung Ciremai" class={input} />
		<div class="mt-4 grid grid-cols-2 gap-3"><div><label class="block text-sm font-medium text-sapala-ink" for="category">Kategori</label><input id="category" name="category" value="Kegiatan" class={input} /></div><div><label class="block text-sm font-medium text-sapala-ink" for="sort">Urutan</label><input id="sort" name="sort" type="number" value="0" class={input} /></div></div>
		<label class="mt-4 block text-sm font-medium text-sapala-ink" for="span">Ukuran grid</label><select id="span" name="span" class={input}><option value="col-span-1 row-span-1">Standar</option><option value="col-span-2 row-span-1">Lebar</option><option value="col-span-1 row-span-2">Tinggi</option><option value="col-span-2 row-span-2">Utama</option></select>
		<button class="btn-primary mt-6 w-full justify-center"><ImagePlus class="h-4 w-4" /> Simpan foto</button>
	</form>

	<section class="rounded-2xl border border-sapala-ink/10 bg-white p-4 shadow-card sm:p-5"><div class="mb-4 flex items-center justify-between"><h2 class="font-heading text-lg font-bold text-sapala-ink">Dokumentasi tersimpan</h2><span class="text-sm text-sapala-ink/50">{data.gallery.length} foto</span></div>{#if data.gallery.length}<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">{#each data.gallery as item}<article class="group overflow-hidden rounded-xl border border-sapala-ink/10"><img src={item.src} alt={item.alt} class="h-28 w-full object-cover" /><div class="flex items-center justify-between gap-2 p-3"><div class="min-w-0"><p class="truncate text-sm font-medium text-sapala-ink">{item.alt || 'Tanpa keterangan'}</p><p class="mt-1 text-[10px] font-bold uppercase tracking-wider text-sapala-clay">{item.category}</p></div><form method="POST" action="?/delete" use:enhance onsubmit={(event) => { if (!confirm('Hapus foto ini?')) event.preventDefault(); }}><input type="hidden" name="id" value={item.id} /><button class="flex h-11 w-11 items-center justify-center rounded-lg text-sapala-red hover:bg-sapala-red/10" aria-label="Hapus foto"><Trash2 class="h-4 w-4" /></button></form></div></article>{/each}</div>{:else}<p class="rounded-xl bg-sapala-cream p-7 text-center text-sm text-sapala-ink/55">Belum ada dokumentasi. Tambahkan foto pertama dari kegiatan SAPALA.</p>{/if}</section>
</div>
