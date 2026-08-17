<script lang="ts">
	import { LogIn } from 'lucide-svelte';
	let { form } = $props();
</script>

<svelte:head><title>Masuk — Admin SAPALA 67</title></svelte:head>

<div class="flex min-h-[100dvh] items-center justify-center px-4 py-8">
	<div class="w-full max-w-sm">
		<div class="mb-6 text-center">
			<img src="/logo.png" alt="SAPALA 67" class="mx-auto mb-3 h-16 w-16 rounded-full ring-2 ring-white/20" />
			<h1 class="font-heading text-2xl font-bold text-white">Panel Admin</h1>
			<p class="text-sm text-sapala-sky">SAPALA 67</p>
		</div>

		<form method="POST" class="space-y-4 rounded-2xl bg-white p-5 shadow-emblem sm:p-6">
			{#if form?.error}
				<p class="rounded-lg border border-sapala-red/30 bg-sapala-red/10 px-3 py-2 text-sm text-sapala-red">{form.error}</p>
			{/if}
			<div>
			<label for="username" class="mb-1.5 block text-sm font-medium text-sapala-ink/70">Email admin</label>
			<input id="username" name="username" type="email" value={form?.username ?? ''} autocomplete="username" required class="min-h-12 w-full rounded-xl border border-sapala-ink/15 px-3 py-2.5 text-base focus:border-sapala-primary focus:outline-none focus:ring-2 focus:ring-sapala-primary/20 sm:text-sm" />
			</div>
			<div>
				<label for="password" class="mb-1.5 block text-sm font-medium text-sapala-ink/70">Password</label>
			<input id="password" name="password" type="password" autocomplete="current-password" required class="min-h-12 w-full rounded-xl border border-sapala-ink/15 px-3 py-2.5 text-base focus:border-sapala-primary focus:outline-none focus:ring-2 focus:ring-sapala-primary/20 sm:text-sm" />
			</div>
			<button class="btn-primary w-full justify-center py-2.5"><LogIn class="h-4 w-4" /> Masuk</button>
		</form>
	</div>
</div>
