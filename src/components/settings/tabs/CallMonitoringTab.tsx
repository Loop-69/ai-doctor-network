
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const monitoringFormSchema = z.object({
  enableCallRecording: z.boolean().default(true),
  recordingStorageDuration: z.string().default("30"),
  patientConsentRequired: z.boolean().default(true),
  monitoringPermissions: z.enum(["all-staff", "admin-only", "custom"]).default("admin-only"),
  autoTranscription: z.boolean().default(true),
  notifyOnCallStart: z.boolean().default(true),
  notifyOnPatientWaiting: z.boolean().default(true),
  notifyOnAbnormalPatientResponse: z.boolean().default(true),
  promptsVisibleToPatient: z.boolean().default(false),
  showStaffJoinedNotification: z.boolean().default(true),
});

type MonitoringFormValues = z.infer<typeof monitoringFormSchema>;

const CallMonitoringTab = () => {
  const { toast } = useToast();
  
  const form = useForm<MonitoringFormValues>({
    resolver: zodResolver(monitoringFormSchema),
    defaultValues: {
      enableCallRecording: true,
      recordingStorageDuration: "30",
      patientConsentRequired: true,
      monitoringPermissions: "admin-only",
      autoTranscription: true,
      notifyOnCallStart: true,
      notifyOnPatientWaiting: true,
      notifyOnAbnormalPatientResponse: true,
      promptsVisibleToPatient: false,
      showStaffJoinedNotification: true,
    },
  });

  function onSubmit(data: MonitoringFormValues) {
    console.log("Call monitoring settings updated:", data);
    toast({
      title: "Settings updated",
      description: "Call monitoring settings have been saved successfully.",
    });
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Call Monitoring Configuration</CardTitle>
        <CardDescription>
          Configure advanced settings for patient follow-up call monitoring
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Recording Settings</h3>
              <FormField
                control={form.control}
                name="enableCallRecording"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel>Enable Call Recording</FormLabel>
                      <FormDescription>
                        Record all patient follow-up calls for review and training purposes
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("enableCallRecording") && (
                <>
                  <FormField
                    control={form.control}
                    name="recordingStorageDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recording Storage Duration</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select storage duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="180">180 days</SelectItem>
                            <SelectItem value="365">1 year</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          How long to keep recorded calls before automatic deletion
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="patientConsentRequired"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Require Patient Consent</FormLabel>
                          <FormDescription>
                            Automatically request and record patient consent before starting call recording
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="autoTranscription"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Automatic Transcription</FormLabel>
                          <FormDescription>
                            Generate text transcriptions of all recorded calls
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Monitoring Permissions</h3>
              <FormField
                control={form.control}
                name="monitoringPermissions"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Who Can Monitor Calls</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="all-staff" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            All clinical staff
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="admin-only" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Administrators only
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="custom" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Custom permissions
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      Control which staff members can monitor patient follow-up calls
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Preferences</h3>
              <FormField
                control={form.control}
                name="notifyOnCallStart"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Notify when a scheduled call starts
                      </FormLabel>
                      <FormDescription>
                        Send a notification when a follow-up call begins
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notifyOnPatientWaiting"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Patient waiting alert
                      </FormLabel>
                      <FormDescription>
                        Send an alert when a patient has been waiting for a response for over 30 seconds
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notifyOnAbnormalPatientResponse"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Abnormal response detection
                      </FormLabel>
                      <FormDescription>
                        Alert staff when AI detects concerning or abnormal patient responses
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Patient Experience</h3>
              <FormField
                control={form.control}
                name="promptsVisibleToPatient"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel>Show AI Prompts to Patient</FormLabel>
                      <FormDescription>
                        Allow patients to see the actual prompts being used by the AI assistant
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="showStaffJoinedNotification"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel>Show Staff Joined Notification</FormLabel>
                      <FormDescription>
                        Notify patients when a staff member joins the call monitoring session
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit">Save Settings</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CallMonitoringTab;
