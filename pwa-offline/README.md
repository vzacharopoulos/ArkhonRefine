Offline GraphQL Mutations (Vite PWA)

This folder contains a self-contained example you can copy into your Vite app to queue GraphQL mutations while offline and replay them when connectivity returns.

Files:
- `vite.config.ts`: Vite config using `vite-plugin-pwa` with `injectManifest` and a Web App Manifest.
- `src/service-worker.ts`: Custom Workbox service worker that backgrounds-syncs GraphQL mutations.

How to use in your Vite app:
1. Install deps in your Vite project:
   - `npm i -D vite-plugin-pwa workbox-window`
   - `npm i workbox-core workbox-routing workbox-strategies workbox-background-sync`
2. Copy `vite.config.ts` to your Vite project root (merge with your existing config if present).
3. Copy `src/service-worker.ts` into your Vite project's `src/`.
4. Ensure your app registers the SW (e.g., import `virtual:pwa-register` or `registerSW` as per vite-plugin-pwa docs).
5. Adjust `GRAPHQL_PATHS` or `GRAPHQL_URLS` in the service worker to match your endpoint.
6. (Optional) Add icons referenced in the manifest under `public/`.

Notes:
- Only POST requests to `/graphql` that contain a GraphQL mutation are queued. Queries are not cached/queued.
- If your app uses rotating auth tokens, add a request plugin to refresh/attach a fresh token before replay.
- Dev mode is enabled so you can test in localhost.

