import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CVData, WorkExperience, Education, Skill, Language } from "@/types";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDefaultCVData(): CVData {
  return {
    name: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    photo: "",
    summary: "",
    workExperience: [createEmptyExperience()],
    education: [createEmptyEducation()],
    skills: [],
    languages: [],
    extraInfo: {
      availability: "",
      drivingLicense: "",
      ownVehicle: false,
      volunteering: "",
      geographicMobility: false,
      referencesAvailable: false,
    },
    template: "executive",
    accentColor: "#C9A84C",
  };
}

export function createEmptyExperience(): WorkExperience {
  return { id: uuidv4(), company: "", role: "", startDate: "", endDate: "", current: false, description: "" };
}

export function createEmptyEducation(): Education {
  return { id: uuidv4(), institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" };
}

export function createSkill(name: string): Skill {
  return { id: uuidv4(), name, level: "Intermediate" };
}

export function createLanguage(name: string): Language {
  return { id: uuidv4(), name, level: "Intermedio" };
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr + "-01");
  return date.toLocaleDateString("es-ES", { month: "short", year: "numeric" });
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

export function validateCVData(data: CVData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!data.name.trim()) errors.push("El nombre es obligatorio");
  if (!data.jobTitle.trim()) errors.push("El título profesional es obligatorio");
  if (!data.email.trim()) errors.push("El email es obligatorio");
  if (!data.summary.trim()) errors.push("El resumen profesional es obligatorio");
  return { valid: errors.length === 0, errors };
}

export function saveCVToStorage(data: CVData): void {
  if (typeof window !== "undefined") {
    // Don't store photo in localStorage to avoid quota issues — store separately
    const { photo, ...rest } = data;
    localStorage.setItem("cv-draft", JSON.stringify(rest));
    if (photo) localStorage.setItem("cv-photo", photo);
  }
}

const VALID_TEMPLATE_IDS = ["executive", "minimal", "creative", "classic", "nordic", "bold", "elegant", "compact"];

export function loadCVFromStorage(): CVData | null {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("cv-draft");
    if (raw) {
      try {
        const data = JSON.parse(raw) as CVData;
        const photo = localStorage.getItem("cv-photo") || "";
        // Ensure extraInfo exists for old drafts
        if (!data.extraInfo) {
          data.extraInfo = { availability: "", drivingLicense: "", ownVehicle: false, volunteering: "", geographicMobility: false, referencesAvailable: false };
        }
        if (!data.languages) data.languages = [];
        // Ensure template is valid — reset to executive if stale/unknown
        if (!data.template || !VALID_TEMPLATE_IDS.includes(data.template)) {
          data.template = "executive";
        }
        if (!data.accentColor) data.accentColor = "#C9A84C";
        return { ...data, photo };
      } catch { return null; }
    }
  }
  return null;
}
