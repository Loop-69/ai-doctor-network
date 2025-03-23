
import React, { useState, useRef, useEffect } from "react";
import { X, SendHorizontal, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface PreviewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  agentSpecialty: string;
}

type MessageType = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const PreviewChatModal = ({
  isOpen,
  onClose,
  agentName,
  agentSpecialty,
}: PreviewChatModalProps) => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello, I'm ${agentName}, an AI assistant specializing in ${agentSpecialty}. How can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [promptCount, setPromptCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSubscribePrompt, setShowSubscribePrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setPromptCount(0);
      setShowSubscribePrompt(false);
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `Hello, I'm ${agentName}, an AI assistant specializing in ${agentSpecialty}. How can I help you today?`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, agentName, agentSpecialty]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Increment prompt count
    const newPromptCount = promptCount + 1;
    setPromptCount(newPromptCount);

    // Simulate API delay
    setTimeout(() => {
      let response: MessageType;

      // If we've hit the limit, show subscription message
      if (newPromptCount >= 2) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "I'd be happy to continue our conversation! To access unlimited assistance from our AI specialists, please subscribe to our service.",
          timestamp: new Date(),
        };
        setShowSubscribePrompt(true);
      } else {
        // Simulate AI response based on user message
        let responseText;
        const userQuery = userMessage.content.toLowerCase();
        
        if (userQuery.includes("hello") || userQuery.includes("hi")) {
          responseText = `Hello! How can I assist you with ${agentSpecialty} today?`;
        } else if (userQuery.includes("help") || userQuery.includes("assist")) {
          responseText = `I can help with various ${agentSpecialty} questions. For example, you could ask me about common symptoms, treatment options, or prevention measures.`;
        } else if (userQuery.includes("symptom") || userQuery.includes("pain")) {
          responseText = `When discussing symptoms like that, I'd need to gather more information. In a full consultation, I'd ask about duration, severity, and other relevant factors to provide better guidance.`;
        } else {
          responseText = `That's an interesting question about ${agentSpecialty}. In a full consultation, I could provide you with detailed information and personalized recommendations based on your specific situation.`;
        }

        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: responseText,
          timestamp: new Date(),
        };
      }

      // Add AI response
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] flex flex-col p-0 gap-0 rounded-xl overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-medical-purple to-medical-red p-4 text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white font-semibold">
                  {agentName.charAt(0)}
                </span>
              </div>
              <div>
                <DialogTitle className="text-white">{agentName}</DialogTitle>
                <p className="text-xs text-white/80">{agentSpecialty}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 min-h-[300px] max-h-[50vh]">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex mb-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-medical-purple to-medical-red flex-shrink-0 flex items-center justify-center mr-2">
                    <span className="text-white font-semibold text-xs">
                      {agentName.charAt(0)}
                    </span>
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-gray-100 text-gray-800 rounded-tr-none"
                      : "bg-gradient-to-r from-medical-purple/10 to-medical-red/10 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span
                    className={`text-xs block mt-1 ${
                      message.role === "user"
                        ? "text-gray-500"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center ml-2">
                    <span className="text-gray-600 font-semibold text-xs">
                      You
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 text-gray-400 text-sm ml-10"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-medical-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-medical-purple"></span>
              </span>
              <p>Typing...</p>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <DialogFooter className="flex flex-col w-full p-4 border-t">
          {showSubscribePrompt && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full mb-4 p-3 bg-gradient-to-r from-medical-purple/10 to-medical-red/10 rounded-lg"
            >
              <p className="text-sm font-medium mb-2">
                You've reached the preview limit!
              </p>
              <p className="text-xs text-gray-600 mb-3">
                Subscribe to continue chatting with our AI specialists and unlock
                all features.
              </p>
              <div className="flex gap-2">
                <Link to="/register" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-medical-purple to-medical-red hover:opacity-90 text-white">
                    Subscribe Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          <div className="flex w-full items-center gap-2">
            <textarea
              className="flex-1 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-purple/50 min-h-[40px] max-h-[120px] resize-none"
              placeholder={
                showSubscribePrompt
                  ? "Subscribe to continue chatting..."
                  : `Ask ${agentName} a question...`
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={showSubscribePrompt || isLoading}
              rows={1}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || showSubscribePrompt || isLoading}
              className={`bg-gradient-to-r from-medical-purple to-medical-red text-white hover:opacity-90 ${
                (!inputValue.trim() || showSubscribePrompt || isLoading) &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewChatModal;
