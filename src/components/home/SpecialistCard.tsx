
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
          isHighlighted && "border-medical-teal border-2 shadow-md"
        )}>
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 ring-2 ring-offset-2 ring-medical-teal/20">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className={cn(
                    "bg-gradient-to-br text-white",
                    color ? `from-${color} to-medical-blue` : "from-medical-teal to-medical-blue"
                  )}>
                    {name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                
                {Icon && (
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center -ml-3 mt-6 shadow-md",
                    `bg-gradient-to-r from-${color} to-medical-blue text-white`
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center">
                {isNew && (
                  <Badge variant="outline" className="bg-medical-teal/10 text-medical-teal border-medical-teal/30 mr-2">
                    <Sparkles className="h-3 w-3 mr-1" /> New
                  </Badge>
                )}
                {isHighlighted && (
                  <Badge variant="outline" className="bg-medical-green/10 text-medical-green border-medical-green/30">
                    Recommended
                  </Badge>
                )}
              </div>
            </div>
            
            <h3 className="font-medium text-lg mb-1">{name}</h3>
            <p className="text-muted-foreground text-sm mb-1">{title}</p>
            
            {isHighlighted && (
              <div className="flex items-center mb-2 text-sm text-amber-500">
                <Star className="h-4 w-4 fill-current mr-1" />
                <Star className="h-4 w-4 fill-current mr-1" />
                <Star className="h-4 w-4 fill-current mr-1" />
                <Star className="h-4 w-4 fill-current mr-1" />
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-2 text-muted-foreground">4.9 (1,284)</span>
              </div>
            )}
            
            <p className="text-sm mb-4">{description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="font-normal text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            {timeText && (
              <div className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full mb-4 self-start">
                <Clock className="h-3 w-3 mr-1" />
                {timeText}
              </div>
            )}
            
            <Button 
              className="w-full bg-gradient-to-r from-medical-teal to-medical-blue hover:opacity-90 group-hover:shadow-md transition-all" 
              size="sm"
              onClick={() => setIsChatModalOpen(true)}
            >
              <MessageSquare className="mr-2 h-4 w-4" /> Chat with {name.split(' ')[0]}
            </Button>
            
            {isHighlighted && (
              <p className="text-xs text-center mt-3 text-muted-foreground">
                Free for 2 messages • No credit card required
              </p>
            )}
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
