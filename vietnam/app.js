/* Sophie & Mohsey in Vietnam — app logic. All prices live in data.js. */
(function () {
  'use strict';
  const T = window.TRIP;
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
  const D0 = Date.UTC(2026, 11, 29);
  const fmtD = off => new Date(D0 + off * 864e5).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });

  /* ---------- own prices (overrides) ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('smv.' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('smv.' + k, JSON.stringify(v)); } catch (e) { } }
  };
  let ov = store.get('ov', {});
  let useOv = true;
  const has = k => useOv && typeof ov[k] === 'number';
  const pr = (k, def) => has(k) ? ov[k] : def;
  const mine = k => has(k) ? ' ★ your own price.' : '';

  /* ---------- model ---------- */
  const legKey = (a, b) => [a, b].sort().join('|');
  const legOptions = (a, b) => T.legs[legKey(a, b)] || [T.genericLeg];

  function cfgFromScenario(s) {
    return {
      name: s.id === 'custom' ? 'Our own plan' : s.id + ' · ' + s.title, base: s.id,
      stops: s.stops.map(x => ({ place: x.place, nights: x.nights })),
      hotelLvl: 'mid', foodLvl: 'mixed',
      flightId: s.flight, level: 'typ',
      legMode: Object.assign({}, s.legMode || {}),
      acts: [...s.acts], shopping: T.meta.shopping, reservePct: T.meta.reservePct,
      visa: T.meta.visaDefault, insurance: true, sim: true, peak: true, gala: !!s.gala
    };
  }

  function compute(cfg, lvlOverride) {
    const P = T.places;
    const f = T.flights.find(x => x.id === cfg.flightId) || T.flights[0];
    const level = lvlOverride || cfg.level || 'typ';
    const lines = {}; CATS.forEach(c => lines[c.k] = []);
    const add = (k, label, amt, note, src) => lines[k].push({ label, amt, note, src });

    const fk = 'flight:' + f.id, pp = pr(fk, f.pp[level]);
    add('intl', `${f.airline} · ${f.route}`, pp * 2,
      `${eur(pp)} per person return × 2 — ${has(fk) ? '★ your own price' : LEVELS[level].toLowerCase() + ' estimate'}. ${f.bag || ''} ${f.note || ''}`, f.src);

    const stops = cfg.stops.filter(s => s.nights > 0);
    let night = 0; const timeline = [];
    stops.forEach(s => {
      const p = P[s.place];
      const hk = 'hotel:' + s.place, rate = pr(hk, p.hotel[cfg.hotelLvl]);
      const peakN = cfg.peak && !has(hk) ? Math.max(0, Math.min(night + s.nights, T.meta.peakNights) - night) : 0;
      const normN = s.nights - peakN;
      const amt = normN * rate + peakN * rate * p.peakMult;
      add('hotel', `${p.name} · ${s.nights} night${s.nights > 1 ? 's' : ''}`, amt,
        (normN ? `${normN} × ${eur(rate)}` : '') + (peakN ? `${normN ? ' + ' : ''}${peakN} New-Year night${peakN > 1 ? 's' : ''} × ${eur(rate * p.peakMult)} (+${Math.round((p.peakMult - 1) * 100)}%)` : '') + ` · double room, ${has(hk) ? '★ your own price for every night' : HOTEL_LVLS[cfg.hotelLvl]}. ${p.hotelNote || ''}`, p.src);
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
    if (cfg.gala && here.has('pq')) add('acts', T.fixed.gala.label, pr('fixed:gala', T.fixed.gala.for2), T.fixed.gala.note + mine('fixed:gala'), T.fixed.gala.src);
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
      m: { nights: night, beachNights, moves: stops.length, transitH, hassle: hassle + Math.max(0, stops.length - 1), intlH: f.durOut + f.durBack, stopsIntl: f.stops }
    };
  }

  /* ---------- state ---------- */
  const scen = id => T.scenarios.find(s => s.id === id);
  let calc = null;
  try { if (location.hash.startsWith('#plan=')) { const sh = JSON.parse(decodeURIComponent(escape(atob(location.hash.slice(6))))); calc = sh.calc; if (sh.ov) { ov = sh.ov; store.set('ov', ov); } window.__sh = sh; } } catch (e) { calc = null; }
  if (calc && (!Array.isArray(calc.stops) || !Array.isArray(calc.acts))) calc = null;
  const sharedPlan = !!calc;
  if (!calc) calc = store.get('calc', null);
  if (!calc || !Array.isArray(calc.stops) || !T.flights.some(f => f.id === calc.flightId)) calc = cfgFromScenario(scen(T.meta.recommended));
  calc.legMode = calc.legMode || {};
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
      <div class="tile"><small>Travel inside Vietnam</small><b>${hrs(m.transitH)}</b></div>
      <div class="tile"><small>Flights Vienna ⇄ Vietnam</small><b>${hrs(m.intlH)}</b><span class="muted">both ways, ${esc(res.flight.airline)}</span></div>
      <div class="tile"><small>Hassle score</small><b>${m.hassle}</b><span class="muted">lower = more relaxed</span></div></div>`;
  }

  /* ---------- ways to save ---------- */
  const SKIP_ACTS = ['cablecar', 'vinwonders', 'show', 'scuba', 'speedboat', 'parasail', 'halong', 'bana', 'tailor'];
  const cheapestFlight = c => { const f = T.flights.find(x => x.id === c.flightId) || T.flights[0]; return T.flights.filter(x => x.arr === f.arr && x.dep === f.dep).sort((a, b) => pr('flight:' + a.id, a.pp[c.level]) - pr('flight:' + b.id, b.pp[c.level]))[0]; };
  const SAVERS = [
    { id: 'flight', icon: '✈️', keys: ['flightId'], t: c => 'Fly with ' + cheapestFlight(c).airline, d: 'The cheapest airline on the same route. Usually longer layovers — and get a real quote first.', apply: c => { c.flightId = cheapestFlight(c).id; } },
    { id: 'hotel', icon: '🏨', keys: ['hotelLvl'], t: () => 'Simple, well-reviewed 3★ hotels', d: 'Clean room, good location, often still a pool — just fewer frills.', apply: c => { c.hotelLvl = 'budget'; } },
    { id: 'food', icon: '🍜', keys: ['foodLvl'], t: () => 'Street food for most meals', d: 'Pho, banh mi and market stalls are the best food in Vietnam anyway; keep a couple of nice dinners.', apply: c => { c.foodLvl = 'local'; } },
    { id: 'gala', icon: '🥂', keys: ['gala'], t: () => 'Pick a hotel without a New-Year gala fee', d: 'Small hotels rarely charge one. Ask before booking.', apply: c => { c.gala = false; } },
    { id: 'peak', icon: '🎆', keys: ['stops'], t: () => 'Spend New Year in Saigon, beach afterwards', d: 'Moves your city nights to the start so the island nights fall after the 29 Dec – 2 Jan surcharge.', apply: c => { const city = c.stops.filter(x => !T.places[x.place].beach), beach = c.stops.filter(x => T.places[x.place].beach); const f = T.flights.find(x => x.id === c.flightId) || T.flights[0]; if (!city.length || !beach.length) return; const hc = city.filter(x => x.place === 'hcmc'); if (f.dep === 'hcmc' && hc.length && hc.reduce((n, x) => n + x.nights, 0) > 1) { const tot = city.reduce((a, x) => { const e = a.find(y => y.place === x.place); e ? e.nights += x.nights : a.push({ place: x.place, nights: x.nights }); return a; }, []); const h = tot.find(x => x.place === 'hcmc'); h.nights -= 1; c.stops = [...tot.filter(x => x.nights > 0), ...beach, { place: 'hcmc', nights: 1 }]; } else c.stops = [...city, ...beach]; } },
    { id: 'legs', icon: '🚌', risky: true, keys: ['legMode'], t: () => 'Travel the cheapest way between places', d: 'Bus and ferry instead of flights and private cars. Much slower, and ferries can be cancelled in rough seas.', apply: c => { compute(c).legs.forEach(l => { const k = legKey(l.a, l.b); c.legMode[k] = [...l.opts].sort((a, b) => pr('leg:' + k + ':' + a.id, a.pp) - pr('leg:' + k + ':' + b.id, b.pp))[0].id; }); } },
    { id: 'acts', icon: '🎟', keys: ['acts'], t: () => 'Skip the pricey attractions', d: 'Drop cable car, theme park, shows, scuba and speedboat; keep the snorkel trip, massages and food tour.', apply: c => { c.acts = c.acts.filter(a => !SKIP_ACTS.includes(a)); } },
    { id: 'shop', icon: '🛍', keys: ['shopping'], t: () => 'Shopping allowance down to €50', d: 'Souvenirs are cheap; bargain from about half the first price.', apply: c => { c.shopping = Math.min(c.shopping, 50); } },
    { id: 'ins', icon: '🩺', keys: ['insurance'], t: () => 'Use travel insurance you already have', d: 'Many credit cards and annual policies include it — check the cover is valid for Vietnam and 19 days.', apply: c => { c.insurance = false; } },
    { id: 'res', icon: '🧯', keys: ['reservePct'], t: () => 'Smaller safety buffer (3%)', d: 'Only sensible once flights and hotels are booked at fixed prices.', apply: c => { c.reservePct = Math.min(c.reservePct, 3); } }
  ];
  const clone = o => JSON.parse(JSON.stringify(o));
  function saverState(sv) {
    const c = clone(calc); sv.apply(c);
    const saving = compute(calc).total - compute(c).total;
    return { saving, active: !!(calc.undo && calc.undo[sv.id]) };
  }
  function toggleSaver(id) {
    const sv = SAVERS.find(x => x.id === id); if (!sv) return;
    calc.undo = calc.undo || {};
    if (calc.undo[id]) { Object.assign(calc, clone(calc.undo[id])); delete calc.undo[id]; }
    else { const before = {}; sv.keys.forEach(k => before[k] = clone(calc[k])); sv.apply(calc); calc.undo[id] = before; }
    calc.base = 'custom';
  }
  function saversHTML() {
    const rows = SAVERS.map(sv => ({ sv, st: saverState(sv) })).filter(x => x.st.active || x.st.saving > 0.5);
    const c = clone(calc); SAVERS.forEach(sv => { if (!sv.risky && !(calc.undo && calc.undo[sv.id])) sv.apply(c); });
    const all = compute(c).total, now = compute(calc).total;
    return `<div class="savers"><div class="head"><h3>💡 Ways to pay less</h3></div><p class="muted small">Tap one to switch it on and watch the total change. Tap again to undo.</p>
      ${rows.map(({ sv, st }) => `<button class="saver ${st.active ? 'on' : ''}" data-saver="${sv.id}" aria-pressed="${st.active}"><span class="sv-ico">${st.active ? '✓' : sv.icon}</span><span class="sv-txt"><b>${esc(sv.t(calc))}</b><small>${esc(sv.d)}</small></span><span class="sv-amt">${st.active ? 'on · undo' : '−' + eur(st.saving)}</span></button>`).join('') || '<p class="muted small">Nothing left to cut — this is the lean version.</p>'}
      ${now - all > 0.5 ? `<button class="btn small" data-saver="all">Switch on all the comfortable ones → ${eur(all)}</button>` : ''}
      <details class="moretips"><summary>More ways to save that the calculator cannot count</summary><ul class="pros">${(T.saveTips || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul></details></div>`;
  }

  /* ---------- hotels ---------- */
  let hsel = store.get('hsel', {}), hprice = store.get('hprice', {}), myHotels = store.get('myh', []);
  if (window.__sh) { const sh = window.__sh; if (sh.hsel) { hsel = sh.hsel; store.set('hsel', hsel); } if (sh.hprice) { hprice = sh.hprice; store.set('hprice', hprice); } if (Array.isArray(sh.myHotels)) { myHotels = sh.myHotels.filter(h => h && typeof h.name === 'string' && T.places[h.place]).map(h => Object.assign(h, { mine: true, url: /^https?:\/\//i.test(h.url || '') ? h.url : '' })); store.set('myh', myHotels); } }
  const slug = x => String(x).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const hotelsFor = k => ((T.hotels && T.hotels[k]) || []).map(h => Object.assign({ id: k + '-' + slug(h.name) }, h)).concat(myHotels.filter(h => h.place === k));
  const hPrice = h => typeof hprice[h.id] === 'number' ? hprice[h.id] : h.price;
  const findHotel = (k, id) => hotelsFor(k).find(h => h.id === id);
  function syncHotel(k) { const h = findHotel(k, hsel[k]); if (h && typeof hPrice(h) === 'number') ov['hotel:' + k] = hPrice(h); else { delete ov['hotel:' + k]; delete hsel[k]; } store.set('ov', ov); store.set('hsel', hsel); }
  function hotelCard(h, k) {
    const on = hsel[k] === h.id, p = hPrice(h);
    return `<div class="card hotel ${on ? 'chosen' : ''}"><div class="tip-top">${pill(h.mine ? 'added by us' : ({ simple: 'simple · good value', good: 'good 3–4★', nice: 'nice 4–5★' }[h.tier] || h.tier), h.mine ? 'accent' : '')}<span class="status ${h.score ? 'good' : 'info'}">${h.score ? '★ ' + esc(h.score) : h.mine ? 'our own find' : 'score not seen'}</span></div>
      <h3>${esc(h.name)}</h3><p class="muted small">${esc(h.area || T.places[k].short)}${h.stars ? ' · ' + esc(h.stars) : ''}${h.breakfast ? ' · ' + esc(h.breakfast) : ''}</p>
      ${h.good ? `<ul class="pros"><li>${esc(h.good)}</li></ul>` : ''}${h.watch ? `<ul class="cons"><li>${esc(h.watch)}</li></ul>` : ''}
      ${PRINT ? `<div class="mode-price">${typeof p === 'number' ? '~' + eur(p) : '–'} <small>per night</small></div>` : `<label class="field">Price per night € ${typeof h.price === 'number' ? `<small>(we saw about ${eur(h.price)}${h.priceNote ? ', ' + esc(h.priceNote) : ''})</small>` : ''}<input type="number" min="0" step="1" data-hprice="${esc(h.id)}" data-hk="${k}" class="${typeof hprice[h.id] === 'number' ? 'set' : ''}" value="${typeof hprice[h.id] === 'number' ? hprice[h.id] : ''}" placeholder="${typeof h.price === 'number' ? h.price : 'type the price you found'}"></label>`}
      <p class="small"><a href="https://www.booking.com/searchresults.html?ss=${encodeURIComponent(h.name)}&group_adults=2&no_rooms=1" target="_blank" rel="noopener">Check the live price on Booking.com ↗</a>${h.url ? ` · <a href="${esc(h.url)}" target="_blank" rel="noopener">our link ↗</a>` : ''}</p>
      ${srcLinks(h.src)}${PRINT ? '' : `<div class="det-actions"><button class="btn small ${on ? 'primary' : ''}" data-usehotel="${k}" data-hid="${esc(h.id)}">${on ? '✓ Chosen for ' + esc(T.places[k].short) : 'Choose for ' + esc(T.places[k].short)}</button>${h.mine ? `<button class="btn small" data-myhdel="${esc(h.id)}">Delete</button>` : ''}</div>`}</div>`;
  }
  function hotelsMini(places) {
    return places.filter(k => hotelsFor(k).length).map(k => `<h4>${T.places[k].emoji} ${esc(T.places[k].short)}</h4><ul class="hotelmini">${hotelsFor(k).map(h => `<li class="${hsel[k] === h.id ? 'chosen' : ''}"><span><b>${hsel[k] === h.id ? '✓ ' : ''}${esc(h.name)}</b> <span class="muted">${esc(h.area || '')}</span></span><span>${h.score ? '★ ' + esc(h.score.split(' ')[0]) : ''} ${typeof hPrice(h) === 'number' ? '· ~' + eur(hPrice(h)) : ''}</span></li>`).join('')}</ul>`).join('');
  }
  function renderHotelSum() {
    const sid = views.hroute || T.meta.recommended, mineSel = sid === 'mine';
    const cfg = mineSel ? calc : cfgFromScenario(scen(sid)), r = compute(cfg);
    const nights = {}; r.timeline.forEach(t => nights[t.place] = (nights[t.place] || 0) + t.nights);
    const hotelCost = k => r.lines.hotel.filter(l => l.label.startsWith(T.places[k].name)).reduce((a, l) => a + l.amt, 0);
    $('#hotel-sum').innerHTML = `<div class="card"><h3>Hotels for this trip</h3>
      <div class="chips">${T.scenarios.map(x => `<button class="chip btnchip ${sid === x.id ? 'on' : ''}" data-hroute="${x.id}">${x.id} ${esc(x.short)}</button>`).join('')}<button class="chip btnchip ${mineSel ? 'on' : ''}" data-hroute="mine">★ Our own plan</button></div>
      <table class="mini sumtbl"><thead><tr><th>Stop</th><th>Hotel</th><th class="num">Per night</th><th class="num">Total</th></tr></thead><tbody>
      ${Object.keys(nights).map(k => `<tr><td>${T.places[k].emoji} <b>${esc(T.places[k].short)}</b><br><small class="muted">${nights[k]} night${nights[k] > 1 ? 's' : ''}</small></td>
        <td><select data-hsel="${k}" aria-label="Hotel in ${esc(T.places[k].short)}"><option value="">No hotel chosen — typical ${esc(HOTEL_LVLS[cfg.hotelLvl])} price</option>${hotelsFor(k).map(h => `<option value="${esc(h.id)}" ${hsel[k] === h.id ? 'selected' : ''} ${typeof hPrice(h) === 'number' ? '' : 'disabled'}>${esc(h.name)}${typeof hPrice(h) === 'number' ? ' · ' + eur(hPrice(h)) : ' · add a price first'}</option>`).join('')}</select></td>
        <td class="num">${eur(pr('hotel:' + k, T.places[k].hotel[cfg.hotelLvl]))}</td><td class="num"><b>${eur(hotelCost(k))}</b></td></tr>`).join('')}
      <tr><td colspan="3"><b>All hotels</b></td><td class="num"><b>${eur(r.cats.hotel)}</b></td></tr>
      <tr><td colspan="3"><b>Whole trip for two</b> ${budgetBadge(r.total)}</td><td class="num"><b>${eur(r.total)}</b></td></tr></tbody></table>
      <p class="muted small">A chosen hotel is used for that place in every route, the comparison and the calculator. Its price counts for every night; without a chosen hotel we use the typical price plus the New-Year surcharge for 29 Dec – 2 Jan.</p></div>`;
  }
  function renderHotels() {
    const pk = Object.keys(T.places);
    const cur = views.hplace && pk.includes(views.hplace) ? views.hplace : 'pq';
    $('#hotels').innerHTML = `<div class="head"><div><h2>Hotels</h2><p class="muted">Pick a hotel for each stop and see what the trip costs. Prices are what we saw on ${esc(T.meta.updatedHuman)}, not quotes for your nights — check the live price, type it in, and everything recalculates. You can add your own finds too.</p></div></div>
      ${T.hotelNote ? `<div class="note"><p>${esc(T.hotelNote)}</p></div>` : ''}
      <div id="hotel-sum"></div>
      <h2>Browse hotels</h2>
      ${PRINT ? '' : `<div class="chips">${pk.map(k => `<button class="chip btnchip ${k === cur ? 'on' : ''}" data-hplace="${k}">${T.places[k].emoji} ${esc(T.places[k].short)} <small>(${hotelsFor(k).length})</small></button>`).join('')}</div>`}
      ${(PRINT ? pk.filter(k => hotelsFor(k).length) : [cur]).map(k => `<h3>${T.places[k].emoji} ${esc(T.places[k].name)}</h3><p class="muted small">${esc(T.places[k].hotelNote || '')} Typical prices: ${eur(T.places[k].hotel.budget)} simple · ${eur(T.places[k].hotel.mid)} good · ${eur(T.places[k].hotel.nice)} nice per night.</p>
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

  /* ---------- OVERVIEW ---------- */
  function renderOverview() {
    const all = T.scenarios.map(s => ({ s, r: compute(cfgFromScenario(s)) }));
    const rec = all.find(x => x.s.id === T.meta.recommended);
    $('#overview').innerHTML = `
      <div class="hero"><div><p class="eyebrow">28 Dec 2026 → 15 Jan 2027 · from Vienna · 17 nights</p>
        <h1>Sophie &amp; Mohsey<br>in Vietnam <span>🌴</span></h1>
        <p class="lede">${esc(T.meta.lede)}</p>
        <div class="hero-cta"><button class="btn primary" data-go="routes">Explore the ${T.scenarios.length} routes</button><button class="btn" data-go="calc">Open the calculator</button></div></div>
        <div class="hero-card"><small>Our pick right now</small><b>${esc(rec.s.id)} · ${esc(rec.s.title)}</b><div class="big">${eur(rec.r.total)}</div>${budgetBadge(rec.r.total)}
        <p>${esc(T.meta.recWhy)}</p><button class="btn small" data-open="${rec.s.id}">See the details</button></div></div>
      <h2>The short version</h2><div class="grid3">${T.headlines.map(h => `<div class="card"><div class="ico">${h.icon}</div><h3>${esc(h.t)}</h3><p>${esc(h.d)}</p></div>`).join('')}</div>
      <h2>All routes at a glance</h2>
      ${barChart(all.map(x => ({ label: x.s.id + '  ' + x.s.short, v: x.r.total, hl: x.s.id === T.meta.recommended, c: x.s.id === T.meta.recommended ? 'var(--s1)' : 'var(--s1-soft)' })), { band: [T.meta.budgetMin, T.meta.budgetMax] })}
      <p class="muted">Typical flight prices, good 3–4★ hotels, mostly local food. Change any assumption in the calculator.</p>`;
  }

  /* ---------- ROUTES ---------- */
  function scenarioCard(s) {
    const r = compute(cfgFromScenario(s));
    const lo = compute(cfgFromScenario(s), 'low').total, hi = compute(cfgFromScenario(s), 'high').total;
    return `<article class="card route${s.id === T.meta.recommended ? ' rec' : ''}" data-open="${s.id}" tabindex="0" role="button">
      <div class="route-top"><span class="rid">${s.id}</span>${s.id === T.meta.recommended ? pill('our pick', 'accent') : ''}${budgetBadge(r.total)}</div>
      <h3>${esc(s.title)}</h3><p class="muted">${esc(s.tagline)}</p>
      <div class="route-path">${r.timeline.map(t => `<span title="${esc(T.places[t.place].name)}">${T.places[t.place].emoji} ${t.nights}</span>`).join('<i>→</i>')}</div>
      <div class="route-price">${eur(r.total)}<small> for two · ${eur(lo)}–${eur(hi)} depending on flights</small></div>
      <div class="route-facts"><span>🏖 ${r.m.beachNights} beach nights</span><span>🧳 ${r.m.moves} check-in${r.m.moves > 1 ? 's' : ''}</span><span>🕑 ${hrs(r.m.transitH)} in transit</span></div>
      <span class="more">Tap for full details →</span></article>`;
  }
  function renderRoutes() {
    $('#routes').innerHTML = `<div class="head"><div><h2>The ${T.scenarios.length} routes</h2><p class="muted">Tap any route to see the day plan, every price behind it, and its charts.</p></div>${PRINT ? '' : toggle('routes', 'Cards')}</div>
      ${showD('routes') && !PRINT ? `<div class="grid3">${T.scenarios.map(scenarioCard).join('')}</div>` : ''}
      ${showV('routes') ? `<div class="card"><h3>What each route is made of</h3>${stackChart(T.scenarios.map(s => { const r = compute(cfgFromScenario(s)); return { label: s.id + '  ' + s.short, total: r.total, cats: r.cats }; }), { ref: T.meta.budgetMax })}</div>` : ''}
      ${PRINT ? T.scenarios.map(s => `<div class="card pb">${detailHTML(s)}</div>`).join('') : ''}`;
  }
  function detailHTML(s) {
    const cfg = cfgFromScenario(s), r = compute(cfg);
    const id = 'det' + s.id;
    return `<div class="det-head"><span class="rid big">${s.id}</span><div><h2>${esc(s.title)}</h2><p class="muted">${esc(s.tagline)}</p></div></div>
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
      ${PRINT ? '' : `<div class="det-actions"><button class="btn primary" data-tocalc="${s.id}">Tweak this route in the calculator</button><button class="btn" data-close>Close</button></div>`}`;
  }
  function openDetail(id) {
    const s = scen(id); if (!s) return;
    const d = $('#dlg'); d.dataset.sid = id; $('#dlg-body').innerHTML = detailHTML(s);
    if (!d.open) d.showModal(); d.scrollTop = 0;
  }

  /* ---------- COMPARE ---------- */
  function renderCompare() {
    const rows = T.scenarios.filter(s => compareSel.includes(s.id)).map(s => ({ id: s.id, label: s.id + '  ' + s.short, r: compute(cfgFromScenario(s), mood) }));
    if (compareSel.includes('mine')) rows.push({ id: 'mine', label: '★  Our own plan', r: compute(calc, mood === 'typ' ? null : mood) });
    const best = (fn, min = true) => { const v = rows.map(fn); return min ? Math.min(...v) : Math.max(...v); };
    const cell = (v, b, txt) => `<td class="${v === b ? 'best' : ''}">${txt}</td>`;
    const bT = best(x => x.r.total), bB = best(x => x.r.m.beachNights, false), bM = best(x => x.r.m.moves), bH = best(x => x.r.m.transitH), bS = best(x => x.r.m.hassle);
    $('#compare').innerHTML = `<div class="head"><div><h2>Compare everything</h2><p class="muted">Pick the routes to compare. “Our own plan” is whatever is currently in the calculator.</p></div>${PRINT ? '' : toggle('compare', 'Table')}</div>
      <div class="controls"><div class="chips">${T.scenarios.map(s => `<label class="chip"><input type="checkbox" data-cmp="${s.id}" ${compareSel.includes(s.id) ? 'checked' : ''}>${s.id} ${esc(s.short)}</label>`).join('')}<label class="chip"><input type="checkbox" data-cmp="mine" ${compareSel.includes('mine') ? 'checked' : ''}>★ Our own plan</label></div>
      <div class="ctl"><span>Flight prices:</span><div class="seg" id="mood">${Object.keys(LEVELS).map(l => `<button data-mood="${l}" class="${mood === l ? 'on' : ''}">${LEVELS[l]}</button>`).join('')}</div></div></div>
      ${!rows.length ? '<p class="card">Select at least one route above.</p>' : ''}
      ${rows.length && showD('compare') ? `<div class="tablewrap"><table class="tbl cmp"><thead><tr><th>Route</th><th>Total for two</th><th>Budget</th><th>Beach nights</th><th>Hotel check-ins</th><th>Travel inside Vietnam</th><th>Hassle score</th><th>Long-haul flights</th></tr></thead><tbody>
        ${rows.map(x => `<tr><td><b>${esc(x.label)}</b></td>${cell(x.r.total, bT, eur(x.r.total))}<td>${budgetBadge(x.r.total)}</td>${cell(x.r.m.beachNights, bB, x.r.m.beachNights)}${cell(x.r.m.moves, bM, x.r.m.moves)}${cell(x.r.m.transitH, bH, hrs(x.r.m.transitH))}${cell(x.r.m.hassle, bS, x.r.m.hassle)}<td>${hrs(x.r.m.intlH)}<br><small>${esc(x.r.flight.airline)}</small></td></tr>`).join('')}
        </tbody></table></div><p class="muted small">Green cells = best in that column. Hassle score = one point per extra hotel move plus the difficulty of each journey (flight 1–2, bus + ferry 4, long train 4–5).</p>` : ''}
      ${rows.length && showV('compare') ? `<div class="grid2">
        <div class="card"><h3>Total cost for two</h3>${barChart(rows.map(x => ({ label: x.label, v: x.r.total })), { band: [T.meta.budgetMin, T.meta.budgetMax] })}</div>
        <div class="card"><h3>Where the money goes</h3>${stackChart(rows.map(x => ({ label: x.label, total: x.r.total, cats: x.r.cats })), { ref: T.meta.budgetMax })}</div>
        <div class="card"><h3>Hours spent travelling inside Vietnam</h3>${barChart(rows.map(x => ({ label: x.label, v: x.r.m.transitH })), { fmt: hrs, c: 'var(--s2)' })}</div>
        <div class="card"><h3>Nights by the beach</h3>${barChart(rows.map(x => ({ label: x.label, v: x.r.m.beachNights })), { fmt: v => v + ' nights', c: 'var(--s3)', max: 17 })}</div>
        <div class="card"><h3>Hassle score (lower is more relaxed)</h3>${barChart(rows.map(x => ({ label: x.label, v: x.r.m.hassle })), { fmt: v => String(v), c: 'var(--s5)' })}</div>
        <div class="card"><h3>Cost per beach night</h3>${barChart(rows.filter(x => x.r.m.beachNights).map(x => ({ label: x.label, v: x.r.total / x.r.m.beachNights })), { c: 'var(--s7)' })}<p class="muted small">Whole trip cost divided by beach nights — a rough “value for swimmers” measure.</p></div></div>` : ''}`;
  }

  /* ---------- FLIGHTS ---------- */
  function renderFlights() {
    const F = T.flights, sortK = views.fsort || 'typ';
    const sorted = [...F].sort((a, b) => sortK === 'dur' ? (a.durOut + a.durBack) - (b.durOut + b.durBack) : sortK === 'stops' ? a.stops - b.stops || a.pp.typ - b.pp.typ : a.pp.typ - b.pp.typ);
    const ev = { near: ['good', 'airline fare page, close dates'], est: ['warn', 'estimate — no peak quote found'] };
    $('#flights').innerHTML = `<div class="head"><div><h2>Flights from Vienna, airline by airline</h2><p class="muted">Return economy per person, 28 Dec → 15 Jan, with a checked bag. Tap a flight to use it in the calculator.</p></div>${PRINT ? '' : toggle('flights', 'Table')}</div>
      <div class="note">${T.flightNotes.map(n => `<p>${n.icon} <b>${esc(n.t)}</b> ${esc(n.d)} ${srcLinks(n.src)}</p>`).join('')}</div>
      ${showD('flights') ? `<div class="ctl"><span>Sort by:</span><div class="seg" id="fsort">${[['typ', 'Price'], ['dur', 'Travel time'], ['stops', 'Fewest stops']].map(([k, n]) => `<button data-fsort="${k}" class="${sortK === k ? 'on' : ''}">${n}</button>`).join('')}</div></div>
      <div class="tablewrap"><table class="tbl"><thead><tr><th>Airline</th><th>Route</th><th>Via</th><th>Time out / back</th><th>Per person</th><th>For two</th><th>Bag</th><th>Evidence</th><th></th></tr></thead><tbody>
      ${sorted.map(f => `<tr class="${calc.flightId === f.id ? 'sel' : ''}"><td><b>${esc(f.airline)}</b></td><td>${esc(f.route)}</td><td>${esc(f.via)}<br><small>${f.stops} stop${f.stops === 1 ? '' : 's'}</small></td><td>${hrs(f.durOut)} / ${hrs(f.durBack)}<br><small>${esc(f.arrive || '')}</small></td>
        <td><b>${eur(pr('flight:' + f.id, f.pp.typ))}</b>${has('flight:' + f.id) ? ' ★' : ''}<br><small>${eur(f.pp.low)}–${eur(f.pp.high)}</small></td><td>${eur(pr('flight:' + f.id, f.pp.typ) * 2)}</td><td><small>${esc(f.bag || '')}</small></td>
        <td><span class="status ${ev[f.ev][0]}">${ev[f.ev][1]}</span><br><small>${esc(f.note || '')} ${srcLinks(f.src)}</small></td><td>${PRINT ? '' : `<button class="btn small" data-useflight="${f.id}">${calc.flightId === f.id ? '✓ in calculator' : 'Use'}</button>`}</td></tr>`).join('')}</tbody></table></div>` : ''}
      ${showV('flights') ? `<div class="grid2"><div class="card"><h3>Price per person (return)</h3>${rangeChart(sorted.map(f => ({ label: f.airline + ' ' + f.route.replace('VIE', '').replace(/[–→ ]/g, ' ').trim(), low: f.pp.low, typ: f.pp.typ, high: f.pp.high })), { unit: 'per person' })}</div>
        <div class="card"><h3>Total flying + waiting time, both ways</h3>${barChart(sorted.map(f => ({ label: f.airline + ' ' + f.route.replace('VIE', '').replace(/[–→ ]/g, ' ').trim(), v: f.durOut + f.durBack })), { fmt: hrs, c: 'var(--s2)' })}</div></div>` : ''}
      <h2>How to book smart</h2><div class="grid3">${T.flightTips.map(h => `<div class="card"><div class="ico">${h.icon}</div><h3>${esc(h.t)}</h3><p>${esc(h.d)}</p>${srcLinks(h.src)}</div>`).join('')}</div>`;
  }

  /* ---------- GETTING AROUND ---------- */
  function renderAround() {
    const P = T.places, keys = Object.keys(T.legs);
    const cur = views.leg && T.legs[views.leg] ? views.leg : keys[0];
    const opts = T.legs[cur], [a, b] = cur.split('|');
    $('#around').innerHTML = `<div class="head"><div><h2>Getting around Vietnam</h2><p class="muted">Flight, bus, ferry, train or car — what each one costs, how long it really takes door to door, and how hard it is.</p></div>${PRINT ? '' : toggle('around', 'Table')}</div>
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
    $('#calc-inputs').innerHTML = `
      <div class="card"><h3>1 · Start from a route</h3><div class="chips">${T.scenarios.map(s => `<button class="chip btnchip ${calc.base === s.id ? 'on' : ''}" data-preset="${s.id}">${s.id} ${esc(s.short)}</button>`).join('')}</div></div>
      <div class="card"><h3>2 · Where and how long</h3>${stopRows}<button class="btn small" data-addstop>+ add a stop</button><p class="muted small" id="nights-msg"></p></div>
      <div class="card"><h3>3 · Flight from Vienna</h3><select id="c-flight">${T.flights.map(f => `<option value="${f.id}" ${f.id === calc.flightId ? 'selected' : ''}>${esc(f.airline)} · ${esc(f.route)} · ${eur(pr('flight:' + f.id, f.pp.typ))} pp</option>`).join('')}</select>
        <div class="ctl"><span>Price level</span><div class="seg" id="c-level">${Object.keys(LEVELS).map(l => `<button data-level="${l}" class="${calc.level === l ? 'on' : ''}">${LEVELS[l]}</button>`).join('')}</div></div>
        <label class="field">Got a real quote or a cheaper deal? Type it (per person, return) <input type="number" min="0" step="10" data-ov="flight:${esc(calc.flightId)}" value="${has('flight:' + calc.flightId) ? ov['flight:' + calc.flightId] : ''}" placeholder="${(T.flights.find(f => f.id === calc.flightId) || T.flights[0]).pp[calc.level]}"></label></div>
      <div class="card"><h3>4 · How you travel between places</h3>${legKeys.length ? legKeys.map(k => { const [a, b] = k.split('|'); const o = legOptions(a, b); return `<label class="field">${esc(P[a].short)} ⇄ ${esc(P[b].short)}<select data-legmode="${k}">${o.map(m => `<option value="${m.id}" ${calc.legMode[k] === m.id ? 'selected' : ''}>${m.icon || ''} ${esc(m.label)} · ${eur(pr('leg:' + k + ':' + m.id, m.pp) * 2)} · ${hrs(m.hours)}</option>`).join('')}</select></label>`; }).join('') : '<p class="muted">No journeys needed — one base only.</p>'}</div>
      <div class="card"><h3>5 · Comfort level</h3>
        <div class="ctl"><span>Hotels</span><div class="seg">${Object.keys(HOTEL_LVLS).map(l => `<button data-hl="${l}" class="${calc.hotelLvl === l ? 'on' : ''}">${HOTEL_LVLS[l]}</button>`).join('')}</div></div>
        <div class="ctl"><span>Food</span><div class="seg">${Object.keys(FOOD_LVLS).map(l => `<button data-fl="${l}" class="${calc.foodLvl === l ? 'on' : ''}">${FOOD_LVLS[l]}</button>`).join('')}</div></div>
        <table class="mini"><thead><tr><th></th><th>Hotel € / night</th><th>Food € / day for two</th></tr></thead><tbody>${used.map(k => `<tr><td>${P[k].emoji} ${esc(P[k].short)}</td>
          <td><input type="number" min="0" step="1" data-ov="hotel:${k}" value="${has('hotel:' + k) ? ov['hotel:' + k] : ''}" placeholder="${P[k].hotel[calc.hotelLvl]}"></td><td><input type="number" min="0" step="1" data-ov="food:${k}" value="${has('food:' + k) ? ov['food:' + k] : ''}" placeholder="${P[k].food[calc.foodLvl]}"></td></tr>`).join('')}</tbody></table>
        <p class="muted small">Grey numbers are our researched defaults — type over them with a real price (0 = free, e.g. staying with friends). Pick a real hotel on the <a href="#hotels" data-go="hotels">Hotels</a> page, or change any price on <a href="#mine" data-go="mine">Our prices</a>.</p>
        <label class="check"><input type="checkbox" id="c-peak" ${calc.peak ? 'checked' : ''}> Add the New-Year surcharge to hotel nights 29 Dec – 2 Jan</label>
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
    if (msg) msg.innerHTML = res.m.nights === 17 ? '✓ 17 nights — matches your dates (29 Dec → 15 Jan).' : `<span class="status warn">▲ ${res.m.nights} nights planned — your dates give 17. ${res.m.nights < 17 ? (17 - res.m.nights) + ' still free.' : (res.m.nights - 17) + ' too many.'}</span>`;
    $('#calc-result').innerHTML = `<div class="card sticky"><small class="eyebrow">${esc(calc.base === 'custom' ? 'Our own plan' : 'Based on route ' + calc.base)}</small>
      <div class="total-big">${eur(res.total)}</div><div class="muted">${eur(res.total / 2)} per person · ${budgetBadge(res.total)}</div>
      <div class="gauge" data-tip="${esc(eur(res.total) + ' of ' + eur(b) + ' ceiling')}" tabindex="0"><div class="gauge-band" style="left:${a / max * 100}%;width:${(b - a) / max * 100}%"></div><div class="stack" style="width:${res.total / max * 100}%">${CATS.filter(c => res.cats[c.k] > 0).map(c => `<span style="flex:${res.cats[c.k]};background:${c.c}" data-tip="${esc(c.n + ': ' + eur(res.cats[c.k]))}"></span>`).join('')}</div><span class="ref" style="left:${b / max * 100}%"></span></div>
      <div class="gauge-lbl"><span>${eur(a)}–${eur(b)} budget shaded</span><span>${res.total <= b ? eur(b - res.total) + ' left' : eur(res.total - b) + ' over'}</span></div>
      <div class="minitiles"><span>🏖 <b>${res.m.beachNights}</b> beach nights</span><span>🧳 <b>${res.m.moves}</b> check-ins</span><span>🕑 <b>${hrs(res.m.transitH)}</b> in transit</span><span>😌 hassle <b>${res.m.hassle}</b></span></div>
      ${saversHTML()}
      <div class="head"><h3>Breakdown</h3>${toggle('calcres', 'Numbers')}</div>
      ${showD('calcres') ? linesHTML(res) : catBars(res)}
      <h3>Your days</h3>${timelineHTML(res)}
      <div class="det-actions"><button class="btn primary" id="c-share">🔗 Copy link to share this plan</button><button class="btn" data-go="compare">Compare with the routes</button><button class="btn" id="c-reset">Reset</button></div><p class="muted small" id="share-msg">Changes are saved in this browser automatically.</p></div>`;
  }
  function renderCalc() {
    if (!$('#calc-inputs')) $('#calc').innerHTML = `<div class="head"><div><h2>Trip calculator</h2><p class="muted">Change anything — nights, flight, hotel class, how you travel, what you do — and the total updates instantly.</p></div></div>
      ${sharedPlan ? '<p class="note">You opened a shared plan link — this is the plan your travel partner built. Edit freely; it saves to your browser.</p>' : ''}
      <div class="calc"><div id="calc-inputs"></div><div id="calc-result"></div></div>`;
    renderCalcInputs(); renderCalcResult();
  }
  const custom = () => { calc.base = 'custom'; };

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
      ${grp('✈️ Flights from Vienna', 'Per person, return, including a checked bag.', T.flights.map(f => ovRow('flight:' + f.id, `<b>${esc(f.airline)}</b> · ${esc(f.route)}`, f.pp.typ, 'per person')))}
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
    $('#tips').innerHTML = `<div class="head"><div><h2>What other travellers recommend</h2><p class="muted">${T.tips.length} tips collected from travel forums (TripAdvisor, Travelfish, Fodor’s), Vietnamese news, blogs and official sites — paraphrased, each with its source. Reddit blocks automated reading, so its threads could not be included.</p></div></div>
      <div class="controls"><div class="chips"><button class="chip btnchip on" data-topic="all">All</button>${topics.map(t => `<button class="chip btnchip" data-topic="${esc(t)}">${esc(t)}</button>`).join('')}</div>
      <input type="search" id="tip-q" placeholder="Search tips… e.g. taxi, jellyfish, ATM" aria-label="Search tips"></div><div id="tips-body">${body}</div>`;
  }

  /* ---------- CHECKLIST & SOURCES ---------- */
  function renderPrep() {
    const done = store.get('todo', {});
    $('#prep').innerHTML = `<div class="head"><div><h2>Before you go and what to pack</h2><p class="muted">Bookings, papers, health, clothes and everything for the suitcase. Tick things off — it is remembered on this device.</p></div></div>
      <div class="grid2">${T.checklist.map(g => `<div class="card"><h3>${g.icon} ${esc(g.t)}</h3>${g.items.map((it, i) => { const id = g.t + i; return `<label class="check todo"><input type="checkbox" data-todo="${esc(id)}" ${done[id] ? 'checked' : ''}><span>${esc(it.t)} <small>${esc(it.d || '')} ${srcLinks(it.src)}</small></span></label>`; }).join('')}</div>`).join('')}</div>
      ${T.health ? `<h2>Health and vaccinations</h2><p class="muted">${esc(T.health.intro)}</p><div class="tablewrap"><table class="tbl"><thead><tr><th>Vaccine / risk</th><th>For this trip</th><th>What to know</th></tr></thead><tbody>${T.health.rows.map(r => `<tr><td><b>${esc(r.v)}</b></td><td><span class="status ${r.lvl}">${esc(r.lbl)}</span><br><small>${esc(r.who)}</small></td><td>${esc(r.d)}</td></tr>`).join('')}</tbody></table></div><p>${srcLinks(T.health.src)}</p>` : ''}
      ${T.entry ? `<h2>Visas and entry — for your two passports</h2><div class="grid2">${T.entry.map(e => `<div class="card"><div class="ico">${e.icon}</div><h3>${esc(e.t)}</h3>${e.p.map(x => `<p>${esc(x)}</p>`).join('')}${srcLinks(e.src)}</div>`).join('')}</div>` : ''}
      <h2>Weather and sea, 29 Dec – 15 Jan</h2><div class="tablewrap"><table class="tbl"><thead><tr><th>Place</th><th>Air</th><th>Rain</th><th>Sea & swimming</th><th>Swim score</th></tr></thead><tbody>${Object.values(T.places).map(p => `<tr><td>${p.emoji} <b>${esc(p.name)}</b></td><td>${esc(p.wx.air)}</td><td>${esc(p.wx.rain)}</td><td>${esc(p.wx.sea)}</td><td>${dots(p.swim)}</td></tr>`).join('')}</tbody></table></div>
      <h2>Sources</h2><p class="muted">Checked ${esc(T.meta.updatedHuman)}. Prices move — especially flights and New-Year hotel nights — so re-check before paying.</p>
      <ol class="sources">${T.sources.map(s => `<li><a href="${esc(s.u)}" target="_blank" rel="noopener">${esc(s.t)}</a>${s.d ? ' — ' + esc(s.d) : ''}</li>`).join('')}</ol>`;
  }

  /* ---------- routing & events ---------- */
  const TABS = { overview: renderOverview, routes: renderRoutes, compare: renderCompare, flights: renderFlights, around: renderAround, hotels: renderHotels, calc: renderCalc, mine: renderMine, tips: renderTips, prep: renderPrep };
  let tab = 'overview';
  function go(t, keepScroll) {
    if (!TABS[t]) t = 'overview'; tab = t;
    $$('.tabpane').forEach(p => p.hidden = !PRINT && p.id !== t);
    $$('nav [data-go]').forEach(b => b.classList.toggle('on', b.dataset.go === t));
    TABS[t]();
    if (!keepScroll) window.scrollTo({ top: 0 });
    if (!PRINT && !location.hash.startsWith('#plan=')) history.replaceState(null, '', '#' + t);
  }
  const rerender = () => { TABS[tab](); if ($('#dlg').open) openDetail($('#dlg').dataset.sid); };

  document.addEventListener('click', e => {
    const t = e.target.closest('button, [data-open], a'); if (!t) return;
    const d = t.dataset;
    if (d.saver) { if (d.saver === 'all') SAVERS.forEach(sv => { if (!sv.risky && !(calc.undo && calc.undo[sv.id]) && saverState(sv).saving > 0.5) toggleSaver(sv.id); }); else toggleSaver(d.saver); saveCalc(); return renderCalc(); }
    if (d.usehotel) { const k = d.usehotel, h = findHotel(k, d.hid); if (hsel[k] === d.hid) delete hsel[k]; else if (h && typeof hPrice(h) === 'number') hsel[k] = d.hid; else { const i = t.closest('.hotel').querySelector('[data-hprice]'); if (i) i.focus(); return; } syncHotel(k); return renderHotels(); }
    if (d.hroute) { views.hroute = d.hroute; return renderHotelSum(); }
    if (d.myhdel) { const h = myHotels.find(x => x.id === d.myhdel); myHotels = myHotels.filter(x => x.id !== d.myhdel); store.set('myh', myHotels); if (h) syncHotel(h.place); return renderHotels(); }
    if (t.id === 'myh-add') { const name = $('#myh-name').value.trim(), k = $('#myh-place').value, pv = $('#myh-price').value; if (!name) { $('#myh-msg').textContent = 'Please type the hotel name.'; return; }
      let url = $('#myh-url').value.trim(); if (url && !/^https?:\/\//i.test(url)) url = '';
      const h = { id: 'my-' + Date.now().toString(36), place: k, name, mine: true, url, good: $('#myh-note').value.trim() }; if (pv !== '' && +pv >= 0) h.price = +pv;
      myHotels.push(h); store.set('myh', myHotels); views.hplace = k; if (typeof h.price === 'number') { hsel[k] = h.id; syncHotel(k); } return renderHotels(); }
    if (d.hplace) { views.hplace = d.hplace; return renderHotels(); }
    if (d.go) { e.preventDefault(); if (location.hash.startsWith('#plan=')) history.replaceState(null, '', '#'); return go(d.go); }
    if (d.close !== undefined) return $('#dlg').close();
    if (d.tocalc) { calc = cfgFromScenario(scen(d.tocalc)); saveCalc(); $('#dlg').close(); return go('calc'); }
    if (d.open) return openDetail(d.open);
    if (d.v && t.parentElement.dataset.view) { views[t.parentElement.dataset.view] = d.v; return rerender(); }
    if (d.mood) { mood = d.mood; return renderCompare(); }
    if (d.fsort) { views.fsort = d.fsort; return renderFlights(); }
    if (d.useflight) { calc.flightId = d.useflight; custom(); saveCalc(); return renderFlights(); }
    if (d.leg) { views.leg = d.leg; return renderAround(); }
    if (d.topic) { views.tipTopic = d.topic; return renderTips(); }
    if (d.preset) { calc = cfgFromScenario(scen(d.preset)); saveCalc(); return renderCalc(); }
    if (d.step !== undefined) { const s = calc.stops[+d.step]; s.nights = Math.max(0, Math.min(30, s.nights + +d.d)); custom(); saveCalc(); return renderCalc(); }
    if (d.mv !== undefined) { const i = +d.mv, j = i + +d.d; [calc.stops[i], calc.stops[j]] = [calc.stops[j], calc.stops[i]]; custom(); saveCalc(); return renderCalc(); }
    if (d.rm !== undefined) { calc.stops.splice(+d.rm, 1); if (!calc.stops.length) calc.stops.push({ place: 'pq', nights: 1 }); custom(); saveCalc(); return renderCalc(); }
    if (d.addstop !== undefined) { calc.stops.push({ place: 'pq', nights: 2 }); custom(); saveCalc(); return renderCalc(); }
    if (d.level) { calc.level = d.level; saveCalc(); return renderCalc(); }
    if (d.hl) { calc.hotelLvl = d.hl; custom(); saveCalc(); return renderCalc(); }
    if (d.fl) { calc.foodLvl = d.fl; custom(); saveCalc(); return renderCalc(); }
    if (t.id === 'ov-reset') { ov = {}; hsel = {}; store.set('ov', ov); store.set('hsel', hsel); return renderMine(); }
    if (t.id === 'c-reset') { calc = cfgFromScenario(scen(T.meta.recommended)); saveCalc(); return renderCalc(); }
    if (t.id === 'c-share') {
      const url = location.origin + location.pathname + '#plan=' + btoa(unescape(encodeURIComponent(JSON.stringify({ calc, ov, hsel, hprice, myHotels }))));
      const ok = () => $('#share-msg').textContent = '✓ Link copied — send it to your travel partner.';
      (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(ok, () => { prompt('Copy this link:', url); });
    }
    if (t.id === 'theme') { const r = document.documentElement; const dark = r.dataset.theme ? r.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; r.dataset.theme = dark ? 'light' : 'dark'; store.set('theme', r.dataset.theme); }
    if (t.id === 'print') window.open('trip-report.pdf', '_blank');
  });
  document.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('article[data-open]')) { e.preventDefault(); openDetail(e.target.dataset.open); } });
  document.addEventListener('change', e => {
    const t = e.target, d = t.dataset;
    if (d.cmp) { compareSel = t.checked ? compareSel.concat(d.cmp) : compareSel.filter(x => x !== d.cmp); store.set('cmp', compareSel); return renderCompare(); }
    if (d.todo) { const o = store.get('todo', {}); o[d.todo] = t.checked; return store.set('todo', o); }
    if (d.hsel) { if (t.value) hsel[d.hsel] = t.value; else delete hsel[d.hsel]; syncHotel(d.hsel); return renderHotels(); }
    if (d.stop !== undefined) { calc.stops[+d.stop].place = t.value; custom(); saveCalc(); return renderCalc(); }
    if (t.id === 'c-flight') { calc.flightId = t.value; custom(); saveCalc(); return renderCalc(); }
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
    else if (d.hprice) { if (t.value === '' || isNaN(+t.value) || +t.value < 0) delete hprice[d.hprice]; else hprice[d.hprice] = +t.value; store.set('hprice', hprice); t.classList.toggle('set', d.hprice in hprice); if (hsel[d.hk] === d.hprice) syncHotel(d.hk); return renderHotelSum(); }
    else if (d.ov) { if (t.value === '' || isNaN(+t.value) || +t.value < 0) delete ov[d.ov]; else ov[d.ov] = +t.value; store.set('ov', ov); if (d.ov.startsWith('hotel:')) { delete hsel[d.ov.slice(6)]; store.set('hsel', hsel); } t.classList.toggle('set', d.ov in ov); if (tab === 'mine') return renderMineSummary(); }
    else if (t.id === 'tip-q') { views.tipQ = t.value; return renderTips(); }
    else return;
    saveCalc(); renderCalcResult();
  });
  $('#dlg').addEventListener('click', e => { if (e.target.id === 'dlg') e.target.close(); });

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
  $('#updated').textContent = T.meta.updatedHuman;
  if (PRINT) { document.body.classList.add('print'); Object.keys(TABS).forEach(k => { tab = k; TABS[k](); }); $$('.tabpane').forEach(p => p.hidden = false); }
  else go(sharedPlan ? 'calc' : (location.hash.slice(1) || 'overview'));
  window.__trip = { compute, cfgFromScenario };
})();
