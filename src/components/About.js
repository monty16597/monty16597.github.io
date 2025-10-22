import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="w-full">
      <div className="glass-card p-6 md:p-8 relative overflow-hidden">
        {/* Background glow effect */}
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-neon-purple opacity-10 glow-effect"
          style={{ filter: "blur(80px)" }}
        />
        
        <div className="relative z-10">
          <div className="flex flex-col gap-10 md:flex-row md:items-start">
            {/* Bio Content */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-3xl font-bold text-white mb-2">
                A bit about me
              </h3>
              <h4 className="text-xl text-neon-blue mb-4 font-medium">
                Software Engineer - DevOps Engineer
              </h4>
              
              <div className="space-y-4 text-gray-300 text-base leading-relaxed">
                <p>
                  I'm a passionate Software and DevOps Engineer with over 5 years of experience building 
                  scalable cloud infrastructure and developing robust applications. My expertise includes 
                  containerization with Docker, orchestration with Kubernetes, and implementing CI/CD 
                  pipelines using Jenkins and GitHub Actions.
                </p>
                
                <p>
                  I specialize in automating deployment processes, optimizing system performance, and 
                  ensuring high availability of services. My background in both software development
                  and infrastructure management allows me to bridge the gap between development and 
                  operations teams effectively.
                </p>
                
                <p>
                  Currently, I'm focused on cloud-native technologies and microservices architecture,
                  working with AWS and Azure to design resilient systems. I'm passionate about DevSecOps
                  practices and implementing security measures throughout the development lifecycle.
                </p>
                
                <p>
                  In my free time, I contribute to open-source projects and share my knowledge through
                  technical blogs and community events. I'm always eager to learn new technologies and
                  stay updated with the latest industry trends to deliver innovative solutions.
                </p>
              </div>
              
              {/* Skills Tags */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                {["AWS", "Azure", "Kubernetes", "Docker", "Jenkins", "GitHub Actions/Workflows", "Ansible", "Terraform", "Terragrunt", "Keycloak", "Oauth", "SAML", "Windows", "Linux", "MacOs", "Git", "GitHub", "GitLab", "Bitbucket", "Datadog", "Sumologic", "Prometheus", "Grafana", "ELK Stack (ElasticSearch, Logstash, Kibana)", "Cloudwatch", "MySQL", "MongoDB", "DynamoDB", "Redis", "Jira", "Agile", "REST and SOAP APIs", "Java", "Python", "Javascript", "NodeJs", "Golang", "Gradle", "NPM", "PIP", "Native Cloud Architecture", "Solution Architecture"].map((skill, index) => (
                  <motion.span 
                    key={index}
                    className="px-3 py-1 rounded-full text-sm bg-glass-secondary border border-glass-border text-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(56, 189, 248, 0.2)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
