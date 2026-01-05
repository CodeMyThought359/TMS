

const db = require("../config/db");

// Get all modules
exports.getAll = (callback) => {
  db.query("SELECT * FROM modules", callback);
};

// Create module
exports.create = (moduleData, callback) => {
  db.query("INSERT INTO modules SET ?", moduleData, callback);
};

// Update module
exports.update = (id, moduleData, callback) => {
  db.query("UPDATE modules SET ? WHERE id = ?", [moduleData, id], callback);
};

// Delete module
exports.delete = (id, callback) => {
  db.query("DELETE FROM modules WHERE id = ?", [id], callback);
};

// Get enabled modules by temple
exports.getEnabledByTemple = (templeId, callback) => {
  const sql = `
    SELECT m.id, m.name AS module_name, m.category, tm.is_enabled
    FROM temple_modules tm
    JOIN modules m ON m.id = tm.module_id
    WHERE tm.temple_id = ?
      AND tm.is_enabled = 1
  `;
  db.query(sql, [templeId], callback);
};