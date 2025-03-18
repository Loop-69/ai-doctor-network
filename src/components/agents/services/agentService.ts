
import { Agent } from "../types/agentTypes";
import { GEMINI_API_KEY } from "@/integrations/supabase/client";
import { supabase } from "@/integrations/supabase/client";

export const generateAIResponse = async (prompt: string, agent: Agent): Promise<string> => {
  try {
    console.log(`Generating AI response for prompt: ${prompt.substring(0, 50)}...`);
    console.log(`Using agent: ${agent.name}, specialty: ${agent.specialty}`);
    
    // Make the API path absolute to ensure it works correctly
    const apiPath = window.location.origin + "/api/generate-medical-response";
    console.log(`Calling API endpoint: ${apiPath}`);
    
    const response = await fetch(apiPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        agentName: agent.name,
        specialty: agent.specialty,
        modelProvider: "gemini",
        modelName: "gemini-2.0-flash"
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error response (${response.status}):`, errorText);
      throw new Error(`Failed to generate response: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("AI response generated successfully");
    return data.response;
  } catch (error) {
    console.error("Error calling AI edge function:", error);
    throw error;
  }
};

export const generateFollowUpQuestions = async (condition: string, specialty?: string): Promise<string[]> => {
  try {
    console.log(`Generating follow-up questions for condition: ${condition}`);
    if (specialty) {
      console.log(`Specialty context: ${specialty}`);
    }
    
    // Make the API path absolute to ensure it works correctly
    const apiPath = window.location.origin + "/api/generate-followup-questions";
    console.log(`Calling API endpoint: ${apiPath}`);
    
    const response = await fetch(apiPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        condition,
        specialty,
        modelProvider: "gemini",
        modelName: "gemini-2.0-flash"
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error response (${response.status}):`, errorText);
      throw new Error(`Failed to generate follow-up questions: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
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
