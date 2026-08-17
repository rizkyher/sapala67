<script lang="ts">
	import { onMount } from 'svelte';
	import { Check, ChevronRight, Compass, Mountain, Plus, Sprout, Trash2, Waves } from 'lucide-svelte';

	type Category = 'Petualangan' | 'Konservasi' | 'Keterampilan' | 'Pengabdian';
	type Goal = { id: string; title: string; category: Category; done: boolean };
	const storageKey = 'sapala67-goals';
	const categories: { name: Category; description: string; icon: typeof Mountain; tone: string }[] = [
		{ name: 'Petualangan', description: 'Menjelajah dengan kesiapan.', icon: Mountain, tone: 'bg-sapala-primary' },
		{ name: 'Konservasi', description: 'Merawat rumah bersama.', icon: Sprout, tone: 'bg-emerald-700' },
		{ name: 'Keterampilan', description: 'Menguasai bekal lapangan.', icon: Compass, tone: 'bg-sapala-clay' },
		{ name: 'Pengabdian', description: 'Hadir untuk sesama.', icon: Waves, tone: 'bg-sapala-red' }
	];
	let goals = $state<Goal[]>([]);
	let title = $state('');
	let category = $state<Category>('Petualangan');
	let notice = $state('');

	onMount(() => {
		try { goals = JSON.parse(localStorage.getItem(storageKey) ?? '[]'); } catch { goals = []; }
	});
	function save(next: Goal[]) { goals = next; localStorage.setItem(storageKey, JSON.stringify(next)); }
	function addGoal() {
		const value = title.trim();
		if (!value) { notice = 'Tuliskan satu langkah nyata terlebih dahulu.'; return; }
		save([{ id: crypto.randomUUID(), title: value, category, done: false }, ...goals]);
		title = ''; notice = 'Jejak baru disimpan di kompasmu.';
	}
	function toggleGoal(id: string) { save(goals.map((goal) => goal.id === id ? { ...goal, done: !goal.done } : goal)); }
	const completeCount = $derived(goals.filter((goal) => goal.done).length);
	const progress = $derived(goals.length ? Math.round((completeCount / goals.length) * 100) : 0);
</script>

<div class="goal-shell">
	<section class="goal-compass">
		<div class="relative z-10">
			<p class="goal-label">KOMPAS AKSIMU</p>
			<h2 class="mt-4 font-heading text-4xl leading-tight text-white">Satu langkah.<br /><span class="text-sapala-earth">Satu dampak.</span></h2>
			<p class="mt-5 max-w-sm text-sm leading-relaxed text-white/65">Pilih medanmu, jadikan niat menjadi tindakan, lalu tandai setiap jejak yang sudah kamu tunaikan.</p>
		</div>
		<div class="relative z-10 mt-10 flex items-end gap-5"><div class="goal-ring" style:--progress={`${progress * 3.6}deg`}><span>{progress}%</span></div><div><p class="text-3xl font-semibold text-white">{completeCount}<span class="text-base text-white/45">/{goals.length}</span></p><p class="mt-1 text-xs uppercase tracking-widest text-white/50">langkah selesai</p></div></div>
		<div class="goal-grid" aria-hidden="true"></div>
	</section>

	<section class="goal-workspace">
		<div class="flex items-start justify-between gap-4"><div><p class="goal-label text-sapala-clay">PILIH MEDAN</p><h2 class="mt-2 font-heading text-2xl font-bold text-sapala-ink">Apa jejakmu hari ini?</h2></div><p class="hidden max-w-36 text-right text-xs leading-relaxed text-sapala-ink/50 sm:block">Tersimpan privat di perangkatmu.</p></div>
		<div class="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
			{#each categories as item}
				{@const Icon = item.icon}
				<button onclick={() => (category = item.name)} class:goal-choice-active={category === item.name} class="goal-choice"><span class="{item.tone} flex h-9 w-9 items-center justify-center rounded-full text-white"><Icon class="h-4 w-4" /></span><span class="mt-3 block font-semibold text-sapala-ink">{item.name}</span><span class="mt-1 block text-xs leading-snug text-sapala-ink/55">{item.description}</span></button>
			{/each}
		</div>
		<form class="mt-8 border-t border-sapala-ink/10 pt-6" onsubmit={(event) => { event.preventDefault(); addGoal(); }}>
			<label for="goal-title" class="text-sm font-semibold text-sapala-ink">Langkah yang akan kamu lakukan</label>
			<div class="mt-2 flex flex-col gap-3 sm:flex-row"><input id="goal-title" bind:value={title} maxlength="100" placeholder="Contoh: Membawa kantong sampah saat pendakian" class="goal-input" /><button class="hero-primary shrink-0 justify-center" aria-label="Simpan goal"><Plus class="h-5 w-5" /> Simpan jejak</button></div>
			<p class="mt-3 min-h-5 text-sm text-sapala-primary" aria-live="polite">{notice}</p>
		</form>
		{#if goals.length}
			<ul class="mt-3 divide-y divide-sapala-ink/10" aria-label="Daftar target">
				{#each goals as goal (goal.id)}
					<li class="group flex items-center gap-3 py-4"><button onclick={() => toggleGoal(goal.id)} class:goal-done={goal.done} class="goal-check" aria-label={goal.done ? `Tandai ${goal.title} belum selesai` : `Tandai ${goal.title} selesai`}><Check class="h-4 w-4" /></button><div class="min-w-0 flex-1"><p class:line-through={goal.done} class="font-medium text-sapala-ink">{goal.title}</p><p class="mt-1 text-[10px] font-bold uppercase tracking-widest text-sapala-clay">{goal.category}</p></div><button onclick={() => save(goals.filter((item) => item.id !== goal.id))} class="rounded-full p-3 text-sapala-ink/30 transition hover:bg-sapala-red/10 hover:text-sapala-red" aria-label={`Hapus ${goal.title}`}><Trash2 class="h-4 w-4" /></button></li>
				{/each}
			</ul>
		{:else}
			<div class="mt-4 flex items-center gap-3 rounded-xl bg-sapala-cream p-5 text-sm text-sapala-ink/65"><ChevronRight class="h-5 w-5 shrink-0 text-sapala-clay" /> Target kecil yang nyata lebih baik daripada rencana besar yang tidak dimulai.</div>
		{/if}
	</section>
</div>
