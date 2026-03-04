'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const token = await api.auth.login(username, password);
      localStorage.setItem('pulse_token', token);
      localStorage.setItem('pulse_user', username);
      router.push('/dashboard');
    } catch {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-8"
      style={{
        backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(39, 39, 42, 0.8) 0%, transparent 60%),
                          radial-gradient(ellipse at 80% 20%, rgba(24, 24, 27, 0.9) 0%, transparent 50%)`,
      }}
    >
      {/* Background grid texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Card */}
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 p-12 shadow-2xl">
        
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />

        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-6xl font-black tracking-tighter text-white font-mono">
            PULSE
          </h1>
          <p className="text-zinc-500 text-base mt-2 font-mono">
            Release Intelligence Platform
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div>
            <label className="text-zinc-400 text-xs font-mono uppercase tracking-widest block mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full bg-zinc-950 border border-zinc-700 text-white font-mono px-4 py-4 text-base focus:outline-none focus:border-zinc-400 transition-colors"
              placeholder="username"
            />
          </div>

          <div>
            <label className="text-zinc-400 text-xs font-mono uppercase tracking-widest block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full bg-zinc-950 border border-zinc-700 text-white font-mono px-4 py-4 text-base focus:outline-none focus:border-zinc-400 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm font-mono">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-white text-black font-mono font-bold text-base py-4 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'AUTHENTICATING...' : 'LOGIN →'}
          </button>
        </div>

        {/* Bottom corner decoration */}
        <div className="absolute bottom-4 right-4 text-zinc-700 text-xs font-mono">
          v1.0.0
        </div>
      </div>
    </main>
  );
}