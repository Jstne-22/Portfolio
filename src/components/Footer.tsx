import type { SiteConfig } from '../types';

export default function Footer({ site }: { site: SiteConfig }) {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {site.fullName}. Built with React and TypeScript.
      </p>
    </footer>
  );
}
