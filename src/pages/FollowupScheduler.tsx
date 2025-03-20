
import AppLayout from "@/components/layout/AppLayout";
import FollowupSchedulerView from "@/components/followup/FollowupSchedulerView";
import { ActiveCallProvider } from "@/components/followup/context/ActiveCallContext";

const FollowupScheduler = () => {
  return (
    <AppLayout>
      <ActiveCallProvider>
        <FollowupSchedulerView />
      </ActiveCallProvider>
    </AppLayout>
  );
};

export default FollowupScheduler;
