
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart,
  Brain,
  Microscope,
  Stethoscope,
  Eye,
  BarChart4,
  Pill,
  MessageSquare,
  Send,
  Bot,
  Plus,
  FileText,
  RefreshCw,
  Loader2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Agent {
  id: string;
  name: string;
  specialty: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  capabilities: string[];
}

const agents: Agent[] = [
  {
    id: "cardio",
    name: "CardioAssist",
    specialty: "Cardiology",
    description: "Expert in cardiovascular conditions and treatments",
    icon: Heart,
    color: "medical-red",
    capabilities: [
      "ECG analysis and interpretation",
      "Cardiovascular risk assessment",
      "Treatment recommendations for heart conditions",
      "Post-operative monitoring guidance"
    ]
  },
  {
    id: "neuro",
    name: "NeuroLogic",
    specialty: "Neurology",
    description: "Specialist in neurological disorders and brain function",
    icon: Brain,
    color: "aida-600",
    capabilities: [
      "Neurological symptom analysis",
      "MRI and CT scan preliminary review",
      "Neurological treatment recommendations",
      "Stroke assessment protocols"
    ]
  },
  {
    id: "path",
    name: "PathInsight",
    specialty: "Pathology",
    description: "Analysis of lab results and diagnostic findings",
    icon: Microscope,
    color: "medical-green",
    capabilities: [
      "Laboratory test analysis",
      "Pathology report interpretation",
      "Diagnostic testing recommendations",
      "Tissue sample preliminary assessment"
    ]
  },
  {
    id: "gen",
    name: "GeneralMD",
    specialty: "General Medicine",
    description: "Comprehensive primary care expertise",
    icon: Stethoscope,
    color: "muted-foreground",
    capabilities: [
      "General health assessments",
      "Preventive care recommendations",
      "Common illness diagnosis assistance",
      "Patient education materials"
    ]
  },
  {
    id: "opth",
    name: "OptiVision",
    specialty: "Ophthalmology",
    description: "Expert in eye conditions and treatments",
    icon: Eye,
    color: "medical-purple",
    capabilities: [
      "Vision test interpretation",
      "Eye disease assessment",
      "Treatment recommendations for eye conditions",
      "Post-operative care guidance"
    ]
  },
  {
    id: "radiology",
    name: "RadAnalytics",
    specialty: "Radiology",
    description: "Interpretation of medical imaging",
    icon: BarChart4,
    color: "slate-700",
    capabilities: [
      "X-ray preliminary analysis",
      "CT scan review assistance",
      "MRI interpretation support",
      "Imaging protocol recommendations"
    ]
  },
  {
    id: "pharma",
    name: "PharmExpert",
    specialty: "Pharmacology",
    description: "Medication advice and drug interactions",
    icon: Pill,
    color: "medical-yellow",
    capabilities: [
      "Drug interaction checking",
      "Medication regimen review",
      "Dosage adjustment recommendations",
      "Side effect management advice"
    ]
  },
];

// Type for chat message
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAgentsView = () => {
  const [activeTab, setActiveTab] = useState("explore");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
      toast({
        title: "Error",
        description: "Failed to generate AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to call our edge function with Gemini API
  const generateAIResponse = async (prompt: string, agent: Agent): Promise<string> => {
    try {
      const response = await fetch("/api/generate-medical-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          agentName: agent.name,
          specialty: agent.specialty,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate response");
      }
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error calling AI edge function:", error);
      throw error;
    }
  };

  // Function to handle selecting an agent
  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setActiveTab("chat");
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `Hello, I'm ${agent.name}, your AI assistant specializing in ${agent.specialty}. How can I help you today?`,
        timestamp: new Date()
      }
    ]);
  };

  // Function to clear the chat
  const handleClearChat = () => {
    if (!selectedAgent) return;
    
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `Hello, I'm ${selectedAgent.name}, your AI assistant specializing in ${selectedAgent.specialty}. How can I help you today?`,
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <motion.h1 
          className="h1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          AI Medical Assistants
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Interactive AI specialists to assist with medical decision-making
        </motion.p>
      </header>

      <Tabs 
        defaultValue="explore" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <TabsList className="grid grid-cols-2 md:w-[400px]">
            <TabsTrigger value="explore">Explore Agents</TabsTrigger>
            <TabsTrigger value="chat" disabled={!selectedAgent}>
              Chat {selectedAgent && `with ${selectedAgent.name}`}
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="explore" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent, index) => (
              <AgentCard 
                key={agent.id} 
                agent={agent} 
                onSelect={() => handleSelectAgent(agent)}
                delay={index * 0.05}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="chat" className="space-y-4">
          {selectedAgent && (
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
                  <CardContent className="flex-grow overflow-y-auto max-h-[500px] pb-0">
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
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface AgentCardProps {
  agent: Agent;
  onSelect: () => void;
  delay?: number;
}

const AgentCard = ({ agent, onSelect, delay = 0 }: AgentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay,
        ease: [0.21, 0.45, 0.26, 0.95]
      }}
    >
      <Card
        className="cursor-pointer transition-all hover:shadow-md hover:border-aida-200"
        onClick={onSelect}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                `bg-${agent.color}/10 text-${agent.color}`
              )}
            >
              <agent.icon className="w-5 h-5" />
            </div>
            <Badge variant="outline" className="font-normal">
              {agent.specialty}
            </Badge>
          </div>
          <CardTitle className="mt-3 text-xl">{agent.name}</CardTitle>
          <CardDescription>{agent.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm font-medium">Capabilities:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {agent.capabilities.slice(0, 2).map((capability, i) => (
                <li key={i} className="flex items-center">
                  <span className="h-1 w-1 rounded-full bg-aida-500 mr-2" />
                  {capability}
                </li>
              ))}
              {agent.capabilities.length > 2 && (
                <li className="text-xs text-muted-foreground">
                  +{agent.capabilities.length - 2} more capabilities
                </li>
              )}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat with {agent.name}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

interface AgentProfileProps {
  agent: Agent;
}

const AgentProfile = ({ agent }: AgentProfileProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                `bg-${agent.color}/10 text-${agent.color}`
              )}
            >
              <agent.icon className="w-6 h-6" />
            </div>
            <div>
              <CardTitle>{agent.name}</CardTitle>
              <CardDescription>{agent.specialty}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">{agent.description}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Capabilities:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            {agent.capabilities.map((capability, i) => (
              <li key={i} className="flex items-center">
                <span className="h-1 w-1 rounded-full bg-aida-500 mr-2" />
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Button variant="outline" className="w-full">
          <FileText className="mr-2 h-4 w-4" />
          View Documentation
        </Button>
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Consultation
        </Button>
      </CardFooter>
    </Card>
  );
};

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-lg",
          isUser ? "bg-aida-500 text-white" : "bg-muted"
        )}
      >
        <p className="text-sm">{message.content}</p>
        <p className="text-xs mt-1 opacity-70">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default AIAgentsView;
