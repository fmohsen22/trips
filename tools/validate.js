// Usage: node tools/validate.js <trip-folder>   — checks a trip's data.js against what the shared engine needs.
const path = require('path'), fs = require('fs');
const dir = process.argv[2]; if (!dir) { console.error('usage: node tools/validate.js <trip-folder>'); process.exit(2); }
global.window = {}; require(path.resolve(dir, 'data.js'));
const T = window.TRIP, errs = [], warn = [];
const E = (c, m) => { if (!c) errs.push(m); }, W = (c, m) => { if (!c) warn.push(m); };
const num = x => typeof x === 'number' && isFinite(x) && x >= 0, str = x => typeof x === 'string' && x.trim().length > 0;
const srcOk = (s, where) => { if (s === undefined) return; E(Array.isArray(s), where + ': src must be an array'); (s || []).forEach(x => E(x && str(x.t) && /^https?:\/\//.test(x.u || ''), where + ': bad source ' + JSON.stringify(x))); };
E(T && typeof T === 'object', 'window.TRIP missing'); if (!T) done();
const M = T.meta || {};
['key', 'title', 'heroTitle', 'country', 'emoji', 'home', 'homeAirport', 'hub', 'hubAirport', 'lede', 'recWhy', 'updatedHuman', 'recommended', 'bestFlight', 'd0', 'd1', 'status'].forEach(k => E(str(M[k]), 'meta.' + k + ' missing'));
['budgetMin', 'budgetMax', 'shopping', 'reservePct'].forEach(k => E(num(M[k]), 'meta.' + k + ' must be a number'));
E(M.peak && /^\d{4}-\d\d-\d\d$/.test(M.peak.from) && /^\d{4}-\d\d-\d\d$/.test(M.peak.to), 'meta.peak {from,to} ISO dates');
E(M.openJaw && typeof M.openJaw === 'object', 'meta.openJaw object (may be empty)');
E(Array.isArray(M.skipActs), 'meta.skipActs array of activity ids'); E(M.galaPlace === null || str(M.galaPlace), 'meta.galaPlace place id or null');
const P = T.places || {}, pk = Object.keys(P); E(pk.length >= 2, 'need at least 2 places'); E(P[M.hub], 'meta.hub must be a place id');
pk.forEach(k => { const p = P[k], w = 'places.' + k; ['name', 'short', 'emoji', 'blurb'].forEach(f => E(str(p[f]), w + '.' + f));
  E(typeof p.beach === 'boolean' && num(p.swim) && p.swim <= 5, w + ' beach/swim'); ['budget', 'mid', 'nice'].forEach(f => E(p.hotel && num(p.hotel[f]), w + '.hotel.' + f));
  ['local', 'mixed', 'tourist'].forEach(f => E(p.food && num(p.food[f]), w + '.food.' + f)); E(num(p.peakMult) && p.peakMult >= 1, w + '.peakMult'); E(num(p.localPerDay), w + '.localPerDay');
  E(p.wx && str(p.wx.air) && str(p.wx.rain) && str(p.wx.sea), w + '.wx'); srcOk(p.src, w); });
E(Array.isArray(T.flights) && T.flights.length >= 3, 'need 3+ flights'); const fids = new Set();
(T.flights || []).forEach(f => { const w = 'flight ' + f.id; E(str(f.id) && !fids.has(f.id), w + ' id unique'); fids.add(f.id); ['airline', 'via'].forEach(k => E(str(f[k]), w + '.' + k));
  E(num(f.stops) && num(f.durOut) && num(f.durBack), w + ' stops/durOut/durBack'); E(f.pp && num(f.pp.low) && num(f.pp.typ) && num(f.pp.high) && f.pp.low <= f.pp.typ && f.pp.typ <= f.pp.high, w + '.pp low<=typ<=high');
  E(f.ev === 'near' || f.ev === 'est', w + ".ev must be 'near' or 'est'"); srcOk(f.src, w); });
E(fids.has(M.bestFlight), 'meta.bestFlight must be a flight id');
E(T.genericLeg && num(T.genericLeg.pp) && num(T.genericLeg.hours), 'genericLeg');
Object.keys(T.legs || {}).forEach(k => { const [a, b] = k.split('|'); E(P[a] && P[b] && a < b, 'leg key "' + k + '" must be two place ids sorted alphabetically'); const ids = new Set();
  E(Array.isArray(T.legs[k]) && T.legs[k].length, 'legs.' + k + ' empty'); (T.legs[k] || []).forEach(m => { const w = 'legs.' + k + '.' + m.id; E(str(m.id) && !ids.has(m.id), w + ' id unique'); ids.add(m.id); E(str(m.label) && num(m.pp) && num(m.hours), w + ' label/pp/hours'); E([m.comfort, m.hassle].every(x => num(x) && x >= 1 && x <= 5), w + ' comfort/hassle 1-5'); srcOk(m.src, w); }); });
const aids = new Set(); (T.activities || []).forEach(a => { E(str(a.id) && !aids.has(a.id), 'activity id unique ' + a.id); aids.add(a.id); E(P[a.place], 'activity ' + a.id + ' place'); E(str(a.name) && num(a.for2), 'activity ' + a.id + ' name/for2'); srcOk(a.src, 'activity ' + a.id); });
(M.skipActs || []).forEach(a => E(aids.has(a), 'meta.skipActs unknown activity ' + a));
['visa', 'insurance', 'sim', 'gala'].forEach(k => E(T.fixed && T.fixed[k] && str(T.fixed[k].label) && num(T.fixed[k].for2), 'fixed.' + k));
const sids = new Set(); E(Array.isArray(T.scenarios) && T.scenarios.length >= 4, 'need 4+ scenarios');
const nights = Math.round((Date.parse(M.d1) - Date.parse(M.d0)) / 864e5);
(T.scenarios || []).forEach(s => { const w = 'scenario ' + s.id; E(str(s.id) && !sids.has(s.id), w + ' id unique'); sids.add(s.id); ['short', 'title', 'tagline'].forEach(k => E(str(s[k]), w + '.' + k));
  E(Array.isArray(s.stops) && s.stops.length, w + ' stops'); let n = 0; (s.stops || []).forEach(x => { E(P[x.place], w + ' unknown place ' + x.place); E(num(x.nights) && x.nights >= 2 || s.stops.length === 1, w + ' no stops under 2 nights'); n += x.nights; });
  E(n === nights, w + ' nights sum ' + n + ' must equal ' + nights); (s.acts || []).forEach(a => E(aids.has(a), w + ' unknown activity ' + a)); E(!s.openJaw || (P[s.openJaw] && num(M.openJaw[s.openJaw])), w + ' openJaw needs meta.openJaw price');
  E(Array.isArray(s.pros) && s.pros.length && Array.isArray(s.cons) && s.cons.length, w + ' pros/cons');
  // every consecutive pair should have a leg (else genericLeg is used)
  const pathp = [M.hub, ...s.stops.map(x => x.place), s.openJaw || M.hub]; for (let i = 0; i < pathp.length - 1; i++) { const a = pathp[i], b = pathp[i + 1]; if (a !== b) W(T.legs[[a, b].sort().join('|')], w + ': no leg defined for ' + a + ' -> ' + b + ' (generic leg will be used)'); } });
E(sids.has(M.recommended), 'meta.recommended must be a scenario id');
E(Array.isArray(T.headlines) && T.headlines.length >= 4, 'headlines 4+'); E(Array.isArray(T.tips) && T.tips.length >= 25, 'tips 25+');
(T.tips || []).forEach((t, i) => { E(str(t.topic) && str(t.title) && str(t.text), 'tip ' + i); E(['consensus', 'several', 'single', 'official'].includes(t.echo), 'tip ' + i + ' echo'); srcOk(t.src, 'tip ' + i); });
Object.keys(T.hotels || {}).forEach(k => { E(P[k], 'hotels.' + k + ' unknown place'); (T.hotels[k] || []).forEach(h => { E(str(h.name) && str(h.area) && ['simple', 'good', 'nice'].includes(h.tier) && str(h.good), 'hotel ' + h.name); E(h.price === undefined || num(h.price), 'hotel ' + h.name + ' price'); srcOk(h.src, 'hotel ' + h.name); }); });
['flightNotes', 'flightTips', 'taxi', 'checklist', 'mustDo', 'entry', 'saveTips'].forEach(k => E(Array.isArray(T[k]) && T[k].length, k + ' array'));
E(T.health && str(T.health.intro) && Array.isArray(T.health.rows) && T.health.rows.every(r => str(r.v) && str(r.d) && ['good', 'warn', 'info', 'bad'].includes(r.lvl) && str(r.lbl) && str(r.who)), 'health');
(T.entry || []).forEach(e => E(str(e.icon) && str(e.t) && Array.isArray(e.p), 'entry card')); (T.mustDo || []).forEach(m => E(str(m.t), 'mustDo item'));
(T.checklist || []).forEach(g => E(str(g.t) && Array.isArray(g.items) && g.items.every(i => str(i.t)), 'checklist group ' + g.t));
done();
function done() { warn.forEach(w => console.log('warn: ' + w)); if (errs.length) { errs.forEach(e => console.log('ERROR: ' + e)); console.log(errs.length + ' error(s)'); process.exit(1); } console.log('OK — ' + dir + ' data is valid (' + (T.scenarios || []).length + ' routes, ' + (T.flights || []).length + ' flights, ' + (T.tips || []).length + ' tips)'); process.exit(0); }
