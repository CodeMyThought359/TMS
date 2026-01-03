


const db = require("../config/db");

const TempleModule = {
  getByTempleId: (templeId, callback) => {
    const sql = `
      SELECT * FROM temple_modules
      WHERE temple_id = ?
    `;
    db.query(sql, [templeId], callback);
  }
};

module.exports = TempleModule;
