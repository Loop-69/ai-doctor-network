
import { useState } from "react";
import { Agent, Diagnosis, Message } from "../../types/consultationTypes";

export function useConsultationState() {
  const [consultationStarted, setConsultationStarted] = useState(false);
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [activeTab, setActiveTab] = useState("conversation");

  return {
    consultationStarted,
    setConsultationStarted,
    consultationId,
    setConsultationId,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    diagnoses,
    setDiagnoses,
    activeTab,
    setActiveTab
  };
}
