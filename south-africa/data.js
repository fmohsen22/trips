/* ============================================================================
   Sophie & Mohsey in South Africa — ALL PRICES AND TEXT LIVE HERE.
   To update a price: change the number, commit, push. Vercel redeploys itself.
   Money is in EUR. "for2" = for both travellers. "pp" = per person.
   Research snapshot: 19 Nov 2026. 1 EUR ≈ 18.6 ZAR (rand), 1 USD ≈ 0.88 EUR, 1 GBP ≈ 1.15 EUR.
   Anything marked "estimate" was not seen as a price for our dates — check it before booking.
   ========================================================================== */
(function () {
  const S = (t, u) => ({ t, u });
  const src = {
    /* flights */
    et: S('Ethiopian Airlines fare page Vienna–Cape Town', 'https://www.ethiopianairlines.com/en-et/flights-from-vienna-to-cape-town'),
    etAt: S('Ethiopian Airlines: flights to Cape Town', 'https://www.ethiopianairlines.com/en-at/flights-to-cape-town'),
    tk: S('Turkish Airlines fare page Vienna–Cape Town', 'https://www.turkishairlines.com/en-at/flights-from-vienna-to-cape-town'),
    tkDeals: S('Turkish Airlines flight deals', 'https://www.turkishairlines.com/en-at/flight-deals'),
    lh: S('Lufthansa fare page Vienna–Cape Town', 'https://www.lufthansa.com/lhg/at/en/o-d/cy-cy/vienna-cape-town'),
    os: S('Austrian Airlines: Cape Town', 'https://www.austrian.com/lhg/at/en/dest/cy/cape-town'),
    lx: S('Swiss fare page Vienna–Cape Town', 'https://www.swiss.com/lhg/at/en/o-d/cy-cy/vienna-cape-town'),
    qr: S('Qatar Airways: flights to Cape Town', 'https://www.qatarairways.com/en/destinations/flights-to-cape-town.html'),
    qrSale: S('Qatar Airways Black Friday offer', 'https://www.qatarairways.com/en-us/offers/black-friday.html'),
    ek: S('Emirates: Vienna–Cape Town', 'https://www.emirates.com/at/english/destinations/vie/cpt/flights-from-vienna-to-cape-town/'),
    klm: S('KLM fare page Vienna–Cape Town', 'https://www.klm.at/en-at/flights-from-vienna-to-cape-town'),
    condor: S('Condor: Wien–Kapstadt', 'https://www.condor.com/de/fluege/suedafrika/kapstadt/von-wien/'),
    checkfelix: S('checkfelix: Wien–Kapstadt', 'https://www.checkfelix.com/fl%C3%BCge/Wien-VIE/Kapstadt-CPT'),
    fluege: S('fluege.de: Wien–Kapstadt', 'https://www.fluege.de/Katalog/Wien-Kapstadt/Flug-von-nach-7063'),
    wuw: S('wohin-und-wann.de: Wien–Kapstadt', 'https://www.wohin-und-wann.de/flights/s-dafrika/kapstadt/?city_from=wien'),
    osWinter: S('reisetopia: Austrian winter schedule 2026/27', 'https://reisetopia.de/news/austrian-airlines-anpassungen-winterflugplan-2026-2027/'),
    osWinter2: S('aeroTELEGRAPH: Austrian long-haul, winter 2026/27', 'https://www.aerotelegraph.com/ticker/austrian-airlines-passt-langstreckenangebot-fuer-winter-202627-an/l6fp2d3'),
    lhSA: S('Engineering News: Lufthansa Group South Africa flights', 'https://engineeringnews.co.za/article/lufthansa-group-to-boost-flights-to-and-from-south-africa-2026-06-30'),
    edelweiss: S('Aviation24: Edelweiss winter 2026/27', 'https://www.aviation24.be/airlines/lufthansa-group/swiss/edelweiss/edelweiss-expands-winter-2026-27-schedule-with-more-nordic-and-long-haul-capacity/amp/'),
    airFrance: S('ATTA: Air France Paris–Cape Town 2026/27', 'https://atta.travel/resource/air-france-resumes-direct-cape-town-paris-service-for-2026-27-summer-season.html'),
    uae: S('Al-Monitor / Reuters: Emirates on Iranian nationals', 'https://www.al-monitor.com/originals/2026/04/airline-emirates-says-iranian-nationals-barred-entering-or-transiting-uae'),
    uae2: S('Arab News: Emirates on Iranian nationals', 'https://www.arabnews.com/node/2638383/middle-east'),
    uaeCheck: S('Wego: did the UAE ban Iranian nationals?', 'https://blog.wego.com/did-uae-ban-iranian-nationals-from-entry-and-transit/'),
    easa: S('EASA bulletin: Persian Gulf airspace', 'https://www.easa.europa.eu/en/domains/air-operations/czibs/czib-2026-07r3'),
    easaNews: S('Travel Extra: EASA Middle East warnings', 'https://www.travelextra.ie/?p=155674'),
    doha: S('AirlineGeeks: Qatar reopens to foreign carriers', 'https://airlinegeeks.com/2026/04/20/qatar-allows-foreign-carriers-to-resume-operations/'),
    /* entry */
    dfa: S('Irish Department of Foreign Affairs: South Africa', 'https://www.dfa.ie/travel/travel-advice/a-z-list-of-countries/south-africa/'),
    dfaEmb: S('Embassy of Ireland, Pretoria: travelling to South Africa', 'https://www.dfa.ie/irish-embassy/south-africa/passports/top-passport-questions/to-travel-between-south-africa-and-ireland'),
    oeamtc: S('ÖAMTC Länderinfo Südafrika', 'https://www.oeamtc.at/laenderinfo/suedafrika/'),
    wko: S('WKO: Reisen nach Südafrika', 'https://www.wko.at/oe/aussenwirtschaft/suedafrika-reisen'),
    exempt: S('South African government: visa-exempt countries', 'https://dirco.gov.za/paris/wp-content/uploads/sites/6/2024/12/COUNTRIES-EXEMPT-FROM-VISAS.pdf'),
    govuk: S('UK Foreign Office: South Africa entry requirements', 'https://www.gov.uk/foreign-travel-advice/south-africa/entry-requirements'),
    lpVisa: S('Lonely Planet: visa requirements for South Africa', 'https://www.lonelyplanet.com/articles/visa-requirements-for-south-africa'),
    eta: S('Cape Town Tourism: the Electronic Travel Authorisation', 'https://www.capetown.travel/everything-you-need-to-know-about-sas-electronic-travel-authorisation/'),
    etaGov: S('SAnews: South Africa rolls out the ETA', 'https://www.sanews.gov.za/node/81393'),
    sars: S('Cape Town Tourism: online traveller declaration', 'https://www.capetown.travel/travelling-to-or-from-south-africa-online-declaration-now-mandatory-from-1-july-2026/'),
    sars2: S('BusinessTech: SARS clarifies the traveller declaration', 'https://businesstech.co.za/news/government/865641/sars-clarifies-new-mandatory-travel-rule-for-people-entering-or-leaving-south-africa/'),
    yf: S('South African government: yellow fever', 'https://dirco.gov.za/canberra/yellow-fever/'),
    yfForum: S('FlyerTalk: connecting in Addis Ababa', 'https://www.flyertalk.com/forum/28352662-post14.html'),
    /* country */
    power: S('EWN: 540 days without load shedding', 'https://www.ewn.co.za/eskom-targets-end-to-load-reduction-after-540-days-free-of-load-shedding/'),
    power2: S('SAnews: Eskom and load reduction', 'https://www.sanews.gov.za/node/85672'),
    school: S('BusinessTech: school calendar 2027', 'https://businesstech.co.za/news/education/881207/here-is-the-school-calendar-for-2027-and-2028/'),
    peakGuide: S('Rough Guides: Cape Town in December', 'https://www.roughguides.com/articles/cape-town-weather-december-travel-tips'),
    dezemba: S('Wise Move: surviving “Dezemba” in Cape Town', 'https://www.wisemove.co.za/post/local-tips-to-survive-dezemba-in-cape-town'),
    priced: S('The Citizen: priced out of Cape Town', 'https://citizen.co.za/business/personal-finance/south-africans-are-being-priced-out-of-holidaying-in-cape-town'),
    rates: S('Tourism Update: Cape hotel rates', 'https://www.tourismupdate.com/article/hospitality-sector-rebound-in-cape-mixed-results-in-kzn'),
    ftRates: S('FlyerTalk: Cape Town hotel rates in January', 'https://www.flyertalk.com/forum/27625614-post1.html'),
    /* sea and weather */
    seaCamps: S('Camps Bay sea temperature in January', 'https://seatemperatures.net/africa/south-africa/camps-bay-january-temperature/'),
    seaMuiz: S('Muizenberg sea temperature in January', 'https://seatemperature.net/monthly/muizenberg-sea-temperature-in-january-8724'),
    seaPlett: S('Plettenberg Bay sea temperature in January', 'https://seatemperature.info/january/plettenberg-bay-water-temperature.html'),
    seaDbn: S('Durban sea temperature in January', 'https://www.seatemperatu.re/africa/south-africa/durban/month/january/'),
    wind: S('Cape Town Magazine: the Cape Doctor', 'https://www.capetownmagazine.com/cape-doctor'),
    windDays: S('Getaway: Cape Town’s windy days', 'https://www.getaway.co.za/things-to-do/a-travellers-guide-to-cape-towns-windy-days/'),
    tidal: S('Cape Town Tourism: tidal pools', 'https://www.capetown.travel/tidal-pools-cape-town/'),
    warmBeaches: S('Getaway: Cape Town beaches with warm water', 'https://www.getaway.co.za/destinations/cape-town-beaches-with-consistently-warm-water-in-summer/'),
    sharks: S('Shark Spotters: safety', 'https://sharkspotters.org.za/education/faq/safety/'),
    plettShark: S('News24: Plettenberg Bay shark safety plans', 'https://www.news24.com/southafrica/news/shark-spotters-drones-on-the-cards-to-prevent-further-attacks-in-plettenberg-bay-20220928'),
    plettFlags: S('The Citizen: Plettenberg Bay Blue Flag beaches', 'https://www.citizen.co.za/network-news/lnn/article/plettenberg-bay-wins-eight-global-blue-flag-awards/'),
    ctWater: S('EWN: Cape Town seawater quality', 'https://www.ewn.co.za/cape-town-says-seawater-quality-near-marine-sewage-outfalls-remains-stable/'),
    campsSpill: S('Cape Times: Camps Bay beach reopened after spill', 'https://iol.co.za/capetimes/news/2025-12-18-camps-bay-beach-reopened-to-scores-of-beachgoers-days-after-sewer-spill/'),
    febSpill: S('eNCA: two Cape Town beaches reopened', 'https://www.enca.com/news/sewage-spills-two-cape-town-beaches-reopened'),
    dbnWater: S('Time Out: two Durban beaches closed, Jan 2026', 'https://www.timeout.com/durban/news/two-durban-beaches-temporarily-closed-012126'),
    dbnWater2: S('ECR: eThekwini beach closures', 'https://www.ecr.co.za/news/news/ethekwini-e-coli-beach-closures-spark-tourism-concern'),
    dbnWx: S('Durban weather in January', 'https://weather2travel.com/south-africa/durban/january/'),
    hermanus: S('Hermanus tourism: whale watching', 'https://hermanus.co.za/what-to-do/water-based/whale-watching'),
    /* prices */
    cable: S('Table Mountain Cableway ticket prices', 'https://www.tablemountain.net/plan-your-visit/ticket-prices'),
    parksUp: S('ATTA: national park fees up from 1 Nov 2026', 'https://atta.travel/resource/sanparks-raises-international-conservation-fees-by-up-to-15-from-november.html'),
    tmnp: S('SANParks: Table Mountain National Park fees', 'https://www.sanparks.org/parks/table-mountain/rates-entry-fees'),
    capePoint: S('Cape Town Tourism: a day at Cape Point', 'https://www.capetown.travel/how-to-spend-a-day-at-cape-point/'),
    robben: S('Robben Island tickets and tours', 'https://www.privatetourscapetown.com/blog/robben-island-tickets-tours'),
    robben2: S('Robben Island price guide', 'https://travelcostcalculator.org/unesco/robben-island'),
    kirst: S('Kirstenbosch admission fees 2026–27', 'https://www.sanbi.org/gardens/kirstenboch/visitor-information/information/'),
    concerts: S('Kirstenbosch Summer Sunset Concerts', 'https://www.sanbi.org/news/kirstenbosch-summer-sunset-concerts-announces-an-explosive-new-season-line-up/'),
    tram: S('Franschhoek Wine Tram guide', 'https://www.twowanderingsoles.com/blog/franschhoek-wine-tram'),
    tram2: S('Touropia: the Franschhoek Wine Tram', 'https://www.touropia.com/all-aboard-the-franschhoek-wine-tram/'),
    tasting: S('Waterford Estate tasting room', 'https://www.waterfordestate.co.za/reservations/tasting-room'),
    winelands: S('Cape Winelands guide', 'https://departly.pages.dev/to/south-africa/cape-winelands/'),
    cage: S('Expedia: shark cage diving in Gansbaai', 'https://www.expedia.com/things-to-do/shark-cage-diving-in-gansbaai.a49725639.activity-details'),
    aquila: S('Aquila day safari prices', 'https://www.africanbudgetsafaris.com/pricing/budget-cape-town-big-five-day-safari/'),
    aquila2: S('Aquila Private Game Reserve', 'https://aquilasafari.com/the-best-cape-town-safari-big-5-game-reserve/'),
    sealBoat: S('Seal-viewing boat trip, Plettenberg Bay', 'https://www.aaa.com/tripcanvas/thing-to-do/seal-viewing-boat-trip-in-plettenberg-bay-453476P2'),
    sealSwim: S('Snorkel with seals, Plettenberg Bay', 'https://www.manawa.com/en-GB/activity/south-africa/plettenberg-bay/snorkelling/snorkel-with-seals-in-plettenberg-bay/11040'),
    tsitsi: S('SANParks: Storms River Mouth fees', 'https://www.sanparks.org/parks/garden_route/camps/storms_river/tourism/tariffs.php'),
    addoFee: S('Addo entry fees 2026/27', 'https://safarifind.com/blog/addo-elephant-national-park-safari-prices-2027-entry-fees'),
    addoDrive: S('SANParks: Addo game drives', 'https://www.sanparks.org/parks/addo-elephant/what-to-do/activities/game-drives'),
    addoTour: S('Expedia: Addo half-day safari', 'https://www.expedia.com/things-to-do/addo-elephant-national-park-half-day-safari.a48886522.activity-details'),
    addoGuide: S('Addo Elephant National Park guide', 'https://www.privatetourscapetown.com/blog/addo-elephant-national-park-guide'),
    addoKruger: S('FlyerTalk: Addo vs Kruger', 'https://www.flyertalk.com/forum/africa/2151824-addo-vs-kruger-safari-march.html'),
    selfDrive: S('Self-drive budget safaris', 'https://www.africanbudgetsafaris.com/blog/self-drive-budget-safaris-in-south-africa/'),
    peninsulaTour: S('SafariBookings: Cape Peninsula day tour', 'https://www.safaribookings.com/day/t58142'),
    /* getting around */
    car: S('Car hire at Cape Town airport', 'https://roadgenius.com/en-gb/cars/rental/south-africa/cape-town/cpt-airport/'),
    avis: S('Avis Cape Town airport', 'https://www.avis.com/en/locations/af/za/cape-town/cpt'),
    idp: S('First Car Rental: foreign licences and permits', 'https://firstcarrental.co.za/news/guides/international-driving-permits.html'),
    arrive: S('Arrive Alive: advice for foreign drivers', 'https://arrivealive.co.za/pages.aspx?i=2393'),
    driving: S('South Africa driving advice', 'https://www.southafrica.info/travel/advice/driving'),
    carTips: S('Europcar South Africa: vehicle tips', 'https://platinum.europcar.co.za/CarHire/Content/VehicleTips'),
    satsa: S('SATSA self-drive FAQ', 'https://www.satsa.com/sites/default/files/content-files/News/SATSA%20Self%20Drive%20FAQ.pdf'),
    roadTrip: S('Driving in South Africa: road-trip tips', 'https://exploretraveloasis.com/driving-in-south-africa/'),
    domFares: S('BusinessTech: December domestic fares compared', 'https://businesstech.co.za/news/lifestyle/638719/flight-ticket-prices-for-december-compared-flysafair-vs-saa-lift-and-airlink/'),
    domFares2: S('BusinessTech: domestic flight prices compared', 'https://businesstech.co.za/news/lifestyle/785045/flight-prices-in-south-africa-compared-flysafair-vs-airlink-vs-saa-and-more/'),
    dbnFlights: S('Momondo: Cape Town–Durban', 'https://www.momondo.co.za/flights/cape-town/durban'),
    bus: S('CheckMyBus: Cape Town–Plettenberg Bay', 'https://www.checkmybus.com/cape-town-wc/plettenberg-bay-wc'),
    baz: S('Baz Bus', 'https://bazbus.com/?p=449'),
    cemair: S('Time Out: CemAir’s Plettenberg Bay flights', 'https://www.timeout.com/cape-town/news/cemairs-ct-plett-service-stays-grounded-for-now-072124'),
    uber: S('Uber and Bolt at Cape Town airport, 2026', 'https://www.thetraveler.org/cape-town-airport-uber-bolt-pickup-guide-2026/'),
    uber2: S('Uber: Cape Town airport pickup', 'https://www.uber.com/global/en/r/airports/cpt/pickup'),
    myciti: S('MyCiTi airport bus: what runs now', 'https://www.thetraveler.org/cape-town-airport-myciti-bus-guide-2026-what-runs-now/'),
    gardenRoute: S('Earth Trekkers: Garden Route road trip', 'https://earthtrekkers.com/garden-route-south-africa-road-trip-itinerary'),
    gardenRoute2: S('Wild Junket: Garden Route itinerary', 'https://www.wildjunket.com/garden-route-itinerary/'),
    gardenRoute3: S('kimkim: Cape Town to the Garden Route', 'https://www.kimkim.com/ab/cape-town-to-garden-route'),
    plettStays: S('SA-Venues: December availability and minimum stays', 'https://blog.sa-venues.com/accommodation/2025-december-availability/'),
    plettHotel: S('The Plettenberg: rates and closed dates', 'https://travelbutlers.com/property/the-plettenberg'),
    plettPrices: S('Travelocity: Plettenberg Bay hotels', 'https://www.travelocity.com/Plettenberg-Bay-Hotels.d2749.Travel-Guide-Hotels'),
    /* safety */
    n2: S('Cape Argus: hijackings and the N2 airport road', 'https://iol.co.za/capeargus/news/2026-05-19-sa-records-60-hijackings-daily/'),
    hijack: S('BusinessTech: hijacking trend in the Western Cape', 'https://businesstech.co.za/news/motoring/858919/new-disturbing-hijacking-trend-hitting-the-best-run-province-in-south-africa/'),
    gps: S('News24: GPS snags and attacks on tourists', 'https://www.news24.com/multimedia/watch-cape-town-officials-blame-early-parole-ploy-and-gps-snags-for-recent-tourist-attacks-20231108'),
    hike1: S('Cape Argus: couple attacked on Table Mountain trail, Jan 2026', 'https://iol.co.za/capeargus/news/2026-01-21-safety-concerns-rise-after-couple-attacked-on-table-mountain-hiking-trail/'),
    hike2: S('Weekend Argus: runner stabbed on Table Mountain, July 2026', 'https://iol.co.za/weekend-argus/news/2026-07-10-urgent-safety-warnings-after-runner-stabbed-on-table-mountain/'),
    hike3: S('Cape Town Etc: tourists robbed on Lion’s Head', 'https://www.capetownetc.com/news/tourists-and-guide-robbed-on-lions-head-as-safety-concerns-mount/'),
    night: S('City of Cape Town: safety at night', 'https://www.capetown.gov.za/Explore%20and%20enjoy/visitor-safety/general-safety-awareness/safety-at-night-and-on-the-streets'),
    festive: S('IOL: seven festive-season safety tips', 'https://iol.co.za/travel/south-africa/western-cape/2025-12-19-stay-safe-in-cape-town-7-essential-tips-to-avoid-scams-and-theft-this-festive-season/'),
    advisory: S('South Africa travel risks 2026', 'https://www.thetraveler.org/south-africa-travel-advisory-2026-key-risks-for-tourists/'),
    wildWings: S('Wild Wings Safaris: safety tips', 'https://wild-wings-safaris.com/blog/safety-tips-for-tourists'),
    atm: S('SATSA: ATM scams advisory', 'https://www.satsa.com/sites/default/files/content-files/News/ATMScamsTradeAdvisory.pdf'),
    atm2: S('Cape Town CCID: gangs at cash machines', 'https://www.capetownccid.org/node/2774'),
    atm3: S('BusinessTech: card-swap scam', 'https://businesstech.co.za/news/banking/156988/warning-atm-card-swap-scam-is-on-the-rise-this-is-what-to-look-out-for/'),
    tipping: S('Cape Town Magazine: tipping guide', 'https://www.capetownmagazine.com/tipping-south-africa'),
    tipping2: S('Tipping in South Africa, 2026', 'https://www.africanbudgetsafaris.com/blog/south-africa-tipping-etiquette-top-tips-tipping-south-africa/'),
    /* city */
    nye: S('V&A Waterfront: New Year’s Eve', 'https://www.waterfront.co.za/?p=816385'),
    nyeNo: S('eNCA: no New Year fireworks last year', 'https://www.enca.com/lifestyle-videos/watch-no-nye-fireworks-mother-city'),
    nyeTimeOut: S('Time Out: New Year’s Eve at the V&A', 'https://www.timeout.com/cape-town/news/nye-whats-on-at-the-v-a-122725'),
    parade: S('Cape Argus: the 2026 street parade', 'https://iol.co.za/capeargus/news/2025-12-26-what-to-expect-at-the-2026-cape-town-street-parade-route-changes-and-road-closures/'),
    /* health and practical */
    fhi: S('Norwegian Institute of Public Health: South Africa', 'https://www.fhi.no/en/in/travel/traveladvice-vaccines/afrika/south-africa/'),
    cdc: S('US CDC: South Africa', 'https://wwwnc.cdc.gov/travel/destinations/traveler/vfr/south-africa'),
    malaria: S('SafariBookings: malaria and vaccinations', 'https://safaribookings.com/south-africa/malaria'),
    tap: S('EWN: Cape Town tap water rated excellent', 'https://www.ewn.co.za/cape-towns-tap-water-meets-excellent-drinking-standards-says-city/'),
    esim: S('South Africa SIM and eSIM prices', 'https://www.roafly.com/blog/south-africa-sim-cards'),
    ins: S('Travel insurance and hospitals in South Africa', 'https://www.uhc.com/news-articles/benefits-and-coverage/south-africa-travel-insurance-and-destination-guide'),
    fx: S('EUR–ZAR exchange rate', 'https://fxfeed.io/currencies/pairs/eur-zar')
  };

  window.TRIP = {
    meta: {
      key: 'south-africa', title: 'Sophie & Mohsey in South Africa', heroTitle: 'Sophie & Mohsey\nin South Africa', country: 'South Africa', emoji: '🐧', status: 'idea',
      home: 'Vienna', homeAirport: 'VIE', hub: 'ct', hubAirport: 'CPT', d0: '2026-12-29', d1: '2027-01-15',
      skipActs: ['aquila', 'sharkcage', 'sealswim', 'addosafari', 'hluhluwe', 'winelunch', 'concert'], galaPlace: null,
      updatedHuman: '19 Nov 2026', eurZar: 18.6, budgetMin: 4000, budgetMax: 5000,
      /* Festive surcharge window: guides put the crush from about 16 Dec to early January; schools only reopen on 13 Jan. */
      peak: { from: '2026-12-18', to: '2027-01-06' }, bestFlight: 'et-cpt', openJaw: { addo: 120 }, shopping: 150, reservePct: 5, visaDefault: false, recommended: 'D',
      lede: 'Seventeen summer nights at the bottom of Africa: a mountain in the middle of a city, penguins on the beach, wine valleys and a coast road that keeps getting warmer. Here is every route we could take, what each one costs, and a calculator to shape our own.',
      recWhy: 'New Year in Cape Town, then a slow drive east to the warmest swimming in the Cape at Plettenberg Bay, and a last few nights among the vineyards 45 minutes from the airport. Four unhurried bases, no stop under two nights, no internal flights.'
    },

    headlines: [
      { icon: '✈️', t: 'Flights: about €2,300–2,700 for two', d: 'Nobody flies Vienna–Cape Town nonstop this winter — it is always one change. December is the dearest month of the year on this route (average about €1,300 each on one comparison site). The only fares we saw near our dates were Ethiopian’s: €905 to €1,753 each, so we use about €1,300. Turkish, Lufthansa or KLM may be cheaper, but we have no price for 28 Dec → 15 Jan yet.' },
      { icon: '🥶', t: 'Cape Town’s famous beaches have cold water', d: 'Clifton and Camps Bay are stunning and about 15–16 °C in January — a quick dip, not a swim. False Bay on the other side of the peninsula is around 20 °C, Plettenberg Bay about 21 °C, and only the Durban coast is properly warm at about 26 °C.' },
      { icon: '🛂', t: 'No visa for either of you', d: 'Irish and Austrian passports get up to 90 days on arrival, free. South Africa is strict about two blank passport pages. The new online travel authorisation is optional for us; a free customs declaration is filled in online the day before flying. Avoid Dubai and Abu Dhabi for the Iran-born passport. Details on the Checklist page.' },
      { icon: '🎆', t: 'We land in the busiest week of the year', d: 'Mid-December to early January is when South Africa itself is on holiday: hotels cost roughly a third more, seaside towns ask for minimum stays, and cars and good rooms sell out. Schools go back on 13 January, so the second half of our trip is calmer and cheaper.' },
      { icon: '🚗', t: 'Outside Cape Town we need a car', d: 'There is no useful public transport along the coast. A small rental car is about €50 a day in the holidays plus fuel, driving is on the left, and we should not drive after dark. In Cape Town itself Uber is cheap and easier than parking.' },
      { icon: '🧮', t: 'The honest total is €6,000–8,000', d: 'With good mid-range rooms, a car for eleven days and the flights above, our favourite route comes to about €7,500–8,000 for two. Simple guesthouses, cooking some meals and a cheaper flight bring it to about €6,000–6,300. Even “Cape Town only, simple rooms, no car” lands near €5,500 — the flights and the New-Year week are the reason. Try the “Ways to pay less” buttons in the calculator.' }
    ],

    places: {
      ct: { name: 'Cape Town', short: 'Cape Town', emoji: '🏔️', beach: true, swim: 2,
        blurb: 'Table Mountain, penguins, markets, sunsets on white sand — and very cold water on the pretty side.',
        hotel: { budget: 75, mid: 125, nice: 230 }, peakMult: 1.35, food: { local: 30, mixed: 50, tourist: 85 }, localPerDay: 16,
        hotelNote: 'Sea Point or Green Point: walkable, close to the promenade and the Waterfront, and a short Uber from the beaches. Prices are our estimates from undated “from” prices on booking sites; New-Year nights cost more and often need three or more nights.', foodNote: 'Estimate. “Local” means breakfast at the guesthouse, a café or market lunch and one casual dinner; “mixed” adds a proper restaurant dinner with wine most nights. Eating out is good value by Vienna standards.', localNote: 'Uber and Bolt only — no car needed in town. A cross-town ride is a few euros; we rent a car for the day we drive round the peninsula (in the activities).',
        wx: { air: 'About 27 °C by day, 16–17 °C at night; cool the moment the sun goes', rain: 'Dry summer, almost none — but the south-easter wind can blow hard for days', sea: 'Atlantic side (Clifton, Camps Bay) about 15–16 °C, sometimes 11 °C. False Bay side (Muizenberg, St James) about 20 °C.' }, src: [src.seaCamps, src.seaMuiz, src.priced, src.peakGuide] },
      wine: { name: 'The Winelands (Stellenbosch & Franschhoek)', short: 'Winelands', emoji: '🍇', beach: false, swim: 1,
        blurb: 'Oak-lined streets, mountain valleys, long lunches. Hot — pick a place with a pool.',
        hotel: { budget: 70, mid: 115, nice: 220 }, peakMult: 1.2, food: { local: 32, mixed: 58, tourist: 100 }, localPerDay: 40,
        hotelNote: 'Stellenbosch is livelier and easier; Franschhoek is prettier and dearer. They are 20–30 minutes apart.', foodNote: 'Estimate. Wine-estate lunches are the treat here and push the daily cost up.', localNote: 'Either a small rental car (about €50 a day in the holidays) or Ubers between estates at roughly €20–30 each way — about the same money. Whoever drives does not taste.',
        wx: { air: '29–32 °C by day, warm evenings', rain: 'Dry', sea: 'No sea — hotel pools and farm dams' }, src: [src.winelands, src.tram] },
      hermanus: { name: 'Hermanus & the Whale Coast', short: 'Hermanus', emoji: '🌊', beach: true, swim: 3,
        blurb: 'Cliff path, long white Grotto Beach, a wine valley behind the town. No whales in January.',
        hotel: { budget: 65, mid: 105, nice: 175 }, peakMult: 1.3, food: { local: 30, mixed: 50, tourist: 85 }, localPerDay: 60,
        hotelNote: 'In or near the old harbour so we can walk to dinner. Prices seen: about €80–150 a night outside the holidays.', foodNote: 'Estimate.', localNote: 'This is the rental car: about €48 a day for a small car in the holidays plus fuel and parking (estimate). The same car stays with us along the coast.',
        wx: { air: '24–26 °C, breezy', rain: 'Mostly dry', sea: 'About 17–19 °C on a good day, colder after wind. The lagoon behind Grotto Beach is warmer and calm.' }, src: [src.hermanus] },
      plett: { name: 'Garden Route (Plettenberg Bay & Knysna)', short: 'Plett', emoji: '🏖️', beach: true, swim: 4,
        blurb: 'Kilometres of soft sand, a lagoon, forest, seals and dolphins — the best swimming in the Cape.',
        hotel: { budget: 75, mid: 125, nice: 220 }, peakMult: 1.4, food: { local: 30, mixed: 50, tourist: 90 }, localPerDay: 60,
        hotelNote: 'Plettenberg Bay itself for beaches; Knysna (30 minutes away) for the lagoon. Until about 10 January many places are full or want five or six nights. Seen for early and mid-January 2026: about €95–150 a night for a guesthouse.', foodNote: 'Estimate. Fish and chips on the beach, Knysna oysters, farm stalls.', localNote: 'The rental car again: about €48 a day in the holidays plus fuel (estimate). Beaches, Robberg and Tsitsikamma are all a drive apart.',
        wx: { air: '24–26 °C', rain: 'Rain can come any month here — expect a few grey or showery days', sea: 'About 21 °C, swimmable without a wetsuit. Lifeguards on the main beaches in season.' }, src: [src.seaPlett, src.plettPrices, src.plettStays, src.plettFlags] },
      addo: { name: 'Addo Elephant Park (near Gqeberha)', short: 'Addo', emoji: '🐘', beach: false, swim: 0,
        blurb: 'Hundreds of elephants, lions, buffalo and zebra — a real safari with no malaria.',
        hotel: { budget: 60, mid: 90, nice: 190 }, peakMult: 1.15, food: { local: 28, mixed: 45, tourist: 70 }, localPerDay: 65,
        hotelNote: 'Guest farms a few minutes from the gate are far cheaper than private game lodges. Seen: about €70–90 a night.', foodNote: 'Estimate. Usually dinner at the guest farm.', localNote: 'The rental car, with more fuel because the safari is driven in our own car (estimate). Park fees are in the activities.',
        wx: { air: '28–32 °C, can touch 38 °C', rain: 'Occasional thunderstorm', sea: 'No sea. Pool at most guest farms.' }, src: [src.addoFee, src.addoGuide] },
      kzn: { name: 'Durban’s north coast (Umhlanga & Ballito)', short: 'Durban coast', emoji: '🌴', beach: true, swim: 5,
        blurb: 'The Indian Ocean at bath temperature, lifeguards, a seafront promenade. Hot, sticky and stormy in January.',
        hotel: { budget: 65, mid: 110, nice: 260 }, peakMult: 1.35, food: { local: 30, mixed: 50, tourist: 85 }, localPerDay: 22,
        hotelNote: 'Umhlanga for a walkable promenade; Ballito and Salt Rock are quieter. This is where South Africans themselves holiday in December, so the festive weeks are packed.', foodNote: 'Estimate. Durban curry and bunny chow are the local speciality.', localNote: 'Uber around Umhlanga; no car needed unless we explore.',
        wx: { air: '26–29 °C by day and humid (about 80%), 20 °C at night', rain: 'The wettest time of year: sources give anything from 30 to 150 mm in January, mostly in afternoon downpours', sea: 'About 26 °C. Swim only between the flags; beaches are sometimes closed after heavy rain because of sewage.' }, src: [src.seaDbn, src.dbnWx, src.dbnWater] }
    },

    /* pp = per person return incl. checked bag. ev: 'near' = seen on an airline fare page for close dates; 'est' = estimate. */
    flights: [
      { id: 'et-cpt', airline: 'Ethiopian Airlines', route: 'VIE–CPT', via: 'Addis Ababa', stops: 1, durOut: 16, durBack: 17, arr: 'ct', dep: 'ct', pp: { low: 905, typ: 1300, high: 1753 }, ev: 'near', bag: 'Checked bag normally included — confirm on the fare.', arrive: 'usually lands Vienna 16 Jan', note: 'Seen on the airline’s own fare page: €905 (11–26 Dec), €1,753 (18 Dec–2 Jan), €855 (12–28 Jan). Our dates sit between the cheap and the dear ones, so €1,300 is our guess. Keep the change in Addis short: a stop of more than 12 hours there means South Africa asks for a yellow-fever certificate.', src: [src.et, src.etAt, src.yf] },
      { id: 'tk-cpt', airline: 'Turkish Airlines', route: 'VIE–CPT', via: 'Istanbul', stops: 1, durOut: 16, durBack: 17, arr: 'ct', dep: 'ct', pp: { low: 850, typ: 1150, high: 1500 }, ev: 'est', bag: 'Check that the fare includes a bag.', arrive: 'usually lands Vienna 16 Jan', note: 'Estimate. Seen only for early December: €569–700 return (3–16 Dec, 7–21 Dec) and €657 for 11–27 Dec. No price found for the New-Year weeks. Often the cheapest one-stop from Vienna.', src: [src.tk, src.tkDeals, src.fluege, src.wuw] },
      { id: 'lh-cpt', airline: 'Lufthansa (with Austrian to Frankfurt or Munich)', route: 'VIE–CPT', via: 'Frankfurt or Munich', stops: 1, durOut: 14, durBack: 15, arr: 'ct', dep: 'ct', pp: { low: 950, typ: 1300, high: 1700 }, ev: 'est', bag: 'The cheapest “Light” fare has NO checked bag (about €70–100 each way extra, included here).', arrive: 'usually lands Vienna 16 Jan', note: 'Estimate. Daily nonstops from both Frankfurt and Munich this winter, so it is the shortest journey. “From” prices of €587–716 seen for early December only.', src: [src.lh, src.os, src.lhSA] },
      { id: 'lx-cpt', airline: 'Swiss / Edelweiss', route: 'VIE–CPT', via: 'Zurich', stops: 1, durOut: 15, durBack: 16, arr: 'ct', dep: 'ct', pp: { low: 950, typ: 1300, high: 1700 }, ev: 'est', bag: 'Light fare has no checked bag (added here).', arrive: 'usually lands Vienna 16 Jan', note: 'Estimate. Edelweiss flies Zurich–Cape Town up to five times a week, with an extra Monday flight from 14 Dec to 11 Jan — and 28 Dec is a Monday. “From €623” seen for 6 Dec.', src: [src.lx, src.edelweiss] },
      { id: 'kl-cpt', airline: 'KLM / Air France', route: 'VIE–CPT', via: 'Amsterdam or Paris', stops: 1, durOut: 16, durBack: 17, arr: 'ct', dep: 'ct', pp: { low: 900, typ: 1250, high: 1650 }, ev: 'est', bag: 'Light fare has no checked bag (added here).', arrive: 'usually lands Vienna 16 Jan', note: 'Estimate. KLM was seen at €549 for 2–20 Dec; Air France flies Paris–Cape Town five times a week this summer and has one of the lowest average prices on the route. Nothing seen for our dates.', src: [src.klm, src.fluege, src.airFrance, src.checkfelix] },
      { id: 'de-cpt', airline: 'Condor', route: 'VIE–CPT', via: 'Frankfurt', stops: 1, durOut: 15, durBack: 16, arr: 'ct', dep: 'ct', pp: { low: 850, typ: 1200, high: 1600 }, ev: 'est', bag: 'Cheapest fares exclude a checked bag (added here).', arrive: 'check the itinerary', note: 'Estimate. Condor says it flies Frankfurt–Cape Town daily this season and advertises one-way “from €250–290” from Vienna, without saying for which days. Check that the Vienna–Frankfurt leg is on the same ticket.', src: [src.condor] },
      { id: 'qr-cpt', airline: 'Qatar Airways', route: 'VIE–CPT', via: 'Doha', stops: 1, durOut: 18, durBack: 19, arr: 'ct', dep: 'ct', pp: { low: 900, typ: 1200, high: 1600 }, ev: 'est', bag: 'Bag usually included.', arrive: 'usually lands Vienna 16 Jan', note: 'Estimate. Lowest fare of the year on one comparison site (€448) but an average of €842, and no price for our dates. A sale runs 19–29 Nov. Gulf airspace has been disrupted on and off all year — a higher risk of schedule changes. We found no rule in Qatar about people born in Iran.', src: [src.qr, src.qrSale, src.checkfelix, src.easa] },
      { id: 'ba-cpt', airline: 'British Airways', route: 'VIE–CPT', via: 'London', stops: 1, durOut: 16, durBack: 17, arr: 'ct', dep: 'ct', pp: { low: 1000, typ: 1350, high: 1800 }, ev: 'est', bag: 'Cheapest fares may exclude a checked bag (added here).', arrive: 'usually lands Vienna 16 Jan', note: 'Pure estimate — we found no fare at all. London has the most Cape Town flights of any European city, so it is worth one search. Check the UK’s own electronic travel permit rule for changing planes in London.' },
      { id: 'ek-cpt', avoid: true, airline: 'Emirates', route: 'VIE–CPT', via: 'Dubai', stops: 1, durOut: 19, durBack: 20, arr: 'ct', dep: 'ct', pp: { low: 950, typ: 1300, high: 1700 }, ev: 'est', bag: 'Bag usually included.', arrive: 'usually lands Vienna 16 Jan', note: 'Not advised for you. In April 2026 Emirates said Iranian nationals may not enter or change planes in the UAE, and this has reportedly been applied to people born in Iran on European passports too. A later fact-check could not confirm the rule is still in force — but being turned away at the gate in Vienna is not worth the gamble. The same goes for Etihad via Abu Dhabi. No fare found.', src: [src.uae, src.uaeCheck, src.ek] }
    ],

    flightAlt: [
      { t: 'Is there a Vienna–Cape Town nonstop?', d: 'Not this winter, as far as we can tell. Austrian flew it twice a week some years ago; its winter 2026/27 long-haul changes mention Bangkok, Mauritius and the Maldives but not Cape Town, and flight-search sites list no nonstop. Austrian sells Cape Town with a change in Frankfurt, Munich or Zurich.', src: [src.osWinter, src.osWinter2, src.os] },
      { t: 'Flying home from Gqeberha (Port Elizabeth).', d: 'Route F ends at Addo and flies home from Gqeberha, changing in Johannesburg or Cape Town on the same ticket. We add about €120 each — an estimate; search “multi-city” (Vienna → Cape Town, Gqeberha → Vienna) for the real price.' },
      { t: 'Flying into Johannesburg instead.', d: 'Often a little cheaper and served by more airlines, but it is a two-hour flight from the beaches and adds a domestic ticket each way. Only worth it if we wanted Kruger.' },
      { t: 'Starting from Munich or Zurich.', d: 'Lufthansa flies Munich–Cape Town daily and Edelweiss flies from Zurich. If the Vienna fare is silly, a train to Munich (four hours) plus the nonstop can be worth a look.', src: [src.lhSA, src.edelweiss] }
    ],

    flightNotes: [
      { icon: '⚠️', t: 'These are not bookable quotes.', d: 'Only Ethiopian showed a price close to our dates. Everything else is an estimate built from early-December “from” fares and the route’s December average. Search 28 Dec → 15 Jan once and type the real price into “Our prices”.' },
      { icon: '🛬', t: 'Arrival days:', d: 'flights leave Vienna on 28 Dec and land in Cape Town on the 29th. Flights home leave on the evening of 15 Jan and land in Vienna on the morning of the 16th. To be home on the 15th we would have to leave on the 14th.' },
      { icon: '🚫', t: 'Dubai and Abu Dhabi:', d: 'in April 2026 Emirates and flydubai said Iranian nationals may not enter or transit the UAE. Whether that still holds, and whether it catches someone born in Iran with an Austrian passport, nobody confirms. Avoid Emirates and Etihad unless the airline says yes in writing.', src: [src.uae, src.uae2, src.uaeCheck] },
      { icon: '🛫', t: 'Doha and the Gulf:', d: 'Qatar’s airport reopened to all airlines after the April ceasefire, but Europe’s aviation safety agency kept its Gulf airspace warning in force until at least 16 Nov 2026 and has been extending it. Flights run; changes at short notice are more likely than on other routes.', src: [src.doha, src.easa, src.easaNews] },
      { icon: '💉', t: 'Via Addis Ababa:', d: 'Ethiopia counts as a yellow-fever country. South Africa only asks for a vaccination certificate if the stop is longer than 12 hours — so book a short connection and no certificate is needed. If a missed connection strands us overnight, the rule could bite.', src: [src.yf, src.yfForum] }
    ],

    flightTips: [
      { icon: '📅', t: 'Shift the date by a day or two', d: 'Ethiopian showed €905 for 11–26 Dec and €1,753 for 18 Dec–2 Jan — almost double for one week’s difference. Coming home on 17 or 18 Jan instead of the 15th may also be cheaper, because early January is when everyone flies back north.', src: [src.et] },
      { icon: '⏱️', t: 'Book now', d: 'December is the most expensive month on this route (about €1,300 average against about €690 across the year) and we are under six weeks out. Prices are more likely to rise than fall.', src: [src.checkfelix] },
      { icon: '🧳', t: 'Compare with bags included', d: 'Lufthansa, Swiss, Austrian, KLM, Air France and Condor all sell “Light” fares without a checked bag. Ethiopian, Turkish and Qatar usually include one.' },
      { icon: '🔗', t: 'One ticket, one booking', d: 'Keep Vienna to Cape Town on a single ticket so a missed connection is the airline’s problem. Condor in particular: make sure the Vienna leg is part of the same booking.' },
      { icon: '🏷️', t: 'Qatar’s sale ends 29 November', d: 'Cape Town is on the list for travel up to June 2027. Worth one look before it closes — bearing the Gulf caveat in mind.', src: [src.qrSale] },
      { icon: '🕐', t: 'Leave a long layover alone in Addis', d: 'Under 12 hours is the rule for skipping the yellow-fever certificate. Two to four hours is ideal.', src: [src.yf] }
    ],

    /* Journeys inside South Africa. pp = per person one way, door to door. For rental-car legs the car itself is already in the per-day costs of the place; pp here is fuel and tolls only. hassle & comfort 1–5. */
    genericLeg: { id: 'car', icon: '🚗', label: 'Rental car', pp: 20, hours: 5, comfort: 3, hassle: 3, note: 'No specific option researched; estimate for fuel on a half-day drive.' },
    legs: {
      'ct|hermanus': [
        { id: 'car', icon: '🚗', label: 'Rental car along the coast road', pp: 7, hours: 2, comfort: 4, hassle: 2, note: 'About 120 km. Take the cliff road through Gordon’s Bay and Betty’s Bay rather than the motorway — it is one of the prettiest drives in the country. Cost here is fuel only (estimate); the car is in the daily costs.', risks: ['Driving is on the left; take the first hour slowly.', 'Pick the car up in town on the morning we leave, not at night.', 'Baboons on the coast road: windows up, no food in sight.'], src: [src.driving, src.arrive] },
        { id: 'shuttle', icon: '🚐', label: 'Private transfer', pp: 45, hours: 2, comfort: 4, hassle: 2, note: 'Estimate: about €80–100 per car. Only makes sense if we do not want to drive at all — but then Hermanus is hard to explore.' }
      ],
      'ct|wine': [
        { id: 'car', icon: '🚗', label: 'Rental car', pp: 4, hours: 1, comfort: 4, hassle: 1, note: '50–80 km of motorway to Stellenbosch or Franschhoek. Fuel only (estimate). Stellenbosch is 30–40 minutes from the airport, which makes the Winelands a calm last stop.', risks: ['Wine tasting and driving do not mix — police do stop cars. Use Uber or the tram on tasting days.'], src: [src.winelands] },
        { id: 'uber', icon: '📱', label: 'Uber', pp: 11, hours: 1, comfort: 4, hassle: 1, note: 'Reported at about R300–400 (€16–22) per car from Cape Town to Stellenbosch, R400–600 to Franschhoek. Getting one back from a remote estate can take a while.', src: [src.winelands, src.tram] }
      ],
      'hermanus|wine': [
        { id: 'car', icon: '🚗', label: 'Rental car over the mountain passes', pp: 5, hours: 1.5, comfort: 4, hassle: 1, note: 'About 90–110 km via the Franschhoek Pass or Sir Lowry’s Pass. Fuel only (estimate).', risks: ['The Franschhoek Pass is steep and winding — daylight only.'] }
      ],
      'hermanus|plett': [
        { id: 'car', icon: '🚗', label: 'Rental car on the N2', pp: 17, hours: 5.5, comfort: 3, hassle: 3, note: 'About 430 km, mostly one lane each way through farmland, then the Garden Route. Fuel only (estimate). Stop in Swellendam or Mossel Bay for lunch.', risks: ['Leave by 9:00 so we arrive well before dark.', 'Slow lorries and impatient overtaking on the N2 — stay calm and keep left.', 'Never leave bags visible when we stop for lunch.'], src: [src.gardenRoute, src.arrive, src.satsa] }
      ],
      'ct|plett': [
        { id: 'car', icon: '🚗', label: 'Rental car on the N2', pp: 21, hours: 6.5, comfort: 3, hassle: 3, note: 'About 520 km. Cape Town to Mossel Bay alone is four to four and a half hours without stops. Fuel only (estimate). A long day — breaking it in Hermanus is nicer.', risks: ['A full day at the wheel on the left, right after the festive rush.', 'Arrive before dark.', 'Returning the car in another town costs a one-way fee of about R750–3,000.'], src: [src.gardenRoute, src.gardenRoute2, src.car] },
        { id: 'flight', icon: '✈️', label: 'Flight to George + car from there', pp: 115, hours: 4.5, comfort: 4, hassle: 2, note: 'Estimate: a one-hour flight, then 100 km by rental car to Plettenberg Bay. We found no price for our dates. The small airline that flew straight to Plettenberg Bay has stopped and started for years — do not plan around it.', risks: ['Holiday-week fares on domestic flights are high.', 'Low-cost airlines charge for checked bags.'], src: [src.cemair, src.domFares] },
        { id: 'bus', icon: '🚌', label: 'Intercity coach', pp: 34, hours: 9.5, comfort: 2, hassle: 4, note: 'About nine hours from Cape Town’s Civic Centre to a petrol station in Plettenberg Bay, R400–700. The backpacker Baz Bus also lists the route; we could not confirm its current timetable. Without a car in Plett we would be stuck.', risks: ['Coaches often run through the night.', 'The city-centre bus terminal is not a place to wait after dark.'], src: [src.bus, src.baz] }
      ],
      'plett|wine': [
        { id: 'car', icon: '🚗', label: 'Rental car, N2 or Route 62', pp: 19, hours: 6, comfort: 3, hassle: 3, note: 'About 500 km to Stellenbosch or Franschhoek. Fuel only (estimate). The inland Route 62 through the Little Karoo is slower but beautiful.', risks: ['Leave early; it is the longest drive of the trip.', 'Hot inland — carry water.'], src: [src.gardenRoute3] }
      ],
      'addo|plett': [
        { id: 'car', icon: '🚗', label: 'Rental car on the N2', pp: 11, hours: 3.5, comfort: 4, hassle: 2, note: 'About 260 km past Tsitsikamma and Jeffreys Bay. Fuel only (estimate). Storms River Mouth makes a perfect stop on the way.', risks: ['Skirt Gqeberha on the main road; do not let the sat-nav shortcut through townships.'], src: [src.addoGuide] }
      ],
      'addo|ct': [
        { id: 'flight', icon: '✈️', label: 'Drop the car at Gqeberha + fly', pp: 130, hours: 5, comfort: 4, hassle: 2, note: 'The airport is 45–60 minutes from the park gate; the flight takes about 75 minutes. One-way fares of R1,233–1,998 were reported in price comparisons (date unclear); we add a share of the one-way car fee and an Uber into Cape Town. Estimate.', risks: ['One-way car drop fee of about R750–3,000.', 'Low-cost fares exclude checked bags.'], src: [src.domFares2, src.domFares, src.car] },
        { id: 'car', icon: '🚗', label: 'Drive all the way back', pp: 32, hours: 10, comfort: 2, hassle: 5, note: 'About 800 km. Fuel only (estimate). Too far for one day — it would cost a night on the road.', risks: ['Fatigue; do not attempt it in a single day.'] }
      ],
      'ct|kzn': [
        { id: 'flight', icon: '✈️', label: 'Flight to Durban (2 hours)', pp: 125, hours: 5.5, comfort: 4, hassle: 2, note: 'About 90 nonstop flights a week. A December price comparison showed R2,732 one way; the cheapest fare found on a search site was R1,114. We use about €105 for the ticket with a bag plus Ubers at both ends. Estimate — check our dates.', risks: ['December and early January are the dearest weeks on this route.', 'Summer thunderstorms in Durban delay afternoon flights.'], src: [src.domFares, src.dbnFlights] }
      ]
    },

    taxi: [
      { icon: '📱', t: 'Uber and Bolt in Cape Town', d: 'Install both before we fly. Rides are cheap, tracked and paid by card — the right way to move after dark, even for a ten-minute walk. Always check the number plate matches the app before getting in.', price: 'City ride about €2–6', src: [src.uber, src.night] },
      { icon: '🛬', t: 'Cape Town airport → hotel', d: 'Follow the signs to the e-hailing pickup in Parkade P1, a three-minute walk from arrivals. Reported fares to the centre run from R170 to R380. Ignore anyone offering a taxi inside the terminal.', price: 'about €9–20, 20–30 min', src: [src.uber, src.uber2] },
      { icon: '🚌', t: 'The airport bus may not be running', d: 'Guides disagree on whether the MyCiTi airport bus is operating this year — one saw a “temporarily suspended” notice in April 2026. Plan on Uber and treat the bus as a bonus.', src: [src.myciti] },
      { icon: '🚗', t: 'Rental car: what it really costs', d: 'An aggregator puts the average at Cape Town airport at about R1,130 (€60) a day, and December is the dearest month. We budget about €48 a day for a small car booked now, plus fuel. Returning it in another town adds a one-way fee of roughly R750–3,000 (€40–160).', price: 'about €48–65 a day', src: [src.car] },
      { icon: '🛡️', t: 'Take the zero-excess cover', d: 'Standard cover leaves us liable for a large excess after any scratch or break-in. Avis lists its top-up that cuts the excess to zero at R150–410 (€8–22) a day. A separate excess policy bought at home is usually cheaper — check tyres and windscreen are included.', price: '€8–22 a day', src: [src.avis] },
      { icon: '🪪', t: 'Driving licences', d: 'South Africa accepts a foreign licence with a photo if it is in English. Sophie’s Irish licence qualifies. Mohsey’s Austrian licence is in German, so it needs an international driving permit (from ÖAMTC or ARBÖ, same day). Rental desks often ask everyone for the permit anyway — get one each and bring the plastic licence too.', price: 'about €15–20 each', src: [src.idp, src.arrive] },
      { icon: '⬅️', t: 'Driving on the left', d: 'Keep left, pass right. Book an automatic so the left hand has nothing new to learn. No driving after dark outside towns: unlit roads, pedestrians and animals. Doors locked and windows up at traffic lights.', src: [src.driving, src.arrive, src.roadTrip] },
      { icon: '🎒', t: 'An empty car is a safe car', d: 'Smash-and-grab from parked cars is the most common crime against drivers. Nothing on the seats, ever — not a jacket, not a charger cable. Bags go in the boot before we arrive, not at the car park.', src: [src.carTips, src.satsa, src.roadTrip] },
      { icon: '🅿️', t: 'Car guards and petrol attendants', d: 'Men in bibs watch parked cars for tips: R5–10 when we leave, never in advance. Petrol is always pumped for us; R5–10 for the attendant, a bit more if they clean the windscreen. Keep a stash of coins and R10 notes in the door pocket.', price: 'R5–10 a time', src: [src.tipping, src.tipping2] },
      { icon: '🧭', t: 'Do not follow the sat-nav blindly near the airport', d: 'The N2 between the city and the airport passes some of the country’s worst car-hijacking areas, and the risk is highest between 4 pm and 9 pm. Stay on the motorway, never take a “faster” exit through the Cape Flats, and time airport runs for daylight.', src: [src.n2, src.gps, src.hijack] },
      { icon: '🌴', t: 'Durban airport → Umhlanga', d: 'King Shaka airport is north of the city, close to Umhlanga and Ballito. Uber works here too; we found no current fare, so allow about €10–15 (estimate).', price: 'about €10–15 (estimate)' }
    ],

    activities: [
      { id: 'cable', place: 'ct', name: 'Table Mountain cable car, return', for2: 51, note: 'R475 each online (R530 at the ticket office) until June 2027. It shuts in strong wind — go on the first clear, calm morning.', src: [src.cable] },
      { id: 'peninsula', place: 'ct', name: 'Cape Peninsula day by rental car: Cape Point and the penguins', for2: 150, note: 'Estimate: one day’s car (€55), Cape Point entry (R515 each last season) and Boulders Beach (about R215–245 each), fuel and the Chapman’s Peak toll. Park fees rose by up to 15% on 1 Nov. A small-group tour instead costs about €95–120 each.', src: [src.capePoint, src.tmnp, src.parksUp, src.peninsulaTour] },
      { id: 'robben', place: 'ct', name: 'Robben Island ferry and prison tour', for2: 75, note: 'Guides give R600–750 each for foreign visitors; we use about R700. Ferries are cancelled in rough weather, so book an early day and keep a spare.', src: [src.robben, src.robben2] },
      { id: 'kirst', place: 'ct', name: 'Kirstenbosch botanical garden', for2: 29, note: 'R270 each for overseas visitors. Card only, no cash.', src: [src.kirst] },
      { id: 'concert', place: 'ct', name: 'Sunday sunset concert on the Kirstenbosch lawns', for2: 40, note: 'Last season R360 each; this season’s price not seen. Sundays until 28 March — bring a picnic.', src: [src.concerts] },
      { id: 'tidalpools', place: 'ct', name: 'False Bay swimming day: St James, Dalebrook and Kalk Bay', for2: 35, note: 'The pools are free. Estimate for Ubers there and back (about 40 minutes each way) or one day of the car.', src: [src.tidal, src.warmBeaches] },
      { id: 'aquila', place: 'ct', name: 'Day safari at a private game reserve near Cape Town', for2: 420, note: 'Aquila lists about R2,900 each for a full day plus about R1,000 each for the shuttle; packaged tours R4,075 each. Convenient, but dear for a fenced reserve.', src: [src.aquila2, src.aquila] },
      { id: 'tram', place: 'wine', name: 'Franschhoek Wine Tram day, with tastings', for2: 70, note: 'Tram ticket about R300–350 each; tastings are paid at each estate (about R60–150). Join only at the town terminal.', src: [src.tram, src.tram2] },
      { id: 'tasting', place: 'wine', name: 'Two estate tastings on our own', for2: 30, note: 'Tastings run from about R60–100 each at simple estates to R150–435 at the famous ones.', src: [src.tasting, src.winelands] },
      { id: 'winelunch', place: 'wine', name: 'Long lunch at a wine estate', for2: 85, note: 'Estimate for three courses with wine at a good estate restaurant. Book ahead in January.' },
      { id: 'hemel', place: 'hermanus', name: 'Hemel-en-Aarde valley wine tasting', for2: 25, note: 'Estimate, based on typical tasting fees. The valley starts five minutes behind Hermanus.', src: [src.tasting] },
      { id: 'sharkcage', place: 'hermanus', name: 'Shark cage diving from Gansbaai', for2: 245, note: 'Listed at about USD 116–160 each for a three-hour trip. Trips depend on the sea, and sightings are not guaranteed.', src: [src.cage] },
      { id: 'robberg', place: 'plett', name: 'Robberg peninsula hike', for2: 10, note: 'Estimate — we did not see the current entry fee. Two to four hours of cliffs, seals and an empty beach; go early for the heat.' },
      { id: 'sealboat', place: 'plett', name: 'Seal and dolphin boat trip', for2: 58, note: 'Listed at USD 33 or about €28 each for an hour and a half.', src: [src.sealBoat] },
      { id: 'sealswim', place: 'plett', name: 'Snorkelling with seals', for2: 96, note: 'From €48 each for two hours, wetsuit included. Ask the operator about the seal rabies warning before booking (see Tips).', src: [src.sealSwim, src.cdc] },
      { id: 'tsitsikamma', place: 'plett', name: 'Tsitsikamma: Storms River Mouth and the suspension bridges', for2: 45, note: 'R367 each last season; up to 15% more from 1 Nov, so about R420. An hour’s drive east of Plettenberg Bay.', src: [src.tsitsi, src.parksUp] },
      { id: 'knysna', place: 'plett', name: 'Knysna lagoon day with oysters', for2: 45, note: 'Estimate for lunch and a drink at the waterfront and parking at the Heads viewpoint.' },
      { id: 'addofee', place: 'addo', name: 'Addo park fees for two days of driving ourselves', for2: 122, note: 'R565 per adult per day since 1 Nov 2026. We drive our own car on the park roads all day.', src: [src.addoFee, src.parksUp] },
      { id: 'addoguide', place: 'addo', name: 'A park guide in our own car for two hours', for2: 22, note: 'R400 per car. A cheap way to find the lions.', src: [src.addoDrive] },
      { id: 'addosafari', place: 'addo', name: 'Guided half-day safari in an open vehicle', for2: 268, note: 'Listed at USD 152 each. Nice, not necessary.', src: [src.addoTour] },
      { id: 'ushaka', place: 'kzn', name: 'Durban day: beachfront promenade and aquarium', for2: 60, note: 'Estimate — no current ticket price seen.' },
      { id: 'hluhluwe', place: 'kzn', name: 'Day safari to Hluhluwe-iMfolozi park from the coast', for2: 280, note: 'Estimate — no price seen. A long day (about three hours’ drive each way from Umhlanga). The park lies in a low-risk malaria zone; ask the travel clinic.', src: [src.malaria] }
    ],

    fixed: {
      visa: { label: 'Entry (no visa needed)', for2: 0, note: 'Irish and Austrian passports are stamped in for up to 90 days, free. The online travel authorisation (R500) is optional for visa-free visitors and the customs declaration is free.', src: [src.exempt, src.eta, src.sars] },
      insurance: { label: 'Travel medical insurance', for2: 90, note: 'Estimate for medical-only cover, 19 days. Private hospitals here ask for payment or an insurer’s guarantee before treating. Untick if a card or annual policy already covers us.', src: [src.ins] },
      sim: { label: 'Two eSIMs', for2: 36, note: 'Data-only eSIMs on the Vodacom network were listed at USD 12 for 5 GB and USD 21 for 10 GB, 30 days. We count two of the larger ones.', src: [src.esim] },
      gala: { label: 'Compulsory New Year’s Eve dinner at the hotel', for2: 0, note: 'We found no sign of compulsory hotel gala dinners in South Africa. Restaurants do run pricey set menus on 31 Dec — the Waterfront street party is free.', src: [src.nyeTimeOut] }
    },

    scenarios: [
      { id: 'A', short: 'City only', title: '17 nights in Cape Town', tagline: 'One base, no car, day trips by Uber and tour.',
        stops: [{ place: 'ct', nights: 17 }], acts: ['cable', 'peninsula', 'robben', 'kirst', 'tidalpools', 'tram'],
        pros: ['Cheapest route and nothing to organise — unpack once.', 'No long drives; a car only for the peninsula day.', 'Endless restaurants, markets, hikes and sunsets.'], cons: ['The sea is cold: lovely beaches, but real swimming means a 40-minute trip to False Bay each time.', 'We pay Cape Town’s festive prices for the first week.', 'Seventeen nights in one city is long; the wind can keep us off the beach for days.'] },
      { id: 'B', short: 'City + wine', title: '12 Cape Town + 5 Winelands', tagline: 'City first, then vineyards and a pool.',
        stops: [{ place: 'ct', nights: 12 }, { place: 'wine', nights: 5 }], acts: ['cable', 'peninsula', 'robben', 'kirst', 'tidalpools', 'tram', 'tasting'],
        pros: ['Only two hotels and one short transfer.', 'The Winelands are hot and still when Cape Town is windy.', 'Ends 40 minutes from the airport.'], cons: ['Still no warm sea — pools instead.', 'Five nights of wine country is a lot unless we love food and doing nothing.'] },
      { id: 'C', short: 'Cape loop', title: '8 Cape Town + 4 Hermanus + 5 Winelands', tagline: 'City, a small seaside town, then vineyards — short drives only.',
        stops: [{ place: 'ct', nights: 8 }, { place: 'hermanus', nights: 4 }, { place: 'wine', nights: 5 }], acts: ['cable', 'peninsula', 'robben', 'kirst', 'hemel', 'tram', 'tasting'],
        pros: ['No drive longer than two hours.', 'Hermanus has a long sandy beach, a warm lagoon and a famous cliff path.', 'A gentle first taste of driving on the left.'], cons: ['Hermanus water is cool (17–19 °C) and the whales it is famous for are away until June.', 'Nine days of car hire for fairly little distance.', 'Less of a “beach holiday” than the Garden Route.'] },
      { id: 'D', short: 'Garden Route', title: '6 Cape Town + 2 Hermanus + 6 Plettenberg Bay + 3 Winelands', tagline: 'New Year in the city, the best beaches in the Cape, wine to finish — our pick.',
        stops: [{ place: 'ct', nights: 6 }, { place: 'hermanus', nights: 2 }, { place: 'plett', nights: 6 }, { place: 'wine', nights: 3 }], acts: ['cable', 'peninsula', 'robben', 'tidalpools', 'robberg', 'sealboat', 'tsitsikamma', 'knysna', 'tram'],
        pros: ['Six nights on Plettenberg Bay’s long beaches with about 21 °C water — the warmest swimming without flying.', 'We reach the Garden Route on 6 January, after the worst of the holiday crush and prices.', 'Hermanus breaks the long drive east; the Winelands put us 40 minutes from the airport on the last day.', 'City, coast, forest and vineyards in one trip, with no stop under two nights.'],
        cons: ['Four hotels and about 1,100 km of driving on the left, including two days of five to six hours.', 'Eleven days of car hire make it one of the dearer routes.', 'Garden Route weather is changeable: a few grey or rainy days are normal.', 'Plettenberg Bay had two fatal shark attacks in 2022 — swim at the lifeguarded beaches.'] },
      { id: 'H', short: 'Beach-heavy', title: '5 Cape Town + 9 Plettenberg Bay + 3 Winelands', tagline: 'Fewer suitcases, more beach.',
        stops: [{ place: 'ct', nights: 5 }, { place: 'plett', nights: 9 }, { place: 'wine', nights: 3 }], acts: ['cable', 'peninsula', 'robben', 'robberg', 'sealboat', 'tsitsikamma', 'knysna', 'tram'],
        pros: ['Nine nights in one beach town — the most relaxing version.', 'Only three hotels.', 'A weekly rate on a self-catering flat in Plett can cut costs.'], cons: ['The drive from Cape Town is six to seven hours in one go, on 3 January when everyone is on the road.', 'We arrive while Plettenberg Bay is still in full holiday mode (until about 10 January): crowded, dear, minimum stays.', 'Only five nights for Cape Town, two of them jet-lagged.'] },
      { id: 'E', short: 'Coast + safari', title: '6 Cape Town + 5 Plettenberg Bay + 2 Addo + 4 Cape Town', tagline: 'Beaches, then elephants, then fly back for a second helping of the city.',
        stops: [{ place: 'ct', nights: 6 }, { place: 'plett', nights: 5 }, { place: 'addo', nights: 2 }, { place: 'ct', nights: 4 }], acts: ['cable', 'peninsula', 'robben', 'robberg', 'sealboat', 'tsitsikamma', 'addofee', 'addoguide', 'tidalpools', 'tram'],
        pros: ['A real safari with elephants at arm’s length, and no malaria tablets.', 'No backtracking by road: we fly back from Gqeberha in 75 minutes.', 'The last four Cape Town nights fall after the holidays — cheaper and calmer.'], cons: ['A domestic flight and a one-way car fee on top.', 'One very long driving day from Cape Town to Plettenberg Bay.', 'Addo in January is hot, and the bush is thick, so animals are harder to spot than in winter.'] },
      { id: 'F', short: 'One-way east', title: '7 Cape Town + 2 Hermanus + 5 Plettenberg Bay + 3 Addo', tagline: 'Drive the whole coast one way and fly home from the far end.',
        stops: [{ place: 'ct', nights: 7 }, { place: 'hermanus', nights: 2 }, { place: 'plett', nights: 5 }, { place: 'addo', nights: 3 }], openJaw: 'addo', acts: ['cable', 'peninsula', 'robben', 'tidalpools', 'robberg', 'sealboat', 'tsitsikamma', 'addofee', 'addoguide'],
        pros: ['The classic road trip: every drive goes forward, none back.', 'Three nights at Addo is enough to see the park properly.', 'Ends with the safari as the grand finale.'], cons: ['The flight home from Gqeberha is an estimate and means an extra change of planes.', 'One-way car fee.', 'No Winelands, and the long journey home starts from a small airport — one delay and the connection is at risk.'] },
      { id: 'G', short: 'Warm sea', title: '7 Cape Town + 8 Durban coast + 2 Cape Town', tagline: 'For the swimmer: fly to the Indian Ocean.',
        stops: [{ place: 'ct', nights: 7 }, { place: 'kzn', nights: 8 }, { place: 'ct', nights: 2 }], acts: ['cable', 'peninsula', 'robben', 'tidalpools', 'ushaka'],
        pros: ['The only truly warm sea of the trip: about 26 °C, lifeguards, shark nets.', 'No rental car needed in Umhlanga.', 'A completely different South Africa: subtropical, Zulu and Indian influences, great curry.'], cons: ['January is the wettest, stickiest time there: humid heat and heavy downpours.', 'Durban beaches are closed now and then after rain because of sewage — it happened in January 2026.', 'Two extra flights, and the Durban coast is in full domestic holiday swing until about 10 January.', 'Less pretty than the Cape; many travellers would call it a detour.'] }
    ],

    tips: [
      { topic: 'Sea & beaches', echo: 'consensus', title: 'The postcard beaches are for looking, not swimming', text: 'Clifton and Camps Bay average 15–16 °C in January and can drop to 11 °C after wind. Glorious for sunbathing and sunset; a swim lasts about a minute.', src: [src.seaCamps] },
      { topic: 'Sea & beaches', echo: 'consensus', title: 'False Bay is several degrees warmer', text: 'Muizenberg averages about 20 °C. The walled tidal pools at St James and Dalebrook are shallow, sheltered and warmer still — the nicest proper swim near the city. Go early; they are popular.', src: [src.seaMuiz, src.tidal, src.warmBeaches] },
      { topic: 'Sea & beaches', echo: 'consensus', title: 'Warm water means going east', text: 'Plettenberg Bay averages about 21 °C in January and Durban about 26 °C. Nothing near Cape Town gets close to that.', src: [src.seaPlett, src.seaDbn] },
      { topic: 'Sea & beaches', echo: 'consensus', title: 'When the wind howls, go to Clifton', text: 'The summer south-easter (“the Cape Doctor”) sandblasts Camps Bay. Clifton’s coves hide behind granite boulders, and Kalk Bay is one of the few sheltered spots on the False Bay side. Check a wind forecast before choosing a beach.', src: [src.wind, src.windDays] },
      { topic: 'Sea & beaches', echo: 'official', title: 'Read the shark flags', text: 'At Muizenberg and Fish Hoek, spotters watch from the mountain. Green: no sharks seen. Black: they cannot see well. Red: high alert. White flag with a siren: shark in the water, get out. Fish Hoek puts out a net in summer.', src: [src.sharks] },
      { topic: 'Sea & beaches', echo: 'several', title: 'In Plettenberg Bay, swim where the lifeguards are', text: 'Two people were killed by sharks there in 2022 and the town has been working on safety since. Robberg 5 and Lookout carry Blue Flags; stay between the flags and out of the water at dawn and dusk.', src: [src.plettShark, src.plettFlags] },
      { topic: 'Sea & beaches', echo: 'several', title: 'Beaches do get closed for sewage', text: 'Camps Bay shut for days in December 2025 after a pump failed, and parts of Fish Hoek and Strand in February 2026. The city says 98% of its sea samples pass. If a beach has warning signs, believe them.', src: [src.campsSpill, src.febSpill, src.ctWater] },
      { topic: 'Sea & beaches', echo: 'several', title: 'Durban: check which beaches are open', text: 'Two Durban beaches were closed in January 2026 over water quality, and closures after heavy rain have been a pattern for years. The city publishes a list of open beaches — look before we swim.', src: [src.dbnWater, src.dbnWater2] },
      { topic: 'Sea & beaches', echo: 'official', title: 'Keep away from seals on beaches', text: 'Health authorities warn of a rabies outbreak among Cape fur seals in the Western Cape. Do not approach one on a beach or harbour wall, and see a doctor at once after any bite.', src: [src.cdc] },
      { topic: 'Sea & beaches', echo: 'consensus', title: 'No whales in January', text: 'Hermanus is famous for whales from June to November. In January it is a beach and walking town — still lovely, but do not book a whale boat.', src: [src.hermanus] },

      { topic: 'Safety', echo: 'consensus', title: 'After dark, take an Uber — even for ten minutes', text: 'The city’s own advice is to avoid quiet, dark streets at night and stick to busy, lit ones. Rides are cheap; make it a habit rather than a decision.', src: [src.night, src.festive] },
      { topic: 'Safety', echo: 'several', title: 'Do not hike the mountain alone or with valuables', text: 'A couple was attacked on a popular Table Mountain trail in January 2026, a runner was stabbed in July, and tourists with a guide were robbed on Lion’s Head. Go in a group at busy times, take the cable car if in doubt, and leave the good camera behind.', src: [src.hike1, src.hike2, src.hike3] },
      { topic: 'Safety', echo: 'several', title: 'Stay on the motorway near the airport', text: 'The areas beside the N2 airport road have the most car hijackings in the country, mostly between 4 pm and 9 pm. In 2023 a tourist was shot after a navigation app sent him off the motorway. Daylight, main road, no shortcuts.', src: [src.n2, src.gps] },
      { topic: 'Safety', echo: 'consensus', title: 'Phone in the pocket, not on the table', text: 'December is high season for pickpockets too. Do not walk with the phone out, do not leave it on a café table, and carry only the cash and one card we need that day.', src: [src.night, src.dezemba] },
      { topic: 'Safety', echo: 'official', title: 'Nobody needs to “help” us at a cash machine', text: 'Gangs target tourists at ATMs: one distracts, one swaps the card. Others pose as officials and walk visitors to a machine to pay for a “permit”. Use machines inside banks or malls, refuse all help, and check the card that comes back is ours.', src: [src.atm, src.atm2, src.atm3] },
      { topic: 'Safety', echo: 'several', title: 'Keep it in proportion', text: 'Most trouble that reaches tourists is opportunistic theft and car break-ins, not violence, and the tourist areas are heavily patrolled in season. The same habits as in any big city — plus Uber at night — cover most of it.', src: [src.advisory, src.wildWings] },

      { topic: 'Driving', echo: 'consensus', title: 'Daylight driving only', text: 'Road-safety advice for visitors is blunt: avoid travelling at night and in remote areas. Plan every long leg to arrive by late afternoon — the sun sets around 8 pm in January, which helps.', src: [src.arrive, src.driving] },
      { topic: 'Driving', echo: 'consensus', title: 'Leave nothing in the car', text: 'Rental firms and the tourism association say the same thing: no bag, phone or jacket in sight, whatever it is worth. Load the boot before setting off, not in the car park.', src: [src.carTips, src.satsa] },
      { topic: 'Driving', echo: 'several', title: 'Bring an international driving permit', text: 'A licence that is not in English needs one by law, and most rental companies ask every foreign driver for it. Cheap and same-day at home; impossible to get in Cape Town.', src: [src.idp] },
      { topic: 'Driving', echo: 'several', title: 'One-way rentals cost extra', text: 'Dropping the car in a different town adds roughly R750–3,000. Compare it with the price of driving back — on a 17-night trip the fee usually wins.', src: [src.car] },
      { topic: 'Driving', echo: 'consensus', title: 'Drive the Garden Route slowly', text: 'Cape Town to Mossel Bay is four to four and a half hours before a single photo stop. Travellers agree on two or more nights per town and drives of two to three hours where possible.', src: [src.gardenRoute, src.gardenRoute2] },
      { topic: 'Driving', echo: 'single', title: 'Do not count on a flight to Plettenberg Bay', text: 'The one small airline on that route has suspended and restarted it repeatedly. George, 100 km away, is the dependable airport for the Garden Route.', src: [src.cemair] },

      { topic: 'Peak season', echo: 'consensus', title: 'Mid-December to mid-January is the crush', text: 'Local holidaymakers arrive, rooms cost the most, and Table Mountain and Cape Point have long queues from about 16 December to early January. Book rooms, the car and any must-do restaurant now.', src: [src.peakGuide, src.priced] },
      { topic: 'Peak season', echo: 'official', title: 'Schools go back on 13 January', text: 'From about the 10th the beaches empty and prices soften. That is why our favourite routes put the Garden Route in the second week.', src: [src.school] },
      { topic: 'Peak season', echo: 'several', title: 'Seaside towns ask for long minimum stays', text: 'Over the festive weeks, listings in Plettenberg Bay and nearby asked for five or six nights minimum, and the town’s best-known hotel is not bookable at all from 20 December to 10 January.', src: [src.plettStays, src.plettHotel] },
      { topic: 'Peak season', echo: 'several', title: 'Hotel prices in January surprise people', text: 'Hotel rates in Cape Town rose about 16% in a year, and travellers on forums grumble about January prices. Guesthouses and flats in Sea Point or Green Point are much better value than Waterfront hotels.', src: [src.rates, src.ftRates] },
      { topic: 'Peak season', echo: 'official', title: 'Table Mountain: buy online, go early', text: 'Online tickets are R475 against R530 at the kiosk. The cable car closes in wind, so use the first calm, clear morning instead of saving it for the last day.', src: [src.cable] },
      { topic: 'Peak season', echo: 'official', title: 'New Year’s Eve at the Waterfront is free', text: 'Last year’s party ran from 6 pm to 1 am. The fireworks were cancelled after animal-welfare groups threatened court action; this year the Waterfront promises a short five-minute display. Expect closed roads and slow Ubers — stay within walking distance.', src: [src.nye, src.nyeNo, src.nyeTimeOut] },
      { topic: 'Peak season', echo: 'official', title: 'The minstrel parade closes the centre in early January', text: 'Cape Town’s big “second New Year” street parade shut Somerset Road, Green Point Main Road and nearby streets from morning to night in 2026. Wonderful to watch; terrible for a taxi.', src: [src.parade] },
      { topic: 'Peak season', echo: 'official', title: 'Sunday concerts at Kirstenbosch', text: 'Picnic concerts on the botanical-garden lawns run on Sundays from 22 November to 28 March. Popular acts sell out.', src: [src.concerts] },
      { topic: 'Peak season', echo: 'several', title: 'Book Robben Island for an early day', text: 'Ferries are cancelled when the sea is rough and resellers’ tickets are often non-refundable. Booking it for our second or third day leaves time to rebook.', src: [src.robben] },

      { topic: 'Money', echo: 'consensus', title: 'Tip 10–15% in restaurants', text: 'Waiters rely on it. Check the bill first — some places add service for larger tables.', src: [src.tipping, src.tipping2] },
      { topic: 'Money', echo: 'consensus', title: 'Keep small notes and coins handy', text: 'Car guards, petrol attendants and porters all expect R5–20. Cards work nearly everywhere else, so a small float of R10 and R20 notes is all the cash we need.', src: [src.tipping2] },
      { topic: 'Money', echo: 'official', title: 'The customs declaration is free', text: 'Since July 2026 everyone fills in an online traveller declaration within 24 hours before flying. It costs nothing on the tax office’s own site or app; sites that charge are middlemen.', src: [src.sars, src.sars2] },
      { topic: 'Money', echo: 'several', title: 'Install an eSIM before we fly', text: 'Data-only eSIMs on the Vodacom network cost about USD 12–21 for 5–10 GB. A local SIM with a phone number means queuing in a shop with the passport.', src: [src.esim] },
      { topic: 'Money', echo: 'official', title: 'The power cuts are over, for now', text: 'South Africa’s notorious rolling blackouts have not happened since May 2025 — more than 540 days. Local faults still occur, so a power bank and a torch on the phone are enough.', src: [src.power, src.power2] },

      { topic: 'Safari', echo: 'several', title: 'Addo is the safari that fits this trip', text: 'It sits at the end of the Garden Route, 45–60 minutes from Gqeberha airport, and has no malaria. Forum regulars say Kruger has more variety for a first safari — but it is a flight away and January is its malaria season.', src: [src.addoKruger, src.addoGuide, src.fhi] },
      { topic: 'Safari', echo: 'several', title: 'Driving ourselves is the cheap way', text: 'We pay the park fee (R565 each per day at Addo) and can stay on the park roads all day. A park guide will ride along in our car for R400.', src: [src.selfDrive, src.addoFee, src.addoDrive] },
      { topic: 'Safari', echo: 'single', title: 'Day safaris from Cape Town are pricey', text: 'About R2,900–4,100 each plus the shuttle for a private reserve two hours inland. Fine if elephants are a must and Addo is not on the route.', src: [src.aquila, src.aquila2] },
      { topic: 'Safari', echo: 'official', title: 'National park fees just went up', text: 'Fees for overseas visitors rose by up to 15% on 1 November 2026. Older blog prices for Cape Point, the penguins, Tsitsikamma and Addo are all too low.', src: [src.parksUp] },

      { topic: 'Winelands', echo: 'several', title: 'Stellenbosch is easier, Franschhoek is prettier', text: 'Stellenbosch is a real town with more places to stay and eat; Franschhoek is a small, polished village and costs more. They are 20–30 minutes apart, so either works as the base.', src: [src.winelands] },
      { topic: 'Winelands', echo: 'several', title: 'The wine tram solves the driving problem', text: 'One ticket, seven or eight estates on a loop, tastings paid as we go. We must board at the terminal in the village and cannot join halfway. Book the line and time slot ahead in January.', src: [src.tram, src.tram2] },

      { topic: 'Health', echo: 'official', title: 'Cape Town tap water is fine to drink', text: 'The city’s latest report (November 2026) rates it excellent. Bring refillable bottles.', src: [src.tap] },
      { topic: 'Health', echo: 'official', title: 'Malaria is a Kruger question, not ours', text: 'The Cape, the Garden Route and Addo have no malaria. Only the far north-east — Kruger and the Mozambique border — needs tablets, and October to May is its high season.', src: [src.fhi, src.malaria] },
      { topic: 'Health', echo: 'several', title: 'Private hospitals want payment first', text: 'Care is excellent but private hospitals usually ask for a card or an insurer’s guarantee before treating. Carry the insurance emergency number where we can both find it.', src: [src.ins] },

      { topic: 'Entry & flights', echo: 'official', title: 'Two blank pages, or no boarding', text: 'South Africa wants two empty passport pages for its stamps and airlines check at the desk. The passport must also outlast the trip — rules say 30 days beyond departure, Ireland advises six months.', src: [src.dfaEmb, src.dfa, src.lpVisa] },
      { topic: 'Entry & flights', echo: 'official', title: 'The new online travel permit is not for us', text: 'South Africa launched an Electronic Travel Authorisation in August 2026 for countries that need visas. Visa-free visitors such as Europeans may apply (R500) but do not have to. Check once more before flying — it is being widened step by step.', src: [src.eta, src.etaGov] },
      { topic: 'Entry & flights', echo: 'several', title: 'Skip Dubai and Abu Dhabi', text: 'Emirates said in April 2026 that Iranian nationals may not enter or transit the UAE. Reports differ on whether that still applies and who it catches; with a birthplace in Iran in the passport, pick another route.', src: [src.uae, src.uaeCheck] },
      { topic: 'Entry & flights', echo: 'official', title: 'A long stop in Addis Ababa needs a yellow-fever certificate', text: 'South Africa asks for one from anyone who spent more than 12 hours in transit in a yellow-fever country. A normal two-to-four-hour connection does not count.', src: [src.yf, src.yfForum] },
      { topic: 'Entry & flights', echo: 'several', title: 'December is the dearest month to fly', text: 'On one comparison site the Vienna–Cape Town average is about €1,300 in December against €615 in the cheapest month. Qatar, Iberia and Air France had the lowest prices over the year.', src: [src.checkfelix] }
    ],

    hotelNote: 'Review scores are from the platforms named on each card. Prices are undated “from” or snapshot prices converted to euros — almost all of them are for ordinary weeks, so expect a third more over New Year and check for minimum stays. We did not see whether breakfast is included. In the car places, ask about secure off-street parking.',
    hotels: {
      ct: [
        { name: 'Never at Home Green Point', area: 'Main Road, Green Point, near the stadium', tier: 'simple', stars: 'hostel with private rooms', score: '8.8 Momondo (1,450 reviews) · 8.7 HotelsCombined', price: 48, priceNote: 'private double, low-season snapshot; average about €70', good: 'En-suite private doubles at hostel prices, between the Waterfront and Sea Point.', watch: 'It is a sociable hostel at heart — ask for a quiet room.', src: [S('Kayak', 'https://www.kayak.com/Cape-Town-Hotels-never-home-Cape-Town.162685.ksp')] },
        { name: 'Radisson RED V&A Waterfront', area: 'Silo District, V&A Waterfront', tier: 'good', stars: '4★', score: '8.7 Kayak (2,600 ratings)', price: 138, priceNote: 'cheapest rate seen; one site showed double that', good: 'Inside the Waterfront: we could walk to the New Year’s Eve party and the Robben Island ferry.', watch: 'Waterfront hotels are the first to sell out and the dearest in December.', src: [S('Kayak', 'https://www.kayak.co.uk/Cape-Town-Hotels-Radisson-RED-Hotel-V-A-Waterfront-Cape-Town.2948667.ksp')] },
        { name: 'The Winchester Hotel', area: 'Sea Point promenade', tier: 'nice', stars: '4–5★', score: '8.9–9.0 Kayak (about 1,700 reviews)', price: 170, priceNote: '“from” price', good: 'A classic seafront hotel right on the Sea Point promenade.', watch: 'Price is for ordinary weeks.', src: [S('The Winchester Hotel', 'https://www.safari.com/winchester-hotel')] },
        { name: 'Blackheath Lodge', area: 'Sea Point, a few streets up from the sea', tier: 'nice', stars: 'boutique guesthouse', score: '9.4 Kayak (450 reviews)', price: 200, priceNote: '“from” price; another site showed from about €140', good: 'Small, much-loved guesthouse with a pool.', watch: 'Few rooms — likely full over New Year already.', src: [S('Kayak', 'https://www.kayak.co.uk/Cape-Town-Hotels-Blackheath-Lodge.307179.ksp')] }
      ],
      wine: [
        { name: 'Le Ballon Rouge Guest House', area: 'Franschhoek village', tier: 'simple', stars: 'guesthouse', score: '8.6 Kayak (720 reviews)', price: 104, priceNote: 'cheapest rate seen', good: 'In the village, walking distance to restaurants and the wine tram.', watch: '', src: [S('Kayak', 'https://www.za.kayak.com/Franschhoek-Hotels-Le-Ballon-Rouge-Guest-House.643797.ksp')] },
        { name: 'Franschhoek Boutique Hotel', area: 'Franschhoek village', tier: 'good', stars: '4★', score: '8.6 Kayak (630 reviews)', price: 105, priceNote: '“from” price', good: 'Central and well reviewed.', watch: 'We did not see whether it has a pool — ask.', src: [S('Kayak', 'https://www.kayak.co.uk/Franschhoek-Hotels-Franschhoek-Boutique-Hotel.2502859.ksp')] },
        { name: 'Le Franschhoek Hotel & Spa', area: 'Edge of Franschhoek', tier: 'good', stars: '4★', score: '8.1–8.8 Kayak (1,430 reviews)', price: 114, priceNote: '“from” price', good: 'Resort-style with gardens and a spa.', watch: 'One reviewer says it used to be among the best but is showing its age.', src: [S('Kayak', 'https://www.kayak.co.uk/Franschhoek-Hotels-Le-Franschhoek-Hotel-Spa.154157.ksp')] },
        { name: 'Protea Hotel Franschhoek', area: 'Franschhoek main street', tier: 'good', stars: '4★', score: '9.0 Kayak (600 reviews)', price: 125, priceNote: '“from” price', good: 'Highest score of the mid-priced Franschhoek hotels we saw.', watch: '', src: [S('Kayak', 'https://www.ca.kayak.com/Franschhoek-Hotels-Protea-Hotel-by-Marriott-Franschhoek.162681.ksp')] },
        { name: 'Oude Werf Hotel', area: 'Old centre of Stellenbosch', tier: 'nice', stars: '4★', score: '9.0 Kayak (1,570 reviews) · 9.2 Expedia', price: 165, priceNote: 'lowest seen; average nearer €290', good: 'Historic hotel with an outdoor pool in the middle of town.', watch: 'Prices swing widely by date.', src: [S('Kayak', 'https://www.kayak.com/Stellenbosch-Hotels-Oude-Werf-Hotel.87895.ksp')] }
      ],
      hermanus: [
        { name: 'Windsor Hotel', area: 'Seafront, Hermanus centre', tier: 'simple', stars: '3★', score: '8.2 Kayak (1,730 reviews)', price: 82, priceNote: 'seen R1,430–1,670 for two', good: 'Old seafront hotel right on the cliff path.', watch: 'Ask for a sea-facing room; the others look at the street.', src: [S('Kayak', 'https://www.kayak.com/Hermanus-Hotels-Windsor-Hotel.159635.ksp')] },
        { name: 'Misty Waves Boutique Hotel', area: 'Seafront, Hermanus centre', tier: 'good', stars: '4★', score: '8.8–8.9 Kayak (1,500–1,800 reviews)', price: 109, priceNote: '“from” price', good: 'Consistently high scores across sites.', watch: '', src: [S('Kayak', 'https://www.kayak.ie/Hermanus-Hotels-Misty-Waves-Boutique-Hotel.162694.ksp')] },
        { name: 'Harbour House Hotel', area: 'Above the old harbour', tier: 'nice', stars: '4–5★', score: '8.5–8.7 Kayak (1,700–1,900 reviews)', price: 150, priceNote: '“from” price', good: 'Smart rooms a short walk from the harbour restaurants.', watch: 'Other sites show lower prices — compare.', src: [S('Kayak', 'https://www.kayak.com/Hermanus-Hotels-Harbour-House-Hotel.307220.ksp')] }
      ],
      plett: [
        { name: 'Milkwood Manor on Sea', area: 'On the Keurbooms lagoon mouth, by Lookout Beach', tier: 'good', stars: 'guesthouse', score: '9.0 Kayak (1,440 reviews)', price: 71, priceNote: '“from” price — likely far more in January', good: 'Right on the lagoon and beach; described as charming and fairly priced.', watch: 'The “from” price is for the quietest weeks.', src: [S('Kayak: Plettenberg Bay', 'https://www.kayak.com/Plettenberg-Bay-Hotels-The-Plettenberg-Hotel.93753.ksp')] },
        { name: 'Robberg Beach Lodge', area: 'Robberg Beach, a short walk to the sand', tier: 'good', stars: '4★', score: '8.8 Hotels.com (280 reviews)', price: 104, priceNote: 'one night seen, taxes included', good: 'Close to the lifeguarded Blue Flag stretch of Robberg Beach.', watch: '', src: [S('Expedia', 'https://www.expedia.co.nz/Plettenberg-Bay-Hotels-Robberg-Beach-Lodge-Lion-Roars-Hotels-Lodges.h3071656.Hotel-Information')] },
        { name: 'Bayview Hotel', area: 'Main Street, Plettenberg Bay centre', tier: 'good', stars: '4★', score: '8.6 Booking.com (355 reviews) · 8.0 Wotif', price: 106, priceNote: 'snapshot price', good: 'In the middle of town: restaurants at the door.', watch: 'Not on the beach — a walk or short drive down the hill.', src: [S('Wotif', 'https://wotif.co.nz/Plettenberg-Bay-Hotels-Bayview-Hotel.h11068393.Hotel-Information')] },
        { name: 'Christiana Lodge', area: 'Robberg Beach end, by the nature reserve', tier: 'nice', stars: 'boutique lodge', score: '4.8/5 Plek (118 reviews)', price: 128, priceNote: 'average for two', good: 'Quiet, small, with a pool and a path to the beach.', watch: 'A drive from the town centre.', src: [S('Plek', 'https://plek.co.za/products/christiana-lodge-plettenberg-bay-western-cape-south-africa')] },
        { name: 'Turbine Hotel & Spa', area: 'Thesen Island, Knysna (30 minutes from Plett)', tier: 'nice', stars: '5★', score: '9.0–9.1 Kayak (1,250 reviews)', price: 200, priceNote: 'standard room, May snapshot; summer is higher', good: 'A converted power station on the Knysna lagoon — if we prefer lagoon to open sea.', watch: 'No beach on the doorstep.', src: [S('Kayak', 'https://www.za.kayak.com/Knysna-Hotels-Turbine-Hotel-Spa.635756.ksp')] }
      ],
      addo: [
        { name: 'Addo Dung Beetle Guest Farm', area: 'Farmland near the park', tier: 'simple', stars: 'guest farm', score: '9.0 Kayak (840 reviews)', price: 70, priceNote: '“from” price', good: 'Guests usually stay two nights — exactly our plan.', watch: 'Check the drive to the main gate before booking.', src: [S('Kayak', 'https://www.kayak.com/Addo-Hotels-Addo-Dung-Beetle-Guest-Farm.380149.ksp')] },
        { name: 'Chrislin African Lodge', area: '9 km from the park', tier: 'good', stars: 'lodge with thatched huts', score: '8.8 Kayak (730 reviews)', price: 79, priceNote: '“from” price', good: 'Close to the gate, with a pool and dinners on site.', watch: '', src: [S('Kayak', 'https://www.kayak.com/Addo-Hotels-Chrislin-African-Lodge.501245.ksp')] },
        { name: 'Addo African Home', area: 'Addo village area', tier: 'good', stars: 'guesthouse', score: '8.7 Kayak (1,370 reviews)', price: 90, priceNote: 'weekend average', good: 'Many reviews and a steady score.', watch: '', src: [S('Kayak', 'https://www.kayak.com/Addo-Hotels-Addo-African-Home.2847678.ksp')] }
      ],
      kzn: [
        { name: 'Hilton Garden Inn Umhlanga Arch', area: 'Umhlanga, up the hill from the beach', tier: 'good', stars: '4★', score: '8.6 Hotels.com (112 reviews)', price: 83, priceNote: 'snapshot price', good: 'New, with shops and restaurants in the same complex.', watch: 'Not on the beach — a short Uber down to the promenade.', src: [S('Hotels.com', 'https://za.hotels.com/ho587129728/old-n-new-bed-and-breakfast-umhlanga-south-africa')] },
        { name: 'Canelands Beach Club', area: 'Salt Rock, near Ballito', tier: 'good', stars: '4★', score: '8.2–8.6 Booking.com', price: 106, priceNote: '“from” price; another site showed about €195', good: 'Right on a quieter stretch of beach.', watch: 'A car or Ubers needed for restaurants.', src: [S('Travelocity', 'https://www.travelocity.com/Umhlali-Beach-Hotels.d6143755.Travel-Guide-Hotels')] },
        { name: 'The Oyster Box', area: 'Umhlanga beachfront, by the lighthouse', tier: 'nice', stars: '5★', score: '9.4 HotelsCombined (1,600 ratings) · 9.6 Expedia', price: 226, priceNote: 'lowest room seen; the average is more than double', good: 'The grand old hotel of the coast, directly on the promenade.', watch: 'Far over budget on most nights — perhaps for afternoon tea instead.', src: [S('HotelsCombined', 'https://www.hotelscombined.co.uk/Hotel/The_Oyster_Box.htm')] }
      ]
    },

    entry: [
      { icon: '🇮🇪', t: 'Sophie — Irish passport', p: ['No visa needed. Ireland is on South Africa’s visa-free list: a stamp at the airport allows up to 90 days.', 'The Irish embassy says the passport needs at least two blank pages and must be valid at least 30 days after we leave; Ireland’s general travel advice says six months. Six months is the safe one. The passport card is not accepted.'], src: [src.dfaEmb, src.dfa, src.exempt] },
      { icon: '🇦🇹', t: 'Mohsey — Austrian passport, born in Iran', p: ['No visa needed either: Austrian citizens are stamped in for up to 90 days.', 'South Africa’s visa-free rule goes by the passport we travel on. There is no visa form, so place of birth is simply what the officer reads in the passport. We found no report of anyone born in Iran being refused or delayed on an EU passport — but no official source says so in as many words, and we could not open the Austrian foreign ministry page. A quick email to the South African embassy in Vienna would settle it.', 'Enter and leave on the Austrian passport only. Sources disagree on whether Iranian passport holders need a visa, so do not present the other one.'], src: [src.oeamtc, src.wko, src.exempt] },
      { icon: '🛫', t: 'Changing planes on the way', p: ['Dubai and Abu Dhabi: avoid. In April 2026 Emirates and flydubai said Iranian nationals may not enter or transit the UAE. A fact-check in September could not confirm the rule is still applied, and nobody says clearly whether it catches a person born in Iran with a European passport. Do not find out at the gate.', 'Doha: we found no such rule in Qatar. The airport reopened to all airlines after the April ceasefire; the Gulf airspace safety warning has been extended repeatedly, so schedule changes are more likely.', 'Istanbul, Frankfurt, Munich, Zurich, Amsterdam, Paris: nothing needed to change planes.', 'Addis Ababa: nothing needed to change planes, but keep the stop under 12 hours or South Africa asks for a yellow-fever certificate.'], src: [src.uae, src.uae2, src.uaeCheck, src.doha, src.easa, src.yf] },
      { icon: '📋', t: 'For both of you', p: ['Two completely blank passport pages each — South Africa is strict and airlines refuse boarding without them.', 'A return or onward ticket; we may be asked to show it.', 'The free online traveller declaration, filled in within 24 hours before the last flight to South Africa (and again before leaving). It is a customs form, not a visa. A missing one does not stop entry, but it slows us down.', 'The Electronic Travel Authorisation launched in August 2026 is for nationalities that need a visa. For visa-free visitors it is optional (R500). It is being extended in stages, so look once more a week before flying.'], src: [src.dfaEmb, src.govuk, src.sars, src.sars2, src.eta, src.etaGov] }
    ],

    mustDo: [
      { t: 'Check both passports: two blank pages and valid until at least July 2027', when: 'today', d: 'South Africa wants two empty pages for its stamps, and airlines check. Thirty days’ validity after departure is the rule, six months is the cautious advice. Renewing takes weeks.', src: [src.dfaEmb, src.dfa] },
      { t: 'Book flights that do not go through Dubai or Abu Dhabi', when: 'this week', d: 'Prices for the New-Year weeks only go up from here. Choose Istanbul, Addis Ababa (short stop), Frankfurt, Munich, Zurich, Amsterdam or Paris.', src: [src.uae] },
      { t: 'Ask the South African embassy in Vienna about a birthplace in Iran', when: 'this week', d: 'We expect the answer “no problem with an Austrian passport”, but we could not find it in writing. One email, and keep the reply on the phone.' },
      { t: 'Book the New-Year nights in Cape Town and the rental car', when: 'this week', d: '29 Dec to early January is the busiest week of the year. Rooms with free cancellation first; an automatic car with zero-excess cover.' },
      { t: 'Get international driving permits', when: 'by mid-December', d: 'Needed with the Austrian licence, and rental desks often ask everyone. Same day at ÖAMTC or ARBÖ; bring a passport photo and the plastic licence.', src: [src.idp] },
      { t: 'See a travel-medicine doctor', when: 'by 5 December', d: 'Hepatitis A and typhoid are the usual recommendations; check tetanus and measles are up to date. Some vaccines need two weeks to work. No malaria tablets for the Cape, Garden Route or Addo.', src: [src.fhi, src.cdc] },
      { t: 'Buy travel medical insurance', when: 'before paying for flights', d: 'Private hospitals ask for payment or an insurer’s guarantee up front. Make sure driving a rental car is covered.', src: [src.ins] },
      { t: 'Fill in the free online traveller declaration', when: '27–28 December', d: 'Within 24 hours before the flight into South Africa, on the tax office’s own site or app. It is free — a payment page means the wrong site.', src: [src.sars] }
    ],

    health: {
      intro: 'No vaccination is compulsory for flying to South Africa from Europe. These are the ones doctors recommend or discuss. We fly in under six weeks, so book a travel-medicine appointment this week — some vaccines need two weeks or more to work. This is general guidance, not medical advice for either of you personally.',
      rows: [
        { v: 'Routine vaccines up to date', who: 'Both of you', lvl: 'good', lbl: 'check', d: 'Tetanus, diphtheria, whooping cough, polio and measles-mumps-rubella. Bring the vaccination pass to the appointment.' },
        { v: 'Hepatitis A', who: 'Both of you', lvl: 'good', lbl: 'recommended', d: 'Listed as a standard travel vaccine for South Africa. Spread through food and water. One dose before travel protects for the trip.' },
        { v: 'Typhoid', who: 'Worth discussing', lvl: 'warn', lbl: 'depends', d: 'Commonly listed alongside hepatitis A. Hygiene in the places we plan to stay is good, so many doctors treat it as optional for this kind of trip. Needs about two weeks to take effect.' },
        { v: 'Rabies', who: 'Usually not needed', lvl: 'info', lbl: 'optional', d: 'South Africa has rabies, and there is a current outbreak among Cape fur seals on the west and south coasts. For a short holiday most doctors skip the vaccine: do not touch dogs, cats, monkeys, baboons or seals, and see a doctor at once after any bite or scratch.' },
        { v: 'Malaria tablets', who: 'Not needed on our routes', lvl: 'info', lbl: 'no', d: 'Cape Town, the Winelands, the Garden Route and Addo have no malaria. Tablets are only advised for Kruger and the far north-east (Limpopo, the Mozambique border), where October to May is high season. The game parks north of Durban are a low-risk zone — ask the doctor if we add one.' },
        { v: 'Yellow fever', who: 'Only with a long stop in Africa', lvl: 'warn', lbl: 'route', d: 'Not needed from Europe. South Africa asks for a certificate from anyone who spent more than 12 hours in transit in a yellow-fever country, which includes Ethiopia. With a short connection in Addis Ababa we do not need it; via Istanbul, Doha or Europe it never applies.' },
        { v: 'Sun', who: 'Both of you', lvl: 'warn', lbl: 'protect', d: 'The January sun in the Cape is fierce, and the wind hides how fast skin burns. SPF 50, hats and shade between 11 and 3; a long-sleeved swim shirt for the beach.' },
        { v: 'Tap water', who: 'Fine in Cape Town', lvl: 'good', lbl: 'drinkable', d: 'The city’s November 2026 report rates its tap water excellent. We did not find a report for the small Garden Route towns — ask the guesthouse, or use bottled water there.' },
        { v: 'Ticks and mosquitoes', who: 'Light precautions', lvl: 'info', lbl: 'repellent', d: 'Tick-bite fever is known from bush walks in the Cape. Repellent on ankles and a quick check after hikes are enough.' }
      ],
      src: [src.fhi, src.cdc, src.malaria, src.yf, src.tap]
    },

    saveTips: [
      'Shift the flight by a day or two: the same airline showed €905 for one week and €1,753 for the next.',
      'Stay in guesthouses or a flat in Sea Point or Green Point instead of a Waterfront hotel.',
      'Put the expensive seaside stop after 10 January, when the school holidays end and minimum stays disappear.',
      'Skip the car in Cape Town: Uber for the city, one rental day for the peninsula.',
      'Book the rental car now, return it where we collected it (no one-way fee), and buy excess cover at home instead of at the desk.',
      'Rooms with a kitchen: breakfast and a few suppers at home are easy — supermarkets are excellent and cheap.',
      'Drive ourselves through Addo rather than booking guided safaris, and pay R400 for a park guide to ride along.',
      'Buy Table Mountain tickets online (R475 instead of R530) and choose the free things: beaches, tidal pools, the Sea Point promenade, the Hermanus cliff path.',
      'Starting from Munich instead of Vienna can be cheaper: Lufthansa flies nonstop from there every day.'
    ],

    checklist: [
      { icon: '✈️', t: 'Book first', items: [
        { t: 'Search the real flight price for 28 Dec → 15 Jan', d: 'With one checked bag each, and not via Dubai or Abu Dhabi. Try ±2 days. Then type it into “Our prices”.' },
        { t: 'Decide: home on 15 Jan or 16 Jan?', d: 'Evening flights on the 15th land in Vienna on the 16th.' },
        { t: 'Book the Cape Town nights for 29 Dec – early January', d: 'Free cancellation, walking distance to the Waterfront or the Sea Point promenade.' },
        { t: 'Book the rental car', d: 'Automatic, small, zero excess, collected in town on the day we leave Cape Town.' },
        { t: 'Book the Garden Route rooms', d: 'Ask about minimum stays and secure parking.' },
        { t: 'Book Robben Island for our second or third day', d: 'So a cancelled ferry can be rebooked.' }] },
      { icon: '🛂', t: 'Papers', items: [
        { t: 'Check passports: two blank pages, valid until at least July 2027', d: '', src: [src.dfaEmb] },
        { t: 'Email the South African embassy in Vienna about a birthplace in Iran', d: 'Keep the answer on both phones.' },
        { t: 'International driving permits for both drivers', d: 'Plus the original plastic licences.', src: [src.idp] },
        { t: 'Fill in the online traveller declaration within 24 hours before flying', d: 'Free on the official site or app; again before flying home.', src: [src.sars] },
        { t: 'Print the return ticket, first hotel booking and insurance certificate', d: 'Immigration may ask for proof of onward travel.' }] },
      { icon: '💉', t: 'Health', items: [
        { t: 'Visit a travel clinic or the GP', d: 'Hepatitis A and typhoid are the usual topics; no malaria tablets for our routes.' },
        { t: 'Buy travel medical insurance', d: 'With a 24-hour emergency number and cover for driving a rental car.' },
        { t: 'Pack sunscreen SPF 50 and after-sun', d: 'The Cape sun in January is stronger than it feels in the wind.' }] },
      { icon: '📱', t: 'Phone and money', items: [
        { t: 'Install Uber and Bolt and add a card', d: '' },
        { t: 'Install an eSIM and download offline maps for the Western and Eastern Cape', d: 'Signal drops on stretches of the coast road.', src: [src.esim] },
        { t: 'Tell the bank we are travelling; bring two cards kept in different bags', d: 'Use cash machines inside banks or malls and refuse any help.', src: [src.atm] },
        { t: 'Collect small rand notes and coins on day one', d: 'For car guards, petrol attendants and tips.' }] },
      { icon: '👕', t: 'Clothes (hot days, cool windy evenings)', items: [
        { t: 'Summer clothes for 25–30 °C: T-shirts, shorts, dresses, linen', d: 'Pack for a week; guesthouses do laundry.' },
        { t: 'A fleece or light jumper and a windproof jacket each', d: 'Cape Town drops to 16 °C at night and the south-easter makes it feel colder. Needed on Table Mountain too.' },
        { t: 'Long trousers and one smarter outfit', d: 'For evenings, wine estates and New Year’s Eve.' },
        { t: 'Trainers or light hiking shoes with grip', d: 'For Robberg, the cliff paths and Cape Point.' },
        { t: 'Sandals or flip-flops', d: '' },
        { t: 'Sun hat that will not blow off, and sunglasses', d: 'A chin strap is not silly in Cape Town.' },
        { t: 'Neutral colours and binoculars if we go to Addo', d: '' },
        { t: 'Warm layers for the flight — and for Vienna on the way home', d: '' }] },
      { icon: '🏖️', t: 'Beach and sea', items: [
        { t: 'Two or three sets of swimwear each', d: '' },
        { t: 'Long-sleeved swim shirt', d: 'Sun protection, and a little warmth in cool water.' },
        { t: 'A thin wetsuit top or shorty, if we own one', d: 'Makes the Atlantic side and Hermanus properly swimmable.' },
        { t: 'Swim shoes', d: 'Tidal pools have rocky, slippery floors.' },
        { t: 'Beach towel or sarong and a small windbreak or beach tent', d: 'Guesthouses often lend towels; the wind is the real enemy.' },
        { t: 'Dry bag for boat trips', d: '' }] },
      { icon: '🔌', t: 'Electronics and documents', items: [
        { t: 'Two plug adapters for South Africa', d: 'Sockets take three large round pins (type M); newer ones also have a slim socket (type N) that accepts flat two-pin European phone chargers. Austrian earthed plugs and Irish three-pin plugs both need an adapter. Easier to buy at home or at the airport.' },
        { t: 'A short multi-socket strip', d: 'One adapter then charges everything.' },
        { t: 'Power bank and cables, and a phone holder for the car', d: 'Power banks go in hand luggage.' },
        { t: 'Passports plus photos of them on both phones', d: 'Leave the passports in the room safe; carry a copy.' },
        { t: 'Driving licences and international permits', d: '' }] },
      { icon: '💊', t: 'Small pharmacy', items: [
        { t: 'Regular medicines in original packaging, enough for the whole trip', d: 'In hand luggage with a copy of the prescription.' },
        { t: 'Painkillers, plasters, antiseptic, something for an upset stomach', d: 'Pharmacies in South Africa are well stocked if we forget.' },
        { t: 'Motion-sickness tablets', d: 'For the Robben Island ferry, boat trips and mountain passes.' },
        { t: 'Insect repellent and antihistamine cream', d: 'For bush walks and Addo evenings.' }] },
      { icon: '🎒', t: 'Bags and car habits', items: [
        { t: 'One checked suitcase each — check the ticket for the limit', d: 'Low-cost domestic flights charge for checked bags.' },
        { t: 'Soft bags that fit in a small car’s boot, out of sight', d: 'Nothing may stay on the seats when we park.' },
        { t: 'A small cross-body bag with a zip', d: 'For phone and cards in town.' },
        { t: 'Refillable water bottles', d: 'Tap water in Cape Town is fine.' }] }
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
