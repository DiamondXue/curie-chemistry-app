import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import styles from './CoursesPage.module.css';

const LEVEL_MAP  = { beginner:'入门', intermediate:'进阶', advanced:'竞赛' };
const LEVEL_CLS = { beginner:'lv-beginner', intermediate:'lv-intermediate', advanced:'lv-advanced' };

export default function CoursesPage() {
  const { data, loading } = useFetch(() => api.courses(), []);
  const courses = data?.data || [];

  if (loading) return <div className="container" style={{padding:'4rem 0',color:'var(--text2)'}}>加载中…</div>;

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.heroLabel}>系统课程</p>
          <h1>从原子到高考，<br />一步步成为化学高手</h1>
          <p className={styles.heroDesc}>
            5 大课程系列，覆盖初中到竞赛全阶段。每节课都有互动动画、实时测验和进度追踪。
          </p>
        </div>
      </section>

      {/* ── Course Grid ── */}
      <section className={styles.listSection}>
        <div className="container">
          <div className={styles.grid}>
            {courses.map((c, i) => (
              <Link key={c.id} to={`/courses/${c.id}`} className={`${styles.card} ${styles[`card-${i+1}`]} reveal`}>
                <div className={styles.cardTop}>
                  <span className={`${styles.level} ${styles[LEVEL_CLS[c.level]]}`}>{LEVEL_MAP[c.level]||c.level}</span>
                  <span className={styles.num}>{c.num}</span>
                </div>
                <h2 className={styles.cardTitle}>{c.title}</h2>
                <p className={styles.cardDesc}>{c.description}</p>
                <div className={styles.cardMeta}>
                  <span>📚 {c.lessons} 课时</span>
                  <span>⏱ {c.hours}h</span>
                  <span>🎯 {c.target}</span>
                </div>
                <div className={styles.cardTopics}>
                  {(c.topics||[]).map(t => <span key={t} className={styles.topicTag}>{t}</span>)}
                </div>
                <div className={styles.cardCta}>开始学习 →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
