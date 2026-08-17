export function animateCounter(
	element: HTMLElement,
	target: number,
	duration: number = 2000,
	suffix: string = ''
) {
	let start = 0;
	const startTime = performance.now();

	function update(currentTime: number) {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);

		// Ease out Cubic
		const eased = 1 - Math.pow(1 - progress, 3);
		const current = Math.floor(eased * target);

		element.textContent = current.toLocaleString('id-ID') + suffix;

		if (progress < 1) {
			requestAnimationFrame(update);
		}
	}

	requestAnimationFrame(update);
}
