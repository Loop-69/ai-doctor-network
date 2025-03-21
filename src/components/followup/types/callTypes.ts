
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

// Adding missing Patient and Call interfaces
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
  startTime: Date;
  purpose: string;
  conditions: string[];
  agentName?: string;
}
