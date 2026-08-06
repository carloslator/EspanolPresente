import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI lazily/safely
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Healthcheck endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", aiEnabled: !!ai });
  });

  // AI Explain Endpoint
  app.post("/api/ai/explain", async (req, res) => {
    try {
      if (!ai) {
        return res.status(503).json({ 
          error: "Gemini API key is not configured in server environment." 
        });
      }
      const { verb, tense, sentence, question } = req.body;
      const prompt = `You are a friendly, expert Spanish grammar tutor for native English speakers learning Spanish present tenses.
Topic: Spanish Present Tenses.
Details provided:
- Verb: ${verb || 'General'}
- Target Tense: ${tense || 'Present Tenses'}
- Sentence Context: ${sentence || 'N/A'}
- User Question: ${question || 'Explain how this present tense works in simple terms.'}

Rules for your answer:
1. Use a clear, Swiss-style clean structure with brief headers.
2. Explain in simple, plain English without academic or jargon-heavy linguistic jargon.
3. Compare directly with standard English usage (e.g. "I eat" vs "I am eating" vs "I want you to eat").
4. Provide 3 clear example sentences in Spanish with literal and natural English translations.
5. Highlight top 2 common traps English speakers make with this.
6. Keep the answer concise, didactic, and encouraging.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      res.json({ explanation: response.text });
    } catch (err: any) {
      console.error("Gemini explain error:", err);
      res.status(500).json({ error: err.message || "Failed to generate AI explanation." });
    }
  });

  // AI Sentence & Grammar Analysis Endpoint
  app.post("/api/ai/analyze", async (req, res) => {
    try {
      if (!ai) {
        return res.status(503).json({ 
          error: "Gemini API key is not configured in server environment." 
        });
      }
      const { text } = req.body;
      if (!text || !text.trim()) {
        return res.status(400).json({ error: "Text is required." });
      }

      const prompt = `You are a helpful Spanish Grammar Coach.
Analyze the following sentence or phrase written by a native English speaker: "${text}"

Your task:
1. Identify all present tense verbs in the text (Present Indicative, Present Continuous, Present Subjunctive, Present Perfect, Present Perfect Subjunctive, Imperative Commands).
2. Check for any conjugation errors, stem-change mistakes, or wrong tense selection.
3. If there are errors:
   - Provide the corrected version clearly in bold.
   - Explain the error simply in plain English (e.g. "Remember that 'pensar' changes 'e' to 'ie' in the boot forms: yo pienso").
4. If there are no errors:
   - Praise the user!
   - Explain why the verb tense chosen fits the context well.
5. Provide a similar practice sentence for them to try next.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      res.json({ analysis: response.text });
    } catch (err: any) {
      console.error("Gemini analyze error:", err);
      res.status(500).json({ error: err.message || "Failed to analyze text." });
    }
  });

  // Vite middleware in dev mode, static folder in prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
