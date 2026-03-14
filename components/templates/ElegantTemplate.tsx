import { CVData } from "@/types";
import { formatDate } from "@/lib/utils";

interface TemplateProps { cvData: CVData; }

// Elegant: luxury magazine editorial style, thin lines, serif, split header with photo
export function ElegantTemplate({ cvData }: TemplateProps) {
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
    <div style={{ fontFamily: "'DM Sans', Arial, sans-serif", minHeight: "1122px", backgroundColor: "#FAF7F2" }}>

      {/* ── SPLIT HEADER ── */}
      <header style={{ display: "grid", gridTemplateColumns: "1fr auto", minHeight: "180px" }}>
        {/* Left: name block */}
        <div style={{ backgroundColor: "#FAF7F2", padding: "44px 44px 32px", display: "flex", flexDirection: "column", justifyContent: "flex-end", borderBottom: `1px solid ${accent}33`, position: "relative" }}>
          {/* Thin top bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", backgroundColor: accent }} />
          <p style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: accent, fontWeight: 600, margin: "0 0 10px" }}>
            {cvData.jobTitle || "Título profesional"}
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "42px", fontWeight: 700, color: "#1C1410", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            {cvData.name || "Tu Nombre"}
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0" }}>
            {[cvData.email, cvData.phone, cvData.location, cvData.linkedin, cvData.website].filter(Boolean).map((item, i, arr) => (
              <span key={i} style={{ fontSize: "10px", color: "#9B8B7A" }}>
                {item}{i < arr.length - 1 && <span style={{ margin: "0 8px", color: `${accent}88` }}>·</span>}
              </span>
            ))}
          </div>
        </div>
        {/* Right: photo */}
        <div style={{ width: "172px", backgroundColor: "#F0EBE3", display: "flex", alignItems: "stretch", justifyContent: "center", overflow: "hidden" }}>
          {cvData.photo ? (
            <img src={cvData.photo} alt="Foto" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: `${accent}15` }}>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "48px", color: `${accent}55`, fontWeight: 700, margin: 0 }}>
                {cvData.name ? cvData.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "CV"}
              </p>
            </div>
          )}
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ padding: "36px 44px", display: "flex", gap: "36px" }}>

        {/* Main column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>

          {cvData.summary && (
            <ElegSection title="Perfil" accent={accent}>
              <p style={{ fontSize: "12px", color: "#5C4D3C", lineHeight: 1.85, margin: 0, fontStyle: "italic" }}>
                "{cvData.summary}"
              </p>
            </ElegSection>
          )}

          {cvData.workExperience.some(e => e.company || e.role) && (
            <ElegSection title="Trayectoria Profesional" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {cvData.workExperience.filter(e => e.company || e.role).map((exp, idx) => (
                  <div key={exp.id} style={{ paddingLeft: "14px", borderLeft: `1px solid ${idx === 0 ? accent : `${accent}44`}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                      <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "13px", color: "#1C1410", margin: 0 }}>{exp.role}</p>
                      <p style={{ fontSize: "9.5px", color: "#9B8B7A", fontStyle: "italic", whiteSpace: "nowrap", marginLeft: "10px" }}>
                        {formatDate(exp.startDate)}{exp.startDate ? " – " : ""}{exp.current ? "Presente" : formatDate(exp.endDate)}
                      </p>
                    </div>
                    <p style={{ fontSize: "9.5px", color: accent, fontWeight: 600, margin: "0 0 5px", letterSpacing: "0.04em", textTransform: "uppercase" }}>{exp.company}</p>
                    {exp.description && exp.description.split("\n").filter(Boolean).map((line, i) => (
                      <p key={i} style={{ fontSize: "11px", color: "#6B5C4C", lineHeight: 1.7, margin: "0 0 2px" }}>{line.replace(/^•\s*/, "")}</p>
                    ))}
                  </div>
                ))}
              </div>
            </ElegSection>
          )}

          {cvData.education.some(e => e.institution) && (
            <ElegSection title="Formación" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {cvData.education.filter(e => e.institution).map(ed => (
                  <div key={ed.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "12px", color: "#1C1410", margin: 0 }}>{ed.institution}</p>
                      <p style={{ fontSize: "11px", color: "#9B8B7A", margin: "1px 0 0" }}>
                        {ed.degree}{ed.field ? ` · ${ed.field}` : ""}{ed.gpa ? ` · ${ed.gpa}` : ""}
                      </p>
                    </div>
                    <p style={{ fontSize: "9.5px", color: "#9B8B7A", fontStyle: "italic", whiteSpace: "nowrap", marginLeft: "12px" }}>
                      {formatDate(ed.startDate)}{ed.endDate ? ` – ${formatDate(ed.endDate)}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </ElegSection>
          )}
        </div>

        {/* Side column */}
        <div style={{ width: "180px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "22px" }}>

          {cvData.skills.length > 0 && (
            <ElegSide title="Competencias" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {cvData.skills.map(skill => (
                  <div key={skill.id} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <div style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: accent, flexShrink: 0 }} />
                    <p style={{ fontSize: "10.5px", color: "#5C4D3C", margin: 0 }}>{skill.name}</p>
                  </div>
                ))}
              </div>
            </ElegSide>
          )}

          {cvData.languages.length > 0 && (
            <ElegSide title="Idiomas" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {cvData.languages.map(lang => (
                  <div key={lang.id}>
                    <p style={{ fontSize: "10.5px", color: "#5C4D3C", fontWeight: 700, margin: "0 0 1px" }}>{lang.name}</p>
                    <p style={{ fontSize: "9px", color: "#9B8B7A", margin: 0 }}>{lang.level}</p>
                  </div>
                ))}
              </div>
            </ElegSide>
          )}

          {chips.length > 0 && (
            <ElegSide title="Otros datos" accent={accent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {chips.map((chip, i) => (
                  <p key={i} style={{ fontSize: "9.5px", color: "#9B8B7A", margin: 0 }}>{chip}</p>
                ))}
              </div>
            </ElegSide>
          )}
        </div>
      </div>
    </div>
  );
}

function ElegSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ marginBottom: "14px" }}>
        <p style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: accent, margin: "0 0 6px" }}>{title}</p>
        <div style={{ height: "0.5px", backgroundColor: `${accent}44` }} />
      </div>
      {children}
    </div>
  );
}

function ElegSide({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ fontSize: "8px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: accent, margin: "0 0 8px" }}>{title}</p>
      {children}
    </div>
  );
}
