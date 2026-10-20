import { useMemo, useState } from "react";
import { mockFlags } from "./features/feature-flags/mockData";
import type { Environment, FeatureFlag } from "./features/feature-flags/types";
import "./App.css";
import { FeatureFlagTable } from "./features/feature-flags/components/FeatureFlagTable";

type StatusFilter = "all" | "enabled" | "disabled";

function App() {
  const [flags, setFlags] = useState<FeatureFlag[]>(mockFlags);
  const [environment, setEnvironment] = useState<Environment>("production");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const enabledCount = flags.filter(
    (flag) => flag.environments[environment],
  ).length;

  const filteredFlags = useMemo(() => {
    const query = search.trim().toLowerCase();

    return flags.filter((flag) => {
      const matchesSearch = [
        flag.name,
        flag.key,
        flag.description,
        flag.owner,
      ].some((value) => value.toLowerCase().includes(query));

      const isEnabled = flag.environments[environment];

      const matchesStatus =
        status === "all" ||
        (status === "enabled" && isEnabled) ||
        (status === "disabled" && !isEnabled);

      return matchesSearch && matchesStatus;
    });
  }, [flags, environment, search, status]);

  function toggleFlag(id: string) {
    setFlags((current) =>
      current.map((flag) =>
        flag.id === id
          ? {
              ...flag,
              environments: {
                ...flag.environments,
                [environment]: !flag.environments[environment],
              },
            }
          : flag,
      ),
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">🚀 ReleasePilot</div>

        <nav aria-label="Main navigation">
          <a href="#flags" aria-current="page">
            Feature Flags
          </a>
          <span className="nav-disabled">Environments · Soon</span>
          <span className="nav-disabled">Audit Logs · Soon</span>
        </nav>

        <p className="sidebar-note">
          Demo mode
          <br />
          Changes reset on refresh
        </p>
      </aside>

      <main id="flags" className="main-content">
        <header className="page-header">
          <p className="eyebrow">WORKSPACE / RELEASE MANAGEMENT</p>
          <h1>Feature Flags</h1>
          <p>Manage feature availability across your environments.</p>
        </header>

        <section className="stats" aria-label="Flag statistics">
          <div className="stat-card">
            <span>Total Flags</span>
            <strong>{flags.length}</strong>
          </div>
          <div className="stat-card">
            <span>Enabled in {environment}</span>
            <strong>{enabledCount}</strong>
          </div>
          <div className="stat-card">
            <span>Disabled in {environment}</span>
            <strong>{flags.length - enabledCount}</strong>
          </div>
        </section>

        <section className="panel" aria-label="Feature flag management">
          <div className="toolbar">
            <label>
              Search
              <input
                type="search"
                placeholder="Search feature flags..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <label>
              Environment
              <select
                value={environment}
                onChange={(event) =>
                  setEnvironment(event.target.value as Environment)
                }
              >
                <option value="development">Development</option>
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </select>
            </label>

            <label>
              Status
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as StatusFilter)
                }
              >
                <option value="all">All flags</option>
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
            </label>
          </div>
          <FeatureFlagTable
            flags={filteredFlags}
            environment={environment}
            onToggle={toggleFlag}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
