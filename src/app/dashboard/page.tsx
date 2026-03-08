'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import TicketView from '@/app/components/TicketView';
import FilteringLogic from '@/app/components/FilteringLogic';
import ScenarioList from '@/app/components/ScenarioList';
import PRSection from '@/app/components/PRSection';
import { api } from '@/app/lib/api';
import { Ticket, TestResult, PullRequest, FilteringLogic as FilteringLogicType } from '@/app/types';
import AuthGuard from '@/app/components/AuthGuard';

export default function DashboardPage() {
  const router = useRouter();
  const [ticketId, setTicketId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [prs, setPRs] = useState<PullRequest[]>([]);
  const [filtering, setFiltering] = useState<FilteringLogicType | null>(null);
  const [filteredScenarios, setFilteredScenarios] = useState<TestResult[]>([]);

  const analyze = async () => {
    if (!ticketId.trim()) return;
    setLoading(true);
    setError('');
    setTicket(null);
    setTestResults([]);
    setPRs([]);
    setFiltering(null);
    setFilteredScenarios([]);

    try {
      const [ticketData, testsData, prsData] = await Promise.all([
        api.tickets.get(ticketId.trim()),
        api.tests.getByTicket(ticketId.trim()),
        api.prs.getByTicket(ticketId.trim()),
      ]);

      setTicket(ticketData);
      setTestResults(testsData);
      setPRs(prsData);

      // Extract filtering tags from test results
        const reportTags = [...new Set(testsData.flatMap((t: TestResult) => t.reportTags))] as string[];
        const actionTags = [...new Set(testsData.flatMap((t: TestResult) => t.actionTags))] as string[];
      setFiltering({ reportTags, actionTags });
      setFilteredScenarios(testsData);

    } catch (err) {
      if (err instanceof Error && err.message === 'Invalid credentials') {
        router.push('/login');
      }
      setError('Failed to fetch data. Check the ticket ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAIMode = async (aiTags: FilteringLogicType) => {
    if (!filtering) return;
    const mergedReportTags = [...new Set([...filtering.reportTags, ...aiTags.reportTags])];
    const mergedActionTags = [...new Set([...filtering.actionTags, ...aiTags.actionTags])];
    const merged = { reportTags: mergedReportTags, actionTags: mergedActionTags };
    setFiltering(merged);

    // Re-filter scenarios with expanded tags
    const expanded = testResults.filter(t =>
      t.reportTags.some(tag => mergedReportTags.includes(tag)) ||
      t.actionTags.some(tag => mergedActionTags.includes(tag))
    );
    setFilteredScenarios(expanded);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-zinc-950">
        <Navbar />

        <div className="max-w-7xl mx-auto px-8 py-10 space-y-8">

          {/* Ticket Input */}
          <div className="flex gap-4">
            <input
              type="text"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && analyze()}
              placeholder="Enter Jira Ticket ID (e.g. SCRUM-5)"
              className="flex-1 bg-zinc-900 border border-zinc-800 text-white font-mono px-5 py-4 text-base focus:outline-none focus:border-zinc-500 transition-colors"
            />
            <button
              onClick={analyze}
              disabled={loading}
              className="bg-white text-black font-mono font-bold px-8 py-4 hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {loading ? 'ANALYZING...' : 'ANALYZE →'}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm font-mono">{error}</p>
          )}

          {/* Ticket + Filtering side by side */}
          {ticket && filtering && (
            <div className="grid grid-cols-2 gap-6">
              <TicketView ticket={ticket} />
              <FilteringLogic
                filtering={filtering}
                ticket={ticket}
                prs={prs}
                onAIMode={handleAIMode}
              />
            </div>
          )}

          {/* Scenarios */}
          {filteredScenarios.length > 0 && (
            <ScenarioList scenarios={filteredScenarios} />
          )}

          {/* PRs */}
          {prs.length > 0 && (
            <PRSection prs={prs} scenarios={filteredScenarios} />
          )}

        </div>
      </div>
    </AuthGuard>
  );
}