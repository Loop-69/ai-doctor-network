
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  User, 
  Bell, 
  Shield, 
  LockKeyhole,
  MonitorSmartphone,
  Palette,
  Globe,
  Database,
  UserCog
} from "lucide-react";

const accountFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  specialty: z.string().optional(),
  hospital: z.string().optional(),
  bio: z.string().max(500, {
    message: "Bio must not be longer than 500 characters.",
  }).optional(),
});

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(false),
  patientUpdates: z.boolean().default(true),
  teamMessages: z.boolean().default(true),
  systemUpdates: z.boolean().default(true),
});

const SettingsView = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("account");
  
  const accountForm = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: "Dr. Sarah Chen",
      email: "sarah.chen@medical.org",
      specialty: "Cardiology",
      hospital: "Central Medical Center",
      bio: "Experienced cardiologist specializing in preventive care and heart failure management.",
    },
  });

  const notificationsForm = useForm<z.infer<typeof notificationsFormSchema>>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: false,
      patientUpdates: true,
      teamMessages: true,
      systemUpdates: true,
    },
  });

  function onAccountSubmit(data: z.infer<typeof accountFormSchema>) {
    toast({
      title: "Account settings updated",
      description: "Your account information has been saved.",
    });
  }

  function onNotificationsSubmit(data: z.infer<typeof notificationsFormSchema>) {
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved.",
    });
  }
  
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <motion.h1 
          className="h1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Settings
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Manage your account preferences and application settings
        </motion.p>
      </header>

      <Tabs 
        defaultValue="account" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <TabsList className="grid grid-cols-4 md:w-[600px]">
            <TabsTrigger value="account">
              <User className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="mr-2 h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account details and public profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...accountForm}>
                <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={accountForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Dr. Jane Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={accountForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="doctor@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={accountForm.control}
                      name="specialty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialty</FormLabel>
                          <FormControl>
                            <Input placeholder="Cardiology" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={accountForm.control}
                      name="hospital"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hospital/Clinic</FormLabel>
                          <FormControl>
                            <Input placeholder="Central Medical Center" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={accountForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us a bit about yourself" 
                            className="resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          This will be displayed on your profile.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Update Account</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>
                Change your profile photo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-24 w-24 rounded-full overflow-hidden border border-input">
                  <img 
                    src="/avatar-placeholder.jpg" 
                    alt="Current profile" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <Input type="file" id="picture" className="max-w-sm" />
                  <p className="text-xs text-muted-foreground">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                </div>
              </div>
              <Button variant="outline">Upload New Image</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how and when you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationsForm}>
                <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={notificationsForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Email Notifications</FormLabel>
                            <FormDescription>
                              Receive email notifications for important updates
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Separator />
                    <FormField
                      control={notificationsForm.control}
                      name="pushNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Push Notifications</FormLabel>
                            <FormDescription>
                              Receive push notifications on your desktop or mobile device
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator />
                  <h3 className="text-lg font-medium">Notification Types</h3>
                  
                  <div className="space-y-4">
                    <FormField
                      control={notificationsForm.control}
                      name="patientUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Patient Updates</FormLabel>
                            <FormDescription>
                              Get notified about changes to patient records and new test results
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Separator />
                    <FormField
                      control={notificationsForm.control}
                      name="teamMessages"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Team Messages</FormLabel>
                            <FormDescription>
                              Get notified when colleagues send you messages or share cases
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Separator />
                    <FormField
                      control={notificationsForm.control}
                      name="systemUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>System Updates</FormLabel>
                            <FormDescription>
                              Get notified about system updates and maintenance
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit">Save Preferences</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how the application looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center space-y-2">
                    <Button variant="outline" className="w-full h-24 border-2 border-primary">
                      <div className="w-full h-full bg-background flex flex-col">
                        <div className="h-1/3 w-full bg-primary"></div>
                        <div className="flex-grow flex items-center justify-center text-xs">
                          Light
                        </div>
                      </div>
                    </Button>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <Button variant="outline" className="w-full h-24">
                      <div className="w-full h-full bg-slate-900 flex flex-col">
                        <div className="h-1/3 w-full bg-primary"></div>
                        <div className="flex-grow flex items-center justify-center text-xs text-white">
                          Dark
                        </div>
                      </div>
                    </Button>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <Button variant="outline" className="w-full h-24">
                      <div className="w-full h-full bg-background flex flex-col">
                        <div className="h-1/3 w-full bg-primary"></div>
                        <div className="flex-grow flex items-center justify-center text-xs">
                          <MonitorSmartphone className="h-4 w-4 mr-1" />
                          System
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Density</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline">Compact</Button>
                  <Button variant="outline" className="border-2 border-primary">Comfortable</Button>
                  <Button variant="outline">Spacious</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Language</h3>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <select className="flex h-10 w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
              </div>
              
              <Button>Save Appearance Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsView;
