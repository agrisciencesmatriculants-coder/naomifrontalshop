/**
 * Shared site/contact constants for NaomiCrowns.
 * Leaf module — import from here anywhere (no circular deps).
 */
export const SITE = {
  name: 'NaomiCrowns',
  domain: 'https://naomicrowns.young-agripreneurs.com',
  /** George first, Naomi second — both hold the identical admin role. */
  adminEmails: ['youngagripreneurs.ng@gmail.com', 'teffokgothatso9@gmail.com'],
  naomiPhone: '+27 79 751 9677',
  whatsapp: 'https://wa.me/27797519677',
} as const;
