<script lang="ts">
	import { GraduationCap, Search, UserRound } from 'lucide-svelte';
	import { alumni } from '$lib/data/site';

	let query = $state('');
	let activeYear = $state<string>('Semua');

	const years = ['Semua', ...Array.from(new Set(alumni.map((a) => a.year))).sort()];

	const filtered = $derived(
		alumni.filter((a) => {
			const matchYear = activeYear === 'Semua' || a.year === activeYear;
			const q = query.trim().toLowerCase();
			const matchQuery =
				!q || a.name.toLowerCase().includes(q) || a.profession.toLowerCase().includes(q);
			return matchYear && matchQuery;
		})
	);

	function initials(name: string) {
		return name
			.replace(/(Drs\.|Dr\.|Ir\.|Hj\.|H\.|Capt\.|S\.Pd|S\.Kom|M\.Sc|M\.Pi|M\.Ag)/g, '')
			.trim()
			.split(/\s+/)
			.slice(0, 2)
			.map((w) => w[0])
			.join('')
			.toUpperCase();
	}
</script>

<section id="alumni" class="relative overflow-hidden bg-gradient-to-b from-sapala-cream via-sapala-parchment to-sapala-cream py-24 md:py-32">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="scroll-reveal mb-12 text-center">
			<span class="eyebrow mb-4"><GraduationCap class="h-3.5 w-3.5" /> Keluarga Besar</span>
			<h2 class="section-heading mb-4">Alumni SAPALA 67</h2>
			<p class="section-subheading">
				Keanggotaan SAPALA 67 berlaku seumur hidup — para alumni tetap menjadi bagian dari keluarga besar.
			</p>
		</div>

		<!-- Controls -->
		<div class="scroll-reveal mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
			<div class="relative w-full sm:max-w-xs">
				<Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sapala-ink/40" />
				<input
					type="text"
					bind:value={query}
					placeholder="Cari nama atau profesi…"
					class="w-full rounded-full border border-sapala-ink/15 bg-white py-2.5 pl-10 pr-4 text-sm text-sapala-ink placeholder-sapala-ink/40 shadow-sm transition-all focus:border-sapala-primary/50 focus:outline-none focus:ring-1 focus:ring-sapala-primary/30"
				/>
			</div>
			<div class="flex flex-wrap justify-center gap-2">
				{#each years as year}
					<button
						onclick={() => (activeYear = year)}
						class="rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-300 {activeYear === year
							? 'bg-sapala-primary text-white shadow-sm'
							: 'border border-sapala-ink/10 bg-white text-sapala-ink/70 hover:bg-sapala-ink/5'}"
					>
						{year === 'Semua' ? 'Semua' : `Angkatan ${year}`}
					</button>
				{/each}
			</div>
		</div>

		<!-- Grid -->
		{#if filtered.length}
			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{#each filtered as person}
					<div class="paper-card flex items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sapala-primary/30">
						<div class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sapala-primary to-sapala-deep font-heading text-base font-bold text-white">
							{initials(person.name)}
						</div>
						<div class="min-w-0">
							<p class="truncate font-heading text-sm font-semibold text-sapala-ink">{person.name}</p>
							<p class="mt-0.5 truncate text-xs text-sapala-ink/60">{person.profession}</p>
							<span class="mt-1 inline-block rounded-full bg-sapala-clay/10 px-2 py-0.5 text-[10px] font-medium text-sapala-clay">
								Angkatan {person.year}
							</span>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="flex flex-col items-center gap-3 py-12 text-center text-sapala-ink/50">
				<UserRound class="h-10 w-10" />
				<p class="text-sm">Tidak ada alumni yang cocok dengan pencarian.</p>
			</div>
		{/if}
	</div>
</section>
