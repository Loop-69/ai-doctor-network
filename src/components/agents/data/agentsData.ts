
import { 
  Heart,
  Brain,
  Microscope,
  Stethoscope,
  Eye,
  BarChart4,
  Pill,
} from "lucide-react";
import { Agent } from "../types/agentTypes";

export const agents: Agent[] = [
  {
    id: "cardio",
    name: "CardioAssist",
    specialty: "Cardiology",
    description: "Expert in cardiovascular conditions and treatments",
    icon: Heart,
    color: "medical-red",
    capabilities: [
      "ECG analysis and interpretation",
      "Cardiovascular risk assessment",
      "Treatment recommendations for heart conditions",
      "Post-operative monitoring guidance"
    ]
  },
  {
    id: "neuro",
    name: "NeuroLogic",
    specialty: "Neurology",
    description: "Specialist in neurological disorders and brain function",
    icon: Brain,
    color: "aida-600",
    capabilities: [
      "Neurological symptom analysis",
      "MRI and CT scan preliminary review",
      "Neurological treatment recommendations",
      "Stroke assessment protocols"
    ]
  },
  {
    id: "path",
    name: "PathInsight",
    specialty: "Pathology",
    description: "Analysis of lab results and diagnostic findings",
    icon: Microscope,
    color: "medical-green",
    capabilities: [
      "Laboratory test analysis",
      "Pathology report interpretation",
      "Diagnostic testing recommendations",
      "Tissue sample preliminary assessment"
    ]
  },
  {
    id: "gen",
    name: "GeneralMD",
    specialty: "General Medicine",
    description: "Comprehensive primary care expertise",
    icon: Stethoscope,
    color: "muted-foreground",
    capabilities: [
      "General health assessments",
      "Preventive care recommendations",
      "Common illness diagnosis assistance",
      "Patient education materials"
    ]
  },
  {
    id: "opth",
    name: "OptiVision",
    specialty: "Ophthalmology",
    description: "Expert in eye conditions and treatments",
    icon: Eye,
    color: "medical-purple",
    capabilities: [
      "Vision test interpretation",
      "Eye disease assessment",
      "Treatment recommendations for eye conditions",
      "Post-operative care guidance"
    ]
  },
  {
    id: "radiology",
    name: "RadAnalytics",
    specialty: "Radiology",
    description: "Interpretation of medical imaging",
    icon: BarChart4,
    color: "slate-700",
    capabilities: [
      "X-ray preliminary analysis",
      "CT scan review assistance",
      "MRI interpretation support",
      "Imaging protocol recommendations"
    ]
  },
  {
    id: "pharma",
    name: "PharmExpert",
    specialty: "Pharmacology",
    description: "Medication advice and drug interactions",
    icon: Pill,
    color: "medical-yellow",
    capabilities: [
      "Drug interaction checking",
      "Medication regimen review",
      "Dosage adjustment recommendations",
      "Side effect management advice"
    ]
  },
];
