
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
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
  delay?: number;
}

const AgentCard = ({ agent, onSelect, delay = 0 }: AgentCardProps) => {
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
        className="cursor-pointer transition-all hover:shadow-md hover:border-aida-200"
        onClick={onSelect}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                `bg-${agent.color}/10 text-${agent.color}`
              )}
            >
              <agent.icon className="w-5 h-5" />
            </div>
            <Badge variant="outline" className="font-normal">
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
                  <span className="h-1 w-1 rounded-full bg-aida-500 mr-2" />
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
        <CardFooter>
          <Button className="w-full" onClick={onSelect}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat with {agent.name}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AgentCard;
