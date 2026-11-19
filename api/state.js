// Shared trip state so both travellers see the same choices.
// Needs a Redis store connected to the Vercel project (Storage → Upstash for Redis),
// which provides KV_REST_API_URL and KV_REST_API_TOKEN. Without it this returns 501
// and the site falls back to saving on each device only.
const MAX_BYTES = 100000;
const KEYS = ['calc', 'ov', 'hsel', 'hprice', 'myh', 'gf', 'd0', 'd1', 'picked', 'todo'];

module.exports = async (req, res) => {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  res.setHeader('Cache-Control', 'no-store');
  if (!url || !token) return res.status(501).json({ error: 'storage not configured' });
  const trip = String((req.query && req.query.trip) || 'vietnam').replace(/[^a-z0-9-]/g, '').slice(0, 40) || 'vietnam';
  const key = 'trip:' + trip;
  const auth = { Authorization: 'Bearer ' + token };
  try {
    if (req.method === 'GET') {
      const r = await fetch(url + '/get/' + key, { headers: auth });
      const j = await r.json();
      let out = null;
      try { out = j && j.result ? JSON.parse(j.result) : null; } catch (e) { out = null; }
      return res.status(200).json(out);
    }
    if (req.method === 'PUT' || req.method === 'POST') {
      let b = req.body;
      if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = null; } }
      if (!b || typeof b.ts !== 'number' || !b.data || typeof b.data !== 'object') return res.status(400).json({ error: 'bad payload' });
      const data = {};
      for (const k of KEYS) if (typeof b.data[k] === 'string') data[k] = b.data[k];
      const body = JSON.stringify({ ts: b.ts, data });
      if (body.length > MAX_BYTES) return res.status(413).json({ error: 'too large' });
      const r = await fetch(url + '/set/' + key, { method: 'POST', headers: auth, body });
      if (!r.ok) return res.status(502).json({ error: 'store failed' });
      return res.status(200).json({ ok: true, ts: b.ts });
    }
    res.setHeader('Allow', 'GET, PUT, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    return res.status(502).json({ error: 'store unreachable' });
  }
};
