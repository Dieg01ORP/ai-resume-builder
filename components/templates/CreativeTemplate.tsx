import { CVData } from "@/types";
import { formatDate } from "@/lib/utils";

interface TemplateProps { cvData: CVData; }

// html2canvas cannot render gradients that use CSS `transparent` keyword —
// it tries to create a canvas pattern from them and crashes with width/height=0.
// All gradients here use explicit hex colors instead of `transparent`.
// Sidebar bg = #131620, main bg = #FFFFFF

export function CreativeTemplate({ cvData }: TemplateProps) {
  const accent = cvData.accentColor;
  const extra = cvData.extraInfo;
  const chips: string[] = [];
  if (extra.availability) chips.push(`Disponibilidad: ${extra.availability}`);
  if (extra.drivingLicense) chips.push(`Carné ${extra.drivingLicense}`);
  if (extra.ownVehicle) chips.push("Vehículo propio");
  if (extra.geographicMobility) chips.push("Movilidad geográfica");
  if (extra.referencesAvailable) chips.push("Referencias disponibles");
  if (extra.volunteering) chips.push(`Voluntariado: ${extra.volunteering}`);

  const levelPct: Record<string, number> = {
    Beginner: 25, Intermediate: 55, Advanced: 80, Expert: 100,
  };

  const initials = cvData.name
    ? cvData.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "CV";

  const hasLongExperience = cvData.workExperience.filter(e => e.company || e.role).length >= 3;
  const showEducationInMain = !hasLongExperience && cvData.education.some(e => e.institution);

  // Safe accent colors with explicit hex alpha (no "transparent" keyword)
  const accentSolid = accent;           // full color
  const accentFade = accent + "33";     // ~20% opacity on dark bg
  const accentMid  = accent + "66";     // ~40% opacity

  return (
    <div style={{ fontFamily: "'DM Sans', Arial, sans-serif", minHeight: "1122px", display: "flex", backgroundColor: "#F8F7F4" }}>

      {/* ══ SIDEBAR ══ */}
      <aside style={{ width: "252px", flexShrink: 0, backgroundColor: "#131620", display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Decorative glow — solid circle, no gradient (avoids html2canvas crash) */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", top: "-50px", left: "-50px",
            width: "160px", height: "160px", borderRadius: "50%",
            backgroundColor: accentFade,
            pointerEvents: "none",
          }} />
        </div>

        {/* Profile */}
        <div style={{ padding: "40px 28px 28px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", position: "relative" }}>
          {cvData.photo ? (
            // Gradient border via box-shadow instead of background gradient
            <div style={{
              width: "88px", height: "88px", borderRadius: "50%",
              border: `3px solid ${accentSolid}`,
              boxShadow: `0 0 0 1px ${accentFade}`,
              overflow: "hidden",
            }}>
              <img src={cvData.photo} alt="Foto" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block" }} />
            </div>
          ) : (
            <div style={{
              width: "88px", height: "88px", borderRadius: "50%",
              backgroundColor: accentFade,
              border: `2px solid ${accentMid}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: "26px", fontWeight: 700, color: accent, letterSpacing: "-1px" }}>{initials}</span>
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", fontWeight: 700, color: "#F9FAFB", margin: "0 0 7px", lineHeight: 1.25 }}>
              {cvData.name || "Tu Nombre"}
            </p>
            <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: "20px", backgroundColor: accent + "22", border: `1px solid ${accent}44` }}>
              <p style={{ fontSize: "9px", color: accent, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700, margin: 0 }}>
                {cvData.jobTitle || "Título Profesional"}
              </p>
            </div>
          </div>
        </div>

        {/* Divider — solid color, no gradient */}
        <div style={{ height: "1px", margin: "0 28px", backgroundColor: accent + "33" }} />

        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: "22px", flex: 1 }}>

          {/* Contact */}
          <SideSection title="Contacto" accent={accent}>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              {[
                { icon: "✉", val: cvData.email },
                { icon: "☎", val: cvData.phone },
                { icon: "⌖", val: cvData.location },
                { icon: "in", val: cvData.linkedin },
                { icon: "↗", val: cvData.website },
              ].filter((c) => c.val).map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ fontSize: "9px", color: accent, fontWeight: 700, marginTop: "1px", flexShrink: 0, width: "12px", textAlign: "center" }}>{c.icon}</span>
                  <p style={{ fontSize: "10px", color: "#94A3B8", margin: 0, wordBreak: "break-all", lineHeight: 1.5 }}>{c.val}</p>
                </div>
              ))}
            </div>
          </SideSection>

          {/* Skills */}
          {cvData.skills.length > 0 && (
            <SideSection title="Habilidades" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {cvData.skills.map((skill) => {
                  const pct = levelPct[skill.level] ?? 50;
                  const segments = 8;
                  return (
                    <div key={skill.id}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <p style={{ fontSize: "10px", color: "#CBD5E1", margin: 0 }}>{skill.name}</p>
                        <p style={{ fontSize: "8px", color: accent + "99", margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{skill.level}</p>
                      </div>
                      <div style={{ display: "flex", gap: "2px" }}>
                        {Array.from({ length: segments }).map((_, idx) => (
                          <div key={idx} style={{
                            flex: 1, height: "3px", borderRadius: "2px",
                            // Use explicit dark color instead of rgba/transparent
                            backgroundColor: ((idx + 1) / segments) * 100 <= pct ? accent : "#2D3348",
                          }} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </SideSection>
          )}

          {/* Languages */}
          {cvData.languages.length > 0 && (
            <SideSection title="Idiomas" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {cvData.languages.map((lang) => (
                  <div key={lang.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: "10px", color: "#CBD5E1", margin: 0, fontWeight: 600 }}>{lang.name}</p>
                    <span style={{ fontSize: "9px", padding: "2px 7px", borderRadius: "10px", backgroundColor: accent + "22", color: accent + "CC", border: `0.5px solid ${accent}44` }}>{lang.level}</span>
                  </div>
                ))}
              </div>
            </SideSection>
          )}

          {/* Education in sidebar */}
          {!showEducationInMain && cvData.education.some((e) => e.institution) && (
            <SideSection title="Educación" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {cvData.education.filter((e) => e.institution).map((ed) => (
                  <div key={ed.id} style={{ borderLeft: `2px solid ${accent}44`, paddingLeft: "10px" }}>
                    <p style={{ fontSize: "10px", fontWeight: 700, color: "#F1F5F9", margin: "0 0 2px", lineHeight: 1.3 }}>{ed.institution}</p>
                    <p style={{ fontSize: "9px", color: "#94A3B8", margin: "0 0 2px", lineHeight: 1.4 }}>
                      {ed.degree}{ed.field ? ` · ${ed.field}` : ""}{ed.gpa ? ` · ${ed.gpa}` : ""}
                    </p>
                    {(ed.startDate || ed.endDate) && (
                      <p style={{ fontSize: "9px", color: accent + "99", margin: 0 }}>
                        {formatDate(ed.startDate)}{ed.endDate ? ` — ${formatDate(ed.endDate)}` : ""}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </SideSection>
          )}

          {/* Extra chips */}
          {chips.length > 0 && (
            <SideSection title="Otros datos" accent={accent}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {chips.map((chip, i) => (
                  <span key={i} style={{ fontSize: "8.5px", padding: "3px 8px", borderRadius: "20px", backgroundColor: accent + "22", color: accent, border: `0.5px solid ${accent}44`, fontWeight: 500 }}>{chip}</span>
                ))}
              </div>
            </SideSection>
          )}
        </div>

        {/* Bottom accent bar — solid color, no gradient */}
        <div style={{ height: "3px", backgroundColor: accent }} />
      </aside>

      {/* ══ MAIN ══ */}
      <main style={{ flex: 1, backgroundColor: "#FFFFFF", display: "flex", flexDirection: "column" }}>
        {/* Top accent bar — solid, no gradient */}
        <div style={{ height: "4px", backgroundColor: accent }} />

        <div style={{ padding: "32px 36px", display: "flex", flexDirection: "column", gap: "26px", flex: 1 }}>

          {cvData.summary && (
            <MainSection title="Perfil Profesional" accent={accent}>
              <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: "14px" }}>
                <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.8, margin: 0 }}>{cvData.summary}</p>
              </div>
            </MainSection>
          )}

          {cvData.workExperience.some((e) => e.company || e.role) && (
            <MainSection title="Experiencia Profesional" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {cvData.workExperience.filter((e) => e.company || e.role).map((exp, idx, arr) => (
                  <div key={exp.id} style={{ display: "flex", gap: "16px", paddingBottom: idx < arr.length - 1 ? "18px" : "0" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "16px" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: idx === 0 ? accent : "#E2E8F0", border: `2px solid ${idx === 0 ? accent : "#CBD5E1"}`, flexShrink: 0, marginTop: "3px" }} />
                      {idx < arr.length - 1 && (
                        <div style={{ flex: 1, width: "1.5px", backgroundColor: "#E2E8F0", marginTop: "4px" }} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "inline-block", fontSize: "9px", color: accent + "CC", backgroundColor: accent + "15", border: `1px solid ${accent}33`, borderRadius: "4px", padding: "1px 7px", marginBottom: "5px", fontWeight: 600, letterSpacing: "0.04em" }}>
                        {formatDate(exp.startDate)}{exp.startDate ? " — " : ""}{exp.current ? "Presente" : formatDate(exp.endDate)}
                      </div>
                      <p style={{ fontWeight: 700, fontSize: "13px", color: "#0F172A", margin: "0 0 2px", lineHeight: 1.3 }}>{exp.role}</p>
                      <p style={{ fontSize: "11px", color: "#64748B", margin: "0 0 6px", fontWeight: 500 }}>{exp.company}</p>
                      {exp.description && (
                        <div>
                          {exp.description.split("\n").filter(Boolean).map((line, i) => (
                            <div key={i} style={{ display: "flex", gap: "6px", marginBottom: "2px" }}>
                              <span style={{ color: accent, fontSize: "10px", flexShrink: 0, marginTop: "1px" }}>›</span>
                              <p style={{ fontSize: "11px", color: "#64748B", lineHeight: 1.65, margin: 0 }}>{line.replace(/^•\s*/, "")}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </MainSection>
          )}

          {showEducationInMain && (
            <MainSection title="Educación" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {cvData.education.filter((e) => e.institution).map((ed, idx, arr) => (
                  <div key={ed.id} style={{ display: "flex", gap: "16px", paddingBottom: idx < arr.length - 1 ? "14px" : "0" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "16px" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: accent + "66", border: `2px solid ${accent}88`, flexShrink: 0, marginTop: "3px" }} />
                      {idx < arr.length - 1 && (
                        <div style={{ flex: 1, width: "1.5px", backgroundColor: "#E2E8F0", marginTop: "4px" }} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      {(ed.startDate || ed.endDate) && (
                        <div style={{ display: "inline-block", fontSize: "9px", color: accent + "CC", backgroundColor: accent + "15", border: `1px solid ${accent}33`, borderRadius: "4px", padding: "1px 7px", marginBottom: "5px", fontWeight: 600 }}>
                          {formatDate(ed.startDate)}{ed.endDate ? ` — ${formatDate(ed.endDate)}` : ""}
                        </div>
                      )}
                      <p style={{ fontWeight: 700, fontSize: "13px", color: "#0F172A", margin: "0 0 2px" }}>{ed.institution}</p>
                      <p style={{ fontSize: "11px", color: "#64748B", margin: 0 }}>
                        {ed.degree}{ed.field ? ` · ${ed.field}` : ""}{ed.gpa ? ` · Nota: ${ed.gpa}` : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </MainSection>
          )}
        </div>
      </main>
    </div>
  );
}

function SideSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <div style={{ width: "3px", height: "10px", backgroundColor: accent, borderRadius: "2px", flexShrink: 0 }} />
        <p style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#64748B", margin: 0 }}>{title}</p>
      </div>
      {children}
    </div>
  );
}

function MainSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
        <div style={{ width: "4px", height: "16px", backgroundColor: accent, borderRadius: "3px", flexShrink: 0 }} />
        <h2 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.13em", color: "#1E293B", margin: 0 }}>{title}</h2>
        {/* Solid line instead of gradient to avoid html2canvas crash */}
        <div style={{ flex: 1, height: "0.5px", backgroundColor: "#E2E8F0" }} />
      </div>
      {children}
    </div>
  );
}
