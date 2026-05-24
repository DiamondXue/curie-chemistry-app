const elements = require('./elements');

const courses = [
  {
    id: 1,
    num: '01',
    title: '化学启蒙 — 原子的世界',
    lessons: 12,
    hours: 3,
    target: '适合初学者',
    level: 'beginner',
    description: '从原子结构出发，理解物质的本质。包含电子排布、离子键与共价键、化学式入门。',
    topics: ['原子结构','质子中子电子','化学键基础','化学式与分子']
  },
  {
    id: 2,
    num: '02',
    title: '元素与化合物 — 周期表的秘密',
    lessons: 20,
    hours: 6,
    target: '初中化学必备',
    level: 'beginner',
    description: '系统学习元素周期律、金属与非金属、酸碱盐基础，掌握常见化合物性质。',
    topics: ['元素周期律','金属与非金属','酸碱盐','常见化合物']
  },
  {
    id: 3,
    num: '03',
    title: '化学反应原理 — 方程式与速率',
    lessons: 28,
    hours: 9,
    target: '高中化学核心',
    level: 'intermediate',
    description: '深入理解化学方程式配平、氧化还原、反应速率与化学平衡。',
    topics: ['化学方程式','氧化还原反应','化学平衡','反应速率']
  },
  {
    id: 4,
    num: '04',
    title: '有机化学入门 — 碳的魔力',
    lessons: 32,
    hours: 12,
    target: '高中有机核心',
    level: 'intermediate',
    description: '有机物命名规则、烃类性质、官能团化学，理解碳的多样成键方式。',
    topics: ['烃类化合物','官能团','有机反应类型','高分子化学']
  },
  {
    id: 5,
    num: '05',
    title: '化学竞赛强化 — 居里夫人之路',
    lessons: 50,
    hours: 20,
    target: '竞赛 / 高考冲刺',
    level: 'advanced',
    description: '涵盖电化学、热力学、量子化学基础，以及历届竞赛高频考点精讲。',
    topics: ['电化学','热力学','量子化学基础','竞赛真题解析']
  }
];

const experiments = [
  {
    id:1, title:'酸碱中和反应', desc:'观察盐酸与氢氧化钠混合时的 pH 变化，理解中和反应的本质。',
    tags:['高中','酸碱','滴定'], canvasTheme:'blue', bg:'linear-gradient(135deg,#1a0533,#0d1f4e)',
    equation:'HCl + NaOH → NaCl + H₂O',
    materials:['稀盐酸(0.1mol/L)','氢氧化钠溶液(0.1mol/L)','酚酞指示剂','烧杯','滴定管','pH试纸','玻璃棒','白瓷板'],
    steps: [
      { text:'取 20mL 稀盐酸于烧杯中，滴入 3 滴酚酞指示剂，观察溶液颜色。', observation:'溶液呈无色（酸性条件下酚酞不变色）。' },
      { text:'用滴定管向烧杯中缓慢滴加氢氧化钠溶液，边滴边用玻璃棒搅拌。', observation:'滴入区域出现粉红色，搅拌后消失——说明酸过量，碱被快速中和。' },
      { text:'继续滴定，直到溶液变为浅粉红色且 30 秒不褪色，此时即为滴定终点。', observation:'pH ≈ 7，酸碱完全中和。你闻不到任何刺激性气味——HCl 已被完全反应。' },
      { text:'将反应后的溶液倒入蒸发皿中，小火加热蒸发水分。', observation:'白色晶体析出——这就是氯化钠（NaCl），我们日常食用的盐！' }
    ],
    safety:['盐酸和氢氧化钠均有腐蚀性，避免接触皮肤','实验需在通风处进行','如不慎接触，立即用大量清水冲洗']
  },
  {
    id:2, title:'氧化还原反应', desc:'铁在硫酸铜溶液中置换铜，电子转移过程可视化演示。',
    tags:['高中','氧化还原','置换'], canvasTheme:'green', bg:'linear-gradient(135deg,#0d2e1a,#1a3d0d)',
    equation:'Fe + CuSO₄ → FeSO₄ + Cu',
    materials:['硫酸铜溶液(1mol/L)','光亮铁钉(除锈)','试管','镊子','砂纸','烧杯'],
    steps: [
      { text:'用砂纸打磨铁钉，去除表面氧化物和油污，使其光洁。', observation:'铁钉呈现银白色金属光泽——铁的还原态。' },
      { text:'将处理好的铁钉浸入硫酸铜蓝色溶液中。', observation:'铁钉表面迅速开始变红——单质铜正在析出！电子从 Fe 转移到了 Cu²⁺。' },
      { text:'静置 10 分钟，观察溶液颜色和铁钉表面的变化。', observation:'溶液蓝色逐渐变浅（Cu²⁺ 被消耗），铁钉表面覆盖了一层红棕色铜层。' },
      { text:'取出铁钉，观察表面沉积物。', observation:'铁钉变"铜钉"了！Fe 被氧化成 Fe²⁺ 进入溶液，Cu²⁺ 被还原成 Cu 沉积在铁钉上。这就是古代"铁置换铜"的湿法炼铜原理。' }
    ],
    safety:['硫酸铜溶液对皮肤有刺激性，建议戴手套操作','实验后废液需按实验室规定处理']
  },
  {
    id:3, title:'焰色反应', desc:'不同金属盐在火焰中呈现独特颜色，光谱分析原理入门。',
    tags:['初中','金属','光谱'], canvasTheme:'flame', bg:'linear-gradient(135deg,#2e1a0d,#3d2d08)',
    equation:'电子跃迁：e⁻ 吸收能量 → 激发态 → 回到基态 + 特定波长光(hν)',
    materials:['铂丝/铁丝','浓盐酸(清洗用)','酒精灯','KCl溶液(钾)','NaCl溶液(钠)','CaCl₂溶液(钙)','CuSO₄溶液(铜)','SrCl₂溶液(锶)'],
    steps: [
      { text:'将铂丝在浓盐酸中清洗，然后在酒精灯外焰上灼烧至无色。', observation:'铂丝本身不产生焰色——清洁是实验准确的前提。' },
      { text:'蘸取少量 NaCl 溶液，置于火焰上观察。', observation:'明亮的金黄色火焰——这就是钠的焰色，也是路灯钠灯的颜色来源！' },
      { text:'清洗铂丝后，蘸取 KCl 溶液测试。', observation:'透过蓝色钴玻璃观察，火焰呈紫色——钾的特征焰色。' },
      { text:'依次测试 CuSO₄（绿色）、SrCl₂（红色）、CaCl₂（砖红色）。', observation:'每种金属都有独一无二的"焰色指纹"——这就是光谱分析的原理！烟花五彩斑斓的颜色就是这么来的。' }
    ],
    safety:['酒精灯使用需谨慎，远离易燃物','浓盐酸有强腐蚀性，使用时要格外小心','实验后确保酒精灯完全熄灭']
  },
  {
    id:4, title:'电解水实验', desc:'观察氢气与氧气的产生体积比，深入理解水的组成。',
    tags:['初中','电化学','气体'], canvasTheme:'electro', bg:'linear-gradient(135deg,#001a2e,#0a1a3d)',
    equation:'2H₂O →(通电)→ 2H₂↑ + O₂↑',
    materials:['霍夫曼电解器','直流电源(12V)','稀硫酸(增强导电)','水槽','试管×2','木条','火柴'],
    steps: [
      { text:'组装霍夫曼电解器，向水中加入少量稀硫酸——水本身导电性差，需要电解质帮忙。', observation:'两极开始出现气泡！阴极（负极）气泡更多——猜猜看为什么？' },
      { text:'通电后观察两极管中气体的体积变化。', observation:'阴极气体体积约为阳极的 2 倍。根据方程式：2H₂O → 2H₂ + O₂，阴极产氢，阳极产氧，体积比恰好 2:1！' },
      { text:'用带火星的木条检验阳极气体。', observation:'木条复燃！这是氧气的特征检验——O₂ 助燃。' },
      { text:'用点燃的木条检验阴极气体。', observation:'听到轻微的"噗"声——氢气燃烧发出爆鸣声！水确实是由氢和氧组成的。' }
    ],
    safety:['氢气易燃，检验时试管口不要对着人','使用直流电源确保接头牢固','稀硫酸有腐蚀性，避免溅出']
  },
  {
    id:5, title:'化学平衡移动', desc:'勒夏特列原理可视化：温度、浓度、压强对平衡的影响。',
    tags:['高中','平衡','热力学'], canvasTheme:'purple', bg:'linear-gradient(135deg,#1a001a,#2e0033)',
    equation:'2NO₂(g) ⇌ N₂O₄(g)    ΔH = -57.2 kJ/mol  (放热反应)',
    materials:['密封NO₂/N₂O₄平衡球','热水','冰水','烧杯×2'],
    steps: [
      { text:'室温下观察平衡球的颜色——红棕色 NO₂ 与无色 N₂O₄ 的混合。', observation:'球内气体呈浅红棕色，这是 NO₂ 和 N₂O₄ 的动态平衡态。正逆反应同时进行、速率相等。' },
      { text:'将平衡球浸入热水中（约 60°C），观察颜色变化。', observation:'颜色明显加深变棕！温度升高，平衡向吸热方向（逆反应——生成 NO₂）移动。违背直觉？记住：体系会"反抗"你加热它的行为，所以朝吸热方向走！' },
      { text:'将平衡球浸入冰水中（约 0°C），观察颜色变化。', observation:'颜色变浅近乎无色！降温后平衡向放热方向（正反应——生成 N₂O₄）移动。这就是勒夏特列原理：体系总想抵消外界的改变。' },
      { text:'取出平衡球回到室温，观察颜色恢复。', observation:'颜色逐渐回到最初的浅红棕色——平衡是可逆的，条件恢复时平衡态也恢复。化学平衡不是静止的，是动态的！' }
    ],
    safety:['避免用沸水（>100°C），防止玻璃球破裂','热水操作注意防烫','实验物品为密封体系，请勿打破']
  },
  {
    id:6, title:'有机物燃烧分析', desc:'甲烷燃烧产物检验，掌握有机物燃烧规律与计算方法。',
    tags:['高中','有机','燃烧'], canvasTheme:'yellow', bg:'linear-gradient(135deg,#1a1a00,#2e2e08)',
    equation:'CH₄ + 2O₂ → CO₂ + 2H₂O',
    materials:['甲烷气源(天然气)','干燥烧杯','石灰水(澄清)','导管','酒精灯','火柴'],
    steps: [
      { text:'点燃甲烷气体，观察火焰颜色和形态。', observation:'淡蓝色火焰，几乎透明——甲烷燃烧充分时的典型特征。与蜡烛的黄色火焰不同，纯甲烷火焰更"干净"。' },
      { text:'将干燥的冷烧杯倒扣在火焰上方，观察杯壁。', observation:'烧杯内壁出现水雾！证明甲烷燃烧生成了水（H₂O）。用手指触摸杯壁，湿润且温热。' },
      { text:'改用内壁涂有澄清石灰水的烧杯，倒扣在火焰上。', observation:'石灰水变浑浊——白色 CaCO₃ 沉淀生成！证明产物中有 CO₂。CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O。' },
      { text:'整理实验数据，写出完整的燃烧方程式。', observation:'CH₄ + 2O₂ → CO₂ + 2H₂O，甲烷完全燃烧生成二氧化碳和水。所有碳氢化合物燃烧都遵循类似规律，你学会了吗？' }
    ],
    safety:['甲烷易燃，实验前检查气密性','远离易燃物，保持通风','实验后及时关闭气源']
  },
];

const chapters = [
  // ─── Course 1: 化学启蒙 ───
  { id:1,  course_id:1, num:'01', title:'物质的微观构成',     description:'从道尔顿到卢瑟福，认识原子这个神秘的小世界。',       order_idx:1 },
  { id:2,  course_id:1, num:'02', title:'电子排布与周期律',     description:'电子如何在原子核外排列？规律背后藏着宇宙的秩序。',   order_idx:2 },
  { id:3,  course_id:1, num:'03', title:'化学键基础',           description:'原子之间如何牵手？离子键、共价键，化学的纽带。',       order_idx:3 },
  { id:4,  course_id:1, num:'04', title:'化学式入门',           description:'用符号书写物质的语言，化学式的命名与书写规则。',       order_idx:4 },
  // ─── Course 2: 元素与化合物 ───
  { id:5,  course_id:2, num:'01', title:'元素周期律探秘',       description:'门捷列夫的伟大预言——周期表为何如此排列？',           order_idx:1 },
  { id:6,  course_id:2, num:'02', title:'金属的世界',           description:'从钠到金，金属的通性与个性，合金的奥秘。',             order_idx:2 },
  { id:7,  course_id:2, num:'03', title:'非金属与稀有气体',     description:'氧、氮、碳、卤素……非金属元素的生活应用。',             order_idx:3 },
  { id:8,  course_id:2, num:'04', title:'酸碱盐基础',           description:'酸为什么酸？碱为什么滑？中和反应背后的化学逻辑。',     order_idx:4 },
  { id:9,  course_id:2, num:'05', title:'常见化合物',           description:'水、二氧化碳、氧化钙——你能叫出名字的化合物。',         order_idx:5 },
  // ─── Course 3: 化学反应原理 ───
  { id:10, course_id:3, num:'01', title:'化学方程式的奥秘',     description:'配平不只是数学题——质量守恒定律的直观体现。',           order_idx:1 },
  { id:11, course_id:3, num:'02', title:'氧化还原反应',         description:'电子的转移游戏，从生锈到电池，氧化还原无处不在。',       order_idx:2 },
  { id:12, course_id:3, num:'03', title:'化学反应速率',         description:'为什么有的反应瞬间完成，有的需要亿万年？',             order_idx:3 },
  { id:13, course_id:3, num:'04', title:'化学平衡与勒夏特列',   description:'动态平衡——化学世界没有绝对的静止。',                 order_idx:4 },
  // ─── Course 4: 有机化学入门 ───
  { id:14, course_id:4, num:'01', title:'碳的独特魅力',         description:'为什么碳能形成数百万种化合物？碳的成键方式全解析。',   order_idx:1 },
  { id:15, course_id:4, num:'02', title:'烃类化合物',           description:'烷烃、烯烃、炔烃、芳香烃——有机化学的基石。',           order_idx:2 },
  { id:16, course_id:4, num:'03', title:'官能团化学',           description:'羟基、羧基、羰基……官能团决定有机物的化学性格。',       order_idx:3 },
  { id:17, course_id:4, num:'04', title:'有机反应类型',         description:'取代、加成、消去、聚合——四大反应类型全掌握。',         order_idx:4 },
  // ─── Course 5: 竞赛强化 ───
  { id:18, course_id:5, num:'01', title:'电化学深度解析',       description:'原电池、电解池、能斯特方程——电化学的全景图。',         order_idx:1 },
  { id:19, course_id:5, num:'02', title:'热力学与化学',         description:'焓、熵、吉布斯自由能——从能量角度看化学反应。',         order_idx:2 },
  { id:20, course_id:5, num:'03', title:'量子化学入门',         description:'薛定谔方程、原子轨道、分子轨道——化学的量子视角。',     order_idx:3 },
];

const lessons = [
  // ─── Chapter 1: 物质的微观构成 (3 lessons) ───
  { id:1,  chapter_id:1, course_id:1, num:'1.1', title:'什么是原子？', duration:8,  type:'article', order_idx:1,
    content:`<h2>原子——物质的最小"积木"</h2>
<p>如果把一块铁切成两半，再切成两半，再切成两半……一直切下去，最后剩下的是什么？</p>
<p>古希腊哲学家德谟克利特在公元前400年就提出了一个大胆的猜想：物质不能无限分割，最终会到达一个不可再分的单元。他称其为 <strong>atomos</strong>（希腊语，意为"不可分割"），这就是"原子"一词的起源。</p>

<h3>原子的真实尺寸</h3>
<p>一个原子的直径大约只有 <strong>0.1 纳米</strong>（1 纳米 = 10⁻⁹ 米）。这意味着：</p>
<ul>
  <li>把 1000 万个原子排成一行，才相当于一根头发丝的直径</li>
  <li>一个针尖上可以容纳约 <strong>10¹⁶</strong>（1亿亿）个原子</li>
  <li>如果将一个苹果放大到地球那么大，组成它的原子才只有蓝莓大小</li>
</ul>

<h3>原子真的"不可分"吗？</h3>
<p>德谟克利特说对了一半：原子确实是物质保持化学性质的最小单位，但原子本身<strong>并非不可分割</strong>。它内部还有质子、中子和电子——我们将在下一课中探索。</p>

<div class="highlight-box">
  <strong>关键概念：</strong>原子是化学变化中不可再分的最小微粒，是构成物质的基本单元。化学反应的实质，就是原子重新组合的过程。
</div>` },
  { id:2,  chapter_id:1, course_id:1, num:'1.2', title:'质子、中子与电子', duration:10, type:'article', order_idx:2,
    content:`<h2>原子的内部结构</h2>
<p>原子并非一个实心小球，它更像一个微型太阳系：</p>
<ul>
  <li><strong>原子核</strong>位于中心，占据原子 99.9% 以上的质量，但体积只占整个原子的万亿分之一</li>
  <li><strong>电子</strong>在核外高速运动，形成"电子云"</li>
</ul>

<h3>三种基本粒子</h3>
<table>
  <thead><tr><th>粒子</th><th>符号</th><th>电荷</th><th>相对质量</th><th>位置</th></tr></thead>
  <tbody>
    <tr><td>质子</td><td>p⁺</td><td>+1</td><td>1</td><td>原子核内</td></tr>
    <tr><td>中子</td><td>n⁰</td><td>0</td><td>1</td><td>原子核内</td></tr>
    <tr><td>电子</td><td>e⁻</td><td>-1</td><td>1/1836</td><td>核外</td></tr>
  </tbody>
</table>

<h3>两个关键数字</h3>
<ul>
  <li><strong>原子序数 (Z)</strong> = 核内质子数 = 核外电子数（对于中性原子）——决定了它是哪种元素</li>
  <li><strong>质量数 (A)</strong> = 质子数 + 中子数</li>
</ul>

<div class="highlight-box">
  <strong>想一想：</strong>为什么原子整体呈电中性？因为质子数 = 电子数，正负电荷恰好抵消。改变电子数 → 离子；改变中子数 → 同位素；改变质子数 → 变成另一种元素！
</div>` },
  { id:3,  chapter_id:1, course_id:1, num:'1.3', title:'原子模型的历史演变', duration:12, type:'article', order_idx:3,
    content:`<h2>人类认识原子的五步曲</h2>

<h3>1. 道尔顿模型 (1803) — "实心球"</h3>
<p>约翰·道尔顿提出：原子是不可分割的实心小球。不同元素的原子质量不同。这是科学原子论的起点。</p>

<h3>2. 汤姆孙模型 (1897) — "葡萄干布丁"</h3>
<p>J.J. 汤姆孙发现电子后提出：原子是一个带正电的球体，电子像葡萄干一样均匀散布其中。</p>

<h3>3. 卢瑟福模型 (1911) — "行星模型"</h3>
<p>α 粒子散射实验：绝大多数 α 粒子直接穿过金箔，少数发生大角度偏转。结论：原子内部绝大部分是空的，正电荷集中在一个极小的核上。</p>

<h3>4. 玻尔模型 (1913) — "量子化轨道"</h3>
<p>尼尔斯·玻尔引入量子概念：电子只能在特定轨道上运动，不会辐射能量。电子跃迁时吸收或放出光子。</p>

<h3>5. 量子力学模型 (1926至今) — "电子云"</h3>
<p>薛定谔方程：电子没有确定的轨道，只能用<strong>概率</strong>描述它在某处出现的可能性。"电子云"越密的地方，电子出现的概率越大。</p>

<div class="highlight-box">
  <strong>科学精神：</strong>200 年间，每一个新模型都建立在实验证据之上，又不断被新的实验证据修正。科学不是一锤定音，而是永无止境的逼近真相。
</div>` },

  // ─── Chapter 2: 电子排布与周期律 (3 lessons) ───
  { id:4,  chapter_id:2, course_id:1, num:'2.1', title:'电子层与能级', duration:10, type:'article', order_idx:1,
    content:`<h2>电子住在哪里？</h2>
<p>核外电子不是随意分布的，它们按照能量的高低分层排布。</p>

<h3>电子层 (主量子数 n)</h3>
<p>离核最近的叫第一层 (K层, n=1)，往外依次是 L层(n=2)、M层(n=3)、N层(n=4)……</p>
<ul>
  <li>n=1 离核最近，能量最低，电子最稳定</li>
  <li>n 越大，能量越高，电子越容易参与化学反应</li>
  <li>每层最多容纳 2n² 个电子：K=2, L=8, M=18, N=32...</li>
</ul>

<h3>为什么有"2n²"规则？</h3>
<p>每个电子层又分为若干<strong>亚层</strong>（s、p、d、f），每个亚层包含若干<strong>轨道</strong>：</p>
<table>
  <thead><tr><th>亚层</th><th>轨道数</th><th>最多电子数</th></tr></thead>
  <tbody>
    <tr><td>s</td><td>1</td><td>2</td></tr>
    <tr><td>p</td><td>3</td><td>6</td></tr>
    <tr><td>d</td><td>5</td><td>10</td></tr>
    <tr><td>f</td><td>7</td><td>14</td></tr>
  </tbody>
</table>
<p>每个轨道最多容纳 2 个自旋相反的电子（泡利不相容原理）。</p>

<div class="highlight-box">
  <strong>记忆口诀：</strong>K层住2个，L层8个满，M层18个封顶。但最外层不能超过 8 个（K层除外），次外层不超过 18 个。
</div>` },
  { id:5,  chapter_id:2, course_id:1, num:'2.2', title:'电子排布规则', duration:12, type:'article', order_idx:2,
    content:`<h2>电子排布三原则</h2>

<h3>原则一：能量最低原理</h3>
<p>电子优先占据能量最低的轨道。能级顺序并非简单地按 n 排列：</p>
<p><strong>1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s → 4d → 5p → 6s → 4f → 5d → 6p → 7s → 5f → 6d → 7p</strong></p>
<p>注意！4s 的能量比 3d <strong>低</strong>，所以先填 4s 再填 3d。</p>

<h3>原则二：泡利不相容原理</h3>
<p>同一原子中，不可能有两个电子处于完全相同的量子态。简单说：<strong>每个轨道最多 2 个电子，且自旋相反</strong>。</p>

<h3>原则三：洪特规则</h3>
<p>电子在能量相同的轨道（如 3 个 p 轨道）上排布时，会尽可能<strong>分占不同轨道</strong>且自旋平行（都朝上）。就像公交车上，人们会先占空座位，而不是挤在一起。</p>

<h3>实战：写出铁(Fe, Z=26)的电子排布</h3>
<p>1s² 2s² 2p⁶ 3s² 3p⁶ <strong>4s² 3d⁶</strong></p>
<p>注意：先填满 4s（2个电子），剩余的6个填入 3d。</p>

<div class="highlight-box">
  <strong>简化写法：</strong>用上一周期稀有气体缩略——Fe: [Ar] 4s² 3d⁶。比完整写法简洁多了！
</div>` },
  { id:6,  chapter_id:2, course_id:1, num:'2.3', title:'原子结构与元素周期表', duration:10, type:'article', order_idx:3,
    content:`<h2>周期表不是随便画的</h2>
<p>元素周期表的结构直接来源于电子排布规律。理解了前者，后者就不再需要死记硬背。</p>

<h3>周期 = 电子层数</h3>
<ul>
  <li>第 1 周期：2 种元素（H, He）→ K 层最多 2 个电子</li>
  <li>第 2 周期：8 种元素（Li→Ne）→ L 层最多 8 个电子</li>
  <li>第 4 周期：18 种元素 → 多了 3d 轨道（10个电子）</li>
</ul>

<h3>族 = 最外层电子数</h3>
<ul>
  <li>IA 族（碱金属）：最外层 1 个电子 → 极易失去 → 化学性质活泼</li>
  <li>VIIA 族（卤素）：最外层 7 个电子 → 极易得到 1 个 → 强氧化性</li>
  <li>0 族（稀有气体）：最外层 8 个（He 为 2）→ 稳定结构 → 几乎不反应</li>
</ul>

<h3>区块划分</h3>
<ul>
  <li><strong>s 区</strong>：IA、IIA 族 — 最外层电子填入 s 轨道</li>
  <li><strong>p 区</strong>：IIIA~0 族 — 最外层电子填入 p 轨道</li>
  <li><strong>d 区</strong>：过渡金属 — 电子填入 (n-1)d 轨道</li>
  <li><strong>f 区</strong>：镧系+锕系 — 电子填入 (n-2)f 轨道</li>
</ul>

<div class="highlight-box">
  <strong>一句话总结：</strong>周期看层数，族看最外层。周期表是电子排布规律的可视化地图。
</div>` },

  // ─── Chapter 3: 化学键基础 (3 lessons) ───
  { id:7,  chapter_id:3, course_id:1, num:'3.1', title:'离子键的形成', duration:10, type:'article', order_idx:1,
    content:`<h2>电子给出去，就成了离子键</h2>
<p>当金属元素（容易失去电子）遇上非金属元素（容易得到电子），电子会发生<strong>转移</strong>，形成带正电的阳离子和带负电的阴离子，两者靠静电引力结合在一起——这就是<strong>离子键</strong>。</p>

<h3>经典案例：NaCl（食盐）的形成</h3>
<p><strong>Na → Na⁺ + e⁻</strong>（钠失去 1 个电子，变成 Na⁺，电子排布变成 [Ne] 稳定结构）</p>
<p><strong>Cl + e⁻ → Cl⁻</strong>（氯得到 1 个电子，变成 Cl⁻，电子排布变成 [Ar] 稳定结构）</p>
<p><strong>Na⁺ + Cl⁻ → NaCl</strong>（正负离子靠静电引力结合）</p>

<h3>离子键的特点</h3>
<ul>
  <li><strong>无方向性</strong>：离子在各个方向上都吸引异号离子</li>
  <li><strong>无饱和性</strong>：一个离子可以同时吸引多个异号离子</li>
  <li><strong>形成离子晶体</strong>：NaCl 不是单个分子，而是 Na⁺ 和 Cl⁻ 按 1:1 比例排列的巨型晶体</li>
  <li><strong>熔沸点高、硬度大、溶于水导电</strong></li>
</ul>

<div class="highlight-box">
  <strong>判断技巧：</strong>IA/IIA 族金属 + VIA/VIIA 族非金属 → 通常形成离子键。电负性差 > 1.7 时以离子键为主。
</div>` },
  { id:8,  chapter_id:3, course_id:1, num:'3.2', title:'共价键与分子', duration:12, type:'article', order_idx:2,
    content:`<h2>共享电子，皆大欢喜</h2>
<p>当两个非金属原子相遇时，谁都舍不得完全给出电子。那就<strong>共享</strong>吧——各自拿出电子形成<strong>共用电子对</strong>，这就是共价键。</p>

<h3>共价键的三种类型</h3>
<table>
  <thead><tr><th>类型</th><th>共用电子对数</th><th>示例</th></tr></thead>
  <tbody>
    <tr><td>单键</td><td>1 对</td><td>H-H, C-C, H-Cl</td></tr>
    <tr><td>双键</td><td>2 对</td><td>O=O, C=C</td></tr>
    <tr><td>三键</td><td>3 对</td><td>N≡N, C≡C</td></tr>
  </tbody>
</table>

<h3>极性共价键 vs 非极性共价键</h3>
<ul>
  <li><strong>非极性</strong>：相同原子间（如 H-H, Cl-Cl），共用电子对不偏向任何一方</li>
  <li><strong>极性</strong>：不同原子间（如 H-Cl），电负性大的原子（Cl）把电子对拉向自己，产生<strong>部分电荷</strong> δ⁺H—Clδ⁻</li>
</ul>

<h3>共价键的特点</h3>
<ul>
  <li><strong>有方向性</strong>：原子轨道在特定方向上重叠最大——决定了分子的空间构型</li>
  <li><strong>有饱和性</strong>：每个原子能形成的共价键数目 = 8 - 最外层电子数（八隅体规则）</li>
</ul>

<div class="highlight-box">
  <strong>路易斯结构式：</strong>用小点表示最外层电子，用短线表示共用电子对。H:O:H → H-O-H（水分子，两对共用电子 = 两个 O-H 单键）
</div>` },
  { id:9,  chapter_id:3, course_id:1, num:'3.3', title:'金属键与分子间作用力', duration:10, type:'article', order_idx:3,
    content:`<h2>不止离子键和共价键</h2>

<h3>金属键——电子的海洋</h3>
<p>金属原子外层电子容易脱离，形成<strong>自由电子气</strong>（电子海），金属阳离子沉浸在"电子海"中。这种特殊的键合方式赋予了金属独特的性质：</p>
<ul>
  <li><strong>导电性</strong>：自由电子在电场下定向移动</li>
  <li><strong>导热性</strong>：自由电子传递热振动</li>
  <li><strong>延展性</strong>：原子层可以滑动但不破坏键合（与离子晶体的脆性形成鲜明对比）</li>
  <li><strong>金属光泽</strong>：自由电子吸收并重新发射各种频率的光</li>
</ul>

<h3>分子间作用力（范德华力）</h3>
<p>分子之间也存在相互作用力，虽然远弱于化学键，但决定了物质的熔沸点和状态：</p>
<ul>
  <li><strong>色散力</strong>：所有分子间都存在，分子越大越强</li>
  <li><strong>偶极-偶极力</strong>：极性分子之间（如 HCl...HCl）</li>
  <li><strong>氢键</strong>：最强的分子间作用力——当 H 与 F/O/N 键合时产生。解释了水的反常性质（冰浮在水上）和 DNA 双螺旋结构的稳定性</li>
</ul>

<div class="highlight-box">
  <strong>力的强弱对比：</strong>共价键(200-400 kJ/mol) > 氢键(10-40 kJ/mol) > 范德华力(1-10 kJ/mol)。虽然氢键弱于共价键，但大量氢键累积效应不可忽视！
</div>` },

  // ─── Chapter 4: 化学式入门 (3 lessons) ───
  { id:10, chapter_id:4, course_id:1, num:'4.1', title:'化学式的书写规则', duration:8, type:'article', order_idx:1,
    content:`<h2>化学的语言——化学式</h2>
<p>化学式用元素符号和数字表示物质的组成，是化学家之间的"通用语言"。</p>

<h3>化学式的种类</h3>
<table>
  <thead><tr><th>类型</th><th>含义</th><th>示例</th></tr></thead>
  <tbody>
    <tr><td>实验式（最简式）</td><td>原子个数最简整数比</td><td>CH₂O（葡萄糖的最简式）</td></tr>
    <tr><td>分子式</td><td>表示一个分子的实际原子数</td><td>C₆H₁₂O₆（葡萄糖的分子式）</td></tr>
    <tr><td>结构式</td><td>表示原子连接方式</td><td>H-O-H（水的结构式）</td></tr>
    <tr><td>电子式</td><td>表示最外层电子</td><td>用 · 表示电子</td></tr>
  </tbody>
</table>

<h3>书写规则（以 Na₂SO₄ 为例）</h3>
<ol>
  <li>金属在前，非金属在后：Na⁺ 写在前面，SO₄²⁻ 写在后面</li>
  <li>原子个数写在右下角：2 个 Na → Na₂；4 个 O → O₄</li>
  <li>原子团用括号：多个 OH⁻ → (OH)₂</li>
  <li>正负化合价代数和为 0：Na₂SO₄ 中 2×(+1) + 1×(-2) = 0 ✓</li>
</ol>

<div class="highlight-box">
  <strong>常见错误：</strong>不要把 2O（2个氧原子）写成 O₂（1个氧分子），也不要把 CO（一氧化碳）写成 Co（钴元素）——大小写和下标马虎不得！
</div>` },
  { id:11, chapter_id:4, course_id:1, num:'4.2', title:'化合价与化学式', duration:10, type:'article', order_idx:2,
    content:`<h2>化合价——原子的"牵手能力"</h2>
<p>化合价表示一个原子在形成化合物时能够结合其他原子的"能力"，实质上是原子得失或共用的电子数。</p>

<h3>常见化合价速记</h3>
<table>
  <thead><tr><th>元素/原子团</th><th>化合价</th><th>示例</th></tr></thead>
  <tbody>
    <tr><td>H, Li, Na, K</td><td>+1</td><td>NaCl, K₂O</td></tr>
    <tr><td>Mg, Ca, Ba</td><td>+2</td><td>MgO, CaCO₃</td></tr>
    <tr><td>Al</td><td>+3</td><td>Al₂O₃</td></tr>
    <tr><td>O</td><td>-2</td><td>H₂O, CO₂</td></tr>
    <tr><td>F, Cl, Br, I</td><td>-1</td><td>NaCl, KBr</td></tr>
    <tr><td>OH⁻</td><td>-1</td><td>NaOH, Ca(OH)₂</td></tr>
    <tr><td>SO₄²⁻</td><td>-2</td><td>Na₂SO₄, CuSO₄</td></tr>
    <tr><td>CO₃²⁻</td><td>-2</td><td>Na₂CO₃, CaCO₃</td></tr>
    <tr><td>NO₃⁻</td><td>-1</td><td>KNO₃, AgNO₃</td></tr>
    <tr><td>NH₄⁺</td><td>+1</td><td>NH₄Cl, (NH₄)₂SO₄</td></tr>
  </tbody>
</table>

<h3>十字交叉法书写化学式</h3>
<p>以 Al³⁺ 和 SO₄²⁻ 为例：</p>
<ol>
  <li>写出符号：Al SO₄</li>
  <li>标化合价：Al³⁺ SO₄²⁻</li>
  <li>十字交叉（绝对值）：Al₂(SO₄)₃</li>
  <li>验证：2×(+3) + 3×(-2) = 0 ✓</li>
</ol>

<div class="highlight-box">
  <strong>口诀：</strong>一价钾钠氯氢银，二价氧钙钡镁锌。三铝四硅五价磷，二三铁二四碳。二四六硫都齐全，铜汞二价最常见。
</div>` },
  { id:12, chapter_id:4, course_id:1, num:'4.3', title:'化学方程式的初步', duration:12, type:'article', order_idx:3,
    content:`<h2>用方程式讲述化学反应</h2>
<p>化学方程式是化学反应最精炼的表达方式，包含反应物、生成物、反应条件和物质的量关系。</p>

<h3>书写步骤</h3>
<ol>
  <li><strong>写</strong>：写出反应物和生成物的化学式（反应物在左，生成物在右，用 → 连接）</li>
  <li><strong>配</strong>：配平化学方程式，使左右两边各元素的原子个数相等</li>
  <li><strong>注</strong>：注明反应条件（加热△、点燃、催化剂、通电等）和生成物状态（↑ 气体、↓ 沉淀）</li>
</ol>

<h3>配平方法</h3>
<p><strong>最小公倍数法</strong>（以 H₂ + O₂ → H₂O 为例）：</p>
<ol>
  <li>找出出现次数最多的元素 — O</li>
  <li>左边 O₂(2个O) vs 右边 H₂O(1个O) → 最小公倍数为 2</li>
  <li>右边 ×2 → 2H₂O；调整氢 → 左边 ×2 → 2H₂</li>
  <li>验证：H: 4=4, O: 2=2 ✓</li>
  <li>最终：<strong>2H₂ + O₂ →(点燃)→ 2H₂O</strong></li>
</ol>

<h3>化学方程式的三重含义</h3>
<p><strong>2H₂ + O₂ →(点燃)→ 2H₂O</strong> 告诉我们：</p>
<ul>
  <li><strong>质</strong>：氢气与氧气反应生成水</li>
  <li><strong>量</strong>：每 2 个氢分子与 1 个氧分子反应，生成 2 个水分子</li>
  <li><strong>质量比</strong>：m(H₂) : m(O₂) : m(H₂O) = 4 : 32 : 36 = 1 : 8 : 9</li>
</ul>

<div class="highlight-box">
  <strong>配平原则：</strong>"先金属后非金属，先复杂后简单，先原子团后单质"。最重要的是——只能改系数(前面的数字)，不能改化学式！
</div>` },
];

const quizQuestions = [
  { id:1, lesson_id:1, question:'原子一词来源于希腊语"atomos"，它的原意是什么？', options:['最小的粒子','不可分割','物质的基本单元','看不见的东西'], answer:1, explanation:'atomos 意为"不可分割的"。德谟克利特认为物质不能无限切割，最终会到达一个不可再分的单元。' },
  { id:2, lesson_id:1, question:'一个原子的直径大约是多少？', options:['0.1 毫米','0.1 微米','0.1 纳米','0.1 皮米'], answer:2, explanation:'原子直径约 0.1 纳米（10⁻¹⁰ 米）。纳米是十亿分之一米，比一根头发丝的十万分之一还小。' },
  { id:3, lesson_id:2, question:'中性原子中，下列哪两者数量相等？', options:['质子数和中子数','质子数和电子数','中子数和电子数','质子数和质量数'], answer:1, explanation:'中性原子中，质子数 = 电子数，正负电荷抵消。中子数不一定等于质子数（同位素的存在）。' },
  { id:4, lesson_id:2, question:'某原子核内有 11 个质子，12 个中子，其质量数是多少？', options:['11','12','23','无法确定'], answer:2, explanation:'质量数 = 质子数 + 中子数 = 11 + 12 = 23。这是钠-23 原子。' },
  { id:5, lesson_id:3, question:'卢瑟福的 α 粒子散射实验得出什么结论？', options:['原子是不可分割的实心球','电子分布在带正电的球体中','原子内部大部分是空的，正电荷集中在核上','电子在固定轨道上运动'], answer:2, explanation:'绝大多数 α 粒子直接穿过 → 原子内部很空；少数大角度偏转 → 遇到了质量巨大且带正电的核。' },
  { id:6, lesson_id:4, question:'L 电子层（n=2）最多能容纳多少个电子？', options:['2','6','8','18'], answer:2, explanation:'每层最多容纳 2n² 个电子。n=2 → 2×2² = 8。' },
  { id:7, lesson_id:5, question:'按照能级顺序，3d 和 4s 哪个能量更低？', options:['3d','4s','一样','无法比较'], answer:1, explanation:'4s 的能量低于 3d，所以电子先填入 4s 再填 3d（能级交错现象）。' },
  { id:8, lesson_id:6, question:'同一族（竖列）的元素具有相似的化学性质，根本原因是什么？', options:['原子序数相近','中子数相同','最外层电子数相同','相对原子质量相近'], answer:2, explanation:'同一族元素最外层电子数相同（如 IA 族都是 1 个），决定化学性质的最外层电子结构相似。' },
  { id:9, lesson_id:7, question:'下列哪组元素之间最容易形成离子键？', options:['C 和 O','Na 和 Cl','H 和 O','N 和 N'], answer:1, explanation:'Na（金属，易失电子）+ Cl（非金属，易得电子），电负性差大，形成典型的离子键。' },
  { id:10, lesson_id:10, question:'下列化学式书写正确的是？', options:['氢氧化钠：Na(OH)','硫酸铜：CuSO₄','水：HO₂','氧化铝：AlO'], answer:1, explanation:'CuSO₄ 中 Cu 为 +2 价，SO₄ 为 -2 价，代数和为 0。其他选项均不符合化合价规则。' },
  { id:11, lesson_id:11, question:'在化合物中，氧元素的化合价通常为？', options:['+1','+2','-1','-2'], answer:3, explanation:'氧元素电负性强，在绝大多数化合物中显 -2 价（过氧化物如 H₂O₂ 中为 -1，与氟化合时例外）。' },
  { id:12, lesson_id:12, question:'配平化学方程式时，可以改变的是？', options:['化学式','元素符号','反应条件','化学计量数（系数）'], answer:3, explanation:'配平时只能改变各物质前的系数（化学计量数），绝不能改动化学式。化学式改变了，物质就变了！' },
];

module.exports = { courses, experiments, chapters, lessons, quizQuestions };

