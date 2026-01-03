
const db = require("../config/db");

const findAdminByEmail = (email, callback) => {
  db.query("SELECT * FROM admin WHERE email = ?", [email], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

const findAdminByPhone = (phone, callback) => {
  db.query("SELECT * FROM admin WHERE phone = ?", [phone], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

const updateAdminPasswordByEmail = (email, hashedPassword, callback) => {
  db.query("UPDATE admin SET password = ? WHERE email = ?", [hashedPassword, email], callback);
};

const updateAdminPasswordByPhone = (phone, hashedPassword, callback) => {
  db.query("UPDATE admin SET password = ? WHERE phone = ?", [hashedPassword, phone], callback);
};

const updateAdminPasswordById = (id, hashedPassword, callback) => {
  db.query("UPDATE admin SET password = ? WHERE id = ?", [hashedPassword, id], callback);
};

module.exports = {
  findAdminByEmail,
  findAdminByPhone,
  updateAdminPasswordByEmail,
  updateAdminPasswordByPhone,
  updateAdminPasswordById,
};
