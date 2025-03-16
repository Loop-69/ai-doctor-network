
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useAuth } from "@/contexts/AuthContext";

type AppLayoutProps = {
  children?: React.ReactNode;
  forcePublic?: boolean;
};

const AppLayout = ({ children, forcePublic = false }: AppLayoutProps) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  
  // If user is not authenticated and this is not a public page, render without sidebar
  if (!isAuthenticated && !forcePublic) {
    return (
      <div className="min-h-screen bg-background">
        {children || <Outlet />}
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {isAuthenticated && <Sidebar />}
      <div className={`flex-1 flex flex-col overflow-hidden ${!isAuthenticated ? 'min-h-screen' : ''}`}>
        {isAuthenticated && <Navbar />}
        <main className={`flex-1 overflow-y-auto bg-background ${isAuthenticated ? 'p-4 sm:p-6' : ''}`}>
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
