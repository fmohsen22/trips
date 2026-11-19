# Our trips

Static site, no build step. Deploy on Vercel: **Add New → Project → import this repo → Framework preset "Other" → Deploy**. Every push to `main` redeploys.

- `/` – list of trips
- `/vietnam/` – Sophie & Mohsey in Vietnam (28 Dec 2026 – 15 Jan 2027)

## Updating prices

Everything — prices, flights, routes, tips, sources — lives in `vietnam/data.js`. Change a number, commit, push.

| What | Where in `data.js` |
|---|---|
| Hotel / food / taxi rates per place | `places` |
| Flights from Vienna (per person, return); default flight is `meta.bestFlight` | `flights` |
| Must-do preparation (orange box) | `mustDo` |
| Hotels with reviews | `hotels` |
| Journeys inside Vietnam | `legs` |
| Activities, visa, insurance | `activities`, `fixed` |
| The routes themselves | `scenarios` |
| Traveller tips | `tips` |

`vietnam/trip-report.pdf` is a print of `vietnam/index.html?print=1` (A4, 62% scale, backgrounds on).

## Sharing choices between the two of us

Flight, route, hotels, own prices, dates and ticked checklist items are saved online through `api/state.js`, so both of us see the same thing. This needs a small free database connected once in Vercel:

1. Vercel → the project → **Storage** → **Create Database** → **Upstash for Redis** (free plan) → connect it to this project.
2. **Deployments** → redeploy the latest one.

The header of the site then shows "☁ Shared". Without the database it shows "💾 Saved on this device only" and everything still works per device (use "Copy link to share this plan" in the calculator instead).

Anyone who knows the site address can change the shared choices — there is no login.
