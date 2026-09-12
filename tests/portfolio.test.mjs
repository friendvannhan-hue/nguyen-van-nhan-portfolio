import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, stat } from 'node:fs/promises';

const page = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../assets/css/styles.css', import.meta.url), 'utf8');
const script = await readFile(new URL('../assets/js/main.js', import.meta.url), 'utf8');

test('home page uses only the approved public headline metrics', () => {
  for (const fact of [
    '500+ tài khoản SME &amp; Enterprise',
    '18 tỷ VNĐ+',
    '8–15',
    '28% → 58%',
    '110% mục tiêu upsell',
    '100 triệu VNĐ',
    '20% → 60%',
  ]) {
    assert.ok(page.includes(fact), `missing approved fact: ${fact}`);
  }

  for (const stale of ['400+ accounts', '~12B', '7-10', '30% → 58%', '+120%']) {
    assert.doesNotMatch(page, new RegExp(stale.replace('+', '\\+')));
  }
  assert.doesNotMatch(page, /(?:\+110%|110%\s+(?:growth|increase)|tăng trưởng upsell 110%)/i);
});

test('hero and first chapters follow the approved executive narrative', () => {
  assert.match(page, /<title>Nguyễn Văn Nhân \| Customer Growth &amp; Business Operations Expert<\/title>/);
  const hero = page.slice(page.indexOf('<section id="hero"'), page.indexOf('<section class="client-ecosystem"'));
  const heroText = hero.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').replace(/\s+([,.])/g, '$1');
  assert.ok(heroText.includes('Tôi xây hệ thống giúp chiến lược được thực thi, đội ngũ vận hành ổn định và khách hàng hiện hữu tạo ra tăng trưởng.'));
  assert.equal((hero.match(/class="hero-gradient"/g) || []).length, 3);
  assert.match(hero, /Customer Growth &amp; Business Operations Expert<\/span>/);
  assert.doesNotMatch(hero, /Xem cách tôi tạo ra kết quả|Trao đổi về bài toán tăng trưởng/);
  assert.doesNotMatch(page, /Customer Growth &amp; Business Operations Leader/);
  const sequence = ['hero', 'manifesto', 'impact'].map((name) => page.indexOf(`id="${name}"`));
  assert.ok(sequence.every((offset) => offset > -1));
  assert.deepEqual(sequence, [...sequence].sort((a, b) => a - b));
});

test('approved impact is represented by six contextual cards', () => {
  assert.equal((page.match(/class="impact-card"/g) || []).length, 6);
  assert.match(page, /trong hơn 12 tháng/i);
  assert.match(page, /70% → 30%/);
  assert.match(page, /MRR upsell 100 triệu VNĐ/);
});

test('page keeps semantic landmarks and direct contact paths', () => {
  assert.match(page, /<a class="skip-link" href="#main-content">/);
  assert.match(page, /<main id="main-content">/);
  assert.equal((page.match(/<h1\b/g) || []).length, 1);
  assert.match(page, /href="tel:\+84967347781"/);
  assert.match(page, /href="mailto:nhannv\.working@gmail\.com"/);
  assert.match(page, /href="https:\/\/www\.linkedin\.com\/in\/nguyenvannhan\/"/);
  assert.match(page, /href="https:\/\/zalo\.me\/0967347781"/);
  assert.match(page, /Kết nối Zalo · 096 734 7781/);
  assert.doesNotMatch(page, /<a[^>]+download/i);
});

test('verified portfolio context precedes the manifesto without inventing client logos', () => {
  const ecosystemStart = page.indexOf('class="client-ecosystem"');
  const manifestoStart = page.indexOf('id="manifesto"');
  assert.ok(ecosystemStart > -1);
  assert.ok(ecosystemStart < manifestoStart);
  assert.match(page, /500\+ tài khoản SME &amp; Enterprise/);
  assert.equal((page.match(/class="client-segment"/g) || []).length, 8);
  for (const segment of ['F&amp;B chuỗi', 'Trà &amp; cà phê', 'Brewery', 'Siêu thị', 'Nhà thuốc', 'Mỹ phẩm', 'Tiện lợi', 'B2B &amp; phân phối']) {
    assert.ok(page.includes(segment), `missing customer segment: ${segment}`);
  }
  assert.doesNotMatch(page, /logo khách hàng|khách hàng tiêu biểu/i);
});

test('manifesto introduces an accessible six-module operations architecture', () => {
  const manifestoStart = page.indexOf('<section id="manifesto"');
  const impactStart = page.indexOf('<section id="impact"');
  const manifesto = page.slice(manifestoStart, impactStart);

  assert.match(manifesto, /Bệ phóng hoàn hảo để tạo tiền đề tăng trưởng\./);
  assert.match(manifesto, /Một hệ thống All-in-One giúp tôi chuyển hóa kiến thức thành kết quả\./);
  assert.match(manifesto, /role="group"[^>]*aria-label="Operations kết nối sáu nhóm năng lực vận hành"/);
  assert.match(manifesto, /<strong>Operations<\/strong><span>Vận hành trung tâm<\/span>/);
  assert.equal((manifesto.match(/class="operations-module(?:\s|\")/g) || []).length, 6);

  for (const module of ['Data &amp; Marketing', 'Sales Forecast', 'Customer Success', 'Management', 'Technical', 'AI Agent']) {
    assert.ok(manifesto.includes(`<strong>${module}</strong>`), `missing operations module: ${module}`);
  }

  for (const explanation of ['Dữ liệu và chiến dịch', 'Dự báo doanh thu', 'Chăm sóc và phát triển khách hàng', 'Quản trị và ra quyết định', 'Triển khai kỹ thuật', 'Trợ lý tự động hóa']) {
    assert.ok(manifesto.includes(`<span>${explanation}</span>`), `missing plain-language explanation: ${explanation}`);
  }
});

test('tool ecosystem names the approved systems and uses local brand assets', async () => {
  assert.match(page, /aria-labelledby="tool-ecosystem-title"/);
  assert.equal((page.match(/class="tool-card"/g) || []).length, 21);
  for (const tool of ['Haravan', 'Sapo', 'Google Workspace', 'Lark Suite', 'Odoo', 'Microsoft Excel', '1Office', 'CRM', 'Zalo OA', 'Call Center', 'Mattermost', 'Google Drive', 'Google Docs', 'Fireflies.ai', 'CNV CDP', 'Codex GPT', 'Claude', 'OpenClaw', 'Visual Studio Code', 'DeepSeek', 'Antigravity IDE']) {
    assert.ok(page.includes(`>${tool}<`), `missing tool: ${tool}`);
  }
  assert.doesNotMatch(page, />Facebook</);

  const toolLogos = [
    'logo-haravan.png',
    'tool-sapo.png',
    'tool-google-workspace.png',
    'tool-lark.png',
    'tool-odoo.png',
    'tool-excel.png',
    'logo-1office.svg',
    'tool-zalo.png',
    'tool-mattermost.png',
    'tool-google-drive.png',
    'tool-google-docs.png',
    'tool-fireflies.png',
    'logo-cnv-cdp.png',
    'tool-codex.svg',
    'tool-claude.svg',
    'tool-openclaw.svg',
    'tool-vscode.svg',
    'tool-deepseek.svg',
    'tool-antigravity.png',
  ];
  assert.equal((page.match(/class="tool-logo(?:\s|\")/g) || []).length, toolLogos.length);
  for (const asset of toolLogos) {
    assert.match(page, new RegExp(`src="assets/images/${asset}"[^>]*alt="Logo [^"]+"`));
    const info = await stat(new URL(`../assets/images/${asset}`, import.meta.url));
    assert.ok(info.size > 100, `${asset} should contain a real tool logo`);
  }
  assert.match(page, /class="tool-logo tool-logo-haravan"[^>]*src="assets\/images\/logo-haravan\.png"/);
  assert.match(css, /\.tool-logo-haravan\s*{[^}]*filter:\s*invert\(1\)/s);
});

test('visual foundation exposes approved tokens and publication assets', async () => {
  for (const color of ['#F6F7F9', '#FFFFFF', '#0B1F3A', '#475569', '#2563EB', '#1E9B6A', '#C93D5B', '#DCE2EA', '#145DD7']) {
    assert.match(css, new RegExp(color));
  }

  assert.match(page, /href="assets\/images\/favicon\.svg"/);
  assert.match(page, /rel="canonical" href="https:\/\/friendvannhan-hue\.github\.io\/nguyen-van-nhan-portfolio\/"/);
  assert.match(page, /property="og:image" content="https:\/\/friendvannhan-hue\.github\.io\/nguyen-van-nhan-portfolio\/assets\/images\/og-portfolio\.png"/);
  assert.match(page, /class="hero-portrait-cutout"[^>]*src="assets\/images\/nguyen-van-nhan-hero-cutout\.png"[^>]*width="1470"[^>]*height="1756"/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /min-height:\s*44px/);

  for (const asset of ['favicon.svg', 'og-portfolio.png', 'nguyen-van-nhan.webp', 'nguyen-van-nhan-hero-cutout.png']) {
    const info = await stat(new URL(`../assets/images/${asset}`, import.meta.url));
    assert.ok(info.size > 100, `${asset} should contain a real asset`);
  }

  const png = await readFile(new URL('../assets/images/og-portfolio.png', import.meta.url));
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);

  const portrait = await readFile(new URL('../assets/images/nguyen-van-nhan-hero-cutout.png', import.meta.url));
  assert.ok([4, 6].includes(portrait[25]), 'hero portrait PNG should contain a real alpha channel');
});

test('solutions expose six complete business problem-solving records', () => {
  const solutions = page.slice(page.indexOf('<section id="solutions"'), page.indexOf('<section id="operating-system"'));
  assert.match(solutions, /class="section-intro section-intro-compact reveal"/);
  assert.equal((solutions.match(/class="solution-card(?:\s|\")/g) || []).length, 6);
  for (const name of ['Hệ thống giữ chân và gia hạn khách hàng', 'Mở rộng doanh thu từ khách hàng hiện hữu', 'Triển khai và thúc đẩy khách hàng sử dụng hiệu quả', 'Hệ thống vận hành và quản trị', 'Phối hợp thực thi liên phòng ban', 'Vận hành tăng cường bằng AI']) {
    assert.ok(solutions.includes(name), `missing solution: ${name}`);
  }
  assert.doesNotMatch(solutions, /Customer Retention System|Expansion Revenue Engine|Onboarding &amp; Adoption|Business Operations &amp; Governance|Cross-functional Execution|AI-enabled Operations/);
  for (const label of ['Bài toán', 'Cách triển khai', 'Giá trị / Bằng chứng']) {
    assert.equal((solutions.match(new RegExp(`>${label}<`, 'g')) || []).length, 6);
  }
  assert.doesNotMatch(solutions, />Cách tiếp cận<|>Đầu ra<|>Bằng chứng</);
});

test('growth technology architecture connects six capabilities to one outcome flow', () => {
  const proofStart = page.indexOf('class="solution-proof ');
  const operatingSystemStart = page.indexOf('<section id="operating-system"');
  const proof = page.slice(proofStart, operatingSystemStart);

  assert.match(proof, /GROWTH TECHNOLOGY &amp; OPERATIONS/);
  assert.match(proof, /Biến các nền tảng rời rạc thành một hệ thống tăng trưởng có thể vận hành/);
  assert.equal((proof.match(/class="growth-capability(?:\s|\")/g) || []).length, 6);
  for (const capability of [
    'Omnichannel Growth',
    'Customer Data Platform (CDP) &amp; Customer 360',
    'Private Traffic &amp; Owned Channels',
    'Loyalty &amp; Retention',
    'Workflow &amp; Marketing Automation',
    'Customer Experience System (CX)',
  ]) assert.ok(proof.includes(capability), `missing growth capability: ${capability}`);

  const flow = ['Điểm chạm', 'Dữ liệu hợp nhất', 'Điều phối tự động', 'Trải nghiệm cá nhân hóa', 'Giữ chân &amp; Doanh thu'];
  const positions = flow.map((label) => proof.indexOf(`>${label}<`));
  assert.ok(positions.every((position) => position > -1));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
});

test('solution proof cards link HR to three authored product sources', () => {
  const solutionsStart = page.indexOf('<section id="solutions"');
  const proofStart = page.indexOf('class="solution-proof ');
  const operatingSystemStart = page.indexOf('<section id="operating-system"');
  assert.ok(solutionsStart < proofStart && proofStart < operatingSystemStart);
  const proof = page.slice(proofStart, operatingSystemStart);
  assert.equal((proof.match(/class="solution-proof-card"/g) || []).length, 3);
  for (const [title, url] of [
    ['Lộ trình tăng trưởng trên nền tảng sở hữu', 'https://cg.cnvwork.com/files/nhan/solution/cnvcdp-owned-platform.html#top'],
    ['Agentic CDP 360 — Dữ liệu hợp nhất và tăng trưởng tự động', 'https://cg.cnvwork.com/files/nhan/solution/agentic-cdp-360.html'],
    ['Giải pháp CNV CDP và Marketing Automation', 'https://cg.cnvwork.com/files/nhan/solution/cdp-solution.html#top'],
  ]) {
    assert.ok(proof.includes(title), `missing authored product: ${title}`);
    assert.ok(proof.includes(`href="${url}" target="_blank" rel="noopener noreferrer"`), `missing safe external link: ${url}`);
  }
});

test('case-study library frames three business contexts and their response', () => {
  const cases = page.slice(page.indexOf('<section id="case-studies"'), page.indexOf('<section id="ai-lab"'));
  const visibleText = cases.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  assert.match(cases, /04 · CHUYỂN MÌNH TĂNG TRƯỞNG THÍCH NGHI/);
  assert.ok(visibleText.includes('3 vấn đề lớn tôi đã đối mặt và phương án giải quyết.'));
  assert.equal((cases.match(/class="case-card-context"/g) || []).length, 3);
  assert.doesNotMatch(cases, /class="case-demo|Dữ liệu minh họa/);
  for (const title of [
    'Khởi động chiến lược giữ chân và gia hạn trên quy mô toàn công ty',
    'Biến QBR và kế hoạch tài khoản thành động lực tăng trưởng bền vững',
    'Tái thiết vận hành sau bán hàng thành mô hình xuyên suốt',
  ]) assert.ok(cases.includes(title), `missing case title: ${title}`);
  for (const context of [
    'Đội gia hạn phần mềm còn non trẻ, thiếu người dẫn dắt và chưa có hệ thống chung.',
    'Doanh thu chững lại, cơ hội bán thêm khó xác định và đội ngũ thiếu nhịp phối hợp.',
    'Quy trình chồng chéo, trách nhiệm mơ hồ và hành trình khách hàng chưa được tối ưu.',
  ]) assert.ok(cases.includes(context), `missing case context: ${context}`);
});

test('operating system preserves its six layers without a duplicate execution loop', () => {
  const layers = ['Strategy', 'Operating Model', 'Execution System', 'Intelligence', 'Cross-functional Motions', 'Business Outcomes'];
  assert.equal((page.match(/class="os-layer"/g) || []).length, 6);
  const positions = layers.map((label) => page.indexOf(`>${label}<`));
  assert.ok(positions.every((position) => position > -1));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.doesNotMatch(page, /id="strategy-loop"|class="loop-step"|STRATEGY EXECUTION LOOP/);
});

test('operating system includes a privacy-safe dashboard evidence gallery without changing the chapter flow', async () => {
  const operatingSystemStart = page.indexOf('<section id="operating-system"');
  const caseStudiesStart = page.indexOf('<section id="case-studies"');
  const operatingSystem = page.slice(operatingSystemStart, caseStudiesStart);
  const dashboardAssets = [
    'dashboard-value-chain.jpg',
    'dashboard-renewal-status.jpg',
    'dashboard-renewal-monthly.jpg',
    'dashboard-data-coverage.jpg',
    'dashboard-renewal-report.jpg',
    'dashboard-okr-kpi.jpg',
    'dashboard-implementation-overview.jpg',
    'dashboard-project-growth.jpg',
    'dashboard-service-mix.jpg',
    'dashboard-team-performance.jpg',
    'dashboard-credit-revenue.jpg',
    'dashboard-management-status.jpg',
    'dashboard-customer-data.jpg',
  ];

  assert.match(operatingSystem, /Dashboard vận hành do tôi trực tiếp thiết kế và xây dựng/);
  assert.match(operatingSystem, /class="dashboard-evidence/);
  assert.equal((operatingSystem.match(/class="dashboard-card(?:\s|\")/g) || []).length, 13);
  assert.equal((operatingSystem.match(/dashboard-card-featured/g) || []).length, 4);
  assert.match(operatingSystem, /<details class="dashboard-archive"/);
  assert.match(operatingSystem, /Xem toàn bộ 13 dashboard/);
  assert.match(operatingSystem, /Hình ảnh đã được ẩn danh và sử dụng dữ liệu minh họa/);
  assert.match(operatingSystem, /không sao chép hoặc chia sẻ ra bên ngoài/i);
  assert.doesNotMatch(operatingSystem, /<section\b[^>]*dashboard/i);

  for (const asset of dashboardAssets) {
    assert.match(operatingSystem, new RegExp(`src="assets/images/dashboards/${asset}"[^>]*loading="lazy"`));
    const info = await stat(new URL(`../assets/images/dashboards/${asset}`, import.meta.url));
    assert.ok(info.size > 1_000, `${asset} should contain a sanitized dashboard image`);
  }
});

test('AI Operations Lab presents five concise concepts and highlights the revenue add-on', () => {
  const aiLab = page.slice(page.indexOf('<section id="ai-lab"'), page.indexOf('<section id="leadership"'));
  assert.equal((page.match(/class="ai-concept-card(?:\s|\")/g) || []).length, 5);
  assert.equal((page.match(/data-status="concept"/g) || []).length, 5);
  assert.match(aiLab, /class="section-intro ai-lab-intro reveal"/);
  assert.equal((aiLab.match(/<dl class="ai-card-details">/g) || []).length, 5);
  assert.match(css, /\.ai-grid\s*{[^}]*grid-template-columns:\s*repeat\(2,/s);
  assert.match(css, /\.ai-revenue-card\s*{[^}]*grid-column:\s*1\s*\/\s*-1/s);
  for (const name of ['Radar cảnh báo rủi ro tài khoản', 'Trợ lý chuẩn bị báo cáo khách hàng định kỳ', 'Thiết lập giải pháp cho khách hàng', 'Trợ lý báo cáo và ra quyết định', 'Đóng gói AI Agent thành sản phẩm tạo doanh thu']) {
    assert.ok(aiLab.includes(name), `missing AI concept: ${name}`);
  }
  assert.match(aiLab, /không thay thế quyết định chuyên môn của đội ngũ/i);
  assert.match(aiLab, /class="ai-concept-card ai-revenue-card reveal"/);
  assert.match(aiLab, />Tính năng tạo doanh thu</);
  assert.equal((aiLab.match(/>Mô hình đề xuất</g) || []).length, 4);
  assert.doesNotMatch(aiLab, /Người phụ trách kiểm tra|Kiểm tra hội thoại và hỗ trợ huấn luyện/);
  assert.doesNotMatch(aiLab, /Voice of Customer Miner|Human checkpoint|judgment/i);
});

test('leadership and career match the approved scope without a first-90-days section', () => {
  assert.match(page, /id="leadership"/);
  assert.match(page, /Quản lý đội ngũ 8–15 nhân sự/);
  assert.equal((page.match(/class="career-phase(?:\s|\")/g) || []).length, 4);
  for (const company of ['CNV CDP', '1Office', 'Haravan', 'Shinhan Finance']) assert.ok(page.includes(company));
  assert.doesNotMatch(page, /id="first-90-days"|FIRST 90 DAYS|ninety-day-phase/);
});

test('career cards display four local company logos with accessible alternatives', async () => {
  const logos = [
    ['logo-cnv-cdp.png', 'Logo CNV CDP'],
    ['logo-1office.svg', 'Logo 1Office'],
    ['logo-haravan.png', 'Logo Haravan'],
    ['logo-shinhan-finance.png', 'Logo Shinhan Finance'],
  ];

  assert.equal((page.match(/class="company-logo"/g) || []).length, 4);
  for (const [file, alt] of logos) {
    assert.match(page, new RegExp(`src="assets/images/${file}"[^>]*alt="${alt}"`));
    const info = await stat(new URL(`../assets/images/${file}`, import.meta.url));
    assert.ok(info.size > 100, `${file} should contain a real company logo`);
  }
});

test('contact close uses the approved invitation and direct channels only', () => {
  assert.match(page, /Nếu doanh nghiệp của bạn cần biến chiến lược Customer Growth thành một bộ máy có thể vận hành, chúng ta nên trao đổi\./);
  assert.doesNotMatch(page, /<form\b/i);
});

test('mobile navigation is a labelled native disclosure with progressive closing', () => {
  assert.match(page, /<details[^>]*open[^>]*data-nav-disclosure/);
  assert.match(page, /<summary[^>]*data-menu-toggle[^>]*>Menu<\/summary>/);
  assert.match(page, /<nav id="primary-navigation"[^>]*data-primary-nav/);
  assert.match(script, /navDisclosure\.removeAttribute\('open'\)/);
  assert.match(script, /event\.key === 'Escape'/);
  assert.match(script, /link\.addEventListener\('click'/);
});

test('homepage chapters follow the approved ten-part reading path', () => {
  const ids = ['hero', 'manifesto', 'impact', 'solutions', 'operating-system', 'case-studies', 'ai-lab', 'leadership', 'experience', 'contact'];
  const positions = ids.map((id) => page.indexOf(`id="${id}"`));
  assert.ok(positions.every((position) => position > -1));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
});

test('core content stays readable without script and motion is optional', () => {
  assert.match(page, /<details[^>]*open[^>]*data-nav-disclosure/);
  assert.doesNotMatch(page, /hidden[^>]*data-primary-nav/);
  assert.match(css, /html\.js-ready\s+\.reveal/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /scroll-padding-top/);
  assert.match(css, /@media\s*\(max-width:\s*768px\)/);
});

test('homepage identifiers, headings, and images remain accessible', () => {
  const ids = [...page.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal((page.match(/<h1\b/g) || []).length, 1);
  for (const image of page.matchAll(/<img\b[^>]*>/g)) {
    assert.match(image[0], /alt="[^"]+"/);
    assert.match(image[0], /width="\d+"[^>]*height="\d+"/);
  }
  assert.doesNotMatch(page, /target="_blank"(?![^>]*rel="noopener noreferrer")/);
});

export { css, page, script };
