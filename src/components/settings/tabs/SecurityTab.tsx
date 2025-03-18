
import { useState } from "react";
import { Sheet } from "@/components/ui/sheet";
import { PasswordCard } from "../security/PasswordCard";
import { TwoFactorCard } from "../security/TwoFactorCard";
import { SelfHealingCard } from "../security/SelfHealingCard";
import { LoginSessionsCard } from "../security/LoginSessionsCard";
import { SecurityLogsSheet, type ActivityLog } from "../security/SecurityLogsSheet";

const SecurityTab = () => {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    { id: 1, message: "Password changed", timestamp: new Date(Date.now() - 86400000).toISOString(), level: "info" },
    { id: 2, message: "Successful login from San Francisco", timestamp: new Date(Date.now() - 3600000).toISOString(), level: "info" },
    { id: 3, message: "Failed login attempt from unknown location", timestamp: new Date(Date.now() - 1800000).toISOString(), level: "warning" },
    { id: 4, message: "Security scan completed", timestamp: new Date().toISOString(), level: "info" }
  ]);
  
  const addLogEntry = (logData: { message: string, level: string }) => {
    const newLog = {
      id: activityLogs.length + 1,
      message: logData.message,
      timestamp: new Date().toISOString(),
      level: logData.level as "info" | "warning" | "error"
    };
    setActivityLogs([newLog, ...activityLogs]);
  };
  
  return (
    <div className="space-y-6">
      <PasswordCard onPasswordChange={addLogEntry} />
      <TwoFactorCard onTwoFactorChange={addLogEntry} />
      <SelfHealingCard onSecurityEvent={addLogEntry} />
      <LoginSessionsCard onSessionEvent={addLogEntry} />
      
      <Sheet>
        <SecurityLogsSheet activityLogs={activityLogs} />
      </Sheet>
    </div>
  );
};

export default SecurityTab;
