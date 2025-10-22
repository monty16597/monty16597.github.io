import React from "react";
import { motion } from "framer-motion";

const Experiences = () => {
  const experiences = [
    {
      companyName: "GFL Environmental",
      position: "DevOps Engineer/Platform Engineer",
      description: "At GFL Environment, I designed a centralized Infrastructure as Code (IaC) solution with Terraform and Terragrunt, reducing development time and errors by 70%, enhanced AWS security with cross-account IAM roles, developed a cloud-based vehicle tracking system, implemented robust CI/CD pipelines, orchestrated AWS Organization setup, and improved application observability with AWS Xray and Cloudwatch.",
      duration: "Jan 2025 - Apr 2025",
      skills: ["Terraform", "Terragrunt", "AWS", "IAM", "AWS Organizations", "Multi-Account Management", "AWS Xray", "Cloudwatch Application Signals", "Vehicle Tracking Systems", "Centralized IaaC", "Centralized CI/CD", "Infrastructure Security"],
      location: "Vaughn, Ontario, Canada",
      accentColor: "rgba(56, 189, 248, 0.8)" // Neon blue
    },
    {
      companyName: "LambdaTest",
      position: "DevOps Engineer",
      description: "At LambdaTest, I enabled zero downtime deployments on bare metal servers using Python and Ansible, automated device enrollment and Terraform operations, developed CI/CD pipelines for multiple languages, optimized infrastructure costs by 30% annually, managed multi-region operations, and secured Apple device certifications and setups using Vault, Jenkins, and MDM.",
      duration: "Dev 2021 - Mar 2023",
      skills: ["Python", "Ansible", "Device Onboarding Automation (MacOS, Ubuntu, Android, iOS)", "Terraform", "Golang", "Python", "Node.js", "Infrastructure Cost Reduction", "Application Management", "HashiCorp Vault", "Jenkins", "Apple Device Certification Automation", "Mobile Device Management (MDM)", "Bare Metal Server Automation"],
      location: "Noida, Uttar Pradesh, India",
      accentColor: "rgba(139, 92, 246, 0.8)" // Neon purple
    },
    {
      companyName: "EkZero",
      position: "DevOps Engineer",
      description: "At EkZero, I architected centralized monitoring and logging with the ELK stack, migrated applications to automated IaC deployments, modernized systems for scalability with Kubernetes/ECS, improved infrastructure agility with AWS and containerization, enhanced security with SSO via Keycloak, and led the DevOps team to greater reliability and scalability.",
      duration: "Apr 2021 - Dec 2021",
      skills: ["ELK Stack (Elasticsearch, Logstash, Kibana)", "Terraform", "AWS", "Kubernetes", "ECS", "Scalability", "High Availability", "Single Sign-On (SSO)", "Keycloak", "DevOps Team Management"],
      location: "Vadodara, Gujarat, India",
      accentColor: "rgba(16, 185, 129, 0.8)" // Green
    },
    {
      companyName: "OpenXcell",
      position: "DevOps Engineer",
      description: "At OpenXcell, I managed DevOps for 12 projects, implemented centralized monitoring with Nagios and Icinga, reduced infrastructure costs by 80% using serverless architecture, improved response times by 75%, protected against high-volume DDoS attacks, developed a machine learning-based backend, accelerated release cycles by 66%, and administered production-grade Kubernetes clusters for multi-tenancy workloads.",
      duration: "Jul 2019 - Feb 2021",
      skills: ["Multi-Project Oversight", "Nagios", "Icinga", "Datadog", "Elastic Stack", "Cost Optimization", "Response Time Reduction", "DDoS Protection", "Python-Based Backend Development", "Accelerated Release Cycles", "Kops", "Rancher", "Kubeadm", "Kubernetes", "Multi-Tenancy Workloads", "Solution Architecture", "System Design"],
      location: "Ahemdabad, Gujarat, India",
      accentColor: "rgba(217, 119, 6, 0.8)" // Amber
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative py-10">
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-10 left-10 rounded-full"
        style={{ 
          width: 180, 
          height: 180, 
          background: "rgba(56, 189, 248, 0.06)",
          filter: "blur(60px)",
          zIndex: 0
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.06, 0.08, 0.06] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      
      <motion.div
        className="absolute bottom-40 right-10 rounded-full"
        style={{ 
          width: 220, 
          height: 220, 
          background: "rgba(139, 92, 246, 0.07)",
          filter: "blur(70px)",
          zIndex: 0
        }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.07, 0.1, 0.07] 
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity, 
          repeatType: "reverse",
          delay: 1
        }}
      />

      {/* Section heading */}
      <motion.div 
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-white inline-block relative">
          Work Experience
          <span className="absolute -bottom-3 left-0 right-0 h-1 rounded-full" 
            style={{ 
              background: "linear-gradient(90deg, rgba(56, 189, 248, 0.8) 0%, rgba(139, 92, 246, 0.8) 50%, rgba(217, 119, 6, 0.8) 100%)" 
            }}>
          </span>
        </h2>
      </motion.div>

      {/* Experiences list */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl mx-auto"
      >
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            variants={item}
            className="mb-16 last:mb-0 relative"
          >
            {/* Vertical timeline line except for last item */}
            {index !== experiences.length - 1 && (
              <div 
                className="absolute left-6 top-16 bottom-0 w-0.5" 
                style={{ 
                  background: "rgba(55, 65, 81, 0.5)" 
                }}
              />
            )}
            
            <div className="flex">
              {/* Timeline dot */}
              <motion.div 
                className="relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-6 z-10"
                style={{ 
                  background: "rgba(17, 24, 39, 0.8)",
                  border: `2px solid ${exp.accentColor}`,
                  boxShadow: `0 0 8px ${exp.accentColor}`
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: `0 0 15px ${exp.accentColor}`
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={exp.accentColor}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.div>
              
              {/* Content */}
              <div className="flex-grow">
                <motion.div 
                  className="backdrop-blur-md rounded-2xl overflow-hidden"
                  style={{ 
                    background: "rgba(17, 24, 39, 0.4)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(55, 65, 81, 0.5)"
                  }}
                  whileHover={{ 
                    borderColor: exp.accentColor,
                    transition: { duration: 0.2 } 
                  }}
                >
                  {/* Header */}
                  <div className="p-5" style={{ 
                    background: `linear-gradient(90deg, rgba(17, 24, 39, 0.7) 0%, rgba(17, 24, 39, 0.3) 100%)`,
                    borderBottom: "1px solid rgba(55, 65, 81, 0.3)"
                  }}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-white font-heading font-bold text-xl mb-1">
                          {exp.companyName}
                        </h3>
                        <h4 className="font-medium" style={{ color: exp.accentColor }}>
                          {exp.position}
                        </h4>
                      </div>
                      
                      <div className="flex flex-col text-sm mt-2 md:mt-0 md:items-end text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {exp.duration}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Experiences;
