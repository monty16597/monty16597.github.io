import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import avatarImg from '../assets/img/avatar.png'; // Replace with your avatar image path

const Hero = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-6">
            <motion.h2 
              className="text-neon-blue font-mono text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Hey there, myself
            </motion.h2>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Manjeetsinh Alonja
            </motion.h1>
            
            <motion.h2 
              className="text-2xl md:text-4xl font-bold text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              I design, build, automate and scale Cloud Infrastructure. 
            </motion.h2>
            
            <motion.p 
              className="text-gray-400 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              I'm a DevOps and Platform Engineer with a passion for creating scalable and efficient cloud solutions. I specialize in designing robust infrastructure, automating workflows, and ensuring high availability of applications.
            </motion.p>
            
            <motion.div 
              className="pt-4 flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Link 
                to="projects" 
                smooth={true} 
                duration={500} 
                offset={-80} 
                className="neon-border"
              >
                <button className="px-6 py-3 text-white bg-glass-primary backdrop-blur-md hover:bg-glass-secondary transition-all duration-300 rounded-xl border border-glass-border">
                  View My Work
                </button>
              </Link>
              
              <Link 
                to="contact" 
                smooth={true} 
                duration={500} 
                offset={-80} 
                className="neon-border"
              >
                <button className="px-6 py-3 text-white bg-transparent hover:bg-glass-primary hover:backdrop-blur-md transition-all duration-300 rounded-xl border border-glass-border">
                  Contact Me
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Right side - 3D element or image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            {/* Main glass card */}
            <div className="glass-card absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <div className="w-32 h-32 md:w-auto md:h-auto mx-auto rounded-full overflow-hidden border-1 border-glass-accent mb-4">
                  <img 
                    src={avatarImg}
                    alt="Manjeetsinh Alonja"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mt-4">Software Engineer</h3>
                <p className="text-gray-300 mt-2">DevOps & Platform Enginner</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-5 -right-5 w-16 h-16 rounded-xl bg-glass-accent opacity-70 backdrop-blur-sm"></div>
            <div className="absolute -top-5 -left-5 w-16 h-16 rounded-xl bg-neon-purple opacity-70 backdrop-blur-sm"></div>
            
            {/* Floating icons */}
            <motion.div 
              className="absolute -top-8 right-10 w-12 h-12 rounded-lg glass-card flex items-center justify-center"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            >
              <span className="text-2xl">⚛️</span>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-10 left-10 w-12 h-12 rounded-lg glass-card flex items-center justify-center"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }}
            >
              <span className="text-2xl">💻</span>
            </motion.div>
            
            <motion.div 
              className="absolute top-1/3 -left-10 w-12 h-12 rounded-lg glass-card flex items-center justify-center"
              animate={{
                x: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut"
              }}
            >
              <span className="text-2xl">🚀</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 