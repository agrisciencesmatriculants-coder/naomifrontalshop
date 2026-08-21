import { memo, useMemo } from 'react';

/**
 * Falling-petals ambient layer — port of the approved page's
 * `.petals-container` (18 petals, 3 gradient variants, randomized
 * 8–20s fall). Home + thank-you pages only. Rendered with
 * `prefers-reduced-motion` suppression via CSS.
 */
function Petals() {
  // Deterministic pseudo-random layout (stable across renders, lint-pure).
  const petals = useMemo(() => {
    const rand = (seed: number) => {
      const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: 18 }, (_, i) => {
      const size = 16 + rand(i * 4 + 1) * 16;
      return {
        id: i,
        variant: (['', 's2', 's3'] as const)[i % 3],
        left: `${rand(i * 4 + 2) * 100}%`,
        duration: `${8 + rand(i * 4 + 3) * 12}s`,
        delay: `${rand(i * 4 + 4) * 8}s`,
        size: `${size}px`,
      };
    });
  }, []);

  return (
    <div className="petals-container" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className={`petal ${p.variant}`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

export default memo(Petals);
