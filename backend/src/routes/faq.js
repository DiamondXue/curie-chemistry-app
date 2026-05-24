const router = require('express').Router();
const { getDb } = require('../db');

router.get('/', (_req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM faq ORDER BY id').all();
  res.json({ total: rows.length, data: rows });
});

module.exports = router;
