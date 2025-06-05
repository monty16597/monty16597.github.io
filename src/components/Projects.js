import React from "react";
import { motion } from "framer-motion";

const ProjectCard = ({ project }) => {
  const { projectName, description, githubLink, techStack, accentColor } = project;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="h-full backdrop-blur-md rounded-2xl overflow-hidden relative group glass-card"
        whileHover={{ 
          borderColor: accentColor,
          y: -5,
          transition: { duration: 0.2 } 
        }}
      >
        {/* Color accent line at top of card */}
        <div 
          className="h-1.5 w-full"
          style={{ 
            background: `linear-gradient(90deg, ${accentColor} 0%, rgba(17, 24, 39, 0) 100%)` 
          }}
        ></div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-white font-heading font-bold text-xl">{projectName}</h3>
            
            <motion.a 
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-glass-secondary"
              whileHover={{ 
                backgroundColor: `rgba(${accentColor.split('(')[1].split(')')[0].split(',').slice(0, 3).join(',')}, 0.2)`,
                transition: { duration: 0.2 }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={accentColor}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          </div>
          
          <p className="text-gray-300 mb-5 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {techStack.map((tech, idx) => (
              <motion.span
                key={idx}
                className="px-2.5 py-1 rounded-full text-xs bg-glass-secondary border border-glass-border"
                style={{ color: accentColor }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: `rgba(${accentColor.split('(')[1].split(')')[0].split(',').slice(0, 3).join(',')}, 0.15)`,
                  borderColor: accentColor,
                  transition: { duration: 0.2 }
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
        
        {/* Hover effect - subtle glow */}
        <motion.div 
          className="absolute inset-0 opacity-0 rounded-2xl z-0"
          style={{ 
            boxShadow: `0 0 40px ${accentColor}`,
            background: `radial-gradient(circle at center, rgba(${accentColor.split('(')[1].split(')')[0].split(',').slice(0, 3).join(',')}, 0.03) 0%, rgba(17, 24, 39, 0) 70%)` 
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      projectName: "Localstack",
      description: "Contributed to Localstack, a widely recognized open-source AWS cloud simulation project with over 50,000 GitHub stars, by implementing core features such as S3 signing algorithms, S3 and CloudFormation backends in Python. Additionally, designed and integrated Terraform and Boto3 SDK support, enabling seamless compatibility with AWS’s official SDKs.",
      githubLink: "https://github.com/localstack/localstack",
      techStack: ["Terraform", "AWS", "Python", "Boto3", "Localstack"],
      accentColor: "rgba(56, 189, 248, 1)" // Neon blue
    },
    {
      projectName: "Moto",
      description: "Enhanced Moto, a Python-based AWS mocking API library used in Localstack, by integrating and restructuring S3, CloudFormation, and StepFunction APIs to improve AWS simulation capabilities. Also triaged and fixed Terraform AWS test cases, strengthening the reliability of cloud infrastructure testing.",
      githubLink: "https://github.com/getmoto/moto",
      techStack: ["Python", "AWS", "REST - APIs"],
      accentColor: "rgba(139, 92, 246, 1)" // Neon purple
    },
    {
      projectName: "OpenVPN Web UI Extension",
      description: "Adopted and extended an open-source web GUI for the OpenVPN community version, implementing new features and functionalities, including a user-friendly revocation interface, to enhance VPN management through a graphical interface.",
      githubLink: "https://github.com/intrigues/openvpn-web-ui",
      techStack: ["Golang", "OpenVPN", "Web UI"],
      accentColor: "rgba(56, 189, 248, 1)" // Neon blue
    },
    {
      projectName: "Big Data Power Consumption Regression Model",
      description: "Developed a machine learning model using XGBRegression to predict power consumption across three zones in Tetuan City, and built a Flask-based web application to facilitate user interaction and real-time predictions.",
      githubLink: "https://github.com/monty16597/bigdata-power-consumption-regression-model",
      techStack: ["Python", "Flask", "XGBRegression", "Machine Learning"],
      accentColor: "rgba(139, 92, 246, 1)" // Neon purple
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="relative py-10">
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-10 right-10 rounded-full glow-effect"
        style={{ 
          width: 200, 
          height: 200, 
          background: "rgba(56, 189, 248, 0.06)"
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.06, 0.09, 0.06] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-20 rounded-full glow-effect"
        style={{ 
          width: 250, 
          height: 250, 
          background: "rgba(139, 92, 246, 0.07)"
        }}
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.07, 0.1, 0.07] 
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity, 
          repeatType: "reverse",
          delay: 1.5
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
          Projects
          <span className="absolute -bottom-3 left-0 right-0 h-1 rounded-full" 
            style={{ 
              background: "linear-gradient(90deg, rgba(56, 189, 248, 1) 0%, rgba(139, 92, 246, 1) 100%)" 
            }}>
          </span>
        </h2>
      </motion.div>

      {/* Projects grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project} 
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;