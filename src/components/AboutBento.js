import { 
  Terminal, 
  User,
  Cloud,
  Container,
  Bot,
  Award,
} from 'lucide-react';
import Badge from './Badge';

const AboutBento = ({ PROFILE, CERTIFICATIONS, SKILLS }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
      
      {/* Summary Block - Large */}
      <div className="md:col-span-2 bg-slate-900/50 border border-white/5 p-8 rounded-3xl backdrop-blur-sm hover:border-blue-500/20 transition-all">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User size={20} className="text-blue-400"/> About Me
        </h3>
        <p className="text-slate-300 leading-relaxed text-lg">
          {PROFILE.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {CERTIFICATIONS.map((cert, idx) => (
            <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg border border-white/5 text-xs text-slate-300">
              <Award size={14} className="text-amber-400" /> {cert}
            </div>
          ))}
        </div>
      </div>

      {/* Stats/Quick Info */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white relative overflow-hidden group">
         <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <h3 className="text-white/80 font-medium mb-1">Experience</h3>
              <p className="text-5xl font-bold">6+ <span className="text-2xl font-normal text-white/60">Years</span></p>
            </div>
            <div className="mt-8">
               <h3 className="text-white/80 font-medium mb-1">Focus</h3>
               <div className="flex flex-wrap gap-2">
                 <span className="bg-white/20 px-2 py-1 rounded text-sm">Agentic AI</span>
                 <span className="bg-white/20 px-2 py-1 rounded text-sm">Cloud</span>
               </div>
            </div>
         </div>
         <Cloud className="absolute -bottom-4 -right-4 w-40 h-40 text-white/10 group-hover:scale-110 transition-transform duration-500" />
      </div>

      {/* Skills Grid */}
      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Skill Card: GenAI */}
        <div className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl hover:bg-slate-900/50 transition-colors">
          <div className="flex items-center gap-3 mb-4 text-purple-400">
            <Bot /> <span className="font-semibold text-white">Generative AI</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SKILLS.genai.map(skill => <Badge key={skill} color="purple">{skill}</Badge>)}
          </div>
        </div>

        {/* Skill Card: Cloud & IaC */}
        <div className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl hover:bg-slate-900/50 transition-colors">
          <div className="flex items-center gap-3 mb-4 text-amber-400">
            <Cloud /> <span className="font-semibold text-white">Cloud & IaC</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SKILLS.cloud.map(skill => <Badge key={skill} color="amber">{skill}</Badge>)}
          </div>
        </div>

        {/* Skill Card: Orchestration */}
        <div className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl hover:bg-slate-900/50 transition-colors">
          <div className="flex items-center gap-3 mb-4 text-blue-400">
            <Container /> <span className="font-semibold text-white">Orchestration</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SKILLS.orchestration.map(skill => <Badge key={skill} color="blue">{skill}</Badge>)}
          </div>
        </div>

        {/* Skill Card: Languages */}
        <div className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl hover:bg-slate-900/50 transition-colors">
          <div className="flex items-center gap-3 mb-4 text-emerald-400">
            <Terminal /> <span className="font-semibold text-white">Stack</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SKILLS.languages.map(skill => <Badge key={skill} color="emerald">{skill}</Badge>)}
          </div>
        </div>

      </div>
    </div>
  );
};
export default AboutBento;