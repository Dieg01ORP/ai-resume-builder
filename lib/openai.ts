import OpenAI from "openai";

// ============================================================
// Singleton OpenAI client — initialized once server-side
// The API key is read from environment variables only
// ============================================================
let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY environment variable is not set");
    }
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

// ============================================================
// AI Prompt Templates
// ============================================================

export function buildSummaryPrompt(
  currentSummary: string,
  name: string,
  jobTitle: string
): string {
  return `You are an expert resume writer. Improve the following professional summary for ${name}, who is a ${jobTitle}.

Current summary:
"${currentSummary}"

Requirements:
- Write in first person, professional tone
- Highlight key strengths and value proposition
- Keep it to 3-4 sentences (60-90 words)
- Make it compelling and specific
- Do NOT add placeholder text like [X years]
- Return ONLY the improved summary text, no preamble

Improved summary:`;
}

export function buildExperiencePrompt(
  description: string,
  role: string,
  company: string
): string {
  return `You are an expert resume writer. Improve the following job description for a ${role} at ${company}.

Current description:
"${description}"

Requirements:
- Use strong action verbs
- Include quantifiable achievements where possible
- Write in past tense (or present for current role)
- Format as 3-5 bullet points, each starting with •
- Focus on impact and results
- Keep each bullet to 1-2 lines
- Return ONLY the bullet points, no preamble

Improved description:`;
}

export function buildSkillsPrompt(
  currentSkills: string,
  jobTitle: string
): string {
  return `You are an expert career advisor. Based on the job title "${jobTitle}", suggest 8-12 relevant professional skills.

Current skills: ${currentSkills || "none listed"}

Requirements:
- Mix of technical and soft skills relevant to ${jobTitle}
- Return as a comma-separated list only
- No explanations, no preamble
- Example format: Project Management, Stakeholder Communication, Python, SQL

Skills:`;
}
