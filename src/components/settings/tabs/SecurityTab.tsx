
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { LockKeyhole, Shield, Activity, RefreshCw, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const SecurityTab = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [logLevel, setLogLevel] = useState("info");
  const [securityScanFrequency, setSecurityScanFrequency] = useState("weekly");
  const [activityLogs, setActivityLogs] = useState([
    { id: 1, message: "Password changed", timestamp: new Date(Date.now() - 86400000).toISOString(), level: "info" },
    { id: 2, message: "Successful login from San Francisco", timestamp: new Date(Date.now() - 3600000).toISOString(), level: "info" },
    { id: 3, message: "Failed login attempt from unknown location", timestamp: new Date(Date.now() - 1800000).toISOString(), level: "warning" },
    { id: 4, message: "Security scan completed", timestamp: new Date().toISOString(), level: "info" }
  ]);
  const [isSecurityScanRunning, setIsSecurityScanRunning] = useState(false);
  const [selfHealingEnabled, setSelfHealingEnabled] = useState(true);
  
  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.id]: e.target.value
    });
  };
  
  const handleUpdatePassword = () => {
    if (passwordForm.new !== passwordForm.confirm) {
      toast({
        title: "Passwords don't match",
        description: "Your new password and confirmation don't match.",
        variant: "destructive"
      });
      return;
    }
    
    if (passwordForm.new.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }
    
    // Password update logic would go here
    
    toast({
      title: "Password updated",
      description: "Your password has been successfully updated."
    });
    
    // Add to activity logs
    const newLog = {
      id: activityLogs.length + 1,
      message: "Password changed",
      timestamp: new Date().toISOString(),
      level: "info"
    };
    setActivityLogs([newLog, ...activityLogs]);
    
    // Reset form
    setPasswordForm({
      current: "",
      new: "",
      confirm: ""
    });
  };
  
  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    
    toast({
      title: !twoFactorEnabled ? "Two-factor authentication enabled" : "Two-factor authentication disabled",
      description: !twoFactorEnabled ? "Your account is now more secure." : "Two-factor authentication has been turned off."
    });
    
    // Add to activity logs
    const newLog = {
      id: activityLogs.length + 1,
      message: !twoFactorEnabled ? "Two-factor authentication enabled" : "Two-factor authentication disabled",
      timestamp: new Date().toISOString(),
      level: "info"
    };
    setActivityLogs([newLog, ...activityLogs]);
  };
  
  const handleLogoutDevice = (deviceName) => {
    toast({
      title: "Device logged out",
      description: `${deviceName} has been logged out.`
    });
    
    // Add to activity logs
    const newLog = {
      id: activityLogs.length + 1,
      message: `Device logged out: ${deviceName}`,
      timestamp: new Date().toISOString(),
      level: "info"
    };
    setActivityLogs([newLog, ...activityLogs]);
  };
  
  const handleLogoutAllDevices = () => {
    toast({
      title: "All devices logged out",
      description: "You have been logged out from all devices except this one."
    });
    
    // Add to activity logs
    const newLog = {
      id: activityLogs.length + 1,
      message: "Logged out from all devices",
      timestamp: new Date().toISOString(),
      level: "warning"
    };
    setActivityLogs([newLog, ...activityLogs]);
  };
  
  const runSecurityScan = () => {
    setIsSecurityScanRunning(true);
    
    // Simulate a security scan
    setTimeout(() => {
      setIsSecurityScanRunning(false);
      
      const issues = Math.random() > 0.7;
      
      if (issues) {
        toast({
          title: "Security scan complete",
          description: "Security vulnerabilities were found and fixed.",
          variant: "warning"
        });
        
        // Add to activity logs
        const newLog = {
          id: activityLogs.length + 1,
          message: "Security scan found and fixed vulnerabilities",
          timestamp: new Date().toISOString(),
          level: "warning"
        };
        setActivityLogs([newLog, ...activityLogs]);
      } else {
        toast({
          title: "Security scan complete",
          description: "No security vulnerabilities were found."
        });
        
        // Add to activity logs
        const newLog = {
          id: activityLogs.length + 1,
          message: "Security scan completed with no issues",
          timestamp: new Date().toISOString(),
          level: "info"
        };
        setActivityLogs([newLog, ...activityLogs]);
      }
    }, 3000);
  };
  
  const toggleSelfHealing = () => {
    setSelfHealingEnabled(!selfHealingEnabled);
    
    toast({
      title: !selfHealingEnabled ? "Self-healing enabled" : "Self-healing disabled",
      description: !selfHealingEnabled ? "System will automatically fix detected issues." : "Automatic issue resolution has been turned off."
    });
    
    // Add to activity logs
    const newLog = {
      id: activityLogs.length + 1,
      message: !selfHealingEnabled ? "Self-healing system enabled" : "Self-healing system disabled",
      timestamp: new Date().toISOString(),
      level: "info"
    };
    setActivityLogs([newLog, ...activityLogs]);
  };
  
  const getLogBadgeVariant = (level) => {
    switch (level) {
      case "warning":
        return "warning";
      case "error":
        return "destructive";
      default:
        return "secondary";
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="grid gap-2">
              <FormLabel htmlFor="current">Current Password</FormLabel>
              <Input 
                id="current" 
                type="password" 
                value={passwordForm.current}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="grid gap-2">
              <FormLabel htmlFor="new">New Password</FormLabel>
              <Input 
                id="new" 
                type="password" 
                value={passwordForm.new}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="grid gap-2">
              <FormLabel htmlFor="confirm">Confirm New Password</FormLabel>
              <Input 
                id="confirm" 
                type="password" 
                value={passwordForm.confirm}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          
          <Button onClick={handleUpdatePassword}>Update Password</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-base font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account by requiring more than just a password to sign in.
              </p>
            </div>
            <Switch 
              checked={twoFactorEnabled}
              onCheckedChange={handleToggleTwoFactor}
            />
          </div>
        </CardContent>
      </Card>
      
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
      
      <Card>
        <CardHeader>
          <CardTitle>Login Sessions</CardTitle>
          <CardDescription>
            Manage your active login sessions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <LockKeyhole className="h-4 w-4 text-muted-foreground" />
                  <h4 className="text-sm font-medium">MacBook Pro - San Francisco</h4>
                </div>
                <p className="text-xs text-muted-foreground">Active now</p>
              </div>
              <Button variant="ghost" size="sm">This device</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <LockKeyhole className="h-4 w-4 text-muted-foreground" />
                  <h4 className="text-sm font-medium">iPhone 13 - San Francisco</h4>
                </div>
                <p className="text-xs text-muted-foreground">Last active 2 hours ago</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleLogoutDevice("iPhone 13")}
              >
                Log out
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <LockKeyhole className="h-4 w-4 text-muted-foreground" />
                  <h4 className="text-sm font-medium">Chrome - Windows PC</h4>
                </div>
                <p className="text-xs text-muted-foreground">Last active 5 days ago</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleLogoutDevice("Chrome - Windows PC")}
              >
                Log out
              </Button>
            </div>
          </div>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Log Out All Sessions</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will log you out from all devices except this one. You'll need to sign in again on those devices.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogoutAllDevices}>
                  Log Out All Devices
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
      
      <Sheet>
        <SheetContent className="w-[400px] sm:w-[540px]" side="right">
          <SheetHeader>
            <SheetTitle>Security Activity Log</SheetTitle>
            <SheetDescription>
              Review your recent security-related activity
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Log Level</h3>
              <Select value={logLevel} onValueChange={setLogLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select log level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-6 space-y-6 max-h-[70vh] overflow-y-auto pr-4">
            {activityLogs
              .filter(log => logLevel === "all" || log.level === logLevel)
              .map(log => (
                <div key={log.id} className="relative pl-6 pb-4 border-l border-muted">
                  <div className="absolute -left-1.5 mt-1.5">
                    <Badge variant={getLogBadgeVariant(log.level)} className="rounded-full h-3 w-3 p-0" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{log.message}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          
          <SheetFooter className="mt-6">
            <Button variant="outline" size="sm" className="space-x-2">
              <FileText className="h-4 w-4" />
              <span>Export Logs</span>
            </Button>
            <SheetClose asChild>
              <Button>Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SecurityTab;
