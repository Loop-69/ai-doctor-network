
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Zap, Users, FileText, Brain, Activity, CheckCircle, ArrowRight } from "lucide-react";
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

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-medical-purple to-indigo-500 bg-clip-text text-transparent">
                  Everything You Need
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive suite of tools designed specifically for healthcare professionals
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-medical-red/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-medical-red" />
                </div>
                <h3 className="text-xl font-medium mb-2">Medical Documentation</h3>
                <p className="text-muted-foreground mb-4">
                  Generate discharge summaries, op notes, and clinical documentation with AI assistance.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-medical-green mr-2" />
                    <span>Discharge Summaries</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-medical-green mr-2" />
                    <span>Operative Notes</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-medical-green mr-2" />
                    <span>Clinical Documentation</span>
                  </li>
                </ul>
                <Link to="/agents">
                  <Button variant="outline" className="w-full">
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-medical-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-medical-purple" />
                </div>
                <h3 className="text-xl font-medium mb-2">Follow-up Monitoring</h3>
                <p className="text-muted-foreground mb-4">
                  Automated follow-up calls and monitoring for patients with voice AI technology.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-medical-green mr-2" />
                    <span>Voice AI Calling</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-medical-green mr-2" />
                    <span>Patient Scheduling</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-medical-green mr-2" />
                    <span>Live Call Monitoring</span>
                  </li>
                </ul>
                <Link to="/followup-scheduler">
                  <Button variant="outline" className="w-full">
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="w-12 h-12 bg-medical-green/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-medical-green" />
                </div>
                <h3 className="text-xl font-medium mb-2">Collaborative Consultation</h3>
                <p className="text-muted-foreground mb-4">
                  Collaborate with colleagues and AI specialists on complex cases and consultations.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-medical-green mr-2" />
                    <span>Specialist Consultation</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-medical-green mr-2" />
                    <span>Case Sharing</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-medical-green mr-2" />
                    <span>Diagnostic Assistance</span>
                  </li>
                </ul>
                <Link to="/collaboration">
                  <Button variant="outline" className="w-full">
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
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

        {/* Analytics Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="md:flex items-center">
              <motion.div 
                className="md:w-1/2 md:pr-12 mb-10 md:mb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-medical-green/10 text-medical-green mb-4">
                  Data Insights
                </span>
                <h2 className="text-3xl font-bold mb-4">
                  Powerful Analytics
                </h2>
                <p className="text-muted-foreground mb-6">
                  Track patient outcomes, monitor clinical patterns, and gain valuable insights with our comprehensive analytics tools.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-medical-green mr-3" />
                    <span>Patient outcome tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-medical-green mr-3" />
                    <span>Consultation analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-medical-green mr-3" />
                    <span>Condition trends and insights</span>
                  </li>
                </ul>
                <Link to="/analytics">
                  <Button className="bg-medical-green hover:bg-medical-green/90">
                    <span>Explore Analytics</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <img 
                    src="/placeholder.svg" 
                    alt="Analytics Dashboard" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50">
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
