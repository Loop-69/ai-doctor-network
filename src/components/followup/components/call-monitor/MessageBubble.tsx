
import { PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ConversationMessage } from "../../types/callTypes";

interface MessageBubbleProps {
  message: ConversationMessage;
  activeCallAgentName: string;
  activeCallPatientName: string;
  editingQuestion: string | null;
  modifiedQuestion: string;
  setModifiedQuestion: (value: string) => void;
  startEditQuestion: (questionId: string) => void;
  saveEditedQuestion: () => void;
  cancelEditing: () => void;
  formatTime: (date: Date) => string;
}

const MessageBubble = ({
  message,
  activeCallAgentName,
  activeCallPatientName,
  editingQuestion,
  modifiedQuestion,
  setModifiedQuestion,
  startEditQuestion,
  saveEditedQuestion,
  cancelEditing,
  formatTime
}: MessageBubbleProps) => {
  const getSenderName = (sender: string) => {
    if (sender === 'patient') return activeCallPatientName;
    if (sender === 'doctor') return 'You (Doctor)';
    return activeCallAgentName;
  };

  return (
    <div 
      className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[80%] px-4 py-3 rounded-lg ${
          message.sender === 'patient' 
            ? 'bg-muted ml-auto rounded-tr-none' 
            : message.sender === 'doctor'
              ? 'bg-blue-100 dark:bg-blue-950 rounded-tl-none'
              : 'bg-aida-500 text-white rounded-tl-none'
        }`}
      >
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium">
            {getSenderName(message.sender)}
          </span>
          <span className="text-xs opacity-70">
            {formatTime(message.timestamp)}
          </span>
        </div>
        
        {editingQuestion === message.id ? (
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
            <p className={`text-sm ${message.sender === 'agent' && !message.isEdited ? 'text-white' : ''}`}>
              {message.content}
            </p>
            
            {message.sender === 'agent' && (
              <div className="flex justify-between items-center mt-2">
                {message.isEdited && (
                  <span className="text-xs italic opacity-70">
                    (modified by doctor)
                  </span>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-auto p-0 h-6"
                  onClick={() => startEditQuestion(message.id)}
                >
                  <PencilLine className="h-3 w-3" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
