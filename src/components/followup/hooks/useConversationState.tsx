
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ConversationMessage } from "../types/callTypes";

// This hook handles all the conversation state management logic
export const useConversationState = ({ patientName, agentName }: {
  patientName: string;
  agentName: string;
}) => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(true);
  const [isTakingOver, setIsTakingOver] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [modifiedQuestion, setModifiedQuestion] = useState("");

  // Initial conversation for when a call starts
  const initialConversation = [
    {
      id: "1",
      sender: "agent",
      content: `Hello ${patientName || "there"}! This is ${agentName || "AI Assistant"} checking in for your follow-up. How have you been feeling since our last appointment?`,
      timestamp: new Date()
    }
  ];

  // Conversation state
  const [conversation, setConversation] = useState<ConversationMessage[]>(initialConversation);

  // Reset the conversation when a new call starts
  useEffect(() => {
    if (patientName && agentName) {
      setConversation([{
        id: "1",
        sender: "agent",
        content: `Hello ${patientName}! This is ${agentName} checking in for your follow-up. How have you been feeling since our last appointment?`,
        timestamp: new Date()
      }]);
    }
  }, [patientName, agentName]);

  // Function to add a message from the simulation
  const addSimulatedMessage = (message: ConversationMessage) => {
    setConversation(prev => [...prev, message]);
  };

  // Format time (HH:MM)
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Send doctor's message
  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage: ConversationMessage = {
      id: Date.now().toString(),
      sender: 'doctor',
      content: message,
      timestamp: new Date()
    };
    
    setConversation([...conversation, newMessage]);
    setMessage("");

    toast({
      title: "Message sent",
      description: isTakingOver ? 
        "Your message has been sent directly to the patient" : 
        "Your message has been forwarded to the AI agent"
    });
  };

  // Toggle listening to the call
  const toggleListening = () => {
    setIsListening(!isListening);
    
    toast({
      title: isListening ? "Audio muted" : "Audio unmuted",
      description: isListening ? 
        "You will no longer hear the conversation" : 
        "You will now hear the conversation"
    });
  };

  // Toggle doctor takeover mode
  const toggleTakeover = () => {
    setIsTakingOver(!isTakingOver);
    
    toast({
      title: isTakingOver ? "Returned control to AI" : "Taking over conversation",
      description: isTakingOver ? 
        "The AI agent is now responding to the patient" : 
        "You are now directly communicating with the patient"
    });
  };

  // Start editing a question
  const startEditQuestion = (questionId: string) => {
    const question = conversation.find(msg => msg.id === questionId);
    if (question && question.sender === 'agent') {
      setEditingQuestion(questionId);
      setModifiedQuestion(question.content);
    }
  };

  // Save edited question
  const saveEditedQuestion = () => {
    if (!editingQuestion || !modifiedQuestion.trim()) return;
    
    setConversation(conversation.map(msg => 
      msg.id === editingQuestion 
        ? { ...msg, content: modifiedQuestion, isEdited: true } 
        : msg
    ));
    
    setEditingQuestion(null);
    setModifiedQuestion("");
    
    toast({
      title: "Question modified",
      description: "The AI agent will use your modified question"
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingQuestion(null);
    setModifiedQuestion("");
  };

  return {
    message,
    setMessage,
    isListening,
    isTakingOver,
    conversation,
    editingQuestion,
    modifiedQuestion,
    setModifiedQuestion,
    sendMessage,
    toggleListening,
    toggleTakeover,
    startEditQuestion,
    saveEditedQuestion,
    cancelEditing,
    formatTime,
    addSimulatedMessage
  };
};
