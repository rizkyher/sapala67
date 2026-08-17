<script lang="ts">
	import { orgStructure } from '$lib/data/site';
</script>

<section class="relative py-24 md:py-32 overflow-hidden">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="text-center mb-16 scroll-reveal">
			<span
				class="inline-block px-4 py-1.5 rounded-full bg-sapala-primary/10 border border-sapala-primary/20 text-sapala-primary text-sm font-medium mb-4"
			>
				Tata Kelola
			</span>
			<h2 class="section-heading text-gradient mb-4">Struktur Organisasi</h2>
			<p class="section-subheading">
				Susunan kepengurusan SAPALA 67 periode 2024-2025
			</p>
		</div>

		<!-- Structure -->
		<div class="max-w-4xl mx-auto space-y-8">
			{#each orgStructure as group, i}
				<div class="scroll-reveal" style="animation-delay: {i * 80}ms">
					<div class="glass-card p-6 hover:border-sapala-sky/20 transition-all duration-500">
						<h3 class="font-heading text-lg font-semibold text-sapala-primary mb-4">
							{group.role}
						</h3>
						<div class="grid sm:grid-cols-2 gap-3">
							{#each group.members as member}
								<div class="bg-sapala-parchment/70 rounded-xl p-4 border border-sapala-ink/10">
									<p class="text-sapala-ink font-medium text-sm">{member.name}</p>
									<p class="text-sapala-ink/50 text-xs mt-1">{member.title}</p>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
