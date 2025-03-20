
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Clock, Mic, MicOff, PhoneOff, Send, PencilLine, Undo, Headphones } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useActiveCallContext } from "../context/ActiveCallContext";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock interface for conversation messages
interface ConversationMessage {
  id: string;
  sender: 'agent' | 'patient' | 'doctor';
  content: string;
  timestamp: Date;
  isEdited?: boolean;
}

const LiveCallMonitor = () => {
  const { activeCall, endCall } = useActiveCallContext();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(true);
  const [isTakingOver, setIsTakingOver] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [modifiedQuestion, setModifiedQuestion] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock conversation for demo purposes
  const [conversation, setConversation] = useState<ConversationMessage[]>([
    {
      id: "1",
      sender: "agent",
      content: `Hello ${activeCall?.patientName || "there"}! This is ${activeCall?.agentName || "AI Assistant"} checking in for your follow-up. How have you been feeling since our last appointment?`,
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: "2",
      sender: "patient",
      content: "I've been feeling better, but I still have some concerns about the medication side effects.",
      timestamp: new Date(Date.now() - 90000)
    },
    {
      id: "3",
      sender: "agent",
      content: "I understand your concerns. Can you tell me more specifically what side effects you're experiencing?",
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: "4",
      sender: "patient",
      content: "I've been having mild headaches and sometimes feel a bit dizzy in the morning after taking the medication.",
      timestamp: new Date(Date.now() - 30000)
    },
    {
      id: "5",
      sender: "agent",
      content: "Thank you for sharing that. Those can indeed be side effects of the medication. Let me ask some follow-up questions to better understand your situation.",
      timestamp: new Date(Date.now() - 15000)
    }
  ]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  // Format time (HH:MM)
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate duration of the call
  const getCallDuration = () => {
    if (!activeCall) return "00:00";
    
    const now = new Date();
    const diff = Math.floor((now.getTime() - activeCall.startTime.getTime()) / 1000);
    const mins = Math.floor(diff / 60);
    const secs = diff % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Send doctor's message
  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage: ConversationMessage = {
      id: Date.now().toString(),
      sender: 'doctor',
      content: message,
      timestamp: new Date()
    };
    
    setConversation([...conversation, newMessage]);
    setMessage("");

    toast({
      title: "Message sent",
      description: isTakingOver ? 
        "Your message has been sent directly to the patient" : 
        "Your message has been forwarded to the AI agent"
    });
  };

  // Toggle listening to the call
  const toggleListening = () => {
    setIsListening(!isListening);
    
    toast({
      title: isListening ? "Audio muted" : "Audio unmuted",
      description: isListening ? 
        "You will no longer hear the conversation" : 
        "You will now hear the conversation"
    });
  };

  // Toggle doctor takeover mode
  const toggleTakeover = () => {
    setIsTakingOver(!isTakingOver);
    
    toast({
      title: isTakingOver ? "Returned control to AI" : "Taking over conversation",
      description: isTakingOver ? 
        "The AI agent is now responding to the patient" : 
        "You are now directly communicating with the patient"
    });
  };

  // Start editing a question
  const startEditQuestion = (questionId: string) => {
    const question = conversation.find(msg => msg.id === questionId);
    if (question && question.sender === 'agent') {
      setEditingQuestion(questionId);
      setModifiedQuestion(question.content);
    }
  };

  // Save edited question
  const saveEditedQuestion = () => {
    if (!editingQuestion || !modifiedQuestion.trim()) return;
    
    setConversation(conversation.map(msg => 
      msg.id === editingQuestion 
        ? { ...msg, content: modifiedQuestion, isEdited: true } 
        : msg
    ));
    
    setEditingQuestion(null);
    setModifiedQuestion("");
    
    toast({
      title: "Question modified",
      description: "The AI agent will use your modified question"
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingQuestion(null);
    setModifiedQuestion("");
  };

  // End the call
  const handleEndCall = () => {
    if (window.confirm("Are you sure you want to end this call?")) {
      endCall();
      toast({
        title: "Call ended",
        description: "The follow-up call has been terminated"
      });
    }
  };

  if (!activeCall) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800/50">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <PhoneCall className="h-5 w-5 text-amber-600" />
                Live Call: {activeCall.patientName}
              </CardTitle>
              <CardDescription>
                AI Agent: {activeCall.agentName}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {getCallDuration()}
              </Badge>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleListening}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleEndCall}
              >
                <PhoneOff className="h-4 w-4 mr-2" />
                End Call
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Conversation</CardTitle>
              <Button
                variant={isTakingOver ? "default" : "outline"}
                size="sm"
                onClick={toggleTakeover}
              >
                {isTakingOver ? (
                  <>
                    <Undo className="h-4 w-4 mr-2" />
                    Return to AI
                  </>
                ) : (
                  <>
                    <Headphones className="h-4 w-4 mr-2" />
                    Take Over
                  </>
                )}
              </Button>
            </div>
            <CardDescription>
              {isTakingOver ? 
                "You are directly communicating with the patient" : 
                "The AI agent is handling the conversation"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {conversation.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] px-4 py-3 rounded-lg ${
                        msg.sender === 'patient' 
                          ? 'bg-muted ml-auto rounded-tr-none' 
                          : msg.sender === 'doctor'
                            ? 'bg-blue-100 dark:bg-blue-950 rounded-tl-none'
                            : 'bg-aida-500 text-white rounded-tl-none'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium">
                          {msg.sender === 'patient' 
                            ? activeCall.patientName 
                            : msg.sender === 'doctor'
                              ? 'You (Doctor)'
                              : activeCall.agentName}
                        </span>
                        <span className="text-xs opacity-70">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      
                      {editingQuestion === msg.id ? (
                        <div className="space-y-2">
                          <Textarea 
                            value={modifiedQuestion} 
                            onChange={(e) => setModifiedQuestion(e.target.value)}
                            className="min-h-[80px] mt-2"
                          />
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost" onClick={cancelEditing}>
                              Cancel
                            </Button>
                            <Button size="sm" onClick={saveEditedQuestion}>
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className={`text-sm ${msg.sender === 'agent' && !msg.isEdited ? 'text-white' : ''}`}>
                            {msg.content}
                          </p>
                          
                          {msg.sender === 'agent' && (
                            <div className="flex justify-between items-center mt-2">
                              {msg.isEdited && (
                                <span className="text-xs italic opacity-70">
                                  (modified by doctor)
                                </span>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="ml-auto p-0 h-6"
                                onClick={() => startEditQuestion(msg.id)}
                              >
                                <PencilLine className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="pt-4 border-t">
            <div className="flex w-full gap-2">
              <Textarea
                placeholder={
                  isTakingOver 
                    ? "Type a message to the patient..." 
                    : "Suggest a response for the AI agent..."
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <Button onClick={sendMessage}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Call Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Patient</h4>
              <p className="text-sm">{activeCall.patientName}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-1">AI Agent</h4>
              <p className="text-sm">{activeCall.agentName}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-1">Started</h4>
              <p className="text-sm">{activeCall.startTime.toLocaleTimeString()}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-1">Duration</h4>
              <p className="text-sm">{activeCall.duration} minutes (scheduled)</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-1">Call Controls</h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button 
                  variant={isListening ? "default" : "outline"} 
                  size="sm" 
                  className="w-full" 
                  onClick={toggleListening}
                >
                  {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                  {isListening ? "Mute" : "Listen"}
                </Button>
                <Button 
                  variant={isTakingOver ? "default" : "outline"} 
                  size="sm" 
                  className="w-full" 
                  onClick={toggleTakeover}
                >
                  {isTakingOver ? <Undo className="h-4 w-4 mr-2" /> : <Headphones className="h-4 w-4 mr-2" />}
                  {isTakingOver ? "Return" : "Take Over"}
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="w-full col-span-2" 
                  onClick={handleEndCall}
                >
                  <PhoneOff className="h-4 w-4 mr-2" />
                  End Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default LiveCallMonitor;
