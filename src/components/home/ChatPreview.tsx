
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatPreview = () => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="bg-gray-50 p-4 border-b flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-aida-500 flex items-center justify-center">
          <span className="text-white font-semibold text-xs">LA</span>
        </div>
        <span className="font-medium text-sm">1-800-LENY-AI</span>
      </div>
      
      <div className="p-6 space-y-4">
        {/* AI Message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-aida-500 flex-shrink-0 flex items-center justify-center">
            <span className="text-white font-semibold text-xs">LA</span>
          </div>
          <div className="bg-medical-red text-white p-3 rounded-2xl rounded-tl-none max-w-[85%]">
            <p className="text-sm">Can you please prepare a discharge note for John?</p>
            <span className="text-xs text-white/80 block mt-1">10:51 AM</span>
          </div>
        </div>
        
        {/* User Message */}
        <div className="flex gap-3 justify-end">
          <div className="bg-gray-100 p-3 rounded-2xl rounded-tr-none max-w-[85%]">
            <p className="text-sm">Of course. Done and sent to your email!</p>
            <span className="text-xs text-gray-500 block mt-1">10:57 AM</span>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <img src="/placeholder.svg" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
        
        {/* Input Field */}
        <div className="mt-6">
          <div className="bg-gray-100 rounded-full p-3 text-sm text-gray-400">
            Type your next question...
          </div>
          <Button className="w-full mt-3 bg-medical-red hover:bg-medical-red/90">
            Send Message
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatPreview;
