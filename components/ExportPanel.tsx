"use client";

import { useState } from "react";
import { CVData } from "@/types";
import { exportToPDF, generateFilename } from "@/lib/pdf";
import { validateCVData } from "@/lib/utils";
import { TEMPLATES } from "@/lib/templates";
import { Download, AlertCircle, CheckCircle, Loader2, FileText, Clock, Layout } from "lucide-react";

interface ExportPanelProps { cvData: CVData; }

const EXPORT_STEPS = [
  "Preparando fuentes…",
  "Renderizando diseño…",
  "Generando alta resolución…",
  "Creando PDF…",
];

export function ExportPanel({ cvData }: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stepIdx, setStepIdx] = useState(0);

  const { valid, errors } = validateCVData(cvData);
  const filename = generateFilename(cvData.name);
  const currentTemplate = TEMPLATES.find(t => t.id === cvData.template) || TEMPLATES[0];

  const handleExport = async () => {
    if (!valid) return;
    setIsExporting(true);
    setError(null);
    setExported(false);
    setStepIdx(0);

    const stepInterval = setInterval(() => {
      setStepIdx(prev => Math.min(prev + 1, EXPORT_STEPS.length - 1));
    }, 600);

    try {
      await exportToPDF("cv-preview", filename);
      clearInterval(stepInterval);
      setExported(true);
      setTimeout(() => setExported(false), 5000);
    } catch (err) {
      clearInterval(stepInterval);
      setError("Error al generar el PDF. Inténtalo de nuevo.");
      console.error("[PDF Export Error]:", err);
    } finally {
      setIsExporting(false);
      setStepIdx(0);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-1">Exportar CV</h2>
        <p className="font-body text-sm text-ink-400">Descarga tu CV en PDF listo para enviar.</p>
      </div>

      {/* Validation errors */}
      {!valid && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-body font-semibold text-sm text-amber-800 mb-2">Completa estos campos antes de exportar:</p>
              <ul className="space-y-1">
                {errors.map(err => <li key={err} className="font-body text-xs text-amber-700">· {err}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Template + file info */}
      <div className="p-5 rounded-2xl bg-white border border-ink-100">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-ink-900 flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-gold" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body font-semibold text-ink-900 truncate">{filename}</p>
            <p className="font-body text-xs text-ink-400 mt-0.5">PDF · A4 · Alta resolución (2×)</p>
          </div>
        </div>

        {/* Active template badge */}
        <div className="flex items-center gap-2 mb-5 p-3 rounded-xl bg-ink-50 border border-ink-100">
          <Layout className="w-4 h-4 text-ink-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-body text-xs text-ink-400">Plantilla activa</p>
            <p className="font-body text-sm font-semibold text-ink-900">{currentTemplate.name}</p>
          </div>
          <div
            className="w-5 h-5 rounded-full border-2 border-white shadow-sm flex-shrink-0"
            style={{ backgroundColor: cvData.accentColor }}
          />
        </div>

        {/* CV data summary */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Experiencias", val: cvData.workExperience.filter(e => e.company || e.role).length },
            { label: "Habilidades", val: cvData.skills.length },
            { label: "Idiomas", val: cvData.languages.length },
          ].map(({ label, val }) => (
            <div key={label} className="p-3 rounded-xl bg-ink-50 text-center">
              <p className="font-display text-xl font-bold text-ink-900">{val}</p>
              <p className="font-body text-xs text-ink-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Progress */}
        {isExporting && (
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <p className="text-xs font-body text-ink-500">{EXPORT_STEPS[stepIdx]}</p>
              <p className="text-xs font-body text-ink-300">{Math.round(((stepIdx + 1) / EXPORT_STEPS.length) * 100)}%</p>
            </div>
            <div className="h-1.5 bg-ink-100 rounded-full overflow-hidden">
              <div className="h-full bg-ink-900 rounded-full transition-all duration-500"
                style={{ width: `${((stepIdx + 1) / EXPORT_STEPS.length) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Export button */}
        <button onClick={handleExport} disabled={!valid || isExporting}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-body font-semibold text-sm transition-all duration-200 bg-ink-900 text-cream hover:bg-ink-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2">
          {isExporting ? <><Loader2 className="w-4 h-4 animate-spin" /> Generando PDF…</>
            : exported ? <><CheckCircle className="w-4 h-4 text-sage" /> ¡Descargado con éxito!</>
            : <><Download className="w-4 h-4" /> Descargar PDF</>}
        </button>

        {error && <p className="mt-3 text-xs text-red-500 font-body text-center">{error}</p>}
        {exported && <p className="mt-3 text-xs text-center font-body text-ink-400">¿No se descargó? Comprueba que tu navegador no bloqueó el archivo.</p>}
      </div>

      {/* Tips */}
      <div className="p-4 rounded-xl bg-ink-50 border border-ink-100">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-3.5 h-3.5 text-ink-400" />
          <p className="font-body font-semibold text-xs text-ink-600">Consejos para mejor resultado</p>
        </div>
        <ul className="space-y-1.5">
          {[
            "Usa Chrome o Edge para la mejor calidad de PDF",
            "El PDF refleja exactamente lo que ves en la vista previa",
            "Puedes exportar tantas veces como necesites",
            "Si el texto sale sin espacios, espera 2s y vuelve a intentarlo",
          ].map(tip => <li key={tip} className="font-body text-xs text-ink-400">· {tip}</li>)}
        </ul>
      </div>
    </div>
  );
}
