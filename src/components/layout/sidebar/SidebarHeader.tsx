
import React from "react";
import { Link } from "react-router-dom"; // Import Link
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
        <Link to="/" className="flex items-center space-x-2 group"> {/* Wrap with Link */}
          <div className="w-8 h-8 rounded-md bg-aida-500 flex items-center justify-center group-hover:opacity-90 transition-opacity">
            <span className="text-white font-semibold text-sm">LA</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground group-hover:text-aida-700 transition-colors">
            LENY-AI
          </span>
        </Link>
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
