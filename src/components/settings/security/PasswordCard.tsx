
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type PasswordCardProps = {
  onPasswordChange: (log: { message: string, level: string }) => void;
};

export const PasswordCard = ({ onPasswordChange }: PasswordCardProps) => {
  const { toast } = useToast();
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.id]: e.target.value
    });
  };
  
  const handleUpdatePassword = () => {
    if (passwordForm.new !== passwordForm.confirm) {
      toast({
        title: "Passwords don't match",
        description: "Your new password and confirmation don't match.",
        variant: "destructive"
      });
      return;
    }
    
    if (passwordForm.new.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Password updated",
      description: "Your password has been successfully updated."
    });
    
    onPasswordChange({
      message: "Password changed",
      level: "info"
    });
    
    setPasswordForm({
      current: "",
      new: "",
      confirm: ""
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="grid gap-2">
            <FormLabel htmlFor="current">Current Password</FormLabel>
            <Input 
              id="current" 
              type="password" 
              value={passwordForm.current}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="grid gap-2">
            <FormLabel htmlFor="new">New Password</FormLabel>
            <Input 
              id="new" 
              type="password" 
              value={passwordForm.new}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="grid gap-2">
            <FormLabel htmlFor="confirm">Confirm New Password</FormLabel>
            <Input 
              id="confirm" 
              type="password" 
              value={passwordForm.confirm}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        
        <Button onClick={handleUpdatePassword}>Update Password</Button>
      </CardContent>
    </Card>
  );
};
