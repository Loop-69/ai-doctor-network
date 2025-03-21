
import { renderHook, act } from "@/utils/test-utils";
import { useConsultationSetup } from "../useConsultationSetup";
import { useToast } from "@/hooks/use-toast";

// Mock useToast
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn()
}));

describe("useConsultationSetup", () => {
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn()
    });
  });

  it("should initialize with empty values", () => {
    const { result } = renderHook(() => useConsultationSetup());
    
    expect(result.current.selectedAgents).toEqual([]);
    expect(result.current.patientSymptoms).toBe("");
  });

  it("should add an agent when handleAgentSelect is called with a new agent", () => {
    const { result } = renderHook(() => useConsultationSetup());
    
    const mockAgent = {
      id: "1",
      name: "Dr. Smith",
      specialty: "Cardiology",
      description: "Cardiologist",
      icon: jest.fn(),
      color: "text-red-500",
      capabilities: []
    };
    
    act(() => {
      result.current.handleAgentSelect(mockAgent);
    });
    
    expect(result.current.selectedAgents).toEqual([mockAgent]);
  });

  it("should remove an agent when handleAgentSelect is called with an already selected agent", () => {
    const { result } = renderHook(() => useConsultationSetup());
    
    const mockAgent = {
      id: "1",
      name: "Dr. Smith",
      specialty: "Cardiology",
      description: "Cardiologist",
      icon: jest.fn(),
      color: "text-red-500",
      capabilities: []
    };
    
    // Add the agent first
    act(() => {
      result.current.handleAgentSelect(mockAgent);
    });
    
    // Then remove it
    act(() => {
      result.current.handleAgentSelect(mockAgent);
    });
    
    expect(result.current.selectedAgents).toEqual([]);
  });

  it("should update patient symptoms when handleSymptomsChange is called", () => {
    const { result } = renderHook(() => useConsultationSetup());
    
    act(() => {
      result.current.handleSymptomsChange("Chest pain");
    });
    
    expect(result.current.patientSymptoms).toBe("Chest pain");
  });

  it("should validate consultation correctly", () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast
    });
    
    const { result } = renderHook(() => useConsultationSetup());
    
    // Should fail with no agents selected
    act(() => {
      result.current.handleSymptomsChange("Chest pain");
      const isValid = result.current.validateConsultation();
      expect(isValid).toBe(false);
      expect(mockToast).toHaveBeenCalledWith({
        title: "No specialists selected",
        description: "Please select at least one AI specialist to collaborate with",
        variant: "destructive",
      });
    });
    
    mockToast.mockClear();
    
    // Should fail with no symptoms
    act(() => {
      result.current.handleSymptomsChange("");
      const mockAgent = {
        id: "1",
        name: "Dr. Smith",
        specialty: "Cardiology",
        description: "Cardiologist",
        icon: jest.fn(),
        color: "text-red-500",
        capabilities: []
      };
      result.current.handleAgentSelect(mockAgent);
      
      const isValid = result.current.validateConsultation();
      expect(isValid).toBe(false);
      expect(mockToast).toHaveBeenCalledWith({
        title: "No patient symptoms",
        description: "Please enter the patient's symptoms",
        variant: "destructive",
      });
    });
    
    mockToast.mockClear();
    
    // Should pass with agents and symptoms
    act(() => {
      result.current.handleSymptomsChange("Chest pain");
      const isValid = result.current.validateConsultation();
      expect(isValid).toBe(true);
      expect(mockToast).not.toHaveBeenCalled();
    });
  });
});
