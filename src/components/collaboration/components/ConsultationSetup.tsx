
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import AgentSelector from "@/components/agents/AgentSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Agent } from "../types/consultationTypes";

interface ConsultationSetupProps {
  selectedAgents: Agent[];
  patientSymptoms: string;
  isLoading: boolean;
  onAgentSelect: (agent: Agent) => void;
  onSymptomsChange: (symptoms: string) => void;
  onStartConsultation: () => void;
}

const ConsultationSetup = ({
  selectedAgents,
  patientSymptoms,
  isLoading,
  onAgentSelect,
  onSymptomsChange,
  onStartConsultation
}: ConsultationSetupProps) => {
  const { toast } = useToast();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Collaborative Consultation</CardTitle>
          <CardDescription>
            Select multiple AI specialists to collaborate on a diagnosis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Selected Specialists ({selectedAgents.length})</h3>
            {selectedAgents.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedAgents.map(agent => (
                  <Badge 
                    key={agent.id} 
                    variant="outline" 
                    className="flex items-center gap-1 p-2"
                    onClick={() => onAgentSelect(agent)}
                  >
                    <agent.icon className="h-4 w-4" />
                    {agent.name}
                    <button className="ml-1 text-xs">✕</button>
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm mb-4">No specialists selected yet</p>
            )}
            
            <h3 className="text-lg font-medium mb-2">Patient Symptoms</h3>
            <Textarea 
              value={patientSymptoms}
              onChange={(e) => onSymptomsChange(e.target.value)}
              placeholder="Describe the patient's symptoms and relevant medical history..."
              className="min-h-[120px]"
            />
          </div>
          
          <AgentSelector 
            onSelect={onAgentSelect}
            className="mt-6"
          />
        </CardContent>
        <CardFooter>
          <Button 
            onClick={onStartConsultation} 
            disabled={selectedAgents.length === 0 || !patientSymptoms.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? "Starting Consultation..." : "Start Collaborative Consultation"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ConsultationSetup;
