
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Headphones, PhoneCall } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useActiveCallContext } from "./context/ActiveCallContext";
import LiveCallMonitor from "./components/LiveCallMonitor";

const FollowupMonitoringView = () => {
  const { activeCall } = useActiveCallContext();
  const navigate = useNavigate();
  const [hasActiveCalls, setHasActiveCalls] = useState(!!activeCall);

  useEffect(() => {
    setHasActiveCalls(!!activeCall);
  }, [activeCall]);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <motion.h1 
          className="h1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Realtime Follow-up Monitoring
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Monitor and intervene in ongoing follow-up calls between AI agents and patients
        </motion.p>
      </header>

      {hasActiveCalls ? (
        <LiveCallMonitor />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Headphones className="mr-2 h-5 w-5 text-muted-foreground" /> 
              No Active Calls
            </CardTitle>
            <CardDescription>
              There are currently no active follow-up calls to monitor
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="default">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Waiting for active calls</AlertTitle>
              <AlertDescription>
                Active calls will appear here automatically. You can schedule new follow-up calls from the scheduler page.
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => navigate("/followup-scheduler")} 
              className="w-full"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Go to Follow-up Scheduler
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FollowupMonitoringView;
