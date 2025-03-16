
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard } from "lucide-react";

type PublicLayoutProps = {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
};

const PublicLayout = ({ 
  children, 
  showHeader = true, 
  showFooter = true 
}: PublicLayoutProps) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {showHeader && (
        <header className="border-b">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-md bg-aida-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">LA</span>
                </div>
                <span className="font-display font-bold text-lg text-foreground">
                  LENY-AI
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
                <Link to="/features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
                <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
                <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              </div>
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost">Log in</Button>
                    </Link>
                    <Link to="/register">
                      <Button>Sign up</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </header>
      )}

      <main className="flex-1">
        {children}
      </main>

      {showFooter && (
        <footer className="bg-gray-50 py-8">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} LENY-AI Health Technologies. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PublicLayout;
