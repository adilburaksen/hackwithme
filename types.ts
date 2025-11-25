

export interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string; // Simulated content for the AI to read
  tags: string[];
  externalLink?: string; // Optional URL to external post (e.g. Beehiiv)
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  year: string;
  status: 'Active' | 'Archived' | 'Researching';
}

export enum View {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  WRITING = 'WRITING',
  PROJECTS = 'PROJECTS',
  POST = 'POST'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}