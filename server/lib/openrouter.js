const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

const DEFAULT_MODEL = "openrouter/free";
const FALLBACK_MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "qwen/qwen-2.5-72b-instruct:free",
];

function getEnv(key) {
  return process.env[key];
}

async function callOpenRouterOnce({ model, messages, temperature = 0.7 }) {
  const apiKey = getEnv("OPENROUTER_API_KEY");
  if (!apiKey) {
    throw new Error("Missing OPENROUTER_API_KEY in environment.");
  }

  const res = await fetch(OPENROUTER_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(
      `OpenRouter error: ${res.status} ${res.statusText}${text ? ` - ${text}` : ""}`
    );
    err.status = res.status;
    throw err;
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenRouter returned no message content.");
  return content;
}

export async function createPersonaReply({ messages }) {
  const primaryModel = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;

  // Try primary, then fallback models (helps with rate limits).
  const modelsToTry = [primaryModel, ...FALLBACK_MODELS].filter(Boolean);
  let lastErr;

  for (const model of modelsToTry) {
    try {
      return await callOpenRouterOnce({ model, messages });
    } catch (err) {
      lastErr = err;
    }
  }

  throw lastErr || new Error("Failed to generate reply via OpenRouter.");
}

