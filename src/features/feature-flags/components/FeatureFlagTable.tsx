import type { Environment, FeatureFlag } from "../types";

interface FeatureFlagTableProps {
  flags: FeatureFlag[];
  environment: Environment;
  onToggle: (id: string) => void;
}

export function FeatureFlagTable({
  flags,
  environment,
  onToggle,
}: FeatureFlagTableProps) {
  if (flags.length === 0) {
    return <div className="empty-state">No flags match your filters.</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th scope="col">Feature</th>
            <th scope="col">Key</th>
            <th scope="col">Owner</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {flags.map((flag) => {
            const isEnabled = flag.environments[environment];

            return (
              <tr key={flag.id}>
                <td>
                  <strong>{flag.name}</strong>
                  <small>{flag.description}</small>
                </td>

                <td>
                  <span><b>{flag.key}</b></span>
                </td>

                <td>{flag.owner}</td>

                <td>
                  <span
                    className={`status ${isEnabled ? "enabled" : "disabled"}`}
                  >
                    {isEnabled ? "Enabled" : "Disabled"}
                  </span>
                </td>

                <td>
                  <button
                    type="button"
                    className="action-button"
                    aria-pressed={isEnabled}
                    aria-label={`${
                      isEnabled ? "Disable" : "Enable"
                    } ${flag.name} in ${environment}`}
                    onClick={() => onToggle(flag.id)}
                  >
                    {isEnabled ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
