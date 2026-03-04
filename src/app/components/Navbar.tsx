'use client';

import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('pulse_token');
    localStorage.removeItem('pulse_user');
    router.push('/login');
  };

  const username = typeof window !== 'undefined'
    ? localStorage.getItem('pulse_user') || ''
    : '';

  return (
    <nav className="w-full bg-zinc-900 border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
      <h1 className="text-xl font-black tracking-tighter text-white font-mono">
        PULSE
      </h1>
      <div className="flex items-center gap-6">
        <span className="text-zinc-500 text-sm font-mono">{username}</span>
        <button
          onClick={handleLogout}
          className="text-zinc-400 text-sm font-mono hover:text-white transition-colors"
        >
          LOGOUT →
        </button>
      </div>
    </nav>
  );
}