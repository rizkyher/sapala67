<script lang="ts">
	import { Trash2 } from 'lucide-svelte';
	import ArticleForm from '$lib/components/admin/ArticleForm.svelte';
	let { data, form } = $props();
</script>

<svelte:head><title>Edit Artikel — Admin SAPALA 67</title></svelte:head>

<div class="mb-6 flex items-start justify-between gap-4">
	<div>
		<a href="/admin/articles" class="inline-flex min-h-11 items-center text-sm text-sapala-primary">← Artikel</a>
		<h1 class="mt-1 font-heading text-2xl font-bold text-sapala-ink">Edit Artikel</h1>
	</div>
	<form method="POST" action="?/delete" onsubmit={(e) => { if (!confirm('Hapus artikel ini secara permanen?')) e.preventDefault(); }}>
		<button class="inline-flex min-h-11 items-center gap-2 rounded-full border border-sapala-red/30 px-4 py-2 text-sm font-medium text-sapala-red transition-colors hover:bg-sapala-red hover:text-white"><Trash2 class="h-4 w-4" /> Hapus</button>
	</form>
</div>

<div class="max-w-3xl">
	<ArticleForm values={form?.values ?? data.article} error={form?.error ?? ''} submitLabel="Perbarui" action="?/update" />
</div>
