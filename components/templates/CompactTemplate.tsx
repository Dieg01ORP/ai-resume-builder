import { CVData } from "@/types";
import { formatDate } from "@/lib/utils";

interface TemplateProps { cvData: CVData; }

// Compact: dense two-column layout, maximum info per page, small but readable
export function CompactTemplate({ cvData }: TemplateProps) {
  const accent = cvData.accentColor;
  const extra = cvData.extraInfo;
  const chips: string[] = [];
  if (extra.availability) chips.push(`Disponibilidad: ${extra.availability}`);
  if (extra.drivingLicense) chips.push(`Carné ${extra.drivingLicense}`);
  if (extra.ownVehicle) chips.push("Vehículo propio");
  if (extra.geographicMobility) chips.push("Movilidad geográfica");
  if (extra.referencesAvailable) chips.push("Referencias disponibles");
  if (extra.volunteering) chips.push(`Voluntariado: ${extra.volunteering}`);

  return (
    <div style={{ fontFamily: "'DM Sans', Arial, sans-serif", minHeight: "1122px", backgroundColor: "#FFFFFF" }}>

      {/* ── HEADER: full-width compact bar ── */}
      <header style={{ backgroundColor: "#1F2937", padding: "20px 36px 18px", borderBottom: `3px solid ${accent}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            {cvData.photo && (
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", overflow: "hidden", border: `2px solid ${accent}`, flexShrink: 0 }}>
                <img src={cvData.photo} alt="Foto" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            )}
            <div>
              <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#F9FAFB", margin: "0 0 2px", letterSpacing: "-0.02em", lineHeight: 1.1, fontFamily: "'DM Sans', Arial, sans-serif" }}>
                {cvData.name || "Tu Nombre"}
              </h1>
              <p style={{ fontSize: "10px", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>
                {cvData.jobTitle || "Título profesional"}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "flex-end" }}>
            {[cvData.email, cvData.phone, cvData.location, cvData.linkedin, cvData.website].filter(Boolean).map((item, i) => (
              <p key={i} style={{ fontSize: "9.5px", color: "#9CA3AF", margin: 0 }}>{item}</p>
            ))}
          </div>
        </div>
      </header>

      {/* ── BODY: two columns ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 196px", minHeight: "calc(1122px - 100px)" }}>

        {/* Left main — wider */}
        <div style={{ padding: "24px 28px 24px 36px", display: "flex", flexDirection: "column", gap: "18px", borderRight: `2px solid ${accent}22` }}>

          {cvData.summary && (
            <CompSection title="Resumen" accent={accent}>
              <p style={{ fontSize: "11.5px", color: "#374151", lineHeight: 1.7, margin: 0 }}>{cvData.summary}</p>
            </CompSection>
          )}

          {cvData.workExperience.some(e => e.company || e.role) && (
            <CompSection title="Experiencia Profesional" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {cvData.workExperience.filter(e => e.company || e.role).map(exp => (
                  <div key={exp.id} style={{ paddingBottom: "10px", borderBottom: "0.5px solid #F3F4F6" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <p style={{ fontWeight: 700, fontSize: "12px", color: "#111827", margin: 0 }}>{exp.role}</p>
                      <span style={{ fontSize: "9px", color: "#9CA3AF", whiteSpace: "nowrap", marginLeft: "8px" }}>
                        {formatDate(exp.startDate)}{exp.startDate ? "–" : ""}{exp.current ? "Hoy" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p style={{ fontSize: "10.5px", color: accent, fontWeight: 600, margin: "1px 0 4px" }}>{exp.company}</p>
                    {exp.description && exp.description.split("\n").filter(Boolean).map((line, i) => (
                      <div key={i} style={{ display: "flex", gap: "5px", marginBottom: "1px" }}>
                        <span style={{ color: accent, fontSize: "8px", flexShrink: 0, marginTop: "3px" }}>■</span>
                        <p style={{ fontSize: "10.5px", color: "#6B7280", lineHeight: 1.55, margin: 0 }}>{line.replace(/^•\s*/, "")}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CompSection>
          )}

          {cvData.education.some(e => e.institution) && (
            <CompSection title="Educación" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {cvData.education.filter(e => e.institution).map(ed => (
                  <div key={ed.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: "11px", color: "#111827", margin: 0 }}>{ed.institution}</p>
                      <p style={{ fontSize: "10px", color: "#6B7280", margin: "1px 0 0" }}>
                        {ed.degree}{ed.field ? ` · ${ed.field}` : ""}{ed.gpa ? ` · ${ed.gpa}` : ""}
                      </p>
                    </div>
                    <p style={{ fontSize: "9px", color: "#9CA3AF", whiteSpace: "nowrap", marginLeft: "8px" }}>
                      {formatDate(ed.startDate)}{ed.endDate ? `–${formatDate(ed.endDate)}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </CompSection>
          )}
        </div>

        {/* Right sidebar — compact */}
        <div style={{ padding: "24px 24px 24px 20px", backgroundColor: "#F9FAFB", display: "flex", flexDirection: "column", gap: "16px" }}>

          {cvData.skills.length > 0 && (
            <CompSide title="Habilidades" accent={accent}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {cvData.skills.map(skill => (
                  <span key={skill.id} style={{ fontSize: "9.5px", padding: "2px 7px", borderRadius: "3px", backgroundColor: `${accent}14`, color: "#374151", border: `1px solid ${accent}28` }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </CompSide>
          )}

          {cvData.languages.length > 0 && (
            <CompSide title="Idiomas" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {cvData.languages.map(lang => (
                  <div key={lang.id} style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "10px", color: "#374151", fontWeight: 600, margin: 0 }}>{lang.name}</p>
                    <p style={{ fontSize: "9px", color: "#9CA3AF", margin: 0 }}>{lang.level}</p>
                  </div>
                ))}
              </div>
            </CompSide>
          )}

          {chips.length > 0 && (
            <CompSide title="Otros datos" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                {chips.map((chip, i) => (
                  <p key={i} style={{ fontSize: "9px", color: "#6B7280", margin: 0 }}>{chip}</p>
                ))}
              </div>
            </CompSide>
          )}
        </div>
      </div>
    </div>
  );
}

function CompSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <div style={{ width: "3px", height: "12px", backgroundColor: accent, borderRadius: "1px", flexShrink: 0 }} />
        <h2 style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.13em", color: "#1F2937", margin: 0 }}>{title}</h2>
        <div style={{ flex: 1, height: "0.5px", backgroundColor: "#E5E7EB" }} />
      </div>
      {children}
    </div>
  );
}

function CompSide({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ fontSize: "8px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em", color: accent, margin: "0 0 8px", paddingBottom: "4px", borderBottom: `1px solid ${accent}33` }}>{title}</p>
      {children}
    </div>
  );
}
