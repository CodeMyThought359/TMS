export const createStaff = async (req: any, res: Response) => {
  const { name, email, phone, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await db.query(
    `INSERT INTO users 
     (name, email, phone, password, role, temple_id)
     VALUES (?, ?, ?, ?, 'STAFF', ?)`,
    [name, email, phone, hashed, req.user.temple_id]
  );

  res.json({ message: 'Staff created' });
};

export const assignStaffModules = async (req: Request, res: Response) => {
  const { staff_id, module_ids } = req.body;

  for (const module_id of module_ids) {
    await db.query(
      'INSERT INTO staff_modules (user_id, module_id) VALUES (?, ?)',
      [staff_id, module_id]
    );
  }

  res.json({ message: 'Modules assigned to staff' });
};
