
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  route: string;
  colorClass: string;
}

const QuickActionButton = ({ icon, label, route, colorClass }: QuickActionButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button 
      variant="outline" 
      onClick={() => navigate(route)}
      className={`h-auto py-4 flex flex-col items-center bg-gradient-to-b from-white to-${colorClass}-50 hover:bg-${colorClass}-100 hover:border-${colorClass}-200 transition-colors`}
    >
      <div className={`h-6 w-6 mb-2 text-${colorClass}-600`}>
        {icon}
      </div>
      <span>{label}</span>
    </Button>
  );
};

export default QuickActionButton;
