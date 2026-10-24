import type { Project, ProjectScreenshot } from '../types';

/**
 * The Owner's Projects, in display order. While this list is empty the Projects
 * Section shows a "Projects coming soon" panel instead.
 *
 * Only add real Projects, with technologies they actually use. Example entry:
 *
 * {
 *   title: 'My Project',
 *   description: 'What it does, in a sentence or two.',
 *   technologies: ['React', 'TypeScript'],
 *   preview: { src: '/images/projects/my-project.png', alt: 'Screenshot of My Project' },
 *   liveUrl: 'https://my-project.example.com',
 *   sourceUrl: 'https://github.com/Jstne-22/my-project',
 *   featured: true,
 * },
 */
export const ownerProjects: Project[] = [
  {
    title: 'TranCash',
    description:
      'A mobile-first e-wallet built as my mini thesis. Users can send and request money, pay by QR, deposit, ' +
      'cash out, buy load, pay bills and ask for refunds, with email verification, an MPIN and ID verification (KYC). ' +
      'Admins review deposits, IDs and refunds, manage users, and set fees and limits from their own console.',
    technologies: ['Python', 'Flask', 'Supabase', 'Vercel'],
    screenshots: trancashScreenshots([
      ['home', 'Home'],
      ['send-money', 'Send money'],
      ['send-money-confirm', 'Send money: confirm'],
      ['send-money-receipt', 'Send money: receipt'],
      ['my-qr', 'My QR code'],
      ['pay-request', 'Pay a payment request'],
      ['pay-merchant', 'Pay a merchant'],
      ['merchant-qr', 'Merchant QR'],
      ['deposit', 'Deposit'],
      ['cash-out', 'Cash out'],
      ['buy-load', 'Buy load'],
      ['pay-bills', 'Pay bills'],
      ['refund-request', 'Refund request'],
      ['transactions', 'Transaction history'],
      ['notifications', 'Notifications'],
      ['profile', 'Profile'],
      ['kyc-pending', 'ID verification (KYC)'],
      ['log-in', 'Log in'],
      ['log-in-code', 'Log in: verification code'],
      ['create-account', 'Create account'],
      ['verify-email', 'Create account: verify email'],
      ['admin-dashboard', 'Admin: dashboard'],
      ['admin-statistics', 'Admin: statistics'],
      ['admin-deposits', 'Admin: deposit requests'],
      ['admin-kyc', 'Admin: ID verifications'],
      ['admin-id-review', 'Admin: ID review'],
      ['admin-refunds', 'Admin: refund requests'],
      ['admin-users', 'Admin: users'],
      ['admin-fees', 'Admin: fees and limits'],
      ['admin-admins', 'Admin: manage admins'],
    ]),
    liveUrl: 'https://trancash.vercel.app',
    sourceIsPrivate: true,
    featured: true,
  },
];

function trancashScreenshots(screens: [slug: string, caption: string][]): ProjectScreenshot[] {
  const base = '/images/projects/trancash';
  return screens.map(([slug, caption]) => ({
    src: `${base}/${slug}.webp`,
    thumb: `${base}/thumbs/${slug}.webp`,
    alt: `TranCash ${caption} screen`,
    caption,
  }));
}
