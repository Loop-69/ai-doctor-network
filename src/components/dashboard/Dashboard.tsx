
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Users,
  Calendar,
  Clock,
  ArrowRight,
  PlusCircle,
  FileText,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import AgentSelector from "../agents/AgentSelector";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <motion.h1 
          className="h1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Welcome back, Dr. Chen
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Here's what's happening with your patients today
        </motion.p>
      </header>

      <Tabs 
        defaultValue="overview" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="agents">AI Agents</TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Consultations Today"
              value="8"
              description="+2 from yesterday"
              icon={<Users className="h-4 w-4 text-aida-500" />}
              delay={0.3}
            />
            <StatCard
              title="AI Analyses Completed"
              value="14"
              description="93% accuracy rate"
              icon={<BarChart className="h-4 w-4 text-medical-green" />}
              delay={0.4}
            />
            <StatCard
              title="Next Appointment"
              value="11:30 AM"
              description="John Smith - Cardiology"
              icon={<Calendar className="h-4 w-4 text-medical-purple" />}
              delay={0.5}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Consultations</CardTitle>
                <CardDescription>
                  Your scheduled patient appointments for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AppointmentItem
                    name="John Smith"
                    time="11:30 AM"
                    reason="Follow-up: Hypertension"
                    delay={0.7}
                  />
                  <AppointmentItem
                    name="Maria Garcia"
                    time="1:15 PM"
                    reason="Initial Assessment: Chest Pain"
                    urgent
                    delay={0.8}
                  />
                  <AppointmentItem
                    name="Robert Johnson"
                    time="2:45 PM"
                    reason="Review: Echocardiogram Results"
                    delay={0.9}
                  />
                  <AppointmentItem
                    name="Emma Williams"
                    time="4:00 PM"
                    reason="Follow-up: Pacemaker"
                    delay={1.0}
                  />
                  
                  <div className="pt-2 flex justify-center">
                    <Button variant="outline" className="w-full max-w-sm">
                      View All Appointments
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>Recent Patients</CardTitle>
                  <CardDescription>Manage your patient records</CardDescription>
                </div>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Patient
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <PatientItem
                    name="Maria Garcia"
                    condition="Chest Pain, Hypertension"
                    lastVisit="Today"
                    status="Critical"
                    delay={0.1}
                  />
                  <PatientItem
                    name="John Smith" 
                    condition="Coronary Artery Disease"
                    lastVisit="2 days ago"
                    status="Stable"
                    delay={0.2}
                  />
                  <PatientItem
                    name="Emma Williams"
                    condition="Arrhythmia, Pacemaker"
                    lastVisit="1 week ago"
                    status="Improving"
                    delay={0.3}
                  />
                  <PatientItem
                    name="Robert Johnson"
                    condition="Heart Valve Disease"
                    lastVisit="2 weeks ago"
                    status="Follow-up"
                    delay={0.4}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AgentSelector />
          </motion.div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent AI Activities</CardTitle>
              <CardDescription>
                Latest analyses and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem
                  title="Cardiology Analysis"
                  description="AI detected potential arrhythmia in ECG results"
                  time="32 min ago"
                  icon={<Heart className="h-4 w-4 text-medical-red" />}
                />
                <ActivityItem
                  title="Treatment Recommendation"
                  description="Updated medication plan for John Smith"
                  time="1 hour ago"
                  icon={<FileText className="h-4 w-4 text-aida-500" />}
                />
                <ActivityItem
                  title="Lab Result Analysis"
                  description="Flagged abnormal lipid panel for review"
                  time="3 hours ago"
                  icon={<Microscope className="h-4 w-4 text-medical-green" />}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>
                AI system metrics and accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      Response Time
                      <span className="text-muted-foreground ml-2 text-xs">
                        (2.3s avg)
                      </span>
                    </div>
                    <div className="text-sm font-medium text-medical-green">Excellent</div>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      Diagnostic Accuracy
                      <span className="text-muted-foreground ml-2 text-xs">
                        (Based on 203 cases)
                      </span>
                    </div>
                    <div className="text-sm font-medium text-aida-600">Very Good</div>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      EHR Integration
                      <span className="text-muted-foreground ml-2 text-xs">
                        (FHIR compliance)
                      </span>
                    </div>
                    <div className="text-sm font-medium text-medical-green">100%</div>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Detailed Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const StatCard = ({ title, value, description, icon, delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface AppointmentItemProps {
  name: string;
  time: string;
  reason: string;
  urgent?: boolean;
  delay?: number;
}

const AppointmentItem = ({ name, time, reason, urgent, delay = 0 }: AppointmentItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`flex items-center p-3 rounded-lg border ${
        urgent ? "bg-red-50 border-red-100" : "bg-card border-border"
      }`}
    >
      <Avatar className="h-10 w-10 mr-3">
        <AvatarImage src={`/avatar-placeholder.jpg`} />
        <AvatarFallback className="bg-secondary">
          {name.split(" ").map((n) => n[0]).join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-xs text-muted-foreground truncate">{reason}</p>
      </div>
      <div className="flex items-center ml-3">
        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
        <span className="text-xs font-medium">{time}</span>
      </div>
    </motion.div>
  );
};

interface PatientItemProps {
  name: string;
  condition: string;
  lastVisit: string;
  status: string;
  delay?: number;
}

const PatientItem = ({ name, condition, lastVisit, status, delay = 0 }: PatientItemProps) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className="flex items-center p-3 rounded-lg border border-border hover:bg-muted/20"
    >
      <Avatar className="h-10 w-10 mr-3">
        <AvatarImage src={`/avatar-placeholder.jpg`} />
        <AvatarFallback className="bg-secondary">
          {name.split(" ").map((n) => n[0]).join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-xs text-muted-foreground truncate">{condition}</p>
      </div>
      <div className="flex flex-col items-end ml-3 space-y-1">
        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(status)}`}>
          {status}
        </span>
        <span className="text-xs text-muted-foreground">{lastVisit}</span>
      </div>
    </motion.div>
  );
};

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}

const ActivityItem = ({ title, description, time, icon }: ActivityItemProps) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="mt-0.5 bg-muted h-8 w-8 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="text-xs text-muted-foreground">{time}</div>
    </div>
  );
};

export default Dashboard;
