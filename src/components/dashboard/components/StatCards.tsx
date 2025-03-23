
import { motion } from "framer-motion";
import { Users, Brain, BarChart4, Bell, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatCard from "./StatCard";

const StatCards = () => {
  const navigate = useNavigate();

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
    >
      {/* Patients Card */}
      <StatCard
        title="Patients"
        icon={<Users className="h-5 w-5" />}
        count="1,248"
        trend={{ value: "+7.4%", isPositive: true }}
        description="Total patients in your practice"
        buttonText="Manage Patients"
        buttonAction={() => navigate("/patients")}
        gradientColors={{
          from: "blue",
          to: "indigo",
          button: { from: "blue", to: "indigo" }
        }}
      />

      {/* Consultations Card */}
      <StatCard
        title="Consultations"
        icon={<Brain className="h-5 w-5" />}
        count="87"
        trend={{ value: "+12.3%", isPositive: true }}
        description="Scheduled for this week"
        buttonText="View Consultations"
        buttonAction={() => navigate("/collaboration")}
        gradientColors={{
          from: "indigo",
          to: "purple",
          button: { from: "indigo", to: "purple" }
        }}
      />

      {/* Analytics Card */}
      <StatCard
        title="Analytics"
        icon={<BarChart4 className="h-5 w-5" />}
        count={<><Zap className="h-6 w-6 text-amber-500 mr-2 inline" />Insights</>}
        description="Performance metrics & trends"
        buttonText="Explore Analytics"
        buttonAction={() => navigate("/analytics")}
        gradientColors={{
          from: "teal",
          to: "green",
          button: { from: "teal", to: "green" }
        }}
      />

      {/* Notifications Card */}
      <StatCard
        title="Notifications"
        icon={<Bell className="h-5 w-5" />}
        count="5"
        trend={undefined}
        description="Important updates & reminders"
        buttonText="View Notifications"
        buttonAction={() => navigate("/notifications")}
        gradientColors={{
          from: "amber",
          to: "orange",
          button: { from: "amber", to: "orange" }
        }}
      />
    </motion.div>
  );
};

export default StatCards;
