<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';

	let { eyebrow, title, description, backHref = '/' }: { eyebrow: string; title: string; description: string; backHref?: string } = $props();
</script>

<section class="relative isolate overflow-hidden bg-sapala-inkdeep pb-12 pt-28 text-sapala-cream sm:pb-16 sm:pt-36 md:pb-24">
	<img src="/images/sapala-ridge-dawn.png" alt="" class="absolute inset-0 -z-20 h-full w-full object-cover object-[68%_55%] opacity-55" />
	<div class="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,24,42,.96),rgba(7,24,42,.77),rgba(7,24,42,.32))]"></div>
	<div class="absolute inset-0 -z-10 opacity-30" aria-hidden="true">
		<div class="absolute -left-24 top-10 h-72 w-72 rounded-full border border-sapala-sky/40"></div>
		<div class="absolute right-[10%] top-0 h-96 w-96 rounded-full border border-sapala-earth/30"></div>
		<svg viewBox="0 0 1440 300" class="absolute bottom-0 h-40 w-full" preserveAspectRatio="none">
			<path d="M0,300 L0,180 L200,110 L390,210 L650,75 L850,195 L1090,95 L1280,180 L1440,120 L1440,300 Z" fill="#163A5F" />
		</svg>
	</div>
	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<a href={backHref} class="mb-6 inline-flex min-h-11 items-center gap-2 text-sm text-sapala-sky transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white sm:mb-8"><ArrowLeft class="h-4 w-4" /> Kembali ke beranda</a>
		<div class="mb-4 flex flex-wrap items-center gap-3"><img src="/logo.png" alt="Lambang SAPALA 67" class="h-9 w-9 rounded-full border border-white/30 bg-white/90 p-0.5" /><p class="text-[10px] font-bold uppercase tracking-[0.18em] text-sapala-earth sm:text-xs sm:tracking-[0.28em]">SAPALA 67 · {eyebrow}</p></div>
		<h1 class="max-w-4xl font-heading text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">{title}</h1>
		<p class="mt-5 max-w-2xl text-base leading-relaxed text-sapala-cream/70 sm:mt-6 md:text-lg">{description}</p>
	</div>
</section>
