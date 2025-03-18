
import AppLayout from "@/components/layout/AppLayout";
import SettingsView from "@/components/settings/SettingsView";

const SettingsPage = () => {
  return (
    <AppLayout>
      <div className="container py-6">
        <SettingsView />
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
