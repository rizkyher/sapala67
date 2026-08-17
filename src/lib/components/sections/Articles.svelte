<script lang="ts">
	import { Clock, User, ArrowRight, Search, Newspaper } from 'lucide-svelte';
	import SmartImage from '$lib/components/ui/SmartImage.svelte';
	import type { Article } from '$lib/server/db';

	let { items = [] }: { items: Article[] } = $props();

	let query = $state('');
	let activeCat = $state('Semua');

	const categories = $derived(['Semua', ...Array.from(new Set(items.map((a) => a.category)))]);

	const gradients = [
		'from-sapala-sky/40 to-sapala-primary/40',
		'from-green-500/40 to-green-700/40',
		'from-sapala-earth/40 to-sapala-clay/40',
		'from-sapala-primary/40 to-sapala-ink/40',
		'from-sapala-red/40 to-sapala-earth/40',
		'from-sapala-deep/40 to-sapala-sky/40'
	];

	const categoryColors: Record<string, string> = {
		'Tips & Trik': 'bg-sapala-sky/15 border-sapala-sky/40 text-sapala-primary',
		Konservasi: 'bg-green-600/15 border-green-600/30 text-green-700',
		Teknik: 'bg-sapala-primary/15 border-sapala-primary/30 text-sapala-primary',
		Keselamatan: 'bg-sapala-red/15 border-sapala-red/30 text-sapala-red',
		Sejarah: 'bg-sapala-clay/15 border-sapala-clay/30 text-sapala-clay'
	};

	const filtered = $derived(
		items.filter((a) => {
			const matchCat = activeCat === 'Semua' || a.category === activeCat;
			const q = query.trim().toLowerCase();
			const matchQuery = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
			return matchCat && matchQuery;
		})
	);

	const featured = $derived(filtered[0]);
	const rest = $derived(filtered.slice(1));
</script>

<section id="artikel" class="relative overflow-hidden bg-gradient-to-b from-sapala-cream via-sapala-parchment to-sapala-cream py-24 md:py-32">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="scroll-reveal mb-10 max-w-3xl">
			<p class="goal-label text-sapala-clay">05 / CATATAN LAPANGAN</p>
			<h2 class="mt-3 font-heading text-4xl font-bold text-sapala-ink md:text-5xl">Pengetahuan adalah perlengkapan yang tidak boleh tertinggal.</h2>
			<p class="mt-5 text-base leading-relaxed text-sapala-ink/65">Catatan dari lapangan, keselamatan, dan cara-cara kecil untuk menjaga alam.</p>
		</div>

		<!-- Search + categories -->
		<div class="scroll-reveal mb-10 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
			<div class="relative w-full lg:max-w-xs">
				<Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sapala-ink/40" />
				<input
					type="text"
					bind:value={query}
					placeholder="Cari artikel…"
					class="w-full rounded-full border border-sapala-ink/15 bg-white py-2.5 pl-10 pr-4 text-sm text-sapala-ink placeholder-sapala-ink/40 shadow-sm transition-all focus:border-sapala-primary/50 focus:outline-none focus:ring-1 focus:ring-sapala-primary/30"
				/>
			</div>
			<div class="flex flex-wrap justify-center gap-2">
				{#each categories as cat}
					<button
						onclick={() => (activeCat = cat)}
						class="rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-300 {activeCat === cat
							? 'bg-sapala-primary text-white shadow-sm'
							: 'border border-sapala-ink/10 bg-white text-sapala-ink/70 hover:bg-sapala-ink/5'}"
					>
						{cat}
					</button>
				{/each}
			</div>
		</div>

		{#if featured}
			<!-- Featured -->
			<div class="scroll-reveal mb-12">
				<a href="/artikel/{featured.slug}" class="group block">
					<div class="glass-card overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-sapala-primary/30">
						<div class="grid gap-0 md:grid-cols-2">
							<SmartImage src={featured.image} alt={featured.title} gradient={gradients[0]} label="Featured" class="h-64 w-full md:h-full" />
							<div class="flex flex-col justify-center p-8 md:p-10">
								<div class="mb-4 flex items-center gap-3">
									<span class="rounded-full border px-3 py-1 text-xs font-medium {categoryColors[featured.category] || 'border-sapala-ink/10 bg-sapala-parchment text-sapala-ink/70'}">{featured.category}</span>
									<span class="text-xs text-sapala-ink/45">{featured.date}</span>
								</div>
								<h3 class="mb-3 font-heading text-2xl font-semibold text-sapala-ink transition-colors group-hover:text-sapala-primary md:text-3xl">{featured.title}</h3>
								<p class="mb-6 leading-relaxed text-sapala-ink/70">{featured.excerpt}</p>
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-4 text-sm text-sapala-ink/50">
										<span class="flex items-center gap-1"><User class="h-3.5 w-3.5" />{featured.author}</span>
										<span class="flex items-center gap-1"><Clock class="h-3.5 w-3.5" />{featured.read_time}</span>
									</div>
									<span class="flex items-center gap-2 text-sm font-medium text-sapala-primary transition-all group-hover:gap-3">Baca <ArrowRight class="h-4 w-4" /></span>
								</div>
							</div>
						</div>
					</div>
				</a>
			</div>

			<!-- Grid -->
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each rest as article, i}
					<a href="/artikel/{article.slug}" class="scroll-reveal group block" style="animation-delay: {i * 80}ms">
						<div class="glass-card h-full overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-sapala-primary/30">
							<SmartImage src={article.image} alt={article.title} gradient={gradients[(i + 1) % gradients.length]} label={article.category} class="h-40 w-full" />
							<div class="p-5">
								<div class="mb-3 flex items-center gap-2">
									<span class="rounded-full border px-2 py-0.5 text-[10px] font-medium {categoryColors[article.category] || 'border-sapala-ink/10 bg-sapala-parchment text-sapala-ink/70'}">{article.category}</span>
									<span class="text-[10px] text-sapala-ink/45">{article.read_time}</span>
								</div>
								<h3 class="mb-2 line-clamp-2 font-heading text-base font-semibold text-sapala-ink transition-colors group-hover:text-sapala-primary">{article.title}</h3>
								<p class="mb-4 line-clamp-2 text-sm leading-relaxed text-sapala-ink/60">{article.excerpt}</p>
								<div class="flex items-center justify-between">
									<span class="text-xs text-sapala-ink/45">{article.author}</span>
									<span class="text-xs font-medium text-sapala-primary opacity-0 transition-opacity group-hover:opacity-100">Baca →</span>
								</div>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<div class="py-12 text-center text-sm text-sapala-ink/50">Tidak ada artikel yang cocok dengan pencarian.</div>
		{/if}
	</div>
</section>
