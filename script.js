const wheel = document.getElementById("wheel");
const pageWheel = document.querySelector(".wheel.wheel-page");
const panel = document.querySelector(".wheel-panel");
const aboutScroll = document.querySelector(".wheel-about-scroll");
const ridesStage = document.querySelector(".wheel-wrap--rides");
const ridesPreview = document.querySelector(".rides-preview");
const ridesPreviewHit = document.querySelector(".rides-preview-hit");
const ridesPreviewPhoto = document.querySelector(".rides-preview-photo");
const ridesPreviewNumber = document.querySelector(".wheel-rides-number");
const ridesPreviewDate = document.querySelector(".wheel-rides-date");
const ridesPreviewVenue = document.querySelector(".wheel-rides-venue");
const ridesPreviewCity = document.querySelector(".wheel-rides-city");
const ridesDuo = document.querySelector(".rides-duo");
const ridesPhoto = document.querySelector(".rides-photo");
const ridesPhotoCircle = document.querySelector(".rides-circle--photo");
const ridesTextCircle = document.querySelector(".rides-circle--text");
const ridesDetailsScroll = document.querySelector(".rides-details-scroll");
const ridesNumbers = document.querySelectorAll(".rides-number");
const ridesDetailDate = document.querySelector(".rides-detail-date");
const ridesDetailVenue = document.querySelector(".rides-detail-venue");
const ridesDetailCity = document.querySelector(".rides-detail-city");
const ridesDetailTitle = document.querySelector(".rides-detail-title");
const ridesDetailSubtitle = document.querySelector(".rides-detail-subtitle");
const ridesTitleBlock = document.querySelector(".rides-detail-block--title");
const ridesDetailTime = document.querySelector(".rides-detail-time");
const ridesDetailDistance = document.querySelector(".rides-detail-distance");
const ridesWeatherLines = document.querySelectorAll(".rides-weather");
const ridesCyclistsBlock = document.querySelector(".rides-detail-block--cyclists");
const ridesCyclistsHeading = document.querySelector(".rides-detail-cyclists-heading");
const ridesParticipantsCount = document.querySelector(".rides-detail-participants");
const ridesNameLines = document.querySelectorAll(".rides-detail-names-line");
const ridesStoryBlock = document.querySelector(".rides-detail-block--story");
const ridesStoryParagraphs = document.querySelectorAll(".rides-detail-paragraph");
const ridesCreditsContainer = document.querySelector(".wheel-about-credits");
const ridesHome = document.querySelector(".home--rides");
const homeIndex = document.querySelector(".home--index");
const homeMenuToggle = document.querySelector(".home-menu-toggle");
const homeSiteMenu = document.getElementById("home-site-menu");
const homeMenuBackdrop = document.querySelector(".home-menu-backdrop");
const ridesMenuToggle = document.querySelector(".rides-menu-toggle");
const ridesSiteMenu = document.getElementById("rides-site-menu");
const ridesMenuBackdrop = document.querySelector(".rides-menu-backdrop");

function rideCover(number) {
  return `/rides/images/${number}/${number}_rides_00.jpg`;
}

function rideGallery(number, count) {
  return Array.from(
    { length: count },
    (_, i) =>
      `/rides/images/${number}/${number}_rides_${String(i + 1).padStart(2, "0")}.jpg`
  );
}

function getSiteLang() {
  return document.documentElement.lang === "ko" ? "ko" : "en";
}

function getSitePrefix() {
  return getSiteLang() === "ko" ? "/ko" : "";
}

function getSiteHomeUrl() {
  return getSiteLang() === "ko" ? "/ko/" : "/";
}

function normalizeSitePath(path) {
  const value = path.replace(/\/$/, "") || "/";
  return value === "" ? "/" : value;
}

function localizedPath(lang) {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const withoutKo = path.replace(/^\/ko(?=\/|$)/, "") || "/";

  if (lang === "ko") {
    return withoutKo === "/" ? "/ko/" : `/ko${withoutKo}/`;
  }

  return withoutKo === "/" ? "/" : `${withoutKo}/`;
}

const MENU_LABELS = {
  en: {
    home: "HOME",
    about: "ABOUT",
    contact: "CONTACT",
    rides: "RIDES",
    gear: "GEAR",
  },
  ko: {
    home: "홈",
    about: "소개",
    contact: "문의하기",
    rides: "라이딩",
    gear: "장비들",
  },
};

function getMenuLabelKey(path) {
  const normalized = (path || "").split("?")[0].split("#")[0].replace(/\/$/, "") || "/";

  if (normalized === "/" || normalized === "/ko") return "home";
  if (/\/about$/.test(normalized)) return "about";
  if (/\/contact$/.test(normalized)) return "contact";
  if (/\/rides(\/\d+)?$/.test(normalized)) return "rides";
  if (/\/gear$/.test(normalized)) return "gear";

  return null;
}

function syncMenuLabels() {
  const labels = MENU_LABELS[getSiteLang()] || MENU_LABELS.en;

  document
    .querySelectorAll(
      ".menu-tl .menu-link[href], .menu-tr .menu-link[href], .home-site-menu-link[href], .rides-site-menu-link[href]"
    )
    .forEach((link) => {
      const key = getMenuLabelKey(link.getAttribute("href"));
      if (key) link.textContent = labels[key];
    });

  const titlePage = document.querySelector(".title-top-page");
  if (titlePage) {
    const key = getMenuLabelKey(window.location.pathname);
    if (key && key !== "home") titlePage.textContent = labels[key];
  }

  syncDocumentTitle();
}

function syncDocumentTitle() {
  const lang = getSiteLang();
  const labels = MENU_LABELS[lang] || MENU_LABELS.en;
  const path = window.location.pathname;
  const key = getMenuLabelKey(path);
  const brand = "BRING YOUR OWN BIKE | Studio Yeon Sung";

  if (!key || key === "home") {
    document.title = brand;
    return;
  }

  const rideMatch = path.match(/\/rides\/(\d+)\/?$/);
  if (rideMatch) {
    const num = rideMatch[1];
    document.title =
      lang === "ko"
        ? `${labels.rides} ${num} | ${brand}`
        : `RIDE ${num} | ${brand}`;
    return;
  }

  document.title = `${labels[key]} | ${brand}`;
}

function syncLanguageLinks() {
  const engLink = document.querySelector(".menu-ml .menu-link");
  const koLink = document.querySelector(".menu-mr .menu-link");
  const homeLangToggle = document.querySelector(".home-lang-toggle");
  const isKo = getSiteLang() === "ko";

  if (engLink) {
    engLink.href = localizedPath("en");
    engLink.classList.toggle("menu-link--plain", isKo);
  }

  if (koLink) {
    koLink.href = localizedPath("ko");
    koLink.classList.toggle("menu-link--plain", !isKo);
  }

  if (homeLangToggle) {
    const targetLang = isKo ? "en" : "ko";
    homeLangToggle.href = localizedPath(targetLang);
    homeLangToggle.setAttribute(
      "aria-label",
      isKo ? "Switch to English" : "Switch to Korean"
    );

    const img = homeLangToggle.querySelector("img");
    if (img) {
      img.src = isKo ? "/assets/mobile-kr.svg" : "/assets/mobile-en.svg";
    }
  }

  document.querySelectorAll("a.corner").forEach((link) => {
    link.href = getSiteHomeUrl();
  });

  syncMenuLabels();
}

const rideDetailTextEn = {
  title: "Rides Title is here",
  subtitle: "U-Spectrum Program",
  date: "15 May 2025",
  previewVenue: "Hemburgterrain",
  previewCountry: "NL",
  photoCredit:
    "Photo: Eoming © Studio Yeon Sung, U-Spectrum, Ulsan, 15 May 2025",
  venue: "Hemburgterrain,",
  city: "Zaandam, NL",
  time: "13:00-16:00",
  distance: "3km",
  weather: [
    "29°C",
    "Light Wind, NW10 mph",
    "Humidity: 74%",
    "Air quality: Fair",
  ],
  cyclists: {
    heading: "Cyclists",
    count: "10 Participants",
    nameLines: [
      "Minjun Kim · Seoyeon Lee · Jiho Park · Yujin Choi · Daeun Jung",
      "Seungwoo Han · Chaewon Oh · Taeyang Shin · Haneul Im · Soyul Yoon",
    ],
  },
  story: [
    "On a rainy March afternoon, ten cyclists gathered at De Ceuvel — a former shipyard turned cultural hub on the waterfront of Amsterdam Noord. Under light rain and a northwest wind, participants rode 6km through the post-industrial landscape, their bodies absorbing the damp air and the quiet hum of the city.",
    "The ride lasted three hours, moving slowly enough to sense the weather as material — not obstacle, but medium. With fair air quality and limited visibility, the group navigated the landscape together, each body becoming a sensor, each breath a small act of collective weathering.",
  ],
  credits: [
    { title: "Concept & Production", name: "Studio Yeon Sung" },
    {
      title: "Presented at",
      name: "Sonic Acts Festival · Varia · Cycle Up Residency · Wasteland Festival · U-Spectrum",
    },
    { title: "Illustration", name: "Heejung Kim" },
    { title: "Web Design", name: "Studio165" },
    { title: "Web Development", name: "Studio165 with Cursor" },
  ],
};

const ride01DetailTextEn = {
  title: "Edition 05",
  subtitle: "Same Road,\nDifferent Reasons",
  subtitleItalic: true,
  date: "25 October 2025, Saturday",
  previewDate: "25 Oct 2025",
  previewVenue: "Taehwa River",
  previewCountry: "KR",
  photoCredit:
    "Photo: Eoming © Studio Yeon Sung, U-Spectrum, Ulsan, 25 October 2025",
  venue: "Taehwa River",
  cityHtml: "Seongnam Riverside<br>→ Reed Fields<br>Ulsan, KR",
  time: "14:00-16:00",
  distance: "10km",
  weather: [
    "22°C",
    "Light Wind, N 5 mph",
    "Humidity: 68%",
    "Air quality: Moderate",
  ],
  cyclists: {
    heading: "6 Cyclists",
    count: "",
    nameLines: [
      "Ahae Kim · Jinhee Yang · Jihyeon Kim · Sian Kim · Woosoo Lee · Yerin Lee",
    ],
  },
  story: [
    "The fifth edition of BYOB was the first ride held in South Korea, following the course of the Taehwa River in Ulsan.\n\nOnce contaminated by industrial wastewater under the shadow of rapid industrialization, the Taehwa River has, through the sustained efforts of countless citizens and the government, become the city's most beloved cycling route and its representative ecological space today.\n\nThis ride set out from the river's revived present and traced its way back through the marks left by the past it had overcome.\n\n˚✩☁︎︎⋆｡ˏˋ ˚\n\nCitizens and artists rode upstream together, following sewage treatment plants, floodgates, and pollution monitoring stations along the way.\n\nAnd at the end of that path, we came face to face with the Hyundai Motor factory complex, a site that symbolizes present-day industrial Ulsan.\n\n⋆｡ﾟ☁︎｡ﾟ⋆｡ﾟ☁︎｡ﾟ⋆\n\nIn earlier editions held in European cities like the Netherlands and Germany, it was relatively easy to ride close to or even into industrial facilities.\nHere, the situation was quite different. Most industrial sites strictly restricted public access, and in many places the bike path itself simply cut off around these facilities.\n\nWe stood among the silver grass fields and looked across the river at Ulsan's factories lined up in the distance.\n\nAcross that distance we couldn't easily close, we talked about the city's ecology, its pollution, and its control. How much a place allows others to approach says just as much as what lies inside it. That unclosable distance between us was, in itself, a clear picture of the boundaries this industrial city of Ulsan holds.\n\n˖*༄\n\nFew cities carry the light and shadow of industrialization as vividly as Ulsan.\n\nThe Taehwa River, once called a \"river of death\" in the 1960s, has reclaimed its clear water and become a national garden, but the city's factories have never once stopped running.\n\nAs we rode past the factories, we actually crossed paths with countless workers on their way to work. Some dressed in full cycling gear, others in factory uniforms, each riding their own kind of bike toward their workplace.\n\n𓆝 𓆟 𓆞 𓆝𓇢𓆸\n\nWe pedaled under the name of \"art.\" They pedaled for \"labor, for life.\"\nOn the very same road, making the exact same motion, the reasons we stood there were worlds apart.\n\nFeeling that deep difference between us, we passed through several kilometers carrying the two faces this city holds.\n\nOn the border where these two opposing worlds crossed seamlessly, we traced out a new trajectory of possibility, one where ecology, labor, and art might share the same time and space.",
  ],
  credits: [
    { title: "Program Assistance", name: "Eunji Kwak · Ahae Kim" },
    { title: "Organized by", name: "Ulsan Cultural Tourism Foundation" },
    { title: "Hosted by", name: "MM" },
    { title: "In collaboration with", name: "CLoFA" },
    { title: "Presented at", name: "U-Spectrum" },
    { title: "Photography", name: "Eoming" },
    { title: "Videography", name: "Shinyoung Kim" },
  ],
};

const ride05DetailTextEn = {
  title: "Edition 01",
  subtitle: "What the Weather Gave Us",
  subtitleItalic: true,
  date: "23 March 2024",
  previewDate: "23 Mar 2024",
  previewVenue: "Hembrugterrein→Westpoort",
  previewCountry: "NL",
  photoCredit:
    "Photo: Bora Sekerci © Studio Yeon Sung, Sonic Acts Festival, Amsterdam, 23 March 2024",
  venue: "Hembrugterrein → Westpoort,",
  city: "Amsterdam, NL",
  timeHtml: "12:00-13:00<br>14:00-15:00",
  distance: "8km",
  weather: [
    "7°C",
    "Strong Wind, SW 35 mph",
    "Humidity: 82%",
    "Air quality: Fair",
  ],
  cyclists: {
    heading: "3 Cyclists",
    count: "",
    nameLines: [
      "Fileona Dkhar · Katya Borisova · Minari Lee",
    ],
  },
  story: [
    "Unfortunately, on the long-awaited day of BYOB's first edition, a storm warning was issued across the Netherlands.\n\nOf the seven people registered, only three showed up, friends of the artist who came out of a sense of responsibility. We're grateful to them, once again.\n\nThe wind was strong enough to push \"weathering,\" the abstract concept we'd meant to explore through the body, past itself, turning it into the vivid reality we were now passing through with our whole bodies.\n\nOn some stretches, even turning the pedals was a struggle. But paradoxically, it was the perfect day, nothing could have fit better, to begin this project built around the collision of weather and body.\n\n☁︎ ☁︎ ☁︎ ☁︎\n\nWe started at Het Hem, an art space inside the Hembrugterrein complex in Zaandam, a former munitions factory site that had stayed hidden behind firmly closed walls for years before it was finally opened up to artists and the public.\n\nBefore setting off, we took a moment to reflect on the dark history this place held, quietly retracing the past carried by its buildings.\n\nThen we boarded the Hempont ferry, which busily carries people and riders back and forth between Zaandam and Amsterdam's port district.\n\nThe ferry crossed the North Sea Canal and brought us to the entrance of Westpoort, Amsterdam's massive industrial port.\n\n.𖥔 ݁ ˖⋆ ˚❆\n\nGiant wind turbines lined up along the port's skyline groaned overhead, generating power for the harbor.\n\nAt the scrap metal terminal, mountains of compressed steel sat piled high, waiting for ships bound for Turkey. True to its title as \"the world's largest gasoline port,\" the oil terminals stretched endlessly along the waterline.\n\nThe headwind pushed us back relentlessly with every pedal stroke, and the harder we tried to push through it, the more our breath rose to our throats.\n\nIn the middle of that storm-battered harbor, we were humbled through and through.\n\nWe learned, in our bodies, the way humans, cities, and environment endure each other within weather this vast.",
  ],
  credits: [
    {
      title: "Presented at",
      name: "Sonic Acts Festival 2024\nas part of Program Sediments",
    },
    { title: "Photography", name: "Bora Sekerci" },
  ],
};

const ride02DetailTextEn = {
  title: "Edition 04",
  subtitle: "Following the Overlapping Sounds",
  subtitleItalic: true,
  date: "26 July 2025",
  previewDate: "26 Jul 2025",
  previewVenue: "Vlaardingen→Botlek",
  previewCountry: "NL",
  photoCredit:
    "Photo: Silvia Arenas © Studio Yeon Sung, Wasteland Festival, Rotterdam, 26 July 2025",
  venue: "Vlaardingen → Botlek,",
  cityHtml: "Rotterdam, NL",
  time: "11:00-15:00",
  distance: "30km",
  weather: [
    "24°C",
    "Light Wind, SW 15 mph",
    "Humidity: 72%",
    "Air quality: Poor",
  ],
  cyclists: {
    heading: "9 Cyclists",
    count: "",
    nameLines: [
      "Floris De Haan · Jorge Simelio · Katya Borisova · Nicilien Wolf · Nik · Phone Myant Khant · Raziel Miranda · Silvia Arena",
    ],
  },
  story: [
    "The fourth edition of BYOB set out from Oeverbos in Vlaardingen.\n\nOeverbos is an artificial forest, created by burying the Port of Rotterdam's polluted soil and industrial sediment, covering it with earth, and planting trees on top, a place that symbolically buries the traces of industrialization under a forest.\n\nWe sat on the grass for a bit of coffee, then passed the landfill and sewage treatment plant still sitting at the forest's edge on our way to the ferry dock. The ferry carried us across the Het Scheur river into the village of Rozenburg.\n\n༄☁︎𝄞✧˖°⭑\n\nEven sitting in the middle of one of Europe's largest industrial zones, Rozenburg's first impression was utterly peaceful, well-kept gardens and quiet lanes stretching on.\n\nBut soon the massive stacks of AVR, Europe's largest waste-to-energy facility, rose up ahead of us. Steam and smoke climbed ceaselessly into the sky and settled low over the road.\n\nWe talked together about what enormous cycle brings a city's discarded waste all the way here, but no one among us could easily explain the answer.\n\n☁︎⋆⁺₊⋆ ☀︎ ⋆⁺₊⋆\n\nFrom there we pushed further, into the heart of Botlek, the core of the Port of Rotterdam and one of the densest petrochemical clusters in Europe.\n\nOn one side, mountains of coal lined up; on the other, steam-venting facilities and storage tanks, and between them, containers stacked layer upon layer, stretching endlessly. It was hard to even tell where one factory ended and the next began.\n\n.·:¨ ¨:·.\n\nAfter riding for a long while, we settled in the shadow of Air Products' HyCO4 plant and rested for a bit.\n\nA dense assembly of metal pipes, the kind that makes you feel something close to mechanical sublimity, a sense of \"how could humans have built something like this.\" This hydrogen production facility, promoted as the port's clean-energy future, kept venting steam skyward without pause.\n\nHaving a picnic in front of a massive factory that never stops, not for a single moment, stirred a strange sensation.\n\nThe scene read two ways at once.\nThe technology has clearly evolved toward capturing carbon, but the towering steel structure in front of us and the steam pouring out of it looked exactly the same as before. All we could do was imagine the hydrogen gas, deep beneath our feet, quietly spreading out through the port along invisible pipelines.\n\n࿐༉\n\nFor this edition, we debuted an upgraded performance bike.\nWe fitted the bike with a portable lithium battery, letting it generate a soundscape in real time as we rode, which made the performance that much richer.\n\nOn the way back from Botlek to Rozenburg, the bike responded to the air around it, generating sound in real time. Someone laughed that it sounded like a broken ice cream cart.\n\nThe unfamiliar sound ringing out from the speaker and the heavy engine sounds drifting from the factories mixed together in the air, disorienting.\n\nFeeling that layered sound, we rode the long stretch back in silence.\n\n⁺◟✹\n\nThe stillness of Rozenburg, met again, arrived with an entirely different sensation.\nAmid the heavy breathing of the massive factories, it felt closer to a precarious hush, as if the place itself were quietly holding its breath.\n\nTracing back, through sound, a sense of the air we couldn't see, we rode on across the vast silence the city had turned away from.",
  ],
  credits: [
    { title: "Curator & Program Assistance", name: "Katya Borisova" },
    { title: "Presented at", name: "Wasteland Festival 2025" },
    { title: "Photography", name: "Silvia Arenas" },
  ],
};

const ride03DetailTextEn = {
  title: "Edition 03",
  subtitle: "Along the Working River",
  subtitleItalic: true,
  date: "25 September 2024",
  previewDate: "25 Sep 2024",
  previewVenue: "Westhafen",
  previewCountry: "DE",
  photoCredit:
    "Photo: Zuzana-Markéta Macková © Studio Yeon Sung, ZK/U, Berlin, 25 September 2024",
  venue: "Westhafen, Berlin, DE",
  city: "",
  time: "17:00-19:00",
  distance: "6km",
  weather: [
    "17°C",
    "Light Wind, SW 5 mph",
    "Humidity: 71%",
    "Air quality: Moderate",
  ],
  cyclists: {
    heading: "10 Cyclists",
    count: "",
    nameLines: [
      "Anita Rind · Claude Pailliot · Gaëtan Collet · Grigoris Bourdalas · Heejung Kim · Kyoko Kagata · Simona Binko · Tuçe Erel",
    ],
  },
  story: [
    "The third edition of BYOB unfolded around Westhafen, Berlin's largest inland port, as part of the closing event of the CYCLE UP! residency, with ZK/U's resident artists and local Berlin riders joining in.\n\nFrom my residency window I could see the containers stacked at Westhafen, and every morning a smell like melting metal drifted into the room.\n\nThe air quality sensor I'd set up indoors kept flagging bad air, again and again.\n\nWe rode out on bikes we'd modified and built ourselves during the residency.\n\nWe started from the ZK/U building, originally used as a freight warehouse.\nStepping out the door, the Spree came into view, the river cutting through central Berlin, its water wrapping around the Moabit neighborhood like an island.\nMoabit, it turns out, was settled a century ago precisely because it was the best spot to burn coal brought in by barge.\n\n⁺₊⋆ ☁︎ ☀︎ ☁︎ ⋆⁺₊\n\nWe rode along a bike path overlooking the port's industrial facilities.\nFrom up there you could see just how tightly the massive factories and the city were woven together.\n\nKraftwerk Moabit, a coal power plant sitting barely four kilometers from the Brandenburg Gate, right in the middle of the city, was still running.\nIt felt strange that a coal plant could exist in the heart of a city like this.\n\nAt first glance it looks like a fatal mistake in urban planning, but it's actually a thoroughly calculated outcome. This plant's real job isn't just making electricity.\nIt functions as a giant central boiler, sending hot water and warmth out across the whole city. To get through Berlin's harsh winters and keep daily life running, this massive plant has no choice but to live embedded in the middle of the city, a kind of structural fate.\n\nIts chimney rising straight out of the city center looks at first like a planning error, but again, it's fully calculated.\nHeat cools fast the farther it travels, so a plant supplying warmth to an entire city has to sit this close to where people actually live.\n\nOnce I understood that, it became hard to see the city and its many industrial facilities as separate things. They weren't two distinct spaces, but more like two enormous engines driving a single city.\n\n⋆｡°•☁︎\n\nSteel tanks and silos were packed with sand and construction waste, and rows of containers waited for the freight train to Hamburg.\nOn the river, barges carried the same heavy cargo they've carried for the past hundred years. Scattered among those old coal docks, a few newly installed hydrogen tanks stood out.\n\nA century-old infrastructure, still running without pause, doing exactly what it was built to do from the start.\n\nPedaling along that waterway, it became disorienting to say which century's landscape we were actually riding through.",
  ],
  credits: [
    {
      title: "Presented at",
      name: "ZK/U, as part of the Cycle Up! Residency",
    },
    {
      title: "Residency Coordinator",
      name: "Anita Rinda · Natálie Černá · Simona Binko",
    },
    { title: "Program Production Assistance", name: "Heejung Kim" },
    { title: "Photography", name: "Zuzana-Markéta Macková" },
    { title: "Funded by", name: "Cycle Up! project" },
    {
      title: "Co-financed by",
      name: "The Creative Europe Programme of the European Union",
    },
  ],
};

const ride04DetailTextEn = {
  title: "Edition 02",
  subtitle: "Beyond the Boxes:\nTracing the Erasure of Lives",
  subtitleItalic: true,
  date: "Saturday 8 June 2024",
  previewDate: "8 Jun 2024",
  previewVenue: "Waalhaven→Pernis",
  previewCountry: "NL",
  photoCredit:
    "Photo © Studio Yeon Sung, Varia, Rotterdam, 8 June 2024",
  venue: "Waalhaven → Pernis,",
  cityHtml: "Rotterdam, NL",
  time: "10:30 - 15:00",
  distance: "12km",
  weather: [
    "18°C",
    "Light Wind, NW10 mph",
    "Humidity: 68%",
    "Air quality: Fair",
  ],
  cyclists: {
    heading: "8 Cyclists",
    count: "",
    nameLines: [
      "Amy Pickles · Cristina Cochior · Czarina Calinawagan · Dafni Melidou · 4 Varia Members",
    ],
  },
  story: [
    "The second edition of BYOB set out from the office of Varia, an art collective based in southern Rotterdam, and headed toward the Waalhaven pier, one stretch among the countless docks and terminals that make up the massive Port of Rotterdam.\n\nOn either side of the road, container boxes closely resembling cranes rose precariously, several stories high.\n\nAmid those dense steel walls, the boundaries between one container and the next, and the boundaries of the waterways flowing beneath them, gradually blurred.\n\nConceived as part of the program \"Colonial Infrastructures: on Containerisation,\" this ride was a journey to look closely at what those containers actually carry.\n\nIt wasn't just the cargo reduced to numbers of throughput. We wanted to surface the countless stories that had passed through this enormous port, a port that processes everything only in units of \"container\" while utterly forgetting the unit of \"person.\"\n\n⋆｡ﾟ☁︎｡⋆｡ ﾟ☾ ﾟ｡⋆\n\nLeaving the terminal, the road narrowed and we finally broke free of that sea of anonymous boxes.\n\nSoon a thick, acrid smell of oil drifted through the air, and we entered the village of Pernis.\n\nEven as Europe's largest Shell refinery, surrounding the village on every side, ceaselessly pumped out fumes and stench, this small village of just over five thousand people held its ground quietly, somehow keeping its tidy alleys, its gardens, and the church's pointed spire intact.\n\nRiding from one end of the village to the other took only a few minutes.\n\nBut shifting our senses, from the world of massive, anonymous scale we'd just passed through to houses that carried human warmth, from faceless \"scale\" to \"everyday life\" with its own name, took much longer than that.\n\n༄☁︎𝄞✧˖°⭑\n\nThis ride carried extra meaning because we rode alongside the artist Czarina.\n\nHer work traces the letters her father sent home over the years he spent working on container ships. Her work and our ride, each in its own way, tried to re-record the presences that a massive infrastructure system was designed to erase.\n\nCarrying that context with us, the containers looked like an entirely different landscape.\n\nThey weren't simply boxes carrying goods.\n\nThey were closer to an elaborate device designed to silently bury individual people and their lives inside the scale of a massive system.",
  ],
  credits: [
    {
      title: "Presented at",
      name: "Varia · as part of Colonial Infrastructures: on Containerisation",
    },
    {
      title: "Collaborating with",
      name: "Amy Pickles · Czarina Calinawagan",
    },
    { title: "Photography", name: "Various Varia Members" },
  ],
};

const ride01DetailTextKo = {
  title: "에디션 05",
  subtitle: "같은 길,\n서로 다른 이유들",
  subtitleItalic: true,
  date: "2025년 10월 25일, 토요일",
  previewDate: "2025년 10월 25일",
  previewVenue: "Taehwa River",
  previewCountry: "한국",
  photoCredit:
    "사진: 어밍 © 스튜디오 연성, U-Spectrum, 울산, 2025년 10월 25일",
  venue: "Taehwa River,",
  city: "울산, 한국",
  time: "14:00-16:00",
  distance: "10km",
  weather: [
    "19°C",
    "약한 바람, W8 mph",
    "습도: 63%",
    "대기질: 좋음",
  ],
  cyclists: {
    heading: "6명의 사이클리스트",
    count: "",
    nameLines: [
      "김아해 · Jinhee Yang · Jihyeon Kim · Sian Kim · Woosoo Lee · Yerin Lee",
    ],
  },
  story: [
    "다섯 번째 BYOB 에디션은 한국에서 열린 첫 라이딩으로, 울산 태화강 줄기를 따라 진행됐다.\n\n한때 급격한 산업화의 그늘 아래 산업폐수로 오염되었던 태화강은, 수많은 사람들과 정부의 노력으로 지금은 시민들이 가장 즐겨 찾는 자전거 코스이자 도시의 대표적인 생태 공간이 되었다.\n\n이번 라이딩은 이처럼 되살아난 강의 현재에서 출발해, 오염을 극복해 온 과거의 흔적들을 되짚어 보는 여정이었다.\n\n˚✩☁︎︎⋆｡ˏˋ ˚\n\n시민들과 예술가들은 하수처리장과 수문, 오염측정소를 따라 강을 거슬러 올라갔다.\n그리고 그 길의 끝에서, 지금의 산업도시 울산을 상징하는 현대자동차 공장 부지와 마주했다.\n\n⋆｡ﾟ☁︎｡ﾟ⋆｡ﾟ☁︎｡ﾟ⋆\n\n네덜란드나 독일 등 이전 에디션이 열린 유럽 도시에서는 산업시설 근처나 내부로 직접 들어가는 것이 비교적 자유로웠지만, 이곳의 사정은 사뭇 달랐다.\n\n대부분의 산업시설은 일반인의 접근이 엄격히 제한되어 있었고, 시설 주변으로 자전거 도로 자체가 끊겨 있는 경우도 많았다.\n\n우리는 억새군락지에 서서 강 건너편에 길게 늘어선 울산의 공장들을 멀리서 바라보았다.\n쉽게 다가갈 수 없는 그 거리를 사이에 두고, 도시의 생태와 오염, 그리고 통제에 대해 이야기를 나눴다.\n\n어떤 장소가 타인에게 얼마나 다가오도록 허락하는지는, 그 안에 무엇이 있는지 못지않게 많은 것을 말해준다.\n좁혀지지 않는 그 사이의 거리감은 그 자체로 산업도시 울산이 가진 경계를 분명하게 보여주고 있었다.\n\n˖*༄\n\n울산처럼 산업화의 빛과 그림자를 이토록 선명하게 품고 있는 도시도 드물다.\n\n1960년대 '죽음의 강'이라 불리던 태화강은 맑은 물을 되찾고 국가정원이 되었지만, 도시의 공장들은 단 한 번도 멈춘 적이 없다. 공장 옆을 지나는 동안, 우리는 실제로 출근길에 오른 수많은 노동자들과 마주쳤다.\n\n전문 자전거 옷을 갖춰 입은 이부터 공장 유니폼을 입은 이까지, 저마다 다른 자전거를 타고 일터로 향하고 있었다.\n\n𓆝 𓆟 𓆞 𓆝𓇢𓆸\n\n우리는 '예술'이라는 이름 아래 페달을 밟았고, 그들은 '삶을 위한 노동'을 위해 페달을 밟았다. 같은 길 위에서 완전히 같은 동작을 하고 있었지만, 그 위에 서 있는 이유는 너무나 달랐다.\n\n그 사이에 존재하는 깊은 차이를 느끼며, 우리는 몇 킬로미터에 걸쳐 이 도시가 가진 두 개의 얼굴을 지나왔다.\n\n우리는 이 상반된 두 세계가 매끄럽게 교차하는 경계선 위에서, 생태와 노동, 그리고 예술이 같은 시공간을 공유할 수 있는 새로운 가능성의 궤적을 그려나갔다.",
  ],
  credits: [
    { title: "프로그램 도움", name: "곽은지 · 김아해" },
    { title: "주관", name: "울산문화관광재단" },
    { title: "주최", name: "MM" },
    { title: "협력", name: "CLoFA" },
    { title: "발표 장소", name: "U-Spectrum" },
    { title: "사진", name: "어밍" },
    { title: "영상", name: "김신영" },
  ],
};

const ride02DetailTextKo = {
  title: "에디션 04",
  subtitle: "겹쳐진 소리를 따라서",
  subtitleItalic: true,
  date: "2025년 7월 26일",
  previewDate: "2025년 7월 26일",
  previewVenue: "Vlaardingen→Botlek",
  previewCountry: "네덜란드",
  photoCredit:
    "사진: Silvia Arenas © 스튜디오 연성, Wasteland Festival, 로테르담, 2025년 7월 26일",
  venue: "Vlaardingen → Botlek,",
  cityHtml: "로테르담, 네덜란드",
  time: "11:00-15:00",
  distance: "30km",
  weather: [
    "24°C",
    "약한 소나기, WSW9 mph",
    "습도: 68%",
    "대기질: 좋음",
  ],
  cyclists: {
    heading: "9명의 사이클리스트",
    count: "",
    nameLines: [
      "Floris De Haan · Jorge Simelio · Katya Borisova · Nicilien Wolf · Nik · Phone Myant Khant · Raziel Miranda · Silvia Arena",
    ],
  },
  story: [
    "네 번째 BYOB 에디션은 Vlaardingen의 Oeverbos에서 출발했다.\n\nOeverbos는 과거 로테르담 항구의 오염된 흙과 찌꺼기를 매립한 뒤 그 위에 흙을 덮고 나무를 심어 조성한 인공 숲으로, 산업화의 흔적을 숲으로 덮어낸 상징적인 장소다.\n\n잔디밭에 앉아 잠시 커피를 마신 뒤, 숲 가장자리에 여전히 남아 있는 매립지와 하수처리장을 지나 페리 선착장으로 갔다. 페리를 타고 Het Scheur 강을 건너 Rozenburg 마을로 넘어갔다.\n\n༄☁︎𝄞✧˖°⭑\n\n유럽 최대 규모의 산업지대 한가운데 들어서 있음에도, Rozenburg 마을의 첫인상은 더없이 평온했다. 잘 정돈된 정원과 조용한 골목길이 이어졌다.\n\n하지만 이내 유럽 최대 규모의 폐기물 에너지화(Waste-to-Energy) 시설인 AVR의 거대한 연통이 눈앞에 솟아올랐다. 하늘 위로 수증기와 연기가 끊임없이 치솟으며 도로 위를 낮게 덮었다.\n\n우리가 도시가 버린 폐기물들이 어떤 거대한 순환을 거쳐 이곳으로 모여드는지에 대해 함께 이야기했지만, 그 답을 쉽게 설명할수 있는 사람은 아무도 없었다.\n\n☁︎⋆⁺₊⋆ ☀︎ ⋆⁺₊⋆\n\n우리는 거기서 더 나아가 로테르담 항의 핵심이자 유럽에서 가장 밀집된 석유화학 단지 중 하나인 Botlek 중심부로 들어갔다.\n\n한쪽에는 거대한 석탄 산이 늘어서 있었고, 다른 한쪽에는 증기를 뿜어내는 시설과 저장 탱크, 그 사이에 겹겹이 쌓인 컨테이너들이 끝없이 이어졌다.\n\n어디서부터가 하나의 공장이고 어디서부터가 다음 공장인지 구별하기조차 어려울 정도였다.\n\n.·:¨ ¨:·.\n\n우리는 한참을 달리다 Air Products의 HyCO4 공장 그림자 아래 자리를 잡고 잠시 쉬어 갔다.\n\n'인간이 어떻게 이런 구조물을 만들어낼 수 있을까' 하는 기계적인 숭고미마저 느끼게 하는 복잡한 금속 파이프의 집합체.\n\n항구의 청정에너지 미래라 홍보되는 이 수소 생산 시설은 하늘을 향해 끊임없이 증기를 뿜어내고 있었다.\n단 한 순간도 쉬지 않고 돌아가는 거대한 공장 앞에서 즐기는 피크닉은 묘한 감각을 불러일으켰다.\n\n그 풍경은 두 가지 의미로 읽혔다.\n탄소를 포집하는 방식으로 기술은 분명 진화했지만, 눈앞의 거대한 철골 구조물과 뿜어져 나오는 증기는 예전과 똑같았다.\n다만 발밑 깊은 곳, 보이지 않는 파이프라인을 타고 항구 전역으로 은밀하게 퍼져나갈 수소 가스의 존재를 상상해볼 뿐이었다.\n\n࿐༉\n\n이번 에디션에서는 업그레이드한 퍼포먼스 자전거를 선보였다. 자전거에 휴대용 리튬 배터리를 설치하여 실시간으로 자전거에서 사운드스케이프를 생성케 하였고, 덕분에 퍼포먼스가 한층 더 풍부해졌다.\n\nBotlek을 지나 다시 Rozenburg로 돌아오는 길, 자전거는 주변 공기에 반응해 실시간으로 소리를 만들어냈다. 누군가는 그 소리가 고장 난 아이스크림 카트에서 나는 소리 같다고 웃었다.\n\n스피커에서 울려 퍼지는 낯선 소리와 공장에서 흘러나오는 육중한 엔진 소리가 공기 중에서 어지럽게 섞였다.\n우리는 그 겹쳐진 소리들을 느끼며 먼 길을 말없이 달렸다.\n\n다시 만난 Rozenburg의 적막은 전혀 다른 감각으로 다가왔다.\n거대한 공장들의 육중한 숨소리 사이, 조용히 숨을 죽이고 있는 듯한 아슬아슬한 정적에 가까웠다.\n우리는 눈에 보이지 않던 공기의 감각을 소리로 되짚으며, 도시가 외면해 온 그 거대한 침묵을 가로질러 나아갔다.",
  ],
  credits: [
    { title: "큐레이터 & 프로그램 지원", name: "Katya Borisova" },
    { title: "발표 장소", name: "Wasteland Festival 2025" },
    { title: "사진", name: "Silvia Arenas" },
  ],
};

const ride03DetailTextKo = {
  title: "에디션 03",
  subtitle: "시간이 겹쳐진 물길 위에서",
  subtitleItalic: true,
  date: "2024년 9월 25일",
  previewDate: "2024년 9월 25일",
  previewVenue: "Westhafen",
  previewCountry: "독일",
  photoCredit:
    "사진: Zuzana-Markéta Macková © 스튜디오 연성, ZK/U, 베를린, 2024년 9월 25일",
  venue: "Westhafen, 베를린, 독일",
  city: "",
  time: "17:00-19:00",
  distance: "6km",
  weather: [
    "17°C",
    "약한 비, N10 mph",
    "습도: 85%",
    "대기질: 보통",
  ],
  cyclists: {
    heading: "10명의 사이클리스트",
    count: "",
    nameLines: [
      "Anita Rind · Claude Pailliot · Gaëtan Collet · Grigoris Bourdalas · Heejung Kim · Kyoko Kagata · Simona Binko · Tuçe Erel",
    ],
  },
  story: [
    "세 번째 BYOB 에디션은 베를린에서 가장 큰 내륙 항구인 Westhafen 주변에서 펼쳐졌다. CYCLE UP! 레지던시의 마지막 행사의 일환으로 ZK/U 레지던시 작가들과 베를린 현지 라이더들이 참가했다.\n\n내 레지던시 창문 너머에는 Westhafen 에 있는 컨테이너들이 보였고, 매일 아침마다 쇠를 녹이는듯한 냄새가 방으로 흘러들어왔다. 방 안에 설치한 미세먼지 측정기는 걸핏하면 공기질이 나쁨을 알렸다.\n\n우리는 레지던시 동안 직접 개조하고 만든 자전거를 끌고 나왔다.\n출발지는 원래 화물 창고로 쓰였던 ZK/U 건물이었다. 문을 나서자 베를린 도심을 관통하는 Spree 강이 보였고, 물길은 Moabit 동네를 섬처럼 감싸며 흘렀다.\n\nMoabit는 100년 전, 바지선에 실어 온 석탄을 태우기 가장 좋은 자리에 잡은 동네였다고 한다.\n\n⁺₊⋆ ☁︎ ☀︎ ☁︎ ⋆⁺₊\n\n항구의 산업 시설들이 내려다보이는 자전거길을 따라 달렸다.\n거대한 공장들과 도시가 얼마나 촘촘히 얽혀있는지 내려다보였다.\n\nBrandenburg Gate (브란덴부르크 문)에서 겨우 4km 남짓 떨어진 도심 한복판에 위치한 Kraftwerk Moabit 석탄 발전소는 여전히 가동 중이었다. 이토록 도심 한 가운데 석탄 발전소가 존재할 수 있다는 사실이 생경했다.\n\n얼핏 보면 도시 계획의 치명적인 실수처럼 보이는 풍경이지만, 사실은 철저히 계산된 결과다.\n\n이 발전소의 진짜 역할은 단순히 전기를 만드는 데 그치지 않고, 도시 전체에 뜨거운 물과 온기를 보낼 ‘거대한 중앙 보일러’ 역할을 하는 데 있다.\n\n베를린의 혹독한 겨울을 견뎌내고 일상을 유지하기 위해선 이 육중한 발전소는 도심 한복판에 품고 살 수밖에 없는 구조적 운명을 지닌 것이다.\n\n우뚝 도심 속 굴뚝을 솟구친 모습이 얼핏 보면 도시 계획의 실수처럼 보이지만, 사실은 철저히 계산된 결과다. 열은 멀리 이동할수록 금방 식어버리기 때문에, 도시 전체에 온기를 공급하는 발전소는 이처럼 삶의 터전 가까이에 붙어 있어야만 한다.\n\n그 속사정을 알고 나니 도시와 수많은 산업 시설들을 분리해서 보기가 힘들어졌다. 그 둘은 별개의 공간이 아니라, 하나의 도시를 움직이는 두 개의 거대한 엔진과 같았다.\n\n⋆｡°•☁︎\n\n철제 탱크와 사일로에는 모래와 건설 폐기물이 가득 들어차 있었고, 줄지어 선 컨테이너들은 Hamburg로 떠날 화물열차를 기다리고 있었다.\n\n강 위로는 바지선들이 지난 백년과 똑같이 무거운 화물을 실어 날랐다. 그 오래된 석탄 부두들 사이사이로 새로 들어선 수소 탱크 몇 개가 눈에 띄었다.\n\n처음 지어진 목적 그대로 지금도 쉼 없이 돌아가는 백 년 전의 인프라.\n\n그 물길을 따라 페달을 밟다 보니, 지금 우리가 달리고 있는 곳이 과연 몇 세기의 풍경인지 아득해졌다.",
  ],
  credits: [
    {
      title: "발표 장소",
      name: "ZK/U\nCycle Up! Residency 프로그램",
    },
    {
      title: "레지던시 코디네이터",
      name: "Anita Rinda · Natálie Černá · Simona Binko",
    },
    { title: "프로그램 제작 도움", name: "김희정" },
    { title: "사진", name: "Zuzana-Markéta Macková" },
    { title: "재정 지원", name: "Cycle Up! project" },
    {
      title: "공동 재정 지원",
      name: "The Creative Europe Programme of the European Union",
    },
  ],
};

const ride04DetailTextKo = {
  title: "에디션 02",
  subtitle: "박스들 너머, 지워진 숨결을 따라",
  subtitleItalic: true,
  date: "2024년 6월 8일, 토요일",
  previewDate: "2024년 6월 8일",
  previewVenue: "Waalhaven→Pernis",
  previewCountry: "네덜란드",
  photoCredit:
    "사진 © 스튜디오 연성, Varia, 로테르담, 2024년 6월 8일",
  venue: "Waalhaven → Pernis,",
  cityHtml: "로테르담, 네덜란드",
  time: "10:30 - 15:00",
  distance: "12km",
  weather: [
    "19°C",
    "다소 강한 바람, WSW14 mph",
    "습도: 77%",
    "대기질: 좋음",
  ],
  cyclists: {
    heading: "8명의 사이클리스트",
    count: "",
    nameLines: [
      "Amy Pickles · Czarina Calinawagan · Dafni Melidou",
    ],
  },
  story: [
    "두 번째 BYOB 에디션은 로테르담 남쪽에 위치한 예술 콜렉티브 Varia의 오피스에서 출발해 Waalhaven을 부두로 향했다. 거대한 로테르담 항구를 이루는 수많은 부두와 터미널들 중 한 구간이었다.\n\n길 양옆으로는 크레인과 꼭 닮은 컨테이너 상자들이 몇 층 높이로 위태롭게 솟아 있었다. 그 빽빽한 철제 벽들 사이에서는 컨테이너끼리의 경계도, 그 아래 흐르는 물길의 경계도 점차 흐릿해졌다.\n\n‘식민지 인프라스트럭처: 컨테이너화에 대하여(Colonial Infrastructures: on Containerisation)’ 프로그램의 하나로 기획된 이번 라이딩은, 컨테이너 상자들이 실제로 무엇을 나르고 있는지 톺아보는 여정이었다. 단순히 물동량이라는 숫자로 환산되는 화물뿐만 아니라, 모든 것을 '컨테이너' 단위로만 처리할 뿐 '사람'의 단위는 까맣게 잊어버린 이 거대한 항구를 거쳐 간 수많은 이야기를 들춰내고자 했다.\n\n⋆｡ﾟ☁︎｡⋆｡ ﾟ☾ ﾟ｡⋆\n\n터미널을 벗어나자 도로가 좁아지며 정체 모를 상자들의 바다를 빠져나왔다.\n곧이어 공기 중으로 매캐한 기름 냄새가 짙게 풍겨왔고, 우리는 Pernis 마을에 들어섰다.\n사방을 에워싼 유럽 최대 규모의 Shell 정유 공장이 쉼 없이 매연과 악취를 뿜어내는 와중에도, 인구 5천 명 남짓한 이 작은 마을은 정돈된 골목길과 정원, 교회의 뾰족한 첨탑을 어떻게든 지켜내며 덤덤히 버티고 있었다.\n\n마을의 이쪽 끝에서 저쪽 끝까지 달리는 데는 겨우 몇 분이면 충분했다.\n하지만 방금 지나쳐 온 거대한 규격의 세계에서 사람의 온기가 느껴지는 집으로, 정체 없는 '규격'에서 제이름을 가진 '일상'으로 감각을 전환하는 데는 그보다 훨씬 긴 시간이 필요했다.\n\n༄☁︎𝄞✧˖°⭑\n\n이번 라이딩은 아티스트 Czarina와 나란히 달렸기에 더욱 의미있었다. 그녀의 작업은 컨테이너선에서 수년간 일했던 아버지가 집으로 보내온 편지들의 궤적을 추적한다. 그녀의 작업과 우리의 라이딩은 각자의 방식으로, 거대한 인프라 시스템이 지워버리도록 설계한 존재들을 다시 기록하고자 했다.\n\n그 맥락을 품고 다시 바라본 컨테이너들은 전혀 다른 풍경으로 다가왔다.\n그것은 단순히 물건을 나르는 상자가 아니었다.\n'사람'이라는 개별적인 존재와 그들의 삶을, 거대한 시스템의 규모 속에 소리 없이 묻어버리도록 설계된 정교한 장치에 가까웠다.",
  ],
  credits: [
    {
      title: "발표 장소",
      name: "Varia의 Colonial Infrastructures: on Containerisation 프로그램",
    },
    {
      title: "협업",
      name: "Amy Pickles · Czarina Calinawagan",
    },
  ],
};

const ride05DetailTextKo = {
  title: "에디션 01",
  subtitle: "우리가 날씨에게 배운 것",
  subtitleItalic: true,
  date: "2024년 3월 23일",
  previewDate: "2024년 3월 23일",
  previewVenue: "Hembrugterrein→Westpoort",
  previewCountry: "네덜란드",
  photoCredit:
    "사진: Bora Sekerci © 스튜디오 연성, Sonic Acts Festival, 암스테르담, 2024년 3월 23일",
  venue: "Hembrugterrein → Westpoort,",
  city: "암스테르담, 네덜란드",
  timeHtml: "12:00-13:00<br>14:00-15:00",
  distance: "8km",
  weather: [
    "9°C",
    "강한 바람, W20 mph",
    "습도: 77%",
    "대기질: 좋음",
  ],
  cyclists: {
    heading: "3명의 사이클리스트",
    count: "",
    nameLines: [
      "Fileona Dkhar · Katya Borisova · Minari Lee",
    ],
  },
  story: [
    "안타깝게도 대망의 첫 번째 BYOB 에디션이 열리는 날, 네덜란드 전역에 강풍 경보가 떴다.\n\n최악의 날씨 아래, 등록한 일곱 명 중 겨우 세 명만 나타났고, 그들은 작가와의 친분 때문에 책임감으로 참가한 이들이었다. (그들에게 다시 한 번 감사함을 느낀다.)\n\n바람은 우리가 몸을 통해 탐구하려 했던 '풍화(weathering)'라는 관념적인 개념을 넘어, 지금 우리가 온몸으로 통과하고 있는 생생한 현실 그 자체로 만들어버릴 만큼 거셌다.\n어떤 구간에서는 페달을 굴리는 것조차 버거울 정도였다.\n하지만 역설적이게도, 날씨와 몸의 부딪힘을 다루는 이 프로젝트를 시작하기에는 더할 나위 없이 완벽한 날이었다.\n\n☁︎ ☁︎ ☁︎ ☁︎\n\n우리는 Zaandam의 Hembrugterrein 단지 안에 위치한 예술 공간 Het Hem에서 출발했다.\n이곳은 오랫동안 굳게 닫힌 담장 뒤에 숨겨져 있다가 비로소 예술가들과 대중에게 공개된 옛 군수공장 부지였다.\n출발 전, 우리는 이 장소가 품고 있던 어두운 역사를 반추하며 건물들이 지닌 과거를 가만히 되짚어보는 시간을 가졌다.\n\n이어 우리는 Hempont 페리에 몸을 실었다.\n페리는 Zaandam과 Amsterdam의 항구 지역 사이를 오가며 사람들과 라이더들을 부지런히 실어 날랐다. 페리는 북해 운하(North Sea Canal)를 건너 Amsterdam의 거대한 산업 항구인 Westpoort 입구에 도착했다.\n\n.𖥔 ݁ ˖⋆ ˚❆\n\n항구의 스카이라인에 줄지어 박힌 거대한 풍력발전기들은 머리 위에서 거친 소리를 내며 항구에 쓸 전력을 만들어내고 있었다.\n고철 터미널에는 터키로 떠날 배를 기다리는 압축 철강 더미가 산처럼 높게 쌓여 있었다.\n'세계 최대의 가솔린 항구'라는 타이틀에 걸맞게 오일 터미널들은 물가를 따라 끝없이 늘어서 있었다.\n\n맞바람은 페달을 밟을 때마다 우리를 집요하게 밀쳐냈고, 그 거친 바람을 뚫고 나아가려 할수록 숨은 턱끝까지 가빠왔다.\n\n비바람이 몰아치는 항구 한복판에서 우리는 한껏 겸손해졌다. 거대한 날씨 속에서 인간과 도시, 환경이 서로를 견뎌내는 방식을 몸으로 배웠다.",
  ],
  credits: [
    {
      title: "발표 장소",
      name: "Sonic Acts Festival 2024\nProgram Sediments 프로그램",
    },
    { title: "사진", name: "Bora Sekerci" },
  ],
};

const rideDetailTextKo = ride01DetailTextKo;

function getRideDetailText() {
  return getSiteLang() === "ko" ? rideDetailTextKo : rideDetailTextEn;
}

const rideDetailText = getRideDetailText();

const rides = [
  {
    image: rideCover("01"),
    gallery: rideGallery("01", 9),
    number: "01",
    alt: "Bring Your Own Bike ride 01",
    ...(getSiteLang() === "en" ? ride01DetailTextEn : ride01DetailTextKo),
  },
  {
    image: rideCover("02"),
    gallery: rideGallery("02", 13),
    number: "02",
    alt: "Bring Your Own Bike ride 02",
    ...(getSiteLang() === "en" ? ride02DetailTextEn : ride02DetailTextKo),
  },
  {
    image: rideCover("03"),
    gallery: rideGallery("03", 10),
    number: "03",
    alt: "Bring Your Own Bike ride 03",
    ...(getSiteLang() === "en" ? ride03DetailTextEn : ride03DetailTextKo),
  },
  {
    image: rideCover("04"),
    gallery: rideGallery("04", 5),
    number: "04",
    alt: "Bring Your Own Bike ride 04",
    ...(getSiteLang() === "en" ? ride04DetailTextEn : ride04DetailTextKo),
  },
  {
    image: rideCover("05"),
    gallery: rideGallery("05", 3),
    number: "05",
    alt: "Bring Your Own Bike ride 05",
    ...(getSiteLang() === "en" ? ride05DetailTextEn : ride05DetailTextKo),
  },
];

let rotation = 0;
const wheelBeadNodes = document.querySelectorAll("#wheel .wheel-bead");
const BEAD_R_MIN = 0.44;
const BEAD_R_MAX = 0.92;
const BEAD_SLIDE_SPEED = 0.025;
let beadSlideFrame = 0;

function getBeadSpokeAngle(bead) {
  return parseFloat(bead.style.getPropertyValue("--bead-angle")) || 0;
}

function getBeadRadius(bead) {
  const value = parseFloat(bead.style.getPropertyValue("--bead-r"));
  return Number.isFinite(value) ? value : (BEAD_R_MIN + BEAD_R_MAX) / 2;
}

function targetBeadRadius(spokeAngleDeg) {
  // Gravity pulls each bead to the lowest point along its spoke.
  // When the spoke tip points down, the bead slides out; when up, it slides in.
  const worldAngleRad = ((spokeAngleDeg + rotation) * Math.PI) / 180;
  const t = (Math.sin(worldAngleRad) + 1) / 2;
  return BEAD_R_MIN + t * (BEAD_R_MAX - BEAD_R_MIN);
}

function syncWheelBeads(immediate = false) {
  if (!wheelBeadNodes.length) return false;

  const snap = immediate || prefersReducedMotion.matches;
  let stillMoving = false;

  wheelBeadNodes.forEach((bead, index) => {
    const spokeAngle = getBeadSpokeAngle(bead);
    const target = targetBeadRadius(spokeAngle);
    const current = getBeadRadius(bead);
    // Slight per-bead lag so they don't all slide in lockstep.
    const speed = snap ? 1 : BEAD_SLIDE_SPEED * (0.85 + (index % 3) * 0.12);
    const next = snap ? target : current + (target - current) * speed;
    bead.style.setProperty("--bead-r", next.toFixed(4));
    if (Math.abs(target - next) > 0.002) stillMoving = true;
  });

  return stillMoving;
}

function tickWheelBeads() {
  if (syncWheelBeads(false)) {
    beadSlideFrame = requestAnimationFrame(tickWheelBeads);
  } else {
    beadSlideFrame = 0;
  }
}

function applyWheelRotation(nextRotation, options = {}) {
  const previousRotation = rotation;
  rotation = nextRotation;
  const target = wheel || document.getElementById("wheel");
  if (target) {
    target.style.transform = `rotate(${rotation}deg)`;
  }

  if (!wheelBeadNodes.length) return;

  // Keep the art-directed starting radii until the wheel actually turns.
  if (Math.abs(rotation) < 0.5 && Math.abs(previousRotation) < 0.5) {
    return;
  }

  if (options.immediate) {
    if (beadSlideFrame) {
      cancelAnimationFrame(beadSlideFrame);
      beadSlideFrame = 0;
    }
    syncWheelBeads(true);
    return;
  }

  if (!beadSlideFrame) {
    beadSlideFrame = requestAnimationFrame(tickWheelBeads);
  }
}

let rideIndex = 0;
let galleryIndex = 0;
let rideScrollLocked = false;
let lastRideScrollDirection = 0;
let ridesDetailOpen = false;
let ridesLightboxOpen = false;
let ridesLightbox = null;
let ridesLightboxPhoto = null;
let ridesLightboxCredit = null;
const RIDES_LIGHTBOX_ASSETS = {
  close: "/rides/assets/icon-close.svg",
  up: "/rides/assets/icon-%20arrow-up.svg",
  down: "/rides/assets/icon-%20arrow-down.svg",
};
const RIDE_SCROLL_LOCK_MS = 350;
const RIDE_CLOSE_MS = 650;
const RIDES_AUTO_ADVANCE_MS = 1000;
let ridesAutoTimer = null;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function clearRidesAutoAdvance() {
  if (ridesAutoTimer) {
    clearInterval(ridesAutoTimer);
    ridesAutoTimer = null;
  }
}

function syncRidesAutoAdvance() {
  clearRidesAutoAdvance();
  if (!ridesStage || prefersReducedMotion.matches) return;
  if (document.hidden) return;
  if (ridesHome?.classList.contains("is-menu-open")) return;
  if (ridesLightboxOpen) return;

  ridesAutoTimer = window.setInterval(() => {
    if (!ridesStage || document.hidden) return;
    if (ridesHome?.classList.contains("is-menu-open")) return;
    if (ridesLightboxOpen) return;
    if (rideScrollLocked) return;

    if (ridesDetailOpen) {
      const ride = rides[rideIndex];
      if (ride?.gallery?.length > 1) {
        changeGallery(1, { fromAuto: true });
      }
      return;
    }

    if (rides.length > 1) {
      changeRide(1, { fromAuto: true });
    }
  }, RIDES_AUTO_ADVANCE_MS);
}

function resetRidesAutoAdvance() {
  syncRidesAutoAdvance();
}

prefersReducedMotion.addEventListener("change", syncRidesAutoAdvance);
document.addEventListener("visibilitychange", syncRidesAutoAdvance);

function getRideDetailUrl(index) {
  return `${getSitePrefix()}/rides/${rides[index].number}/`;
}

function getRidesListUrl() {
  return `${getSitePrefix()}/rides/`;
}

function getRideIndexFromNumber(number) {
  return rides.findIndex((ride) => ride.number === number);
}

function getRidesRouteFromLocation() {
  const pathMatch = window.location.pathname.match(/\/(?:ko\/)?rides\/(\d{2})\/?$/);
  if (pathMatch) {
    const rideIndex = getRideIndexFromNumber(pathMatch[1]);
    if (rideIndex >= 0) {
      return { rideIndex, detail: true };
    }
  }

  if (window.__RIDES_ROUTE__?.ride) {
    const rideIndex = getRideIndexFromNumber(window.__RIDES_ROUTE__.ride);
    if (rideIndex >= 0) {
      return {
        rideIndex,
        detail: Boolean(window.__RIDES_ROUTE__.detail),
      };
    }
  }

  return { rideIndex: 0, detail: false };
}

function syncRidesHistory(view, index = rideIndex) {
  if (!ridesStage) return;

  if (view === "detail") {
    history.replaceState(
      { ridesView: "detail", rideIndex: index },
      "",
      getRideDetailUrl(index)
    );
    syncLanguageLinks();
    return;
  }

  history.replaceState(
    { ridesView: "list", rideIndex: index },
    "",
    getRidesListUrl()
  );
  syncLanguageLinks();
}

function syncRidesHeaderMode({ animate = true, direction = "out" } = {}) {
  if (!ridesHome) return;

  if (ridesDetailOpen) {
    if (homeIndex?.classList.contains("is-menu-open")) {
      setHomeMenuOpen(false);
    }

    if (ridesHome.classList.contains("home--rides-detail")) return;

    if (!animate) {
      ridesHome.classList.remove("is-corner-menu-wiping", "is-corner-menu-wiping-in");
      ridesHome.classList.add("home--rides-detail");
      return;
    }

    ridesHome.classList.remove("home--rides-detail", "is-corner-menu-wiping-in");
    ridesHome.classList.add("is-corner-menu-wiping");

    window.setTimeout(() => {
      if (!ridesDetailOpen) {
        ridesHome.classList.remove("is-corner-menu-wiping");
        return;
      }

      ridesHome.classList.remove("is-corner-menu-wiping");
      ridesHome.classList.add("home--rides-detail");
    }, RIDES_CORNER_MENU_WIPE_MS);
    return;
  }

  if (animate && direction === "in") {
    ridesHome.classList.remove("home--rides-detail", "is-corner-menu-wiping");
    ridesHome.classList.add("is-corner-menu-wiping-in");

    window.setTimeout(() => {
      if (ridesDetailOpen) {
        ridesHome.classList.remove("is-corner-menu-wiping-in");
        return;
      }

      ridesHome.classList.remove("is-corner-menu-wiping-in");
    }, RIDES_CORNER_MENU_WIPE_MS);
  } else {
    ridesHome.classList.remove(
      "home--rides-detail",
      "is-corner-menu-wiping",
      "is-corner-menu-wiping-in"
    );
  }

  if (ridesHome.classList.contains("is-menu-open")) {
    setRidesMenuOpen(false);
  }
}

function pulseRideChange() {
  if (!ridesDuo || !ridesDetailOpen) return;
  ridesDuo.classList.remove("is-changing");
  void ridesDuo.offsetWidth;
  ridesDuo.classList.add("is-changing");
}

function syncLightboxPhoto() {
  if (!ridesPhoto || !ridesLightboxPhoto) return;

  const ride = rides[rideIndex];
  if (!ride) return;

  ridesLightboxPhoto.src = ridesPhoto.src;
  ridesLightboxPhoto.alt = ridesPhoto.alt || "";

  if (ridesLightboxCredit) {
    ridesLightboxCredit.textContent = ride.photoCredit || "";
  }
}

function ensureRideLightbox() {
  if (
    ridesLightbox &&
    (!ridesLightbox.querySelector(".rides-lightbox-media") ||
      !ridesLightbox.querySelector(".rides-lightbox-figure .rides-lightbox-close"))
  ) {
    ridesLightbox.remove();
    ridesLightbox = null;
    ridesLightboxPhoto = null;
    ridesLightboxCredit = null;
  }

  if (ridesLightbox) return;

  ridesLightbox = document.createElement("div");
  ridesLightbox.className = "rides-lightbox";
  ridesLightbox.hidden = true;
  ridesLightbox.setAttribute("role", "dialog");
  ridesLightbox.setAttribute("aria-modal", "true");
  ridesLightbox.setAttribute("aria-label", "Ride photo viewer");
  ridesLightbox.innerHTML = `
    <div class="rides-lightbox-shapes" aria-hidden="true">
      <span class="rides-lightbox-shape rides-lightbox-shape--left"></span>
      <span class="rides-lightbox-shape rides-lightbox-shape--right"></span>
    </div>
    <div class="rides-lightbox-inner">
      <button type="button" class="rides-lightbox-nav rides-lightbox-nav--prev" aria-label="Previous photo">
        <img src="${RIDES_LIGHTBOX_ASSETS.up}" alt="" class="rides-lightbox-nav-icon rides-lightbox-nav-icon--left" />
      </button>
      <figure class="rides-lightbox-figure">
        <div class="rides-lightbox-media">
          <button type="button" class="rides-lightbox-close" aria-label="Close photo viewer">
            <img src="${RIDES_LIGHTBOX_ASSETS.close}" alt="" />
          </button>
          <img class="rides-lightbox-photo" alt="" />
        </div>
        <figcaption class="rides-lightbox-credit"></figcaption>
      </figure>
      <button type="button" class="rides-lightbox-nav rides-lightbox-nav--next" aria-label="Next photo">
        <img src="${RIDES_LIGHTBOX_ASSETS.up}" alt="" class="rides-lightbox-nav-icon rides-lightbox-nav-icon--right" />
      </button>
    </div>
  `;

  document.body.appendChild(ridesLightbox);
  ridesLightboxPhoto = ridesLightbox.querySelector(".rides-lightbox-photo");
  ridesLightboxCredit = ridesLightbox.querySelector(".rides-lightbox-credit");

  ridesLightbox.querySelector(".rides-lightbox-close")?.addEventListener("click", () => {
    closeRideLightbox();
  });

  ridesLightbox.querySelector(".rides-lightbox-nav--prev")?.addEventListener("click", (event) => {
    event.stopPropagation();
    changeGallery(-1);
  });

  ridesLightbox.querySelector(".rides-lightbox-nav--next")?.addEventListener("click", (event) => {
    event.stopPropagation();
    changeGallery(1);
  });

  ridesLightbox.addEventListener("click", (event) => {
    if (
      event.target.closest(
        ".rides-lightbox-photo, .rides-lightbox-close, .rides-lightbox-nav"
      )
    ) {
      return;
    }
    closeRideLightbox();
  });
}

function openRideLightbox() {
  if (!ridesPhoto || !ridesDetailOpen) return;

  ensureRideLightbox();
  ridesLightbox.hidden = false;
  ridesLightboxOpen = true;
  document.body.classList.add("is-rides-lightbox-open");
  syncLightboxPhoto();
  syncRidesAutoAdvance();
}

function closeRideLightbox() {
  if (!ridesLightbox || !ridesLightboxOpen) return;
  ridesLightbox.hidden = true;
  ridesLightboxOpen = false;
  document.body.classList.remove("is-rides-lightbox-open");
  syncRidesAutoAdvance();
}

function getDetailImage(ride) {
  if (ride?.gallery?.length) {
    return ride.gallery[galleryIndex];
  }
  return ride?.image || "";
}

const CREDIT_LINK_ENTRIES = [
  [
    "Sonic Acts Festival 2024 as part of Program Sediments",
    "https://2024.sonicacts.com/programme/sediments/cycling-the-unknown-byob-bring-your-own-bike.html",
  ],
  [
    "Sonic Acts Festival 2024 Program Sediments 프로그램",
    "https://2024.sonicacts.com/programme/sediments/cycling-the-unknown-byob-bring-your-own-bike.html",
  ],
  [
    "Sonic Acts Festival 2024 · Program Sediments의 일환으로",
    "https://2024.sonicacts.com/programme/sediments/cycling-the-unknown-byob-bring-your-own-bike.html",
  ],
  [
    "as part of Program Sediments",
    "https://2024.sonicacts.com/programme/sediments/cycling-the-unknown-byob-bring-your-own-bike.html",
  ],
  [
    "Sonic Acts Festival 2024",
    "https://2024.sonicacts.com/programme/sediments/cycling-the-unknown-byob-bring-your-own-bike.html",
  ],
  [
    "Varia as part of Colonial Infrastructures: on Containerisation",
    "https://varia.zone/2024/colonial-infrastructures-containerisation-24/",
  ],
  [
    "Varia · as part of Colonial Infrastructures: on Containerisation",
    "https://varia.zone/2024/colonial-infrastructures-containerisation-24/",
  ],
  [
    "Varia의 Colonial Infrastructures: on Containerisation 프로그램",
    "https://varia.zone/2024/colonial-infrastructures-containerisation-24/",
  ],
  [
    "as part of Colonial Infrastructures: on Containerisation",
    "https://varia.zone/2024/colonial-infrastructures-containerisation-24/",
  ],
  [
    "Varia · Colonial Infrastructures: on Containerisation의 일환으로",
    "https://varia.zone/2024/colonial-infrastructures-containerisation-24/",
  ],
  [
    "ZK/U · as part of the Cycle Up! Residency",
    "https://www.zku-berlin.org/fellows/733/",
  ],
  [
    "ZK/U, as part of the Cycle Up! Residency",
    "https://www.zku-berlin.org/fellows/733/",
  ],
  [
    "ZK/U Cycle Up! Residency 프로그램",
    "https://www.zku-berlin.org/fellows/733/",
  ],
  [
    "ZK/U · Cycle Up! Residency의 일환으로",
    "https://www.zku-berlin.org/fellows/733/",
  ],
  [
    "Wasteland Festival 2025",
    "https://www.collectivewasteland.nl/event/cycling-the-unknown-artistic-field-trip-with-yeon-sung",
  ],
  [
    "Cycle Up! project",
    "https://www.goethe.de/prj/cyc/en/rsd/024/yng.html",
  ],
  [
    "Cycle Up Residency",
    "https://www.zku-berlin.org/fellows/733/",
  ],
  [
    "Sonic Acts Festival",
    "https://sonicacts.com/",
  ],
  [
    "Wasteland Festival",
    "https://www.collectivewasteland.nl/",
  ],
  ["Czarina Calinawagan", "https://www.czarinacalinawagan.com/"],
  ["Katya Borisova", "https://www.instagram.com/artagitka/"],
  ["Silvia Arenas", "https://www.instagram.com/silvia__arenas/"],
  ["Amy Pickles", "https://amypickles.co.uk/"],
  ["Heejung Kim", "https://www.heejung-kim.nl/"],
  ["Studio Yeon Sung", "https://archiveofmatters.com/"],
  ["스튜디오 연성", "https://archiveofmatters.com/"],
  ["Yeon Sung", "https://archiveofmatters.com/"],
  ["Eunji Kwak", "https://www.instagram.com/keaggi/"],
  ["Ahae Kim", "https://www.instagram.com/kim.ahae/"],
  ["Studio165", "https://www.instagram.com/studio.165.design/"],
  ["Varia", "https://varia.zone/"],
  ["Eoming", "https://eoming.tumblr.com/"],
  ["CLoFA", "https://clofa.org/"],
  ["연성", "https://archiveofmatters.com/"],
  ["김희정", "https://www.heejung-kim.nl/"],
  ["곽은지", "https://www.instagram.com/keaggi/"],
  ["김아해", "https://www.instagram.com/kim.ahae/"],
  ["어밍", "https://eoming.tumblr.com/"],
  ["클로파", "https://clofa.org/"],
].sort((a, b) => b[0].length - a[0].length);

function linkifyCreditTextNode(textNode) {
  const text = textNode.nodeValue;
  if (!text || !text.trim()) return;

  let remaining = text;
  const frag = document.createDocumentFragment();

  while (remaining.length) {
    let bestIdx = -1;
    let bestLabel = null;
    let bestUrl = null;

    for (const [label, url] of CREDIT_LINK_ENTRIES) {
      const idx = remaining.indexOf(label);
      if (idx === -1) continue;
      if (bestIdx === -1 || idx < bestIdx || (idx === bestIdx && label.length > bestLabel.length)) {
        bestIdx = idx;
        bestLabel = label;
        bestUrl = url;
      }
    }

    if (bestIdx === -1) {
      frag.appendChild(document.createTextNode(remaining));
      break;
    }

    if (bestIdx > 0) {
      frag.appendChild(document.createTextNode(remaining.slice(0, bestIdx)));
    }

    const link = document.createElement("a");
    link.href = bestUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = bestLabel;
    frag.appendChild(link);

    remaining = remaining.slice(bestIdx + bestLabel.length);
  }

  textNode.parentNode.replaceChild(frag, textNode);
}

function getCreditPlainText(el) {
  let out = "";
  el.childNodes.forEach((node) => {
    if (node.nodeName === "BR") {
      out += " ";
      return;
    }
    if (node.nodeType === Node.TEXT_NODE) {
      out += node.nodeValue || "";
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      out += getCreditPlainText(node);
    }
  });
  return out.replace(/\s+/g, " ").trim();
}

function linkifyCreditNameElement(el) {
  if (!el || el.dataset.creditLinked === "1") return;

  const normalized = getCreditPlainText(el);
  let exactUrl = null;
  for (const [label, url] of CREDIT_LINK_ENTRIES) {
    if (label.replace(/\s+/g, " ").trim() === normalized) {
      exactUrl = url;
      break;
    }
  }

  if (exactUrl) {
    const link = document.createElement("a");
    link.href = exactUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    while (el.firstChild) link.appendChild(el.firstChild);
    el.appendChild(link);
    el.dataset.creditLinked = "1";
    return;
  }

  const textNodes = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach(linkifyCreditTextNode);

  el.dataset.creditLinked = "1";
}

function linkifyAllCreditNames() {
  document
    .querySelectorAll(".wheel-about-credits .wheel-about-credit-name")
    .forEach(linkifyCreditNameElement);
}

function colorizeSeparatorsInElement(el) {
  if (!el) return;

  const textNodes = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach((textNode) => {
    const text = textNode.nodeValue;
    if (!text || !text.includes("·")) return;

    const frag = document.createDocumentFragment();
    text.split(/(·)/).forEach((part) => {
      if (part === "·") {
        const sep = document.createElement("span");
        sep.className = "rides-name-sep";
        sep.setAttribute("aria-hidden", "true");
        sep.textContent = "·";
        frag.appendChild(sep);
      } else if (part) {
        frag.appendChild(document.createTextNode(part));
      }
    });
    textNode.parentNode.replaceChild(frag, textNode);
  });
}

function colorizeCyclistNameLine(el, text) {
  if (!el) return;
  el.replaceChildren();
  if (!text) return;

  const parts = String(text).split(/\s*·\s*/);
  parts.forEach((part, index) => {
    if (index > 0) {
      const sep = document.createElement("span");
      sep.className = "rides-name-sep";
      sep.setAttribute("aria-hidden", "true");
      sep.textContent = " · ";
      el.appendChild(sep);
    }
    el.appendChild(document.createTextNode(part));
  });
}

function colorizeAllNameSeparators() {
  document.querySelectorAll(".rides-detail-names-line").forEach((el) => {
    const text = el.textContent || "";
    if (!text.includes("·")) return;
    colorizeCyclistNameLine(el, text);
  });

  document
    .querySelectorAll(".wheel-about-credits .wheel-about-credit-name")
    .forEach(colorizeSeparatorsInElement);
}

const RIDE_STORY_PLACE_NAMES = [
  "Colonial Infrastructures: on Containerisation",
  "Air Products' HyCO4",
  "Brandenburg Gate",
  "Kraftwerk Moabit",
  "North Sea Canal",
  "Port of Rotterdam",
  "Hyundai Motor's",
  "Amsterdam Noord",
  "Hyundai Motor",
  "Taehwa River",
  "Seongnam Riverside",
  "Reed Fields",
  "South Korea",
  "Netherlands",
  "Hembrugterrein",
  "Amsterdam's",
  "Vlaardingen",
  "Rozenburg",
  "Westhafen",
  "Westpoort",
  "Waalhaven",
  "Het Scheur",
  "CYCLE UP!",
  "Cycle Up!",
  "Air Products",
  "Oeverbos",
  "De Ceuvel",
  "Amsterdam",
  "Rotterdam",
  "암스테르담",
  "Zaandam",
  "Hempont",
  "Berlin's",
  "Germany",
  "Het Hem",
  "로테르담",
  "Shell's",
  "ZK/U's",
  "Ulsan's",
  "HyCO4",
  "Botlek",
  "Pernis",
  "Moabit",
  "Berlin",
  "베를린",
  "Hamburg",
  "Ulsans",
  "AVR's",
  "Korea",
  "Ulsan",
  "Turkey",
  "Spree",
  "Shell",
  "Europe",
  "ZK/U",
  "Varia",
  "울산",
  "AVR",
].sort((a, b) => b.length - a.length);

function appendTextWithItalicPlaceNames(parent, text) {
  if (!text) return;

  let remaining = text;
  while (remaining.length) {
    let bestIdx = -1;
    let bestLabel = null;

    for (const label of RIDE_STORY_PLACE_NAMES) {
      const idx = remaining.indexOf(label);
      if (idx === -1) continue;
      if (
        bestIdx === -1 ||
        idx < bestIdx ||
        (idx === bestIdx && label.length > bestLabel.length)
      ) {
        bestIdx = idx;
        bestLabel = label;
      }
    }

    if (bestIdx === -1) {
      parent.appendChild(document.createTextNode(remaining));
      break;
    }

    if (bestIdx > 0) {
      parent.appendChild(document.createTextNode(remaining.slice(0, bestIdx)));
    }

    const prevChar = bestIdx > 0 ? remaining[bestIdx - 1] : "";
    const nextChar = remaining[bestIdx + bestLabel.length] || "";

    // Keep a little air when italic sits against upright letters/particles.
    if (prevChar && /[A-Za-z0-9가-힣]/.test(prevChar)) {
      parent.appendChild(document.createTextNode("\u2006"));
    }

    const em = document.createElement("em");
    em.className = "rides-detail-place";
    em.textContent = bestLabel;
    parent.appendChild(em);

    remaining = remaining.slice(bestIdx + bestLabel.length);

    if (nextChar && /[A-Za-z0-9가-힣]/.test(nextChar)) {
      parent.appendChild(document.createTextNode("\u2006"));
    }
  }
}

function setTextWithLineBreaks(node, text, { italicizePlaceNames = false } = {}) {
  if (!node) return;
  if (!text) {
    node.textContent = "";
    return;
  }

  node.replaceChildren();
  String(text)
    .split("\n")
    .forEach((line, index) => {
      if (index > 0) node.appendChild(document.createElement("br"));
      if (!line) return;
      if (italicizePlaceNames) {
        appendTextWithItalicPlaceNames(node, line);
      } else {
        node.appendChild(document.createTextNode(line));
      }
    });
}

function renderRideCredits(credits) {
  if (!ridesCreditsContainer || !credits?.length) return;

  ridesCreditsContainer.innerHTML = '<hr class="rides-rule" />';

  credits.forEach((credit) => {
    const article = document.createElement("article");
    article.className = "wheel-about-credit";

    const copy = document.createElement("div");
    copy.className = "wheel-about-credit-copy";

    const title = document.createElement("p");
    title.className = "wheel-about-credit-title";
    title.textContent = credit.title;

    const name = document.createElement("p");
    name.className = "wheel-about-credit-name";
    setTextWithLineBreaks(name, credit.name);

    copy.append(title, name);
    article.appendChild(copy);
    ridesCreditsContainer.appendChild(article);
  });

  linkifyAllCreditNames();
  colorizeAllNameSeparators();
}

function renderRide(index) {
  const ride = rides[index];
  if (!ride) return;

  if (ridesPreviewPhoto) {
    ridesPreviewPhoto.src = ride.image;
    ridesPreviewPhoto.alt = ride.alt || "";
  }

  if (ridesPreviewNumber) ridesPreviewNumber.textContent = ride.number;
  if (ridesPreviewDate) ridesPreviewDate.textContent = ride.previewDate || ride.date || "";
  if (ridesPreviewVenue) {
    ridesPreviewVenue.textContent = ride.previewVenue || ride.venue?.replace(/,\s*$/, "") || "";
  }
  if (ridesPreviewCity) {
    ridesPreviewCity.textContent = ride.previewCountry || "";
    ridesPreviewCity.hidden = !ride.previewCountry;
  }

  if (ridesPhoto) {
    ridesPhoto.src = getDetailImage(ride);
    ridesPhoto.alt = ride.alt || "";
  }

  syncLightboxPhoto();

  ridesNumbers.forEach((node) => {
    node.textContent = ride.number;
  });

  if (ridesDetailDate) ridesDetailDate.textContent = ride.date || "";
  if (ridesDetailVenue) ridesDetailVenue.textContent = ride.venue || "";
  if (ridesDetailCity) {
    if (ride.cityHtml) {
      ridesDetailCity.innerHTML = ride.cityHtml;
      ridesDetailCity.classList.remove("is-hidden");
    } else {
      ridesDetailCity.textContent = ride.city || "";
      ridesDetailCity.classList.toggle("is-hidden", !ride.city);
    }
  }
  if (ridesDetailTitle) ridesDetailTitle.textContent = ride.title || "";
  if (ridesDetailSubtitle) {
    setTextWithLineBreaks(ridesDetailSubtitle, ride.subtitle || "");
    ridesDetailSubtitle.classList.toggle("is-italic", Boolean(ride.subtitleItalic));
  }
  if (ridesTitleBlock) {
    ridesTitleBlock.classList.toggle("is-hidden", !ride.title && !ride.subtitle);
  }
  if (ridesDetailTime) {
    if (ride.timeHtml) {
      ridesDetailTime.innerHTML = ride.timeHtml;
    } else {
      ridesDetailTime.textContent = ride.time || "";
    }
  }
  if (ridesDetailDistance) ridesDetailDistance.textContent = ride.distance || "";

  ridesWeatherLines.forEach((node, weatherIndex) => {
    node.textContent = ride.weather?.[weatherIndex] || "";
    node.classList.toggle("is-hidden", !ride.weather?.[weatherIndex]);
  });

  if (ridesCyclistsBlock) {
    const cyclists = ride.cyclists;
    ridesCyclistsBlock.classList.toggle("is-hidden", !cyclists);
    if (cyclists) {
      if (ridesCyclistsHeading) {
        ridesCyclistsHeading.textContent = cyclists.heading || "";
      }
      if (ridesParticipantsCount) {
        ridesParticipantsCount.textContent = cyclists.count || "";
        ridesParticipantsCount.classList.toggle("is-hidden", !cyclists.count);
      }
      ridesNameLines.forEach((node, nameIndex) => {
        const line = cyclists.nameLines?.[nameIndex] || "";
        colorizeCyclistNameLine(node, line);
        node.classList.toggle("is-hidden", !line);
      });
    }
  }

  if (ridesStoryBlock) {
    const story = ride.story;
    ridesStoryBlock.classList.toggle("is-hidden", !story?.length);
    ridesStoryParagraphs.forEach((node, storyIndex) => {
      setTextWithLineBreaks(node, story?.[storyIndex] || "", {
        italicizePlaceNames: true,
      });
      node.classList.toggle("is-hidden", !story?.[storyIndex]);
    });
  }

  renderRideCredits(ride.credits);

  if (ridesPreviewHit) {
    ridesPreviewHit.setAttribute("aria-label", `Open ride ${ride.number} details`);
  }

  if (ridesDuo) {
    ridesDuo.setAttribute("aria-label", `Ride ${ride.number}`);
  }

  if (ridesDetailsScroll) {
    ridesDetailsScroll.scrollTop = 0;
  }
}

function openRideDetail({ pushHistory = true, animateHeader = true, immediate = false } = {}) {
  if (!ridesStage || !ridesDuo || ridesDetailOpen) return;

  galleryIndex = 0;
  renderRide(rideIndex);
  ridesDetailOpen = true;
  syncRidesHeaderMode({ animate: animateHeader, direction: "out" });

  const revealDetailUI = () => {
    ridesDuo.hidden = false;
    ridesStage.classList.add("is-detail");

    if (immediate) {
      ridesDuo.classList.remove("is-closing", "is-opening", "is-changing");
      ridesDuo.classList.add("is-open");
      return;
    }

    ridesDuo.classList.remove("is-closing", "is-open");
    ridesDuo.classList.add("is-opening");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ridesDuo.classList.add("is-open");
      });
    });
  };

  if (animateHeader && !immediate) {
    window.setTimeout(revealDetailUI, RIDES_CORNER_MENU_WIPE_MS);
  } else {
    revealDetailUI();
  }

  if (pushHistory) {
    history.pushState(
      { ridesView: "detail", rideIndex },
      "",
      getRideDetailUrl(rideIndex)
    );
    syncLanguageLinks();
  }

  syncRidesAutoAdvance();
}

function closeRideDetailUIOnly({ onComplete } = {}) {
  if (!ridesStage || !ridesDuo || !ridesDetailOpen) {
    onComplete?.();
    return;
  }

  closeRideLightbox();
  ridesDuo.classList.remove("is-open");
  ridesDuo.classList.add("is-closing");

  window.setTimeout(() => {
    ridesDetailOpen = false;
    syncRidesHeaderMode({ animate: true, direction: "in" });
    ridesStage.classList.remove("is-detail");
    ridesDuo.hidden = true;
    ridesDuo.classList.remove("is-opening", "is-closing", "is-open", "is-changing");
    syncRidesAutoAdvance();

    if (onComplete) {
      window.setTimeout(onComplete, RIDES_CORNER_MENU_WIPE_MS);
    }
  }, RIDE_CLOSE_MS);
}

function closeRideDetail() {
  if (!ridesDetailOpen) return;

  if (/\/(?:ko\/)?rides\/\d{2}\/?$/.test(window.location.pathname)) {
    history.back();
    return;
  }

  closeRideDetailUIOnly();
  syncRidesHistory("list");
}

function changeGallery(direction, { fromAuto = false } = {}) {
  const ride = rides[rideIndex];
  if (!ride?.gallery?.length || !direction) return;

  if (direction > 0) {
    galleryIndex = (galleryIndex + 1) % ride.gallery.length;
  } else {
    galleryIndex = (galleryIndex - 1 + ride.gallery.length) % ride.gallery.length;
  }

  if (ridesPhoto) {
    ridesPhoto.src = ride.gallery[galleryIndex];
  }

  syncLightboxPhoto();

  if (!fromAuto) {
    lastRideScrollDirection = direction;
    rideScrollLocked = true;
    setTimeout(() => {
      rideScrollLocked = false;
      lastRideScrollDirection = 0;
    }, RIDE_SCROLL_LOCK_MS);
  }

  resetRidesAutoAdvance();
}

function changeRide(direction, { fromAuto = false } = {}) {
  if (!ridesStage || !direction) return;

  if (direction > 0) {
    rideIndex = (rideIndex + 1) % rides.length;
  } else {
    rideIndex = (rideIndex - 1 + rides.length) % rides.length;
  }

  galleryIndex = 0;
  renderRide(rideIndex);
  pulseRideChange();

  if (ridesDetailOpen) {
    syncRidesHistory("detail");
  } else {
    syncRidesHistory("list");
  }

  if (!fromAuto) {
    lastRideScrollDirection = direction;
    rideScrollLocked = true;
    setTimeout(() => {
      rideScrollLocked = false;
      lastRideScrollDirection = 0;
    }, RIDE_SCROLL_LOCK_MS);
  }

  resetRidesAutoAdvance();
}

const RIDES_MENU_ANIM_MS = 620;
const RIDES_CORNER_MENU_WIPE_MS = 300;
let ridesMenuAnimating = false;

function setRidesMenuOpen(open) {
  if (!ridesHome || ridesMenuAnimating) return;
  if (open && !ridesDetailOpen) return;
  if (open === ridesHome.classList.contains("is-menu-open")) return;

  if (ridesMenuToggle) {
    ridesMenuToggle.setAttribute("aria-expanded", String(open));
    ridesMenuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (open) {
    if (ridesSiteMenu) ridesSiteMenu.hidden = false;
    if (ridesMenuBackdrop) {
      ridesMenuBackdrop.hidden = false;
      ridesMenuBackdrop.setAttribute("aria-hidden", "false");
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ridesHome.classList.add("is-menu-open");
      });
    });
    clearRidesAutoAdvance();
    return;
  }

  ridesHome.classList.remove("is-menu-open");
  ridesMenuAnimating = true;

  window.setTimeout(() => {
    if (!ridesHome.classList.contains("is-menu-open")) {
      if (ridesSiteMenu) ridesSiteMenu.hidden = true;
      if (ridesMenuBackdrop) {
        ridesMenuBackdrop.hidden = true;
        ridesMenuBackdrop.setAttribute("aria-hidden", "true");
      }
    }
    ridesMenuAnimating = false;
  }, RIDES_MENU_ANIM_MS);

  syncRidesAutoAdvance();
}

if (ridesMenuToggle) {
  ridesMenuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setRidesMenuOpen(!ridesHome.classList.contains("is-menu-open"));
  });
}

if (ridesMenuBackdrop) {
  ridesMenuBackdrop.addEventListener("click", () => setRidesMenuOpen(false));
}

if (ridesHome) {
  ridesHome.addEventListener("click", (event) => {
    const titleLink = event.target.closest(".title-top a");
    if (!titleLink || !ridesDetailOpen) return;

    const linkPath = normalizeSitePath(new URL(titleLink.href, window.location.origin).pathname);
    const homePath = normalizeSitePath(getSiteHomeUrl());
    if (linkPath !== homePath) return;

    event.preventDefault();
    closeRideDetailUIOnly({
      onComplete: () => {
        window.location.assign(getSiteHomeUrl());
      },
    });
  });
}

if (ridesStage) {
  ridesStage.addEventListener("click", (event) => {
    if (event.target.closest(".rides-text-nav-btn--up")) {
      changeRide(-1);
      return;
    }

    if (event.target.closest(".rides-text-nav-btn--down")) {
      changeRide(1);
      return;
    }

    if (event.target.closest(".rides-preview-hit")) {
      openRideDetail();
      return;
    }

    if (
      ridesDetailOpen &&
      !ridesLightboxOpen &&
      event.target.closest(".rides-circle--photo")
    ) {
      openRideLightbox();
    }
  });
}

window.addEventListener("keydown", (event) => {
  if (ridesLightboxOpen) {
    if (event.key === "Escape") {
      closeRideLightbox();
      return;
    }

    if (event.key === "ArrowLeft") {
      changeGallery(-1);
      return;
    }

    if (event.key === "ArrowRight") {
      changeGallery(1);
      return;
    }
  }

  if (event.key !== "Escape") return;
  if (homeIndex?.classList.contains("is-menu-open")) {
    setHomeMenuOpen(false);
    return;
  }
  if (ridesHome?.classList.contains("is-menu-open")) {
    setRidesMenuOpen(false);
    return;
  }
  if (ridesLightboxOpen) {
    closeRideLightbox();
    return;
  }
  if (ridesDetailOpen) closeRideDetail();
});

window.addEventListener("popstate", (event) => {
  if (!ridesStage) return;

  if (ridesLightboxOpen) {
    closeRideLightbox();
  }

  const state = event.state;

  if (state?.ridesView === "detail") {
    rideIndex = state.rideIndex ?? rideIndex;
    galleryIndex = 0;
    renderRide(rideIndex);
    if (!ridesDetailOpen) {
      openRideDetail({ pushHistory: false });
    }
    syncLanguageLinks();
    return;
  }

  if (ridesDetailOpen) {
    closeRideDetailUIOnly();
  }

  if (state?.rideIndex != null) {
    rideIndex = state.rideIndex;
    galleryIndex = 0;
    renderRide(rideIndex);
  }

  syncLanguageLinks();
  syncRidesAutoAdvance();
});

window.addEventListener(
  "wheel",
  (event) => {
    if (
      isAboutScrollMobilePage() &&
      document.documentElement.classList.contains("home-mobile-scroll")
    ) {
      event.preventDefault();
      scrollAboutAndRotate(aboutScroll, event.deltaY);
      return;
    }

    let pageScroll = panel;
    if (aboutScroll && panel?.classList.contains("wheel-about")) {
      pageScroll = aboutScroll;
    }
    if (
      aboutScroll &&
      (panel?.classList.contains("wheel-contact") ||
        panel?.classList.contains("wheel-gear"))
    ) {
      pageScroll = aboutScroll;
    }
    if (pageScroll) {
      event.preventDefault();
      scrollAboutAndRotate(pageScroll, event.deltaY);
      return;
    }

    if (ridesStage) {
      event.preventDefault();
      if (!event.deltaY) return;

      const direction = event.deltaY > 0 ? 1 : -1;

      if (rideScrollLocked && direction === lastRideScrollDirection) {
        return;
      }

      const onPhotoArea =
        ridesDetailOpen &&
        (ridesLightboxOpen ||
          event.target.closest?.(".rides-circle--photo") ||
          ridesPhotoCircle?.contains(event.target) ||
          ridesLightbox?.contains(event.target));

      if (onPhotoArea && rides[rideIndex]?.gallery?.length) {
        changeGallery(direction);
        return;
      }

      if (ridesLightboxOpen) return;

      const onTextArea =
        ridesDetailOpen &&
        (event.target.closest?.(".rides-circle--text") ||
          event.target.closest?.(".rides-details-scroll") ||
          ridesTextCircle?.contains(event.target));

      if (onTextArea && ridesDetailsScroll) {
        scrollRidesTextAndRotate(event.deltaY);
        return;
      }

      changeRide(direction);
      return;
    }

    if (!wheel) return;

    if (document.documentElement.classList.contains("home-mobile-scroll")) return;

    event.preventDefault();
    applyWheelRotation(rotation + event.deltaY * 0.12);
  },
  { passive: false }
);

syncLanguageLinks();
linkifyAllCreditNames();
colorizeAllNameSeparators();

function initHomeHeroVideo() {
  const iframe = document.getElementById("home-vimeo");
  const localVideo = document.getElementById("home-local-video");
  if (!iframe) return;

  let swapped = false;

  const swapToVimeo = () => {
    if (swapped) return;
    swapped = true;

    iframe.classList.remove("is-loading");
    iframe.classList.add("is-ready");
    localVideo?.classList.add("is-hidden");

    window.setTimeout(() => {
      localVideo?.pause();
    }, 700);
  };

  if (localVideo) {
    const startLocalRandom = () => {
      if (localVideo.duration > 0) {
        localVideo.currentTime = Math.random() * localVideo.duration * 0.9;
      }
    };

    localVideo.addEventListener("loadedmetadata", startLocalRandom);
    localVideo.play().catch(() => {});
  }

  if (!window.Vimeo) {
    iframe.addEventListener("load", swapToVimeo, { once: true });
    return;
  }

  const player = new Vimeo.Player(iframe);

  player.on("playing", () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(swapToVimeo);
    });
  });
}

initHomeHeroVideo();

const copyrightEl = document.querySelector(".copyright");
const HOME_MENU_ANIM_MS = 550;
let homeMenuAnimating = false;
const HOME_MOBILE_MQ = window.matchMedia("(max-width: 768px)");
const homeWheelSpokes = document.getElementById("wheel");
const HOME_TOUCH_SKIP =
  ".home-menu-toggle, .home-site-menu, .home-site-menu-link, .home-lang-toggle, a, button";
let homeTouchStartY = 0;
let homeTouchLastY = 0;
let homeTouchAccum = 0;
let homeTouchActive = false;
let homeTouchOnAboutWheel = false;
let homeTouchOnRidesTextArea = false;
let aboutScrollTrack = null;
let aboutContentOffset = 0;
let homeLockedViewportHeight = null;
let homeScrollSnapTimer = null;
const isMobileHomeWheelPage = Boolean(
  homeIndex?.classList.contains("home--wheel-page")
);
const isMainMobileHome = Boolean(
  homeIndex && homeWheelSpokes && !isMobileHomeWheelPage
);
const isMobileHomeScrollPage = Boolean(
  homeIndex && (isMainMobileHome || isMobileHomeWheelPage)
);

function getPageScrollTop() {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function setPageScrollTop(value) {
  const top = Math.max(0, Math.round(value));
  const root = document.scrollingElement || document.documentElement;
  root.scrollTop = top;
  window.scrollTo(0, top);
}

function syncHomeWheelRotationFromScroll() {
  if (!homeWheelSpokes || !isMainMobileHome || !HOME_MOBILE_MQ.matches) return;
  if (homeIndex.classList.contains("is-menu-open")) return;

  // Mobile home pins scroll at 0; wheel rotation is driven by touch swipes.
  // Don't overwrite that from scrollY or the wheel snaps back on every touchend.
  const scrollY = getPageScrollTop();
  if (scrollY <= 0) return;

  applyWheelRotation(scrollY * 0.45);
}

let cachedSvhHeight = null;

function getSvhHeight() {
  if (cachedSvhHeight) return cachedSvhHeight;
  try {
    const el = document.createElement("div");
    el.style.cssText =
      "position:fixed;top:0;left:0;height:100svh;width:0;visibility:hidden;pointer-events:none";
    document.documentElement.appendChild(el);
    cachedSvhHeight = el.getBoundingClientRect().height || 0;
    el.remove();
  } catch {
    cachedSvhHeight = 0;
  }
  return cachedSvhHeight;
}

function getStableMobileViewportHeight() {
  const visualHeight = window.visualViewport?.height ?? 0;
  const layoutHeight = window.innerHeight ?? 0;
  const candidates = [visualHeight, layoutHeight, getSvhHeight()].filter(
    (h) => h > 0
  );
  if (!candidates.length) return 0;
  // Prefer the smaller height (browser chrome visible) so Android Chrome
  // collapsing the URL bar does not stretch the layout.
  return Math.min(...candidates);
}

function resetHomeViewportHeightCache() {
  homeLockedViewportHeight = null;
  cachedSvhHeight = null;
}

function captureHomeViewportHeights() {
  const viewportHeight = getStableMobileViewportHeight();
  if (!viewportHeight) return;

  homeLockedViewportHeight =
    homeLockedViewportHeight === null
      ? viewportHeight
      : Math.min(homeLockedViewportHeight, viewportHeight);
}

function syncMobileHomeViewportHeight() {
  if (!isMobileHomeScrollPage || !HOME_MOBILE_MQ.matches) return;

  if (!document.documentElement.classList.contains("home-mobile-scroll")) {
    homeIndex.style.removeProperty("--home-mobile-vh");
    document.documentElement.style.removeProperty("--home-mobile-vh");
    homeIndex.style.removeProperty("height");
    homeIndex.style.removeProperty("min-height");
    homeIndex.classList.remove("is-browser-chrome-visible");
    resetHomeViewportHeightCache();
    return;
  }

  captureHomeViewportHeights();

  const height = homeLockedViewportHeight;
  if (!height) return;

  homeIndex.style.setProperty("--home-mobile-vh", `${height}px`);
  document.documentElement.style.setProperty("--home-mobile-vh", `${height}px`);
  homeIndex.style.height = `${height}px`;
  homeIndex.style.minHeight = `${height}px`;
}

function syncMobileHomeChromeState() {
  if (!isMobileHomeScrollPage || !HOME_MOBILE_MQ.matches) return;
  if (!document.documentElement.classList.contains("home-mobile-scroll")) return;

  homeIndex.classList.add("is-browser-chrome-visible");
}

function syncHomeMobileScrollState() {
  syncMobileHomeViewportHeight();
  syncMobileHomeChromeState();
  syncHomeWheelRotationFromScroll();
}

function snapHomeMobileScroll() {
  if (!document.documentElement.classList.contains("home-mobile-scroll")) return;
  if (homeIndex.classList.contains("is-menu-open")) return;

  if (getPageScrollTop() !== 0) {
    setPageScrollTop(0);
    syncHomeMobileScrollState();
  }
}

function isHomeMobileScrollInteractionActive() {
  return (
    isMobileHomeScrollPage &&
    HOME_MOBILE_MQ.matches &&
    document.documentElement.classList.contains("home-mobile-scroll") &&
    !homeIndex.classList.contains("is-menu-open")
  );
}

function commitHomeChromeHideScroll() {
  // Browser chrome stays visible — keep page scroll pinned at top.
  setPageScrollTop(0);
  window.requestAnimationFrame(syncHomeMobileScrollState);
}

function commitHomeChromeOpenScroll() {
  setPageScrollTop(0);
  window.requestAnimationFrame(syncHomeMobileScrollState);
}

function isAboutMobileScrollControl() {
  return false;
}

function isWheelDashRotatePage() {
  return Boolean(
    pageWheel &&
      homeIndex &&
      (homeIndex.classList.contains("home--about") ||
        homeIndex.classList.contains("home--contact") ||
        homeIndex.classList.contains("home--gear"))
  );
}

function isRidesDashRotateActive() {
  return Boolean(ridesDetailOpen && ridesTextCircle);
}

function getDashRotateTarget() {
  if (isWheelDashRotatePage()) return pageWheel;
  if (isRidesDashRotateActive()) return ridesTextCircle;
  return null;
}

let wheelDashRotation = 0;

function applyWheelDashDelta(delta) {
  const target = getDashRotateTarget();
  if (!target || !delta) return;
  // Only the portion that actually moved the scroll should rotate.
  wheelDashRotation += delta * 0.35;
  target.style.setProperty("--wheel-dash-rotation", `${wheelDashRotation}deg`);
}

function scrollAboutAndRotate(scrollEl, delta) {
  if (!scrollEl || !delta) return;
  const before = scrollEl.scrollTop;
  scrollEl.scrollTop += delta;
  applyWheelDashDelta(scrollEl.scrollTop - before);
}

function scrollRidesTextAndRotate(delta) {
  if (!ridesDetailsScroll || !delta) return;
  // Rotation is applied by the scroll listener so every scroll path stays in sync.
  ridesDetailsScroll.scrollTop += delta;
}

function syncWheelDashRotation() {
  const target = getDashRotateTarget();
  if (!target) return;
  target.style.setProperty("--wheel-dash-rotation", `${wheelDashRotation}deg`);
}

function isAboutScrollMobilePage() {
  return Boolean(
    aboutScroll &&
      HOME_MOBILE_MQ.matches &&
      homeIndex &&
      (homeIndex.classList.contains("home--about") ||
        homeIndex.classList.contains("home--contact") ||
        homeIndex.classList.contains("home--gear"))
  );
}

function unwrapAboutScrollTrack() {
  if (!aboutScroll) return;

  const track = aboutScroll.querySelector(".wheel-about-scroll-track");
  if (track) {
    while (track.firstChild) {
      aboutScroll.insertBefore(track.firstChild, track);
    }
    track.remove();
  }

  aboutScrollTrack = null;
  aboutContentOffset = 0;
}

function ensureAboutScrollTrack() {
  return null;
}

function syncAboutScrollTrackTransform() {}

function getAboutContentMaxScroll() {
  if (!aboutScroll) return 0;
  return Math.max(0, aboutScroll.scrollHeight - aboutScroll.clientHeight);
}

function initAboutMobileScrollControl() {
  if (!aboutScroll) return;
  unwrapAboutScrollTrack();
}

function applyAboutInnerScrollDelta(delta) {
  if (!delta || !aboutScroll) return;
  scrollAboutAndRotate(aboutScroll, delta);
}

function applyAboutScrollWheelDelta(delta, syncState = false) {
  if (!delta || !aboutScroll) return;
  scrollAboutAndRotate(aboutScroll, delta);
  if (syncState) syncHomeMobileScrollState();
}

function isRidesMobileScrollControl() {
  return Boolean(
    isMobileHomeWheelPage &&
    HOME_MOBILE_MQ.matches &&
    document.documentElement.classList.contains("home-mobile-scroll") &&
    ridesDetailsScroll &&
    ridesDetailOpen
  );
}

function isRidesTextAreaTouch(event) {
  return Boolean(
    event.target.closest(".rides-circle--text, .rides-details-scroll, .rides-circle-content")
  );
}

function applyRidesInnerScrollDelta(delta) {
  if (!delta || !ridesDetailsScroll || !isRidesMobileScrollControl()) return;
  scrollRidesTextAndRotate(delta);
}

function shouldSkipHomeMobileTouch(event) {
  if (
    event.target.closest(
      ".rides-text-nav-btn, .home-menu-toggle, .home-lang-toggle, .home-site-menu, .home-site-menu-link, .corner"
    )
  ) {
    return true;
  }

  if (
    event.target.closest(
      ".wheel-wrap--rides .rides-preview-hit, .wheel-wrap--rides .rides-preview, .wheel-wrap--rides .rides-duo, .wheel-wrap--rides .rides-circle, .wheel-wrap--rides .rides-photo"
    )
  ) {
    return false;
  }

  return Boolean(event.target.closest(HOME_TOUCH_SKIP));
}

function isHomeWheelPageTouch(event) {
  return Boolean(isMobileHomeWheelPage && event.target.closest(".wheel-wrap"));
}

function onHomeMobileTouchStart(event) {
  if (!isHomeMobileScrollInteractionActive()) return;
  if (shouldSkipHomeMobileTouch(event)) return;
  if (event.touches.length !== 1) return;

  homeTouchStartY = event.touches[0].clientY;
  homeTouchLastY = homeTouchStartY;
  homeTouchAccum = 0;
  homeTouchActive = true;
  homeTouchOnAboutWheel = isHomeWheelPageTouch(event);
  homeTouchOnRidesTextArea = isRidesTextAreaTouch(event);
}

function onHomeMobileTouchMove(event) {
  if (!homeTouchActive || !isHomeMobileScrollInteractionActive()) return;
  if (event.touches.length !== 1) return;

  const y = event.touches[0].clientY;
  const delta = homeTouchLastY - y;
  homeTouchLastY = y;
  if (!delta) return;

  homeTouchAccum += delta;

  // ABOUT/CONTACT/GEAR: any page swipe moves the text via native scrollTop.
  if (isAboutScrollMobilePage() && aboutScroll) {
    event.preventDefault();
    scrollAboutAndRotate(aboutScroll, delta);
    return;
  }

  if (homeTouchOnAboutWheel) {
    event.preventDefault();

    if (isRidesMobileScrollControl() && homeTouchOnRidesTextArea) {
      applyRidesInnerScrollDelta(delta);
    }
    return;
  }

  if (isMainMobileHome && homeWheelSpokes) {
    event.preventDefault();
    applyWheelRotation(rotation + delta * 0.45);
  }
}

function onHomeMobileTouchEnd(event) {
  if (!homeTouchActive) return;
  homeTouchActive = false;

  homeTouchAccum = 0;
  homeTouchOnAboutWheel = false;
  homeTouchOnRidesTextArea = false;

  setPageScrollTop(0);
  syncHomeMobileScrollState();
}

function getMobileCopyrightAnchor() {
  return homeIndex || document.querySelector(".home--rides");
}

function syncMobileCopyrightPlacement() {
  if (!copyrightEl) return;

  const anchor = getMobileCopyrightAnchor();
  const placeInMain = Boolean(HOME_MOBILE_MQ.matches && anchor);

  if (placeInMain) {
    if (copyrightEl.parentElement !== anchor) {
      anchor.appendChild(copyrightEl);
    }
    return;
  }

  if (copyrightEl.parentElement !== document.body) {
    document.body.appendChild(copyrightEl);
  }
}

function syncMobileHomeScrollMode() {
  const root = document.documentElement;
  const enabled = Boolean(isMobileHomeScrollPage && HOME_MOBILE_MQ.matches);

  root.classList.toggle("home-mobile-scroll", enabled);

  if (!enabled) {
    root.classList.remove("is-menu-scroll-locked");
    initAboutMobileScrollControl();
    syncMobileHomeViewportHeight();
    syncMobileCopyrightPlacement();
    return;
  }

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  setPageScrollTop(0);
  initAboutMobileScrollControl();
  syncHomeMobileScrollState();
  syncMobileCopyrightPlacement();
}

function onMobileHomeScrollOrViewportChange() {
  syncHomeMobileScrollState();

  window.clearTimeout(homeScrollSnapTimer);
  homeScrollSnapTimer = window.setTimeout(snapHomeMobileScroll, 140);
}

function syncMobileHomeScrollLock() {
  if (!isMobileHomeScrollPage || !HOME_MOBILE_MQ.matches) return;

  const locked = homeIndex.classList.contains("is-menu-open");
  document.documentElement.classList.toggle("is-menu-scroll-locked", locked);

  if (locked) {
    window.scrollTo(0, 0);
  }

  syncHomeMobileScrollState();
}

function onHomeMobileOrientationChange() {
  resetHomeViewportHeightCache();
  syncHomeMobileScrollState();
  snapHomeMobileScroll();
}

syncMobileCopyrightPlacement();
HOME_MOBILE_MQ.addEventListener("change", syncMobileCopyrightPlacement);
window.addEventListener("resize", syncMobileCopyrightPlacement);

if (isMobileHomeScrollPage) {
  syncMobileHomeScrollMode();
  window.addEventListener("scroll", onMobileHomeScrollOrViewportChange, {
    passive: true,
  });
  homeIndex.addEventListener("touchstart", onHomeMobileTouchStart, {
    passive: true,
  });
  homeIndex.addEventListener("touchmove", onHomeMobileTouchMove, {
    passive: false,
  });
  homeIndex.addEventListener("touchend", onHomeMobileTouchEnd, {
    passive: true,
  });
  homeIndex.addEventListener("touchcancel", onHomeMobileTouchEnd, {
    passive: true,
  });
  window.addEventListener("resize", syncMobileHomeViewportHeight);
  window.addEventListener("orientationchange", onHomeMobileOrientationChange);
  window.visualViewport?.addEventListener("resize", onMobileHomeScrollOrViewportChange);
  window.visualViewport?.addEventListener("scroll", onMobileHomeScrollOrViewportChange);
  HOME_MOBILE_MQ.addEventListener("change", syncMobileHomeScrollMode);
}

if (isMobileHomeWheelPage && aboutScroll) {
  initAboutMobileScrollControl();
  HOME_MOBILE_MQ.addEventListener("change", initAboutMobileScrollControl);
  window.addEventListener("resize", initAboutMobileScrollControl);
}

if (isWheelDashRotatePage() && aboutScroll) {
  aboutScroll.addEventListener(
    "scroll",
    () => {
      syncWheelDashRotation();
    },
    { passive: true }
  );
  syncWheelDashRotation();
}

if (ridesDetailsScroll) {
  let ridesTextLastScrollTop = ridesDetailsScroll.scrollTop;
  ridesDetailsScroll.addEventListener(
    "scroll",
    () => {
      if (!isRidesDashRotateActive()) {
        ridesTextLastScrollTop = ridesDetailsScroll.scrollTop;
        return;
      }
      const top = ridesDetailsScroll.scrollTop;
      const delta = top - ridesTextLastScrollTop;
      ridesTextLastScrollTop = top;
      if (delta) applyWheelDashDelta(delta);
    },
    { passive: true }
  );
}

function setHomeMenuOpen(open) {
  if (!homeIndex || homeMenuAnimating) return;
  if (open === homeIndex.classList.contains("is-menu-open")) return;

  if (homeMenuToggle) {
    homeMenuToggle.setAttribute("aria-expanded", String(open));
    homeMenuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (open) {
    if (homeSiteMenu) homeSiteMenu.hidden = false;
    if (homeMenuBackdrop) {
      homeMenuBackdrop.hidden = false;
      homeMenuBackdrop.setAttribute("aria-hidden", "false");
    }

    syncMobileHomeScrollLock();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        homeIndex.classList.add("is-menu-open");
      });
    });
    return;
  }

  homeIndex.classList.remove("is-menu-open");
  syncMobileHomeScrollLock();
  homeMenuAnimating = true;

  window.setTimeout(() => {
    if (!homeIndex.classList.contains("is-menu-open")) {
      if (homeSiteMenu) homeSiteMenu.hidden = true;
      if (homeMenuBackdrop) {
        homeMenuBackdrop.hidden = true;
        homeMenuBackdrop.setAttribute("aria-hidden", "true");
      }
    }
    homeMenuAnimating = false;
  }, HOME_MENU_ANIM_MS);
}

if (homeMenuToggle) {
  homeMenuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setHomeMenuOpen(!homeIndex.classList.contains("is-menu-open"));
  });
}

if (homeIndex) {
  homeIndex.addEventListener("click", (event) => {
    if (!homeIndex.classList.contains("is-menu-open")) return;
    if (!document.documentElement.classList.contains("home-mobile-scroll")) return;
    if (event.target.closest(".home-site-menu, .home-menu-toggle, .home-lang-toggle")) {
      return;
    }
    setHomeMenuOpen(false);
  });
}

if (homeMenuBackdrop) {
  homeMenuBackdrop.addEventListener("click", () => setHomeMenuOpen(false));
}

(function initAboutFootnotes() {
  const footnotes = document.querySelectorAll(".about-footnote");
  if (!footnotes.length) return;

  footnotes.forEach((el) => {
    const tip = el.querySelector(".about-footnote-tip");
    if (!tip) return;
    tip.classList.add("about-footnote-tip--portal");
    document.body.appendChild(tip);
    el._footnoteTip = tip;
  });

  const placeTip = (el) => {
    const tip = el._footnoteTip;
    if (!tip) return;

    tip.classList.add("is-measuring");
    const word = el.getBoundingClientRect();
    const wheelEl = el.closest(".wheel");
    const wheel = wheelEl?.getBoundingClientRect();
    const tipWidth = tip.offsetWidth || Math.min(window.innerWidth * 0.18, 288);
    const tipHeight = tip.offsetHeight || 120;
    tip.classList.remove("is-measuring");

    const gap = 8;
    // Always center above the word so the tip stays inside the circle on 16"+ laptops.
    let left = word.left + word.width / 2 - tipWidth / 2;
    let top = word.top - tipHeight - gap;

    if (wheel) {
      const cx = wheel.left + wheel.width / 2;
      const cy = wheel.top + wheel.height / 2;
      const radius = Math.min(wheel.width, wheel.height) / 2 - 18;

      const clampCorner = (x, y) => {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.hypot(dx, dy);
        if (dist <= radius) return { x, y };
        const scale = radius / dist;
        return { x: cx + dx * scale, y: cy + dy * scale };
      };

      // Pull the whole box inward if any corner would leave the circle.
      for (let i = 0; i < 3; i += 1) {
        const corners = [
          [left, top],
          [left + tipWidth, top],
          [left, top + tipHeight],
          [left + tipWidth, top + tipHeight],
        ];
        let shiftX = 0;
        let shiftY = 0;
        corners.forEach(([x, y]) => {
          const clamped = clampCorner(x, y);
          shiftX += clamped.x - x;
          shiftY += clamped.y - y;
        });
        left += shiftX / corners.length;
        top += shiftY / corners.length;
      }
    }

    tip.style.left = `${Math.round(left)}px`;
    tip.style.top = `${Math.round(top)}px`;
  };

  const setTipOpen = (el, open) => {
    const tip = el._footnoteTip;
    if (!tip) return;
    tip.classList.toggle("is-open", open);
    if (open) placeTip(el);
  };

  footnotes.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      placeTip(el);
      setTipOpen(el, true);
    });
    el.addEventListener("mouseleave", () => {
      if (!el.classList.contains("is-open")) setTipOpen(el, false);
    });
    el.addEventListener("focusin", () => {
      placeTip(el);
      setTipOpen(el, true);
    });
    el.addEventListener("focusout", () => {
      if (!el.classList.contains("is-open") && !el.contains(document.activeElement)) {
        setTipOpen(el, false);
      }
    });
    el.addEventListener("click", (event) => {
      event.stopPropagation();
      const wasOpen = el.classList.contains("is-open");
      footnotes.forEach((node) => {
        node.classList.remove("is-open");
        setTipOpen(node, false);
      });
      if (!wasOpen) {
        el.classList.add("is-open");
        setTipOpen(el, true);
      }
    });
  });

  const repositionOpen = () => {
    footnotes.forEach((el) => {
      const tip = el._footnoteTip;
      if (tip?.classList.contains("is-open")) placeTip(el);
    });
  };

  window.addEventListener("resize", repositionOpen);
  document
    .querySelector(".wheel-about-scroll")
    ?.addEventListener("scroll", repositionOpen, { passive: true });

  document.addEventListener("click", () => {
    footnotes.forEach((node) => {
      node.classList.remove("is-open");
      setTipOpen(node, false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    footnotes.forEach((node) => {
      node.classList.remove("is-open");
      setTipOpen(node, false);
    });
  });
})();

if (ridesStage) {
  const route = getRidesRouteFromLocation();
  rideIndex = route.rideIndex;
  renderRide(rideIndex);

  if (route.detail) {
    openRideDetail({ pushHistory: false, animateHeader: false, immediate: true });
    syncRidesHistory("detail", rideIndex);
  } else {
    syncRidesHistory("list", rideIndex);
    syncRidesHeaderMode({ animate: false });
  }

  syncRidesAutoAdvance();
}
