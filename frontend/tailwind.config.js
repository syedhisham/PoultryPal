// const withMT = require("@material-tailwind/react/utils/withMT");
 
// module.exports = withMT({
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         // Add Roboto Mono to the fontFamily section
//         roboto: ['Roboto Mono', 'monospace'],
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: 0 },
//           '100%': { opacity: 1 },
//         },
//         slideIn: {
//           '0%': { transform: 'translateX(-100%)' },
//           '100%': { transform: 'translateX(0)' },
//         },
//         scaleUp: {
//           '0%': { transform: 'scale(0.5)' },
//           '100%': { transform: 'scale(1)' },
//         },
//         rotateIn: {
//           '0%': { transform: 'rotate(-360deg)' },
//           '100%': { transform: 'rotate(0deg)' },
//         },
//         bounceIn: {
//           '0%, 20%, 40%, 60%, 80%, 100%': { transform: 'translateY(0)' },
//           '50%': { transform: 'translateY(-20px)' },
//         },
//         spin: {
//           '0%': { transform: 'rotate(0deg)' },
//           '100%': { transform: 'rotate(360deg)' },
//         }
//       },
//       animation: {
//         fadeIn: 'fadeIn 2s ease-in-out',
//         slideIn: 'slideIn 1s ease-out',
//         scaleUp: 'scaleUp 1s ease-in-out',
//         rotateIn: 'rotateIn 1s ease-in-out',
//         bounceIn: 'bounceIn 2s',
//         spin: 'spin 2s linear infinite',
//       },
//     },
//   },
//   variants: {},
//   plugins: [],
// });


// /** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");



/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
module.exports = withMT({
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './src/Components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

    // Path to the Tremor module
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	transparent: 'transparent',
  	current: 'black',
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		borderRadius: {
  			'tremor-small': '0.375rem',
  			'tremor-default': '0.5rem',
  			'tremor-full': '9999px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		colors: {
  			side_bar_color: '#434CD9',
  			side_bar_text: '#FFFFFF',
  			side_bar_secondary: '#434CD9',
  			black_color: '#000000',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			tremor: {
  				brand: {
  					faint: 'colors.blue[50]',
  					muted: 'colors.blue[200]',
  					subtle: 'colors.blue[400]',
  					DEFAULT: 'colors.blue[500]',
  					emphasis: 'colors.blue[700]',
  					inverted: 'colors.white'
  				},
  				background: {
  					muted: 'colors.gray[50]',
  					subtle: 'colors.gray[100]',
  					DEFAULT: 'colors.white',
  					emphasis: 'colors.gray[700]'
  				},
  				border: {
  					DEFAULT: 'colors.gray[200]'
  				},
  				ring: {
  					DEFAULT: 'colors.gray[200]'
  				},
  				content: {
  					subtle: 'colors.gray[400]',
  					DEFAULT: 'colors.gray[500]',
  					emphasis: 'colors.gray[700]',
  					strong: 'colors.gray[900]',
  					inverted: 'colors.white'
  				}
  			},
  			'dark-tremor': {
  				brand: {
  					faint: '#0B1229',
  					muted: 'colors.blue[950]',
  					subtle: 'colors.blue[800]',
  					DEFAULT: 'colors.blue[500]',
  					emphasis: 'colors.blue[400]',
  					inverted: 'colors.blue[950]'
  				},
  				background: {
  					muted: '#131A2B',
  					subtle: 'colors.gray[800]',
  					DEFAULT: 'colors.gray[900]',
  					emphasis: 'colors.gray[300]'
  				},
  				border: {
  					DEFAULT: 'colors.gray[800]'
  				},
  				ring: {
  					DEFAULT: 'colors.gray[800]'
  				},
  				content: {
  					subtle: 'colors.gray[600]',
  					DEFAULT: 'colors.gray[500]',
  					emphasis: 'colors.gray[200]',
  					strong: 'colors.gray[50]',
  					inverted: 'colors.gray[950]'
  				}
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  			'tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  			'tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  			'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  			'dark-tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  			'dark-tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
  		},
  		fontSize: {
  			'tremor-label': ["0.75rem", { lineHeight: "1rem" }],
  			'tremor-default': ["0.875rem", { lineHeight: "1.25rem" }],
  			'tremor-title': ["1.125rem", { lineHeight: "1.75rem" }],
  			'tremor-metric': ["1.875rem", { lineHeight: "2.25rem" }]
  		}
  	}
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    require("tailwindcss-animate"),
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms')
  ],
});