import { 
  ExternalLink, 
  Cpu
} from 'lucide-react';
import SectionHeader from './SectionHeader';


const Projects = ({ PROJECTS }) => {
  return (
    <section className="mb-20">
      <SectionHeader title="Featured Projects" icon={Cpu} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project, idx) => (
          <div key={idx} className="group relative bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={20} className="text-blue-400" />
            </div>
            
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              {project.icon}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map(t => (
                <span key={t} className="text-xs font-medium px-2 py-1 rounded bg-white/5 text-slate-400 border border-white/5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
