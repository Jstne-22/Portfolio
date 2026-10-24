import { useState } from 'react';
import type { SiteConfig } from '../types';

interface OrbitEmblemProps {
  site: SiteConfig;
}

/**
 * The Owner's profile image inside neon orbit rings, or the glowing logo letter
 * when no image is configured (or the configured one fails to load).
 */
export default function OrbitEmblem({ site }: OrbitEmblemProps) {
  // Remember which path failed, so configuring a different image tries again.
  const [failedImage, setFailedImage] = useState<string>();
  const showImage = Boolean(site.profileImage) && site.profileImage !== failedImage;

  return (
    <div className="orbit">
      <span className="orbit__ring orbit__ring--outer" aria-hidden="true" />
      <span className="orbit__ring orbit__ring--tilted" aria-hidden="true" />
      <span className="orbit__ring orbit__ring--inner" aria-hidden="true" />
      <span className="orbit__planet orbit__planet--a" aria-hidden="true" />
      <span className="orbit__planet orbit__planet--b" aria-hidden="true" />

      <div className="orbit__core">
        {showImage ? (
          <img
            className="orbit__photo"
            src={site.profileImage}
            alt={`Portrait of ${site.fullName}`}
            onError={() => setFailedImage(site.profileImage)}
          />
        ) : (
          <span className="orbit__letter" aria-hidden="true">
            {site.logoLetter}
          </span>
        )}
      </div>
    </div>
  );
}
