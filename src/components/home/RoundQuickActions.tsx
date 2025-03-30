
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FileText,
  Calendar,
  MessageSquare,
  Activity,
  Brain,
  ClipboardList,
  UserCircle,
  BarChart2,
  Clock,
  Zap,
  Users, // Added for Agents
  NotebookPen, // Added for Notes
  LayoutDashboard, // Added for Panel
  MessagesSquare // Added for Chat (alternative)
} from "lucide-react";

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  colorClass: string;
  delay: number;
}

const QuickActionButton = ({ icon, label, to, colorClass, delay }: QuickActionButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="flex flex-col items-center"
    >
      <Link to={to} className="group">
        <motion.div
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-lg bg-slate-100 text-${colorClass} border border-blue-200 group-hover:bg-${colorClass}/10`} // Changed border color, kept icon color hover
          whileHover={{ scale: 1.05, y: -3 }}
        >
          {icon}
        </motion.div>
        <p className="text-xs text-center font-medium text-gray-700">{label}</p>
      </Link>
    </motion.div>
  );
};

const RoundQuickActions = () => {
  const actions = [
    {
      icon: <Users className="h-6 w-6" />, // Changed icon
      label: "Agents",
      to: "/agents",
      colorClass: "medical-purple",
      delay: 0.1
    },
    {
      icon: <NotebookPen className="h-6 w-6" />, // Changed icon
      label: "Notes",
      to: "/features", // Consider if this 'to' path needs updating
      colorClass: "medical-yellow",
      delay: 0.15
    },
    {
      icon: <LayoutDashboard className="h-6 w-6" />, // Changed icon
      label: "Panel",
      to: "/features", // Consider if this 'to' path needs updating
      colorClass: "medical-green",
      delay: 0.2
    },
    {
      icon: <MessagesSquare className="h-6 w-6" />, // Changed icon
      label: "Chat",
      to: "/collaboration",
      colorClass: "medical-green",
      delay: 0.35
    }
  ];

  return (
    <div className="absolute left-0 right-0 bottom-0 transform translate-y-1/2 z-10">
      <div className="container mx-auto px-6">
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-5 border border-blue-50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        >
          <div className="grid grid-cols-4 md:grid-cols-4 gap-4 justify-items-center"> {/* Changed md:grid-cols-8 to md:grid-cols-4 */}
            {actions.map((action, index) => (
              <QuickActionButton
                key={index}
                icon={action.icon}
                label={action.label}
                to={action.to}
                colorClass={action.colorClass}
                delay={action.delay}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RoundQuickActions;
