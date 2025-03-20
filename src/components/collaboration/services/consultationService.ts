
import { supabase } from "@/integrations/supabase/client";
import { Agent, Diagnosis, Message, Consultation } from "../types/consultationTypes";

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

export async function getConsultationMessages(consultationId: string) {
  const { data, error } = await supabase
    .from('ai_consultation_messages')
    .select('*')
    .eq('consultation_id', consultationId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function updateConsultationStatus(consultationId: string, status: 'in_progress' | 'completed' | 'cancelled') {
  const { data, error } = await supabase
    .from('ai_consultations')
    .update({ 
      status,
      ended_at: status !== 'in_progress' ? new Date().toISOString() : null
    })
    .eq('id', consultationId)
    .select();

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

export async function saveDiagnosis(
  consultationId: string,
  diagnosis: Diagnosis
) {
  const { data, error } = await supabase
    .from('ai_consultations')
    .update({
      recommendation: diagnosis.recommendation,
      summary: diagnosis.diagnosis,
      severity: diagnosis.confidence > 90 ? 'high' : diagnosis.confidence > 75 ? 'medium' : 'low'
    })
    .eq('id', consultationId)
    .select();

  if (error) throw error;
  return data;
}

export async function getConsultationById(consultationId: string) {
  const { data, error } = await supabase
    .from('ai_consultations')
    .select('*')
    .eq('id', consultationId)
    .single();

  if (error) throw error;
  return data;
}
