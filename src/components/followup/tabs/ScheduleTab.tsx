
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Calendar as CalendarIcon, Clock, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { generateFollowUpQuestions } from "@/components/agents/services/agentService";

interface ScheduleFormValues {
  patientId: string;
  agentId: string;
  date: Date;
  time: string;
  purpose: string;
  condition: string;
  questions: string;
}

const ScheduleTab = () => {
  const [date, setDate] = useState<Date>();
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
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

  const watchCondition = form.watch("condition");
  const watchAgentId = form.watch("agentId");

  // Get specialty based on selected agent
  const getSpecialtyForAgent = (agentId: string): string | undefined => {
    switch (agentId) {
      case "cardio":
        return "Cardiology";
      case "neuro":
        return "Neurology";
      case "gen":
        return "General Practice";
      case "path":
        return "Pathology";
      default:
        return undefined;
    }
  };

  // Generate questions when condition changes
  useEffect(() => {
    const condition = watchCondition;
    const agentId = watchAgentId;
    
    if (condition && condition.length > 3) {
      const specialty = getSpecialtyForAgent(agentId);
      setIsGeneratingQuestions(true);
      
      const delayDebounceFn = setTimeout(async () => {
        try {
          const questions = await generateFollowUpQuestions(condition, specialty);
          
          if (questions && questions.length > 0) {
            // Format the questions as a numbered list
            const formattedQuestions = questions.map((q, i) => `${i + 1}. ${q}`).join('\n\n');
            form.setValue('questions', formattedQuestions);
            
            toast({
              title: "Questions generated",
              description: "Follow-up questions have been generated based on the condition",
            });
          }
        } catch (error) {
          console.error("Failed to generate questions:", error);
          toast({
            title: "Failed to generate questions",
            description: "An error occurred while generating questions. Please try again.",
            variant: "destructive"
          });
        } finally {
          setIsGeneratingQuestions(false);
        }
      }, 1000);
      
      return () => clearTimeout(delayDebounceFn);
    }
  }, [watchCondition, watchAgentId, form, toast]);

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

  // Mock patient data - in a real app, you'd fetch this from your backend
  const patients = [
    { id: "p1", name: "Jane Doe" },
    { id: "p2", name: "John Smith" },
    { id: "p3", name: "Maria Garcia" },
    { id: "p4", name: "Robert Chen" },
  ];

  // Mock agent data - in a real app, you'd fetch this from your backend
  const agents = [
    { id: "cardio", name: "CardioAssist" },
    { id: "neuro", name: "NeuroLogic" },
    { id: "gen", name: "GeneralMD" },
    { id: "path", name: "PathInsight" },
  ];

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a patient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the patient to follow up with
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Agent</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an agent" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {agents.map((agent) => (
                          <SelectItem key={agent.id} value={agent.id}>
                            {agent.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the AI agent to make the follow-up call
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setDate(date);
                          }}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The date for the follow-up call
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type="time"
                          placeholder="Select a time"
                          {...field}
                          className="pl-10"
                        />
                      </FormControl>
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>
                    <FormDescription>
                      The time for the follow-up call
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

            <FormField
              control={form.control}
              name="questions"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Follow-up Questions</FormLabel>
                    {isGeneratingQuestions && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating questions...
                      </div>
                    )}
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Questions will be auto-generated when you enter a condition, or you can type custom questions here"
                      className="min-h-[180px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Questions are automatically generated based on the condition, but you can edit or add your own
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
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
