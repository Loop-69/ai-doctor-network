
import { useState, useEffect } from "react";
import { Loader2, Bot, RefreshCw, Send } from "lucide-react";
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Agent, Message } from "./types/agentTypes";
import { generateAIResponse } from "./services/agentService";
import ChatMessage from "./ChatMessage";
import AgentProfile from "./AgentProfile";
import DropdownSelectors from "./DropdownSelectors";

interface ChatInterfaceProps {
  selectedAgent: Agent;
}

const ChatInterface = ({ selectedAgent }: ChatInterfaceProps) => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello, I'm ${selectedAgent.name}, your AI assistant specializing in ${selectedAgent.specialty}. How can I help you today?`,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const { toast } = useToast();

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!chatInput.trim() || !selectedAgent) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsLoading(true);
    
    try {
      // Call the Gemini API through our edge function
      const response = await generateAIResponse(chatInput, selectedAgent);
      
      // Add AI response to chat
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error while processing your request. Please try again or check if the API connection is working correctly.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "API Error",
        description: "Failed to generate AI response. Please check the console for details.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to clear the chat
  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `Hello, I'm ${selectedAgent.name}, your AI assistant specializing in ${selectedAgent.specialty}. How can I help you today?`,
        timestamp: new Date()
      }
    ]);
    setSelectedPatient(null);
    setSelectedSymptoms([]);
    setSelectedQuestions([]);
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <AgentProfile agent={selectedAgent} />
      </div>
      
      <div className="md:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center">
                <Bot className="mr-2 h-5 w-5 text-aida-500" />
                Chat with {selectedAgent.name}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearChat}
                disabled={messages.length <= 1}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear Chat
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto pb-0 space-y-4">
            {/* Dropdown Selectors for Patient, Symptoms, and Questions */}
            <DropdownSelectors 
              onPatientSelect={setSelectedPatient}
              onSymptomsSelect={setSelectedSymptoms}
              onQuestionsSelect={setSelectedQuestions}
            />
            
            {/* Chat Messages */}
            <div className="max-h-[400px] overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex justify-center items-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-aida-500" />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-6">
            <div className="flex w-full items-center space-x-2">
              <Textarea
                placeholder={`Ask ${selectedAgent.name} a question...`}
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
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ChatInterface;
