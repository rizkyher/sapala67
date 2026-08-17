<script lang="ts">
	import { MapPin, Mail, Phone, Instagram, Youtube, MessageCircle, Heart, ArrowUp, Compass } from 'lucide-svelte';
	import { siteData, navLinks } from '$lib/data/site';

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<footer class="relative bg-sapala-inkdeep text-sapala-cream">
	<!-- Mountain ridge cap -->
	<div class="absolute -top-px left-0 right-0 h-10 overflow-hidden leading-none">
		<svg viewBox="0 0 1440 60" class="h-full w-full" preserveAspectRatio="none">
			<path d="M0,60 L0,30 L240,5 L480,35 L720,8 L960,38 L1200,10 L1440,32 L1440,60 Z" fill="#0E2740" />
		</svg>
	</div>

	<!-- Main Footer -->
	<div class="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
			<!-- Brand -->
			<div class="lg:col-span-1">
				<div class="mb-5 flex items-center gap-3">
					<div class="h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/20">
						<img src="/logo.png" alt="Logo SAPALA 67" class="h-full w-full object-cover" />
					</div>
					<div>
						<h3 class="font-heading text-xl font-bold text-white">SAPALA 67</h3>
						<p class="text-[10px] tracking-[0.15em] text-sapala-sky">SANTRI PECINTA ALAM</p>
					</div>
				</div>
				<p class="mb-3 font-serif text-lg italic text-sapala-sky">“{siteData.moto}”</p>
				<p class="mb-5 text-sm leading-relaxed text-sapala-cream/60">
					Organisasi pecinta alam yang bermarkas di Pesantren Persatuan Islam 67 Benda, Tasikmalaya.
				</p>
				<div class="flex gap-3">
					<a href={siteData.social.instagram} target="_blank" rel="noopener noreferrer" class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sapala-cream/70 transition-all duration-300 hover:border-sapala-red hover:bg-sapala-red hover:text-white">
						<Instagram class="h-4 w-4" />
					</a>
					<a href={siteData.social.youtube} target="_blank" rel="noopener noreferrer" class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sapala-cream/70 transition-all duration-300 hover:border-sapala-red hover:bg-sapala-red hover:text-white">
						<Youtube class="h-4 w-4" />
					</a>
					<a href={siteData.social.whatsapp} target="_blank" rel="noopener noreferrer" class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sapala-cream/70 transition-all duration-300 hover:border-green-400 hover:bg-green-500 hover:text-white">
						<MessageCircle class="h-4 w-4" />
					</a>
				</div>
			</div>

			<!-- Navigation -->
			<div>
				<h4 class="mb-5 font-heading text-lg font-semibold text-sapala-sky">Navigasi</h4>
				<ul class="space-y-3">
					{#each navLinks as link}
						<li>
							<a href={link.href} class="text-sm text-sapala-cream/60 transition-colors duration-300 hover:text-sapala-sky">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Quick Links -->
			<div>
				<h4 class="mb-5 font-heading text-lg font-semibold text-sapala-sky">Akses Cepat</h4>
				<ul class="space-y-3">
					{#each [['tentang', 'Tentang Kami'], ['kegiatan', 'Kegiatan'], ['galeri', 'Galeri Foto'], ['artikel', 'Artikel'], ['kontak', 'Hubungi Kami']] as [id, label]}
						<li>
							<a href={'/#' + id} class="text-sm text-sapala-cream/60 transition-colors duration-300 hover:text-sapala-sky">{label}</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<h4 class="mb-5 font-heading text-lg font-semibold text-sapala-sky">Kontak</h4>
				<ul class="space-y-4">
					<li class="flex items-start gap-3">
						<MapPin class="mt-1 h-4 w-4 flex-shrink-0 text-sapala-earth" />
						<span class="text-sm text-sapala-cream/60">{siteData.address}</span>
					</li>
					<li class="flex items-center gap-3">
						<Mail class="h-4 w-4 flex-shrink-0 text-sapala-earth" />
						<a href="mailto:{siteData.email}" class="text-sm text-sapala-cream/60 transition-colors hover:text-sapala-sky">{siteData.email}</a>
					</li>
					<li class="flex items-center gap-3">
						<Phone class="h-4 w-4 flex-shrink-0 text-sapala-earth" />
						<a href="tel:{siteData.phone}" class="text-sm text-sapala-cream/60 transition-colors hover:text-sapala-sky">{siteData.phone}</a>
					</li>
					<li class="flex items-start gap-3">
						<Compass class="mt-1 h-4 w-4 flex-shrink-0 text-sapala-earth" />
						<span class="text-sm text-sapala-cream/60">{siteData.basecamp}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- Bottom Bar -->
	<div class="border-t border-white/10">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
				<p class="text-center text-sm text-sapala-cream/50 md:text-left">
					© {new Date().getFullYear()} SAPALA 67 Tasikmalaya. Made with
					<Heart class="inline h-3 w-3 text-sapala-red" /> untuk alam.
				</p>
				<button onclick={scrollToTop} class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sapala-cream/70 transition-all duration-300 hover:border-sapala-sky hover:bg-sapala-sky hover:text-sapala-inkdeep" aria-label="Kembali ke atas">
					<ArrowUp class="h-4 w-4" />
				</button>
			</div>
		</div>
	</div>
</footer>
