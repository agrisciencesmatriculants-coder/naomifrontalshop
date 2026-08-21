import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

/**
 * Material Icons (Rounded) glyph, consistent with the approved homepage.
 * Ligature-based: <Icon name="shopping_bag" />
 */
export default function Icon({
  name,
  className,
  style,
  size,
}: {
  name: string;
  className?: string;
  style?: CSSProperties;
  /** font-size in rem */
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn('material-icons-round', className)}
      style={{ ...(size ? { fontSize: `${size}rem` } : {}), ...style }}
    >
      {name}
    </span>
  );
}
