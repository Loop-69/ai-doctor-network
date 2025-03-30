
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Clock, Zap } from "lucide-react";
import ChatPreview from "@/components/home/ChatPreview";

const HeroSection = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto mb-8"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Healthcare AI, Simplified
              </span>
            </h1>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
