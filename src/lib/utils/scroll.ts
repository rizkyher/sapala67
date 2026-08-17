import { onMount } from 'svelte';
import { writable } from 'svelte/store';

export function useScrollReveal() {
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const target = entry.target as HTMLElement;
						target.classList.add('animate-fade-in');
						target.style.opacity = '1';
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);

		document.querySelectorAll('.scroll-reveal').forEach((el) => {
			(el as HTMLElement).style.opacity = '0';
			observer.observe(el);
		});

		return () => observer.disconnect();
	});
}

export const scrollY = writable(0);

export function scrollToElement(id: string) {
	const el = document.getElementById(id);
	if (el) {
		el.scrollIntoView({ behavior: 'smooth' });
	}
}
