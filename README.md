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

Pushes to `master` are built and deployed by GitHub Actions
(`.github/workflows/deploy.yml`). The workflow needs a `CLOUDFLARE_API_TOKEN`
repository secret: a Cloudflare API token created from the **Edit Cloudflare Workers**
template. The target account is set in `wrangler.jsonc`.

Manual deploy: `npx wrangler login && npm run deploy`.
