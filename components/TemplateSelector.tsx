"use client";

import { TEMPLATES } from "@/lib/templates";
import { TemplateId, Template } from "@/types";
import { Check } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: TemplateId;
  selectedColor: string;
  onTemplateChange: (id: TemplateId) => void;
  onColorChange: (color: string) => void;
}

// Renders a tiny but recognizable SVG preview of each template layout
function TemplateMiniPreview({ template, accent }: { template: Template; accent: string }) {
  const bg = template.previewBg;
  const ac = accent;

  switch (template.previewLayout) {
    case "full-width":
      return (
        <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <rect width="60" height="80" fill={bg} />
          {/* Dark header */}
          <rect x="0" y="0" width="60" height="22" fill={bg === "#FFFFFF" || bg === "#FAFAF8" ? "#0D0D0D" : bg} />
          <rect x="7" y="6" width="28" height="3" rx="1" fill="white" opacity="0.9" />
          <rect x="7" y="11" width="18" height="1.5" rx="0.5" fill={ac} opacity="0.9" />
          <rect x="7" y="15" width="40" height="1" rx="0.5" fill="white" opacity="0.3" />
          {/* Body lines */}
          <rect x="7" y="27" width="8" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          <rect x="7" y="31" width="46" height="1" rx="0.5" fill="#9CA3AF" opacity="0.5" />
          <rect x="7" y="33" width="40" height="1" rx="0.5" fill="#9CA3AF" opacity="0.4" />
          <rect x="7" y="35" width="44" height="1" rx="0.5" fill="#9CA3AF" opacity="0.3" />
          {/* Section 2 */}
          <rect x="7" y="41" width="10" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          <rect x="3" y="45" width="3" height="10" rx="0.5" fill={ac} opacity="0.7" />
          <rect x="9" y="46" width="34" height="1" rx="0.5" fill="#9CA3AF" opacity="0.5" />
          <rect x="9" y="48.5" width="28" height="1" rx="0.5" fill="#9CA3AF" opacity="0.4" />
          <rect x="9" y="51" width="30" height="1" rx="0.5" fill="#9CA3AF" opacity="0.3" />
          <rect x="9" y="56" width="34" height="1" rx="0.5" fill="#9CA3AF" opacity="0.5" />
          <rect x="9" y="58.5" width="25" height="1" rx="0.5" fill="#9CA3AF" opacity="0.3" />
          {/* Tags */}
          <rect x="7" y="65" width="12" height="4" rx="2" fill={ac} opacity="0.15" />
          <rect x="21" y="65" width="12" height="4" rx="2" fill={ac} opacity="0.15" />
          <rect x="35" y="65" width="12" height="4" rx="2" fill={ac} opacity="0.15" />
        </svg>
      );

    case "sidebar-left":
      return (
        <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <rect width="60" height="80" fill="#FFFFFF" />
          {/* Dark sidebar left */}
          <rect x="0" y="0" width="20" height="80" fill={bg} />
          {/* Avatar circle */}
          <circle cx="10" cy="14" r="6" fill={ac} opacity="0.3" />
          <circle cx="10" cy="14" r="4" fill={ac} opacity="0.5" />
          {/* Sidebar lines */}
          <rect x="3" y="23" width="5" height="1.5" rx="0.5" fill={ac} opacity="0.9" />
          <rect x="3" y="27" width="14" height="1" rx="0.5" fill="white" opacity="0.3" />
          <rect x="3" y="29" width="12" height="1" rx="0.5" fill="white" opacity="0.2" />
          {/* Skill bars */}
          <rect x="3" y="35" width="14" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          {[0,1,2,3].map(i => (
            <g key={i}>
              <rect x="3" y={41+i*5} width="14" height="1" rx="0.5" fill="white" opacity="0.15" />
              <rect x="3" y={41+i*5} width={14*(0.3+i*0.2)} height="1" rx="0.5" fill={ac} opacity="0.7" />
            </g>
          ))}
          {/* Main area */}
          <rect x="24" y="8" width="22" height="3" rx="1" fill="#111827" opacity="0.8" />
          <rect x="24" y="13" width="16" height="1.5" rx="0.5" fill={ac} opacity="0.7" />
          <rect x="24" y="19" width="6" height="1.5" rx="0.5" fill={ac} opacity="0.6" />
          <rect x="24" y="23" width="32" height="1" rx="0.5" fill="#9CA3AF" opacity="0.4" />
          <rect x="24" y="25" width="28" height="1" rx="0.5" fill="#9CA3AF" opacity="0.3" />
          {/* Experience dots */}
          <circle cx="25" cy="34" r="2" fill={ac} opacity="0.8" />
          <rect x="24" y="36" width="1" height="8" rx="0.5" fill="#E5E7EB" />
          <rect x="29" y="33" width="20" height="1.5" rx="0.5" fill="#111827" opacity="0.7" />
          <rect x="29" y="36" width="14" height="1" rx="0.5" fill={ac} opacity="0.5" />
          <rect x="29" y="39" width="22" height="1" rx="0.5" fill="#9CA3AF" opacity="0.4" />
          <circle cx="25" cy="46" r="1.5" fill="#CBD5E1" />
          <rect x="29" y="45" width="18" height="1.5" rx="0.5" fill="#111827" opacity="0.6" />
          <rect x="29" y="48" width="12" height="1" rx="0.5" fill={ac} opacity="0.4" />
        </svg>
      );

    case "sidebar-right":
      return (
        <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <rect width="60" height="80" fill="#FFFFFF" />
          {/* Light sidebar right */}
          <rect x="40" y="0" width="20" height="80" fill={bg} />
          {/* Main content left */}
          <rect x="4" y="6" width="24" height="3.5" rx="1" fill="#0F172A" opacity="0.85" />
          <rect x="4" y="12" width="16" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          <rect x="4" y="17" width="2.5" height="2.5" rx="1" fill={ac} opacity="0.5" />
          <rect x="8" y="17" width="26" height="1" rx="0.5" fill="#9CA3AF" opacity="0.4" />
          <rect x="4" y="22" width="10" height="1.5" rx="0.5" fill="#1E293B" opacity="0.7" />
          {/* Timeline */}
          {[0,1,2].map(i => (
            <g key={i}>
              <circle cx="5.5" cy={28+i*11} r="2" fill={i===0 ? ac : "#CBD5E1"} />
              {i < 2 && <rect x="5" y={30+i*11} width="1" height="9" rx="0.5" fill="#E2E8F0" />}
              <rect x="10" y={27+i*11} width="22" height="1.5" rx="0.5" fill="#0F172A" opacity={0.7-i*0.1} />
              <rect x="10" y={30+i*11} width="16" height="1" rx="0.5" fill={ac} opacity={0.5-i*0.05} />
            </g>
          ))}
          {/* Right sidebar content */}
          <circle cx="50" cy="12" r="5" fill={ac} opacity="0.25" />
          <circle cx="50" cy="12" r="3" fill={ac} opacity="0.4" />
          <rect x="43" y="22" width="14" height="1.5" rx="0.5" fill={ac} opacity="0.7" />
          {[0,1,2,3].map(i => (
            <g key={i}>
              <rect x="43" y={27+i*5} width="14" height="1" rx="0.5" fill="#E5E7EB" />
              <rect x="43" y={27+i*5} width={14*(0.3+i*0.18)} height="1" rx="0.5" fill={ac} opacity="0.6" />
            </g>
          ))}
        </svg>
      );

    case "banner":
      return (
        <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <rect width="60" height="80" fill="#FAFAFA" />
          {/* Bold dark banner */}
          <rect x="0" y="0" width="60" height="26" fill="#1E1B4B" />
          {/* Accent top line */}
          <rect x="0" y="0" width="60" height="2.5" fill={ac} />
          {/* Big name */}
          <rect x="6" y="7" width="36" height="5" rx="1.5" fill="white" opacity="0.9" />
          <rect x="6" y="15" width="22" height="2" rx="0.5" fill={ac} opacity="0.8" />
          <rect x="6" y="19" width="14" height="1.5" rx="0.5" fill="white" opacity="0.3" />
          <rect x="22" y="19" width="14" height="1.5" rx="0.5" fill="white" opacity="0.3" />
          {/* Two-col body */}
          <rect x="0" y="26" width="40" height="54" fill="white" />
          <rect x="40" y="26" width="20" height="54" fill="#F9FAFB" />
          {/* Left content */}
          <rect x="5" y="31" width="8" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          <rect x="5" y="35" width="30" height="1" rx="0.5" fill="#9CA3AF" opacity="0.5" />
          <rect x="5" y="37" width="26" height="1" rx="0.5" fill="#9CA3AF" opacity="0.4" />
          <rect x="5" y="43" width="10" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          {[0,1].map(i => (
            <g key={i}>
              <rect x="5" y={48+i*9} width="24" height="1.5" rx="0.5" fill="#111827" opacity="0.7" />
              <rect x="5" y={51+i*9} width="16" height="1" rx="0.5" fill={ac} opacity="0.5" />
              <rect x="5" y={53.5+i*9} width="28" height="1" rx="0.5" fill="#9CA3AF" opacity="0.35" />
            </g>
          ))}
          {/* Right sidebar skill bars */}
          <rect x="42" y="30" width="15" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          {[0,1,2,3].map(i => (
            <g key={i}>
              <rect x="42" y={36+i*6} width="15" height="1" rx="0.5" fill="#E5E7EB" />
              <rect x="42" y={36+i*6} width={15*(0.35+i*0.17)} height="1" rx="0.5" fill={ac} opacity="0.65" />
            </g>
          ))}
        </svg>
      );

    case "split-top":
      return (
        <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <rect width="60" height="80" fill={bg} />
          {/* Top thin accent line */}
          <rect x="0" y="0" width="60" height="2.5" fill={ac} />
          {/* Split header: left text + right photo block */}
          <rect x="0" y="2.5" width="44" height="22" fill={bg} />
          <rect x="44" y="2.5" width="16" height="22" fill={`${ac}22`} />
          {/* Header text */}
          <rect x="5" y="8" width="26" height="4" rx="1" fill="#1C1410" opacity="0.85" />
          <rect x="5" y="14.5" width="6" height="1" rx="0.5" fill={ac} opacity="0.9" />
          <rect x="13" y="14.5" width="18" height="1" rx="0.5" fill={ac} opacity="0.7" />
          <rect x="5" y="18" width="32" height="1" rx="0.5" fill="#9B8B7A" opacity="0.4" />
          {/* Divider */}
          <rect x="0" y="24.5" width="60" height="0.5" fill={ac} opacity="0.4" />
          {/* Two-col body */}
          <rect x="0" y="25" width="38" height="55" fill={bg} />
          <rect x="40" y="25" width="20" height="55" fill="transparent" />
          {/* Left main content */}
          <rect x="5" y="29" width="8" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          <rect x="5" y="32" width="30" height="0.5" rx="0.5" fill={ac} opacity="0.3" />
          <rect x="5" y="35" width="28" height="1" rx="0.5" fill="#9B8B7A" opacity="0.5" />
          <rect x="5" y="37" width="24" height="1" rx="0.5" fill="#9B8B7A" opacity="0.4" />
          {/* Experience serif style */}
          <rect x="5" y="43" width="10" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          <rect x="5" y="46" width="0.8" height="9" rx="0.3" fill={ac} opacity="0.6" />
          {[0,1].map(i => (
            <g key={i}>
              <rect x="8" y={47+i*8} width="22" height="1.5" rx="0.5" fill="#1C1410" opacity="0.7" />
              <rect x="8" y={50+i*8} width="14" height="1" rx="0.5" fill="#9B8B7A" opacity="0.5" />
              <rect x="8" y={52.5+i*8} width="24" height="1" rx="0.5" fill="#9B8B7A" opacity="0.35" />
            </g>
          ))}
          {/* Right side column */}
          <rect x="41" y="29" width="17" height="1.5" rx="0.5" fill={ac} opacity="0.7" />
          {[0,1,2,3,4].map(i => (
            <g key={i}>
              <circle cx="42.5" cy={35+i*5} r="1" fill={ac} opacity="0.4" />
              <rect x="45" y={34.5+i*5} width="12" height="1" rx="0.5" fill="#9B8B7A" opacity="0.5" />
            </g>
          ))}
          <rect x="41" y="63" width="17" height="1.5" rx="0.5" fill={ac} opacity="0.7" />
          {[0,1].map(i => (
            <rect key={i} x="41" y={67+i*4} width={17*(0.6+i*0.3)} height="1.5" rx="0.5" fill={ac} opacity="0.25" />
          ))}
        </svg>
      );

    case "two-col-header":
    default:
      return (
        <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <rect width="60" height="80" fill="#FFFFFF" />
          {/* Compact dark header */}
          <rect x="0" y="0" width="60" height="17" fill="#1F2937" />
          <rect x="0" y="17" width="60" height="2" fill={ac} />
          <rect x="5" y="4" width="20" height="3" rx="1" fill="white" opacity="0.9" />
          <rect x="5" y="9" width="14" height="1.5" rx="0.5" fill={ac} opacity="0.9" />
          <rect x="37" y="5" width="18" height="1" rx="0.5" fill="white" opacity="0.3" />
          <rect x="37" y="8" width="16" height="1" rx="0.5" fill="white" opacity="0.25" />
          <rect x="37" y="11" width="18" height="1" rx="0.5" fill="white" opacity="0.2" />
          {/* Two-column body */}
          <rect x="0" y="19" width="40" height="61" fill="white" />
          <rect x="40" y="19" width="20" height="61" fill="#F9FAFB" />
          {/* Main left */}
          <rect x="4" y="23" width="3" height="8" rx="0.5" fill={ac} opacity="0.7" />
          <rect x="9" y="24" width="24" height="1.5" rx="0.5" fill="#111827" opacity="0.7" />
          <rect x="9" y="27" width="16" height="1" rx="0.5" fill={ac} opacity="0.5" />
          <rect x="9" y="30" width="26" height="1" rx="0.5" fill="#9CA3AF" opacity="0.4" />
          <rect x="4" y="35" width="3" height="8" rx="0.5" fill="#E2E8F0" />
          <rect x="9" y="36" width="20" height="1.5" rx="0.5" fill="#111827" opacity="0.6" />
          <rect x="9" y="39" width="12" height="1" rx="0.5" fill={ac} opacity="0.4" />
          <rect x="9" y="42" width="24" height="1" rx="0.5" fill="#9CA3AF" opacity="0.35" />
          {/* Right compact */}
          <rect x="42" y="22" width="15" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          <rect x="42" y="26" width="15" height="2" rx="1" fill={ac} opacity="0.12" />
          <rect x="42" y="29.5" width="12" height="2" rx="1" fill={ac} opacity="0.12" />
          <rect x="42" y="33" width="15" height="2" rx="1" fill={ac} opacity="0.12" />
          <rect x="42" y="39" width="15" height="1.5" rx="0.5" fill={ac} opacity="0.8" />
          <rect x="42" y="43" width="15" height="1" rx="0.5" fill="#E5E7EB" />
          <rect x="42" y="43" width="10" height="1" rx="0.5" fill={ac} opacity="0.6" />
          <rect x="42" y="47" width="15" height="1" rx="0.5" fill="#E5E7EB" />
          <rect x="42" y="47" width="7" height="1" rx="0.5" fill={ac} opacity="0.5" />
        </svg>
      );
  }
}

export function TemplateSelector({ selectedTemplate, selectedColor, onTemplateChange, onColorChange }: TemplateSelectorProps) {
  const currentTemplate = TEMPLATES.find(t => t.id === selectedTemplate) || TEMPLATES[0];

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="section-label">Plantilla</p>
          <p className="text-xs text-ink-400">{TEMPLATES.find(t => t.id === selectedTemplate)?.name}</p>
        </div>

        {/* Grid 4x2 */}
        <div className="grid grid-cols-4 gap-2">
          {TEMPLATES.map((template) => {
            const isSelected = selectedTemplate === template.id;
            const previewAccent = isSelected ? selectedColor : template.previewAccent;
            return (
              <button
                key={template.id}
                onClick={() => {
                  onTemplateChange(template.id);
                  onColorChange(template.accentColors[0]);
                }}
                className="group flex flex-col items-center gap-1.5"
                title={template.description}
              >
                {/* Preview card */}
                <div
                  className={`w-full aspect-[3/4] rounded-lg overflow-hidden transition-all duration-200 relative
                    ${isSelected
                      ? "ring-2 ring-offset-1 shadow-lg scale-105"
                      : "ring-1 ring-ink-100 hover:ring-ink-300 hover:scale-[1.02]"
                    }`}
                  style={{ boxShadow: isSelected ? `0 0 0 2px ${selectedColor}, 0 4px 12px ${selectedColor}33` : undefined }}
                >
                  <TemplateMiniPreview template={template} accent={previewAccent} />

                  {/* Selected badge */}
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: selectedColor }}>
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Label */}
                <span className={`font-body text-xs transition-colors leading-tight text-center ${isSelected ? "font-semibold text-ink-900" : "text-ink-400 group-hover:text-ink-700"}`}>
                  {template.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Description of selected */}
        <p className="text-xs text-ink-400 mt-2 leading-relaxed">
          {currentTemplate.description}
        </p>
      </div>

      {/* Accent Color Picker */}
      <div>
        <p className="section-label mb-2">Color de acento</p>
        <div className="flex items-center gap-2 flex-wrap">
          {currentTemplate.accentColors.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className="w-6 h-6 rounded-full transition-all duration-150 hover:scale-110"
              style={{
                backgroundColor: color,
                boxShadow: selectedColor === color
                  ? `0 0 0 2px white, 0 0 0 4px ${color}`
                  : "0 1px 3px rgba(0,0,0,0.2)",
              }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
