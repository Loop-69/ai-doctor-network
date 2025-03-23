
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ChatPreview from "@/components/home/ChatPreview";

const HeroSection = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 md:pr-12 mt-12 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-medical-purple/10 text-medical-purple mb-4">
              Medical AI Assistant
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Healthcare AI<br />
              <span className="bg-gradient-to-r from-medical-red to-medical-purple bg-clip-text text-transparent">Made Simple</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-md">
              LENY-AI streamlines your workflow with intelligent medical assistance for documentation, followups, and patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <Button size="lg" className="w-full sm:w-auto bg-medical-red hover:bg-medical-red/90">
                  Get Started
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <div className="md:w-1/2 flex justify-center">
            <ChatPreview />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
