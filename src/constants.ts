import { Post, Project } from './types';

export const SITE_TITLE = "hackwith.me";
export const AUTHOR_NAME = "Adil Burak a.k.a. 0racLe";

export const AUTHOR_PROFILE = {
  role: "Senior Application Security / Red Team Engineer",
  location: "Abu Dhabi, United Arab Emirates",
  bio: "OSCP-certified Application-Security & Red-Team Engineer with 10+ years in finance, telecom, aviation, and insurance. Expert in Penetration Testing, API security, secure SDLC and DevSecOps automation.",
  socials: {
    linkedin: "https://www.linkedin.com/in/adilburaksen/",
    github: "https://github.com/adilburaksen",
    x: "https://x.com/adilburaksen",
    website: "https://hackwith.me/"
  },
  experience: [
    {
      company: "Abu Dhabi Commercial Bank (ADCB)",
      role: "Senior AppSec / Red Team Engineer",
      period: "2025 - Present",
      highlight: "Leading appsec & red team initiatives for online banking. Driving secure SDLC and integrating SAST/DAST into CI/CD."
    },
    {
      company: "Kafein Technology Solutions",
      role: "AppSec Senior Consultant",
      period: "2024 - 2025",
      highlight: "Bridged vendors (Wallarm, BrightSec) & clients on API-security. Led 10+ PoC deployments cutting go-live time by 30%."
    },
    {
      company: "Future Technology Systems (Kuwait)",
      role: "Penetration Tester",
      period: "2023 - 2024",
      highlight: "Found 200+ critical vulns (SQLi, XSS) across banking sectors. Advised 3 banks on zero-trust redesign."
    },
    {
      company: "Barikat Cybersecurity",
      role: "Red Team Senior Specialist",
      period: "2022 - 2023",
      highlight: "Led assessments for Aviation Sector. Remediated risk-ranked vulns with IT/OT teams."
    },
    {
      company: "Ana Sigorta",
      role: "InfoSec Senior Specialist",
      period: "2021 - 2022",
      highlight: "Oversaw risk analysis & PCI-DSS audit (100% pass). Negotiated vendor contracts saving $15k."
    }
  ],
  arsenal: [
    "OSCP+ / OSCP (OffSec Certified)",
    "Certified API Security Pro (CASP)",
    "Certified DevSecOps Pro (CDP)",
    "CEH Master",
    "ISO27001 Lead Auditor",
    "CNSS - Certified Network Security Specialist"
  ],
  stack: [
    "Python / Bash / PowerShell / Go",
    "Burp Suite / Metasploit / Nessus",
    "Jenkins / GitLab CI / Nexus IQ",
    "Kubernetes / Docker / Azure / AWS"
  ],
  interests: "CTF Player (HTB), Shotokan Karate, Analog Photography, Strategy Gaming (EU4, Dota 2)."
};

export const RESEARCH_POSTS: Post[] = [
  {
    id: 'apis-from-subroutine-libraries-to-zero-trust',
    title: 'APIs: From Subroutine Libraries to Zero Trust — A Technical History',
    date: '2026-02-25',
    tags: ['API', 'Architecture', 'Security'],
    summary: 'A deep dive into the evolution of APIs, from 1940s calling conventions to modern distributed security architectures.',
    content: '',
    externalLink: 'https://medium.com/@adilburaksen/apis-from-subroutine-libraries-to-zero-trust-a-technical-history-f614912b76c7'
  },
  {
    id: 'the-age-of-insecurity',
    title: 'The Age of Insecurity: Human Nature in a Tech-Driven World',
    date: '2025-04-10',
    tags: ['Society', 'Tech', 'AI'],
    summary: 'Reflections on social insecurity, the false conflict between humans and machines, and navigating the golden age of digital literacy.',
    content: '',
    externalLink: 'https://medium.com/@adilburaksen/the-age-of-insecurity-human-nature-in-a-tech-driven-world-d1d52a7bc0fe'
  },
  {
    id: 'how-long-has-it-been',
    title: 'How long has it been?',
    date: '2025-04-06',
    tags: ['Personal', 'Growth', 'Reflection'],
    summary: 'Reflections on the passage of time, the skill of laziness, and breaking the armor of inertia.',
    content: '',
    externalLink: 'https://medium.com/@adilburaksen/how-long-has-it-been-1f4823ba2530'
  }
];

export const PROJECTS: Project[] = [];
