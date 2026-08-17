<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Activities from '$lib/components/sections/Activities.svelte';
	import Gallery from '$lib/components/sections/Gallery.svelte';
	import Articles from '$lib/components/sections/Articles.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
	import Events from '$lib/components/sections/Events.svelte';
	import ExpeditionCompass from '$lib/components/sections/ExpeditionCompass.svelte';
	import { useScrollReveal } from '$lib/utils/scroll';
	import { siteData } from '$lib/data/site';

	let { data, form } = $props();

	let isLoading = $state(true);

	onMount(() => {
		setTimeout(() => (isLoading = false), 1400);
		useScrollReveal();
	});

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: siteData.fullName,
		alternateName: siteData.name,
		slogan: siteData.moto,
		url: siteData.url,
		logo: `${siteData.url}/logo.png`,
		foundingDate: '2004-11-12',
		founder: { '@type': 'Person', name: siteData.founder },
		email: siteData.email,
		telephone: siteData.phone,
		address: {
			'@type': 'PostalAddress',
			streetAddress: siteData.address,
			addressLocality: 'Tasikmalaya',
			addressRegion: 'Jawa Barat',
			postalCode: '46132',
			addressCountry: 'ID'
		},
		sameAs: [siteData.social.instagram, siteData.social.youtube]
	};
</script>

<svelte:head>
	<title>{siteData.name} — {siteData.fullName} | {siteData.moto}</title>
	<meta name="description" content={siteData.description} />
	<meta property="og:title" content="{siteData.name} — {siteData.fullName}" />
	<meta property="og:description" content={siteData.description} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/logo.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{siteData.name} — {siteData.fullName}" />
	<meta name="twitter:description" content={siteData.description} />
	<meta name="twitter:image" content="/logo.png" />
	<meta name="keywords" content="SAPALA 67, Santri Pecinta Alam, pecinta alam, Tasikmalaya, Pesantren Persis 67 Benda, arung jeram, pendakian" />
	<meta name="author" content={siteData.fullName} />
	<link rel="canonical" href={siteData.url} />
	<link rel="icon" type="image/png" href="/logo.png" />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
</svelte:head>

<!-- Loading Screen -->
{#if isLoading}
	<div class="fixed inset-0 z-[200] flex items-center justify-center bg-sapala-cream">
		<div class="text-center">
			<div class="emblem-ring mx-auto mb-6 w-fit animate-pulse-glow bg-sapala-cream p-2">
				<img src="/logo.png" alt="Logo SAPALA 67" class="h-20 w-20 rounded-full object-contain" />
			</div>
			<h2 class="mb-1 font-heading text-2xl font-bold text-sapala-ink">SAPALA 67</h2>
			<p class="mb-4 text-sm text-sapala-ink/50">Memuat…</p>
			<div class="mx-auto h-1 w-32 overflow-hidden rounded-full bg-sapala-ink/10">
				<div class="h-full rounded-full bg-sapala-red" style="animation: loadProgress 1.4s ease-in-out forwards;"></div>
			</div>
		</div>
	</div>
{/if}

<div class="min-h-screen">
	<Navbar />

	<main>
		<Hero />
		<ExpeditionCompass />
		<About />
		<Activities />
			<Events items={data.events} />
			<Gallery items={data.gallery} />
			<Articles items={data.articles} />
			<Contact {form} />
	</main>

	<Footer />
</div>

<style>
	@keyframes loadProgress {
		0% {
			width: 0%;
		}
		100% {
			width: 100%;
		}
	}
</style>
