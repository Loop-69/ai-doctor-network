
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { ActiveCallProvider } from "@/components/followup/context/ActiveCallContext";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <ActiveCallProvider>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="container mx-auto max-w-6xl"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </ActiveCallProvider>
  );
};

export default AppLayout;
