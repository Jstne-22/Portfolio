import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent, type UIEvent } from 'react';
import { PHONE_QUERY, useMediaQuery } from '../hooks/useMediaQuery';
import type { ProjectScreenshot } from '../types';

interface ScreenshotGalleryProps {
  title: string;
  screenshots: ProjectScreenshot[];
}

/** A Project's screens: a swipeable strip on phones, a viewer with buttons and thumbnails elsewhere. */
export default function ScreenshotGallery(props: ScreenshotGalleryProps) {
  const phone = useMediaQuery(PHONE_QUERY);
  return phone ? <SwipeGallery {...props} /> : <ViewerGallery {...props} />;
}

/** One screen at a time in a phone-sized viewer, with previous/next buttons and a thumbnail strip. */
function ViewerGallery({ title, screenshots }: ScreenshotGalleryProps) {
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

/** Screens side by side in a native swipe strip; the next one peeks in so Visitors see they can swipe. */
function SwipeGallery({ title, screenshots }: ScreenshotGalleryProps) {
  const [index, setIndex] = useState(0);

  const onScroll = (event: UIEvent<HTMLUListElement>) => {
    const track = event.currentTarget;
    const slides = Array.from(track.children) as HTMLElement[];
    // The current screen is the one whose left edge is closest to the track's.
    let nearest = 0;
    slides.forEach((slide, i) => {
      if (Math.abs(slide.offsetLeft - track.scrollLeft) < Math.abs(slides[nearest].offsetLeft - track.scrollLeft)) {
        nearest = i;
      }
    });
    setIndex(nearest);
  };

  return (
    <div className="gallery gallery--swipe" role="region" aria-label={`${title} screenshots`}>
      <ul className="gallery__track" onScroll={onScroll} tabIndex={0} aria-label="Swipe to see more screens">
        {screenshots.map((shot, i) => (
          <li key={shot.src} className="gallery__slide">
            <img src={shot.src} alt={shot.alt} loading={i < 2 ? 'eager' : 'lazy'} />
          </li>
        ))}
      </ul>
      <p className="gallery__caption" aria-live="polite">
        <span className="gallery__count">
          {index + 1} / {screenshots.length}
        </span>
        {screenshots[index].caption}
      </p>
    </div>
  );
}
