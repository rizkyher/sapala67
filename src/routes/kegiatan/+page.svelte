<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import PageHero from '$lib/components/layout/PageHero.svelte';
	import Activities from '$lib/components/sections/Activities.svelte';
	import Events from '$lib/components/sections/Events.svelte';
	import Gallery from '$lib/components/sections/Gallery.svelte';
	let { data } = $props();
</script>

<svelte:head><title>Kegiatan SAPALA 67 — Jelajah, Latih, Lestarikan</title><meta name="description" content="Program pelatihan, ekspedisi, konservasi, dan agenda SAPALA 67." /></svelte:head>
<Navbar />
<main><PageHero eyebrow="Ruang bertumbuh" title="Bergerak di alam, bertumbuh untuk alam." description="Dari pendidikan dasar sampai pengabdian masyarakat, setiap kegiatan dirancang untuk melatih keterampilan dan kepedulian." /><Activities /><Events items={data.events} /><Gallery items={data.gallery} /></main>
<Footer />
