import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import styles from './LessonPage.module.css';

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quizState, setQuizState] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    setQuizState({}); setQuizResult(null);
    api.lesson(id)
      .then(r => setData(r))
      .catch(() => navigate('/courses'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container" style={{padding:'4rem 0',color:'var(--text2)'}}>加载中…</div>;
  if (!data) return null;

  const { lesson, chapter, course, prev, next, quizzes } = data;
  const hasQuizzes = quizzes && quizzes.length > 0;

  const handleQuizSelect = (qIdx, optIdx) => {
    if (quizResult) return;
    setQuizState(p => ({ ...p, [qIdx]: optIdx }));
  };

  const submitQuiz = () => {
    const correct = quizzes.filter((q,i) => quizState[i] === q.answer).length;
    setQuizResult({ total: quizzes.length, correct });
  };

  const allAnswered = quizzes.length > 0 && quizzes.every((_,i) => quizState[i] !== undefined);

  return (
    <div className={styles.page}>
      {/* ── Top Bar ── */}
      <nav className={styles.topBar}>
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
            <Link to={course?`/courses/${course.id}`:'/courses'} className={styles.backLink}>← 课程</Link>
            <span className={styles.breadcrumb}>
              {course?.title && <span>{course.title}</span>}
              {chapter?.title && <span> / {chapter.title}</span>}
            </span>
          </div>
          <div style={{fontSize:'.78rem',color:'var(--text3)'}}>
            {chapter?.title} · {lesson.num}
          </div>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="container" style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:'2rem',alignItems:'start'}}>
        <article className={styles.article}>
          {/* Lesson Header */}
          <div className={styles.lessonHeader}>
            <div className={styles.lessonNum}>{lesson.num}</div>
            <h1 className={styles.lessonTitle}>{lesson.title}</h1>
            <div className={styles.lessonMeta}>
              <span>⏱ {lesson.duration} 分钟</span>
              <span>📄 {lesson.type==='quiz'?'互动测验':'图文文章'}</span>
            </div>
          </div>

          {/* Content */}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: lesson.content || '<p>本课内容正在制作中，敬请期待 🔧</p>' }}
          />

          {/* Quiz Section */}
          {hasQuizzes && (
            <section className={styles.quizSection}>
              <h2 className={styles.quizTitle}>📝 课堂小测</h2>
              <p className={styles.quizSub}>检验一下你的学习成果吧！</p>

              <div className={styles.quizList}>
                {quizzes.map((q, qi) => {
                  const selected = quizState[qi];
                  const result = quizResult ? (selected === q.answer ? 'correct':'wrong') : null;
                  return (
                    <div key={q.id} className={`${styles.quizCard} ${result? styles[`quiz-${result}`] : ''}`}>
                      <div className={styles.quizQ}>
                        <span className={styles.quizIdx}>{qi+1}</span>
                        {q.question}
                      </div>
                      <div className={styles.quizOpts}>
                        {JSON.parse(q.options||'[]').map((opt, oi) => {
                          let cls = styles.optBtn;
                          if (quizResult) {
                            if (oi === q.answer) cls += ` ${styles.optCorrect}`;
                            else if (oi === selected && oi !== q.answer) cls += ` ${styles.optWrong}`;
                          } else if (selected === oi) {
                            cls += ` ${styles.optSelected}`;
                          }
                          return (
                            <button key={oi} className={cls} onClick={() => handleQuizSelect(qi, oi)}>
                              {String.fromCharCode(65+oi)}. {opt}
                            </button>
                          );
                        })}
                      </div>
                      {quizResult && q.explanation && (
                        <div className={styles.quizExplain}>
                          💡 {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!quizResult && (
                <button
                  className={styles.submitBtn}
                  disabled={!allAnswered}
                  onClick={submitQuiz}
                >
                  {allAnswered ? '提交答案' : `还差 ${quizzes.length - Object.keys(quizState).length} 题`}
                </button>
              )}

              {quizResult && (
                <div className={styles.quizResult}>
                  <div className={styles.resultScore}>
                    {quizResult.correct} / {quizResult.total}
                  </div>
                  <p className={styles.resultText}>
                    {quizResult.correct === quizResult.total
                      ? '🎉 满分！你掌握得很好！'
                      : quizResult.correct >= quizResult.total * 0.6
                        ? '👍 还不错，看看错题解析吧！'
                        : '💪 还需要再复习一下这一课哦！'}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Navigation */}
          <div className={styles.navBtns}>
            {prev
              ? <Link to={`/courses/lesson/${prev.id}`} className={styles.navBtn}>← {prev.num} {prev.title}</Link>
              : <span></span>
            }
            {next
              ? <Link to={`/courses/lesson/${next.id}`} className={`${styles.navBtn} ${styles.navNext}`}>下一篇：{next.title} →</Link>
              : course && <Link to={`/courses/${course.id}`} className={`${styles.navBtn} ${styles.navNext}`}>← 回到课程大纲</Link>
            }
          </div>
        </article>

        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>当前章节</h3>
            <div className={styles.sidebarChapter}>{chapter?.num} {chapter?.title}</div>
            <Link to={course?`/courses/${course.id}`:'/courses'} className={styles.sidebarLink}>查看全部大纲 →</Link>
          </div>

          {course && (
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>课程信息</h3>
              <div className={styles.sidebarInfo}>
                <div><span>课程</span><span>{course.title}</span></div>
                <div><span>编号</span><span>{course.num}</span></div>
                <div><span>类型</span><span>{lesson.type==='quiz'?'测验':lesson.type==='video'?'视频':'文章'}</span></div>
                <div><span>时长</span><span>{lesson.duration} 分钟</span></div>
              </div>
            </div>
          )}

          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>💡 学习提示</h3>
            <ul className={styles.tips}>
              <li>读完内容再做小测效果更好</li>
              <li>不确定的题目可以先标记</li>
              <li>错了的题有详细解析，别错过</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
