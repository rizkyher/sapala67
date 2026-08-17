<script lang="ts">
	import { ArrowLeft, Clock, User, Calendar, Share2, Link2, Check } from 'lucide-svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import SmartImage from '$lib/components/ui/SmartImage.svelte';
	import { siteData } from '$lib/data/site';

	let { data } = $props();
	const article = $derived(data.article);
	const related = $derived(data.related);
	const content = $derived(data.content);
	const shareUrl = $derived(`${data.siteUrl}/artikel/${data.article.slug}`);
	let copied = $state(false);

	const categoryColors: Record<string, string> = {
		'Tips & Trik': 'bg-sapala-sky/15 border-sapala-sky/40 text-sapala-primary',
		Konservasi: 'bg-green-600/15 border-green-600/30 text-green-700',
		Teknik: 'bg-sapala-primary/15 border-sapala-primary/30 text-sapala-primary',
		Keselamatan: 'bg-sapala-red/15 border-sapala-red/30 text-sapala-red',
		Sejarah: 'bg-sapala-clay/15 border-sapala-clay/30 text-sapala-clay'
	};

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(shareUrl);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			/* ignore */
		}
	}
</script>

<svelte:head>
	<title>{article.title} — {siteData.name}</title>
	<meta name="description" content={article.excerpt} />
	<link rel="canonical" href={shareUrl} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={article.title} />
	<meta property="og:description" content={article.excerpt} />
	<meta property="og:url" content={shareUrl} />
	<meta property="article:author" content={article.author} />
	<meta property="article:section" content={article.category} />
</svelte:head>

<article class="min-h-screen bg-sapala-cream">
	<!-- Banner -->
	<header class="relative isolate overflow-hidden">
		<SmartImage src={article.image} alt={article.title} label={article.category} class="absolute inset-0 h-full w-full" />
		<div class="absolute inset-0 bg-gradient-to-t from-sapala-inkdeep/80 via-sapala-inkdeep/30 to-transparent"></div>

		<a href="/#artikel" class="absolute left-4 top-4 z-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-sapala-ink shadow-sm backdrop-blur transition-colors hover:bg-white sm:left-8 sm:top-8">
			<ArrowLeft class="h-4 w-4" /> Kembali
		</a>

		<div class="relative mx-auto flex min-h-[32rem] max-w-3xl flex-col justify-end px-4 pb-8 pt-28 sm:min-h-[34rem] sm:px-6">
			<p class="mb-3 text-[10px] font-bold uppercase tracking-[.18em] text-sapala-earth sm:tracking-[.22em]">SAPALA 67 · Catatan Alam</p>
			<span class="mb-3 inline-block rounded-full border px-3 py-1 text-xs font-medium {categoryColors[article.category] || 'border-white/30 bg-white/20 text-white'}">{article.category}</span>
			<h1 class="max-w-[22ch] font-heading text-3xl font-bold leading-tight text-white md:max-w-none md:text-4xl lg:text-5xl">{article.title}</h1>
			<div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm leading-relaxed text-white/85">
				<span class="flex items-center gap-1.5"><User class="h-4 w-4" />{article.author}</span>
				<span class="flex items-center gap-1.5"><Calendar class="h-4 w-4" />{article.date}</span>
				<span class="flex items-center gap-1.5"><Clock class="h-4 w-4" />{article.read_time}</span>
			</div>
		</div>
	</header>

	<!-- Body -->
	<div class="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
		<div class="space-y-5">
			<p class="border-t-2 border-sapala-red/60 pt-5 font-serif text-xl italic leading-relaxed text-sapala-ink md:text-2xl">{content[0]}</p>
			{#each content.slice(1) as para}
				<p class="leading-relaxed text-sapala-ink/80">{para}</p>
			{/each}
		</div>

		<!-- Share -->
		<div class="mt-10 flex flex-wrap items-center gap-3 border-t border-sapala-ink/10 pt-6">
			<span class="flex items-center gap-2 text-sm font-medium text-sapala-ink/70"><Share2 class="h-4 w-4" /> Bagikan:</span>
			<a href="https://wa.me/?text={encodeURIComponent(article.title + ' — ' + shareUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center rounded-full bg-green-600 px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90">WhatsApp</a>
			<a href="https://twitter.com/intent/tweet?text={encodeURIComponent(article.title)}&url={encodeURIComponent(shareUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center rounded-full bg-sapala-ink px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90">X / Twitter</a>
			<a href="https://www.facebook.com/sharer/sharer.php?u={encodeURIComponent(shareUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center rounded-full bg-sapala-primary px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90">Facebook</a>
			<button onclick={copyLink} class="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-sapala-ink/15 bg-white px-4 py-2 text-xs font-medium text-sapala-ink transition-colors hover:bg-sapala-ink/5">
				{#if copied}<Check class="h-3.5 w-3.5 text-green-700" /> Tersalin{:else}<Link2 class="h-3.5 w-3.5" /> Salin Tautan{/if}
			</button>
		</div>
	</div>

	<!-- Related -->
	{#if related.length}
		<section class="border-t border-sapala-ink/10 bg-sapala-parchment/50 py-14">
			<div class="mx-auto max-w-5xl px-4 sm:px-6">
				<h2 class="mb-8 text-center font-heading text-2xl font-bold text-sapala-ink">Artikel Terkait</h2>
				<div class="grid gap-6 sm:grid-cols-3">
					{#each related as r}
						<a href="/artikel/{r.slug}" class="group block">
							<div class="glass-card h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-sapala-primary/30">
								<SmartImage src={r.image} alt={r.title} label={r.category} class="h-32 w-full" />
								<div class="p-4">
									<span class="text-[10px] font-medium text-sapala-clay">{r.category}</span>
									<h3 class="mt-1 line-clamp-2 font-heading text-sm font-semibold text-sapala-ink transition-colors group-hover:text-sapala-primary">{r.title}</h3>
								</div>
							</div>
						</a>
					{/each}
				</div>
			</div>
		</section>
	{/if}
</article>

<Footer />
