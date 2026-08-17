<script lang="ts">
	import { BookOpen, Compass, TreePine, HeartHandshake, Users, Star } from 'lucide-svelte';
	import { coreValues } from '$lib/data/site';

	const iconMap: Record<string, typeof BookOpen> = {
		'book-open': BookOpen,
		compass: Compass,
		'tree-pine': TreePine,
		'heart-handshake': HeartHandshake,
		users: Users
	};

	// Emblem tones
	const tones = [
		'bg-sapala-primary text-white',
		'bg-sapala-red text-white',
		'bg-green-600 text-white',
		'bg-sapala-clay text-white',
		'bg-sapala-ink text-white'
	];
</script>

<section class="relative overflow-hidden bg-sapala-cream py-24 md:py-32">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="scroll-reveal mb-16 text-center">
			<span class="eyebrow mb-4"><Star class="h-3.5 w-3.5" /> Pilar Organisasi</span>
			<h2 class="section-heading mb-4">Nilai-Nilai Inti</h2>
			<p class="section-subheading">Lima pilar yang menjadi fondasi setiap langkah dan kegiatan SAPALA 67.</p>
		</div>

		<!-- Grid -->
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
			{#each coreValues as value, i}
				{@const Icon = iconMap[value.icon]}
				<div class="scroll-reveal group" style="animation-delay: {i * 100}ms">
					<div class="paper-card h-full p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-sapala-red/30 hover:shadow-lift">
						<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110 {tones[i]}">
							<Icon class="h-8 w-8" />
						</div>
						<h3 class="mb-2 font-heading text-lg font-semibold text-sapala-ink">{value.title}</h3>
						<p class="text-sm leading-relaxed text-sapala-ink/65">{value.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
