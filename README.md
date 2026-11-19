# Our trips

Static site, no build step. Deploy on Vercel: **Add New → Project → import this repo → Framework preset "Other" → Deploy**. Every push to `main` redeploys.

- `/` – all our trips, side by side
- `/<trip>/` – one trip (`vietnam`, `philippines`, `south-africa`, …); every trip has the same menus
- `shared/app.js`, `shared/styles.css` – the engine used by every trip
- `trips.js` – the list of trips shown on the home page and in the trip switcher

## Adding a new trip

1. Create a folder, e.g. `japan/`, and copy `shared/trip.html` into it as `index.html`.
2. Write `japan/data.js` (use an existing trip as the pattern) and check it with `node tools/validate.js japan`.
3. Add one line for it in `trips.js`.

## Updating prices

Everything for a trip — prices, flights, routes, hotels, tips, checklist — lives in its `data.js`. Change a number, commit, push.

| What | Where in `data.js` |
|---|---|
| Trip settings (dates, home airport, arrival city, budget) | `meta` |
| Hotel / food / taxi rates per place | `places` |
| Flights (per person, return); default flight is `meta.bestFlight` | `flights` |
| Journeys inside the country | `legs` |
| Activities, visa, insurance | `activities`, `fixed` |
| The routes | `scenarios` |
| Hotels with reviews | `hotels` |
| Must-do preparation (orange box) | `mustDo` |
| Traveller tips | `tips` |
| Offers from travel companies | `offers` |

Each `<trip>/trip-report.pdf` is a print of `<trip>/index.html?print=1` (A4, 62% scale, backgrounds on).

## Sharing choices between the two of us

Flight, route, hotels, own prices, dates and ticked checklist items are saved online through `api/state.js`, so both of us see the same thing. This needs a small free database connected once in Vercel:

1. Vercel → the project → **Storage** → **Create Database** → **Upstash for Redis** (free plan) → connect it to this project.
2. **Deployments** → redeploy the latest one.

The header of the site then shows "☁ Shared". Without the database it shows "💾 Saved on this device only" and everything still works per device (use "Copy link to share this plan" in the calculator instead).

Anyone who knows the site address can change the shared choices — there is no login.
