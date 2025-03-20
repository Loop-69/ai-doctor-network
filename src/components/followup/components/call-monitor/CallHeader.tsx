
import { Phone, Clock, MicOff, Mic, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { ActiveCall } from "../../types/callTypes";

interface CallHeaderProps {
  activeCall: ActiveCall;
  isListening: boolean;
  toggleListening: () => void;
  handleEndCall: () => void;
  getCallDuration: () => string;
}

const CallHeader = ({ 
  activeCall, 
  isListening, 
  toggleListening, 
  handleEndCall,
  getCallDuration 
}: CallHeaderProps) => {
  return (
    <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-amber-600" />
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
  );
};

export default CallHeader;
