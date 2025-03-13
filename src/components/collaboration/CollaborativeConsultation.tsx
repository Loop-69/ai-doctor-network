
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AgentSelector from "@/components/agents/AgentSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Brain, AlertCircle, CheckCircle2 } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  specialty: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  color: string;
}

interface Diagnosis {
  agentId: string;
  agentName: string;
  specialty: string;
  diagnosis: string;
  confidence: number;
  recommendation: string;
}

interface Message {
  id: string;
  sender: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isDoctor?: boolean;
  isUser?: boolean;
}

const CollaborativeConsultation = () => {
  const { toast } = useToast();
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([]);
  const [patientSymptoms, setPatientSymptoms] = useState("");
  const [consultationStarted, setConsultationStarted] = useState(false);
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [activeTab, setActiveTab] = useState("conversation");

  const handleAgentSelect = (agent: Agent) => {
    // Check if agent is already selected
    if (selectedAgents.some(a => a.id === agent.id)) {
      setSelectedAgents(selectedAgents.filter(a => a.id !== agent.id));
    } else {
      setSelectedAgents([...selectedAgents, agent]);
    }
  };

  const startConsultation = async () => {
    if (selectedAgents.length === 0) {
      toast({
        title: "No specialists selected",
        description: "Please select at least one AI specialist to collaborate with",
        variant: "destructive",
      });
      return;
    }

    if (!patientSymptoms.trim()) {
      toast({
        title: "No patient symptoms",
        description: "Please enter the patient's symptoms",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Create a new consultation in Supabase
      const { data, error } = await supabase
        .from('ai_consultations')
        .insert({
          status: 'in_progress',
          started_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      
      const consultId = data.id;
      setConsultationId(consultId);

      // Add the patient's symptoms as the first message
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: "You (Doctor)",
        senderId: "doctor",
        content: patientSymptoms,
        timestamp: new Date(),
        isDoctor: true
      };

      setMessages([userMessage]);

      // Add initial message to Supabase
      await supabase
        .from('ai_consultation_messages')
        .insert({
          consultation_id: consultId,
          content: patientSymptoms,
          role: 'doctor'
        });

      // Add system message to explain the collaboration
      const systemMessage: Message = {
        id: Date.now().toString() + "-system",
        sender: "System",
        senderId: "system",
        content: `Starting collaborative consultation with ${selectedAgents.map(a => a.name).join(", ")}. Each specialist will analyze the case and provide their diagnosis.`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, systemMessage]);

      // Generate responses from each selected agent
      await Promise.all(selectedAgents.map(async (agent, index) => {
        // Simulate some delay between agent responses
        await new Promise(resolve => setTimeout(resolve, 1000 * index));
        
        const agentMessage: Message = {
          id: Date.now().toString() + `-${agent.id}`,
          sender: agent.name,
          senderId: agent.id,
          content: `Analyzing the patient's symptoms from a ${agent.specialty} perspective...`,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, agentMessage]);
        
        // Call the medical response function with the agent's specialty
        await generateAgentResponse(consultId, agent, patientSymptoms);
      }));

      setConsultationStarted(true);
    } catch (error) {
      console.error("Error starting consultation:", error);
      toast({
        title: "Failed to start consultation",
        description: "There was an error starting the consultation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateAgentResponse = async (consultId: string, agent: Agent, symptoms: string) => {
    try {
      // Call the Supabase edge function to generate a response
      const { data, error } = await supabase.functions.invoke('generate-medical-response', {
        body: {
          symptoms,
          specialty: agent.specialty,
          agentId: agent.id,
          agentName: agent.name,
          consultationId: consultId,
          isCollaborative: true
        }
      });

      if (error) throw error;

      // Add the AI response to the messages
      const diagnosis = data.diagnosis;
      const recommendation = data.recommendation;
      const confidence = data.confidence || Math.floor(Math.random() * 30) + 70; // Fallback to random 70-99%
      
      const agentResponse: Message = {
        id: Date.now().toString() + `-${agent.id}-response`,
        sender: agent.name,
        senderId: agent.id,
        content: `Based on the symptoms described, I believe the patient may be suffering from ${diagnosis}. ${recommendation} (Confidence: ${confidence}%)`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentResponse]);
      
      // Store the diagnosis
      setDiagnoses(prev => [...prev, {
        agentId: agent.id,
        agentName: agent.name,
        specialty: agent.specialty,
        diagnosis,
        confidence,
        recommendation
      }]);

      // Save to Supabase
      await supabase
        .from('ai_consultation_messages')
        .insert({
          consultation_id: consultId,
          content: agentResponse.content,
          role: 'assistant'
        });

    } catch (error) {
      console.error(`Error getting response from ${agent.name}:`, error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString() + `-${agent.id}-error`,
        sender: agent.name,
        senderId: agent.id,
        content: "I apologize, but I was unable to process this case at the moment. Please try again later.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !consultationId) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "You (Doctor)",
      senderId: "doctor",
      content: newMessage,
      timestamp: new Date(),
      isDoctor: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Save to Supabase
    await supabase
      .from('ai_consultation_messages')
      .insert({
        consultation_id: consultationId,
        content: newMessage,
        role: 'doctor'
      });
    
    setNewMessage("");
    
    // Generate responses from specialists to the new message
    const followUpMessage = `The doctor adds: ${newMessage}`;
    
    await Promise.all(selectedAgents.map(async (agent, index) => {
      // Add slight delay between responses
      await new Promise(resolve => setTimeout(resolve, 800 * index));
      await generateAgentResponse(consultationId, agent, followUpMessage);
    }));
  };

  const getConsensus = () => {
    if (diagnoses.length === 0) return null;
    
    // Group diagnoses by their diagnosis text
    const diagnosisGroups: Record<string, Diagnosis[]> = {};
    
    diagnoses.forEach(d => {
      if (!diagnosisGroups[d.diagnosis]) {
        diagnosisGroups[d.diagnosis] = [];
      }
      diagnosisGroups[d.diagnosis].push(d);
    });
    
    // Find the diagnosis with the most agreement
    let consensusDiagnosis = "";
    let maxCount = 0;
    let avgConfidence = 0;
    
    for (const [diagnosis, diagnosisArray] of Object.entries(diagnosisGroups)) {
      if (diagnosisArray.length > maxCount) {
        maxCount = diagnosisArray.length;
        consensusDiagnosis = diagnosis;
        avgConfidence = diagnosisArray.reduce((sum, d) => sum + d.confidence, 0) / diagnosisArray.length;
      }
    }
    
    const agreementPercentage = (maxCount / diagnoses.length) * 100;
    
    return {
      diagnosis: consensusDiagnosis,
      agreementCount: maxCount,
      totalSpecialists: diagnoses.length,
      agreementPercentage,
      avgConfidence
    };
  };

  const consensus = getConsensus();

  return (
    <div className="space-y-6">
      {!consultationStarted ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Collaborative Consultation</CardTitle>
              <CardDescription>
                Select multiple AI specialists to collaborate on a diagnosis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Selected Specialists ({selectedAgents.length})</h3>
                {selectedAgents.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedAgents.map(agent => (
                      <Badge 
                        key={agent.id} 
                        variant="outline" 
                        className="flex items-center gap-1 p-2"
                        onClick={() => handleAgentSelect(agent)}
                      >
                        <agent.icon className="h-4 w-4" />
                        {agent.name}
                        <button className="ml-1 text-xs">✕</button>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm mb-4">No specialists selected yet</p>
                )}
                
                <h3 className="text-lg font-medium mb-2">Patient Symptoms</h3>
                <Textarea 
                  value={patientSymptoms}
                  onChange={(e) => setPatientSymptoms(e.target.value)}
                  placeholder="Describe the patient's symptoms and relevant medical history..."
                  className="min-h-[120px]"
                />
              </div>
              
              <AgentSelector 
                onSelect={handleAgentSelect}
                className="mt-6"
              />
            </CardContent>
            <CardFooter>
              <Button 
                onClick={startConsultation} 
                disabled={selectedAgents.length === 0 || !patientSymptoms.trim() || isLoading}
                className="w-full"
              >
                {isLoading ? "Starting Consultation..." : "Start Collaborative Consultation"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-[400px]">
              <TabsTrigger value="conversation">Conversation</TabsTrigger>
              <TabsTrigger value="verdict">Verdict</TabsTrigger>
            </TabsList>
            
            <TabsContent value="conversation" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Collaborative Consultation
                  </CardTitle>
                  <CardDescription>
                    Discussing with {selectedAgents.length} specialist{selectedAgents.length > 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto p-1">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex gap-3 ${message.isDoctor ? 'justify-end' : 'justify-start'}`}
                      >
                        {!message.isDoctor && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className={message.senderId === "system" ? "bg-slate-500" : "bg-aida-500"}>
                              {message.sender.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div 
                          className={`rounded-lg px-4 py-2 max-w-[80%] ${
                            message.isDoctor 
                              ? 'bg-primary text-primary-foreground ml-auto' 
                              : message.senderId === "system"
                                ? 'bg-slate-100 dark:bg-slate-800' 
                                : 'bg-slate-100 dark:bg-slate-800'
                          }`}
                        >
                          <div className="font-medium text-sm mb-1">
                            {message.sender}
                          </div>
                          <div className="text-sm">{message.content}</div>
                          <div className="text-xs mt-1 opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                        {message.isDoctor && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary">
                              Dr
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex gap-2">
                  <Textarea 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ask a follow-up question or provide additional information..."
                    className="min-h-[80px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.ctrlKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={sendMessage} 
                    disabled={!newMessage.trim()}
                    className="ml-2"
                  >
                    Send
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="verdict" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Collaborative Diagnosis
                  </CardTitle>
                  <CardDescription>
                    Diagnostic conclusions from {selectedAgents.length} specialist{selectedAgents.length > 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {consensus && (
                    <Card className="bg-slate-50 dark:bg-slate-900 mb-6">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Consensus Diagnosis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-medical-green" />
                            <span className="font-medium">{consensus.diagnosis}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Agreement:</span> {consensus.agreementCount} of {consensus.totalSpecialists} specialists ({Math.round(consensus.agreementPercentage)}%)
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Average Confidence:</span> {Math.round(consensus.avgConfidence)}%
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  <h3 className="font-medium text-lg mb-4">Individual Diagnoses</h3>
                  <div className="space-y-4">
                    {diagnoses.map((diagnosis, index) => (
                      <Card key={`${diagnosis.agentId}-${index}`} className="bg-slate-50 dark:bg-slate-800">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">{diagnosis.agentName}</CardTitle>
                            <Badge variant="outline">{diagnosis.specialty}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3 pt-0">
                          <div className="space-y-2">
                            <div>
                              <span className="font-medium">Diagnosis:</span> {diagnosis.diagnosis}
                            </div>
                            <div>
                              <span className="font-medium">Confidence:</span> {diagnosis.confidence}%
                            </div>
                            <div>
                              <span className="font-medium">Recommendation:</span> {diagnosis.recommendation}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      )}
    </div>
  );
};

export default CollaborativeConsultation;
