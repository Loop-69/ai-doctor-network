
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Phone } from "lucide-react";
import { addFollowUpNotification } from "@/components/layout/NotificationsList";

// This hook manages the state of an active call
export const useActiveCall = () => {
  const [activeCall, setActiveCall] = useState<{
    id: string;
    patientName: string;
    agentName: string;
    startTime: Date;
    duration: number;
  } | null>(null);
  const { toast } = useToast();

  const startCall = (callData: {
    id: string;
    patientName: string;
    agentName: string;
    duration?: number;
  }) => {
    const newActiveCall = {
      ...callData,
      startTime: new Date(),
      duration: callData.duration || 5, // Default to 5 minutes if not specified
    };
    
    setActiveCall(newActiveCall);
    
    // Show toast notification
    toast({
      title: "Call started",
      description: `Follow-up call with ${callData.patientName} has started`,
    });
    
    // Add to notifications
    addFollowUpNotification({
      title: "Follow-up call started",
      description: `AI agent ${callData.agentName} is conducting a follow-up with ${callData.patientName}`,
      icon: <Phone className="h-4 w-4 text-green-500" />
    });

    // Return a cleanup function
    return () => endCall();
  };

  const endCall = () => {
    if (activeCall) {
      toast({
        title: "Call ended",
        description: `Call with ${activeCall.patientName} has ended`,
      });
      
      // Add to notifications
      addFollowUpNotification({
        title: "Follow-up call completed",
        description: `AI agent ${activeCall.agentName} has completed the follow-up with ${activeCall.patientName}`,
        icon: <Phone className="h-4 w-4 text-blue-500" />
      });
      
      setActiveCall(null);
    }
  };

  return {
    activeCall,
    startCall,
    endCall,
  };
};
