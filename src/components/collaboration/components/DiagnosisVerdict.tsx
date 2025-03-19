
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Diagnosis } from "../types/consultationTypes";

interface DiagnosisVerdictProps {
  diagnoses: Diagnosis[];
}

interface Consensus {
  diagnosis: string;
  agreementCount: number;
  totalSpecialists: number;
  agreementPercentage: number;
  avgConfidence: number;
}

const DiagnosisVerdict = ({ diagnoses }: DiagnosisVerdictProps) => {
  const getConsensus = (): Consensus | null => {
    if (diagnoses.length === 0) return null;
    
    // Group diagnoses by their diagnosis text
    const diagnosisGroups: Record<string, Diagnosis[]> = {};
    
    diagnoses.forEach(d => {
      if (!diagnosisGroups[d.diagnosis]) {
        diagnosisGroups[d.diagnosis] = [];
      }
      diagnosisGroups[d.diagnosis].push(d);
    });
    
    // Find the diagnosis with the most agreement
    let consensusDiagnosis = "";
    let maxCount = 0;
    let avgConfidence = 0;
    
    for (const [diagnosis, diagnosisArray] of Object.entries(diagnosisGroups)) {
      if (diagnosisArray.length > maxCount) {
        maxCount = diagnosisArray.length;
        consensusDiagnosis = diagnosis;
        avgConfidence = diagnosisArray.reduce((sum, d) => sum + d.confidence, 0) / diagnosisArray.length;
      }
    }
    
    const agreementPercentage = (maxCount / diagnoses.length) * 100;
    
    return {
      diagnosis: consensusDiagnosis,
      agreementCount: maxCount,
      totalSpecialists: diagnoses.length,
      agreementPercentage,
      avgConfidence
    };
  };

  const consensus = getConsensus();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Collaborative Diagnosis
        </CardTitle>
        <CardDescription>
          Diagnostic conclusions from {diagnoses.length} specialist{diagnoses.length > 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {consensus && (
          <Card className="bg-slate-50 dark:bg-slate-900 mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Consensus Diagnosis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-medical-green" />
                  <span className="font-medium">{consensus.diagnosis}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Agreement:</span> {consensus.agreementCount} of {consensus.totalSpecialists} specialists ({Math.round(consensus.agreementPercentage)}%)
                </div>
                <div className="text-sm">
                  <span className="font-medium">Average Confidence:</span> {Math.round(consensus.avgConfidence)}%
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <h3 className="font-medium text-lg mb-4">Individual Diagnoses</h3>
        <div className="space-y-4">
          {diagnoses.map((diagnosis, index) => (
            <Card key={`${diagnosis.agentId}-${index}`} className="bg-slate-50 dark:bg-slate-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">{diagnosis.agentName}</CardTitle>
                  <Badge variant="outline">{diagnosis.specialty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-3 pt-0">
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Diagnosis:</span> {diagnosis.diagnosis}
                  </div>
                  <div>
                    <span className="font-medium">Confidence:</span> {diagnosis.confidence}%
                  </div>
                  <div>
                    <span className="font-medium">Recommendation:</span> {diagnosis.recommendation}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosisVerdict;
