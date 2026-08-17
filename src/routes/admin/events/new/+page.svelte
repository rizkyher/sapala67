<script lang="ts">
	import EventForm from '$lib/components/admin/EventForm.svelte';
	let { form } = $props();
</script>

<svelte:head><title>Agenda Baru — Admin SAPALA 67</title></svelte:head>

<div class="mb-6">
	<a href="/admin/events" class="text-sm text-sapala-primary">← Agenda</a>
	<h1 class="mt-1 font-heading text-2xl font-bold text-sapala-ink">Agenda Baru</h1>
</div>

<div class="max-w-3xl">
	<EventForm values={form?.values ?? {}} error={form?.error ?? ''} submitLabel="Simpan Agenda" />
</div>
