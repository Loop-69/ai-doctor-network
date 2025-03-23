
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-2 h-2 bg-medical-yellow rounded-full"></span>
          <span className="font-medium">{name}</span>
          {isNew && (
            <Badge className="ml-1 bg-aida-50 text-aida-500 hover:bg-aida-100 border-aida-200">
              New
            </Badge>
          )}
        </div>
        
        <h3 className="text-medical-red font-medium mb-2">{title}</h3>
        
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
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
        
        <Button className="w-full bg-medical-red hover:bg-medical-red/90">
          Try me
        </Button>
      </div>
    </motion.div>
  );
};

export default SpecialistCard;
