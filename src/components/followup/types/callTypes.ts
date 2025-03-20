
export interface ActiveCall {
  id: string;
  patientName: string;
  agentName: string;
  startTime: Date;
  duration: number;
}

export interface ConversationMessage {
  id: string;
  sender: 'agent' | 'patient' | 'doctor';
  content: string;
  timestamp: Date;
  isEdited?: boolean;
}
