
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { predefinedQuestions } from "../utils/predefinedData";

interface QuestionsSelectorProps {
  selectedQuestions: string[];
  onQuestionsSelect: (questions: string[]) => void;
}

const QuestionsSelector: React.FC<QuestionsSelectorProps> = ({
  selectedQuestions,
  onQuestionsSelect,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleQuestionToggle = (questionId: string) => {
    let updatedQuestions;
    if (selectedQuestions.includes(questionId)) {
      updatedQuestions = selectedQuestions.filter(id => id !== questionId);
    } else {
      updatedQuestions = [...selectedQuestions, questionId];
    }
    onQuestionsSelect(updatedQuestions);
  };

  return (
    <div>
      <label className="text-sm font-medium mb-1 block">Standard Questions</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
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
  );
};

export default QuestionsSelector;
