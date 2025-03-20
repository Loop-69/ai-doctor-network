
import { useState } from "react";
import { Sheet } from "@/components/ui/sheet";
import { SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PasswordCard } from "../security/PasswordCard";
import { TwoFactorCard } from "../security/TwoFactorCard";
import { SelfHealingCard } from "../security/SelfHealingCard";
import { LoginSessionsCard } from "../security/LoginSessionsCard";
import { SecurityLogsSheet } from "../security/SecurityLogsSheet";
import { useNavigate, useLocation } from "react-router-dom";

type ActivityLog = {
  id: number;
  message: string;
  timestamp: string;
  level: "info" | "warning" | "error";
};

const SecurityTab = () => {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: 1,
      message: "Password changed",
      timestamp: new Date().toISOString(),
      level: "info"
    }
  ]);
  
  const navigate = useNavigate();
  const location = useLocation();

  const addLogEntry = (logData: { message: string, level: string }) => {
    const newLog = {
      id: activityLogs.length + 1,
      message: logData.message,
      timestamp: new Date().toISOString(),
      level: logData.level as "info" | "warning" | "error"
    };
    setActivityLogs([newLog, ...activityLogs]);
  };

  const navigateToLogsHistory = () => {
    // Instead of using the Sheet directly, you can navigate to a dedicated logs page
    navigate('/settings/security/logs', { state: { logs: activityLogs } });
  };

  return (
    <div className="space-y-6">
      <PasswordCard onPasswordChange={addLogEntry} />
      <TwoFactorCard onTwoFactorChange={addLogEntry} />
      <SelfHealingCard onSecurityEvent={addLogEntry} />
      <LoginSessionsCard onSessionEvent={addLogEntry} />
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            View Security Activity Logs
          </Button>
        </SheetTrigger>
        <SecurityLogsSheet activityLogs={activityLogs} />
      </Sheet>
    </div>
  );
};

export default SecurityTab;
