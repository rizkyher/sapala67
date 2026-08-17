<script lang="ts">
	import ArticleForm from '$lib/components/admin/ArticleForm.svelte';
	let { form } = $props();
</script>

<svelte:head><title>Artikel Baru — Admin SAPALA 67</title></svelte:head>

<div class="mb-6">
	<a href="/admin/articles" class="text-sm text-sapala-primary">← Artikel</a>
	<h1 class="mt-1 font-heading text-2xl font-bold text-sapala-ink">Artikel Baru</h1>
</div>

<div class="max-w-3xl">
	<ArticleForm values={form?.values ?? {}} error={form?.error ?? ''} submitLabel="Simpan Artikel" />
</div>
