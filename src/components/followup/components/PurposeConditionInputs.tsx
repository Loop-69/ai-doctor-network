
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ScheduleFormValues } from "../types/scheduleTypes";

interface PurposeConditionInputsProps {
  form: UseFormReturn<ScheduleFormValues>;
}

const PurposeConditionInputs: React.FC<PurposeConditionInputsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="purpose"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Purpose of Follow-up</FormLabel>
            <FormControl>
              <Input placeholder="E.g., Medication check, post-surgery follow-up" {...field} />
            </FormControl>
            <FormDescription>
              Briefly describe the purpose of this follow-up call
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="condition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Patient Condition</FormLabel>
            <FormControl>
              <Input 
                placeholder="E.g., Hypertension, Post-operative recovery, Diabetes" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Enter the patient's condition to generate relevant follow-up questions
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PurposeConditionInputs;
