import { Request, Response } from 'express';
import db from '../config/db';

export const createBooking = async (req: any, res: Response) => {
  const { devotee_name, booking_date } = req.body;

  await db.query(
    `INSERT INTO bookings (temple_id, devotee_name, booking_date, created_by)
     VALUES (?, ?, ?, ?)`,
    [req.user.temple_id, devotee_name, booking_date, req.user.id]
  );

  res.json({ message: 'Booking created' });
};

export const getBookings = async (req: any, res: Response) => {
  const [rows] = await db.query(
    `SELECT * FROM bookings WHERE temple_id = ?`,
    [req.user.temple_id]
  );
  res.json(rows);
};
