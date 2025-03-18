
import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  agentName: string;
}

const ChatInput = ({ onSendMessage, isLoading, agentName }: ChatInputProps) => {
  const [chatInput, setChatInput] = useState("");

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    onSendMessage(chatInput);
    setChatInput("");
  };

  // Listen for addToChat events
  useEffect(() => {
    const handleAddToChat = (event: any) => {
      setChatInput(prev => {
        // If there's already text, add a line break
        if (prev.trim()) {
          return prev + "\n\n" + event.detail.message;
        }
        return event.detail.message;
      });
    };
    
    window.addEventListener('addToChat', handleAddToChat);
    
    return () => {
      window.removeEventListener('addToChat', handleAddToChat);
    };
  }, []);

  return (
    <div className="flex w-full items-center space-x-2">
      <Textarea
        placeholder={`Ask ${agentName} a question...`}
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        className="flex-1"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <Button 
        onClick={handleSendMessage} 
        disabled={!chatInput.trim() || isLoading}
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  );
};

export default ChatInput;
