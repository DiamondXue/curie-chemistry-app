import styles from './Footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>⚗</div>居里化学
          </Link>
          <p>像探索放射性一样，爱上化学。<br/>以居里夫人的精神，点燃每一位学习者的好奇心。</p>
        </div>
        <div className={styles.col}>
          <h4>学习</h4>
          <a href="/#learning">课程路径</a>
          <a href="/#experiments">虚拟实验室</a>
          <Link to="/periodic">元素周期表</Link>
          <a href="#">每日练习</a>
        </div>
        <div className={styles.col}>
          <h4>关于</h4>
          <a href="#">居里夫人故事</a>
          <a href="#">我们的方法</a>
          <a href="#">团队介绍</a>
          <a href="#">更新日志</a>
        </div>
        <div className={styles.col}>
          <h4>支持</h4>
          <a href="#">帮助中心</a>
          <a href="#">联系我们</a>
          <a href="#">隐私政策</a>
          <a href="#">用户协议</a>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2024–2026 居里化学. All rights reserved.</span>
        <span>以好奇心驱动学习 ⚗</span>
      </div>
    </footer>
  )
}
