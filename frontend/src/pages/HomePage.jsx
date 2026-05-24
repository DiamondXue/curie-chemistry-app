import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useFetch } from '../hooks/useFetch'
import { api } from '../api'
import styles from './HomePage.module.css'

/* ─────── Hero Particle Canvas ─────── */
function HeroCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const ELS = ['H','He','Li','C','N','O','F','Na','Mg','Al','Si','P','S','Cl','K','Ca','Fe','Cu','Zn','Ag','Au','Hg','Ra','U','Pb','Br','I','Xe','Kr','Ne']
    let W, H, particles = [], raf
    const COLORS = ['#7b6ef6','#5ce8d8','#e8c56c','#f87171','#60a5fa']
    const mk = () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-.5)*.35, vy: (Math.random()-.5)*.35,
      size: Math.random()*14+9, alpha: Math.random()*.4+.08,
      label: ELS[Math.floor(Math.random()*ELS.length)],
      color: COLORS[Math.floor(Math.random()*5)],
      pulse: Math.random()*Math.PI*2, pulseSpeed: Math.random()*.02+.008,
    })
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    resize(); particles = Array.from({length:60}, mk)
    const draw = () => {
      ctx.clearRect(0,0,W,H)
      for (let i=0;i<particles.length;i++) for (let j=i+1;j<particles.length;j++) {
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y
        const d=Math.sqrt(dx*dx+dy*dy)
        if (d<130) { ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle=`rgba(123,110,246,${.07*(1-d/130)})`; ctx.lineWidth=.8; ctx.stroke() }
      }
      particles.forEach(p => {
        p.pulse+=p.pulseSpeed; const a=p.alpha+Math.sin(p.pulse)*.05
        ctx.save(); ctx.translate(p.x,p.y); ctx.globalAlpha=a; ctx.beginPath()
        for (let i=0;i<6;i++){const angle=(Math.PI/3)*i-Math.PI/6,r=p.size+4; i===0?ctx.moveTo(r*Math.cos(angle),r*Math.sin(angle)):ctx.lineTo(r*Math.cos(angle),r*Math.sin(angle))}
        ctx.closePath(); ctx.fillStyle=`${p.color}22`; ctx.strokeStyle=`${p.color}55`; ctx.lineWidth=.8; ctx.fill(); ctx.stroke()
        ctx.globalAlpha=a*1.4; ctx.fillStyle=p.color; ctx.font=`600 ${p.size}px Outfit,sans-serif`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(p.label,0,0); ctx.restore()
        p.x+=p.vx; p.y+=p.vy
        if(p.x<-30)p.x=W+30; if(p.x>W+30)p.x=-30; if(p.y<-30)p.y=H+30; if(p.y>H+30)p.y=-30
      })
      raf=requestAnimationFrame(draw)
    }
    draw(); window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className={styles.heroCanvas} />
}

/* ─────── Mini Periodic Table ─────── */
const MINI_ELEMENTS = ['H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca','Fe','Cu','Zn','Ga','Ge','As','Se','Br','Kr','Rb','Sr','Ag','Sn','Sb','Te','I','Xe','Cs','Ba','Pt','Au','Hg','Pb','Bi','Rn','Fr','Ra','U','Pu','Po','At','Og','Ts','Lv']
const MINI_COLORS = ['#ef4444','#f97316','#eab308','#22c55e','#14b8a6','#3b82f6','#8b5cf6','#ec4899','#6366f1','#06b6d4','#10b981','#f59e0b','#a855f7','#84cc16','#0ea5e9','#e11d48','#65a30d','#0284c7']
function MiniPeriodic() {
  return (
    <div className={styles.miniPeriodic}>
      {MINI_ELEMENTS.map((sym, i) => (
        <div key={sym} className={styles.miniCell}
          style={{background:`${MINI_COLORS[i%MINI_COLORS.length]}99`, border:`1px solid ${MINI_COLORS[i%MINI_COLORS.length]}55`}}
          title={sym}>{sym}</div>
      ))}
    </div>
  )
}

/* ─────── Experiment Canvas ─────── */
function ExpCanvas({ theme, bg }) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d'); const W=c.width, H=c.height; let raf
    if (theme === 'flame') {
      const ps = Array.from({length:60},()=>({x:W/2+(Math.random()-.5)*40,y:H*.7,vx:(Math.random()-.5)*2,vy:-(Math.random()*3+1),life:Math.random(),maxLife:Math.random()*.8+.4,r:Math.random()*6+2}))
      const cols=[[255,100,0],[255,180,0],[255,255,100],[200,60,255],[0,200,255],[255,50,50]]; let ci=0,tick=0
      const loop=()=>{ctx.clearRect(0,0,W,H);ctx.fillStyle='#110a00';ctx.fillRect(0,0,W,H);tick++;if(tick%90===0)ci=(ci+1)%cols.length;const [r,g,b]=cols[ci];ps.forEach(p=>{p.life+=.022;if(p.life>p.maxLife){p.x=W/2+(Math.random()-.5)*40;p.y=H*.72;p.vx=(Math.random()-.5)*2;p.vy=-(Math.random()*3+1);p.life=0;p.maxLife=Math.random()*.8+.4};p.x+=p.vx;p.y+=p.vy;const t=1-p.life/p.maxLife;ctx.beginPath();ctx.arc(p.x,p.y,p.r*t,0,Math.PI*2);ctx.fillStyle=`rgba(${r},${g},${b},${t*.8})`;ctx.fill()});raf=requestAnimationFrame(loop)}
      loop()
    } else if (theme === 'electro') {
      const lb=Array.from({length:12},(_,i)=>({x:W*.32,y:H-(i*14)+Math.random()*8,speed:.7+Math.random()*.5}))
      const rb=Array.from({length:8},(_,i)=>({x:W*.65,y:H-(i*18)+Math.random()*10,speed:.5+Math.random()*.4}))
      const loop=()=>{ctx.clearRect(0,0,W,H);ctx.fillStyle='#001428';ctx.fillRect(0,0,W,H);const wg=ctx.createLinearGradient(0,H*.25,0,H);wg.addColorStop(0,'rgba(30,100,200,.5)');wg.addColorStop(1,'rgba(0,40,120,.8)');ctx.fillStyle=wg;ctx.fillRect(W*.1,H*.25,W*.8,H*.75);ctx.fillStyle='#aaa';ctx.fillRect(W*.3,H*.1,8,H*.8);ctx.fillStyle='#c0a000';ctx.fillRect(W*.63,H*.1,8,H*.8);lb.forEach(b=>{ctx.beginPath();ctx.arc(b.x+(Math.random()-.5)*6,b.y,3.5,0,Math.PI*2);ctx.strokeStyle='rgba(100,180,255,.7)';ctx.lineWidth=1;ctx.stroke();b.y-=b.speed;if(b.y<H*.2)b.y=H*.98});rb.forEach(b=>{ctx.beginPath();ctx.arc(b.x+(Math.random()-.5)*6,b.y,4.5,0,Math.PI*2);ctx.strokeStyle='rgba(255,150,100,.7)';ctx.lineWidth=1;ctx.stroke();b.y-=b.speed;if(b.y<H*.2)b.y=H*.98});ctx.fillStyle='rgba(100,180,255,.9)';ctx.font='bold 11px Outfit,sans-serif';ctx.fillText('H₂',W*.27,H*.15);ctx.fillStyle='rgba(255,150,100,.9)';ctx.fillText('O₂',W*.63,H*.15);raf=requestAnimationFrame(loop)}
      loop()
    } else if (theme === 'purple' || theme === 'yellow') {
      const color = theme==='purple'?'#a855f7':'#eab308'
      const atoms=Array.from({length:8},()=>({x:Math.random()*W*.8+W*.1,y:Math.random()*H*.7+H*.15,vx:(Math.random()-.5)*.7,vy:(Math.random()-.5)*.7,r:Math.random()*12+8}))
      const loop=()=>{ctx.clearRect(0,0,W,H);ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,W,H);atoms.forEach((a,i)=>{atoms.forEach((b,j)=>{if(i>=j)return;const dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy);if(d<80){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`${color}44`;ctx.lineWidth=2;ctx.stroke()}});const g=ctx.createRadialGradient(a.x,a.y,0,a.x,a.y,a.r);g.addColorStop(0,color+'cc');g.addColorStop(1,color+'22');ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();a.x+=a.vx;a.y+=a.vy;if(a.x<a.r||a.x>W-a.r)a.vx*=-1;if(a.y<a.r||a.y>H-a.r)a.vy*=-1});raf=requestAnimationFrame(loop)}
      loop()
    } else {
      const bgs = theme==='green'?['#0d2e1a','#1a3d0d']:['#1a0533','#0d1f4e']
      const bubbles=Array.from({length:20},()=>({x:Math.random()*W,y:H+Math.random()*H,r:Math.random()*8+3,speed:Math.random()*1.5+.5,alpha:Math.random()*.6+.2}))
      const loop=()=>{ctx.clearRect(0,0,W,H);const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,bgs[0]);g.addColorStop(1,bgs[1]);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);bubbles.forEach(b=>{ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.strokeStyle=`rgba(255,255,255,${b.alpha})`;ctx.lineWidth=1.2;ctx.stroke();ctx.fillStyle=`rgba(255,255,255,${b.alpha*.15})`;ctx.fill();b.y-=b.speed;if(b.y<-b.r)b.y=H+b.r});raf=requestAnimationFrame(loop)}
      loop()
    }
    return () => cancelAnimationFrame(raf)
  }, [theme])
  return <canvas ref={ref} width={360} height={160} className={styles.expCanvas} />
}

/* ─────── Scroll Reveal Hook ─────── */
function useReveal(deps = []) {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) { setTimeout(()=>e.target.classList.add('visible'), i*80); obs.unobserve(e.target) }
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, deps)
}

/* ─────── Counter Hook ─────── */
function useCounters(deps = []) {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target, target = parseInt(el.dataset.target), suffix = el.dataset.suffix||''
          if (!target) return
          let cur=0; const step=target/80
          const id=setInterval(()=>{cur=Math.min(cur+step,target);el.textContent=Math.floor(cur).toLocaleString('zh-CN')+suffix;if(cur>=target)clearInterval(id)},16)
          obs.unobserve(el)
        }
      })
    }, { threshold: 0.5 })
    document.querySelectorAll('[data-target]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, deps)
}

/* ─────── Level tag map ─────── */
const LEVEL_MAP = { beginner:'入门', intermediate:'进阶', advanced:'挑战' }
const LEVEL_CLASS = { beginner:'tag-beginner', intermediate:'tag-intermediate', advanced:'tag-advanced' }

/* ─────── Main Component ─────── */
export default function HomePage() {
  const { data: statsData } = useFetch(api.stats)
  const { data: coursesData } = useFetch(api.courses)
  const { data: experimentsData } = useFetch(api.experiments)
  const { data: faqData } = useFetch(api.faq)
  const { data: testiData } = useFetch(api.testimonials)

  const courses     = coursesData?.data     || []
  const experiments = experimentsData?.data || []
  const faqs        = faqData?.data         || []
  const testis      = testiData?.data       || []
  const stats       = statsData

  const [openFaq, setOpenFaq] = useState(null)
  useReveal([courses, experiments, faqs, testis])
  useCounters([stats])

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section id="hero" className={styles.hero}>
        <HeroCanvas />
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            居里夫人激励 · 50万+ 学习者
          </div>
          <h1 className={styles.heroTitle}>
            像探索<span className={styles.highlight}>放射性</span>一样，<br/>
            爱上化学
          </h1>
          <p className={styles.heroSub}>
            用游戏化学习重新定义化学教育。<br/>
            <strong>谨慎体验，小心上瘾</strong> — 从原子到分子，从元素到反应，每一步都让你欲罢不能。
          </p>
          <div className={styles.heroCtas}>
            <Link to="/courses" className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21"/></svg>
              先探索一把
            </Link>
            <Link to="/periodic" className="btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              元素周期表
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <img src="/images/curie.png" alt="居里夫人" />
        </div>
      </section>

      {/* ── STATS ── */}
      <div className={styles.statsStrip}>
        <div className={styles.statItem}>
          <span className={styles.statNum} data-target={stats?.learners||500000} data-suffix=""></span>
          <div className={styles.statLabel}>注册学习者</div>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum} data-target={stats?.elements||118} data-suffix="种"></span>
          <div className={styles.statLabel}>元素全覆盖</div>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum} data-target={stats?.experiments||200} data-suffix="+"></span>
          <div className={styles.statLabel}>互动实验</div>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum} data-target={stats?.passRate||96} data-suffix="%"></span>
          <div className={styles.statLabel}>考试提分率</div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className={styles.features}>
        <div className="container">
          <div className={`${styles.featuresHeader} reveal`}>
            <p className="section-label">为什么选居里化学</p>
            <h2>不只是背公式<br/>是真正理解化学</h2>
            <p className="section-desc" style={{margin:'0 auto'}}>传统化学学习痛苦的是死记硬背。我们用可视化、游戏化和故事化，让你真正懂得每一个反应背后的原理。</p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={`${styles.featureCard} ${styles.large} reveal`}>
              <div>
                <div className={`${styles.featureIcon} ${styles.purple}`} style={{marginBottom:'1.2rem',fontSize:'2rem'}}>🧪</div>
                <h3 className={styles.featureTitle} style={{fontSize:'1.4rem',marginBottom:'.7rem'}}>118种元素，一个都不陌生</h3>
                <p className={styles.featureDesc}>互动式元素周期表，点击任意元素，即刻获取发现故事、物理化学性质、用途应用和趣味实验。不再是冷冰冰的符号，而是有血有肉的历史。</p>
                <Link to="/periodic" className="btn-primary" style={{marginTop:'1.5rem',display:'inline-flex'}}>探索周期表</Link>
              </div>
              <MiniPeriodic />
            </div>
            {[
              {icon:'🎮',color:'teal',title:'连击越多，越停不下来',desc:'答对一题，连击计数开始。连击越高，奖励越丰厚。就像打游戏，"再做一题"是你停不下来的理由。'},
              {icon:'🧠',color:'gold',title:'忘掉的知识，它比你先想起',desc:'基于艾宾浩斯遗忘曲线，系统自动追踪你的薄弱点。该复习时，精准推送。不再"临时抱佛脚"。'},
              {icon:'🔬',color:'red',title:'200+ 虚拟实验室',desc:'无需真实药品，在浏览器里完成氧化还原、酸碱中和等实验。每次操作都有可视化反应过程，原理一目了然。'},
              {icon:'🤖',color:'purple',title:'随时有一个化学老师在旁边',desc:'AI 助手 24 小时在线，无论是平衡方程式还是有机结构，随时问、随时答，不催、不烦、不评判。'},
            ].map(f => (
              <div key={f.title} className={`${styles.featureCard} reveal`}>
                <div className={`${styles.featureIcon} ${styles[f.color]}`}>{f.icon}</div>
                <div><h3 className={styles.featureTitle}>{f.title}</h3><p className={styles.featureDesc}>{f.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARNING PATH ── */}
      <section id="learning" className={styles.learning}>
        <div className="container">
          <div className={`${styles.learningHeader} reveal`}>
            <div>
              <p className="section-label">学习路径</p>
              <h2>从零基础到竞赛高手</h2>
              <p className="section-desc">系统性的课程设计，每个阶段都有清晰目标。</p>
            </div>
          </div>
          <div className={styles.pathList}>
            {courses.map(c => (
              <Link key={c.id} to={`/courses/${c.id}`} className={`${styles.pathItem} reveal`} style={{textDecoration:'none',color:'inherit'}}>
                <div className={styles.pathNum}>{c.num}</div>
                <div>
                  <div className={styles.pathTitle}>{c.title}</div>
                  <div className={styles.pathMeta}>
                    <span>📚 {c.lessons}节课</span>
                    <span>⏱ 约{c.hours}小时</span>
                    <span>🎯 {c.target}</span>
                  </div>
                </div>
                <span className={`${styles.pathTag} ${LEVEL_CLASS[c.level]}`}>{LEVEL_MAP[c.level]}</span>
              </Link>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'2rem'}}>
            <Link to="/courses" className="btn-primary">查看全部课程 →</Link>
          </div>
        </div>
      </section>

      {/* ── EXPERIMENTS ── */}
      <section id="experiments" className={styles.experiments}>
        <div className="container">
          <div className="reveal" style={{textAlign:'center',marginBottom:'1rem'}}>
            <p className="section-label">虚拟实验室</p>
            <h2>动手做，才真的懂</h2>
            <p className="section-desc" style={{margin:'0 auto'}}>200+ 个虚拟实验，安全、可重复、随时随地。每个操作都有真实的可视化反馈。</p>
          </div>
          <div className={styles.expGrid}>
            {experiments.map(exp => (
              <Link key={exp.id} to="/lab" className={`${styles.expCard} reveal`}>
                <div className={styles.expThumb} style={{background: exp.bg}}>
                  <ExpCanvas theme={exp.canvasTheme} bg={exp.bg} />
                </div>
                <div className={styles.expBody}>
                  <div className={styles.expTitle}>{exp.title}</div>
                  <div className={styles.expDesc}>{exp.desc}</div>
                  <div className={styles.expTags}>
                    {exp.tags.map(t => <span key={t} className={styles.expTag}>{t}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'2.5rem'}}>
            <Link to="/lab" className="btn-primary">进入虚拟实验室</Link>
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section id="quote" className={styles.quote}>
        <div className={`${styles.quoteInner} container reveal`}>
          <img className={styles.quoteAvatar} src="/images/curie.png" alt="居里夫人" />
          <div>
            <blockquote className={styles.blockquote}>
              "在科学中，我们必须对事物本身感兴趣，而不仅仅是它们的实际应用。好奇心、探索的渴望，是驱动科学前进的真正力量。"
            </blockquote>
            <p className={styles.quoteCite}>—— 玛丽·居里（Marie Curie），诺贝尔奖两届得主，放射性研究奠基人</p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className={styles.testimonials}>
        <div className="container">
          <div className={`${styles.testiHeader} reveal`}>
            <p className="section-label">真实学习者说</p>
            <h2>他们的改变，也可以是你的</h2>
          </div>
          <div className={styles.testiGrid}>
            {testis.map(t => (
              <div key={t.id} className={`${styles.testiCard} reveal`}>
                <div className={styles.testiStars}>{'★'.repeat(t.stars)}</div>
                <p className={styles.testiText}>{t.text}</p>
                <div className={styles.testiAuthor}>
                  <div className={styles.testiAvatar} style={{background:t.gradient}}>{t.initial}</div>
                  <div><div className={styles.testiName}>{t.name}</div><div className={styles.testiRole}>{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className={styles.faqSection}>
        <div className="container">
          <div className={`${styles.faqHeader} reveal`}>
            <p className="section-label">常见问题</p>
            <h2>你可能想问的，都在这里</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map(f => (
              <FaqItem key={f.id} item={f} open={openFaq===f.id} onToggle={()=>setOpenFaq(openFaq===f.id?null:f.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="final-cta" className={styles.finalCta}>
        <div className={styles.finalGlow} />
        <div className={`${styles.finalContent} container reveal`}>
          <p className="section-label" style={{textAlign:'center'}}>立刻开始</p>
          <h2>好奇心是最好的化学催化剂</h2>
          <p>免费开始你的化学探索之旅，像居里夫人一样，对世界保持好奇。</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="#learning" className="btn-primary" style={{fontSize:'1.1rem',padding:'1rem 2.5rem'}}>立马探索起来 — 免费体验</a>
            <Link to="/periodic" className="btn-secondary">打开元素周期表</Link>
          </div>
          <p style={{marginTop:'1.5rem',fontSize:'.8rem',color:'var(--text-muted)'}}>无需注册 · 直接开始 · 随时免费</p>
        </div>
      </section>

      <Footer />
    </>
  )
}

/* ─────── FAQ Item ─────── */
function FaqItem({ item, open, onToggle }) {
  const ansRef = useRef(null)
  return (
    <div className={`${styles.faqItem} ${open?styles.faqOpen:''}`}>
      <button className={styles.faqQ} onClick={onToggle}>
        {item.q}
        <div className={styles.faqArrow}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4l4 4 4-4"/></svg>
        </div>
      </button>
      <div className={styles.faqA} style={{maxHeight: open ? (ansRef.current?.scrollHeight+'px'||'400px') : '0'}} ref={ansRef}>
        <div className={styles.faqAInner}>{item.a}</div>
      </div>
    </div>
  )
}
