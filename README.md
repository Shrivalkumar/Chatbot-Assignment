# Persona-Based AI Chatbot (Assignment 01)

This repo contains a minimal persona-based AI chatbot with **three Scaler/InterviewBit personalities**:
**Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra**.

## Tech stack

- Frontend: React (Vite) + Tailwind CSS
- Backend: Express
- LLM API: OpenRouter (OpenAI-compatible `/chat/completions`)

## Setup (local)

1. Add your API key:
   - Copy `.env.example` to `.env`
   - Uncomment `OPENROUTER_API_KEY` and paste your key

2. Backend:
   - `cd server`
   - `npm install`
   - `node index.js` (or `npm run dev`)

3. Frontend:
   - `cd ../client`
   - `npm install`
   - `npm run dev`

Open the frontend at `http://localhost:5173`.

## Deployment (high level)

- Deploy frontend to **Vercel** (build from `client/`)
- Deploy backend to **Render/Railway** (start from `server/`)
- Ensure `OPENROUTER_API_KEY` is set in backend environment variables

## Notes for the grader

- Persona switching updates the active system prompt and resets the conversation.
- Suggestion chips are shown per persona.
- If the AI call fails, the UI shows a user-friendly error message.

## Screenshots

Add screenshots of:
- Desktop persona switch + chat
- Mobile responsive layout
- Error handling state

# Chatbot-Assignment screen shot
<img width="1093" height="663" alt="Screenshot 2026-04-30 at 1 33 56 PM" src="https://github.com/user-attachments/assets/b3090657-100c-40c4-8631-d81e845affde" />

