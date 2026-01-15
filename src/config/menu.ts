import { Role } from '../types/auth';

export interface MenuItem {
  label: string;
  path: string;
  module?: 'BOOKING' | 'SEVA' | 'DONATION' | 'STAFF' | 'REPORT';
  roles: Role[];
}

// export const MENU: MenuItem[] = [
//   // ===== SUPER ADMIN =====
//   {
//     label: 'Create Temple',
//     path: '/super-admin/temples',
//     roles: ['SUPER_ADMIN']
//   },
//   {
//     label: 'Assign Temple Admin',
//     path: '/super-admin/assign-admin',
//     roles: ['SUPER_ADMIN']
//   },
//   {
//     label: 'Assign Modules',
//     path: '/super-admin/assign-modules',
//     roles: ['SUPER_ADMIN']
//   },
//   {
//     label: 'Reports',
//     path: '/super-admin/reports',
//     roles: ['SUPER_ADMIN']
//   },

//   // ===== TEMPLE ADMIN & STAFF =====
//   {
//     label: 'Bookings',
//     path: '/booking',
//     module: 'BOOKING',
//     roles: ['TEMPLE_ADMIN']
//   },
//   {
//     label: 'Seva',
//     path: '/seva',
//     module: 'SEVA',
//     roles: ['TEMPLE_ADMIN']
//   },
//   {
//     label: 'Donations',
//     path: '/donation',
//     module: 'DONATION',
//     roles: ['TEMPLE_ADMIN']
//   }
// ];

export const MENU: MenuItem[] = [
  // ===== SUPER ADMIN =====
  {
    label: 'Create Temple',
    path: '/super-admin/temples',
    roles: ['SUPER_ADMIN']
  },
  {
    label: 'Assign Temple Admin',
    path: '/super-admin/assign-admin',
    roles: ['SUPER_ADMIN']
  },
  {
    label: 'Assign Modules',
    path: '/super-admin/assign-modules',
    roles: ['SUPER_ADMIN']
  },
  {
    label: 'Reports',
    path: '/super-admin/reports',
    roles: ['SUPER_ADMIN']
  },

  // ===== TEMPLE ADMIN & STAFF =====
  {
    label: 'Bookings',
    path: '/booking',
    module: 'BOOKING',
    roles: ['TEMPLE_ADMIN']
  },
  {
    label: 'Seva',
    path: '/seva',
    module: 'SEVA',
    roles: ['TEMPLE_ADMIN']
  },
  
  {
    label: 'Donations',
    path: '/donation',
    module: 'DONATION',
    roles: ['TEMPLE_ADMIN']
  },
  {
    label: 'Users',
    path: '/User',
    module: 'STAFF',
    roles: ['TEMPLE_ADMIN']
  }
];
