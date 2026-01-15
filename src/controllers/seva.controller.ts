export const createSeva = async (req: any, res: Response) => {
  const { seva_name, seva_date, amount } = req.body;

  await db.query(
    `INSERT INTO seva (temple_id, seva_name, seva_date, amount, created_by)
     VALUES (?, ?, ?, ?, ?)`,
    [req.user.temple_id, seva_name, seva_date, amount, req.user.id]
  );

  res.json({ message: 'Seva created' });
};
