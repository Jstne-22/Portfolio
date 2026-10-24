/** A 24×24 brand logo path (simple-icons format), drawn decoratively. */
export default function BrandSvg({ path, size, fill = 'currentColor' }: { path: string; size: number; fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} aria-hidden="true" focusable="false">
      <path d={path} />
    </svg>
  );
}
