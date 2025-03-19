
export interface Agent {
  id: string;
  name: string;
  specialty: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  color: string;
}

export interface Diagnosis {
  agentId: string;
  agentName: string;
  specialty: string;
  diagnosis: string;
  confidence: number;
  recommendation: string;
}

export interface Message {
  id: string;
  sender: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isDoctor?: boolean;
  isUser?: boolean;
}
