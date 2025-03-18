
import React, { useState } from "react";
import { Check, ChevronsUpDown, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { 
  mockPatients,
  predefinedSymptoms,
  predefinedQuestions
} from "./utils/predefinedData";

interface DropdownSelectorsProps {
  onPatientSelect: (patient: any) => void;
  onSymptomsSelect: (symptoms: string[]) => void;
  onQuestionsSelect: (questions: string[]) => void;
}

const DropdownSelectors: React.FC<DropdownSelectorsProps> = ({
  onPatientSelect,
  onSymptomsSelect,
  onQuestionsSelect,
}) => {
  const [patientOpen, setPatientOpen] = useState(false);
  const [symptomsOpen, setSymptomsOpen] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient);
    onPatientSelect(patient);
    setPatientOpen(false);
  };

  const handleSymptomToggle = (symptomId: string) => {
    let updatedSymptoms;
    if (selectedSymptoms.includes(symptomId)) {
      updatedSymptoms = selectedSymptoms.filter(id => id !== symptomId);
    } else {
      updatedSymptoms = [...selectedSymptoms, symptomId];
    }
    setSelectedSymptoms(updatedSymptoms);
    onSymptomsSelect(updatedSymptoms);
  };

  const handleQuestionToggle = (questionId: string) => {
    let updatedQuestions;
    if (selectedQuestions.includes(questionId)) {
      updatedQuestions = selectedQuestions.filter(id => id !== questionId);
    } else {
      updatedQuestions = [...selectedQuestions, questionId];
    }
    setSelectedQuestions(updatedQuestions);
    onQuestionsSelect(updatedQuestions);
  };

  const handleAddSelectedToChat = () => {
    // Build a formatted symptom and question text
    let message = "";
    
    // Add patient info if selected
    if (selectedPatient) {
      message += `Patient: ${selectedPatient.name}, ${selectedPatient.age}, ${selectedPatient.gender}\n\n`;
    }
    
    // Add symptoms if selected
    if (selectedSymptoms.length > 0) {
      message += "Symptoms:\n";
      selectedSymptoms.forEach(id => {
        const symptom = predefinedSymptoms.find(s => s.id === id);
        if (symptom) {
          message += `- ${symptom.label}\n`;
        }
      });
      message += "\n";
    }
    
    // Add questions if selected
    if (selectedQuestions.length > 0) {
      message += "Questions:\n";
      selectedQuestions.forEach(id => {
        const question = predefinedQuestions.find(q => q.id === id);
        if (question) {
          message += `- ${question.question}\n`;
        }
      });
    }
    
    // Update chat input with the formatted message
    if (message) {
      const event = new CustomEvent('addToChat', { 
        detail: { message: message.trim() }
      });
      window.dispatchEvent(event);
      
      // Clear selections after adding to chat
      setSelectedSymptoms([]);
      setSelectedQuestions([]);
    }
  };

  return (
    <div className="space-y-4 mb-6 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
      <h3 className="text-lg font-medium">Consultation Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Patient Selector */}
        <div>
          <label className="text-sm font-medium mb-1 block">Select Patient</label>
          <Popover open={patientOpen} onOpenChange={setPatientOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={patientOpen}
                className="w-full justify-between"
              >
                {selectedPatient ? (
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {selectedPatient.name}
                  </div>
                ) : (
                  "Select patient..."
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search patients..." />
                <CommandEmpty>No patient found.</CommandEmpty>
                <CommandList>
                  <CommandGroup heading="Patients">
                    {mockPatients.map((patient) => (
                      <CommandItem
                        key={patient.id}
                        value={patient.id}
                        onSelect={() => handlePatientSelect(patient)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedPatient?.id === patient.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <div className="flex flex-col">
                          <span>{patient.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {patient.age} years, {patient.gender}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Symptoms Selector */}
        <div>
          <label className="text-sm font-medium mb-1 block">Symptoms</label>
          <Popover open={symptomsOpen} onOpenChange={setSymptomsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={symptomsOpen}
                className="w-full justify-between"
              >
                {selectedSymptoms.length > 0 
                  ? `${selectedSymptoms.length} selected`
                  : "Select symptoms..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search symptoms..." />
                <CommandEmpty>No symptom found.</CommandEmpty>
                <CommandList>
                  <CommandGroup heading="Symptoms">
                    {predefinedSymptoms.map((symptom) => (
                      <CommandItem
                        key={symptom.id}
                        value={symptom.id}
                        onSelect={() => handleSymptomToggle(symptom.id)}
                        className="flex items-center space-x-2"
                      >
                        <div
                          className={cn(
                            "flex h-4 w-4 items-center justify-center rounded border",
                            selectedSymptoms.includes(symptom.id)
                              ? "bg-primary border-primary"
                              : "opacity-50"
                          )}
                        >
                          {selectedSymptoms.includes(symptom.id) && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span>{symptom.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {symptom.description}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          
          {/* Display selected symptoms */}
          {selectedSymptoms.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedSymptoms.map(id => {
                const symptom = predefinedSymptoms.find(s => s.id === id);
                return (
                  <Badge 
                    key={id} 
                    variant="outline" 
                    className="text-xs"
                    onClick={() => handleSymptomToggle(id)}
                  >
                    {symptom?.label} ✕
                  </Badge>
                );
              })}
            </div>
          )}
        </div>

        {/* Questions Selector */}
        <div>
          <label className="text-sm font-medium mb-1 block">Standard Questions</label>
          <Popover open={questionsOpen} onOpenChange={setQuestionsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={questionsOpen}
                className="w-full justify-between"
              >
                {selectedQuestions.length > 0 
                  ? `${selectedQuestions.length} selected`
                  : "Select questions..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search questions..." />
                <CommandEmpty>No question found.</CommandEmpty>
                <CommandList>
                  <CommandGroup heading="Standard Questions">
                    {predefinedQuestions.map((question) => (
                      <CommandItem
                        key={question.id}
                        value={question.id}
                        onSelect={() => handleQuestionToggle(question.id)}
                        className="flex items-center space-x-2"
                      >
                        <div
                          className={cn(
                            "flex h-4 w-4 items-center justify-center rounded border",
                            selectedQuestions.includes(question.id)
                              ? "bg-primary border-primary"
                              : "opacity-50"
                          )}
                        >
                          {selectedQuestions.includes(question.id) && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <span className="text-sm">{question.question}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          
          {/* Display selected questions */}
          {selectedQuestions.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedQuestions.map(id => {
                const question = predefinedQuestions.find(q => q.id === id);
                return (
                  <Badge 
                    key={id} 
                    variant="outline" 
                    className="text-xs"
                    onClick={() => handleQuestionToggle(id)}
                  >
                    {question?.question.substring(0, 20)}... ✕
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      {/* Add to Chat Button */}
      {(selectedSymptoms.length > 0 || selectedQuestions.length > 0 || selectedPatient) && (
        <Button 
          onClick={handleAddSelectedToChat}
          className="mt-2"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Chat
        </Button>
      )}
    </div>
  );
};

export default DropdownSelectors;
