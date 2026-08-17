<script lang="ts">
	import { enhance } from '$app/forms';
	import { MapPin, Mail, Phone, Instagram, Youtube, MessageCircle, Send } from 'lucide-svelte';
	import { siteData } from '$lib/data/site';

	let { form } = $props();

	let formName = $state('');
	let formEmail = $state('');
	let formMessage = $state('');
	let sending = $state(false);

	const errors = $derived(form?.contact?.errors ?? {});
	const success = $derived(form?.contact?.success ?? false);

	const waNumber = siteData.social.whatsapp.replace(/\D/g, '');
	const mapsQuery = encodeURIComponent(siteData.address);

	$effect(() => {
		if (success) {
			formName = '';
			formEmail = '';
			formMessage = '';
		}
	});

	function sendWhatsApp() {
		const text = `Halo SAPALA 67,%0A%0ANama: ${encodeURIComponent(formName)}%0AEmail: ${encodeURIComponent(formEmail)}%0A%0A${encodeURIComponent(formMessage)}`;
		window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank', 'noopener');
	}

	const fieldClass = (hasError: boolean) =>
		`w-full rounded-xl border bg-sapala-parchment/70 px-4 py-3 text-sm text-sapala-ink placeholder-sapala-ink/40 transition-all focus:outline-none focus:ring-1 ${
			hasError
				? 'border-sapala-red focus:ring-sapala-red/30'
				: 'border-sapala-ink/10 focus:border-sapala-primary/50 focus:ring-sapala-primary/30'
		}`;
</script>

<section id="kontak" class="relative overflow-hidden bg-gradient-to-b from-sapala-cream via-sapala-skysoft/30 to-sapala-skysoft/50 py-24 md:py-32">
	<div class="absolute right-0 top-0 h-96 w-96 rounded-full bg-sapala-sky/10 blur-3xl"></div>
	<div class="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-sapala-earth/10 blur-3xl"></div>

	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="scroll-reveal mb-16 text-center">
			<span class="eyebrow mb-4"><MessageCircle class="h-3.5 w-3.5" /> Hubungi Kami</span>
			<h2 class="section-heading mb-4">Kontak & Lokasi</h2>
			<p class="section-subheading">Tertarik bergabung atau ingin tahu lebih lanjut? Hubungi kami.</p>
		</div>

		<div class="grid gap-12 lg:grid-cols-2">
			<!-- Info -->
			<div class="scroll-reveal space-y-6">
				<div class="glass-card flex items-start gap-4 p-6">
					<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sapala-primary to-sapala-deep text-white"><MapPin class="h-5 w-5" /></div>
					<div>
						<h4 class="mb-1 font-heading font-semibold text-sapala-ink">Alamat</h4>
						<p class="text-sm text-sapala-ink/70">{siteData.address}</p>
						<p class="mt-1 text-xs text-sapala-ink/50">{siteData.basecamp}</p>
					</div>
				</div>

				<div class="glass-card flex items-start gap-4 p-6">
					<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sapala-earth to-sapala-clay text-white"><Mail class="h-5 w-5" /></div>
					<div>
						<h4 class="mb-1 font-heading font-semibold text-sapala-ink">Email</h4>
						<a href="mailto:{siteData.email}" class="text-sm text-sapala-ink/70 transition-colors hover:text-sapala-primary">{siteData.email}</a>
					</div>
				</div>

				<div class="glass-card flex items-start gap-4 p-6">
					<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-700 text-white"><Phone class="h-5 w-5" /></div>
					<div>
						<h4 class="mb-1 font-heading font-semibold text-sapala-ink">Telepon</h4>
						<a href="tel:{siteData.phone}" class="text-sm text-sapala-ink/70 transition-colors hover:text-sapala-primary">{siteData.phone}</a>
					</div>
				</div>

				<div class="glass-card p-6">
					<h4 class="mb-4 font-heading font-semibold text-sapala-ink">Media Sosial</h4>
					<div class="space-y-3">
						<a href={siteData.social.instagram} target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 text-sapala-ink/70 transition-colors hover:text-sapala-red"><Instagram class="h-5 w-5" /><span class="text-sm">@sapala67tsm</span></a>
						<a href={siteData.social.youtube} target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 text-sapala-ink/70 transition-colors hover:text-sapala-red"><Youtube class="h-5 w-5" /><span class="text-sm">SAPALA 67 Tasikmalaya</span></a>
						<a href={siteData.social.whatsapp} target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 text-sapala-ink/70 transition-colors hover:text-green-600"><MessageCircle class="h-5 w-5" /><span class="text-sm">WhatsApp</span></a>
					</div>
				</div>
			</div>

			<!-- Form -->
			<div class="scroll-reveal">
				<div class="glass-card p-8">
					<h3 class="mb-6 font-heading text-xl font-semibold text-sapala-ink">Kirim Pesan</h3>

					{#if success}
						<div class="rounded-xl border border-green-600/30 bg-green-600/10 p-6 text-center">
							<p class="font-medium text-green-700">Pesan berhasil dikirim!</p>
							<p class="mt-1 text-sm text-sapala-ink/60">Terima kasih, pengurus akan segera menindaklanjuti.</p>
						</div>
					{:else}
						<form
							method="POST"
							action="/?/contact"
							use:enhance={() => {
								sending = true;
								return async ({ update }) => {
									await update();
									sending = false;
								};
							}}
							class="space-y-5"
							novalidate
						>
							<div>
								<label for="name" class="mb-2 block text-sm text-sapala-ink/70">Nama Lengkap</label>
								<input id="name" name="name" type="text" bind:value={formName} placeholder="Masukkan nama Anda" class={fieldClass(!!errors.name)} />
								{#if errors.name}<p class="mt-1.5 text-xs text-sapala-red">{errors.name}</p>{/if}
							</div>
							<div>
								<label for="email" class="mb-2 block text-sm text-sapala-ink/70">Email</label>
								<input id="email" name="email" type="email" bind:value={formEmail} placeholder="contoh@email.com" class={fieldClass(!!errors.email)} />
								{#if errors.email}<p class="mt-1.5 text-xs text-sapala-red">{errors.email}</p>{/if}
							</div>
							<div>
								<label for="message" class="mb-2 block text-sm text-sapala-ink/70">Pesan</label>
								<textarea id="message" name="message" rows="5" bind:value={formMessage} placeholder="Tulis pesan Anda…" class="{fieldClass(!!errors.message)} resize-none"></textarea>
								{#if errors.message}<p class="mt-1.5 text-xs text-sapala-red">{errors.message}</p>{/if}
							</div>

							<button type="submit" disabled={sending} class="btn-primary w-full justify-center py-3 disabled:opacity-60">
								<Send class="h-4 w-4" />
								{sending ? 'Mengirim…' : 'Kirim Pesan'}
							</button>
							<button type="button" onclick={sendWhatsApp} class="btn-outline w-full justify-center py-3">
								<MessageCircle class="h-4 w-4" /> Kirim via WhatsApp
							</button>
						</form>
					{/if}
				</div>

				<!-- Google Maps -->
				<div class="glass-card mt-6 overflow-hidden p-1">
					<iframe
						title="Lokasi SAPALA 67 — {siteData.basecamp}"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.413084445937!2d108.2278917755614!3d-7.307402792700439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f50af3fdee517%3A0xc6ce1b95f659c71f!2sPesantren%20Persis%20Benda!5e0!3m2!1sid!2sid!4v1785225814843!5m2!1sid!2sid"
						class="h-56 w-full rounded-xl"
						loading="lazy"
						referrerpolicy="strict-origin-when-cross-origin"
					></iframe>
				</div>
			</div>
		</div>
	</div>
</section>
