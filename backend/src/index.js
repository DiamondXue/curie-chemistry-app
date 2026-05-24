require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { initDb, closeDb } = require('./db');

// 确保 logs 目录存在
const LOG_DIR = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

// 创建日志写入流
const accessLogStream = fs.createWriteStream(
  path.join(LOG_DIR, `access-${new Date().toISOString().slice(0, 10)}.log`),
  { flags: 'a' }
);

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
// 添加缓存控制头
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});
app.use(express.json());
app.use(morgan('dev', {
  stream: {
    write: (msg) => {
      process.stdout.write(msg);
      accessLogStream.write(msg);
    }
  }
}));

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
process.on('SIGTERM', () => { accessLogStream.end(); closeDb(); server.close(); });
process.on('SIGINT',  () => { accessLogStream.end(); closeDb(); server.close(); });

module.exports = app;
