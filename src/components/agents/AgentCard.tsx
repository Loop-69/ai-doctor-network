
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MessageSquare, Calendar } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Agent } from "./types/agentTypes";

interface AgentCardProps {
  agent: Agent;
  onSelect: () => void;
  onConsultation?: () => void;
  delay?: number;
}

const AgentCard = ({ agent, onSelect, onConsultation, delay = 0 }: AgentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay,
        ease: [0.21, 0.45, 0.26, 0.95]
      }}
    >
      <Card
        className="cursor-pointer card-elevated gradient-card-purple card-hover-lift"
      >
        <CardHeader className="pb-2 border-b border-indigo-100">
          <div className="flex justify-between items-start">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                `bg-gradient-to-r from-indigo-400 to-${agent.color}-500 text-white`
              )}
            >
              <agent.icon className="w-5 h-5" />
            </div>
            <Badge variant="outline" className="font-normal bg-white/80">
              {agent.specialty}
            </Badge>
          </div>
          <CardTitle className="mt-3 text-xl">{agent.name}</CardTitle>
          <CardDescription>{agent.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm font-medium">Capabilities:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {agent.capabilities.slice(0, 2).map((capability, i) => (
                <li key={i} className="flex items-center">
                  <span className="h-1 w-1 rounded-full bg-indigo-500 mr-2" />
                  {capability}
                </li>
              ))}
              {agent.capabilities.length > 2 && (
                <li className="text-xs text-muted-foreground">
                  +{agent.capabilities.length - 2} more capabilities
                </li>
              )}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button className="flex-1 gradient-btn-purple text-white" onClick={onSelect}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat
          </Button>
          <Button variant="outline" className="flex-1 border-indigo-200 hover:bg-indigo-50" onClick={onConsultation}>
            <Calendar className="mr-2 h-4 w-4" />
            Consult
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AgentCard;
