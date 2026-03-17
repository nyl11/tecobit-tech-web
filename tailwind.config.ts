import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/blocks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#79a0ba',
          dark:    '#5a7d96',
          light:   '#a8c4d8',
        },
        background: '#f4f7f9',
        surface: {
          DEFAULT: '#ffffff',
          alt:     '#e8eef3',
        },
        heading:  '#1e2f3d',
        body:     '#3d4f5c',
        muted:    '#8fa3b1',
        border:   '#cddae3',
        accent:   '#fdfefe',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-poppins)', 'sans-serif'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
      transitionDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      }
    }
  },
  plugins: [],
};
export default config;
