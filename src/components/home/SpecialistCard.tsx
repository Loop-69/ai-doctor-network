
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, CheckCircle, Star, Calendar } from "lucide-react";
import PreviewChatModal from "./PreviewChatModal";

interface SpecialistCardProps {
  name: string;
  title: string;
  description: string;
  isNew?: boolean;
  tags: string[];
  avatar: string;
  delay?: number;
}

const SpecialistCard = ({ 
  name, 
  title, 
  description, 
  isNew = false,
  tags,
  avatar,
  delay = 0 
}: SpecialistCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  
  return (
    <>
      <motion.div
        className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${isHovered ? 'shadow-md transform -translate-y-1' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isNew ? 'bg-green-500 animate-pulse' : 'bg-medical-yellow'}`}></div>
              <span className="font-medium">{name}</span>
              {isNew && (
                <Badge className="bg-aida-50 text-aida-500 hover:bg-aida-100 border-aida-200">
                  New
                </Badge>
              )}
            </div>
            <div className="flex items-center text-amber-400">
              <Star className="h-3.5 w-3.5 fill-current" />
              <Star className="h-3.5 w-3.5 fill-current" />
              <Star className="h-3.5 w-3.5 fill-current" />
              <Star className="h-3.5 w-3.5 fill-current" />
              <Star className="h-3.5 w-3.5 fill-current text-gray-200" />
            </div>
          </div>
          
          <h3 className="text-transparent bg-gradient-to-r from-medical-red to-medical-purple bg-clip-text font-medium mb-2">{title}</h3>
          
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-medical-purple/20">
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            </div>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-gray-50 hover:bg-gray-100 text-gray-700"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              className="bg-gradient-to-r from-medical-red to-medical-purple hover:opacity-90 transition-opacity text-white"
              onClick={() => setShowChatModal(true)}
            >
              <MessageSquare className="mr-1 h-4 w-4" />
              Try me
            </Button>
            <Button variant="outline" className="border-medical-purple/30 text-medical-purple hover:bg-medical-purple/5">
              <Calendar className="mr-1 h-4 w-4" />
              Consult
            </Button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                <span>HIPAA Compliant</span>
              </div>
              <span>{Math.floor(Math.random() * 100) + 1} active consults</span>
            </div>
          </div>
        </div>
      </motion.div>

      <PreviewChatModal 
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
        agentName={name}
        agentSpecialty={title}
      />
    </>
  );
};

export default SpecialistCard;
