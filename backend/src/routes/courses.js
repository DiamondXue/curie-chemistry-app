const router = require('express').Router();
const { getDb } = require('../db');

// GET /api/courses
router.get('/', (_req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM courses ORDER BY id').all();
  const data = rows.map(r => ({ ...r, topics: JSON.parse(r.topics) }));
  res.json({ total: data.length, data });
});

// GET /api/courses/experiments
router.get('/experiments', (_req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM experiments ORDER BY id').all();
  const data = rows.map(r => ({
    ...r,
    tags: JSON.parse(r.tags || '[]'),
    materials: JSON.parse(r.materials || '[]'),
    steps: JSON.parse(r.steps || '[]'),
    safety: JSON.parse(r.safety || '[]')
  }));
  res.json({ total: data.length, data });
});

// GET /api/courses/experiments/:id
router.get('/experiments/:id', (req, res) => {
  const db = getDb();
  const row = db.prepare('SELECT * FROM experiments WHERE id = ?').get(Number(req.params.id));
  if (!row) return res.status(404).json({ error: 'Experiment not found' });
  res.json({
    ...row,
    tags: JSON.parse(row.tags || '[]'),
    materials: JSON.parse(row.materials || '[]'),
    steps: JSON.parse(row.steps || '[]'),
    safety: JSON.parse(row.safety || '[]')
  });
});

// GET /api/courses/:id
router.get('/:id', (req, res) => {
  const db = getDb();
  const row = db.prepare('SELECT * FROM courses WHERE id = ?').get(Number(req.params.id));
  if (!row) return res.status(404).json({ error: 'Course not found' });
  res.json({ ...row, topics: JSON.parse(row.topics) });
});

// GET /api/courses/:id/chapters — all chapters with lessons for a course
router.get('/:id/chapters', (req, res) => {
  const db = getDb();
  const courseId = Number(req.params.id);
  const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(courseId);
  if (!course) return res.status(404).json({ error: 'Course not found' });

  const chapters = db.prepare('SELECT * FROM chapters WHERE course_id = ? ORDER BY order_idx').all(courseId);
  const chapterIds = chapters.map(c => c.id);

  let allLessons = [];
  if (chapterIds.length > 0) {
    const placeholders = chapterIds.map(() => '?').join(',');
    allLessons = db.prepare(`SELECT * FROM lessons WHERE chapter_id IN (${placeholders}) ORDER BY chapter_id, order_idx`).all(...chapterIds);
  }

  const data = chapters.map(ch => ({
    ...ch,
    lessons: allLessons.filter(l => l.chapter_id === ch.id)
  }));

  res.json({ course: { ...course, topics: JSON.parse(course.topics) }, chapters: data });
});

// GET /api/courses/lessons/:id — single lesson with quiz
router.get('/lessons/:id', (req, res) => {
  const db = getDb();
  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(Number(req.params.id));
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

  const chapter = db.prepare('SELECT * FROM chapters WHERE id = ?').get(lesson.chapter_id);
  const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(lesson.course_id);

  // Get next and prev lesson for navigation
  const prevLesson = db.prepare(
    'SELECT id, num, title FROM lessons WHERE chapter_id = ? AND order_idx < ? ORDER BY order_idx DESC LIMIT 1'
  ).get(lesson.chapter_id, lesson.order_idx);

  const nextLesson = db.prepare(
    'SELECT id, num, title FROM lessons WHERE chapter_id = ? AND order_idx > ? ORDER BY order_idx ASC LIMIT 1'
  ).get(lesson.chapter_id, lesson.order_idx);

  const quizzes = db.prepare('SELECT * FROM quiz_questions WHERE lesson_id = ? ORDER BY id').all(lesson.id);
  const parsedQuizzes = quizzes.map(q => ({ ...q, options: JSON.parse(q.options || '[]') }));

  res.json({
    lesson,
    chapter: chapter || null,
    course: course ? { id: course.id, num: course.num, title: course.title } : null,
    prev: prevLesson || null,
    next: nextLesson || null,
    quizzes: parsedQuizzes
  });
});

module.exports = router;
