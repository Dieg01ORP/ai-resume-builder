"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FileText, Download, Zap, Star, CheckCircle, Brain } from "lucide-react";
import { TEMPLATES } from "@/lib/templates";
import { Template } from "@/types";

// ── Mini SVG preview (reutiliza lógica del TemplateSelector) ──
function TemplateMiniPreview({ template }: { template: Template }) {
  const bg = template.previewBg;
  const ac = template.previewAccent;

  switch (template.previewLayout) {
    case "sidebar-left":
      return (
        <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <rect width="60" height="80" fill="#fff" />
          <rect x="0" y="0" width="20" height="80" fill={bg} />
          <circle cx="10" cy="14" r="6" fill={ac} opacity="0.3" /><circle cx="10" cy="14" r="4" fill={ac} opacity="0.5" />
          <rect x="3" y="23" width="5" height="1.5" rx="0.5" fill={ac} opacity="0.9" />
          <rect x="3" y="27" width="14" height="1" rx="0.5" fill="white" opacity="0.3" />
          <rect x="3" y="35" width="14" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          {[0,1,2,3].map(i => <g key={i}><rect x="3" y={41+i*5} width="14" height="1" rx="0.5" fill="white" opacity="0.15" /><rect x="3" y={41+i*5} width={14*(0.3+i*0.2)} height="1" rx="0.5" fill={ac} opacity="0.7" /></g>)}
          <rect x="24" y="8" width="22" height="3" rx="1" fill="#111827" opacity="0.8" />
          <rect x="24" y="13" width="16" height="1.5" rx="0.5" fill={ac} opacity="0.7" />
          <rect x="24" y="19" width="6" height="1.5" rx="0.5" fill={ac} opacity="0.6" />
          <rect x="24" y="23" width="32" height="1" rx="0.5" fill="#9CA3AF" opacity="0.4" />
          {[0,1,2].map(i => <g key={i}><circle cx="25.5" cy={30+i*9} r="2" fill={i===0?ac:"#CBD5E1"} /><rect x="29" y={29+i*9} width="20" height="1.5" rx="0.5" fill="#111827" opacity={0.7-i*0.1} /><rect x="29" y={32+i*9} width="14" height="1" rx="0.5" fill={ac} opacity="0.4" /></g>)}
        </svg>
      );
    case "sidebar-right":
      return (
        <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <rect width="60" height="80" fill="#fff" />
          <rect x="40" y="0" width="20" height="80" fill={bg} />
          <rect x="4" y="6" width="24" height="3.5" rx="1" fill="#0F172A" opacity="0.85" />
          <rect x="4" y="12" width="16" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          <rect x="4" y="22" width="10" height="1.5" rx="0.5" fill="#1E293B" opacity="0.7" />
          {[0,1,2].map(i => <g key={i}><circle cx="5.5" cy={28+i*11} r="2" fill={i===0?ac:"#CBD5E1"} />{i<2&&<rect x="5" y={30+i*11} width="1" height="9" rx="0.5" fill="#E2E8F0"/>}<rect x="10" y={27+i*11} width="22" height="1.5" rx="0.5" fill="#0F172A" opacity={0.7-i*0.1}/><rect x="10" y={30+i*11} width="16" height="1" rx="0.5" fill={ac} opacity={0.5}/></g>)}
          <circle cx="50" cy="12" r="5" fill={ac} opacity="0.25" /><circle cx="50" cy="12" r="3" fill={ac} opacity="0.4" />
          <rect x="43" y="22" width="14" height="1.5" rx="0.5" fill={ac} opacity="0.7" />
          {[0,1,2,3].map(i => <g key={i}><rect x="43" y={27+i*5} width="14" height="1" rx="0.5" fill="#E5E7EB"/><rect x="43" y={27+i*5} width={14*(0.3+i*0.18)} height="1" rx="0.5" fill={ac} opacity="0.6"/></g>)}
        </svg>
      );
    case "banner":
      return (
        <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <rect width="60" height="80" fill="#FAFAFA" />
          <rect x="0" y="0" width="60" height="26" fill="#1E1B4B" />
          <rect x="0" y="0" width="60" height="2.5" fill={ac} />
          <rect x="6" y="7" width="36" height="5" rx="1.5" fill="white" opacity="0.9" />
          <rect x="6" y="15" width="22" height="2" rx="0.5" fill={ac} opacity="0.8" />
          <rect x="0" y="26" width="40" height="54" fill="white" />
          <rect x="40" y="26" width="20" height="54" fill="#F9FAFB" />
          <rect x="5" y="31" width="8" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          <rect x="5" y="35" width="30" height="1" rx="0.5" fill="#9CA3AF" opacity="0.5" />
          {[0,1].map(i => <g key={i}><rect x="5" y={44+i*9} width="24" height="1.5" rx="0.5" fill="#111827" opacity="0.7"/><rect x="5" y={47+i*9} width="16" height="1" rx="0.5" fill={ac} opacity="0.5"/></g>)}
          <rect x="42" y="30" width="15" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          {[0,1,2,3].map(i => <g key={i}><rect x="42" y={36+i*6} width="15" height="1" rx="0.5" fill="#E5E7EB"/><rect x="42" y={36+i*6} width={15*(0.35+i*0.17)} height="1" rx="0.5" fill={ac} opacity="0.65"/></g>)}
        </svg>
      );
    case "split-top":
      return (
        <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <rect width="60" height="80" fill={bg} />
          <rect x="0" y="0" width="60" height="2.5" fill={ac} />
          <rect x="0" y="2.5" width="44" height="22" fill={bg} />
          <rect x="44" y="2.5" width="16" height="22" fill={`${ac}22`} />
          <rect x="5" y="8" width="26" height="4" rx="1" fill="#1C1410" opacity="0.85" />
          <rect x="5" y="14.5" width="24" height="1" rx="0.5" fill={ac} opacity="0.7" />
          <rect x="0" y="24.5" width="60" height="0.5" fill={ac} opacity="0.4" />
          <rect x="0" y="25" width="38" height="55" fill={bg} />
          {[0,1].map(i=><g key={i}><rect x="5" y={30+i*14} width="8" height="1.5" rx="0.5" fill={ac} opacity="0.8"/><rect x="5" y={33+i*14} width="0.8" height="9" rx="0.3" fill={ac} opacity="0.6"/><rect x="8" y={34+i*14} width="22" height="1.5" rx="0.5" fill="#1C1410" opacity="0.7"/><rect x="8" y={37+i*14} width="24" height="1" rx="0.5" fill="#9B8B7A" opacity="0.4"/></g>)}
          <rect x="41" y="29" width="17" height="1.5" rx="0.5" fill={ac} opacity="0.7" />
          {[0,1,2,3,4].map(i=><g key={i}><circle cx="42.5" cy={35+i*5} r="1" fill={ac} opacity="0.4"/><rect x="45" y={34.5+i*5} width="12" height="1" rx="0.5" fill="#9B8B7A" opacity="0.5"/></g>)}
        </svg>
      );
    case "two-col-header":
      return (
        <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <rect width="60" height="80" fill="#fff" />
          <rect x="0" y="0" width="60" height="17" fill="#1F2937" />
          <rect x="0" y="17" width="60" height="2" fill={ac} />
          <rect x="5" y="4" width="20" height="3" rx="1" fill="white" opacity="0.9" />
          <rect x="5" y="9" width="14" height="1.5" rx="0.5" fill={ac} opacity="0.9" />
          <rect x="37" y="5" width="18" height="1" rx="0.5" fill="white" opacity="0.3" /><rect x="37" y="8" width="16" height="1" rx="0.5" fill="white" opacity="0.25" /><rect x="37" y="11" width="18" height="1" rx="0.5" fill="white" opacity="0.2" />
          <rect x="0" y="19" width="40" height="61" fill="white" />
          <rect x="40" y="19" width="20" height="61" fill="#F9FAFB" />
          {[0,1].map(i=><g key={i}><rect x="4" y={24+i*13} width="3" height="8" rx="0.5" fill={i===0?ac:"#E2E8F0"} opacity="0.7"/><rect x="9" y={25+i*13} width="24" height="1.5" rx="0.5" fill="#111827" opacity={0.7-i*0.1}/><rect x="9" y={28+i*13} width="16" height="1" rx="0.5" fill={ac} opacity={0.5}/><rect x="9" y={31+i*13} width="26" height="1" rx="0.5" fill="#9CA3AF" opacity="0.4"/></g>)}
          <rect x="42" y="22" width="15" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          {[0,1,2].map(i=><rect key={i} x="42" y={26+i*3.5} width="15" height="2" rx="1" fill={ac} opacity="0.12"/>)}
        </svg>
      );
    default: // full-width
      return (
        <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <rect width="60" height="80" fill={bg === "#FAFAF8" ? "#FAFAF8" : bg} />
          <rect x="0" y="0" width="60" height="22" fill={bg === "#FAFAF8" || bg === "#FFFFFF" ? "#0D0D0D" : bg} />
          <rect x="7" y="6" width="28" height="3" rx="1" fill="white" opacity="0.9" />
          <rect x="7" y="11" width="18" height="1.5" rx="0.5" fill={ac} opacity="0.9" />
          <rect x="7" y="15" width="40" height="1" rx="0.5" fill="white" opacity="0.3" />
          <rect x="7" y="27" width="8" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          <rect x="7" y="31" width="46" height="1" rx="0.5" fill="#9CA3AF" opacity="0.5" />
          <rect x="7" y="33" width="40" height="1" rx="0.5" fill="#9CA3AF" opacity="0.4" />
          <rect x="7" y="41" width="10" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          <rect x="3" y="45" width="3" height="10" rx="0.5" fill={ac} opacity="0.7" />
          {[0,1,2].map(i=><g key={i}><rect x="9" y={46+i*5} width="34" height="1" rx="0.5" fill="#9CA3AF" opacity="0.5"/><rect x="9" y={48+i*5} width={28+i*3} height="1" rx="0.5" fill="#9CA3AF" opacity="0.35"/></g>)}
          <rect x="7" y="65" width="12" height="4" rx="2" fill={ac} opacity="0.15" />
          <rect x="21" y="65" width="12" height="4" rx="2" fill={ac} opacity="0.15" />
          <rect x="35" y="65" width="12" height="4" rx="2" fill={ac} opacity="0.15" />
        </svg>
      );
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream overflow-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-cream/80 backdrop-blur-sm border-b border-ink-100/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-ink-900 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
            <span className="font-display font-bold text-lg text-ink-900">ResumeAI</span>
          </div>
          <Link href="/builder" className="btn-primary text-sm">
            Crear mi CV <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gold/30 text-sm font-body text-ink-500 mb-8"
          >
            <Brain className="w-3.5 h-3.5 text-gold" />
            <span>Impulsado por Meta Llama 3.1 · Gratis</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-ink-900 leading-tight mb-6 text-balance"
          >
            Tu trabajo ideal empieza
            <br />
            <span className="text-gradient">con un CV perfecto</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-xl text-ink-400 max-w-2xl mx-auto mb-12 text-balance"
          >
            Crea CVs profesionales con IA. Elige entre 8 plantillas diseñadas por expertos,
            mejora tu contenido con un clic y descarga tu PDF listo para enviar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Link href="/builder" className="btn-gold text-base px-8 py-4">
              <Sparkles className="w-4 h-4" />
              Crear mi CV gratis
            </Link>
            <span className="font-body text-sm text-ink-300">Sin registro · Sin tarjeta</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-1 mt-12"
          >
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-gold fill-gold" />)}
            <span className="font-body text-sm text-ink-400 ml-2">
              Usado por <strong className="text-ink-700">12.400+</strong> candidatos
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-6 bg-ink-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label text-ink-400 mb-3">Por qué ResumeAI</p>
            <h2 className="font-display text-4xl font-bold text-cream">Todo lo que necesitas para conseguir el trabajo</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-ink-800 border border-ink-700 hover:border-gold/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                  <f.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-xl font-bold text-cream mb-3">{f.title}</h3>
                <p className="font-body text-ink-300 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES SHOWCASE ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Plantillas</p>
            <h2 className="font-display text-4xl font-bold text-ink-900">
              8 diseños profesionales para elegir
            </h2>
            <p className="font-body text-ink-400 mt-3 max-w-xl mx-auto">
              Desde minimalista hasta impactante. Cada plantilla optimizada para pasar los sistemas ATS.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TEMPLATES.map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group cursor-pointer"
              >
                <Link href="/builder">
                  <div className="aspect-[3/4] rounded-xl mb-3 border-2 border-ink-100 group-hover:border-gold group-hover:shadow-lg group-hover:shadow-gold/10 transition-all duration-200 overflow-hidden relative bg-white">
                    <TemplateMiniPreview template={template} />
                    <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/5 transition-colors" />
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                  <p className="font-body font-semibold text-sm text-ink-800 group-hover:text-ink-900">{template.name}</p>
                  <p className="font-body text-xs text-ink-400 mt-0.5 leading-snug">{template.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/builder" className="btn-gold text-sm px-8 py-3">
              <Sparkles className="w-4 h-4" />
              Empezar con mi plantilla favorita
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Proceso</p>
            <h2 className="font-display text-4xl font-bold text-ink-900">Listo en 3 pasos simples</h2>
          </div>
          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="flex items-start gap-6 p-6 rounded-2xl hover:bg-cream transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 border-2 border-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xl font-bold text-gold">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink-900 mb-2">{step.title}</h3>
                  <p className="font-body text-ink-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF / CHECKLIST ── */}
      <section className="py-24 px-6 bg-ink-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-cream mb-4">
              Todo incluido. Completamente gratis.
            </h2>
            <p className="font-body text-ink-300 text-lg">Sin suscripciones. Sin marcas de agua. Sin sorpresas.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {CHECKLIST.map((item) => (
              <div key={item} className="flex items-center gap-3 text-ink-200">
                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="font-body text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-5xl font-bold text-ink-900 mb-6 text-balance">
            Empieza a crear tu CV hoy
          </h2>
          <p className="font-body text-xl text-ink-400 mb-10">
            Gratis para siempre. Sin tarjeta de crédito.
          </p>
          <Link href="/builder" className="btn-gold text-base px-10 py-4">
            <Sparkles className="w-5 h-5" />
            Crear mi CV ahora — Es gratis
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-ink-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-ink-900 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-gold" />
            </div>
            <span className="font-display font-bold text-ink-900">ResumeAI</span>
          </div>
          <p className="font-body text-sm text-ink-400">
            Construido con Next.js · IA por Meta Llama 3.1 via Groq
          </p>
        </div>
      </footer>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Brain,
    title: "IA que escribe por ti",
    description: "Meta Llama 3.1 analiza tu experiencia y la transforma en contenido profesional, optimizado para pasar los filtros ATS automáticamente.",
  },
  {
    icon: FileText,
    title: "Vista previa en tiempo real",
    description: "Ve exactamente cómo queda tu CV mientras escribes. Cambia de plantilla al instante sin perder ningún dato.",
  },
  {
    icon: Download,
    title: "Exportación PDF perfecta",
    description: "Descarga un PDF de alta resolución listo para enviar a empresas. El resultado es exactamente lo que ves en pantalla.",
  },
  {
    icon: Zap,
    title: "8 plantillas profesionales",
    description: "Executive, Minimal, Creative, Classic, Nordic, Bold, Elegant y Compact. Una para cada sector e industria.",
  },
  {
    icon: Star,
    title: "Optimizado para ATS",
    description: "Todas las plantillas están diseñadas para superar los sistemas de seguimiento de candidatos usados por el 99% de las empresas.",
  },
  {
    icon: CheckCircle,
    title: "Guardado automático",
    description: "Tu borrador se guarda automáticamente en tu navegador. Vuelve cuando quieras y sigue donde lo dejaste.",
  },
];

const STEPS = [
  {
    title: "Rellena tus datos",
    description: "Introduce tu información personal, experiencia laboral, educación y habilidades. Nuestro formulario inteligente te guía por cada sección.",
  },
  {
    title: "Deja que la IA mejore tu contenido",
    description: "Haz clic en el botón de IA en cualquier sección. Llama 3.1 reescribe tu experiencia en lenguaje profesional y convincente al instante.",
  },
  {
    title: "Elige plantilla y descarga",
    description: "Cambia entre las 8 plantillas, personaliza el color de acento, previsualiza en tiempo real y descarga tu PDF profesional.",
  },
];

const CHECKLIST = [
  "8 plantillas profesionales incluidas",
  "IA de Meta Llama 3.1 para mejorar el texto",
  "Exportación PDF de alta calidad",
  "Vista previa en tiempo real",
  "Sin marcas de agua en el PDF",
  "Guardado automático en el navegador",
  "Sin registro ni cuenta requerida",
  "100% gratuito para siempre",
];
