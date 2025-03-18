
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
import { predefinedSymptoms } from "../utils/predefinedData";

interface SymptomsSelectorProps {
  selectedSymptoms: string[];
  onSymptomsSelect: (symptoms: string[]) => void;
}

const SymptomsSelector: React.FC<SymptomsSelectorProps> = ({
  selectedSymptoms,
  onSymptomsSelect,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSymptomToggle = (symptomId: string) => {
    let updatedSymptoms;
    if (selectedSymptoms.includes(symptomId)) {
      updatedSymptoms = selectedSymptoms.filter(id => id !== symptomId);
    } else {
      updatedSymptoms = [...selectedSymptoms, symptomId];
    }
    onSymptomsSelect(updatedSymptoms);
  };

  return (
    <div>
      <label className="text-sm font-medium mb-1 block">Symptoms</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
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
  );
};

export default SymptomsSelector;
