<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { ArrowUpRight, Compass, Menu, Mountain, X } from 'lucide-svelte';
	import { navLinks, siteData } from '$lib/data/site';
	import { page } from '$app/state';

	let mobileOpen = $state(false);
	const isActive = (href: string) => href === '/' ? page.url.pathname === '/' : page.url.pathname === href;
</script>

<nav
	class="fixed left-0 right-0 top-0 z-50 border-b border-sapala-ink/10 bg-sapala-cream/90 py-3 shadow-sm backdrop-blur-md"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<a href="/" class="group flex min-w-0 items-center gap-3">
				<div class="h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-sapala-ink/15 transition-all duration-300 group-hover:ring-sapala-red/50">
					<img src="/logo.png" alt="Logo SAPALA 67" class="h-full w-full object-cover" />
				</div>
				<div class="flex min-w-0 flex-col leading-tight">
					<span class="font-heading text-lg font-bold text-sapala-ink md:text-xl">SAPALA 67</span>
					<span class="truncate text-[9px] font-semibold tracking-[0.16em] text-sapala-deep sm:text-[10px] sm:tracking-[0.2em] md:text-xs">SANTRI PECINTA ALAM</span>
				</div>
			</a>

			<!-- Desktop Nav -->
			<div class="hidden items-center gap-1 lg:flex">
				{#each navLinks as link}
					<a
						href={link.href}
						class="rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 xl:px-4 {isActive(link.href)
							? 'bg-sapala-red/10 text-sapala-red'
							: 'text-sapala-ink/70 hover:bg-sapala-ink/5 hover:text-sapala-ink'}"
					>
						{link.label}
					</a>
				{/each}
			</div>

			<!-- Mobile Toggle -->
			<button
				onclick={() => (mobileOpen = !mobileOpen)}
				class="ml-3 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sapala-ink/10 bg-white text-sapala-ink shadow-sm transition-colors hover:bg-sapala-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapala-red focus-visible:ring-offset-2 lg:hidden"
				aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
				aria-expanded={mobileOpen}
				aria-controls="mobile-navigation"
			>
				{#if mobileOpen}
					<X class="h-6 w-6" />
				{:else}
					<Menu class="h-6 w-6" />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if mobileOpen}
		<div
			id="mobile-navigation"
			class="absolute left-0 right-0 top-full border-t border-sapala-ink/10 bg-sapala-cream shadow-[0_18px_28px_rgba(7,24,42,0.16)] lg:hidden"
			transition:fade={{ duration: 180 }}
		>
			<div data-lenis-prevent class="mx-auto max-h-[calc(100dvh-68px)] max-w-7xl overflow-y-auto px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 sm:px-6">
				<div class="mb-5 flex items-end justify-between border-b border-sapala-ink/10 pb-4">
					<div><p class="text-[10px] font-bold uppercase tracking-[0.2em] text-sapala-clay">PETA JELAJAH</p><p class="mt-1 font-serif text-xl font-semibold text-sapala-ink">Pilih arah perjalananmu.</p></div>
					<Compass class="mb-1 h-6 w-6 text-sapala-red" aria-hidden="true" />
				</div>
				<nav aria-label="Navigasi seluler" class="flex flex-col gap-1">
				{#each navLinks as link, i}
					<a
						href={link.href}
						onclick={() => (mobileOpen = false)}
						class="flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors {isActive(link.href)
							? 'bg-sapala-red text-white shadow-sm'
							: 'text-sapala-ink hover:bg-sapala-ink/5'}"
						aria-current={isActive(link.href) ? 'page' : undefined}
						transition:slide={{ delay: i * 35, duration: 180 }}
					>
						{link.label}
						<span aria-hidden="true" class="text-sm opacity-60">0{i + 1}</span>
					</a>
				{/each}
				</nav>
				<a href="/goal" onclick={() => (mobileOpen = false)} class="mt-5 flex min-h-16 items-center justify-between border border-sapala-inkdeep bg-sapala-inkdeep px-4 py-3 text-white transition hover:bg-sapala-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapala-red focus-visible:ring-offset-2">
					<span class="flex items-center gap-3"><span class="grid h-9 w-9 place-items-center rounded-full border border-sapala-sky/40 text-sapala-sky"><Mountain class="h-4 w-4" /></span><span><span class="block text-[10px] font-bold uppercase tracking-[0.16em] text-sapala-sky">MULAI SEKARANG</span><span class="mt-0.5 block text-sm font-semibold">Tetapkan jejakmu</span></span></span>
					<ArrowUpRight class="h-5 w-5 text-sapala-earth" />
				</a>
			</div>
		</div>
	{/if}
</nav>
