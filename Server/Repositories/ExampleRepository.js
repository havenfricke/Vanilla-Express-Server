const db = require('../DB/DbConnection');

class ExampleRepository {

  async getAllExamples() {
    const sql = 'SELECT * FROM examples';
    return await db.query(sql, []);
  }

  async getExampleById(id) {
    const sql = 'SELECT * FROM examples WHERE id = ?';
    const result = await db.query(sql, [id]);
    return result[0]; // return exactly one
  }

  async createExample(id, body) {
    const sql = 'INSERT INTO examples (id, name) VALUES (?, ?)';
    const result = await db.query(sql, [id, body.name]);
    return { id: result.id, name: result.name };
  }

  async editExample(id, body) {
    const sql = 'UPDATE examples SET name = ? WHERE id = ?';
    const result = await db.query(sql, [body.name, id]);
    return { id: result.id, name: result.name };
  }

  async deleteExample(id) {
    const sql = 'DELETE FROM examples WHERE id = ?';
    const result = await db.query(sql, [id]);
    return result; 
  }

}

module.exports = new ExampleRepository();
