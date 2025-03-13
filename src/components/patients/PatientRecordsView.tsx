
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

const PatientRecordsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Patient
        </Button>
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
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
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
}

const PatientCard = ({ patient, delay = 0 }: PatientCardProps) => {
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
              <Button variant="outline" size="sm" className="flex-1">
                <FileText className="mr-2 h-4 w-4" />
                View Records
              </Button>
              <Button size="sm" className="flex-1">
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

export default PatientRecordsView;
