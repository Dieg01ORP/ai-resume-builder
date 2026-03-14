import { CVData } from "@/types";
import { formatDate } from "@/lib/utils";

interface TemplateProps { cvData: CVData; }

// Nordic: clean sidebar on the RIGHT, cool blue palette, Scandinavian feel
export function NordicTemplate({ cvData }: TemplateProps) {
  const accent = cvData.accentColor;
  const extra = cvData.extraInfo;
  const chips: string[] = [];
  if (extra.availability) chips.push(`Disponibilidad: ${extra.availability}`);
  if (extra.drivingLicense) chips.push(`Carné ${extra.drivingLicense}`);
  if (extra.ownVehicle) chips.push("Vehículo propio");
  if (extra.geographicMobility) chips.push("Movilidad geográfica");
  if (extra.referencesAvailable) chips.push("Referencias disponibles");
  if (extra.volunteering) chips.push(`Voluntariado: ${extra.volunteering}`);

  const levelDots = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };

  const initials = cvData.name
    ? cvData.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "CV";

  return (
    <div style={{ fontFamily: "'DM Sans', Arial, sans-serif", minHeight: "1122px", display: "flex", backgroundColor: "#FFFFFF" }}>

      {/* ── MAIN LEFT ── */}
      <main style={{ flex: 1, padding: "44px 40px", display: "flex", flexDirection: "column", gap: "24px" }}>

        {/* Header in main */}
        <div style={{ marginBottom: "4px" }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "38px", fontWeight: 700, color: "#0F172A", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 6px" }}>
            {cvData.name || "Tu Nombre"}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "3px", backgroundColor: accent, borderRadius: "2px" }} />
            <p style={{ fontSize: "11px", color: accent, textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 700, margin: 0 }}>
              {cvData.jobTitle || "Título profesional"}
            </p>
          </div>
        </div>

        <div style={{ height: "0.5px", backgroundColor: "#E2E8F0" }} />

        {cvData.summary && (
          <NordSection title="Sobre mí" accent={accent}>
            <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.8, margin: 0 }}>{cvData.summary}</p>
          </NordSection>
        )}

        {cvData.workExperience.some(e => e.company || e.role) && (
          <NordSection title="Experiencia" accent={accent}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {cvData.workExperience.filter(e => e.company || e.role).map((exp, idx, arr) => (
                <div key={exp.id} style={{ display: "flex", gap: "14px", paddingBottom: idx < arr.length - 1 ? "16px" : 0 }}>
                  {/* Timeline */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "14px", flexShrink: 0 }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: idx === 0 ? accent : "#CBD5E1", marginTop: "4px", flexShrink: 0 }} />
                    {idx < arr.length - 1 && <div style={{ flex: 1, width: "1px", backgroundColor: "#E2E8F0", marginTop: "3px" }} />}
                  </div>
                  <div style={{ flex: 1, paddingTop: "1px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1px" }}>
                      <p style={{ fontWeight: 700, fontSize: "13px", color: "#0F172A", margin: 0 }}>{exp.role}</p>
                      <p style={{ fontSize: "10px", color: "#94A3B8", whiteSpace: "nowrap", marginLeft: "10px" }}>
                        {formatDate(exp.startDate)}{exp.startDate ? " – " : ""}{exp.current ? "Presente" : formatDate(exp.endDate)}
                      </p>
                    </div>
                    <p style={{ fontSize: "11px", color: accent, fontWeight: 600, margin: "0 0 5px" }}>{exp.company}</p>
                    {exp.description && exp.description.split("\n").filter(Boolean).map((line, i) => (
                      <div key={i} style={{ display: "flex", gap: "6px", marginBottom: "2px" }}>
                        <span style={{ color: "#CBD5E1", fontSize: "8px", flexShrink: 0, marginTop: "3px" }}>▶</span>
                        <p style={{ fontSize: "11px", color: "#64748B", lineHeight: 1.6, margin: 0 }}>{line.replace(/^•\s*/, "")}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </NordSection>
        )}

        {cvData.education.some(e => e.institution) && (
          <NordSection title="Educación" accent={accent}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {cvData.education.filter(e => e.institution).map(ed => (
                <div key={ed.id} style={{ display: "flex", gap: "14px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: `${accent}33`, border: `1.5px solid ${accent}88`, flexShrink: 0, marginTop: "4px" }} />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "12px", color: "#0F172A", margin: "0 0 1px" }}>{ed.institution}</p>
                    <p style={{ fontSize: "11px", color: "#64748B", margin: 0 }}>
                      {ed.degree}{ed.field ? ` · ${ed.field}` : ""}{ed.gpa ? ` · ${ed.gpa}` : ""}
                      {(ed.startDate || ed.endDate) && <span style={{ color: "#94A3B8" }}> · {formatDate(ed.startDate)}{ed.endDate ? `–${formatDate(ed.endDate)}` : ""}</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </NordSection>
        )}
      </main>

      {/* ── SIDEBAR RIGHT ── */}
      <aside style={{ width: "228px", flexShrink: 0, backgroundColor: "#F4F6F9", borderLeft: `1px solid #E2E8F0`, padding: "44px 24px", display: "flex", flexDirection: "column", gap: "24px" }}>

        {/* Photo */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {cvData.photo ? (
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", overflow: "hidden", border: `3px solid ${accent}` }}>
              <img src={cvData.photo} alt="Foto" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ) : (
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: `${accent}20`, border: `2px solid ${accent}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "22px", fontWeight: 700, color: accent }}>{initials}</span>
            </div>
          )}
        </div>

        <div style={{ height: "0.5px", backgroundColor: "#E2E8F0" }} />

        {/* Contact */}
        <NordSide title="Contacto" accent={accent}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[cvData.email, cvData.phone, cvData.location, cvData.linkedin, cvData.website].filter(Boolean).map((item, i) => (
              <p key={i} style={{ fontSize: "10px", color: "#64748B", margin: 0, wordBreak: "break-all", lineHeight: 1.5 }}>{item}</p>
            ))}
          </div>
        </NordSide>

        {cvData.skills.length > 0 && (
          <NordSide title="Habilidades" accent={accent}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {cvData.skills.map(skill => {
                const dots = levelDots[skill.level] ?? 2;
                return (
                  <div key={skill.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                      <p style={{ fontSize: "10px", color: "#334155", margin: 0 }}>{skill.name}</p>
                      <div style={{ display: "flex", gap: "2px" }}>
                        {[1, 2, 3, 4].map(d => (
                          <div key={d} style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: d <= dots ? accent : "#CBD5E1" }} />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </NordSide>
        )}

        {cvData.languages.length > 0 && (
          <NordSide title="Idiomas" accent={accent}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {cvData.languages.map(lang => (
                <div key={lang.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontSize: "10px", color: "#334155", margin: 0, fontWeight: 600 }}>{lang.name}</p>
                  <p style={{ fontSize: "9px", color: "#94A3B8", margin: 0 }}>{lang.level}</p>
                </div>
              ))}
            </div>
          </NordSide>
        )}

        {chips.length > 0 && (
          <NordSide title="Otros datos" accent={accent}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {chips.map((chip, i) => (
                <p key={i} style={{ fontSize: "9.5px", color: "#64748B", margin: 0 }}>{chip}</p>
              ))}
            </div>
          </NordSide>
        )}
      </aside>
    </div>
  );
}

function NordSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
        <h2 style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#1E293B", margin: 0 }}>{title}</h2>
        <div style={{ flex: 1, height: "1.5px", backgroundColor: `${accent}66` }} />
      </div>
      {children}
    </div>
  );
}

function NordSide({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ fontSize: "8.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accent, margin: "0 0 10px" }}>{title}</p>
      {children}
    </div>
  );
}
