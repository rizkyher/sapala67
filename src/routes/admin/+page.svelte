<script lang="ts">
	import { Newspaper, Image, CalendarDays, Inbox, Plus } from 'lucide-svelte';
	let { data } = $props();
	const c = $derived(data.counts);

	const cards = $derived([
		{ label: 'Artikel', value: c.articles, icon: Newspaper, href: '/admin/articles', tone: 'text-sapala-primary' },
		{ label: 'Foto Galeri', value: c.gallery, icon: Image, href: '/admin/gallery', tone: 'text-sapala-clay' },
		{ label: 'Agenda', value: c.events, icon: CalendarDays, href: '/admin/events', tone: 'text-green-700' },
		{ label: 'Pesan Masuk', value: c.messages, icon: Inbox, href: '/admin/messages', tone: 'text-sapala-red' }
	]);
</script>

<svelte:head><title>Dashboard — Admin SAPALA 67</title></svelte:head>

<div class="mb-6">
	<p class="goal-label text-sapala-clay">RINGKASAN PENGELOLAAN</p>
	<h1 class="mt-1 font-heading text-2xl font-bold text-sapala-ink sm:text-3xl">Selamat datang, {data.user?.name}.</h1>
	<p class="mt-1 text-sm leading-relaxed text-sapala-ink/60">Kelola konten SAPALA 67 dari satu tempat.</p>
</div>

<div class="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
	{#each cards as card}
		<a href={card.href} class="rounded-2xl border border-sapala-ink/10 bg-white p-4 shadow-card transition-all active:scale-[.98] sm:p-5 sm:hover:-translate-y-1 sm:hover:shadow-lift">
			<div class="flex items-center justify-between">
				<card.icon class="h-6 w-6 {card.tone}" />
				{#if card.label === 'Pesan Masuk' && c.unread > 0}
					<span class="rounded-full bg-sapala-red px-2 py-0.5 text-[10px] font-bold text-white">{c.unread} baru</span>
				{/if}
			</div>
			<p class="mt-3 font-heading text-2xl font-bold text-sapala-ink sm:text-3xl">{card.value}</p>
			<p class="text-sm text-sapala-ink/60">{card.label}</p>
		</a>
	{/each}
</div>

<div class="grid gap-6 lg:grid-cols-2">
	<div class="rounded-2xl border border-sapala-ink/10 bg-white p-4 shadow-card sm:p-6">
		<h2 class="mb-4 font-heading text-lg font-semibold text-sapala-ink">Aksi Cepat</h2>
		<div class="grid gap-2 sm:flex sm:flex-wrap sm:gap-3">
			<a href="/admin/articles/new" class="btn-primary justify-center text-sm"><Plus class="h-4 w-4" /> Artikel Baru</a>
			<a href="/admin/events/new" class="btn-outline justify-center text-sm"><Plus class="h-4 w-4" /> Agenda Baru</a>
			<a href="/admin/gallery" class="btn-outline justify-center text-sm"><Plus class="h-4 w-4" /> Tambah Foto</a>
		</div>
	</div>

	<div class="rounded-2xl border border-sapala-ink/10 bg-white p-4 shadow-card sm:p-6">
		<h2 class="mb-4 font-heading text-lg font-semibold text-sapala-ink">Pesan Terbaru</h2>
		{#if data.recentMessages.length}
			<ul class="space-y-3">
				{#each data.recentMessages as m}
					<li class="flex items-start justify-between gap-3 border-b border-sapala-ink/5 pb-2 last:border-0">
						<div class="min-w-0">
							<p class="truncate text-sm font-medium text-sapala-ink">{m.name} {#if !m.is_read}<span class="ml-1 rounded bg-sapala-red/10 px-1.5 py-0.5 text-[10px] font-bold text-sapala-red">baru</span>{/if}</p>
							<p class="truncate text-xs text-sapala-ink/55">{m.message}</p>
						</div>
						<a href="/admin/messages" class="flex min-h-11 flex-shrink-0 items-center text-xs font-medium text-sapala-primary">Lihat</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-sm text-sapala-ink/50">Belum ada pesan.</p>
		{/if}
	</div>
</div>
