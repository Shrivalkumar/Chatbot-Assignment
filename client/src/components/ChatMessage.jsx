function roleToStyle(role) {
  if (role === "assistant") {
    return "bg-zinc-900 border-zinc-800 text-zinc-100";
  }
  return "bg-zinc-100 text-zinc-950 border-zinc-100";
}

export default function ChatMessage({ role, content }) {
  const style = roleToStyle(role);
  return (
    <div className={"w-full " + (role === "user" ? "flex justify-end" : "flex justify-start")}>
      <div
        className={
          "max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 border shadow-sm " + style
        }
      >
        <p className="text-sm sm:text-base whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}

