
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useActiveCallContext } from "../context/ActiveCallContext";
import { ScheduleFormValues } from "../types/scheduleTypes";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface SimulateCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: ScheduleFormValues;
  patientName: string;
  agentName: string;
}

const SimulateCallDialog = ({ 
  open, 
  onOpenChange, 
  formData,
  patientName,
  agentName
}: SimulateCallDialogProps) => {
  const { startCall } = useActiveCallContext();
  const [isStarting, setIsStarting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleStartSimulation = () => {
    setIsStarting(true);
    
    // Start the call immediately
    const callId = `sim-${Date.now()}`;
    
    // Create patient object
    const patient = {
      id: `patient-${Date.now()}`,
      name: patientName,
      age: 45,  // Default age
      gender: "unknown", // Default gender
      conditions: formData.condition ? [formData.condition] : ["General health check"]
    };
    
    // Call startCall with the expected properties format
    startCall({
      id: callId,
      patientName: patientName,
      agentName: agentName,
      purpose: formData.purpose || "Follow-up check",
      conditions: formData.condition ? [formData.condition] : ["General health check"],
      duration: 5, // 5 minutes simulation
      autoAdvance: true // Flag to indicate this is an automated simulation
    });
    
    // Wait a brief moment then navigate to the monitoring page
    setTimeout(() => {
      setIsStarting(false);
      onOpenChange(false);
      toast({
        title: "Simulation started",
        description: "Redirecting to call monitoring page..."
      });
      navigate("/followup-monitoring");
    }, 500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Simulate Follow-up Call</DialogTitle>
          <DialogDescription>
            This will simulate a real-time follow-up call with {patientName} using the {agentName} AI agent.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="rounded-md bg-muted p-4">
            <h4 className="font-medium mb-2">Call Details</h4>
            <p className="text-sm mb-1"><strong>Patient:</strong> {patientName}</p>
            <p className="text-sm mb-1"><strong>Agent:</strong> {agentName}</p>
            <p className="text-sm mb-1"><strong>Purpose:</strong> {formData.purpose || "Follow-up check"}</p>
            <p className="text-sm"><strong>Condition:</strong> {formData.condition || "General health check"}</p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>This simulation will run automatically and generate a conversation between the patient and AI agent.</p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            onClick={handleStartSimulation} 
            disabled={isStarting}
          >
            {isStarting ? "Starting..." : "Start Simulation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SimulateCallDialog;
