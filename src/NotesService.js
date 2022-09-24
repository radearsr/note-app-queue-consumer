const { Pool } = require("pg");

class NotesService {
  constructor() {
    this._pool = new Pool;
  }

  async getNotes(userId) {
    const query = {
      text: "SELECT nts.* FROM notes AS nts LEFT JOIN collaborations AS clb ON clb.note_id = nts.id WHERE nts.owner = $1 OR clb.user_id = $1 GROUP BY nts.id",
      values: [userId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = NotesService;
