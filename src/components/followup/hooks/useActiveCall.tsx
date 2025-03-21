import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Phone } from "lucide-react";
import { addFollowUpNotification } from "@/components/layout/NotificationsList";
import { Call, Patient, ConversationMessage } from "../types/callTypes";

// Mock conversation scripts for simulated calls
const simulatedConversations = {
  hypertension: [
    { message: "Hello, I'm calling to follow up on your recent hypertension treatment. How have you been feeling?", fromAgent: true },
    { message: "Hi there. I've been feeling okay, but still having some headaches in the morning.", fromAgent: false },
    { message: "I see. Are you taking your medication as prescribed?", fromAgent: true },
    { message: "Yes, I take it every morning, but sometimes I forget the evening dose.", fromAgent: false },
    { message: "It's important to maintain a consistent schedule. Have you been monitoring your blood pressure at home?", fromAgent: true },
    { message: "I've been trying to, but my readings are still high - around 145/90.", fromAgent: false },
    { message: "That's a bit elevated. Have you made any dietary changes as we discussed last time?", fromAgent: true },
    { message: "I've reduced salt intake, but haven't cut back on caffeine yet.", fromAgent: false },
    { message: "I'd recommend limiting caffeine as well. How about physical activity? Have you been able to exercise regularly?", fromAgent: true },
    { message: "I've been walking about 15 minutes each day, but it's hard to find more time.", fromAgent: false }
  ],
  diabetes: [
    { message: "Hello, I'm calling to check on your diabetes management. How have your blood sugar levels been?", fromAgent: true },
    { message: "They've been fluctuating a lot. Morning readings are good but evening ones are high.", fromAgent: false },
    { message: "What's your diet been like recently? Have you been counting carbohydrates?", fromAgent: true },
    { message: "I try to, but it's been challenging with my work schedule. I often eat out for lunch.", fromAgent: false },
    { message: "I understand. How about your insulin regimen - are you adjusting doses based on carb intake?", fromAgent: true },
    { message: "Sometimes, but I'm not always confident about the calculations.", fromAgent: false },
    { message: "That's common. Have you experienced any episodes of hypoglycemia recently?", fromAgent: true },
    { message: "Yes, twice last week. Both times in the afternoon after exercise.", fromAgent: false },
    { message: "We should adjust your insulin for those active days. Have you been experiencing any numbness or tingling in your feet?", fromAgent: true },
    { message: "Occasionally, especially at night. Should I be concerned?", fromAgent: false }
  ],
  general: [
    { message: "Hello, I'm calling for your follow-up. How have you been feeling since our last appointment?", fromAgent: true },
    { message: "I've been doing better overall, but still have some lingering concerns.", fromAgent: false },
    { message: "Could you share what those concerns are?", fromAgent: true },
    { message: "I've been experiencing some fatigue in the afternoons, and occasional dizziness when standing up quickly.", fromAgent: false },
    { message: "I see. Have you noticed any patterns with your symptoms? Anything that makes them better or worse?", fromAgent: true },
    { message: "They seem worse when I haven't eaten for a while, and better after rest.", fromAgent: false },
    { message: "That's helpful information. Have you been taking the medications as prescribed?", fromAgent: true },
    { message: "Yes, I haven't missed any doses.", fromAgent: false },
    { message: "Good. What about your sleep patterns and water intake? Any changes there?", fromAgent: true },
    { message: "I'm sleeping about 7 hours, but I probably don't drink enough water during the day.", fromAgent: false }
  ]
};

// This hook manages the state of an active call
export const useActiveCall = () => {
  const [activeCall, setActiveCall] = useState<Call | null>(null);
  const [simulationTimerId, setSimulationTimerId] = useState<number | null>(null);
  const [simulationStep, setSimulationStep] = useState(0);
  const { toast } = useToast();

  // Handle simulation progress if there's an active auto-advancing call
  useEffect(() => {
    if (activeCall?.autoAdvance && simulationStep < 10) {
      const timerId = window.setTimeout(() => {
        // Advance to next step in the conversation
        setSimulationStep(prev => prev + 1);
      }, 5000); // Every 5 seconds
      
      setSimulationTimerId(Number(timerId));
      
      return () => {
        if (timerId) clearTimeout(timerId);
      };
    }
  }, [activeCall, simulationStep]);

  // For triggering the onConversationUpdate callback
  useEffect(() => {
    if (activeCall?.autoAdvance && activeCall.onConversationUpdate && simulationStep > 0) {
      // Determine which script to use based on conditions
      let script = simulatedConversations.general;
      if (activeCall.conditions.some(c => c.toLowerCase().includes('hypertension') || c.toLowerCase().includes('blood pressure'))) {
        script = simulatedConversations.hypertension;
      } else if (activeCall.conditions.some(c => c.toLowerCase().includes('diabetes'))) {
        script = simulatedConversations.diabetes;
      }
      
      if (simulationStep <= script.length) {
        const scriptItem = script[simulationStep - 1];
        const message: ConversationMessage = {
          id: `sim-msg-${Date.now()}-${simulationStep}`,
          sender: scriptItem.fromAgent ? 'agent' : 'patient',
          content: scriptItem.message,
          timestamp: new Date()
        };
        
        activeCall.onConversationUpdate(message);
      }
      
      // End call after going through all messages
      if (simulationStep >= script.length + 2) {
        // Add a small delay before ending
        setTimeout(() => endCall(), 3000);
      }
    }
  }, [simulationStep]);

  const startCall = (callData: {
    id: string;
    patientName: string;
    agentName: string;
    purpose?: string;
    conditions?: string[];
    duration?: number;
    autoAdvance?: boolean;
    onConversationUpdate?: (message: ConversationMessage) => void;
  }) => {
    // Create a patient object from the patient name
    const patient: Patient = {
      id: `pat-${Date.now()}`,
      name: callData.patientName,
      age: 0, // Default value
      gender: "", // Default value
      conditions: callData.conditions || []
    };
    
    // Create a call object that matches the Call interface
    const newActiveCall: Call = {
      id: callData.id,
      patient: patient,
      startTime: new Date(),
      purpose: callData.purpose || "Follow-up call",
      conditions: callData.conditions || [],
      agentName: callData.agentName,
      duration: callData.duration || 5, // Default to 5 minutes if not specified
      autoAdvance: callData.autoAdvance || false,
      onConversationUpdate: callData.onConversationUpdate
    };
    
    setActiveCall(newActiveCall);
    setSimulationStep(0); // Reset simulation step
    
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
      // Clear any simulation timers
      if (simulationTimerId) {
        clearTimeout(simulationTimerId);
        setSimulationTimerId(null);
      }
      
      toast({
        title: "Call ended",
        description: `Call with ${activeCall.patient.name} has ended`,
      });
      
      // Add to notifications
      addFollowUpNotification({
        title: "Follow-up call completed",
        description: `AI agent ${activeCall.agentName} has completed the follow-up with ${activeCall.patient.name}`,
        icon: <Phone className="h-4 w-4 text-blue-500" />
      });
      
      setActiveCall(null);
      setSimulationStep(0);
    }
  };

  return {
    activeCall,
    startCall,
    endCall,
  };
};
