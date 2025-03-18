
import { useState } from "react";

export const useChatSelectors = () => {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  const clearSelections = () => {
    setSelectedPatient(null);
    setSelectedSymptoms([]);
    setSelectedQuestions([]);
  };

  return {
    selectedPatient,
    setSelectedPatient,
    selectedSymptoms,
    setSelectedSymptoms,
    selectedQuestions,
    setSelectedQuestions,
    clearSelections
  };
};
