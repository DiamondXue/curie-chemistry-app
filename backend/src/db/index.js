const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const elements = require('../data/elements');
const { courses, experiments, chapters, lessons, quizQuestions } = require('../data/courses');
const { stats, faq, testimonials } = require('../data/misc');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../data/curie.db');

let db = null;

function getDb() {
  if (db) return db;
  throw new Error('Database not initialized. Call initDb() first.');
}

function initDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  createTables();
  seedIfEmpty();

  console.log(`🗄️  SQLite connected → ${DB_PATH}`);
  return db;
}

function createTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS elements (
      number       INTEGER PRIMARY KEY,
      symbol       TEXT    NOT NULL,
      name         TEXT    NOT NULL,
      nameEn       TEXT    NOT NULL,
      category     TEXT    NOT NULL,
      period       INTEGER NOT NULL,
      "group"      INTEGER,
      atomicMass   REAL,
      meltingPoint REAL,
      boilingPoint REAL,
      density      REAL,
      electronegativity REAL,
      story        TEXT,
      uses         TEXT    DEFAULT '[]'
    );

    CREATE TABLE IF NOT EXISTS courses (
      id          INTEGER PRIMARY KEY,
      num         TEXT    NOT NULL,
      title       TEXT    NOT NULL,
      lessons     INTEGER NOT NULL,
      hours       INTEGER NOT NULL,
      target      TEXT,
      level       TEXT    NOT NULL,
      description TEXT,
      topics      TEXT    DEFAULT '[]'
    );

    CREATE TABLE IF NOT EXISTS experiments (
      id          INTEGER PRIMARY KEY,
      title       TEXT    NOT NULL,
      description TEXT,
      equation    TEXT,
      materials   TEXT    DEFAULT '[]',
      steps       TEXT    DEFAULT '[]',
      safety      TEXT    DEFAULT '[]',
      tags        TEXT    DEFAULT '[]',
      canvasTheme TEXT,
      bg          TEXT
    );

    CREATE TABLE IF NOT EXISTS faq (
      id       INTEGER PRIMARY KEY,
      question TEXT NOT NULL,
      answer   TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id       INTEGER PRIMARY KEY,
      stars    INTEGER NOT NULL,
      text     TEXT    NOT NULL,
      name     TEXT    NOT NULL,
      role     TEXT,
      initial  TEXT,
      gradient TEXT
    );

    CREATE TABLE IF NOT EXISTS stats (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS chapters (
      id          INTEGER PRIMARY KEY,
      course_id   INTEGER NOT NULL,
      num         TEXT    NOT NULL,
      title       TEXT    NOT NULL,
      description TEXT,
      order_idx   INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (course_id) REFERENCES courses(id)
    );

    CREATE TABLE IF NOT EXISTS lessons (
      id          INTEGER PRIMARY KEY,
      chapter_id  INTEGER NOT NULL,
      course_id   INTEGER NOT NULL,
      num         TEXT    NOT NULL,
      title       TEXT    NOT NULL,
      content     TEXT    DEFAULT '',
      duration    INTEGER DEFAULT 0,
      type        TEXT    DEFAULT 'article',
      order_idx   INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (chapter_id) REFERENCES chapters(id),
      FOREIGN KEY (course_id)  REFERENCES courses(id)
    );

    CREATE TABLE IF NOT EXISTS quiz_questions (
      id          INTEGER PRIMARY KEY,
      lesson_id   INTEGER NOT NULL,
      question    TEXT    NOT NULL,
      options     TEXT    DEFAULT '[]',
      answer      INTEGER NOT NULL,
      explanation TEXT    DEFAULT '',
      FOREIGN KEY (lesson_id) REFERENCES lessons(id)
    );
  `);
}

function seedIfEmpty() {
  const row = db.prepare('SELECT COUNT(*) AS cnt FROM elements').get();
  if (row.cnt > 0) return;

  console.log('🌱 Seeding database with initial data...');

  const insertElement = db.prepare(`
    INSERT INTO elements (number, symbol, name, nameEn, category, period, "group",
      atomicMass, meltingPoint, boilingPoint, density, electronegativity, story, uses)
    VALUES (@number, @symbol, @name, @nameEn, @category, @period, @group,
      @atomicMass, @meltingPoint, @boilingPoint, @density, @electronegativity, @story, @uses)
  `);

  const insertCourse = db.prepare(`
    INSERT INTO courses (id, num, title, lessons, hours, target, level, description, topics)
    VALUES (@id, @num, @title, @lessons, @hours, @target, @level, @description, @topics)
  `);

  const insertExperiment = db.prepare(`
    INSERT INTO experiments (id, title, description, equation, materials, steps, safety, tags, canvasTheme, bg)
    VALUES (@id, @title, @description, @equation, @materials, @steps, @safety, @tags, @canvasTheme, @bg)
  `);

  const insertFaq = db.prepare(`
    INSERT INTO faq (id, question, answer) VALUES (@id, @q, @a)
  `);

  const insertTestimonial = db.prepare(`
    INSERT INTO testimonials (id, stars, text, name, role, initial, gradient)
    VALUES (@id, @stars, @text, @name, @role, @initial, @gradient)
  `);

  const insertStat = db.prepare(`
    INSERT INTO stats (key, value) VALUES (@key, @value)
  `);

  const insertChapter = db.prepare(`
    INSERT INTO chapters (id, course_id, num, title, description, order_idx)
    VALUES (@id, @course_id, @num, @title, @description, @order_idx)
  `);

  const insertLesson = db.prepare(`
    INSERT INTO lessons (id, chapter_id, course_id, num, title, content, duration, type, order_idx)
    VALUES (@id, @chapter_id, @course_id, @num, @title, @content, @duration, @type, @order_idx)
  `);

  const insertQuiz = db.prepare(`
    INSERT INTO quiz_questions (id, lesson_id, question, options, answer, explanation)
    VALUES (@id, @lesson_id, @question, @options, @answer, @explanation)
  `);

  const seed = db.transaction(() => {
    for (const e of elements) {
      insertElement.run({
        ...e,
        uses: JSON.stringify(e.uses || []),
        group: e.group ?? null,
        atomicMass: e.atomicMass ?? null,
        meltingPoint: e.meltingPoint ?? null,
        boilingPoint: e.boilingPoint ?? null,
        density: e.density ?? null,
        electronegativity: e.electronegativity ?? null
      });
    }

    for (const c of courses) {
      insertCourse.run({ ...c, topics: JSON.stringify(c.topics || []) });
    }

    for (const e of experiments) {
      insertExperiment.run({
        ...e,
        materials: JSON.stringify(e.materials || []),
        steps: JSON.stringify(e.steps || []),
        safety: JSON.stringify(e.safety || []),
        tags: JSON.stringify(e.tags || []),
        description: e.desc
      });
    }

    for (const f of faq) {
      insertFaq.run(f);
    }

    for (const t of testimonials) {
      insertTestimonial.run(t);
    }

    for (const [key, value] of Object.entries(stats)) {
      insertStat.run({ key, value: String(value) });
    }

    for (const ch of chapters) {
      insertChapter.run(ch);
    }

    for (const l of lessons) {
      insertLesson.run(l);
    }

    for (const q of quizQuestions) {
      insertQuiz.run({ ...q, options: JSON.stringify(q.options) });
    }
  });

  seed();
  console.log(`✅ Seeded: ${elements.length} elements, ${courses.length} courses, ${chapters.length} chapters, ${lessons.length} lessons, ${experiments.length} experiments, ${quizQuestions.length} quiz questions, ${faq.length} faq, ${testimonials.length} testimonials, ${Object.keys(stats).length} stats`);
}

function closeDb() {
  if (db) { db.close(); db = null; }
}

module.exports = { getDb, initDb, closeDb };
