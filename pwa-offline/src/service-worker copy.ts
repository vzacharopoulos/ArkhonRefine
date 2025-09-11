/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { NetworkOnly } from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope;

self.skipWaiting();
clientsClaim();

// Configure your GraphQL endpoint here.
// If you have multiple endpoints or absolute URLs, add them below.
const GRAPHQL_PATHS = ['/graphql'];
// const GRAPHQL_URLS = ['https://api.example.com/graphql'];

// Helper: checks if request is targeting our GraphQL endpoint
function isGraphQLEndpoint(url: URL): boolean {
  if (GRAPHQL_PATHS.some((p) => url.pathname.endsWith(p))) return true;
  // If you use absolute URLs, enable and check GRAPHQL_URLS
  // if (GRAPHQL_URLS.some((u) => url.href.startsWith(u))) return true;
  return false;
}

// Helper: determine if a request body contains a GraphQL mutation
async function isGraphQLMutation(request: Request): Promise<boolean> {
  if (request.method !== 'POST') return false;
  const contentType = request.headers.get('content-type') || '';
  // Clone because the body can only be read once
  const clone = request.clone();
  try {
    if (contentType.includes('application/json')) {
      const bodyText = await clone.text();
      if (!bodyText) return false;
      let json: any;
      try {
        json = JSON.parse(bodyText);
      } catch {
        // If JSON parse fails, fallback to a simple contains check
        return bodyText.toLowerCase().includes('mutation');
      }
      if (Array.isArray(json)) {
        return json.some((op) => typeof op?.query === 'string' && op.query.toLowerCase().includes('mutation'));
      }
      if (typeof json?.query === 'string') {
        return json.query.toLowerCase().includes('mutation');
      }
      // If you use persisted queries (no 'query' string), decide based on operationName or custom flag
      if (json?.operationName && typeof json.operationName === 'string') {
        // Adjust this allowlist to your mutation operation names if needed
        const op = json.operationName.toLowerCase();
        return op.includes('update') || op.includes('create') || op.includes('delete') || op.includes('mutation');
      }
      return false;
    } else {
      // Fallback: try to read as text
      const text = await clone.text();
      return text.toLowerCase().includes('mutation');
    }
  } catch {
    return false;
  }
}

// Background sync queue for GraphQL mutations
const mutationQueue = new BackgroundSyncPlugin('graphql-mutations-queue', {
  maxRetentionTime: 24 * 60, // minutes
  // Optionally, handle replay completion or add custom behavior:
  // onSync: async ({ queue }) => {
  //   await queue.replayRequests();
  // },
});

// Route: queue POST GraphQL mutations while offline; replay when back online
registerRoute(
  async ({ url, request }) => {
    if (!isGraphQLEndpoint(url)) return false;
    if (request.method !== 'POST') return false;
    return isGraphQLMutation(request);
  },
  new NetworkOnly({ plugins: [mutationQueue] }),
  'POST',
);

// If you need to refresh Authorization tokens before replay, you can extend with a plugin:
// const authPlugin = {
//   requestWillFetch: async ({ request }) => {
//     const headers = new Headers(request.headers);
//     const freshToken = await getFreshTokenSomehow();
//     headers.set('Authorization', `Bearer ${freshToken}`);
//     return new Request(request, { headers });
//   },
// };
// and use: new NetworkOnly({ plugins: [authPlugin, mutationQueue] })

