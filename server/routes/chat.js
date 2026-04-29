import express from "express";

import { createPersonaReply } from "../lib/openrouter.js";
import { getSystemPromptForPersona } from "../prompts/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { persona, message, history } = req.body || {};

    if (!persona || typeof persona !== "string") {
      return res.status(400).json({ error: "Missing 'persona'." });
    }
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing 'message'." });
    }

    const systemPrompt = getSystemPromptForPersona(persona);
    if (!systemPrompt) {
      return res
        .status(400)
        .json({ error: "Invalid persona. Use one of the supported values." });
    }

    const safeHistory = Array.isArray(history) ? history : [];
    const llmMessages = [
      { role: "system", content: systemPrompt },
      ...safeHistory
        .filter(
          (m) =>
            m &&
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string"
        )
        .map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    const reply = await createPersonaReply({ messages: llmMessages });
    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(200).json({
      reply:
        "Sorry—something went wrong while contacting the AI. Please try again in a moment.",
      error: "AI_CALL_FAILED",
    });
  }
});

export default router;

