import { Post, Project, PublishedCVE, Acknowledgment, ExperienceEntry, EvidenceMetric } from './types';

export const SITE_TITLE = 'hackwith.me';
export const AUTHOR_FULL_NAME = 'Adil Burak Şen';
export const AUTHOR_ALIAS = '0racLe';
export const AUTHOR_NAME = `${AUTHOR_FULL_NAME} a.k.a. ${AUTHOR_ALIAS}`;

export interface Certification {
  /** Emphasised lead (text-primary). */
  name: string;
  /** Muted trailing detail — provider / year / abbreviation. */
  detail?: string;
}

export const AUTHOR_PROFILE = {
  role: 'Senior Application Security & Red Team Engineer',
  location: 'Istanbul, Turkey · Open to Europe / UK / Remote',
  availability: {
    statement: 'Open to Europe / UK / Remote',
    location: 'Istanbul, Turkey',
  },
  bio: 'OSCP+ certified Application Security & Red Team Engineer with 8+ years across banking, telecom, aviation, insurance, and e-commerce. Bugcrowd Top 100 (2018) with 400+ reports submitted, 150+ validated. Published CVE (CVE-2026-31974). Hands-on across penetration testing, API security, threat modeling, secure SDLC, DevSecOps automation, and AI/LLM security.',
  socials: {
    linkedin: 'https://www.linkedin.com/in/adilburaksen/',
    github: 'https://github.com/adilburaksen',
    x: 'https://x.com/adilburaksen',
    website: 'https://hackwith.me/',
  },
  experience: [
    {
      company: 'Abu Dhabi Commercial Bank (ADCB)',
      role: 'Senior AppSec / Red Team Engineer',
      period: '2025 – 2026',
      highlight:
        'Led STRIDE threat modeling across 14-microservice architecture; produced 52-finding risk register fed into engineering backlogs. Performed CI/CD pipeline assessments and mobile MASVS assessments (140 test cases, 25 findings).',
    },
    {
      company: 'Kafein Technology Solutions',
      role: 'AppSec Senior Consultant',
      period: '2024 – 2025',
      highlight:
        'Security assessments and code reviews across Python/Go/Java/TypeScript stacks. Deployed and tuned SAST/SCA/DAST for 10+ client teams. Trained 100+ developers on OWASP API Top 10.',
    },
    {
      company: 'Future Technology Systems (Kuwait)',
      role: 'Penetration Tester',
      period: '2023 – 2024',
      highlight:
        '15+ full-stack pentests for enterprise and financial sector clients; 200+ critical findings; 90% remediation within SLA. Advised three banks on zero-trust network redesign.',
    },
    {
      company: 'Barikat Cybersecurity',
      role: 'Red Team Senior Specialist',
      period: '2022 – 2023',
      highlight:
        'Web, mobile, API, network, and physical assessments for aviation sector. AD attack chains mapped to MITRE ATT&CK. Re-tested all findings and certified fixes before systems went live.',
    },
    {
      company: 'Ana Sigorta',
      role: 'InfoSec Senior Specialist',
      period: '2021 – 2022',
      highlight:
        'Oversaw risk analysis, control rollout, and PCI-DSS audit; 100% pass on first attempt. Negotiated vendor contracts saving $15K.',
    },
    {
      company: 'Intertech',
      role: 'Application Security Engineer',
      period: '2020 – 2021',
      highlight:
        'Built security gates into 700+ Jenkins pipelines (SAST, SCA, DAST, secrets). Led 8-month Security Champion Academy for 500+ developers; 30% fewer OWASP flaws.',
    },
  ] as ExperienceEntry[],
  certifications: [
    { name: 'OSCP+ / OSCP', detail: '— OffSec' },
    { name: 'eWPTx', detail: '— INE, 2026' },
    { name: 'eMAPT', detail: '— INE, 2026' },
    { name: 'Certified API Security Pro', detail: '(CASP)' },
    { name: 'Certified DevSecOps Pro', detail: '(CDP)' },
    { name: 'CEH Master' },
    { name: 'ISO27001 Lead Auditor' },
  ] as Certification[],
  stack: [
    'Python / Bash / PowerShell / Go',
    'Burp Suite Pro / Metasploit / BloodHound',
    'Fortify / SonarQube / Snyk / Nexus IQ',
    'Jenkins / GitLab CI / GitHub Actions',
    'AWS / Azure / GCP / Docker / Kubernetes',
  ],
  interests: 'CTF Player (HTB), Shotokan Karate, Analog Photography, Strategy Gaming (EU4, Dota 2).',
};

/** Home Evidence ledger — exactly four rows (frame 1a). Presentation of
    existing facts; availability deliberately lives elsewhere. */
export const EVIDENCE_METRICS: EvidenceMetric[] = [
  {
    label: 'Credential',
    value: 'OSCP+',
    valueDetail: '— OffSec',
    detail: 'eWPTx — INE · eMAPT — INE · CEH Master',
  },
  {
    label: 'Experience',
    value: '8+ years',
    detail: 'banking · telecom · aviation · insurance · e-commerce',
  },
  {
    label: 'Published CVE',
    value: 'CVE-2026-31974',
    detail: 'SSRF in OpenProject · fixed in v17.2.0',
  },
  {
    label: 'Ranking',
    value: 'Bugcrowd Top 100',
    detail: '2018 · 400+ reports · 150+ validated',
  },
];

export const RESEARCH_POSTS: Post[] = [
  {
    id: 'apis-from-subroutine-libraries-to-zero-trust',
    title: 'APIs: From Subroutine Libraries to Zero Trust — A Technical History',
    date: '2026-02-25',
    tags: ['API', 'Architecture', 'Security'],
    summary:
      'A deep dive into the evolution of APIs, from 1940s calling conventions to modern distributed security architectures.',
    externalLink:
      'https://medium.com/@adilburaksen/apis-from-subroutine-libraries-to-zero-trust-a-technical-history-f614912b76c7',
  },
  {
    id: 'the-age-of-insecurity',
    title: 'The Age of Insecurity: Human Nature in a Tech-Driven World',
    date: '2025-04-10',
    tags: ['Society', 'Tech', 'AI'],
    summary:
      'Reflections on social insecurity, the false conflict between humans and machines, and navigating the golden age of digital literacy.',
    externalLink:
      'https://medium.com/@adilburaksen/the-age-of-insecurity-human-nature-in-a-tech-driven-world-d1d52a7bc0fe',
  },
  {
    id: 'how-long-has-it-been',
    title: 'How long has it been?',
    date: '2025-04-06',
    tags: ['Personal', 'Growth', 'Reflection'],
    summary: 'Reflections on the passage of time, the skill of laziness, and breaking the armor of inertia.',
    externalLink: 'https://medium.com/@adilburaksen/how-long-has-it-been-1f4823ba2530',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'cve-2025-25257-exploit-tool',
    name: 'CVE-2025-25257 Exploit Tool',
    description:
      'Public exploit tool for pre-authentication SQL injection in Fortinet FortiWeb Fabric Connector (CVSS 9.8). Detects vulnerable instances and demonstrates impact.',
    link: 'https://github.com/adilburaksen/CVE-2025-25257-Exploit-Tool',
    year: '2025',
    status: 'Active',
  },
];

export const PROJECTS_CURATION_NOTE =
  'This section is currently being curated. New experiments will be added soon.';

export const PUBLISHED_CVES: PublishedCVE[] = [
  {
    id: 'cve-2026-31974',
    cve: 'CVE-2026-31974',
    title: 'SSRF in OpenProject',
    vendor: 'OpenProject',
    severity: 'Medium',
    year: '2026',
    description:
      'Server-Side Request Forgery in OpenProject. Coordinated disclosure with the OpenProject security team; fix merged upstream in v17.2.0.',
    link: 'https://github.com/opf/openproject/security/advisories/GHSA-9wr7-j98g-2jh3',
    role: 'Reporter',
  },
];

export const ACKNOWLEDGMENTS_INTRO =
  'Companies that have publicly acknowledged my responsible disclosures across bug bounty platforms. Bugcrowd Top 100 (2018) with 400+ reports submitted, 150+ validated across Bugcrowd, YesWeHack, Immunefi, Intigriti, and Synack Red Team.';

export const ACKNOWLEDGMENTS: Acknowledgment[] = [
  // Bugcrowd
  { company: 'Mercedes-Benz', platform: 'Bugcrowd' },
  { company: 'Fireblocks (MPC)', platform: 'Bugcrowd' },
  { company: 'ConnectiveRx', platform: 'Bugcrowd' },
  { company: 'Mastercard', platform: 'Bugcrowd' },
  { company: 'Dell', platform: 'Bugcrowd' },
  { company: 'Sophos', platform: 'Bugcrowd' },
  { company: 'HubSpot', platform: 'Bugcrowd' },
  { company: 'Telefónica Germany', platform: 'Bugcrowd' },
  { company: 'Global Fashion Group', platform: 'Bugcrowd' },
  { company: 'Octopus', platform: 'Bugcrowd' },
  { company: 'Humble Bundle', platform: 'Bugcrowd' },
  { company: 'Ecommpay', platform: 'Bugcrowd' },
  { company: 'Netgear', platform: 'Bugcrowd' },
  { company: 'Constant Contact', platform: 'Bugcrowd' },
  { company: 'BlueJeans Network', platform: 'Bugcrowd' },
  // YesWeHack
  { company: 'Swiss Post', platform: 'YesWeHack' },
  { company: 'OVHCloud', platform: 'YesWeHack' },
  { company: 'Deezer', platform: 'YesWeHack' },
  { company: 'Keycloak', platform: 'YesWeHack' },
  { company: 'BIND 9', platform: 'YesWeHack' },
  { company: 'OpenProject', platform: 'YesWeHack' },
  { company: 'StashAway', platform: 'YesWeHack' },
  { company: 'Superbank', platform: 'YesWeHack' },
  { company: 'Nextcloud', platform: 'YesWeHack' },
  { company: 'Ohtuleht', platform: 'YesWeHack' },
  // Immunefi
  { company: 'Kiln (dApp / Infra)', platform: 'Immunefi' },
  // Google VRP
  { company: 'Google', platform: 'Google VRP' },
];
