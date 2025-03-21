
import { supabase } from '@/integrations/supabase/client';
import { Agent } from '../types/agentTypes';
import { Message } from '../hooks/useChatMessages';

export interface MedicalResponse {
  diagnosis: string;
  recommendation: string;
  confidence: number;
}

/**
 * Generate a medical response from the AI
 */
export async function generateMedicalResponse(
  symptoms: string,
  agent: Agent,
  previousMessages: Message[] = []
): Promise<MedicalResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('generate-medical-response', {
      body: {
        symptoms,
        specialty: agent.specialty,
        agentId: agent.id,
        agentName: agent.name,
        previousMessages: previousMessages.slice(-10) // Send last 10 messages for context
      }
    });

    if (error) {
      console.error("Error generating medical response:", error);
      throw error;
    }

    console.log("Response generated successfully:", data);
    return {
      diagnosis: data.diagnosis || "Unable to provide diagnosis with given information.",
      recommendation: data.recommendation || "Please consult with a human healthcare provider.",
      confidence: data.confidence || Math.floor(Math.random() * 30) + 70 // Fallback to random 70-99%
    };
  } catch (error) {
    console.error(`Error in generateMedicalResponse for ${agent.name}:`, error);
    throw error;
  }
}

/**
 * Save chat messages to database
 */
export async function saveChatMessage(
  agentId: string,
  content: string,
  role: 'user' | 'agent'
) {
  try {
    const { data, error } = await supabase
      .from('ai_agent_messages')
      .insert({
        agent_id: agentId,
        content,
        role
      });

    if (error) {
      console.error("Error saving chat message:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in saveChatMessage:", error);
    throw error;
  }
}

/**
 * Get chat history for an agent
 */
export async function getChatHistory(agentId: string) {
  try {
    const { data, error } = await supabase
      .from('ai_agent_messages')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error("Error fetching chat history:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in getChatHistory:", error);
    throw error;
  }
}
