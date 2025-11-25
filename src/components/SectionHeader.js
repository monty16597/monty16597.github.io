
const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
      <Icon size={24} />
    </div>
    <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
  </div>
);

export default SectionHeader;