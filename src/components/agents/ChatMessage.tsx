
import { cn } from "@/lib/utils";
import { Message } from "./types/agentTypes";

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

export default ChatMessage;
