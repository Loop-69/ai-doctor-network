
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import AccountTab from "./tabs/AccountTab";
import AppearanceTab from "./tabs/AppearanceTab";
import NotificationsTab from "./tabs/NotificationsTab";
import SecurityTab from "./tabs/SecurityTab";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const SettingsView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("account");
  
  // Extract the path after /settings/
  const settingsPath = location.pathname.split('/').slice(2)[0] || '';
  
  // Handle specific settings routes
  if (settingsPath === 'ai-experts') {
    return <Navigate to="/settings/ai-experts" replace />;
  }
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <div className="container max-w-6xl mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-1">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <Tabs defaultValue="account" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <AccountTab />
          </TabsContent>
          
          <TabsContent value="appearance">
            <AppearanceTab />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
          
          <TabsContent value="security">
            <SecurityTab />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="border rounded-md p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-md bg-aida-50">
              <Brain className="h-5 w-5 text-aida-600" />
            </div>
            <div>
              <h3 className="font-medium">AI Experts Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure and manage the AI experts in your system
              </p>
            </div>
          </div>
          <Button onClick={() => navigate("/settings/ai-experts")}>
            Manage Experts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
