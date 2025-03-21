
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
            <FormLabel htmlFor="followup-purpose">Purpose of Follow-up</FormLabel>
            <FormControl>
              <Input 
                id="followup-purpose"
                placeholder="E.g., Medication check, post-surgery follow-up" 
                autoComplete="off"
                {...field} 
              />
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
            <FormLabel htmlFor="patient-condition">Patient Condition</FormLabel>
            <FormControl>
              <Input 
                id="patient-condition"
                placeholder="E.g., Hypertension, Post-operative recovery, Diabetes" 
                autoComplete="off"
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
