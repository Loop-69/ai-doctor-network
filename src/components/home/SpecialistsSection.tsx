
import { motion } from "framer-motion";
import { Search } from "lucide-react";
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
      isHighlighted: true
    },
    {
      name: "Sarah",
      title: "Thoracic Surgery Specialist",
      description: "I can help with pre and post op care instructions. What do you need?",
      isNew: true,
      tags: ["Surgery", "Post-Op"],
      avatar: "/placeholder.svg",
      delay: 0.2
    },
    {
      name: "Michael",
      title: "Cardiac Recovery Expert",
      description: "Need help with heart health or recovery plans? I'm here to assist.",
      isNew: false,
      tags: ["Cardiology", "Recovery"],
      avatar: "/placeholder.svg",
      delay: 0.3
    },
    {
      name: "Emma",
      title: "Advanced Wound Care Specialist",
      description: "I can guide you through wound care procedures. What's your concern?",
      isNew: false,
      tags: ["Assessment", "Treatment"],
      avatar: "/placeholder.svg",
      delay: 0.4
    },
    {
      name: "John",
      title: "Neurological Assessment Expert",
      description: "Have questions about neurological symptoms? I can help assess them.",
      isNew: true,
      tags: ["Neurology", "Assessment"],
      avatar: "/placeholder.svg",
      delay: 0.5
    },
    {
      name: "Maria",
      title: "Pediatric Care Specialist",
      description: "From vaccinations to developmental milestones, I'm here to assist with pediatric care.",
      isNew: false,
      tags: ["Pediatrics", "Primary Care"],
      avatar: "/placeholder.svg",
      delay: 0.6
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">AI Medical Specialists</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose up to 3 specialists for your medical task: 0/3
          </p>
          
          <div className="relative max-w-xl mx-auto mt-8">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search specialists or tasks..." 
                className="w-full bg-transparent border-none focus:outline-none text-sm"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialistsSection;
