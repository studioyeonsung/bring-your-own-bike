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
    "The fifth edition of BYOB was its first in South Korea, and it took place along the Taehwa River in Ulsan.\n\nThe river once reeked with industrial waste through decades of rapid industrialization. It's since been restored into one of the city's most popular cycling routes.\n\n˚✩☁︎︎⋆｡ˏˋ ˚\n\nRiding together with local citizens and artists, we followed the river from its green, recovered present back through the infrastructure built to manage its past: a sewage treatment plant, floodgates, pollution monitoring stations.\n\nThe path eventually ran directly alongside Hyundai Motor's active factory complex.\n\n⋆｡ﾟ☁︎｡ﾟ⋆｡ﾟ☁︎｡ﾟ⋆\n\nUnlike the Netherlands or Germany, where BYOB had ridden straight into the industrial sites themselves, access here was mostly closed off.\n\nWe watched Ulsan's industry from across the water instead, the plants sitting on the far bank while we talked about the city's ecology and its pollution from a distance we couldn't close.\n\nThat distance became its own kind of information: what a place lets you get close to says as much as what's actually inside it.\n\n˖*༄\n\nFew cities in Korea carry both the light and the dark of industrialization as visibly as this one. Ulsan poisoned this river, then spent decades bringing it back, and that recovery is real.\n\nBut the river healing doesn't mean the industry around it stopped. Riding past the factory, we passed dozens of actual workers cycling in for their shift, ordinary bikes headed into the same complex we were riding past to think about.\n\nWe were out there cycling to notice something. They were cycling to clock in.\nSame road, same motion, completely different reasons for being on it, and it was hard not to feel the distance between the two.\n\n𓆝 𓆟 𓆞 𓆝𓇢𓆸\n\nFor a few kilometers, the ride moved through two Ulsans at once: the river that healed, and the industry that never stopped.",
  ],
  credits: [
    { title: "Program Assistance", name: "Eunji Kwak · Ahae Kim" },
    { title: "Presented at", name: "U-Spectrum" },
    { title: "Photography", name: "Eoming" },
    { title: "Videography", name: "Shinyoung Kim" },
    { title: "Thanks", name: "CLoFA" },
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
    "The first edition of BYOB rode straight into a storm.\n\nOf the seven people registered, only three showed up, all of them already friends of Yeon's, which somehow felt right for a ride this small and this exposed.\n\nThe wind was strong enough that weathering stopped being a concept we were riding toward and became the actual condition we were riding in.\n\nSome of us could barely keep the pedals turning, but it was, in its own strange way, the right kind of day to begin a project built around the practice of weathering.\n\n☁︎ ☁︎ ☁︎ ☁︎\n\nWe started at Het Hem, inside the Hembrugterrein in Zaandam, a former munitions factory that stayed sealed behind fences for generations before it opened up to artists and the public.\n\nBefore setting off we went briefly through the site's history, enough to understand what those buildings used to keep hidden, then crossed the North Sea Canal on the Hempont, the free ferry that still carries cyclists between Zaandam and Amsterdam's port district.\n\nIt let us off directly inside Westpoort, Amsterdam's working harbor, and from there the storm did most of the talking.\n\n.𖥔 ݁ ˖⋆ ˚❆\n\nWind turbines built straight into the skyline of the port groaned overhead, generating power for the harbor itself. A scrap metal terminal held mountains of crushed steel waiting for ships bound for Turkey. Oil terminals lined the water, part of what's marketed as the largest gasoline port in the world.\n\nThe wind kept pushing back against every pedal stroke, and our breath kept getting shorter trying to keep up with it.\n\nNone of us were simulating exposure to anything.\nWe were just riding through whatever the weather actually gave us that day.",
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
  subtitle: "Catching Its Breath",
  subtitleItalic: true,
  date: "26 July 2025",
  previewDate: "26 Jul 2025",
  previewVenue: "Vlaardingen→Botlek",
  previewCountry: "NL",
  photoCredit:
    "Photo: Silvia Arenas © Studio Yeon Sung, Wasteland Festival, Rotterdam, 26 July 2025",
  venue: "Vlaardingen → Botlek,",
  cityHtml:
    "Rotterdam, NL<br>As part of Wasteland Festival: Out of Sight",
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
    "The fourth edition of BYOB set out from Oeverbos in Vlaardingen, a young forest planted over remediated harbour sediment.\nWe rode past the landfill sites and sewage treatment plants still sitting at its edges. Then a ferry carried us across the river Het Scheur into Rozenburg.\n\n༄☁︎𝄞✧˖°⭑\n\nFor a moment the village held.\nGardens, quiet streets, wedged inside the largest industrial zone in Europe.\nThen AVR's incinerator stacks rose up ahead of us, smoke drifting over the road. Someone asked how exactly the city's own trash finds its way here.\nIt turned out to be a longer answer than expected.\n\n☁︎⋆⁺₊⋆ ☀︎ ⋆⁺₊⋆\n\nFrom there we pushed into Botlek proper, one of the core facilities of the Port of Rotterdam and among the densest petrochemical clusters in Europe. Mountains of coal passed on one side, steam-venting facilities and storage tanks on the other, containers stacked between them. It was hard to tell where one plant ended and the next began.\n\n.·:¨ ¨:·.\n\nWe stopped for a picnic in the shadow of Air Products' HyCO4 plant.\nIts steam vented continuously into the sky, a hydrogen facility marketed as the port's clean-energy future.\nNine cyclists resting in front of a plant that never rests. It was hard not to read the scene both ways at once. The technology changes, grey hydrogen to blue, emissions captured instead of released. But the steam and the steel stay exactly the same.\nWhat looked like transition, seen this close, looked mostly like the same industry learning to hide its exhaust underground.\n\n࿐༉\n\nFor this edition, the bike itself became part of the listening.\nRiding back through Botlek toward Rozenburg, it played a real-time soundscape built from its own reaction to the surrounding air.\nFor a long stretch, we rode in silence, just listening to what it picked up.\nRozenburg's calm read differently the second time, less like an accident of geography and more like a kind of held breath.",
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
    "The third edition of BYOB followed the Westhafen, Berlin's largest inland port, together with ZK/U's resident artists and local cyclists, closing out the CYCLE UP! residency.\n\nWe rode out on a new version of the bike built during the residency, starting from ZK/U's own building, itself a former freight depot, before joining the Spree, the river running through the middle of Berlin, where it wraps around Moabit, an island that made this the easiest place in the city, a century ago, to move coal by barge straight to where it would be burned.\n\n⁺₊⋆ ☁︎ ☀︎ ☁︎ ⋆⁺₊\n\nThe route followed inland bike paths overlooking the port's industrial facilities, and there was time, riding through them, to think about how closely this district and its industry are actually tied together.\n\nKraftwerk Moabit was still burning as we passed, less than four kilometers from the Brandenburg Gate. It reads at first like a planning failure, but the closeness is the design, not a mistake: heat loses energy fast over distance, so a plant like this only works sitting inside the city it warms.\n\nIt was hard, after that, to keep thinking of the city and its industry as two separate things riding past each other. They looked more like one system wearing two faces.\n\n⋆｡°•☁︎\n\nSteel tanks and silos held sand and construction waste, rows of shipping containers waited for the next freight train to Hamburg, and barges moved the same bulk cargo they've moved for a hundred years, with a few new hydrogen tanks now standing among the old coal berths.\n\nRiding along the water, past a hundred years of infrastructure still doing exactly what it was built to do, it was hard to tell which century's industry we were actually looking at.",
  ],
  credits: [
    {
      title: "Presented at",
      name: "ZK/U · as part of the Cycle Up! Residency",
    },
    { title: "Program Assistance", name: "Heejung Kim" },
    {
      title: "Residency Coordinator",
      name: "Anita Rinda · Natálie Černá · Simona Binko",
    },
    { title: "Photography", name: "Zuzana-Markéta Macková" },
    { title: "Implemented by", name: "Cycle Up! project" },
    {
      title: "Co-financed by",
      name: "The Creative Europe Programme of the European Union",
    },
  ],
};

const ride04DetailTextEn = {
  title: "Edition 02",
  subtitle: "Disappear Into Scale",
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
    "The second edition of BYOB set out from Varia in southern Rotterdam and cut straight through Waalhaven, one stretch in the sprawl of docks and terminals that make up the Port of Rotterdam.\n\nCranes and stacks of identical containers rose several stories on either side of the road, indistinguishable from each other and from the water beneath them.\n\nAs part of Colonial Infrastructures: on Containerisation, the ride tried to unfold what those containers actually carry, not just cargo, but the stories that move through a port built to process everything at the scale of the container and none of it at the scale of a person.\n\n⋆｡ﾟ☁︎｡⋆｡ ﾟ☾ ﾟ｡⋆\n\nThe road narrowed as it left the terminals, and the group crossed from the anonymity of the boxes into Pernis, a village of fewer than five thousand people whose streets, gardens, and church spire have somehow held their shape while Shell's refinery, the largest in Europe, grew up around them on every side.\n\nRiding from one edge of the village to the other took a few minutes. Getting used to the shift, containers to houses, scale to name, took longer.\n\n⊹ ࣪ ˖\n\nRiding alongside Czarina, whose own work traces her father's letters home from years spent working on container ships, sharpened something about the ride itself. Both, in their own way, try to register what infrastructure is built to erase, hers on paper after the fact, this one on a bike in real time.\n\nRiding past the containers with that in mind, it was hard not to read them differently, less like cargo, more like a system built to make people disappear into scale.",
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
  subtitle: "여전히 흐른다",
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
    "BYOB의 다섯 번째 에디션이자 한국에서의 첫 라이딩은 울산의 Taehwa River를 따라 진행되었다. 급속한 산업화의 수십 년 동안 산업 폐수로 악취를 풍기던 이 강은, 이후 도시의 가장 인기 있는 자전거 길 중 하나로 복원되었다.",
    "지역 시민과 예술가들과 함께, 참가자들은 푸르게 회복된 현재의 강에서 출발해 그 과거를 관리하기 위해 세워진 인프라 — 하수 처리장, 수문, 오염 관측소 — 를 거슬러 올라갔고, 마침내 경로가 Hyundai Motor의 가동 중인 공장 단지와 나란히 이어지는 구간에 도착했다.",
    "몇 킬로미터 동안, 라이딩은 두 개의 울산을 동시에 통과했다. 치유된 강, 그리고 멈추지 않은 산업.",
  ],
  credits: [
    { title: "프로그램 지원", name: "곽은지 · 김아해" },
    { title: "발표 장소", name: "U-Spectrum" },
    { title: "사진", name: "어밍" },
    { title: "영상", name: "김신영" },
    { title: "감사", name: "클로파" },
  ],
};

const ride02DetailTextKo = {
  title: "에디션 04",
  subtitle: "숨을 고르며",
  subtitleItalic: true,
  date: "2025년 7월 26일",
  previewDate: "2025년 7월 26일",
  previewVenue: "Vlaardingen→Botlek",
  previewCountry: "네덜란드",
  photoCredit:
    "사진: Silvia Arenas © 스튜디오 연성, Wasteland Festival, 로테르담, 2025년 7월 26일",
  venue: "Vlaardingen → Botlek,",
  cityHtml:
    "로테르담, 네덜란드<br>Wasteland Festival: Out of Sight의 일환으로",
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
    "Wasteland Festival의 초청으로 열린 BYOB 네 번째 에디션은 지금까지 가장 긴 라이딩이었다. 아홉 명의 사이클리스트가 정화된 항만 퇴적물 위에 조성된 숲 Oeverbos in Vlaardingen에서 출발해, 유럽에서 가장 밀집된 석유화학 단지 중 하나인 Botlek까지 Port of Rotterdam을 가로질렀다.",
    "페리가 그룹을 유럽 최대 산업 지대 안에 끼어 있는 Rozenburg 마을의 이상한 고요함 — 정원과 조용한 거리들 — 속으로 데려갔고, 이내 AVR의 소각장 굴뚝이 앞에 놓인 산업을 알렸다.",
    "라이딩은 Air Products의 HyCO4 플랜트 그늘에서 피크닉을 위해 잠시 멈췄다. 하늘로 끊임없이 증기를 내뿜는 그곳은 항구의 청정 에너지 미래로 홍보되는 수소 시설이었다. 결코 쉬지 않는 플랜트 앞에서 쉬는 아홉 명의 사이클리스트. 그 장면을 한 가지 방식으로만 읽기는 어려웠다.",
    "기술은 바뀐다. 그레이 수소에서 블루 수소로, 배출은 방출 대신 포집된다. 그러나 증기와 강철은 정확히 그대로다. 가까이에서 본 전환은, 대개 같은 산업이 배기가스를 땅속으로 숨기는 법을 배우는 모습에 가까웠다.",
  ],
  credits: [
    { title: "큐레이터 & 프로그램 지원", name: "Katya Borisova" },
    { title: "발표 장소", name: "Wasteland Festival 2025" },
    { title: "사진", name: "Silvia Arenas" },
  ],
};

const ride03DetailTextKo = {
  title: "에디션 03",
  subtitle: "일하는 강을 따라",
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
    "BYOB 세 번째 에디션은 베를린 최대의 내륙 항구 Westhafen을 따라, ZK/U의 레지던시 예술가들과 지역 사이클리스트들과 함께 달렸고, CYCLE UP! 레지던시를 마무리했다.",
    "우리는 Moabit을 감싸 도는 Spree를 따라 달렸다. 한 세기 전, 석탄을 바지선으로 태울 곳까지 곧장 옮기기 가장 쉬운 자리였던 그 섬. Kraftwerk Moabit은 우리가 지나갈 때도 여전히 타고 있었고, Brandenburg Gate에서 채 사 킬로미터도 떨어지지 않은 곳이었다. 처음에는 계획의 실패처럼 보이지만, 그 가까움은 실수가 아니라 설계다. 열은 거리를 지나면 빠르게 에너지를 잃기 때문에, 이런 발전소는 자신이 데우는 도시 안에 앉아 있을 때만 작동한다.",
    "강철 탱크와 사일로에는 모래와 건설 폐기물이 담겨 있었고, 컨테이너 행렬은 Hamburg로 향할 다음 화물열차를 기다렸으며, 바지선은 백 년 동안 옮겨 온 것과 같은 벌크 화물을 실어 날랐다. 옛 석탄 선착장 사이에는 새 수소 탱크 몇 기가 서 있었다. 물을 따라 달리며, 지어진 그대로의 일을 여전히 하는 백 년의 인프라를 지나다 보면, 우리가 실제로 보고 있는 것이 어느 세기의 산업인지 말하기 어려웠다.",
  ],
  credits: [
    {
      title: "발표 장소",
      name: "ZK/U · Cycle Up! Residency의 일환으로",
    },
    { title: "프로그램 지원", name: "Heejung Kim" },
    { title: "사진", name: "Zuzana-Markéta Macková" },
    { title: "시행", name: "Cycle Up! project" },
    {
      title: "공동 재정 지원",
      name: "The Creative Europe Programme of the European Union",
    },
  ],
};

const ride04DetailTextKo = {
  title: "에디션 02",
  subtitle: "스케일 속으로 사라지다",
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
    "라이딩은 Port of Rotterdam을 이루는 부두와 터미널의 확산 속 한 구간, Waalhaven을 가로질렀다. 크레인과 동일한 컨테이너의 더미가 도로 양옆으로 여러 층 높이 솟아 있었고, 서로도, 그 아래 물과도 구분이 되지 않았다.",
    "터미널을 벗어나자 도로가 좁아졌고, 그룹은 상자들의 익명성에서 인구 오천도 채 되지 않는 마을 Pernis로 넘어갔다. 그곳의 거리와 정원과 교회 첨탑은, 유럽 최대의 Shell 정유 공장이 사방에서 자라나는 동안에도 어떻게든 형태를 지켜 왔다. 마을 한쪽 끝에서 다른 쪽 끝까지 달리는 데는 몇 분이면 충분했다. 컨테이너에서 집으로, 스케일에서 이름으로의 전환에 익숙해지는 데는 더 오래 걸렸다.",
    "컨테이너선에서 일하던 세월 동안 아버지가 집으로 보낸 편지를 추적하는 작업을 해 온 Czarina와 나란히 달리며, 라이딩 자체에 대한 어떤 감각이 날카로워졌다. 둘 다, 각자의 방식으로, 인프라가 지우도록 설계된 것을 기록하려 한다. 그녀는 사후에 종이 위에서, 이 라이딩은 실시간으로 자전거 위에서. 그 생각을 품고 컨테이너 옆을 지나자, 그것들을 화물로 읽기보다 사람을 스케일 속으로 사라지게 만들도록 지어진 시스템으로 읽지 않기가 어려웠다.",
  ],
  credits: [
    {
      title: "발표 장소",
      name: "Varia · Colonial Infrastructures: on Containerisation의 일환으로",
    },
    {
      title: "협업",
      name: "Amy Pickles · Czarina Calinawagan",
    },
  ],
};

const ride05DetailTextKo = {
  title: "에디션 01",
  subtitle: "날씨가 시작했다",
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
    "BYOB의 첫 에디션은 곧장 폭풍 속으로 달렸다. 등록한 일곱 명 중 나타난 사람은 셋뿐이었고, 바람은 weathering이 개념이기를 멈추고 라이딩의 문자 그대로의 조건이 될 만큼 강했다. 페달을 돌리기조차 버거운 순간도 있었지만, weathering의 실천을 중심으로 한 프로젝트를 시작하기에는, 그 나름으로 완벽한 날이었다.",
    "경로는 Zaandam의 Hembrugterrein에서 시작되었다. 세대에 걸쳐 울타리 뒤에 봉인되어 있다가 예술가와 대중에게 열린 옛 군수 공장이다. 그룹은 Zaandam과 암스테르담 항구 지구 사이를 여전히 자전거를 실어 나르는 무료 페리 Hempont으로 North Sea Canal을 건넜고, 암스테르담의 가동 중인 항구 Westpoort 한가운데에 곧장 내려졌다. 그다음부터는 폭풍이 대부분의 말을 했다. 항구 스카이라인에 곧게 세워진 풍력 터빈이 머리 위에서 신음하며 항구 자체를 위한 전력을 만들었고, 고철 터미널에는 Turkey로 향할 배를 기다리는 짓이겨진 강철의 산이 쌓여 있었으며, 세계 최대의 가솔린 항구로 홍보되는 수변을 따라 석유 터미널이 줄지어 있었다.",
    "그 모든 것을 지나며 바람에 몸을 기울인 우리 셋은, 무엇에 대한 노출을 시뮬레이션하고 있지 않았다. 그날 날씨가 실제로 준 것을 지나고 있을 뿐이었다.",
  ],
  credits: [
    {
      title: "발표 장소",
      name: "Sonic Acts Festival 2024 · Program Sediments의 일환으로",
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

function getStableMobileViewportHeight() {
  const visualHeight = window.visualViewport?.height ?? 0;
  const layoutHeight = window.innerHeight ?? 0;
  const candidates = [visualHeight, layoutHeight].filter((h) => h > 0);
  if (!candidates.length) return 0;
  // Prefer the smaller height (browser chrome visible) so Android Chrome
  // collapsing the URL bar does not stretch the layout.
  return Math.min(...candidates);
}

function resetHomeViewportHeightCache() {
  homeLockedViewportHeight = null;
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
