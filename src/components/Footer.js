import { 
  Mail, 
  Briefcase,
} from 'lucide-react';

const Footer = (PROFILE) => {
  return (
    <footer className="border-t border-white/5 pt-12 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Briefcase size={18}/> Education</h4>
          <div className="space-y-6">
            <div>
              <div className="text-white font-medium">Post Graduate Certification in DevOps & Cloud Computing</div>
              <div className="text-sm text-slate-400">Lambton College, Toronto | 2023 - 2025</div>
            </div>
            <div>
              <div className="text-white font-medium">B.E. in Information Technology</div>
              <div className="text-sm text-slate-400">Gujarat Technical University | 2015 - 2019</div>
            </div>
          </div>
        </div>
        
        <div className="text-center md:text-right">
           <a 
             href={`mailto:${PROFILE.email}`}
             className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all mb-4"
           >
             <Mail size={18} /> Contact Me
           </a>
           <p className="text-slate-500 text-sm">
             Designed & Built by {PROFILE.name} using React & Tailwind.
           </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
