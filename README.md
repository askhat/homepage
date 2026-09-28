# homepage

> Askhat's Home Page — [askhat.xyz](https://askhat.xyz)

Built with [SvelteKit](https://svelte.dev/docs/kit), fully prerendered and served by
[Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).

Click the photo to play.

## Development

```bash
npm install
npm run dev       # dev server at localhost:5173
npm run build     # static build into ./build
npm run preview   # serve ./build with wrangler, like production
npm run format    # prettier
```

## Deployment

Deploys are handled by [Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
(the Cloudflare GitHub app), connected to the `homepage` Worker:

- build command: `npm run build`
- deploy command: `npx wrangler deploy`

Pushes to `master` go to production; other branches get preview versions.
GitHub Actions (`.github/workflows/ci.yml`) only checks formatting and the build.

Manual deploy: `npx wrangler login && npm run deploy`.
