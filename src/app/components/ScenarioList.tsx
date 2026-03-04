import { TestResult } from '@/app/types';

interface Props {
  scenarios: TestResult[];
}

export default function ScenarioList({ scenarios }: Props) {
  const passCount = scenarios.filter(s => s.status === 'PASS').length;
  const failCount = scenarios.filter(s => s.status === 'FAIL').length;

  return (
    <div className="bg-zinc-900 border border-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
          Suggested Scenarios
        </span>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-zinc-400">
            {scenarios.length} found
          </span>
          <span className="text-xs font-mono text-emerald-400">
            {passCount} PASS
          </span>
          {failCount > 0 && (
            <span className="text-xs font-mono text-red-400">
              {failCount} FAIL
            </span>
          )}
        </div>
      </div>

      {/* Scenario rows */}
      <div className="divide-y divide-zinc-800">
        {scenarios.map(scenario => (
          <div key={scenario.id} className="px-6 py-4 hover:bg-zinc-800 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <p className="text-white text-sm font-mono">
                  {scenario.scenarioName}
                </p>
                <div className="flex flex-wrap gap-2">
                  {scenario.reportTags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 bg-zinc-800 text-blue-400 border border-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                  {scenario.actionTags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 bg-zinc-800 text-amber-400 border border-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {scenario.durationMs && (
                  <span className="text-zinc-600 text-xs font-mono">
                    {scenario.durationMs}ms
                  </span>
                )}
                <span className={`text-xs font-mono px-2 py-1 ${
                  scenario.status === 'PASS'
                    ? 'text-emerald-400 bg-emerald-950 border border-emerald-900'
                    : 'text-red-400 bg-red-950 border border-red-900'
                }`}>
                  {scenario.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}