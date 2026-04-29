import ChatMessage from "./ChatMessage.jsx";
import TypingIndicator from "./TypingIndicator.jsx";

export default function ChatWindow({ messages, isTyping, personaName }) {
  return (
    <div className="flex-1 overflow-y-auto px-2 sm:px-0">
      <div className="max-w-3xl mx-auto py-4 space-y-3">
        {messages.map((m, idx) => (
          <ChatMessage key={m.id || idx} role={m.role} content={m.content} />
        ))}

        {isTyping ? (
          <div className="px-2">
            <TypingIndicator personaName={personaName} />
          </div>
        ) : null}

        <div className="h-2" />
      </div>
    </div>
  );
}

