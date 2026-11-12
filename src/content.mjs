// All site copy lives here, in both languages.
// Edit this file, then run `node build.mjs` to regenerate index.html and ja/index.html.
//
// T(en, ja) holds one string in both languages. Plain strings (names, tech) are shared.

const T = (en, ja) => ({ en, ja });

export const site = {
  origin: 'https://fernsugi.github.io',
  name: 'Sugianto Wong',
  fullName: 'Wong Hock Chuan Sugianto',
  email: 'fernsugi@gmail.com',
  github: 'https://github.com/fernsugi',
  linkedin: 'https://www.linkedin.com/in/sugianto-wong-44b232172/',
  source: 'https://github.com/fernsugi/fernsugi.github.io',
  year: 2026,
  title: T(
    'Sugianto Wong — Full-Stack Engineer in Tokyo',
    'Sugianto Wong｜フルスタックエンジニア（東京）',
  ),
  description: T(
    'Full-stack engineer with 8 years across web services, blockchain games, mobile apps and audio software. Based in Tokyo. Owns products end to end, from spec to operations.',
    'Webサービス、ブロックチェーンゲーム、モバイルアプリ、オーディオソフトウェアまで、8年の開発経験を持つ東京在住のフルスタックエンジニア。仕様作成からリリース・運用まで一貫して担当します。',
  ),
  jobTitle: T('Full-Stack Engineer', 'フルスタックエンジニア'),
};

export const ui = {
  skip: T('Skip to content', '本文へスキップ'),
  primaryNav: T('Sections', 'セクション'),
  menu: T('Menu', 'メニュー'),
  language: T('Language', '言語'),
  themeToDark: T('Switch to dark theme', 'ダークテーマに切り替える'),
  themeToLight: T('Switch to light theme', 'ライトテーマに切り替える'),
  to: T('to', 'から'),
  top: T('Back to top', 'ページ上部へ'),
};

// ───────────────────────────────────────────────────────────── hero

export const hero = {
  role: T('Full-Stack Engineer', 'フルスタックエンジニア'),
  place: T('Tokyo, Japan', '東京'),
  lede: T(
    'I take products from spec to production.',
    '仕様づくりから運用まで、プロダクトを一貫して手がけます。',
  ),
  sub: T(
    'Eight years across web services, blockchain games, mobile apps and audio software. I’ve led a 10-person team, and today I ship four products in parallel with AI agents built into the workflow.',
    'Webサービス、ブロックチェーンゲーム、モバイルアプリ、オーディオソフトウェアまで、8年の開発経験。10名規模のチームをリードした経験を持ち、現在はAIエージェントを開発フローに組み込み、少人数で4つのプロダクトを並行開発しています。',
  ),
  cta: T('Get in touch', '連絡する'),
  scope: {
    name: T('2-operator FM', '2オペレーターFM'),
    hint: T('Move your pointer to shape the tone', 'ポインターを動かすと音色が変わります'),
    ratio: T('Ratio', 'レシオ'),
    index: T('Index', 'インデックス'),
    note: T('Note', 'ノート'),
    sound: T('Sound', 'サウンド'),
    on: T('on', 'ON'),
    off: T('off', 'OFF'),
    soundPrefix: T('Synthesizer', 'シンセサイザー'), // read aloud before "Sound off", not shown
  },
};

export const figures = [
  { value: '8', unit: T('years', '年'), label: T('building software professionally', 'ソフトウェア開発の実務経験') },
  { value: '10', unit: T('engineers', '名'), label: T('on the team I led', '規模の開発チームをリード') },
  { value: '4', unit: T('products', 'プロダクト'), label: T('shipping in parallel right now', 'を少人数で並行開発中') },
  { value: '7', unit: T('languages', '言語'), label: T('spoken, three at business level', 'うち3言語はビジネスレベル') },
];

// ───────────────────────────────────────────────────────────── sections

export const sections = {
  work: {
    no: '01', word: 'Work', nav: T('Work', 'プロダクト'), title: T('Work', 'プロダクト'),
    lead: T(
      'Products I’ve designed, built and run: blockchain games, a voice-first social app, a rhythm game, a synthesizer and a payment API for AI agents.',
      '設計から開発、運用まで手がけてきたプロダクト。ブロックチェーンゲーム、音声SNS、リズムゲーム、シンセサイザー、AIエージェント向け決済APIまで。',
    ),
  },
  results: {
    no: '02', word: 'Results', nav: T('Results', '成果'), title: T('Results', '課題と成果'),
    lead: T(
      'The problems I was handed, what I did about them, and what changed. Most of these come from running production blockchain games at doublejump.tokyo.',
      '直面した課題、実施した内容、そして成果。主にdoublejump.tokyoでの商用ブロックチェーンゲームの開発・運用における実績です。',
    ),
  },
  experience: {
    no: '03', word: 'Experience', nav: T('Experience', '経歴'), title: T('Experience', '職務経歴'),
    lead: T(
      'Eight years, three companies and the whole stack, from contract web development to leading development on live games.',
      '受託開発から、ライブ運用中のゲーム開発のリードまで。8年間、3社での経験です。',
    ),
  },
  skills: {
    no: '04', word: 'Skills', nav: T('Skills', 'スキル'), title: T('Skills', 'スキル'),
    lead: T(
      'How long I’ve actually used each tool, and everything else in the toolbox.',
      '実際に手を動かしてきた年数と、プロダクトに応じて使い分ける技術の一覧です。',
    ),
  },
  about: {
    no: '05', word: 'About', nav: T('About', 'プロフィール'), title: T('About', 'プロフィール'),
    lead: T(
      'From Melaka to Tokyo, by way of Paris.',
      'マレーシア・マラッカから、パリを経て東京へ。',
    ),
  },
  contact: {
    no: '06', word: 'Contact', nav: T('Contact', '連絡先'), title: T('Contact', 'お問い合わせ'),
    lead: T(
      'Have a product that needs building end to end? I’d like to hear about it.',
      'プロダクト開発のご相談や採用に関するお問い合わせなど、お気軽にご連絡ください。',
    ),
  },
};

// ───────────────────────────────────────────────────────────── work

// `wave` only shapes the little FM signature drawn beside each project.
export const projects = [
  {
    id: 'brave-frontier-heroes',
    title: 'Brave Frontier Heroes',
    kind: T('Blockchain game', 'ブロックチェーンゲーム'),
    status: { tone: 'live', label: T('In production', '商用運用中') },
    where: T('doublejump.tokyo → VNL Works · 2022 — present', 'doublejump.tokyo → VNL Works ・ 2022年〜現在'),
    sum: T(
      'A production blockchain game with a live user base. I led its development at doublejump.tokyo and now maintain and extend it at VNL Works.',
      'ライブ運用中のブロックチェーンゲーム。doublejump.tokyoで開発をリードし、現在はVNL Worksで保守・機能開発を担当しています。',
    ),
    points: [
      T('Designed and built an OAuth2/OIDC authorization server integrating Ory Hydra with MCH Plus login, with infrastructure managed in Terraform',
        'Ory HydraとMCH Plus認証を統合したOAuth2/OIDC認可サーバーの設計・構築（Terraformによるインフラ管理）'),
      T('Built a developer API portal (Next.js) and a wallet-login frontend (React, viem/wagmi)',
        '外部開発者向けAPIポータル（Next.js）、ウォレット連携による認証フロント（React／viem／wagmi）の開発'),
      T('Improved the web battle engine and built an image-generation service in Go',
        'Web対戦（バトルエンジン）の改修、Golangによる画像生成サービスの実装'),
      T('Maintain Jenkins CI/CD and production operations; cut AWS costs 33% ($3,000 → $2,000/month)',
        'インフラ・CI/CD（Jenkins）の保守と商用環境の運用。AWSコストを33%削減（月額3,000ドル→2,000ドル）'),
    ],
    tags: ['Go', 'TypeScript', 'Next.js', 'Vite', 'Unity', 'viem/wagmi', 'Ory Hydra', 'Terraform', 'AWS', 'Jenkins'],
    links: [{ label: T('Official site', '公式サイト'), href: 'https://bravefrontierheroes.com/' }],
    wave: { ratio: 2, index: 2.4, cycles: 3 },
  },
  {
    id: 'whatthe',
    title: 'whatthe?',
    kind: T('Voice-first social app for iOS', 'iOS向け音声SNSアプリ'),
    status: { tone: 'plain', label: T('New product', '新規開発') },
    where: T('VNL Works', 'VNL Works'),
    sum: T(
      'A voice-first social network: people post and reply with short voice clips.',
      '短い音声クリップで投稿・返信する、音声ファーストのSNS。',
    ),
    points: [
      T('Designed and built the iOS app, the web app and the admin console with Expo/React Native and Supabase',
        'iOSアプリ・Web・管理画面を設計・実装（Expo／React Native、Supabase）'),
      T('Built an automated marketing pipeline that posts through the Instagram and Threads APIs',
        'Instagram／Threads APIを用いたマーケティング投稿の自動化パイプラインを構築'),
    ],
    tags: ['Expo', 'React Native', 'TypeScript', 'Supabase'],
    links: [],
    wave: { ratio: 3, index: 1.5, cycles: 3 },
  },
  {
    id: 'aiya-desire',
    title: 'AIYA Desire',
    kind: T('Rhythm × horror game', 'リズム×ホラーゲーム'),
    status: { tone: 'plain', label: T('New product', '新規開発') },
    where: T('VNL Works', 'VNL Works'),
    sum: T(
      'A Unity game that combines exploration, dialogue, puzzles and rhythm battles.',
      '探索・会話・ギミック・リズムバトルを組み合わせたUnityゲーム。',
    ),
    points: [
      T('Designed and implemented the game in Unity 2022.3 LTS (C#)', 'Unity 2022.3 LTS（C#）によるゲームの設計・実装'),
      T('Built the official site in Next.js', '公式サイト（Next.js）の開発'),
      T('Composed the music', '楽曲の作曲'),
    ],
    tags: ['Unity 2022.3 LTS', 'C#', 'Next.js'],
    links: [],
    wave: { ratio: 1.5, index: 3.1, cycles: 3 },
  },
  {
    id: 'yeetzsynth',
    title: 'YeetzSynth',
    kind: T('Generative synthesizer plugin · VST3/AU', 'ジェネレーティブ・シンセサイザープラグイン（VST3／AU）'),
    status: { tone: 'plain', label: T('Commercial · Gumroad', '販売中 ・ Gumroad') },
    where: T('Audio software', 'オーディオソフトウェア'),
    sum: T(
      'A generative synthesizer plugin built in C++ with JUCE, sold on Gumroad for $19.99.',
      'C++／JUCEで開発したジェネレーティブ・シンセサイザープラグイン。Gumroadにて19.99ドルで販売しています。',
    ),
    points: [
      T('FM synthesis with a multi-voice architecture and LFO modulation', 'FM合成、マルチボイス構成、LFOモジュレーション'),
      T('Thread-safe real-time DSP', 'スレッドセーフなリアルタイムDSP'),
      T('Ships as VST3 and AU', 'VST3／AUに対応'),
    ],
    tags: ['C++', 'JUCE', 'CMake', 'Audio DSP'],
    links: [],
    wave: { ratio: 4, index: 2.2, cycles: 3 },
  },
  {
    id: 'x402-defi-data-api',
    title: 'x402 DeFi Data API',
    kind: T('Payment API for AI agents', 'AIエージェント向け決済API'),
    status: { tone: 'live', label: T('Live', '稼働中') },
    where: T('Base mainnet · ERC-8004 Agent #18763', 'Baseメインネット ・ ERC-8004 Agent #18763'),
    sum: T(
      'An AI-agent payment API built on Coinbase’s x402 protocol, registered as ERC-8004 Agent #18763 on Base mainnet.',
      'Coinbaseのx402プロトコルを用いたAIエージェント向け決済API。Baseメインネット上でERC-8004 Agent #18763として稼働。',
    ),
    points: [
      T('8 real-time endpoints backed by CoinGecko, DefiLlama and Hyperliquid',
        'CoinGecko・DefiLlama・Hyperliquidをデータソースとする8つのリアルタイムエンドポイント'),
      T('Published an MCP server and an ElizaOS plugin to npm', 'MCPサーバーとElizaOSプラグインをnpmで公開'),
    ],
    tags: ['Node.js', 'x402', 'USDC', 'MCP', 'ElizaOS', 'Fly.io'],
    links: [],
    wave: { ratio: 0.5, index: 3.6, cycles: 5 },
  },
];

export const moreTitle = T('Open source & research', 'オープンソース・研究');

export const more = [
  {
    title: 'Zhongb',
    kind: T('Paper', '論文'),
    desc: T(
      '“Zhongb: A Phonetically Transparent Romanization System for Mandarin Chinese.” Published on Zenodo, February 2026.',
      '「Zhongb: A Phonetically Transparent Romanization System for Mandarin Chinese」。中国語のローマ字表記体系を提案した論文（Zenodo、2026年2月）。',
    ),
    href: '',
  },
  {
    title: 'Language Surface',
    kind: T('AI tool', 'AIツール'),
    desc: T('Adds a new language to any app in one click.', 'AIを用いて、ワンボタンでアプリに新しい言語を追加できるツール。'),
    href: 'https://github.com/fernsugi/language-surface',
  },
  {
    title: 'active_image_persist',
    kind: T('Ruby gem', 'Ruby Gem'),
    desc: T('Cross-view image persistence for Active Storage.', 'Active Storageの画像を、ビューをまたいで保持するGem。'),
    href: 'https://rubygems.org/gems/active_image_persist/',
  },
  {
    title: 'Todo Extension',
    kind: T('Chrome extension', 'Chrome拡張'),
    desc: T('A minimal to-do list for Chrome.', 'シンプルなTodo管理のChrome拡張。'),
    href: 'https://github.com/fernsugi/todo-extension',
  },
];

// ───────────────────────────────────────────────────────────── results

// `after` is what remains, as a percentage of the starting value.
export const meters = [
  {
    label: T('React page load', 'Reactのページロード'),
    from: T('7 s', '7秒'), to: T('< 1 s', '1秒未満'), after: 13,
    delta: T('87% faster', '87%改善'),
    how: T('Refactored how components import hooks', 'コンポーネントのhooks importを最適化'),
    src: 'doublejump.tokyo',
  },
  {
    label: T('Vue homepage load', 'Vueのホームページロード'),
    from: T('8 s', '8秒'), to: T('< 2 s', '2秒未満'), after: 25,
    delta: T('75% faster', '75%改善'),
    how: T('Lazy-loaded Pinia stores', 'Piniaストアを遅延読み込み化'),
    src: 'doublejump.tokyo',
  },
  {
    label: T('Guild API response', 'ギルド情報取得API'),
    from: T('3 s', '3秒'), to: T('10–30 ms', '10〜30ms'), after: 1,
    delta: T('99% faster', '99%改善'),
    how: T('O(n²) → O(1), found by profiling at the DB level with Sentry', 'SentryをDBレベルで導入し、O(n²)をO(1)へ'),
    src: 'doublejump.tokyo',
  },
  {
    label: T('CI test run', 'CI自動テスト'),
    from: T('7 min', '7分'), to: T('< 5 min', '5分未満'), after: 72,
    delta: T('28% faster', '28%改善'),
    how: T('Centralized master-data setup and restructured the tests', 'マスターデータ初期化を集約し、テスト構造を最適化'),
    src: 'doublejump.tokyo',
  },
  {
    label: T('AWS bill, per month', 'AWSコスト（月額）'),
    from: T('$3,000', '3,000ドル'), to: T('$2,000', '2,000ドル'), after: 67,
    delta: T('33% lower', '33%削減'),
    how: T('Brave Frontier Heroes infrastructure', 'Brave Frontier Heroesのインフラ運用'),
    src: 'VNL Works',
  },
  {
    label: T('Incident resolution', 'インシデント対応'),
    stat: T('≤ 2 h', '2時間以内'),
    delta: T('Every production incident', '商用環境の全インシデント'),
    how: T('Maintenance call, root cause, code fix and data repair', 'メンテナンス要否の判断から原因特定、コード改修、データ修正まで'),
    src: 'doublejump.tokyo',
  },
];

export const caseLog = {
  title: T('Case log', '主な実績'),
  note: T('doublejump.tokyo · 2022 — 2025', 'doublejump.tokyo ・ 2022年〜2025年'),
  cols: {
    problem: T('Problem', '課題'),
    action: T('What I did', '実施内容'),
    result: T('Result', '成果'),
  },
  rows: [
    {
      problem: T('Slow rendering in the React frontend', 'Reactフロントエンドのレンダリング遅延'),
      action: T('Optimized hook imports in child components and refactored so that parents pass down only what children need.',
        '子コンポーネントのhooks importを最適化し、親コンポーネントから必要なものを渡す設計へリファクタリング'),
      result: T('Page load 7 s → under 1 s (87% faster)', 'ページロード時間を7秒→1秒未満に短縮（87%改善）'),
    },
    {
      problem: T('Slow page load in the Vue frontend', 'Vueフロントエンドのページロード遅延'),
      action: T('Wrapped Pinia store and master-file imports in functions so they load lazily, only when needed.',
        'Piniaストアとマスターファイルのimportを関数化し、必要時にのみimportする遅延読み込みを実装'),
      result: T('Homepage load 8 s → under 2 s (75% faster)', 'ホームページロード時間を8秒→2秒未満に短縮（75%改善）'),
    },
    {
      problem: T('A major spec change on a two-month deadline', '大規模仕様変更への対応（2ヶ月納期）'),
      action: T('Led the task breakdown and a prototype-first approach to API design; owned the backend so that frontend work could run in parallel.',
        '効率的なタスク分割とプロトタイピング方式によるAPI設計を主導。バックエンドを担当し、フロントエンドとの並行作業を実現'),
      result: T('Released on schedule', 'プロジェクトを納期通りにリリース'),
    },
    {
      problem: T('Long-running automated tests in CI', 'CI自動テストの長時間実行'),
      action: T('Consolidated master-data initialization in one place, added a proto insertion helper and restructured the tests waterfall-style.',
        'マスターデータ初期化処理を一箇所に集約し、proto挿入機能を実装。テスト構造をwaterfall型に最適化'),
      result: T('Test run 7 min → under 5 min (28% faster)', 'テスト実行時間を7分→5分未満に短縮（28%改善）'),
    },
    {
      problem: T('Battle errors in production', '商用環境での対戦ゲームエラー'),
      action: T('Fixed deadlocks with INSERT IGNORE, ON DUPLICATE and reader/writer separation; added retry logic for lock wait timeouts.',
        'Deadlock対策（INSERT IGNORE、ON DUPLICATE使用、Reader/Writer分離）、lock wait timeout対策（リトライロジック実装）'),
      result: T('Backend errors on Datadog down to near zero', 'Datadogでのバックエンドエラーをほぼゼロに削減'),
    },
    {
      problem: T('Slow API responses', 'API通信速度の遅延'),
      action: T('Brought in Sentry at the database level, then refactored O(n) and O(n²) paths to O(1).',
        'SentryをDBレベルで導入し、O(n)やO(n²)の処理をO(1)へリファクタリング'),
      result: T('Guild-info API 3 s → 10–30 ms (99% faster)', 'ギルド情報取得APIを3秒→10〜30msに改善（99%改善）'),
    },
    {
      problem: T('Delays caused by misread specifications', '仕様書の認識齟齬による遅延'),
      action: T('Set up regular meetings with the planners, proposed designs with room to extend, and tightened information-sharing between engineers.',
        'プランナーとの定期MTGを実施し、拡張性のある設計を提案。エンジニア間での情報共有を強化'),
      result: T('Work starts the day a spec lands; follow-up campaigns cost almost nothing to implement',
        '当日作業開始を実現。後続キャンペーン実装コストをほぼゼロに削減'),
    },
    {
      problem: T('Gacha content short on BGM and sound effects', 'ガチャコンテンツのBGM・効果音不足'),
      action: T('Composed the BGM and sound effects myself, alongside the engineering work.',
        '技術開発と並行し、音楽制作スキルを活用してBGM・効果音を自作'),
      result: T('Outsourcing cost avoided; released on schedule', '外部委託コストを削減し、予定通りリリース'),
    },
    {
      problem: T('User feedback about UI/UX', 'UI/UXに関するユーザーフィードバック'),
      action: T('Led the frontend fixes together with QA and kept improving things in spare cycles.',
        'QAと連携し、フロント改修を主導。空き時間を活用して継続的な改善を実施'),
      result: T('UI/UX complaints all but gone', 'UI/UX不満の声をほぼ解消'),
    },
    {
      problem: T('Incidents in production', '商用環境でのインシデント発生'),
      action: T('Made the maintenance call, found the root cause, fixed the code, and designed and ran the data-fix queries.',
        'メンテナンス要否の判断、原因特定、コード改修、データ修正クエリの設計・実行を担当'),
      result: T('Every incident resolved within 2 hours', '全インシデントを最長2時間以内に解決'),
    },
    {
      problem: T('AssetBundle and build versions out of sync', 'AssetBundleとビルドバージョンの齟齬'),
      action: T('Introduced versioned directories on AWS, version pinning in GitHub Actions and a setting in the admin console.',
        'AWS上でバージョン別ディレクトリ管理、GitHub Actionsのバージョン指定機能、管理画面での設定機能を実装'),
      result: T('Version-related bugs down to zero', 'バージョン関連の不具合をゼロに削減'),
    },
    {
      problem: T('High AWS costs', 'AWSのコストが高い'),
      action: T('Removed unused resources and added S3 lifecycle rules.', '不要リソースの削除、S3のルール設定などでコスト削減'),
      result: T('$1,000+ saved every month', '毎月1,000ドル以上のコストを節約'),
    },
  ],
};

// ───────────────────────────────────────────────────────────── experience

export const jobs = [
  {
    org: T('VNL Works Inc.', '株式会社VNL Works'),
    role: T('Full-Stack Engineer (Contract)', 'フルスタックエンジニア（業務委託）'),
    period: T('Dec 2025 — Present', '2025年12月〜現在'),
    meta: [T('Tokyo, Japan', '東京'), T('4 products in parallel', '4プロダクトを並行開発')],
    sum: T(
      'Maintenance and feature development for Brave Frontier Heroes, plus three new products: a Unity game, an iOS app and audio plugins. AI agents are part of the workflow, so a small team can run all four at once.',
      '「Brave Frontier Heroes」の保守・機能開発に加え、Unityゲーム「AIYA Desire」、iOS向け音声SNSアプリ「whatthe?」、オーディオプラグイン（C++／JUCE）の新規開発を担当。AIを開発フローに組み込み、少人数で複数プロダクトを並行して開発・運用しています。',
    ),
    points: [
      T('Brave Frontier Heroes: OAuth2/OIDC authorization server, developer API portal, wallet login, battle engine work and a Go image-generation service, plus Jenkins CI/CD and production operations',
        'Brave Frontier Heroes：OAuth2/OIDC認可サーバー、外部開発者向けAPIポータル、ウォレット連携の認証フロント、Web対戦の改修、Golangによる画像生成サービス、CI/CD（Jenkins）の保守と商用環境の運用'),
      T('Cut AWS costs 33% ($3,000 → $2,000/month)', 'AWSコストを33%削減（月額3,000ドル→2,000ドル）'),
      T('whatthe?: voice-first social app for iOS, with web, admin and an automated Instagram/Threads marketing pipeline',
        'whatthe?：iOS向け音声ファーストSNS（iOSアプリ・Web・管理画面）と、Instagram／Threads APIによるマーケティング投稿の自動化パイプライン'),
      T('AIYA Desire: a Unity rhythm × horror game, its official site and its music',
        'AIYA Desire：Unity製リズム×ホラーゲームの設計・実装、公式サイト（Next.js）の開発、楽曲の作曲'),
      T('Audio plugins: C++/JUCE synthesizers (VST3/AU), covering DSP, UI, and Mac/Windows builds and distribution',
        'オーディオプラグイン：C++／JUCEによるシンセサイザー等（VST3／AU）のDSP・UI実装、Mac／Windows向けビルドと配布'),
      T('Claude Code and Codex agents used across design, implementation, testing and operations automation',
        'Claude Code・Codex等のAIエージェントを設計・実装・テスト・運用自動化に活用'),
    ],
    tags: ['Go', 'TypeScript', 'Next.js', 'Unity', 'Expo/React Native', 'Supabase', 'C++/JUCE', 'Ory Hydra', 'Terraform', 'AWS', 'Jenkins'],
  },
  {
    org: T('doublejump.tokyo Inc.', 'doublejump.tokyo株式会社'),
    role: T('Full-Stack Engineer', 'フルスタックエンジニア'),
    period: T('Jan 2022 — Oct 2025', '2022年1月〜2025年10月'),
    meta: [T('~100 employees', '従業員 約100名'), T('In-house blockchain games', '自社開発（ブロックチェーンゲーム）'), T('Team of 10, working in Japanese', '10名チーム／日本語環境')],
    sum: T(
      'Development lead on production blockchain games, involved in every stage from requirements through release to live operations.',
      'ブロックチェーンゲーム開発において、要件定義からリリース・運用保守まで全工程に携わりました。',
    ),
    points: [
      T('Led development on Brave Frontier Heroes and {kai}, both production blockchain games with live user bases',
        '「Brave Frontier Heroes」「{kai}」の開発をリード'),
      T('Led a 10-person engineering team: task management, architecture design, code review and delivery',
        '最大10名規模の開発チームで、タスク管理・技術設計・コードレビュー・納期管理を担当'),
      T('Server side in Go/Protobuf, frontends in Nuxt and Next.js, and Solidity smart contracts for on-chain game assets',
        'Golang／Protobufによるサーバーサイド開発、Nuxt／Next.jsによるフロントエンド実装、Solidityによるスマートコントラクト実装'),
      T('Proto API design, development and testing; database design and data construction; UI/UX and application design',
        'Proto API設計・開発・テスト、データベース設計・データ構築、UI/UX設計、アプリケーション設計'),
      T('Built CI/CD with Jenkins and GitHub Actions; ran live operations and incident response',
        'CI/CD構築・自動化（Jenkins、GitHub Actions）、ゲーム運用・不具合対応'),
      T('Composed BGM and sound effects for gacha content, saving outsourcing costs',
        'ガチャコンテンツのBGM・効果音を自作し、外部委託コストを削減'),
    ],
    tags: ['Go', 'Protobuf', 'Nuxt.js (Vue)', 'Next.js (React)', 'TypeScript', 'Unity', 'Solidity', 'AWS', 'Jenkins', 'MySQL'],
    more: { label: T('See the case log', '主な実績を見る'), href: '#case-log' },
  },
  {
    org: T('Gengosha Inc.', '株式会社言語社'),
    role: T('Software Engineer', 'エンジニア'),
    period: T('Oct 2018 — Dec 2021', '2018年10月〜2021年12月'),
    meta: [T('~30 employees', '従業員 約30名'), T('Contract development', '受託開発'), T('Intern → full-time from Apr 2020', '2018年10月インターン → 2020年4月正社員')],
    sum: T(
      'Joined as an intern while still at school and stayed on full-time, building a range of web services with Ruby on Rails and Vue.js.',
      '専門学校在学中のインターンを経て正社員として入社し、Ruby on RailsとVue.jsを用いた多様なWebサービス開発を経験しました。',
    ),
    points: [
      T('Tea e-commerce platform (gclef.co.jp): registration, payments and an admin dashboard in Vue.js and Rails. Built the auth system, backend, frontend and payment integration, and reviewed code, on a team of two',
        '茶葉通販サイト（gclef.co.jp）：ユーザー登録から決済、管理機能までを備えた通販システム（Vue.js、Ruby on Rails、MySQL／2名）。認証システム、バックエンド・フロントエンド、決済システムの実装、コードレビューを担当'),
      T('LINE receipt-to-points loyalty system for Shinjuku MyLord: shoppers post receipts to LINE to earn points and play gacha. Built auth, receipt management and the LINE API integration, on a team of two',
        'LINEレシート投稿ポイントサービス：新宿ミロードでの購入レシートをLINEに投稿するとポイントが貯まり、ガチャも楽しめるシステム（Vue.js、Ruby on Rails、MySQL、LINE API／2名）。認証、レシート管理機能、LINE API連携を担当'),
      T('Avatar customization system: solo-built on the Canvas API for a KDDI art exhibition and for Taisho Pharmaceutical',
        'アバターカスタマイズシステム：KDDI美術展および大正製薬向けに、Canvas APIを活用したキャラクターカスタマイズシステムを単独で開発'),
    ],
    tags: ['Vue.js', 'Ruby on Rails', 'MySQL', 'LINE API', 'JavaScript', 'Canvas API'],
  },
];

// Inline terms that need their own language tag, referenced as {key} inside copy.
export const terms = {
  kai: { text: '魁 三国志大戦', lang: 'ja', en: 'Battle of Three Kingdoms', href: 'https://kai-sangokushi-taisen.games/' },
};

// ───────────────────────────────────────────────────────────── skills

export const yearsTitle = T('Years of hands-on use', '経験年数');

export const years = [
  { name: 'JavaScript', n: 8, text: T('8 yr', '8年') },
  { name: 'HTML / CSS', n: 8, text: T('8 yr', '8年以上') },
  { name: 'Vue.js / Nuxt.js', n: 7, text: T('7 yr', '7年') },
  { name: 'MySQL', n: 7, text: T('7 yr', '7年') },
  { name: 'Unity / C#', n: 6, text: T('6+ yr', '6年以上'), note: T('incl. side projects', '個人開発含む') },
  { name: 'TypeScript', n: 5, text: T('5 yr', '5年') },
  { name: 'Go / Protobuf', n: 5, text: T('5 yr', '5年') },
  { name: 'React / Next.js', n: 5, text: T('5 yr', '5年') },
  { name: 'AWS', n: 5, text: T('5 yr', '5年') },
  { name: 'Docker', n: 5, text: T('5 yr', '5年') },
  { name: 'Jenkins', n: 5, text: T('5 yr', '5年') },
  { name: 'Solidity', n: 4, text: T('4 yr', '4年') },
  { name: 'Ruby on Rails', n: 3, text: T('3 yr', '3年') },
];

export const stack = [
  { name: T('Languages', '言語'), items: ['TypeScript', 'JavaScript', 'Go', 'Ruby', 'Solidity', 'C#', 'C++', 'Python', 'Dart', 'HTML/CSS'] },
  { name: T('Frontend', 'フロントエンド'), items: ['Vue.js / Nuxt.js', 'React / Next.js', 'Flutter'] },
  { name: T('Backend', 'バックエンド'), items: ['Ruby on Rails', 'Go / Protobuf', 'Node.js', 'OAuth2 / OIDC (Ory Hydra)'] },
  { name: T('Mobile & games', 'モバイル・ゲーム'), items: ['Expo / React Native', 'Supabase', 'Unity / C#', 'JUCE (VST3/AU)'] },
  { name: T('AI / LLM', 'AI／LLM'), items: ['Claude Code', 'Codex', 'Claude API', 'MCP', 'Agent automation', 'ElizaOS'] },
  { name: T('Blockchain', 'ブロックチェーン'), items: ['Solidity', 'viem / wagmi', 'x402', 'ERC-8004', 'Base'] },
  { name: T('Infra & data', 'インフラ・データ'), items: ['AWS', 'Docker', 'Terraform', 'Jenkins', 'GitHub Actions', 'MySQL', 'PostgreSQL', 'Datadog', 'Sentry'] },
];

// ───────────────────────────────────────────────────────────── about

export const about = {
  bio: [
    T('I’m Sugianto (Wong Hock Chuan Sugianto in full), a full-stack engineer from Malaysia, based in Tokyo. Since 2018 I’ve built web services, blockchain games, mobile apps, games and audio plugins.',
      'Sugianto Wong（Wong Hock Chuan Sugianto）です。マレーシア出身、東京在住のフルスタックエンジニアとして、2018年からWebサービス、ブロックチェーンゲーム、モバイルアプリ、ゲーム、オーディオプラグインまで、幅広いプロダクト開発に携わってきました。'),
    T('I can carry a product alone from spec, UI and database design through API, frontend, release and operations, and I’ve led a team of ten doing the same. Performance work and production incidents taught me to find the real cause quickly and fix it properly.',
      'バックエンド・フロントエンド・インフラを横断して一人で全工程をやり切る力と、10名規模のチームをリードした経験の両方を持っています。パフォーマンス改善やインシデント対応で培った問題解決力が強みです。'),
    T('Today, AI agents such as Claude Code and Codex are part of how I design, implement, test and automate operations, which is how a small team ships four products in parallel. Away from the keyboard I compose music, some of which has shipped in the games I’ve worked on, and I care about languages enough to have published a romanization system for Mandarin.',
      '現在はClaude CodeやCodexなどのAIエージェントを設計・実装・テスト・運用自動化に活用し、少人数で4つのプロダクトを並行して開発しています。開発のかたわら作曲も行っており、担当したゲームのBGMや効果音も制作しました。言語への関心から、中国語のローマ字表記体系「Zhongb」を設計し、論文として公開しています。'),
  ],
  flowTitle: T('One engineer, the whole signal path', '仕様から運用まで、一人で一気通貫'),
  flow: [
    T('Spec', '仕様作成'), T('UI design', 'UIデザイン'), T('DB design', 'DB設計'), T('API', 'API実装'),
    T('Frontend', 'フロント実装'), T('Release', 'リリース'), T('Operations', '運用'),
  ],
  languagesTitle: T('Languages', '言語'),
  languages: [
    { native: '中文', lang: 'zh', name: T('Mandarin', '中国語'), level: T('Business', 'ビジネス'), strong: true },
    { native: 'English', lang: 'en', name: T('English', '英語'), level: T('Business', 'ビジネス'), strong: true },
    { native: '日本語', lang: 'ja', name: T('Japanese', '日本語'), level: T('Business', 'ビジネス'), strong: true },
    { native: 'Bahasa Melayu', lang: 'ms', name: T('Malay', 'マレー語'), level: T('Conversational', '日常会話') },
    { native: '한국어', lang: 'ko', name: T('Korean', '韓国語'), level: T('Conversational', '日常会話') },
    { native: 'Français', lang: 'fr', name: T('French', 'フランス語'), level: T('Conversational', '日常会話') },
    { native: 'Tiếng Việt', lang: 'vi', name: T('Vietnamese', 'ベトナム語'), level: T('Conversational', '日常会話') },
  ],
  routeTitle: T('Education', '学歴'),
  route: [
    {
      when: '2016', place: T('Melaka, Malaysia', 'マレーシア・マラッカ'),
      title: T('Oakrich International School', 'Oakrich International School'),
      desc: T('Graduated high school in December 2016.', '2016年12月、高校卒業。'),
    },
    {
      when: '2017', place: T('Tokyo', '東京'),
      title: T('Sendagaya Japanese Language School', '千駄ヶ谷日本語学校'),
      desc: T('Japanese language studies, March to July 2017.', '2017年3月〜7月、日本語を学ぶ。'),
    },
    {
      when: '2017 — 18', place: T('Paris', 'パリ'),
      title: T('École 42, Piscine', 'École 42「Piscine」'),
      desc: T('Passed the four-week C programming selection course, then kept teaching myself C and French in France until February 2018.',
        'C言語集中4週間の入学選抜課程に合格。その後2018年2月まで、フランスにてプログラミング（C言語）とフランス語を独学。'),
    },
    {
      when: '2018 — 20', place: T('Tokyo', '東京'),
      title: T('Tokyo Cool Japan Academy', '東京クールジャパン・アカデミー'),
      desc: T('Game Programmer major, March 2018 to March 2020. Interned at Gengosha from October 2018.',
        'ゲームプログラマー専攻（2018年3月〜2020年3月）。在学中の2018年10月より株式会社言語社でインターン。'),
    },
  ],
};

// ───────────────────────────────────────────────────────────── contact + footer

export const contact = {
  copy: T('Copy', 'コピー'),
  copied: T('Copied', 'コピーしました'),
  elsewhere: T('Elsewhere', 'リンク'),
  basedLabel: T('Based in', '拠点'),
  based: T('Tokyo, Japan', '東京'),
  timeLabel: T('Local time', '現地時刻'),
  timeFallback: 'JST (UTC+9)',
  speaksLabel: T('Working languages', '対応言語'),
  // [text, language tag] pairs, so each name is announced in the right language.
  speaks: {
    en: [['English', 'en'], ['日本語', 'ja'], ['中文', 'zh']],
    ja: [['日本語', 'ja'], ['英語', 'ja'], ['中国語', 'ja']],
  },
};

export const footer = {
  note: T(
    'Designed and built from scratch in plain HTML and CSS, with a little FM synthesis. No frameworks, no trackers.',
    'HTMLとCSS、そして少しのFM合成で、ゼロから設計・実装しました。フレームワークもトラッカーも使っていません。',
  ),
  type: T('Set in Bricolage Grotesque and JetBrains Mono.', '書体：Bricolage Grotesque、JetBrains Mono'),
  source: T('Source', 'ソースコード'),
};

export const notFound = {
  title: T('Signal lost', 'ページが見つかりません'),
  body: T('There’s nothing at this address.', 'お探しのページは見つかりませんでした。'),
  home: T('Back to the start', 'トップページへ'),
};
