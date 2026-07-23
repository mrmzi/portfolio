// tailwind.config.js
import { defineConfig } from "tailwindcss";

export default defineConfig({
  darkMode: "selector", // فعال‌سازی دوباره dark: در Tailwind 4.2
  content: ["./index.html", "./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
});
