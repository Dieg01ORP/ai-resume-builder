import { CVData } from "@/types";
import { formatDate } from "@/lib/utils";

interface TemplateProps { cvData: CVData; }

export function MinimalTemplate({ cvData }: TemplateProps) {
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
    <div style={{ fontFamily: "'DM Sans', Arial, sans-serif", minHeight: "1122px", backgroundColor: "#FAFAF8", padding: "56px 60px 44px" }}>

      {/* ── HEADER ── */}
      <header style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "32px" }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "48px", fontWeight: 700, color: "#0D0D0D", letterSpacing: "-0.03em", lineHeight: 1.0, margin: "0 0 10px" }}>
              {cvData.name || "Tu Nombre"}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "2px", backgroundColor: accent, borderRadius: "2px" }} />
              <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: accent, fontWeight: 600, margin: 0 }}>
                {cvData.jobTitle || "Título profesional"}
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 0px" }}>
              {[cvData.email, cvData.phone, cvData.location, cvData.linkedin, cvData.website].filter(Boolean).map((item, i, arr) => (
                <span key={i} style={{ fontSize: "11px", color: "#9CA3AF" }}>
                  {item}{i < arr.length - 1 && <span style={{ margin: "0 10px", color: "#D1D5DB" }}>·</span>}
                </span>
              ))}
            </div>
          </div>
          {cvData.photo && (
            <div style={{ width: "88px", height: "88px", borderRadius: "50%", overflow: "hidden", border: `2px solid ${accent}`, flexShrink: 0 }}>
              <img src={cvData.photo} alt="Foto" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          )}
        </div>
        <div style={{ height: "0.5px", backgroundColor: "#E5E7EB", marginTop: "28px" }} />
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

        {cvData.summary && (
          <p style={{ fontSize: "13px", color: "#4B5563", lineHeight: 1.85, margin: 0, maxWidth: "640px" }}>{cvData.summary}</p>
        )}

        {cvData.workExperience.some(e => e.company || e.role) && (
          <MinSection title="Experiencia" accent={accent}>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {cvData.workExperience.filter(e => e.company || e.role).map(exp => (
                <div key={exp.id} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "20px" }}>
                  <div style={{ textAlign: "right", paddingTop: "2px" }}>
                    <p style={{ fontSize: "10px", color: "#9CA3AF", lineHeight: 1.5, margin: 0 }}>
                      {formatDate(exp.startDate)}<br />{exp.current ? "Presente" : formatDate(exp.endDate)}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "13px", color: "#111827", margin: "0 0 1px" }}>{exp.role}</p>
                    <p style={{ fontSize: "11.5px", color: accent, fontWeight: 600, margin: "0 0 6px" }}>{exp.company}</p>
                    {exp.description && exp.description.split("\n").filter(Boolean).map((line, i) => (
                      <p key={i} style={{ fontSize: "11.5px", color: "#6B7280", lineHeight: 1.7, margin: "0 0 2px" }}>
                        {line.replace(/^•\s*/, "")}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MinSection>
        )}

        {cvData.education.some(e => e.institution) && (
          <MinSection title="Educación" accent={accent}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {cvData.education.filter(e => e.institution).map(ed => (
                <div key={ed.id} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "20px" }}>
                  <div style={{ textAlign: "right", paddingTop: "2px" }}>
                    <p style={{ fontSize: "10px", color: "#9CA3AF", margin: 0, lineHeight: 1.5 }}>
                      {formatDate(ed.startDate)}<br />{ed.endDate ? formatDate(ed.endDate) : ""}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "13px", color: "#111827", margin: "0 0 1px" }}>{ed.institution}</p>
                    <p style={{ fontSize: "11.5px", color: "#6B7280", margin: 0 }}>
                      {ed.degree}{ed.field ? ` · ${ed.field}` : ""}{ed.gpa ? ` · ${ed.gpa}` : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </MinSection>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
          {cvData.skills.length > 0 && (
            <MinSection title="Habilidades" accent={accent}>
              <p style={{ fontSize: "12px", color: "#6B7280", lineHeight: 2, margin: 0 }}>
                {cvData.skills.map(s => s.name).join("  ·  ")}
              </p>
            </MinSection>
          )}
          {cvData.languages.length > 0 && (
            <MinSection title="Idiomas" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {cvData.languages.map(lang => (
                  <div key={lang.id} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "12px", color: "#374151", fontWeight: 600 }}>{lang.name}</span>
                    <span style={{ fontSize: "11px", color: "#9CA3AF" }}>{lang.level}</span>
                  </div>
                ))}
              </div>
            </MinSection>
          )}
        </div>

        {chips.length > 0 && (
          <MinSection title="Otros datos" accent={accent}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {chips.map((chip, i) => (
                <span key={i} style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}28` }}>{chip}</span>
              ))}
            </div>
          </MinSection>
        )}
      </div>
    </div>
  );
}

function MinSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
        <p style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: accent, margin: 0 }}>{title}</p>
        <div style={{ flex: 1, height: "0.5px", backgroundColor: "#E5E7EB" }} />
      </div>
      {children}
    </div>
  );
}
