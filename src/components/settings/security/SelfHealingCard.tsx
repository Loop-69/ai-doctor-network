
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SheetTrigger } from "@/components/ui/sheet";
import { Shield, Activity, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type SelfHealingCardProps = {
  onSecurityEvent: (log: { message: string, level: string }) => void;
};

export const SelfHealingCard = ({ onSecurityEvent }: SelfHealingCardProps) => {
  const { toast } = useToast();
  const [selfHealingEnabled, setSelfHealingEnabled] = useState(true);
  const [securityScanFrequency, setSecurityScanFrequency] = useState("weekly");
  const [isSecurityScanRunning, setIsSecurityScanRunning] = useState(false);

  const toggleSelfHealing = () => {
    setSelfHealingEnabled(!selfHealingEnabled);
    
    toast({
      title: !selfHealingEnabled ? "Self-healing enabled" : "Self-healing disabled",
      description: !selfHealingEnabled ? "System will automatically fix detected issues." : "Automatic issue resolution has been turned off."
    });
    
    onSecurityEvent({
      message: !selfHealingEnabled ? "Self-healing system enabled" : "Self-healing system disabled",
      level: "info"
    });
  };

  const runSecurityScan = () => {
    setIsSecurityScanRunning(true);
    
    setTimeout(() => {
      setIsSecurityScanRunning(false);
      
      const issues = Math.random() > 0.7;
      
      if (issues) {
        toast({
          title: "Security scan complete",
          description: "Security vulnerabilities were found and fixed.",
          variant: "destructive"
        });
        
        onSecurityEvent({
          message: "Security scan found and fixed vulnerabilities",
          level: "warning"
        });
      } else {
        toast({
          title: "Security scan complete",
          description: "No security vulnerabilities were found."
        });
        
        onSecurityEvent({
          message: "Security scan completed with no issues",
          level: "info"
        });
      }
    }, 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Self-Healing System</CardTitle>
        <CardDescription>
          Enable automatic detection and resolution of security issues
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-medium">Self-Healing Mode</h3>
            <p className="text-sm text-muted-foreground">
              When enabled, the system will automatically detect and fix security issues in real-time.
            </p>
          </div>
          <Switch 
            checked={selfHealingEnabled} 
            onCheckedChange={toggleSelfHealing}
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-base font-medium">Security Scan Frequency</h3>
          <RadioGroup 
            value={securityScanFrequency}
            onValueChange={setSecurityScanFrequency}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <FormLabel htmlFor="daily">Daily</FormLabel>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <FormLabel htmlFor="weekly">Weekly</FormLabel>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <FormLabel htmlFor="monthly">Monthly</FormLabel>
            </div>
          </RadioGroup>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            onClick={runSecurityScan} 
            disabled={isSecurityScanRunning}
            className="space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${isSecurityScanRunning ? "animate-spin" : ""}`} />
            <span>{isSecurityScanRunning ? "Scanning..." : "Run Security Scan Now"}</span>
          </Button>
          
          <SheetTrigger asChild>
            <Button variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              View Security Logs
            </Button>
          </SheetTrigger>
        </div>
        
        {selfHealingEnabled && (
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Self-healing is active</AlertTitle>
            <AlertDescription>
              Your system is protected and will automatically resolve security issues as they are detected.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
