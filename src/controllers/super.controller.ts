import { Request, Response } from 'express';
import db from '../config/db';
import bcrypt from 'bcryptjs';

export const createTemple = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, city, state, address, pincode } = req.body;

  if (!name || !city || !state) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  await db.query(
    `INSERT INTO temples (name, city, state, address, pincode)
     VALUES (?, ?, ?, ?, ?)`,
    [name, city, state, address, pincode]
  );

  res.json({ message: 'Temple created successfully' });
};

// super.controller.ts update temple function
export const updateTemple = async (req: Request, res: Response) => {
  try {
    const { temple_id } = req.params;
    const { name, city, state, address, pincode } = req.body;

    await db.query(
      `UPDATE temples 
       SET name = ?, city = ?, state = ?, address = ?, pincode = ?
       WHERE id = ?`,
      [name, city, state, address, pincode, temple_id]
    );

    res.json({ message: 'Temple updated successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
// delete temple function
export const deleteTemple = async (req: Request, res: Response) => {
    try {
      const { temple_id } = req.params;

      // Optional safety: remove relations first
      await db.query('DELETE FROM temple_modules WHERE temple_id = ?', [temple_id]);
      await db.query('DELETE FROM users WHERE temple_id = ?', [temple_id]);

      await db.query('DELETE FROM temples WHERE id = ?', [temple_id]);

      res.json({ message: 'Temple deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
};
// toggle temple active/inactive status
export const toggleTempleStatus = async (req: Request, res: Response) => {
  try {
    const { temple_id } = req.params;

    await db.query(
      `UPDATE temples 
       SET is_active = IF(is_active = 1, 0, 1)
       WHERE id = ?`,
      [temple_id]
    );

    res.json({ message: 'Temple status updated' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// super.controller.ts
export const getTemples = async (req: Request, res: Response) => {
  const [rows]: any = await db.query('SELECT * FROM temples ORDER BY id DESC');
  res.json(rows);
};

// super.controller.ts
export const getTemplesUser = async (req: Request, res: Response) => {
  const [rows]: any = await db.query('SELECT * FROM users ORDER BY id DESC');
  res.json(rows);
};


// super.controller.ts assignTempleAdmin function
export const assignTempleAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, temple_id } = req.body;

    if (!name || !email || !phone || !password || !temple_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Convert temple_id to number
    const templeId = Number(temple_id);
    if (isNaN(templeId)) return res.status(400).json({ message: 'Invalid temple_id' });

    // Check for existing email or phone
    const [existing]: any = await db.query(
      'SELECT * FROM users WHERE email = ? OR phone = ?',
      [email, phone]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email or phone already exists' });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert new temple admin
    await db.query(
  `INSERT INTO users (name, email, phone, password, role, temple_id, status)
   VALUES (?, ?, ?, ?, 'TEMPLE_ADMIN', ?, 1)`,
  [name, email, phone, hashed, templeId]
);

    res.json({ message: 'Temple Admin assigned successfully' });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
// super.controller.ts updateTempleAdmin function
export const updateTempleAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone, temple_id } = req.body;

    await db.query(
      `UPDATE users 
       SET name = ?, email = ?, phone = ?, temple_id = ?
       WHERE id = ? AND role = 'TEMPLE_ADMIN'`,
      [name, email, phone, temple_id, id]
    );

    res.json({ message: 'Temple Admin updated successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
// super.controller.ts deleteTempleAdmin function
export const deleteTempleAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.query(
      `DELETE FROM users WHERE id = ? AND role = 'TEMPLE_ADMIN'`,
      [id]
    );

    res.json({ message: 'Temple Admin deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
// super.controller.ts toggleTempleAdminStatus function
export const toggleTempleAdminStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.query(
      `UPDATE users 
       SET status = IF(status = 1, 0, 1)
       WHERE id = ? AND role = 'TEMPLE_ADMIN'`,
      [id]
    );

    res.json({ message: 'Status updated' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// super.controller.ts module management functions
export const getAllModules = async (req: Request, res: Response) => {
  const [rows]: any = await db.query(
    'SELECT id, name FROM modules ORDER BY name'
  );

  res.json(rows);
};
export const getTempleModules = async (req: Request, res: Response) => {
  const { temple_id } = req.params;

  const [rows]: any = await db.query(
    `SELECT module_id FROM temple_modules WHERE temple_id = ?`,
    [temple_id]
  );

  // return only array of module IDs
  res.json(rows.map((r: any) => r.module_id));
};

export const assignTempleModules = async (req: Request, res: Response) => {
  const { temple_id, module_ids } = req.body;

  if (!temple_id || !module_ids || module_ids.length === 0) {
    return res.status(400).json({ message: 'Temple & modules required' });
  }

  // remove old modules
  await db.query(
    'DELETE FROM temple_modules WHERE temple_id = ?',
    [temple_id]
  );

  // assign new modules
  for (const moduleId of module_ids) {
    await db.query(
      'INSERT INTO temple_modules (temple_id, module_id) VALUES (?, ?)',
      [temple_id, moduleId]
    );
  }

  res.json({ message: 'Temple modules assigned successfully' });
};



export const getMyModules = async (req: any, res: Response) => {
  const { role, temple_id } = req.user;

  // SUPER ADMIN → all modules
  if (role === 'SUPER_ADMIN') {
    const [rows]: any = await db.query(
      'SELECT name FROM modules ORDER BY name'
    );
    return res.json(rows.map((r: any) => r.name));
  }

  // TEMPLE ADMIN / STAFF → temple modules
  const [rows]: any = await db.query(
    `SELECT m.name
     FROM temple_modules tm
     JOIN modules m ON m.id = tm.module_id
     WHERE tm.temple_id = ?`,
    [temple_id]
  );

  res.json(rows.map((r: any) => r.name));
};
