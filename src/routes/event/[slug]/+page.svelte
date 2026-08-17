<script lang="ts">
	import { ArrowLeft, CalendarDays, MapPin, Share2, Link2, Check } from 'lucide-svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import SmartImage from '$lib/components/ui/SmartImage.svelte';
	import { siteData } from '$lib/data/site';

	let { data } = $props();
	const event = $derived(data.event);
	const content = $derived(data.content);
	const shareUrl = $derived(`${data.siteUrl}/event/${data.event.slug}`);
	let copied = $state(false);

	function fmt(d: string) {
		if (!d) return '';
		try {
			return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
		} catch {
			return d;
		}
	}
	const range = $derived(
		event.end_date && event.end_date !== event.start_date
			? `${fmt(event.start_date)} – ${fmt(event.end_date)}`
			: fmt(event.start_date)
	);

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
	<title>{event.title} — {siteData.name}</title>
	<meta name="description" content={event.description} />
	<link rel="canonical" href={shareUrl} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={event.title} />
	<meta property="og:description" content={event.description} />
	<meta property="og:url" content={shareUrl} />
</svelte:head>

<article class="min-h-screen bg-sapala-cream">
	<header class="relative isolate overflow-hidden">
		<SmartImage src={event.image} alt={event.title} label={event.category} class="absolute inset-0 h-full w-full" />
		<div class="absolute inset-0 bg-gradient-to-t from-sapala-inkdeep/80 via-sapala-inkdeep/30 to-transparent"></div>

		<a href="/#agenda" class="absolute left-4 top-4 z-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-sapala-ink shadow-sm backdrop-blur transition-colors hover:bg-white sm:left-8 sm:top-8">
			<ArrowLeft class="h-4 w-4" /> Kembali
		</a>

		<div class="relative mx-auto flex min-h-[32rem] max-w-3xl flex-col justify-end px-4 pb-8 pt-28 sm:min-h-[34rem] sm:px-6">
			<p class="mb-3 text-[10px] font-bold uppercase tracking-[.18em] text-sapala-earth sm:tracking-[.22em]">SAPALA 67 · Titik Kumpul</p>
			<span class="mb-3 inline-block rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-medium text-white">{event.category}</span>
			<h1 class="max-w-[22ch] font-heading text-3xl font-bold leading-tight text-white md:max-w-none md:text-4xl lg:text-5xl">{event.title}</h1>
			<div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm leading-relaxed text-white/85">
				<span class="flex items-center gap-1.5"><CalendarDays class="h-4 w-4" />{range}</span>
				{#if event.location}<span class="flex items-center gap-1.5"><MapPin class="h-4 w-4" />{event.location}</span>{/if}
			</div>
		</div>
	</header>

	<div class="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
		<div class="space-y-5">
			<p class="border-t-2 border-sapala-red/60 pt-5 font-serif text-xl italic leading-relaxed text-sapala-ink md:text-2xl">{event.description}</p>
			{#each content as para}
				<p class="leading-relaxed text-sapala-ink/80">{para}</p>
			{/each}
		</div>

		<div class="mt-10 flex flex-wrap items-center gap-3 border-t border-sapala-ink/10 pt-6">
			<span class="flex items-center gap-2 text-sm font-medium text-sapala-ink/70"><Share2 class="h-4 w-4" /> Bagikan:</span>
			<a href="https://wa.me/?text={encodeURIComponent(event.title + ' — ' + shareUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center rounded-full bg-green-600 px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90">WhatsApp</a>
			<a href="https://twitter.com/intent/tweet?text={encodeURIComponent(event.title)}&url={encodeURIComponent(shareUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center rounded-full bg-sapala-ink px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90">X / Twitter</a>
			<button onclick={copyLink} class="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-sapala-ink/15 bg-white px-4 py-2 text-xs font-medium text-sapala-ink transition-colors hover:bg-sapala-ink/5">
				{#if copied}<Check class="h-3.5 w-3.5 text-green-700" /> Tersalin{:else}<Link2 class="h-3.5 w-3.5" /> Salin Tautan{/if}
			</button>
		</div>

		<div class="mt-8">
			<a href="/#kontak" class="btn-accent">Daftar / Tanya Pengurus</a>
		</div>
	</div>
</article>

<Footer />
