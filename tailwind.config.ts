import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',         // Covers all JavaScript and TypeScript files
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // Covers pages and MDX files in pages directory
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Covers components and MDX files in components directory
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Covers app and MDX files in app directory
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
