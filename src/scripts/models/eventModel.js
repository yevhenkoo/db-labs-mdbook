const pool = require('../config/db');

const Event = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM "Event"');
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM "Event" WHERE id = $1', [id]);
    return rows[0];
  },

  async create({ user_id, role_id, action, datetime }) {
  const { rows } = await pool.query(
    'INSERT INTO "Event" (user_id, role_id, action, datetime) VALUES ($1, $2, $3, $4) RETURNING *',
    [user_id || null, role_id || null, action, datetime || new Date()]
  );
  return rows[0];
},

  async update(id, { user_id, role_id, action, datetime }) {
    const { rows } = await pool.query(
      'UPDATE "Event" SET user_id = $1, role_id = $2, action = $3, datetime = $4 WHERE id = $5 RETURNING *',
      [user_id, role_id, action, datetime, id]
    );
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query('DELETE FROM "Event" WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  },

  async getByUserId(user_id) {
    const { rows } = await pool.query('SELECT * FROM "Event" WHERE user_id = $1', [user_id]);
    return rows;
  }
};

module.exports = Event;