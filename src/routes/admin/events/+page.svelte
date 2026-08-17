<script lang="ts">
	import { enhance } from '$app/forms';
	import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-svelte';
	let { data } = $props();
</script>

<svelte:head><title>Agenda — Admin SAPALA 67</title></svelte:head>

<div class="mb-6 flex items-end justify-between gap-4">
	<div>
		<h1 class="font-heading text-2xl font-bold text-sapala-ink">Agenda</h1>
		<p class="text-sm text-sapala-ink/60">{data.events.length} agenda</p>
	</div>
	<a href="/admin/events/new" class="btn-primary shrink-0 text-sm"><Plus class="h-4 w-4" /> Baru</a>
</div>

<div class="overflow-hidden rounded-2xl border border-sapala-ink/10 bg-white shadow-card">
	{#if data.events.length}
		<div class="divide-y divide-sapala-ink/10 md:hidden">
			{#each data.events as e}
				<article class="p-4">
					<div class="flex items-start justify-between gap-3"><div class="min-w-0"><p class="line-clamp-2 font-heading text-base font-semibold leading-snug text-sapala-ink">{e.title}</p><p class="mt-1 text-xs text-sapala-ink/55">{e.category} · {e.start_date}</p></div>{#if e.published}<span class="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-600/10 px-2 py-1 text-[10px] font-bold text-green-700"><Eye class="h-3 w-3" /> Terbit</span>{:else}<span class="inline-flex shrink-0 items-center gap-1 rounded-full bg-sapala-ink/10 px-2 py-1 text-[10px] font-bold text-sapala-ink/60"><EyeOff class="h-3 w-3" /> Draf</span>{/if}</div>
					<div class="mt-3 flex gap-2"><a href="/admin/events/{e.id}" class="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-sapala-primary/20 px-3 text-sm font-semibold text-sapala-primary hover:bg-sapala-primary/10"><Pencil class="h-4 w-4" /> Edit</a><form method="POST" action="?/delete" use:enhance onsubmit={(ev) => { if (!confirm('Hapus agenda ini?')) ev.preventDefault(); }}><input type="hidden" name="id" value={e.id} /><button class="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-sapala-red hover:bg-sapala-red/10" aria-label="Hapus {e.title}"><Trash2 class="h-4 w-4" /></button></form></div>
				</article>
			{/each}
		</div>
		<table class="hidden w-full text-left text-sm md:table">
			<thead class="border-b border-sapala-ink/10 bg-sapala-parchment/60 text-xs uppercase tracking-wide text-sapala-ink/60">
				<tr>
					<th class="px-4 py-3">Judul</th>
					<th class="hidden px-4 py-3 sm:table-cell">Kategori</th>
					<th class="hidden px-4 py-3 md:table-cell">Tanggal</th>
					<th class="px-4 py-3">Status</th>
					<th class="px-4 py-3 text-right">Aksi</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-sapala-ink/5">
				{#each data.events as e}
					<tr class="hover:bg-sapala-parchment/30">
						<td class="px-4 py-3 font-medium text-sapala-ink">{e.title}</td>
						<td class="hidden px-4 py-3 text-sapala-ink/70 sm:table-cell">{e.category}</td>
						<td class="hidden px-4 py-3 text-sapala-ink/60 md:table-cell">{e.start_date}</td>
						<td class="px-4 py-3">
							{#if e.published}
								<span class="inline-flex items-center gap-1 rounded-full bg-green-600/10 px-2 py-0.5 text-xs font-medium text-green-700"><Eye class="h-3 w-3" /> Terbit</span>
							{:else}
								<span class="inline-flex items-center gap-1 rounded-full bg-sapala-ink/10 px-2 py-0.5 text-xs font-medium text-sapala-ink/60"><EyeOff class="h-3 w-3" /> Draf</span>
							{/if}
						</td>
						<td class="px-4 py-3">
							<div class="flex items-center justify-end gap-2">
								<a href="/admin/events/{e.id}" class="flex h-11 w-11 items-center justify-center rounded-lg text-sapala-primary hover:bg-sapala-primary/10" aria-label="Edit"><Pencil class="h-4 w-4" /></a>
								<form method="POST" action="?/delete" use:enhance onsubmit={(ev) => { if (!confirm('Hapus agenda ini?')) ev.preventDefault(); }}>
									<input type="hidden" name="id" value={e.id} />
									<button class="flex h-11 w-11 items-center justify-center rounded-lg text-sapala-red hover:bg-sapala-red/10" aria-label="Hapus"><Trash2 class="h-4 w-4" /></button>
								</form>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p class="px-4 py-10 text-center text-sm text-sapala-ink/50">Belum ada agenda. <a href="/admin/events/new" class="font-medium text-sapala-primary">Buat agenda pertama</a>.</p>
	{/if}
</div>
