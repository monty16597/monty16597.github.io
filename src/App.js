import { 
  Server,
  Cloud,
  Container,
  Bot,
} from 'lucide-react';
import Hero from './components/Hero';
import AboutBento from './components/AboutBento';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';


const PROFILE = {
  name: "Manjeetsinh Alonja",
  role: "DevOps & GenAI Engineer",
  location: "Kitchener, Ontario, Canada",
  phone: "(548) 398-0363",
  email: "alonjamanjeetsinh77@gmail.com",
  summary: "DevOps Engineer with 6+ years of experience bridging the gap between robust infrastructure and cutting-edge AI. Specialized in Cloud Engineering, System Design, and recently focused on GenAI process automation using Large Language Models, Agentic Systems, and RAG architectures.",
  socials: {
    github: "https://github.com/monty16597",
    linkedin: "https://www.linkedin.com/in/manjeetsinh-alonja/",
  }
};

const SKILLS = {
  genai: [
    "LangChain", "LangGraph", "LangFlow", "Agentic AI", "RAG & CAG", "VectorDB", "Prompt Engineering", "Multi-Agent Systems"
  ],
  cloud: [
    "AWS", "Azure", "Terraform", "Terragrunt", "AWS CDK", "Ansible"
  ],
  orchestration: [
    "Kubernetes", "Docker", "EKS", "AKS", "Helm", "ArgoCD", "Jenkins", "GitHub Actions"
  ],
  languages: [
    "Python", "Flask", "FastAPI", "React (Beginner)", "SQL", "Bash"
  ]
};

const CERTIFICATIONS = [
  "AWS Solution Architect Associate (SAA)",
  "Certified Kubernetes Administrator (CKA)",
  "Azure Administrator (AZ-104)",
  "Terraform Associate"
];

const EXPERIENCE = [
  {
    company: "BytesCraft",
    role: "DevOps Engineer (GenAI Engineer)",
    type: "Remote",
    period: "June 2024 - Present",
    description: "Spearheading the integration of Agentic AI into DevOps workflows.",
    achievements: [
      "Designed Production Support GenAI app using LangGraph for automated Root Cause Analysis (RCA) from AWS alarms.",
      "Developed Agentic L1 support systems leveraging LangChain and Ollama.",
      "Centralized MCP (Microservices Control Plane) and Tool libraries for cross-application use.",
      "Standardized FastAPI and LangGraph ecosystems for scalable AI deployment.",
      "Managed infrastructure via AWS CDK and GitHub Actions."
    ]
  },
  {
    company: "GFL Environment",
    role: "DevOps Engineer - CoOp",
    type: "Vaughn, ON",
    period: "Jan 2025 - Apr 2025",
    description: "Focused on centralized IaaC and observability enhancements.",
    achievements: [
      "Designed centralized IaaC solution (Terraform/Terragrunt) reducing dev time by 70%.",
      "Implemented architectural IAM roles with cross-account access for AWS Organizations.",
      "Developed cloud-based vehicle location tracking to optimize operational costs.",
      "Implemented AWS X-Ray and CloudWatch Application Signals for .NET observability."
    ]
  },
  {
    company: "LambdaTest",
    role: "DevOps Engineer",
    type: "Noida, India",
    period: "Dec 2021 - Mar 2023",
    description: "High-scale infrastructure management for a testing platform.",
    achievements: [
      "Optimized infrastructure costs by $10,000/month ($120k/year) via resource tuning.",
      "Enabled Zero Downtime Deployments on Bare Metal Servers using Python & Ansible.",
      "Reduced bare-metal hardware onboarding time by 75%.",
      "Automated Apple device certifications using Hashicorp Vault and Jenkins."
    ]
  },
  {
    company: "EkZero",
    role: "DevOps Engineer",
    type: "Vadodara, India",
    period: "Apr 2021 - Dec 2021",
    description: "Established core DevOps practices and monitoring stacks.",
    achievements: [
      "Architected central monitoring/logging using ELK Stack.",
      "Migrated legacy apps to IaaC (Terraform) with automated deployments.",
      "Implemented SSO for DevOps tools using Keycloak."
    ]
  },
  {
    company: "OpenXcell",
    role: "DevOps Engineer",
    type: "Ahmedabad, India",
    period: "July 2019 - Mar 2021",
    description: "Managed high-traffic product infrastructure.",
    achievements: [
      "Managed On-Premise SEO Product for 25,000 Active Users.",
      "Reduced Infrastructure Costs by 80% through Serverless Architecture migration.",
      "Protected against 1M RPM DDoS attacks.",
      "Developed Python-based ML backend for bacteria detection."
    ]
  }
];

const PROJECTS = [
  {
    title: "Production Support GenAI Agent",
    tech: ["LangGraph", "LangChain", "AWS", "Postgres/PGVector"],
    description: "Real-time Root Cause Analysis generator. Implemented Multi-Agent systems interacting with Slack, Jira, and AWS tools. Uses RAG to mitigate hallucinations and Postgres for state persistence.",
    icon: <Bot size={24} />
  },
  {
    title: "Kubernetes GenAI Agent",
    tech: ["Kubernetes MCP", "LLMs", "Go/Python"],
    description: "Agentic application automating K8s operations. Interfaces with Kubernetes MCP server to execute cluster tasks and dynamically generate manifest YAMLs via LLMs.",
    icon: <Container size={24} />
  },
  {
    title: "LocalStack Contribution",
    tech: ["Python", "AWS SDK", "Open Source"],
    description: "Contributor to the popular AWS cloud simulation tool (50k+ stars). Implemented S3 Signing Algorithms and Terraform/Boto3 SDK integrations.",
    icon: <Cloud size={24} />
  },
  {
    title: "GenAI Incident Creator",
    tech: ["Multi-Agent", "CloudWatch", "AWS API"],
    description: "Natural language interface for creating AWS alarms. Comprises CloudWatch Metric Agents and Log Agents to automatically determine resource types and set thresholds.",
    icon: <Server size={24} />
  }
];



const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 relative z-10">
        <Hero PROFILE={PROFILE} />
        <AboutBento PROFILE={PROFILE} CERTIFICATIONS={CERTIFICATIONS} SKILLS={SKILLS} />
        <Experience EXPERIENCE={EXPERIENCE} />
        <Projects PROJECTS={PROJECTS} />
        <Footer PROFILE={PROFILE} />
      </div>
    </div>
  );
};

export default App;