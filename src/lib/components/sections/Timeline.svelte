<script lang="ts">
	import { onMount } from 'svelte';
	import { timeline } from '$lib/data/site';

	let visibleItems = $state<Set<number>>(new Set());

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = parseInt(entry.target.getAttribute('data-index') || '0');
						visibleItems = new Set([...visibleItems, index]);
					}
				});
			},
			{ threshold: 0.3 }
		);

		document.querySelectorAll('.timeline-item').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});
</script>

<section id="timeline" class="relative py-24 md:py-32 overflow-hidden">
	<!-- Background -->
	<div class="absolute inset-0 bg-gradient-to-b from-sapala-sand/40 via-sapala-cream to-sapala-sand/40"></div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
		<!-- Section Header -->
		<div class="text-center mb-16 scroll-reveal">
			<span
				class="inline-block px-4 py-1.5 rounded-full bg-sapala-earth/10 border border-sapala-earth/20 text-sapala-clay text-sm font-medium mb-4"
			>
				Perjalanan Kami
			</span>
			<h2 class="section-heading text-gradient mb-4">Jejak SAPALA 67</h2>
			<p class="section-subheading">
				Sejarah panjang perjalanan organisasi dari masa ke masa
			</p>
		</div>

		<!-- Timeline -->
		<div class="relative">
			<!-- Center Line (Desktop) -->
			<div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sapala-sky via-sapala-primary to-sapala-earth"></div>

			<!-- Mobile Line -->
			<div class="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sapala-sky via-sapala-primary to-sapala-earth"></div>

			<div class="space-y-12 md:space-y-16">
				{#each timeline as item, i}
					<div
						class="timeline-item relative scroll-reveal"
						data-index={i}
						class:opacity-100={visibleItems.has(i)}
						class:opacity-0={!visibleItems.has(i)}
						style="transition: opacity 0.6s ease {i * 150}ms"
					>
						<!-- Desktop Layout -->
						<div class="hidden md:grid md:grid-cols-2 md:gap-12 items-center">
							<!-- Left side (even) -->
							{#if i % 2 === 0}
								<div class="text-right pr-12">
									<div class="glass-card p-6 inline-block text-left hover:border-sapala-sky/30 transition-all duration-500">
										<span class="font-heading text-3xl font-bold text-gradient">{item.year}</span>
										<h3 class="font-heading text-xl font-semibold text-sapala-ink mt-2 mb-2">{item.title}</h3>
										<p class="text-sapala-ink/70 text-sm leading-relaxed">{item.description}</p>
									</div>
								</div>
								<div></div>
							{:else}
								<div></div>
								<div class="text-left pl-12">
									<div class="glass-card p-6 inline-block hover:border-sapala-earth/30 transition-all duration-500">
										<span class="font-heading text-3xl font-bold text-sapala-clay">{item.year}</span>
										<h3 class="font-heading text-xl font-semibold text-sapala-ink mt-2 mb-2">{item.title}</h3>
										<p class="text-sapala-ink/70 text-sm leading-relaxed">{item.description}</p>
									</div>
								</div>
							{/if}
						</div>

						<!-- Mobile Layout -->
						<div class="md:hidden flex gap-6 pl-2">
							<div class="flex-shrink-0">
								<div
									class="w-9 h-9 rounded-full bg-gradient-to-br from-sapala-sky to-sapala-primary flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-sapala-sky/30"
								>
									{i + 1}
								</div>
							</div>
							<div class="glass-card p-5 flex-1">
								<span class="font-heading text-2xl font-bold text-gradient">{item.year}</span>
								<h3 class="font-heading text-lg font-semibold text-sapala-ink mt-1 mb-2">{item.title}</h3>
								<p class="text-sapala-ink/70 text-sm leading-relaxed">{item.description}</p>
							</div>
						</div>

						<!-- Center Dot (Desktop) -->
						<div class="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
							<div
								class="w-4 h-4 rounded-full bg-gradient-to-br from-sapala-sky to-sapala-primary border-4 border-sapala-cream shadow-lg shadow-sapala-sky/30"
							></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
