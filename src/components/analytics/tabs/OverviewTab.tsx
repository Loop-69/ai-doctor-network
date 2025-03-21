
import React from "react";
import { 
  Users, 
  Calendar, 
  Clock 
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
} from "recharts";
import StatsCard from "../StatsCard";
import { patientData, treatmentData, COLORS } from "../data/analyticsData";
import ChartsWrapper from "../components/ChartsWrapper";

const chartConfig = {
  patients: { color: "#8884d8", label: "Patients" },
  primary: { color: "#8884d8", label: "Primary Care" },
  specialty: { color: "#82ca9d", label: "Specialty Care" },
  emergency: { color: "#ffc658", label: "Emergency" },
  preventive: { color: "#ff8042", label: "Preventive" },
};

const OverviewTab = () => {
  return (
    <div className="space-y-4">
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
        <ChartsWrapper 
          title="Patient Growth" 
          description="Monthly patient count"
          config={chartConfig}
        >
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
        </ChartsWrapper>
        
        <ChartsWrapper 
          title="Treatment Distribution" 
          description="By type of care"
          config={chartConfig}
        >
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
        </ChartsWrapper>
      </div>
    </div>
  );
};

export default OverviewTab;
