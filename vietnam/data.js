/* ============================================================================
   Sophie & Mohsey in Vietnam — ALL PRICES AND TEXT LIVE HERE.
   To update a price: change the number, commit, push. Vercel redeploys itself.
   Money is in EUR. "for2" = for both travellers. "pp" = per person.
   Research snapshot: 19 Nov 2026. 1 EUR ≈ 28,500 VND, 1 USD ≈ 0.88 EUR.
   ========================================================================== */
(function () {
  const S = (t, u) => ({ t, u });
  const src = {
    eva: S('EVA Air fare page', 'https://flights.evaair.com/en-at/flights-from-vienna-to-ho-chi-minh-city'),
    vna: S('Vietnam Airlines fare page', 'https://www.vietnamairlines.com/en-at/flights-from-vienna-to-ho-chi-minh-city'),
    vnaPqc: S('Vietnam Airlines to Phu Quoc', 'https://www.vietnamairlines.com/en-at/flights-to-phu-quoc'),
    tk: S('Turkish Airlines fare page', 'https://www.turkishairlines.com/en-at/book-flights-to-vietnam'),
    ci: S('China Airlines fare page', 'https://flights.china-airlines.com/zh-at/flights-from-vienna-to-ho-chi-minh-city'),
    scoot: S('wohin-und-wann.de', 'https://www.wohin-und-wann.de/flights/vietnam/ho-chi-minh-stadt/?city_from=wien'),
    ca: S('fluege.de', 'https://www.fluege.de/Katalog/Oesterreich-Ho-Chi-Minh-City/Flug-von-nach-156512'),
    os: S('reisetopia: Austrian winter schedule', 'https://reisetopia.de/news/austrian-airlines-anpassungen-winterflugplan-2026-2027/'),
    sas: S('ScandAsia: SAS–Vietnam Airlines codeshare', 'https://scandasia.com/sas-and-vietnam-airlines-expand-codeshare-agreement-for-2026/'),
    gulf: S('EASA Gulf airspace bulletin extended', 'https://houseofsaud.com/easa-extends-gulf-airspace-warnings-january-2027/'),
    lth: S('VnExpress: Long Thanh opens 24 Dec', 'https://e.vnexpress.net/news/news/traffic/vietnam-s-largest-airport-long-thanh-to-open-on-dec-24-with-up-to-366-flights-a-week-5138904.html'),
    ferries: S('Phu Quoc Island Guide: ferries', 'https://phuquocislandguide.com/plan/ferries/'),
    ferryHalt: S('Dan Tri: ferries halted in rough seas', 'https://dtinews.dantri.com.vn/vietnam-today/ferry-and-boat-services-to-phu-quoc-halted-amid-rough-seas-20251120145229498.htm'),
    busDeaths: S('Tuoi Tre: sleeper-bus fatalities 2026', 'https://news.tuoitre.vn/vietnam-records-199-fatalities-in-sleeper-bus-crashes-in-5-months-10326072210023267.htm'),
    delays: S('Tuoi Tre: airline punctuality June 2026', 'https://news.tuoitre.vn/vietnam-sees-over-6200-flights-delayed-in-june-103260715154851308.htm'),
    sunBag: S('Sun PhuQuoc Airways baggage', 'https://www.sunphuquocairways.com/en/travel-info/baggage/baggage-allowance'),
    vnaDom: S('Vietnam Airlines SGN–PQC', 'https://www.vietnamairlines.com/en-vn/flights-to-phu-quoc'),
    vjFees: S('Vietjet fees', 'https://www.vietjetair.com/en/pages/to-have-a-good-flight-1599448842652/fee-and-charges-1599130343851'),
    go12: S('12go: HCMC to Phu Quoc', 'https://12go.asia/en/travel/ho-chi-minh/phu-quoc'),
    car: S('Private car HCMC–Rach Gia', 'https://limogo.vn/en/car-rental/ho-chi-minh-to-rach-gia-private-car.html'),
    ctPqc: S('Vietnam Airlines Can Tho–Phu Quoc', 'https://www.vietnamairlines.com/en-vn/flights-from-can-tho-to-phu-quoc'),
    benTre: S('How to get to Ben Tre', 'https://www.luxurycruisemekong.com/blog/how-to-get-from-ho-chi-minh-city-to-ben-tre/'),
    pqcDad: S('Google Flights PQC–DAD', 'https://www.google.com/travel/flights/flights-from-phu-quoc-to-da-nang.html'),
    pqcHan: S('Google Flights PQC–HAN', 'https://www.google.com/travel/flights/flights-from-phu-quoc-to-hanoi.html'),
    hoianTr: S('Da Nang airport to Hoi An', 'https://hoianlocal.com/blog/da-nang-to-hoi-an/'),
    train: S('Seat61: Vietnam trains', 'https://www.seat61.com/Vietnam.htm'),
    trainHan: S('Reunification Express guide', 'https://www.vietnamtourism.com/en/the-north-south-reunification-express-a-36-hour-train-journey-through-vietnam'),
    tsn: S('Tan Son Nhat to District 1', 'https://daytripsvietnam.com/transport/tan-son-nhat-airport-to-district-1/'),
    pqTaxi: S('Phu Quoc transport', 'https://vietnamspot.ru/en/blog/phu-quoc-transport'),
    grabPq: S('Grab at Phu Quoc airport', 'https://www.grab.com/global/airport-rides/phu-quoc-international-airport/'),
    vinbus: S('VinBus Phu Quoc', 'https://vinwonders.com/en/wonderpedia/news/vinbus-phu-quoc/'),
    bike: S('Riding legally in Vietnam', 'https://vietcetera.com/amp/en/why-many-foreigners-ride-illegally-in-vietnam-without-realizing-it'),
    hcmHotel: S('Booking.com HCMC averages', 'https://www.booking.com/city/vn/ho-chi-minh-city.html'),
    pqHotel: S('Agoda Phu Quoc', 'https://www.agoda.com/en-ca/city/phu-quoc-island-vn.html'),
    pqPeak: S('Christmas & New Year surcharges', 'https://vietone.travel/christmas-new-year-in-vietnam-travel-agents/'),
    pqPrices: S('Phu Quoc prices 2026', 'https://vietnamspot.ru/en/blog/phu-quoc-prices'),
    gala1: S('Mövenpick Phu Quoc festive 2026', 'https://www.movenpickresortwaverlyphuquoc.com/festive-season-2026-movenpick-phu-quoc/'),
    gala2: S('Pullman Phu Quoc listing', 'https://luxuryescapes.com/au/offer/pullman-phu-quoc-beach-resort-vietnam-asia/006Ii000002IlwQIAS'),
    foodHcm: S('HCMC prices 2026', 'https://vietnamspot.ru/en/blog/ho-chi-minh-prices'),
    snorkel: S('Phu Quoc speedboat tours 2026', 'https://visitphuquoc.com.vn/en/detailed-and-updated-2026-phu-quoc-island-speedboat-tour-experience-10002'),
    cable: S('Hon Thom cable car 2026', 'https://visitphuquoc.com.vn/en/sun-world-hon-thom-2026-ticket-update-ride-the-worlds-longest-cable-car-what-to-play-for-a-blast-8467'),
    vinw: S('VinWonders tickets', 'https://vinpearl.com/en/vinwonders-phu-quoc-ticket-essential-things-to-know'),
    kiss: S('Kiss of the Sea show', 'https://visitphuquoc.com.vn/en/latest-kiss-of-the-sea-phu-quoc-tickets-price-show-schedule-and-complete-show-experience-8670'),
    jetski: S('Phu Quoc water sports', 'https://phuquocgo.vn/en/phu-quoc-parasailing/'),
    spa: S('Mer Spa menu', 'https://impresstravel.com/mer-spa-phu-quoc/'),
    dive: S('Phu Quoc diving', 'https://vietnamspot.ru/en/blog/phu-quoc-diving'),
    cuchi: S('Cu Chi tunnels', 'https://vietnamspot.ru/en/blog/ho-chi-minh-cu-chi-tunnels'),
    mekong: S('Mekong tours', 'https://vietnamspot.ru/en/blog/ho-chi-minh-mekong-delta'),
    foodTour: S('Street-food motorbike tour', 'https://www.tourradar.com/t/340727'),
    museum: S('War Remnants Museum', 'https://junglebosstours.com/explorer/tourism-blog/war-remnants-museum'),
    ninh: S('Ninh Binh tours', 'https://www.bestpricetravel.com/en-uk/ninh-binh-tours'),
    halong: S('Ha Long day cruises', 'https://vietnamspot.ru/en/blog/ha-long-tours'),
    cook: S('Hoi An cooking class', 'https://www.cookly.me/do/1187-morning-class-with-market-trip-boat-ride-through-water-coconut-forest/in/hoi-an'),
    bana: S('Ba Na Hills 2026', 'https://sunparadiseland.com/en/SunParadiseLandDaNang/tin-tuc/ba-na-hills-ticket-prices-2026-cable-car-fares-and-saving-tips-7745'),
    tailor: S('Hoi An tailors', 'https://en.travelsense.asia/best-shop-tailoring-in-hoi-an-what-to-know/'),
    visa: S('Tuoi Tre: 45-day visa waiver list', 'https://news.tuoitre.vn/vietnam-grants-45-day-visa-waivers-to-citizens-of-12-countries-starting-august-15-103250811165513466.htm'),
    evisa: S('Official e-visa portal', 'https://evisa.gov.vn'),
    evisaScam: S('VietnamPlus: e-visa warnings', 'https://en.vietnamplus.vn/vietnam-steps-up-e-visa-rollout-to-protect-citizens-international-visitors-post349493.vnp'),
    dac: S('Digital arrival card', 'https://mainlymiles.com/2026/04/20/vietnam-introduces-mandatory-digital-arrival-card-at-ho-chi-minh-city/'),
    pqVisa: S('Phu Quoc visa exemption', 'https://phuquocislandguide.com/plan/visa/'),
    ins: S('Europäische Reiseversicherung', 'https://www.europaeische.at/en/travel-insurances'),
    esim: S('Vietnam eSIM prices 2026', 'https://travelsimasia.com/blogs/vietnam-guides/vietnam-esim-prices-2026'),
    atm: S('ATM fees in Vietnam', 'https://atmfeesaver.com/cash-atms-in-vietnam/'),
    wxPq: S('Phu Quoc January weather', 'https://localvietnam.com/phu-quoc/phu-quoc-january-weather/'),
    wxHoi: S('Hoi An January weather', 'https://localvietnam.com/quang-nam/hoi-an/hoi-an-january-weather/'),
    trash: S('VnExpress: trash on Khem & Sao beaches, Jan 2026', 'https://e.vnexpress.net/news/travel/places/tourists-shocked-as-trash-swamps-phu-quoc-s-most-famous-beaches-5001398.html'),
    market: S('VnExpress: Phu Quoc night market closed', 'https://e.vnexpress.net/news/travel/places/phu-quoc-night-market-to-suspend-operation-after-tet-holiday-5003751.html'),
    dengue: S('Dengue in southern Vietnam 2026', 'https://www.mesvaccins.net/web/news/24550-viet-nam-si-globalement-l-activite-de-la-dengue-diminue-l-analyse-regionale-montre-une-progression-dans-le-sud-du-pays-en-particulier-a-ho-chi-minh'),
    nye: S('Tuoi Tre: HCMC New Year fireworks', 'https://news.tuoitre.vn/ho-chi-minh-city-to-set-off-fireworks-at-4-sites-to-welcome-2026-103251231151651732.htm')
  };

  window.TRIP = {
    meta: {
      updatedHuman: '19 Nov 2026', eurVnd: 28500, budgetMin: 4000, budgetMax: 5000,
      peakNights: 5, shopping: 150, reservePct: 5, visaDefault: true, recommended: 'I',
      lede: 'Seventeen nights of sun, sea and street food. Here is every route we could take, what each one costs, and a calculator to shape our own.',
      recWhy: 'New Year’s Eve fireworks in Saigon, one night in the Mekong, then twelve nights on Phu Quoc’s calm west coast — and it dodges the island’s New-Year hotel surcharge.'
    },

    headlines: [
      { icon: '✈️', t: 'Flights: about €2,500 for two', d: 'No airline flies Vienna–Vietnam nonstop. For 28 Dec → 15 Jan the best-evidenced fare is EVA Air at about €1,240 each with bags, so about €2,500 for two. Turkish or Air China may be cheaper, but we have no firm price for them on these dates yet.' },
      { icon: '🏝️', t: 'Phu Quoc over New Year is pricey', d: '29 Dec – 2 Jan is absolute peak: hotels add roughly 30–60%, and many 4–5★ resorts charge a compulsory gala dinner on 31 Dec (about €60–185 per person). Spending New Year in Saigon first avoids most of it.' },
      { icon: '🌊', t: 'Stay south for swimming', d: 'Phu Quoc’s west coast is calm and 27–28 °C in January. Hoi An is cool, rainy and rough; Hanoi is grey and 10–20 °C. Adding them costs beach days and needs warm clothes.' },
      { icon: '🛂', t: 'Austrian passports need an e-visa', d: 'Austria is not on Vietnam’s 45-day visa-free list. The e-visa is USD 25 each, only from evisa.gov.vn. Other passports have different rules — check yours. A free digital arrival card is also required within 72 hours before landing.' },
      { icon: '🛬', t: 'You land back in Vienna on 16 Jan', d: 'Almost every flight leaving Vietnam on the evening of 15 Jan arrives in Vienna the next morning. If you must be home on the 15th, you need to leave on the 14th.' },
      { icon: '🧮', t: 'The honest total is above €5,000', d: 'With good 3–4★ hotels and mixed dining, the beach routes come to about €5,700–6,200 for two. Simple 3★ hotels plus mostly local food brings them to €4,850–5,100, and a cheaper flight (Turkish or Air China, if a real quote confirms it) can take off another €100–600. Try it in the calculator.' }
    ],

    places: {
      hcmc: { name: 'Ho Chi Minh City (Saigon)', short: 'Saigon', emoji: '🏙️', beach: false, swim: 0,
        blurb: 'Street food, rooftop bars, museums, markets. Hot and dry.',
        hotel: { budget: 38, mid: 55, nice: 85 }, peakMult: 1.15, food: { local: 16, mixed: 36, tourist: 60 }, localPerDay: 9,
        hotelNote: 'District 1 or the District 1/3 border, a few streets back from Bui Vien.', foodNote: 'Pho €1–2, banh mi under €2, restaurant main €5–10.', localNote: 'Grab rides are €1–4 in the centre.',
        wx: { air: '31–33 °C by day, 22 °C at night', rain: 'Dry season, almost none', sea: 'No beach' }, src: [src.hcmHotel, src.foodHcm] },
      mekong: { name: 'Mekong Delta (Ben Tre)', short: 'Mekong', emoji: '🛶', beach: false, swim: 0,
        blurb: 'Coconut canals, bicycles, homestay dinners, river life.',
        hotel: { budget: 30, mid: 45, nice: 65 }, peakMult: 1.1, food: { local: 14, mixed: 28, tourist: 45 }, localPerDay: 8,
        hotelNote: 'Riverside homestays and eco-lodges, often with bikes and breakfast.', foodNote: 'Often eaten at the homestay.', localNote: 'Bikes are usually free; boats are in the activities.',
        wx: { air: '30–32 °C', rain: 'Dry season', sea: 'River only — no swimming' }, src: [S('Ben Tre lodges', 'https://momondo.com/hotels/ben-tre/Mekong-Home.mhd2948519.ksp')] },
      pq: { name: 'Phu Quoc island', short: 'Phu Quoc', emoji: '🏝️', beach: true, swim: 5,
        blurb: 'Calm warm sea on the west coast, sunsets, seafood, snorkelling.',
        hotel: { budget: 45, mid: 78, nice: 120 }, peakMult: 1.45, food: { local: 22, mixed: 48, tourist: 80 }, localPerDay: 12,
        hotelNote: 'West coast: Ong Lang (quiet) or Long Beach (lively).', foodNote: 'Seafood dinner for two €10–17 at market stalls; beach-bar cocktail €3–6; resort dining far more.', localNote: 'Taxis between areas €5–14; the island is 50 km long.',
        wx: { air: '29–31 °C', rain: 'Dry season, 2–4 short showers a month', sea: '27–28 °C, calm on the west coast (Long Beach, Ong Lang). East coast (Sao) is windier.' }, src: [src.pqHotel, src.pqPrices, src.pqPeak] },
      hoian: { name: 'Hoi An (via Da Nang)', short: 'Hoi An', emoji: '🏮', beach: false, swim: 1,
        blurb: 'Lantern-lit old town, tailors, cooking classes. Cool and showery in January.',
        hotel: { budget: 35, mid: 50, nice: 80 }, peakMult: 1.1, food: { local: 16, mixed: 34, tourist: 58 }, localPerDay: 9,
        hotelNote: 'January is low season here — good deals on pool hotels.', foodNote: 'Cao lau, banh mi Phuong, white rose dumplings.', localNote: 'Walkable; taxi to An Bang beach about €4.',
        wx: { air: '20–24 °C', rain: 'Showery, 40–150 mm in January', sea: '22–23 °C, often rough with red flags. Not a beach stop in January.' }, src: [S('Hoi An hotels', 'https://vietnamspot.ru/en/blog/hoi-an-hotels'), src.wxHoi] },
      hanoi: { name: 'Hanoi', short: 'Hanoi', emoji: '🏯', beach: false, swim: 0,
        blurb: 'Old Quarter, lakes, the best pho. Grey, damp and cold in January.',
        hotel: { budget: 38, mid: 55, nice: 90 }, peakMult: 1.1, food: { local: 16, mixed: 34, tourist: 60 }, localPerDay: 9,
        hotelNote: 'Old Quarter boutique hotels; rates often exclude 15% tax and service. Ask about heating.', foodNote: 'Bun cha, egg coffee, pho.', localNote: 'Grab is cheap; airport run about €10.',
        wx: { air: '17–20 °C by day, 7–16 °C at night', rain: 'Grey with drizzle', sea: 'No beach. Ha Long Bay is often foggy.' }, src: [S('Hanoi hotels', 'https://vietnamspot.ru/en/blog/hanoi-hotels')] }
    },

    /* pp = per person return incl. checked bag. ev: 'near' = seen on an airline fare page for close dates; 'est' = estimate. */
    flights: [
      { id: 'eva-sgn', airline: 'EVA Air', route: 'VIE–SGN', via: 'Bangkok & Taipei', stops: 2, durOut: 22, durBack: 24, arr: 'hcmc', dep: 'hcmc', pp: { low: 1200, typ: 1240, high: 1370 }, ev: 'near', bag: '23 kg bag included.', arrive: 'lands Vienna 16 Jan', note: 'Seen: €1,220 (28 Dec–12 Jan), €1,241 (30 Dec–15 Jan), €1,367 (29 Dec–12 Jan). Avoids Gulf airspace.', src: [src.eva] },
      { id: 'tk-sgn', airline: 'Turkish Airlines', route: 'VIE–SGN', via: 'Istanbul', stops: 1, durOut: 16, durBack: 17, arr: 'hcmc', dep: 'hcmc', pp: { low: 950, typ: 1200, high: 1400 }, ev: 'est', bag: 'Check that your fare includes a bag.', arrive: 'leaves 22:05, lands Vienna 16 Jan', note: 'Off-peak fares of €660–680 seen for early December; no peak quote found. Usually the fastest one-stop.', src: [src.tk] },
      { id: 'vn-sgn', airline: 'Vietnam Airlines', route: 'VIE–SGN', via: 'Frankfurt or Munich', stops: 1, durOut: 17, durBack: 18, arr: 'hcmc', dep: 'hcmc', pp: { low: 1256, typ: 1650, high: 2330 }, ev: 'near', bag: '23 kg bag usually included.', arrive: 'lands Vienna 16 Jan', note: 'Seen: €1,256 (18 Dec–7 Jan), €2,060 (26 Dec–8 Jan), €2,328 (23 Dec–9 Jan). Very date-sensitive.', src: [src.vna] },
      { id: 'qr-sgn', airline: 'Qatar Airways', route: 'VIE–SGN', via: 'Doha', stops: 1, durOut: 17, durBack: 18, arr: 'hcmc', dep: 'hcmc', pp: { low: 1000, typ: 1250, high: 1500 }, ev: 'est', bag: '20 kg on the cheapest fare.', arrive: 'usually lands 16 Jan', note: 'No fare found for these dates. Gulf airspace advisory in force until 31 Jan 2027 — higher disruption risk.', src: [src.gulf] },
      { id: 'ek-sgn', airline: 'Emirates', route: 'VIE–SGN', via: 'Dubai', stops: 1, durOut: 17, durBack: 19, arr: 'hcmc', dep: 'hcmc', pp: { low: 1100, typ: 1350, high: 1600 }, ev: 'est', bag: '20–25 kg usually included.', arrive: 'usually lands 16 Jan', note: 'No fare found for these dates. Same Gulf airspace caveat.', src: [src.gulf] },
      { id: 'lh-sgn', airline: 'Austrian / Lufthansa / Swiss', route: 'VIE–SGN', via: 'Frankfurt, Munich or Zurich', stops: 1, durOut: 17, durBack: 19, arr: 'hcmc', dep: 'hcmc', pp: { low: 1300, typ: 1550, high: 1900 }, ev: 'est', bag: 'Light fare has NO checked bag (about €70–100 each way extra, included here).', arrive: 'lands Vienna 16 Jan', note: 'Austrian itself does not fly to Vietnam; this is a Lufthansa Group connection. Undated “from” fares €979–1,068.', src: [src.os] },
      { id: 'ci-sgn', airline: 'China Airlines', route: 'VIE–SGN', via: 'Taipei (nonstop from Vienna)', stops: 1, durOut: 21, durBack: 23, arr: 'hcmc', dep: 'hcmc', pp: { low: 1050, typ: 1250, high: 1450 }, ev: 'est', bag: 'Bag included.', arrive: 'lands Vienna 16 Jan', note: '€1,019 seen for late January; no December fare shown.', src: [src.ci] },
      { id: 'ca-sgn', airline: 'Air China', route: 'VIE–SGN', via: 'Beijing', stops: 1, durOut: 24, durBack: 26, arr: 'hcmc', dep: 'hcmc', pp: { low: 800, typ: 950, high: 1100 }, ev: 'est', bag: 'Bag usually included.', arrive: 'check the itinerary', note: 'Likely the cheapest, with long layovers. €618 seen off-peak; no peak quote found.', src: [src.ca] },
      { id: 'tr-sgn', airline: 'Scoot (low-cost)', route: 'VIE–SGN', via: 'Singapore (nonstop from Vienna)', stops: 1, durOut: 19, durBack: 21, arr: 'hcmc', dep: 'hcmc', pp: { low: 750, typ: 1000, high: 1300 }, ev: 'est', bag: 'Bags, meals and seats all cost extra (added here).', arrive: 'check the itinerary', note: 'Flies about 4 days a week. €527–576 base fare seen for non-peak dates.', src: [src.scoot] },
      { id: 'vn-pqc', airline: 'Vietnam Airlines', route: 'VIE–PQC', via: 'Frankfurt/Munich + Saigon', stops: 2, durOut: 21, durBack: 22, arr: 'pq', dep: 'pq', pp: { low: 1430, typ: 1730, high: 2000 }, ev: 'near', bag: '23 kg bag usually included.', arrive: 'lands Vienna 16 Jan', note: 'One protected ticket to the island. Seen: €1,729 (23 Dec–5 Jan), €1,429 (2–17 Jan).', src: [src.vnaPqc] },
      { id: 'os-bkk-pq', airline: 'Austrian nonstop to Bangkok + low-cost hop', route: 'VIE–BKK–PQC', via: 'Bangkok (two separate tickets)', stops: 1, durOut: 15, durBack: 16, arr: 'pq', dep: 'pq', pp: { low: 1300, typ: 1600, high: 1900 }, ev: 'est', bag: 'Austrian Light has no bag; the low-cost hop charges for bags (added here).', arrive: 'depends on connection', note: 'Austrian flies Vienna–Bangkok daily this winter. The onward flight is a separate ticket: if the first flight is late, the second is lost. May involve changing Bangkok airports.', src: [src.os] },
      { id: 'oj-han', airline: 'Open-jaw (Turkish / EVA / Vietnam Airlines)', route: 'VIE→SGN, HAN→VIE', via: 'one stop each way', stops: 1, durOut: 17, durBack: 17, arr: 'hcmc', dep: 'hanoi', pp: { low: 1250, typ: 1400, high: 1700 }, ev: 'est', bag: 'Depends on airline.', arrive: 'lands Vienna 16 Jan', note: 'Fly into Saigon, home from Hanoi. No live quote found; search “multi-city”.', src: [S('EVA Vienna–Hanoi', 'https://flights.evaair.com/en-at/flights-from-vienna-to-hanoi')] },
      { id: 'oj-dad', airline: 'Open-jaw (EVA / Vietnam Airlines)', route: 'VIE→SGN, DAD→VIE', via: 'one or two stops', stops: 2, durOut: 17, durBack: 21, arr: 'hcmc', dep: 'hoian', pp: { low: 1300, typ: 1450, high: 1750 }, ev: 'est', bag: 'Depends on airline.', arrive: 'lands Vienna 16 Jan', note: 'Fly into Saigon, home from Da Nang (for Hoi An). Few airlines serve Da Nang.', src: [S('EVA Vienna–Vietnam', 'https://flights.evaair.com/en-at/flights-from-vienna-to-vietnam')] }
    ],

    flightNotes: [
      { icon: '⚠️', t: 'These are not bookable quotes.', d: 'Prices come from airline fare pages for close-by dates, or are marked as estimates. Search your exact dates once and type the real price into “Our prices”.' },
      { icon: '🇦🇹', t: 'Austrian Airlines', d: 'does not fly to Vietnam. Its only nearby route is Vienna–Bangkok nonstop (daily this winter). Vietnam needs a Lufthansa connection or a separate onward ticket.', src: [src.os] },
      { icon: '🇸🇪', t: 'SAS', d: 'has no flights of its own to Vietnam. It codeshares on Vietnam Airlines’ Copenhagen–Saigon nonstop, which from Vienna means two stops. No fare was found; not a practical choice.', src: [src.sas] },
      { icon: '🛬', t: 'Arrival day:', d: 'evening departures on 15 Jan land in Vienna on the morning of 16 Jan. To be home on the 15th, leave Vietnam on the 14th.' },
      { icon: '🛫', t: 'Gulf routes (Qatar, Emirates, Etihad):', d: 'a European airspace safety advisory for the Gulf was extended to 31 Jan 2027. Airlines are flying, but cancellations are still reported.', src: [src.gulf] },
      { icon: '🏗️', t: 'New Saigon airport:', d: 'Long Thanh (40 km out of town) is due to open on 24 Dec 2026 for some flights. Long-haul and Phu Quoc flights are reported to stay at Tan Son Nhat (SGN) until spring 2027 — check the airport code on every ticket.', src: [src.lth] }
    ],

    flightTips: [
      { icon: '📅', t: 'Shift the date by a day', d: 'EVA showed about €1,200–1,240 for departures on 24, 28 or 30 Dec, but €1,690 for 26 Dec. Vietnam Airlines jumped from €1,256 to €2,300 within a week. Check ±2 days on both ends.', src: [src.eva, src.vna] },
      { icon: '⏱️', t: 'Book now', d: 'The usual advice is 12–16 weeks ahead for Christmas travel. That window has passed, so prices are more likely to rise than fall.' },
      { icon: '🧳', t: 'Compare with bags included', d: 'Lufthansa Group “Light”, Etihad “Basic” and Scoot do not include a checked bag. A fare that looks €150 cheaper can end up dearer.' },
      { icon: '🔗', t: 'Keep it on one ticket where you can', d: 'With separate tickets (for example Vienna–Bangkok plus a low-cost hop), a delay on the first flight means buying the second again. If you do split, sleep one night in between.' },
      { icon: '🚉', t: 'Try Munich', d: 'Vietnam Airlines flies Munich–Saigon nonstop three times a week; €865 was seen for early December. The train from Vienna takes four hours.', src: [S('Vietnam Airlines from Munich', 'https://www.vietnamairlines.com/en-de/flights-from-munich-to-ho-chi-minh-city')] },
      { icon: '🏝️', t: 'Direct charters to Phu Quoc exist', d: 'TUI flies Prague–Phu Quoc weekly and Bratislava–Phu Quoc from 16 Dec 2026 for Fischer/Exim tours; LOT flies from Warsaw and Katowice. They are sold mainly as packages — ask a travel agent about seat-only.', src: [S('Aeroroutes: TUI Prague/Bratislava–PQC', 'https://www.aeroroutes.com/eng/260515-tomnw26btsprg')] }
    ],

    /* Journeys inside Vietnam. pp = per person one way, door to door, incl. bag and local taxis. hassle & comfort 1–5. */
    genericLeg: { id: 'flight', icon: '✈️', label: 'Flight via Saigon', pp: 80, hours: 8, comfort: 3, hassle: 3, note: 'No direct service; estimate.' },
    legs: {
      'hcmc|pq': [
        { id: 'flight', icon: '✈️', label: 'Flight (1 hour)', pp: 55, hours: 4.5, comfort: 4, hassle: 1, note: 'Vietnam Airlines and Sun PhuQuoc Airways include a 23 kg bag; Vietjet charges for it. “From” fares start at €27; early January with a bag is about €42–70.', risks: ['Vietjet was on time only 71.5% of the time in June 2026 (Vietnam Airlines 79%, Sun PhuQuoc 81%).', 'Vietjet weighs cabin bags (7 kg limit) and charges double at the airport.', 'Check the ticket says SGN, not the new Long Thanh airport.'], src: [src.vnaDom, src.sunBag, src.delays] },
        { id: 'busferry', icon: '🚌', label: 'Sleeper bus + fast ferry', pp: 30, hours: 12, comfort: 2, hassle: 4, note: 'Bus to Rach Gia (6–7 h, €6–9), fast ferry (2.5 h, €11), plus taxis at both ends. The last ferry leaves about 13:00, so you need the night bus or a 5 am start.', risks: ['Ferries are suspended in rough seas — it happens in December and January, and can strand you in Rach Gia.', 'Sleeper buses had 199 crash deaths in five months of 2026. Avoid night runs and front bunks.', 'Refund trouble after cancellations is reported.', 'Bunks are short for anyone over 1.75 m.'], src: [src.ferries, src.ferryHalt, src.busDeaths, src.go12] },
        { id: 'carferry', icon: '🚗', label: 'Private car + fast ferry', pp: 58, hours: 10, comfort: 3, hassle: 3, note: 'Car with driver to Rach Gia (5 h, €77–88 per car), then the same fast ferry. Costs as much as flying.', risks: ['Same ferry weather risk.', 'Leave by 5:30 for the 10:20 boat.'], src: [src.car, src.ferries] }
      ],
      'hcmc|mekong': [
        { id: 'car', icon: '🚗', label: 'Private car', pp: 21, hours: 2.5, comfort: 4, hassle: 1, note: 'Door to door, about €35–49 per car (estimate from per-km rates). Homestays will arrange it.', src: [src.benTre] },
        { id: 'bus', icon: '🚌', label: 'Daytime bus', pp: 6, hours: 3.5, comfort: 3, hassle: 2, note: 'Futa bus from Mien Tay station, €3–7, then a short taxi to the homestay.', src: [src.benTre] }
      ],
      'mekong|pq': [
        { id: 'viahcmc', icon: '✈️', label: 'Car to Saigon airport + flight', pp: 76, hours: 7.5, comfort: 4, hassle: 2, note: 'The most reliable way: 2.5 h by car, then the 1-hour flight.', src: [src.vnaDom] },
        { id: 'cantho', icon: '✈️', label: 'Car to Can Tho + direct flight', pp: 62, hours: 6.5, comfort: 4, hassle: 3, note: 'Vietnam Airlines flies Can Tho–Phu Quoc (58 min, from €40). It may not fly every day — check before planning around it.', src: [src.ctPqc] },
        { id: 'busferry', icon: '🚌', label: 'Bus to Rach Gia + fast ferry', pp: 25, hours: 9, comfort: 2, hassle: 4, note: 'Cheapest and the classic overland route, with the same ferry weather risk.', risks: ['Ferry cancellations in rough seas.', 'Futa tickets cannot be changed.'], src: [src.ferries, src.ferryHalt] }
      ],
      'hoian|pq': [
        { id: 'flight', icon: '✈️', label: 'Direct flight to Da Nang + transfer', pp: 75, hours: 5.5, comfort: 4, hassle: 2, note: 'Vietjet and Sun PhuQuoc Airways fly direct (1 h 45). Return fares of USD 114–125 seen. Da Nang airport to Hoi An is 45 min, €9–12 by Grab.', src: [src.pqcDad, src.hoianTr] }
      ],
      'hanoi|pq': [
        { id: 'flight', icon: '✈️', label: 'Direct flight (2 hours)', pp: 80, hours: 6, comfort: 4, hassle: 2, note: 'About 41 nonstops a week. Typical return USD 115–335. Noi Bai airport to the Old Quarter: €8–14 by Grab.', src: [src.pqcHan] }
      ],
      'hanoi|hoian': [
        { id: 'flight', icon: '✈️', label: 'Flight Da Nang–Hanoi', pp: 50, hours: 5, comfort: 4, hassle: 2, note: '1 h 20 in the air, from €34, plus the Hoi An transfer.', src: [src.hoianTr] },
        { id: 'train', icon: '🚆', label: 'Sleeper train', pp: 48, hours: 18, comfort: 3, hassle: 4, note: '15–17 hours in a four-berth soft sleeper (€39–45). Scenic at first, long overall.', src: [src.train] }
      ],
      'hcmc|hoian': [
        { id: 'flight', icon: '✈️', label: 'Flight to Da Nang + transfer', pp: 50, hours: 5, comfort: 4, hassle: 2, note: '1 h 20 in the air; base fares from €10 before bags.', src: [src.hoianTr] },
        { id: 'train', icon: '🚆', label: 'Sleeper train', pp: 45, hours: 19, comfort: 3, hassle: 4, note: 'Train SE2 takes 16.5 hours overnight; soft sleeper price is an estimate.', src: [src.train] }
      ],
      'hanoi|hcmc': [
        { id: 'flight', icon: '✈️', label: 'Flight (2 hours)', pp: 55, hours: 5.5, comfort: 4, hassle: 2, note: 'From €28–31 on Vietnam Airlines. Some Hanoi flights move to Long Thanh airport — check the code.', src: [src.lth] },
        { id: 'train', icon: '🚆', label: 'Reunification Express', pp: 72, hours: 35, comfort: 2, hassle: 5, note: '32–36 hours. Soft sleeper €61–84. Lovely scenery, but it eats two days of a 17-night trip.', src: [src.trainHan, src.train] }
      ]
    },

    taxi: [
      { icon: '📱', t: 'Use Grab or Xanh SM', d: 'Install both before you fly. Grab takes foreign cards. Xanh SM (turquoise electric taxis) has a published meter with no surge pricing and is easy to find on Phu Quoc; carry cash for it in case your card is refused.', price: 'City ride €1–4', src: [S('Grab in Vietnam 2026', 'https://www.vietnamtourism.com/en/does-grab-work-in-vietnam-complete-guide-2026')] },
      { icon: '🛬', t: 'Saigon airport → centre', d: 'Order a Grab from the marked pickup zone, or take only Vinasun (white) or Mai Linh (green) from the official queue. Ignore touts inside arrivals and anyone offering a “fixed price”.', price: '€5–10, 25–50 min', src: [src.tsn] },
      { icon: '🚫', t: 'Fake taxis and fake Grab drivers', d: 'Look-alike taxis with rigged meters have charged ten times the fare. Fake “Grab drivers” show a phone screen and wave you over — only get into the number plate shown in your own app.', src: [S('Saigon scams 2026', 'https://blog.fizen.io/ho-chi-minh-city-scams-2026/')] },
      { icon: '🏝️', t: 'Phu Quoc airport → hotel', d: 'Grab does work on the island (touts say it doesn’t). To Long Beach €4–9, Ong Lang about €9–12, Sunset Town about €9, Grand World in the north €9–14. Refuse anything over about €22.', price: '€4–14', src: [src.pqTaxi, src.grabPq] },
      { icon: '🚌', t: 'VinBus on Phu Quoc', d: 'The electric buses between the airport and Grand World are no longer free: about €0.70–1.75 a ride since January 2026, free with a VinWonders or Safari ticket.', price: 'under €2', src: [src.vinbus] },
      { icon: '🛵', t: 'Scooters: think twice', d: 'Rental is only €3.50–5 a day, but a car licence does not cover a scooter. You need a motorcycle category on your home licence plus a 1968-convention international permit. Without them you ride unlicensed and travel insurance normally refuses accident claims. Fines are €70–140.', price: '€3.50–5 a day', src: [src.bike] },
      { icon: '🚗', t: 'Car with driver', d: 'For a day of exploring Phu Quoc, a car with driver is about €70 — comfortable and stress-free for two.', price: 'about €70 a day', src: [src.pqTaxi] },
      { icon: '🏮', t: 'Da Nang airport → Hoi An', d: 'Grab €9–12, metered taxi €12–18, shared shuttle €5–6 each. 45 minutes.', price: '€9–18', src: [src.hoianTr] },
      { icon: '🏯', t: 'Hanoi airport → Old Quarter', d: 'Bus 86 costs under €2 (cash). Grab €8–14. Touts ask €18–25; one fake driver charged €32.', price: '€2–14', src: [S('Noi Bai to Old Quarter', 'https://daytripsvietnam.com/transport/noi-bai-airport-to-hanoi-old-quarter/')] }
    ],

    activities: [
      { id: 'cuchi', place: 'hcmc', name: 'Cu Chi tunnels, half-day group tour', for2: 40, note: 'USD 17–24 each. Speedboat version about €83 for two.', src: [src.cuchi] },
      { id: 'mekongday', place: 'hcmc', name: 'Mekong Delta day trip, small group', for2: 85, note: 'USD 35–60 each. Choose Ben Tre over the crowded My Tho circuit.', src: [src.mekong] },
      { id: 'foodtour', place: 'hcmc', name: 'Street-food tour by motorbike', for2: 60, note: 'USD 28–33 each, about four hours with drivers.', src: [src.foodTour] },
      { id: 'museum', place: 'hcmc', name: 'War Remnants Museum', for2: 4, note: 'VND 60,000 each.', src: [src.museum] },
      { id: 'rooftop', place: 'hcmc', name: 'Rooftop sunset drinks', for2: 25, note: 'Estimate: two cocktails each at a District 1 rooftop.' },
      { id: 'mekboat', place: 'mekong', name: 'Canal boat and bike tour from the homestay', for2: 40, note: 'Estimate — ask the homestay.' },
      { id: 'mekcook', place: 'mekong', name: 'Cooking with the homestay family', for2: 25, note: 'Estimate — often offered with dinner.' },
      { id: 'snorkel', place: 'pq', name: 'Island-hopping snorkel tour, group boat', for2: 60, note: 'USD 24–41 each. Reviews of the coral are mixed.', src: [src.snorkel] },
      { id: 'speedboat', place: 'pq', name: '4-island speedboat tour', for2: 92, note: 'About USD 52 each, smaller group.', src: [src.snorkel] },
      { id: 'cablecar', place: 'pq', name: 'Hon Thom cable car + water park', for2: 60, note: 'VND 850,000 each; Aquatopia reported as included. Go at opening.', src: [src.cable] },
      { id: 'vinwonders', place: 'pq', name: 'VinWonders theme park', for2: 67, note: 'VND 950,000 each.', src: [src.vinw] },
      { id: 'show', place: 'pq', name: 'Kiss of the Sea show, Sunset Town', for2: 67, note: 'About VND 950,000 each. Go for sunset, eat elsewhere.', src: [src.kiss] },
      { id: 'jetski', place: 'pq', name: 'Jet ski, 15 minutes', for2: 25, note: 'One jet ski shared. Prices are negotiable.', src: [src.jetski] },
      { id: 'parasail', place: 'pq', name: 'Tandem parasailing', for2: 47, note: 'About USD 53 for a tandem flight.', src: [src.jetski] },
      { id: 'massage', place: 'pq', name: 'Massage for two, 60 minutes, town spa', for2: 45, note: 'About VND 640,000–700,000 each. Resorts charge €30+ each.', src: [src.spa] },
      { id: 'scuba', place: 'pq', name: 'Try-scuba day with two dives', for2: 160, note: 'USD 80–100 each.', src: [src.dive] },
      { id: 'cook', place: 'hoian', name: 'Cooking class with market and basket boat', for2: 68, note: 'USD 35–40 each.', src: [src.cook] },
      { id: 'tailor', place: 'hoian', name: 'Something tailor-made (shirt or dress)', for2: 80, note: 'Shirt USD 15–80, dress USD 40–200.', src: [src.tailor] },
      { id: 'bana', place: 'hoian', name: 'Ba Na Hills and Golden Bridge', for2: 66, note: 'About VND 950,000 each; often in cloud in January.', src: [src.bana] },
      { id: 'ninhbinh', place: 'hanoi', name: 'Ninh Binh day trip, small group', for2: 92, note: 'USD 46–60 each.', src: [src.ninh] },
      { id: 'halong', place: 'hanoi', name: 'Ha Long Bay day cruise', for2: 150, note: 'USD 50–120 each. A fog gamble in January.', src: [src.halong] },
      { id: 'hanfood', place: 'hanoi', name: 'Old Quarter street-food walk', for2: 50, note: 'Estimate.' }
    ],

    fixed: {
      visa: { label: 'E-visas for two', for2: 44, note: 'USD 25 each, single entry, only at evisa.gov.vn. Untick if your passports are visa-exempt.', src: [src.evisa, src.visa] },
      insurance: { label: 'Travel medical insurance', for2: 90, note: 'Estimate for medical-only cover, 19 days. With trip-cancellation cover €150–300. Untick if a card or annual policy covers you.', src: [src.ins] },
      sim: { label: 'Two eSIMs', for2: 15, note: 'Viettel tourist eSIM USD 5–12 each.', src: [src.esim] },
      gala: { label: 'Compulsory New Year’s Eve gala dinner at the resort', for2: 150, note: 'Only if you are on Phu Quoc on 31 Dec in a resort that charges it. Seen: VND 1.8–5.5 million per adult.', src: [src.gala1, src.gala2] }
    },

    scenarios: [
      { id: 'I', short: 'Smart south', title: '4 Saigon + 1 Mekong + 12 Phu Quoc', tagline: 'New Year in the city, a night on the river, then pure beach — our research-backed pick.',
        stops: [{ place: 'hcmc', nights: 3 }, { place: 'mekong', nights: 1 }, { place: 'pq', nights: 12 }, { place: 'hcmc', nights: 1 }], flight: 'eva-sgn',
        acts: ['museum', 'foodtour', 'rooftop', 'mekboat', 'snorkel', 'cablecar', 'jetski', 'massage'],
        pros: ['Twelve beach nights on the calm, warm west coast.', 'New Year’s Eve fireworks in Saigon are free — no resort gala fee, and you skip most of Phu Quoc’s New-Year surcharge.', 'A Mekong overnight in Ben Tre instead of a rushed day trip.', 'A last night in Saigon protects the flight home from a delayed island flight.'],
        cons: ['Four check-ins.', 'Twelve island nights is long if you get restless — split it between two west-coast bases.', 'Central Saigon is crowded and car-free on 31 Dec: pick a hotel you can walk back to.'] },
      { id: 'A', short: 'City only', title: '17 nights in Saigon', tagline: 'One base, great food, no beach.',
        stops: [{ place: 'hcmc', nights: 17 }], flight: 'eva-sgn', acts: ['cuchi', 'mekongday', 'museum', 'foodtour', 'rooftop'],
        pros: ['Cheapest route and zero transfers.', 'Endless food and café variety.'], cons: ['No swimming at all — it misses the point of this trip.', 'Travellers agree two to four days covers the city; seventeen is far too many.', 'Traffic, noise and heat wear you down.'] },
      { id: 'B', short: 'Beach only', title: '17 nights on Phu Quoc', tagline: 'Maximum sea time, one island.',
        stops: [{ place: 'pq', nights: 17 }], flight: 'eva-sgn', gala: true, acts: ['snorkel', 'cablecar', 'jetski', 'massage', 'show'],
        pros: ['Seventeen swimming days, unpack once (or twice).', 'No mainland sightseeing stress.'], cons: ['You pay the full New-Year surcharge and probably a gala dinner.', 'Same-day connections in Saigon on separate tickets are risky, especially on the way home.', 'Sights run out after four or five days; nightlife is minimal.', 'Flying on one ticket to Phu Quoc instead costs about €500 more per person.'] },
      { id: 'C', short: 'Beach first', title: '3 Saigon + 14 Phu Quoc', tagline: 'A taste of the city, two weeks of beach.',
        stops: [{ place: 'hcmc', nights: 1 }, { place: 'pq', nights: 14 }, { place: 'hcmc', nights: 2 }], flight: 'eva-sgn', gala: true, acts: ['snorkel', 'cablecar', 'jetski', 'massage', 'museum', 'foodtour'],
        pros: ['Fourteen beach nights.', 'City time at the end doubles as a safety buffer before the flight home.'], cons: ['Arriving on the island on 30 Dec means peak hotel rates and likely a gala fee.', 'Only one jet-lagged night in Saigon at the start.'] },
      { id: 'D', short: 'City + beach', title: '8 Saigon + 9 Phu Quoc', tagline: 'Half culture, half beach.',
        stops: [{ place: 'hcmc', nights: 7 }, { place: 'pq', nights: 9 }, { place: 'hcmc', nights: 1 }], flight: 'eva-sgn', acts: ['mekongday', 'cuchi', 'museum', 'foodtour', 'snorkel', 'jetski', 'massage', 'cablecar'],
        pros: ['Avoids every New-Year surcharge on the island.', 'Time for day trips to the Mekong and Cu Chi.'], cons: ['Seven nights in Saigon is more than most people want.', 'Only nine beach nights for a couple who love swimming.'] },
      { id: 'E', short: 'Nature + beach', title: '5 Saigon + 3 Mekong + 9 Phu Quoc', tagline: 'River life before the island.',
        stops: [{ place: 'hcmc', nights: 4 }, { place: 'mekong', nights: 3 }, { place: 'pq', nights: 9 }, { place: 'hcmc', nights: 1 }], flight: 'eva-sgn', acts: ['cuchi', 'museum', 'foodtour', 'mekboat', 'mekcook', 'snorkel', 'jetski', 'massage'],
        pros: ['The best countryside experience; cheap, charming lodges.', 'Good variety without long flights.'], cons: ['Three Mekong nights is generous — one or two is what most travellers suggest.', 'Four check-ins.'] },
      { id: 'F', short: 'Beach + Hanoi', title: '4 Saigon + 9 Phu Quoc + 4 Hanoi', tagline: 'South to north, home from Hanoi.',
        stops: [{ place: 'hcmc', nights: 4 }, { place: 'pq', nights: 9 }, { place: 'hanoi', nights: 4 }], flight: 'oj-han', acts: ['museum', 'foodtour', 'snorkel', 'jetski', 'massage', 'ninhbinh', 'hanfood'],
        pros: ['Sees both big cities; Ninh Binh is beautiful.', 'No backtracking thanks to the open-jaw ticket.'], cons: ['Hanoi in January is grey, damp and 10–20 °C — pack a fleece and a rain jacket.', 'Open-jaw fares are a guess until you search them.', 'Going from 30 °C beach to cold drizzle for the last four days.'] },
      { id: 'G', short: 'Beach + Hoi An', title: '4 Saigon + 9 Phu Quoc + 4 Hoi An', tagline: 'Lantern town to finish.',
        stops: [{ place: 'hcmc', nights: 4 }, { place: 'pq', nights: 9 }, { place: 'hoian', nights: 4 }], flight: 'oj-dad', acts: ['museum', 'foodtour', 'snorkel', 'jetski', 'massage', 'cook', 'tailor'],
        pros: ['Hoi An’s old town, food and tailors are a highlight.', 'January is low season there: quiet and cheap.'], cons: ['Showery and cool; the sea is rough — treat it as culture, not beach.', 'Few airlines fly home from Da Nang, so the fare is uncertain.'] },
      { id: 'H', short: 'See it all', title: '4 Saigon + 5 Phu Quoc + 4 Hoi An + 4 Hanoi', tagline: 'The classic south-to-north sampler.',
        stops: [{ place: 'hcmc', nights: 4 }, { place: 'pq', nights: 5 }, { place: 'hoian', nights: 4 }, { place: 'hanoi', nights: 4 }], flight: 'oj-han', acts: ['museum', 'foodtour', 'snorkel', 'jetski', 'cook', 'ninhbinh'],
        pros: ['The most variety.'], cons: ['Only five beach nights.', 'Most airport time, most packing, the coldest weather.', 'The most expensive route.'] }
    ],

    tips: [
      { topic: 'Phu Quoc', echo: 'consensus', title: 'Swim on the west coast in January', text: 'Long Beach, Ong Lang and Bai Dai are calm through the dry season. The famous east and south beaches (Sao, Khem) take the wind and drifting rubbish.', src: [S('Best beaches guide', 'https://phuquocislandguide.com/beaches/best-beaches/')] },
      { topic: 'Phu Quoc', echo: 'several', title: 'Showcase beaches can be dirty in early January', text: 'In the first days of January 2026, news reports showed Khem and Sao beaches swamped by water hyacinth and household waste. Treat them as a day trip, not a base.', src: [src.trash] },
      { topic: 'Phu Quoc', echo: 'several', title: 'Long Beach divides opinion', text: 'Some 2026 reviewers call it overbuilt with plastic in the sand; others found clean sand and lovely water. Resorts groom their own frontage, so the hotel you pick matters more than the beach name.', src: [S('TripAdvisor: Long Beach reviews', 'https://www.tripadvisor.com/Attraction_Review-g1184679-d6429146-Reviews-Long_Beach-Duong_Dong_Phu_Quoc_Island_Kien_Giang_Province.html')] },
      { topic: 'Phu Quoc', echo: 'several', title: 'Ong Lang is the quiet-couple pick', text: 'Quieter, rockier and better kept than Long Beach, with snorkelling off the headlands. Not guaranteed plastic-free, and sandflies are mentioned at dusk.', src: [S('Where to stay in Phu Quoc', 'https://www.nomadotravel.app/en/guides/where-to-stay-in-phu-quoc')] },
      { topic: 'Phu Quoc', echo: 'consensus', title: 'Sights run out after four or five days', text: 'Beyond that it is beach, pool and spa — perfect if rest is the goal, dull if you bore easily. Nightlife is minimal.', src: [S('How many days on Phu Quoc', 'https://explorertom.com/en/how-many-days-phu-quoc/')] },
      { topic: 'Phu Quoc', echo: 'several', title: 'Split a long stay between two bases', text: 'For example a week in Ong Lang and five nights at Long Beach or in the south. The island is 50 km long and the north is far from everything else.', src: [S('Where to stay on Phu Quoc', 'https://destinationlesstravel.com/where-to-stay-on-phu-quoc-vietnam/')] },
      { topic: 'Phu Quoc', echo: 'several', title: 'Sunset Town: one evening is enough', text: 'It feels like a film set, but the sunset over Kiss Bridge is excellent. Go for sunset and the show, eat dinner elsewhere.', src: [S('Things to do on Phu Quoc', 'https://explorertom.com/en/things-to-do-phu-quoc/')] },
      { topic: 'Phu Quoc', echo: 'single', title: 'Grand World only if you stay in the north', text: 'Not worth crossing the island for without children.', src: [S('Phu Quoc attractions', 'https://vietnamspot.ru/en/blog/phu-quoc-attractions')] },
      { topic: 'Phu Quoc', echo: 'several', title: 'Ask your hotel about building sites', text: 'The island is building around the clock for the APEC 2027 summit: airport, roads, a conference centre. Reviewers mention construction noise — ask what is next door before you book.', src: [S('Vietnam News: APEC 2027 works', 'https://vietnamnews.vn/society/1801229/phu-quoc-races-to-complete-apec-2027-projects.html')] },
      { topic: 'Phu Quoc', echo: 'official', title: 'Budget for a New Year’s Eve gala dinner', text: 'Many 4–5★ resorts add a compulsory dinner on 31 Dec, from about €60 to €185 per adult, sometimes payable on arrival. Small hotels usually do not. Ask before booking.', src: [src.gala1, src.gala2] },
      { topic: 'Phu Quoc', echo: 'official', title: 'Book hotels only through channels you trust', text: 'Police broke up a fake hotel-booking ring using cloned pages and ads for Phu Quoc. Book on the big platforms or the hotel’s verified site.', src: [S('Vietnam News: booking scam', 'https://vietnamnews.vn/society/1802030/police-bust-phu-quoc-hotel-booking-scam-with-over-231m-in-transactions.html')] },
      { topic: 'Phu Quoc', echo: 'single', title: '“Grab doesn’t work here” is a lie', text: 'Airport touts say it to sell their own ride. Also skip the pearl-shop stops on boat tours.', src: [src.grabPq] },
      { topic: 'Phu Quoc', echo: 'single', title: 'Cable car: be there when it opens', text: 'Queues for the Hon Thom cable car are long from December to February.', src: [src.cable] },
      { topic: 'Phu Quoc', echo: 'several', title: 'Jellyfish are a summer problem', text: 'Peak season is April to August, so January is lower risk. Itchy “sea lice” have been reported now and then at Ong Lang.', src: [S('Jellyfish in Vietnam', 'https://localvietnam.com/vietnam-tips/jellyfish-in-vietnam/')] },
      { topic: 'Phu Quoc', echo: 'official', title: 'The famous night market has moved', text: 'The Bach Dang night market was dismantled in spring 2026. A replacement is reported near Nguyen Trai Street — ask your hotel where the seafood stalls are now.', src: [src.market] },

      { topic: 'Other beaches', echo: 'consensus', title: 'Phu Quoc is the right beach for these dates', text: 'Within Vietnam it is the most weather-reliable swimming choice for late December and January.', src: [S('Beach comparison', 'https://tonkin-travel.com/phu-quoc-vs-nha-trang-vs-mui-ne-vs-con-dao/')] },
      { topic: 'Other beaches', echo: 'consensus', title: 'Con Dao is beautiful but windy now', text: 'Visitors in late December report strong wind, rough seas, cancelled ferries and weather-cancelled flights.', src: [S('TripAdvisor: Con Dao in January', 'https://www.tripadvisor.com/ShowTopic-g1024768-i15662-k15013953-Con_Dao_January_weather-Con_Dao_Islands_Ba_Ria_Vung_Tau_Province.html')] },
      { topic: 'Other beaches', echo: 'consensus', title: 'Mui Ne is for kitesurfers', text: 'Sunny and dry, but 15–25 knots of wind and blowing sand. Nha Trang is choppy with cooler 24–25 °C water.', src: [S('Winter beaches in Vietnam', 'https://www.vietnamtourism.com/en/vietnam-in-winter-where-to-find-warm-beaches-from-december-to-february')] },
      { topic: 'Other beaches', echo: 'several', title: 'Koh Rong is prettier, Phu Quoc is easier', text: 'Cambodia’s Koh Rong has emptier beaches; Phu Quoc wins on restaurants, hotels and convenience.', src: [S('Koh Rong or Phu Quoc', 'https://dailytravelpill.com/koh-rong-or-phu-quoc/')] },

      { topic: 'North & centre', echo: 'consensus', title: 'Hoi An in January is culture, not beach', text: 'Expect showers, 20–24 °C, rough seas and red flags. The old town, food and tailors are still lovely.', src: [S('TripAdvisor: Hoi An beach in January', 'https://www.tripadvisor.com/ShowTopic-g298082-i9204-k14541475-Beach_in_January-Hoi_An_Quang_Nam_Province.html'), src.wxHoi] },
      { topic: 'North & centre', echo: 'consensus', title: 'Hanoi feels colder than the number', text: 'Humidity is around 80% and many older hotels and cafés have no heating. In January 2026 it dropped to 9 °C.', src: [S('Vietnam in winter', 'https://localvietnam.com/travel-time/seasons/vietnam-in-winter/')] },
      { topic: 'North & centre', echo: 'several', title: 'Ha Long Bay is a fog gamble', text: 'One January 2026 traveller cut a northern trip short because of fog and rain, though still found the bay breathtaking. Check that the cabin is heated.', src: [S('Fodor’s forum: Ha Long in January', 'https://www.fodors.com/community/asia/halong-bay-in-january-avoid-745222/')] },
      { topic: 'North & centre', echo: 'consensus', title: 'Any northern stop changes your suitcase', text: 'The south needs only light clothes. Hanoi adds a fleece or down jacket and closed shoes; Hoi An adds a rain jacket.', src: [S('North Vietnam in January', 'https://localvietnam.com/regions/north-vietnam/north-vietnam-january-weather/')] },

      { topic: 'Saigon', echo: 'consensus', title: 'Three nights is just right', text: 'Day one: War Remnants Museum, Reunification Palace, a District 1 walk. Day two: Cu Chi in the morning, rooftop sunset. Four days is more than enough.', src: [S('Three nights in Saigon', 'https://tinboxtraveller.co.uk/three-nights-in-ho-chi-minh-city/')] },
      { topic: 'Saigon', echo: 'consensus', title: 'Stay in District 1, a few streets from Bui Vien', text: 'Or on the District 1/3 border, which is leafier, calmer and better value. Thao Dien is too far out for a short first visit.', src: [S('Where to stay in Saigon', 'https://www.vietnamtourism.com/en/where-to-stay-in-ho-chi-minh-city-district-1-versus-the-rest')] },
      { topic: 'Saigon', echo: 'official', title: 'New Year’s Eve: walk, don’t ride', text: 'Last year had a countdown on Nguyen Hue, 15 minutes of fireworks at several sites and more than twenty roads closed. Book a hotel within walking distance.', src: [src.nye] },
      { topic: 'Saigon', echo: 'consensus', title: 'Hold your phone on the building side', text: 'Phone-snatching from passing motorbikes is the main risk. Violent crime against tourists is rare.', src: [S('Is Saigon safe', 'https://www.isitsafetovisit.com/cities/ho-chi-minh-city')] },
      { topic: 'Saigon', echo: 'consensus', title: 'The 500,000 and 20,000 notes are both blue', text: 'Keep them in separate parts of your wallet and count change aloud. A known trick: the driver “rejects” your 500,000 as torn and swaps it.', src: [S('Vietnamese dong explained', 'https://www.vietnamtourism.com/en/the-vietnamese-dong-explained-notes-zeros-and-how-not-to-overpay')] },
      { topic: 'Saigon', echo: 'several', title: 'Say no to the coconut photo and the shoe “repair”', text: 'A seller hands you their coconut yoke for a photo, or someone starts gluing your shoe unasked — both end in a demand for money. Smile and keep walking.', src: [S('Saigon street scams', 'https://beforeyougotravels.com/destinations/ho-chi-minh-city/street')] },
      { topic: 'Saigon', echo: 'several', title: 'An evening food tour and a rooftop sunset', text: 'The two things that show up in almost every couple’s itinerary.', src: [S('Saigon itinerary', 'https://www.thecommonwanderer.com/blog/ho-chi-minh-city-itinerary')] },

      { topic: 'Mekong', echo: 'consensus', title: 'The standard day trip is shallow', text: 'The My Tho circuit is not a scam, but it is staged workshop stops in a crowd.', src: [S('Mekong from Saigon', 'https://about.travel/vietnam/ho-chi-minh-city/mekong-delta-from-saigon/')] },
      { topic: 'Mekong', echo: 'consensus', title: 'Ben Tre for one night beats a day trip', text: 'Two to two-and-a-half hours from Saigon, far quieter, with homestays that lend bikes and cook with you.', src: [S('Mekong: day trip or overnight', 'https://ctour.com.vn/blog/mekong-delta-day-trip-or-overnight')] },
      { topic: 'Mekong', echo: 'consensus', title: 'The floating market needs an overnight in Can Tho', text: 'Cai Rang peaks at first light and is over by about 8 am, three to four hours’ drive from Saigon.', src: [S('Mekong Delta guide', 'https://www.vietnamvisa-easy.com/blog/mekong-delta-guide/')] },

      { topic: 'Transport', echo: 'official', title: 'Check the airport code on every Saigon ticket', text: 'Long Thanh airport, 40 km out of town, is due to open on 24 Dec 2026. Long-haul and Phu Quoc flights are reported to stay at Tan Son Nhat (SGN), but sources differ and there is no link between the two.', src: [src.lth] },
      { topic: 'Transport', echo: 'consensus', title: 'Vietjet weighs cabin bags', text: 'The limit is 7 kg in total. Buy checked baggage online in advance — the airport price is about double — and expect delays.', src: [S('Vietjet cabin baggage', 'https://travelclosely.com/2025/03/01/vietjet-cabin-baggage/'), src.vjFees] },
      { topic: 'Transport', echo: 'official', title: 'Avoid overnight sleeper buses', text: 'There were fatal sleeper-bus crashes in July 2025, July 2026 and August 2026; front bunks are worst hit. If you take one, go by day.', src: [src.busDeaths, S('Vietnam News: Gia Lai crash', 'https://vietnamnews.vn/society/1798678/three-killed-as-sleeper-bus-carrying-33-overturns-in-gia-lai.html')] },
      { topic: 'Transport', echo: 'consensus', title: 'Bus + ferry only makes sense with a Mekong stop', text: 'It takes 7–12 hours against a one-hour flight and saves about €50 for two. Combined with Can Tho or Ben Tre it becomes a pleasant overland route — if the sea is calm.', src: [S('Saigon to Phu Quoc', 'https://localvietnam.com/phu-quoc/from-ho-chi-minh-city-to-phu-quoc/')] },
      { topic: 'Transport', echo: 'official', title: 'Ferries stop in rough seas', text: 'All Rach Gia and Ha Tien sailings were halted on 20 Nov 2025 with 1.5–2.5 m waves. Never plan a ferry the day before a flight.', src: [src.ferryHalt] },
      { topic: 'Transport', echo: 'consensus', title: 'A car licence does not cover a scooter', text: 'Without a motorcycle entitlement and a 1968 international permit you ride unlicensed, and insurance typically will not pay after an accident.', src: [src.bike] },
      { topic: 'Transport', echo: 'several', title: 'Leave a buffer before the flight home', text: 'Do not fly from the island and connect to Vienna on the same day on separate tickets. Sleep the last night in Saigon.', src: [src.delays] },

      { topic: 'Money', echo: 'several', title: 'Use VPBank or ACB cash machines', text: 'Reported fee-free for foreign cards (VPBank up to VND 10 million per withdrawal). TPBank now charges. Always decline the machine’s own currency conversion.', src: [src.atm] },
      { topic: 'Money', echo: 'consensus', title: 'Carry cash for the good stuff', text: 'Street food, markets and small vendors are cash only; hotels and larger restaurants take cards.', src: [S('Payments in Vietnam', 'https://sungetawaystravel.com/payments-in-vietnam-10-things-need-to-know-2025/')] },
      { topic: 'Money', echo: 'consensus', title: 'Tipping is optional, bargaining is expected', text: 'Tip 5–10% for good service if you like. At markets, start at about a third to half of the first price.', src: [S('First-time Vietnam tips', 'https://www.eskimo.travel/blog/travel-tips-for-first-time-visiting-vietnam')] },
      { topic: 'Money', echo: 'several', title: 'Install an eSIM before you fly', text: 'Viettel has the best coverage. Airport tourist SIMs cost about €4–9 for 10–30 GB if you prefer a physical card.', src: [src.esim] },
      { topic: 'Money', echo: 'consensus', title: 'No tap water; factory ice is fine', text: 'Ice cylinders with a hole are factory-made and generally safe; irregular chunks less so.', src: [S('Vietnam food safety', 'https://www.insidethetravellab.com/?p=117972')] },

      { topic: 'Entry & flights', echo: 'official', title: 'Only evisa.gov.vn', text: 'USD 25 single entry, USD 50 multiple entry. Look-alike sites buy ads above the real one and charge USD 79 or more.', src: [src.evisa, src.evisaScam] },
      { topic: 'Entry & flights', echo: 'several', title: 'Type your passport details exactly', text: 'Mismatched passport data is the main reason e-visas are rejected, and correction emails are easy to miss. Apply two to three weeks ahead and carry a printout.', src: [S('E-visa step by step', 'https://www.vietnamtourism.com/en/vietnam-e-visa-2026-step-by-step-guide-rejections-traps')] },
      { topic: 'Entry & flights', echo: 'official', title: 'Fill in the free digital arrival card', text: 'Required within 72 hours before landing at prearrival.immigration.gov.vn. It is free — a payment screen means you are on a fake site.', src: [src.dac] },
      { topic: 'Entry & flights', echo: 'official', title: 'The Phu Quoc visa-free rule will not help you', text: 'It only applies if you fly straight to the island from abroad and never set foot on the mainland.', src: [src.pqVisa] },
      { topic: 'Entry & flights', echo: 'several', title: 'Turkish and Qatar are usually cheapest from Vienna', text: 'According to flight-search sites. Christmas and New Year is the priciest time of year, so compare a day earlier and later.', src: [S('Momondo: Vienna–Saigon', 'https://www.momondo.co.za/flights/vienna/ho-chi-minh-city')] },

      { topic: 'Romance & food', echo: 'consensus', title: 'The west coast faces the sunset', text: 'Long Beach bars and the Sunset Town promenade, roughly 16:30–18:30, are the named spots.', src: [S('Best beaches guide', 'https://phuquocislandguide.com/beaches/best-beaches/')] },
      { topic: 'Romance & food', echo: 'single', title: 'Splurge idea: a sunset boat', text: 'Snorkel stop, sunset at Kiss Bridge and a seafood barbecue on board. A sailing version is listed from about USD 155 per person; squid-fishing trips are cheaper.', src: [S('Phu Quoc island hopping', 'https://www.trvlogue.com/en/phu-quoc-island-hopping')] },
      { topic: 'Romance & food', echo: 'consensus', title: 'Eat these on Phu Quoc', text: 'Bun quay noodles at Kien Xay (€2–3.50), herring salad (goi ca trich), and Ham Ninh crab with pepper, salt and lime.', src: [S('Phu Quoc local dishes', 'https://visitphuquoc.com.vn/en/top-local-dishes-to-eat-in-phu-quoc-a-food-lover-guide')] },
      { topic: 'Romance & food', echo: 'several', title: 'Massage in town, not at the resort', text: 'A 60-minute massage is about €22–25 at a town spa and €30 and up at a resort.', src: [src.spa] },
      { topic: 'Health', echo: 'official', title: 'Use mosquito repellent in the daytime', text: 'Dengue is up 25% in 2026, with two-thirds of cases in the south; Saigon alone has had more than 42,000. The mosquitoes bite by day.', src: [src.dengue] },
      { topic: 'Health', echo: 'several', title: 'Ask a travel clinic about hepatitis A', text: 'Recommended for nearly all travellers to Vietnam; typhoid and others depend on your plans. Malaria is not a concern on this route.', src: [S('ADAC: Vietnam health', 'https://www.adac.de/gesundheit/reiselaender/vietnam/')] }
    ],

    health: {
      intro: 'No vaccination is compulsory for entering Vietnam from Europe. These are the ones doctors recommend or discuss. You fly in under six weeks, so book a travel-medicine appointment this week — some vaccines need two weeks or more to work. This is general guidance, not medical advice for you personally.',
      rows: [
        { v: 'Routine vaccines up to date', who: 'Both of you', lvl: 'good', lbl: 'check', d: 'Tetanus, diphtheria, whooping cough, polio and measles-mumps-rubella. Bring your vaccination pass to the appointment.' },
        { v: 'Hepatitis A', who: 'Both of you', lvl: 'good', lbl: 'recommended', d: 'The one vaccine recommended for practically every traveller to Vietnam, whatever the route. Spread through food and water. One dose before travel protects for the trip; a second dose later gives long-term protection.' },
        { v: 'Typhoid', who: 'Worth discussing', lvl: 'warn', lbl: 'depends', d: 'Advised for independent travel with lots of street food or basic hygiene conditions — which fits a Mekong homestay and market eating. Needs about two weeks to take effect.' },
        { v: 'Hepatitis B', who: 'Worth discussing', lvl: 'warn', lbl: 'depends', d: 'Mainly for longer stays or possible medical or dental treatment abroad. Many people already have it from childhood programmes or as a combined hepatitis A+B vaccine.' },
        { v: 'Rabies', who: 'Usually not needed', lvl: 'info', lbl: 'optional', d: 'Vietnam has rabies. For a short beach-and-city holiday most doctors skip it; simply do not touch dogs, cats or monkeys, and see a doctor immediately after any bite or scratch.' },
        { v: 'Japanese encephalitis', who: 'Usually not needed', lvl: 'info', lbl: 'optional', d: 'Recommended for rural stays of a month or more, or in the wet season. One night in the Mekong in the dry season is normally below that threshold.' },
        { v: 'Malaria tablets', who: 'Not needed', lvl: 'info', lbl: 'no', d: 'Risk is limited to remote highland areas, not Saigon, the Mekong towns, Phu Quoc, Hoi An or Hanoi.' },
        { v: 'Dengue', who: 'Protect against bites', lvl: 'warn', lbl: 'repellent', d: 'Cases are up about 25% in 2026, mostly in the south. There is no tablet; the vaccine is generally only advised after a previous infection. Use repellent during the day and sleep with air-conditioning or a net.' },
        { v: 'Yellow fever', who: 'Not needed', lvl: 'info', lbl: 'no', d: 'A certificate is only asked for if you arrive from a country with yellow fever. Flying from Europe via Istanbul, the Gulf or East Asia does not count.' }
      ],
      src: [S('University of Zurich travel medicine: Vietnam', 'https://reisemedizin.uzh.ch/hubfs/SpotLIGHT_Vietnam%20DE.pdf'), S('ADAC: Vietnam health', 'https://www.adac.de/gesundheit/reiselaender/vietnam/'), S('Norwegian Institute of Public Health: Vietnam', 'https://www.fhi.no/en/in/travel/traveladvice-vaccines/asia/viet-nam'), S('Österreichische Ärztezeitung: Reiseimpfungen', 'https://aerztezeitung.at/wp-content/uploads/2019/05/OA_Reiseimpfungen.pdf'), S('Dengue in southern Vietnam 2026', 'https://www.mesvaccins.net/web/news/24550-viet-nam-si-globalement-l-activite-de-la-dengue-diminue-l-analyse-regionale-montre-une-progression-dans-le-sud-du-pays-en-particulier-a-ho-chi-minh')]
    },

    saveTips: [
      'Shift the flight by a day or two: the same airline showed €1,200 on 28 Dec and €1,690 on 26 Dec.',
      'Book hotel rates with breakfast included — it is often only €3–5 more and saves a meal a day.',
      'Book the Saigon–Phu Quoc flights early with Vietnam Airlines or Sun PhuQuoc Airways (bag included) rather than adding bags to a low-cost fare later.',
      'Split a long island stay: a simple place for the first nights, a nicer beachfront one for the last few.',
      'Use Grab or Xanh SM instead of hotel cars — hotel transfers often cost double.',
      'Withdraw cash at VPBank or ACB machines and always decline the machine’s currency conversion.',
      'Get massages, laundry and tours in town rather than through the resort.',
      'Travelling from Munich instead of Vienna can be cheaper: Vietnam Airlines flies nonstop from there.'
    ],

    checklist: [
      { icon: '✈️', t: 'Book first', items: [
        { t: 'Search the real flight price for 28 Dec → 15 Jan', d: 'Google Flights or Skyscanner, with one checked bag each. Try ±2 days. Then type it into “Our prices”.' },
        { t: 'Decide: home on 15 Jan or 16 Jan?', d: 'Evening departures on the 15th land on the 16th.' },
        { t: 'Book the Saigon ⇄ Phu Quoc flights', d: 'Vietnam Airlines or Sun PhuQuoc Airways include a bag. Check the code is SGN.' },
        { t: 'Ask each Phu Quoc hotel about a New Year’s Eve gala fee and nearby construction', d: 'Before paying.' },
        { t: 'Book a walkable Saigon hotel for 29 Dec – 1 Jan', d: 'Roads close on New Year’s Eve.' }] },
      { icon: '🛂', t: 'Papers', items: [
        { t: 'Check passports: valid at least 6 months after arrival', d: '' },
        { t: 'Apply for e-visas at evisa.gov.vn two to three weeks ahead', d: 'USD 25 each. Austria is not visa-exempt; other nationalities differ. A new visa law was due for a vote on 21 Nov 2026 — check for changes.', src: [src.evisa, src.visa] },
        { t: 'Print the e-visas', d: '' },
        { t: 'Fill in the free digital arrival card within 72 hours before landing', d: 'prearrival.immigration.gov.vn', src: [src.dac] },
        { t: 'Buy travel medical insurance', d: 'Check it covers what you plan to do — and that scooters are excluded unless licensed.' }] },
      { icon: '💉', t: 'Health', items: [
        { t: 'Visit a travel clinic or your GP', d: 'Hepatitis A is the usual recommendation.' },
        { t: 'Pack mosquito repellent and reef-safe sunscreen', d: 'Dengue is elevated in the south this year.', src: [src.dengue] },
        { t: 'Bring a small pharmacy kit', d: 'Rehydration salts, plasters, antihistamine cream for bites.' }] },
      { icon: '📱', t: 'Phone and money', items: [
        { t: 'Install Grab and Xanh SM, add a card to Grab', d: '' },
        { t: 'Install an eSIM (Viettel) and Google Translate with offline Vietnamese', d: '' },
        { t: 'Tell your bank you are travelling; bring two cards', d: 'Use VPBank or ACB machines and decline conversion.', src: [src.atm] },
        { t: 'Keep 500,000 and 20,000 notes apart', d: 'Both are blue.' }] }
    ],

    sources: []
  };

  /* Build the source list from everything referenced above (deduplicated). */
  const seen = new Set(), out = [];
  (function walk(o) {
    if (!o || typeof o !== 'object') return;
    if (typeof o.u === 'string' && typeof o.t === 'string' && Object.keys(o).length === 2) { if (!seen.has(o.u)) { seen.add(o.u); out.push(o); } return; }
    Object.values(o).forEach(walk);
  })(window.TRIP);
  window.TRIP.sources = out.sort((a, b) => a.t.localeCompare(b.t));
})();
