
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { agents } from "@/components/agents/data/agentsData";
import { Agent } from "@/components/agents/types/agentTypes";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  getAgentDocumentation, 
  AgentDocument, 
  saveDocument 
} from "@/components/agents/services/documentationService";
import { ArrowLeft, Plus, Trash2, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const expertFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  specialty: z.string().min(1, "Specialty is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  color: z.string().min(1, "Color is required"),
  capabilities: z.array(z.string()).min(1, "At least one capability is required")
});

type ExpertFormValues = z.infer<typeof expertFormSchema>;

const EditAIExpert = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("general");
  const [documentation, setDocumentation] = useState<AgentDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // Find the agent
  const agent = agents.find(a => a.id === id);

  useEffect(() => {
    if (id) {
      // Fetch agent documentation
      const fetchDocumentation = async () => {
        try {
          const docs = await getAgentDocumentation(id);
          setDocumentation(docs);
        } catch (error) {
          console.error("Failed to fetch documentation:", error);
          toast({
            title: "Error",
            description: "Failed to fetch agent documentation.",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      };

      fetchDocumentation();
    }
  }, [id, toast]);

  const form = useForm<ExpertFormValues>({
    resolver: zodResolver(expertFormSchema),
    defaultValues: agent ? {
      name: agent.name,
      specialty: agent.specialty,
      description: agent.description,
      color: agent.color,
      capabilities: agent.capabilities
    } : {
      name: "",
      specialty: "",
      description: "",
      color: "aida-500",
      capabilities: []
    }
  });

  if (!agent && id !== "new") {
    navigate("/settings/ai-experts");
    return null;
  }

  const handleAddNewCapability = () => {
    const currentCapabilities = form.getValues().capabilities || [];
    form.setValue("capabilities", [...currentCapabilities, ""]);
  };

  const handleRemoveCapability = (index: number) => {
    const currentCapabilities = form.getValues().capabilities;
    form.setValue("capabilities", currentCapabilities.filter((_, i) => i !== index));
  };

  const handleSaveExpert = (values: ExpertFormValues) => {
    console.log("Saving expert:", values);
    
    // Here you would update your agent data
    toast({
      title: "Expert Saved",
      description: "The AI expert has been updated successfully.",
    });
    
    // Navigate back to the experts settings
    navigate("/settings/ai-experts");
  };

  const handleNewDocument = () => {
    if (!id) return;
    
    const newDoc: AgentDocument = {
      id: "",
      agent_id: id,
      title: "New Document",
      content: "",
      category: "General"
    };
    
    saveDocument(newDoc).then(doc => {
      if (doc) {
        setDocumentation([...documentation, doc]);
        toast({
          title: "Document Created",
          description: "A new document has been created."
        });
      }
    }).catch(error => {
      console.error("Failed to create document:", error);
      toast({
        title: "Error",
        description: "Failed to create document.",
        variant: "destructive"
      });
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={() => navigate("/settings/ai-experts")}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">
          {id === "new" ? "Create New Expert" : `Edit ${agent?.name}`}
        </h2>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Basic information about the AI expert</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>The name of the AI expert</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="specialty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialty</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>The medical specialty of the AI expert</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormDescription>A detailed description of what the AI expert does</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>The color theme for the AI expert (e.g., medical-red, aida-600)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="capabilities" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Capabilities</CardTitle>
              <CardDescription>Define what the AI expert is capable of</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-4">
                  {form.getValues().capabilities?.map((capability, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <FormField
                        control={form.control}
                        name={`capabilities.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...field} placeholder={`Capability ${index + 1}`} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleRemoveCapability(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button type="button" variant="outline" onClick={handleAddNewCapability}>
                    <Plus className="h-4 w-4 mr-2" /> Add Capability
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentation" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>Manage knowledge documents for this AI expert</CardDescription>
              </div>
              <Button onClick={handleNewDocument}>
                <Plus className="mr-2 h-4 w-4" /> Add Document
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading documentation...</p>
              ) : documentation.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No documentation available</p>
                  <Button className="mt-4" onClick={handleNewDocument}>
                    <Plus className="mr-2 h-4 w-4" /> Create First Document
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {documentation.map((doc) => (
                    <Card key={doc.id} className="overflow-hidden">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{doc.title}</CardTitle>
                            <Badge variant="outline" className="mt-1">{doc.category}</Badge>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {doc.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => navigate("/settings/ai-experts")}>
          Cancel
        </Button>
        <Button onClick={form.handleSubmit(handleSaveExpert)}>
          Save Expert
        </Button>
      </div>
    </div>
  );
};

export default EditAIExpert;
