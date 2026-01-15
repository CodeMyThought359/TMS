export const createDonation = async (req: any, res: Response) => {
  const { donor_name, amount, payment_mode } = req.body;

  await db.query(
    `INSERT INTO donations (temple_id, donor_name, amount, payment_mode, created_by)
     VALUES (?, ?, ?, ?, ?)`,
    [req.user.temple_id, donor_name, amount, payment_mode, req.user.id]
  );

  res.json({ message: 'Donation added' });
};
