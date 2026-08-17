<script lang="ts">
	import { ArrowDownRight, CalendarDays, MapPin, Mountain, Users } from 'lucide-svelte';
	import { siteData } from '$lib/data/site';

	const years = new Date().getFullYear() - siteData.established;
	const marks = [
		{ label: 'tahun menjaga arah', value: years },
		{ label: 'anggota seumur hidup', value: siteData.memberCount },
		{ label: 'angkatan berjejak', value: siteData.angkatanCount }
	];
</script>

<section id="tentang" class="relative overflow-hidden bg-sapala-cream py-20 md:py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
			<div>
				<p class="goal-label text-sapala-clay">01 / KAMI ADALAH SAPALA</p>
				<h2 class="mt-5 max-w-3xl font-heading text-4xl font-bold leading-tight text-sapala-ink md:text-6xl">Santri yang belajar <span class="text-sapala-primary">dari kontur alam.</span></h2>
				<p class="mt-7 max-w-2xl text-base leading-8 text-sapala-ink/75 md:text-lg">{siteData.aboutIntro}</p>
				<a href="/tentang" class="mt-8 inline-flex items-center gap-2 border-b-2 border-sapala-ink pb-2 text-sm font-bold text-sapala-ink transition hover:border-sapala-earth hover:text-sapala-clay">Jelajahi cerita kami <ArrowDownRight class="h-4 w-4" /></a>
			</div>
			<div class="relative grid grid-cols-2 gap-3 self-start sm:gap-4">
				<div class="col-span-2 overflow-hidden bg-sapala-inkdeep p-6 text-white sm:p-8"><Mountain class="h-7 w-7 text-sapala-earth" /><p class="mt-10 max-w-sm font-serif text-3xl leading-tight italic">“{siteData.moto}”</p><p class="mt-4 text-xs font-bold uppercase tracking-[.18em] text-sapala-sky">Satu komunitas · satu arah</p></div>
				{#each marks as mark}<div class="border border-sapala-ink/10 bg-white p-5"><p class="font-heading text-3xl text-sapala-primary">{mark.value}</p><p class="mt-2 text-xs leading-relaxed text-sapala-ink/55">{mark.label}</p></div>{/each}
				<div class="border border-sapala-ink/10 bg-sapala-sand p-5"><Users class="h-5 w-5 text-sapala-clay" /><p class="mt-5 text-xs leading-relaxed text-sapala-ink/70">Keanggotaan bukan garis akhir—ini ikatan untuk terus mengabdi.</p></div>
			</div>
		</div>
		<div class="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-3">
			<div class="bg-sapala-inkdeep p-7 text-white md:p-9"><CalendarDays class="h-5 w-5 text-sapala-earth" /><p class="mt-8 text-xs font-bold tracking-[.18em] text-sapala-sky">BERDIRI</p><p class="mt-2 font-serif text-2xl">{siteData.establishedDate}</p></div>
			<div class="bg-sapala-primary p-7 text-white md:p-9"><Mountain class="h-5 w-5 text-sapala-earth" /><p class="mt-8 text-xs font-bold tracking-[.18em] text-white/60">JEJAK PERTAMA</p><p class="mt-2 font-serif text-2xl">{siteData.establishedLocation}</p></div>
			<div class="bg-sapala-clay p-7 text-white md:p-9"><MapPin class="h-5 w-5 text-sapala-sand" /><p class="mt-8 text-xs font-bold tracking-[.18em] text-white/60">BASECAMP</p><p class="mt-2 font-serif text-2xl">Tasikmalaya, Jawa Barat</p></div>
		</div>
	</div>
</section>
