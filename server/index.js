import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import fs from "fs";

import chatRouter from "./routes/chat.js";

// Load env from repo root so `./.env` works for both local + deployed setups.
const rootEnvPath = fileURLToPath(new URL("../.env", import.meta.url));
if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
} else {
  // In deployment, the platform should provide env vars directly.
  dotenv.config();
}

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => res.status(200).json({ ok: true }));
app.use("/chat", chatRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

