
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, Users, Brain, Activity, Bell, Zap, Rocket, TrendingUp, BarChart4 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <Rocket className="h-8 w-8 text-medical-purple" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-medical-purple via-indigo-500 to-blue-500 bg-clip-text text-transparent">
              Command Center
            </span>
          </h1>
        </motion.div>
        <motion.p 
          className="text-muted-foreground max-w-xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Your healthcare insights and operations in one powerful interface. Streamlined for your medical practice.
        </motion.p>
      </header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {/* Patients Card */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white via-blue-50 to-indigo-100">
            <CardHeader className="pb-2 border-b border-slate-100">
              <CardTitle className="flex items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white mr-3">
                  <Users className="h-5 w-5" />
                </div>
                <span>Patients</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-3xl font-bold">1,248</p>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +7.4%
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Total patients in your practice</p>
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
                onClick={handleViewPatients}
              >
                Manage Patients
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Consultations Card */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white via-purple-50 to-indigo-100">
            <CardHeader className="pb-2 border-b border-slate-100">
              <CardTitle className="flex items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-600 text-white mr-3">
                  <Brain className="h-5 w-5" />
                </div>
                <span>Consultations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-3xl font-bold">87</p>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +12.3%
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Scheduled for this week</p>
              <Button 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
                onClick={handleViewConsultations}
              >
                View Consultations
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Analytics Card */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white via-teal-50 to-green-100">
            <CardHeader className="pb-2 border-b border-slate-100">
              <CardTitle className="flex items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-teal-400 to-green-500 text-white mr-3">
                  <BarChart4 className="h-5 w-5" />
                </div>
                <span>Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-3xl font-bold flex items-center">
                  <Zap className="h-6 w-6 text-amber-500 mr-2" />
                  Insights
                </p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Performance metrics & trends</p>
              <Button 
                className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white shadow-md hover:shadow-lg transition-all"
                onClick={handleViewAnalytics}
              >
                Explore Analytics
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications Card */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white via-orange-50 to-amber-100">
            <CardHeader className="pb-2 border-b border-slate-100">
              <CardTitle className="flex items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white mr-3">
                  <Bell className="h-5 w-5" />
                </div>
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-3xl font-bold">5</p>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-700">
                  New
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Important updates & reminders</p>
              <Button 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all"
                onClick={handleViewNotifications}
              >
                View Notifications
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Quick Actions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="pt-4"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Zap className="h-5 w-5 text-medical-purple mr-2" />
          <span className="bg-gradient-to-r from-medical-purple to-indigo-500 bg-clip-text text-transparent">Quick Actions</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/patients/new")}
            className="h-auto py-4 flex flex-col items-center bg-gradient-to-b from-white to-blue-50 hover:bg-blue-100 hover:border-blue-200 transition-colors"
          >
            <Users className="h-6 w-6 mb-2 text-blue-600" />
            <span>New Patient</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/collaboration/new")}
            className="h-auto py-4 flex flex-col items-center bg-gradient-to-b from-white to-purple-50 hover:bg-purple-100 hover:border-purple-200 transition-colors"
          >
            <FileText className="h-6 w-6 mb-2 text-purple-600" />
            <span>New Consultation</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/agents")}
            className="h-auto py-4 flex flex-col items-center bg-gradient-to-b from-white to-green-50 hover:bg-green-100 hover:border-green-200 transition-colors"
          >
            <Brain className="h-6 w-6 mb-2 text-green-600" />
            <span>AI Assistant</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/followup-scheduler")}
            className="h-auto py-4 flex flex-col items-center bg-gradient-to-b from-white to-amber-50 hover:bg-amber-100 hover:border-amber-200 transition-colors"
          >
            <Activity className="h-6 w-6 mb-2 text-amber-600" />
            <span>Schedule Follow-up</span>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
