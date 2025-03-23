
import { motion } from "framer-motion";
import { Search, Clock, Zap } from "lucide-react";
import SpecialistCard from "@/components/home/SpecialistCard";

const SpecialistsSection = () => {
  const specialists = [
    {
      name: "GeneralMD",
      title: "General Medicine Expert",
      description: "Your primary AI assistant for general medical advice and patient care.",
      isNew: true,
      tags: ["Primary Care", "General Medicine"],
      avatar: "/placeholder.svg",
      delay: 0.1,
      isHighlighted: true,
      timeText: "Saves 30+ min per consultation"
    },
    {
      name: "Sarah",
      title: "Thoracic Surgery Specialist",
      description: "I can help with pre and post op care instructions. What do you need?",
      isNew: true,
      tags: ["Surgery", "Post-Op"],
      avatar: "/placeholder.svg",
      delay: 0.2,
      timeText: "Saves 45+ min per patient"
    },
    {
      name: "Michael",
      title: "Cardiac Recovery Expert",
      description: "Need help with heart health or recovery plans? I'm here to assist.",
      isNew: false,
      tags: ["Cardiology", "Recovery"],
      avatar: "/placeholder.svg",
      delay: 0.3,
      timeText: "Saves 25+ min on documentation"
    },
    {
      name: "Emma",
      title: "Advanced Wound Care Specialist",
      description: "I can guide you through wound care procedures. What's your concern?",
      isNew: false,
      tags: ["Assessment", "Treatment"],
      avatar: "/placeholder.svg",
      delay: 0.4,
      timeText: "Saves 20+ min per assessment"
    },
    {
      name: "John",
      title: "Neurological Assessment Expert",
      description: "Have questions about neurological symptoms? I can help assess them.",
      isNew: true,
      tags: ["Neurology", "Assessment"],
      avatar: "/placeholder.svg",
      delay: 0.5,
      timeText: "Saves 40+ min on complex cases"
    },
    {
      name: "Maria",
      title: "Pediatric Care Specialist",
      description: "From vaccinations to developmental milestones, I'm here to assist with pediatric care.",
      isNew: false,
      tags: ["Pediatrics", "Primary Care"],
      avatar: "/placeholder.svg",
      delay: 0.6,
      timeText: "Saves 15+ min per patient"
    }
  ];

  return (
    <section className="py-14 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-medical-green to-medical-purple bg-clip-text text-transparent">
            AI Medical Specialists
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-3">
            Choose up to 3 specialists for your medical task: 0/3
          </p>
          
          <motion.div 
            className="flex items-center justify-center gap-2 mb-6 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
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
              <input 
                type="text" 
                placeholder="Search specialists or tasks..." 
                className="w-full bg-transparent border-none focus:outline-none text-sm"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialists.map((specialist, index) => (
            <SpecialistCard 
              key={index}
              name={specialist.name}
              title={specialist.title}
              description={specialist.description}
              isNew={specialist.isNew}
              tags={specialist.tags}
              avatar={specialist.avatar}
              delay={specialist.delay}
              isHighlighted={specialist.isHighlighted}
              timeText={specialist.timeText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialistsSection;
