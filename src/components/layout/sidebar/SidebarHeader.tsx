
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Menu } from "lucide-react";

type SidebarHeaderProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

const SidebarHeader = ({ collapsed, toggleSidebar }: SidebarHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border">
      {!collapsed && (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-aida-500 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">LA</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground">
            LENY-AI
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
        {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
      </Button>
    </div>
  );
};

export default SidebarHeader;
