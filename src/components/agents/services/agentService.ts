
import { Agent } from "../types/agentTypes";
import { supabase } from "@/integrations/supabase/client";

export const generateAIResponse = async (prompt: string, agent: Agent): Promise<string> => {
  try {
    console.log(`Generating AI response for prompt: ${prompt.substring(0, 50)}...`);
    console.log(`Using agent: ${agent.name}, specialty: ${agent.specialty}`);
    
    // Option 1: Use direct Supabase function invoke (preferred)
    console.log(`Using direct Supabase function invoke`);
    
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
    
    console.log("AI response generated successfully");
    return data.response;
  } catch (error) {
    console.error("Error calling AI edge function:", error);
    return "I'm sorry, I encountered an error while processing your request. Please try again later.";
  }
};

export const generateFollowUpQuestions = async (condition: string, specialty?: string): Promise<string[]> => {
  try {
    console.log(`Generating follow-up questions for condition: ${condition}`);
    if (specialty) {
      console.log(`Specialty context: ${specialty}`);
    }
    
    // Use direct Supabase function invoke (preferred)
    console.log(`Using direct Supabase function invoke`);
    
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
    
    console.log("Follow-up questions generated successfully:", data.questions);
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
