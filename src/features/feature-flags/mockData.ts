import type { FeatureFlag } from './types';

export const mockFlags: FeatureFlag[] = [
  {
    id: '1',
    key: 'checkout-v2',
    name: 'New Checkout Experience',
    description: 'Redesigned checkout flow for customers',
    owner: 'Checkout Team',
    environments: {
      development: true,
      staging: true,
      production: false,
    },
  },
  {
    id: '2',
    key: 'search-suggestions',
    name: 'Search Suggestions',
    description: 'Autocomplete suggestions in search',
    owner: 'Search Team',
    environments: {
      development: true,
      staging: true,
      production: true,
    },
  },
  {
    id: '3',
    key: 'instant-refunds',
    name: 'Instant Refunds',
    description: 'Experimental instant refund processing',
    owner: 'Payments Team',
    environments: {
      development: true,
      staging: false,
      production: false,
    },
  },
  {
    id: '4',
    key: 'compact-navigation',
    name: 'Compact Navigation',
    description: 'Simplified navigation for smaller screens',
    owner: 'Platform Team',
    environments: {
      development: true,
      staging: true,
      production: true,
    },
  },
  {
    id: '5',
    key: 'recommendations-panel',
    name: 'Recommendations Panel',
    description: 'Personalized recommendations experience',
    owner: 'Discovery Team',
    environments: {
      development: false,
      staging: false,
      production: false,
    },
  },
];