import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Users,
  MessageSquare,
  Video,
  Calendar,
  Clock,
  FileText,
  Share,
  Plus,
  Heart,
  UserPlus
} from "lucide-react";
import CollaborativeConsultation from "./CollaborativeConsultation";

const colleagues = [
  {
    id: "c1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    hospital: "Central Medical Center",
    status: "Available",
    avatar: null
  },
  {
    id: "c2",
    name: "Dr. Michael Lee",
    specialty: "Neurology",
    hospital: "Central Medical Center",
    status: "In a meeting",
    avatar: null
  },
  {
    id: "c3",
    name: "Dr. Jessica Parker",
    specialty: "Oncology",
    hospital: "Memorial Hospital",
    status: "Available",
    avatar: null
  },
  {
    id: "c4",
    name: "Dr. Robert Wilson",
    specialty: "Radiology",
    hospital: "Central Medical Center",
    status: "Away",
    avatar: null
  },
];

const meetings = [
  {
    id: "m1",
    title: "Weekly Cardiology Department Meeting",
    date: "2023-05-15T10:00:00",
    duration: 60,
    participants: ["Dr. Sarah Johnson", "Dr. Chen", "Dr. Michael Lee"],
    location: "Conference Room 3",
    virtual: false
  },
  {
    id: "m2",
    title: "Patient Case Review: John Smith",
    date: "2023-05-16T14:30:00",
    duration: 45,
    participants: ["Dr. Chen", "Dr. Jessica Parker"],
    location: "Zoom",
    virtual: true
  },
  {
    id: "m3",
    title: "Emergency Protocol Review",
    date: "2023-05-18T09:00:00",
    duration: 90,
    participants: ["Dr. Chen", "Dr. Sarah Johnson", "Dr. Michael Lee", "Dr. Jessica Parker"],
    location: "Auditorium",
    virtual: false
  }
];

const sharedCases = [
  {
    id: "sc1",
    patientName: "Maria Garcia",
    condition: "Chest Pain, Hypertension",
    sharedBy: "Dr. Sarah Johnson",
    sharedOn: "2023-05-10T08:45:00",
    status: "Critical",
    notes: "Patient showing signs of unstable angina. ECG results attached."
  },
  {
    id: "sc2",
    patientName: "John Smith",
    condition: "Coronary Artery Disease",
    sharedBy: "Dr. Chen",
    sharedOn: "2023-05-11T14:20:00",
    status: "Stable",
    notes: "Post-op recovery progressing well. Latest labs indicate improvement."
  }
];

const CollaborationView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ai-collaboration");

  const filteredColleagues = colleagues.filter(colleague => 
    colleague.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    colleague.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <motion.h1 
          className="h1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Collaboration Hub
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Connect with colleagues, AI specialists, and share patient cases
        </motion.p>
      </header>

      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-10" 
            placeholder="Search colleagues, meetings, or cases..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button className="font-bold">
            <Video className="mr-2 h-4 w-4" />
            Start Meeting
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
        </div>
      </motion.div>

      <Tabs 
        defaultValue="ai-collaboration" 
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
            <TabsTrigger value="ai-collaboration">
              <UserPlus className="mr-2 h-4 w-4" />
              AI Collaboration
            </TabsTrigger>
            <TabsTrigger value="colleagues">
              <Users className="mr-2 h-4 w-4" />
              Colleagues
            </TabsTrigger>
            <TabsTrigger value="meetings">
              <Calendar className="mr-2 h-4 w-4" />
              Meetings
            </TabsTrigger>
            <TabsTrigger value="shared">
              <Share className="mr-2 h-4 w-4" />
              Shared Cases
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="ai-collaboration" className="space-y-4">
          <CollaborativeConsultation />
        </TabsContent>

        <TabsContent value="colleagues" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredColleagues.map((colleague, index) => (
              <ColleagueCard 
                key={colleague.id} 
                colleague={colleague} 
                delay={0.1 * index}
              />
            ))}
            {filteredColleagues.length === 0 && (
              <div className="text-center py-10 col-span-3">
                <p className="text-muted-foreground">No colleagues found matching your search criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="meetings" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Meeting
            </Button>
          </div>
          <div className="grid gap-4">
            {meetings.map((meeting, index) => (
              <MeetingCard 
                key={meeting.id} 
                meeting={meeting} 
                delay={0.1 * index}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="shared" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button>
              <Share className="mr-2 h-4 w-4" />
              Share New Case
            </Button>
          </div>
          <div className="grid gap-4">
            {sharedCases.map((sharedCase, index) => (
              <SharedCaseCard 
                key={sharedCase.id} 
                sharedCase={sharedCase} 
                delay={0.1 * index}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ColleagueCardProps {
  colleague: {
    id: string;
    name: string;
    specialty: string;
    hospital: string;
    status: string;
    avatar: string | null;
  };
  delay?: number;
}

const ColleagueCard = ({ colleague, delay = 0 }: ColleagueCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "text-medical-green bg-green-50";
      case "away":
        return "text-amber-500 bg-amber-50";
      case "in a meeting":
        return "text-blue-500 bg-blue-50";
      default:
        return "text-muted-foreground bg-secondary";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={colleague.avatar || `/avatar-placeholder.jpg`} />
                <AvatarFallback className="bg-secondary">
                  {colleague.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{colleague.name}</CardTitle>
                <CardDescription>
                  {colleague.specialty} • {colleague.hospital}
                </CardDescription>
              </div>
            </div>
            <div className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(colleague.status)}`}>
              {colleague.status}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button size="sm" className="flex-1">
              <Video className="mr-2 h-4 w-4" />
              Call
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface MeetingCardProps {
  meeting: {
    id: string;
    title: string;
    date: string;
    duration: number;
    participants: string[];
    location: string;
    virtual: boolean;
  };
  delay?: number;
}

const MeetingCard = ({ meeting, delay = 0 }: MeetingCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>{meeting.title}</CardTitle>
          <CardDescription>
            <div className="flex items-center mt-1">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              {formatDate(meeting.date)}
              <Clock className="ml-4 mr-2 h-4 w-4 text-muted-foreground" />
              {formatTime(meeting.date)} ({meeting.duration} min)
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="bg-secondary rounded-md p-2 mr-3">
                {meeting.virtual ? (
                  <Video className="h-4 w-4 text-blue-500" />
                ) : (
                  <Users className="h-4 w-4 text-purple-500" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{meeting.location}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-secondary rounded-md p-2 mr-3">
                <Users className="h-4 w-4 text-aida-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Participants</p>
                <p className="text-sm text-muted-foreground">
                  {meeting.participants.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <Button variant="outline" size="sm">Reschedule</Button>
          <Button size="sm">Join Meeting</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

interface SharedCaseCardProps {
  sharedCase: {
    id: string;
    patientName: string;
    condition: string;
    sharedBy: string;
    sharedOn: string;
    status: string;
    notes: string;
  };
  delay?: number;
}

const SharedCaseCard = ({ sharedCase, delay = 0 }: SharedCaseCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "critical":
        return "text-medical-red bg-red-50";
      case "stable":
        return "text-medical-green bg-green-50";
      case "improving":
        return "text-aida-600 bg-blue-50";
      default:
        return "text-muted-foreground bg-secondary";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center">
                {sharedCase.patientName}
                <span className={`ml-2 text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(sharedCase.status)}`}>
                  {sharedCase.status}
                </span>
              </CardTitle>
              <CardDescription className="flex items-center mt-1">
                <Heart className="mr-1 h-3 w-3 text-medical-red" />
                {sharedCase.condition}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-sm">
              <span className="font-medium">Notes: </span>
              <span className="text-muted-foreground">{sharedCase.notes}</span>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Shared by {sharedCase.sharedBy} on {formatDate(sharedCase.sharedOn)}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <MessageSquare className="mr-2 h-4 w-4" />
            Comment
          </Button>
          <Button size="sm" className="flex-1">
            <FileText className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CollaborationView;
