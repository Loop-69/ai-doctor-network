
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Agent, Diagnosis, Message } from "../types/consultationTypes";
import { createConsultation, addConsultationMessage, generateAgentResponse } from "../services/consultationService";

export function useConsultation() {
  const { toast } = useToast();
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([]);
  const [patientSymptoms, setPatientSymptoms] = useState("");
  const [consultationStarted, setConsultationStarted] = useState(false);
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [activeTab, setActiveTab] = useState("conversation");

  const handleAgentSelect = (agent: Agent) => {
    // Check if agent is already selected
    if (selectedAgents.some(a => a.id === agent.id)) {
      setSelectedAgents(selectedAgents.filter(a => a.id !== agent.id));
    } else {
      setSelectedAgents([...selectedAgents, agent]);
    }
  };

  const handleSymptomsChange = (symptoms: string) => {
    setPatientSymptoms(symptoms);
  };

  const startConsultation = async () => {
    if (selectedAgents.length === 0) {
      toast({
        title: "No specialists selected",
        description: "Please select at least one AI specialist to collaborate with",
        variant: "destructive",
      });
      return;
    }

    if (!patientSymptoms.trim()) {
      toast({
        title: "No patient symptoms",
        description: "Please enter the patient's symptoms",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Create a new consultation in Supabase
      const consultId = await createConsultation();
      setConsultationId(consultId);

      // Add the patient's symptoms as the first message
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: "You (Doctor)",
        senderId: "doctor",
        content: patientSymptoms,
        timestamp: new Date(),
        isDoctor: true
      };

      setMessages([userMessage]);

      // Add initial message to Supabase
      await addConsultationMessage(consultId, patientSymptoms, 'doctor');

      // Add system message to explain the collaboration
      const systemMessage: Message = {
        id: Date.now().toString() + "-system",
        sender: "System",
        senderId: "system",
        content: `Starting collaborative consultation with ${selectedAgents.map(a => a.name).join(", ")}. Each specialist will analyze the case and provide their diagnosis.`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, systemMessage]);

      // Generate responses from each selected agent
      await Promise.all(selectedAgents.map(async (agent, index) => {
        // Simulate some delay between agent responses
        await new Promise(resolve => setTimeout(resolve, 1000 * index));
        
        const agentMessage: Message = {
          id: Date.now().toString() + `-${agent.id}`,
          sender: agent.name,
          senderId: agent.id,
          content: `Analyzing the patient's symptoms from a ${agent.specialty} perspective...`,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, agentMessage]);
        
        // Call the medical response function with the agent's specialty
        await processAgentResponse(consultId, agent, patientSymptoms);
      }));

      setConsultationStarted(true);
    } catch (error) {
      console.error("Error starting consultation:", error);
      toast({
        title: "Failed to start consultation",
        description: "There was an error starting the consultation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const processAgentResponse = async (consultId: string, agent: Agent, symptoms: string) => {
    try {
      // Call the Supabase edge function to generate a response
      const { diagnosis, recommendation, confidence } = await generateAgentResponse(consultId, agent, symptoms);
      
      // Add the AI response to the messages
      const agentResponse: Message = {
        id: Date.now().toString() + `-${agent.id}-response`,
        sender: agent.name,
        senderId: agent.id,
        content: `Based on the symptoms described, I believe the patient may be suffering from ${diagnosis}. ${recommendation} (Confidence: ${confidence}%)`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentResponse]);
      
      // Store the diagnosis
      setDiagnoses(prev => [...prev, {
        agentId: agent.id,
        agentName: agent.name,
        specialty: agent.specialty,
        diagnosis,
        confidence,
        recommendation
      }]);

      // Save to Supabase
      await addConsultationMessage(consultId, agentResponse.content, 'assistant');

    } catch (error) {
      console.error(`Error getting response from ${agent.name}:`, error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString() + `-${agent.id}-error`,
        sender: agent.name,
        senderId: agent.id,
        content: "I apologize, but I was unable to process this case at the moment. Please try again later.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const sendMessage = async (newMessage: string) => {
    if (!newMessage.trim() || !consultationId) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "You (Doctor)",
      senderId: "doctor",
      content: newMessage,
      timestamp: new Date(),
      isDoctor: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Save to Supabase
    await addConsultationMessage(consultationId, newMessage, 'doctor');
    
    // Generate responses from specialists to the new message
    const followUpMessage = `The doctor adds: ${newMessage}`;
    
    await Promise.all(selectedAgents.map(async (agent, index) => {
      // Add slight delay between responses
      await new Promise(resolve => setTimeout(resolve, 800 * index));
      await processAgentResponse(consultationId, agent, followUpMessage);
    }));
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
    startConsultation,
    sendMessage,
    setActiveTab
  };
}
