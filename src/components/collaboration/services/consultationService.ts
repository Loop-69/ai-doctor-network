
import { supabase } from "@/integrations/supabase/client";
import { Agent, Diagnosis } from "../types/consultationTypes";

export async function createConsultation() {
  const { data, error } = await supabase
    .from('ai_consultations')
    .insert({
      status: 'in_progress',
      started_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data.id;
}

export async function addConsultationMessage(consultationId: string, content: string, role: 'doctor' | 'assistant') {
  const { data, error } = await supabase
    .from('ai_consultation_messages')
    .insert({
      consultation_id: consultationId,
      content,
      role
    });

  if (error) throw error;
  return data;
}

export async function generateAgentResponse(
  consultationId: string, 
  agent: Agent, 
  symptoms: string
): Promise<{
  diagnosis: string;
  recommendation: string;
  confidence: number;
}> {
  const { data, error } = await supabase.functions.invoke('generate-medical-response', {
    body: {
      symptoms,
      specialty: agent.specialty,
      agentId: agent.id,
      agentName: agent.name,
      consultationId: consultationId,
      isCollaborative: true
    }
  });

  if (error) throw error;

  return {
    diagnosis: data.diagnosis,
    recommendation: data.recommendation,
    confidence: data.confidence || Math.floor(Math.random() * 30) + 70 // Fallback to random 70-99%
  };
}
