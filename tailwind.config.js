/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				sapala: {
					// — Daylight emblem palette, faithful to the SAPALA 67 logo —
					// Sky (upper half of the badge)
					sky: '#8BCBEE',
					skysoft: '#CDE8F8',
					primary: '#1B7FBF',
					deep: '#155E8C',
					// Ink / mountains / outer ring — deep navy used for text & dark surfaces
					ink: '#163A5F',
					inkdeep: '#0E2740',
					dark: '#163A5F',
					// Earth (lower half of the badge — terracotta ground)
					earth: '#E89A5E',
					clay: '#C2703B',
					brown: '#9A5A33',
					sand: '#F4E3C8',
					// Crimson compass-star / carabiner accent
					red: '#D5232B',
					ember: '#B81C24',
					// Paper
					cream: '#FBF5EA',
					parchment: '#F6ECDA',
					white: '#FFFFFF',
					// Legacy dark surfaces (footer / loader)
					charcoal: '#0E2740',
					darkgray: '#16324F'
				}
			},
			fontFamily: {
				heading: ['Cinzel Variable', 'Cinzel', 'serif'],
				body: ['Inter Variable', 'Inter', 'sans-serif'],
				serif: ['Cormorant Garamond Variable', 'Cormorant Garamond', 'serif']
			},
			backgroundImage: {
				'paper-grain':
					'radial-gradient(circle at 1px 1px, rgba(22,58,95,0.06) 1px, transparent 0)'
			},
			boxShadow: {
				emblem: '0 18px 50px -20px rgba(22,58,95,0.35)',
				card: '0 8px 30px -16px rgba(22,58,95,0.28)',
				lift: '0 24px 60px -24px rgba(22,58,95,0.40)'
			},
			animation: {
				'fade-in': 'fadeIn 0.8s ease-out forwards',
				'slide-up': 'slideUp 0.8s ease-out forwards',
				'slide-down': 'slideDown 0.4s ease-out forwards',
				'scale-in': 'scaleIn 0.6s ease-out forwards',
				float: 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
				'spin-slow': 'spin 28s linear infinite',
				'spin-slower': 'spin 60s linear infinite',
				'bounce-slow': 'bounce 3s ease-in-out infinite',
				'timeline-pulse': 'timelinePulse 2s ease-in-out infinite',
				drift: 'drift 30s linear infinite'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(60px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				slideDown: {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.9)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-16px)' }
				},
				pulseGlow: {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(213,35,43,0.35)' },
					'50%': { boxShadow: '0 0 0 14px rgba(213,35,43,0)' }
				},
				timelinePulse: {
					'0%, 100%': { transform: 'scale(1)', opacity: '1' },
					'50%': { transform: 'scale(1.12)', opacity: '0.85' }
				},
				drift: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-60px)' }
				}
			}
		}
	},
	plugins: []
};
