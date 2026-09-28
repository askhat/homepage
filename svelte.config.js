import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    // Fully prerendered site, served by Cloudflare Workers Static Assets.
    // 404.html is the SPA shell that renders +error.svelte for unknown URLs.
    adapter: adapter({ fallback: '404.html' })
  }
}
