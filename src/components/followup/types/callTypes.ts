
export interface ActiveCall {
  id: string;
  patient: Patient;
  agentName: string;
  startTime: Date;
  duration: number;
  purpose: string;
  conditions: string[];
  autoAdvance?: boolean;
  onConversationUpdate?: (message: ConversationMessage) => void;
}

export interface ConversationMessage {
  id: string;
  sender: 'agent' | 'patient' | 'doctor';
  content: string;
  timestamp: Date;
  isEdited?: boolean;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  conditions: string[];
}

export interface Call {
  id: string;
  patient: Patient;
  agentName: string;
  startTime: Date;
  purpose: string;
  conditions: string[];
  duration: number;
  autoAdvance?: boolean;
  onConversationUpdate?: (message: ConversationMessage) => void;
}
