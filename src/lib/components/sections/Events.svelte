<script lang="ts">
	import { CalendarDays, MapPin, ArrowRight } from 'lucide-svelte';
	import SmartImage from '$lib/components/ui/SmartImage.svelte';
	import type { EventItem } from '$lib/server/db';

	let { items = [] }: { items: EventItem[] } = $props();

	const gradients = [
		'from-sapala-sky/40 to-sapala-primary/40',
		'from-sapala-earth/40 to-sapala-clay/40',
		'from-green-500/40 to-green-700/40'
	];

	const categoryColors: Record<string, string> = {
		Diklat: 'bg-sapala-sky/15 border-sapala-sky/40 text-sapala-primary',
		Ekspedisi: 'bg-sapala-primary/15 border-sapala-primary/30 text-sapala-primary',
		Pengabdian: 'bg-sapala-clay/15 border-sapala-clay/30 text-sapala-clay',
		Latihan: 'bg-green-600/15 border-green-600/30 text-green-700'
	};

	function fmt(d: string) {
		if (!d) return '';
		try {
			return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
		} catch {
			return d;
		}
	}

	function range(e: EventItem) {
		return e.end_date && e.end_date !== e.start_date ? `${fmt(e.start_date)} – ${fmt(e.end_date)}` : fmt(e.start_date);
	}
</script>

<section id="agenda" class="relative overflow-hidden bg-sapala-cream py-16 md:py-32">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="scroll-reveal mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
			<div><p class="goal-label text-sapala-clay">04 / TITIK KUMPUL</p><h2 class="mt-3 font-heading text-3xl font-bold text-sapala-ink sm:text-4xl md:text-5xl">Agenda yang segera jadi jejak.</h2></div>
			<p class="max-w-sm text-sm leading-relaxed text-sapala-ink/60">Tentukan langkah berikutnya, catat tanggalnya, dan datang dengan kesiapan.</p>
		</div>

		{#if items.length}
			<div class="grid gap-6 md:grid-cols-3">
				{#each items as ev, i}
					<a href="/event/{ev.slug}" class="scroll-reveal group block" style="animation-delay: {i * 80}ms">
						<div class="glass-card h-full overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-sapala-primary/30 hover:shadow-lift">
							<SmartImage src={ev.image} alt={ev.title} gradient={gradients[i % gradients.length]} label={ev.category} class="h-44 w-full" />
							<div class="p-6">
								<span class="rounded-full border px-2.5 py-1 text-xs font-medium {categoryColors[ev.category] || 'border-sapala-ink/10 bg-sapala-parchment text-sapala-ink/70'}">{ev.category}</span>
								<h3 class="mt-3 font-heading text-lg font-semibold text-sapala-ink transition-colors group-hover:text-sapala-primary">{ev.title}</h3>
								<p class="mt-2 line-clamp-2 text-sm leading-relaxed text-sapala-ink/65">{ev.description}</p>
								<div class="mt-4 space-y-1.5 text-xs text-sapala-ink/60">
									<p class="flex items-center gap-1.5"><CalendarDays class="h-3.5 w-3.5 text-sapala-primary" />{range(ev)}</p>
									{#if ev.location}<p class="flex items-center gap-1.5"><MapPin class="h-3.5 w-3.5 text-sapala-primary" />{ev.location}</p>{/if}
								</div>
								<span class="mt-3 flex min-h-11 items-center gap-1 text-sm font-medium text-sapala-primary opacity-100 transition-opacity sm:mt-4 sm:min-h-0 sm:opacity-0 sm:group-hover:opacity-100">Detail <ArrowRight class="h-4 w-4" /></span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<p class="py-8 text-center text-sm text-sapala-ink/50">Belum ada agenda yang dijadwalkan.</p>
		{/if}
	</div>
</section>
