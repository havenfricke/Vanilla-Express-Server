const db = require('../DB/DbConnection');

async function getAllExamples() {
  const sql = 'SELECT * FROM examples';
  return await db.query(sql, []);
}

async function getExampleById(id) {
  const sql = 'SELECT * FROM examples WHERE id = ?';
  const result = await db.query(sql, [id]);
  return result[0]; // return exactly one
}

async function createExample(id, body) {
  const sql = 'INSERT INTO examples (id, name) VALUES (?, ?)';
  await db.query(sql, [id, body.name]);
  return { id, name: body.name };
}

async function editExample(id, body) {
  const sql = 'UPDATE examples SET name = ? WHERE id = ?';
  await db.query(sql, [body.name, id]);
  return { id, name: body.name };
}

async function deleteExample(id) {
  const sql = 'DELETE FROM examples WHERE id = ?';
  const result = await db.query(sql, [id]);
  return result; 
}

module.exports = {
  getAllExamples,
  getExampleById,
  createExample,
  editExample,
  deleteExample
};
