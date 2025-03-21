
import React from "react";
import { 
  Stethoscope, 
  Video, 
  Clock,
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
} from "recharts";
import StatsCard from "../StatsCard";
import { consultationData } from "../data/analyticsData";
import ChartsWrapper from "../components/ChartsWrapper";

const chartConfig = {
  inPerson: { color: "#3b82f6", label: "In-Person" },
  virtual: { color: "#10b981", label: "Virtual" },
};

const ConsultationsTab = () => {
  return (
    <div className="space-y-4">
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
      
      <ChartsWrapper 
        title="Weekly Consultations" 
        description="In-person vs virtual consultations"
        config={chartConfig}
      >
        <BarChart data={consultationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="inPerson" name="In-Person" fill="#3b82f6" />
          <Bar dataKey="virtual" name="Virtual" fill="#10b981" />
        </BarChart>
      </ChartsWrapper>
    </div>
  );
};

export default ConsultationsTab;
