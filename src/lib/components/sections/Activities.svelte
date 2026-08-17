<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { Mountain, Waves, ArrowUpToLine, Heart, Sword, Search, Users, TreePine, ChevronRight, X, Tag } from 'lucide-svelte';
	import { activities } from '$lib/data/site';
	import SmartImage from '$lib/components/ui/SmartImage.svelte';

	type Activity = (typeof activities)[number];
	type Category = 'Semua' | 'Diklat' | 'Ekspedisi' | 'Pengabdian' | 'Latihan' | 'Konservasi';

	let activeFilter = $state<Category>('Semua');
	let selected = $state<Activity | null>(null);

	const filteredActivities: Activity[] = $derived(
		activeFilter === 'Semua' ? activities : activities.filter((a) => a.category === activeFilter)
	);

	const filters: Category[] = ['Semua', 'Diklat', 'Ekspedisi', 'Pengabdian', 'Latihan', 'Konservasi'];

	const iconMap: Record<string, typeof Mountain> = {
		'Pendidikan Dasar (Diksar)': Users,
		'Pendakian Gunung': Mountain,
		'Arung Jeram': Waves,
		'Bakti Sosial': Heart,
		'Wall Climbing': ArrowUpToLine,
		'SAR & Pertolongan Pertama': Search,
		'Bimbingan (MABIM)': Sword,
		Penghijauan: TreePine
	};

	const categoryColors: Record<string, string> = {
		Diklat: 'bg-sapala-sky/15 border-sapala-sky/40 text-sapala-primary',
		Ekspedisi: 'bg-sapala-primary/15 border-sapala-primary/30 text-sapala-primary',
		Pengabdian: 'bg-sapala-clay/15 border-sapala-clay/30 text-sapala-clay',
		Latihan: 'bg-green-600/15 border-green-600/30 text-green-700',
		Konservasi: 'bg-green-700/15 border-green-700/30 text-green-800'
	};

	const gradients = [
		'from-sapala-sky/40 to-sapala-primary/40',
		'from-sapala-earth/40 to-sapala-clay/40',
		'from-green-500/40 to-green-700/40',
		'from-sapala-primary/40 to-sapala-ink/40'
	];

	function open(a: Activity) {
		selected = a;
		document.body.style.overflow = 'hidden';
	}
	function close() {
		selected = null;
		document.body.style.overflow = '';
	}
</script>


<section id="kegiatan" class="relative overflow-hidden bg-sapala-inkdeep py-16 text-white md:py-28">
	<div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(139,203,238,.16),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(237,158,91,.12),transparent_28%)]"></div>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="relative scroll-reveal mb-12 max-w-3xl">
			<span class="hero-kicker mb-5"><Tag class="h-3.5 w-3.5" /> 02 / MEDAN LATIHAN</span>
			<h2 class="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-6xl">Tidak ada karakter tangguh yang lahir dari <span class="text-sapala-earth">zona nyaman.</span></h2>
			<p class="mt-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">Latihan, ekspedisi, dan pengabdian kami dirancang untuk membuat setiap anggota siap di medan dan berguna saat kembali ke masyarakat.</p>
		</div>

		<!-- Filter -->
		<div class="scroll-reveal mb-10 flex flex-wrap gap-2 sm:mb-12 sm:justify-center" role="group" aria-label="Filter kegiatan">
			{#each filters as filter}
				<button
					onclick={() => (activeFilter = filter)}
					class="min-h-11 touch-manipulation rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 active:scale-95 {activeFilter === filter
						? 'bg-sapala-earth text-sapala-inkdeep shadow-lg shadow-sapala-earth/20'
						: 'border border-white/15 bg-white/5 text-white/70 hover:bg-white/15 hover:text-white'}"
					aria-pressed={activeFilter === filter}
				>
					{filter}
				</button>
			{/each}
		</div>

		<!-- Grid -->
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each filteredActivities as activity, i (activity.title)}
				{@const Icon = iconMap[activity.title] || Mountain}
				<button class="scroll-reveal group block text-left" style="animation-delay: {i * 80}ms" onclick={() => open(activity)}>
					<div class="h-full overflow-hidden border border-white/10 bg-white text-sapala-ink transition-all duration-300 hover:-translate-y-1 hover:border-sapala-earth hover:shadow-lift">
						<SmartImage src={activity.image} alt={activity.title} gradient={gradients[i % gradients.length]} label={activity.category} class="h-36 w-full" />
						<div class="p-6">
							<div class="mb-4 flex items-center gap-3">
								<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-sapala-primary/10 text-sapala-primary">
									<Icon class="h-6 w-6" />
								</div>
								<span class="rounded-full border px-2.5 py-1 text-xs font-medium {categoryColors[activity.category] || 'border-sapala-ink/10 bg-sapala-parchment text-sapala-ink/70'}">{activity.category}</span>
							</div>
							<h3 class="mb-2 font-heading text-lg font-semibold text-sapala-ink transition-colors group-hover:text-sapala-primary">{activity.title}</h3>
							<p class="mb-4 line-clamp-2 text-sm leading-relaxed text-sapala-ink/60">{activity.description}</p>
							<span class="mt-1 flex min-h-11 items-center gap-1 text-sm font-medium text-sapala-primary opacity-100 transition-opacity duration-300 sm:mt-0 sm:min-h-0 sm:opacity-0 sm:group-hover:opacity-100">Selengkapnya <ChevronRight class="h-4 w-4" /></span>
						</div>
					</div>
				</button>
			{/each}
		</div>
	</div>
</section>

<svelte:window onkeydown={(e) => { if (e.key === 'Escape') close(); }} />

<!-- Detail modal -->
{#if selected}
	{@const Icon = iconMap[selected.title] || Mountain}
	<div class="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={selected.title} transition:fade={{ duration: 200 }}>
		<button class="absolute inset-0 bg-sapala-inkdeep/70 backdrop-blur-sm" aria-label="Tutup" onclick={close}></button>
		<div class="relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl bg-sapala-cream shadow-emblem" data-lenis-prevent transition:scale={{ duration: 250, start: 0.95 }}>
			<SmartImage src={selected.image} alt={selected.title} label={selected.category} class="h-52 w-full" />
			<button onclick={close} class="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-sapala-ink shadow-sm transition-colors hover:bg-white" aria-label="Tutup">
				<X class="h-5 w-5" />
			</button>
			<div class="p-6">
				<div class="mb-3 flex items-center gap-3">
					<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-sapala-primary/10 text-sapala-primary">
						<Icon class="h-6 w-6" />
					</div>
					<span class="rounded-full border px-2.5 py-1 text-xs font-medium {categoryColors[selected.category] || 'border-sapala-ink/10 bg-sapala-parchment text-sapala-ink/70'}">{selected.category}</span>
				</div>
				<h3 class="mb-2 font-heading text-2xl font-bold text-sapala-ink">{selected.title}</h3>
				<p class="leading-relaxed text-sapala-ink/75">{selected.description}</p>
				<p class="mt-4 border-t border-sapala-ink/10 pt-4 text-sm text-sapala-ink/55">
					Ingin ikut serta dalam kegiatan ini? Hubungi pengurus melalui halaman
					<a href="/#kontak" onclick={close} class="font-medium text-sapala-primary hover:underline">Kontak</a>.
				</p>
			</div>
		</div>
	</div>
{/if}
