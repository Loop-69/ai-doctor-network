
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { LockKeyhole } from "lucide-react";

const SecurityTab = () => {
  return (
    <div className="space-y-4">
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
              <Input id="current" type="password" />
            </div>
            <div className="grid gap-2">
              <FormLabel htmlFor="new">New Password</FormLabel>
              <Input id="new" type="password" />
            </div>
            <div className="grid gap-2">
              <FormLabel htmlFor="confirm">Confirm New Password</FormLabel>
              <Input id="confirm" type="password" />
            </div>
          </div>
          
          <Button>Update Password</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-base font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account by requiring more than just a password to sign in.
              </p>
            </div>
            <Switch />
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-base font-medium">Login Sessions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <LockKeyhole className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-medium">MacBook Pro - San Francisco</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">Active now</p>
                </div>
                <Button variant="ghost" size="sm">This device</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <LockKeyhole className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-medium">iPhone 13 - San Francisco</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">Last active 2 hours ago</p>
                </div>
                <Button variant="outline" size="sm">Log out</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <LockKeyhole className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-medium">Chrome - Windows PC</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">Last active 5 days ago</p>
                </div>
                <Button variant="outline" size="sm">Log out</Button>
              </div>
            </div>
          </div>
          
          <Button variant="destructive">Log Out All Sessions</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTab;
