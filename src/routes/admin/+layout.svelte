<script lang="ts">
	import '../../styles/app.css';
	import { page } from '$app/stores';
	import { LayoutDashboard, Newspaper, Image, CalendarDays, Inbox, LogOut, ExternalLink } from 'lucide-svelte';

	let { data, children } = $props();

	const nav = [
		{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
		{ href: '/admin/articles', label: 'Artikel', icon: Newspaper },
		{ href: '/admin/gallery', label: 'Galeri', icon: Image },
		{ href: '/admin/events', label: 'Agenda', icon: CalendarDays },
		{ href: '/admin/messages', label: 'Pesan', icon: Inbox }
	];

	const isActive = (href: string, exact = false) =>
		exact ? $page.url.pathname === href : $page.url.pathname.startsWith(href);

	const showChrome = $derived(!!data.user);
</script>

{#if showChrome}
	<div class="flex min-h-screen bg-sapala-parchment text-sapala-ink">
		<!-- Sidebar -->
		<aside class="hidden w-64 flex-shrink-0 flex-col border-r border-sapala-ink/10 bg-sapala-inkdeep text-sapala-cream md:flex">
			<div class="flex items-center gap-3 border-b border-white/10 px-5 py-5">
				<img src="/logo.png" alt="SAPALA 67" class="h-10 w-10 rounded-full ring-2 ring-white/20" />
				<div>
					<p class="font-heading text-sm font-bold text-white">SAPALA 67</p>
					<p class="text-[10px] tracking-widest text-sapala-sky">PANEL ADMIN</p>
				</div>
			</div>
			<nav class="flex-1 space-y-1 p-3">
				{#each nav as item}
					<a
						href={item.href}
						class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors {isActive(item.href, item.exact)
							? 'bg-white/10 text-white'
							: 'text-sapala-cream/70 hover:bg-white/5 hover:text-white'}"
					>
						<item.icon class="h-4 w-4" />
						{item.label}
						{#if item.label === 'Pesan' && data.unread > 0}
							<span class="ml-auto rounded-full bg-sapala-red px-2 py-0.5 text-[10px] font-bold text-white">{data.unread}</span>
						{/if}
					</a>
				{/each}
			</nav>
			<div class="space-y-1 border-t border-white/10 p-3">
				<a href="/" target="_blank" class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sapala-cream/70 transition-colors hover:bg-white/5 hover:text-white">
					<ExternalLink class="h-4 w-4" /> Lihat Situs
				</a>
				<form method="POST" action="/admin/logout">
					<button class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sapala-cream/70 transition-colors hover:bg-sapala-red hover:text-white">
						<LogOut class="h-4 w-4" /> Keluar
					</button>
				</form>
			</div>
		</aside>

		<!-- Main -->
		<div class="flex min-w-0 flex-1 flex-col">
			<header class="sticky top-0 z-40 flex items-center justify-between border-b border-sapala-ink/10 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
				<div class="flex items-center gap-2">
					<img src="/logo.png" alt="SAPALA 67" class="h-9 w-9 rounded-full" />
					<div><span class="block font-heading text-sm font-bold">Panel Admin</span><span class="block text-[9px] font-bold tracking-[.16em] text-sapala-clay">SAPALA 67</span></div>
				</div>
				<div class="flex items-center gap-1"><a href="/" target="_blank" class="flex h-11 w-11 items-center justify-center rounded-xl text-sapala-ink/70 hover:bg-sapala-ink/5" aria-label="Lihat situs"><ExternalLink class="h-5 w-5" /></a><form method="POST" action="/admin/logout"><button class="flex h-11 w-11 items-center justify-center rounded-xl text-sapala-ink/70 hover:bg-sapala-red/10 hover:text-sapala-red" aria-label="Keluar"><LogOut class="h-5 w-5" /></button></form></div>
			</header>

			<!-- Mobile nav -->
			<nav aria-label="Navigasi admin" class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-sapala-ink/10 bg-white/95 px-1 pb-[max(.4rem,env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-8px_24px_rgba(7,24,42,.08)] backdrop-blur md:hidden">
				{#each nav as item}
					<a href={item.href} class="relative flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-semibold transition-colors {isActive(item.href, item.exact) ? 'bg-sapala-ink text-white shadow-sm' : 'text-sapala-ink/60 hover:bg-sapala-ink/5'}" aria-current={isActive(item.href, item.exact) ? 'page' : undefined}><item.icon class="h-4 w-4" />{item.label}{#if item.label === 'Pesan' && data.unread > 0}<span class="absolute right-2 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-sapala-red px-1 text-[9px] font-bold text-white">{data.unread}</span>{/if}</a>
				{/each}
			</nav>

			<main class="flex-1 p-4 pb-24 sm:p-5 sm:pb-24 md:p-8">
				{@render children()}
			</main>
		</div>
	</div>
{:else}
	<div class="min-h-screen bg-sapala-inkdeep">
		{@render children()}
	</div>
{/if}
