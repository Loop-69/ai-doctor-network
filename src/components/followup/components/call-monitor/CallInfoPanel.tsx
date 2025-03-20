
import { PhoneOff, MicOff, Mic, Undo, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { ActiveCall } from "../../types/callTypes";

interface CallInfoPanelProps {
  activeCall: ActiveCall;
  isListening: boolean;
  isTakingOver: boolean;
  toggleListening: () => void;
  toggleTakeover: () => void;
  handleEndCall: () => void;
}

const CallInfoPanel = ({
  activeCall,
  isListening,
  isTakingOver,
  toggleListening,
  toggleTakeover,
  handleEndCall
}: CallInfoPanelProps) => {
  return (
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
  );
};

export default CallInfoPanel;
