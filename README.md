# Our trips

Static site, no build step. Deploy on Vercel: **Add New → Project → import this repo → Framework preset "Other" → Deploy**. Every push to `main` redeploys.

- `/` – list of trips
- `/vietnam/` – Sophie & Mohsey in Vietnam (28 Dec 2026 – 15 Jan 2027)

## Updating prices

Everything — prices, flights, routes, tips, sources — lives in `vietnam/data.js`. Change a number, commit, push.

| What | Where in `data.js` |
|---|---|
| Hotel / food / taxi rates per place | `places` |
| Flights from Vienna (per person, return) | `flights` |
| Journeys inside Vietnam | `legs` |
| Activities, visa, insurance | `activities`, `fixed` |
| The routes themselves | `scenarios` |
| Traveller tips | `tips` |

`vietnam/trip-report.pdf` is a print of `vietnam/index.html?print=1` (A4, 62% scale, backgrounds on).
