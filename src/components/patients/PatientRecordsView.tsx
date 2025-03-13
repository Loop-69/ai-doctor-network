
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Plus,
  Heart, 
  Activity, 
  Pill, 
  FileText, 
  Calendar,
  UserPlus 
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const patients = [
  {
    id: "p1",
    name: "Maria Garcia",
    age: 57,
    gender: "Female",
    condition: "Hypertension, Diabetes Type 2",
    lastVisit: "2023-05-12",
    status: "Critical",
    doctor: "Dr. Chen",
  },
  {
    id: "p2",
    name: "John Smith",
    age: 68,
    gender: "Male",
    condition: "Coronary Artery Disease, Hyperlipidemia",
    lastVisit: "2023-04-28",
    status: "Stable",
    doctor: "Dr. Chen",
  },
  {
    id: "p3",
    name: "Emma Williams",
    age: 72,
    gender: "Female",
    condition: "Arrhythmia, Pacemaker",
    lastVisit: "2023-05-01",
    status: "Improving",
    doctor: "Dr. Chen",
  },
  {
    id: "p4",
    name: "Robert Johnson",
    age: 64,
    gender: "Male",
    condition: "Heart Valve Disease, Hypertension",
    lastVisit: "2023-05-10",
    status: "Follow-up",
    doctor: "Dr. Chen",
  },
  {
    id: "p5",
    name: "Susan Miller",
    age: 59,
    gender: "Female",
    condition: "Heart Failure, Fluid Retention",
    lastVisit: "2023-05-08",
    status: "Critical",
    doctor: "Dr. Chen",
  },
];

// Form schemas
const newPatientSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.coerce.number().min(1, { message: "Age must be at least 1." }).max(120, { message: "Age must be less than 120." }),
  gender: z.string().min(1, { message: "Please select a gender." }),
  condition: z.string().min(1, { message: "Please enter a medical condition." }),
  doctor: z.string().min(1, { message: "Please select a doctor." }),
  status: z.string().min(1, { message: "Please select a status." }),
  notes: z.string().optional(),
});

const newConsultationSchema = z.object({
  date: z.string().min(1, { message: "Please select a date." }),
  time: z.string().min(1, { message: "Please select a time." }),
  consultationType: z.string().min(1, { message: "Please select a consultation type." }),
  notes: z.string().optional(),
});

const PatientRecordsView = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [newPatientDialogOpen, setNewPatientDialogOpen] = useState(false);
  const [viewRecordsDialogOpen, setViewRecordsDialogOpen] = useState(false);
  const [newConsultationDialogOpen, setNewConsultationDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<(typeof patients)[0] | null>(null);
  const [localPatients, setLocalPatients] = useState(patients);

  const filteredPatients = localPatients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const newPatientForm = useForm<z.infer<typeof newPatientSchema>>({
    resolver: zodResolver(newPatientSchema),
    defaultValues: {
      name: "",
      age: undefined,
      gender: "",
      condition: "",
      doctor: "Dr. Chen",
      status: "Stable",
      notes: "",
    },
  });

  const newConsultationForm = useForm<z.infer<typeof newConsultationSchema>>({
    resolver: zodResolver(newConsultationSchema),
    defaultValues: {
      date: "",
      time: "",
      consultationType: "in-person",
      notes: "",
    },
  });

  const onNewPatientSubmit = (data: z.infer<typeof newPatientSchema>) => {
    // Add a new patient to the local state
    const newPatient = {
      id: `p${localPatients.length + 1}`,
      name: data.name,
      age: data.age,
      gender: data.gender,
      condition: data.condition,
      lastVisit: new Date().toISOString().split('T')[0],
      status: data.status,
      doctor: data.doctor,
    };
    
    setLocalPatients([...localPatients, newPatient]);
    setNewPatientDialogOpen(false);
    newPatientForm.reset();
    
    toast({
      title: "Patient Added",
      description: `${data.name} has been added to your patient records.`,
    });
  };

  const onNewConsultationSubmit = (data: z.infer<typeof newConsultationSchema>) => {
    if (!selectedPatient) return;
    
    // In a real app, we would add the consultation to the database
    // For now, we'll just show a toast
    
    toast({
      title: "Consultation Scheduled",
      description: `A ${data.consultationType} consultation has been scheduled with ${selectedPatient.name} on ${data.date} at ${data.time}.`,
    });
    
    setNewConsultationDialogOpen(false);
    newConsultationForm.reset();
  };

  const handleViewRecords = (patient: (typeof patients)[0]) => {
    setSelectedPatient(patient);
    setViewRecordsDialogOpen(true);
  };

  const handleNewConsultation = (patient: (typeof patients)[0]) => {
    setSelectedPatient(patient);
    setNewConsultationDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <motion.h1 
          className="h1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Patient Records
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Manage and view your patient health records
        </motion.p>
      </header>

      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-10" 
            placeholder="Search patients by name or condition..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={newPatientDialogOpen} onOpenChange={setNewPatientDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>
                Enter the patient information below to add them to your records.
              </DialogDescription>
            </DialogHeader>
            <Form {...newPatientForm}>
              <form onSubmit={newPatientForm.handleSubmit(onNewPatientSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={newPatientForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={newPatientForm.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={120}
                            placeholder="60"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={newPatientForm.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={newPatientForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Stable">Stable</SelectItem>
                            <SelectItem value="Critical">Critical</SelectItem>
                            <SelectItem value="Improving">Improving</SelectItem>
                            <SelectItem value="Follow-up">Follow-up</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={newPatientForm.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical Condition</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Hypertension, Diabetes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={newPatientForm.control}
                  name="doctor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assigned Doctor</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select doctor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Dr. Chen">Dr. Chen</SelectItem>
                          <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                          <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={newPatientForm.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any additional information"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setNewPatientDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Patient</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </motion.div>

      <Tabs 
        defaultValue="all" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <TabsList className="grid grid-cols-4 md:w-[600px]">
            <TabsTrigger value="all">All Patients</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="stable">Stable</TabsTrigger>
            <TabsTrigger value="recent">Recent Visits</TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredPatients.map((patient, index) => (
              <PatientCard 
                key={patient.id} 
                patient={patient} 
                delay={0.1 * index}
                onViewRecords={() => handleViewRecords(patient)}
                onNewConsultation={() => handleNewConsultation(patient)}
              />
            ))}
            {filteredPatients.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No patients found matching your search criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="critical" className="space-y-4">
          <div className="grid gap-4">
            {filteredPatients
              .filter(p => p.status === "Critical")
              .map((patient, index) => (
                <PatientCard 
                  key={patient.id} 
                  patient={patient} 
                  delay={0.1 * index}
                  onViewRecords={() => handleViewRecords(patient)}
                  onNewConsultation={() => handleNewConsultation(patient)}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="stable" className="space-y-4">
          <div className="grid gap-4">
            {filteredPatients
              .filter(p => p.status === "Stable")
              .map((patient, index) => (
                <PatientCard 
                  key={patient.id} 
                  patient={patient} 
                  delay={0.1 * index}
                  onViewRecords={() => handleViewRecords(patient)}
                  onNewConsultation={() => handleNewConsultation(patient)}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4">
            {filteredPatients
              .sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime())
              .slice(0, 5)
              .map((patient, index) => (
                <PatientCard 
                  key={patient.id} 
                  patient={patient} 
                  delay={0.1 * index}
                  onViewRecords={() => handleViewRecords(patient)}
                  onNewConsultation={() => handleNewConsultation(patient)}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* View Patient Records Dialog */}
      <Dialog open={viewRecordsDialogOpen} onOpenChange={setViewRecordsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Patient Records: {selectedPatient?.name}</DialogTitle>
            <DialogDescription>
              Complete medical history and records
            </DialogDescription>
          </DialogHeader>
          
          {selectedPatient && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {selectedPatient.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{selectedPatient.name}</h2>
                  <p className="text-muted-foreground">
                    {selectedPatient.age} years • {selectedPatient.gender} • Patient ID: {selectedPatient.id}
                  </p>
                </div>
              </div>
              
              <Tabs defaultValue="overview">
                <TabsList className="w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="vitals">Vitals</TabsTrigger>
                  <TabsTrigger value="medications">Medications</TabsTrigger>
                  <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Medical Conditions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 text-medical-red mr-2" />
                            <span>{selectedPatient.condition}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Care Team</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarFallback>DC</AvatarFallback>
                            </Avatar>
                            <span>{selectedPatient.doctor} (Primary)</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Recent Visits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-l-2 border-medical-green pl-4 pb-4 relative">
                          <div className="w-3 h-3 rounded-full bg-medical-green absolute -left-[7px] top-0"></div>
                          <p className="font-medium">{formatDate(selectedPatient.lastVisit)}</p>
                          <p className="text-sm text-muted-foreground">Regular check-up with {selectedPatient.doctor}</p>
                          <p className="text-sm mt-1">
                            Blood pressure: 130/85 mmHg, Heart rate: 72 bpm
                          </p>
                        </div>
                        <div className="border-l-2 border-muted pl-4 relative">
                          <div className="w-3 h-3 rounded-full bg-muted absolute -left-[7px] top-0"></div>
                          <p className="font-medium">{formatDate(new Date(new Date(selectedPatient.lastVisit).getTime() - 30*24*60*60*1000).toISOString())}</p>
                          <p className="text-sm text-muted-foreground">Follow-up with {selectedPatient.doctor}</p>
                          <p className="text-sm mt-1">
                            Discussed medication adjustments and symptom management
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="vitals" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Vital Signs History</CardTitle>
                      <CardDescription>
                        Recent measurements and trends
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium flex items-center">
                            <Activity className="h-4 w-4 mr-2" />
                            Blood Pressure
                          </h3>
                          <div className="h-[200px] mt-2">
                            {/* Placeholder for blood pressure chart */}
                            <div className="w-full h-full bg-slate-100 rounded-md flex items-center justify-center text-muted-foreground text-sm">
                              Blood pressure chart will be displayed here
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium flex items-center">
                            <Activity className="h-4 w-4 mr-2" />
                            Heart Rate
                          </h3>
                          <div className="h-[200px] mt-2">
                            {/* Placeholder for heart rate chart */}
                            <div className="w-full h-full bg-slate-100 rounded-md flex items-center justify-center text-muted-foreground text-sm">
                              Heart rate chart will be displayed here
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="medications" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Medications</CardTitle>
                      <CardDescription>
                        Active prescriptions and dosage
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4 p-3 border rounded-md">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Pill className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">Lisinopril</h3>
                            <p className="text-sm text-muted-foreground">10mg, once daily</p>
                            <p className="text-xs mt-1">For hypertension management</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4 p-3 border rounded-md">
                          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Pill className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">Metformin</h3>
                            <p className="text-sm text-muted-foreground">500mg, twice daily</p>
                            <p className="text-xs mt-1">For diabetes management</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="lab-results" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Lab Results</CardTitle>
                      <CardDescription>
                        Latest diagnostic findings
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium">Complete Blood Count (CBC)</h3>
                          <p className="text-xs text-muted-foreground">Performed on {formatDate(selectedPatient.lastVisit)}</p>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span>White Blood Cells (WBC)</span>
                              <span>8.3 x10^9/L</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Red Blood Cells (RBC)</span>
                              <span>4.9 x10^12/L</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Hemoglobin (Hgb)</span>
                              <span>13.2 g/dL</span>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-sm font-medium">Lipid Panel</h3>
                          <p className="text-xs text-muted-foreground">Performed on {formatDate(new Date(new Date(selectedPatient.lastVisit).getTime() - 5*24*60*60*1000).toISOString())}</p>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span>Total Cholesterol</span>
                              <span>195 mg/dL</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>HDL Cholesterol</span>
                              <span>45 mg/dL</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>LDL Cholesterol</span>
                              <span>125 mg/dL</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Triglycerides</span>
                              <span>150 mg/dL</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewRecordsDialogOpen(false)}>
              Close
            </Button>
            <Button>
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Consultation Dialog */}
      <Dialog open={newConsultationDialogOpen} onOpenChange={setNewConsultationDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule New Consultation</DialogTitle>
            <DialogDescription>
              Schedule a consultation with {selectedPatient?.name}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...newConsultationForm}>
            <form onSubmit={newConsultationForm.handleSubmit(onNewConsultationSubmit)} className="space-y-4">
              <FormField
                control={newConsultationForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={newConsultationForm.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={newConsultationForm.control}
                name="consultationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consultation Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="in-person">In-Person</SelectItem>
                        <SelectItem value="virtual">Virtual</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={newConsultationForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any specifics about the consultation"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setNewConsultationDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Schedule Consultation</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    age: number;
    gender: string;
    condition: string;
    lastVisit: string;
    status: string;
    doctor: string;
  };
  delay?: number;
  onViewRecords: () => void;
  onNewConsultation: () => void;
}

const PatientCard = ({ patient, delay = 0, onViewRecords, onNewConsultation }: PatientCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "critical":
        return "text-medical-red bg-red-50";
      case "stable":
        return "text-medical-green bg-green-50";
      case "improving":
        return "text-aida-600 bg-blue-50";
      default:
        return "text-muted-foreground bg-secondary";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`/avatar-placeholder.jpg`} />
                <AvatarFallback className="bg-secondary">
                  {patient.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{patient.name}</CardTitle>
                <CardDescription>
                  {patient.age} years • {patient.gender} • Patient ID: {patient.id}
                </CardDescription>
              </div>
            </div>
            <div className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(patient.status)}`}>
              {patient.status}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center text-sm">
              <Heart className="mr-2 h-4 w-4 text-medical-red" />
              <span className="font-medium mr-1">Conditions:</span> 
              <span className="text-muted-foreground">{patient.condition}</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4" />
              <span className="font-medium mr-1">Last Visit:</span> 
              <span className="text-muted-foreground">{formatDate(patient.lastVisit)}</span>
            </div>
            <div className="flex items-center text-sm">
              <FileText className="mr-2 h-4 w-4" />
              <span className="font-medium mr-1">Assigned Doctor:</span> 
              <span className="text-muted-foreground">{patient.doctor}</span>
            </div>
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={onViewRecords}>
                <FileText className="mr-2 h-4 w-4" />
                View Records
              </Button>
              <Button size="sm" className="flex-1" onClick={onNewConsultation}>
                <Plus className="mr-2 h-4 w-4" />
                New Consultation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Additional components to be imported
import { Separator } from "@/components/ui/separator";
import { UserPlus, Video } from "lucide-react";

export default PatientRecordsView;
