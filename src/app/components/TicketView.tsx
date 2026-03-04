import { Ticket } from '@/app/types';

interface Props {
  ticket: Ticket;
}

export default function TicketView({ ticket }: Props) {
  const extractDescription = (description: unknown): string => {
    if (!description) return 'No description provided.';
    if (typeof description === 'string') return description;
    // Handle Jira ADF format
    try {
      const doc = description as { content: { content: { text: string }[] }[] };
      return doc.content
        .flatMap(block => block.content || [])
        .map(inline => inline.text || '')
        .join(' ');
    } catch {
      return 'No description provided.';
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
          Ticket
        </span>
        <span className="text-xs font-mono px-2 py-1 bg-zinc-800 text-zinc-400">
          {ticket.status}
        </span>
      </div>

      <div>
        <p className="text-zinc-500 text-sm font-mono">{ticket.ticketId}</p>
        <h2 className="text-white text-xl font-bold font-mono mt-1">
          {ticket.summary}
        </h2>
      </div>

      <div className="border-t border-zinc-800 pt-4">
        <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">
          Description
        </p>
        <p className="text-zinc-300 text-sm font-mono leading-relaxed">
          {extractDescription(ticket.description)}
        </p>
      </div>
    </div>
  );
}