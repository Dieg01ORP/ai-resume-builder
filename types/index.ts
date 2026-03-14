export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface Language {
  id: string;
  name: string;
  level: "Básico" | "Intermedio" | "Avanzado" | "Nativo";
}

export interface ExtraInfo {
  availability: string;
  drivingLicense: string;
  ownVehicle: boolean;
  volunteering: string;
  geographicMobility: boolean;
  referencesAvailable: boolean;
}

export interface CVData {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  photo?: string;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  extraInfo: ExtraInfo;
  template: TemplateId;
  accentColor: string;
}

export type TemplateId =
  | "executive"
  | "minimal"
  | "creative"
  | "classic"
  | "nordic"
  | "bold"
  | "elegant"
  | "compact";

export interface Template {
  id: TemplateId;
  name: string;
  description: string;
  previewBg: string;
  previewAccent: string;
  previewLayout: "sidebar-left" | "sidebar-right" | "full-width" | "two-col-header" | "banner" | "split-top";
  accentColors: string[];
}

export interface AIEnhanceRequest {
  field: keyof CVData | "workExperience" | "summary";
  currentValue: string;
  context: { name: string; jobTitle: string };
}

export interface AIEnhanceResponse {
  enhanced: string;
  suggestions?: string[];
}

export type BuilderStep = "form" | "preview" | "export";
