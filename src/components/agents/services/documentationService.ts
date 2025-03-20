
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
    // Use the any type to bypass TypeScript's type checking
    const { data, error } = await supabase
      .from('agent_documentation' as any)
      .select('*')
      .eq('agent_id', agentId)
      .order('category');

    if (error) {
      console.error("Error fetching agent documentation:", error);
      throw error;
    }

    // Explicitly cast the data to the AgentDocument[] type
    return (data as unknown as AgentDocument[]) || [];
  } catch (error) {
    console.error("Failed to get agent documentation:", error);
    return [];
  }
}

export async function getDocumentById(documentId: string): Promise<AgentDocument | null> {
  try {
    // Use the any type to bypass TypeScript's type checking
    const { data, error } = await supabase
      .from('agent_documentation' as any)
      .select('*')
      .eq('id', documentId)
      .single();

    if (error) {
      console.error("Error fetching document:", error);
      throw error;
    }

    // Explicitly cast the data to the AgentDocument type
    return data as unknown as AgentDocument;
  } catch (error) {
    console.error("Failed to get document:", error);
    return null;
  }
}
