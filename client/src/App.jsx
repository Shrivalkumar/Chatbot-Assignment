import { useEffect, useMemo, useRef, useState } from "react";
import { PERSONAS, getPersonaById } from "./personas.js";
import PersonaSwitcher from "./components/PersonaSwitcher.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import MessageInput from "./components/MessageInput.jsx";
import TypingIndicator from "./components/TypingIndicator.jsx";

function uid() {
  // eslint-disable-next-line no-undef
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now() + Math.random());
}

export default function App() {
  const [activePersonaId, setActivePersonaId] = useState("anshuman");
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const requestIdRef = useRef(0);

  const persona = useMemo(
    () => getPersonaById(activePersonaId),
    [activePersonaId]
  );

  const bottomRef = useRef(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Persona switch must reset conversation (per assignment requirement).
    requestIdRef.current += 1;
    setMessages([]);
    setDraft("");
    setErrorText(null);
    setIsTyping(false);
  }, [activePersonaId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  async function sendMessage(text) {
    const trimmed = (text || "").trim();
    if (!trimmed) return;
    if (isTyping) return;

    const previousMessages = messages;
    const requestId = ++requestIdRef.current;
    const userMsg = { id: uid(), role: "user", content: trimmed };
    const nextMessages = [...previousMessages, userMsg];

    setMessages(nextMessages);
    setDraft("");
    setErrorText(null);
    setIsTyping(true);

    try {
      const endpoint = apiBaseUrl
        ? `${apiBaseUrl.replace(/\/$/, "")}/chat`
        : "/chat";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          persona: activePersonaId,
          message: trimmed,
          history: previousMessages,
        }),
      });

      if (requestIdRef.current !== requestId) return;
      const data = await res.json().catch(() => ({}));
      const reply =
        data?.reply ||
        "Sorry—couldn’t get a response. Please try again in a moment.";

      setMessages([...nextMessages, { id: uid(), role: "assistant", content: reply }]);
    } catch (_err) {
      if (requestIdRef.current !== requestId) return;
      setErrorText("Couldn’t reach the server. Please try again.");
      setMessages([
        ...nextMessages,
        {
          id: uid(),
          role: "assistant",
          content:
            "Sorry—something went wrong while contacting the AI. Please try again in a moment.",
        },
      ]);
    } finally {
      if (requestIdRef.current !== requestId) return;
      setIsTyping(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-zinc-400">Active persona</div>
              <div className="text-lg font-bold">{persona?.name}</div>
            </div>
            <div className="hidden sm:block">
              {isTyping ? (
                <TypingIndicator personaName={persona?.name} />
              ) : null}
            </div>
          </div>

          <div className="mt-3">
            <PersonaSwitcher
              personas={PERSONAS}
              activePersonaId={activePersonaId}
              onChange={(id) => setActivePersonaId(id)}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 h-full flex flex-col">
          {errorText ? (
            <div className="mt-3 text-sm text-red-400">{errorText}</div>
          ) : null}

          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            personaName={persona?.name}
          />

          <div ref={bottomRef} />

          <div className="pb-3 safe-bottom-pad">
            <div className="bg-zinc-950 border-t border-zinc-800 p-3 rounded-t-2xl">
              <MessageInput
                value={draft}
                onChange={setDraft}
                onSend={() => sendMessage(draft)}
                disabled={isTyping}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

