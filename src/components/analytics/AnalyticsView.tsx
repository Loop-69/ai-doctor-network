
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  AreaChart,
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Activity, 
  Users, 
  Calendar, 
  Heart, 
  Clock, 
  ArrowDown, 
  ArrowUp,
  Stethoscope,
  FileBarChart
} from "lucide-react";

// Sample data - in a real app this would come from your backend
const patientData = [
  { month: 'Jan', patients: 65 },
  { month: 'Feb', patients: 59 },
  { month: 'Mar', patients: 80 },
  { month: 'Apr', patients: 81 },
  { month: 'May', patients: 56 },
  { month: 'Jun', patients: 55 },
  { month: 'Jul', patients: 40 },
];

const treatmentData = [
  { name: 'Medication', value: 400 },
  { name: 'Surgery', value: 300 },
  { name: 'Therapy', value: 300 },
  { name: 'Preventive', value: 200 },
];

const consultationData = [
  { day: 'Mon', inPerson: 4, virtual: 2 },
  { day: 'Tue', inPerson: 3, virtual: 4 },
  { day: 'Wed', inPerson: 5, virtual: 3 },
  { day: 'Thu', inPerson: 2, virtual: 5 },
  { day: 'Fri', inPerson: 3, virtual: 4 },
  { day: 'Sat', inPerson: 1, virtual: 2 },
  { day: 'Sun', inPerson: 0, virtual: 1 },
];

const conditionData = [
  { name: 'Jan', hypertension: 30, diabetes: 25, arthritis: 15 },
  { name: 'Feb', hypertension: 35, diabetes: 22, arthritis: 18 },
  { name: 'Mar', hypertension: 32, diabetes: 28, arthritis: 20 },
  { name: 'Apr', hypertension: 38, diabetes: 30, arthritis: 22 },
  { name: 'May', hypertension: 42, diabetes: 35, arthritis: 25 },
  { name: 'Jun', hypertension: 40, diabetes: 32, arthritis: 28 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsView = () => {
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
          Detailed Analytics
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Comprehensive data insights for your medical practice
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
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <TabsList className="grid grid-cols-4 md:w-[600px]">
            <TabsTrigger value="overview">
              <Activity className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="patients">
              <Users className="mr-2 h-4 w-4" />
              Patients
            </TabsTrigger>
            <TabsTrigger value="consultations">
              <Calendar className="mr-2 h-4 w-4" />
              Consultations
            </TabsTrigger>
            <TabsTrigger value="conditions">
              <Heart className="mr-2 h-4 w-4" />
              Medical Conditions
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatsCard 
              title="Total Patients" 
              value="1,248" 
              change={"+12.5%"} 
              trend="up"
              icon={<Users className="h-5 w-5" />}
            />
            <StatsCard 
              title="Consultations This Week" 
              value="87" 
              change={"+7.2%"} 
              trend="up"
              icon={<Calendar className="h-5 w-5" />}
            />
            <StatsCard 
              title="Average Wait Time" 
              value="12 min" 
              change={"-2.5%"} 
              trend="down"
              icon={<Clock className="h-5 w-5" />}
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Patient Growth</CardTitle>
                <CardDescription>Monthly patient count</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={patientData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="patients" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.3} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Treatment Distribution</CardTitle>
                <CardDescription>By type of care</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={treatmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {treatmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="patients" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatsCard 
              title="New Patients (30 days)" 
              value="124" 
              change={"+8.3%"} 
              trend="up"
              icon={<UserPlus className="h-5 w-5" />}
            />
            <StatsCard 
              title="Returning Patients" 
              value="876" 
              change={"+3.2%"} 
              trend="up"
              icon={<Users className="h-5 w-5" />}
            />
            <StatsCard 
              title="Patient Satisfaction" 
              value="94%" 
              change={"+1.5%"} 
              trend="up"
              icon={<Heart className="h-5 w-5" />}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Patient Demographics</CardTitle>
              <CardDescription>Age distribution of patients</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={[
                  { age: '0-18', male: 65, female: 85 },
                  { age: '19-35', male: 125, female: 168 },
                  { age: '36-50', male: 187, female: 205 },
                  { age: '51-65', male: 156, female: 148 },
                  { age: '66+', male: 95, female: 107 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="male" name="Male" fill="#3b82f6" />
                  <Bar dataKey="female" name="Female" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="consultations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatsCard 
              title="In-Person Consultations" 
              value="56" 
              change={"+4.2%"} 
              trend="up"
              icon={<Stethoscope className="h-5 w-5" />}
            />
            <StatsCard 
              title="Virtual Consultations" 
              value="31" 
              change={"+15.7%"} 
              trend="up"
              icon={<Video className="h-5 w-5" />}
            />
            <StatsCard 
              title="Consultation Duration" 
              value="22 min" 
              change={"-1.5%"} 
              trend="down"
              icon={<Clock className="h-5 w-5" />}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Weekly Consultations</CardTitle>
              <CardDescription>In-person vs virtual consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={consultationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="inPerson" name="In-Person" fill="#3b82f6" />
                  <Bar dataKey="virtual" name="Virtual" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conditions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatsCard 
              title="Cardiac Cases" 
              value="187" 
              change={"+2.2%"} 
              trend="up"
              icon={<Heart className="h-5 w-5" />}
            />
            <StatsCard 
              title="Diabetes Cases" 
              value="143" 
              change={"+5.7%"} 
              trend="up"
              icon={<Activity className="h-5 w-5" />}
            />
            <StatsCard 
              title="Chronic Cases" 
              value="312" 
              change={"+0.5%"} 
              trend="up"
              icon={<FileBarChart className="h-5 w-5" />}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Condition Trends</CardTitle>
              <CardDescription>Most common conditions over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={conditionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hypertension" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="diabetes" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="arthritis" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Stats card component
interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, change, trend, icon }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs flex items-center ${trend === 'up' ? 'text-medical-green' : 'text-medical-red'}`}>
          {trend === 'up' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
          {change} from last period
        </p>
      </CardContent>
    </Card>
  );
};

export default AnalyticsView;
