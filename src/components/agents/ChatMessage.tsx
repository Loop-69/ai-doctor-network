
import { cn } from "@/lib/utils";
import { Message } from "./types/agentTypes";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={cn(
        "flex w-full animate-fadeIn", 
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "max-w-[85%] px-4 py-3 rounded-lg shadow-sm",
          isUser 
            ? "bg-aida-500 text-white rounded-tr-none" 
            : "bg-slate-100 dark:bg-slate-800 rounded-tl-none"
        )}
      >
        <p className={cn(
          "text-sm whitespace-pre-wrap",
          isUser ? "text-white" : "text-foreground"
        )}>
          {message.content}
        </p>
        <p className={cn(
          "text-xs mt-2 text-right",
          isUser ? "text-white/70" : "text-muted-foreground"
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
