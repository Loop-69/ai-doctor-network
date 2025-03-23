
import { useIsMobile } from "@/hooks/use-mobile";
import DashboardHeader from "./components/DashboardHeader";
import StatCards from "./components/StatCards";
import QuickActions from "./components/QuickActions";

const Dashboard = () => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-8">
      <DashboardHeader />
      <StatCards />
      <QuickActions />
    </div>
  );
};

export default Dashboard;
