export interface DashboardStats {
  totalPatients: number;
  totalAntenatalVisits: number;
  totalPostnatalVisits: number;
  totalEducationalMaterials: number;
  totalFeedbackMessages: number;
}

export interface Patient {
  id: number;
  username: string;
  email: string;
  contact?: string;
  trimester?: 'Pre-trimester' | '1st' | '2nd' | '3rd';
  role: 'Patient';
  created_at: string;
}

export interface VisitRecord {
  id: number;
  patient_id: number;
  patient_name: string;
  visit_date: string;
  visit_type: 'antenatal' | 'postnatal';
  notes: string;
  follow_up_needed: boolean;
  created_at: string;
}

export interface EducationalMaterial {
  id: number;
  title: string;
  category: 'Antenatal' | 'Postnatal' | 'Mental Health' | 'Nutrition' | 'Exercise' | 'Other';
  file_url?: string;
  link_url?: string;
  created_at: string;
}

export interface FeedbackMessage {
  id: number;
  patient_id: number;
  patient_name: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface MonthlyVisits {
  month: string;
  antenatal: number;
  postnatal: number;
}

export interface CareTypeDistribution {
  type: string;
  count: number;
}

export interface MaterialCategoryCount {
  category: string;
  count: number;
}

export interface CreateVisitRecord {
  patient_id: number;
  visit_date: string;
  visit_type: 'antenatal' | 'postnatal';
  notes: string;
  follow_up_needed: boolean;
}

export interface CreateEducationalMaterial {
  title: string;
  category: 'Antenatal' | 'Postnatal' | 'Mental Health' | 'Nutrition' | 'Exercise' | 'Other';
  file_url?: string;
  link_url?: string;
} 