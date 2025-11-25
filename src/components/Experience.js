
import SectionHeader from './SectionHeader';
import { 
  Briefcase,
} from 'lucide-react';


const Experience = ({EXPERIENCE}) => {
  return (
    <section className="mb-24">
      <SectionHeader title="Professional Experience" icon={Briefcase} />
      
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
        {EXPERIENCE.map((exp, index) => (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            
            {/* Timeline Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 shadow shrink-0 md:order-1 md:-translate-x-1/2 absolute left-0 md:left-1/2">
               <div className="w-3 h-3 bg-blue-500 rounded-full" />
            </div>

            {/* Content Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-white/5 bg-slate-900/50 shadow-sm backdrop-blur-sm ml-auto md:ml-0 hover:border-blue-500/30 transition-all">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <h3 className="font-bold text-white text-lg">{exp.company}</h3>
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded border border-white/5">{exp.period}</span>
              </div>
              <div className="text-blue-400 font-medium text-sm mb-4">{exp.role} <span className="text-slate-600 mx-2">•</span> {exp.type}</div>
              
              <ul className="space-y-2 mb-4">
                {exp.achievements.slice(0, 3).map((item, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-400">
                    <span className="mr-2 mt-1.5 w-1 h-1 rounded-full bg-slate-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Experience;