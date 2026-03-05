export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  level: string;
  posted: string;
  postedDate: string;
  description: string;
  requirements: string[];
  skills: string[];
  benefits: string[];
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "LKR 120,000 – LKR 150,000",
    type: "Full-time · Hybrid",
    level: "Senior",
    posted: "2 days ago",
    postedDate: "March 3, 2025",
    description: "We are seeking a talented Senior Frontend Developer to join our growing team. In this role, you will be responsible for developing and maintaining high-quality web applications using modern frontend technologies. You will lead frontend architecture decisions, mentor junior developers, and contribute to our engineering culture. You'll have the opportunity to work on challenging projects that impact thousands of users in a fast-paced, innovative environment.",
    requirements: [
      "5+ years of experience in frontend development.",
      "Expert knowledge of React.js and modern JavaScript (ES6+).",
      "Strong experience with CSS3, HTML5, and responsive design.",
      "Experience with state management libraries (Redux, Zustand).",
      "Familiarity with RESTful APIs, Webpack, and version control (Git).",
      "Strong problem-solving skills and attention to detail.",
      "Bachelor's degree in Computer Science or related field.",
    ],
    skills: ["React.js", "TypeScript", "Redux", "REST APIs", "Tailwind CSS", "Jest", "CI/CD", "Agile"],
    benefits: ["Comprehensive health insurance", "Learning & development budget", "Equity participation", "Remote work flexibility", "Unlimited PTO", "Free meals & snacks"],
  },
  {
    id: 2,
    title: "Product Designer",
    company: "DesignStudio",
    location: "Remote",
    salary: "LKR 95,000 – LKR 120,000",
    type: "Full-time · Remote",
    level: "Mid-level",
    posted: "4 days ago",
    postedDate: "March 1, 2025",
    description: "DesignStudio is looking for a Product Designer to help shape the future of our digital products. You will work closely with engineering and product teams to create intuitive, beautiful experiences. You'll own the design process from research and wireframes to high-fidelity prototypes and handoff.",
    requirements: [
      "3+ years of product or UX/UI design experience.",
      "Strong portfolio demonstrating end-to-end product design.",
      "Proficiency in Figma, Sketch, or similar design tools.",
      "Experience with user research and usability testing.",
      "Excellent communication and collaboration skills.",
    ],
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Wireframing", "Accessibility"],
    benefits: ["Remote-first culture", "Design conference budget", "Health & wellness", "Flexible hours"],
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "CloudScale",
    location: "New York, NY",
    salary: "LKR 130,000 – LKR 160,000",
    type: "Full-time · On-site",
    level: "Senior",
    posted: "1 week ago",
    postedDate: "Feb 26, 2025",
    description: "CloudScale is building the next generation of cloud infrastructure. We need a Backend Engineer to design and implement scalable, reliable services. You'll work with Go, Python, and Kubernetes to power systems used by millions of customers worldwide.",
    requirements: [
      "5+ years of backend or systems engineering experience.",
      "Strong proficiency in Go, Python, or Java.",
      "Experience with distributed systems and microservices.",
      "Knowledge of SQL and NoSQL databases.",
      "Experience with Kubernetes or similar orchestration tools.",
    ],
    skills: ["Go", "Python", "Kubernetes", "PostgreSQL", "Redis", "gRPC", "AWS", "Terraform"],
    benefits: ["Competitive equity", "Health insurance", "Relocation support", "Learning budget"],
  },
  {
    id: 4,
    title: "Marketing Manager",
    company: "GrowthCo",
    location: "Chicago, IL",
    salary: "LKR 80,000 – LKR 105,000",
    type: "Full-time · Hybrid",
    level: "Mid-level",
    posted: "3 days ago",
    postedDate: "March 2, 2025",
    description: "GrowthCo is seeking a Marketing Manager to lead our demand generation and brand campaigns. You will own the marketing funnel, work with sales on pipeline, and drive growth through content, paid channels, and partnerships.",
    requirements: [
      "4+ years of B2B or growth marketing experience.",
      "Hands-on experience with paid acquisition (Google, Meta, LinkedIn).",
      "Strong analytical skills and familiarity with marketing analytics tools.",
      "Experience managing budgets and reporting on ROI.",
    ],
    skills: ["SEO", "Content Marketing", "Google Ads", "HubSpot", "Analytics", "A/B Testing"],
    benefits: ["Hybrid work", "Health benefits", "Team events", "Career development"],
  },
  {
    id: 5,
    title: "Customer Success Specialist",
    company: "Connectly",
    location: "Remote",
    salary: "LKR 60,000 – LKR 75,000",
    type: "Full-time · Remote",
    level: "Entry",
    posted: "5 days ago",
    postedDate: "Feb 28, 2025",
    description: "Join Connectly as a Customer Success Specialist and help our customers get the most out of our platform. You'll onboard new accounts, conduct check-ins, resolve issues, and identify expansion opportunities.",
    requirements: [
      "1+ years in customer success, support, or account management.",
      "Excellent verbal and written communication skills.",
      "Comfortable using CRM tools (e.g. Salesforce, HubSpot).",
      "Empathy and patience when handling customer concerns.",
    ],
    skills: ["Customer Communication", "CRM", "Onboarding", "Problem Solving"],
    benefits: ["Remote work", "Health insurance", "PTO", "Training programs"],
  },
  {
    id: 6,
    title: "Data Analyst",
    company: "Insight Labs",
    location: "Austin, TX",
    salary: "LKR 90,000 – LKR 110,000",
    type: "Full-time · On-site",
    level: "Mid-level",
    posted: "1 week ago",
    postedDate: "Feb 26, 2025",
    description: "Insight Labs is looking for a Data Analyst to turn data into actionable insights. You will build dashboards, run analyses, and support product and business decisions with clear, reliable reporting and recommendations.",
    requirements: [
      "3+ years of experience in data analysis or business intelligence.",
      "Strong SQL skills and experience with data warehouses (Snowflake, BigQuery, Redshift).",
      "Experience with visualization tools (Tableau, Looker, or Metabase).",
      "Understanding of statistics and A/B testing.",
    ],
    skills: ["SQL", "Python", "Tableau", "Excel", "Statistics", "Data Modeling"],
    benefits: ["Health insurance", "401(k)", "Professional development", "On-site gym"],
  },
];

export function getJobById(id: string | undefined): Job | undefined {
  if (id == null) return undefined;
  const numId = Number(id);
  return Number.isNaN(numId) ? undefined : jobs.find((j) => j.id === numId);
}

export function getJobsList() {
  return jobs.map(({ id, title, company, location, salary, type, level, posted }) => ({
    id,
    title,
    company,
    location,
    salary,
    type,
    level,
    posted,
  }));
}
