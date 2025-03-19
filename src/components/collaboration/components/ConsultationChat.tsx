
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { Message } from "../types/consultationTypes";

interface ConsultationChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const ConsultationChat = ({ messages, onSendMessage }: ConsultationChatProps) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Collaborative Consultation
        </CardTitle>
        <CardDescription>
          Discussing with specialists
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
              handleSendMessage();
            }
          }}
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={!newMessage.trim()}
          className="ml-2"
        >
          Send
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConsultationChat;
