# ResumeAI — Constructor de CV con IA

Aplicación web para crear CVs profesionales usando Meta Llama 3.1 (gratis via Groq). Construida con Next.js 14, TypeScript y Tailwind CSS.

## ✨ Características

- **IA gratuita** — Meta Llama 3.1 via Groq (sin coste, sin tarjeta)
- **8 plantillas profesionales** — Executive, Minimal, Creative, Classic, Nordic, Bold, Elegant, Compact
- **Vista previa en tiempo real** — Cambios instantáneos mientras escribes
- **Exportación PDF** — Alta resolución, A4 perfecto
- **Reordenamiento drag & drop** — Arrastra experiencias y educación
- **Guardado automático** — Tu borrador persiste en localStorage

## 🚀 Inicio rápido

### 1. Instalar dependencias
```bash
cd ai-resume-builder
npm install
```

### 2. Configurar la IA (gratis)
```bash
cp .env.example .env.local
```

Edita `.env.local`:
```env
GROQ_API_KEY=gsk_tu_key_aqui
```

**Obtén tu API key gratis:**
1. Ve a [console.groq.com](https://console.groq.com)
2. Crea una cuenta (gratuita)
3. Ve a "API Keys" → "Create API Key"
4. Pega la key en `.env.local`

> **Nota:** La app funciona sin API key, pero los botones de mejora con IA no estarán disponibles.

### 3. Ejecutar
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy en Vercel

```bash
npm install -g vercel
vercel --prod
```

Añade la variable de entorno `GROQ_API_KEY` en el dashboard de Vercel.

## 🤖 Modelo de IA

| Proveedor | Modelo | Coste |
|-----------|--------|-------|
| [Groq](https://groq.com) | Meta Llama 3.1 70B | **Gratis** (tier generoso) |

Groq ofrece ~14.400 tokens/minuto gratis. Más que suficiente para uso personal.

## 📦 Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14, React 18, TypeScript |
| Estilos | Tailwind CSS, Framer Motion |
| IA | Meta Llama 3.1 via Groq API |
| PDF | html2canvas + jsPDF |
| Iconos | Lucide React |
