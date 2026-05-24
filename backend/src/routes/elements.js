const router = require('express').Router();
const { getDb } = require('../db');

// GET /api/elements — 全部元素（?category= & ?search= & ?page= & ?limit=）
router.get('/', (req, res) => {
  const db = getDb();
  const { category, search, page = 1, limit = 118 } = req.query;

  let sql = 'SELECT * FROM elements WHERE 1=1';
  const params = [];

  if (category) {
    sql += ' AND category = ?';
    params.push(category);
  }
  if (search) {
    sql += ' AND (symbol LIKE ? OR name LIKE ? OR nameEn LIKE ? OR CAST(number AS TEXT) LIKE ?)';
    const q = `%${search}%`;
    params.push(q, q, q, q);
  }

  // count
  const countRow = db.prepare(sql.replace('SELECT *', 'SELECT COUNT(*) AS cnt')).get(...params);
  const total = countRow.cnt;

  // pagination
  const offset = (Number(page) - 1) * Number(limit);
  sql += ' ORDER BY number LIMIT ? OFFSET ?';
  params.push(Number(limit), offset);

  const rows = db.prepare(sql).all(...params);
  const data = rows.map(row => ({ ...row, uses: JSON.parse(row.uses) }));

  res.json({ total, page: Number(page), limit: Number(limit), data });
});

// GET /api/elements/:number — 单个元素
router.get('/:number', (req, res) => {
  const db = getDb();
  const row = db.prepare('SELECT * FROM elements WHERE number = ?').get(Number(req.params.number));
  if (!row) return res.status(404).json({ error: 'Element not found' });
  res.json({ ...row, uses: JSON.parse(row.uses) });
});

module.exports = router;
