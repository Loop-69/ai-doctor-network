
import { Agent } from "../types/agentTypes";
import { supabase } from "@/integrations/supabase/client";

export const generateAIResponse = async (prompt: string, agent: Agent): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-medical-response', {
      body: {
        prompt,
        agentName: agent.name,
        specialty: agent.specialty,
        modelProvider: "gemini",
        modelName: "gemini-2.0-flash"
      }
    });
    
    if (error) {
      console.error("Supabase function error:", error);
      throw new Error(`Supabase function error: ${error.message}`);
    }
    
    return data.response;
  } catch (error) {
    console.error("Error calling AI edge function:", error);
    return "I'm sorry, I encountered an error while processing your request. Please try again later.";
  }
};

export const generateFollowUpQuestions = async (condition: string, specialty?: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-followup-questions', {
      body: {
        condition,
        specialty,
        modelProvider: "gemini",
        modelName: "gemini-2.0-flash"
      }
    });
    
    if (error) {
      console.error("Supabase function error:", error);
      throw new Error(`Supabase function error: ${error.message}`);
    }
    
    return data.questions;
  } catch (error) {
    console.error("Error generating follow-up questions:", error);
    return [
      `How have your ${condition} symptoms changed since your last visit?`,
      "Have you been following the prescribed treatment plan?",
      "Have you experienced any new symptoms or side effects?"
    ];
  }
};
