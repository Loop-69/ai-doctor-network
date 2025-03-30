
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { MessageSquare, Star, Clock, Sparkles } from "lucide-react";
import PreviewChatModal from "./PreviewChatModal";

interface SpecialistCardProps {
  id: string;
  name: string;
  title: string;
  description: string;
  isNew: boolean;
  tags: string[];
  avatar: string;
  delay: number;
  isHighlighted?: boolean;
  timeText?: string;
  icon?: React.FC<{ className?: string }>;
  color?: string;
}

const SpecialistCard = ({ 
  id,
  name, 
  title, 
  description, 
  isNew, 
  tags, 
  avatar,
  delay,
  isHighlighted = false,
  timeText,
  icon: Icon,
  color
}: SpecialistCardProps) => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay }}
      >
        <Card className={cn(
          "h-full hover:shadow-md transition-all duration-200 overflow-hidden group",
          isHighlighted && "border-medical-teal border-2 shadow-lg" // Slightly increased shadow for highlighted
        )}>
          {/* Image Container */}
          <div className="relative">
            <img 
              src={avatar || '/placeholder.svg'} // Use placeholder if avatar is missing
              alt={name} 
              className="w-full h-40 object-cover rounded-t-lg" // Image styling
            />
            {isNew && (
              <Badge variant="outline" className="absolute top-2 right-2 bg-white text-medical-teal border-medical-teal/50 shadow">
                <Sparkles className="h-3 w-3 mr-1" /> New
              </Badge>
            )}
          </div>

          <CardContent className="p-4"> {/* Adjusted padding */}
            {/* Content Below Image */}
            <h3 className="font-semibold text-base mb-0.5 truncate">{name}</h3> {/* Slightly smaller, bold */}
            <p className="text-muted-foreground text-xs mb-1 truncate">{title}</p>
            
            {/* Always render rating container and stars */}
            <div className="flex items-center mb-2 text-xs min-h-5"> 
              <span className={cn(
                "flex items-center", 
                isHighlighted ? "text-amber-600" : "text-gray-300" // Conditional color
              )}>
                <Star className={cn("h-3.5 w-3.5 mr-0.5", isHighlighted && "fill-current")} /> {/* Conditional fill */}
                <Star className={cn("h-3.5 w-3.5 mr-0.5", isHighlighted && "fill-current")} />
                <Star className={cn("h-3.5 w-3.5 mr-0.5", isHighlighted && "fill-current")} />
                <Star className={cn("h-3.5 w-3.5 mr-0.5", isHighlighted && "fill-current")} />
                <Star className={cn("h-3.5 w-3.5", isHighlighted && "fill-current")} />
              </span>
              {isHighlighted && ( // Conditionally render rating text
                <span className="ml-1.5 text-muted-foreground text-xs">4.9 (1,284)</span> 
              )}
            </div>
            
            {/* Removed description and timeText */}
            
            <div className="flex flex-wrap gap-1.5 mb-3 mt-1"> {/* Adjusted spacing */}
              {tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="font-normal text-[10px] px-1.5 py-0.5"> {/* Smaller tags */}
                  {tag}
                </Badge>
              ))}
            </div>
            
            <Button 
              variant="outline" // Changed variant for less emphasis
              className="w-full border-medical-teal/50 text-medical-teal hover:bg-medical-teal/10 hover:text-medical-teal" 
              size="sm"
              onClick={() => setIsChatModalOpen(true)}
            >
              <MessageSquare className="mr-1.5 h-3.5 w-3.5" /> Chat with {name.split(' ')[0]}
            </Button>
            
            {/* Removed highlighted free message text */}
          </CardContent>
        </Card>
      </motion.div>

      <PreviewChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        agentName={name}
        agentSpecialty={title}
        agentId={id}
      />
    </>
  );
};

export default SpecialistCard;
