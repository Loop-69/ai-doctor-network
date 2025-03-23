
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-2"
      >
        <Rocket className="h-8 w-8 text-medical-purple" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-medical-purple via-indigo-500 to-blue-500 bg-clip-text text-transparent">
            Command Center
          </span>
        </h1>
      </motion.div>
      <motion.p 
        className="text-muted-foreground max-w-xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Your healthcare insights and operations in one powerful interface. Streamlined for your medical practice.
      </motion.p>
    </header>
  );
};

export default DashboardHeader;
