
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Agent } from "./types/agentTypes";
import AgentProfile from "./AgentProfile";
import DropdownSelectors from "./DropdownSelectors";
import ChatHeader from "./ChatHeader";
import ChatMessagesContainer from "./ChatMessagesContainer";
import ChatInput from "./ChatInput";
import { useChatMessages } from "./hooks/useChatMessages";
import { useChatSelectors } from "./hooks/useChatSelectors";

interface ChatInterfaceProps {
  selectedAgent: Agent;
}

const ChatInterface = ({ selectedAgent }: ChatInterfaceProps) => {
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    clearChat 
  } = useChatMessages(selectedAgent);
  
  const {
    selectedPatient,
    setSelectedPatient,
    selectedSymptoms,
    setSelectedSymptoms,
    selectedQuestions,
    setSelectedQuestions,
    clearSelections
  } = useChatSelectors();

  const handleClearChat = () => {
    clearChat();
    clearSelections();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <AgentProfile agent={selectedAgent} />
      </div>
      
      <div className="md:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3">
            <ChatHeader 
              agentName={selectedAgent.name}
              onClearChat={handleClearChat}
              messageCount={messages.length}
            />
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto pb-0 space-y-4">
            {/* Dropdown Selectors for Patient, Symptoms, and Questions */}
            <DropdownSelectors 
              onPatientSelect={setSelectedPatient}
              onSymptomsSelect={setSelectedSymptoms}
              onQuestionsSelect={setSelectedQuestions}
            />
            
            {/* Chat Messages */}
            <ChatMessagesContainer 
              messages={messages}
              isLoading={isLoading}
            />
          </CardContent>
          <CardFooter className="pt-6">
            <ChatInput 
              onSendMessage={sendMessage}
              isLoading={isLoading}
              agentName={selectedAgent.name}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ChatInterface;
