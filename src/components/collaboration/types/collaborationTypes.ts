
export interface Colleague {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  status: string;
  avatar: string | null;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: number;
  participants: string[];
  location: string;
  virtual: boolean;
}

export interface SharedCase {
  id: string;
  patientName: string;
  condition: string;
  sharedBy: string;
  sharedOn: string;
  status: string;
  notes: string;
}
