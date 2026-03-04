const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const getToken = () => localStorage.getItem('pulse_token');

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

export const api = {
  auth: {
    login: async (username: string, password: string): Promise<string> => {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      return res.text();
    },
  },

  tickets: {
    get: async (ticketId: string) => {
      const res = await fetch(`${BASE_URL}/api/tickets/${ticketId}`, {
        headers: headers(),
      });
      if (!res.ok) throw new Error('Ticket not found');
      return res.json();
    },
  },

  tests: {
    getByTicket: async (ticketId: string) => {
      const res = await fetch(`${BASE_URL}/api/runs/${ticketId}`, {
        headers: headers(),
      });
      if (!res.ok) throw new Error('Failed to fetch test results');
      return res.json();
    },
  },

  prs: {
    getByTicket: async (ticketId: string) => {
      const res = await fetch(`${BASE_URL}/api/prs/${ticketId}`, {
        headers: headers(),
      });
      if (!res.ok) throw new Error('Failed to fetch PRs');
      return res.json();
    },
  },

  builds: {
    trigger: async (branch: string, tests: string) => {
      const res = await fetch(`${BASE_URL}/api/builds/trigger`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ branch, tests }),
      });
      if (!res.ok) throw new Error('Failed to trigger build');
      return res.text();
    },
  },

  ai: {
    suggestTags: async (ticketDescription: string, prDiff: string) => {
      const res = await fetch(`${BASE_URL}/api/ai/suggest-tags`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ ticketDescription, prDiff }),
      });
      if (!res.ok) throw new Error('Failed to get AI suggestions');
      return res.json();
    },
  },
};