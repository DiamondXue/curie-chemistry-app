import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { api } from '../api'
import styles from './PeriodicPage.module.css'

/* ── Category map ── */
const CATEGORIES = {
  'alkali':       { label:'碱金属',    color:'#ef4444', bg:'rgba(239,68,68,0.15)',   border:'rgba(239,68,68,0.3)' },
  'alkali-earth': { label:'碱土金属',  color:'#f97316', bg:'rgba(249,115,22,0.15)',  border:'rgba(249,115,22,0.3)' },
  'transition':   { label:'过渡金属',  color:'#3b82f6', bg:'rgba(59,130,246,0.15)',  border:'rgba(59,130,246,0.3)' },
  'post-trans':   { label:'后过渡金属',color:'#8b5cf6', bg:'rgba(139,92,246,0.15)', border:'rgba(139,92,246,0.3)' },
  'metalloid':    { label:'类金属',    color:'#14b8a6', bg:'rgba(20,184,166,0.15)',  border:'rgba(20,184,166,0.3)' },
  'nonmetal':     { label:'非金属',    color:'#22c55e', bg:'rgba(34,197,94,0.15)',   border:'rgba(34,197,94,0.3)' },
  'halogen':      { label:'卤素',      color:'#eab308', bg:'rgba(234,179,8,0.15)',   border:'rgba(234,179,8,0.3)' },
  'noble-gas':    { label:'稀有气体',  color:'#ec4899', bg:'rgba(236,72,153,0.15)',  border:'rgba(236,72,153,0.3)' },
  'lanthanide':   { label:'镧系元素',  color:'#6366f1', bg:'rgba(99,102,241,0.15)',  border:'rgba(99,102,241,0.3)' },
  'actinide':     { label:'锕系元素',  color:'#a855f7', bg:'rgba(168,85,247,0.15)',  border:'rgba(168,85,247,0.3)' },
  'unknown':      { label:'未知',      color:'#6b7280', bg:'rgba(107,114,128,0.15)', border:'rgba(107,114,128,0.3)' },
}

/* ── Period/Group layout ── */
const POSITIONS = {
  1:{p:1,g:1},2:{p:1,g:18},3:{p:2,g:1},4:{p:2,g:2},5:{p:2,g:13},6:{p:2,g:14},7:{p:2,g:15},
  8:{p:2,g:16},9:{p:2,g:17},10:{p:2,g:18},11:{p:3,g:1},12:{p:3,g:2},13:{p:3,g:13},14:{p:3,g:14},
  15:{p:3,g:15},16:{p:3,g:16},17:{p:3,g:17},18:{p:3,g:18},19:{p:4,g:1},20:{p:4,g:2},
  21:{p:4,g:3},22:{p:4,g:4},23:{p:4,g:5},24:{p:4,g:6},25:{p:4,g:7},26:{p:4,g:8},
  27:{p:4,g:9},28:{p:4,g:10},29:{p:4,g:11},30:{p:4,g:12},31:{p:4,g:13},32:{p:4,g:14},
  33:{p:4,g:15},34:{p:4,g:16},35:{p:4,g:17},36:{p:4,g:18},37:{p:5,g:1},38:{p:5,g:2},
  39:{p:5,g:3},40:{p:5,g:4},41:{p:5,g:5},42:{p:5,g:6},43:{p:5,g:7},44:{p:5,g:8},
  45:{p:5,g:9},46:{p:5,g:10},47:{p:5,g:11},48:{p:5,g:12},49:{p:5,g:13},50:{p:5,g:14},
  51:{p:5,g:15},52:{p:5,g:16},53:{p:5,g:17},54:{p:5,g:18},55:{p:6,g:1},56:{p:6,g:2},
  72:{p:6,g:4},73:{p:6,g:5},74:{p:6,g:6},75:{p:6,g:7},76:{p:6,g:8},77:{p:6,g:9},
  78:{p:6,g:10},79:{p:6,g:11},80:{p:6,g:12},81:{p:6,g:13},82:{p:6,g:14},83:{p:6,g:15},
  84:{p:6,g:16},85:{p:6,g:17},86:{p:6,g:18},87:{p:7,g:1},88:{p:7,g:2},
  104:{p:7,g:4},105:{p:7,g:5},106:{p:7,g:6},107:{p:7,g:7},108:{p:7,g:8},109:{p:7,g:9},
  110:{p:7,g:10},111:{p:7,g:11},112:{p:7,g:12},113:{p:7,g:13},114:{p:7,g:14},115:{p:7,g:15},
  116:{p:7,g:16},117:{p:7,g:17},118:{p:7,g:18},
}

function getShells(n) {
  const config = [], limits = [2,8,18,32,32,18,8]
  let remaining = n
  for (const limit of limits) {
    if (remaining <= 0) break
    config.push(Math.min(remaining, limit))
    remaining -= Math.min(remaining, limit)
  }
  return config
}

/* ── Bohr canvas ── */
function BohrCanvas({ element, color }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height, cx = W/2, cy = H/2
    const shells = element.shells || getShells(element.number)
    const numShells = shells.length
    const maxR = Math.min(cx, cy) - 12
    const shellR = shells.map((_,i) => (maxR/numShells)*(i+1))
    let angle = shells.map(() => Math.random()*Math.PI*2)
    const speed = shells.map((_,i) => (0.03-i*0.004)*(i%2===0?1:-1))
    let raf
    const frame = () => {
      ctx.clearRect(0,0,W,H)
      const ng = ctx.createRadialGradient(cx,cy,0,cx,cy,18)
      ng.addColorStop(0,color+'ff'); ng.addColorStop(1,color+'44')
      ctx.beginPath(); ctx.arc(cx,cy,18,0,Math.PI*2); ctx.fillStyle=ng; ctx.fill()
      ctx.fillStyle='white'; ctx.font='bold 9px Outfit,sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle'
      ctx.fillText(element.symbol,cx,cy)
      shells.forEach((_,i)=>{ctx.beginPath();ctx.arc(cx,cy,shellR[i],0,Math.PI*2);ctx.strokeStyle=`${color}28`;ctx.lineWidth=1;ctx.stroke()})
      shells.forEach((count,i)=>{
        angle[i]+=speed[i]
        for(let e=0;e<count;e++){
          const a=angle[i]+(Math.PI*2/count)*e
          const ex=cx+shellR[i]*Math.cos(a), ey=cy+shellR[i]*Math.sin(a)
          const eg=ctx.createRadialGradient(ex,ey,0,ex,ey,5); eg.addColorStop(0,color+'ee'); eg.addColorStop(1,color+'00')
          ctx.beginPath();ctx.arc(ex,ey,5,0,Math.PI*2);ctx.fillStyle=eg;ctx.fill()
          ctx.beginPath();ctx.arc(ex,ey,2.5,0,Math.PI*2);ctx.fillStyle=color;ctx.fill()
        }
      })
      raf=requestAnimationFrame(frame)
    }
    frame()
    return () => cancelAnimationFrame(raf)
  }, [element, color])
  return <canvas ref={ref} width={220} height={220} />
}

/* ── Element Cell ── */
function ElCell({ el, dimmed, highlighted, onClick, onHover, onLeave }) {
  if (!el) return <div className={styles.elEmpty} />
  const cat = CATEGORIES[el.category] || CATEGORIES.unknown
  return (
    <div
      className={`${styles.elCell} ${dimmed?styles.dimmed:''} ${highlighted?styles.highlighted:''}`}
      style={{background:cat.bg, borderColor:cat.border}}
      onClick={() => onClick(el.number)}
      onMouseEnter={() => onHover(el)}
      onMouseLeave={onLeave}
      data-cat={el.category}
    >
      <div className={styles.elNum}>{el.number}</div>
      <div className={styles.elSym}>{el.symbol}</div>
      <div className={styles.elName}>{el.name}</div>
      <div className={styles.elMass}>{el.atomicMass ? (typeof el.atomicMass === 'number' ? el.atomicMass.toFixed(0) : el.atomicMass) : ''}</div>
    </div>
  )
}

/* ── Detail Panel ── */
function DetailPanel({ element, onClose }) {
  if (!element) return null
  const cat = CATEGORIES[element.category] || CATEGORIES.unknown
  const props = [
    {label:'原子序数', val: element.number},
    {label:'相对原子质量', val: element.atomicMass || '—'},
    {label:'熔点 (°C)', val: element.meltingPoint !== null ? element.meltingPoint : '—'},
    {label:'沸点 (°C)', val: element.boilingPoint !== null ? element.boilingPoint : '—'},
    {label:'密度 (g/cm³)', val: element.density || '—'},
    {label:'周期/族', val: `第${element.period}周期`},
  ]
  return (
    <div className={`${styles.overlay} ${styles.overlayOpen}`} onClick={(e)=>{if(e.target===e.currentTarget)onClose()}}>
      <div className={styles.panel}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <div className={styles.detailHeader}>
          <div className={styles.symBlock} style={{background:cat.bg, border:`1px solid ${cat.border}`}}>
            <div className={styles.detailSym}>{element.symbol}</div>
            <div className={styles.detailNumLabel}>#{element.number}</div>
          </div>
          <div>
            <div className={styles.detailName}>{element.name} {element.nameEn && <span style={{fontSize:'1rem',fontWeight:500,color:'var(--text-muted)'}}>({element.nameEn})</span>}</div>
            <div className={styles.catBadge} style={{background:cat.bg,color:cat.color,border:`1px solid ${cat.border}`}}>{cat.label}</div>
            <div className={styles.detailTagline}>{element.story?.substring(0,80) || `${element.name}，原子序数 ${element.number}`}</div>
          </div>
        </div>
        <div className={styles.propsGrid}>
          {props.map(p => <div key={p.label} className={styles.propItem}><div className={styles.propLabel}>{p.label}</div><div className={styles.propVal}>{String(p.val)}</div></div>)}
        </div>
        <div className={styles.bohrWrap}><BohrCanvas element={element} color={cat.color} /></div>
        <div className={styles.secTitle}>发现故事</div>
        <div className={styles.storyText}>{element.story || `${element.name}（${element.symbol}）是元素周期表中第 ${element.number} 号元素，属于${cat.label}类别。`}</div>
        {element.uses?.length > 0 && <>
          <div className={styles.secTitle}>主要用途</div>
          <div className={styles.usesTags}>{element.uses.map(u => <span key={u} className={styles.useTag}>{u}</span>)}</div>
        </>}
      </div>
    </div>
  )
}

/* ── Main ── */
export default function PeriodicPage() {
  const { data, loading } = useFetch(api.elements)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const lanRef = useRef(null)
  const actRef = useRef(null)

  const elements = data?.data || []
  const byNumber = {}
  elements.forEach(el => {
    const pos = POSITIONS[el.number]
    if (pos) { el.period = pos.p; el.group = pos.g }
    else if (el.number >= 57 && el.number <= 71) { el.period = 6; el.group = 'La' }
    else if (el.number >= 89 && el.number <= 103) { el.period = 7; el.group = 'Ac' }
    byNumber[el.number] = el
  })

  const isMatch = useCallback((el) => {
    if (!search) return true
    const q = search.toLowerCase()
    return el.symbol.toLowerCase().includes(q) || el.name.includes(search) ||
           (el.nameEn||'').toLowerCase().includes(q) || String(el.number).includes(q)
  }, [search])

  const isDimmed = useCallback((el) => {
    if (search && !isMatch(el)) return true
    if (activeFilter && el.category !== activeFilter) return true
    if (hovered && !search && !activeFilter) {
      return !(el.period === hovered.period || el.group === hovered.group)
    }
    return false
  }, [search, activeFilter, hovered, isMatch])

  // Build 7×18 grid
  const mainGrid = []
  for (let p = 1; p <= 7; p++) {
    for (let g = 1; g <= 18; g++) {
      if ((p === 6 || p === 7) && g === 3) {
        mainGrid.push({type: p === 6 ? 'lan-spacer' : 'act-spacer', key: `${p}-${g}`})
        continue
      }
      const el = elements.find(e => e.period === p && e.group === g)
      mainGrid.push({type:'el', el, key:`${p}-${g}`})
    }
  }

  const lanthanides = elements.filter(e => e.number >= 57 && e.number <= 71).sort((a,b)=>a.number-b.number)
  const actinides   = elements.filter(e => e.number >= 89 && e.number <= 103).sort((a,b)=>a.number-b.number)

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setSelected(null) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className={styles.page}>
      {/* Nav */}
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>⚗</div>居里化学
        </Link>
        <Link to="/" className={styles.back}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5m7-7-7 7 7 7"/></svg>
          返回首页
        </Link>
      </nav>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>互动元素周期表</h1>
        <p className={styles.pageSub}>118 种元素，点击查看完整信息。悬停高亮同族/同周期。</p>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜索元素名称、符号、原子序数…" />
        </div>
        <div className={styles.filterBtns}>
          {Object.entries(CATEGORIES).map(([key,val]) => (
            <button key={key}
              className={`${styles.filterBtn} ${!activeFilter || activeFilter===key ? styles.filterActive : styles.filterInactive}`}
              style={{color:val.color, borderColor:val.border, background:val.bg}}
              onClick={() => setActiveFilter(activeFilter===key?null:key)}>
              {val.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        {Object.entries(CATEGORIES).map(([key,val]) => (
          <div key={key} className={styles.legendItem} onClick={()=>setActiveFilter(activeFilter===key?null:key)}>
            <div className={styles.legendDot} style={{background:val.color}} />
            {val.label}
          </div>
        ))}
      </div>

      {loading ? <div className="state-loading">加载元素数据中…</div> : <>
        {/* Main grid */}
        <div className={styles.tableWrapper}>
          <div className={styles.periodicGrid}>
            {mainGrid.map(item => {
              if (item.type === 'lan-spacer') return (
                <div key={item.key} className={styles.spacerCell} style={{background:'rgba(99,102,241,0.1)',border:'1px dashed rgba(99,102,241,0.35)'}}
                  onClick={()=>lanRef.current?.scrollIntoView({behavior:'smooth'})}>
                  <span style={{fontSize:'.45rem',color:'rgba(99,102,241,.8)',fontWeight:700,lineHeight:1.4,textAlign:'center'}}>镧系<br/>57-71</span>
                </div>
              )
              if (item.type === 'act-spacer') return (
                <div key={item.key} className={styles.spacerCell} style={{background:'rgba(168,85,247,0.1)',border:'1px dashed rgba(168,85,247,0.35)'}}
                  onClick={()=>actRef.current?.scrollIntoView({behavior:'smooth'})}>
                  <span style={{fontSize:'.45rem',color:'rgba(168,85,247,.8)',fontWeight:700,lineHeight:1.4,textAlign:'center'}}>锕系<br/>89-103</span>
                </div>
              )
              if (!item.el) return <div key={item.key} className={styles.elEmpty} />
              const el = item.el
              return <ElCell key={item.key} el={el} dimmed={isDimmed(el)} onClick={setSelected} onHover={setHovered} onLeave={()=>setHovered(null)} />
            })}
          </div>
        </div>

        {/* Lanthanide row */}
        <div className={styles.subGrid} ref={lanRef}>
          <div className={styles.subLabel}><span>镧系<br/>57–71</span></div>
          {lanthanides.map(el => <ElCell key={el.number} el={el} dimmed={isDimmed(el)} onClick={setSelected} onHover={setHovered} onLeave={()=>setHovered(null)} />)}
        </div>

        {/* Actinide row */}
        <div className={styles.subGrid} ref={actRef}>
          <div className={styles.subLabel}><span>锕系<br/>89–103</span></div>
          {actinides.map(el => <ElCell key={el.number} el={el} dimmed={isDimmed(el)} onClick={setSelected} onHover={setHovered} onLeave={()=>setHovered(null)} />)}
        </div>
      </>}

      {/* Detail Panel */}
      {selected && <DetailPanel element={elements.find(e=>e.number===selected)} onClose={()=>setSelected(null)} />}
    </div>
  )
}
