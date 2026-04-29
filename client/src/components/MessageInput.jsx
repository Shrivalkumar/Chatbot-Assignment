export default function MessageInput({
  value,
  onChange,
  onSend,
  disabled,
}) {
  return (
    <form
      className="flex gap-2 items-end w-full"
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
    >
      <div className="flex-1">
        <label className="sr-only" htmlFor="messageBox">
          Message
        </label>
        <textarea
          id="messageBox"
          value={value}
          rows={1}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask anything…"
          className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-700 text-zinc-100"
          disabled={disabled}
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="px-4 py-3 rounded-xl bg-zinc-100 text-zinc-950 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

