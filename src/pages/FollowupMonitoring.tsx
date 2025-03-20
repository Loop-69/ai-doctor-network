
import AppLayout from "@/components/layout/AppLayout";
import FollowupMonitoringView from "@/components/followup/FollowupMonitoringView";
import { ActiveCallProvider } from "@/components/followup/context/ActiveCallContext";

const FollowupMonitoring = () => {
  return (
    <AppLayout>
      <ActiveCallProvider>
        <FollowupMonitoringView />
      </ActiveCallProvider>
    </AppLayout>
  );
};

export default FollowupMonitoring;
