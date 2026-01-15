

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db';

export const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Login & password required' });
  }

  const [rows]: any = await db.query(
    `SELECT * FROM users WHERE email = ? OR phone = ?`,
    [login, login]
  );

  if (!rows || rows.length === 0) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const user = rows[0];

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // 🔥 LOAD MODULES BASED ON ROLE
  let modules: string[] = [];

  // 👉 TEMPLE ADMIN → from temple_modules
  if (user.role === 'TEMPLE_ADMIN') {
    const [rows]: any = await db.query(
      `SELECT m.name
       FROM temple_modules tm
       JOIN modules m ON m.id = tm.module_id
       WHERE tm.temple_id = ?`,
      [user.temple_id]
    );
    modules = rows.map((r: any) => r.name);
  }

  // 👉 STAFF → from staff_modules
  if (user.role === 'STAFF') {
    const [rows]: any = await db.query(
      `SELECT m.name
       FROM staff_modules sm
       JOIN modules m ON m.id = sm.module_id
       WHERE sm.staff_id = ?`,
      [user.id]
    );
    modules = rows.map((r: any) => r.name);
  }

  // 👉 SUPER ADMIN → full access
  if (user.role === 'SUPER_ADMIN') {
    modules = ['BOOKING', 'SEVA', 'DONATION', 'STAFF', 'REPORT'];
  }

  // ✅ TOKEN
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      temple_id: user.temple_id
    },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );

  // ✅ RESPONSE
  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      temple_id: user.temple_id,
      modules   // ⭐ THIS FIXES SIDEBAR
    },
    token
  });
};
