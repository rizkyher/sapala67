<script lang="ts">
	import { onMount } from 'svelte';
	import { Mountain, Compass, Cable, Footprints, PenTool, Sparkles } from 'lucide-svelte';
	import { logoPhilosophy, siteData } from '$lib/data/site';

	let activeIndex = $state<number | null>(null);

	const iconMap: Record<string, typeof Mountain> = {
		mountain: Mountain,
		compass: Compass,
		rope: Cable,
		footprints: Footprints,
		pen: PenTool
	};

	// Tones drawn from the emblem itself
	const tones = [
		'bg-sapala-ink text-white',
		'bg-sapala-red text-white',
		'bg-sapala-clay text-white',
		'bg-sapala-primary text-white',
		'bg-sapala-deep text-white'
	];
</script>

<section id="filosofi" class="relative overflow-hidden bg-gradient-to-b from-sapala-skysoft/50 via-sapala-cream to-sapala-sand/40 py-24 md:py-32">
	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="scroll-reveal mb-14 text-center">
			<span class="eyebrow-earth mb-4"><Sparkles class="h-3.5 w-3.5" /> Filosofi Logo</span>
			<h2 class="section-heading mb-4">Makna di Balik Lambang</h2>
			<p class="section-subheading">Setiap elemen pada lambang SAPALA 67 menyimpan makna yang mencerminkan jati diri organisasi.</p>
		</div>

		<!-- Emblem showcase -->
		<div class="scroll-reveal mb-14 flex justify-center">
			<div class="relative">
				<div class="emblem-ring bg-sapala-cream p-4 shadow-emblem">
					<img src="/logo.png" alt="Lambang SAPALA 67" class="h-44 w-44 rounded-full object-contain md:h-56 md:w-56" />
				</div>
				<Compass class="absolute -right-3 -top-3 h-9 w-9 animate-spin-slower text-sapala-red" strokeWidth={1.5} />
			</div>
		</div>

		<!-- Philosophy items -->
		<div class="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
			{#each logoPhilosophy as item, i}
				{@const Icon = iconMap[item.icon]}
				<div
					class="scroll-reveal group relative"
					style="animation-delay: {i * 100}ms"
					onmouseenter={() => (activeIndex = i)}
					onmouseleave={() => (activeIndex = null)}
					onfocus={() => (activeIndex = i)}
					onblur={() => (activeIndex = null)}
					role="button"
					tabindex="0"
				>
					<div
						class="paper-card h-full cursor-pointer p-6 transition-all duration-500 {activeIndex === i
							? '-translate-y-2 border-sapala-red/40 shadow-lift'
							: 'hover:-translate-y-1'}"
					>
						<div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 {tones[i]} {activeIndex === i ? 'rotate-6 scale-110' : 'group-hover:scale-105'}">
							<Icon class="h-7 w-7" />
						</div>
						<h3 class="mb-3 text-center font-heading text-lg font-semibold transition-colors {activeIndex === i ? 'text-sapala-red' : 'text-sapala-ink'}">
							{item.title}
						</h3>
						<div class="overflow-hidden transition-all duration-500 {activeIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'} hidden md:block">
							<p class="text-center text-sm leading-relaxed text-sapala-ink/70">{item.description}</p>
						</div>
						<p class="mt-2 text-center text-xs leading-relaxed text-sapala-ink/60 md:hidden">{item.description}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Closing motto -->
		<div class="scroll-reveal mt-14 text-center">
			<div class="inline-block rounded-full border border-sapala-ink/15 bg-white/70 px-8 py-5 shadow-sm">
				<p class="font-serif text-xl italic text-sapala-ink md:text-2xl">“{siteData.moto}”</p>
				<p class="mt-2 text-sm text-sapala-ink/50">— Moto SAPALA 67</p>
			</div>
		</div>
	</div>
</section>
