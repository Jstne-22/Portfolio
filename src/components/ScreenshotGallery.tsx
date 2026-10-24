import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { ProjectScreenshot } from '../types';

interface ScreenshotGalleryProps {
  title: string;
  screenshots: ProjectScreenshot[];
}

/** A phone-sized viewer for one screen at a time, with previous/next buttons and a thumbnail strip. */
export default function ScreenshotGallery({ title, screenshots }: ScreenshotGalleryProps) {
  const [index, setIndex] = useState(0);
  const viewerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);
  const current = screenshots[index];
  const count = screenshots.length;

  const show = (next: number) => setIndex((next + count) % count);

  useEffect(() => {
    // Long screens scroll inside the viewer; each new one starts at its top.
    if (viewerRef.current) viewerRef.current.scrollTop = 0;
    // Centre the active thumbnail without scrolling the page itself (scrollIntoView would).
    const strip = stripRef.current;
    const thumb = strip?.children[index] as HTMLElement | undefined;
    if (strip && thumb) {
      strip.scrollLeft = thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2;
    }
  }, [index]);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') show(index - 1);
    else if (event.key === 'ArrowRight') show(index + 1);
    else return;
    event.preventDefault();
  };

  return (
    <div className="gallery" role="region" aria-roledescription="carousel" aria-label={`${title} screenshots`} onKeyDown={onKeyDown}>
      <div className="gallery__stage">
        <button type="button" className="gallery__nav" onClick={() => show(index - 1)} aria-label="Previous screenshot">
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <div className="gallery__viewer" ref={viewerRef} tabIndex={0} aria-label={`${current.caption}, scrollable`}>
          <img key={current.src} src={current.src} alt={current.alt} />
        </div>
        <button type="button" className="gallery__nav" onClick={() => show(index + 1)} aria-label="Next screenshot">
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
      <p className="gallery__caption" aria-live="polite">
        <span className="gallery__count">
          {index + 1} / {count}
        </span>
        {current.caption}
      </p>
      <ul className="gallery__strip" ref={stripRef}>
        {screenshots.map((shot, i) => (
          <li key={shot.src}>
            <button
              type="button"
              className="gallery__thumb"
              onClick={() => setIndex(i)}
              aria-label={shot.caption}
              aria-current={i === index ? 'true' : undefined}
            >
              <img src={shot.thumb ?? shot.src} alt="" loading="lazy" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
