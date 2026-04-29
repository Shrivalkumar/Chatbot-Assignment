import { useMemo, useState } from "react";

function tryImageSrc(personaId, ext) {
  // We expect the user to drop images into `client/public/personas/`.
  // Supported filenames:
  // - /personas/anshuman.jpg or /personas/anshuman.png
  return `/personas/${personaId}.${ext}`;
}

function PersonaImage({ personaId, alt }) {
  const jpgSrc = useMemo(() => tryImageSrc(personaId, "jpg"), [personaId]);
  const pngSrc = useMemo(() => tryImageSrc(personaId, "png"), [personaId]);

  const [src, setSrc] = useState(jpgSrc);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
        <div className="text-zinc-300 text-sm font-semibold">{alt?.[0] || "?"}</div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="object-cover w-full h-full rounded-xl"
      loading="lazy"
      onError={() => {
        if (src === jpgSrc) {
          setSrc(pngSrc);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}

export default function PersonaSwitcher({
  personas,
  activePersonaId,
  onChange,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {personas.map((p) => {
        const isActive = p.id === activePersonaId;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onChange(p.id)}
            aria-pressed={isActive}
            className={
              "relative overflow-hidden rounded-xl border transition text-left " +
              (isActive
                ? "border-zinc-500 bg-zinc-900"
                : "border-zinc-800 bg-zinc-950 hover:bg-zinc-900")
            }
          >
            <div className="aspect-square">
              <PersonaImage personaId={p.id} alt={p.name} />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
              <div className="text-sm font-semibold text-zinc-100">{p.name}</div>
              {isActive ? (
                <div className="text-xs text-zinc-300">Active</div>
              ) : null}
            </div>
          </button>
        );
      })}
    </div>
  );
}

