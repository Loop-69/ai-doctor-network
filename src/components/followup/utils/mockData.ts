
// Mock data for patients and agents
// In a real app, these would be fetched from a backend

export const patients = [
  { id: "p1", name: "Jane Doe" },
  { id: "p2", name: "John Smith" },
  { id: "p3", name: "Maria Garcia" },
  { id: "p4", name: "Robert Chen" },
];

export const agents = [
  { id: "cardio", name: "CardioAssist", specialty: "Cardiology" },
  { id: "neuro", name: "NeuroLogic", specialty: "Neurology" },
  { id: "gen", name: "GeneralMD", specialty: "General Practice" },
  { id: "path", name: "PathInsight", specialty: "Pathology" },
];

// Helper function to get specialty based on agent ID
export const getSpecialtyForAgent = (agentId: string): string | undefined => {
  const agent = agents.find(a => a.id === agentId);
  return agent?.specialty;
};
