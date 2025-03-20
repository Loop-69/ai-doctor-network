
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

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

export default NavItem;
