import { ThemeProvider } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experiences from "./components/Experiences";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import BackgroundElements from "./components/BackgroundElements";
import Certification from "./components/Certifications";

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxValue = scrollY * 0.2;

  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-hidden">
        {/* Interactive Background Elements */}
        <BackgroundElements scrollY={scrollY} />
        
        {/* Navbar */}
        <NavBar />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero Section */}
          <section id="home" className="min-h-screen flex items-center">
            <Hero />
          </section>
          
          {/* About Section */}
          <motion.section 
            id="about" 
            className="py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <About />
          </motion.section>
          
          {/* Experience Section */}
          <motion.section 
            id="experiences" 
            className="py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Experiences />
          </motion.section>

          {/* Certification Section */}
          <motion.section 
            id="certifications" 
            className="py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Certification />
          </motion.section>
          
          {/* Projects Section */}
          <motion.section 
            id="projects" 
            className="py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Projects />
          </motion.section>
          
          {/* Contact Section */}
          <motion.section 
            id="contact" 
            className="py-20 pb-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Contact />
          </motion.section>
        </div>
        
        {/* Footer */}
        <footer className="py-8 border-t border-glass-border backdrop-blur-md bg-glass-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-300">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="font-sans text-sm">
                © {new Date().getFullYear()} Manjeetsinh Alonja. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
