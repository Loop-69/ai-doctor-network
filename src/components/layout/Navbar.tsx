
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Search, User, Settings, LogOut, Heart, MessageSquare, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type NavbarProps = {
  className?: string;
};

const notifications = [
  {
    id: 1,
    title: "New patient referral",
    description: "Dr. Johnson shared a patient case with you",
    time: "10 minutes ago",
    unread: true,
    icon: <Heart className="h-4 w-4 text-medical-red" />,
  },
  {
    id: 2,
    title: "Meeting reminder",
    description: "Weekly department meeting in 30 minutes",
    time: "30 minutes ago",
    unread: true,
    icon: <Calendar className="h-4 w-4 text-blue-500" />,
  },
  {
    id: 3,
    title: "Message from Dr. Lee",
    description: "I've reviewed the patient's ECG results and...",
    time: "2 hours ago",
    unread: false,
    icon: <MessageSquare className="h-4 w-4 text-green-500" />,
  },
  {
    id: 4,
    title: "System update",
    description: "The system will be down for maintenance tonight",
    time: "Yesterday",
    unread: false,
    icon: <Bell className="h-4 w-4 text-amber-500" />,
  },
];

const Navbar = ({ className }: NavbarProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userNotifications, setUserNotifications] = useState(notifications);

  const unreadCount = userNotifications.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setUserNotifications(userNotifications.map(notification => 
      notification.id === id ? { ...notification, unread: false } : notification
    ));
  };

  const markAllAsRead = () => {
    setUserNotifications(userNotifications.map(notification => ({ ...notification, unread: false })));
  };

  const dismissNotification = (id: number) => {
    setUserNotifications(userNotifications.filter(notification => notification.id !== id));
  };

  return (
    <div
      className={cn(
        "h-16 border-b border-border bg-background/95 backdrop-blur-sm flex items-center justify-between px-4 sm:px-6",
        className
      )}
    >
      <div className="flex-1 flex items-center">
        {searchOpen ? (
          <div className="max-w-md w-full animate-fadeIn">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
              <Input
                autoFocus
                type="search"
                placeholder="Search patients, records, or AI agents..."
                className="pl-10 py-2"
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Search size={18} />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-medical-red text-[10px] font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-7">
                  Mark all as read
                </Button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {userNotifications.length > 0 ? (
                <div className="divide-y">
                  {userNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={cn(
                        "p-4 relative hover:bg-muted",
                        notification.unread && "bg-muted/50"
                      )}
                    >
                      <div className="flex gap-3">
                        <div className="mt-1 h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                          {notification.icon}
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-medium">
                              {notification.title}
                              {notification.unread && (
                                <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700">New</Badge>
                              )}
                            </h4>
                            <button 
                              onClick={() => dismissNotification(notification.id)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <X size={12} />
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {notification.description}
                          </p>
                          <p className="text-xs text-muted-foreground pt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                      {notification.unread && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="absolute inset-0 w-full h-full cursor-default"
                          aria-label="Mark as read"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No notifications</p>
                </div>
              )}
            </div>
            <div className="p-4 border-t text-center">
              <Button variant="ghost" size="sm" className="text-xs w-full" asChild>
                <Link to="/notifications">View all notifications</Link>
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full flex items-center justify-center"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar-placeholder.jpg" alt="Dr. Sarah Chen" />
                <AvatarFallback className="bg-aida-100 text-aida-800">SC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Dr. Sarah Chen</p>
                <p className="text-xs text-muted-foreground">
                  Cardiology Department
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
