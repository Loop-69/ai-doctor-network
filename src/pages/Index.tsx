
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Brain, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  LayoutDashboard,
  MessageSquare,
  BarChart
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-aida-500 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">AI</span>
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              AIDA
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link to="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="container mx-auto px-6 pt-16 pb-24 md:pb-32 flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 md:pr-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Advanced AI for Modern <span className="text-aida-500">Healthcare</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              AIDA combines medical expertise with artificial intelligence to enhance patient care, streamline diagnostics, and improve clinical outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <Button size="lg" className="w-full sm:w-auto">
                  {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 mt-12 md:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-aida-500 to-medical-purple rounded-lg blur opacity-30"></div>
              <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="AIDA Dashboard" 
                  className="w-full h-64 object-cover object-center bg-gray-100"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-lg font-medium text-gray-500">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Key Features
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover how AIDA can transform your medical practice with cutting-edge AI capabilities
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Heart} 
              title="AI Medical Agents" 
              description="Specialized AI assistants with expertise in various medical fields to provide insights and recommendations."
              delay={0.1}
            />
            <FeatureCard 
              icon={BarChart} 
              title="Patient Analytics" 
              description="Comprehensive analysis of patient data to identify trends, risks, and potential treatment options."
              delay={0.2}
            />
            <FeatureCard 
              icon={Users} 
              title="Collaboration Tools" 
              description="Connect with colleagues, share cases, and conduct virtual consultations through a secure platform."
              delay={0.3}
            />
            <FeatureCard 
              icon={Brain} 
              title="Smart Diagnostics" 
              description="Leverage AI to assist in diagnostic processes and identify potential issues earlier."
              delay={0.4}
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Secure & Compliant" 
              description="All data is encrypted and handled in compliance with healthcare privacy regulations."
              delay={0.5}
            />
            <FeatureCard 
              icon={MessageSquare} 
              title="Patient Communication" 
              description="Streamlined communication channels between healthcare providers and patients."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-aida-50">
        <div className="container mx-auto px-6">
          <div className="rounded-2xl bg-gradient-to-r from-aida-500 to-medical-purple p-10 md:p-16 text-white">
            <div className="md:flex items-center justify-between">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Ready to transform your practice?</h2>
                <p className="text-aida-50 max-w-xl">
                  Join thousands of healthcare professionals using AIDA to enhance patient care and streamline their workflow.
                </p>
              </div>
              <div>
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <Button size="lg" variant="secondary" className="w-full">
                    {isAuthenticated ? "Go to Dashboard" : "Get Started Now"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-aida-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">AI</span>
                </div>
                <span className="font-display font-bold text-lg text-foreground">
                  AIDA
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Advanced Intelligence for Diagnostic Assistance
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-aida-500 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-aida-500 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-aida-500 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Platform
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-base text-muted-foreground hover:text-aida-500">Features</a></li>
                <li><a href="#" className="text-base text-muted-foreground hover:text-aida-500">Security</a></li>
                <li><a href="#" className="text-base text-muted-foreground hover:text-aida-500">Pricing</a></li>
                <li><a href="#" className="text-base text-muted-foreground hover:text-aida-500">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-base text-muted-foreground hover:text-aida-500">Documentation</a></li>
                <li><a href="#" className="text-base text-muted-foreground hover:text-aida-500">Guides</a></li>
                <li><a href="#" className="text-base text-muted-foreground hover:text-aida-500">API Status</a></li>
                <li><a href="#" className="text-base text-muted-foreground hover:text-aida-500">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-base text-muted-foreground hover:text-aida-500">About</a></li>
                <li><a href="#" className="text-base text-muted-foreground hover:text-aida-500">Blog</a></li>
                <li><a href="#" className="text-base text-muted-foreground hover:text-aida-500">Careers</a></li>
                <li><a href="#" className="text-base text-muted-foreground hover:text-aida-500">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-center text-muted-foreground">
              &copy; {new Date().getFullYear()} AIDA Health Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="w-12 h-12 rounded-lg bg-aida-50 flex items-center justify-center mb-5">
        <Icon className="h-6 w-6 text-aida-500" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default Index;
