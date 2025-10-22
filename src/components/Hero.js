import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex justify-center">
          <motion.div
            className="flex w-full max-w-3xl flex-col items-center text-center lg:items-start lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full space-y-6">
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
                className="text-gray-400 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                I'm a DevOps and Platform Engineer with a passion for creating scalable and efficient cloud solutions. I specialize in designing robust infrastructure, automating workflows, and ensuring high availability of applications.
              </motion.p>

              <motion.div
                className="pt-4 flex w-full flex-wrap justify-center gap-4 lg:justify-start"
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
        </div>
      </div>
    </div>
  );
};

export default Hero; 
