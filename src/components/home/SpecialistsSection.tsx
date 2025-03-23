import { motion } from "framer-motion";
import { Search, Clock, Zap, Sparkles } from "lucide-react";
import SpecialistCard from "@/components/home/SpecialistCard";
import { agents } from "@/components/agents/data/agentsData";
const SpecialistsSection = () => {
  // Map our real agents to the specialists format needed by the SpecialistCard
  const specialists = agents.slice(0, 6).map((agent, index) => ({
    id: agent.id,
    name: agent.name,
    title: agent.specialty,
    description: agent.description,
    isNew: index < 3,
    // First 3 agents will be marked as new
    tags: agent.capabilities.slice(0, 2),
    // Use first 2 capabilities as tags
    avatar: `/agents/${agent.id}.jpg`,
    // We'll create these images in public folder
    delay: 0.1 * (index + 1),
    isHighlighted: index === 0,
    // Highlight the first agent
    timeText: `Saves ${25 + index * 5}+ min per consultation`,
    icon: agent.icon,
    color: agent.color
  }));
  return <section className="py-14 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-6 my-[10px]">
        <motion.div className="text-center mb-8" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }}>
          <h2 className="text-2xl font-bold mb-3 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-medical-purple" />
            <span className="bg-gradient-to-r from-medical-green to-medical-purple bg-clip-text text-transparent">
              AI Medical Specialists
            </span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-3">
            Choose up to 3 specialists for your medical task: 0/3
          </p>
          
          <motion.div className="flex items-center justify-center gap-2 mb-6 max-w-lg mx-auto" initial={{
          opacity: 0,
          y: 10
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.3,
          delay: 0.3
        }}>
            <div className="flex items-center bg-medical-purple/10 text-medical-purple px-3 py-1.5 rounded-full text-xs font-medium">
              <Zap className="h-3.5 w-3.5 mr-1" />
              <span>Time-saving AI assistance</span>
            </div>
            <div className="flex items-center bg-medical-green/10 text-medical-green px-3 py-1.5 rounded-full text-xs font-medium">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>Reduce documentation by 70%</span>
            </div>
          </motion.div>
          
          <div className="relative max-w-xl mx-auto mt-6">
            <div className="flex items-center border border-medical-purple/30 rounded-full px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-medical-purple/30 transition-all">
              <Search className="h-4 w-4 text-medical-purple mr-2" />
              <input type="text" placeholder="Search specialists or tasks..." className="w-full bg-transparent border-none focus:outline-none text-sm" />
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialists.map((specialist, index) => <SpecialistCard key={specialist.id} id={specialist.id} name={specialist.name} title={specialist.title} description={specialist.description} isNew={specialist.isNew} tags={specialist.tags} avatar={specialist.avatar} delay={specialist.delay} isHighlighted={specialist.isHighlighted} timeText={specialist.timeText} icon={specialist.icon} color={specialist.color} />)}
        </div>
      </div>
    </section>;
};
export default SpecialistsSection;