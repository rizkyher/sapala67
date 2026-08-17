<script lang="ts">
	import { ArrowUpRight, Compass, Mountain, Sprout, Waves } from 'lucide-svelte';

	const routes = [
		{
			label: 'Latih diri',
			kicker: 'POS 01 · PEMBINAAN',
			title: 'Berani dimulai dari persiapan.',
			description: 'Diksar, MABIM, dan latihan rutin membangun teknik, mental, serta disiplin sebelum bertemu medan.',
			href: '/kegiatan',
			cta: 'Lihat jalur latihan',
			icon: Mountain
		},
		{
			label: 'Jelajah alam',
			kicker: 'POS 02 · EKSPLORASI',
			title: 'Membaca alam, bukan sekadar melintasinya.',
			description: 'Pendakian, arung jeram, dan navigasi menjadi ruang belajar untuk menjaga kawan sekaligus menghormati alam.',
			href: '/kegiatan',
			cta: 'Jelajahi kegiatan',
			icon: Waves
		},
		{
			label: 'Tinggalkan jejak',
			kicker: 'POS 03 · PENGABDIAN',
			title: 'Pulang membawa dampak baik.',
			description: 'Konservasi dan pengabdian mengubah pengalaman di alam menjadi tindakan nyata untuk lingkungan dan masyarakat.',
			href: '/goal',
			cta: 'Tetapkan tujuanmu',
			icon: Sprout
		}
	];

	let active = $state(0);
	let selected = $derived(routes[active]);
	let ActiveIcon = $derived(selected.icon);
</script>

<section id="kompas-perjalanan" class="relative overflow-hidden bg-sapala-inkdeep py-16 text-white md:py-24" aria-labelledby="expedition-title">
	<div class="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(139,203,238,.8)_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true"></div>
	<div class="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-sapala-sky/25" aria-hidden="true"></div>
	<div class="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:px-8">
		<div>
			<div class="flex items-center gap-3 text-sapala-sky"><Compass class="h-5 w-5" /><p class="goal-label">KOMPAS PERJALANAN</p></div>
			<h2 id="expedition-title" class="mt-5 max-w-xl font-heading text-4xl font-bold leading-tight sm:text-5xl">Pilih jalur. Temukan cara <span class="text-sapala-earth">berjejak.</span></h2>
			<p class="mt-5 max-w-lg text-base leading-7 text-white/70">Setiap perjalanan SAPALA dimulai dari pembinaan dan berakhir sebagai pengabdian. Ketuk satu pos untuk mengenali medannya.</p>

			<div class="relative mt-8 flex gap-0" role="tablist" aria-label="Jalur perjalanan SAPALA 67">
				<div class="absolute left-5 right-5 top-5 h-px bg-white/20" aria-hidden="true"></div>
				{#each routes as route, index}
					<button
						class="relative z-10 flex flex-1 flex-col items-start gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapala-earth focus-visible:ring-offset-4 focus-visible:ring-offset-sapala-inkdeep"
						onclick={() => (active = index)}
						role="tab"
						aria-selected={active === index}
						aria-controls="route-panel"
						id={`route-tab-${index}`}
					>
						<span class="grid h-10 w-10 place-items-center rounded-full border transition duration-200 {active === index ? 'border-sapala-earth bg-sapala-earth text-sapala-inkdeep shadow-[0_0_0_6px_rgba(232,154,94,.16)]' : 'border-white/30 bg-sapala-inkdeep text-white/70 hover:border-sapala-sky hover:text-sapala-sky'}">{index + 1}</span>
						<span class="pr-2 text-xs font-semibold leading-5 text-white/80">{route.label}</span>
					</button>
				{/each}
			</div>
		</div>

		<div id="route-panel" role="tabpanel" aria-labelledby={`route-tab-${active}`} class="relative self-center border-l border-sapala-earth/60 pl-6 sm:pl-8">
			<ActiveIcon class="h-7 w-7 text-sapala-earth" />
			<p class="mt-5 goal-label text-sapala-sky">{selected.kicker}</p>
			<h3 class="mt-3 max-w-xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">{selected.title}</h3>
			<p class="mt-5 max-w-xl text-base leading-8 text-white/70">{selected.description}</p>
			<a href={selected.href} class="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-sapala-earth pb-2 text-sm font-bold text-sapala-earth transition hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{selected.cta}<ArrowUpRight class="h-4 w-4" /></a>
		</div>
	</div>
</section>
