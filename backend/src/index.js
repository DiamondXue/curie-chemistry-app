require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { initDb, closeDb } = require('./db');

const elementsRouter = require('./routes/elements');
const coursesRouter  = require('./routes/courses');
const statsRouter    = require('./routes/stats');
const faqRouter      = require('./routes/faq');
const testimonialsRouter = require('./routes/testimonials');

/* ── DB init ── */
initDb();

const app = express();
const PORT = process.env.PORT || 4000;

/* ── Middleware ── */
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json());
app.use(morgan('dev'));

/* ── Routes ── */
app.use('/api/elements',     elementsRouter);
app.use('/api/courses',      coursesRouter);
app.use('/api/stats',        statsRouter);
app.use('/api/faq',          faqRouter);
app.use('/api/testimonials', testimonialsRouter);

/* ── Health check ── */
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

/* ── 404 fallback ── */
app.use((_req, res) => res.status(404).json({ error: 'Not Found' }));

/* ── Start ── */
const server = app.listen(PORT, () => {
  console.log(`🧪 居里化学 API running → http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => { closeDb(); server.close(); });
process.on('SIGINT',  () => { closeDb(); server.close(); });

module.exports = app;
