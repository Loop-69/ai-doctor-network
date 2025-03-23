
import { motion } from "framer-motion";
import { Zap, Users, FileText, Brain, Activity } from "lucide-react";
import QuickActionButton from "./QuickActionButton";

const QuickActions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="pt-4"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Zap className="h-5 w-5 text-medical-purple mr-2" />
        <span className="bg-gradient-to-r from-medical-purple to-indigo-500 bg-clip-text text-transparent">Quick Actions</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickActionButton 
          icon={<Users />}
          label="New Patient"
          route="/patients/new"
          colorClass="blue"
        />
        <QuickActionButton 
          icon={<FileText />}
          label="New Consultation"
          route="/collaboration/new"
          colorClass="purple"
        />
        <QuickActionButton 
          icon={<Brain />}
          label="AI Assistant"
          route="/agents"
          colorClass="green"
        />
        <QuickActionButton 
          icon={<Activity />}
          label="Schedule Follow-up"
          route="/followup-scheduler"
          colorClass="amber"
        />
      </div>
    </motion.div>
  );
};

export default QuickActions;
