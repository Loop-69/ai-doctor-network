
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

import { ScheduleFormValues } from "../types/scheduleTypes";
import { useQuestionGenerator } from "../hooks/useQuestionGenerator";
import PatientAgentSelect from "../components/PatientAgentSelect";
import DateTimeSelect from "../components/DateTimeSelect";
import PurposeConditionInputs from "../components/PurposeConditionInputs";
import QuestionsTextarea from "../components/QuestionsTextarea";

const ScheduleTab = () => {
  const { toast } = useToast();
  
  const form = useForm<ScheduleFormValues>({
    defaultValues: {
      patientId: "",
      agentId: "",
      date: undefined,
      time: "",
      purpose: "",
      condition: "",
      questions: "",
    },
  });

  const { isGeneratingQuestions } = useQuestionGenerator(form);

  const onSubmit = (data: ScheduleFormValues) => {
    console.log("Form submitted:", data);
    
    // Here we would typically save this to a database
    // For now, we'll just show a success toast
    toast({
      title: "Follow-up scheduled",
      description: `Follow-up with patient scheduled for ${format(data.date, "PPP")} at ${data.time}`,
    });
    
    // Reset the form
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule a Patient Follow-up</CardTitle>
        <CardDescription>
          Schedule an AI agent to make a follow-up call to a patient and generate a report
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PatientAgentSelect form={form} />
            <DateTimeSelect form={form} />
            <PurposeConditionInputs form={form} />
            <QuestionsTextarea 
              form={form} 
              isGeneratingQuestions={isGeneratingQuestions} 
            />
            <Button type="submit" className="w-full md:w-auto">
              Schedule Follow-up
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ScheduleTab;
