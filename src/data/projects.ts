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
    tagline: 'Digital Wallet Web App',
    description:
      'A mobile-first e-wallet where users can send money, pay bills, buy load, cash out and pay merchants by QR code. ' +
      'It has a full admin console for approving deposits, verifying IDs and handling refunds. Built with Python (Flask) ' +
      'and PostgreSQL, deployed on Vercel, and installable as a phone app (PWA).',
    about: {
      overview:
        'TranCash is a full-stack digital wallet web application inspired by e-wallets like GCash and Maya. ' +
        'It is designed mobile-first, and users can install it on their phone like a regular app.',
      featureGroups: [
        {
          heading: 'For users',
          items: [
            'Send and request money by username, account number, mobile number, or QR code',
            'Pay bills, buy mobile load, cash out to a bank, and request deposits',
            'Pay merchants by scanning a QR code, and set up your own merchant profile with a QR code',
            'Schedule transfers for a future date',
            'Request a refund or reversal for a transfer sent by mistake',
            'View the full transaction history with receipts, plus real-time notifications',
          ],
        },
        {
          heading: 'Security',
          items: [
            'Email verification and optional 2-step login with one-time codes',
            'A 6-digit MPIN required for every payment',
            'Account lockout after repeated wrong passwords or MPINs',
            'Trusted devices, and automatic sign-out after inactivity',
            'CSRF protection, and protection against double-submitted payments',
          ],
        },
        {
          heading: 'Account levels',
          items: [
            'KYC identity verification: users upload a government ID',
            'Basic vs. Fully Verified accounts, each with different transaction limits',
          ],
        },
        {
          heading: 'For admins',
          items: [
            'An admin console for approving deposits, reviewing ID verifications, and handling refund requests',
            'Admin powers: adjust balances, suspend accounts, and change fees and limits',
            'Two admin roles (Super Admin and Admin), with every action recorded in an activity log',
          ],
        },
      ],
    },
    // The first four are the ones phones show before "+N more".
    technologies: [
      'Python',
      'Flask',
      'PostgreSQL (Supabase)',
      'PWA',
      'Jinja',
      'SQLite',
      'HTML/CSS',
      'JavaScript',
      'pytest',
      'Vercel',
    ],
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
