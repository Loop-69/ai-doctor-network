
import { Loader2 } from "lucide-react";
import { Message } from "./types/agentTypes";
import ChatMessage from "./ChatMessage";

interface ChatMessagesContainerProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatMessagesContainer = ({ messages, isLoading }: ChatMessagesContainerProps) => {
  return (
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
  );
};

export default ChatMessagesContainer;
