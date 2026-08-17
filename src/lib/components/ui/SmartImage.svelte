<script lang="ts">
	import { Image as ImageIcon } from 'lucide-svelte';

	let {
		src,
		alt,
		gradient = 'from-sapala-skysoft to-sapala-sand',
		label = '',
		fallbackSrc = '/images/sapala-ridge-dawn.png',
		class: klass = ''
	}: {
		src: string;
		alt: string;
		gradient?: string;
		label?: string;
		fallbackSrc?: string;
		class?: string;
	} = $props();

	let failed = $state(false);
	let fallbackActive = $state(false);
	let previousSrc = $state<string | undefined>(undefined);
	const currentSrc = $derived(fallbackActive ? fallbackSrc : src);

	$effect(() => {
		if (src !== previousSrc) {
			previousSrc = src;
			fallbackActive = false;
			failed = false;
		}
	});

	function handleError() {
		if (fallbackSrc && !fallbackActive) fallbackActive = true;
		else failed = true;
	}
</script>

{#if failed || !src}
	<div class="relative flex items-center justify-center overflow-hidden bg-gradient-to-br {gradient} {klass}">
		<div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.32),transparent_45%)]"></div>
		<div class="relative flex flex-col items-center gap-1 text-sapala-ink/55">
			<ImageIcon class="h-7 w-7" />
			{#if label}<span class="px-2 text-center text-xs font-medium">{label}</span>{/if}
		</div>
	</div>
{:else}
	<img src={currentSrc} {alt} loading="lazy" decoding="async" class="object-cover {klass}" onerror={handleError} />
{/if}
