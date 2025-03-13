
import { motion } from "framer-motion";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-aida-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-2xl shadow-card overflow-hidden">
        <motion.div 
          className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoginForm />
        </motion.div>
        
        <motion.div 
          className="hidden md:block w-1/2 bg-aida-500 p-12 text-white relative overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-3xl font-display font-bold mb-6">
                AI-Powered Decision Support for Medical Professionals
              </h2>
              <p className="mb-8 text-aida-100">
                AIDA connects doctors with specialized AI agents for real-time assistance, 
                enhancing diagnostic accuracy and treatment decisions.
              </p>
            </motion.div>

            <motion.ul 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Feature text="Multi-specialty AI medical experts" delay={0.7} />
              <Feature text="HIPAA-compliant secure platform" delay={0.8} />
              <Feature text="Seamless EHR integration" delay={0.9} />
              <Feature text="Real-time collaborative consultations" delay={1.0} />
            </motion.ul>
          </div>
          
          {/* Abstract background pattern */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.5">
                <circle cx="180" cy="180" r="150" stroke="white" strokeWidth="2" />
                <circle cx="180" cy="180" r="100" stroke="white" strokeWidth="2" />
                <circle cx="180" cy="180" r="50" stroke="white" strokeWidth="2" />
                <path d="M180 30V330" stroke="white" strokeWidth="2" />
                <path d="M30 180H330" stroke="white" strokeWidth="2" />
                <path d="M69.3 69.3L290.7 290.7" stroke="white" strokeWidth="2" />
                <path d="M69.3 290.7L290.7 69.3" stroke="white" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Feature = ({ text, delay }: { text: string; delay: number }) => (
  <motion.li 
    className="flex items-center space-x-2"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay }}
  >
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>{text}</span>
  </motion.li>
);

export default Login;
