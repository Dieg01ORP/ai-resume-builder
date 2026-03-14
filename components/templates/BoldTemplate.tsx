import { CVData } from "@/types";
import { formatDate } from "@/lib/utils";

interface TemplateProps { cvData: CVData; }

// Bold: full-color header banner, name oversized, maximum visual impact
export function BoldTemplate({ cvData }: TemplateProps) {
  const accent = cvData.accentColor;
  const extra = cvData.extraInfo;
  const chips: string[] = [];
  if (extra.availability) chips.push(`Disponibilidad: ${extra.availability}`);
  if (extra.drivingLicense) chips.push(`Carné ${extra.drivingLicense}`);
  if (extra.ownVehicle) chips.push("Vehículo propio");
  if (extra.geographicMobility) chips.push("Movilidad geográfica");
  if (extra.referencesAvailable) chips.push("Referencias disponibles");
  if (extra.volunteering) chips.push(`Voluntariado: ${extra.volunteering}`);

  const levelPct: Record<string, number> = { Beginner: 25, Intermediate: 55, Advanced: 80, Expert: 100 };

  return (
    <div style={{ fontFamily: "'DM Sans', Arial, sans-serif", minHeight: "1122px", backgroundColor: "#FAFAFA" }}>

      {/* ── HERO BANNER ── */}
      <header style={{ backgroundColor: "#1E1B4B", padding: "0", position: "relative", overflow: "hidden" }}>
        {/* Geometric decorations */}
        <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "180px", height: "180px", borderRadius: "50%", backgroundColor: `${accent}22`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20px", left: "200px", width: "120px", height: "120px", borderRadius: "50%", backgroundColor: `${accent}15`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", backgroundColor: accent }} />

        <div style={{ padding: "36px 44px 32px", position: "relative", display: "flex", gap: "24px", alignItems: "flex-start" }}>
          {cvData.photo && (
            <div style={{ width: "96px", height: "96px", borderRadius: "8px", overflow: "hidden", border: `3px solid ${accent}`, flexShrink: 0 }}>
              <img src={cvData.photo} alt="Foto" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "44px", fontWeight: 900, color: "#FFFFFF", margin: "0 0 4px", letterSpacing: "-0.03em", lineHeight: 1.0, fontFamily: "'DM Sans', Arial, sans-serif" }}>
              {cvData.name || "Tu Nombre"}
            </h1>
            <p style={{ fontSize: "13px", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 18px" }}>
              {cvData.jobTitle || "Título profesional"}
            </p>
            {/* Contact pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {[cvData.email, cvData.phone, cvData.location, cvData.linkedin, cvData.website].filter(Boolean).map((item, i) => (
                <span key={i} style={{ fontSize: "10px", color: "#CBD5E1", backgroundColor: "rgba(255,255,255,0.08)", padding: "3px 10px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.12)" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── BODY: 2 columns ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: "0", minHeight: "calc(1122px - 180px)" }}>

        {/* Left main */}
        <div style={{ padding: "32px 36px 32px 44px", display: "flex", flexDirection: "column", gap: "22px", borderRight: "1px solid #E5E7EB" }}>

          {cvData.summary && (
            <BoldSection title="Perfil" accent={accent}>
              <p style={{ fontSize: "12.5px", color: "#374151", lineHeight: 1.8, margin: 0 }}>{cvData.summary}</p>
            </BoldSection>
          )}

          {cvData.workExperience.some(e => e.company || e.role) && (
            <BoldSection title="Experiencia" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {cvData.workExperience.filter(e => e.company || e.role).map((exp, idx) => (
                  <div key={exp.id} style={{ backgroundColor: idx === 0 ? `${accent}08` : "transparent", borderRadius: "8px", padding: idx === 0 ? "12px 14px" : "0", border: idx === 0 ? `1px solid ${accent}22` : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                      <p style={{ fontWeight: 800, fontSize: "13px", color: "#111827", margin: 0 }}>{exp.role}</p>
                      <span style={{ fontSize: "10px", color: "#9CA3AF", whiteSpace: "nowrap", marginLeft: "10px" }}>
                        {formatDate(exp.startDate)}{exp.startDate ? " – " : ""}{exp.current ? "Presente" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p style={{ fontSize: "11.5px", color: accent, fontWeight: 700, margin: "0 0 6px" }}>{exp.company}</p>
                    {exp.description && exp.description.split("\n").filter(Boolean).map((line, i) => (
                      <div key={i} style={{ display: "flex", gap: "7px", marginBottom: "2px" }}>
                        <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: accent, flexShrink: 0, marginTop: "5px" }} />
                        <p style={{ fontSize: "11px", color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{line.replace(/^•\s*/, "")}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </BoldSection>
          )}

          {cvData.education.some(e => e.institution) && (
            <BoldSection title="Educación" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {cvData.education.filter(e => e.institution).map(ed => (
                  <div key={ed.id} style={{ display: "flex", gap: "12px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: accent, flexShrink: 0, marginTop: "5px" }} />
                    <div>
                      <p style={{ fontWeight: 700, fontSize: "12px", color: "#111827", margin: 0 }}>{ed.institution}</p>
                      <p style={{ fontSize: "11px", color: "#6B7280", margin: "1px 0 0" }}>
                        {ed.degree}{ed.field ? ` · ${ed.field}` : ""}{ed.gpa ? ` · ${ed.gpa}` : ""}
                        {(ed.startDate || ed.endDate) && <span style={{ color: "#9CA3AF" }}> · {formatDate(ed.startDate)}{ed.endDate ? `–${formatDate(ed.endDate)}` : ""}</span>}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </BoldSection>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ padding: "32px 28px", backgroundColor: "#F9FAFB", display: "flex", flexDirection: "column", gap: "22px" }}>

          {cvData.skills.length > 0 && (
            <BoldSide title="Habilidades" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {cvData.skills.map(skill => (
                  <div key={skill.id}>
                    <p style={{ fontSize: "10.5px", color: "#374151", margin: "0 0 3px", fontWeight: 600 }}>{skill.name}</p>
                    <div style={{ height: "4px", backgroundColor: "#E5E7EB", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${levelPct[skill.level] ?? 50}%`, height: "100%", backgroundColor: accent, borderRadius: "3px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </BoldSide>
          )}

          {cvData.languages.length > 0 && (
            <BoldSide title="Idiomas" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                {cvData.languages.map(lang => (
                  <div key={lang.id}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p style={{ fontSize: "10.5px", color: "#374151", fontWeight: 600, margin: 0 }}>{lang.name}</p>
                      <p style={{ fontSize: "9px", color: "#9CA3AF", margin: 0 }}>{lang.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            </BoldSide>
          )}

          {chips.length > 0 && (
            <BoldSide title="Otros datos" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {chips.map((chip, i) => (
                  <p key={i} style={{ fontSize: "9.5px", color: "#6B7280", margin: 0 }}>{chip}</p>
                ))}
              </div>
            </BoldSide>
          )}
        </div>
      </div>
    </div>
  );
}

function BoldSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
        <div style={{ width: "16px", height: "3px", backgroundColor: accent, borderRadius: "2px" }} />
        <h2 style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em", color: "#111827", margin: 0 }}>{title}</h2>
        <div style={{ flex: 1, height: "0.5px", backgroundColor: "#E5E7EB" }} />
      </div>
      {children}
    </div>
  );
}

function BoldSide({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ fontSize: "8.5px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em", color: accent, margin: "0 0 10px", borderBottom: `1.5px solid ${accent}33`, paddingBottom: "6px" }}>{title}</p>
      {children}
    </div>
  );
}
