
import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Shield, Palette } from "lucide-react";
import AccountTab from "./tabs/AccountTab";
import NotificationsTab from "./tabs/NotificationsTab";
import AppearanceTab from "./tabs/AppearanceTab";
import SecurityTab from "./tabs/SecurityTab";

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="space-y-6">
      <motion.h1 
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Settings
      </motion.h1>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Appearance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountTab />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
        
        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
        
        <TabsContent value="appearance">
          <AppearanceTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsView;
