import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"

import sitemap from "@astrojs/sitemap"
import sveltePreprocess from "svelte-preprocess"

// https://astro.build/config
export default defineConfig({
	site: "https://torbreckorchard.co.uk",
	integrations: [svelte({ preprocess: sveltePreprocess() }), sitemap()],
})
