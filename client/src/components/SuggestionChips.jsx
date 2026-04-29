export default function SuggestionChips({ chips, onPick }) {
  if (!chips?.length) return null;

  return (
    <div className="flex gap-2 flex-wrap">
      {chips.map((chip) => (
        <button
          key={chip}
          type="button"
          onClick={() => onPick(chip)}
          className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm border border-gray-200"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}

