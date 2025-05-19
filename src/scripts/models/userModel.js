const pool = require('../config/db');

const User = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM "User"');
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM "User" WHERE id = $1', [id]);
    return rows[0];
  },

  async create({ nickname, email, password, photo }) {
    const { rows } = await pool.query(
      'INSERT INTO "User" (nickname, email, password, photo) VALUES ($1, $2, $3, $4) RETURNING *',
      [nickname, email, password, photo]
    );
    return rows[0];
  },

  async update(id, { nickname, email, password, photo }) {
    const { rows } = await pool.query(
      'UPDATE "User" SET nickname = $1, email = $2, password = $3, photo = $4 WHERE id = $5 RETURNING *',
      [nickname, email, password, photo, id]
    );
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query('DELETE FROM "User" WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }
};

module.exports = User;