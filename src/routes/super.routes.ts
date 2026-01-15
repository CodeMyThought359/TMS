import { Router } from 'express';

import { createTemple,
  getTemples,
  getTemplesUser ,
   assignTempleModules,
   getAllModules,
  getTempleModules,
  getMyModules,
  updateTemple,      // ✅ ADD
  deleteTemple ,
  toggleTempleStatus ,
  updateTempleAdmin,
  deleteTempleAdmin,
  toggleTempleAdminStatus
} from '../controllers/super.controller';
import { assignTempleAdmin } from '../controllers/super.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { allowRole } from '../middlewares/role.middleware';

const router = Router();

router.post(
  '/temple',
  authMiddleware,
  allowRole('SUPER_ADMIN'),
  createTemple
);
// UPDATE TEMPLE
router.put(
  '/temple/:temple_id',
  authMiddleware,
  allowRole('SUPER_ADMIN'),
  updateTemple
);

// DELETE TEMPLE
router.delete(
  '/temple/:temple_id',
  authMiddleware,
  allowRole('SUPER_ADMIN'),
  deleteTemple
);
// active / inactive temple
router.patch(
  '/temple-toggle/:temple_id',
  authMiddleware,
  allowRole('SUPER_ADMIN'),
  toggleTempleStatus
);
// assign temple admin
router.post(
  '/assign-temple-admin',
  authMiddleware,
  allowRole('SUPER_ADMIN'),
  assignTempleAdmin
);
// super.routes.ts - get temples
router.get('/temple',
   authMiddleware,
    allowRole('SUPER_ADMIN'),
     getTemples
    );
// super.routes.ts - get temple users
router.get('/temple-users',
   authMiddleware,
    allowRole('SUPER_ADMIN'),
     getTemplesUser
    );
// update temple admin
  router.put(
  '/temple-admin/:id',
  authMiddleware,
  allowRole('SUPER_ADMIN'),
  updateTempleAdmin
);
// delete temple admin
router.delete(
  '/temple-admin/:id',
  authMiddleware,
  allowRole('SUPER_ADMIN'),
  deleteTempleAdmin
);
// toggle temple admin active/inactive status
router.patch(
  '/temple-admin-toggle/:id',
  authMiddleware,
  allowRole('SUPER_ADMIN'),
  toggleTempleAdminStatus
);
// assign temple modules
router.post(
  '/assign-temple-modules',
  authMiddleware,
  allowRole('SUPER_ADMIN'),
  assignTempleModules
);
// get all modules
router.get(
  '/modules',
  authMiddleware,
  allowRole('SUPER_ADMIN'),
  getAllModules
);
// get temple modules
router.get(
  '/temple-modules/:temple_id',
  authMiddleware,
  allowRole('SUPER_ADMIN'),
  getTempleModules
);
// get my modules
router.get(
  '/my-modules',
  authMiddleware,
  getMyModules
);
export default router;
