import { http, HttpResponse } from 'msw';
import { mockFlags } from '../features/feature-flags/mockData';
import type {
  Environment,
  FeatureFlag,
} from '../features/feature-flags/types';

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

function cloneFlag(flag: FeatureFlag): FeatureFlag {
  return {
    ...flag,
    environments: { ...flag.environments },
  };
}

// Simulated server-side store.
// Data survives requests but resets on a page refresh.
let featureFlags = mockFlags.map(cloneFlag);

export const handlers = [
  // GET /api/feature-flags
  http.get('/api/feature-flags', async () => {
    await delay(400);

    return HttpResponse.json(featureFlags.map(cloneFlag));
  }),

  // PATCH /api/feature-flags/:id
  http.patch(
    '/api/feature-flags/:id',
    async ({ params, request }) => {
      await delay(300);

      const id = String(params.id);

      const body = (await request.json()) as {
        environment: Environment;
        enabled: boolean;
      };

      if (
        !['development', 'staging', 'production'].includes(
          body.environment,
        ) ||
        typeof body.enabled !== 'boolean'
      ) {
        return HttpResponse.json(
          { message: 'Invalid update payload.' },
          { status: 400 },
        );
      }

      const existing = featureFlags.find(
        (flag) => flag.id === id,
      );

      if (!existing) {
        return HttpResponse.json(
          { message: 'Feature flag not found.' },
          { status: 404 },
        );
      }

      const updated: FeatureFlag = {
        ...existing,
        environments: {
          ...existing.environments,
          [body.environment]: body.enabled,
        },
      };

      featureFlags = featureFlags.map((flag) =>
        flag.id === id ? updated : flag,
      );

      return HttpResponse.json(cloneFlag(updated));
    },
  ),
];