
import { supabase } from "@/integrations/supabase/client";

export interface AgentDocument {
  id: string;
  agent_id: string;
  title: string;
  content: string;
  category: string;
  created_at?: string;
  updated_at?: string;
}

export async function getAgentDocumentation(agentId: string): Promise<AgentDocument[]> {
  try {
    const { data, error } = await supabase
      .from('agent_documentation')
      .select('*')
      .eq('agent_id', agentId)
      .order('category');

    if (error) {
      console.error("Error fetching agent documentation:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Failed to get agent documentation:", error);
    return [];
  }
}

export async function getDocumentById(documentId: string): Promise<AgentDocument | null> {
  try {
    const { data, error } = await supabase
      .from('agent_documentation')
      .select('*')
      .eq('id', documentId)
      .single();

    if (error) {
      console.error("Error fetching document:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to get document:", error);
    return null;
  }
}
