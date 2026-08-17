<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowDownRight, Compass, Mountain, Sprout } from 'lucide-svelte';
	import { siteData } from '$lib/data/site';

	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});
</script>

<section id="beranda" class="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-sapala-inkdeep pb-7 pt-24 text-white md:items-center md:py-28">
	<img src="/images/sapala-ridge-dawn.png" alt="Tiga pegiat alam menatap pegunungan saat fajar" class="absolute inset-0 -z-20 h-full w-full object-cover object-[62%_center]" />
	<div class="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,24,42,.93)_0%,rgba(7,24,42,.75)_39%,rgba(7,24,42,.2)_72%,rgba(7,24,42,.35)_100%)]"></div>
	<div class="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-sapala-inkdeep via-sapala-inkdeep/25 to-transparent"></div>
	<div class="absolute right-[-4rem] top-28 -z-10 h-48 w-48 rounded-full border border-sapala-sky/30 sm:hidden" aria-hidden="true"></div>
	<div class="absolute left-[48%] top-20 hidden h-28 w-px bg-white/30 md:block" aria-hidden="true"></div>

	<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="max-w-3xl">
			{#if mounted}
				<div class="flex items-center gap-3"><img src="/logo.png" alt="Lambang SAPALA 67" class="h-12 w-12 rounded-full border border-white/35 bg-white/90 p-1" /><p class="hero-kicker"><Compass class="h-4 w-4" /> SAPALA 67 · SANTRI PECINTA ALAM</p></div>
				<h1 class="mt-6 font-heading text-5xl font-bold leading-[.95] tracking-tight sm:text-6xl md:text-8xl">SAPALA<br /><span class="text-sapala-earth">67</span> <span class="text-3xl text-white sm:text-4xl md:text-5xl">MEMANGGIL.</span></h1>
				<p class="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-relaxed md:mt-7 md:text-xl">Komunitas santri pecinta alam dari Tasikmalaya. Kami berlatih, menjaga, dan meninggalkan jejak yang lebih baik untuk bumi.</p>
				<div class="mt-8 flex flex-col gap-2 sm:mt-9 sm:flex-row sm:gap-3">
					<a href="/goal" class="hero-primary"><Sprout class="h-5 w-5" /> Tetapkan Jejakmu <ArrowDownRight class="h-5 w-5" /></a>
					<a href="/kegiatan" class="hero-link">Lihat medan kegiatan <ArrowDownRight class="h-4 w-4" /></a>
				</div>
				<a href="#kompas-perjalanan" class="mt-2 inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-sapala-sky transition hover:text-sapala-earth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"><Compass class="h-4 w-4 text-sapala-earth" />Peta perjalanan <ArrowDownRight class="h-4 w-4" /></a>
			{/if}
		</div>

		<div class="mt-10 grid max-w-2xl grid-cols-3 divide-x divide-white/20 border-y border-white/20 py-4 sm:mt-16 sm:border-t sm:border-b-0 sm:pt-6 md:absolute md:bottom-10 md:right-8 md:w-[30rem] md:divide-x-0 md:border-l md:border-y-0 md:pl-7 md:pt-0 lg:right-16">
			<div class="pr-2 md:pr-0"><p class="font-heading text-2xl text-sapala-earth sm:text-3xl">{siteData.memberCount}</p><p class="mt-1 text-[9px] font-bold uppercase tracking-[.12em] text-white/60 sm:text-[10px] sm:tracking-[.16em]">Anggota aktif</p></div>
			<div class="px-3 md:px-0"><p class="font-heading text-2xl text-sapala-earth sm:text-3xl">22</p><p class="mt-1 text-[9px] font-bold uppercase tracking-[.12em] text-white/60 sm:text-[10px] sm:tracking-[.16em]">Tahun berjejak</p></div>
			<div class="pl-3 md:pl-0"><p class="font-heading text-2xl text-sapala-earth sm:text-3xl">∞</p><p class="mt-1 text-[9px] font-bold uppercase tracking-[.12em] text-white/60 sm:text-[10px] sm:tracking-[.16em]">Pengabdian</p></div>
		</div>
	</div>
	<a href="#tentang" class="absolute bottom-8 right-5 hidden items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/70 transition hover:text-sapala-earth lg:flex"><span class="writing-mode-vertical">Turun untuk mengenal</span><Mountain class="h-4 w-4" /></a>
</section>
