import { Post, Project, PublishedCVE, Acknowledgment, ExperienceEntry, EvidenceMetric } from './types';
import writingData from './data/writing.json';

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
  role: 'Senior Application Security Engineer',
  location: 'Istanbul, Turkey · Open to Europe / US / UAE / Remote',
  availability: {
    statement: 'Open to Europe / US / UAE / Remote',
    location: 'Istanbul, Turkey',
  },
  bio: 'Application security engineer with 10+ years in offensive and application security across banking, telecom, aviation, insurance and e-commerce. Web, API and mobile security testing, threat modeling and CI/CD security. Bugcrowd Top 100 (2018), 150+ validated vulnerabilities, credited for CVE-2026-31974 (OpenProject). OSCP+, eWPTx, eMAPT, CASP.',
  socials: {
    linkedin: 'https://www.linkedin.com/in/adilburaksen/',
    github: 'https://github.com/adilburaksen',
    x: 'https://x.com/adilburaksen',
    website: 'https://hackwith.me/',
    email: 'adilburaksen@proton.me',
  },
  experience: [
    {
      company: 'Self-employed',
      role: 'Independent Security Researcher (Bug Bounty)',
      period: '2018 – Present',
      highlight:
        'Bugcrowd Top 100 (2018). 400+ reports and 150+ validated vulnerabilities on Bugcrowd, Synack Red Team, YesWeHack, Intigriti and Immunefi. Credited for CVE-2026-31974 (OpenProject). Broken Function Level Authorization at Indeed reclassified from Informational to P1 after re-triage ($10,000 bounty).',
    },
    {
      company: 'Abu Dhabi Commercial Bank (ADCB)',
      role: 'Senior Application Security / Red Team Engineer (Contract)',
      period: '2025 – 2026',
      highlight:
        'Led STRIDE threat modeling for a 14-microservice CIAM platform; 52-finding risk register (7 Critical, 16 High) with a remediation roadmap. Reviewed CI/CD pipeline security for a mobile banking backend. Tested the Android banking app against 140 MASVS test cases (25 findings, 6 Critical).',
    },
    {
      company: 'Kafein Technology Solutions',
      role: 'Application Security Senior Consultant',
      period: '2024 – 2025',
      highlight:
        'Security assessments and secure code reviews for Python, Go, Java and TypeScript products. Set up SAST, SCA, DAST and secrets scanning for 10+ client teams. Triaged bug bounty and VDP reports. Trained 100+ developers on the OWASP API Security Top 10.',
    },
    {
      company: 'Future Technology Systems Co. (FutureTEC), Kuwait',
      role: 'Penetration Tester & Application Security Senior Engineer',
      period: '2023 – 2024',
      highlight:
        '15+ penetration tests covering web, API, internal infrastructure and network. 200+ findings including SQL injection, authentication and access control issues; 90% fixed within SLA. Advised three banks on zero-trust network redesign.',
    },
    {
      company: 'Barikat Cybersecurity',
      role: 'Penetration Tester & Red Team Senior Specialist',
      period: '2022 – 2023',
      highlight:
        'Web, mobile, API, network and physical security assessments for aviation clients. Worked with IT/OT teams on remediation and retested every finding before go-live.',
    },
    {
      company: 'Ana Sigorta',
      role: 'Information Security Senior Specialist',
      period: '2021 – 2022',
      highlight:
        'Red team and vulnerability assessments across web, network and cloud. Owned risk analysis, control rollout and the PCI-DSS audit; passed on the first attempt.',
    },
    {
      company: 'Intertech',
      role: 'Application Security Engineer',
      period: '2020 – 2021',
      highlight:
        'Started in pentesting, then led DevSecOps; added security gates to 700+ Jenkins pipelines. Ran an 8-month security academy for 500+ developers; later scans showed 30% fewer OWASP Top 10 issues.',
    },
    {
      company: 'Various companies incl. PwC Turkey',
      role: 'Cybersecurity Consultant (part-time)',
      period: '2016 – 2020',
      highlight:
        'Part-time consulting for energy, aviation, defense and technology clients while studying Computer Engineering. PwC Turkey internship: web, network and mobile testing.',
    },
  ] as ExperienceEntry[],
  certifications: [
    { name: 'OSCP+ / OSCP', detail: '— OffSec, 2025' },
    { name: 'eWPTx', detail: '— INE, 2026' },
    { name: 'eMAPT', detail: '— INE, 2026' },
    { name: 'Certified API Security Professional', detail: '(CASP) — Practical DevSecOps, 2026' },
    { name: 'Certified DevSecOps Professional', detail: '(CDP) — Practical DevSecOps, 2024' },
    { name: 'CEH Master', detail: '— EC-Council, 2023 (expired 2026)' },
    { name: 'ISO 27001 Lead Auditor', detail: '— 2022 (expired 2025)' },
  ] as Certification[],
  stack: [
    'Python / Bash / PowerShell / JavaScript / Java',
    'Burp Suite / Metasploit / BloodHound / Nmap',
    'Fortify / SonarQube / Coverity / Nexus IQ',
    'Jenkins / GitLab CI / GitHub Actions',
    'AWS / Azure / Docker / Kubernetes',
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
    detail: 'eWPTx — INE · eMAPT — INE · CASP',
  },
  {
    label: 'Experience',
    value: '10+ years',
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

export const RESEARCH_POSTS: Post[] = writingData as Post[];

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
    severity: 'Low',
    year: '2026',
    description:
      'Blind SSRF through webhooks and the SMTP test endpoint. Reported independently through the YesWeHack OpenProject program and credited in the advisory. Fixed in v17.2.0.',
    link: 'https://github.com/opf/openproject/security/advisories/GHSA-9wr7-j98g-2jh3',
    role: 'Reporter',
  },
];

export const ACKNOWLEDGMENTS_INTRO =
  'Companies that have publicly acknowledged my responsible disclosures across bug bounty platforms. Bugcrowd Top 100 (2018) with 400+ reports submitted, 150+ validated across Bugcrowd, YesWeHack, Immunefi, and Google VRP.';

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
  { company: 'Indeed', platform: 'Bugcrowd' },
  { company: 'Block Open Source', platform: 'Bugcrowd' },
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
