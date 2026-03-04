export interface TestResult {
  id: number;
  scenarioName: string;
  ticketId: string;
  status: string;
  branch: string;
  runTimestamp: string;
  durationMs: number;
  reportTags: string[];
  actionTags: string[];
}

export interface Ticket {
  ticketId: string;
  summary: string;
  status: string;
  description: unknown;
}

export interface PullRequest {
  number: number;
  title: string;
  branch: string;
  url: string;
  state: string;
}

export interface FilteringLogic {
  reportTags: string[];
  actionTags: string[];
}

export interface User {
  username: string;
  token: string;
}