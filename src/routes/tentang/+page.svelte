<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import PageHero from '$lib/components/layout/PageHero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import CoreValues from '$lib/components/sections/CoreValues.svelte';
	import LogoPhilosophy from '$lib/components/sections/LogoPhilosophy.svelte';
	import Timeline from '$lib/components/sections/Timeline.svelte';
	import OrgStructure from '$lib/components/sections/OrgStructure.svelte';
</script>

<svelte:head><title>Tentang SAPALA 67 — Santri Pecinta Alam</title><meta name="description" content="Sejarah, nilai, dan identitas SAPALA 67 sebagai komunitas santri pecinta alam." /></svelte:head>
<Navbar />
<main><PageHero eyebrow="Identitas kami" title="Alam adalah ruang belajar, bukan sekadar tujuan perjalanan." description="SAPALA 67 membina santri yang tangguh, berakhlak, dan hadir untuk merawat lingkungan melalui pengalaman alam bebas." /><About /><CoreValues /><LogoPhilosophy /><Timeline /><OrgStructure /></main>
<Footer />
