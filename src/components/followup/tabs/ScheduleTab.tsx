
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
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

interface ScheduleFormValues {
  patientId: string;
  agentId: string;
  date: Date;
  time: string;
  purpose: string;
  questions: string;
}

const ScheduleTab = () => {
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();
  
  const form = useForm<ScheduleFormValues>({
    defaultValues: {
      patientId: "",
      agentId: "",
      date: undefined,
      time: "",
      purpose: "",
      questions: "",
    },
  });

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
              name="questions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Follow-up Questions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the questions the AI should ask during the follow-up"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter specific questions for the AI agent to ask the patient
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
