/* ============================================================================
   Sophie & Mohsey in the Philippines — ALL PRICES AND TEXT LIVE HERE.
   To update a price: change the number, commit, push. Vercel redeploys itself.
   Money is in EUR. "for2" = for both travellers. "pp" = per person.
   Research snapshot: 19 Nov 2026. 1 EUR ≈ 70 PHP (seen 70.1–70.6 in mid-November), 1 USD ≈ 0.88 EUR.
   ========================================================================== */
(function () {
  const S = (t, u) => ({ t, u });
  const src = {
    /* flights from Vienna */
    evaCeb: S('EVA Air fare page: Vienna–Cebu', 'https://flights.evaair.com/en/flights-from-vienna-to-cebu'),
    evaCebAt: S('EVA Air (Austria site): Vienna–Cebu', 'https://flights.evaair.com/en-at/flights-from-vienna-to-cebu'),
    evaMnl: S('EVA Air fare page: Vienna–Manila', 'https://flights.evaair.com/en/flights-from-vienna-to-manila'),
    evaPh: S('EVA Air: Austria to the Philippines', 'https://flights.evaair.com/en-at/flights-from-austria-to-philippines'),
    evaTimes: S('EVA flight BR282 Cebu–Taipei schedule', 'https://info.flightmapper.net/route/YY_CEB_TPE'),
    evaTimes2: S('EVA flight BR281 Taipei–Cebu times', 'https://ph.trip.com/flights/status-br281/'),
    ciCeb: S('China Airlines fare page: Vienna–Cebu', 'https://flights.china-airlines.com/de-at/flights-from-vienna-to-cebu'),
    sqCeb: S('Singapore Airlines fare page: Vienna–Cebu', 'https://www.singaporeair.com/en-sg/flights-from-vienna-to-cebu'),
    scoot: S('Scoot Vienna–Singapore schedule', 'https://info.flightmapper.net/route/Scoot_TR_VIE_SIN'),
    keCeb: S('Travelocity: Korean Air Vienna–Cebu', 'https://travelocity.com/lp/flight-routes/korean-air-from-vienna-intl-to-mactan-cebu-intl/ke/vie/ceb'),
    qrCeb: S('Qatar Airways: Vienna–Cebu', 'https://www.qatarairways.com/en/destinations/flights-to-cebu/from-vienna.html'),
    tkCeb: S('Turkish Airlines: Vienna–Cebu', 'https://www.turkishairlines.com/en-at/flights-from-vienna-to-cebu'),
    tkMnl: S('Turkish Airlines fare page: Vienna–Manila', 'https://www.turkishairlines.com/en/flights-from-vienna-to-manila'),
    eyPh: S('Etihad fare page: Austria–Philippines', 'https://www.etihad.com/en-at/flights/flights-from-austria-to-philippines'),
    kayakMnl: S('Kayak: Manila–Vienna', 'https://www.at.kayak.com/fl%C3%BCge/Manila-MNL/Wien-VIE'),
    stats: S('wohin-und-wann.de: Vienna–Manila price statistics', 'https://www.wohin-und-wann.de/flights/philippinen/manila/?city_from=wien'),
    checkfelix: S('checkfelix: Vienna–Manila by month', 'https://www.checkfelix.com/fl%C3%BCge/Wien-VIE/Philippinen-PH0'),
    skyCeb: S('Skyscanner: Vienna–Cebu', 'https://www.skyscanner.ie/routes/vie/ceb/vienna-to-mactan-cebu-international.html'),
    uae: S('Bloomberg: Emirates says Iranians barred from the UAE', 'https://www.bloomberg.com/news/articles/2026-04-01/emirates-says-iranians-barred-from-entering-the-uae'),
    uaeStar: S('Reuters via The Star: Emirates on Iranian nationals', 'https://www.thestar.com.my/news/world/2026/04/01/airline-emirates-says-iranian-nationals-barred-from-entering-or-transiting-uae'),
    uaeBorn: S('Ynet: people born in Iran could be affected', 'https://www.ynetnews.com/article/byegtifsze'),
    uaeWego: S('Wego: what we know about the UAE rule (Sept 2026)', 'https://blog.wego.com/did-uae-ban-iranian-nationals-from-entry-and-transit/'),
    /* getting around the islands */
    clark: S('PortCalls: Cebu Pacific turboprops move to Clark', 'https://portcalls.com/cebu-pacific-turboprop-flights-from-naia-all-moving-to-clark-by-march-29'),
    clarkMb: S('Manila Bulletin: turboprop flights moving to Clark', 'https://mb.com.ph/2026/01/22/all-cebu-pacific-turboprop-flights-moving-to-clark-by-march-29'),
    cebgo: S('Philstar: AirSWIFT flies as Cebgo from 1 July', 'https://www.philstar.com/business/banking/2026/06/16/2535435/airswift-flies-cebgo-starting-july-1'),
    cebgoHelp: S('Cebu Pacific: AirSWIFT becomes Cebgo', 'https://help.cebupacificair.com/article/air-swift-transitions-into-cebgo-operations-247334'),
    cebEni: S('Sunstar: Cebu–El Nido flights launched', 'https://www.sunstar.com.ph/cebu/cebu-pacific-launches-cebuel-nido-flights'),
    cebEniFare: S('Cebu–El Nido fares', 'https://zbordirect.com/en/low-cost/from-philippines/to-philippines/cebu-el-nido'),
    cebEniSky: S('Skyscanner: Cebu–El Nido', 'https://www.skyscanner.pk/routes/ceb/eni/mactan-cebu-international-to-el-nido.html'),
    eniCebRange: S('El Nido–Cebu fare range', 'https://www.ratepunk.com/flights-from-to/eni/ceb/cheap-flights-from-el-nido-palawan-to-cebu'),
    eniMph: S('Trip.com: Caticlan–El Nido fares', 'https://www.trip.com/flights/caticlan-to-el-nido/airfares-mph-eni/'),
    eniUsu: S('El Nido–Coron flights', 'https://www.directflights.com/ENI-USU'),
    lio: S('El Nido airport transfers', 'https://www.palawandays.com/catalog/transfers-to-el-nido-palawan-philippines/'),
    cebMph: S('Philippine Airlines: Cebu–Boracay', 'https://flights.philippineairlines.com/en-ph/flights-from-cebu-to-boracay-caticlan'),
    cebMphFc: S('Direct flights Cebu–Caticlan', 'https://www.flightconnections.com/flights-from-ceb-to-mph'),
    cebMphNews: S('InsiderPH: more flights from Cebu', 'https://insiderph.com/mcia-connects-to-more-destinations-with-airasia-cebu-pacific-flights'),
    borFees: S('Boracay entry rules and fees', 'https://www.respicio.ph/commentaries/updated-boracay-travel-requirements-and-entry-regulations-for-tourists'),
    borFeesMb: S('Manila Bulletin: Boracay fees', 'https://mb.com.ph/2025/1/30/mayor-frasco-misinformed-no-increase-in-boracay-fees'),
    borArrive: S('Caticlan airport to Boracay, step by step', 'https://tripwis.com/getting-from-caticlan-to-boracay/'),
    ipass: S('Boracay iPass (official)', 'https://boracayipass.ph/'),
    bohBor: S('Bohol to Boracay', 'https://myboracayguide.com/info/bohol-to-boracay'),
    bohBorR2r: S('Rome2rio: Panglao to Caticlan', 'https://www.rome2rio.com/s/Panglao/Caticlan'),
    oceanjet: S('OceanJet Cebu–Tagbilaran fares', 'https://pamasahe.com/routes/cebu-tagbilaran-oceanjet-schedule-fares'),
    oceanjetNews: S('Bohol Island News: OceanJet fuel surcharge', 'https://boholislandnews.com/2026/04/08/oceanjet-imposes-10-fuel-surcharge-tagbilaran-routes-affected/'),
    oceanjetHourly: S('OceanJet schedule changes', 'https://pamasahe.com/posts/oceanjet-updated-sailing-schedules-temporary-fare-adjustments'),
    ferryGuide: S('Cebu to Bohol ferry guide', 'https://bustickets.ph/oceanjet-cebu-to-bohol-ferry/'),
    cebPier: S('Cebu airport to the pier', 'https://3d-universal.com/en/blogs/how-to-get-from-cebu-airport-to-cebu-pier-1.html'),
    cebAirport: S('Getting from Cebu airport', 'https://www.geckoroutes.com/philippines/cebu-airport/'),
    cebCheap: S('Cheapest ways from Cebu airport', 'https://3d-universal.com/en/blogs/cheapest-way-to-get-from-cebu-airport-to-anywhere.html'),
    moalGov: S('Moalboal town: how to get there', 'https://moalboalcebu.gov.ph/how-to-get-there/'),
    moalRoute: S('Cebu to Moalboal', 'https://geckoroutes.com/philippines/cebu-to-moalboal/'),
    ppsVan: S('Puerto Princesa to El Nido', 'https://tripwis.com/getting-from-puerto-princesa-to-el-nido/'),
    ppsVan12: S('12go: Puerto Princesa–El Nido', 'https://12go.asia/en/travel/puerto-princesa/el-nido'),
    eniCoron: S('12go: El Nido–Coron ferries', 'https://12go.asia/en/travel/el-nido/coron?z=538355'),
    eniCoronP: S('Phimal fast ferry El Nido–Coron', 'https://pamasahe.com/routes/el-nido-coron-palawan-phimal-fast-ferry-schedule-fares'),
    eniCoronA: S('Atienza ferry Coron–El Nido', 'https://pamasahe.com/routes/coron-el-nido-atienza-interisland-ferries-schedule-fares'),
    eniCoronFs: S('Ferryscanner: Coron–El Nido', 'https://www.ferryscanner.com/en/ferry-routes/ferry-coron-port-busuanga-island-el-nido-palawan-island'),
    coronVan: S('Busuanga airport to Coron van', 'https://pamasahe.com/routes/busuanga-airport-coron-millennial-island-travelmate-schedule-fares'),
    coronVan2: S('Busuanga to Coron', 'https://goasia.cc/en/philippines/busuanga-to-coron'),
    cebuDirect: S('Context.ph: direct flights from Cebu', 'https://context.ph/2025/08/27/cebu-pacific-adds-direct-cebu-el-nido-flights-expands-domestic-reach/'),
    bag: S('InsiderPH: Cebu Pacific raises hand luggage to 10 kg', 'https://insiderph.com/cebu-pacific-raises-hand-carry-limit-to-10kg-starting-sept-15'),
    bagRules: S('Interaksyon: hand-luggage allowance', 'https://interaksyon.philstar.com/trends-spotlights/2026/09/11/319042/travelers-elated-reported-increase-hand-carry-allowance/'),
    otp: S('Sunstar: Cebu Pacific punctuality, April 2026', 'https://www.sunstar.com.ph/davao/business/cebu-pacific-tops-ph-carriers-in-april-punctuality'),
    gale: S('Manila Bulletin: gale warning strands holiday passengers', 'https://mb.com.ph/2026/01/04/pcg-holiday-sea-travelers-reach-59m-but-gale-warning-strands-passengers-in-several-areas'),
    ada: S('Manila Bulletin: storm Ada strands ferry passengers, Jan 2026', 'https://mb.com.ph/2026/01/16/td-ada-strands-44k-passengers-ocd-pcg-brace-for-heightened-mayon-mud-flow'),
    basyang: S('GMA: over 600 stranded in Cebu City, Feb 2026', 'https://www.gmanetwork.com/regionaltv/news/112770/trips-cancelled-due-to-basyangph-over-600-stranded-in-cebu-city/story'),
    kalmaegi: S('ITIJ: Typhoon Kalmaegi travel disruption', 'https://www.itij.com/latest/news/widespread-travel-disruption-typhoon-kalmaegi-hits-philippines'),
    panglaoTaxi: S('Panglao airport to Alona Beach', 'https://unchartedlens.com/routes/philippines/bohol-panglao-airport-to-alona-beach-transport/'),
    boholTransport: S('Getting around Bohol', 'https://3d-universal.com/en/blogs/transportation-in-bohol-jeepney-tricycle-taxi.html'),
    tagPanglao: S('Tagbilaran to Panglao', 'https://goasia.cc/en/philippines/tagbilaran-to-panglao'),
    scooter: S('Renting a motorbike as a foreigner', 'https://philippinestravelguides.com/?p=28984'),
    scooterTg: S('Top Gear PH: foreign licences', 'https://www.topgear.com.ph/features/tip-sheet/convert-foreign-drivers-license-philippine-license-guide-a4682-20251006-lfrm'),
    naia: S('Wego: Manila airport guide 2026', 'https://blog.wego.com/manila-airport-guide/'),
    naiaT: S('PortCalls: Manila terminal changes', 'https://portcalls.com/naia-adjusts-international-airline-terminal-assignments-from-march-29'),
    /* weather */
    wxJan: S('The Philippines in January', 'https://philippinestravelguides.com/?p=28721'),
    wxRough: S('Rough Guides: weather in January', 'https://www.roughguides.com/philippines/when-to-go/january/'),
    wxPalawan: S('Best time to visit Palawan', 'https://tripwis.com/best-time-to-visit-palawan/'),
    wxPalawan2: S('Best time to visit Palawan (2026)', 'https://travelguidestip.com/?p=12125'),
    wxBor: S('Best time to visit Boracay', 'https://tripwis.com/best-time-to-visit-boracay/'),
    wxBorKite: S('Kitesurfing at Boracay', 'https://locations.thekitespot.com/locations/kitesurf-boracay-island-philippines'),
    wxBorJan: S('Boracay weather in January', 'https://travelguidestip.com/best-time-to-visit-boracay/'),
    wxBohol: S('Alona Beach weather in January', 'https://beach-weather.com/South-Eastern-Asia/Philippines/Visayas/Bohol-Island/Panglao-Island/averages/Alona-Beach/January/'),
    wxBohol2: S('Bohol in January', 'https://bohol-philippines.com/things-to-do-in-bohol-in-january/'),
    wxSiargao: S('Best time to visit Siargao', 'https://girlonazebra.com/best-time-to-visit-siargao/'),
    wxSiargao2: S('Siargao weather in January', 'https://bestdateweather.com/us/siargao-weather-january'),
    /* hotels, prices, activities */
    kayakBor: S('Kayak: Boracay hotels', 'https://www.kayak.com/Boracay-Hotels.52220.hotel.ksp'),
    kayakEni: S('Kayak: El Nido hotels', 'https://www.kayak.com/El-Nido-Hotels.43056.hotel.ksp'),
    kayakCoron: S('Kayak: Coron hotels', 'https://www.kayak.com/Coron-Hotels.42559.hotel.ksp'),
    hcMoal: S('HotelsCombined: Moalboal', 'https://www.hotelscombined.ae/Place/Moalboal.htm'),
    borStay: S('Where to stay in Boracay 2026', 'https://travelguidestip.com/where-to-stay-in-boracay/'),
    borStay2: S('Best areas to stay on Boracay', 'https://destinationlesstravel.com/where-to-stay-on-boracay-the-philippines/'),
    gala: S('Crimson Boracay: compulsory New Year gala', 'https://luxuryescapes.com/us/offer/crimson-resort-and-spa-boracay-philippines/0062y000002zUfDAAU'),
    gala2: S('Henann Park Boracay booking page', 'https://reservations.henann.com/henann-park-resort-boracay'),
    borNye: S('Christmas and New Year on Boracay', 'https://myboracayguide.com/info/christmas-and-newyears-on-boracay'),
    borActs: S('Boracay activities and prices', 'https://myboracayguide.com/boracay-activities'),
    borParaw: S('Paraw sailing on Boracay', 'https://myboracayguide.com/boracay/activities/boracay-paraw-sailing'),
    borThings: S('Things to do on Boracay', 'https://tripwis.com/things-to-do-in-boracay/'),
    borCost: S('Cost to visit Boracay 2026', 'https://www.jetsetteralerts.com/cost-to-visit-boracay/'),
    borRules: S('GMA: smoking and drinking banned on White Beach', 'https://www.gmanetwork.com/news/topstories/regions/665776/smoking-drinking-to-be-banned-in-boracay-rsquo-s-public-areas-white-beach/story/'),
    borMistakes: S('Boracay mistakes to avoid', 'https://www.thepoortraveler.net/boracay-mistakes/'),
    borScam: S('Boracay scam guide 2026', 'https://tabiji.ai/scams/boracay/'),
    eniTours: S('El Nido: the four tours', 'https://suroy.ph/el-nido-travel-guide/'),
    eniTours2: S('El Nido tour prices 2026', 'https://nashaplaneta.net/vopros-otvet/6396-skolko-stoyat-tury-po-ostrovam-v-el-nido-na-palavane-v-2026-godu_en'),
    eniTours3: S('El Nido tours A–D', 'https://wayph.com/package/palawan/el-nido/island-hopping'),
    eniCancel: S('El Nido when island hopping is cancelled', 'https://wayph.com/12-activities-in-el-nido-when-island-hopping-is-canceled'),
    eniStay: S('Where to stay in El Nido', 'https://explorertom.com/en/where-to-stay-el-nido-area/'),
    eniStay2: S('El Nido stays (updated Sept 2026)', 'https://backpackingislife.com/where-to-stay-in-el-nido/'),
    eniFood: S('GMA: El Nido bans cooking on island tours', 'https://www.gmanetwork.com/news/topstories/regions/871052/el-nido-bans-cooked-to-order-food-services-in-island-hopping/story'),
    eniWater: S('Palawan Daily News: El Nido water quality', 'https://palawandailynews.com/provincial-news/el-nido-faces-possible-six-month-closure-amid-rising-coliform-contamination/amp'),
    eniPlastic: S('Rappler: El Nido bans plastic bottles on tours', 'https://www.rappler.com/nation/212833-el-nido-palawan-plastic-bottles-ban-now-in-effect'),
    eniVsCoron: S('Coron vs El Nido', 'https://theworldtravelguy.com/coron-vs-el-nido-which-is-better-all-the-differences-explained/'),
    eniVsCoron2: S('Coron vs El Nido compared', 'https://www.journeyera.com/coron-vs-el-nido/'),
    coronTour: S('Coron super ultimate tour', 'https://psalmstravel.rezio.shop/product/SUPER'),
    coronTour2: S('Coron island lagoons', 'https://goasia.cc/en/article/coron-island-lagoons-palawan'),
    coronPriv: S('Coron private boat tour', 'https://www.wotif.com/things-to-do/private-boat-tour-guide-for-coron-island-ultimate-tour.a48225268.activity-details'),
    bohTour: S('GoPanglao: Bohol countryside tour', 'https://gopanglao.rezio.shop/product/GPCOUNTRYSIDEPRIVATECGPWEBSITE'),
    bohTour2: S('Bohol countryside tour costs', 'https://bohol-philippines.com/bohol-countryside-atv/'),
    bohHop: S('GoPanglao: shared island hopping', 'https://gopanglao.rezio.shop/product/GPISLANDSHAREDGPWEBSITE'),
    bohHop2: S('Bohol island-hopping guide', 'https://bohol-philippines.com/bohol-island-hopping-guide/'),
    bohBeach: S('Panglao beaches compared', 'https://nashaplaneta.net/asia/philippines/bohol-ostrov-panglao-pliaji_en'),
    bohBeach2: S('12go: Panglao beaches', 'https://12go.asia/en/philippines/panglao/beaches'),
    moalSnork: S('Shore snorkelling in Cebu and Bohol', 'https://suroy.ph/shore-entry-snorkeling-cebu-bohol/'),
    moalGuide: S('Moalboal guide', 'https://pack-lightly.com/philippines/moalboal/'),
    whale: S('Sunstar: Oslob whale sharks at risk?', 'https://www.sunstar.com.ph/cebu/saving-oslobs-tourism-are-we-putting-endangered-whale-sharks-at-risk'),
    whale2: S('Oceanographic: whale-shark tourism in Pintuyan', 'https://oceanographicmagazine.com/features/holding-the-line-how-long-can-pintuyan-s-whale-shark-tourism-remain-ethical/'),
    lechon: S('Cebu lechon prices', 'https://suroy.ph/cebu-lechon/'),
    cebuFood: S('Ten foods to eat in Cebu', 'https://sethlui.com/top-cebu-foods-philippines/'),
    cebuSafe: S('Is Cebu safe?', 'https://3d-universal.com/en/blogs/is-cebu-safe-crime-rates-and-safety-tips-by-area.html'),
    cebuWarn: S('Cebu City warnings and dangers', 'https://www.smartertravel.com/tips-cebu-city-warnings-dangers-stay-safe/'),
    cebuNye: S('Sunstar: peaceful welcome to 2026 in Cebu', 'https://www.sunstar.com.ph/cebu/pro-7-reports-peaceful-incident-free-welcome-to-2026'),
    cebuNye2: S('Sunstar: Cebu limits fireworks sales', 'https://www.sunstar.com.ph/cebu/cebu-lapu-lapu-limit-fireworks-sales'),
    sinulog: S('Where to stay in Cebu for Sinulog', 'https://3d-universal.com/en/blogs/where-to-stay-in-cebu-for-sinulog-festival.html'),
    sinulogRoads: S('Cebu Daily News: Sinulog road closures', 'https://cebudailynews.inquirer.net/616961/sinulog-2025-road-closures-in-cebu-city-to-watch-out-for/amp'),
    bookScam: S('Sunstar: online booking scams in Cebu', 'https://www.sunstar.com.ph/cebu/central-visayas-loses-p1m-to-online-booking-scams'),
    bookScam2: S('Manila Bulletin: campaign against booking scams', 'https://mb.com.ph/2026/03/24/dot-7-launches-campaign-vs-online-booking-scams'),
    overcharge: S('Sunstar: tourist overcharged on Mactan island tour', 'https://www.sunstar.com.ph/cebu/tourist-overcharged-in-lapu-lapu-island-tour'),
    /* money, phone, entry, health */
    atm: S('Cash and ATMs in the Philippines', 'https://atmfeesaver.com/?p=9316'),
    atmWise: S('Wise: ATMs in the Philippines', 'https://wise.com/gb/blog/atms-in-the-philippines'),
    cash: S('Cash or cards in the Philippines', 'https://philippinestravelguides.com/?p=29372'),
    cash2: S('Money in the Philippines', 'https://backpackmoments.com/money-in-the-philippines/'),
    tipping: S('Tipping in the Philippines', 'https://philippinestravelguides.com/?p=29382'),
    sim: S('Saily: SIM cards at Philippine airports', 'https://saily.com/en/blog/philippines-airport-sim-card/'),
    simReg: S('SIM registration for foreigners', 'https://www.expatden.com/philippines/sim-registration-philippines-foreigners/'),
    rate: S('EUR/PHP exchange rate', 'https://www.exchange-rates.org/converter/eur-php/10'),
    plugs: S('Plugs and voltage in the Philippines', 'https://www.worldstandards.eu/electricity/plug-voltage-by-country/philippines/'),
    plugsIe: S('Adapter guide Ireland–Philippines', 'https://plugsabroad.pages.dev/travel-guides/from-ireland-to-philippines'),
    ins: S('Stiftung Warentest: travel health insurance compared', 'https://www.test.de/Auslandskrankenversicherung-der-grosse-Vergleich-4848150-5461242/'),
    insAt: S('Wiener Städtische: travel health insurance leaflet', 'https://www.wienerstaedtische.at/fileadmin/user_upload/Dokumente/Online-Abschluesse/Flugblatt_AuslandsreiseKrankenversicherung_TarifRVA.pdf'),
    dfaIe: S('Irish Department of Foreign Affairs: the Philippines', 'https://dfa.ie/travel/travel-advice/a-z-list-of-countries/the-philippines/'),
    oeamtc: S('ÖAMTC country information: Philippines', 'https://www.oeamtc.at/laenderinfo/philippinen/fuer-die-philippinen-16321684/print'),
    visaList: S('Philippine embassy: visa-free entry countries', 'https://kuwaitpe.dfa.gov.ph/80-consular-services/751-visa-free-entry-countries'),
    visaIran: S('Philippine embassy Jakarta: who needs a visa', 'https://jakartape.dfa.gov.ph/consular-services/visa/general-information-about-visa'),
    visaTehran: S('Philippine embassy Tehran: visa information', 'https://tehranpe.dfa.gov.ph/visa-general-information'),
    iran2000: S('Philstar (2000): Iranians to undergo scrutiny', 'https://philstar.com/metro/2000/12/27/106896/iranians-undergo-bi-scrutiny'),
    etravel: S('Philippine News Agency: eTravel is free', 'https://alpha.pna.gov.ph/articles/1218844'),
    etravelFake: S('Inquirer: fake eTravel sites', 'https://newsinfo.inquirer.net/?p=1905244'),
    etravelGuide: S('eTravel guide 2026', 'https://suroy.ph/philippines-etravel-2026-guide/'),
    cdc: S('US CDC: the Philippines', 'https://wwwnc.cdc.gov/travel/destinations/traveler/extended_student/philippines'),
    fitfor: S('NHS Fit for Travel: Philippines', 'https://www.fitfortravel.nhs.uk/destinations/asia-east/philippines'),
    fhi: S('Norwegian Institute of Public Health: Philippines', 'https://www.fhi.no/en/in/travel/traveladvice-vaccines/asia/philippines/'),
    thp: S('TravelHealthPro: Philippines', 'https://travelhealthpro.org.uk/countries/philippines'),
    pasteur: S('Institut Pasteur: Philippines', 'https://www.pasteur.fr/en/node/1696'),
    wanda: S('Wanda (Belgian travel medicine): Philippines', 'https://www.wanda.be/en/landen/philippines/'),
    malariaPal: S('Palawan Daily News: malaria checks for travellers', 'https://palawandailynews.com/health/health-authorities-urge-travelers-for-malaria-checks/'),
    dengue: S('Daily Tribune: dengue down 33% but rising again', 'https://tribune.net.ph/2026/09/22/dengue-cases-down-33-but-recent-infections-rise'),
    dengueCebu: S('Philstar: dengue in Cebu, Aug 2026', 'https://www.philstar.com/cebu-sports/2026/08/07/2547622/dengue-cases-rise-68-percent')
  };

  window.TRIP = {
    meta: {
      key: 'philippines', title: 'Sophie & Mohsey in the Philippines', heroTitle: 'Sophie & Mohsey\nin the Philippines', country: 'Philippines', emoji: '🏝️', status: 'idea',
      home: 'Vienna', homeAirport: 'VIE', hub: 'cebu', hubAirport: 'CEB', d0: '2026-12-29', d1: '2027-01-15',
      skipActs: ['parasail', 'helmet', 'dive', 'privboat', 'coronpriv', 'kawasan', 'mactanhop'], galaPlace: 'boracay',
      updatedHuman: '19 Nov 2026', eurPhp: 70, budgetMin: 4000, budgetMax: 5000,
      peak: { from: '2026-12-23', to: '2027-01-03' }, bestFlight: 'eva-ceb', openJaw: {}, shopping: 150, reservePct: 5, visaDefault: false, recommended: 'C',
      lede: 'Seventeen nights of warm sea, white sand and island life. Here is every route we could take, what each one costs, and a calculator to shape our own.',
      recWhy: 'New Year on Bohol, where rooms cost less and there are hills, rivers and tarsiers to see; then ten nights on Boracay’s calm White Beach once the holiday prices have dropped; then two easy nights by the airport in Cebu. One ferry, two short flights, and no rushing for the plane home.'
    },

    headlines: [
      { icon: '✈️', t: 'Flights: about €2,150 for two', d: 'No airline flies Vienna–Philippines nonstop. We fly into Cebu, in the middle of the islands. The best-evidenced fare is EVA Air via Taipei: €1,066 each was shown for 26 Dec → 15 Jan, so about €2,150 for two. Flying to Manila instead was shown at €985 each, but then every island needs an extra flight.' },
      { icon: '🌊', t: 'Pick the sheltered side in January', d: 'A steady north-east wind blows from December to February. Boracay’s White Beach sits out of it and stays flat and warm (26–27 °C). El Nido and Coron are dry and stunning but windy, and boat tours are sometimes called off. Bohol is warm and swimmable with more showers. Siargao is in its rainy season — we left it out.' },
      { icon: '🎆', t: 'New Year on the famous beaches is pricey', d: 'Until about 3 January, Boracay and El Nido charge their highest prices of the year, and Boracay resorts add a compulsory gala dinner on 31 Dec (about €105 per adult at one resort). Spending New Year on Bohol or in Cebu avoids most of it.' },
      { icon: '🛂', t: 'No visa needed — with one thing to check', d: 'Irish and Austrian passports get 30 days free on arrival; we only fill in the free eTravel form. The Philippines does ask Iranian citizens for a visa in advance, so Mohsey must travel on the Austrian passport, and we should get a short written OK from the Philippine embassy first. Avoid flights via Dubai or Abu Dhabi. Details on the Checklist page.' },
      { icon: '🛬', t: 'You land back in Vienna on 16 Jan', d: 'The flight home leaves Cebu around midday on 15 Jan and reaches Vienna the next morning. That midday departure is also why every route ends with nights on or near Cebu — you cannot come from Boracay or Palawan the same morning.' },
      { icon: '🧮', t: 'The honest total is a little above €5,000', d: 'With good mid-range hotels the recommended route comes to about €5,300–5,700 for two; flights are 40% of it. With simple, well-reviewed hotels and mostly local food it is about €4,600–4,900. Bohol alone, or Cebu island plus Bohol with no extra flights, fits the budget most easily. Try the “Ways to pay less” buttons in the calculator.' }
    ],

    places: {
      cebu: { name: 'Cebu City & Mactan', short: 'Cebu', emoji: '🏙️', beach: false, swim: 2,
        blurb: 'Our arrival airport. Old churches and a fort in town, pool resorts on Mactan ten minutes from the terminal.',
        hotel: { budget: 35, mid: 60, nice: 120 }, peakMult: 1.2, food: { local: 16, mixed: 28, tourist: 50 }, localPerDay: 8,
        hotelNote: 'Estimates built from a handful of listed prices (about €75–165 for the Mactan resorts we saw). Stay on Mactan for a pool and a five-minute airport ride, or in the city for sights and food. Around the Sinulog festival (mid-January) city hotels fill up and prices rise.', foodNote: 'Our own estimate: local eateries and food courts, with a roast-pork (lechon) dinner or two.', localNote: 'Grab rides. Airport to the city is about €4–6.',
        wx: { air: 'About 24–30 °C', rain: 'Mostly dry season, with passing showers', sea: 'Mactan resorts have small man-made beaches and pools; the real swimming is on the other islands' }, src: [src.cebAirport, src.cebuSafe, src.wxJan] },
      bohol: { name: 'Bohol (Panglao island)', short: 'Bohol', emoji: '🐒', beach: true, swim: 4,
        blurb: 'Beach base with real countryside behind it: Chocolate Hills, tiny tarsiers, a jungle river, turtles at Balicasag.',
        hotel: { budget: 40, mid: 70, nice: 150 }, peakMult: 1.35, food: { local: 20, mixed: 34, tourist: 60 }, localPerDay: 8,
        hotelNote: 'Estimates from listed prices: a 3★ on Alona Beach from about €40, good 4★ resorts €100–130, the big 5★ about €150. Alona is lively; Dumaluan is wider and quieter. The New-Year mark-up is our estimate.', foodNote: 'Our own estimate: breakfast at the hotel, simple Filipino lunch, grilled fish for dinner. Beachfront restaurants on Alona cost clearly more than one street back.', localNote: 'Tricycles have no meters — agree the price first.',
        wx: { air: '24–28 °C', rain: 'Mixed: about 100 mm in January, some rain on roughly 4 days in 10, usually short', sea: 'About 27 °C and mostly calm. Very low tides leave some beaches too shallow to swim for a few hours.' }, src: [src.wxBohol, src.wxBohol2, src.bohBeach] },
      moalboal: { name: 'Moalboal (south-west Cebu)', short: 'Moalboal', emoji: '🐢', beach: true, swim: 4,
        blurb: 'Laid-back dive village: millions of sardines and sea turtles a few fin-kicks from the shore, waterfalls nearby.',
        hotel: { budget: 30, mid: 55, nice: 115 }, peakMult: 1.2, food: { local: 18, mixed: 30, tourist: 50 }, localPerDay: 5,
        hotelNote: 'From listed prices: well-reviewed small hotels €37–55, the nicest resort about €115. Panagsama is the village with the sardines but hardly any sand; White Beach, 15 minutes north, has the sand.', foodNote: 'Our own estimate; lots of small cafés and grills.', localNote: 'Walkable; tricycle to White Beach.',
        wx: { air: 'About 25–30 °C', rain: 'We found no January figures for Moalboal itself — expect it to be like Cebu: warm with passing showers', sea: 'Warm; it lies on Cebu’s sheltered west side. The reef drops off steeply right at the shore — good for snorkelling, less for paddling.' }, src: [src.hcMoal, src.moalSnork, src.moalGuide] },
      boracay: { name: 'Boracay', short: 'Boracay', emoji: '🏖️', beach: true, swim: 5,
        blurb: 'Four kilometres of powder-white sand and flat turquoise water, sunsets, restaurants on the beach path.',
        hotel: { budget: 45, mid: 90, nice: 170 }, peakMult: 1.6, food: { local: 24, mixed: 40, tourist: 70 }, localPerDay: 5,
        hotelNote: 'Estimates: comparison sites give about €90–100 as the island average, and a good resort near the beach about €100. Station 1 is the quiet, wide end; Station 2 is the busy middle; Station 3 is the cheaper end. The New-Year mark-up (+60%) is our estimate — real rates for 29 Dec–2 Jan may be higher or sold out.', foodNote: 'Our own estimate. Eating inland or in the small food courts is far cheaper than on the beach path.', localNote: 'Electric tricycles along the one main road; most of the time we walk.',
        wx: { air: '25–30 °C', rain: 'Dry season: about 45 mm in January, around six days with some rain', sea: '26–27 °C. White Beach is sheltered from the north-east wind and stays calm; Bulabog Beach on the other side gets 15–25 knots and belongs to the kitesurfers.' }, src: [src.kayakBor, src.wxBor, src.wxBorKite, src.borStay] },
      elnido: { name: 'El Nido (Palawan)', short: 'El Nido', emoji: '⛰️', beach: true, swim: 3,
        blurb: 'Limestone cliffs, hidden lagoons and island-hopping boats. The scenery of the trip — best seen from a boat.',
        hotel: { budget: 45, mid: 80, nice: 170 }, peakMult: 1.4, food: { local: 24, mixed: 38, tourist: 65 }, localPerDay: 7,
        hotelNote: 'Estimates from listed prices: simple hotels from about €45, town hotels with a pool €65–80; the comparison-site average for a double is far higher (about €170) because of the luxury resorts. Corong-Corong is quieter than the town and has the sunsets. The New-Year mark-up is our estimate.', foodNote: 'Our own estimate. Many good small restaurants; eat cooked food and drink bottled or filtered water.', localNote: 'Tricycles between town, Corong-Corong and Lio.',
        wx: { air: '25–31 °C', rain: 'Dry season, little rain', sea: 'Warm, but January is the windiest month: choppy crossings, and boat tours can be cancelled even under blue sky. The town beach is not for swimming; the good beaches are a tricycle or boat ride away.' }, src: [src.kayakEni, src.wxPalawan, src.wxPalawan2, src.eniStay] },
      coron: { name: 'Coron (Palawan)', short: 'Coron', emoji: '🤿', beach: false, swim: 3,
        blurb: 'Clear lakes between cliffs, the best snorkelling of the trip, Japanese shipwrecks. A small harbour town with no beach of its own.',
        hotel: { budget: 35, mid: 70, nice: 140 }, peakMult: 1.3, food: { local: 22, mixed: 36, tourist: 60 }, localPerDay: 6,
        hotelNote: 'Estimates from listed prices: small hotels with a pool from about €40, the best-reviewed ones €80–135. Every swim here starts with a boat trip. The New-Year mark-up is our estimate.', foodNote: 'Our own estimate.', localNote: 'Tricycles in town; boats are in the activities.',
        wx: { air: '25–31 °C', rain: 'Dry season, little rain', sea: 'Warm and very clear. The same north-east wind as El Nido can make the open-sea crossings rough.' }, src: [src.kayakCoron, src.eniVsCoron, src.wxPalawan] }
    },

    /* pp = per person return incl. checked bag. ev: 'near' = seen on an airline fare page for close dates; 'est' = estimate. */
    flights: [
      { id: 'eva-ceb', airline: 'EVA Air', route: 'VIE–CEB', via: 'Taipei (some days also Bangkok)', stops: 1, durOut: 21, durBack: 26, arr: 'cebu', dep: 'cebu', pp: { low: 1000, typ: 1070, high: 1250 }, ev: 'near', bag: 'Checked bag normally included — confirm on the fare you pick.', arrive: 'lands Cebu about 10:50 on 29 Dec; home in Vienna on 16 Jan', note: 'Seen on EVA’s own page: €1,066 for 26 Dec–15 Jan, and €768 for late November, so the New-Year premium is about €300. The Cebu–Taipei flight was listed for about 12:05, and one timetable shows it on Mon, Tue, Thu, Sat and Sun only — 15 Jan is a Friday, so check the day when booking.', src: [src.evaCeb, src.evaCebAt, src.evaTimes, src.evaTimes2] },
      { id: 'ci-ceb', airline: 'China Airlines', route: 'VIE–CEB', via: 'Taipei (nonstop from Vienna)', stops: 1, durOut: 22, durBack: 26, arr: 'cebu', dep: 'cebu', pp: { low: 1000, typ: 1150, high: 1400 }, ev: 'est', bag: 'Bag normally included.', arrive: 'check the itinerary', note: 'Its fare page shows “from €903”, and €990 for late February; no New-Year price was shown, so this is an estimate. The same kind of route as EVA.', src: [src.ciCeb] },
      { id: 'sq-ceb', airline: 'Scoot / Singapore Airlines', route: 'VIE–CEB', via: 'Singapore (nonstop from Vienna)', stops: 1, durOut: 20, durBack: 22, arr: 'cebu', dep: 'cebu', pp: { low: 1100, typ: 1250, high: 1500 }, ev: 'est', bag: 'On Scoot, bags, meals and seats can cost extra — compare like with like.', arrive: 'check the itinerary', note: 'Singapore Airlines’ page shows Vienna–Cebu “from €1,173” for dates between mid-November and January, without naming the days. The Vienna flight is Scoot and runs about four days a week.', src: [src.sqCeb, src.scoot] },
      { id: 'ke-ceb', airline: 'Korean Air', route: 'VIE–CEB', via: 'Seoul', stops: 1, durOut: 21, durBack: 24, arr: 'cebu', dep: 'cebu', pp: { low: 1100, typ: 1300, high: 1600 }, ev: 'est', bag: 'Bag normally included.', arrive: 'check the itinerary', note: 'Only an undated US-dollar listing was found (USD 1,220–1,335). An estimate until we search the real dates.', src: [src.keCeb] },
      { id: 'tk-ceb', airline: 'Turkish Airlines', route: 'VIE–CEB', via: 'Istanbul (possibly also Manila)', stops: 1, durOut: 20, durBack: 22, arr: 'cebu', dep: 'cebu', pp: { low: 950, typ: 1200, high: 1500 }, ev: 'est', bag: 'Check that your fare includes a bag.', arrive: 'usually lands 16 Jan', note: 'Turkish lists Vienna–Cebu but showed no price. To Manila it showed “from €798–876” for off-peak dates. Could turn out cheapest — worth one real search.', src: [src.tkCeb, src.tkMnl] },
      { id: 'qr-ceb', airline: 'Qatar Airways', route: 'VIE–CEB', via: 'Doha', stops: 1, durOut: 20, durBack: 22, arr: 'cebu', dep: 'cebu', pp: { low: 1050, typ: 1300, high: 1600 }, ev: 'est', bag: 'Usually 25 kg; check the cheapest fare.', arrive: 'usually lands 16 Jan', note: 'Qatar sells Vienna–Cebu with a change in Doha, but showed no fare for our dates. We found no Doha rule about travellers born in Iran — still ask the airline before paying.', src: [src.qrCeb] },
      { id: 'ek-ceb', avoid: true, airline: 'Emirates', route: 'VIE–CEB', via: 'Dubai', stops: 1, durOut: 20, durBack: 22, arr: 'cebu', dep: 'cebu', pp: { low: 1000, typ: 1250, high: 1500 }, ev: 'est', bag: 'Bag usually included.', arrive: 'usually lands 16 Jan', note: 'No fare found. Not advised for you: since April 2026 Emirates has said Iranian nationals may not enter or transit the UAE, and one report says this can hit people born in Iran who hold European passports.', src: [src.uae, src.uaeBorn] },
      { id: 'ey-ceb', avoid: true, airline: 'Etihad', route: 'VIE–MNL, then a separate flight to Cebu', via: 'Abu Dhabi and Manila', stops: 2, durOut: 24, durBack: 26, arr: 'cebu', dep: 'cebu', pp: { low: 950, typ: 1150, high: 1450 }, ev: 'est', bag: 'The cheapest fare may have no checked bag.', arrive: 'check the itinerary', note: '€711 to Manila was shown for late November; no New-Year price. Not advised for you: it changes planes in Abu Dhabi, where the same UAE rule about Iranian nationals applies.', src: [src.eyPh, src.uaeStar] }
    ],

    flightAlt: [
      { t: 'Flying to Manila instead of Cebu.', d: 'EVA showed €985 each for 21 Dec–15 Jan, about €80 less than Cebu, and comparison sites name Air China via Beijing as the cheapest to Manila (from €606 off-peak, no New-Year price seen). But Manila is not a beach stop, each island then needs a €60–70 flight each way, and the small planes to El Nido and Coron no longer leave from Manila at all — they moved to Clark airport, two to three hours north.', src: [src.evaMnl, src.kayakMnl, src.clark] },
      { t: 'Philippine Airlines', d: 'does not fly to Vienna itself; it sells the route with partner airlines. No fare from Vienna was found.', src: [S('Philippine Airlines: flights to Vienna', 'https://flights.philippineairlines.com/ko-ph/flights-to-vienna')] },
      { t: 'Cathay Pacific, Lufthansa group and the Chinese airlines:', d: 'we found no fare from Vienna to Cebu with any of them. If a search engine offers one, check where it changes planes and whether the bag is checked through.' },
      { t: 'Flying home from a different island.', d: 'Not used in any route here: Cebu is the only island on our list with flights towards Europe, apart from Manila.' }
    ],

    flightNotes: [
      { icon: '⚠️', t: 'These are not bookable quotes.', d: 'Only the EVA price was seen on an airline page for dates close to ours; all the others are estimates. Search your exact dates once and type the real price into “Our prices”.' },
      { icon: '🛬', t: 'Arrival day:', d: 'the flight home leaves Cebu around midday on 15 Jan and lands in Vienna on the morning of 16 Jan. To be home on the 15th you would have to leave on the 14th.' },
      { icon: '📆', t: 'Check which days the Cebu flight runs.', d: 'One timetable lists EVA’s Cebu–Taipei flight only on Mon, Tue, Thu, Sat and Sun this winter; another says daily. 15 Jan 2027 is a Friday. If it does not run, the 14th or the 16th will be offered instead.', src: [src.evaTimes] },
      { icon: '🚫', t: 'Dubai and Abu Dhabi:', d: 'in April 2026 Emirates, Etihad and flydubai said Iranian nationals may not enter or transit the UAE, and one report says people born in Iran can be affected even on European passports. A September summary could not confirm that the rule is still in force — so unless the airline confirms in writing, choose another route.', src: [src.uae, src.uaeBorn, src.uaeWego] },
      { icon: '🛫', t: 'If you do fly via Manila:', d: 'the airport has several terminals that are a drive apart, airlines changed terminals in spring 2026, and the small planes to El Nido and Coron now leave from Clark. Leave many hours, or a night, between separate tickets.', src: [src.naia, src.naiaT, src.clark] }
    ],

    flightTips: [
      { icon: '📅', t: 'Shift the date by a day or two', d: 'EVA showed €768 to Cebu for late November and €1,066 over New Year; to Manila €985 for both 19 Dec–20 Jan and 21 Dec–15 Jan. Check ±2 days at both ends.', src: [src.evaCeb, src.evaMnl] },
      { icon: '⏱️', t: 'Book now', d: 'Price statistics for Vienna–Manila say one to two months ahead is usually cheapest, and December is the dearest month of the year (average about €1,050). We are six weeks out, at the dearest time — waiting is unlikely to help.', src: [src.stats, src.checkfelix] },
      { icon: '🧳', t: 'Compare with bags included', d: 'Scoot and the cheapest Gulf fares may not include a checked bag. A fare that looks €100 cheaper can end up dearer.' },
      { icon: '🔗', t: 'Keep the long flight on one ticket', d: 'With separate tickets (for example Vienna–Manila plus a low-cost hop to Cebu), a delay on the first flight means buying the second again. If you do split, sleep one night in between.' },
      { icon: '🏝️', t: 'Cebu saves a flight', d: 'From Cebu, Bohol is a two-hour ferry and Moalboal a three-hour drive; Boracay, El Nido and Coron are one short direct flight. From Manila every one of them is a flight.', src: [src.cebuDirect, src.cebMphFc] },
      { icon: '🔎', t: 'Very low prices on comparison sites', d: 'Skyscanner shows Vienna–Cebu “from €654” without a date. Treat such numbers as the best day of the year, not as our fare.', src: [src.skyCeb] }
    ],

    /* Journeys between the islands. pp = per person one way, door to door, incl. bag and local transfers. hassle & comfort 1–5. */
    genericLeg: { id: 'flight', icon: '✈️', label: 'Flight via Cebu', pp: 110, hours: 8, comfort: 3, hassle: 3, note: 'No direct service that we know of; estimate.' },
    legs: {
      'bohol|cebu': [
        { id: 'fastferry', icon: '⛴️', label: 'Fast ferry (2 hours)', pp: 22, hours: 4.5, comfort: 4, hassle: 2, note: 'Taxi or Grab from Cebu airport to the pier (25–60 min, about €4–6 per car), OceanJet to Tagbilaran (2 h; about €11 tourist class, €17–20 business class), then 30 minutes to Alona Beach. Boats run almost every hour.', risks: ['Fares went up and down with fuel prices during 2026 — check the day’s price.', 'Ferries stop when the coast guard issues a gale warning; it happened over New Year 2026.', 'On the way home the flight leaves Cebu around midday: only the first boats of the morning would work, with no room for a delay.'], src: [src.oceanjet, src.oceanjetNews, src.oceanjetHourly, src.cebPier, src.gale] },
        { id: 'slowferry', icon: '🚢', label: 'Slow ferry to Tubigon + van', pp: 14, hours: 7.5, comfort: 2, hassle: 3, note: 'Car ferries to Tubigon cost from about €4 but take 4.5 hours, and Tubigon is an hour and a half from Alona. Saves about €15 for two; not worth a beach afternoon.', src: [src.ferryGuide] }
      ],
      'cebu|moalboal': [
        { id: 'car', icon: '🚗', label: 'Private car or Grab', pp: 24, hours: 3, comfort: 4, hassle: 1, note: 'About €36–50 per car one way from the city; one guide quotes far more (about €75), so agree the price before you get in. From the airport add 30–45 minutes.', src: [src.moalRoute] },
        { id: 'bus', icon: '🚌', label: 'Ceres bus', pp: 8, hours: 4.5, comfort: 3, hassle: 3, note: 'About €3 by air-conditioned bus from Cebu South Bus Terminal (3 h), plus a taxi to the terminal and a tricycle at the end. Buses to Moalboal are listed only until about 14:00.', risks: ['On the Sinulog festival Sunday the bus terminal has closed in past years.'], src: [src.moalGov, src.moalRoute] }
      ],
      'bohol|moalboal': [
        { id: 'carferry', icon: '🚗', label: 'Car to Cebu pier + fast ferry', pp: 40, hours: 7, comfort: 3, hassle: 3, note: 'Three hours by car to Cebu City, the two-hour OceanJet, then 30 minutes to Alona. Leave Moalboal by 8:00 to arrive in daylight.', risks: ['Cebu City traffic can add an hour.', 'Same ferry weather risk.'], src: [src.moalRoute, src.oceanjet] },
        { id: 'busferry', icon: '🚌', label: 'Bus to Cebu + fast ferry', pp: 24, hours: 8.5, comfort: 2, hassle: 4, note: 'The cheap version of the same route.', src: [src.moalGov, src.oceanjet] }
      ],
      'boracay|cebu': [
        { id: 'flight', icon: '✈️', label: 'Direct flight to Caticlan + boat (1 hour in the air)', pp: 75, hours: 5, comfort: 4, hassle: 2, note: 'Cebu Pacific, Philippine Airlines and AirAsia fly Cebu–Caticlan direct. Off-peak return fares from about €64 were shown; early January with a bag is our estimate. From Caticlan airport it is a short ride to the jetty, a 15-minute boat and an electric tricycle. The Boracay fees (about €7 each: environmental, terminal and boat) are included here.', risks: ['Buy the checked bag online when booking — airport prices are much higher.', 'Check the ticket says Caticlan (MPH). Kalibo (KLO) is two hours further by road.', 'Individual flights are often late; do not plan a same-day connection to the flight home.'], src: [src.cebMph, src.cebMphFc, src.borFees, src.borArrive] }
      ],
      'bohol|boracay': [
        { id: 'ferryflight', icon: '⛴️', label: 'Fast ferry to Cebu + flight to Caticlan', pp: 95, hours: 9, comfort: 3, hassle: 3, note: 'Morning OceanJet to Cebu (2 h), taxi to the airport (45 min), afternoon flight to Caticlan (1 h), boat to Boracay. A full travel day. Travel sites disagree on whether a direct Bohol–Boracay flight exists — search “TAG–MPH” before booking; if there is one it saves half a day.', risks: ['Leave at least four hours between the ferry’s arrival and the flight.', 'A cancelled ferry means a missed flight on a separate ticket.'], src: [src.bohBor, src.bohBorR2r, src.oceanjet, src.cebMphFc] }
      ],
      'cebu|elnido': [
        { id: 'flight', icon: '✈️', label: 'Direct flight (1 h 45)', pp: 135, hours: 5, comfort: 4, hassle: 2, note: 'Cebgo (Cebu Pacific’s small-plane airline, which took over AirSWIFT in July 2026) flies Cebu–El Nido about 16 times a week. €67 was shown for an August date and USD 113–207 as the usual range; January with a bag is our estimate. El Nido’s little airport is 5 km from town.', risks: ['Small propeller planes: hand luggage stays at 7 kg on Cebgo, and seats sell out around New Year.', 'Private airport transfers are sold for €27 and more; ask your hotel for a tricycle or shuttle price.'], src: [src.cebEni, src.cebEniFare, src.cebEniSky, src.eniCebRange, src.cebgo, src.lio] },
        { id: 'ppsvan', icon: '🚐', label: 'Flight to Puerto Princesa + van', pp: 85, hours: 10, comfort: 2, hassle: 4, note: 'Cheaper flights go to Puerto Princesa; from there a shared van to El Nido costs about €10–12 and takes 5–6 hours on a winding road (a private van about €105 per vehicle). The flight price is our estimate.', risks: ['Shared vans get complaints about overcrowding, late starts and fast driving.'], src: [src.ppsVan, src.ppsVan12] }
      ],
      'cebu|coron': [
        { id: 'flight', icon: '✈️', label: 'Direct flight to Busuanga + van', pp: 100, hours: 4.5, comfort: 4, hassle: 2, note: 'Direct flights link Cebu and Coron’s airport (Busuanga). We saw no fare for our dates, so the flight part is an estimate. A shared van to Coron town costs about €3.30 and takes 45–75 minutes.', risks: ['Vans leave when full.', 'Small planes — buy the bag in advance.'], src: [src.cebuDirect, src.coronVan, src.coronVan2] }
      ],
      'coron|elnido': [
        { id: 'ferry', icon: '⛴️', label: 'Fast ferry (3.5–5 hours)', pp: 42, hours: 6, comfort: 2, hassle: 3, note: 'Several companies sail each morning; tickets about €28–43. The timetable says 3.5 hours, travellers report up to five.', risks: ['Open sea in the windy season: crossings can be rough, and boats are cancelled at short notice — reviewers in early 2026 also report slow refunds.', 'The bigger Atienza boat is said to handle rough weather better.', 'Never plan it the day before a flight you cannot miss.'], src: [src.eniCoron, src.eniCoronP, src.eniCoronA, src.eniCoronFs] },
        { id: 'flight', icon: '✈️', label: 'Flight (40 minutes)', pp: 100, hours: 3.5, comfort: 4, hassle: 2, note: 'Cebgo flies El Nido–Busuanga about five times a week. No fare seen — an estimate. The answer if the sea is rough.', src: [src.eniUsu, src.cebgo] }
      ],
      'boracay|elnido': [
        { id: 'flight', icon: '✈️', label: 'Direct flight El Nido–Caticlan', pp: 160, hours: 4.5, comfort: 4, hassle: 2, note: 'One flight a day on a small Cebgo plane; the lowest fare of the past year was listed at USD 159. Includes the Boracay fees and boat.', risks: ['One flight a day: if it is cancelled you lose a day.', 'Hand luggage 7 kg on Cebgo.'], src: [src.eniMph, src.cebgo, src.borFees] }
      ],
      'bohol|elnido': [
        { id: 'flight', icon: '✈️', label: 'Direct flight Bohol–El Nido', pp: 145, hours: 4.5, comfort: 4, hassle: 2, note: 'Cebgo flies it about five times a week. No fare seen — an estimate based on its other El Nido routes. Plan the stay around the days it flies.', risks: ['Not daily.', 'Small plane, 7 kg hand luggage.'], src: [src.cebgo] },
        { id: 'viacebu', icon: '⛴️', label: 'Ferry to Cebu + flight to El Nido', pp: 160, hours: 9, comfort: 3, hassle: 3, note: 'The fallback on days without the direct flight.', src: [src.oceanjet, src.cebEni] }
      ]
    },

    taxi: [
      { icon: '📱', t: 'Use Grab in Cebu', d: 'Install it before you fly and add a card. It works in Cebu City and on Mactan and avoids the classic “the meter is broken” taxi. Airport Wi-Fi is patchy, so have mobile data ready on landing.', price: 'City ride €2–5', src: [src.cebAirport, src.cebuSafe] },
      { icon: '🛬', t: 'Cebu airport → city or ferry pier', d: 'Grab is about €4–6 to the city; yellow airport taxis a little more (about €4–6.50 to Pier 1). It takes 25–60 minutes and traffic can double the fare — ask whether the bridge toll is extra. MyBus runs to SM City mall for under €1 between about 7:30 and 21:40.', price: '€4–7', src: [src.cebPier, src.cebCheap, src.cebAirport] },
      { icon: '🛺', t: 'Bohol: tricycles without meters', d: 'From Panglao airport to Alona Beach, guides quote €2–6.50 by tricycle and about €7 by taxi; drivers ask tired arrivals for more. From the Tagbilaran ferry pier it is about 30 minutes. Agree the price before you sit down. Grab is reported to work around Tagbilaran, less so on Panglao.', price: '€2–10', src: [src.panglaoTaxi, src.boholTransport, src.tagPanglao] },
      { icon: '⛴️', t: 'Arriving on Boracay', d: 'From Caticlan airport to the jetty, then three small payments (environmental fee €4.30 for foreigners, terminal fee €2.10, boat €0.70), a 15-minute boat and an electric tricycle to the hotel. You can pre-pay the fees on the official Boracay iPass site and show a QR code. Keep the receipts — some visitors were asked twice.', price: 'about €7 each + tricycle', src: [src.borFees, src.borFeesMb, src.borArrive, src.ipass] },
      { icon: '🛩️', t: 'El Nido airport → town', d: 'The little airport at Lio is about 5 km from town. Private transfers sold online start at about €27; a tricycle is far cheaper, but we found no current fare — ask your hotel to arrange it.', price: 'ask the hotel', src: [src.lio] },
      { icon: '🚐', t: 'Coron airport → town', d: 'Shared vans wait for every flight: about €3.30 each, 45–75 minutes, leaving when full. A private van is about €40.', price: '€3.30 each', src: [src.coronVan, src.coronVan2] },
      { icon: '🚫', t: 'Fake hotel pages and beach booths', d: 'Cebu’s tourism office counted 183 online booking scams by March 2026, many through copied hotel pages on social media offering 50% off. On Boracay the most-reported trick is a beach “booth” selling tours that never happen. Book hotels on the big platforms and tours through your hotel or a real office.', src: [src.bookScam, src.bookScam2, src.borScam] },
      { icon: '🚤', t: 'Agree boat prices in writing', d: 'A visitor on Mactan was quoted €79 for an island-hopping trip and then charged twice in April 2026. Fix the total price, the stops and what is included before you leave the beach.', src: [src.overcharge] },
      { icon: '🛵', t: 'Scooters: think twice', d: 'Rental is cheap and offered everywhere, but guides say you need a motorcycle category on your home licence plus an international permit — which you can only get at home. Without them you ride unlicensed and travel insurance normally refuses accident claims. Roads on Bohol and around El Nido are dark and full of dogs at night.', price: 'tricycles instead', src: [src.scooter, src.scooterTg] }
    ],

    activities: [
      { id: 'heritage', place: 'cebu', name: 'Old Cebu on foot: Magellan’s Cross, the Basilica, the fort', for2: 15, note: 'Estimate: small entry fees and two Grab rides. Half a day is enough.', src: [src.cebuWarn] },
      { id: 'lechon', place: 'cebu', name: 'Cebu roast-pork (lechon) dinner', for2: 20, note: 'Estimate. Market lechon is about €6–7 a kilo, the famous chains €17–20 a kilo.', src: [src.lechon, src.cebuFood] },
      { id: 'mactanhop', place: 'cebu', name: 'Mactan island-hopping boat, half day', for2: 60, note: 'Estimate — prices are whatever you negotiate; one tourist was quoted €79. Agree everything first.', src: [src.overcharge] },
      { id: 'countryside', place: 'bohol', name: 'Bohol countryside day: Chocolate Hills, tarsiers, river lunch', for2: 110, note: 'Private car with driver; listings run from €70 for the car to about €105 per person with the river-cruise lunch and all fees. Join-in tours are cheaper.', src: [src.bohTour, src.bohTour2] },
      { id: 'balicasag', place: 'bohol', name: 'Balicasag turtles and island hopping, shared boat', for2: 40, note: 'About €20 each including island fees. For dolphins take the sunrise boat, not the 9:00 one. The Virgin Island sandbar was closed for a while — ask if it is open.', src: [src.bohHop, src.bohHop2] },
      { id: 'sardines', place: 'moalboal', name: 'Sardine shoal and turtles with a snorkel guide', for2: 35, note: 'About USD 15–25 each for two hours from the shore. Take a guide and a life vest — a snorkeller without one drowned here in May 2026.', src: [src.moalGuide, src.moalSnork] },
      { id: 'kawasan', place: 'moalboal', name: 'Kawasan Falls canyoneering, half day', for2: 90, note: 'About USD 40–60 each: jumping, sliding and swimming down a river gorge. Skip the jumps if you like; go early.', src: [src.moalGuide] },
      { id: 'bhop', place: 'boracay', name: 'Boracay island hopping with snorkelling, shared boat', for2: 50, note: 'Most listings about €24 each with hotel pick-up; others €13–19.', src: [src.borActs, src.borThings] },
      { id: 'paraw', place: 'boracay', name: 'Sunset sail on a paraw (outrigger sailboat)', for2: 53, note: 'From about €53 for a private boat for 30 minutes; shared sunset cruises from about €12 each.', src: [src.borParaw, src.borActs] },
      { id: 'parasail', place: 'boracay', name: 'Parasailing', for2: 71, note: 'About €36 each; one site lists a tandem flight at €63.', src: [src.borActs, src.borCost] },
      { id: 'helmet', place: 'boracay', name: 'Helmet dive (walking on the sea floor)', for2: 40, note: 'About €17–26 each. Fish feeding is now restricted to protect the coral.', src: [src.borActs] },
      { id: 'dive', place: 'boracay', name: 'Try-scuba dive', for2: 69, note: 'One listing shows about €34 each.', src: [src.borActs] },
      { id: 'bormassage', place: 'boracay', name: 'Massage for two, 60 minutes', for2: 45, note: 'Estimate for a simple spa off the beach. A listed spa price is about €31 each.', src: [src.borActs] },
      { id: 'tourA', place: 'elnido', name: 'El Nido Tour A: Big Lagoon and beaches, shared boat', for2: 55, note: 'About €17–26 each depending on the seller, plus an eco fee of about €6 each that stays valid for ten days. Kayak rental at the lagoon is extra.', src: [src.eniTours, src.eniTours2, src.eniTours3] },
      { id: 'tourC', place: 'elnido', name: 'El Nido Tour C: hidden beaches, shared boat', for2: 42, note: 'About €20 each; the eco fee from Tour A still counts. The most open-sea of the four tours — the first to be cancelled in wind.', src: [src.eniTours2, src.eniTours3] },
      { id: 'privboat', place: 'elnido', name: 'Private boat for a day (leave early, beat the crowds)', for2: 145, note: 'An older guide says about €145 for Tour A as a private boat; no current price found.', src: [src.eniTours] },
      { id: 'nacpan', place: 'elnido', name: 'Day at Nacpan Beach by tricycle', for2: 25, note: 'Estimate. Four kilometres of open beach 40 minutes north of town — the plan for days when boats do not sail.', src: [src.eniCancel, src.eniStay] },
      { id: 'coronult', place: 'coron', name: 'Coron “ultimate” tour: Kayangan Lake, Twin Lagoon, reefs', for2: 65, note: 'Shared boat with lunch about €26–36 each. Check that site fees are included (Kayangan about €4.30, Twin Lagoon €2.90, Barracuda Lake €3.60).', src: [src.coronTour, src.coronTour2] },
      { id: 'coronisl', place: 'coron', name: 'Coron beach-islands day tour, shared boat', for2: 60, note: 'Estimate — the day for white sandbanks rather than lagoons.', src: [src.coronTour2] },
      { id: 'coronpriv', place: 'coron', name: 'Private speedboat tour around Coron Island', for2: 320, note: 'About USD 181 each for two; cheaper per person in a bigger group.', src: [src.coronPriv] }
    ],

    fixed: {
      visa: { label: 'Entry: free for both passports', for2: 0, note: 'Irish and Austrian passports get 30 days on arrival at no charge, and the eTravel form is free. If Mohsey decides to ask a Philippine embassy for a visa to be safe, type that fee into “Our prices”.', src: [src.dfaIe, src.oeamtc, src.etravel] },
      insurance: { label: 'Travel medical insurance', for2: 90, note: 'Our estimate for trip cover for two; annual travel-health policies in Germany and Austria start at about €25–35 a year. With trip-cancellation cover expect €150–300. Untick if a card or an annual policy already covers you.', src: [src.ins, src.insAt] },
      sim: { label: 'Two tourist SIMs or eSIMs', for2: 15, note: 'A Globe tourist pack was quoted at about €7 for 20 GB over 15 days. Airport counters register the SIM with your passport.', src: [src.sim, src.simReg] },
      gala: { label: 'Compulsory New Year’s Eve gala dinner at the resort', for2: 150, note: 'Only if you sleep on Boracay on 31 Dec in a resort that charges it. Seen: about €105 per adult at one 5★ resort; another includes a buffet for two in the room rate.', src: [src.gala, src.gala2] }
    },

    scenarios: [
      { id: 'A', short: 'Bohol only', title: '17 nights on Bohol', tagline: 'One island, unpack once — the cheapest way to do this trip.',
        stops: [{ place: 'bohol', nights: 17 }], acts: ['countryside', 'balicasag'],
        pros: ['Cheapest route: no flights inside the Philippines, just a two-hour ferry.', 'Beach and countryside on one island — hills, river, tarsiers, turtles.', 'New Year costs less here than on Boracay or in El Nido.'],
        cons: ['Panglao’s beaches are pleasant, not spectacular; very low tides stop swimming for a few hours.', 'More showers in January than Boracay or Palawan.', 'The flight home leaves Cebu at midday, so on the last morning you need the very first ferry — better to move the last night or two to Cebu.', 'Seventeen nights is long for one small island.'] },
      { id: 'B', short: 'Boracay only', title: '15 Boracay + 2 Cebu', tagline: 'The best swimming beach in the country, start to finish.',
        stops: [{ place: 'boracay', nights: 15 }, { place: 'cebu', nights: 2 }], gala: true, acts: ['bhop', 'paraw', 'bormassage', 'heritage', 'lechon'],
        pros: ['Fifteen days on flat, warm White Beach — the surest swimming weather in January.', 'Only two short flights, everything walkable.', 'Two nights in Cebu at the end make the flight home stress-free.'],
        cons: ['You pay the highest prices of the year for the first five nights and probably a gala dinner — if rooms are still free at all.', 'You change planes in Cebu on arrival day after a 21-hour journey.', 'Busy and built-up; nature and culture are thin.', 'Fifteen nights on a 4 km beach is a lot if you get restless.'] },
      { id: 'C', short: 'Bohol + Boracay', title: '5 Bohol + 10 Boracay + 2 Cebu', tagline: 'New Year among hills and tarsiers, then ten days on White Beach — our pick.',
        stops: [{ place: 'bohol', nights: 5 }, { place: 'boracay', nights: 10 }, { place: 'cebu', nights: 2 }], acts: ['countryside', 'balicasag', 'bhop', 'paraw', 'bormassage', 'heritage', 'lechon'],
        pros: ['The Boracay nights start on 3 January, when the New-Year prices have dropped, and there is no gala fee.', 'Nature and culture first (Chocolate Hills, river, old churches), pure beach after.', 'No flight on arrival day: just a taxi and a two-hour ferry.', 'Ten nights on the calmest, warmest beach of the season.', 'Two nights by a pool in Cebu before the midday flight home.'],
        cons: ['The Bohol → Boracay day is long: ferry, taxi, flight, boat (about nine hours).', 'Bohol’s New-Year week has a fair chance of showers.', 'Three hotels.', 'The honest total is a little over €5,000 with mid-range hotels.'] },
      { id: 'D', short: 'No flights', title: '4 Moalboal + 11 Bohol + 2 Cebu', tagline: 'Cebu island and Bohol by car and ferry — the relaxed budget route.',
        stops: [{ place: 'moalboal', nights: 4 }, { place: 'bohol', nights: 11 }, { place: 'cebu', nights: 2 }], acts: ['sardines', 'countryside', 'balicasag', 'heritage', 'lechon'],
        pros: ['No flights inside the country — nothing to cancel but a ferry.', 'Snorkelling with sardines and turtles straight from the shore in Moalboal.', 'Clearly inside the budget.'],
        cons: ['No postcard beach of the Boracay or El Nido kind.', 'Three hours by road on arrival day after the long flight.', 'A seven-hour car-and-ferry day between Moalboal and Bohol.', 'More showers than on the western islands.'] },
      { id: 'E', short: 'Palawan', title: '3 Cebu + 7 El Nido + 5 Coron + 2 Cebu', tagline: 'Lagoons, cliffs and clear lakes — the scenery route.',
        stops: [{ place: 'cebu', nights: 3 }, { place: 'elnido', nights: 7 }, { place: 'coron', nights: 5 }, { place: 'cebu', nights: 2 }], acts: ['heritage', 'lechon', 'tourA', 'tourC', 'nacpan', 'coronult', 'coronisl'],
        pros: ['The most spectacular landscapes in the Philippines.', 'Dry-season weather with little rain.', 'New Year in Cebu avoids El Nido’s holiday prices.', 'Coron has the best snorkelling of the trip.'],
        cons: ['January is the windiest month: boat tours can be cancelled and the El Nido–Coron ferry can be rough or not sail.', 'Few beaches you can just walk to and swim — most days need a boat or tricycle.', 'Three flights on small planes with tight luggage rules, and the most expensive route.', 'Stomach bugs are a known problem in El Nido.'] },
      { id: 'F', short: 'El Nido + Boracay', title: '3 Cebu + 5 El Nido + 7 Boracay + 2 Cebu', tagline: 'Lagoon scenery, then the easy beach.',
        stops: [{ place: 'cebu', nights: 3 }, { place: 'elnido', nights: 5 }, { place: 'boracay', nights: 7 }, { place: 'cebu', nights: 2 }], acts: ['heritage', 'lechon', 'tourA', 'tourC', 'nacpan', 'bhop', 'paraw', 'bormassage'],
        pros: ['The two most famous places in one trip.', 'If wind spoils El Nido’s boat days, a week of calm Boracay follows.', 'Both island stays fall after the New-Year price peak.'],
        cons: ['The El Nido–Boracay flight is once a day on a small plane and costs about €140 each.', 'Three flights in total; five nights in Cebu altogether.', 'About €600–800 more than the Bohol + Boracay route.'] },
      { id: 'G', short: 'Three islands', title: '5 Bohol + 5 El Nido + 5 Boracay + 2 Cebu', tagline: 'A taste of everything.',
        stops: [{ place: 'bohol', nights: 5 }, { place: 'elnido', nights: 5 }, { place: 'boracay', nights: 5 }, { place: 'cebu', nights: 2 }], acts: ['countryside', 'balicasag', 'tourA', 'tourC', 'bhop', 'paraw', 'heritage'],
        pros: ['The most variety: countryside, lagoons and the big beach.', 'New Year on good-value Bohol.'],
        cons: ['Four hotels and three travel days eat into seventeen nights.', 'The Bohol–El Nido flight does not run every day, so dates must bend to it.', 'Only five nights at each beach — less rest than the other routes.', 'One of the most expensive routes.'] }
    ],

    tips: [
      { topic: 'Which island in January', echo: 'consensus', title: 'January is dry season — on the western side', text: 'Guides agree that Palawan and Boracay are in their best months from December to May. The eastern islands are wetter, and the central ones (Cebu, Bohol) sit in between.', src: [src.wxJan, src.wxRough] },
      { topic: 'Which island in January', echo: 'consensus', title: 'Boracay: swim on White Beach, not Bulabog', text: 'White Beach lies in the lee of the island and stays flat all winter. Bulabog, ten minutes’ walk across, takes 15–25 knots of wind and is full of kites — fun to watch, not to swim.', src: [src.wxBor, src.wxBorKite] },
      { topic: 'Which island in January', echo: 'several', title: 'El Nido tours are cancelled for wind, not rain', text: 'January is the windiest month in Palawan. One guide warns that boats can be kept in port on a cloudless day, and that late December to mid-January is the worst stretch. Others say cancellations are rare. Plan one spare day and book tours for your first days, not your last.', src: [src.wxPalawan, src.wxPalawan2, src.eniCancel] },
      { topic: 'Which island in January', echo: 'several', title: 'Siargao in January means rain', text: 'About 260 mm of rain and some rain on roughly 22 days. Surfers go anyway; for a swimming holiday it is the wrong month, which is why it is not in our routes.', src: [src.wxSiargao, src.wxSiargao2] },
      { topic: 'Which island in January', echo: 'several', title: 'Bohol: warm sea, mixed sky', text: 'Local sites call January Bohol’s best month, but the climate table for Alona Beach shows about 100 mm of rain and a 40% chance of rain on any day. Expect warm showers that pass, and keep the countryside tour flexible.', src: [src.wxBohol, src.wxBohol2] },
      { topic: 'Which island in January', echo: 'official', title: 'Storms can still happen', text: 'The typhoon season is mostly over by late December, but not strictly: a deadly typhoon hit Cebu in November 2025, and a tropical storm in mid-January 2026 stranded thousands of ferry passengers on the eastern islands. Watch the forecast in the last days before each sea or air journey.', src: [src.kalmaegi, src.ada] },

      { topic: 'Boracay', echo: 'consensus', title: 'Station 1 for quiet, Station 2 for bustle, Station 3 for value', text: 'Station 1 has the widest sand and calmest water and the highest prices. Station 2 is the busy middle by the D’Mall shops. Station 3 is the cheaper end. Diniwid, a small cove just north, is the hideaway.', src: [src.borStay, src.borStay2] },
      { topic: 'Boracay', echo: 'official', title: 'Budget about €7 each to get onto the island', text: 'Foreign visitors pay an environmental fee of ₱300, a terminal fee of ₱150 and ₱50 for the boat. The official Boracay iPass site lets you pay in advance and show a QR code at the jetty. Third-party sites sell the same pass for many times the price.', src: [src.borFees, src.borFeesMb, src.ipass] },
      { topic: 'Boracay', echo: 'official', title: 'No drinking or smoking on the sand', text: 'Since the island’s clean-up, alcohol and cigarettes are banned on White Beach itself (bars and restaurants are fine), along with single-use plastics; even sandcastles are restricted. Marshals do fine people.', src: [src.borRules, src.borFees, src.borMistakes] },
      { topic: 'Boracay', echo: 'official', title: 'New Year’s Eve comes with a compulsory dinner', text: 'One 5★ resort charges ₱7,500 per adult for its gala on 31 Dec; another builds a buffet for two into the room rate. Small hotels usually do not. Ask before booking — and book early, the island fills up for the beach fireworks.', src: [src.gala, src.gala2, src.borNye] },
      { topic: 'Boracay', echo: 'several', title: 'The same boat trip has three prices', text: 'Island hopping is listed at ₱900, ₱1,300 and ₱1,700 per person on different pages. Book through your hotel or a real office, not a booth on the beach — that is the island’s most-reported scam.', src: [src.borActs, src.borScam] },
      { topic: 'Boracay', echo: 'single', title: 'Paraw sailing is not parasailing', text: 'A paraw is the local outrigger sailboat — a quiet half hour at sunset. Parasailing is the parachute behind a speedboat. Both are sold by the same touts.', src: [src.borParaw] },

      { topic: 'Palawan', echo: 'consensus', title: 'El Nido for lagoons and restaurants, Coron for snorkelling', text: 'Comparisons agree: El Nido has the better town, hotels and island-hopping variety; Coron is quieter with clearly better snorkelling and diving. Three to four nights each is the usual advice.', src: [src.eniVsCoron, src.eniVsCoron2] },
      { topic: 'Palawan', echo: 'several', title: 'Stay in Corong-Corong rather than El Nido town', text: 'Calmer, with a long sunset beach, a short tricycle ride from the tour boats. Lio is polished and pricey; Nacpan is beautiful but 40 minutes away. Next-door Maremegmeg is the place where you can swim right outside the hotel.', src: [src.eniStay, src.eniStay2] },
      { topic: 'Palawan', echo: 'several', title: 'Tours A to D: expect ₱1,200–1,800 plus a ₱400 eco fee', text: 'The four lettered tours are sold everywhere at slightly different prices. The eco fee is paid once and is valid for ten days. A and C are the classics; ask whether lagoon and kayak fees are included.', src: [src.eniTours, src.eniTours2] },
      { topic: 'Palawan', echo: 'official', title: 'El Nido has a stomach-bug problem', text: 'Hundreds of visitors have fallen ill in past seasons, the town’s water has failed quality tests, and cooking on tour boats was banned for a while. Drink only sealed or filtered water, skip ice and raw food in simple places, and carry rehydration salts.', src: [src.eniFood, src.eniWater] },
      { topic: 'Palawan', echo: 'official', title: 'No plastic bottles on the boats', text: 'El Nido bans single-use plastic on island tours — bottles and bags are collected before boarding. Bring a refillable bottle and a cloth bag.', src: [src.eniPlastic] },
      { topic: 'Palawan', echo: 'several', title: 'The El Nido–Coron ferry is the weak link', text: 'Timetables say 3.5 hours; passengers in early 2026 report five, rough seas, last-minute cancellations and slow refunds. Keep a spare day after it, or take the 40-minute flight.', src: [src.eniCoron, src.eniCoronFs] },
      { topic: 'Palawan', echo: 'several', title: 'In Coron, check what the tour price includes', text: 'Kayangan Lake, Twin Lagoon and Barracuda Lake each charge their own entry (₱200–300), and some sellers add guide fees per stop. “All fees included” should be on the receipt.', src: [src.coronTour, src.coronTour2] },

      { topic: 'Bohol & Cebu', echo: 'several', title: 'Alona is lively, Dumaluan is for swimming', text: 'Alona Beach has the restaurants and boats and suffers least at low tide. Dumaluan is wider and quieter and popular with couples. Doljo is too shallow and full of sea urchins.', src: [src.bohBeach, src.bohBeach2] },
      { topic: 'Bohol & Cebu', echo: 'several', title: 'For dolphins, take the sunrise boat', text: 'The Balicasag operators say plainly that the 9:00 departure sees no dolphins. The Virgin Island sandbar was closed for part of 2026 — ask whether it is open before paying for it.', src: [src.bohHop] },
      { topic: 'Bohol & Cebu', echo: 'several', title: 'Whale sharks: skip Oslob', text: 'In Oslob the sharks are fed to keep them near the boats, which scientists and many travellers criticise; Bohol suspended its own version. If it matters to you, look at places where they are watched without feeding.', src: [src.whale, src.whale2] },
      { topic: 'Bohol & Cebu', echo: 'official', title: 'Snorkel the Moalboal sardines with a guide', text: 'The shoal is only metres from the shore, but the reef wall drops straight down and boats pass overhead. A visitor without a guide drowned in May 2026. A guide and life vest cost little.', src: [src.moalSnork] },
      { topic: 'Bohol & Cebu', echo: 'several', title: 'Cebu City: half a day of sights, then lechon', text: 'Magellan’s Cross, the Santo Niño basilica and the old fort sit close together. Cebu’s roast pork is the dish to try; market stalls sell it by weight for a third of the famous-chain price.', src: [src.cebuWarn, src.lechon, src.cebuFood] },
      { topic: 'Bohol & Cebu', echo: 'official', title: 'Mind the Sinulog festival', text: 'Cebu’s huge festival falls on the third Sunday of January — in 2027 that should be 17 January, two days after you leave (not yet confirmed). The week before brings road closures, full hotels and prices up 20–100%. Book the last two Cebu nights early, on Mactan rather than downtown.', src: [src.sinulog, src.sinulogRoads] },
      { topic: 'Bohol & Cebu', echo: 'official', title: 'New Year’s Eve in Cebu is loud but orderly', text: 'Fireworks are sold only by licensed stalls until midnight, hotels and malls stage big displays, and police reported no fireworks or gunfire incidents last year. Expect noise and smoke everywhere in the Philippines at midnight.', src: [src.cebuNye, src.cebuNye2] },

      { topic: 'Transport', echo: 'official', title: 'Small planes to El Nido and Coron left Manila', text: 'Since 29 March 2026 the propeller flights to El Nido and Coron start from Clark, two to three hours north of Manila, not from Manila airport. From Cebu they still fly direct — one more reason to arrive in Cebu.', src: [src.clark, src.clarkMb] },
      { topic: 'Transport', echo: 'official', title: 'AirSWIFT is now Cebgo', text: 'The El Nido airline was folded into Cebu Pacific’s Cebgo on 1 July 2026. Old guides still tell you to book AirSWIFT; today you book on the Cebu Pacific site and the flight number starts with DG.', src: [src.cebgo, src.cebgoHelp] },
      { topic: 'Transport', echo: 'official', title: 'Hand luggage: 10 kg on Cebu Pacific jets, 7 kg on Cebgo', text: 'Cebu Pacific raised its limit to 10 kg in September 2026, but the small Cebgo planes stay at 7 kg — and they are the ones to El Nido. Buy checked bags when booking; at the airport they cost far more.', src: [src.bag, src.bagRules] },
      { topic: 'Transport', echo: 'several', title: 'Delays are normal — build in slack', text: 'Cebu Pacific was the most punctual Philippine airline in April 2026 with 85% of flights on time, yet single routes drop to 50–60% in some weeks. Never connect a domestic flight to the flight home on the same day.', src: [src.otp] },
      { topic: 'Transport', echo: 'official', title: 'Ferries stop when the coast guard says so', text: 'Over New Year 2026 a gale warning halted boats in several regions, and storms stranded passengers in January and February. A cancelled ferry is announced the same morning — keep the last two nights on the island you fly from.', src: [src.gale, src.ada, src.basyang] },
      { topic: 'Transport', echo: 'several', title: 'OceanJet prices moved all year', text: 'The Cebu–Bohol fast ferry added and removed fuel surcharges several times in 2026; tourist class is around ₱800 and business class ₱1,200–1,400. Boats run almost hourly, so there is no need to book weeks ahead except around New Year.', src: [src.oceanjet, src.oceanjetNews, src.oceanjetHourly] },
      { topic: 'Transport', echo: 'several', title: 'Tricycle prices are made up on the spot', text: 'There are no meters. On Panglao, drivers quote arrivals double; ask your hotel what a ride should cost and agree it before getting in.', src: [src.panglaoTaxi, src.boholTransport] },
      { topic: 'Transport', echo: 'several', title: 'If a ticket goes through Manila', text: 'Terminals are a traffic jam apart, airlines swapped terminals in 2026, and guides suggest anything from 1.5 to 5 hours for a change. Take Grab, not street taxis, and avoid it altogether if you can.', src: [src.naia, src.naiaT] },

      { topic: 'Money & phone', echo: 'consensus', title: 'Every cash machine charges about €3.60', text: 'Foreign cards pay ₱250 per withdrawal almost everywhere, with limits of ₱10,000–20,000 (€140–285). HSBC is the fee-free exception but exists only in the big cities. Take out the maximum each time and decline the machine’s own conversion.', src: [src.atm, src.atmWise] },
      { topic: 'Money & phone', echo: 'several', title: 'Carry cash and small notes to the islands', text: 'Boatmen, tricycles and small eateries are cash only, and island machines sometimes run empty or refuse foreign cards. Withdraw in Cebu, and break ₱1,000 notes at supermarkets and hotels.', src: [src.cash, src.cash2] },
      { topic: 'Money & phone', echo: 'several', title: 'Tipping is welcome, not required', text: 'Round up or leave small cash; card machines have no tip option. For a day on a boat, a few hundred pesos for the crew is appreciated.', src: [src.tipping] },
      { topic: 'Money & phone', echo: 'several', title: 'Buy the SIM at the airport counter', text: 'Globe and Smart have desks at Cebu airport and register the SIM with your passport on the spot. A tourist pack is about €7 for 20 GB. Signal is weak on boats and in parts of Palawan.', src: [src.sim, src.simReg] },
      { topic: 'Money & phone', echo: 'official', title: 'Only book hotels through channels you trust', text: 'Cebu’s tourism office counted 183 booking scams by March 2026; one resort found eight fake pages offering half price. Use the big platforms or the hotel’s own verified site, never a link sent by message.', src: [src.bookScam, src.bookScam2] },

      { topic: 'Entry & flights', echo: 'official', title: 'eTravel is free — any payment page is fake', text: 'Fill it in within the 72 hours before landing at etravel.gov.ph or in the eGovPH app and save the QR code. Look-alike sites have charged ₱3,000–5,000.', src: [src.etravel, src.etravelFake, src.etravelGuide] },
      { topic: 'Entry & flights', echo: 'official', title: 'Have the return ticket ready at check-in', text: 'Visa-free entry requires a ticket out of the Philippines within 30 days and a passport valid six months. Airlines check this at the desk in Vienna.', src: [src.dfaIe] },
      { topic: 'Entry & flights', echo: 'several', title: 'The UAE rule: reported in April, unclear now', text: 'Emirates, Etihad and flydubai said on 1 April 2026 that Iranian nationals could not enter or transit. One source said people born in Iran could be affected even with European passports; a September summary could not confirm the rule still applies. Not a risk worth taking for a holiday.', src: [src.uae, src.uaeBorn, src.uaeWego] },
      { topic: 'Entry & flights', echo: 'several', title: 'December is the dearest month to fly', text: 'Price statistics for Vienna–Manila put the December average near €1,050 against about €675 in November. Our dates sit right on the peak.', src: [src.checkfelix, src.stats] },

      { topic: 'Health', echo: 'official', title: 'Use mosquito repellent in the daytime', text: 'Dengue is lower than last year (about 156,000 cases by late September 2026, down 33%) but was rising again in autumn, and Cebu province alone had over 2,300 cases by August. The mosquitoes bite by day.', src: [src.dengue, src.dengueCebu] },
      { topic: 'Health', echo: 'official', title: 'Malaria matters only for Palawan — and mostly its south', text: 'Palawan is the last malaria area in the country, with the risk concentrated in the rural south and centre. UK advice says tablets are not needed for most travellers. If you choose El Nido or Coron, mention it at the travel clinic.', src: [src.fitfor, src.wanda, src.malariaPal] },
      { topic: 'Health', echo: 'consensus', title: 'No tap water', text: 'Drink sealed or filtered water everywhere; most hotels have refill stations. This matters most in El Nido.', src: [src.cebuSafe, src.eniWater] }
    ],

    hotelNote: 'Review scores come from the platforms named on each card, and prices are undated “from” or average prices converted to euros at about USD 1 = €0.88 — New-Year nights will cost clearly more, and by now some hotels will be full for 29 Dec–2 Jan. Where the price swung wildly between sites we left it out. Breakfast and New Year’s Eve gala rules were not visible for most hotels: ask before booking, especially on Boracay.',
    hotels: {
      cebu: [
        { name: 'Cebu Dulcinea Hotel and Suites', area: 'Mactan, close to the airport', tier: 'simple', stars: 'airport hotel', score: '7.7 Kayak (990 reviews)', price: 75, priceNote: '“from” price', good: 'A practical place to sleep before the midday flight home.', watch: 'The lowest score on this list — a bed, not a holiday.', src: [S('Kayak', 'https://www.nz.kayak.com/Lapu-Lapu-City-Hotels-Dulcinea-Hotel-And-Suites.312259.ksp')] },
        { name: 'Dusit Thani Mactan Cebu Resort', area: 'Mactan, north tip', tier: 'good', stars: '5★', score: '8.2 Kayak (2,500 reviews)', priceNote: 'price not reliable — one old listing only', good: 'Big resort with a large pool and sunset views.', watch: 'Far from Cebu City; check the real price for your nights.', src: [S('Kayak', 'https://www.kayak.com/Lapu-Lapu-City-Hotels-Dusit-Thani-Mactan-Cebu-Resort.4962749.ksp')] },
        { name: 'Mövenpick Hotel Mactan Island Cebu', area: 'Mactan, east coast', tier: 'nice', stars: '5★', score: '8.3–8.5 Kayak (about 1,900 reviews)', price: 92, priceNote: '“from” price', good: 'Its own small beach and a pool; 20 minutes from the airport.', watch: '', src: [S('Kayak', 'https://www.kayak.com/Lapu-Lapu-City-Hotels-Moevenpick-Hotel-Mactan-Island-Cebu.622442.ksp')] },
        { name: 'Sheraton Cebu Mactan Resort', area: 'Mactan, east coast', tier: 'nice', stars: '5★', score: '8.9–9.0 Kayak (about 1,000 reviews)', price: 164, priceNote: 'cheapest seen; another listing showed far more', good: 'The best-reviewed resort we found near the airport.', watch: 'Over budget on most nights.', src: [S('Kayak', 'https://www.kayak.com/Cebu-City-Hotels-Sheraton-Cebu-Mactan-Resort.1070515922.ksp')] }
      ],
      bohol: [
        { name: 'Alona Vida Beach Hill Resort', area: 'Above Alona Beach, Panglao', tier: 'simple', stars: 'small resort', score: 'rated “Very good” on Kayak (690 reviews)', priceNote: 'price not seen', good: 'Sister of the beachfront Alona Vida, a short walk up from the sand.', watch: 'Not on the beach.', src: [S('Kayak', 'https://www.kayak.com/Panglao-Hotels-Alona-Vida-Beach-Hill.3772731.ksp')] },
        { name: 'Alona Vida Beach Resort', area: 'On Alona Beach, Panglao', tier: 'good', stars: '3★', score: '8.2 Kayak (1,590 reviews)', price: 41, priceNote: 'lowest price seen; the weeknight average is about €100', good: 'Right on the liveliest beach, with boats and restaurants at the door.', watch: 'Alona is busy and noisy at night; the price varies a lot by date.', src: [S('Kayak', 'https://www.kayak.com/Panglao-Hotels-Alona-Vida-Beach-Resort.119178.ksp')] },
        { name: 'Best Western Plus The Ivywall Resort', area: 'Panglao', tier: 'good', stars: '4★', score: '8.7 Kayak (1,690 reviews)', price: 130, priceNote: 'weeknight average', good: 'Modern resort with a big pool.', watch: 'Some guests mention breakfast quality and value for money.', src: [S('Kayak', 'https://www.kayak.com/Panglao-Hotels-Best-Western-Plus-The-Ivywall-Resort-Panglao.5957007.ksp')] },
        { name: 'Henann Resort Alona Beach', area: 'On Alona Beach, Panglao', tier: 'nice', stars: '5★', score: '8.9 Kayak (7,700–8,600 reviews)', price: 150, priceNote: 'weeknight average; cheapest recent booking about €130', good: 'The big beachfront resort with several pools.', watch: 'Large and busy; likely to charge extra for New Year’s Eve — ask.', src: [S('Kayak', 'https://www.kayak.com/Panglao-Hotels-Henann-Resort-Alona-Beach.604637.ksp')] }
      ],
      moalboal: [
        { name: 'Pescadores Suites', area: 'Panagsama, Moalboal', tier: 'good', stars: 'small hotel', score: '8.5 Kayak (1,900 reviews) · 8.6 HotelsCombined', price: 37, priceNote: 'seen €35–39', good: 'The best mix of score and price; the sardines are a short walk away.', watch: '', src: [S('Orbitz', 'https://www.orbitz.com/Moalboal-Hotels-Pescadores-Seaview-Suites.h17399417.Hotel-Information')] },
        { name: 'Quo Vadis Dive Resort', area: 'Panagsama seafront, Moalboal', tier: 'good', stars: 'dive resort', score: '8.0 Kayak (1,370 reviews)', price: 55, priceNote: '“from” price; others show €61', good: 'On the water with a pool and a dive centre.', watch: '', src: [S('Kayak', 'https://www.kayak.com/Moalboal-Hotels-Quo-Vadis-Dive-Resort-Moalboal.438727.ksp')] },
        { name: 'Dolphin House Resort', area: 'North of Moalboal village', tier: 'nice', stars: 'boutique resort', score: '8.4 Expedia (70 reviews) · 4.6/5 TripAdvisor (520)', price: 117, priceNote: 'one site quotes far more', good: 'Quiet garden resort by the sea.', watch: 'Few reviews on some platforms; outside the village.', src: [src.hcMoal] }
      ],
      boracay: [
        { name: 'Seaworthy Boracay', area: 'Near Station 1', tier: 'simple', stars: 'guesthouse', score: '9.6 Booking.com (only 17 reviews)', priceNote: 'a very low “from” price was shown — check your dates', good: 'Terrace, restaurant, close to the quiet end of the beach.', watch: 'Very few reviews so far.', src: [S('Booking.com: cheap hotels on Boracay', 'https://www.booking.com/budget/city/ph/boracay.html?aid=803194')] },
        { name: 'Boracay Uptown', area: 'Station 2', tier: 'good', stars: '4★', score: '8.4 Kayak (680 reviews)', priceNote: 'price not reliable', good: 'Central, near D’Mall and the busiest part of the beach.', watch: 'Station 2 is the noisy middle.', src: [S('Kayak', 'https://www.kayak.com.ph/Boracay-Hotels-Boracay-Uptown.702308.ksp')] },
        { name: 'Henann Garden Resort', area: 'Station 2, just behind the beach', tier: 'good', stars: '4★', score: '8.9 Kayak (3,600–4,400 reviews)', price: 99, priceNote: 'typical price; deals from about €50 off-season', good: 'Four outdoor pools, a few steps from White Beach.', watch: 'Its sister resort includes a compulsory buffet on 31 Dec — ask about this one.', src: [S('Kayak', 'https://www.kayak.com/Boracay-Hotels-Henann-Garden-Resort.366057.ksp')] },
        { name: 'Coast Boracay', area: 'Station 2, beachfront', tier: 'nice', stars: 'boutique', score: '9.5 Kayak (1,520 reviews)', priceNote: 'prices seen from €30 to over €100 — check your dates', good: 'The best-scored hotel we found on the island; breakfast included in most rates.', watch: 'Small and popular: New Year is probably gone already.', src: [S('Kayak', 'https://www.kayak.com/Boracay-Hotels-Coast.2657249.ksp')] }
      ],
      elnido: [
        { name: 'Sea Cocoon Hotel', area: 'El Nido town, a few blocks from the bay', tier: 'simple', stars: '3★', score: 'rated “Wonderful” on Booking.com (530 reviews)', price: 44, priceNote: '“from” price', good: 'Good value with a pool, close to the tour boats.', watch: 'Not on the beach; town is noisy.', src: [S('Booking.com: El Nido', 'https://www.booking.com/city/ph/el-nido.html?aid=388289')] },
        { name: 'Cuna Hotel', area: 'El Nido town', tier: 'good', stars: '3★', score: '7.9 Kayak (3,070 reviews)', price: 68, priceNote: 'average €63–75; cheapest seen €48', good: 'Rooftop pool, restaurant and bar in the middle of town.', watch: 'A “good”, not “great”, score.', src: [S('Kayak', 'https://www.kayak.com/El-Nido-Hotels-Cuna-Hotel.3844418.ksp')] },
        { name: 'Lagùn Hotel', area: 'El Nido town', tier: 'good', stars: '3★', score: '7.7 Kayak (850 reviews)', price: 77, priceNote: 'price from 2025', good: 'Stylish, with a pool.', watch: 'Prices vary widely between sites.', src: [S('Kayak', 'https://www.ca.kayak.com/El-Nido-Hotels-Lagun-Hotel.3854098.ksp')] },
        { name: 'The Nest El Nido Beach Resort', area: 'Beach resort outside the town centre — check the map', tier: 'nice', stars: 'beach resort', score: '8.4 Kayak (1,190 reviews)', priceNote: 'price not seen', good: 'On its own stretch of beach, away from town noise.', watch: 'You will need a tricycle to restaurants and tour boats.', src: [S('Kayak', 'https://www.kayak.com.au/El-Nido-Hotels-The-Nest-El-Nido-Beach-Resort.880745.ksp')] }
      ],
      coron: [
        { name: 'Corto del Mar Hotel', area: 'Coron town', tier: 'good', stars: '3★', score: '9.3 Booking.com (90 reviews)', price: 39, priceNote: '“from” price; another site’s average is several times higher', good: 'Pool and spa in the middle of town.', watch: 'Check the real price for your dates.', src: [S('Kayak: Coron hotels', 'https://www.kayak.com/Coron-Hotels.42559.hotel.ksp')] },
        { name: 'The Funny Lion', area: 'Coron, edge of town', tier: 'good', stars: 'boutique', score: '9.2 Trip.com (210 reviews)', price: 79, priceNote: '“from” price; other dates €130–145', good: 'Quiet, with a pool and a rooftop terrace; praised for service.', watch: '', src: [S('Trip.com: Coron hotels with pools', 'https://www.trip.com/hotels/swimming-pool/city/ph/coron.html')] },
        { name: 'Two Seasons Coron Bayside Hotel', area: 'Coron waterfront', tier: 'nice', stars: '4★', score: '9.2 Expedia (530 reviews) · 8.7 Kayak', price: 133, priceNote: 'recent bookings', good: 'On the bay with a pool, walkable to the harbour.', watch: '', src: [S('Kayak', 'https://www.kayak.com/Coron-Hotels-Two-Seasons-Coron-Bayside-Hotel.880529.ksp')] }
      ]
    },

    entry: [
      { icon: '🇮🇪', t: 'Sophie — Irish passport', p: ['No visa needed. Ireland’s foreign ministry says Irish citizens may enter the Philippines visa-free for up to 30 days; our trip is 17 nights.', 'Conditions: a passport valid at least six months and a return or onward ticket within 30 days of arrival.'], src: [src.dfaIe] },
      { icon: '🇦🇹', t: 'Mohsey — Austrian passport, born in Iran', p: ['With the Austrian passport: no visa needed for 30 days, the same as for all Austrians. We could not open the Austrian foreign ministry’s own page, so this rests on the Austrian motoring club and on Philippine embassy lists — please check bmeia.gv.at yourself.', 'The catch: the Philippines lists Iran among the countries whose citizens must get a visa before travelling. Philippine embassies say the rule follows the passport you present. So travel on the Austrian passport only, book every ticket with it, and leave any Iranian passport at home.', 'We found no current reports of people born in Iran being refused on European passports — only stories from around 2000 of extra questions at Manila airport. To be safe, email the Philippine embassy in Vienna now, ask for one line confirming visa-free entry on an Austrian passport with an Iranian birthplace, and carry the reply, the return ticket and the hotel bookings in your hand luggage.'], src: [src.oeamtc, src.visaList, src.visaIran, src.visaTehran, src.iran2000] },
      { icon: '🛫', t: 'Avoid flights via Dubai or Abu Dhabi', p: ['On 1 April 2026 Emirates, Etihad and flydubai said Iranian nationals may not enter or transit the UAE. One report quotes a source saying people born in Iran could be affected even with European passports.', 'A summary from September 2026 could not confirm that the rule is still in force — but nobody confirms it has gone either. Until an airline says in writing that it is fine, choose Taipei, Singapore, Seoul or Istanbul.', 'For Taipei (our best flight) and Doha we found no rule about place of birth. We also could not find an official statement saying so — ask the airline when booking.'], src: [src.uae, src.uaeStar, src.uaeBorn, src.uaeWego] },
      { icon: '📋', t: 'For both of you', p: ['Passports valid until at least mid-July 2027 (six months after you leave), and the ticket home in hand.', 'The free eTravel form, within 72 hours before landing: etravel.gov.ph or the eGovPH app. You get a QR code to show on arrival. It never costs anything.', 'There is no visa fee or arrival fee. Airport charges are normally inside the ticket price; we did not find a separate fee to pay when leaving Cebu, but keep a little cash just in case.', 'Boracay has its own small entry fees (about €7 each), paid at the jetty or in advance.'], src: [src.dfaIe, src.etravel, src.etravelFake, src.borFees] }
    ],

    mustDo: [
      { t: 'Email the Philippine embassy in Vienna about the Austrian passport with an Iranian birthplace', when: 'today', d: 'Ask for one line confirming visa-free entry. Iran is on the list of countries whose citizens need a visa, and the rule follows the passport you show — so Mohsey travels on the Austrian passport only. Keep flights and hotels refundable until the answer is in.', src: [src.visaIran, src.visaList] },
      { t: 'Check both passports are valid until at least mid-July 2027', when: 'today', d: 'Six months beyond the stay. Renewing takes weeks.', src: [src.dfaIe] },
      { t: 'Book the New-Year nights now', when: 'this week', d: '29 Dec – 2 Jan is the busiest week of the year on every island. Choose the route, then book those five nights first, with free cancellation.' },
      { t: 'Book a travel-medicine appointment for both of you', when: 'this week', d: 'Hepatitis A is recommended for nearly every traveller and needs about two weeks to protect; check tetanus, polio and measles; ask about typhoid and rabies — and about malaria if you choose Palawan.' },
      { t: 'Do not book a flight through Dubai or Abu Dhabi', when: 'when booking', d: 'The UAE has barred Iranian nationals from transit, and this is reported to affect people born in Iran even with a European passport. Choose Taipei, Singapore, Seoul or Istanbul.', src: [src.uae, src.uaeBorn] },
      { t: 'Buy travel medical insurance', when: 'before paying for flights', d: 'Covering both of you for the whole trip, including medical evacuation — the nearest big hospital is in Cebu. Austrian and Irish public insurance do not pay hospital bills there.' },
      { t: 'Fill in the free eTravel form', when: '26–28 December', d: 'Within 72 hours before landing, at etravel.gov.ph or in the eGovPH app. Save the QR code on both phones. A payment page means a fake site.', src: [src.etravel, src.etravelFake] },
      { t: 'Carry your regular medicines in hand luggage', when: 'packing day', d: 'In original packaging with a copy of the prescription, enough for the whole trip.' }
    ],

    health: {
      intro: 'No vaccination is compulsory for entering the Philippines from Europe. These are the ones doctors recommend or discuss. You fly in under six weeks, so book a travel-medicine appointment this week — some vaccines need two weeks or more to work. This is general guidance, not medical advice for you personally.',
      rows: [
        { v: 'Routine vaccines up to date', who: 'Both of you', lvl: 'good', lbl: 'check', d: 'Tetanus, diphtheria, whooping cough, polio and measles-mumps-rubella. There is a current measles notice for the Philippines. Bring your vaccination pass to the appointment.' },
        { v: 'Hepatitis A', who: 'Both of you', lvl: 'good', lbl: 'recommended', d: 'Recommended for practically every traveller. Spread through food and water. One dose before travel protects for the trip; a second dose later gives long-term protection.' },
        { v: 'Typhoid', who: 'Worth discussing', lvl: 'warn', lbl: 'depends', d: 'Advised for some travellers — more so if you eat at small local places or go to El Nido, where stomach infections are common. Needs one to two weeks to take effect.' },
        { v: 'Hepatitis B', who: 'Worth discussing', lvl: 'warn', lbl: 'depends', d: 'US advice recommends it for anyone not yet vaccinated; European advice mainly for longer stays or possible medical treatment. Many people already have it.' },
        { v: 'Rabies', who: 'Worth discussing', lvl: 'warn', lbl: 'discuss', d: 'The Philippines has a lot of dog rabies and Norway’s health institute lists the vaccine for most travellers. For a beach holiday many doctors still skip it. Either way: do not touch dogs, cats or monkeys, and go to a hospital the same day after any bite or scratch.' },
        { v: 'Japanese encephalitis', who: 'Usually not needed', lvl: 'info', lbl: 'optional', d: 'Sources disagree; US advice does not recommend it for ordinary trips. Ask only if you plan long stays in rice-growing countryside.' },
        { v: 'Malaria tablets', who: 'Not needed on most routes', lvl: 'info', lbl: 'ask if Palawan', d: 'No risk in Cebu, Bohol or Boracay. Palawan is the last malaria area, mostly in its rural south and centre; UK advice says tablets are not needed for most travellers. If your route includes El Nido or Coron, mention it at the clinic.' },
        { v: 'Dengue', who: 'Protect against bites', lvl: 'warn', lbl: 'repellent', d: 'About 156,000 cases nationwide by late September 2026 — a third fewer than last year, but rising again in autumn. There is no tablet; the vaccine is generally only advised after a previous infection. Use repellent in the daytime and sleep with air-conditioning or a net.' },
        { v: 'Yellow fever', who: 'Not needed', lvl: 'info', lbl: 'no', d: 'A certificate is only asked for if you arrive from a country with yellow fever. Flying from Europe via Taipei, Singapore, Seoul or Istanbul does not count.' }
      ],
      src: [src.cdc, src.fitfor, src.fhi, src.thp, src.pasteur, src.wanda, src.dengue]
    },

    saveTips: [
      'Spend New Year on Bohol or in Cebu and go to Boracay or El Nido from 3 January: the same room costs far less and there is no gala dinner.',
      'Shift the flight by a day or two: EVA showed €768 in late November and €1,066 over New Year for the same route.',
      'Choose a route with fewer flights inside the country: each small-plane hop to El Nido costs €120–160 per person.',
      'Buy checked bags online when you book each domestic flight — the airport price is much higher.',
      'On Boracay, sleep in Station 3 or one street back from the sand and walk to the same beach.',
      'Eat one street inland: beachfront restaurants on Alona and White Beach charge double.',
      'Withdraw the maximum each time — every withdrawal costs about €3.60 whatever the amount.',
      'Book boat tours as shared “joiner” trips through your hotel, and agree the full price before you board.',
      'Pay the Boracay fees on the official iPass site, not through a reseller.'
    ],

    checklist: [
      { icon: '✈️', t: 'Book first', items: [
        { t: 'Search the real flight price for 28 Dec → 15 Jan to Cebu (CEB)', d: 'Google Flights or Skyscanner, with one checked bag each. Try ±2 days. Then type it into “Our prices”.' },
        { t: 'Check that the flight home really runs on Friday 15 Jan', d: 'One timetable lists EVA’s Cebu flight on five days a week only.' },
        { t: 'Book the five New-Year nights (29 Dec – 2 Jan) with free cancellation', d: 'They sell out first and cost most.' },
        { t: 'Book the island flights with a checked bag', d: 'Cebu–Caticlan for Boracay; El Nido and Coron flights are on small planes that sell out.' },
        { t: 'Ask each Boracay hotel about a New Year’s Eve gala fee', d: 'Before paying.' },
        { t: 'Book the last two nights on Mactan, near Cebu airport', d: 'The flight home leaves around midday, and the Sinulog festival fills the city that week.' }] },
      { icon: '🛂', t: 'Papers', items: [
        { t: 'Check passports: valid until at least mid-July 2027', d: '' },
        { t: 'Get the embassy’s written OK for the Austrian passport with an Iranian birthplace', d: 'Carry a printout. Travel on the Austrian passport only.', src: [src.visaIran] },
        { t: 'Fill in the free eTravel form within 72 hours before landing', d: 'etravel.gov.ph or the eGovPH app. Save the QR codes.', src: [src.etravel] },
        { t: 'Print the ticket home and the first hotel booking', d: 'Airlines and immigration may ask for proof that you leave within 30 days.' },
        { t: 'Buy travel medical insurance', d: 'Check it covers boat trips and snorkelling — and that scooters are excluded unless licensed.' }] },
      { icon: '💉', t: 'Health', items: [
        { t: 'Visit a travel clinic or your GP', d: 'Hepatitis A is the usual recommendation; ask about typhoid, rabies and — for Palawan — malaria.' },
        { t: 'Pack mosquito repellent and reef-safe sunscreen', d: 'Dengue mosquitoes bite by day.', src: [src.dengue] },
        { t: 'Bring a small pharmacy kit', d: 'Rehydration salts, something for an upset stomach, plasters, antihistamine cream for bites.' }] },
      { icon: '📱', t: 'Phone and money', items: [
        { t: 'Install Grab and add a card', d: 'For Cebu. On the small islands it is tricycles and cash.' },
        { t: 'Buy a Globe or Smart tourist SIM at Cebu airport, or an eSIM before you fly', d: 'You need your passport to register it.', src: [src.sim] },
        { t: 'Tell your bank you are travelling; bring two cards', d: 'Every withdrawal costs about €3.60 — take the maximum and decline the machine’s conversion.', src: [src.atm] },
        { t: 'Withdraw enough cash in Cebu before each island', d: 'Island machines run empty; boats and tricycles are cash only. Keep small notes.', src: [src.cash] },
        { t: 'Pay the Boracay fees on the official iPass site', d: 'boracayipass.ph — or pay at the jetty.', src: [src.ipass] }] },
      { icon: '👕', t: 'Clothes (26–30 °C, warm showers possible)', items: [
        { t: 'Light, loose clothes: 5–6 T-shirts or tops, 2–3 shorts or skirts, 1–2 summer dresses or linen trousers', d: 'Laundry is cheap everywhere, so pack for a week, not for seventeen days.' },
        { t: 'Two or three sets of swimwear each', d: 'So one is always dry.' },
        { t: 'One outfit that covers shoulders and knees', d: 'For churches — the Philippines is a Catholic country and Cebu’s basilica has a dress code.' },
        { t: 'A light rain jacket or poncho', d: 'For showers on Bohol and spray on boat crossings.' },
        { t: 'A light long-sleeved shirt and long trousers', d: 'For evenings with mosquitoes, strong sun and icy air-conditioning on ferries and planes.' },
        { t: 'One slightly nicer outfit', d: 'For New Year’s Eve.' },
        { t: 'Sandals or flip-flops plus water shoes', d: 'Sea urchins and sharp rock at lagoons and low tide.' },
        { t: 'Sun hat and sunglasses', d: '' },
        { t: 'Warm layers for the flight — and for Vienna on the way home', d: 'You leave and return in winter.' }] },
      { icon: '🏖️', t: 'Beach and boats', items: [
        { t: 'Reef-safe sunscreen SPF 50, plenty of it', d: 'Expensive and hard to find on the islands.' },
        { t: 'Refillable water bottle and a cloth bag', d: 'El Nido bans plastic bottles and bags on tour boats.', src: [src.eniPlastic] },
        { t: 'Your own mask and snorkel if you care about fit', d: 'Tour gear is basic.' },
        { t: 'Dry bag and waterproof phone pouch', d: 'Small boats mean wading ashore and spray.' },
        { t: 'Rash vest or swim shirt', d: 'The sun on a boat day is fierce.' },
        { t: 'Motion-sickness tablets', d: 'For ferries and windy boat days.' },
        { t: 'Mosquito repellent (DEET or icaridin)', d: 'Use it in the daytime too.' }] },
      { icon: '🔌', t: 'Electronics and documents', items: [
        { t: 'Plug adapters for both of you', d: 'The Philippines uses 220 V with flat two-pin sockets (the American type). Irish three-pin plugs never fit. Austrian round-pin plugs fit only some sockets — bring two adapters, or one universal adapter with a multi-plug.', src: [src.plugs, src.plugsIe] },
        { t: 'Power bank and charging cables', d: 'Power banks must go in hand luggage. Power cuts happen on the small islands.' },
        { t: 'Passports, plus photos of them on both phones', d: '' },
        { t: 'Printed or offline copies of flights, hotels and the insurance policy with its emergency number', d: '' },
        { t: 'Two bank cards kept in different bags, plus about €100–200 in cash as backup', d: '' },
        { t: 'Driving licence only if you really plan to drive', d: 'A car licence does not cover a scooter.' }] },
      { icon: '🎒', t: 'Bags and luggage rules', items: [
        { t: 'One checked suitcase each — soft bags are easier on boats', d: 'Check the allowance on each domestic ticket; 20 kg is the usual size to buy.' },
        { t: 'Hand luggage under 7 kg if you fly to El Nido or Coron', d: 'Cebu Pacific’s jets allow 10 kg since September 2026, the small Cebgo planes still 7 kg.', src: [src.bag] },
        { t: 'A small day bag that closes with a zip', d: 'For Cebu City and ferry terminals.' },
        { t: 'A few zip bags', d: 'For wet swimwear and to keep documents dry.' }] }
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
