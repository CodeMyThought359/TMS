import db from '../config/db';

export const checkModule = (moduleName: string) => {
  return async (req: any, res: any, next: any) => {
    if (req.user.role === 'SUPER_ADMIN') return next();

    const [rows]: any = await db.query(
      `SELECT m.name FROM modules m
       JOIN staff_modules sm ON sm.module_id = m.id
       WHERE sm.user_id = ? AND m.name = ?`,
      [req.user.id, moduleName]
    );

    if (!rows.length) return res.sendStatus(403);

    next();
  };
};
