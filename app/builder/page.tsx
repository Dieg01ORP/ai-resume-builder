"use client";

import { useState, useEffect, useCallback } from "react";
import { CVForm } from "@/components/forms/CVForm";
import { CVPreview } from "@/components/CVPreview";
import { TemplateSelector } from "@/components/TemplateSelector";
import { ExportPanel } from "@/components/ExportPanel";
import { getDefaultCVData, loadCVFromStorage, saveCVToStorage } from "@/lib/utils";
import { CVData, TemplateId } from "@/types";
import { Sparkles, Eye, Download, ChevronLeft } from "lucide-react";
import Link from "next/link";

type ActiveTab = "form" | "preview" | "export";

export default function BuilderPage() {
  const [cvData, setCvData] = useState<CVData>(getDefaultCVData());
  const [activeTab, setActiveTab] = useState<ActiveTab>("form");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = loadCVFromStorage();
    if (saved) setCvData(saved);
    setIsLoaded(true);
  }, []);

  const handleCVChange = useCallback((data: CVData) => {
    setCvData(data);
    saveCVToStorage(data);
  }, []);

  const handleReset = useCallback(() => {
    const fresh = getDefaultCVData();
    setCvData(fresh);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cv-draft");
      localStorage.removeItem("cv-photo");
    }
  }, []);

  const handleTemplateChange = useCallback((templateId: TemplateId) => {
    setCvData(prev => {
      const updated = { ...prev, template: templateId };
      saveCVToStorage(updated);
      return updated;
    });
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setCvData(prev => {
      const updated = { ...prev, accentColor: color };
      saveCVToStorage(updated);
      return updated;
    });
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex items-center gap-3 text-ink-400">
          <Sparkles className="w-5 h-5 text-gold animate-pulse" />
          <span className="font-body">Cargando tu espacio de trabajo…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="h-14 bg-white border-b border-ink-100 flex items-center px-4 gap-4 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 text-ink-400 hover:text-ink-900 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="font-display font-bold text-ink-900 hidden sm:block">ResumeAI</span>
        </Link>

        <div className="h-5 w-px bg-ink-100" />

        {/* Mobile Tab Switcher */}
        <div className="flex items-center gap-1 lg:hidden ml-auto">
          {(["form", "preview", "export"] as ActiveTab[]).map((tab) => {
            const Icon = tab === "form" ? Sparkles : tab === "preview" ? Eye : Download;
            const labels: Record<ActiveTab, string> = { form: "Editar", preview: "Preview", export: "Exportar" };
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all ${activeTab === tab ? "bg-ink-900 text-cream" : "text-ink-400 hover:text-ink-700"}`}>
                <Icon className="w-3.5 h-3.5" />
                <span>{labels[tab]}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-2 text-xs font-body text-ink-300">
            <div className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
            Guardado automático
          </div>
          <button onClick={() => setActiveTab("export")}
            className="btn-gold text-xs px-4 py-2 flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Exportar PDF
          </button>
        </div>
      </header>

      {/* Main Builder Layout */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left Panel — Form */}
        <aside className={`w-full lg:w-[420px] xl:w-[480px] flex-shrink-0 bg-white border-r border-ink-100 overflow-y-auto custom-scroll ${activeTab !== "form" ? "hidden lg:block" : "block"}`}>
          <div className="p-6">
            <TemplateSelector
              selectedTemplate={cvData.template}
              selectedColor={cvData.accentColor}
              onTemplateChange={handleTemplateChange}
              onColorChange={handleColorChange}
            />
            <div className="my-6 border-t border-ink-100" />
            <CVForm cvData={cvData} onChange={handleCVChange} onReset={handleReset} />
          </div>
        </aside>

        {/* Right Panel */}
        <main className={`flex-1 overflow-y-auto custom-scroll bg-ink-50 ${activeTab === "form" ? "hidden lg:flex" : "flex"} flex-col items-center py-8 px-4 relative`}>

          {/* Export Panel — only visible on export tab */}
          {activeTab === "export" && (
            <div className="w-full max-w-2xl">
              <ExportPanel cvData={cvData} />
            </div>
          )}

          {/* CV Preview — always rendered so html2canvas can find id="cv-preview".
              When export tab is active we move it off-screen instead of unmounting. */}
          <div
            className="w-full max-w-[794px]"
            style={activeTab === "export" ? {
              position: "absolute",
              left: "-9999px",
              top: 0,
              width: "794px",
              pointerEvents: "none",
            } : {}}
          >
            {activeTab !== "export" && (
              <div className="flex items-center justify-between mb-4">
                <p className="section-label">Vista previa en tiempo real</p>
                <button
                  onClick={() => setActiveTab("export")}
                  className="btn-gold text-xs px-4 py-2 lg:flex hidden items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Exportar PDF
                </button>
              </div>
            )}
            <div className={activeTab !== "export" ? "shadow-2xl rounded-xl overflow-hidden" : ""}>
              <CVPreview cvData={cvData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
