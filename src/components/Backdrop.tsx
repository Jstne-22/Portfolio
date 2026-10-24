/**
 * Fixed decorative layer behind the page: a faint grid, two star fields and a few slow orbs.
 * CSS-only, with a small fixed number of elements, so nothing re-renders per frame.
 */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__grid" />
      <div className="backdrop__stars backdrop__stars--near" />
      <div className="backdrop__stars backdrop__stars--far" />
      <div className="backdrop__orb backdrop__orb--pink" />
      <div className="backdrop__orb backdrop__orb--purple" />
      <div className="backdrop__orb backdrop__orb--blue" />
    </div>
  );
}
