export interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  externalLink: string;
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
  DISCLOSURES = 'DISCLOSURES',
  NOT_FOUND = 'NOT_FOUND'
}

export interface PublishedCVE {
  id: string;
  cve: string;
  title: string;
  vendor: string;
  severity: string;
  year: string;
  description: string;
  link: string;
  role: 'Reporter' | 'Exploit Author';
}

export interface Acknowledgment {
  company: string;
  platform: string;
}
