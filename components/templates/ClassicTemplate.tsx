import { CVData } from "@/types";
import { formatDate } from "@/lib/utils";

interface TemplateProps { cvData: CVData; }

export function ClassicTemplate({ cvData }: TemplateProps) {
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
    <div style={{ fontFamily: "'DM Sans', Arial, sans-serif", minHeight: "1122px", backgroundColor: "#FFFFFF", padding: "40px 50px 36px" }}>

      {/* ── HEADER ── */}
      <header style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px" }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "36px", fontWeight: 700, color: "#0D0D0D", letterSpacing: "-0.02em", margin: "0 0 6px", lineHeight: 1.1 }}>
              {cvData.name || "Tu Nombre"}
            </h1>
            <p style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: accent, fontWeight: 700, margin: "0 0 14px" }}>
              {cvData.jobTitle || "Título profesional"}
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0px" }}>
              {[cvData.email, cvData.phone, cvData.location, cvData.linkedin, cvData.website].filter(Boolean).map((item, i, arr) => (
                <span key={i} style={{ fontSize: "10px", color: "#6B7280" }}>
                  {item}{i < arr.length - 1 && <span style={{ margin: "0 8px", color: "#D1D5DB" }}>|</span>}
                </span>
              ))}
            </div>
          </div>
          {cvData.photo && (
            <div style={{ width: "78px", height: "78px", borderRadius: "4px", overflow: "hidden", border: `2px solid ${accent}`, flexShrink: 0 }}>
              <img src={cvData.photo} alt="Foto" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          )}
        </div>
        {/* Double rule */}
        <div style={{ marginTop: "18px", borderTop: `2px solid ${accent}`, paddingTop: "3px" }}>
          <div style={{ borderTop: `0.5px solid ${accent}44` }} />
        </div>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

        {cvData.summary && (
          <ClassicSection title="Resumen Profesional" accent={accent}>
            <p style={{ fontSize: "11.5px", color: "#4B5563", lineHeight: 1.75, margin: 0 }}>{cvData.summary}</p>
          </ClassicSection>
        )}

        {cvData.workExperience.some(e => e.company || e.role) && (
          <ClassicSection title="Experiencia Profesional" accent={accent}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {cvData.workExperience.filter(e => e.company || e.role).map(exp => (
                <div key={exp.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1px" }}>
                    <p style={{ fontWeight: 700, fontSize: "13px", color: "#111827", margin: 0 }}>{exp.role}</p>
                    <p style={{ fontSize: "10px", color: "#9CA3AF", whiteSpace: "nowrap", marginLeft: "12px" }}>
                      {formatDate(exp.startDate)}{exp.startDate ? " – " : ""}{exp.current ? "Presente" : formatDate(exp.endDate)}
                    </p>
                  </div>
                  <p style={{ fontSize: "11.5px", color: accent, fontWeight: 600, margin: "0 0 4px" }}>{exp.company}</p>
                  {exp.description && exp.description.split("\n").filter(Boolean).map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: "6px", marginBottom: "1px" }}>
                      <span style={{ color: accent, fontSize: "9px", flexShrink: 0, marginTop: "3px" }}>●</span>
                      <p style={{ fontSize: "11px", color: "#6B7280", lineHeight: 1.65, margin: 0 }}>{line.replace(/^•\s*/, "")}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ClassicSection>
        )}

        {cvData.education.some(e => e.institution) && (
          <ClassicSection title="Educación" accent={accent}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {cvData.education.filter(e => e.institution).map(ed => (
                <div key={ed.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "12px", color: "#111827", margin: 0 }}>{ed.institution}</p>
                    <p style={{ fontSize: "11px", color: "#6B7280", margin: "1px 0 0" }}>
                      {ed.degree}{ed.field ? ` en ${ed.field}` : ""}{ed.gpa ? ` — Nota: ${ed.gpa}` : ""}
                    </p>
                  </div>
                  <p style={{ fontSize: "10px", color: "#9CA3AF", whiteSpace: "nowrap", marginLeft: "12px" }}>
                    {formatDate(ed.startDate)}{ed.endDate ? ` – ${formatDate(ed.endDate)}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </ClassicSection>
        )}

        {cvData.skills.length > 0 && (
          <ClassicSection title="Competencias" accent={accent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px" }}>
              {cvData.skills.map(skill => (
                <div key={skill.id} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: accent, flexShrink: 0 }} />
                  <span style={{ fontSize: "11px", color: "#374151" }}>{skill.name}</span>
                </div>
              ))}
            </div>
          </ClassicSection>
        )}

        {cvData.languages.length > 0 && (
          <ClassicSection title="Idiomas" accent={accent}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
              {cvData.languages.map(lang => (
                <span key={lang.id} style={{ fontSize: "11.5px", color: "#374151" }}>
                  <strong style={{ fontWeight: 700 }}>{lang.name}</strong>{" "}
                  <span style={{ color: "#9CA3AF" }}>— {lang.level}</span>
                </span>
              ))}
            </div>
          </ClassicSection>
        )}

        {chips.length > 0 && (
          <ClassicSection title="Otros Datos de Interés" accent={accent}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {chips.map((chip, i) => (
                <span key={i} style={{ fontSize: "10.5px", padding: "3px 10px", borderRadius: "20px", backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}28`, fontWeight: 500 }}>{chip}</span>
              ))}
            </div>
          </ClassicSection>
        )}
      </div>
    </div>
  );
}

function ClassicSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <div style={{ width: "12px", height: "2px", backgroundColor: accent, borderRadius: "2px", flexShrink: 0 }} />
        <h2 style={{ fontSize: "9.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#374151", margin: 0 }}>{title}</h2>
        <div style={{ flex: 1, height: "0.5px", backgroundColor: "#E5E7EB" }} />
      </div>
      {children}
    </div>
  );
}
