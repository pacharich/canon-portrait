// =====================================================================
//  キヤノン株式会社 様｜製品開発検討用ポートレート撮影
//  モデル候補資料（叩き台 / 2026年9月版）
//  ※ プロフィール・写真・動画は情報待ち。届き次第、各モデルの値を差し替える。
// =====================================================================

// ============ 撮影候補日 / 出演可能日 ============
// 本撮影：2026/9/28（月）　予備：9/29（火）・9/30（水）のいずれか1日
// 各モデルの可否は情報待ちのため、いったん全員 pending（未定）で表示。
const SCHEDULE_DATES = ['9/28（月）', '9/29（火）', '9/30（水）'];
const AVAILABILITY = {
  yui:    [{ date: '9/28（月）本撮影', status: 'pending' }, { date: '9/29（火）予備', status: 'pending' }, { date: '9/30（水）予備', status: 'pending' }],
  moka:   [{ date: '9/28（月）本撮影', status: 'pending' }, { date: '9/29（火）予備', status: 'pending' }, { date: '9/30（水）予備', status: 'pending' }],
  yurina: [{ date: '9/28（月）本撮影', status: 'pending' }, { date: '9/29（火）予備', status: 'pending' }, { date: '9/30（水）予備', status: 'pending' }],
  miki:   [{ date: '9/28（月）本撮影', status: 'pending' }, { date: '9/29（火）予備', status: 'pending' }, { date: '9/30（水）予備', status: 'pending' }],
};

const PLACEHOLDER = '情報待ち';
const NA = '—';

// ============ Model Data ============
// 候補モデル 女性4名（ユイ／モカ／ゆりな／みき）
// 【叩き台】プロフィール詳細は今夜共有予定 → 数値・実績を後から差し替え。
const FEMALES = [
  // 1. ユイ（前回「アコールローリエ」案件の「ゆい」と同一プロフィール／動画／出演実績をベースに反映。
  //    名称のみ ゆい→ユイ。※写真・動画実績・出演実績は今後 少々追加・修正予定）
  {
    id: 'yui', name: 'ユイ', age: 26,
    height: 157.8, size: NA, shoe: null, exp: NA, location: '東京都板橋区',
    extra: [['体重', '43kg']],
    videos: ['https://youtube.com/shorts/flXNOUvtkCw'],
    achievementTitle: '出演実績',
    achievements: [
      'CanCam兼andGIRL 読者モデル', '東京プリンスホテル様／SNS広告', 'オーマイティース様／SNS広告',
      '株式会社タップル様／SNS広告', 'JR東海様／SNS広告', '長谷工ジョブクリエイト様／SNS広告・LP・HP',
      'しまむら様／SNS広告・紙チラシ・店頭POP', '東京カレンダー様／SNS広告', 'nouvelle様／SNS広告',
      'ディープラス様／SNS広告', '3rd inc.様／SNS広告・LP', 'HBL様／SNS広告・LP',
      '花王様（suisai）／SNS広告・ドンキホーテサイネージ・LP', 'ルミネ様／SNS広告', 'シャドテン様／SNS広告',
      'freee様／SNS広告', 'PATRIC様／SNS広告', 'ユンス様／SNS広告', 'ロペピクニック様／SNS広告', 'オルビス様／SNS広告'
    ]
  },
  // 2. モカ（プロフィール別途共有 → 情報待ち）
  {
    id: 'moka', name: 'モカ', age: PLACEHOLDER,
    height: PLACEHOLDER, size: PLACEHOLDER,
    shoe: null, exp: NA, location: PLACEHOLDER,
    videos: [],
    achievementTitle: '出演実績',
    achievements: ['情報待ち（プロフィール・実績が届き次第、記載）'],
  },
  // 3. ユリナ（前回「アコールローリエ」案件の「ゆりな」と同一プロフィール／動画／実績をベースに反映。
  //    名称のみ ゆりな→ユリナ）
  {
    id: 'yurina', name: 'ユリナ', age: 24,
    height: 168, size: NA, shoe: null, exp: NA, location: '東京都（兵庫県神戸市出身）',
    extra: [['体重', '45kg']],
    videos: ['https://youtu.be/anvPe6D9MTY'],
    achievementTitle: '実績',
    achievements: ['wabiwasou', 'platinum dress style', 'studio arc', 'faccie ウェディング', 'FORTE BRIDAL']
  },
  // 4. ミキ（プロフィール別途共有 → 情報待ち）
  {
    id: 'miki', name: 'ミキ', age: PLACEHOLDER,
    height: PLACEHOLDER, size: PLACEHOLDER,
    shoe: null, exp: NA, location: PLACEHOLDER,
    videos: [],
    achievementTitle: '出演実績',
    achievements: ['情報待ち（プロフィール・実績が届き次第、記載）'],
  },
];

// 本案件は女性モデルのみ。区分（新郎役等）は無いため空配列。
const MALES = [];

// 番号ラベルの接頭辞（旧テンプレートの「新婦役／新郎役」に代わる中立表記）
const NUM_PREFIX = 'MODEL ';

let currentTab = 'female';
let lbList = FEMALES;
let lbIdx = 0;
let lbShot = 0;

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

function getPhotos(m) {
  const genderKey = currentTab === 'female' ? 'female' : 'male';
  return (typeof PHOTO_DATA !== 'undefined' && PHOTO_DATA[genderKey] && PHOTO_DATA[genderKey][m.id]) || [];
}
function photoSrc(photo) { return 'data:image/jpeg;base64,' + photo.b64; }

function ytId(url) {
  const m = String(url).match(/(?:shorts\/|youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : '';
}
function heightDisp(h) { return typeof h === 'number' ? h + 'cm' : h; }
function ageDisp(a)    { return typeof a === 'number' ? a + '歳' : a; }
function expDisp(e)    { return typeof e === 'number' ? e + '年' : (e != null ? e : '—'); }

// ============ Grid render ============
function buildCard(m, i, gender) {
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.id = m.id;

  const numLabel = NUM_PREFIX + String(i + 1).padStart(2, '0');
  const savedTab = currentTab;
  currentTab = gender;
  const photos = getPhotos(m);
  currentTab = savedTab;
  const firstPhoto = photos[0];
  const photoCountLabel = photos.length ? photos.length + '枚' : '写真情報待ち';

  card.innerHTML = `
    <div class="card-photo">
      ${firstPhoto
        ? `<img class="card-img" src="${photoSrc(firstPhoto)}" alt="${m.name}" loading="lazy">`
        : '<div class="card-img-empty"></div>'}
      <span class="card-no">${numLabel}</span>
      <span class="card-photocount">${photoCountLabel}</span>
    </div>
    <div class="card-body">
      <div class="card-name">
        <span class="nm">${m.name}</span>
        <span class="age">${ageDisp(m.age)}</span>
      </div>
      <div class="card-loc">${m.location}</div>
      <div class="card-stat">
        <span><span class="l">身長</span>${heightDisp(m.height)}</span>
      </div>
      ${m.cardNote ? `<div class="card-note">${m.cardNote}</div>` : ''}
    </div>
  `;
  card.addEventListener('click', () => {
    currentTab = gender;
    lbList = gender === 'female' ? FEMALES : MALES;
    openLightbox(i);
  });
  return card;
}

function renderAllGrids() {
  const gf = $('#gridFemale');
  const gm = $('#gridMale');
  if (gf) { gf.innerHTML = ''; FEMALES.forEach((m, i) => gf.appendChild(buildCard(m, i, 'female'))); }
  if (gm) { gm.innerHTML = ''; MALES.forEach((m, i)   => gm.appendChild(buildCard(m, i, 'male'))); }
}

// ============ Lightbox ============
const lb = $('#lb');

function openLightbox(idx) {
  lbList = currentTab === 'female' ? FEMALES : MALES;
  lbIdx = idx;
  lbShot = 0;
  renderLightbox();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

function renderLightbox() {
  const m = lbList[lbIdx];
  const numLabel = NUM_PREFIX + String(lbIdx + 1).padStart(2, '0');
  const photos = getPhotos(m);
  const photo = photos[lbShot];

  const main = $('#lbMain');
  main.innerHTML = '';
  if (photo) {
    const img = document.createElement('img');
    img.src = photoSrc(photo);
    img.alt = m.name;
    img.className = lbShot === 0 ? 'lb-img-cover' : 'lb-img-natural';
    main.appendChild(img);
  } else {
    main.innerHTML = '<div style="color:rgba(255,255,255,.4);font-size:13px;letter-spacing:.1em;">写真情報待ち</div>';
  }

  const strip = $('#lbStrip');
  strip.innerHTML = '';
  photos.forEach((p, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'lb-thumb' + (i === lbShot ? ' active' : '');
    const tImg = document.createElement('img');
    tImg.src = photoSrc(p);
    tImg.alt = String(i + 1).padStart(2, '0');
    thumb.appendChild(tImg);
    const no = document.createElement('span');
    no.className = 'lb-thumb-no';
    no.textContent = String(i + 1).padStart(2, '0');
    thumb.appendChild(no);
    thumb.addEventListener('click', () => { lbShot = i; renderLightbox(); });
    strip.appendChild(thumb);
  });

  $('#lbId').innerHTML = photos.length
    ? `<span class="accent">${numLabel}</span>&nbsp;／&nbsp;<strong>${String(lbShot + 1).padStart(2, '0')}</strong> / ${photos.length}枚`
    : `<span class="accent">${numLabel}</span>&nbsp;／&nbsp;写真情報待ち`;

  $('#lbName').innerHTML = typeof m.age === 'number'
    ? `${m.name} <span class="age">${m.age}歳</span>` : `${m.name}`;
  $('#lbLoc').textContent = m.location;
  $('#lbHeight').textContent = m.height;
  $('#lbHeightUnit').style.display = typeof m.height === 'number' ? '' : 'none';
  $('#lbAge').textContent = m.age;
  $('#lbAgeUnit').textContent = typeof m.age === 'number' ? '歳' : '';
  $('#lbSize').textContent = m.size;
  $('#lbLocSpec').textContent = m.location;

  const specShoe = $('#specShoe');
  if (m.shoe) { specShoe.style.display = ''; $('#lbShoe').textContent = m.shoe; }
  else { specShoe.style.display = 'none'; }

  $('#specExp').style.display = 'none';

  const specHair = $('#specHair'), specEye = $('#specEye'), specClothes = $('#specClothes');
  if (m.hairColor) { specHair.style.display = ''; $('#lbHair').textContent = m.hairColor; } else { specHair.style.display = 'none'; }
  if (m.eyeColor)  { specEye.style.display = '';  $('#lbEye').textContent = m.eyeColor; }  else { specEye.style.display = 'none'; }
  if (m.clothesSize) { specClothes.style.display = ''; $('#lbClothes').textContent = m.clothesSize; } else { specClothes.style.display = 'none'; }

  // 追加プロフィール項目（体重・運転免許・利き手・ピアス等）
  document.querySelectorAll('.spec.extra-spec').forEach(e => e.remove());
  const specsBox = document.querySelector('.specs');
  (m.extra || []).forEach(([label, val]) => {
    const d = document.createElement('div');
    d.className = 'spec extra-spec';
    d.innerHTML = `<div class="spec-l">${label}</div><div class="spec-v">${val}</div>`;
    specsBox.appendChild(d);
  });

  // イメージ動画（specsの直後に表示）
  document.querySelectorAll('.lb-videos').forEach(e => e.remove());
  if (m.videos && m.videos.length) {
    const box = document.createElement('div');
    box.className = 'lb-videos';
    box.style.cssText = 'margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,.1);';
    box.innerHTML =
      '<div style="font-family:var(--mono);font-size:10px;letter-spacing:.16em;color:var(--accent);margin-bottom:12px;text-transform:uppercase;font-weight:600;">MOVIE ／ イメージ動画</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:12px;">' +
      m.videos.map(u => {
        const id = ytId(u);
        return `<div style="position:relative;width:200px;max-width:100%;aspect-ratio:9/16;border-radius:8px;overflow:hidden;background:#000;">
          <iframe src="https://www.youtube.com/embed/${id}" title="イメージ動画" loading="lazy"
            allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen
            style="position:absolute;inset:0;width:100%;height:100%;border:0;"></iframe>
        </div>`;
      }).join('') +
      '</div>';
    const specsEl = document.querySelector('.specs');
    specsEl.parentNode.insertBefore(box, specsEl.nextSibling);
  }

  const avail = AVAILABILITY[m.id] || [];
  const schedSection = $('#lbSchedule');
  if (avail.length) {
    schedSection.style.display = '';
    $('#lbScheduleCards').innerHTML = avail.map(d => {
      const cls   = d.status === 'ok' ? 'avail-ok' : d.status === 'ng' ? 'avail-ng' : 'avail-pending';
      const badge = d.status === 'ok' ? '○' : d.status === 'ng' ? '✕' : '－';
      const label = d.status === 'ok' ? '出演可' : d.status === 'ng' ? '出演不可' : '未定';
      return `<div class="avail-card ${cls}"><span class="avail-date">${d.date}</span><span class="avail-badge">${badge}</span><span class="avail-label">${label}</span></div>`;
    }).join('');
  } else { schedSection.style.display = 'none'; }

  const achSection = $('#lbAchievements');
  if (m.achievementSections && m.achievementSections.length) {
    achSection.style.display = '';
    $('#lbAchTitle').textContent = m.achievementTitle || '活動実績';
    $('#lbAchList').innerHTML = m.achievementSections.map(sec => `
      <li class="ach-section-title">${sec.title}</li>
      ${sec.items.map(a => `<li>${a}</li>`).join('')}`).join('');
  } else if (m.achievements && m.achievements.length) {
    achSection.style.display = '';
    $('#lbAchTitle').textContent = m.achievementTitle || '実績';
    const noteHtml = m.achievementNote ? `<li class="ach-note">${m.achievementNote}</li>` : '';
    $('#lbAchList').innerHTML = noteHtml + m.achievements.map(a => `<li>${a}</li>`).join('');
  } else { achSection.style.display = 'none'; }

  // 競合などの注意事項（枠で強調）
  document.querySelectorAll('.lb-warning-box').forEach(e => e.remove());
  if (m.warning) {
    const box = document.createElement('div');
    box.className = 'lb-warning-box';
    box.style.cssText = 'margin-top:22px;padding:16px 18px;border:1.5px solid var(--accent);border-radius:8px;background:rgba(196,69,45,.14);';
    box.innerHTML =
      `<div style="display:flex;align-items:center;gap:8px;font-weight:700;color:#ff9b86;font-size:13px;letter-spacing:.03em;margin-bottom:10px;">
         <span style="flex-shrink:0;width:18px;height:18px;border-radius:50%;background:var(--accent);color:#fff;font-size:12px;display:flex;align-items:center;justify-content:center;">!</span>
         ${m.warning.title}
       </div>` +
      m.warning.body.map(t => `<p style="margin:0 0 8px;font-size:12px;line-height:1.75;color:rgba(255,255,255,.88);">${t}</p>`).join('');
    const btns = document.querySelector('.lb-actions-bottom');
    btns.parentNode.insertBefore(box, btns);
  }

  $('#lbPrev').disabled = lbIdx === 0;
  $('#lbNext').disabled = lbIdx === lbList.length - 1;
}

$('#lbPrev').addEventListener('click', () => { if (lbIdx > 0) { lbIdx--; lbShot = 0; renderLightbox(); } });
$('#lbNext').addEventListener('click', () => { if (lbIdx < lbList.length - 1) { lbIdx++; lbShot = 0; renderLightbox(); } });
$('#lbClose').addEventListener('click', closeLightbox);
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft'  && !$('#lbPrev').disabled) { lbIdx--; lbShot = 0; renderLightbox(); }
  if (e.key === 'ArrowRight' && !$('#lbNext').disabled) { lbIdx++; lbShot = 0; renderLightbox(); }
  if (e.key === 'ArrowUp')   { e.preventDefault(); if (lbShot > 0) { lbShot--; renderLightbox(); } }
  if (e.key === 'ArrowDown') { e.preventDefault(); const ph = getPhotos(lbList[lbIdx]); if (lbShot < ph.length - 1) { lbShot++; renderLightbox(); } }
});

renderAllGrids();
