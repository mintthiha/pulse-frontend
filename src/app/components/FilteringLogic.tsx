'use client';

import { useState } from 'react';
import { Ticket, PullRequest, FilteringLogic as FilteringLogicType } from '@/app/types';
import { api } from '@/app/lib/api';

interface Props {
  filtering: FilteringLogicType;
  ticket: Ticket;
  prs: PullRequest[];
  onAIMode: (tags: FilteringLogicType) => void;
}

export default function FilteringLogic({ filtering, ticket, prs, onAIMode }: Props) {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiUsed, setAiUsed] = useState(false);

  const handleAIMode = async () => {
    setAiLoading(true);
    setAiError('');
    try {
      const description = typeof ticket.description === 'string'
        ? ticket.description
        : JSON.stringify(ticket.description);

      const prDiff = prs.length > 0
        ? prs.map(pr => `Branch: ${pr.branch} - ${pr.title}`).join('\n')
        : '';

      const suggestions = await api.ai.suggestTags(description, prDiff);
      onAIMode(suggestions);
      setAiUsed(true);
    } catch {
      setAiError('AI suggestion failed. Try again.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
          Filtering Logic
        </span>
        {aiUsed && (
          <span className="text-xs font-mono px-2 py-1 bg-zinc-800 text-emerald-400">
            AI ENHANCED
          </span>
        )}
      </div>

      {/* Report Tags */}
      <div>
        <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">
          Report Tags
        </p>
        <div className="flex flex-wrap gap-2">
          {filtering.reportTags.length > 0 ? (
            filtering.reportTags.map(tag => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1 bg-zinc-800 text-blue-400 border border-zinc-700"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-zinc-600 text-xs font-mono">None</span>
          )}
        </div>
      </div>

      {/* Action Tags */}
      <div>
        <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">
          Action Tags
        </p>
        <div className="flex flex-wrap gap-2">
          {filtering.actionTags.length > 0 ? (
            filtering.actionTags.map(tag => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1 bg-zinc-800 text-amber-400 border border-zinc-700"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-zinc-600 text-xs font-mono">None</span>
          )}
        </div>
      </div>

      {aiError && (
        <p className="text-red-400 text-xs font-mono">{aiError}</p>
      )}

      {/* AI Mode Button */}
      <div className="border-t border-zinc-800 pt-4">
        <button
          onClick={handleAIMode}
          disabled={aiLoading || aiUsed}
          className="w-full border border-zinc-700 text-zinc-300 font-mono text-sm py-3 hover:border-zinc-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {aiLoading ? 'ANALYZING...' : aiUsed ? '✓ AI MODE APPLIED' : '🤖 ENHANCE WITH AI'}
        </button>
      </div>
    </div>
  );
}