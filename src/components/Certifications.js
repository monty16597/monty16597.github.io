import { motion } from "framer-motion";
import badgeCka from "../assets/img/cka.png";
import badgeAws from "../assets/img/aws_solution_architect_associate.png";
import badgeAzure from "../assets/img/azure_admin.png";
import badgeTerraform from "../assets/img/terraform_associate.png";
const certifications = [
  {
    name: "AWS Solutions Architect",
    url: "https://www.credly.com/badges/0704fc18-2067-469d-8eec-22af3393aa08/public_url",
    img: badgeAws,
  },
  {
    name: "Azure Administrator Associate",
    url: "https://learn.microsoft.com/api/credentials/share/en-ca/ManjeetsinhRajendrasinhAlonja-4532/9CAFE7AF2DD52CAD?sharingId=A40090DEAF803874",
    img: badgeAzure,
  },
  {
    name: "HashiCorp Terraform Associate",
    url: "https://www.credly.com/badges/4a91e7f4-e2a1-4ca3-9b46-583bf5751030/public_url",
    img: badgeTerraform,
  },
  {
    name: "Certified Kubernetes Administrator",
    url: "https://www.credly.com/badges/77dc87ad-7c35-4c2d-b4b7-c921cba72208/public_url",
    img: badgeCka,
  },
  // Add more certifications as needed
];

const Certifications = () => {
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
        className="text-center mb-16 relative z-10 text-wrap"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-white inline-block relative">
          Certifications
          <span className="absolute -bottom-3 left-0 right-0 h-1 rounded-full" 
            style={{ 
              background: "linear-gradient(90deg, rgba(56, 189, 248, 1) 0%, rgba(139, 92, 246, 1) 100%)" 
            }}>
          </span>
        </h2>
      </motion.div>
      <motion.div 
        className="flex flex-wrap gap-10 items-center justify-center max-4xl mx-auto"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {certifications.map((cert) => (
          <motion.a
            key={cert.name}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group"
            title={cert.name}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 } 
            }}
          >
            <motion.img
              src={cert.img}
              alt={cert.name}
              className="w-40 h-40 overflow-auto shadow-lg border-0 border-gray-200 group-hover:border-blue-500 transition duration-300"
            />
            <motion.span className="w-20 mb-5 text-white font-heading text-xl group-hover:text-blue-600 flex flex-col items-center text-center">
              {cert.name.split(" ").map((word, idx) => (
                <span key={idx}>{word}</span>
              ))}
            </motion.span>

          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default Certifications;