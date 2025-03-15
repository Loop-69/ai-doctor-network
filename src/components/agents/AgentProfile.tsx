
import { cn } from "@/lib/utils";
import { FileText, Plus } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Agent } from "./types/agentTypes";

interface AgentProfileProps {
  agent: Agent;
}

const AgentProfile = ({ agent }: AgentProfileProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                `bg-${agent.color}/10 text-${agent.color}`
              )}
            >
              <agent.icon className="w-6 h-6" />
            </div>
            <div>
              <CardTitle>{agent.name}</CardTitle>
              <CardDescription>{agent.specialty}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">{agent.description}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Capabilities:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            {agent.capabilities.map((capability, i) => (
              <li key={i} className="flex items-center">
                <span className="h-1 w-1 rounded-full bg-aida-500 mr-2" />
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Button variant="outline" className="w-full">
          <FileText className="mr-2 h-4 w-4" />
          View Documentation
        </Button>
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Consultation
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentProfile;
