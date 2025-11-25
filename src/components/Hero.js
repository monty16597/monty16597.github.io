import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Globe,
  MapPin,
} from 'lucide-react';

const Hero = ({PROFILE}) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20 border-b border-white/5 pb-12">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-medium text-emerald-400 tracking-wider uppercase">Open to Work</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
          {PROFILE.name}
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 font-light mb-6 flex items-center gap-2">
          <Terminal size={20} className="text-blue-500" /> 
          {PROFILE.role}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
          <span className="flex items-center gap-1.5"><MapPin size={16}/> {PROFILE.location}</span>
          <span className="hidden md:inline text-slate-700">|</span>
          <a href={`mailto:${PROFILE.email}`} className="hover:text-white transition-colors flex items-center gap-1.5"><Mail size={16}/> {PROFILE.email}</a>
        </div>
      </div>

      <div className="flex gap-4">
        <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-slate-900 border border-white/10 rounded-xl hover:bg-blue-600 hover:border-blue-500 transition-all group">
          <Linkedin className="text-slate-400 group-hover:text-white" size={24} />
        </a>
        <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="p-3 bg-slate-900 border border-white/10 rounded-xl hover:bg-slate-800 transition-all group">
          <Github className="text-slate-400 group-hover:text-white" size={24} />
        </a>
      </div>
    </header>
  );
};

export default Hero;
