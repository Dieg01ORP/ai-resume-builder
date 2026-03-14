"use client";

import { CVData } from "@/types";
import { ExecutiveTemplate } from "@/components/templates/ExecutiveTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { NordicTemplate } from "@/components/templates/NordicTemplate";
import { BoldTemplate } from "@/components/templates/BoldTemplate";
import { ElegantTemplate } from "@/components/templates/ElegantTemplate";
import { CompactTemplate } from "@/components/templates/CompactTemplate";

interface CVPreviewProps { cvData: CVData; }

export function CVPreview({ cvData }: CVPreviewProps) {
  const templates = {
    executive: ExecutiveTemplate,
    minimal: MinimalTemplate,
    creative: CreativeTemplate,
    classic: ClassicTemplate,
    nordic: NordicTemplate,
    bold: BoldTemplate,
    elegant: ElegantTemplate,
    compact: CompactTemplate,
  };

  const TemplateComponent = templates[cvData.template] ?? ExecutiveTemplate;

  return (
    <div id="cv-preview" className="w-full bg-white" style={{ minHeight: "1122px", fontFamily: "'DM Sans', sans-serif" }}>
      <TemplateComponent cvData={cvData} />
    </div>
  );
}
