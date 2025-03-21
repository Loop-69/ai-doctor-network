
import React from "react";
import { 
  Heart, 
  Activity, 
  FileBarChart,
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
} from "recharts";
import StatsCard from "../StatsCard";
import { conditionData } from "../data/analyticsData";
import ChartsWrapper from "../components/ChartsWrapper";

const chartConfig = {
  hypertension: { color: "#8884d8", label: "Hypertension" },
  diabetes: { color: "#82ca9d", label: "Diabetes" },
  arthritis: { color: "#ffc658", label: "Arthritis" },
};

const ConditionsTab = () => {
  return (
    <div className="space-y-4">
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
      
      <ChartsWrapper 
        title="Condition Trends" 
        description="Most common conditions over time"
        config={chartConfig}
      >
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
      </ChartsWrapper>
    </div>
  );
};

export default ConditionsTab;
