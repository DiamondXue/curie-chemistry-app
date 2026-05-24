const router = require('express').Router();
const { getDb } = require('../db');

// GET /api/stats
router.get('/', (_req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT key, value FROM stats').all();
  const stats = {};
  for (const { key, value } of rows) {
    stats[key] = isNaN(value) ? value : Number(value);
  }
  res.json(stats);
});

module.exports = router;
