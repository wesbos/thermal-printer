import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.tsx",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: 'jit',
  plugins: [],
};
export default config;
