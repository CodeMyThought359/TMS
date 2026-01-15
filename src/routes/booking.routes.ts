import { Router } from 'express';
import { createBooking, getBookings } from '../controllers/booking.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkModule } from '../middlewares/module.middleware';

const router = Router();

router.post(
  '/',
  authMiddleware,
  checkModule('BOOKING'),
  createBooking
);

router.get(
  '/',
  authMiddleware,
  checkModule('BOOKING'),
  getBookings
);

export default router;
