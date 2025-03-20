
import { useToast } from "@/hooks/use-toast";
import { useConsultationSetup } from "./consultation/useConsultationSetup";
import { useConsultationState } from "./consultation/useConsultationState";
import { useConsultationActions } from "./consultation/useConsultationActions";

export function useConsultation() {
  const { toast } = useToast();
  
  // Get consultation setup state and functions
  const {
    selectedAgents,
    patientSymptoms,
    handleAgentSelect,
    handleSymptomsChange,
    validateConsultation
  } = useConsultationSetup();

  // Get consultation state
  const {
    consultationStarted,
    setConsultationStarted,
    consultationId,
    setConsultationId,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    diagnoses,
    setDiagnoses,
    activeTab,
    setActiveTab
  } = useConsultationState();

  // Get consultation actions
  const { startConsultation, sendMessage } = useConsultationActions(
    setConsultationId,
    setConsultationStarted,
    setMessages,
    setIsLoading,
    messages,
    setDiagnoses
  );

  // Wrapper function for starting a consultation
  const handleStartConsultation = async () => {
    if (!validateConsultation()) return;
    
    try {
      await startConsultation(selectedAgents, patientSymptoms);
    } catch (error) {
      console.error("Error starting consultation:", error);
      toast({
        title: "Failed to start consultation",
        description: "There was an error starting the consultation. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Wrapper function for sending a message
  const handleSendMessage = async (newMessage: string) => {
    if (!consultationId) return;
    await sendMessage(consultationId, selectedAgents, newMessage);
  };

  return {
    selectedAgents,
    patientSymptoms,
    consultationStarted,
    consultationId,
    messages,
    isLoading,
    diagnoses,
    activeTab,
    handleAgentSelect,
    handleSymptomsChange,
    startConsultation: handleStartConsultation,
    sendMessage: handleSendMessage,
    setActiveTab
  };
}
