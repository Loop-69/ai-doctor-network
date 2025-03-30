import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Clock, Zap } from "lucide-react";
import ChatPreview from "@/components/home/ChatPreview";
const HeroSection = () => {
  const {
    user
  } = useAuth();
  const isAuthenticated = !!user;
  return <section className="py-10 md:py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse md:flex-row items-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="md:w-1/2 md:pr-8 mt-8 md:mt-0 mx-[30px]">
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Healthcare AI<br />
              
            </h1>
            
            
            <div className="flex items-center space-x-2 mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <Zap className="h-5 w-5 text-medical-yellow flex-shrink-0" />
              <p className="text-sm font-medium text-blue-800">
                <span className="font-bold">Save up to 70% of your time</span> on administrative tasks and documentation
              </p>
            </div>
            
            
          </motion.div>
          
          
        </div>
      </div>
    </section>;
};
export default HeroSection;