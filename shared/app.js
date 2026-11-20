/* Sophie & Mohsey in Vietnam — app logic. All prices live in data.js. */
(function () {
  'use strict';
  const T = window.TRIP, M = T.meta, HUB = M.hub;
  const PFX = M.key === 'vietnam' ? 'smv.' : 'trip.' + M.key + '.';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const eur = n => '€' + Math.round(n).toLocaleString('en-US');
  const hrs = h => (Math.round(h * 2) / 2) + ' h';
  const PRINT = new URLSearchParams(location.search).has('print');

  const CATS = [
    { k: 'intl', n: 'International flights', c: 'var(--s1)' },
    { k: 'inter', n: 'Travel between places', c: 'var(--s2)' },
    { k: 'hotel', n: 'Hotels', c: 'var(--s3)' },
    { k: 'food', n: 'Food & drinks', c: 'var(--s4)' },
    { k: 'local', n: 'Taxis & local transport', c: 'var(--s5)' },
    { k: 'acts', n: 'Activities', c: 'var(--s6)' },
    { k: 'shop', n: 'Shopping', c: 'var(--s7)' },
    { k: 'fixed', n: 'Visa, insurance, SIM', c: 'var(--s8)' },
    { k: 'reserve', n: 'Reserve (buffer)', c: 'var(--neutral)' }
  ];
  const LEVELS = { low: 'Lucky / best case', typ: 'Typical', high: 'Peak / worst case' };
  const HOTEL_LVLS = { budget: 'Simple 3★', mid: 'Good 3–4★', nice: 'Nice 4–5★' };
  const FOOD_LVLS = { local: 'Street food only', mixed: 'Mostly local', tourist: 'Restaurants & resort' };

  /* ---------- dates ---------- */
  const DEF0 = M.d0, DEF1 = M.d1, isoOk = x => /^\d{4}-\d{2}-\d{2}$/.test(x || '') && !isNaN(Date.parse(x));
  const lsGet = (k, d) => { try { const v = JSON.parse(localStorage.getItem(PFX + k)); return isoOk(v) ? v : d; } catch (e) { return d; } };
  let d0 = lsGet('d0', DEF0), d1 = lsGet('d1', DEF1);
  const nightsBetween = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5);
  if (nightsBetween(d0, d1) < 3 || nightsBetween(d0, d1) > 30) { d0 = DEF0; d1 = DEF1; }
  let tripN = nightsBetween(d0, d1);
  const isoAdd = (iso, n) => new Date(Date.parse(iso) + n * 864e5).toISOString().slice(0, 10);
  const fmtD = off => new Date(Date.parse(d0) + off * 864e5).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
  const isPeak = idx => { const x = isoAdd(d0, idx); return x >= T.meta.peak.from && x <= T.meta.peak.to; };

  /* ---------- own prices (overrides) ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(PFX + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(PFX + k, JSON.stringify(v)); if (SYNC_KEYS.includes(k)) { localStorage.setItem('smv.ts', String(Date.now())); schedulePush(); } } catch (e) { } }
  };
  /* ---------- shared state (both travellers see the same choices) ---------- */
  const SYNC_KEYS = ['calc', 'ov', 'hsel', 'hprice', 'hconf', 'offers', 'ofp', 'fx', 'myh', 'gf', 'd0', 'd1', 'picked', 'todo'];
  const API = '/api/state?trip=' + encodeURIComponent(M.key);
  let syncOn = false, pushT = null;
  const localTs = () => { try { return +localStorage.getItem('smv.ts') || 0; } catch (e) { return 0; } };
  const syncStatus = (txt, cls) => { const el = document.getElementById('sync'); if (el) { el.textContent = txt; el.className = 'sync ' + cls; } };
  function schedulePush() { if (!syncOn) return; clearTimeout(pushT); syncStatus('☁ saving…', 'busy'); pushT = setTimeout(push, 900); }
  async function push() {
    pushT = null; const data = {};
    try { SYNC_KEYS.forEach(k => { const v = localStorage.getItem(PFX + k); if (v != null) data[k] = v; }); } catch (e) { return; }
    try { const r = await fetch(API, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ts: localTs(), data }) }); if (!r.ok) throw 0; syncStatus('☁ Shared · saved for both of you', 'on'); }
    catch (e) { syncStatus('⚠ Could not save online — kept on this device', 'off'); }
  }
  async function pull(first) {
    if (location.protocol === 'file:' || PRINT) return;
    try {
      const r = await fetch(API, { cache: 'no-store' }); if (!r.ok) throw 0; const j = await r.json(); syncOn = true;
      const lts = localTs();
      if (j && typeof j.ts === 'number' && j.data && j.ts > lts) {
        if (pushT) return; const a = document.activeElement;
        if (!first && a && /INPUT|SELECT|TEXTAREA/.test(a.tagName)) return;
        SYNC_KEYS.forEach(k => { if (typeof j.data[k] === 'string') localStorage.setItem(PFX + k, j.data[k]); else localStorage.removeItem(PFX + k); });
        localStorage.setItem('smv.ts', String(j.ts)); location.reload(); return;
      }
      if (lts && (!j || lts > j.ts)) push(); else syncStatus('☁ Shared · both of you see the same choices', 'on');
    } catch (e) { syncOn = false; syncStatus('💾 Saved on this device only', 'off'); }
  }
  let ov = store.get('ov', {});
  let useOv = true;
  const has = k => useOv && typeof ov[k] === 'number';
  const pr = (k, def) => has(k) ? ov[k] : def;
  const mine = k => has(k) ? ' ★ your own price.' : '';
  let gf = store.get('gf', null); if (!T.flights.some(f => f.id === gf)) gf = T.meta.bestFlight;
  function scaleStops(stops, n) {
    const st = stops.map(x => ({ place: x.place, nights: x.nights })); let tot = st.reduce((a, x) => a + x.nights, 0);
    const big = () => { let i = 0; st.forEach((x, k) => { if (x.nights > st[i].nights) i = k; }); return i; };
    while (tot > n) { st[big()].nights--; tot--; } while (tot < n) { st[big()].nights++; tot++; }
    let out = st.filter(x => x.nights > 0);
    while (out.length > 1 && out.some(x => x.nights < 2)) { const i = out.findIndex(x => x.nights < 2), n = out[i].nights; out.splice(i, 1); let b = 0; out.forEach((x, k) => { if (x.nights > out[b].nights) b = k; }); out[b].nights += n; }
    return out;
  }

  /* ---------- model ---------- */
  const legKey = (a, b) => [a, b].sort().join('|');
  const legOptions = (a, b) => T.legs[legKey(a, b)] || [T.genericLeg];

  function cfgFromScenario(s) {
    return {
      name: s.id === 'custom' ? 'Our own plan' : s.id + ' · ' + s.title, base: s.id,
      stops: scaleStops(s.stops, tripN), openJaw: s.openJaw || null,
      hotelLvl: 'mid', foodLvl: 'mixed',
      legMode: Object.assign({}, s.legMode || {}),
      acts: [...s.acts], shopping: T.meta.shopping, reservePct: T.meta.reservePct,
      visa: T.meta.visaDefault, insurance: true, sim: true, peak: true, gala: !!s.gala
    };
  }

  function compute(cfg, lvlOverride, flightOverride) {
    const P = T.places;
    const f0 = T.flights.find(x => x.id === (flightOverride || gf)) || T.flights[0];
    const level = lvlOverride || 'typ';
    const own = has('flightown') && !flightOverride, dep = cfg.openJaw && T.places[cfg.openJaw] ? cfg.openJaw : HUB;
    const ojx = dep !== HUB ? (T.meta.openJaw[dep] || 0) : 0;
    const f = Object.assign({}, f0, { arr: HUB, dep }, own ? { airline: 'Our own flight price' } : {});
    const lines = {}; CATS.forEach(c => lines[c.k] = []);
    const add = (k, label, amt, note, src) => lines[k].push({ label, amt, note, src });

    const fk = 'flight:' + f0.id, base = own ? ov.flightown : pr(fk, f0.pp[level]), pp = base + ojx;
    add('intl', own ? 'Our own flight price' : `${f0.airline} · ${M.home} ⇄ ${T.places[HUB].short}`, pp * 2,
      `${eur(base)} per person return × 2 — ${own ? '★ the price you typed in' : has(fk) ? '★ your own price' : LEVELS[level].toLowerCase() + ' estimate'}.${ojx ? ` Plus about ${eur(ojx)} each for flying home from ${T.places[dep].short} instead of ${T.places[HUB].short} (estimate).` : ''} ${own ? '' : (f0.bag || '') + ' ' + (f0.note || '')}`, f0.src);

    const stops = cfg.stops.filter(s => s.nights > 0);
    let night = 0, hStops = 0, hConf = 0; const timeline = [];
    stops.forEach(s => {
      const p = P[s.place];
      const hk = 'hotel:' + s.place, rate = pr(hk, p.hotel[cfg.hotelLvl]);
      const a0 = isoAdd(d0, night), b0 = isoAdd(d0, night + s.nights), selH = useOv && hsel[s.place] ? findHotel(s.place, hsel[s.place]) : null, st = staysOf(selH)[0], cf0 = selH && hconf[selH.id];
      const cf = cf0 && cf0.a === a0 && cf0.b === b0 ? cf0 : (stayFor(selH, a0, b0) || cf0);
      hStops++;
      if (cf && cf.a === a0 && cf.b === b0 && typeof cf.total === 'number') {
        hConf++;
        add('hotel', `${p.name} · ${s.nights} night${s.nights > 1 ? 's' : ''} · ${selH.name}`, cf.total, `★ Real price: the total we typed in for ${selH.name} for exactly these nights (${eur(cf.total / s.nights)} a night).`, p.src);
      } else {
        let peakN = 0; if (cfg.peak && (!has(hk) || selH) && !st) for (let n = night; n < night + s.nights; n++) if (isPeak(n)) peakN++;
        const normN = s.nights - peakN;
        const amt = normN * rate + peakN * rate * p.peakMult;
        add('hotel', `${p.name} · ${s.nights} night${s.nights > 1 ? 's' : ''}${selH ? ' · ' + selH.name : ''}`, amt,
          'Estimate, not a real price for these nights: ' + (normN ? `${normN} × ${eur(rate)}` : '') + (peakN ? `${normN ? ' + ' : ''}${peakN} New-Year night${peakN > 1 ? 's' : ''} × ${eur(rate * p.peakMult)}` : '') + ` · ${selH ? 'the price we saw for ' + selH.name + ' on other dates' : has(hk) ? '★ your own price for every night' : HOTEL_LVLS[cfg.hotelLvl] + ', typical price'}. Type the Booking total on the Hotels page to make it real. ${p.hotelNote || ''}`, p.src);
      }
      const fr = pr('food:' + s.place, p.food[cfg.foodLvl]);
      add('food', `${p.name} · ${s.nights} day${s.nights > 1 ? 's' : ''}`, s.nights * fr, `${s.nights} × ${eur(fr)} for two per day.${mine('food:' + s.place)} ${p.foodNote || ''}`, p.src);
      const lp = pr('local:' + s.place, p.localPerDay);
      add('local', `${p.name} · ${s.nights} day${s.nights > 1 ? 's' : ''}`, s.nights * lp, `${s.nights} × ${eur(lp)} per day.${mine('local:' + s.place)} ${p.localNote || ''}`, p.src);
      timeline.push({ place: s.place, nights: s.nights, from: night, to: night + s.nights });
      night += s.nights;
    });

    const path = [f.arr, ...stops.map(s => s.place), f.dep];
    const legs = []; let transitH = 0, hassle = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i], b = path[i + 1]; if (a === b) continue;
      const opts = legOptions(a, b);
      const o0 = opts.find(x => x.id === cfg.legMode[legKey(a, b)]) || opts[0];
      const lk = 'leg:' + legKey(a, b) + ':' + o0.id, o = Object.assign({}, o0, { pp: pr(lk, o0.pp) });
      add('inter', `${P[a].short} → ${P[b].short} · ${o.label}`, o.pp * 2, `${eur(o.pp)} per person × 2 · about ${hrs(o.hours)} door to door.${mine(lk)} ${o.note || ''}`, o.src);
      legs.push({ a, b, o, opts, after: i - 1 }); transitH += o.hours; hassle += o.hassle;
    }

    const here = new Set(stops.map(s => s.place));
    T.activities.forEach(a => { if (cfg.acts.includes(a.id) && here.has(a.place)) add('acts', a.name, pr('act:' + a.id, a.for2), (a.note || '') + mine('act:' + a.id), a.src); });
    if (cfg.gala && M.galaPlace && here.has(M.galaPlace)) add('acts', T.fixed.gala.label, pr('fixed:gala', T.fixed.gala.for2), T.fixed.gala.note + mine('fixed:gala'), T.fixed.gala.src);
    add('shop', 'Souvenirs, clothes, gifts', cfg.shopping, 'Your own allowance — entirely optional.');
    ['visa', 'insurance', 'sim'].forEach(k => { if (cfg[k]) add('fixed', T.fixed[k].label, pr('fixed:' + k, T.fixed[k].for2), (T.fixed[k].note || '') + mine('fixed:' + k), T.fixed[k].src); });

    const cats = {}; let sub = 0;
    CATS.forEach(c => { cats[c.k] = lines[c.k].reduce((s, l) => s + l.amt, 0); sub += cats[c.k]; });
    const reserve = sub * cfg.reservePct / 100;
    lines.reserve.push({ label: `${cfg.reservePct}% buffer for surprises`, amt: reserve, note: 'Delays, a doctor visit, a taxi you did not plan, price rises between now and booking.' });
    cats.reserve = reserve;
    const beachNights = stops.filter(s => P[s.place].beach).reduce((s, x) => s + x.nights, 0);
    return {
      total: sub + reserve, cats, lines, flight: f, legs, timeline,
      m: { hStops, hConf, flightReal: own, nights: night, beachNights, moves: stops.length, transitH, hassle: hassle + Math.max(0, stops.length - 1), intlH: f.durOut + f.durBack, stopsIntl: f.stops }
    };
  }

  /* ---------- state ---------- */
  const scen = id => T.scenarios.find(s => s.id === id);
  let calc = null;
  try { if (location.hash.startsWith('#plan=')) { const sh = JSON.parse(decodeURIComponent(escape(atob(location.hash.slice(6))))); calc = sh.calc; if (sh.ov) { ov = sh.ov; store.set('ov', ov); } window.__sh = sh; if (sh.gf) store.set('gf', sh.gf); if (isoOk(sh.d0) && isoOk(sh.d1)) { store.set('d0', sh.d0); store.set('d1', sh.d1); } } } catch (e) { calc = null; }
  if (calc && (!Array.isArray(calc.stops) || !Array.isArray(calc.acts))) calc = null;
  const sharedPlan = !!calc;
  if (!calc) calc = store.get('calc', null);
  if (!calc || !Array.isArray(calc.stops)) calc = cfgFromScenario(scen(T.meta.recommended));
  calc.legMode = calc.legMode || {};
  // a saved plan that still names a route follows that route's current definition
  if (calc.base !== 'custom' && scen(calc.base)) { const sc = scen(calc.base), want = scaleStops(sc.stops, tripN); if (JSON.stringify(want) !== JSON.stringify(calc.stops)) { calc.stops = want; calc.openJaw = sc.openJaw || null; store.set('calc', calc); } }
  let mood = 'typ';
  let compareSel = store.get('cmp', T.scenarios.map(s => s.id).concat('mine'));
  const views = {};

  /* ---------- small UI helpers ---------- */
  const srcLinks = src => (src && src.length) ? `<span class="srcs">Source: ${src.map(s => `<a href="${esc(s.u)}" target="_blank" rel="noopener">${esc(s.t)}</a>`).join(' · ')}</span>` : '';
  const pill = (txt, cls = '') => `<span class="pill ${cls}">${esc(txt)}</span>`;
  function budgetBadge(total) {
    const { budgetMin: a, budgetMax: b } = T.meta;
    if (total <= b) return `<span class="status good">✓ ${total < a ? 'under budget' : 'within budget'}</span>`;
    if (total <= b * 1.06) return `<span class="status warn">▲ ${eur(total - b)} over</span>`;
    return `<span class="status bad">✕ ${eur(total - b)} over</span>`;
  }
  const dots = (n, max = 5) => `<span class="dots" aria-label="${n} of ${max}">${'●'.repeat(n)}<i>${'●'.repeat(Math.max(0, max - n))}</i></span>`;
  const toggle = (id, a = 'Details', b = 'Show it visual') => `<div class="seg" role="tablist" data-view="${id}">
      <button data-v="d" class="${views[id] === 'v' ? '' : 'on'}">☰ ${a}</button><button data-v="v" class="${views[id] === 'v' ? 'on' : ''}">📊 ${b}</button></div>`;
  const showV = id => PRINT || views[id] === 'v';
  const showD = id => PRINT || views[id] !== 'v';

  /* ---------- charts (HTML bars) ---------- */
  function legend(cats) { return `<div class="legend">${cats.map(c => `<span><i style="background:${c.c}"></i>${esc(c.n)}</span>`).join('')}</div>`; }
  function barChart(rows, o = {}) {
    const max = o.max || Math.max(...rows.map(r => r.v), 1) * 1.12;
    const band = o.band ? `background-image:linear-gradient(to right,transparent ${o.band[0] / max * 100}%,var(--band) ${o.band[0] / max * 100}%,var(--band) ${o.band[1] / max * 100}%,transparent ${o.band[1] / max * 100}%)` : '';
    const ref = o.band ? `<span class="ref" style="left:${o.band[1] / max * 100}%"></span>` : '';
    return `<div class="bars">${rows.map(r => `<div class="bar-row${r.hl ? ' hl' : ''}"><div class="bar-label">${esc(r.label)}</div>
      <div class="bar-track" style="${band}" data-tip="${esc(r.tip || r.label + ': ' + (o.fmt || eur)(r.v))}" tabindex="0">${ref}
      <div class="bar-fill" style="width:${Math.max(0.5, r.v / max * 100)}%;background:${r.c || o.c || 'var(--s1)'}"></div><span class="bar-val">${esc((o.fmt || eur)(r.v))}${r.extra || ''}</span></div></div>`).join('')}
      ${o.band ? `<div class="bar-note"><i class="bandkey"></i> shaded = your ${eur(o.band[0])}–${eur(o.band[1])} budget · dashed line = ${eur(o.band[1])} ceiling</div>` : ''}</div>`;
  }
  function stackChart(rows, o = {}) {
    const max = (o.max || Math.max(...rows.map(r => r.total), 1)) * 1.14;
    const ref = o.ref ? `<span class="ref" style="left:${o.ref / max * 100}%"></span>` : '';
    return legend(CATS) + `<div class="bars">${rows.map(r => `<div class="bar-row"><div class="bar-label">${esc(r.label)}</div>
      <div class="bar-track">${ref}<div class="stack" style="width:${r.total / max * 100}%">${CATS.filter(c => r.cats[c.k] > 0).map(c =>
      `<span style="flex:${r.cats[c.k]};background:${c.c}" data-tip="${esc(r.label + ' — ' + c.n + ': ' + eur(r.cats[c.k]) + ' (' + Math.round(r.cats[c.k] / r.total * 100) + '%)')}" tabindex="0"></span>`).join('')}</div>
      <span class="bar-val">${eur(r.total)}</span></div></div>`).join('')}${o.ref ? `<div class="bar-note">dashed line = ${eur(o.ref)} ceiling · hover or tap a segment for its amount</div>` : ''}</div>`;
  }
  function rangeChart(rows, o = {}) {
    const max = Math.max(...rows.map(r => r.high)) * 1.1;
    return `<div class="bars">${rows.map(r => `<div class="bar-row"><div class="bar-label">${esc(r.label)}</div>
      <div class="bar-track" data-tip="${esc(`${r.label}: ${eur(r.low)} – ${eur(r.high)}, typical ${eur(r.typ)} ${o.unit || ''}`)}" tabindex="0">
      <div class="range" style="left:${r.low / max * 100}%;width:${(r.high - r.low) / max * 100}%;background:${r.c || 'var(--s1)'}"></div>
      <span class="dot" style="left:${r.typ / max * 100}%"></span><span class="bar-val" style="left:calc(${r.high / max * 100}% + 8px);position:absolute">${eur(r.typ)}</span></div></div>`).join('')}
      <div class="bar-note">bar = lucky-to-peak price range · ● = typical price ${o.unit || ''}</div></div>`;
  }
  function catBars(res) {
    return barChart(CATS.filter(c => res.cats[c.k] > 0).map(c => ({ label: c.n, v: res.cats[c.k], c: c.c, extra: ` <small>${Math.round(res.cats[c.k] / res.total * 100)}%</small>` })));
  }

  /* ---------- shared fragments ---------- */
  function timelineHTML(res) {
    const P = T.places; let h = '<ol class="tl">';
    const leg = l => `<li class="tl-leg"><span>${l.o.icon || '→'}</span> ${esc(P[l.a].short)} → ${esc(P[l.b].short)}: <b>${esc(l.o.label)}</b> · ${hrs(l.o.hours)} · ${eur(l.o.pp * 2)} for two</li>`;
    res.legs.filter(l => l.after < 0).forEach(l => h += leg(l));
    res.timeline.forEach((t, i) => {
      const p = P[t.place];
      h += `<li class="tl-stop"><span class="tl-emoji">${p.emoji}</span><div><b>${esc(p.name)}</b> <span class="muted">${fmtD(t.from)} – ${fmtD(t.to)}</span><br><span class="muted">${esc(p.blurb)}</span></div><span class="tl-n">${t.nights}<small> night${t.nights > 1 ? 's' : ''}</small></span></li>`;
      res.legs.filter(l => l.after === i).forEach(l => h += leg(l));
    });
    return h + '</ol>';
  }
  function linesHTML(res) {
    return `<div class="lines">${CATS.filter(c => res.cats[c.k] > 0).map(c => `<details class="line"><summary><i style="background:${c.c}"></i><span>${esc(c.n)}</span><b>${eur(res.cats[c.k])}</b></summary>
      <div class="line-body">${res.lines[c.k].map(l => `<div class="sub"><div><b>${esc(l.label)}</b><span>${eur(l.amt)}</span></div><p>${esc(l.note || '')} ${srcLinks(l.src)}</p></div>`).join('')}</div></details>`).join('')}
      <div class="line total"><span>Total for both of you</span><b>${eur(res.total)}</b></div>
      <div class="line pp"><span>Per person</span><b>${eur(res.total / 2)}</b></div></div>`;
  }
  function tiles(res) {
    const m = res.m;
    return `<div class="tiles">
      <div class="tile"><small>Total for two</small><b>${eur(res.total)}</b>${budgetBadge(res.total)}</div>
      <div class="tile"><small>Beach nights</small><b>${m.beachNights}<span> / ${m.nights}</span></b></div>
      <div class="tile"><small>Hotel check-ins</small><b>${m.moves}</b></div>
      <div class="tile"><small>Travel inside the country</small><b>${hrs(m.transitH)}</b></div>
      <div class="tile"><small>Long-haul flights</small><b>${hrs(m.intlH)}</b><span class="muted">both ways, ${esc(res.flight.airline)}</span></div>
      <div class="tile"><small>Hassle score</small><b>${m.hassle}</b><span class="muted">lower = more relaxed</span></div></div>`;
  }

  /* ---------- ways to save ---------- */
  const SKIP_ACTS = M.skipActs || [];
  const cheapestFlight = () => T.flights.filter(x => !x.avoid).sort((a, b) => pr('flight:' + a.id, a.pp.typ) - pr('flight:' + b.id, b.pp.typ))[0];
  const SAVERS = [
    { id: 'flight', icon: '✈️', global: true, keys: [], t: () => 'Fly with ' + cheapestFlight().airline, d: 'The cheapest airline in our list — an estimate with longer layovers, so get a real quote first. Changes the flight for every route.', apply: () => { } },
    { id: 'hotel', icon: '🏨', keys: ['hotelLvl'], t: () => 'Simple, well-reviewed 3★ hotels', d: 'Clean room, good location, often still a pool — just fewer frills.', apply: c => { c.hotelLvl = 'budget'; } },
    { id: 'food', icon: '🍜', keys: ['foodLvl'], t: () => 'Street food for most meals', d: 'Street stalls and small family places are often the best food anyway; keep a couple of nice dinners.', apply: c => { c.foodLvl = 'local'; } },
    { id: 'gala', icon: '🥂', keys: ['gala'], t: () => 'Pick a hotel without a New-Year gala fee', d: 'Small hotels rarely charge one. Ask before booking.', apply: c => { c.gala = false; } },
    { id: 'peak', icon: '🎆', keys: ['stops'], t: () => 'Spend New Year in the city, beach afterwards', d: 'Moves your city nights to the start so the beach nights fall after the New-Year surcharge.', apply: c => { const city = c.stops.filter(x => !T.places[x.place].beach), beach = c.stops.filter(x => T.places[x.place].beach); if (!city.length || !beach.length) return; const hc = city.filter(x => x.place === HUB); if (!c.openJaw && hc.length && hc.reduce((n, x) => n + x.nights, 0) > 1) { const tot = city.reduce((a, x) => { const e = a.find(y => y.place === x.place); e ? e.nights += x.nights : a.push({ place: x.place, nights: x.nights }); return a; }, []); const h = tot.find(x => x.place === HUB); h.nights -= 1; c.stops = [...tot.filter(x => x.nights > 0), ...beach, { place: HUB, nights: 1 }]; } else c.stops = [...city, ...beach]; } },
    { id: 'legs', icon: '🚌', risky: true, keys: ['legMode'], t: () => 'Travel the cheapest way between places', d: 'Bus and ferry instead of flights and private cars. Much slower, and ferries can be cancelled in rough seas.', apply: c => { compute(c).legs.forEach(l => { const k = legKey(l.a, l.b); c.legMode[k] = [...l.opts].sort((a, b) => pr('leg:' + k + ':' + a.id, a.pp) - pr('leg:' + k + ':' + b.id, b.pp))[0].id; }); } },
    { id: 'acts', icon: '🎟', keys: ['acts'], t: () => 'Skip the pricey attractions', d: 'Drop the most expensive optional outings and keep the simple ones.', apply: c => { c.acts = c.acts.filter(a => !SKIP_ACTS.includes(a)); } },
    { id: 'shop', icon: '🛍', keys: ['shopping'], t: () => 'Shopping allowance down to €50', d: 'Souvenirs are cheap; bargain from about half the first price.', apply: c => { c.shopping = Math.min(c.shopping, 50); } },
    { id: 'ins', icon: '🩺', keys: ['insurance'], t: () => 'Use travel insurance you already have', d: 'Many credit cards and annual policies include it — check the cover is valid for this country and the whole trip.', apply: c => { c.insurance = false; } },
    { id: 'res', icon: '🧯', keys: ['reservePct'], t: () => 'Smaller safety buffer (3%)', d: 'Only sensible once flights and hotels are booked at fixed prices.', apply: c => { c.reservePct = Math.min(c.reservePct, 3); } }
  ];
  const clone = o => JSON.parse(JSON.stringify(o));
  function saverState(sv) {
    const active = !!(calc.undo && calc.undo[sv.id]);
    if (sv.global) return { saving: has('flightown') ? 0 : compute(calc).total - compute(calc, null, cheapestFlight().id).total, active };
    const c = clone(calc); sv.apply(c);
    return { saving: compute(calc).total - compute(c).total, active };
  }
  function toggleSaver(id) {
    const sv = SAVERS.find(x => x.id === id); if (!sv) return;
    calc.undo = calc.undo || {};
    if (sv.global) { if (calc.undo[id]) { gf = T.flights.some(f => f.id === calc.undo[id].gf) ? calc.undo[id].gf : T.meta.bestFlight; delete calc.undo[id]; } else { calc.undo[id] = { gf }; gf = cheapestFlight().id; } store.set('gf', gf); return; }
    if (calc.undo[id]) { Object.assign(calc, clone(calc.undo[id])); delete calc.undo[id]; }
    else { const before = {}; sv.keys.forEach(k => before[k] = clone(calc[k])); sv.apply(calc); calc.undo[id] = before; }
    calc.base = 'custom';
  }
  function saversHTML() {
    const rows = SAVERS.map(sv => ({ sv, st: saverState(sv) })).filter(x => x.st.active || x.st.saving > 0.5);
    const c = clone(calc); SAVERS.forEach(sv => { if (!sv.risky && !(calc.undo && calc.undo[sv.id])) sv.apply(c); });
    const all = compute(c, null, has('flightown') ? undefined : cheapestFlight().id).total, now = compute(calc).total;
    return `<div class="savers"><div class="head"><h3>💡 Ways to pay less</h3></div><p class="muted small">Tap one to switch it on and watch the total change. Tap again to undo.</p>
      ${rows.map(({ sv, st }) => `<button class="saver ${st.active ? 'on' : ''}" data-saver="${sv.id}" aria-pressed="${st.active}"><span class="sv-ico">${st.active ? '✓' : sv.icon}</span><span class="sv-txt"><b>${esc(sv.t(calc))}</b><small>${esc(sv.d)}</small></span><span class="sv-amt">${st.active ? 'on · undo' : '−' + eur(st.saving)}</span></button>`).join('') || '<p class="muted small">Nothing left to cut — this is the lean version.</p>'}
      ${now - all > 0.5 ? `<button class="btn small" data-saver="all">Switch on all the comfortable ones → ${eur(all)}</button>` : ''}
      <details class="moretips"><summary>More ways to save that the calculator cannot count</summary><ul class="pros">${(T.saveTips || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul></details></div>`;
  }

  /* ---------- hotels ---------- */
  let hconf = store.get('hconf', {}) || {};
  let hsel = store.get('hsel', {}), hprice = store.get('hprice', {}), myHotels = (store.get('myh', []) || []).filter(h => h && typeof h.name === 'string' && T.places[h.place]).map(h => Object.assign(h, { mine: true, url: /^https?:\/\//i.test(h.url || '') ? h.url : '' }));
  if (window.__sh) { const sh = window.__sh; if (sh.hsel) { hsel = sh.hsel; store.set('hsel', hsel); } if (sh.hprice) { hprice = sh.hprice; store.set('hprice', hprice); } if (Array.isArray(sh.myHotels)) { myHotels = sh.myHotels.filter(h => h && typeof h.name === 'string' && T.places[h.place]).map(h => Object.assign(h, { mine: true, url: /^https?:\/\//i.test(h.url || '') ? h.url : '' })); store.set('myh', myHotels); } }
  const slug = x => String(x).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const hotelsFor = k => ((T.hotels && T.hotels[k]) || []).map(h => Object.assign({ id: k + '-' + slug(h.name) }, h)).concat(myHotels.filter(h => h.place === k));
  const hPrice = h => typeof hprice[h.id] === 'number' ? hprice[h.id] : h.price;
  const findHotel = (k, id) => hotelsFor(k).find(h => h.id === id);
  function syncHotel(k) { const h = findHotel(k, hsel[k]); if (h && typeof hPrice(h) === 'number') ov['hotel:' + k] = hPrice(h); else { delete ov['hotel:' + k]; if (!h) delete hsel[k]; } store.set('ov', ov); store.set('hsel', hsel); }
  const staysOf = h => h ? (h.stays || (h.stay ? [h.stay] : [])) : [];
  const stayFor = (h, a, b) => staysOf(h).find(x => x.a === a && x.b === b) || null;
  function stayDates(k) { const t = compute(calc).timeline.find(x => x.place === k); return t ? { a: isoAdd(d0, t.from), b: isoAdd(d0, t.to), n: t.nights } : null; }
  function bookingUrl(q, k) { const sd = stayDates(k); return 'https://www.booking.com/searchresults.html?ss=' + encodeURIComponent(q) + (sd ? '&checkin=' + sd.a + '&checkout=' + sd.b : '') + '&group_adults=2&no_rooms=1'; }
  function hotelCard(h, k) {
    const on = hsel[k] === h.id, p = hPrice(h);
    return `<div class="card hotel ${on ? 'chosen' : ''}"><div class="tip-top">${pill(h.mine ? 'added by us' : ({ simple: 'simple · good value', good: 'good 3–4★', nice: 'nice 4–5★' }[h.tier] || h.tier), h.mine ? 'accent' : '')}<span class="status ${h.score ? 'good' : 'info'}">${h.score ? '★ ' + esc(h.score) : h.mine ? 'our own find' : 'score not seen'}</span></div>
      <h3>${esc(h.name)}</h3><p class="muted small">${esc(h.area || T.places[k].short)}${h.stars ? ' · ' + esc(h.stars) : ''}${h.breakfast ? ' · ' + esc(h.breakfast) : ''}</p>
      ${h.good ? `<ul class="pros"><li>${esc(h.good)}</li></ul>` : ''}${h.watch ? `<ul class="cons"><li>${esc(h.watch)}</li></ul>` : ''}
      ${(() => { const sd = stayDates(k), c0 = hconf[h.id], cf = sd && c0 && c0.a === sd.a && c0.b === sd.b ? c0 : (sd && stayFor(h, sd.a, sd.b) ? stayFor(h, sd.a, sd.b) : c0), real = sd && cf && cf.a === sd.a && cf.b === sd.b;
        const seen = typeof h.price === 'number' ? `<p class="muted small">On other dates we saw about ${eur(h.price)} a night${h.priceNote ? ' (' + esc(h.priceNote) + ')' : ''} — not a price for our nights.</p>` : '';
        if (PRINT) return `<div class="mode-price">${real ? eur(cf.total) + ' <small>real total for our stay</small>' : typeof p === 'number' ? '~' + eur(p) + ' <small>per night, other dates</small>' : '–'}</div>`;
        if (!sd) return seen + `<label class="field">Price per night €<input type="number" min="0" step="1" data-hprice="${esc(h.id)}" data-hk="${k}" value="${typeof hprice[h.id] === 'number' ? hprice[h.id] : ''}" placeholder="not on our route"></label>`;
        return seen + `<label class="field"><b>Total on Booking for our stay</b> — ${sd.n} nights, ${fmtD(nightsBetween(d0, sd.a))} → ${fmtD(nightsBetween(d0, sd.b))} (€)<input type="number" min="0" step="1" data-hstay="${esc(h.id)}" data-hk="${k}" class="${real ? 'set' : ''}" value="${real ? cf.total : ''}" placeholder="e.g. ${typeof h.price === 'number' ? Math.round(h.price * sd.n) : 900}"></label><p class="small pern">${real ? '<span class="status good">✓ real price · ' + eur(cf.total / sd.n) + ' a night</span>' : '<span class="status warn">estimate until we type the Booking total</span>'}</p>`; })()}
      <p class="small"><a href="${esc(bookingUrl(h.name, k))}" target="_blank" rel="noopener">Check the live price for our dates on Booking.com ↗</a>${h.url ? ` · <a href="${esc(h.url)}" target="_blank" rel="noopener">our link ↗</a>` : ''}</p>
      ${srcLinks(h.src)}${PRINT ? '' : `<div class="det-actions"><button class="btn small ${on ? 'primary' : ''}" data-usehotel="${k}" data-hid="${esc(h.id)}">${on ? '✓ Chosen for ' + esc(T.places[k].short) : 'Choose for ' + esc(T.places[k].short)}</button>${h.mine ? `<button class="btn small" data-myhdel="${esc(h.id)}">Delete</button>` : ''}</div>`}</div>`;
  }
  function hotelsMini(places) {
    return places.filter(k => hotelsFor(k).length).map(k => `<h4>${T.places[k].emoji} ${esc(T.places[k].short)}</h4><ul class="hotelmini">${hotelsFor(k).map(h => `<li class="${hsel[k] === h.id ? 'chosen' : ''}"><span><b>${hsel[k] === h.id ? '✓ ' : ''}${esc(h.name)}</b> <span class="muted">${esc(h.area || '')}</span></span><span>${h.score ? '★ ' + esc(h.score.split(' ')[0]) : ''} ${typeof hPrice(h) === 'number' ? '· ~' + eur(hPrice(h)) : ''}</span></li>`).join('')}</ul>`).join('');
  }
  function renderHotelSum() {
    const mineSel = true;
    const cfg = mineSel ? calc : cfgFromScenario(scen(sid)), r = compute(cfg);
    const nights = {}; r.timeline.forEach(t => nights[t.place] = (nights[t.place] || 0) + t.nights);
    const hotelCost = k => r.lines.hotel.filter(l => l.label.startsWith(T.places[k].name)).reduce((a, l) => a + l.amt, 0);
    $('#hotel-sum').innerHTML = `<div class="card"><h3>Hotels for our route</h3>
      <p class="muted small">Our route: <b>${esc(planName())}</b> · <a href="#routes" data-go="routes">change route</a></p>
      <table class="mini sumtbl"><thead><tr><th>Stop</th><th>Hotel</th><th class="num">Per night</th><th class="num">Total</th><th>How real?</th></tr></thead><tbody>
      ${Object.keys(nights).map(k => `<tr><td>${T.places[k].emoji} <b>${esc(T.places[k].short)}</b><br><small class="muted">${nights[k]} night${nights[k] > 1 ? 's' : ''}</small></td>
        <td><select data-hsel="${k}" aria-label="Hotel in ${esc(T.places[k].short)}"><option value="">No hotel chosen — typical ${esc(HOTEL_LVLS[cfg.hotelLvl])} price</option>${hotelsFor(k).map(h => `<option value="${esc(h.id)}" ${hsel[k] === h.id ? 'selected' : ''} >${esc(h.name)}${typeof hPrice(h) === 'number' ? ' · ' + eur(hPrice(h)) : ' · no price yet, typical price used'}</option>`).join('')}</select></td>
        <td class="num">${eur(hotelCost(k) / nights[k])}</td><td class="num"><b>${eur(hotelCost(k))}</b></td><td>${r.lines.hotel.some(l => l.label.startsWith(T.places[k].name) && l.note.startsWith('★ Real')) ? '<span class="status good">✓ real price</span>' : '<span class="status warn">estimate</span>'}</td></tr>`).join('')}
      <tr><td colspan="3"><b>All hotels</b></td><td class="num"><b>${eur(r.cats.hotel)}</b></td><td></td></tr>
      <tr><td colspan="3"><b>Whole trip for two</b> ${budgetBadge(r.total)}</td><td class="num"><b>${eur(r.total)}</b></td><td></td></tr></tbody></table>
      <p class="muted small">Hotel prices change a lot from night to night, so an estimate can be far off. To make a stop real: open the hotel on Booking with the link on its card, copy the total for the stay, and type it into the card. Until then we use an estimate with a New-Year multiplier.</p></div>`;
  }
  function renderHotels() {
    const pk = Object.keys(T.places);
    const mineP = planPlaces(); pk.sort((a, b) => (mineP.includes(b) ? 1 : 0) - (mineP.includes(a) ? 1 : 0));
    const cur = views.hplace && pk.includes(views.hplace) ? views.hplace : (mineP.find(k => !hsel[k]) || mineP[0] || HUB);
    $('#hotels').innerHTML = flowBar('hotels') + `<div class="head"><div><h2>Hotels</h2><p class="muted">Pick a hotel for each stop and see what the trip costs. Prices are what we saw on ${esc(T.meta.updatedHuman)}, not quotes for your nights — check the live price, type it in, and everything recalculates. You can add your own finds too.</p></div></div>
      ${T.hotelNote ? `<div class="note"><p>${esc(T.hotelNote)}</p></div>` : ''}
      <div id="hotel-sum"></div>
      <h2>Browse hotels</h2>
      ${PRINT ? '' : `<div class="chips">${pk.map(k => `<button class="chip btnchip ${k === cur ? 'on' : ''} ${mineP.includes(k) ? '' : 'dim'}" data-hplace="${k}">${T.places[k].emoji} ${esc(T.places[k].short)} ${mineP.includes(k) ? (hsel[k] ? '✓' : '· to choose') : '· not on our route'}</button>`).join('')}</div>`}
      ${(PRINT ? pk.filter(k => hotelsFor(k).length) : [cur]).map(k => `<h3>${T.places[k].emoji} ${esc(T.places[k].name)}</h3><p class="muted small">${esc(T.places[k].hotelNote || '')} Typical prices: ${eur(T.places[k].hotel.budget)} simple · ${eur(T.places[k].hotel.mid)} good · ${eur(T.places[k].hotel.nice)} nice per night.</p>
        ${PRINT ? '' : `<p class="note">${(() => { const sd = stayDates(k); return sd ? `On our route we stay here <b>${sd.n} nights, ${fmtD(Math.round((Date.parse(sd.a) - Date.parse(d0)) / 864e5))} → ${fmtD(Math.round((Date.parse(sd.b) - Date.parse(d0)) / 864e5))}</b>. ` : ''; })()}The prices on the cards are undated and usually lower than the real price for these nights. <a href="${esc(bookingUrl(T.places[k].name.replace(/\s*\(.*\)/, '') + ', ' + M.country, k))}" target="_blank" rel="noopener">See all hotels here for our dates on Booking.com ↗</a> — Booking shows the total for the stay, so divide by the nights and type the result into the hotel’s price box.</p>`}
        ${(() => { const sd = stayDates(k); if (!sd || PRINT && !hotelsFor(k).length) return ''; const rows = hotelsFor(k).map(h => { const c0 = hconf[h.id], cf = c0 && c0.a === sd.a && c0.b === sd.b ? c0 : stayFor(h, sd.a, sd.b); const pn = cf ? cf.total / sd.n : hPrice(h); return { h, real: !!cf, total: cf ? cf.total : (typeof pn === 'number' ? pn * sd.n : null), pn }; }).sort((a, b) => (b.real - a.real) || ((a.total == null) - (b.total == null)) || (a.total - b.total));
          return `<div class="tablewrap"><table class="tbl hcmp"><thead><tr><th>Hotel</th><th>Where</th><th>Guest score</th><th>Total for our ${sd.n} nights</th><th>Per night</th><th></th></tr></thead><tbody>${rows.map(r => `<tr class="${hsel[k] === r.h.id ? 'sel' : ''}"><td><b>${esc(r.h.name)}</b><br><small>${esc(r.h.stars || '')}</small></td><td><small>${esc(r.h.area || '')}</small></td><td>${r.h.score ? esc(r.h.score.split(' ').slice(0, 2).join(' ')) : '–'}</td><td>${r.total == null ? '–' : '<b>' + eur(r.total) + '</b>'}<br>${r.real ? '<span class="status good">✓ real price</span>' : r.total == null ? '<span class="status info">no price</span>' : '<span class="status warn">estimate, other dates</span>'}</td><td>${typeof r.pn === 'number' ? eur(r.pn) : '–'}</td><td>${PRINT ? '' : `<button class="btn small ${hsel[k] === r.h.id ? 'primary' : ''}" data-usehotel="${k}" data-hid="${esc(r.h.id)}">${hsel[k] === r.h.id ? '✓ Chosen' : 'Choose'}</button>`}</td></tr>`).join('')}</tbody></table></div><p class="muted small">Sorted by price, real prices for our nights first. Details, reviews and the Booking link for each hotel are on the cards below.</p>`; })()}
        <div class="grid3">${hotelsFor(k).map(h => hotelCard(h, k)).join('') || '<p class="muted">No hotels here yet — add one below.</p>'}</div>`).join('')}
      ${PRINT ? '' : `<div class="card addhotel"><h3>➕ Add a hotel we found ourselves</h3><div class="addgrid">
        <label class="field">Place<select id="myh-place">${pk.map(k => `<option value="${k}" ${k === cur ? 'selected' : ''}>${T.places[k].emoji} ${esc(T.places[k].name)}</option>`).join('')}</select></label>
        <label class="field">Hotel name<input type="text" id="myh-name" maxlength="80" placeholder="e.g. a friend’s recommendation"></label>
        <label class="field">Price per night €<input type="number" id="myh-price" min="0" step="1" placeholder="e.g. 60"></label>
        <label class="field">Link (optional)<input type="url" id="myh-url" placeholder="https://…"></label></div>
        <label class="field">Note (optional)<input type="text" id="myh-note" maxlength="160" placeholder="breakfast included, pool, 5 min to beach…"></label>
        <button class="btn primary" id="myh-add">Add hotel</button> <span class="muted small" id="myh-msg"></span></div>`}`;
    renderHotelSum();
  }

  let picked = store.get('picked', {});
  const mark = k => { picked[k] = true; store.set('picked', picked); };
  const planName = () => calc.base !== 'custom' && scen(calc.base) ? calc.base + ' · ' + routeTitle(scen(calc.base)) : 'Our own plan · ' + compute(calc).timeline.map(t => t.nights + ' ' + T.places[t.place].short).join(' + ');
  const planPlaces = () => [...new Set(calc.stops.filter(x => x.nights > 0).map(x => x.place))];
  function flowState() {
    const f = T.flights.find(x => x.id === gf) || T.flights[0], own = has('flightown'), pl = planPlaces(), nh = pl.filter(k => hsel[k] && findHotel(k, hsel[k])).length;
    return [
      { k: 'flights', n: 1, t: 'Flight', v: (own ? 'Our own price' : f.airline) + ' · ' + eur(own ? ov.flightown : pr('flight:' + f.id, f.pp.typ)) + ' each', ok: !!picked.f, hint: picked.f ? '' : 'suggested — tap to choose' },
      { k: 'routes', n: 2, t: 'Route', v: planName(), ok: !!picked.r, hint: picked.r ? '' : 'suggested — tap to choose' },
      { k: 'hotels', n: 3, t: 'Hotels', v: nh ? pl.map(k => hsel[k] && findHotel(k, hsel[k]) ? findHotel(k, hsel[k]).name : T.places[k].short + ': typical price').join(' · ') : 'typical prices for now', ok: nh === pl.length, hint: (() => { const m = compute(calc).m; return nh < pl.length ? nh + ' of ' + pl.length + ' chosen' : m.hConf < m.hStops ? m.hConf + ' of ' + m.hStops + ' real prices' : ''; })() },
      { k: 'calc', n: 4, t: 'Final price', v: eur(compute(calc).total) + ' for two', ok: true, hint: '' }
    ];
  }
  const flowBar = cur => PRINT ? '' : `<nav class="flow" aria-label="Planning steps">${flowState().map(x => `<a href="#${x.k}" data-go="${x.k}" class="${x.k === cur ? 'cur' : ''} ${x.ok ? 'ok' : ''}"><span class="fl-n">${x.ok && x.k !== 'calc' ? '✓' : x.n}</span><span class="fl-t"><b>${x.t}</b><small>${esc(x.v)}</small></span></a>`).join('')}</nav>`;
  const tripCtl = () => PRINT ? '' : `<div class="ctl tripctl"><label>Arrive in ${esc(M.country)} <input type="date" data-date="d0" value="${d0}" min="2026-11-20" max="2027-12-31"></label><label>Fly home <input type="date" data-date="d1" value="${d1}" min="2026-11-23" max="2028-01-31"></label><span class="status info">${tripN} nights</span>${d0 !== DEF0 || d1 !== DEF1 ? '<span class="muted small">Flight: leave ${esc(M.home)} ${fmtD(-1)}, home ${fmtD(tripN)} — <a href="#flights" data-go="flights">check the price for these dates</a>.</span> <button class="btn small" data-datereset>Reset dates</button>' : ''}</div>`;
  const routeTitle = s => { const st = scaleStops(s.stops, tripN), m = {}; st.forEach(x => m[x.place] = (m[x.place] || 0) + x.nights); return tripN === 17 ? s.title : Object.keys(m).map(k => m[k] + ' ' + T.places[k].short).join(' + '); };

  /* ---------- OVERVIEW ---------- */
  function renderOverview() {
    const all = T.scenarios.map(s => ({ s, r: compute(cfgFromScenario(s)) }));
    const rec = all.find(x => x.s.id === T.meta.recommended), mineR = compute(calc);
    $('#overview').innerHTML = `
      <div class="hero"><div><p class="eyebrow">${fmtD(-1)} → ${fmtD(tripN)} · from ${esc(M.home)} · ${tripN} nights</p>
        <h1>${esc(M.heroTitle).replace(/\n/g, '<br>')} <span>${M.emoji}</span></h1>
        <p class="lede">${esc(T.meta.lede)}</p>
        <div class="hero-cta"><button class="btn primary" data-go="flights">1 · Choose the flight</button><button class="btn" data-go="routes">2 · Choose the route</button><button class="btn" data-go="hotels">3 · Choose hotels</button></div></div>
        <div class="hero-card"><small>Our trip so far</small><div class="big">${eur(mineR.total)}</div><div>${eur(mineR.total / 2)} each · ${budgetBadge(mineR.total)}</div>
        <p class="small">${mineR.m.flightReal && mineR.m.hConf === mineR.m.hStops ? '<span class="status good">✓ flight and hotels are real prices</span>' : `<span class="status warn">still an estimate: ${mineR.m.flightReal ? '' : 'flight'}${!mineR.m.flightReal && mineR.m.hConf < mineR.m.hStops ? ' and ' : ''}${mineR.m.hConf < mineR.m.hStops ? (mineR.m.hStops - mineR.m.hConf) + ' hotel stop' + (mineR.m.hStops - mineR.m.hConf > 1 ? 's' : '') : ''} not checked</span>`}</p>
        <ol class="steps">${flowState().map(x => `<li class="${x.ok ? 'ok' : ''}"><a href="#${x.k}" data-go="${x.k}"><span class="fl-n">${x.ok && x.k !== 'calc' ? '✓' : x.n}</span><span><b>${x.t}</b> ${x.hint ? `<em>${esc(x.hint)}</em>` : ''}<small>${esc(x.v)}</small></span></a></li>`).join('')}</ol>
        ${calc.base !== T.meta.recommended ? `<p class="muted small">Our suggestion would be route ${esc(rec.s.id)} (${esc(routeTitle(rec.s))}) at ${eur(rec.r.total)}.</p>` : `<p class="muted small">${esc(T.meta.recWhy)}</p>`}</div></div>
      ${T.mustDo ? `<a class="mustbar" href="#prep" data-go="prep"><b>⚠️ Important preparation:</b> ${T.mustDo.length} things we must do before flying — visas, vaccinations, insurance. ${(() => { const dn = store.get('todo', {}); const n = T.mustDo.filter((x, i) => dn['must' + i]).length; return n + ' of ' + T.mustDo.length + ' done'; })()} →</a>` : ''}
      <h2>The short version</h2><div class="grid3">${T.headlines.map(h => `<div class="card"><div class="ico">${h.icon}</div><h3>${esc(h.t)}</h3><p>${esc(h.d)}</p></div>`).join('')}</div>
      <h2>All routes at a glance</h2>${tripCtl()}
      ${barChart(all.map(x => ({ label: x.s.id + '  ' + x.s.short + (x.s.id === calc.base ? '  ✓' : ''), v: x.r.total, hl: x.s.id === calc.base, c: x.s.id === calc.base ? 'var(--s1)' : 'var(--s1-soft)' })), { band: [T.meta.budgetMin, T.meta.budgetMax] })}
      <p class="muted">Typical flight prices, good 3–4★ hotels, mostly local food. Change any assumption in the calculator.</p>`;
  }

  /* ---------- ROUTES ---------- */
  function scenarioCard(s) {
    const r = compute(cfgFromScenario(s));
    const lo = compute(cfgFromScenario(s), 'low').total, hi = compute(cfgFromScenario(s), 'high').total;
    return `<article class="card route${s.id === calc.base ? ' rec' : ''}" data-open="${s.id}" tabindex="0" role="button">
      <div class="route-top"><span class="rid">${s.id}</span>${s.id === calc.base ? pill('✓ our route', 'accent') : s.id === T.meta.recommended ? pill('suggested') : ''}${budgetBadge(r.total)}</div>
      <h3>${esc(routeTitle(s))}</h3><p class="muted">${esc(s.tagline)}</p>
      <div class="route-path">${r.timeline.map(t => `<span title="${esc(T.places[t.place].name)}">${T.places[t.place].emoji} ${t.nights}</span>`).join('<i>→</i>')}</div>
      <div class="route-price">${eur(r.total)}<small> for two · ${eur(lo)}–${eur(hi)} depending on flights</small></div>
      <div class="route-facts"><span>🏖 ${r.m.beachNights} beach nights</span><span>🧳 ${r.m.moves} check-in${r.m.moves > 1 ? 's' : ''}</span><span>🕑 ${hrs(r.m.transitH)} in transit</span></div>
      <div class="det-actions"><button class="btn small ${s.id === calc.base ? 'primary' : ''}" data-choose="${s.id}">${s.id === calc.base ? '✓ Our route' : 'Choose this route'}</button><span class="more">Details →</span></div></article>`;
  }
  function renderRoutes() {
    $('#routes').innerHTML = flowBar('routes') + `<div class="head"><div><h2>The ${T.scenarios.length} routes</h2><p class="muted">Choose the route we want — it becomes our trip in the hotels page, the calculator and the overview. Tap a card for the day plan and every price behind it.</p></div>${PRINT ? '' : toggle('routes', 'Cards')}</div>${tripCtl()}
      ${showD('routes') && !PRINT ? `<div class="grid3">${T.scenarios.map(scenarioCard).join('')}</div>` : ''}
      ${showV('routes') ? `<div class="card"><h3>What each route is made of</h3>${stackChart(T.scenarios.map(s => { const r = compute(cfgFromScenario(s)); return { label: s.id + '  ' + s.short, total: r.total, cats: r.cats }; }), { ref: T.meta.budgetMax })}</div>` : ''}
      ${PRINT ? T.scenarios.map(s => `<div class="card pb">${detailHTML(s)}</div>`).join('') : ''}`;
  }
  function detailHTML(s) {
    const cfg = cfgFromScenario(s), r = compute(cfg);
    const id = 'det' + s.id;
    return `<div class="det-head"><span class="rid big">${s.id}</span><div><h2>${esc(routeTitle(s))}</h2><p class="muted">${esc(s.tagline)}</p></div></div>
      ${tiles(r)}
      <div class="two"><div><h3>Day plan</h3>${timelineHTML(r)}
        ${hotelsMini([...new Set(r.timeline.map(t => t.place))]) ? `<h3>Where to stay</h3>${hotelsMini([...new Set(r.timeline.map(t => t.place))])}${PRINT ? '' : '<p class="small"><a href="#hotels" data-go="hotels">See all hotels with reviews →</a></p>'}` : ''}
        <h3>Why you'd love it</h3><ul class="pros">${s.pros.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
        <h3>What to watch out for</h3><ul class="cons">${s.cons.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>
      <div><div class="head"><h3>Budget for two</h3>${PRINT ? '' : toggle(id, 'Numbers')}</div>
        ${showD(id) ? `<p class="muted small">Tap a line to see exactly how it is calculated and where the price comes from.</p>${linesHTML(r)}` : ''}
        ${showV(id) ? catBars(r) : ''}
        <h3>If flight prices move</h3>${barChart(['low', 'typ', 'high'].map(l => ({ label: LEVELS[l], v: compute(cfg, l).total, c: l === 'typ' ? 'var(--s1)' : 'var(--s1-soft)' })), { band: [T.meta.budgetMin, T.meta.budgetMax] })}
      </div></div>
      ${PRINT ? '' : `<div class="det-actions"><button class="btn primary" data-choose="${s.id}" data-then="hotels">${s.id === calc.base ? '✓ Our route — choose hotels' : 'Choose this route'}</button><button class="btn" data-tocalc="${s.id}">Choose and fine-tune in the calculator</button><button class="btn" data-close>Close</button></div>`}`;
  }
  function openDetail(id) {
    const s = scen(id); if (!s) return;
    const d = $('#dlg'); d.dataset.sid = id; $('#dlg-body').innerHTML = detailHTML(s);
    if (!d.open) d.showModal(); d.scrollTop = 0;
  }

  /* ---------- COMPARE ---------- */
  function renderCompare() {
    const orows = allOffers().map(o => ({ o, c: offerCalc(o) }));
    const rows = T.scenarios.filter(s => compareSel.includes(s.id)).map(s => ({ id: s.id, label: s.id + '  ' + s.short, r: compute(cfgFromScenario(s), mood) }));
    if (compareSel.includes('mine')) rows.push({ id: 'mine', label: '★  Our own plan', r: compute(calc, mood === 'typ' ? null : mood) });
    const best = (fn, min = true) => { const v = rows.map(fn); return min ? Math.min(...v) : Math.max(...v); };
    const cell = (v, b, txt) => `<td class="${v === b ? 'best' : ''}">${txt}</td>`;
    const bT = best(x => x.r.total), bB = best(x => x.r.m.beachNights, false), bM = best(x => x.r.m.moves), bH = best(x => x.r.m.transitH), bS = best(x => x.r.m.hassle);
    $('#compare').innerHTML = `<div class="head"><div><h2>Compare everything</h2><p class="muted">Pick the routes to compare. “Our own plan” is whatever is currently in the calculator. Packages from travel companies are listed at the end, marked 📦.</p></div>${PRINT ? '' : toggle('compare', 'Table')}</div>
      <div class="controls"><div class="chips">${T.scenarios.map(s => `<label class="chip"><input type="checkbox" data-cmp="${s.id}" ${compareSel.includes(s.id) ? 'checked' : ''}>${s.id} ${esc(s.short)}</label>`).join('')}<label class="chip"><input type="checkbox" data-cmp="mine" ${compareSel.includes('mine') ? 'checked' : ''}>★ Our own plan</label></div>
      ${tripCtl()}<div class="ctl"><span>Flight prices:</span><div class="seg" id="mood">${Object.keys(LEVELS).map(l => `<button data-mood="${l}" class="${mood === l ? 'on' : ''}">${LEVELS[l]}</button>`).join('')}</div></div></div>
      ${!rows.length ? '<p class="card">Select at least one route above.</p>' : ''}
      ${rows.length && showD('compare') ? `<div class="tablewrap"><table class="tbl cmp"><thead><tr><th>Route</th><th>Total for two</th><th>Budget</th><th>Beach nights</th><th>Hotel check-ins</th><th>Travel inside the country</th><th>Hassle score</th><th>Long-haul flights</th></tr></thead><tbody>
        ${rows.map(x => `<tr><td><b>${esc(x.label)}</b></td>${cell(x.r.total, bT, eur(x.r.total))}<td>${budgetBadge(x.r.total)}</td>${cell(x.r.m.beachNights, bB, x.r.m.beachNights)}${cell(x.r.m.moves, bM, x.r.m.moves)}${cell(x.r.m.transitH, bH, hrs(x.r.m.transitH))}${cell(x.r.m.hassle, bS, x.r.m.hassle)}<td>${hrs(x.r.m.intlH)}<br><small>${esc(x.r.flight.airline)}</small></td></tr>`).join('')}
        ${orows.map(x => `<tr class="pkg"><td><b>📦 ${esc(x.o.company)}</b><br><small>${esc(x.o.name)}</small></td><td>${x.c.missing ? '<span class="status warn">price missing</span>' : '<b>' + eur(x.c.total) + '</b><br><small>package ' + eur(x.c.priceEur) + ' + ' + eur(x.c.total - x.c.priceEur) + ' on top</small>'}</td><td>${x.c.missing ? '' : budgetBadge(x.c.total)}</td><td>${x.o.beachNights == null ? 'not stated' : x.o.beachNights}</td><td colspan="3"><small>${esc(x.o.hotelClass || '')} · ${x.c.n} nights · ${esc(x.o.dates || '')}</small></td><td><small>${x.o.incl.flight ? 'flights in the package' : 'flights not in the package — ours added'}</small></td></tr>`).join('')}
        </tbody></table></div>${orows.length ? '<p class="small">📦 = package from a travel company, with everything it does not cover added on top. <a href="#offers" data-go="offers">See the line-by-line comparison on the Offers page →</a></p>' : ''}<p class="muted small">Green cells = best in that column. Hassle score = one point per extra hotel move plus the difficulty of each journey (flight 1–2, bus + ferry 4, long train 4–5).</p>` : ''}
      ${rows.length && showV('compare') ? `<div class="grid2">
        <div class="card"><h3>Total cost for two</h3>${barChart(rows.map(x => ({ label: x.label, v: x.r.total })).concat(orows.filter(x => !x.c.missing).map(x => ({ label: '📦 ' + x.o.company, v: x.c.total, c: 'var(--s2)' }))), { band: [T.meta.budgetMin, T.meta.budgetMax] })}</div>
        <div class="card"><h3>Where the money goes</h3>${stackChart(rows.map(x => ({ label: x.label, total: x.r.total, cats: x.r.cats })), { ref: T.meta.budgetMax })}</div>
        <div class="card"><h3>Hours spent travelling inside the country</h3>${barChart(rows.map(x => ({ label: x.label, v: x.r.m.transitH })), { fmt: hrs, c: 'var(--s2)' })}</div>
        <div class="card"><h3>Nights by the beach</h3>${barChart(rows.map(x => ({ label: x.label, v: x.r.m.beachNights })), { fmt: v => v + ' nights', c: 'var(--s3)', max: tripN })}</div>
        <div class="card"><h3>Hassle score (lower is more relaxed)</h3>${barChart(rows.map(x => ({ label: x.label, v: x.r.m.hassle })), { fmt: v => String(v), c: 'var(--s5)' })}</div>
        <div class="card"><h3>Cost per beach night</h3>${barChart(rows.filter(x => x.r.m.beachNights).map(x => ({ label: x.label, v: x.r.total / x.r.m.beachNights })), { c: 'var(--s7)' })}<p class="muted small">Whole trip cost divided by beach nights — a rough “value for swimmers” measure.</p></div></div>` : ''}`;
  }

  /* ---------- FLIGHTS ---------- */
  const EV = { near: ['good', 'price seen on the airline’s site'], est: ['warn', 'our estimate'] };
  function flightSum() {
    const f = T.flights.find(x => x.id === gf) || T.flights[0], own = has('flightown'), p = own ? ov.flightown : pr('flight:' + f.id, f.pp.typ);
    const rec = compute(cfgFromScenario(scen(T.meta.recommended)));
    return `<div class="card flightsum"><small class="eyebrow">The flight used in every calculation</small>
      <div class="fs-row"><div><h3>${own ? 'Our own price' : esc(f.airline)}</h3><p class="muted small">${own ? 'You typed this in — it replaces the airline price below.' : `via ${esc(f.via)} · ${hrs(f.durOut)} out, ${hrs(f.durBack)} back · ${esc(f.bag || '')}`}</p></div>
      <div class="fs-price"><b>${eur(p)}</b><small> each · ${eur(p * 2)} for two</small></div></div>
      ${PRINT ? '' : `<label class="field">Found a better price? Type it here (per person, return, with bag) and it is used everywhere<input type="number" min="0" step="10" data-ov="flightown" class="${own ? 'set' : ''}" value="${own ? ov.flightown : ''}" placeholder="e.g. 1050"></label>`}
      <p class="fdates"><b>Our flight dates:</b> leave ${esc(M.home)} ${fmtD(-1)} · arrive ${fmtD(0)} · fly home ${fmtD(tripN)}${PRINT ? '' : ` · <a href="https://www.google.com/travel/flights?q=${encodeURIComponent('Flights from ' + M.homeAirport + ' to ' + M.hubAirport + ' on ' + isoAdd(d0, -1) + ' through ' + d1 + ' for 2 adults')}" target="_blank" rel="noopener">search these dates on Google Flights ↗</a>`}${d0 !== DEF0 || d1 !== DEF1 ? '<br><span class="status warn">▲ Our prices were researched for the original dates. For your new dates, check the live price and type it in above.</span>' : ''}</p>
      <p class="muted small">With this flight our trip (${esc(planName())}) costs <b>${eur(compute(calc).total)}</b> for two. ${budgetBadge(compute(calc).total)}</p></div>`;
  }
  function renderFlights() {
    const sorted = [...T.flights].sort((a, b) => (a.avoid ? 1 : 0) - (b.avoid ? 1 : 0) || pr('flight:' + a.id, a.pp.typ) - pr('flight:' + b.id, b.pp.typ));
    const ok = sorted.filter(f => !f.avoid), cheap = ok[0], fast = [...ok].sort((a, b) => (a.durOut + a.durBack) - (b.durOut + b.durBack))[0];
    const badges = f => (f.id === T.meta.bestFlight ? pill('best choice', 'accent') : '') + (f.id === cheap.id ? pill('cheapest') : '') + (f.id === fast.id ? pill('fastest') : '') + (f.avoid ? '<span class="status bad">not for us</span>' : '');
    $('#flights').innerHTML = flowBar('flights') + `<div class="head"><div><h2>Flights from ${esc(M.home)}</h2><p class="muted">Pick one flight. It is used for every route, the comparison and the calculator. Prices are per person, return, with a checked bag.</p></div></div>
      <div id="flight-sum">${flightSum()}</div>
      <h3>Choose a flight</h3>
      <div class="flist">${sorted.map(f => `<div class="frow ${f.id === gf && !has('flightown') ? 'on' : ''}"><button class="fpick" data-pickflight="${f.id}" aria-pressed="${f.id === gf}">
        <span class="radio"></span><span class="f-main"><b>${esc(f.airline)}</b> ${badges(f)}<small>via ${esc(f.via)} · ${f.stops} stop${f.stops === 1 ? '' : 's'} · ${hrs(f.durOut)} out / ${hrs(f.durBack)} back</small></span>
        <span class="f-price"><b>${eur(pr('flight:' + f.id, f.pp.typ))}</b><small>each</small><span class="status ${EV[f.ev][0]}">${EV[f.ev][1]}</span></span></button>
        <details><summary>Details</summary><p>${esc(f.note || '')} ${esc(f.bag || '')} ${esc(f.arrive ? 'Return: ' + f.arrive + '.' : '')} Likely range ${eur(f.pp.low)}–${eur(f.pp.high)} each. ${srcLinks(f.src)}</p></details></div>`).join('')}</div>
      <p class="muted small">“Best choice” is the cheapest flight whose price we actually saw on the airline’s site for these dates. Estimates may turn out cheaper — or not. Evening departures usually land in ${esc(M.home)} the next morning — check the arrival date.</p>
      ${T.flightAlt ? `<details class="card fold"><summary><b>Other ways to fly</b> — other airports, airlines and ticket types</summary>${T.flightAlt.map(n => `<p><b>${esc(n.t)}</b> ${esc(n.d)} ${srcLinks(n.src)}</p>`).join('')}</details>` : ''}
      <details class="card fold" ${PRINT ? 'open' : ''}><summary><b>Good to know before booking</b></summary>${T.flightNotes.map(n => `<p>${n.icon} <b>${esc(n.t)}</b> ${esc(n.d)} ${srcLinks(n.src)}</p>`).join('')}</details>
      <h2>How to book smart</h2><div class="grid3">${T.flightTips.map(h => `<div class="card"><div class="ico">${h.icon}</div><h3>${esc(h.t)}</h3><p>${esc(h.d)}</p>${srcLinks(h.src)}</div>`).join('')}</div>`;
  }

  /* ---------- GETTING AROUND ---------- */
  function renderAround() {
    const P = T.places, keys = Object.keys(T.legs);
    const cur = views.leg && T.legs[views.leg] ? views.leg : keys[0];
    const opts = T.legs[cur], [a, b] = cur.split('|');
    $('#around').innerHTML = `<div class="head"><div><h2>Getting around ${esc(M.country)}</h2><p class="muted">What each one costs, how long it really takes door to door, and how hard it is.</p></div>${PRINT ? '' : toggle('around', 'Table')}</div>
      <div class="chips">${keys.map(k => { const [x, y] = k.split('|'); return `<button class="chip btnchip ${k === cur ? 'on' : ''}" data-leg="${k}">${esc(P[x].short)} ⇄ ${esc(P[y].short)}</button>`; }).join('')}</div>
      ${(PRINT ? keys : [cur]).map(k => { const o = T.legs[k], [x, y] = k.split('|'); return `<h3>${esc(P[x].name)} ⇄ ${esc(P[y].name)}</h3>
      ${showD('around') ? `<div class="grid3">${o.map(m => `<div class="card mode"><div class="ico">${m.icon}</div><h3>${esc(m.label)}</h3>
        <div class="mode-price">${eur(m.pp * 2)} <small>for two, one way</small></div>
        <dl><dt>Door to door</dt><dd>${hrs(m.hours)}</dd><dt>Comfort</dt><dd>${dots(m.comfort)}</dd><dt>Difficulty</dt><dd>${dots(m.hassle)}</dd></dl>
        <p>${esc(m.note || '')}</p>${m.risks ? `<ul class="cons">${m.risks.map(r => `<li>${esc(r)}</li>`).join('')}</ul>` : ''}${srcLinks(m.src)}</div>`).join('')}</div>` : ''}
      ${showV('around') ? `<div class="grid3"><div class="card"><h3>Cost for two</h3>${barChart(o.map(m => ({ label: m.label, v: m.pp * 2 })))}</div>
        <div class="card"><h3>Door-to-door time</h3>${barChart(o.map(m => ({ label: m.label, v: m.hours })), { fmt: hrs, c: 'var(--s2)' })}</div>
        <div class="card"><h3>Difficulty (1 easy – 5 hard)</h3>${barChart(o.map(m => ({ label: m.label, v: m.hassle })), { fmt: v => v + ' / 5', c: 'var(--s5)', max: 5.6 })}</div></div>` : ''}`; }).join('')}
      <h2>Taxis, Grab and getting from the airport</h2><div class="grid3">${T.taxi.map(h => `<div class="card"><div class="ico">${h.icon}</div><h3>${esc(h.t)}</h3><p>${esc(h.d)}</p>${h.price ? `<p class="pricechip">${esc(h.price)}</p>` : ''}${srcLinks(h.src)}</div>`).join('')}</div>`;
  }

  /* ---------- CALCULATOR ---------- */
  function saveCalc() { store.set('calc', calc); }
  function renderCalcInputs() {
    const P = T.places, pk = Object.keys(P);
    const stopRows = calc.stops.map((s, i) => `<div class="stoprow"><select data-stop="${i}" aria-label="Place">${pk.map(k => `<option value="${k}" ${k === s.place ? 'selected' : ''}>${P[k].emoji} ${esc(P[k].name)}</option>`).join('')}</select>
      <div class="stepper"><button data-step="${i}" data-d="-1" aria-label="one night less">−</button><output>${s.nights}</output><button data-step="${i}" data-d="1" aria-label="one night more">+</button></div><span class="muted">nights</span>
      <button class="icon" data-mv="${i}" data-d="-1" ${i === 0 ? 'disabled' : ''} aria-label="move up">↑</button><button class="icon" data-mv="${i}" data-d="1" ${i === calc.stops.length - 1 ? 'disabled' : ''} aria-label="move down">↓</button><button class="icon" data-rm="${i}" aria-label="remove">✕</button></div>`).join('');
    const used = [...new Set(calc.stops.filter(s => s.nights > 0).map(s => s.place))];
    const res = compute(calc);
    const legKeys = [...new Set(res.legs.map(l => legKey(l.a, l.b)))];
    $('#calc-flow').innerHTML = flowBar('calc');
    $('#calc-dates').innerHTML = `<div class="card dates"><h3>📅 Our dates</h3>${tripCtl()}<p class="muted small">Changing the dates changes the nights, the New-Year surcharge and every total on the site.</p></div>`;
    $('#calc-inputs').innerHTML = `
      <div class="card"><h3>1 · Our route</h3><div class="chips">${T.scenarios.map(s => `<button class="chip btnchip ${calc.base === s.id ? 'on' : ''}" data-preset="${s.id}">${s.id} ${esc(s.short)}</button>`).join('')}</div></div>
      <div class="card"><h3>2 · Where and how long</h3>${stopRows}<button class="btn small" data-addstop>+ add a stop</button><p class="muted small" id="nights-msg"></p></div>
      <div class="card"><h3>3 · Flight from ${esc(M.home)}</h3><select id="c-flight">${T.flights.map(f => `<option value="${f.id}" ${f.id === gf ? 'selected' : ''}>${esc(f.airline)} · ${eur(pr('flight:' + f.id, f.pp.typ))} each${f.avoid ? ' · not for us' : ''}</option>`).join('')}</select>
        <label class="field">Found a better price? Type it (per person, return) — used everywhere <input type="number" min="0" step="10" data-ov="flightown" class="${has('flightown') ? 'set' : ''}" value="${has('flightown') ? ov.flightown : ''}" placeholder="e.g. 1050"></label>
        <p class="muted small">The flight is the same for every route. <a href="#flights" data-go="flights">Compare flights →</a></p></div>
      <div class="card"><h3>4 · How you travel between places</h3>${legKeys.length ? legKeys.map(k => { const [a, b] = k.split('|'); const o = legOptions(a, b); return `<label class="field">${esc(P[a].short)} ⇄ ${esc(P[b].short)}<select data-legmode="${k}">${o.map(m => `<option value="${m.id}" ${calc.legMode[k] === m.id ? 'selected' : ''}>${m.icon || ''} ${esc(m.label)} · ${eur(pr('leg:' + k + ':' + m.id, m.pp) * 2)} · ${hrs(m.hours)}</option>`).join('')}</select></label>`; }).join('') : '<p class="muted">No journeys needed — one base only.</p>'}</div>
      <div class="card"><h3>5 · Comfort level</h3>
        <div class="ctl"><span>Hotels</span><div class="seg">${Object.keys(HOTEL_LVLS).map(l => `<button data-hl="${l}" class="${calc.hotelLvl === l ? 'on' : ''}">${HOTEL_LVLS[l]}</button>`).join('')}</div></div>
        <div class="ctl"><span>Food</span><div class="seg">${Object.keys(FOOD_LVLS).map(l => `<button data-fl="${l}" class="${calc.foodLvl === l ? 'on' : ''}">${FOOD_LVLS[l]}</button>`).join('')}</div></div>
        <table class="mini"><thead><tr><th></th><th>Hotel € / night</th><th>Food € / day for two</th></tr></thead><tbody>${used.map(k => `<tr><td>${P[k].emoji} ${esc(P[k].short)}</td>
          <td><input type="number" min="0" step="1" data-ov="hotel:${k}" value="${has('hotel:' + k) ? ov['hotel:' + k] : ''}" placeholder="${P[k].hotel[calc.hotelLvl]}"></td><td><input type="number" min="0" step="1" data-ov="food:${k}" value="${has('food:' + k) ? ov['food:' + k] : ''}" placeholder="${P[k].food[calc.foodLvl]}"></td></tr>`).join('')}</tbody></table>
        <p class="muted small">Grey numbers are our researched defaults — type over them with a real price (0 = free, e.g. staying with friends). Pick a real hotel on the <a href="#hotels" data-go="hotels">Hotels</a> page, or change any price on <a href="#mine" data-go="mine">Our prices</a>.</p>
        <label class="check"><input type="checkbox" id="c-peak" ${calc.peak ? 'checked' : ''}> Add the Christmas / New-Year surcharge to hotel nights 23 Dec – 2 Jan</label>
        ${used.includes('pq') ? `<label class="check"><input type="checkbox" id="c-gala" ${calc.gala ? 'checked' : ''}> ${esc(T.fixed.gala.label)} (${eur(pr('fixed:gala', T.fixed.gala.for2))})</label>` : ''}</div>
      <div class="card"><h3>6 · Things to do</h3>${used.map(k => `<h4>${P[k].emoji} ${esc(P[k].name)}</h4>${T.activities.filter(a => a.place === k).map(a => `<label class="check"><input type="checkbox" data-act="${a.id}" ${calc.acts.includes(a.id) ? 'checked' : ''}><span>${esc(a.name)} <small>${esc(a.note || '')}</small></span><b>${eur(pr('act:' + a.id, a.for2))}</b></label>`).join('')}`).join('')}</div>
      <div class="card"><h3>7 · Extras</h3>
        <label class="field">Shopping allowance <output id="o-shop">${eur(calc.shopping)}</output><input type="range" min="0" max="600" step="10" id="c-shop" value="${calc.shopping}"></label>
        <label class="field">Reserve for surprises <output id="o-res">${calc.reservePct}%</output><input type="range" min="0" max="15" step="1" id="c-res" value="${calc.reservePct}"></label>
        ${['visa', 'insurance', 'sim'].map(k => `<label class="check"><input type="checkbox" data-fx="${k}" ${calc[k] ? 'checked' : ''}><span>${esc(T.fixed[k].label)} <small>${esc(T.fixed[k].note || '')}</small></span><b>${eur(pr('fixed:' + k, T.fixed[k].for2))}</b></label>`).join('')}</div>`;
  }
  function renderCalcResult() {
    const res = compute(calc), { budgetMin: a, budgetMax: b } = T.meta;
    const max = Math.max(res.total, b) * 1.1;
    const msg = $('#nights-msg');
    if (msg) msg.innerHTML = res.m.nights === tripN ? `✓ ${tripN} nights · arrive ${fmtD(0)}, fly home ${fmtD(tripN)}. Change the nights here or the dates above — they follow each other.` : `<span class="status warn">▲ ${res.m.nights} nights planned, but the dates give ${tripN}. Please keep the trip between 3 and 30 nights.</span>`;
    $('#calc-result').innerHTML = `<div class="card sticky"><small class="eyebrow">${esc(calc.base === 'custom' ? 'Our own plan' : 'Based on route ' + calc.base)}</small>
      <div class="total-big">${eur(res.total)}</div><div class="muted">${eur(res.total / 2)} per person · ${budgetBadge(res.total)}</div>
      <div class="gauge" data-tip="${esc(eur(res.total) + ' of ' + eur(b) + ' ceiling')}" tabindex="0"><div class="gauge-band" style="left:${a / max * 100}%;width:${(b - a) / max * 100}%"></div><div class="stack" style="width:${res.total / max * 100}%">${CATS.filter(c => res.cats[c.k] > 0).map(c => `<span style="flex:${res.cats[c.k]};background:${c.c}" data-tip="${esc(c.n + ': ' + eur(res.cats[c.k]))}"></span>`).join('')}</div><span class="ref" style="left:${b / max * 100}%"></span></div>
      <div class="gauge-lbl"><span>${eur(a)}–${eur(b)} budget shaded</span><span>${res.total <= b ? eur(b - res.total) + ' left' : eur(res.total - b) + ' over'}</span></div>
      <div class="minitiles"><span>🏖 <b>${res.m.beachNights}</b> beach nights</span><span>🧳 <b>${res.m.moves}</b> check-ins</span><span>🕑 <b>${hrs(res.m.transitH)}</b> in transit</span><span>😌 hassle <b>${res.m.hassle}</b></span></div>
      <div class="real"><b>How real is this price?</b> ${res.m.flightReal ? '<span class="status good">✓ flight: price typed by us</span>' : '<span class="status warn">flight: estimate</span>'} ${res.m.hConf === res.m.hStops ? '<span class="status good">✓ hotels: real Booking totals</span>' : `<span class="status warn">hotels: ${res.m.hConf} of ${res.m.hStops} stops with a real price</span>`} <span class="status info">food, taxis, activities: our estimates</span></div>
      ${saversHTML()}
      <div class="head"><h3>Breakdown</h3>${toggle('calcres', 'Numbers')}</div>
      ${showD('calcres') ? linesHTML(res) : catBars(res)}
      <h3>Your days</h3>${timelineHTML(res)}
      <div class="det-actions"><button class="btn primary" id="c-share">🔗 Copy link to share this plan</button><button class="btn" data-go="compare">Compare with the routes</button><button class="btn" id="c-reset">Reset</button></div><p class="muted small" id="share-msg">Changes are saved in this browser automatically.</p></div>`;
  }
  function renderCalc() {
    if (!$('#calc-inputs')) $('#calc').innerHTML = `<div id="calc-flow"></div><div class="head"><div><h2>Final price</h2><p class="muted">Our flight, route and hotels come together here. Change anything — nights, flight, hotel class, how you travel, what you do — and the total updates instantly.</p></div></div>
      ${sharedPlan ? '<p class="note">You opened a shared plan link — this is the plan your travel partner built. Edit freely; it saves to your browser.</p>' : ''}
      <div id="calc-dates"></div><div class="calc"><div id="calc-inputs"></div><div id="calc-result"></div></div>`;
    renderCalcInputs(); renderCalcResult();
  }
  const custom = () => { calc.base = 'custom'; mark('r'); };

  /* ---------- OFFERS from travel companies ---------- */
  let myOffers = (store.get('offers', []) || []).filter(o => o && typeof o.company === 'string').map(o => Object.assign(o, { mine: true, url: /^https?:\/\//i.test(o.url || '') ? o.url : '' }));
  let fx = Object.assign({ EUR: 1, GBP: 1.15, USD: 0.88 }, M.fx || {}, store.get('fx', {}) || {});
  const MEALS = { none: ['No meals', 1], breakfast: ['Breakfast only', 0.75], some: ['Some meals', 0.5], all: ['All meals', 0.1] };
  let ofp = store.get('ofp', {}) || {};
  const allOffers = () => (T.offers || []).concat(myOffers);
  const offerPrice = o => typeof o.price === 'number' ? o.price : (typeof ofp[o.id] === 'number' ? ofp[o.id] : null);
  function offerCalc(o) {
    const P = T.places[HUB], f = T.flights.find(x => x.id === gf) || T.flights[0], n = o.nights || tripN, inc = o.incl || {};
    const op = offerPrice(o), priceEur = (op || 0) * (fx[o.cur] || 1), add = [];
    (o.extra || []).forEach(x => add.push([x.label, x.for2, x.note || '', x.cat || 'intl']));
    if (!inc.flight) { const pp = (has('flightown') ? ov.flightown : pr('flight:' + f.id, f.pp.typ)) + (o.openJaw && M.openJaw[o.openJaw] ? M.openJaw[o.openJaw] : 0); add.push(['Flights from ' + M.home, pp * 2, (has('flightown') ? 'our own flight price' : f.airline) + (o.openJaw && M.openJaw[o.openJaw] ? ', flying home from ' + T.places[o.openJaw].short : ''), 'intl']); }
    if (!inc.hotels) add.push(['Hotels', n * P.hotel[calc.hotelLvl], n + ' nights at our typical price', 'hotel']);
    const mf = (MEALS[inc.meals] || MEALS.none)[1]; if (mf > 0) add.push(['Meals not included', n * pr('food:' + HUB, P.food[calc.foodLvl]) * mf, Math.round(mf * 100) + '% of our food budget for ' + n + ' days', 'food']);
    if (!inc.domestic) add.push(['Travel inside the country', compute(calc).cats.inter + n * P.localPerDay, 'as in our own plan', 'move']); else add.push(['Taxis in free time', n * P.localPerDay * 0.3, 'transfers are included; a little for evenings', 'move']);
    if (!inc.activities) add.push(['Activities', compute(calc).cats.acts, 'as in our own plan', 'acts']);
    if (!inc.visa && calc.visa) add.push([T.fixed.visa.label, pr('fixed:visa', T.fixed.visa.for2), '', 'fixed']);
    if (!inc.insurance && calc.insurance) add.push([T.fixed.insurance.label, pr('fixed:insurance', T.fixed.insurance.for2), '', 'fixed']);
    if (!inc.sim && calc.sim) add.push([T.fixed.sim.label, pr('fixed:sim', T.fixed.sim.for2), '', 'fixed']);
    add.push(['Shopping', calc.shopping, 'same allowance as our plan', 'shop']);
    const sub = priceEur + add.reduce((a, x) => a + x[1], 0), res = sub * calc.reservePct / 100; add.push([calc.reservePct + '% reserve', res, 'same buffer as our plan', 'reserve']);
    let diy = null;
    if (o.diy) { const xl = (o.extra || []).map(x => x.label), lines = o.diy.lines.map(x => [x.l, x.v, x.n || '']);
      if (o.diy.flight) { const pp = (has('flightown') ? ov.flightown : pr('flight:' + f.id, f.pp.typ)) + (o.diy.flightExtra || 0); lines.push(['Flights from ' + M.home + ' for this route', pp * 2, (has('flightown') ? 'our own flight price' : f.airline) + (o.diy.flightExtra ? ' plus about ' + eur(o.diy.flightExtra) + ' each for arriving and leaving from different airports' : '')]); }
      const same = add.filter(a => !xl.includes(a[0]) && !/reserve$/.test(a[0])), dsub = lines.reduce((a, x) => a + x[1], 0) + same.reduce((a, x) => a + x[1], 0);
      diy = { lines, same, total: dsub * (1 + calc.reservePct / 100) }; }
    return { priceEur, add, total: sub + res, n, missing: op == null, diy };
  }
  function renderOffers() {
    const mineR = compute(calc), offers = allOffers().map(o => ({ o, c: offerCalc(o) }));
    const yes = v => v ? '<span class="status good">✓ included</span>' : '<span class="status warn">not included</span>';
    $('#offers').innerHTML = `<div class="head"><div><h2>Offers from travel companies</h2><p class="muted">Our chosen route, with all its costs, next to the packages from travel companies. A package covers some costs and not others, so line by line we show what is in the package price and what we would still pay on top.</p></div></div>
      ${offers.length ? `<div class="card"><h3>Our chosen route against the packages — everything included, for two</h3>${barChart([{ label: '★ Our chosen route', v: mineR.total, hl: true, c: 'var(--s1)' }].concat(offers.filter(x => !x.c.missing).map(x => ({ label: x.o.company, v: x.c.total, c: 'var(--s2)', tip: x.o.company + ' — ' + x.o.name + ': ' + eur(x.c.total) }))), { band: [M.budgetMin, M.budgetMax] })}
        <div class="tablewrap flat"><table class="mini sumtbl cmpoffer"><thead><tr><th></th><th>★ Our chosen route<br><small>${esc(planName())}</small></th>${offers.map(x => `<th>${esc(x.o.company)}<br><small>${esc(x.o.name)}</small></th>`).join('')}</tr></thead><tbody>
        <tr><td>Dates</td><td>${fmtD(0)} – ${fmtD(tripN)}</td>${offers.map(x => `<td>${esc(x.o.dates || '')}</td>`).join('')}</tr>
        <tr><td>Nights · beach nights</td><td>${mineR.m.nights} · ${mineR.m.beachNights}</td>${offers.map(x => `<td>${x.c.n} · ${x.o.beachNights == null ? 'not stated' : x.o.beachNights}</td>`).join('')}</tr>
        <tr><td>Hotel class</td><td>${esc(HOTEL_LVLS[calc.hotelLvl])}</td>${offers.map(x => `<td>${esc(x.o.hotelClass || '?')}</td>`).join('')}</tr>
        <tr class="sep"><td><b>Package price</b></td><td class="muted">no package</td>${offers.map(x => x.c.missing ? '<td><span class="status warn">missing — type it on the card below</span></td>' : `<td><b>${eur(x.c.priceEur)}</b>${x.o.cur !== 'EUR' ? '<br><small>' + esc(x.o.cur) + ' ' + Math.round(offerPrice(x.o)).toLocaleString('en-US') + '</small>' : ''}</td>`).join('')}</tr>
        ${[['intl', 'Flights from ' + M.home, mineR.cats.intl, o => o.incl.flight], ['hotel', 'Hotels', mineR.cats.hotel, o => o.incl.hotels], ['move', 'Travel inside the country, taxis', mineR.cats.inter + mineR.cats.local, o => o.incl.domestic], ['food', 'Food & drinks', mineR.cats.food, o => o.incl.meals === 'all'], ['acts', 'Activities & guide', mineR.cats.acts, o => o.incl.activities], ['fixed', 'Visa, insurance, SIM', mineR.cats.fixed, o => o.incl.visa && o.incl.insurance && o.incl.sim], ['shop', 'Shopping', mineR.cats.shop, () => false], ['reserve', 'Reserve', mineR.cats.reserve, () => false]].map(([k, label, ours, isInc]) =>
          `<tr><td>${esc(label)}</td><td class="num">${eur(ours)}</td>${offers.map(x => { const v = x.c.add.filter(a => a[3] === k).reduce((a, y) => a + y[1], 0), why = x.c.add.filter(a => a[3] === k).map(a => a[0] + (a[2] ? ' — ' + a[2] : '')).join('; '); return `<td>${v > 0.5 ? `<span data-tip="${esc(why)}" tabindex="0">${isInc(x.o) || (k === 'food' && x.o.incl.meals !== 'none') || (k === 'move' && x.o.incl.domestic) ? '<span class="status good">✓ partly in the package</span> ' : ''}+ ${eur(v)}</span>` : '<span class="status good">✓ in the package</span>'}</td>`; }).join('')}</tr>`).join('')}
        <tr class="sep"><td><b>Everything together</b></td><td class="num"><b>${eur(mineR.total)}</b></td>${offers.map(x => `<td><b>${x.c.missing ? '?' : eur(x.c.total)}</b></td>`).join('')}</tr>
        <tr><td>Compared with our chosen route</td><td>–</td>${offers.map(x => { if (x.c.missing) return '<td>?</td>'; const d = x.c.total - mineR.total; return `<td><span class="status ${d <= 0 ? 'good' : 'bad'}">${d <= 0 ? '▼ ' + eur(-d) + ' cheaper' : '▲ ' + eur(d) + ' dearer'}</span></td>`; }).join('')}</tr>
        <tr><td>Per night</td><td class="num">${eur(mineR.total / Math.max(1, mineR.m.nights))}</td>${offers.map(x => `<td>${x.c.missing ? '?' : eur(x.c.total / x.c.n)}</td>`).join('')}</tr></tbody></table></div>
        <p class="muted small">How to read it: the left column is our chosen route with every cost. For each package, “✓ in the package” means the package price already covers that line; “+ €…” is what we still pay on top (hover or tap it to see why).</p>
        <p class="muted small">Our own plan is whatever is chosen under Flights, Routes and Hotels. Exchange rates used: £1 = €<input class="fx" type="number" step="0.01" min="0" data-fx="GBP" value="${fx.GBP}"> · $1 = €<input class="fx" type="number" step="0.01" min="0" data-fx="USD" value="${fx.USD}"> — change them to today’s rate.</p></div>` : '<p class="card">No offers yet — add the first one below.</p>'}
      <div class="grid2">${offers.map(({ o, c }) => `<div class="card offer"><div class="tip-top">${pill(o.mine ? 'added by us' : 'offer', o.mine ? 'accent' : '')}<span class="status info">${esc(o.dates || c.n + ' nights')}</span></div>
        <h3>${esc(o.company)} — ${esc(o.name)}</h3>${o.url ? `<p class="small"><a href="${esc(o.url)}" target="_blank" rel="noopener">Open the offer ↗</a></p>` : ''}
        ${typeof o.price === 'number' ? `<div class="mode-price">${eur(c.priceEur)} <small>asked for two${o.cur !== 'EUR' ? ' (' + esc(o.cur) + ' ' + Math.round(o.price).toLocaleString('en-US') + ')' : ''}${o.priceNote ? ' · ' + esc(o.priceNote) : ''}</small></div>` : `<label class="field"><b>Price for two in ${esc(o.cur)}</b> — ${esc(o.priceNote || 'not shown in the offer we received')}${PRINT ? '' : `<input type="number" min="0" step="1" data-ofprice="${esc(o.id)}" class="${c.missing ? '' : 'set'}" value="${c.missing ? '' : ofp[o.id]}" placeholder="type the total from the offer">`}</label>${c.missing ? '' : `<div class="mode-price">${eur(c.priceEur)} <small>for two</small></div>`}`}
        <dl class="incl"><dt>Flights from ${esc(M.home)}</dt><dd>${yes(o.incl.flight)}</dd><dt>Hotels</dt><dd>${yes(o.incl.hotels)} ${esc(o.hotelClass || '')}</dd><dt>Travel inside the country</dt><dd>${yes(o.incl.domestic)}</dd><dt>Meals</dt><dd>${esc((MEALS[o.incl.meals] || MEALS.none)[0])}</dd><dt>Activities & guide</dt><dd>${yes(o.incl.activities)}</dd><dt>Visa</dt><dd>${yes(o.incl.visa)}</dd><dt>Insurance</dt><dd>${yes(o.incl.insurance)}</dd></dl>
        ${o.includes ? `<h4>What you get</h4><ul class="pros">${o.includes.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}${o.watch ? `<h4>What to check</h4><ul class="cons">${o.watch.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}${o.note ? `<p>${esc(o.note)}</p>` : ''}
        <details class="line"><summary><span>What we add to compare fairly</span><b>${eur(c.total - c.priceEur)}</b></summary><div class="line-body">${c.add.map(a => `<div class="sub"><div><b>${esc(a[0])}</b><span>${eur(a[1])}</span></div><p>${esc(a[2])}</p></div>`).join('')}</div></details>
        <div class="line total"><span>Comparable total for two</span><b>${c.missing ? 'price missing' : eur(c.total)}</b></div>
        ${c.diy ? `<details class="line"><summary><span>If we booked this same trip ourselves (rough estimate)</span><b>about ${eur(Math.round(c.diy.total / 50) * 50)}</b></summary><div class="line-body"><p class="small">${esc(o.diy.assume || '')}</p>${c.diy.lines.map(a => `<div class="sub"><div><b>${esc(a[0])}</b><span>${eur(a[1])}</span></div><p>${esc(a[2])}</p></div>`).join('')}<div class="sub"><div><b>Plus the same extras as above (meals not included, visas, insurance, shopping) and the reserve</b><span>${eur(c.diy.total - c.diy.lines.reduce((a, x) => a + x[1], 0))}</span></div></div></div></details>` : ''}
        ${o.mine && !PRINT ? `<div class="det-actions"><button class="btn small" data-offerdel="${esc(o.id)}">Delete</button></div>` : ''}</div>`).join('')}</div>
      ${PRINT ? '' : `<div class="card addhotel"><h3>➕ Add an offer from another company</h3><div class="addgrid">
        <label class="field">Company<input type="text" id="of-company" maxlength="60" placeholder="e.g. TUI"></label>
        <label class="field">Name of the trip<input type="text" id="of-name" maxlength="90" placeholder="e.g. Vietnam highlights"></label>
        <label class="field">Price for two<input type="number" id="of-price" min="0" step="1" placeholder="e.g. 4200"></label>
        <label class="field">Currency<select id="of-cur"><option>EUR</option><option>GBP</option><option>USD</option></select></label>
        <label class="field">Nights<input type="number" id="of-nights" min="1" max="60" value="${tripN}"></label>
        <label class="field">Beach nights<input type="number" id="of-beach" min="0" max="60" placeholder="0"></label>
        <label class="field">Hotel class<input type="text" id="of-class" maxlength="20" placeholder="e.g. 4★"></label>
        <label class="field">Meals<select id="of-meals">${Object.keys(MEALS).map(k => `<option value="${k}">${MEALS[k][0]}</option>`).join('')}</select></label></div>
        <p class="small"><b>Included in the price:</b></p><div class="chips">${[['flight', 'Flights from ' + M.home], ['hotels', 'Hotels'], ['domestic', 'Travel inside the country'], ['activities', 'Activities & guide'], ['visa', 'Visa'], ['insurance', 'Insurance'], ['sim', 'SIM / eSIM']].map(([k, n]) => `<label class="chip"><input type="checkbox" data-ofinc="${k}" ${k === 'hotels' ? 'checked' : ''}>${esc(n)}</label>`).join('')}</div>
        <label class="field">Link (optional)<input type="url" id="of-url" placeholder="https://…"></label><label class="field">Note (optional)<input type="text" id="of-note" maxlength="200"></label>
        <button class="btn primary" id="of-add">Add offer</button> <span class="muted small" id="of-msg"></span></div>`}`;
  }

  /* ---------- OUR PRICES ---------- */
  function ovRow(key, label, def, unit, note) {
    return `<tr><td>${label}${note ? `<br><small>${esc(note)}</small>` : ''}</td><td class="num">${eur(def)}</td><td><input type="number" min="0" step="1" data-ov="${esc(key)}" class="${typeof ov[key] === 'number' ? 'set' : ''}" value="${typeof ov[key] === 'number' ? ov[key] : ''}" placeholder="${Math.round(def)}" aria-label="Our price for ${esc(label)}"></td><td><small>${esc(unit)}</small></td></tr>`;
  }
  function renderMineSummary() {
    const rows = T.scenarios.map(s => { const c = cfgFromScenario(s); useOv = false; const a = compute(c).total; useOv = true; return { label: s.id + '  ' + s.short, a, b: compute(c).total }; });
    useOv = false; const ca = compute(calc).total; useOv = true; rows.push({ label: '★  Our own plan', a: ca, b: compute(calc).total });
    const n = Object.keys(ov).length;
    $('#mine-sum').innerHTML = `<div class="card sticky"><h3>Effect on every route</h3><p class="muted small">${n ? n + ' own price' + (n > 1 ? 's' : '') + ' active — used everywhere on this site.' : 'No own prices yet. Type one on the left and watch the totals change.'}</p>
      <table class="mini sumtbl"><thead><tr><th>Route</th><th>Researched</th><th>With our prices</th><th>Change</th></tr></thead><tbody>${rows.map(r => { const d = r.b - r.a; return `<tr><td>${esc(r.label)}</td><td class="num">${eur(r.a)}</td><td class="num"><b>${eur(r.b)}</b></td><td class="num">${Math.abs(d) < 0.5 ? '–' : `<span class="status ${d < 0 ? 'good' : 'bad'}">${d < 0 ? '▼ −' : '▲ +'}${eur(Math.abs(d))}</span>`}</td></tr>`; }).join('')}</tbody></table>
      ${barChart(rows.map(r => ({ label: r.label, v: r.b })), { band: [T.meta.budgetMin, T.meta.budgetMax] })}
      <div class="det-actions"><button class="btn" id="ov-reset">Clear all our prices</button><button class="btn primary" data-go="compare">Compare routes</button></div></div>`;
  }
  function renderMine() {
    const P = T.places, pk = Object.keys(P);
    const grp = (t, d, rows) => `<div class="card"><h3>${t}</h3><p class="muted small">${d}</p><div class="tablewrap flat"><table class="mini ovtbl"><thead><tr><th>Item</th><th>Researched</th><th>Our price €</th><th></th></tr></thead><tbody>${rows.join('')}</tbody></table></div></div>`;
    $('#mine').innerHTML = `<div class="head"><div><h2>Our own prices</h2><p class="muted">Found something cheaper — a friend’s flat, a flight deal, a driver someone recommended? Type the price here. It replaces the researched number everywhere: all routes, the comparison, and the calculator recalculate at once. Leave a box empty to keep the researched price; type 0 for free.</p></div></div>
      <div class="calc"><div id="calc-inputs-m" class="stackcol">
      ${grp('✈️ Flights from ' + esc(M.home), 'Per person, return, including a checked bag.', [ovRow('flightown', '<b>Our own flight price</b>', (T.flights.find(f => f.id === gf) || T.flights[0]).pp.typ, 'per person', 'Replaces the chosen flight everywhere')].concat(T.flights.map(f => ovRow('flight:' + f.id, `<b>${esc(f.airline)}</b>`, f.pp.typ, 'per person'))))}
      ${grp('🏨 Hotels', 'Per night for your double room. Researched price shown is the “Good 3–4★” level; your own price is used for every night (no New-Year surcharge added).', pk.map(k => ovRow('hotel:' + k, `${P[k].emoji} <b>${esc(P[k].name)}</b>`, P[k].hotel.mid, 'per night')))}
      ${grp('🍜 Food & drinks', 'Per day for both of you.', pk.map(k => ovRow('food:' + k, `${P[k].emoji} <b>${esc(P[k].name)}</b>`, P[k].food.mixed, 'per day, two people')))}
      ${grp('🚕 Taxis & local transport', 'Per day for both of you.', pk.map(k => ovRow('local:' + k, `${P[k].emoji} <b>${esc(P[k].name)}</b>`, P[k].localPerDay, 'per day, two people')))}
      ${grp('🧭 Journeys inside Vietnam', 'Per person, one way, door to door.', Object.keys(T.legs).flatMap(k => { const [a, b] = k.split('|'); return T.legs[k].map(m => ovRow('leg:' + k + ':' + m.id, `<b>${esc(P[a].short)} ⇄ ${esc(P[b].short)}</b> · ${m.icon || ''} ${esc(m.label)}`, m.pp, 'per person')); }))}
      ${grp('🎟 Activities', 'For both of you together.', T.activities.map(a => ovRow('act:' + a.id, `${P[a.place].emoji} <b>${esc(a.name)}</b>`, a.for2, 'for two')))}
      ${grp('🛂 Essentials', 'For both of you together.', Object.keys(T.fixed).map(k => ovRow('fixed:' + k, `<b>${esc(T.fixed[k].label)}</b>`, T.fixed[k].for2, 'for two')))}
      </div><div id="mine-sum"></div></div>`;
    renderMineSummary();
  }

  /* ---------- TIPS ---------- */
  function renderTips() {
    const topics = [...new Set(T.tips.map(t => t.topic))];
    const sel = views.tipTopic || 'all', q = (views.tipQ || '').toLowerCase();
    const list = T.tips.filter(t => (PRINT || sel === 'all' || t.topic === sel) && (!q || (t.text + t.title).toLowerCase().includes(q)));
    const echo = { consensus: ['good', 'many travellers agree'], several: ['info', 'said by several'], single: ['warn', 'one traveller’s view'], official: ['good', 'official source'] };
    const body = `<div class="grid3 tips">${list.map(t => `<div class="card tip"><div class="tip-top">${pill(t.topic)}<span class="status ${(echo[t.echo] || echo.several)[0]}">${(echo[t.echo] || echo.several)[1]}</span></div><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p>${srcLinks(t.src)}</div>`).join('') || '<p>No tips match.</p>'}</div>`;
    if ($('#tips-body') && !PRINT) { $('#tips-body').innerHTML = body; $$('#tips [data-topic]').forEach(b => b.classList.toggle('on', b.dataset.topic === sel)); return; }
    $('#tips').innerHTML = `<div class="head"><div><h2>What other travellers recommend</h2><p class="muted">${T.tips.length} tips collected from travel forums, local news, blogs and official sites — paraphrased, each with its source. Reddit blocks automated reading, so its threads could not be included.</p></div></div>
      <div class="controls"><div class="chips"><button class="chip btnchip on" data-topic="all">All</button>${topics.map(t => `<button class="chip btnchip" data-topic="${esc(t)}">${esc(t)}</button>`).join('')}</div>
      <input type="search" id="tip-q" placeholder="Search tips… e.g. taxi, jellyfish, ATM" aria-label="Search tips"></div><div id="tips-body">${body}</div>`;
  }

  /* ---------- CHECKLIST & SOURCES ---------- */
  function renderPrep() {
    const done = store.get('todo', {});
    const must = T.mustDo ? `<div class="must"><h2>⚠️ Important preparation — we must do these</h2><p>Without these you may not be allowed to board or enter ${esc(M.country)}, or you travel unprotected. Do them first.</p>${T.mustDo.map((it, i) => { const id = 'must' + i; return `<label class="check todo"><input type="checkbox" data-todo="${id}" ${done[id] ? 'checked' : ''}><span><b>${esc(it.t)}</b> ${it.when ? `<em>${esc(it.when)}</em>` : ''}<small>${esc(it.d || '')} ${srcLinks(it.src)}</small></span></label>`; }).join('')}</div>` : '';
    $('#prep').innerHTML = must + `<div class="head"><div><h2>Before you go and what to pack</h2><p class="muted">Bookings, papers, health, clothes and everything for the suitcase. Tick things off — it is remembered on this device.</p></div></div>
      <div class="grid2">${T.checklist.map(g => `<div class="card"><h3>${g.icon} ${esc(g.t)}</h3>${g.items.map((it, i) => { const id = g.t + i; return `<label class="check todo"><input type="checkbox" data-todo="${esc(id)}" ${done[id] ? 'checked' : ''}><span>${esc(it.t)} <small>${esc(it.d || '')} ${srcLinks(it.src)}</small></span></label>`; }).join('')}</div>`).join('')}</div>
      ${T.health ? `<h2>Health and vaccinations</h2><p class="muted">${esc(T.health.intro)}</p><div class="tablewrap"><table class="tbl"><thead><tr><th>Vaccine / risk</th><th>For this trip</th><th>What to know</th></tr></thead><tbody>${T.health.rows.map(r => `<tr><td><b>${esc(r.v)}</b></td><td><span class="status ${r.lvl}">${esc(r.lbl)}</span><br><small>${esc(r.who)}</small></td><td>${esc(r.d)}</td></tr>`).join('')}</tbody></table></div><p>${srcLinks(T.health.src)}</p>` : ''}
      ${T.entry ? `<h2>Visas and entry — for your two passports</h2><div class="grid2">${T.entry.map(e => `<div class="card"><div class="ico">${e.icon}</div><h3>${esc(e.t)}</h3>${e.p.map(x => `<p>${esc(x)}</p>`).join('')}${srcLinks(e.src)}</div>`).join('')}</div>` : ''}
      <h2>Weather and sea, 29 Dec – 15 Jan</h2><div class="tablewrap"><table class="tbl"><thead><tr><th>Place</th><th>Air</th><th>Rain</th><th>Sea & swimming</th><th>Swim score</th></tr></thead><tbody>${Object.values(T.places).map(p => `<tr><td>${p.emoji} <b>${esc(p.name)}</b></td><td>${esc(p.wx.air)}</td><td>${esc(p.wx.rain)}</td><td>${esc(p.wx.sea)}</td><td>${dots(p.swim)}</td></tr>`).join('')}</tbody></table></div>
      <h2>Sources</h2><p class="muted">Checked ${esc(T.meta.updatedHuman)}. Prices move — especially flights and New-Year hotel nights — so re-check before paying.</p>
      <ol class="sources">${T.sources.map(s => `<li><a href="${esc(s.u)}" target="_blank" rel="noopener">${esc(s.t)}</a>${s.d ? ' — ' + esc(s.d) : ''}</li>`).join('')}</ol>`;
  }

  /* ---------- routing & events ---------- */
  const TABS = { overview: renderOverview, routes: renderRoutes, compare: renderCompare, flights: renderFlights, around: renderAround, hotels: renderHotels, offers: renderOffers, calc: renderCalc, mine: renderMine, tips: renderTips, prep: renderPrep };
  let tab = 'overview';
  function go(t, keepScroll) {
    if (!TABS[t]) t = 'overview'; tab = t;
    $$('.tabpane').forEach(p => p.hidden = !PRINT && p.id !== t);
    $$('nav [data-go]').forEach(b => b.classList.toggle('on', b.dataset.go === t));
    TABS[t](); writeSummary();
    if (!keepScroll) window.scrollTo({ top: 0 });
    if (!PRINT && !location.hash.startsWith('#plan=')) history.replaceState(null, '', '#' + t);
  }
  function writeSummary() { try { const r = compute(calc), f = T.flights.find(x => x.id === gf) || T.flights[0]; localStorage.setItem('trips.summary.' + M.key, JSON.stringify({ total: Math.round(r.total), route: planName(), flight: has('flightown') ? 'Our own price' : f.airline, nights: tripN, d0, d1, picked, at: Date.now() })); } catch (e) { } }
  const rerender = () => { TABS[tab](); if ($('#dlg').open) openDetail($('#dlg').dataset.sid); };

  document.addEventListener('click', e => {
    const t = e.target.closest('button, [data-open], a'); if (!t) return;
    const d = t.dataset;
    if (d.saver) { if (d.saver === 'all') SAVERS.forEach(sv => { if (!sv.risky && !(calc.undo && calc.undo[sv.id]) && saverState(sv).saving > 0.5) toggleSaver(sv.id); }); else toggleSaver(d.saver); saveCalc(); return renderCalc(); }
    if (d.usehotel) { const k = d.usehotel, h = findHotel(k, d.hid); if (hsel[k] === d.hid) delete hsel[k]; else if (h) hsel[k] = d.hid; syncHotel(k); return renderHotels(); }
    if (d.choose) { calc = cfgFromScenario(scen(d.choose)); saveCalc(); mark('r'); delete views.hplace; if (d.then) { $('#dlg').close(); return go(d.then); } return rerender(); }
    if (d.myhdel) { const h = myHotels.find(x => x.id === d.myhdel); myHotels = myHotels.filter(x => x.id !== d.myhdel); store.set('myh', myHotels); if (h) syncHotel(h.place); return renderHotels(); }
    if (d.offerdel) { myOffers = myOffers.filter(o => o.id !== d.offerdel); store.set('offers', myOffers); return renderOffers(); }
    if (t.id === 'of-add') { const company = $('#of-company').value.trim(), price = +$('#of-price').value; if (!company || !(price > 0)) { $('#of-msg').textContent = 'Please type the company and the price.'; return; }
      let url = $('#of-url').value.trim(); if (url && !/^https?:\/\//i.test(url)) url = '';
      const incl = { meals: $('#of-meals').value }; $$('[data-ofinc]').forEach(c => incl[c.dataset.ofinc] = c.checked);
      myOffers.push({ id: 'of-' + Date.now().toString(36), mine: true, company, name: $('#of-name').value.trim() || 'Package', price, cur: $('#of-cur').value, nights: Math.max(1, Math.min(60, +$('#of-nights').value || tripN)), beachNights: $('#of-beach').value === '' ? null : +$('#of-beach').value, hotelClass: $('#of-class').value.trim(), incl, url, note: $('#of-note').value.trim() });
      store.set('offers', myOffers); return renderOffers(); }
    if (t.id === 'myh-add') { const name = $('#myh-name').value.trim(), k = $('#myh-place').value, pv = $('#myh-price').value; if (!name) { $('#myh-msg').textContent = 'Please type the hotel name.'; return; }
      let url = $('#myh-url').value.trim(); if (url && !/^https?:\/\//i.test(url)) url = '';
      const h = { id: 'my-' + Date.now().toString(36), place: k, name, mine: true, url, good: $('#myh-note').value.trim() }; if (pv !== '' && +pv >= 0) h.price = +pv;
      myHotels.push(h); store.set('myh', myHotels); views.hplace = k; if (typeof h.price === 'number') { hsel[k] = h.id; syncHotel(k); } return renderHotels(); }
    if (d.hplace) { views.hplace = d.hplace; return renderHotels(); }
    if (d.go) { e.preventDefault(); if (location.hash.startsWith('#plan=')) history.replaceState(null, '', '#'); return go(d.go); }
    if (d.close !== undefined) return $('#dlg').close();
    if (d.tocalc) { calc = cfgFromScenario(scen(d.tocalc)); saveCalc(); mark('r'); $('#dlg').close(); return go('calc'); }
    if (d.open) return openDetail(d.open);
    if (d.v && t.parentElement.dataset.view) { views[t.parentElement.dataset.view] = d.v; return rerender(); }
    if (d.mood) { mood = d.mood; return renderCompare(); }
    if (d.pickflight) { mark('f'); gf = d.pickflight; store.set('gf', gf); delete ov.flightown; store.set('ov', ov); if (calc.undo) delete calc.undo.flight; saveCalc(); return renderFlights(); }
    if (d.datereset !== undefined) return setDates(DEF0, DEF1);
    if (d.tripfit) return setDates(d0, isoAdd(d0, Math.max(3, Math.min(30, +d.tripfit))));
    if (d.leg) { views.leg = d.leg; return renderAround(); }
    if (d.topic) { views.tipTopic = d.topic; return renderTips(); }
    if (d.preset) { calc = cfgFromScenario(scen(d.preset)); saveCalc(); mark('r'); return renderCalc(); }
    if (d.step !== undefined) { const s = calc.stops[+d.step]; s.nights = Math.max(0, Math.min(30, s.nights + +d.d)); custom(); fitDates(); saveCalc(); return renderCalc(); }
    if (d.mv !== undefined) { const i = +d.mv, j = i + +d.d; [calc.stops[i], calc.stops[j]] = [calc.stops[j], calc.stops[i]]; custom(); saveCalc(); return renderCalc(); }
    if (d.rm !== undefined) { calc.stops.splice(+d.rm, 1); if (!calc.stops.length) calc.stops.push({ place: HUB, nights: 3 }); custom(); fitDates(); saveCalc(); return renderCalc(); }
    if (d.addstop !== undefined) { calc.stops.push({ place: (Object.keys(T.places).find(k => T.places[k].beach) || HUB), nights: 2 }); custom(); fitDates(); saveCalc(); return renderCalc(); }
    if (d.level) { calc.level = d.level; saveCalc(); return renderCalc(); }
    if (d.hl) { calc.hotelLvl = d.hl; custom(); saveCalc(); return renderCalc(); }
    if (d.fl) { calc.foodLvl = d.fl; custom(); saveCalc(); return renderCalc(); }
    if (t.id === 'ov-reset') { ov = {}; hsel = {}; store.set('ov', ov); store.set('hsel', hsel); return renderMine(); }
    if (t.id === 'c-reset') { calc = cfgFromScenario(scen(T.meta.recommended)); saveCalc(); return renderCalc(); }
    if (t.id === 'c-share') {
      const url = location.origin + location.pathname + '#plan=' + btoa(unescape(encodeURIComponent(JSON.stringify({ calc, ov, hsel, hprice, myHotels, gf, d0, d1 }))));
      const ok = () => $('#share-msg').textContent = '✓ Link copied — send it to your travel partner.';
      (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(ok, () => { prompt('Copy this link:', url); });
    }
    if (t.id === 'theme') { const r = document.documentElement; const dark = r.dataset.theme ? r.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; r.dataset.theme = dark ? 'light' : 'dark'; store.set('theme', r.dataset.theme); }
    if (t.id === 'print') window.open('trip-report.pdf', '_blank');
    if (d.cmp === undefined && d.todo === undefined) writeSummary();
  });
  document.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('article[data-open]')) { e.preventDefault(); openDetail(e.target.dataset.open); } });
  function setDates(a, b) {
    if (!isoOk(a) || !isoOk(b)) return; const n = nightsBetween(a, b); if (n < 3 || n > 30) { const m = $('#nights-msg') || $('.tripctl'); if (m) m.insertAdjacentHTML('beforeend', ' <span class="status bad">Please choose 3 to 30 nights.</span>'); return; }
    d0 = a; d1 = b; tripN = n; store.set('d0', d0); store.set('d1', d1);
    calc.stops = scaleStops(calc.stops, tripN); saveCalc();
    rerender();
  }
  function fitDates() { const n = calc.stops.reduce((a, x) => a + x.nights, 0); if (n >= 3 && n <= 30) { tripN = n; d1 = isoAdd(d0, n); store.set('d1', d1); } }
  document.addEventListener('change', e => {
    const t = e.target, d = t.dataset;
    if (d.date) return setDates(d.date === 'd0' ? t.value : d0, d.date === 'd1' ? t.value : (d.date === 'd0' && nightsBetween(t.value, d1) < 3 ? isoAdd(t.value, tripN) : d1));
    if (d.cmp) { compareSel = t.checked ? compareSel.concat(d.cmp) : compareSel.filter(x => x !== d.cmp); store.set('cmp', compareSel); return renderCompare(); }
    if (d.todo) { const o = store.get('todo', {}); o[d.todo] = t.checked; return store.set('todo', o); }
    if (d.hstay) return renderHotels();
    if (d.ofprice) { const v = +t.value; if (t.value === '' || !(v > 0)) delete ofp[d.ofprice]; else ofp[d.ofprice] = v; store.set('ofp', ofp); return renderOffers(); }
    if (d.fx) { const v = +t.value; if (v > 0) { fx[d.fx] = v; store.set('fx', { GBP: fx.GBP, USD: fx.USD }); } return renderOffers(); }
    if (d.hsel) { if (t.value) hsel[d.hsel] = t.value; else delete hsel[d.hsel]; syncHotel(d.hsel); return renderHotels(); }
    if (d.stop !== undefined) { calc.stops[+d.stop].place = t.value; custom(); saveCalc(); return renderCalc(); }
    if (t.id === 'c-flight') { mark('f'); gf = t.value; store.set('gf', gf); delete ov.flightown; store.set('ov', ov); if (calc.undo) delete calc.undo.flight; saveCalc(); return renderCalc(); }
    if (d.legmode) { calc.legMode[d.legmode] = t.value; custom(); saveCalc(); return renderCalcResult(); }
    if (d.act) { calc.acts = t.checked ? calc.acts.concat(d.act) : calc.acts.filter(x => x !== d.act); custom(); saveCalc(); return renderCalcResult(); }
    if (d.fx) { calc[d.fx] = t.checked; saveCalc(); return renderCalcResult(); }
    if (t.id === 'c-peak') { calc.peak = t.checked; saveCalc(); return renderCalcResult(); }
    if (t.id === 'c-gala') { calc.gala = t.checked; saveCalc(); return renderCalcResult(); }
  });
  document.addEventListener('input', e => {
    const t = e.target, d = t.dataset;
    if (t.id === 'c-shop') { calc.shopping = +t.value; $('#o-shop').textContent = eur(calc.shopping); }
    else if (t.id === 'c-res') { calc.reservePct = +t.value; $('#o-res').textContent = calc.reservePct + '%'; }
    else if (d.hstay) { const k = d.hk, sd = stayDates(k), v = +t.value; if (!sd) return;
      if (t.value === '' || isNaN(v) || v < 0) { delete hconf[d.hstay]; delete hprice[d.hstay]; } else { hconf[d.hstay] = { a: sd.a, b: sd.b, n: sd.n, total: v }; hprice[d.hstay] = Math.round(v / sd.n); hsel[k] = d.hstay; }
      store.set('hconf', hconf); store.set('hprice', hprice); syncHotel(k); t.classList.toggle('set', !!hconf[d.hstay]);
      const pn = t.closest('.hotel').querySelector('.pern'); if (pn) pn.innerHTML = hconf[d.hstay] ? '<span class="status good">✓ real price · ' + eur(v / sd.n) + ' a night</span>' : '<span class="status warn">estimate until we type the Booking total</span>';
      return renderHotelSum(); }
    else if (d.hprice) { if (t.value === '' || isNaN(+t.value) || +t.value < 0) delete hprice[d.hprice]; else hprice[d.hprice] = +t.value; store.set('hprice', hprice); t.classList.toggle('set', d.hprice in hprice); if (hsel[d.hk] === d.hprice) syncHotel(d.hk); return renderHotelSum(); }
    else if (d.ov) { if (d.ov === 'flightown') mark('f'); if (t.value === '' || isNaN(+t.value) || +t.value < 0) delete ov[d.ov]; else ov[d.ov] = +t.value; store.set('ov', ov); if (d.ov.startsWith('hotel:')) { delete hsel[d.ov.slice(6)]; store.set('hsel', hsel); } t.classList.toggle('set', d.ov in ov); if (tab === 'flights') { const fs = $('#flight-sum'), v = t.value; fs.innerHTML = flightSum(); const n = fs.querySelector('[data-ov]'); if (n) { n.focus(); n.value = ''; n.value = v; } $$('.frow').forEach(r => r.classList.toggle('on', !has('flightown') && r.querySelector('[data-pickflight]').dataset.pickflight === gf)); return; } if (tab === 'mine') return renderMineSummary(); }
    else if (t.id === 'tip-q') { views.tipQ = t.value; return renderTips(); }
    else return;
    saveCalc(); renderCalcResult();
  });
  $('#dlg').addEventListener('click', e => { if (e.target.id === 'dlg') e.target.close(); });

  window.addEventListener('hashchange', () => { const h = location.hash.slice(1); if (!PRINT && TABS[h] && h !== tab) go(h); });

  /* tooltip */
  const tip = $('#tip');
  const showTip = e => { const el = e.target.closest && e.target.closest('[data-tip]'); if (!el) { tip.hidden = true; return; }
    tip.textContent = el.dataset.tip; tip.hidden = false; const r = el.getBoundingClientRect();
    const x = e.clientX || r.left + r.width / 2, y = (e.clientY || r.top);
    tip.style.left = Math.max(8, Math.min(innerWidth - tip.offsetWidth - 8, x - tip.offsetWidth / 2)) + 'px'; tip.style.top = Math.max(8, y - tip.offsetHeight - 12) + 'px'; };
  document.addEventListener('mousemove', showTip); document.addEventListener('focusin', showTip); document.addEventListener('click', showTip);
  document.addEventListener('scroll', () => tip.hidden = true, true);

  /* boot */
  const th = store.get('theme', null); if (th) document.documentElement.dataset.theme = th;
  $('#updated').textContent = T.meta.updatedHuman; document.title = M.title; $('#brand').textContent = M.title; $('#logo').textContent = M.emoji;
  const sw = $('#tripsw'); if (sw && window.TRIPS) { sw.innerHTML = window.TRIPS.map(t => `<option value="${esc(t.key)}" ${t.key === M.key ? 'selected' : ''}>${t.emoji} ${esc(t.country)}</option>`).join(''); sw.addEventListener('change', () => { location.href = '../' + sw.value + '/'; }); }
  if (PRINT) { document.body.classList.add('print'); Object.keys(TABS).forEach(k => { tab = k; TABS[k](); }); $$('.tabpane').forEach(p => p.hidden = false); }
  else go(sharedPlan ? 'calc' : (location.hash.slice(1) || 'overview'));
  pull(true); setInterval(() => { if (syncOn && !document.hidden) pull(false); }, 15000);
  document.addEventListener('visibilitychange', () => { if (syncOn && !document.hidden) pull(false); });
  window.__trip = { compute, cfgFromScenario };
})();
