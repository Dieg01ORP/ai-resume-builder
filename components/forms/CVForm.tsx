"use client";

import { useState, useRef } from "react";
import { CVData, WorkExperience, Education, Skill, Language, ExtraInfo } from "@/types";
import { createEmptyExperience, createEmptyEducation, createSkill, createLanguage } from "@/lib/utils";
import { Sparkles, Plus, Trash2, ChevronDown, ChevronUp, Loader2, Upload, X, Camera, GripVertical, RotateCcw } from "lucide-react";

interface CVFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
  onReset?: () => void;
}

type Section = "personal" | "photo" | "summary" | "experience" | "education" | "skills" | "languages" | "extra";

const SKILL_LEVELS: Skill["level"][] = ["Beginner", "Intermediate", "Advanced", "Expert"];
const SKILL_LEVEL_LABELS: Record<Skill["level"], string> = {
  Beginner: "Básico",
  Intermediate: "Medio",
  Advanced: "Avanzado",
  Expert: "Experto",
};

export function CVForm({ cvData, onChange, onReset }: CVFormProps) {
  const [openSections, setOpenSections] = useState<Set<Section>>(new Set(["personal", "summary"]));
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [dragOver, setDragOver] = useState<{ list: "experience" | "education"; idx: number } | null>(null);
  const dragItem = useRef<{ list: "experience" | "education"; idx: number } | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (section: Section) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      next.has(section) ? next.delete(section) : next.add(section);
      return next;
    });
  };

  const updateField = <K extends keyof CVData>(key: K, value: CVData[K]) => {
    onChange({ ...cvData, [key]: value });
  };

  const updateExtraInfo = (field: keyof ExtraInfo, value: string | boolean) => {
    onChange({ ...cvData, extraInfo: { ...cvData.extraInfo, [field]: value } });
  };

  // ── Photo ──────────────────────────────────────────────────
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setAiError("Por favor sube una imagen (JPG, PNG, WEBP)."); setTimeout(() => setAiError(null), 3000); return; }
    if (file.size > 3 * 1024 * 1024) { setAiError("La imagen no puede superar 3MB."); setTimeout(() => setAiError(null), 3000); return; }
    const reader = new FileReader();
    reader.onload = (ev) => updateField("photo", ev.target?.result as string);
    reader.readAsDataURL(file);
  };
  const removePhoto = () => { updateField("photo", ""); if (photoInputRef.current) photoInputRef.current.value = ""; };

  // ── Experience ─────────────────────────────────────────────
  const updateExperience = (id: string, field: keyof WorkExperience, value: string | boolean) => {
    onChange({ ...cvData, workExperience: cvData.workExperience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp) });
  };
  const addExperience = () => onChange({ ...cvData, workExperience: [...cvData.workExperience, createEmptyExperience()] });
  const removeExperience = (id: string) => onChange({ ...cvData, workExperience: cvData.workExperience.filter(e => e.id !== id) });
  const moveExperience = (from: number, to: number) => {
    const arr = [...cvData.workExperience];
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    onChange({ ...cvData, workExperience: arr });
  };

  // ── Education ──────────────────────────────────────────────
  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({ ...cvData, education: cvData.education.map(ed => ed.id === id ? { ...ed, [field]: value } : ed) });
  };
  const addEducation = () => onChange({ ...cvData, education: [...cvData.education, createEmptyEducation()] });
  const removeEducation = (id: string) => onChange({ ...cvData, education: cvData.education.filter(e => e.id !== id) });
  const moveEducation = (from: number, to: number) => {
    const arr = [...cvData.education];
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    onChange({ ...cvData, education: arr });
  };

  // ── Skills ─────────────────────────────────────────────────
  const addSkill = (name: string) => { if (!name.trim()) return; onChange({ ...cvData, skills: [...cvData.skills, createSkill(name)] }); };
  const removeSkill = (id: string) => onChange({ ...cvData, skills: cvData.skills.filter(s => s.id !== id) });
  const updateSkillLevel = (id: string, level: Skill["level"]) => {
    onChange({ ...cvData, skills: cvData.skills.map(s => s.id === id ? { ...s, level } : s) });
  };

  // ── Languages ──────────────────────────────────────────────
  const addLanguage = (name: string) => { if (!name.trim()) return; onChange({ ...cvData, languages: [...cvData.languages, createLanguage(name)] }); };
  const removeLanguage = (id: string) => onChange({ ...cvData, languages: cvData.languages.filter(l => l.id !== id) });
  const updateLanguageLevel = (id: string, level: Language["level"]) => {
    onChange({ ...cvData, languages: cvData.languages.map(l => l.id === id ? { ...l, level } : l) });
  };

  // ── Drag & Drop helpers ────────────────────────────────────
  const handleDragStart = (list: "experience" | "education", idx: number) => {
    dragItem.current = { list, idx };
  };
  const handleDragOver = (e: React.DragEvent, list: "experience" | "education", idx: number) => {
    e.preventDefault();
    setDragOver({ list, idx });
  };
  const handleDrop = (list: "experience" | "education", toIdx: number) => {
    if (!dragItem.current || dragItem.current.list !== list) return;
    const from = dragItem.current.idx;
    if (from === toIdx) { setDragOver(null); dragItem.current = null; return; }
    list === "experience" ? moveExperience(from, toIdx) : moveEducation(from, toIdx);
    setDragOver(null);
    dragItem.current = null;
  };

  // ── AI enhance ─────────────────────────────────────────────
  const enhanceWithAI = async (field: string, currentValue: string, extraCtx?: { role?: string; company?: string }, onSuccess?: (v: string) => void) => {
    if (!currentValue.trim()) { setAiError("Añade contenido antes de mejorar con IA."); setTimeout(() => setAiError(null), 3000); return; }
    setAiLoading(field); setAiError(null);
    try {
      const res = await fetch("/api/generate-ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ field, currentValue, context: { name: cvData.name, jobTitle: cvData.jobTitle }, ...extraCtx }) });
      if (!res.ok) throw new Error();
      const data = await res.json();
      onSuccess?.(data.enhanced);
    } catch { setAiError("Error al conectar con la IA. Verifica tu GROQ_API_KEY en .env.local"); setTimeout(() => setAiError(null), 4000); }
    finally { setAiLoading(null); }
  };

  // ── Helpers ────────────────────────────────────────────────
  const AIButton = ({ field, label = "IA Mejorar", onClick }: { field: string; label?: string; onClick: () => void }) => (
    <button type="button" onClick={onClick} disabled={aiLoading === field}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
      {aiLoading === field ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
      {aiLoading === field ? "Mejorando…" : label}
    </button>
  );

  const SectionHeader = ({ id, title, subtitle }: { id: Section; title: string; subtitle?: string }) => (
    <button type="button" onClick={() => toggleSection(id)} className="w-full flex items-center justify-between py-3 group">
      <div>
        <h3 className="font-medium text-sm text-ink-900 group-hover:text-ink-700 transition-colors">{title}</h3>
        {subtitle && <p className="text-xs text-ink-400 mt-0.5">{subtitle}</p>}
      </div>
      {openSections.has(id) ? <ChevronUp className="w-4 h-4 text-ink-300" /> : <ChevronDown className="w-4 h-4 text-ink-300" />}
    </button>
  );

  const AVAILABILITY_OPTIONS = ["Inmediata", "15 días", "1 mes", "2 meses", "3 meses"];
  const LICENSE_OPTIONS = ["A", "A1", "A2", "B", "B+E", "C", "C+E", "D"];

  return (
    <div className="space-y-1">
      {aiError && <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">{aiError}</div>}

      {/* ── Reset / Nuevo CV ── */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-ink-400 font-body">Tu CV se guarda automáticamente</p>
        {!showResetConfirm ? (
          <button type="button" onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border border-ink-200 text-ink-400 hover:border-red-300 hover:text-red-500 transition-colors">
            <RotateCcw className="w-3 h-3" /> Nuevo CV
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-ink-500">¿Seguro?</span>
            <button type="button" onClick={() => { onReset?.(); setShowResetConfirm(false); }}
              className="px-3 py-1 rounded-full text-xs bg-red-500 text-white hover:bg-red-600 transition-colors">Borrar todo</button>
            <button type="button" onClick={() => setShowResetConfirm(false)}
              className="px-3 py-1 rounded-full text-xs border border-ink-200 text-ink-400 hover:bg-ink-50 transition-colors">Cancelar</button>
          </div>
        )}
      </div>

      {/* ── Foto de perfil ── */}
      <div className="border border-ink-100 rounded-xl overflow-hidden">
        <div className="px-4 bg-ink-50"><SectionHeader id="photo" title="Foto de perfil" subtitle="Opcional · JPG, PNG hasta 3MB" /></div>
        {openSections.has("photo") && (
          <div className="px-4 pb-4">
            <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" id="photo-upload" />
            {cvData.photo ? (
              <div className="flex items-center gap-4">
                <img src={cvData.photo} alt="Foto de perfil" className="w-20 h-20 rounded-full object-cover border-2 border-ink-100" />
                <div className="flex flex-col gap-2">
                  <label htmlFor="photo-upload" className="btn-ghost text-xs px-4 py-2 cursor-pointer"><Camera className="w-3.5 h-3.5" /> Cambiar foto</label>
                  <button type="button" onClick={removePhoto} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs border border-red-200 text-red-400 hover:bg-red-50 transition-colors"><X className="w-3.5 h-3.5" /> Eliminar</button>
                </div>
              </div>
            ) : (
              <label htmlFor="photo-upload" className="flex flex-col items-center justify-center gap-2 w-full py-8 rounded-xl border-2 border-dashed border-ink-200 cursor-pointer hover:border-gold hover:bg-gold/5 transition-all">
                <div className="w-12 h-12 rounded-full bg-ink-100 flex items-center justify-center"><Upload className="w-5 h-5 text-ink-400" /></div>
                <p className="text-sm font-medium text-ink-500">Haz clic para subir tu foto</p>
                <p className="text-xs text-ink-300">JPG, PNG, WEBP · Máx. 3MB</p>
              </label>
            )}
          </div>
        )}
      </div>

      {/* ── Información personal ── */}
      <div className="border border-ink-100 rounded-xl overflow-hidden">
        <div className="px-4 bg-ink-50"><SectionHeader id="personal" title="Información personal" /></div>
        {openSections.has("personal") && (
          <div className="px-4 pb-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="section-label block mb-1.5">Nombre completo *</label><input className="input-field" placeholder="Ana García" value={cvData.name} onChange={e => updateField("name", e.target.value)} /></div>
              <div><label className="section-label block mb-1.5">Título profesional *</label><input className="input-field" placeholder="Diseñadora Senior" value={cvData.jobTitle} onChange={e => updateField("jobTitle", e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="section-label block mb-1.5">Email *</label><input type="email" className={`input-field ${cvData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cvData.email) ? "border-red-300 focus:border-red-400" : ""}`} placeholder="ana@email.com" value={cvData.email} onChange={e => updateField("email", e.target.value)} />
                  {cvData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cvData.email) && <p className="text-xs text-red-400 mt-1">Email no válido</p>}</div>
              <div><label className="section-label block mb-1.5">Teléfono</label><input type="tel" className="input-field" placeholder="+34 600 000 000" value={cvData.phone} onChange={e => updateField("phone", e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="section-label block mb-1.5">Ubicación</label><input className="input-field" placeholder="Madrid, España" value={cvData.location} onChange={e => updateField("location", e.target.value)} /></div>
              <div><label className="section-label block mb-1.5">Web / Portfolio</label><input type="url" className="input-field" placeholder="tuportfolio.com" value={cvData.website || ""} onChange={e => updateField("website", e.target.value)} /></div>
            </div>
            <div><label className="section-label block mb-1.5">LinkedIn</label><input className="input-field" placeholder="linkedin.com/in/anagarcia" value={cvData.linkedin || ""} onChange={e => updateField("linkedin", e.target.value)} /></div>
          </div>
        )}
      </div>

      {/* ── Resumen profesional ── */}
      <div className="border border-ink-100 rounded-xl overflow-hidden">
        <div className="px-4 bg-ink-50"><SectionHeader id="summary" title="Resumen profesional" subtitle="2-4 frases sobre tu perfil" /></div>
        {openSections.has("summary") && (
          <div className="px-4 pb-4 space-y-2">
            <div className="flex items-center justify-between mb-1">
              <label className="section-label">Resumen *</label>
              <AIButton field="summary" onClick={() => enhanceWithAI("summary", cvData.summary, undefined, v => updateField("summary", v))} />
            </div>
            <textarea className="textarea-field" rows={5} placeholder="Profesional con 8 años de experiencia en…" value={cvData.summary} onChange={e => updateField("summary", e.target.value)} />
          </div>
        )}
      </div>

      {/* ── Experiencia laboral ── */}
      <div className="border border-ink-100 rounded-xl overflow-hidden">
        <div className="px-4 bg-ink-50"><SectionHeader id="experience" title="Experiencia laboral" subtitle={`${cvData.workExperience.length} puesto${cvData.workExperience.length !== 1 ? "s" : ""} · arrastra para reordenar`} /></div>
        {openSections.has("experience") && (
          <div className="px-4 pb-4 space-y-4">
            {cvData.workExperience.map((exp, idx) => (
              <div key={exp.id}
                draggable
                onDragStart={() => handleDragStart("experience", idx)}
                onDragOver={(e) => handleDragOver(e, "experience", idx)}
                onDrop={() => handleDrop("experience", idx)}
                onDragEnd={() => { setDragOver(null); dragItem.current = null; }}
                className={`p-4 rounded-xl bg-ink-50 border space-y-3 transition-all ${dragOver?.list === "experience" && dragOver.idx === idx ? "border-gold bg-yellow-50/30 shadow-md" : "border-ink-100"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-3.5 h-3.5 text-ink-300 cursor-grab active:cursor-grabbing" />
                    <span className="section-label">Puesto {idx + 1}</span>
                  </div>
                  {cvData.workExperience.length > 1 && (
                    <button type="button" onClick={() => removeExperience(exp.id)} className="text-ink-300 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="section-label block mb-1">Empresa</label><input className="input-field" placeholder="Google" value={exp.company} onChange={e => updateExperience(exp.id, "company", e.target.value)} /></div>
                  <div><label className="section-label block mb-1">Cargo</label><input className="input-field" placeholder="Product Manager" value={exp.role} onChange={e => updateExperience(exp.id, "role", e.target.value)} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="section-label block mb-1">Fecha inicio</label><input type="month" className="input-field" value={exp.startDate} onChange={e => updateExperience(exp.id, "startDate", e.target.value)} /></div>
                  <div><label className="section-label block mb-1">Fecha fin</label><input type="month" className="input-field" value={exp.current ? "" : exp.endDate} disabled={exp.current} onChange={e => updateExperience(exp.id, "endDate", e.target.value)} /></div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={exp.current} onChange={e => updateExperience(exp.id, "current", e.target.checked)} className="rounded border-ink-300" />
                  <span className="text-sm text-ink-600">Trabajo aquí actualmente</span>
                </label>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="section-label">Descripción</label>
                    <AIButton field={`exp-${exp.id}`} onClick={() => enhanceWithAI("workExperience", exp.description, { role: exp.role, company: exp.company }, v => updateExperience(exp.id, "description", v))} />
                  </div>
                  <textarea className="textarea-field" rows={4} placeholder="Describe tus responsabilidades y logros…" value={exp.description} onChange={e => updateExperience(exp.id, "description", e.target.value)} />
                </div>
              </div>
            ))}
            <button type="button" onClick={addExperience} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-ink-200 text-sm text-ink-400 hover:border-gold hover:text-yellow-700 transition-colors">
              <Plus className="w-4 h-4" /> Añadir puesto
            </button>
          </div>
        )}
      </div>

      {/* ── Educación ── */}
      <div className="border border-ink-100 rounded-xl overflow-hidden">
        <div className="px-4 bg-ink-50"><SectionHeader id="education" title="Educación" subtitle={`${cvData.education.length} formación${cvData.education.length !== 1 ? "es" : ""} · arrastra para reordenar`} /></div>
        {openSections.has("education") && (
          <div className="px-4 pb-4 space-y-4">
            {cvData.education.map((ed, idx) => (
              <div key={ed.id}
                draggable
                onDragStart={() => handleDragStart("education", idx)}
                onDragOver={(e) => handleDragOver(e, "education", idx)}
                onDrop={() => handleDrop("education", idx)}
                onDragEnd={() => { setDragOver(null); dragItem.current = null; }}
                className={`p-4 rounded-xl bg-ink-50 border space-y-3 transition-all ${dragOver?.list === "education" && dragOver.idx === idx ? "border-gold bg-yellow-50/30 shadow-md" : "border-ink-100"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-3.5 h-3.5 text-ink-300 cursor-grab active:cursor-grabbing" />
                    <span className="section-label">Formación {idx + 1}</span>
                  </div>
                  {cvData.education.length > 1 && (
                    <button type="button" onClick={() => removeEducation(ed.id)} className="text-ink-300 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  )}
                </div>
                <div><label className="section-label block mb-1">Centro / Universidad</label><input className="input-field" placeholder="Universidad Complutense" value={ed.institution} onChange={e => updateEducation(ed.id, "institution", e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="section-label block mb-1">Titulación</label><input className="input-field" placeholder="Grado" value={ed.degree} onChange={e => updateEducation(ed.id, "degree", e.target.value)} /></div>
                  <div><label className="section-label block mb-1">Especialidad</label><input className="input-field" placeholder="Diseño Gráfico" value={ed.field} onChange={e => updateEducation(ed.id, "field", e.target.value)} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="section-label block mb-1">Inicio</label><input type="month" className="input-field" value={ed.startDate} onChange={e => updateEducation(ed.id, "startDate", e.target.value)} /></div>
                  <div><label className="section-label block mb-1">Fin</label><input type="month" className="input-field" value={ed.endDate} onChange={e => updateEducation(ed.id, "endDate", e.target.value)} /></div>
                </div>
                <div><label className="section-label block mb-1">Nota media (opcional)</label><input className="input-field" placeholder="8.5 / 10" value={ed.gpa || ""} onChange={e => updateEducation(ed.id, "gpa", e.target.value)} /></div>
              </div>
            ))}
            <button type="button" onClick={addEducation} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-ink-200 text-sm text-ink-400 hover:border-gold hover:text-yellow-700 transition-colors">
              <Plus className="w-4 h-4" /> Añadir formación
            </button>
          </div>
        )}
      </div>

      {/* ── Habilidades ── */}
      <div className="border border-ink-100 rounded-xl overflow-hidden">
        <div className="px-4 bg-ink-50"><SectionHeader id="skills" title="Habilidades" subtitle={`${cvData.skills.length} habilidad${cvData.skills.length !== 1 ? "es" : ""}`} /></div>
        {openSections.has("skills") && (
          <div className="px-4 pb-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="section-label">Skills</label>
              <AIButton field="skills" label="IA Sugerir skills" onClick={() => enhanceWithAI("skills", cvData.skills.map(s => s.name).join(", "), undefined, v => {
                const newSkills = v.split(",").map(s => s.trim()).filter(Boolean).map(name => createSkill(name));
                onChange({ ...cvData, skills: newSkills });
              })} />
            </div>
            {cvData.skills.length > 0 && (
              <div className="space-y-2">
                {cvData.skills.map(skill => (
                  <div key={skill.id} className="flex items-center gap-2 p-2 rounded-lg bg-ink-50 border border-ink-100">
                    <span className="text-sm text-ink-700 flex-1 font-medium">{skill.name}</span>
                    {/* Level selector as pill buttons */}
                    <div className="flex gap-1">
                      {SKILL_LEVELS.map(lvl => (
                        <button key={lvl} type="button" onClick={() => updateSkillLevel(skill.id, lvl)}
                          className={`px-2 py-0.5 rounded-full text-xs font-medium border transition-all ${skill.level === lvl ? "bg-ink-900 text-cream border-ink-900" : "bg-white border-ink-200 text-ink-400 hover:border-ink-400"}`}>
                          {SKILL_LEVEL_LABELS[lvl]}
                        </button>
                      ))}
                    </div>
                    <button type="button" onClick={() => removeSkill(skill.id)} className="text-ink-300 hover:text-red-400 transition-colors ml-1"><X className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
            )}
            <QuickInput onAdd={addSkill} placeholder="Escribe una habilidad y pulsa Enter…" />
          </div>
        )}
      </div>

      {/* ── Idiomas ── */}
      <div className="border border-ink-100 rounded-xl overflow-hidden">
        <div className="px-4 bg-ink-50"><SectionHeader id="languages" title="Idiomas" subtitle={`${cvData.languages.length} idioma${cvData.languages.length !== 1 ? "s" : ""}`} /></div>
        {openSections.has("languages") && (
          <div className="px-4 pb-4 space-y-3">
            {cvData.languages.length > 0 && (
              <div className="space-y-2">
                {cvData.languages.map(lang => (
                  <div key={lang.id} className="flex items-center gap-2">
                    <span className="text-sm text-ink-700 flex-1 font-medium">{lang.name}</span>
                    <select value={lang.level} onChange={e => updateLanguageLevel(lang.id, e.target.value as Language["level"])} className="input-field !py-1.5 !px-3 w-36 text-xs">
                      {["Básico", "Intermedio", "Avanzado", "Nativo"].map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                    <button type="button" onClick={() => removeLanguage(lang.id)} className="text-ink-300 hover:text-red-400 transition-colors"><X className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
            )}
            <QuickInput onAdd={addLanguage} placeholder="Ej: Inglés, Francés… y pulsa Enter" />
          </div>
        )}
      </div>

      {/* ── Otros datos de interés ── */}
      <div className="border border-ink-100 rounded-xl overflow-hidden">
        <div className="px-4 bg-ink-50"><SectionHeader id="extra" title="Otros datos de interés" subtitle="Disponibilidad, carné, voluntariado…" /></div>
        {openSections.has("extra") && (
          <div className="px-4 pb-4 space-y-4">
            <div>
              <label className="section-label block mb-1.5">Disponibilidad de incorporación</label>
              <div className="flex flex-wrap gap-2">
                {AVAILABILITY_OPTIONS.map(opt => (
                  <button key={opt} type="button" onClick={() => updateExtraInfo("availability", cvData.extraInfo.availability === opt ? "" : opt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${cvData.extraInfo.availability === opt ? "bg-ink-900 text-cream border-ink-900" : "bg-white border-ink-200 text-ink-500 hover:border-ink-400"}`}>
                    {opt}
                  </button>
                ))}
                <input className="input-field !py-1.5 !px-3 w-32 text-xs" placeholder="Otra…" value={AVAILABILITY_OPTIONS.includes(cvData.extraInfo.availability) ? "" : cvData.extraInfo.availability} onChange={e => updateExtraInfo("availability", e.target.value)} />
              </div>
            </div>
            <div>
              <label className="section-label block mb-1.5">Carné de conducir</label>
              <div className="flex flex-wrap gap-2">
                {LICENSE_OPTIONS.map(opt => (
                  <button key={opt} type="button" onClick={() => {
                    const current = cvData.extraInfo.drivingLicense.split(",").map(s => s.trim()).filter(Boolean);
                    const updated = current.includes(opt) ? current.filter(c => c !== opt) : [...current, opt];
                    updateExtraInfo("drivingLicense", updated.join(", "));
                  }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${cvData.extraInfo.drivingLicense.includes(opt) ? "bg-ink-900 text-cream border-ink-900" : "bg-white border-ink-200 text-ink-500 hover:border-ink-400"}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-ink-100 hover:border-ink-200 transition-colors">
                <input type="checkbox" checked={cvData.extraInfo.ownVehicle} onChange={e => updateExtraInfo("ownVehicle", e.target.checked)} className="rounded border-ink-300" />
                <span className="text-sm text-ink-700">Vehículo propio</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-ink-100 hover:border-ink-200 transition-colors">
                <input type="checkbox" checked={cvData.extraInfo.geographicMobility} onChange={e => updateExtraInfo("geographicMobility", e.target.checked)} className="rounded border-ink-300" />
                <span className="text-sm text-ink-700">Movilidad geográfica</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-ink-100 hover:border-ink-200 transition-colors">
                <input type="checkbox" checked={cvData.extraInfo.referencesAvailable} onChange={e => updateExtraInfo("referencesAvailable", e.target.checked)} className="rounded border-ink-300" />
                <span className="text-sm text-ink-700">Referencias disponibles</span>
              </label>
            </div>
            <div>
              <label className="section-label block mb-1.5">Voluntariado (opcional)</label>
              <input className="input-field" placeholder="Cruz Roja, 2021–2023" value={cvData.extraInfo.volunteering} onChange={e => updateExtraInfo("volunteering", e.target.value)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuickInput({ onAdd, placeholder }: { onAdd: (v: string) => void; placeholder: string }) {
  const [value, setValue] = useState("");
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && value.trim()) { e.preventDefault(); onAdd(value.trim()); setValue(""); }
  };
  return (
    <div className="flex gap-2">
      <input className="input-field flex-1" placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} onKeyDown={handleKey} />
      <button type="button" onClick={() => { if (value.trim()) { onAdd(value.trim()); setValue(""); } }} className="btn-ghost px-4"><Plus className="w-4 h-4" /></button>
    </div>
  );
}
