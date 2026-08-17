<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { X, ZoomIn } from 'lucide-svelte';
	import SmartImage from '$lib/components/ui/SmartImage.svelte';
	import type { GalleryItem } from '$lib/server/db';

	let { items = [] }: { items: GalleryItem[] } = $props();
	const gallery = $derived(items);

	let lightboxOpen = $state(false);
	let activeImage = $state(0);

	// Generate placeholder gradient backgrounds for gallery items
	const gradients = [
		'from-sapala-sky/40 to-sapala-primary/40',
		'from-sapala-earth/40 to-sapala-brown/40',
		'from-sapala-primary/40 to-sapala-dark/40',
		'from-green-500/40 to-green-700/40',
		'from-sapala-deep/40 to-sapala-sky/40',
		'from-sapala-sky/30 to-sapala-earth/30',
		'from-sapala-red/30 to-sapala-earth/30',
		'from-sapala-primary/30 to-sapala-deep/30',
		'from-green-400/30 to-sapala-sky/30',
		'from-sapala-earth/30 to-sapala-brown/30'
	];

	function openLightbox(index: number) {
		activeImage = index;
		lightboxOpen = true;
		document.body.style.overflow = 'hidden';
	}

	function closeLightbox() {
		lightboxOpen = false;
		document.body.style.overflow = '';
	}

	function nextImage() {
		activeImage = (activeImage + 1) % gallery.length;
	}

	function prevImage() {
		activeImage = (activeImage - 1 + gallery.length) % gallery.length;
	}

	function stopPropagation(e: Event) {
		e.stopPropagation();
	}

	onMount(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (!lightboxOpen) return;
			if (e.key === 'Escape') closeLightbox();
			if (e.key === 'ArrowRight') nextImage();
			if (e.key === 'ArrowLeft') prevImage();
		};
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	});
</script>


<section id="galeri" class="relative overflow-hidden bg-sapala-inkdeep py-16 text-white md:py-28">
	<div class="absolute right-0 top-0 h-96 w-96 rounded-full bg-sapala-primary/20 blur-3xl"></div>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="relative mb-14 scroll-reveal">
			<p class="goal-label text-sapala-earth">03 / ARSIP PERJALANAN</p>
			<h2 class="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl md:text-6xl">Momen yang tidak kami tinggalkan di gunung.</h2>
			<p class="mt-5 max-w-xl text-base leading-relaxed text-white/65">Setiap dokumentasi adalah pengingat: alam bukan latar, ia adalah guru.</p>
		</div>

		<!-- Masonry Grid -->
		<div class="grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-3 md:gap-4 lg:grid-cols-4">
			{#each gallery as item, i}
				<div
					class="scroll-reveal group relative overflow-hidden border border-white/10 cursor-pointer {item.span}"
					style="animation-delay: {i * 60}ms"
					onclick={() => openLightbox(i)}
					role="button"
					tabindex="0"
					onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); } }}
				>
					<!-- Photo (lazy) with graceful gradient fallback -->
					<SmartImage src={item.src} alt={item.alt} gradient={gradients[i % gradients.length]} label={item.alt} class="absolute inset-0 h-full w-full" />
					<span class="absolute bottom-2 left-2 inline-flex h-8 items-center gap-1 border border-white/30 bg-sapala-inkdeep/70 px-2 text-[10px] font-bold text-white backdrop-blur sm:hidden"><ZoomIn class="h-3 w-3 text-sapala-earth" /> Buka</span>

					<!-- Hover Overlay -->
					<div
						class="absolute inset-0 bg-sapala-ink/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
					>
						<div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
							<ZoomIn class="w-8 h-8 text-sapala-primary mx-auto mb-2" />
							<p class="text-white text-sm font-medium">{item.alt}</p>
							<p class="text-sapala-primary text-xs mt-1">{item.category}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Lightbox -->
	{#if lightboxOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
			onclick={closeLightbox}
			role="button"
			tabindex="0"
			onkeydown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') closeLightbox(); }}
			transition:fade={{ duration: 200 }}
		>
			<!-- Close Button -->
			<button
				onclick={closeLightbox}
				class="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
				aria-label="Close"
			>
				<X class="w-6 h-6" />
			</button>

			<!-- Navigation -->
			<button
				onclick={(e) => { stopPropagation(e); prevImage(); }}
				class="absolute left-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
				aria-label="Previous"
			>
				<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			<button
				onclick={(e) => { stopPropagation(e); nextImage(); }}
				class="absolute right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
				aria-label="Next"
			>
				<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>

			<!-- Image -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="max-w-4xl max-h-[80vh] w-full" onclick={stopPropagation} onkeydown={stopPropagation} role="button" tabindex="0">
				<SmartImage
					src={gallery[activeImage].src}
					alt={gallery[activeImage].alt}
					gradient={gradients[activeImage % gradients.length]}
					label="{gallery[activeImage].alt} · {gallery[activeImage].category}"
					class="h-[60vh] w-full rounded-2xl md:h-[70vh]"
				/>
				<p class="text-center text-sapala-ink/50 text-sm mt-4">
					{activeImage + 1} / {gallery.length}
				</p>
			</div>
		</div>
	{/if}
</section>
