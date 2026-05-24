import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useFetch } from '../hooks/useFetch'
import { api } from '../api'
import styles from './LabPage.module.css'

/* ── Simulation Canvas ── */
function SimCanvas({ theme, step, stepIndex }) {
  const ref = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height
    let raf

    if (theme === 'flame') {
      const colors = stepIndex === 0 ? [[255,200,50]] :
        stepIndex === 1 ? [[255,165,0],[255,180,0],[255,200,100]] :
        stepIndex === 2 ? [[180,100,255],[200,120,255]] :
        [[0,220,100],[220,50,50],[255,120,80],[255,255,100]]
      const particles = Array.from({ length: 60 }, () => ({
        x: W / 2 + (Math.random() - 0.5) * 40,
        y: H * 0.7,
        vx: (Math.random() - 0.5) * 1.8,
        vy: -(Math.random() * 3 + 1.2),
        life: Math.random(),
        maxLife: Math.random() * 0.7 + 0.4,
        r: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      }))
      let colorIdx = 0
      let tick = 0
      raf = function loop() {
        ctx.clearRect(0, 0, W, H)
        // background
        ctx.fillStyle = '#110a00'
        ctx.fillRect(0, 0, W, H)
        // burner
        const burnerGrad = ctx.createLinearGradient(W / 2 - 8, H * 0.72, W / 2 + 8, H * 0.72)
        burnerGrad.addColorStop(0, '#666')
        burnerGrad.addColorStop(0.5, '#999')
        burnerGrad.addColorStop(1, '#666')
        ctx.fillStyle = burnerGrad
        ctx.fillRect(W / 2 - 10, H * 0.72, 20, H * 0.28)
        // flame base
        const baseGrad = ctx.createRadialGradient(W / 2, H * 0.7, 2, W / 2, H * 0.7, 15)
        baseGrad.addColorStop(0, '#ff6600aa')
        baseGrad.addColorStop(1, '#ff660000')
        ctx.fillStyle = baseGrad
        ctx.fillRect(W / 2 - 15, H * 0.55, 30, H * 0.2)

        tick++
        if (tick % 60 === 0) colorIdx = (colorIdx + 1) % colors.length
        const [r, g, b] = colors[colorIdx]

        particles.forEach(p => {
          p.life += 0.022
          if (p.life > p.maxLife) {
            p.x = W / 2 + (Math.random() - 0.5) * 40
            p.y = H * 0.72
            p.vx = (Math.random() - 0.5) * 1.8
            p.vy = -(Math.random() * 3 + 1.2)
            p.life = 0
            p.maxLife = Math.random() * 0.7 + 0.4
            p.color = colors[Math.floor(Math.random() * colors.length)]
          }
          p.x += p.vx
          p.y += p.vy
          const t = 1 - p.life / p.maxLife
          const [pr, pg, pb] = p.color
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * t, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${pr},${pg},${pb},${t * 0.8})`
          ctx.fill()
        })
        raf = requestAnimationFrame(loop)
      }
      raf()
    } else if (theme === 'electro') {
      const bubblesLeft = Array.from({ length: 16 }, () => ({
        x: W * 0.28 + Math.random() * 20,
        y: H * 0.85 + Math.random() * H * 0.1,
        speed: 0.6 + Math.random() * 0.8,
        r: 2 + Math.random() * 3
      }))
      const bubblesRight = Array.from({ length: 8 }, () => ({
        x: W * 0.68 + Math.random() * 15,
        y: H * 0.85 + Math.random() * H * 0.1,
        speed: 0.4 + Math.random() * 0.6,
        r: 2.5 + Math.random() * 3
      }))
      raf = function loop() {
        ctx.clearRect(0, 0, W, H)
        ctx.fillStyle = '#001428'
        ctx.fillRect(0, 0, W, H)
        // water tank
        const tankGrad = ctx.createLinearGradient(0, H * 0.2, 0, H)
        tankGrad.addColorStop(0, 'rgba(20,80,180,0.3)')
        tankGrad.addColorStop(1, 'rgba(0,30,100,0.5)')
        ctx.fillStyle = tankGrad
        ctx.fillRect(W * 0.12, H * 0.18, W * 0.76, H * 0.72)
        // electrodes
        ctx.fillStyle = '#555'
        ctx.fillRect(W * 0.3, H * 0.1, 5, H * 0.78)
        ctx.fillRect(W * 0.7, H * 0.1, 5, H * 0.78)
        // battery
        ctx.fillStyle = '#c0a000'
        ctx.fillRect(W * 0.28, H * 0.06, 12, 20)
        ctx.fillStyle = '#666'
        ctx.fillRect(W * 0.66, H * 0.06, 12, 20)
        // labels
        ctx.fillStyle = 'rgba(100,180,255,0.9)'
        ctx.font = 'bold 12px Outfit, sans-serif'
        ctx.fillText('H₂↑', W * 0.26, H * 0.14)
        ctx.fillStyle = 'rgba(255,150,100,0.9)'
        ctx.fillText('O₂↑', W * 0.67, H * 0.14)
        // 2:1 ratio indicator
        ctx.fillStyle = 'rgba(255,255,255,0.4)'
        ctx.font = '10px Outfit, sans-serif'
        ctx.fillText('体积比 2 : 1', W * 0.44, H * 0.08)

        bubblesLeft.forEach(b => {
          ctx.beginPath()
          ctx.arc(b.x + (Math.random() - 0.5) * 3, b.y, b.r, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(120,200,255,0.6)'
          ctx.lineWidth = 1
          ctx.stroke()
          b.y -= b.speed
          if (b.y < H * 0.15) b.y = H * 0.88
        })
        bubblesRight.forEach(b => {
          ctx.beginPath()
          ctx.arc(b.x + (Math.random() - 0.5) * 3, b.y, b.r, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(255,140,100,0.6)'
          ctx.lineWidth = 1
          ctx.stroke()
          b.y -= b.speed
          if (b.y < H * 0.15) b.y = H * 0.88
        })
        raf = requestAnimationFrame(loop)
      }
      raf()
    } else if (theme === 'purple') {
      const atoms = Array.from({ length: 8 }, () => ({
        x: Math.random() * W * 0.7 + W * 0.15,
        y: Math.random() * H * 0.6 + H * 0.15,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        r: Math.random() * 10 + 8,
        color: stepIndex % 2 === 0 ? '#a855f7' : '#ec4899'
      }))
      const halfColored = stepIndex > 1
      raf = function loop() {
        ctx.clearRect(0, 0, W, H)
        ctx.fillStyle = '#0a0614'
        ctx.fillRect(0, 0, W, H)

        // Draw connections
        atoms.forEach((a, i) => {
          atoms.forEach((b, j) => {
            if (i >= j) return
            const dx = a.x - b.x
            const dy = a.y - b.y
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d < 90) {
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.strokeStyle = `rgba(168,85,247,${halfColored ? 0.15 : 0.35})`
              ctx.lineWidth = 1.5
              ctx.stroke()
            }
          })
          const g = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, a.r)
          const c = halfColored && i % 2 === 0 ? '#ec4899' : a.color
          g.addColorStop(0, c + 'cc')
          g.addColorStop(1, c + '22')
          ctx.beginPath()
          ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
          ctx.fillStyle = g
          ctx.fill()
          a.x += a.vx
          a.y += a.vy
          if (a.x < a.r || a.x > W - a.r) a.vx *= -1
          if (a.y < a.r || a.y > H - a.r) a.vy *= -1
        })

        // Temp label
        ctx.fillStyle = '#eab308'
        ctx.font = 'bold 11px Outfit, sans-serif'
        ctx.fillText(stepIndex === 0 ? '室温 25°C' : stepIndex === 1 ? '加热 60°C →' : stepIndex === 2 ? '冰水 0°C →' : '恢复室温', W * 0.4, H * 0.12)
        raf = requestAnimationFrame(loop)
      }
      raf()
    } else {
      // blue / green / yellow default
      const baseColor = theme === 'green' ? 'rgba(34,197,94,0.15)' :
        theme === 'yellow' ? 'rgba(234,179,8,0.12)' : 'rgba(59,130,246,0.12)'
      const accentColor = theme === 'green' ? 'rgba(34,197,94,0.4)' :
        theme === 'yellow' ? 'rgba(234,179,8,0.35)' : 'rgba(59,130,246,0.35)'
      const droplets = Array.from({ length: 22 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 4 + 2,
        speed: Math.random() * 0.5 + 0.3,
        alpha: Math.random() * 0.5 + 0.2
      }))
      const bgTop = theme === 'green' ? '#0d2e1a' : theme === 'yellow' ? '#1a1a00' : '#1a0533'
      const bgBot = theme === 'green' ? '#1a3d0d' : theme === 'yellow' ? '#2e2e08' : '#0d1f4e'

      raf = function loop() {
        ctx.clearRect(0, 0, W, H)
        const grad = ctx.createLinearGradient(0, 0, W, H)
        grad.addColorStop(0, bgTop)
        grad.addColorStop(1, bgBot)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)

        droplets.forEach(d => {
          ctx.beginPath()
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
          ctx.strokeStyle = accentColor.replace('0.35', String(d.alpha)).replace('0.4', String(d.alpha + 0.1))
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.fillStyle = baseColor.replace('0.15', String(d.alpha * 0.3)).replace('0.12', String(d.alpha * 0.2))
          ctx.fill()
          d.y -= d.speed
          if (d.y < -d.r) d.y = H + d.r
        })

        // Dynamic step-specific visual
        if (step >= 0) {
          ctx.fillStyle = 'rgba(255,255,255,0.7)'
          ctx.font = 'bold 12px Outfit, sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(`步骤 ${step + 1}/4`, W / 2, H * 0.35)
        }

        raf = requestAnimationFrame(loop)
      }
      raf()
    }

    return () => {
      if (raf) {
        // Use stored function reference
      }
      // Actually cancel properly:
      const id = animRef.current
      if (id) cancelAnimationFrame(id)
    }
  }, [theme, stepIndex])

  // Store raf id
  useEffect(() => {
    const id = requestAnimationFrame(() => {})
    animRef.current = id
    return () => cancelAnimationFrame(id)
  }, [])

  return <canvas ref={ref} width={440} height={280} className={styles.simCanvas} />
}

/* ── Experiment Detail Overlay ── */
function ExperimentDetail({ experiment, onClose }) {
  const [stepIndex, setStepIndex] = useState(0)
  const steps = experiment.steps || []
  const currentStep = steps[stepIndex]

  const prevStep = () => setStepIndex(i => Math.max(0, i - 1))
  const nextStep = () => setStepIndex(i => Math.min(steps.length - 1, i + 1))

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') nextStep()
      if (e.key === 'ArrowLeft') prevStep()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [stepIndex, steps.length])

  return (
    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className={styles.detailPanel}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <div className={styles.detailHeader}>
          <div className={styles.detailIcon}>🧪</div>
          <div>
            <h2 className={styles.detailTitle}>{experiment.title}</h2>
            <p className={styles.detailDesc}>{experiment.description}</p>
          </div>
        </div>

        <div className={styles.equationBar}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
          <span>{experiment.equation || '—'}</span>
        </div>

        <div className={styles.detailBody}>
          {/* Left: Simulation */}
          <div className={styles.simPanel}>
            <div className={styles.simLabel}>可视化模拟</div>
            <SimCanvas theme={experiment.canvasTheme} step={stepIndex} stepIndex={stepIndex} />
            {/* Step progress dots */}
            <div className={styles.stepDots}>
              {steps.map((_, i) => (
                <button key={i}
                  className={`${styles.stepDot} ${i === stepIndex ? styles.stepDotActive : ''} ${i < stepIndex ? styles.stepDotDone : ''}`}
                  onClick={() => setStepIndex(i)}
                />
              ))}
            </div>
          </div>

          {/* Right: Step details */}
          <div className={styles.stepPanel}>
            <div className={styles.stepIndicator}>
              步骤 {stepIndex + 1} / {steps.length}
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepText}>{currentStep?.text}</div>
              <div className={styles.observationBox}>
                <div className={styles.obsLabel}>🔍 观察与解释</div>
                <div className={styles.obsText}>{currentStep?.observation}</div>
              </div>
            </div>

            <div className={styles.stepNav}>
              <button className={styles.navBtn} onClick={prevStep} disabled={stepIndex === 0}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                上一步
              </button>
              <button className={styles.navBtn} onClick={nextStep} disabled={stepIndex === steps.length - 1}>
                下一步
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Materials & Safety */}
        <div className={styles.infoRow}>
          <div className={styles.infoCard}>
            <div className={styles.infoTitle}>🧴 实验材料</div>
            <div className={styles.tagList}>
              {(experiment.materials || []).map(m => <span key={m} className={styles.materialTag}>{m}</span>)}
            </div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoTitle}>⚠️ 安全须知</div>
            <ul className={styles.safetyList}>
              {(experiment.safety || []).map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Thumbnail Canvas ── */
function ThumbCanvas({ theme }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height
    let raf

    if (theme === 'flame') {
      const ps = Array.from({ length: 40 }, () => ({
        x: W / 2 + (Math.random() - 0.5) * 40,
        y: H * 0.68,
        vx: (Math.random() - 0.5) * 2,
        vy: -(Math.random() * 3 + 1),
        life: Math.random(),
        maxLife: Math.random() * 0.8 + 0.4,
        r: Math.random() * 6 + 2
      }))
      const cols = [[255, 100, 0], [255, 180, 0], [255, 255, 100], [200, 60, 255], [0, 200, 255], [255, 50, 50]]
      let ci = 0
      let tick = 0
      raf = function loop() {
        ctx.clearRect(0, 0, W, H)
        ctx.fillStyle = '#0d0600'
        ctx.fillRect(0, 0, W, H)
        tick++
        if (tick % 90 === 0) ci = (ci + 1) % cols.length
        const [r, g, b] = cols[ci]
        ps.forEach(p => {
          p.life += 0.022
          if (p.life > p.maxLife) {
            p.x = W / 2 + (Math.random() - 0.5) * 40
            p.y = H * 0.7
            p.vx = (Math.random() - 0.5) * 2
            p.vy = -(Math.random() * 3 + 1)
            p.life = 0
            p.maxLife = Math.random() * 0.8 + 0.4
          }
          p.x += p.vx
          p.y += p.vy
          const t = 1 - p.life / p.maxLife
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * t, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${t * 0.8})`
          ctx.fill()
        })
        raf = requestAnimationFrame(loop)
      }
    } else if (theme === 'electro') {
      const lb = Array.from({ length: 10 }, (_, i) => ({
        x: W * 0.3,
        y: H - (i * 12) + Math.random() * 6,
        speed: 0.6 + Math.random() * 0.4
      }))
      const rb = Array.from({ length: 6 }, (_, i) => ({
        x: W * 0.66,
        y: H - (i * 16) + Math.random() * 8,
        speed: 0.4 + Math.random() * 0.3
      }))
      raf = function loop() {
        ctx.clearRect(0, 0, W, H)
        ctx.fillStyle = '#00101e'
        ctx.fillRect(0, 0, W, H)
        const wg = ctx.createLinearGradient(0, H * 0.2, 0, H)
        wg.addColorStop(0, 'rgba(30,100,200,.35)')
        wg.addColorStop(1, 'rgba(0,40,120,.55)')
        ctx.fillStyle = wg
        ctx.fillRect(W * 0.1, H * 0.2, W * 0.8, H * 0.7)
        ctx.fillStyle = '#888'
        ctx.fillRect(W * 0.28, H * 0.08, 6, H * 0.8)
        ctx.fillStyle = '#b89000'
        ctx.fillRect(W * 0.64, H * 0.08, 6, H * 0.8)
        lb.forEach(b => {
          ctx.beginPath()
          ctx.arc(b.x + (Math.random() - 0.5) * 5, b.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(100,180,255,.5)'
          ctx.fill()
          b.y -= b.speed
          if (b.y < H * 0.15) b.y = H * 0.92
        })
        rb.forEach(b => {
          ctx.beginPath()
          ctx.arc(b.x + (Math.random() - 0.5) * 5, b.y, 4, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255,150,100,.5)'
          ctx.fill()
          b.y -= b.speed
          if (b.y < H * 0.15) b.y = H * 0.92
        })
        raf = requestAnimationFrame(loop)
      }
    } else if (theme === 'purple') {
      const atoms = Array.from({ length: 6 }, () => ({
        x: Math.random() * W * 0.8 + W * 0.1,
        y: Math.random() * H * 0.7 + H * 0.1,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 10 + 6
      }))
      raf = function loop() {
        ctx.clearRect(0, 0, W, H)
        ctx.fillStyle = '#07030f'
        ctx.fillRect(0, 0, W, H)
        atoms.forEach((a, i) => {
          atoms.forEach((b, j) => {
            if (i >= j) return
            const dx = a.x - b.x
            const dy = a.y - b.y
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d < 70) {
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.strokeStyle = 'rgba(168,85,247,0.30)'
              ctx.lineWidth = 1.5
              ctx.stroke()
            }
          })
          const g = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, a.r)
          g.addColorStop(0, '#a855f7aa')
          g.addColorStop(1, '#a855f722')
          ctx.beginPath()
          ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
          ctx.fillStyle = g
          ctx.fill()
          a.x += a.vx
          a.y += a.vy
          if (a.x < a.r || a.x > W - a.r) a.vx *= -1
          if (a.y < a.r || a.y > H - a.r) a.vy *= -1
        })
        raf = requestAnimationFrame(loop)
      }
    } else {
      const base = theme === 'green' ? ['#0a1f10', '#123018'] :
        theme === 'yellow' ? ['#151508', '#1f1a08'] : ['#0d0a1a', '#12102a']
      const bubbles = Array.from({ length: 16 }, () => ({
        x: Math.random() * W,
        y: H + Math.random() * H,
        r: Math.random() * 5 + 2,
        speed: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.5 + 0.15
      }))
      raf = function loop() {
        ctx.clearRect(0, 0, W, H)
        const g = ctx.createLinearGradient(0, 0, W, H)
        g.addColorStop(0, base[0])
        g.addColorStop(1, base[1])
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
        bubbles.forEach(b => {
          ctx.beginPath()
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${b.alpha * 0.1})`
          ctx.fill()
          ctx.strokeStyle = `rgba(255,255,255,${b.alpha})`
          ctx.lineWidth = 1
          ctx.stroke()
          b.y -= b.speed
          if (b.y < -b.r) b.y = H + b.r
        })
        raf = requestAnimationFrame(loop)
      }
    }
    raf()
    return () => cancelAnimationFrame(raf)
  }, [theme])

  return <canvas ref={ref} width={360} height={180} className={styles.thumbCanvas} />
}

/* ── Lab Card ── */
function LabCard({ experiment, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick(experiment)}>
      <div className={styles.cardThumb} style={{ background: experiment.bg || 'linear-gradient(135deg,#1a0533,#0d1f4e)' }}>
        <ThumbCanvas theme={experiment.canvasTheme} />
        <div className={styles.cardOverlay}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.9">
            <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16"/>
          </svg>
          <span>开始实验</span>
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardTitle}>{experiment.title}</div>
        <div className={styles.cardDesc}>{experiment.description?.substring(0, 50)}{experiment.description?.length > 50 ? '…' : ''}</div>
        <div className={styles.cardEq}>{experiment.equation || ''}</div>
        <div className={styles.cardTags}>
          {(experiment.tags || []).map(t => <span key={t} className={styles.cardTag}>{t}</span>)}
        </div>
        <div className={styles.cardSteps}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h2m2 0h2M8 7h8M8 17h8"/>
          </svg>
          {(experiment.steps || []).length} 个步骤 · 交互式模拟
        </div>
      </div>
    </div>
  )
}

/* ── Main LabPage ── */
export default function LabPage() {
  const { data, loading, error } = useFetch(api.experiments)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState(null)

  const experiments = data?.data || []
  const allTags = [...new Set(experiments.flatMap(e => e.tags || []))]
  const filtered = filter ? experiments.filter(e => (e.tags || []).includes(filter)) : experiments

  return (
    <>
      <Nav />

      {/* Header */}
      <section className={styles.header}>
        <div className="container">
          <p className="section-label">虚拟实验室</p>
          <h1 className={styles.title}>
            动手做，才真的懂
            <span className={styles.titleHighlight}>实验</span>
          </h1>
          <p className={styles.subtitle}>
            {experiments.length} 个交互式虚拟实验，安全、可重复、随时随地。<br/>
            每一步都有可视化模拟——点击进入任意实验，跟随步骤亲手操作。
          </p>
        </div>
      </section>

      {/* Filter bar */}
      {!loading && experiments.length > 0 && (
        <div className={styles.filterBar}>
          <div className="container">
            <button
              className={`${styles.filterBtn} ${!filter ? styles.filterActive : ''}`}
              onClick={() => setFilter(null)}
            >
              全部实验
            </button>
            {allTags.map(tag => (
              <button key={tag}
                className={`${styles.filterBtn} ${filter === tag ? styles.filterActive : ''}`}
                onClick={() => setFilter(filter === tag ? null : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <section className={styles.gridSection}>
        <div className="container">
          {loading ? (
            <div className="state-loading">加载实验数据中…</div>
          ) : error ? (
            <div className="state-error">加载失败: {error.message}</div>
          ) : (
            <div className={styles.cardGrid}>
              {filtered.map(exp => (
                <LabCard key={exp.id} experiment={exp} onClick={setSelected} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail Overlay */}
      {selected && (
        <ExperimentDetail experiment={selected} onClose={() => setSelected(null)} />
      )}

      <Footer />
    </>
  )
}
