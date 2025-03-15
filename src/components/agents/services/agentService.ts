
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
