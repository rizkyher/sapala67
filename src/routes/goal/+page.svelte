<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import PageHero from '$lib/components/layout/PageHero.svelte';
	import GoalPlanner from '$lib/components/goals/GoalPlanner.svelte';
	import { siteData } from '$lib/data/site';
</script>

<svelte:head><title>Set Goal — SAPALA 67</title><meta name="description" content="Tetapkan target kecil yang membawa langkah nyata untuk alam." /></svelte:head>
<Navbar />
<main>
	<PageHero eyebrow="Set goal" title="Jadikan niatmu sebuah jejak." description="Ruang kecil untuk menetapkan tindakan nyata: untuk dirimu, untuk kawan seperjalanan, dan untuk alam yang kamu cintai." />
	<section class="bg-sapala-cream py-12 md:py-24"><div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><GoalPlanner /><div class="mt-12 md:mt-16"><p class="goal-label text-sapala-clay">ARAH PERJALANAN SAPALA</p><div class="mt-5 grid gap-px overflow-hidden rounded-2xl bg-sapala-ink/10 md:grid-cols-2">{#each siteData.goals as goal, index}<article class="bg-white p-6 md:p-9"><p class="font-heading text-sm text-sapala-earth">0{index + 1}</p><p class="mt-4 font-serif text-xl leading-snug text-sapala-ink sm:text-2xl">{goal}</p></article>{/each}</div></div></div></section>
</main>
<Footer />
