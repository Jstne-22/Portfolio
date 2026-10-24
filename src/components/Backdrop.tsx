/**
 * Fixed decorative layer behind the page: a faint grid and two star fields.
 * CSS-only, with a small fixed number of elements, so nothing re-renders per frame.
 */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__grid" />
      <div className="backdrop__stars backdrop__stars--near" />
      <div className="backdrop__stars backdrop__stars--far" />
    </div>
  );
}
