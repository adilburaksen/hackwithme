export interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
  externalLink?: string;
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
  POST = 'POST',
  NOT_FOUND = 'NOT_FOUND'
}