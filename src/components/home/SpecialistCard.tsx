
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { MessageSquare, Star, Clock } from "lucide-react";
import PreviewChatModal from "./PreviewChatModal";

interface SpecialistCardProps {
  name: string;
  title: string;
  description: string;
  isNew: boolean;
  tags: string[];
  avatar: string;
  delay: number;
  isHighlighted?: boolean;
  timeText?: string;
}

const SpecialistCard = ({ 
  name, 
  title, 
  description, 
  isNew, 
  tags, 
  avatar,
  delay,
  isHighlighted = false,
  timeText
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
          "h-full hover:shadow-md transition-all duration-200 overflow-hidden",
          isHighlighted && "border-medical-purple border-2 shadow-md"
        )}>
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="bg-gradient-to-br from-medical-red to-medical-purple text-white">
                  {name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex items-center">
                {isNew && (
                  <Badge variant="outline" className="bg-medical-purple/10 text-medical-purple border-medical-purple/30 mr-2">
                    New
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
              className="w-full" 
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
      />
    </>
  );
};

export default SpecialistCard;
