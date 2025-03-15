
import { Agent } from "../types/agentTypes";

export const generateAIResponse = async (prompt: string, agent: Agent): Promise<string> => {
  try {
    const response = await fetch("/api/generate-medical-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        agentName: agent.name,
        specialty: agent.specialty,
      }),
    });
    
    if (!response.ok) {
      throw new Error("Failed to generate response");
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error calling AI edge function:", error);
    throw error;
  }
};

export const generateFollowUpQuestions = async (condition: string, specialty?: string): Promise<string[]> => {
  try {
    const response = await fetch("/api/generate-followup-questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        condition,
        specialty,
      }),
    });
    
    if (!response.ok) {
      throw new Error("Failed to generate follow-up questions");
    }
    
    const data = await response.json();
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
