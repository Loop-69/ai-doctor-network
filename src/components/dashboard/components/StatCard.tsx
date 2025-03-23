
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  icon: React.ReactNode;
  count: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  description: string;
  buttonText: string;
  buttonAction: () => void;
  gradientColors: {
    from: string;
    to: string;
    button: {
      from: string;
      to: string;
    };
  };
}

const StatCard = ({
  title,
  icon,
  count,
  trend,
  description,
  buttonText,
  buttonAction,
  gradientColors,
}: StatCardProps) => {
  return (
    <motion.div variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    }}>
      <Card className={`overflow-hidden group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white via-${gradientColors.from}-50 to-${gradientColors.to}-100`}>
        <CardHeader className="pb-2 border-b border-slate-100">
          <CardTitle className="flex items-center">
            <div className={`flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-${gradientColors.from}-400 to-${gradientColors.to}-600 text-white mr-3`}>
              {icon}
            </div>
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-3xl font-bold">{count}</p>
            {trend && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                {trend.value}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <Button 
            className={`w-full bg-gradient-to-r from-${gradientColors.button.from}-500 to-${gradientColors.button.to}-600 hover:from-${gradientColors.button.from}-600 hover:to-${gradientColors.button.to}-700 text-white shadow-md hover:shadow-lg transition-all`}
            onClick={buttonAction}
          >
            {buttonText}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
