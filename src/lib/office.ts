/**
 * NaomiCrowns staff members and office management
 * Used by AI Concierge for routing and personalization
 */

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string; // Hex color for avatar background
  bio?: string;
  expertise?: string[];
}

// Manager profiles (specialized roles)
export const MANAGERS: StaffMember[] = [
  {
    id: 'mgr_swift',
    name: 'Dr. Swift',
    role: 'Inventory & Logistics Manager',
    initials: 'DS',
    color: '#E07A8C',
    bio: 'Handles order tracking, delivery, and inventory management.',
    expertise: ['tracking', 'delivery', 'shipping', 'logistics'],
  },
  {
    id: 'mgr_tech',
    name: 'Dr. Tech',
    role: 'Payments & Checkout Specialist',
    initials: 'DT',
    color: '#C96B7E',
    bio: 'Manages payments, checkout flow, and transaction issues.',
    expertise: ['payments', 'checkout', 'billing', 'refunds'],
  },
];

// Sales stylists (on-duty rotation)
export const SALES_STYLISTS: StaffMember[] = [
  {
    id: 'stylist_naomi',
    name: 'Naomi',
    role: 'Sales Stylist',
    initials: 'NK',
    color: '#B8506A',
    bio: 'Head stylist; expert in wig selection and sizing.',
    expertise: ['product-selection', 'sizing', 'styling', 'recommendations'],
  },
  {
    id: 'stylist_amara',
    name: 'Amara',
    role: 'Sales Stylist',
    initials: 'AM',
    color: '#D4825F',
    bio: 'Specializes in bouncy blends and premium hair care.',
    expertise: ['product-selection', 'hair-care', 'maintenance'],
  },
  {
    id: 'stylist_zara',
    name: 'Zara',
    role: 'Sales Stylist',
    initials: 'ZK',
    color: '#9B6B5F',
    bio: 'Expert in bob wigs and quick styling tips.',
    expertise: ['bob-wigs', 'quick-tips', 'beginner-advice'],
  },
];

/**
 * Get on-duty stylists (currently all are available; customize for real scheduling)
 * In production, filter based on actual shift schedules or availability
 */
export function onDutyStylists(): StaffMember[] {
  // For now, return the first stylist; in production, check a schedule
  return SALES_STYLISTS.slice(0, 1);
}

/**
 * Find a staff member by ID
 */
export function getStaffMember(id: string): StaffMember | null {
  const all = [...MANAGERS, ...SALES_STYLISTS];
  return all.find((s) => s.id === id) || null;
}

/**
 * Get all staff members (managers + stylists)
 */
export function getAllStaff(): StaffMember[] {
  return [...MANAGERS, ...SALES_STYLISTS];
}
