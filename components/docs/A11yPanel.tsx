"use client";

import { useEffect, useState, RefObject } from "react";

interface A11yResult {
  violations: AxeViolation[];
  incomplete: AxeViolation[];
  passes: AxeViolation[];
}

interface AxeViolation {
  id: string;
  impact: string | null;
  description: string;
  helpUrl: string;
  nodes: { html: string }[];
}

interface A11yPanelProps {
  targetRef: RefObject<HTMLDivElement | null>;
  deps: Record<string, unknown>;
}

const impactColor: Record<string, string> = {
  critical: "text-red-700 bg-red-100",
  serious: "text-red-600 bg-red-50",
  moderate: "text-amber-700 bg-amber-100",
  minor: "text-yellow-700 bg-yellow-50",
};

export default function A11yPanel({ targetRef, deps }: A11yPanelProps) {
  const [results, setResults] = useState<A11yResult | null>(null);
  const [running, setRunning] = useState(false);
  const [passesOpen, setPassesOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!targetRef.current) return;
      setRunning(true);
      try {
        const axe = (await import("axe-core")).default;
        const result = await axe.run(targetRef.current);
        if (!cancelled) {
          setResults({
            violations: result.violations as AxeViolation[],
            incomplete: result.incomplete as AxeViolation[],
            passes: result.passes as AxeViolation[],
          });
        }
      } catch {
        // axe may fail on certain nodes; silently ignore
      } finally {
        if (!cancelled) setRunning(false);
      }
    }
    run();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetRef, JSON.stringify(deps)]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="px-5 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Accessibility Audit
        </p>
        {running && (
          <span className="text-xs text-gray-400 animate-pulse">Running…</span>
        )}
        {!running && results && (
          <div className="flex items-center gap-3 text-xs">
            <span className="text-red-600 font-medium">{results.violations.length} violations</span>
            <span className="text-amber-600 font-medium">{results.incomplete.length} incomplete</span>
            <span className="text-green-600 font-medium">{results.passes.length} passes</span>
          </div>
        )}
      </div>

      {results && (
        <div className="p-5 space-y-4">
          {/* Violations */}
          {results.violations.length > 0 && (
            <section>
              <p className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1">
                <span>🔴</span> Violations ({results.violations.length})
              </p>
              <div className="space-y-2">
                {results.violations.map((v) => (
                  <ViolationRow key={v.id} item={v} />
                ))}
              </div>
            </section>
          )}

          {/* Incomplete */}
          {results.incomplete.length > 0 && (
            <section>
              <p className="text-xs font-semibold text-amber-700 mb-2 flex items-center gap-1">
                <span>🟡</span> Needs review ({results.incomplete.length})
              </p>
              <div className="space-y-2">
                {results.incomplete.map((v) => (
                  <ViolationRow key={v.id} item={v} />
                ))}
              </div>
            </section>
          )}

          {/* Passes — collapsed */}
          {results.passes.length > 0 && (
            <section>
              <button
                type="button"
                onClick={() => setPassesOpen((o) => !o)}
                className="text-xs font-semibold text-green-700 flex items-center gap-1 hover:underline"
              >
                <span>✅</span> Passes ({results.passes.length})
                <span className="text-gray-400 ml-1">{passesOpen ? "▲" : "▼"}</span>
              </button>
              {passesOpen && (
                <div className="mt-2 space-y-1">
                  {results.passes.map((v) => (
                    <div key={v.id} className="flex items-center gap-2 text-xs text-green-700">
                      <code className="font-mono bg-green-50 px-1.5 py-0.5 rounded">{v.id}</code>
                      <span className="text-gray-500">{v.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {results.violations.length === 0 && results.incomplete.length === 0 && (
            <p className="text-sm text-green-700 font-medium">No violations found.</p>
          )}
        </div>
      )}
    </div>
  );
}

function ViolationRow({ item }: { item: AxeViolation }) {
  return (
    <div className="rounded-lg border border-gray-200 p-3 space-y-1.5">
      <div className="flex items-center gap-2 flex-wrap">
        <code className="text-xs font-mono text-brand-700 bg-brand-200/30 px-1.5 py-0.5 rounded">
          {item.id}
        </code>
        {item.impact && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${impactColor[item.impact] ?? "text-gray-600 bg-gray-100"}`}>
            {item.impact}
          </span>
        )}
        <a
          href={item.helpUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline ml-auto"
        >
          Docs ↗
        </a>
      </div>
      <p className="text-xs text-gray-600">{item.description}</p>
      {item.nodes[0] && (
        <code className="block text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded overflow-x-auto">
          {item.nodes[0].html}
        </code>
      )}
    </div>
  );
}
