
import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "./chat/ChatMessage";
import TypingIndicator from "./chat/TypingIndicator";
import SubscriptionPrompt from "./chat/SubscriptionPrompt";
import ChatInput from "./chat/ChatInput";
import { MessageType } from "./chat/types";

interface PreviewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  agentSpecialty: string;
}

const PreviewChatModal = ({
  isOpen,
  onClose,
  agentName,
  agentSpecialty,
}: PreviewChatModalProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [promptCount, setPromptCount] = useState(0);
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

  const handleSendMessage = async (inputValue: string) => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
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

  const getInputPlaceholder = () => {
    return showSubscribePrompt
      ? "Subscribe to continue chatting..."
      : `Ask ${agentName} a question...`;
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
              <ChatMessage
                key={message.id}
                message={message}
                agentName={agentName}
              />
            ))}
          </AnimatePresence>
          
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        <DialogFooter className="flex flex-col w-full p-4 border-t">
          {showSubscribePrompt && <SubscriptionPrompt />}

          <ChatInput
            onSendMessage={handleSendMessage}
            isDisabled={showSubscribePrompt || isLoading}
            placeholderText={getInputPlaceholder()}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewChatModal;
