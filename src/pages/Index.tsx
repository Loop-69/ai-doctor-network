
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import PublicLayout from "@/components/layout/PublicLayout";
import ChatPreview from "@/components/home/ChatPreview";
import SpecialistCard from "@/components/home/SpecialistCard";

const Index = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <PublicLayout showHeader={true}>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6">
            <div className="flex flex-col-reverse md:flex-row items-center">
              <motion.div 
                className="md:w-1/2 md:pr-12 mt-12 md:mt-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                  You Text It,<br />
                  AI Completes It
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-md">
                  Discharge summaries, follow-up phone calls, op notes, case management? we got you!
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

        {/* AI Medical Specialists Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">AI Medical Specialists</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose up to 3 specialists for your medical task: 0/3
              </p>
              
              <div className="relative max-w-xl mx-auto mt-8">
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm">
                  <Search className="h-5 w-5 text-gray-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Search specialists or tasks..." 
                    className="w-full bg-transparent border-none focus:outline-none text-sm"
                  />
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SpecialistCard 
                name="Sarah"
                title="Thoracic Surgery Specialist"
                description="I can help with pre and post op care instructions. What do you need?"
                isNew={true}
                tags={["Surgery", "Post-Op"]}
                avatar="/placeholder.svg"
                delay={0.1}
              />
              
              <SpecialistCard 
                name="Michael"
                title="Cardiac Recovery Expert"
                description="Need help with heart health or recovery plans? I'm here to assist."
                isNew={false}
                tags={["Cardiology", "Recovery"]}
                avatar="/placeholder.svg"
                delay={0.2}
              />
              
              <SpecialistCard 
                name="Emma"
                title="Advanced Wound Care Specialist"
                description="I can guide you through wound care procedures. What's your concern?"
                isNew={false}
                tags={["Assessment", "Treatment"]}
                avatar="/placeholder.svg"
                delay={0.3}
              />
              
              <SpecialistCard 
                name="John"
                title="Neurological Assessment Expert"
                description="Have questions about neurological symptoms? I can help assess them."
                isNew={true}
                tags={["Neurology", "Assessment"]}
                avatar="/placeholder.svg"
                delay={0.4}
              />
              
              <SpecialistCard 
                name="Maria"
                title="Pediatric Care Specialist"
                description="From vaccinations to developmental milestones, I'm here to assist with pediatric care."
                isNew={false}
                tags={["Pediatrics", "Primary Care"]}
                avatar="/placeholder.svg"
                delay={0.5}
              />
              
              <SpecialistCard 
                name="David"
                title="Emergency Triage Expert"
                description="Need urgent medical advice? I can help assess the situation quickly."
                isNew={false}
                tags={["Emergency", "Triage"]}
                avatar="/placeholder.svg"
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="rounded-2xl bg-gradient-to-r from-medical-red to-medical-purple p-10 md:p-16 text-white">
              <div className="md:flex items-center justify-between">
                <div className="md:w-2/3 mb-8 md:mb-0">
                  <h2 className="text-3xl font-bold mb-4">Ready to transform your practice?</h2>
                  <p className="text-white/80 max-w-xl">
                    Join thousands of healthcare professionals using LENY-AI to enhance patient care and streamline their workflow.
                  </p>
                </div>
                <div>
                  <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                    <Button size="lg" variant="secondary" className="w-full">
                      Get Started Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default Index;
