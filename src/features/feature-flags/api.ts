import type {
  Environment,
  FeatureFlag,
} from './types';

export async function getFeatureFlags(): Promise<FeatureFlag[]> {
  const response = await fetch('/api/feature-flags');

  if (!response.ok) {
    throw new Error(
      `Failed to fetch feature flags (${response.status})`,
    );
  }

  return (await response.json()) as FeatureFlag[];
}

export async function updateFeatureFlagEnvironment(
  id: string,
  environment: Environment,
  enabled: boolean,
): Promise<FeatureFlag> {
  const response = await fetch(
    `/api/feature-flags/${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ environment, enabled }),
    },
  );

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    throw new Error(
      errorBody?.message ??
        `Failed to update feature flag (${response.status})`,
    );
  }

  return (await response.json()) as FeatureFlag;
}