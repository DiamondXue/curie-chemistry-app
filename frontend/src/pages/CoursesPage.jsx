import { Link } from 'react-router-dom';
import styles from './CoursesPage.module.css';

const LEVEL_MAP  = { beginner:'入门', intermediate:'进阶', advanced:'竞赛' };
const LEVEL_CLS = { beginner:'lv-beginner', intermediate:'lv-intermediate', advanced:'lv-advanced' };

const courses = [
  { id: 1, num: '01', title: '化学启蒙 — 原子的世界', lessons: 12, hours: 3, target: '适合初学者', level: 'beginner', description: '从原子结构出发，理解物质的本质。', topics: ['原子结构','质子中子电子','化学键基础','化学式与分子'] },
  { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密', lessons: 20, hours: 6, target: '初中化学必备', level: 'beginner', description: '系统学习元素周期律、金属与非金属。', topics: ['元素周期律','金属与非金属','酸碱盐'] },
  { id: 3, num: '03', title: '化学反应原理', lessons: 28, hours: 9, target: '高中化学核心', level: 'intermediate', description: '深入理解化学方程式配平、氧化还原。', topics: ['化学方程式','氧化还原反应','化学平衡'] },
  { id: 4, num: '04', title: '有机化学入门', lessons: 32, hours: 12, target: '高中有机核心', level: 'intermediate', description: '有机物命名规则、烃类性质、官能团化学。', topics: ['烃类化合物','官能团','有机反应类型'] },
  { id: 5, num: '05', title: '化学竞赛强化', lessons: 50, hours: 20, target: '竞赛/高考冲刺', level: 'advanced', description: '涵盖电化学、热力学、量子化学基础。', topics: ['电化学','热力学','量子化学基础'] }
];

export default function CoursesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.heroLabel}>系统课程</p>
          <h1>从原子到高考，<br />一步步成为化学高手</h1>
          <p className={styles.heroDesc}>
            5 大课程系列，覆盖初中到竞赛全阶段。每节课都有互动动画、实时测验和进度追踪。
          </p>
        </div>
      </section>

      <section className={styles.listSection}>
        <div className="container">
          <div className={styles.grid}>
            {courses.map((c, i) => (
              <Link key={c.id} to={`/courses/${c.id}`} className={`${styles.card} ${styles[`card-${i+1}`]}`}>
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
