import { CVData } from "@/types";
import { formatDate } from "@/lib/utils";

interface TemplateProps { cvData: CVData; }

export function ExecutiveTemplate({ cvData }: TemplateProps) {
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
    <div style={{ fontFamily: "'DM Sans', Arial, sans-serif", minHeight: "1122px", backgroundColor: "#fff" }}>

      {/* ── HEADER ── */}
      <header style={{ backgroundColor: "#0D0D0D", padding: "0", position: "relative", overflow: "hidden" }}>
        {/* Diagonal accent strip */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "220px", height: "100%", backgroundColor: `${accent}11`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", backgroundColor: accent }} />

        <div style={{ padding: "36px 48px 32px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "24px", position: "relative" }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "40px", fontWeight: 700, color: "#FAFAFA", margin: "0 0 6px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {cvData.name || "Tu Nombre"}
            </h1>
            <p style={{ fontSize: "12px", color: accent, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 20px" }}>
              {cvData.jobTitle || "Título profesional"}
            </p>
            {/* Contact row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 0px" }}>
              {[cvData.email, cvData.phone, cvData.location, cvData.linkedin, cvData.website].filter(Boolean).map((item, i, arr) => (
                <span key={i} style={{ fontSize: "10.5px", color: "#9CA3AF", display: "flex", alignItems: "center" }}>
                  {item}
                  {i < arr.length - 1 && <span style={{ margin: "0 12px", color: "#333", fontSize: "8px" }}>◆</span>}
                </span>
              ))}
            </div>
          </div>
          {cvData.photo && (
            <div style={{ width: "90px", height: "90px", borderRadius: "6px", overflow: "hidden", border: `2px solid ${accent}`, flexShrink: 0 }}>
              <img src={cvData.photo} alt="Foto" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          )}
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ padding: "32px 48px", display: "flex", flexDirection: "column", gap: "24px" }}>

        {cvData.summary && (
          <ExecSection title="Perfil Profesional" accent={accent}>
            <p style={{ fontSize: "12.5px", color: "#374151", lineHeight: 1.8, margin: 0 }}>{cvData.summary}</p>
          </ExecSection>
        )}

        {cvData.workExperience.some(e => e.company || e.role) && (
          <ExecSection title="Experiencia Profesional" accent={accent}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {cvData.workExperience.filter(e => e.company || e.role).map((exp, idx) => (
                <div key={exp.id} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "12px", paddingBottom: "16px", borderBottom: "0.5px solid #F3F4F6" }}>
                  <div style={{ borderLeft: `3px solid ${idx === 0 ? accent : `${accent}55`}`, paddingLeft: "14px" }}>
                    <p style={{ fontWeight: 700, fontSize: "13.5px", color: "#111827", margin: "0 0 2px" }}>{exp.role}</p>
                    <p style={{ fontSize: "12px", color: accent, fontWeight: 600, margin: "0 0 6px" }}>{exp.company}</p>
                    {exp.description && exp.description.split("\n").filter(Boolean).map((line, i) => (
                      <div key={i} style={{ display: "flex", gap: "7px", marginBottom: "2px" }}>
                        <span style={{ color: accent, fontSize: "10px", flexShrink: 0, marginTop: "2px" }}>▸</span>
                        <p style={{ fontSize: "11.5px", color: "#6B7280", lineHeight: 1.65, margin: 0 }}>{line.replace(/^•\s*/, "")}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <span style={{ fontSize: "10px", color: "#9CA3AF", whiteSpace: "nowrap", display: "block", marginTop: "2px" }}>
                      {formatDate(exp.startDate)}{exp.startDate ? " – " : ""}{exp.current ? "Presente" : formatDate(exp.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ExecSection>
        )}

        {/* Two-col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {cvData.education.some(e => e.institution) && (
              <ExecSection title="Educación" accent={accent}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {cvData.education.filter(e => e.institution).map(ed => (
                    <div key={ed.id} style={{ borderLeft: `2px solid ${accent}44`, paddingLeft: "12px" }}>
                      <p style={{ fontWeight: 700, fontSize: "12px", color: "#111827", margin: "0 0 2px" }}>{ed.institution}</p>
                      <p style={{ fontSize: "11px", color: "#6B7280", margin: "0 0 2px" }}>{ed.degree}{ed.field ? ` · ${ed.field}` : ""}</p>
                      <p style={{ fontSize: "10px", color: "#9CA3AF", margin: 0 }}>
                        {formatDate(ed.startDate)}{ed.endDate ? ` – ${formatDate(ed.endDate)}` : ""}{ed.gpa ? ` · Nota: ${ed.gpa}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </ExecSection>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {cvData.skills.length > 0 && (
              <ExecSection title="Competencias" accent={accent}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {cvData.skills.map(skill => (
                    <span key={skill.id} style={{ fontSize: "10.5px", padding: "3px 10px", borderRadius: "4px", backgroundColor: `${accent}12`, color: "#374151", border: `1px solid ${accent}30`, fontWeight: 500 }}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </ExecSection>
            )}
            {cvData.languages.length > 0 && (
              <ExecSection title="Idiomas" accent={accent}>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {cvData.languages.map(lang => (
                    <div key={lang.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "11.5px", color: "#374151", fontWeight: 600 }}>{lang.name}</span>
                      <span style={{ fontSize: "10px", color: accent, fontWeight: 500, backgroundColor: `${accent}12`, padding: "1px 8px", borderRadius: "3px" }}>{lang.level}</span>
                    </div>
                  ))}
                </div>
              </ExecSection>
            )}
          </div>
        </div>

        {chips.length > 0 && (
          <ExecSection title="Otros Datos de Interés" accent={accent}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {chips.map((chip, i) => (
                <span key={i} style={{ fontSize: "10.5px", padding: "4px 12px", borderRadius: "4px", backgroundColor: "#F9FAFB", color: "#374151", border: "1px solid #E5E7EB" }}>{chip}</span>
              ))}
            </div>
          </ExecSection>
        )}
      </div>
    </div>
  );
}

function ExecSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
        <div style={{ width: "4px", height: "16px", backgroundColor: accent, borderRadius: "2px", flexShrink: 0 }} />
        <h2 style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#0D0D0D", margin: 0 }}>{title}</h2>
        <div style={{ flex: 1, height: "0.5px", backgroundColor: "#E5E7EB" }} />
      </div>
      {children}
    </div>
  );
}
