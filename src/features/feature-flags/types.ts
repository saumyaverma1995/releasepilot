export type Environment = "development" | "staging" | "production";

export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  owner: string;
  environments: Record<Environment, boolean>;
}
