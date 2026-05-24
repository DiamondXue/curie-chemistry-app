import { Link, useParams } from 'react-router-dom';
import styles from './CourseDetailPage.module.css';

const LEVEL_MAP  = { beginner:'入门', intermediate:'进阶', advanced:'竞赛' };
const LEVEL_CLS = { beginner:'lv-beginner', intermediate:'lv-intermediate', advanced:'lv-advanced' };

const courses = {
  1: {
    id: 1, num: '01', title: '化学启蒙 — 原子的世界', lessons: 12, hours: 3, target: '适合初学者', level: 'beginner', description: '从原子结构出发，理解物质的本质。', topics: ['原子结构','质子中子电子','化学键基础','化学式与分子'],
    chapters: [
      { id:1, num:'01', title:'物质的微观构成', lessons: [
        { id:1, num:'1.1', title:'什么是原子？', duration:8, type:'article' },
        { id:2, num:'1.2', title:'质子、中子与电子', duration:10, type:'article' },
        { id:3, num:'1.3', title:'原子模型的历史演变', duration:12, type:'article' }
      ]},
      { id:2, num:'02', title:'电子排布与周期律', lessons: [
        { id:4, num:'2.1', title:'电子层与能级', duration:10, type:'article' },
        { id:5, num:'2.2', title:'电子排布规则', duration:12, type:'article' },
        { id:6, num:'2.3', title:'原子结构与元素周期表', duration:10, type:'article' }
      ]},
      { id:3, num:'03', title:'化学键基础', lessons: [
        { id:7, num:'3.1', title:'离子键的形成', duration:10, type:'article' },
        { id:8, num:'3.2', title:'共价键与分子', duration:12, type:'article' },
        { id:9, num:'3.3', title:'金属键与分子间作用力', duration:10, type:'article' }
      ]},
      { id:4, num:'04', title:'化学式入门', lessons: [
        { id:10, num:'4.1', title:'化学式的书写规则', duration:8, type:'article' },
        { id:11, num:'4.2', title:'化合价与化学式', duration:10, type:'article' },
        { id:12, num:'4.3', title:'化学方程式的初步', duration:12, type:'article' }
      ]}
    ]
  },
  2: {
    id: 2, num: '02', title: '元素与化合物 — 周期表的秘密', lessons: 20, hours: 6, target: '初中化学必备', level: 'beginner', description: '系统学习元素周期律、金属与非金属、酸碱盐基础，掌握常见化合物性质。', topics: ['元素周期律','金属与非金属','酸碱盐','常见化合物'],
    chapters: [
      { id:5, num:'01', title:'元素周期表的结构', lessons: [
        { id:13, num:'1.1', title:'元素周期表的发现史', duration:10, type:'article' },
        { id:14, num:'1.2', title:'周期与族的概念', duration:12, type:'article' },
        { id:15, num:'1.3', title:'元素周期表的分区', duration:10, type:'article' }
      ]},
      { id:6, num:'02', title:'元素周期律', lessons: [
        { id:16, num:'2.1', title:'原子半径的变化规律', duration:10, type:'article' },
        { id:17, num:'2.2', title:'电离能与电负性', duration:12, type:'article' },
        { id:18, num:'2.3', title:'化合价的周期性', duration:10, type:'article' }
      ]},
      { id:7, num:'03', title:'金属与非金属', lessons: [
        { id:19, num:'3.1', title:'金属的通性', duration:10, type:'article' },
        { id:20, num:'3.2', title:'非金属的特性', duration:12, type:'article' },
        { id:21, num:'3.3', title:'金属活动性顺序', duration:10, type:'article' }
      ]},
      { id:8, num:'04', title:'酸碱盐基础', lessons: [
        { id:22, num:'4.1', title:'酸的定义与性质', duration:10, type:'article' },
        { id:23, num:'4.2', title:'碱的定义与性质', duration:10, type:'article' },
        { id:24, num:'4.3', title:'盐的分类与命名', duration:12, type:'article' },
        { id:25, num:'4.4', title:'酸碱中和反应', duration:10, type:'article' }
      ]},
      { id:9, num:'05', title:'常见化合物', lessons: [
        { id:26, num:'5.1', title:'氧化物的分类', duration:8, type:'article' },
        { id:27, num:'5.2', title:'碳酸盐与硫酸盐', duration:10, type:'article' },
        { id:28, num:'5.3', title:'硝酸盐与氯化物', duration:10, type:'article' },
        { id:29, num:'5.4', title:'化合物的溶解性', duration:12, type:'article' }
      ]}
    ]
  }
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const course = courses[Number(id)] || courses[1];
  const chapters = course?.chapters || [];
  const totalLessons  = chapters.reduce((s,ch) => s + (ch.lessons||[]).length, 0);
  const totalDuration = chapters.reduce((s,ch) => s + (ch.lessons||[]).reduce((a,l) => a + (l.duration||0),0), 0);

  return (
    <div className={styles.page}>
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

      <section className={styles.outline}>
        <div className="container">
          <h2 className={styles.sectionTitle}>课程大纲</h2>
          <p className={styles.sectionDesc}>共 {chapters.length} 章，{totalLessons} 课时，约 {totalDuration} 分钟</p>

          <div className={styles.chapterList}>
            {chapters.map((ch, _i) => {
              return (
                <div key={ch.id} className={styles.chapter}>
                  <details className={styles.chapterDetails} open>
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
