import { NextRequest, NextResponse } from "next/server";
import { callLlama, buildSummaryPrompt, buildExperiencePrompt, buildSkillsPrompt } from "@/lib/ai";
import { AIEnhanceRequest, AIEnhanceResponse } from "@/types";

// ============================================================
// POST /api/generate-ai
// Usa Meta Llama 3.1 (gratis via Groq) para mejorar el CV
// ============================================================
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as AIEnhanceRequest & {
      role?: string;
      company?: string;
    };

    const { field, currentValue, context, role, company } = body;

    let prompt: string;

    switch (field) {
      case "summary":
        prompt = buildSummaryPrompt(
          currentValue,
          context.name || "el candidato",
          context.jobTitle || "profesional"
        );
        break;
      case "workExperience":
        prompt = buildExperiencePrompt(
          currentValue,
          role || "Profesional",
          company || "la empresa"
        );
        break;
      case "skills":
        prompt = buildSkillsPrompt(currentValue, context.jobTitle || "profesional");
        break;
      default:
        return NextResponse.json({ error: `Campo desconocido: ${field}` }, { status: 400 });
    }

    const enhanced = await callLlama(prompt);
    const response: AIEnhanceResponse = { enhanced };
    return NextResponse.json(response);

  } catch (error) {
    console.error("[AI Generate Error]:", error);
    const message = error instanceof Error ? error.message : "Error al generar con IA";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
