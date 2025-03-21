
import { Agent } from "../types/agentTypes";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Store chat history for each agent interaction
const agentChatHistory: Record<string, Message[]> = {};

export const generateAIResponse = async (prompt: string, agent: Agent): Promise<string> => {
  try {
    // Get existing chat history or initialize new
    const agentId = agent.id;
    if (!agentChatHistory[agentId]) {
      agentChatHistory[agentId] = [];
    }
    
    // Add user message to history
    agentChatHistory[agentId].push({ role: 'user', content: prompt });
    
    // Convert chat history to message format expected by the edge function
    const previousMessages = agentChatHistory[agentId].map((msg, index) => ({
      id: `msg-${index}`,
      sender: msg.role === 'user' ? 'You (Doctor)' : agent.name,
      senderId: msg.role === 'user' ? 'doctor' : agent.id,
      content: msg.content,
      timestamp: new Date(),
      isDoctor: msg.role === 'user'
    }));
    
    console.log("Calling generate-medical-response edge function...");
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-medical-response', {
        body: {
          prompt,
          agentName: agent.name,
          specialty: agent.specialty,
          modelProvider: "gemini",
          modelName: "gemini-2.0-flash",
          previousMessages: previousMessages
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(`Supabase function error: ${error.message}`);
      }
      
      // Add assistant response to history
      agentChatHistory[agentId].push({ role: 'assistant', content: data.response });
      
      // Limit history to last 20 messages to prevent context overflow
      if (agentChatHistory[agentId].length > 20) {
        agentChatHistory[agentId] = agentChatHistory[agentId].slice(-20);
      }
      
      return data.response;
    } catch (error: any) {
      console.error("Error calling AI edge function:", error);
      
      // Add a fallback response to the chat history
      const fallbackResponse = "I'm sorry, I encountered an error while processing your request. Please try again later.";
      agentChatHistory[agentId].push({ role: 'assistant', content: fallbackResponse });
      
      return fallbackResponse;
    }
  } catch (error: any) {
    console.error("Error in generateAIResponse:", error);
    return "I'm sorry, I encountered an error while processing your request. Please try again later.";
  }
};

export const generateFollowUpQuestions = async (condition: string, specialty?: string): Promise<string[]> => {
  try {
    console.log(`Generating follow-up questions for condition: ${condition}`);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-followup-questions', {
        body: {
          condition,
          specialty,
          modelProvider: "gemini",
          modelName: "gemini-2.0-flash"
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(`Supabase function error: ${error.message}`);
      }
      
      return data.questions || getDefaultFollowUpQuestions(condition);
    } catch (error) {
      console.error("Error generating follow-up questions:", error);
      // Return default questions if there's an error
      return getDefaultFollowUpQuestions(condition);
    }
  } catch (error) {
    console.error("Error in generateFollowUpQuestions:", error);
    return getDefaultFollowUpQuestions(condition);
  }
};

// Helper function to get default follow-up questions when API calls fail
function getDefaultFollowUpQuestions(condition: string): string[] {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('hypertension') || lowerCondition.includes('blood pressure')) {
    return [
      "How often have you been monitoring your blood pressure?",
      "Have you experienced any dizziness or headaches?",
      "Are you taking your medication as prescribed?",
      "Have you made any changes to your diet or exercise routine?",
      "Are you experiencing any side effects from your medication?"
    ];
  } else if (lowerCondition.includes('diabetes')) {
    return [
      "How often are you checking your blood sugar levels?",
      "Have your readings been within the target range?",
      "Are you experiencing any symptoms like increased thirst or frequent urination?",
      "How is your foot care routine?",
      "Have you noticed any changes in your vision?"
    ];
  } else {
    return [
      `How have your ${condition} symptoms changed since your last visit?`,
      "Have you been following the prescribed treatment plan?",
      "Have you experienced any new symptoms or side effects?",
      "Are you satisfied with your current treatment?",
      "Do you have any questions about your condition or treatment?"
    ];
  }
}
