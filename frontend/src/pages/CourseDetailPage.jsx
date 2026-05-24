import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import styles from './CourseDetailPage.module.css';

const LEVEL_MAP  = { beginner:'入门', intermediate:'进阶', advanced:'竞赛' };
const LEVEL_CLS = { beginner:'lv-beginner', intermediate:'lv-intermediate', advanced:'lv-advanced' };

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useFetch(() => api.courseDetail(id), [id]);

  if (loading) return <div className="container" style={{padding:'4rem 0',color:'var(--text2)'}}>加载中…</div>;
  if (!data) { navigate('/courses'); return null; }

  const { course, chapters } = data;
  const totalLessons  = chapters.reduce((s,ch) => s + (ch.lessons||[]).length, 0);
  const totalDuration = chapters.reduce((s,ch) => s + (ch.lessons||[]).reduce((a,l) => a + (l.duration||0),0), 0);

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className="container">
          <Link to="/courses" className={styles.backLink}>← 返回全部课程</Link>
          <div className={styles.heroBadge}>{course.num}</div>
          <h1 className={styles.heroTitle}>{course.title}</h1>
          <p className={styles.heroDesc}>{course.description}</p>
          <div className={styles.heroMeta}>
            <span>📚 {course.lessons} 课时</span>
            <span>⏱ {course.hours}h 总时长</span>
            <span>🎯 {course.target}</span>
            <span className={`${styles.levelTag} ${styles[LEVEL_CLS[course.level]]}`}>{LEVEL_MAP[course.level]||course.level}</span>
          </div>
          <div className={styles.heroTopics}>
            {(course.topics||[]).map(t => <span key={t} className={styles.topicTag}>{t}</span>)}
          </div>
          {chapters[0]?.lessons?.[0] &&
            <Link to={`/courses/lesson/${chapters[0].lessons[0].id}`} className={styles.startBtn}>
              开始学习
            </Link>
          }
        </div>
      </section>

      {/* ── Chapter Outline ── */}
      <section className={styles.outline}>
        <div className="container">
          <h2 className={styles.sectionTitle}>课程大纲</h2>
          <p className={styles.sectionDesc}>共 {chapters.length} 章，{totalLessons} 课时，约 {totalDuration} 分钟</p>

          <div className={styles.chapterList}>
            {chapters.map((ch, _i) => {
              const open = totalLessons > 0;
              return (
                <div key={ch.id} className={styles.chapter}>
                  <details className={styles.chapterDetails} open={open}>
                    <summary className={styles.chapterHeader}>
                      <span className={styles.chapterNum}>{ch.num}</span>
                      <span className={styles.chapterTitle}>{ch.title}</span>
                      <span className={styles.chapterCount}>{(ch.lessons||[]).length} 课时</span>
                      <span className={styles.arrow}>▾</span>
                    </summary>
                    <ul className={styles.lessonList}>
                      {(ch.lessons||[]).map(l => (
                        <li key={l.id}>
                          <Link to={`/courses/lesson/${l.id}`} className={styles.lessonLink}>
                            <span className={styles.lessonNum}>{l.num}</span>
                            <span className={styles.lessonTitle}>{l.title}</span>
                            <span className={styles.lessonType}>{l.type==='quiz'?'小测':l.type==='video'?'视频':'文章'} · {l.duration}′</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
