export function TicketSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-3 w-16 bg-zinc-800 rounded" />
        <div className="h-5 w-20 bg-zinc-800 rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-24 bg-zinc-800 rounded" />
        <div className="h-6 w-3/4 bg-zinc-800 rounded" />
      </div>
      <div className="border-t border-zinc-800 pt-4 space-y-2">
        <div className="h-3 w-20 bg-zinc-800 rounded" />
        <div className="h-3 w-full bg-zinc-800 rounded" />
        <div className="h-3 w-5/6 bg-zinc-800 rounded" />
        <div className="h-3 w-4/6 bg-zinc-800 rounded" />
      </div>
    </div>
  );
}

export function FilteringSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-5 animate-pulse">
      <div className="h-3 w-24 bg-zinc-800 rounded" />
      <div className="space-y-2">
        <div className="h-3 w-20 bg-zinc-800 rounded" />
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-zinc-800 rounded" />
          <div className="h-6 w-20 bg-zinc-800 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-20 bg-zinc-800 rounded" />
        <div className="flex gap-2">
          <div className="h-6 w-24 bg-zinc-800 rounded" />
          <div className="h-6 w-20 bg-zinc-800 rounded" />
        </div>
      </div>
      <div className="border-t border-zinc-800 pt-4">
        <div className="h-10 w-full bg-zinc-800 rounded" />
      </div>
    </div>
  );
}

export function ScenarioSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 animate-pulse">
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <div className="h-3 w-32 bg-zinc-800 rounded" />
        <div className="h-3 w-16 bg-zinc-800 rounded" />
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="px-6 py-4 border-b border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-3 w-2/3 bg-zinc-800 rounded" />
            <div className="h-5 w-12 bg-zinc-800 rounded" />
          </div>
          <div className="flex gap-2">
            <div className="h-5 w-16 bg-zinc-800 rounded" />
            <div className="h-5 w-20 bg-zinc-800 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PRSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 animate-pulse">
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <div className="h-3 w-24 bg-zinc-800 rounded" />
        <div className="h-3 w-12 bg-zinc-800 rounded" />
      </div>
      {[...Array(2)].map((_, i) => (
        <div key={i} className="px-6 py-5 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <div className="h-3 w-1/2 bg-zinc-800 rounded" />
              <div className="h-3 w-1/3 bg-zinc-800 rounded" />
            </div>
            <div className="h-8 w-24 bg-zinc-800 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}