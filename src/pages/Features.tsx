
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout";
import { 
  Zap, 
  Brain, 
  LineChart, 
  MessageSquare, 
  Calendar, 
  Shield, 
  FileText, 
  Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "AI Medical Assistants",
    description: "Access specialized medical AI agents trained in different medical specialties to help with assessments and recommendations.",
    icon: Brain,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Auto-Generated Follow-up Questions",
    description: "Our system intelligently generates follow-up questions based on patient conditions using Google's Medical AI.",
    icon: MessageSquare,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Follow-up Scheduling",
    description: "Schedule automated follow-ups with patients to track their progress and ensure continuity of care.",
    icon: Calendar,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    title: "Patient Records Management",
    description: "Securely manage and access patient records, history, and consultation notes in one centralized system.",
    icon: FileText,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    title: "Analytics Dashboard",
    description: "Visualize practice metrics, patient outcomes, and consultation trends with comprehensive analytics.",
    icon: LineChart,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Collaborative Consultations",
    description: "Collaborate with other healthcare providers on complex cases, sharing insights and recommendations.",
    icon: Users,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    title: "Secure Data Protection",
    description: "Enterprise-grade security measures to protect sensitive patient information and ensure HIPAA compliance.",
    icon: Shield,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
  },
  {
    title: "Real-time AI Assistance",
    description: "Get immediate AI-powered insights and recommendations during patient consultations.",
    icon: Zap,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  }
];

const FeaturesPage = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="h1 mb-4">Powerful Features for Modern Healthcare</h1>
          <p className="p-large max-w-2xl mx-auto">
            Our platform combines cutting-edge AI technology with intuitive tools 
            designed specifically for healthcare professionals to improve patient care,
            streamline workflows, and enhance clinical outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="feature-card h-full">
                <CardHeader className="pb-2">
                  <div className={`${feature.bgColor} p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4`}>
                    <feature.icon className={`${feature.color} h-7 w-7`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button size="lg" className="btn-glow">
            Explore All Features
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default FeaturesPage;
