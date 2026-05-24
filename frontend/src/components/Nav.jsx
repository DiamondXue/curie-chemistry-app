import { Link } from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logoIcon}>⚗</div>
        居里化学
      </Link>
      <ul className={styles.links}>
        <li><Link to="/courses">课程</Link></li>
        <li><Link to="/lab">实验室</Link></li>
        <li><Link to="/periodic">元素周期表</Link></li>
        <li><a href="#" className={styles.cta}>免费开始</a></li>
      </ul>
    </nav>
  )
}
