<script lang="ts">
	import { onMount } from 'svelte';
	import Lenis from 'lenis';
	import 'lenis/dist/lenis.css';
	import '../styles/app.css';

	onMount(() => {
		const lenis = new Lenis({
			autoRaf: true,
			anchors: { offset: 88 },
			stopInertiaOnNavigate: true
		});

		return () => lenis.destroy();
	});
</script>

<slot />
