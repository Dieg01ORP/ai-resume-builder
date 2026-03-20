// ============================================================
// AI Client — Meta Llama 3 via Groq (free tier)
// Groq offers free access to Llama-3.1-70b with generous limits
// Get your free API key at: https://console.groq.com
// ============================================================

export function buildSummaryPrompt(currentSummary: string, name: string, jobTitle: string): string {
  return `Eres un experto redactor de CVs con 15 años de experiencia. Mejora el siguiente resumen profesional para ${name}, quien es ${jobTitle}.

Resumen actual:
"${currentSummary}"

Requisitos:
- Escribe en primera persona, tono profesional
- Destaca fortalezas clave y propuesta de valor
- Máximo 3-4 frases (60-90 palabras)
- Hazlo convincente y específico
- NO añadas texto de relleno como [X años]
- Responde SOLO con el resumen mejorado, sin preámbulo

Resumen mejorado:`;
}

export function buildExperiencePrompt(description: string, role: string, company: string): string {
  return `Eres un experto redactor de CVs. Mejora la siguiente descripción de trabajo para un ${role} en ${company}.

Descripción actual:
"${description}"

Requisitos:
- Usa verbos de acción fuertes
- Incluye logros cuantificables cuando sea posible
- Escribe en pasado (o presente si es el cargo actual)
- Formato: 3-5 puntos, cada uno comenzando con •
- Enfócate en impacto y resultados
- Máximo 1-2 líneas por punto
- Responde SOLO con los puntos, sin preámbulo

Descripción mejorada:`;
}

export function buildSkillsPrompt(currentSkills: string, jobTitle: string): string {
  return `Eres un experto en orientación profesional. Basándote en el título "${jobTitle}", sugiere 8-12 habilidades profesionales relevantes.

Habilidades actuales: ${currentSkills || "ninguna"}

Requisitos:
- Mezcla de habilidades técnicas y blandas relevantes para ${jobTitle}
- Devuelve SOLO una lista separada por comas
- Sin explicaciones ni preámbulo
- Ejemplo: Gestión de proyectos, Comunicación, Python, SQL

Habilidades:`;
}

// ── Groq client (Meta Llama 3.1 — free) ────────────────────
export async function callLlama(prompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY no está configurada en .env.local");

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "Eres un experto redactor de CVs profesionales. Respondes siempre en español con contenido preciso y profesional.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 600,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}
