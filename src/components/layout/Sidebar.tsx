
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  LayoutDashboard,
  Brain,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  User,
  Heart,
  Microscope,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, signOut } = useAuth();
  
  const toggleSidebar = () => setCollapsed(!collapsed);
  
  const handleSignOut = () => {
    signOut();
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white border-r border-border transition-all duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-[250px]",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-aida-500 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">LA</span>
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              Leny-AI
            </span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto">
            <div className="w-8 h-8 rounded-md bg-aida-500 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">LA</span>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={toggleSidebar}
        >
          {collapsed ? (
            <Menu size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
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
            to="/collaboration"
            icon={Users}
            label="Collaboration"
            collapsed={collapsed}
          />
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        {!collapsed && (
          <div className="flex items-center space-x-3 mb-3 px-2 py-2">
            <Avatar className="h-8 w-8 bg-aida-100">
              <AvatarFallback className="bg-aida-500 text-white">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.email}
              </p>
              <p className="text-xs text-gray-500 truncate">
                Medical Professional
              </p>
            </div>
          </div>
        )}
        
        <nav className="space-y-1">
          <NavItem
            to="/settings"
            icon={Settings}
            label="Settings"
            collapsed={collapsed}
          />
          <button 
            onClick={handleSignOut}
            className={cn(
              "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-all",
              "text-red-500 hover:bg-red-50",
              collapsed ? "justify-center" : "space-x-3"
            )}
          >
            <LogOut size={20} className={collapsed ? "mx-auto" : ""} />
            {!collapsed && <span>Log Out</span>}
          </button>
        </nav>
      </div>
    </div>
  );
};

type NavItemProps = {
  to: string;
  icon: LucideIcon;
  label: string;
  collapsed: boolean;
};

const NavItem = ({ to, icon: Icon, label, collapsed }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all",
          isActive
            ? "bg-aida-50 text-aida-700"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
          collapsed ? "justify-center" : "space-x-3"
        )
      }
    >
      <Icon size={20} className={collapsed ? "mx-auto" : ""} />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
