
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, Users, Brain, Activity, Bell } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleViewPatients = () => {
    navigate("/patients");
  };

  const handleViewConsultations = () => {
    navigate("/collaboration");
  };

  const handleViewAnalytics = () => {
    navigate("/analytics");
  };

  const handleViewNotifications = () => {
    navigate("/notifications");
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <motion.h1 
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Dashboard
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Overview of your medical practice
        </motion.p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-aida-600" />
                Total Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1,248</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={handleViewPatients}
              >
                View Patients
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-600" />
                Consultations This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">87</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={handleViewConsultations}
              >
                View Consultations
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-green-600" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Insights Await</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={handleViewAnalytics}
              >
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-amber-600" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">5 New</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={handleViewNotifications}
              >
                View Notifications
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
