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
    id: 'the-age-of-insecurity',
    title: 'The Age of Insecurity: Human Nature in a Tech-Driven World',
    date: '2025-04-10',
    tags: ['Society', 'Tech', 'AI'],
    summary: 'Reflections on social insecurity, the false conflict between humans and machines, and navigating the golden age of digital literacy.',
    content: `The Age of Insecurity: Human Nature in a Tech-Driven World

https://miro.medium.com/v2/resize:fit:720/format:webp/1*x8lJVrhhKPWPUU8m1jxPVg.gif

People are so confused, folks! And this is happening in the most modern age — an era where we could be at our most productive. Everyone feels like they’re constantly on the verge of slipping. Is it the influence of social media? Or perhaps the weariness caused by the rapid transitions we’ve been swept into over the years, now manifesting as a kind of passive lethargy? Hard to say. Still, we tend to be overly judgmental on certain topics. Especially when it comes to technological advancements…

https://miro.medium.com/v2/resize:fit:720/format:webp/1*0ZFxsQYUn2GVNvm1SOk0TA.gif

Life tends to evolve in line with the culture you were raised in — at least for most people considered “normal” by societal standards. Yet despite that, people remain so blind to their own upbringing — probably because they’ve grown up deeply ingrained in those very impulses — that they end up displaying the very behaviors they claim to despise. They hate it, they say they’d never do it — “I’d never act that way!” or “I could never stay silent in such situations!” — and then, without realizing it, they become exactly what they criticized. Still, these individuals continue to live within society, surrounded by thousands of metaphorical mirrors… and yet somehow, they never recognize their reflection.

https://miro.medium.com/v2/resize:fit:1100/format:webp/1*2Vl2VniJPuAg07adS1_M2Q.gif

So how does all of this connect to our topic? Well, the world is — albeit very slowly — heading toward a kind of unification. Whether the shared concerns of people in the Middle East and those in Europe stem from globalization or the cyclical nature of history, I don’t know. But we are collectively inching toward a common ground. Why? Because the technological innovations we’re currently living through, coupled with the ongoing waves of migration over recent years, have started to place people in a state of total social insecurity. And as everyone knows — or should know — the human being, the individual, the “rational animal,” whatever you want to call it… needs to feel secure in order to exist meaningfully. Today, that sense of security — both material and emotional — is rapidly being replaced by a deep-rooted feeling of instability.

https://miro.medium.com/v2/resize:fit:640/format:webp/1*gWzlAT_dyLXotTyPS6VYbQ.gif

In fact, since the 1990s, this underlying sense of unease has been slowly dismantling our comfort zone — just look at the various global crises. But in the past 5 to 10 years, it has escalated at an alarming pace, becoming a shared, visceral discomfort for nearly everyone.

It’s gotten to the point where people, already locked in daily competition with one another, now realize they’re also being thrown into a race against machines. Every day, news related to AI or some tech startup transforms into a virtual street brawl, with people splitting into opposing sides and throwing arguments at each other like bricks. And yet, for centuries — maybe even longer — we humans have been engaged in an endless internal conflict. Without resolving any of that, we’ve now dragged machines into the fray, and I think that’s what’s really throwing people into a state of deep confusion. — At least, that’s my take on it.

https://miro.medium.com/v2/resize:fit:720/format:webp/1*cJ969cIIAMtG1W2n8Hz0Kw.gif

But the real root of our endless arguments and fights might actually come down to a lack of standards. How so? This morning, while rushing through the metro, I noticed something — when people grow up in an environment without rules, they stop caring about what’s right or wrong toward others. And when they’re cornered, they simply blame the other party. I was thinking about all this just by observing how people clustered and moved around on the platform. Some were walking on the far right, allowing faster walkers to pass. But most moved haphazardly, without giving space to anyone behind them. A simple observation, sure — but I truly believe it reveals something.

Then a thought crossed my mind: What if we sat these people down, had a calm conversation, listened to their stories and dreams, and asked them whether they’d like to live in a utopia we described? Most of them would probably say, “Yes, I would.” Yet, instead of trying to build that utopia in the world they already live in, they resign themselves to simply surviving, believing they’re crushed beneath a wall — never even checking whether they have any tools to break through it.

https://miro.medium.com/v2/resize:fit:388/format:webp/1*Z_bmryh4ZhBzEIPK0XPYcw.gif

So… after all this long rant, where am I trying to get to?

AI — artificial intelligence — is currently on the verge of opening countless opportunities for us. And realistically, there may never be another moment like this. In the future, either monopolization will become even worse than it is today, or doing business globally will no longer be this accessible. Despite this, one group yells, “AI WILL TAKE OUR JOBS, WE’LL BE UNEMPLOYED,” while another insists, “AI CAN’T REPLACE HUMANS — CAN IT EVEN BATHE ITSELF?”

https://miro.medium.com/v2/resize:fit:720/format:webp/1*rN-CYBmTaTk3_qJYKU_WBQ.gif

Dear reader, please — don’t fall into that mindset.

Let’s agree that this is nonsense spread by so-called influencers addicted to attention and engagement. Now, let me propose another idea and slowly wrap things up.

If you believe that AI is making you lazier or dumber, then limit your use of social media — especially the endless scroll of short-form visual content. If you keep asking AI the same questions and find yourself unable to internalize the answers, that’s not a failure of the tool — that’s on the user. If you’re not trying to dissect concepts, dive deeper, or have a real, exploratory conversation — if you’re only using it for quick answers, like having it generate a command instead of learning how to do it yourself — then you’re already setting yourself up for failure.

You’re becoming dependent on convenience — and whether that convenience comes from AI or a person handing you solutions doesn’t really matter. The result is the same.

Right now, we are living in a golden age for those with digital literacy, curiosity, and a love for hands-on practice. Anyone who uses this time wisely will find their own path. Those who only consume it to get by… well, deep down, they already know where they’re headed.

Anyway…

Just a few thoughts circling my mind — and I figured I’d tap them out on the keyboard.

Take care,
Adil Burak aka 0racLe

https://miro.medium.com/v2/resize:fit:720/format:webp/1*H3G9DmXc_HjjBluSEqtfng.gif`
  },
  {
    id: 'how-long-has-it-been',
    title: 'How long has it been?',
    date: '2025-04-06',
    tags: ['Personal', 'Growth', 'Reflection'],
    summary: 'Reflections on the passage of time, the skill of laziness, and breaking the armor of inertia.',
    content: `Years ago… Many, many years ago… A young boy, driven by a passion for reading and writing, turned this curiosity into a journey of research — one that eventually became a habit intertwined with his daily life. This habit fueled his desire to gain new experiences and nurtured an inner urge to share them with others.

https://miro.medium.com/v2/resize:fit:750/format:webp/1*UisyKtMICKGph85SyHZeaw.gif

Yet, over time, he realized — like we all do — that the most powerful force shaping human growth is time itself. And as time went on, that very habit slowly drifted out of his life. This detachment sadly stretched over the years, and what was once a habit that used to ignite his inner fire morphed into a full-blown skill of laziness. Yes, a skill. It earned that name because it was masterfully used to self-sabotage — stepping in every time he tried to act on an idea, holding him back with nothing but his own hands.

https://miro.medium.com/v2/resize:fit:750/format:webp/1*UIKPlM_Uzl3IWJYALuFmPw.gif

An extended university life, a pandemic, injuries, and psychological turmoil… Eventually, this process evolved into more than just a habit or a skill; it became a kind of armor. And breaking this armor turned out to be far more difficult than imagined. Perhaps things could have been different with a crowd of people around to motivate him. But as the years passed, collaborating with others or inspiring one another became a barren desert. Whenever he voiced a dream or tried to create the conditions to bring one to life, a massive tumbleweed — like in an old western cartoon — would roll by in silence. And all he was left with was the empty gaze of ears that heard but did not listen.

https://miro.medium.com/v2/resize:fit:750/format:webp/1*dlHsfxwTWiK_CDd_Q0EtJg.gif

Time… That abstract force that ticks on as hours pass, replacing physical vitality with so-called wisdom — etched in the lines of our bodies — somehow manages to manifest in very tangible ways. These effects, disguised as experience, show up again and again in real-life laboratories — our streets, our daily lives. And you see, you’re not called “guilty” for not knowing or having experienced something — you’re simply “inexperienced.” But time, in its own way, gently removes that label as you rise or fall through its stages, offering the chance to gain experience. Whether you grow from it or not — whether you learn from the recurring scenarios in your life — is entirely up to you. In this sense, life is nothing more than a collection of experiences earned from a staged wrestling match between humans and time.

https://miro.medium.com/v2/resize:fit:720/format:webp/1*DytGfEBJt_wgEqlQKZDAvA.gif

And my dear friends, beloved readers… I believe I’ve taken at least a few lessons from my share of that struggle, and I take joy in sharing this with you today.

https://miro.medium.com/v2/resize:fit:640/format:webp/1*gWnyrRjTNJxddWB31De6ag.gif

From now on, I will try to replace this “skill of laziness” with the old habit of researching and sharing once again. Through Medium or my personal blog, I’ll show you that those long years weren’t entirely wasted — that I was still reading, still exploring, in the background. And hopefully, with a cup of coffee in hand and the fatigue of the day on your shoulders, you’ll find space to read my reflections, engage with my thoughts, and share your own. I truly hope that in this journey, you’ll enjoy joining me from time to time — and when you do, I kindly ask that you share your thoughts, whether positive or critical. Just remember: I might still be “inexperienced” in some areas of your journey too, and I’d love for your feedback to help me grow.

x0x0,
Adil Burak aka 0racLe`
  }
];

export const PROJECTS: Project[] = [];