
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ChatPreview = () => {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Can you please prepare a discharge note for John?",
      time: "10:51 AM"
    },
    {
      role: "user",
      content: "Of course. Done and sent to your email!",
      time: "10:57 AM"
    }
  ]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages([...messages, {
      role: "user",
      content: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInputValue("");
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Thanks! Would you like me to help with anything else related to John's discharge?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="bg-gradient-to-r from-medical-purple to-medical-red p-4 flex items-center gap-2 text-white">
        <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
          <span className="text-white font-semibold text-xs">LA</span>
        </div>
        <span className="font-medium text-sm">1-800-LENY-AI</span>
      </div>
      
      <div className="p-6 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-medical-purple to-medical-red flex-shrink-0 flex items-center justify-center">
                <span className="text-white font-semibold text-xs">LA</span>
              </div>
            )}
            
            <div 
              className={`p-3 rounded-2xl max-w-[85%] ${
                message.role === "assistant" 
                  ? "bg-gradient-to-r from-medical-purple/90 to-medical-red/90 text-white rounded-tl-none" 
                  : "bg-gray-100 rounded-tr-none"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span 
                className={`text-xs block mt-1 ${
                  message.role === "assistant" ? "text-white/80" : "text-gray-500"
                }`}
              >
                {message.time}
              </span>
            </div>
            
            {message.role === "user" && (
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img src="/placeholder.svg" alt="User" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-medical-purple to-medical-red flex-shrink-0 flex items-center justify-center">
              <span className="text-white font-semibold text-xs">LA</span>
            </div>
            <div className="bg-gradient-to-r from-medical-purple/10 to-medical-red/10 p-3 rounded-2xl rounded-tl-none w-16">
              <div className="flex space-x-1 justify-center items-center">
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Input Field */}
        <div className="mt-6">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full p-2 text-sm text-gray-600 border focus-within:border-medical-purple/50 focus-within:ring-1 focus-within:ring-medical-purple/20">
            <input
              type="text"
              placeholder="Type your next question..."
              className="bg-transparent border-none flex-1 focus:outline-none px-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button 
              size="icon" 
              className="h-7 w-7 rounded-full bg-gradient-to-r from-medical-purple to-medical-red text-white hover:opacity-90"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <SendHorizontal className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Link to="/login">
            <Button className="w-full mt-3 bg-gradient-to-r from-medical-purple to-medical-red hover:opacity-90 group">
              <span>Continue Conversation</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatPreview;
