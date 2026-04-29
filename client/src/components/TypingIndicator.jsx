export default function TypingIndicator({ personaName }) {
  return (
    <div className="flex items-center gap-2 text-sm text-zinc-300">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-zinc-900 text-zinc-100 border border-zinc-800">
        {personaName?.[0] || "A"}
      </span>
      <span>Thinking</span>
      <span className="inline-flex gap-1" aria-label="typing">
        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.2s]" />
        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.1s]" />
        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
      </span>
    </div>
  );
}

