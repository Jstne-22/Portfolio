import type { SkillIcon } from '../types';
import BrandSvg from './BrandSvg';

/** Draws a Skill's logo in the light text colour: a simple-icons brand path or a Lucide fallback. Decorative only. */
export default function SkillLogo({ icon, size = 36 }: { icon: SkillIcon; size?: number }) {
  if (icon.kind === 'generic') {
    const Icon = icon.icon;
    return <Icon size={size} color={icon.color} strokeWidth={1.75} aria-hidden="true" />;
  }
  return <BrandSvg path={icon.icon.path} size={size} fill={icon.color ?? 'var(--text-primary)'} />;
}
