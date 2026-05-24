import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './LessonPage.module.css';

const lessons = {
  1: {
    lesson: { id: 1, num: '1.1', title: '什么是原子？', duration: 8, type: 'article', content: '<h2>原子——物质的最小"积木"</h2><p>如果把一块铁切成两半，再切成两半，再切成两半……一直切下去，最后剩下的是什么？</p><p>古希腊哲学家德谟克利特在公元前400年就提出了一个大胆的猜想：物质不能无限分割，最终会到达一个不可再分的单元。他称其为 <strong>atomos</strong>（希腊语，意为"不可分割"），这就是"原子"一词的起源。</p><h3>原子的真实尺寸</h3><p>一个原子的直径大约只有 <strong>0.1 纳米</strong>（1 纳米 = 10⁻⁹ 米）。这意味着：把 1000 万个原子排成一行，才相当于一根头发丝的直径！</p>' },
    chapter: { id: 1, num: '01', title: '物质的微观构成' },
    course: { id: 1, num: '01', title: '化学启蒙 — 原子的世界' },
    prev: null,
    next: { id: 2, num: '1.2', title: '质子、中子与电子' },
    quizzes: [
      { id: 1, question: '原子一词来源于希腊语"atomos"，它的原意是什么？', options: ['最小的粒子','不可分割','物质的基本单元','看不见的东西'], answer: 1, explanation: 'atomos 意为"不可分割的"。德谟克利特认为物质不能无限切割。' },
      { id: 2, question: '一个原子的直径大约是多少？', options: ['0.1 毫米','0.1 微米','0.1 纳米','0.1 皮米'], answer: 2, explanation: '原子直径约 0.1 纳米（10⁻¹⁰ 米）。' }
    ]
  },
  2: {
    lesson: { id: 2, num: '1.2', title: '质子、中子与电子', duration: 10, type: 'article', content: '<h2>原子的内部结构</h2><p>原子虽然很小，但它还有更复杂的内部结构！原子是由位于中心的<strong>原子核</strong>和核外的<strong>电子</strong>构成的。</p><h3>原子核的构成</h3><p>原子核由两种粒子组成：<strong>质子</strong>和<strong>中子</strong>。质子带正电荷，中子不带电。</p><h3>电子</h3><p>电子带负电荷，围绕着原子核运动。在一个原子中，质子数等于电子数，所以原子整体呈电中性。</p>' },
    chapter: { id: 1, num: '01', title: '物质的微观构成' },
    course: { id: 1, num: '01', title: '化学启蒙 — 原子的世界' },
    prev: { id: 1, num: '1.1', title: '什么是原子？' },
    next: { id: 3, num: '1.3', title: '原子模型的历史演变' },
    quizzes: [
      { id: 3, question: '原子的中心是什么？', options: ['电子','原子核','质子','中子'], answer: 1, explanation: '原子由位于中心的原子核和核外的电子构成。' },
      { id: 4, question: '质子带什么电荷？', options: ['正电荷','负电荷','不带电','既有正又有负'], answer: 0, explanation: '质子带正电荷，电子带负电荷，中子不带电。' }
    ]
  },
  3: {
    lesson: { id: 3, num: '1.3', title: '原子模型的历史演变', duration: 12, type: 'article', content: '<h2>从道尔顿到现代模型</h2><p>人类对原子的认识经历了漫长的过程！</p><h3>道尔顿的实心球模型</h3><p>19世纪初，道尔顿提出原子是不可分割的实心球体。</p><h3>汤姆逊的葡萄干布丁模型</h3><p>发现电子后，汤姆逊认为电子像葡萄干一样嵌入带正电的原子中。</p><h3>卢瑟福的行星模型</h3><p>通过α粒子散射实验，卢瑟福发现原子有一个很小的原子核，电子绕核运动。</p><h3>现代量子力学模型</h3><p>现在我们知道，电子在原子核外的"云状"区域内运动。</p>' },
    chapter: { id: 1, num: '01', title: '物质的微观构成' },
    course: { id: 1, num: '01', title: '化学启蒙 — 原子的世界' },
    prev: { id: 2, num: '1.2', title: '质子、中子与电子' },
    next: { id: 4, num: '2.1', title: '电子层与能级' },
    quizzes: [
      { id: 5, question: '谁提出了实心球原子模型？', options: ['道尔顿','汤姆逊','卢瑟福','波尔'], answer: 0, explanation: '道尔顿认为原子是不可分割的实心球体。' },
      { id: 6, question: '卢瑟福通过什么实验发现了原子核？', options: ['阴极射线实验','α粒子散射实验','光谱实验','X射线实验'], answer: 1, explanation: '卢瑟福通过α粒子散射实验发现了原子核。' }
    ]
  },
  4: {
    lesson: { id: 4, num: '2.1', title: '电子层与能级', duration: 10, type: 'article', content: '<h2>电子的"楼层"</h2><p>电子在原子核外不是随意运动的，它们分布在不同的"楼层"上，这些楼层我们称为<strong>电子层</strong>或<strong>能层</strong>。</p><h3>电子层的命名</h3><p>电子层从内到外依次用K、L、M、N等字母表示，或者用数字1、2、3、4表示。</p><h3>能级</h3><p>同一电子层中，电子的能量还有细微的差异，我们可以进一步细分为不同的能级（s、p、d、f等）。</p>' },
    chapter: { id: 2, num: '02', title: '电子排布与周期律' },
    course: { id: 1, num: '01', title: '化学启蒙 — 原子的世界' },
    prev: { id: 3, num: '1.3', title: '原子模型的历史演变' },
    next: { id: 5, num: '2.2', title: '电子排布规则' },
    quizzes: [
      { id: 7, question: '最内层的电子层用什么表示？', options: ['L层','K层','M层','N层'], answer: 1, explanation: '最内层是K层，依次向外是L、M、N层。' },
      { id: 8, question: '下列哪个不是能级符号？', options: ['s','p','d','g'], answer: 3, explanation: '常见的能级符号是s、p、d、f。' }
    ]
  },
  5: {
    lesson: { id: 5, num: '2.2', title: '电子排布规则', duration: 12, type: 'article', content: '<h2>电子如何"住"进原子中</h2><p>电子在原子中的排布遵循一定的规则！</p><h3>泡利不相容原理</h3><p>每个轨道最多只能容纳2个电子，且它们的自旋方向相反。</p><h3>能量最低原理</h3><p>电子总是优先填充能量最低的轨道，然后再填充能量较高的轨道。</p><h3>洪特规则</h3><p>在等价轨道上，电子会尽可能分占不同的轨道，且自旋平行。</p>' },
    chapter: { id: 2, num: '02', title: '电子排布与周期律' },
    course: { id: 1, num: '01', title: '化学启蒙 — 原子的世界' },
    prev: { id: 4, num: '2.1', title: '电子层与能级' },
    next: { id: 6, num: '2.3', title: '原子结构与元素周期表' },
    quizzes: [
      { id: 9, question: '每个轨道最多能容纳几个电子？', options: ['1个','2个','8个','18个'], answer: 1, explanation: '根据泡利不相容原理，每个轨道最多能容纳2个电子。' },
      { id: 10, question: '电子总是优先填充什么轨道？', options: ['能量最高的','能量最低的','离核最远的','最外层的'], answer: 1, explanation: '根据能量最低原理，电子优先填充能量最低的轨道。' }
    ]
  },
  6: {
    lesson: { id: 6, num: '2.3', title: '原子结构与元素周期表', duration: 10, type: 'article', content: '<h2>结构决定位置</h2><p>元素在周期表中的位置是由它的原子结构决定的！</p><h3>周期数与电子层数</h3><p>元素在第几周期，它的原子核外就有几个电子层。</p><h3>族数与最外层电子数</h3><p>对于主族元素，族数等于最外层电子数。</p><h3>价电子</h3><p>最外层电子参与化学反应，我们称之为<strong>价电子</strong>，它们决定了元素的化学性质。</p>' },
    chapter: { id: 2, num: '02', title: '电子排布与周期律' },
    course: { id: 1, num: '01', title: '化学启蒙 — 原子的世界' },
    prev: { id: 5, num: '2.2', title: '电子排布规则' },
    next: { id: 7, num: '3.1', title: '离子键的形成' },
    quizzes: [
      { id: 11, question: '元素在第几周期与什么有关？', options: ['质子数','中子数','电子层数','最外层电子数'], answer: 2, explanation: '周期数等于电子层数。' },
      { id: 12, question: '主族元素的族数等于什么？', options: ['质子数','中子数','电子层数','最外层电子数'], answer: 3, explanation: '主族元素的族数等于最外层电子数。' }
    ]
  },
  7: {
    lesson: { id: 7, num: '3.1', title: '离子键的形成', duration: 10, type: 'article', content: '<h2>电子的"转移"</h2><p>当活泼金属与活泼非金属相遇时，金属原子会失去电子变成阳离子，非金属原子会得到电子变成阴离子。</p><h3>什么是离子键</h3><p>阴、阳离子之间通过静电作用形成的化学键，叫做<strong>离子键</strong>。</p><h3>离子化合物</h3><p>由离子键构成的化合物称为离子化合物，如氯化钠（NaCl）、氧化镁（MgO）等。</p>' },
    chapter: { id: 3, num: '03', title: '化学键基础' },
    course: { id: 1, num: '01', title: '化学启蒙 — 原子的世界' },
    prev: { id: 6, num: '2.3', title: '原子结构与元素周期表' },
    next: { id: 8, num: '3.2', title: '共价键与分子' },
    quizzes: [
      { id: 13, question: '金属原子通常会做什么？', options: ['得到电子','失去电子','既不得到也不失去','同时得到和失去'], answer: 1, explanation: '金属原子容易失去电子变成阳离子。' },
      { id: 14, question: '离子键是什么类型的作用？', options: ['静电作用','共价作用','金属作用','范德华力'], answer: 0, explanation: '离子键是阴、阳离子之间的静电作用。' }
    ]
  },
  8: {
    lesson: { id: 8, num: '3.2', title: '共价键与分子', duration: 12, type: 'article', content: '<h2>电子的"共享"</h2><p>当两个非金属原子相遇时，它们都想得到电子，这时它们会通过<strong>共用电子对</strong>的方式形成化学键！</p><h3>什么是共价键</h3><p>原子之间通过共用电子对形成的化学键叫做<strong>共价键</strong>。</p><h3>共价分子</h3><p>由共价键构成的分子叫做共价分子，如氢气（H₂）、水（H₂O）、二氧化碳（CO₂）等。</p>' },
    chapter: { id: 3, num: '03', title: '化学键基础' },
    course: { id: 1, num: '01', title: '化学启蒙 — 原子的世界' },
    prev: { id: 7, num: '3.1', title: '离子键的形成' },
    next: { id: 9, num: '3.3', title: '金属键与分子间作用力' },
    quizzes: [
      { id: 15, question: '共价键是通过什么形成的？', options: ['电子转移','共用电子对','电子丢失','电子吸收'], answer: 1, explanation: '共价键是通过原子之间共用电子对形成的。' },
      { id: 16, question: '下列哪个是共价分子？', options: ['NaCl','MgO','H₂O','KCl'], answer: 2, explanation: 'H₂O是由共价键构成的共价分子。' }
    ]
  },
  9: {
    lesson: { id: 9, num: '3.3', title: '金属键与分子间作用力', duration: 10, type: 'article', content: '<h2>更多的化学键类型</h2><p>除了离子键和共价键，还有其他类型的化学键和作用力！</p><h3>金属键</h3><p>金属原子容易失去电子，这些电子在金属晶体中自由移动，形成"电子海"，金属离子就沉浸在这个电子海中，这种作用力叫做<strong>金属键</strong>。</p><h3>分子间作用力</h3><p>分子之间也存在相互作用力，包括范德华力和氢键。这些力比化学键弱，但对物质的熔沸点、溶解性等性质有重要影响。</p>' },
    chapter: { id: 3, num: '03', title: '化学键基础' },
    course: { id: 1, num: '01', title: '化学启蒙 — 原子的世界' },
    prev: { id: 8, num: '3.2', title: '共价键与分子' },
    next: { id: 10, num: '4.1', title: '化学式的书写规则' },
    quizzes: [
      { id: 17, question: '金属键中的自由电子形成了什么？', options: ['电子云','电子海','电子轨道','电子对'], answer: 1, explanation: '金属中的自由电子形成"电子海"。' },
      { id: 18, question: '下列哪种力最弱？', options: ['离子键','共价键','金属键','分子间作用力'], answer: 3, explanation: '分子间作用力比化学键弱得多。' }
    ]
  },
  10: {
    lesson: { id: 10, num: '4.1', title: '化学式的书写规则', duration: 8, type: 'article', content: '<h2>用符号表示物质</h2><p>化学式是用元素符号表示物质组成的式子！</p><h3>单质化学式</h3><p>金属和稀有气体直接用元素符号表示，如Fe、Ne。大多数非金属气体是双原子分子，如H₂、O₂、N₂。</p><h3>化合物化学式</h3><p>正价元素在前，负价元素在后。原子个数用下标表示，1通常省略。</p>' },
    chapter: { id: 4, num: '04', title: '化学式入门' },
    course: { id: 1, num: '01', title: '化学启蒙 — 原子的世界' },
    prev: { id: 9, num: '3.3', title: '金属键与分子间作用力' },
    next: { id: 11, num: '4.2', title: '化合价与化学式' },
    quizzes: [
      { id: 19, question: '金属单质通常用什么表示？', options: ['元素符号','双原子分子','分子式','离子符号'], answer: 0, explanation: '金属单质直接用元素符号表示。' },
      { id: 20, question: '书写化学式时，通常什么价在前？', options: ['正价','负价','零价','任意价'], answer: 0, explanation: '书写化学式时，正价元素在前，负价元素在后。' }
    ]
  },
  11: {
    lesson: { id: 11, num: '4.2', title: '化合价与化学式', duration: 10, type: 'article', content: '<h2>化合价的"账本"</h2><p>化合价是元素在形成化合物时表现出的一种性质，我们可以用它来确定化学式！</p><h3>化合价规则</h3><p>在化合物中，各元素正负化合价的代数和为零。</p><h3>根据化合价写化学式</h3><p>1. 写出元素符号，正价在前，负价在后；2. 标出化合价；3. 化合价绝对值约简；4. 交叉放置下标。</p>' },
    chapter: { id: 4, num: '04', title: '化学式入门' },
    course: { id: 1, num: '01', title: '化学启蒙 — 原子的世界' },
    prev: { id: 10, num: '4.1', title: '化学式的书写规则' },
    next: { id: 12, num: '4.3', title: '化学方程式的初步' },
    quizzes: [
      { id: 21, question: '化合物中各元素化合价代数和为多少？', options: ['+1','-1','0','任意数'], answer: 2, explanation: '在化合物中，各元素正负化合价的代数和为零。' },
      { id: 22, question: '写化学式时化合价绝对值需要做什么？', options: ['相加','相减','约简','相乘'], answer: 2, explanation: '化合价绝对值需要约简后交叉放置下标。' }
    ]
  },
  12: {
    lesson: { id: 12, num: '4.3', title: '化学方程式的初步', duration: 12, type: 'article', content: '<h2>用式子表示化学反应</h2><p>化学方程式是用化学式表示化学反应的式子！</p><h3>化学方程式的意义</h3><p>1. 表示什么物质参与反应，生成什么物质；2. 表示各物质的质量比；3. 表示各物质的粒子个数比。</p><h3>书写步骤</h3><p>1. 写：写出反应物和生成物的化学式；2. 配：配平；3. 注：注明反应条件和生成物状态。</p>' },
    chapter: { id: 4, num: '04', title: '化学式入门' },
    course: { id: 1, num: '01', title: '化学启蒙 — 原子的世界' },
    prev: { id: 11, num: '4.2', title: '化合价与化学式' },
    next: null,
    quizzes: [
      { id: 23, question: '化学方程式第一步做什么？', options: ['配平','注明条件','写化学式','计算质量'], answer: 2, explanation: '书写化学方程式第一步是写出反应物和生成物的化学式。' },
      { id: 24, question: '配平的依据是什么？', options: ['质量守恒定律','能量守恒定律','电荷守恒','化合价守恒'], answer: 0, explanation: '配平的依据是质量守恒定律，即反应前后原子种类和个数不变。' }
    ]
  },
  13: {
    lesson: { id: 13, num: '1.1', title: '元素周期表的发现史', duration: 10, type: 'article', content: '<h2>门捷列夫与元素周期表</h2><p>1869年，俄国化学家门捷列夫在总结前人工作的基础上，发现了元素周期律，并编制了第一张元素周期表。</p><p>门捷列夫的伟大之处在于，他不仅把已知的63种元素按照原子量排列起来，还大胆地为尚未发现的元素留下了空位，并预言了它们的性质。</p><h3>周期表的演变</h3><p>随着科学的发展，元素周期表也在不断完善。从最初的短式周期表，到现在的长式周期表，已经包含了118种元素。</p>' },
    chapter: { id: 5, num: '01', title: '元素周期表的结构' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: null,
    next: { id: 14, num: '1.2', title: '周期与族的概念' },
    quizzes: [
      { id: 3, question: '谁被称为"元素周期表之父"？', options: ['拉瓦锡','道尔顿','门捷列夫','玻尔'], answer: 2, explanation: '门捷列夫在1869年发表了第一张元素周期表。' },
      { id: 4, question: '门捷列夫发表第一张周期表时有多少种已知元素？', options: ['36种','48种','63种','92种'], answer: 2, explanation: '1869年已知63种元素，门捷列夫为未知元素留下了空位。' }
    ]
  },
  14: {
    lesson: { id: 14, num: '1.2', title: '周期与族的概念', duration: 12, type: 'article', content: '<h2>周期与族</h2><p>元素周期表中的横行称为<strong>周期</strong>，纵行称为<strong>族</strong>。</p><h3>周期</h3><p>元素周期表共有7个周期。同一周期的元素，电子层数相同，从左到右原子序数递增，金属性逐渐减弱，非金属性逐渐增强。</p><h3>族</h3><p>元素周期表共有18个族，分为主族（A族）和副族（B族）。同一族的元素，最外层电子数相同，化学性质相似。</p>' },
    chapter: { id: 5, num: '01', title: '元素周期表的结构' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: { id: 13, num: '1.1', title: '元素周期表的发现史' },
    next: { id: 15, num: '1.3', title: '元素周期表的分区' },
    quizzes: [
      { id: 5, question: '元素周期表中有多少个周期？', options: ['5个','6个','7个','8个'], answer: 2, explanation: '目前元素周期表有7个周期。' },
      { id: 6, question: '同一族元素的什么性质相同？', options: ['电子层数','最外层电子数','原子半径','化合价'], answer: 1, explanation: '同一族元素最外层电子数相同，因此化学性质相似。' }
    ]
  },
  15: {
    lesson: { id: 15, num: '1.3', title: '元素周期表的分区', duration: 10, type: 'article', content: '<h2>元素周期表的分区</h2><p>根据元素的价电子构型，元素周期表可以分为几个区域：s区、p区、d区、f区。</p><h3>s区元素</h3><p>包括第1、2主族元素，最外层只有s电子，都是活泼金属。</p><h3>p区元素</h3><p>包括第13-18族元素，最外层有s和p电子，包含金属、非金属和稀有气体。</p><h3>d区和f区元素</h3><p>d区是过渡金属，f区是镧系和锕系元素，它们的电子填充在d轨道或f轨道。</p>' },
    chapter: { id: 5, num: '01', title: '元素周期表的结构' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: { id: 14, num: '1.2', title: '周期与族的概念' },
    next: { id: 16, num: '2.1', title: '原子半径的变化规律' },
    quizzes: [
      { id: 7, question: 's区元素包括哪些族？', options: ['第1-2族','第3-12族','第13-18族','镧系和锕系'], answer: 0, explanation: 's区包括第1、2主族元素。' },
      { id: 8, question: '过渡金属属于哪个区？', options: ['s区','p区','d区','f区'], answer: 2, explanation: '过渡金属属于d区元素。' }
    ]
  },
  16: {
    lesson: { id: 16, num: '2.1', title: '原子半径的变化规律', duration: 10, type: 'article', content: '<h2>原子半径的周期性变化</h2><p>原子半径是指原子的大小，它随着原子序数的增加呈现周期性变化。</p><h3>同周期变化规律</h3><p>在同一周期中，从左到右，原子半径逐渐减小。这是因为核电荷数增加，对电子的吸引力增强，使电子云收缩。</p><h3>同主族变化规律</h3><p>在同一主族中，从上到下，原子半径逐渐增大。这是因为电子层数增加，电子云扩大。</p>' },
    chapter: { id: 6, num: '02', title: '元素周期律' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: { id: 15, num: '1.3', title: '元素周期表的分区' },
    next: { id: 17, num: '2.2', title: '电离能与电负性' },
    quizzes: [
      { id: 9, question: '同周期从左到右原子半径如何变化？', options: ['增大','减小','不变','先增后减'], answer: 1, explanation: '同周期从左到右，核电荷数增加，原子半径减小。' },
      { id: 10, question: '同主族从上到下原子半径如何变化？', options: ['增大','减小','不变','先减后增'], answer: 0, explanation: '同主族从上到下，电子层数增加，原子半径增大。' }
    ]
  },
  17: {
    lesson: { id: 17, num: '2.2', title: '电离能与电负性', duration: 12, type: 'article', content: '<h2>电离能</h2><p>电离能是指气态原子失去一个电子所需的能量。电离能越大，原子越难失去电子，金属性越弱。</p><h3>电离能的变化规律</h3><p>同周期从左到右，电离能逐渐增大；同主族从上到下，电离能逐渐减小。</p><h2>电负性</h2><p>电负性是指原子在分子中吸引电子的能力。电负性越大，原子吸引电子的能力越强。</p><h3>电负性的变化规律</h3><p>同周期从左到右，电负性逐渐增大；同主族从上到下，电负性逐渐减小。氟的电负性最大。</p>' },
    chapter: { id: 6, num: '02', title: '元素周期律' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: { id: 16, num: '2.1', title: '原子半径的变化规律' },
    next: { id: 18, num: '2.3', title: '化合价的周期性' },
    quizzes: [
      { id: 11, question: '同周期从左到右电离能如何变化？', options: ['增大','减小','不变','无规律'], answer: 0, explanation: '同周期从左到右，原子半径减小，电离能增大。' },
      { id: 12, question: '下列元素中电负性最大的是？', options: ['钠','氯','氟','氧'], answer: 2, explanation: '氟是电负性最大的元素。' }
    ]
  },
  18: {
    lesson: { id: 18, num: '2.3', title: '化合价的周期性', duration: 10, type: 'article', content: '<h2>化合价的周期性变化</h2><p>元素的化合价也呈现周期性变化规律。</p><h3>主族元素的化合价</h3><p>主族元素的最高正化合价等于其族序数（氧、氟除外）。负化合价等于8减去族序数。</p><h3>过渡元素的化合价</h3><p>过渡元素具有多种化合价，这是因为它们的d电子也可以参与成键。</p>' },
    chapter: { id: 6, num: '02', title: '元素周期律' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: { id: 17, num: '2.2', title: '电离能与电负性' },
    next: { id: 19, num: '3.1', title: '金属的通性' },
    quizzes: [
      { id: 13, question: '第3主族元素的最高正化合价是多少？', options: ['+1','+2','+3','+4'], answer: 2, explanation: '主族元素的最高正化合价等于其族序数。' },
      { id: 14, question: '第6主族元素的负化合价是多少？', options: ['-1','-2','-3','-4'], answer: 1, explanation: '负化合价等于8减去族序数，即8-6=-2。' }
    ]
  },
  19: {
    lesson: { id: 19, num: '3.1', title: '金属的通性', duration: 10, type: 'article', content: '<h2>金属的物理性质</h2><p>金属具有许多共同的物理性质：</p><ul><li><strong>金属光泽</strong>：大多数金属具有银白色光泽</li><li><strong>导电性</strong>：金属是电的良导体</li><li><strong>导热性</strong>：金属是热的良导体</li><li><strong>延展性</strong>：金属可以被拉伸成丝或压成薄片</li></ul><h3>金属的化学性质</h3><p>金属容易失去电子，表现出还原性。活泼金属能与酸反应置换出氢气。</p>' },
    chapter: { id: 7, num: '03', title: '金属与非金属' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: { id: 18, num: '2.3', title: '化合价的周期性' },
    next: { id: 20, num: '3.2', title: '非金属的特性' },
    quizzes: [
      { id: 15, question: '金属不具有下列哪种性质？', options: ['导电性','导热性','延展性','绝缘性'], answer: 3, explanation: '金属是导体，不是绝缘体。' },
      { id: 16, question: '金属在化学反应中通常表现为什么性？', options: ['氧化性','还原性','酸性','碱性'], answer: 1, explanation: '金属容易失去电子，表现出还原性。' }
    ]
  },
  20: {
    lesson: { id: 20, num: '3.2', title: '非金属的特性', duration: 12, type: 'article', content: '<h2>非金属的物理性质</h2><p>非金属的物理性质差异较大：</p><ul><li>状态：有气体（如氧气）、液体（如溴）、固体（如硫）</li><li>颜色：多种多样</li><li>导电性：大多是绝缘体，少数是半导体</li><li>导热性：较差</li></ul><h3>非金属的化学性质</h3><p>非金属容易得到电子，表现出氧化性。许多非金属能与金属反应形成化合物。</p>' },
    chapter: { id: 7, num: '03', title: '金属与非金属' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: { id: 19, num: '3.1', title: '金属的通性' },
    next: { id: 21, num: '3.3', title: '金属活动性顺序' },
    quizzes: [
      { id: 17, question: '下列哪种物质是液体非金属？', options: ['氧气','氯气','溴','碘'], answer: 2, explanation: '溴是唯一的液体非金属。' },
      { id: 18, question: '非金属在化学反应中通常表现为什么性？', options: ['氧化性','还原性','酸性','碱性'], answer: 0, explanation: '非金属容易得到电子，表现出氧化性。' }
    ]
  },
  21: {
    lesson: { id: 21, num: '3.3', title: '金属活动性顺序', duration: 10, type: 'article', content: '<h2>金属活动性顺序表</h2><p>金属活动性顺序是指金属在水溶液中失去电子能力的顺序：</p><p><strong>K Ca Na Mg Al Zn Fe Sn Pb (H) Cu Hg Ag Pt Au</strong></p><h3>活动性顺序的应用</h3><ul><li>排在前面的金属能置换出排在后面的金属</li><li>排在氢前面的金属能与酸反应置换出氢气</li><li>排在氢后面的金属不能与酸反应</li></ul>' },
    chapter: { id: 7, num: '03', title: '金属与非金属' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: { id: 20, num: '3.2', title: '非金属的特性' },
    next: { id: 22, num: '4.1', title: '酸的定义与性质' },
    quizzes: [
      { id: 19, question: '下列金属中最活泼的是？', options: ['铁','铜','钠','铝'], answer: 2, explanation: '钠在金属活动性顺序中排在很前面。' },
      { id: 20, question: '下列金属中不能与稀盐酸反应的是？', options: ['镁','锌','铜','铁'], answer: 2, explanation: '铜排在氢后面，不能与酸反应。' }
    ]
  },
  22: {
    lesson: { id: 22, num: '4.1', title: '酸的定义与性质', duration: 10, type: 'article', content: '<h2>酸的定义</h2><p>酸是在水溶液中能电离出氢离子（H⁺）的化合物。</p><h3>酸的通性</h3><ul><li>能使紫色石蕊试液变红</li><li>能与活泼金属反应生成盐和氢气</li><li>能与碱反应生成盐和水（中和反应）</li><li>能与某些盐反应生成新酸和新盐</li></ul><h3>常见的酸</h3><p>盐酸（HCl）、硫酸（H₂SO₄）、硝酸（HNO₃）、碳酸（H₂CO₃）等。</p>' },
    chapter: { id: 8, num: '04', title: '酸碱盐基础' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: { id: 21, num: '3.3', title: '金属活动性顺序' },
    next: { id: 23, num: '4.2', title: '碱的定义与性质' },
    quizzes: [
      { id: 21, question: '酸在水溶液中能电离出什么离子？', options: ['OH⁻','H⁺','Na⁺','Cl⁻'], answer: 1, explanation: '酸能电离出氢离子（H⁺）。' },
      { id: 22, question: '酸能使紫色石蕊试液变成什么颜色？', options: ['蓝色','红色','绿色','黄色'], answer: 1, explanation: '酸能使紫色石蕊试液变红。' }
    ]
  },
  23: {
    lesson: { id: 23, num: '4.2', title: '碱的定义与性质', duration: 10, type: 'article', content: '<h2>碱的定义</h2><p>碱是在水溶液中能电离出氢氧根离子（OH⁻）的化合物。</p><h3>碱的通性</h3><ul><li>能使紫色石蕊试液变蓝</li><li>能使无色酚酞试液变红</li><li>能与酸反应生成盐和水（中和反应）</li><li>能与某些盐反应生成新碱和新盐</li></ul><h3>常见的碱</h3><p>氢氧化钠（NaOH）、氢氧化钙（Ca(OH)₂）、氢氧化钾（KOH）等。</p>' },
    chapter: { id: 8, num: '04', title: '酸碱盐基础' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: { id: 22, num: '4.1', title: '酸的定义与性质' },
    next: { id: 24, num: '4.3', title: '盐的分类与命名' },
    quizzes: [
      { id: 23, question: '碱在水溶液中能电离出什么离子？', options: ['OH⁻','H⁺','Na⁺','Cl⁻'], answer: 0, explanation: '碱能电离出氢氧根离子（OH⁻）。' },
      { id: 24, question: '碱能使无色酚酞试液变成什么颜色？', options: ['蓝色','红色','绿色','黄色'], answer: 1, explanation: '碱能使无色酚酞试液变红。' }
    ]
  },
  24: {
    lesson: { id: 24, num: '4.3', title: '盐的分类与命名', duration: 12, type: 'article', content: '<h2>盐的定义</h2><p>盐是由金属离子（或铵根离子）和酸根离子组成的化合物。</p><h3>盐的分类</h3><ul><li><strong>正盐</strong>：由金属离子和酸根离子组成，如NaCl</li><li><strong>酸式盐</strong>：含有可电离的H⁺，如NaHCO₃</li><li><strong>碱式盐</strong>：含有OH⁻，如Cu₂(OH)₂CO₃</li></ul><h3>盐的命名</h3><p>一般是"某化某"或"某酸某"，如氯化钠、硫酸铜。</p>' },
    chapter: { id: 8, num: '04', title: '酸碱盐基础' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: { id: 23, num: '4.2', title: '碱的定义与性质' },
    next: { id: 25, num: '4.4', title: '酸碱中和反应' },
    quizzes: [
      { id: 25, question: '下列物质中属于酸式盐的是？', options: ['NaCl','NaHCO₃','NaOH','H₂SO₄'], answer: 1, explanation: 'NaHCO₃是酸式盐，含有可电离的H⁺。' },
      { id: 26, question: '盐是由什么离子组成的？', options: ['H⁺和OH⁻','金属离子和酸根离子','只有金属离子','只有酸根离子'], answer: 1, explanation: '盐由金属离子（或铵根离子）和酸根离子组成。' }
    ]
  },
  25: {
    lesson: { id: 25, num: '4.4', title: '酸碱中和反应', duration: 10, type: 'article', content: '<h2>中和反应的定义</h2><p>酸和碱相互作用生成盐和水的反应叫做中和反应。</p><h3>中和反应的实质</h3><p>H⁺ + OH⁻ → H₂O</p><h3>中和反应的应用</h3><ul><li>改良酸性土壤</li><li>处理工厂废水</li><li>医药上中和胃酸</li><li>日常生活中如用肥皂中和蚊虫叮咬的酸性物质</li></ul>' },
    chapter: { id: 8, num: '04', title: '酸碱盐基础' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: { id: 24, num: '4.3', title: '盐的分类与命名' },
    next: { id: 26, num: '5.1', title: '氧化物的分类' },
    quizzes: [
      { id: 27, question: '中和反应的实质是什么？', options: ['H⁺ + OH⁻ → H₂O','酸+碱→盐+水','氧化还原反应','置换反应'], answer: 0, explanation: '中和反应的实质是H⁺和OH⁻结合生成水。' },
      { id: 28, question: '下列哪个不是中和反应的应用？', options: ['改良土壤','处理废水','金属冶炼','中和胃酸'], answer: 2, explanation: '金属冶炼不是中和反应的应用。' }
    ]
  },
  26: {
    lesson: { id: 26, num: '5.1', title: '氧化物的分类', duration: 8, type: 'article', content: '<h2>氧化物的定义</h2><p>氧化物是由两种元素组成，其中一种是氧元素的化合物。</p><h3>氧化物的分类</h3><ul><li><strong>酸性氧化物</strong>：能与碱反应生成盐和水，如CO₂、SO₂</li><li><strong>碱性氧化物</strong>：能与酸反应生成盐和水，如CaO、Fe₂O₃</li><li><strong>两性氧化物</strong>：既能与酸反应，又能与碱反应，如Al₂O₃</li><li><strong>不成盐氧化物</strong>：不能与酸或碱反应生成盐，如CO、NO</li></ul>' },
    chapter: { id: 9, num: '05', title: '常见化合物' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: { id: 25, num: '4.4', title: '酸碱中和反应' },
    next: { id: 27, num: '5.2', title: '碳酸盐与硫酸盐' },
    quizzes: [
      { id: 29, question: '下列氧化物中属于酸性氧化物的是？', options: ['CaO','CO₂','CO','Al₂O₃'], answer: 1, explanation: 'CO₂是酸性氧化物，能与碱反应。' },
      { id: 30, question: 'Al₂O₃属于哪种氧化物？', options: ['酸性','碱性','两性','不成盐'], answer: 2, explanation: 'Al₂O₃是两性氧化物。' }
    ]
  },
  27: {
    lesson: { id: 27, num: '5.2', title: '碳酸盐与硫酸盐', duration: 10, type: 'article', content: '<h2>碳酸盐</h2><p>碳酸盐是含有碳酸根离子（CO₃²⁻）的盐。</p><h3>常见的碳酸盐</h3><ul><li>碳酸钙（CaCO₃）：大理石、石灰石的主要成分</li><li>碳酸钠（Na₂CO₃）：纯碱、苏打</li><li>碳酸氢钠（NaHCO₃）：小苏打</li></ul><h2>硫酸盐</h2><p>硫酸盐是含有硫酸根离子（SO₄²⁻）的盐。</p><h3>常见的硫酸盐</h3><ul><li>硫酸钙（CaSO₄）：石膏的主要成分</li><li>硫酸铜（CuSO₄）：胆矾</li><li>硫酸钠（Na₂SO₄）：芒硝</li></ul>' },
    chapter: { id: 9, num: '05', title: '常见化合物' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: { id: 26, num: '5.1', title: '氧化物的分类' },
    next: { id: 28, num: '5.3', title: '硝酸盐与氯化物' },
    quizzes: [
      { id: 31, question: '大理石的主要成分是什么？', options: ['NaCl','CaCO₃','CaSO₄','Na₂CO₃'], answer: 1, explanation: '大理石的主要成分是碳酸钙。' },
      { id: 32, question: '小苏打的化学式是什么？', options: ['Na₂CO₃','NaHCO₃','NaOH','NaCl'], answer: 1, explanation: '小苏打是碳酸氢钠，化学式为NaHCO₃。' }
    ]
  },
  28: {
    lesson: { id: 28, num: '5.3', title: '硝酸盐与氯化物', duration: 10, type: 'article', content: '<h2>硝酸盐</h2><p>硝酸盐是含有硝酸根离子（NO₃⁻）的盐。</p><h3>硝酸盐的性质</h3><ul><li>大多数硝酸盐都易溶于水</li><li>硝酸盐受热易分解</li><li>硝酸盐是强氧化剂</li></ul><h2>氯化物</h2><p>氯化物是含有氯离子（Cl⁻）的盐。</p><h3>常见的氯化物</h3><ul><li>氯化钠（NaCl）：食盐的主要成分</li><li>氯化氢（HCl）：盐酸</li><li>氯化铁（FeCl₃）、氯化亚铁（FeCl₂）</li></ul>' },
    chapter: { id: 9, num: '05', title: '常见化合物' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: { id: 27, num: '5.2', title: '碳酸盐与硫酸盐' },
    next: { id: 29, num: '5.4', title: '化合物的溶解性' },
    quizzes: [
      { id: 33, question: '食盐的主要成分是什么？', options: ['KCl','NaCl','CaCl₂','MgCl₂'], answer: 1, explanation: '食盐的主要成分是氯化钠。' },
      { id: 34, question: '大多数硝酸盐的溶解性如何？', options: ['难溶于水','易溶于水','微溶于水','不溶于水'], answer: 1, explanation: '大多数硝酸盐都易溶于水。' }
    ]
  },
  29: {
    lesson: { id: 29, num: '5.4', title: '化合物的溶解性', duration: 12, type: 'article', content: '<h2>溶解性规律</h2><p>了解化合物的溶解性对于判断化学反应能否发生非常重要。</p><h3>常见的溶解性规律</h3><ul><li>钾盐、钠盐、铵盐、硝酸盐都易溶于水</li><li>氯化物中除银、亚汞外都易溶于水</li><li>硫酸盐中除钡、铅、钙外都易溶于水</li><li>碳酸盐、磷酸盐大多难溶于水（钾、钠、铵除外）</li></ul><h3>溶解性口诀</h3><p>钾钠铵盐硝酸盐，全部溶于水中间；<br>氯化物不溶银亚汞，硫酸盐不溶钡和铅；<br>碳酸盐溶钾钠铵，其余都是沉水间。</p>' },
    chapter: { id: 9, num: '05', title: '常见化合物' },
    course: { id: 2, num: '02', title: '元素与化合物 — 周期表的秘密' },
    prev: { id: 28, num: '5.3', title: '硝酸盐与氯化物' },
    next: null,
    quizzes: [
      { id: 35, question: '下列哪种盐难溶于水？', options: ['NaCl','KNO₃','AgCl','NH₄Cl'], answer: 2, explanation: '氯化银难溶于水。' },
      { id: 36, question: '下列哪种硫酸盐难溶于水？', options: ['Na₂SO₄','K₂SO₄','BaSO₄','(NH₄)₂SO₄'], answer: 2, explanation: '硫酸钡难溶于水。' }
    ]
  }
};

export default function LessonPage() {
  const { id } = useParams();
  const data = lessons[Number(id)] || lessons[1];
  const [quizState, setQuizState] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    setQuizState({});
    setQuizResult(null);
  }, [id]);

  const { lesson, chapter, course, prev, next, quizzes } = data;
  const hasQuizzes = quizzes && quizzes.length > 0;
  const allAnswered = quizzes.length > 0 && quizzes.every((_,i) => quizState[i] !== undefined);

  const handleQuizSelect = (qIdx, optIdx) => {
    if (quizResult) return;
    setQuizState(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const submitQuiz = () => {
    const correct = quizzes.filter((q,i) => quizState[i] === q.answer).length;
    setQuizResult({ total: quizzes.length, correct });
  };

  return (
    <div className={styles.page}>
      <nav className={styles.topBar}>
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
            <Link to={course?`/courses/${course.id}`:'/courses'} className={styles.backLink}>← 课程</Link>
            <span className={styles.breadcrumb}>
              {course?.title && <span>{course.title}</span>}
              {chapter?.title && <span> / {chapter.title}</span>}
            </span>
          </div>
          <div style={{fontSize:'.78rem',color:'var(--text3)'}}>
            {chapter?.title} · {lesson.num}
          </div>
        </div>
      </nav>

      <main className="container" style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:'2rem',alignItems:'start'}}>
        <article className={styles.article}>
          <div className={styles.lessonHeader}>
            <div className={styles.lessonNum}>{lesson.num}</div>
            <h1 className={styles.lessonTitle}>{lesson.title}</h1>
            <div className={styles.lessonMeta}>
              <span>⏱ {lesson.duration} 分钟</span>
              <span>📄 {lesson.type==='quiz'?'互动测验':'图文文章'}</span>
            </div>
          </div>

          <div className={styles.content} dangerouslySetInnerHTML={{ __html: lesson.content }} />

          {hasQuizzes && (
            <section className={styles.quizSection}>
              <h2 className={styles.quizTitle}>📝 课堂小测</h2>
              <p className={styles.quizSub}>检验一下你的学习成果吧！</p>

              <div className={styles.quizList}>
                {quizzes.map((q, qi) => {
                  const selected = quizState[qi];
                  const result = quizResult ? (selected === q.answer ? 'correct':'wrong') : null;
                  return (
                    <div key={q.id} className={`${styles.quizCard} ${result ? styles[`quiz-${result}`] : ''}`}>
                      <div className={styles.quizQ}>
                        <span className={styles.quizIdx}>{qi+1}</span>
                        {q.question}
                      </div>
                      <div className={styles.quizOpts}>
                        {q.options?.map((opt, oi) => {
                          let cls = styles.optBtn;
                          if (quizResult) {
                            if (oi === q.answer) cls += ` ${styles.optCorrect}`;
                            else if (oi === selected && oi !== q.answer) cls += ` ${styles.optWrong}`;
                          } else if (selected === oi) {
                            cls += ` ${styles.optSelected}`;
                          }
                          return (
                            <button key={oi} className={cls} onClick={() => handleQuizSelect(qi, oi)}>
                              {String.fromCharCode(65+oi)}. {opt}
                            </button>
                          );
                        })}
                      </div>
                      {quizResult && q.explanation && (
                        <div className={styles.quizExplain}>💡 {q.explanation}</div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!quizResult && (
                <button className={styles.submitBtn} disabled={!allAnswered} onClick={submitQuiz}>
                  {allAnswered ? '提交答案' : `还差 ${quizzes.length - Object.keys(quizState).length} 题`}
                </button>
              )}

              {quizResult && (
                <div className={styles.quizResult}>
                  <div className={styles.resultScore}>{quizResult.correct} / {quizResult.total}</div>
                  <p className={styles.resultText}>
                    {quizResult.correct === quizResult.total
                      ? '🎉 满分！你掌握得很好！'
                      : quizResult.correct >= quizResult.total * 0.6
                        ? '👍 还不错，看看错题解析吧！'
                        : '💪 还需要再复习一下这一课哦！'
                    }
                  </p>
                </div>
              )}
            </section>
          )}

          <div className={styles.navBtns}>
            {prev ? <Link to={`/courses/lesson/${prev.id}`} className={styles.navBtn}>← {prev.num} {prev.title}</Link> : <span></span>}
            {next ? <Link to={`/courses/lesson/${next.id}`} className={`${styles.navBtn} ${styles.navNext}`}>下一篇：{next.title} →</Link> : course && <Link to={`/courses/${course.id}`} className={`${styles.navBtn} ${styles.navNext}`}>← 回到课程大纲</Link>}
          </div>
        </article>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>当前章节</h3>
            <div className={styles.sidebarChapter}>{chapter?.num} {chapter?.title}</div>
            <Link to={course?`/courses/${course.id}`:'/courses'} className={styles.sidebarLink}>查看全部大纲 →</Link>
          </div>

          {course && (
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>课程信息</h3>
              <div className={styles.sidebarInfo}>
                <div><span>课程</span><span>{course.title}</span></div>
                <div><span>编号</span><span>{course.num}</span></div>
                <div><span>类型</span><span>{lesson.type==='quiz'?'测验':lesson.type==='video'?'视频':'文章'}</span></div>
                <div><span>时长</span><span>{lesson.duration} 分钟</span></div>
              </div>
            </div>
          )}

          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>💡 学习提示</h3>
            <ul className={styles.tips}>
              <li>读完内容再做小测效果更好</li>
              <li>不确定的题目可以先标记</li>
              <li>错了的题有详细解析，别错过</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
