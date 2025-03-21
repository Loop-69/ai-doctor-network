
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useActiveCallContext } from "../context/ActiveCallContext";
import CallHeader from "./call-monitor/CallHeader";
import ConversationPanel from "./call-monitor/ConversationPanel";
import CallInfoPanel from "./call-monitor/CallInfoPanel";
import { useConversationState } from "../hooks/useConversationState";

const LiveCallMonitor = () => {
  const { activeCall, endCall } = useActiveCallContext();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(true);
  
  // Use our custom hook for conversation state management
  const conversationState = useConversationState({
    patientName: activeCall?.patient.name || "",
    agentName: activeCall?.agentName || ""
  });

  // Connect the simulation to the conversation state
  useEffect(() => {
    if (activeCall?.autoAdvance && activeCall.onConversationUpdate) {
      // Set the onConversationUpdate callback to add messages to our state
      activeCall.onConversationUpdate = conversationState.addSimulatedMessage;
    }
  }, [activeCall]);

  // Calculate duration of the call
  const getCallDuration = () => {
    if (!activeCall) return "00:00";
    
    const now = new Date();
    const diff = Math.floor((now.getTime() - activeCall.startTime.getTime()) / 1000);
    const mins = Math.floor(diff / 60);
    const secs = diff % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Load monitoring settings
  useEffect(() => {
    // This would typically be loaded from an API or state management
    // For now we're using default values that match the settings form
    const loadSettings = () => {
      // Default to true for now - in a real app this would be loaded from storage/API
      setIsRecording(true);
    };
    
    loadSettings();
  }, []);

  // Toggle call recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "Recording paused" : "Recording resumed",
      description: isRecording 
        ? "Call recording has been paused" 
        : "Call recording has been resumed",
    });
  };

  // End the call
  const handleEndCall = () => {
    if (window.confirm("Are you sure you want to end this call?")) {
      endCall();
      toast({
        title: "Call ended",
        description: "The follow-up call has been terminated"
      });
    }
  };

  if (!activeCall) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <CallHeader 
        activeCall={activeCall}
        isListening={conversationState.isListening}
        toggleListening={conversationState.toggleListening}
        handleEndCall={handleEndCall}
        getCallDuration={getCallDuration}
        isRecording={isRecording}
        toggleRecording={toggleRecording}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <ConversationPanel 
          activeCall={activeCall}
          conversation={conversationState.conversation}
          message={conversationState.message}
          setMessage={conversationState.setMessage}
          isTakingOver={conversationState.isTakingOver}
          toggleTakeover={conversationState.toggleTakeover}
          sendMessage={conversationState.sendMessage}
          editingQuestion={conversationState.editingQuestion}
          modifiedQuestion={conversationState.modifiedQuestion}
          setModifiedQuestion={conversationState.setModifiedQuestion}
          startEditQuestion={conversationState.startEditQuestion}
          saveEditedQuestion={conversationState.saveEditedQuestion}
          cancelEditing={conversationState.cancelEditing}
          formatTime={conversationState.formatTime}
        />

        <CallInfoPanel 
          activeCall={activeCall}
          isListening={conversationState.isListening}
          isTakingOver={conversationState.isTakingOver}
          toggleListening={conversationState.toggleListening}
          toggleTakeover={conversationState.toggleTakeover}
          handleEndCall={handleEndCall}
          isRecording={isRecording}
          toggleRecording={toggleRecording}
        />
      </div>
    </motion.div>
  );
};

export default LiveCallMonitor;
