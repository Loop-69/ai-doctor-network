
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FileText, 
  Calendar, 
  MessageSquare, 
  Activity,
  Brain,
  PlusCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
  colorClass: string;
  delay: number;
}

const ActionCard = ({ icon, title, description, to, colorClass, delay }: ActionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <Link to={to}>
        <Card className={cn(
          "h-full cursor-pointer transition-all duration-200 hover:shadow-md overflow-hidden group border-l-4",
          `border-l-${colorClass}`
        )}>
          <CardContent className="p-4 flex items-start">
            <div className={cn(
              "mr-3 p-2 rounded-full",
              `text-${colorClass} bg-${colorClass}/10`
            )}>
              {icon}
            </div>
            <div>
              <h3 className="font-medium mb-1 group-hover:text-medical-purple transition-colors">{title}</h3>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

const QuickActionsPreview = () => {
  const actions = [
    {
      icon: <Brain className="h-5 w-5" />,
      title: "AI Consultation",
      description: "Get medical advice from AI specialists",
      to: "/agents",
      colorClass: "medical-purple",
      delay: 0.1
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Documentation",
      description: "Generate medical reports and notes",
      to: "/features",
      colorClass: "medical-green",
      delay: 0.2
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Collaborate",
      description: "Work with other healthcare providers",
      to: "/features",
      colorClass: "medical-red",
      delay: 0.3
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Follow-ups",
      description: "Schedule and manage patient follow-ups",
      to: "/features",
      colorClass: "medical-yellow",
      delay: 0.4
    },
    {
      icon: <Activity className="h-5 w-5" />,
      title: "Analytics",
      description: "Track outcomes and practice metrics",
      to: "/analytics",
      colorClass: "aida-600",
      delay: 0.5
    },
    {
      icon: <PlusCircle className="h-5 w-5" />,
      title: "Get Started",
      description: "Create your free account today",
      to: "/register",
      colorClass: "slate-700",
      delay: 0.6
    }
  ];

  return (
    <section className="py-20 pt-28 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-2">
            <span className="bg-gradient-to-r from-medical-red to-medical-purple bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Discover all the ways LENY-AI can enhance your healthcare practice
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {actions.map((action, index) => (
            <ActionCard
              key={index}
              icon={action.icon}
              title={action.title}
              description={action.description}
              to={action.to}
              colorClass={action.colorClass}
              delay={action.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActionsPreview;
