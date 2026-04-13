/* =====================================================
   三国人格鉴定 - 核心逻辑
   ===================================================== */

// ========================
// 题目数据（20 题，每题 6 选项）
// ========================
const questions = [
  {
    id: 1,
    text: '老板在会上说"大家畅所欲言"，你会——',
    options: [
      { text: '第一个发言，条理清晰，方案直接摆出来', type: 'caocao' },
      { text: '先看看风向，等大部分人表态后再附和', type: 'liubei' },
      { text: '低头假装记笔记，心里想的是晚饭吃什么', type: 'liushan' },
      { text: '心里有想法但不说，会后单独找领导聊', type: 'simayi' },
      { text: '快速记录要点，等别人说完再补充', type: 'zhugeliang' },
      { text: '担心说错话，全程保持沉默', type: 'diaochan' }
    ]
  },
  {
    id: 2,
    text: '同事抢了你的功劳，你会——',
    options: [
      { text: '当面撕破脸，证据甩桌上，谁也别想跑', type: 'guanyu' },
      { text: '算了，多一事不如少一事', type: 'liushan' },
      { text: '表面不动声色，暗中收集证据，关键时刻一击致命', type: 'simayi' },
      { text: '找其他同事吐槽，争取舆论支持后再行动', type: 'lvbu' },
      { text: '直接找上级说明情况，要求公正处理', type: 'caocao' },
      { text: '委屈但不敢说，只能自己消化情绪', type: 'zhouyu' }
    ]
  },
  {
    id: 3,
    text: '周末到了，你的真实状态是——',
    options: [
      { text: '躺在床上刷手机到天黑，外卖都懒得点', type: 'liushan' },
      { text: '约朋友吃饭喝酒，社交就是充电', type: 'liubei' },
      { text: '虽然人在休息，但脑子里还在复盘工作', type: 'zhugeliang' },
      { text: '制定了精确到小时的计划，但一条都没执行', type: 'yuanshao' },
      { text: '趁机学习新技能，自我提升不能停', type: 'guanyu' },
      { text: '想出门又懒得动，在纠结中度过一天', type: 'lvbu' }
    ]
  },
  {
    id: 4,
    text: '项目搞砸了，你的第一反应是——',
    options: [
      { text: '先甩锅，保住自己再说', type: 'simayi' },
      { text: '主动认错，但私下想办法补救', type: 'liubei' },
      { text: '复盘分析，下次一定做得更好', type: 'zhugeliang' },
      { text: '搞砸就搞砸呗，天又塌不下来', type: 'liushan' },
      { text: '愤怒地质问团队，为什么没做好', type: 'caocao' },
      { text: '陷入自责，怀疑自己的能力', type: 'lvbu' }
    ]
  },
  {
    id: 5,
    text: '想涨薪了，你会——',
    options: [
      { text: '直接找老板谈，数据和成果摆上去', type: 'caocao' },
      { text: '先请老板吃顿饭，铺垫铺垫再说', type: 'liubei' },
      { text: '算了，大不了跳槽', type: 'lvbu' },
      { text: '准备了三个月的 PPT，但到了门口又退缩了', type: 'yuanshao' },
      { text: '默默等待老板主动发现我的价值', type: 'zhugeliang' },
      { text: '想提又不敢提，怕被拒绝后尴尬', type: 'diaochan' }
    ]
  },
  {
    id: 6,
    text: '朋友找你借钱，你会——',
    options: [
      { text: '二话不说直接转，朋友比钱重要', type: 'liubei' },
      { text: '先评估对方还款能力，再决定借不借', type: 'caocao' },
      { text: '假装没看到消息，过两天说"最近也紧"', type: 'simayi' },
      { text: '想借又怕不还，在"借"和"不借"之间内耗三天', type: 'diaochan' },
      { text: '借可以，但要写借条按规矩来', type: 'guanyu' },
      { text: '自己都没多少钱，怎么借', type: 'liushan' }
    ]
  },
  {
    id: 7,
    text: '你在团队中的角色通常是——',
    options: [
      { text: '拍板做决定的那个人', type: 'caocao' },
      { text: '把大家团结在一起的粘合剂', type: 'zhouyu' },
      { text: '默默干活但不太说话的那个人', type: 'guanyu' },
      { text: '躺在工位上等下班的那个人', type: 'diaochan' },
      { text: '制定计划分配任务的那个人', type: 'zhugeliang' },
      { text: '经常提出创新想法的那个人', type: 'yuanshao' }
    ]
  },
  {
    id: 8,
    text: '遇到不公平的事，你会——',
    options: [
      { text: '站出来正面硬刚，哪怕得罪人', type: 'guanyu' },
      { text: '拉拢一帮人一起抗争，人多力量大', type: 'liubei' },
      { text: '暗中记下这笔账，等时机到了再清算', type: 'simayi' },
      { text: '算了算了，世界本来就不公平', type: 'liushan' },
      { text: '收集证据，通过正规渠道投诉', type: 'caocao' },
      { text: '气得睡不着，但又无能为力', type: 'diaochan' }
    ]
  },
  {
    id: 9,
    text: '你对"努力就会成功"这句话的态度是——',
    options: [
      { text: '深信不疑，我命由我不由天', type: 'zhugeliang' },
      { text: '三分天注定，七分靠打拼，剩下九十分靠关系', type: 'liubei' },
      { text: '努力不一定会成功，但不努力一定会很舒服', type: 'liushan' },
      { text: '努力是基本功，关键得等风来', type: 'simayi' },
      { text: '成功需要努力，更需要正确的方向', type: 'guanyu' },
      { text: '为什么努力了还是不如别人，很焦虑', type: 'zhouyu' }
    ]
  },
  {
    id: 10,
    text: '做决策时，你更倾向于——',
    options: [
      { text: '相信直觉，快速做出决定', type: 'caocao' },
      { text: '听取多方意见，综合考虑', type: 'liubei' },
      { text: '能拖就拖，不到最后不做决定', type: 'liushan' },
      { text: '收集所有信息，分析利弊再决定', type: 'zhugeliang' },
      { text: '参考过往经验，选择稳妥方案', type: 'simayi' },
      { text: '做了决定又反复修改，难以定夺', type: 'yuanshao' }
    ]
  },
  {
    id: 11,
    text: '你最受不了的同事类型是——',
    options: [
      { text: '啥都不会但特别会拍马屁的', type: 'guanyu' },
      { text: '能力一般但天天加班表演努力的', type: 'liushan' },
      { text: '表面兄弟背后捅刀的', type: 'liubei' },
      { text: '说了半天也没说清楚到底要干嘛的', type: 'caocao' },
      { text: '总是质疑你的方案，指手画脚的', type: 'yuanshao' },
      { text: '抢功劳第一名，甩锅也第一名的', type: 'lvbu' }
    ]
  },
  {
    id: 12,
    text: '面对一个高风险高回报的机会，你会——',
    options: [
      { text: '干了，富贵险中求', type: 'caocao' },
      { text: '先找几个靠谱的人一起分担风险', type: 'liubei' },
      { text: '分析利弊，制定 plan A/B/C，准备万全再动手', type: 'zhugeliang' },
      { text: '风险太高，还是稳稳当当的好', type: 'liushan' },
      { text: '先观望一下，看看别人怎么做', type: 'simayi' },
      { text: '很心动但不敢行动，怕失败', type: 'zhouyu' }
    ]
  },
  {
    id: 13,
    text: '你在社交中的状态更像——',
    options: [
      { text: '社交达人，三句话就能跟人称兄道弟', type: 'liubei' },
      { text: '有选择地社交，只跟能聊到一起的人深交', type: 'guanyu' },
      { text: '能不社交就不社交，微信消息已读不回是常态', type: 'liushan' },
      { text: '不主动社交，但别人找我我也能应付', type: 'diaochan' },
      { text: '带着目的社交，认识有用的人', type: 'lvbu' },
      { text: '在人群中感到不自在，但又怕被孤立', type: 'zhouyu' }
    ]
  },
  {
    id: 14,
    text: '你觉得自己最大的问题是——',
    options: [
      { text: '太冲动，经常事后后悔', type: 'lvbu' },
      { text: '太在意别人的看法', type: 'diaochan' },
      { text: '想太多，做得太少', type: 'yuanshao' },
      { text: '根本不想努力，但又焦虑不努力的后果', type: 'zhouyu' },
      { text: '太强势，容易给人压力', type: 'caocao' },
      { text: '太容易相信别人，容易上当', type: 'liubei' }
    ]
  },
  {
    id: 15,
    text: '面对压力，你的应对方式是——',
    options: [
      { text: '迎难而上，把压力转化为动力', type: 'caocao' },
      { text: '找朋友倾诉，寻求情感支持', type: 'liubei' },
      { text: '逃避现实，先放松再说', type: 'liushan' },
      { text: '制定详细计划，一步步解决', type: 'zhugeliang' },
      { text: '默默承受，相信时间会解决一切', type: 'simayi' },
      { text: '压力大到失眠，但又无法解决', type: 'zhouyu' }
    ]
  },
  {
    id: 16,
    text: '朋友心情不好找你倾诉，你会——',
    options: [
      { text: '认真倾听，给出实际的建议和解决方案', type: 'zhugeliang' },
      { text: '先安慰情绪，再慢慢引导对方看到积极面', type: 'liubei' },
      { text: '默默陪着，但心里想着自己的事情', type: 'liushan' },
      { text: '表面安慰，实际上在想怎么利用这个信息', type: 'simayi' },
      { text: '比朋友还激动，恨不得替他解决问题', type: 'guanyu' },
      { text: '担心说错话让朋友更难过', type: 'zhouyu' }
    ]
  },
  {
    id: 17,
    text: '面对重大人生选择（比如换城市、换行业），你会——',
    options: [
      { text: '果断决定，相信自己的直觉和判断', type: 'caocao' },
      { text: '征求家人朋友意见，综合考虑后再决定', type: 'liubei' },
      { text: '能不变就不变，稳定最重要', type: 'liushan' },
      { text: '反复分析利弊，制定详细计划后再行动', type: 'zhugeliang' },
      { text: '先试探性地尝试一下，看看效果', type: 'simayi' },
      { text: '想改变又害怕改变，纠结很久', type: 'diaochan' }
    ]
  },
  {
    id: 18,
    text: '你如何看待"成功"？',
    options: [
      { text: '成功就是掌握权力和资源，能够影响他人', type: 'caocao' },
      { text: '成功是拥有真诚的人际关系和内心的满足', type: 'liubei' },
      { text: '成功就是过得舒服自在，不用为生活奔波', type: 'liushan' },
      { text: '成功需要长期积累，急不得也慢不得', type: 'simayi' },
      { text: '成功就是实现自己的目标和价值', type: 'zhugeliang' },
      { text: '成功是成为某个领域的顶尖人才', type: 'lvbu' }
    ]
  },
  {
    id: 19,
    text: '遇到紧急情况需要快速决策，你会——',
    options: [
      { text: '立即行动，边做边调整', type: 'caocao' },
      { text: '先稳定团队情绪，再分工合作解决问题', type: 'liubei' },
      { text: '慌了，不知道该怎么办', type: 'liushan' },
      { text: '冷静分析，找出最优解决方案', type: 'zhugeliang' },
      { text: '先控制局面，再慢慢想办法', type: 'simayi' },
      { text: '求助他人，希望有人能站出来', type: 'lvbu' }
    ]
  },
  {
    id: 20,
    text: '回顾过去，你最自豪的是——',
    options: [
      { text: '取得了一些让人瞩目的成就', type: 'caocao' },
      { text: '结交了一群真心相待的朋友', type: 'liubei' },
      { text: '一直保持轻松自在的生活状态', type: 'liushan' },
      { text: '通过智慧解决了很多难题', type: 'zhugeliang' },
      { text: '隐忍多年终于等到机会', type: 'simayi' },
      { text: '敢于尝试很多新鲜事物', type: 'guanyu' }
    ]
  }
];

// ========================
// 结果数据（10种人格 + 1隐藏）
// ========================
const results = {
  caocao: {
    name: '曹操型',
    english: 'CAOCAO',
    camp: '魏 · 霸道总裁风',
    quote: '宁教我负天下人，休教天下人负我',
    description: '你是一个结果导向的人。在你的世界里，感情是手段，效率才是目的。你做决策快、狠、准，从不在无关紧要的事上浪费时间。同事觉得你有距离感，但你心里清楚——职场没有朋友，只有利益共同体。',
    weakness: '疑心太重。你总是忍不住揣测别人的动机，哪怕对方只是单纯地给你带了杯咖啡。',
    ending: '事业有成，但深夜emo时发现通讯录里找不到一个能说话的人。',
    weapon: '青釭剑（锋利但冷）',
    bgm: '乱世巨星',
    shareQuote: '我成功了，但我也失去了——算了，至少我成功了。',
    bgColor: '#2D2D2D',
    emoji: '⚔️',
    image: 'images/caocao.png'
  },
  liubei: {
    name: '刘备型',
    english: 'LIUBEI',
    camp: '蜀 · 人缘天花板',
    quote: '没有我融不进去的圈子，只有我不想融的',
    description: '你是天生的关系型选手。你最大的武器不是能力，而是人格魅力。你擅长让每个人都觉得"他跟我是最好的朋友"，桃园结义是你的基本操作。',
    weakness: '太依赖关系。你习惯了靠"人情"解决问题，一旦到了需要独自硬刚的时刻，你会发现自己其实什么都没准备好。',
    ending: '朋友遍天下，但真正能托底的人一个也没有。关键时刻发现——"仁义"换不来存款。',
    weapon: '双股剑（成双成对）',
    bgm: '朋友',
    shareQuote: '我认识的人多到自己都记不清，但能借到钱的没几个。',
    bgColor: '#1a332a',
    emoji: '🤝',
    image: 'images/liubei.png'
  },
  zhugeliang: {
    name: '诸葛亮型',
    english: 'ZHUGELIANG',
    camp: '蜀 · 完美主义晚期',
    quote: '事必躬亲，鞠躬尽瘁，最后把自己累死',
    description: '你是团队里最靠谱的人，也是最累的人。你信奉"别人做的我不放心"，所有事情都要亲力亲为。你制定了详细的计划，考虑了所有意外，但你的身体已经在发出警告了。',
    weakness: '不肯放手。你不信任任何人能把事情做好，于是你把所有活都揽在自己身上。短期看是高效，长期看是慢性自杀。',
    ending: '积劳成疾，年假一天没休过，体检报告上全是箭头。别人说你是"团队核心"，其实你只是"免费劳动力天花板"。',
    weapon: '羽扇（扇到手抽筋）',
    bgm: '倔强',
    shareQuote: '这个方案我再改最后一版——（第47版）。',
    bgColor: '#1e2d3d',
    emoji: '📜',
    image: 'images/zhugeliang.png'
  },
  simayi: {
    name: '司马懿型',
    english: 'SIMAYI',
    camp: '魏 · 熬鹰大师',
    quote: '我挥剑只有一次，但我磨剑磨了十年',
    description: '你是真正的长期主义者。你不在乎一时的得失，你在乎的是最终谁能笑到最后。你擅长隐忍、蛰伏、等待。在别人争得头破血流的时候，你默默积蓄力量。',
    weakness: '太能忍。你把"忍"当成了习惯，有时候该争取的时候你也在忍，结果错过了本该属于你的机会。',
    ending: '熬走了三任领导，终于轮到你上位了。但你发现——头发已经没了。',
    weapon: '忍耐（看不见的武器）',
    bgm: '十年',
    shareQuote: '我不急，我有的是时间。但我的发际线没有。',
    bgColor: '#1a2f2f',
    emoji: '🦊',
    image: 'images/simayi.png'
  },
  guanyu: {
    name: '关羽型',
    english: 'GUANYU',
    camp: '蜀 · 孤勇者',
    quote: '能力顶级，脾气也顶级',
    description: '你是一个有真本事的人，而且你很清楚自己有本事。你不需要团队也能单打独斗出成绩，过五关斩六将对你来说只是日常操作。你信奉实力说话，不屑于搞关系那一套。',
    weakness: '傲。你太相信自己的判断，听不进别人的建议。你觉得自己不需要盟友，但一个人再强也扛不住四面楚歌。',
    ending: '因为太刚而得罪了所有人，最后被"自己人"背刺。大意失荆州不是意外，是必然。',
    weapon: '青龙偃月刀（重到没人敢接）',
    bgm: '孤勇者',
    shareQuote: '我不需要朋友，我需要的是对手——等等，为什么我被优化了？',
    bgColor: '#3d1a1a',
    emoji: '🗡️',
    image: 'images/guanyu.png'
  },
  lvbu: {
    name: '吕布型',
    english: 'LVBU',
    camp: '群雄 · 跳槽之王',
    quote: '简历花得像调色盘，能力天花板，忠诚度地板',
    description: '你是那种面试必过、入职必跑的人。你的能力毋庸置疑，但你的稳定性堪忧。你总觉得"下一个更好"，于是不断跳槽、不断寻找、不断失望。',
    weakness: '没有定力。你太容易被眼前的机会吸引，缺乏深耕一个领域的耐心。频繁跳槽让你的履历越来越花，也越来越难解释。',
    ending: '面试官看着你的简历沉默了三分钟，然后说"你很优秀，但我们更需要稳定的人"。',
    weapon: '方天画戟（但已经换了三把）',
    bgm: '漂洋过海来看你',
    shareQuote: '不是我不忠诚，是每家公司都不值得。——（已读不回第18家猎头）',
    bgColor: '#3d2e1a',
    emoji: '🏃',
    image: 'images/lvbu.png'
  },
  liushan: {
    name: '刘禅型',
    english: 'LIUSHAN',
    camp: '蜀 · 终极躺王',
    quote: '此间乐，不思蜀',
    description: '你的生存哲学只有一个字：躺。你不是没有能力，你只是觉得"不值得"。你精准地计算过——努力的收益和摸鱼的收益其实差不多，那为什么要努力呢？',
    weakness: '你以为你在掌控躺平，其实躺平在掌控你。当外部环境变化时，你发现自己已经丧失了站起来的能力。',
    ending: '公司裁员名单上没有你——因为你是第一个被裁的。你终于实现了"永远休息"的愿望，但方式不太体面。',
    weapon: '鸡腿（攻击力为零，幸福感满格）',
    bgm: '差不多先生',
    shareQuote: '我不是不上进，我只是提前退休了。——（26岁）',
    bgColor: '#3d3a1a',
    emoji: '😴',
    image: 'images/liushan.png'
  },
  yuanshao: {
    name: '袁绍型',
    english: 'YUANSHAO',
    camp: '群雄 · 纠结之王',
    quote: '资源最多，决策最慢，开会永远定不下来',
    description: '你是那种什么都有、但什么都做不成的人。你的条件其实很好——学历不错、家境尚可、人脉也有。但你最大的问题就是：选择困难。你永远在分析、在比较、在等"更好的时机"。',
    weakness: '想太多。你的大脑是一个永不停歇的分析引擎，但你的执行力约等于零。你在"要不要"之间内耗的时间，够别人做成三件事了。',
    ending: '三十岁回头看，发现自己"什么都没做错"，但也"什么都没做成"。你是最安全的失败者。',
    weapon: '两份方案（永远选不了）',
    bgm: '左右为难',
    shareQuote: '我再想想——（想了三年了）。',
    bgColor: '#2d2240',
    emoji: '🤔',
    image: 'images/yuanshao.png'
  },
  zhouyu: {
    name: '周瑜型',
    english: 'ZHOUYU',
    camp: '吴 · 卷到吐血',
    quote: '既生瑜，何生亮——为什么总有比我强的人？',
    description: '你是一个有天赋、有野心、有执行力的人。按理说你应该很成功，但你有一个致命的毛病：你太在意和别人比较了。你不是不优秀，你只是永远觉得自己不够优秀。',
    weakness: '比较心。你把太多精力花在了"别人怎么样"上，而不是"我要什么"上。你的焦虑不是来自能力不足，而是来自欲望和现实的落差。',
    ending: '你确实很优秀，但你永远不快乐。因为你总能找到一个比你更强的人来折磨自己。最后不是被对手打败的，是被自己气死的。',
    weapon: '碎屏手机（摔碎了第8个）',
    bgm: '不服',
    shareQuote: '我已经很努力了，但为什么还是有人比我强——（看了一眼朋友圈，更气了）。',
    bgColor: '#1a2240',
    emoji: '😤',
    image: 'images/zhouyu.png'
  },
  diaochan: {
    name: '貂蝉型',
    english: 'DIAOCHAN',
    camp: '群雄 · 工具人',
    quote: '所有人都需要我，但没有人在乎我',
    description: '你是团队/朋友圈里最不可或缺的人，但也是最容易被忽视的人。你总是出现在需要你的地方——谁有困难你都帮，谁有情绪你都听。你像一个万能补丁，哪里有漏洞你就在哪里。',
    weakness: '边界感为零。你太擅长满足别人的需求，以至于忘了自己也有需求。你帮了所有人，但当有一天你需要帮助的时候，你会发现身边空无一人。',
    ending: '你被所有人需要，也被所有人遗忘。你不是任何人的Plan A，你是所有人的Plan B。',
    weapon: '万能工具箱（但没人帮你修）',
    bgm: '我等到花儿也谢了',
    shareQuote: '有事吗？——（你的微信开场白）。没事吗？——（你一天中最安静的时刻）。',
    bgColor: '#3d1a2d',
    emoji: '🌸',
    image: 'images/diaochan.png'
  }
};

// ========================
// 中文数字映射
// ========================
const chineseNumbers = ['壹','贰','叁','肆','伍','陆','柒','捌','玖','拾','拾壹','拾贰','拾叁','拾肆','拾伍','拾陆','拾柒','拾捌','拾玖','贰拾'];

// ========================
// 状态
// ========================
let state = {
  currentQuestion: 0,
  answers: [],
  scores: {}
};

// ========================
// 本地存储相关函数
// ========================
function saveStateToStorage() {
  try {
    const stateToSave = {
      currentQuestion: state.currentQuestion,
      answers: state.answers,
      scores: state.scores,
      timestamp: Date.now()
    };
    localStorage.setItem('sgti_state', JSON.stringify(stateToSave));
  } catch (e) {
    // localStorage 可能不可用，静默处理
    console.warn('无法保存测试状态到本地存储:', e);
  }
}

function loadStateFromStorage() {
  try {
    const savedState = localStorage.getItem('sgti_state');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // 检查状态是否过期（24小时）
      const isExpired = Date.now() - parsedState.timestamp > 24 * 60 * 60 * 1000;
      if (!isExpired && parsedState.currentQuestion < questions.length) {
        state = {
          currentQuestion: parsedState.currentQuestion,
          answers: parsedState.answers || [],
          scores: parsedState.scores || {}
        };
        return true;
      } else {
        // 状态过期或已完成，清除存储
        localStorage.removeItem('sgti_state');
      }
    }
  } catch (e) {
    // 解析失败，清除存储
    localStorage.removeItem('sgti_state');
    console.warn('无法加载测试状态:', e);
  }
  return false;
}

// ========================
// 页面切换
// ========================
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });
  const target = document.getElementById(pageId);
  target.classList.add('active');
  window.scrollTo(0, 0);
}

// ========================
// 开始测试
// ========================
function startTest() {
  state = {
    currentQuestion: 0,
    answers: [],
    scores: {}
  };
  saveStateToStorage(); // 保存初始状态
  showPage('page-quiz');
  renderQuestion();
}

// ========================
// 渲染题目
// ========================
function renderQuestion() {
  const q = questions[state.currentQuestion];
  const total = questions.length;

  // 更新进度
  const progress = ((state.currentQuestion) / total) * 100;
  document.getElementById('progress-fill').style.width = progress + '%';
  document.getElementById('progress-text').textContent = `第 ${state.currentQuestion + 1}/${total} 题`;

  // 进度提示文案
  const hints = [
    '快了快了，你的本性快藏不住了',
    '别装了，你是什么人我心里有数',
    '继续，马上就暴露了',
    '你的精神状态正在被解析中',
    '加油，马上就真相大白了',
    '三国谋士正在为你掐指一算',
    '华佗说你的脉象很有趣',
    '诸葛亮的锦囊马上要打开了'
  ];
  document.getElementById('progress-hint').textContent = hints[Math.floor(Math.random() * hints.length)];

  // 题目
  document.getElementById('question-number').textContent = chineseNumbers[state.currentQuestion];
  document.getElementById('question-text').textContent = q.text;

  // 选项
  const container = document.getElementById('options-container');
  container.innerHTML = '';

  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  q.options.forEach((opt, index) => {
    const card = document.createElement('div');
    card.className = 'option-card';
    card.innerHTML = `
      <div class="option-letter">${letters[index]}</div>
      <div class="option-text">${opt.text}</div>
    `;
    card.addEventListener('click', () => selectOption(index));
    container.appendChild(card);
  });

  // 重新触发动画
  const area = document.querySelector('.quiz-question-area');
  area.style.animation = 'none';
  area.offsetHeight; // 强制重排
  area.style.animation = 'slideIn 0.4s ease';
}

// ========================
// 选择选项
// ========================
function selectOption(index) {
  const q = questions[state.currentQuestion];
  const selectedType = q.options[index].type;

  // 记录答案
  state.answers.push({ questionId: q.id, type: selectedType });

  // 累加分数
  if (!state.scores[selectedType]) {
    state.scores[selectedType] = 0;
  }
  state.scores[selectedType]++;

  // 视觉反馈
  const cards = document.querySelectorAll('.option-card');
  cards.forEach((c, i) => {
    if (i === index) {
      c.classList.add('selected');
    } else {
      c.style.opacity = '0.3';
      c.style.pointerEvents = 'none';
    }
  });

  // 延迟跳转下一题
  setTimeout(() => {
    state.currentQuestion++;

    if (state.currentQuestion < questions.length) {
      saveStateToStorage(); // 保存当前状态
      // 中点彩蛋（第 10 题后）
      if (state.currentQuestion === 10) {
        showMidpoint();
      } else {
        renderQuestion();
      }
    } else {
      // 进入加载页
      showLoading();
      // 清除存储的状态，因为测试已完成
      localStorage.removeItem('sgti_state');
    }
  }, 500);
}

// ========================
// 中点彩蛋
// ========================
function showMidpoint() {
  const overlay = document.createElement('div');
  overlay.className = 'midpoint-overlay';
  overlay.innerHTML = `
    <div class="midpoint-box">
      <h3>🎭 过半了</h3>
      <p>你已经暴露了一半的本性。<br>剩下的一半，还藏得住吗？</p>
      <button onclick="this.closest('.midpoint-overlay').remove(); renderQuestion();">继续鉴定</button>
    </div>
  `;
  document.body.appendChild(overlay);
}

// ========================
// 加载过渡
// ========================
function showLoading() {
  showPage('page-loading');

  const loadingTexts = [
    '正在分析你的精神状态...',
    '翻阅三国史料中...',
    '华佗正在给你把脉...',
    '诸葛亮正在掐指一算...',
    '诊断结果出来了！'
  ];

  let index = 0;
  const textEl = document.getElementById('loading-text');

  const interval = setInterval(() => {
    index++;
    if (index < loadingTexts.length) {
      textEl.textContent = loadingTexts[index];
    }
    if (index >= loadingTexts.length) {
      clearInterval(interval);
      showResult();
    }
  }, 800);
}

// ========================
// 计算结果
// ========================
function calculateResult() {
  // 找得分最高的人格
  let maxScore = 0;
  let resultType = 'liushan'; // 默认

  for (const [type, score] of Object.entries(state.scores)) {
    if (score > maxScore) {
      maxScore = score;
      resultType = type;
    }
  }

  return resultType;
}

// ========================
// 显示结果
// ========================
function showResult() {
  const resultType = calculateResult();
  const data = results[resultType];

  // 填充数据
  const card = document.getElementById('result-card');
  card.style.background = data.bgColor;

  document.getElementById('result-name').textContent = data.name;
  document.getElementById('result-english').textContent = data.english;
  document.getElementById('result-camp').textContent = data.camp;
  document.getElementById('result-quote').textContent = data.quote;
  document.getElementById('result-desc').textContent = data.description;
  document.getElementById('result-weakness').textContent = data.weakness;
  document.getElementById('result-ending').textContent = data.ending;
  document.getElementById('result-weapon').textContent = data.weapon;
  document.getElementById('result-bgm').textContent = data.bgm;
  document.getElementById('result-share-quote').textContent = data.shareQuote;

  // 设置分享卡片背景色
  document.getElementById('share-card').style.background = data.bgColor;

  // 设置图片
  const imgEl = document.getElementById('result-image');
  imgEl.src = data.image;
  imgEl.alt = data.name;
  // 图片加载失败时隐藏
  imgEl.onerror = function() {
    this.style.display = 'none';
  };

  // 渲染其他人格
  renderOtherTypes(resultType);

  // 显示页面
  showPage('page-result');

  // 更新URL（方便分享）
  history.replaceState(null, '', '#' + resultType);
}

// ========================
// 渲染其他人格
// ========================
function renderOtherTypes(currentType) {
  const container = document.getElementById('other-types-scroll');
  container.innerHTML = '';

  for (const [key, data] of Object.entries(results)) {
    if (key === currentType) continue;

    const card = document.createElement('div');
    card.className = 'other-type-card';
    card.innerHTML = `
      <div class="other-type-emoji">${data.emoji}</div>
      <div class="other-type-name">${data.name}</div>
      <div class="other-type-tag">${data.quote.slice(0, 12)}...</div>
    `;
    card.addEventListener('click', () => {
      // 查看其他人格详情
      showSpecificResult(key);
    });
    container.appendChild(card);
  }
}

// ========================
// 查看指定人格
// ========================
function showSpecificResult(type) {
  const data = results[type];

  const card = document.getElementById('result-card');
  card.style.background = data.bgColor;

  document.getElementById('result-name').textContent = data.name;
  document.getElementById('result-english').textContent = data.english;
  document.getElementById('result-camp').textContent = data.camp;
  document.getElementById('result-quote').textContent = data.quote;
  document.getElementById('result-desc').textContent = data.description;
  document.getElementById('result-weakness').textContent = data.weakness;
  document.getElementById('result-ending').textContent = data.ending;
  document.getElementById('result-weapon').textContent = data.weapon;
  document.getElementById('result-bgm').textContent = data.bgm;
  document.getElementById('result-share-quote').textContent = data.shareQuote;
  document.getElementById('share-card').style.background = data.bgColor;

  const imgEl = document.getElementById('result-image');
  imgEl.src = data.image;
  imgEl.onerror = function() { this.style.display = 'none'; };

  renderOtherTypes(type);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  history.replaceState(null, '', '#' + type);
}

// ========================
// 分享结果
// ========================
function shareResult() {
  const hash = window.location.hash.slice(1) || 'caocao';
  const data = results[hash];
  const shareUrl = window.location.href;

  const shareText = `我测出了【${data.name}】——${data.quote}\n\n${data.shareQuote}\n\n三国乱世，人人有病。你是什么病？\n👉 ${shareUrl}`;

  // 优先使用原生分享API
  if (navigator.share) {
    navigator.share({
      title: `我是${data.name}——三国人格鉴定`,
      text: shareText,
      url: shareUrl
    }).catch(() => {
      // 用户取消，不做处理
    });
  } else {
    // 降级：复制到剪贴板
    copyToClipboard(shareText);
    showToast('结果已复制，快去分享给朋友吧！');
  }
}

// ========================
// 复制到剪贴板
// ========================
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

// ========================
// Toast 提示
// ========================
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// ========================
// 重新测试
// ========================
function restartTest() {
  history.replaceState(null, '', window.location.pathname);
  localStorage.removeItem('sgti_state'); // 清除保存的状态
  startTest();
}

// ========================
// 继续测试
// ========================
function continueTest() {
  if (loadStateFromStorage()) {
    showPage('page-quiz');
    renderQuestion();
  } else {
    startTest();
  }
}

// ========================
// 初始化
// ========================
function init() {
  // 检查URL hash，如果有直接显示对应结果
  const hash = window.location.hash.slice(1);
  if (hash && results[hash]) {
    showSpecificResult(hash);
    return;
  }

  // 检查是否有保存的测试状态
  const savedState = localStorage.getItem('sgti_state');
  let hasValidSavedState = false;
  
  if (savedState) {
    try {
      const parsedState = JSON.parse(savedState);
      const isExpired = Date.now() - parsedState.timestamp > 24 * 60 * 60 * 1000;
      if (!isExpired && parsedState.currentQuestion < questions.length) {
        hasValidSavedState = true;
        // 显示继续按钮
        const continueBtn = document.getElementById('continue-btn');
        const startBtn = document.getElementById('start-btn');
        if (continueBtn && startBtn) {
          continueBtn.style.display = 'block';
          startBtn.textContent = '重新开始测试';
        }
      } else {
        localStorage.removeItem('sgti_state');
      }
    } catch (e) {
      localStorage.removeItem('sgti_state');
    }
  }

  if (hasValidSavedState) {
    showPage('page-home');
  } else {
    // 显示首页
    showPage('page-home');
  }

  // 随机增加"已有XX人测试"的数字
  const countEl = document.getElementById('test-count-num');
  if (countEl) {
    const base = 12847;
    const randomAdd = Math.floor(Math.random() * 500);
    countEl.textContent = (base + randomAdd).toLocaleString();
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
