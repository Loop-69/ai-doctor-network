
import React from "react";
import NavItem from "./NavItem";
import {
  LayoutDashboard,
  Brain,
  FileText,
  Users,
  Settings,
  Microscope,
  Phone,
  Monitor,
  Bell,
} from "lucide-react";

type NavItemsProps = {
  collapsed: boolean;
};

const NavItems = ({ collapsed }: NavItemsProps) => {
  return (
    <nav className="px-2 space-y-1">
      <NavItem
        to="/dashboard"
        icon={LayoutDashboard}
        label="Dashboard"
        collapsed={collapsed}
      />
      <NavItem
        to="/agents"
        icon={Brain}
        label="AI Agents"
        collapsed={collapsed}
      />
      <NavItem
        to="/settings/ai-experts"
        icon={Microscope}
        label="AI Experts"
        collapsed={collapsed}
      />
      <NavItem
        to="/patients"
        icon={FileText}
        label="Patient Records"
        collapsed={collapsed}
      />
      <NavItem
        to="/followup-scheduler"
        icon={Phone}
        label="Follow-up Calls"
        collapsed={collapsed}
      />
      <NavItem
        to="/followup-monitoring"
        icon={Monitor}
        label="Call Monitoring"
        collapsed={collapsed}
      />
      <NavItem
        to="/collaboration"
        icon={Users}
        label="Collaboration"
        collapsed={collapsed}
      />
      <NavItem
        to="/notifications"
        icon={Bell}
        label="Notifications"
        collapsed={collapsed}
      />
    </nav>
  );
};

export default NavItems;
