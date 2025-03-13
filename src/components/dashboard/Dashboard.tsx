import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <motion.h1 
          className="h1"
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
        <Card>
          <CardHeader>
            <CardTitle>Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,248</p>
            <Link to="/patients">
              <Button variant="outline" className="mt-2">View Patients</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consultations This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">87</p>
            <Link to="/collaboration">
              <Button variant="outline" className="mt-2">View Consultations</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Insights Await</p>
            <Link to="/analytics">
              <Button variant="outline" className="mt-2">View Analytics</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
