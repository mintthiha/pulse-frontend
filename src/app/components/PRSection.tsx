"use client";

import { useState } from "react";
import { PullRequest, TestResult } from "@/app/types";
import { api } from "@/app/lib/api";

interface Props {
  prs: PullRequest[];
  scenarios: TestResult[];
}

export default function PRSection({ prs, scenarios }: Props) {
  const [buildStatus, setBuildStatus] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<Record<number, boolean>>({});

  const handleRunBuild = async (pr: PullRequest) => {
    setLoading((prev) => ({ ...prev, [pr.number]: true }));
    setBuildStatus((prev) => ({ ...prev, [pr.number]: "" }));

    try {
      const tests = scenarios.map((s) => s.scenarioName).join(",");
      await api.builds.trigger(pr.branch, tests);
      setBuildStatus((prev) => ({ ...prev, [pr.number]: "success" }));
    } catch {
      setBuildStatus((prev) => ({ ...prev, [pr.number]: "error" }));
    } finally {
      setLoading((prev) => ({ ...prev, [pr.number]: false }));
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
          Pull Requests
        </span>
        <span className="text-xs font-mono text-zinc-400">
          {prs.length} open
        </span>
      </div>

      {/* PR rows */}
      <div className="divide-y divide-zinc-800">
        {prs.map((pr) => (
          <div
            key={pr.number}
            className="px-6 py-5 hover:bg-zinc-800 transition-colors"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500 text-xs font-mono">
                    #{pr.number}
                  </span>
                  <p className="text-white text-sm font-mono">{pr.title}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-500 text-xs font-mono">
                    Branch: {pr.branch}
                  </span>
                  <a
                    href={pr.url.replace('api.github.com/repos', 'github.com').replace('/pulls/', '/pull/')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-xs font-mono hover:text-blue-300 transition-colors"
                  >
                    View on GitHub →
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {buildStatus[pr.number] === "success" && (
                  <span className="text-emerald-400 text-xs font-mono">
                    ✓ Build triggered
                  </span>
                )}
                {buildStatus[pr.number] === "error" && (
                  <span className="text-red-400 text-xs font-mono">
                    ✗ Failed
                  </span>
                )}
                <button
                  onClick={() => handleRunBuild(pr)}
                  disabled={
                    loading[pr.number] || buildStatus[pr.number] === "success"
                  }
                  className="bg-white text-black font-mono font-bold text-xs px-4 py-2 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading[pr.number] ? "TRIGGERING..." : "RUN BUILD ▶"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
