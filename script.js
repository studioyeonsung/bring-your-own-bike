const wheel = document.getElementById("wheel");
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
    { title: "Concept & Production", name: "Yeon Sung" },
    {
      title: "Presented at",
      name: "Sonic Acts Festival, Varia, Cycle Up Residency, Wasteland Festival, U-Spectrum",
    },
    { title: "Illustration", name: "Heejung Kim" },
    { title: "Web Design", name: "Studio165" },
    { title: "Web Development", name: "Studio165 with Cursor" },
  ],
};

const ride01DetailTextEn = {
  title: "Edition 05",
  subtitle: "Still Running",
  subtitleItalic: true,
  date: "25 October 2025, Saturday",
  previewDate: "25 Oct 2025",
  previewVenue: "Taehwa River",
  previewCountry: "KR",
  photoCredit:
    "Photo: Eoming © Studio Yeon Sung, U-Spectrum, Ulsan, 25 October 2025",
  venue: "Taehwa River,",
  city: "Ulsan, KR",
  time: "14:00-16:00",
  distance: "10km",
  weather: [
    "19°C",
    "Light Wind, W8 mph",
    "Humidity: 63%",
    "Air quality: Good",
  ],
  cyclists: {
    heading: "6 Cyclists",
    count: "",
    nameLines: [
      "Ahae Kim · Jinhee Yang · Jihyeon Kim · Sian Kim · Woosoo Lee · Yerin Lee",
    ],
  },
  story: [
    "The fifth edition of BYOB — its first in South Korea — took place along the Taehwa River in Ulsan, a river that once reeked with industrial waste through decades of rapid industrialization, since restored into one of the city's most popular cycling routes.",
    "Riding together with local citizens and artists, participants followed the river from its green, recovered present back through the infrastructure built to manage its past — a sewage treatment plant, floodgates, pollution monitoring stations — before arriving at a stretch where the path runs directly alongside Hyundai Motor's active factory complex.",
    "For a few kilometers, the ride moved through two Ulsans at once: the river that healed, and the industry that never stopped.",
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
  subtitle: "The Weather Began It",
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
    "9°C",
    "Strong Wind, W20 mph",
    "Humidity: 77%",
    "Air quality: Good",
  ],
  cyclists: {
    heading: "3 Cyclists",
    count: "",
    nameLines: [
      "Fileona Dkhar · Katya Borisova · Minari Lee",
    ],
  },
  story: [
    "The first edition of BYOB rode straight into a storm. Of seven people registered, only three showed up, and the wind was strong enough that weathering stopped being a concept and became the literal condition of the ride. Some of us could barely keep the pedals turning, but it was, in its own way, the perfect day to begin a project built around the practice of weathering.",
    "The route began at the Hembrugterrein in Zaandam, a former munitions factory that stayed sealed behind fences for generations before it opened up to artists and the public, and crossed the North Sea Canal on the Hempont, the free ferry that still carries cyclists between Zaandam and Amsterdam's port district. It let us off directly inside Westpoort, Amsterdam's working harbor, where the storm did most of the talking from there. Wind turbines built straight into the skyline of the port groaned overhead, generating power for the harbor itself, while a scrap metal terminal held mountains of crushed steel waiting for ships bound for Turkey, and oil terminals lined the water in what's marketed as the largest gasoline port in the world.",
    "The three of us leaning hard into the wind past all of it weren't simulating exposure to anything. We were just riding through what the weather actually gave us that day.",
  ],
  credits: [
    {
      title: "Presented at",
      name: "Sonic Acts Festival 2024 as part of Program Sediments",
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
    "Light Showers, WSW9 mph",
    "Humidity: 68%",
    "Air quality: Good",
  ],
  cyclists: {
    heading: "9 Cyclists",
    count: "",
    nameLines: [
      "Floris De Haan · Jorge Simelio · Katya Borisova · Nicilien Wolf · Nik · Phone Myant Khant · Raziel Miranda · Silvia Arena",
    ],
  },
  story: [
    "The fourth edition of BYOB, held by invitation of Wasteland Festival, was the longest ride to date: nine cyclists crossed the Port of Rotterdam from Oeverbos in Vlaardingen, a forest planted over remediated harbour sediment, into Botlek, one of Europe's densest petrochemical clusters.",
    "A ferry carried the group into the strange calm of Rozenburg village, gardens and quiet streets wedged inside the largest industrial zone in Europe, before AVR's incinerator stacks announced the industry ahead.",
    "The ride paused for a picnic in the shadow of Air Products' HyCO4 plant, its steam venting continuously into the sky, a hydrogen facility marketed as the port's clean-energy future. Nine cyclists resting in front of a plant that never rests: it was hard not to read the scene both ways at once.",
    "The technology changes, grey hydrogen to blue, emissions captured instead of released, but the steam and the steel stay exactly the same. What looked like transition, seen this close, looked mostly like the same industry learning to hide its exhaust underground.",
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
    "Light Rain, N10 mph",
    "Humidity: 85%",
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
    "The third edition of BYOB followed the Westhafen, Berlin's largest inland port, together with ZK/U's resident artists and local cyclists, closing out the CYCLE UP! residency.",
    "We rode along the Spree where it wraps around Moabit, an island that made this the easiest place in the city, a century ago, to move coal by barge straight to where it would be burned. Kraftwerk Moabit was still burning as we passed, less than four kilometers from the Brandenburg Gate. It reads at first like a planning failure, but the closeness is the design, not a mistake: heat loses energy fast over distance, so a plant like this only works sitting inside the city it warms.",
    "Steel tanks and silos held sand and construction waste, rows of shipping containers waited for the next freight train to Hamburg, and barges moved the same bulk cargo they've moved for a hundred years, with a few new hydrogen tanks now standing among the old coal berths. Riding along the water, past a hundred years of infrastructure still doing exactly what it was built to do, it was hard to tell which century's industry we were actually looking at.",
  ],
  credits: [
    {
      title: "Presented at",
      name: "ZK/U, as part of the Cycle Up! Residency",
    },
    { title: "Program Assistance", name: "Heejung Kim" },
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
    "19°C",
    "Fresh Breeze, WSW14 mph",
    "Humidity: 77%",
    "Air quality: Good",
  ],
  cyclists: {
    heading: "8 Cyclists",
    count: "",
    nameLines: [
      "Amy Pickles · Czarina Calinawagan · Dafni Melidou",
    ],
  },
  story: [
    "The ride cut through Waalhaven, one stretch in the sprawl of docks and terminals that make up the Port of Rotterdam. Cranes and stacks of identical containers rose several stories on either side of the road, indistinguishable from each other and from the water beneath them.",
    "The road narrowed as it left the terminals, and the group crossed from the anonymity of the boxes into Pernis, a village of fewer than five thousand people whose streets and gardens and church spire have somehow held their shape while Shell's refinery, the largest in Europe, grew up around them on every side. Riding from one edge of the village to the other took a few minutes. Getting used to the shift, containers to houses, scale to name, took longer.",
    "Riding alongside Czarina, whose own work traces her father's letters home from years spent working on container ships, sharpened something about the ride itself. Both, in their own way, try to register what infrastructure is built to erase, hers on paper after the fact, this one on a bike in real time. Riding past the containers with that in mind, it was hard not to read them differently, less like cargo, more like a system built to make people disappear into scale.",
  ],
  credits: [
    {
      title: "Presented at",
      name: "Varia, as part of Colonial Infrastructures: on Containerisation",
    },
    {
      title: "Collaborating with",
      name: "Amy Pickles · Czarina Calinawagan",
    },
  ],
};

const rideDetailTextKo = {
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
};

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
    ...(getSiteLang() === "en" ? ride01DetailTextEn : rideDetailText),
  },
  {
    image: rideCover("02"),
    gallery: rideGallery("02", 13),
    number: "02",
    alt: "Bring Your Own Bike ride 02",
    ...(getSiteLang() === "en" ? ride02DetailTextEn : rideDetailText),
  },
  {
    image: rideCover("03"),
    gallery: rideGallery("03", 10),
    number: "03",
    alt: "Bring Your Own Bike ride 03",
    ...(getSiteLang() === "en" ? ride03DetailTextEn : rideDetailText),
  },
  {
    image: rideCover("04"),
    gallery: rideGallery("04", 5),
    number: "04",
    alt: "Bring Your Own Bike ride 04",
    ...(getSiteLang() === "en" ? ride04DetailTextEn : rideDetailText),
  },
  {
    image: rideCover("05"),
    gallery: rideGallery("05", 3),
    number: "05",
    alt: "Bring Your Own Bike ride 05",
    ...(getSiteLang() === "en" ? ride05DetailTextEn : rideDetailText),
  },
];

let rotation = 0;
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
    return;
  }

  history.replaceState(
    { ridesView: "list", rideIndex: index },
    "",
    getRidesListUrl()
  );
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
    if (event.target === ridesLightbox) {
      closeRideLightbox();
    }
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
    name.textContent = credit.name;

    copy.append(title, name);
    article.appendChild(copy);
    ridesCreditsContainer.appendChild(article);
  });
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
    ridesDetailSubtitle.textContent = ride.subtitle || "";
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
        node.textContent = cyclists.nameLines?.[nameIndex] || "";
        node.classList.toggle("is-hidden", !cyclists.nameLines?.[nameIndex]);
      });
    }
  }

  if (ridesStoryBlock) {
    const story = ride.story;
    ridesStoryBlock.classList.toggle("is-hidden", !story?.length);
    ridesStoryParagraphs.forEach((node, storyIndex) => {
      node.textContent = story?.[storyIndex] || "";
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

  syncRidesAutoAdvance();
});

window.addEventListener(
  "wheel",
  (event) => {
    if (
      aboutScroll &&
      document.documentElement.classList.contains("home-mobile-scroll") &&
      HOME_MOBILE_MQ.matches
    ) {
      event.preventDefault();

      if (isHomeChromeExpanded()) {
        commitHomeChromeHideScroll();
      } else {
        applyAboutInnerScrollDelta(event.deltaY);
      }

      return;
    }

    let pageScroll = panel;
    if (aboutScroll && !isAboutMobileScrollControl() && panel?.classList.contains("wheel-about")) {
      pageScroll = aboutScroll;
    }
    if (pageScroll) {
      pageScroll.scrollTop += event.deltaY;
      event.preventDefault();
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
        ridesDetailsScroll.scrollTop += event.deltaY;
        return;
      }

      changeRide(direction);
      return;
    }

    if (!wheel) return;

    if (document.documentElement.classList.contains("home-mobile-scroll")) return;

    event.preventDefault();
    rotation += event.deltaY * 0.12;
    wheel.style.transform = `rotate(${rotation}deg)`;
  },
  { passive: false }
);

syncLanguageLinks();

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
const homeScrollHint = document.querySelector(".home-scroll-hint");
const homeScrollHintText = document.querySelector(".home-scroll-hint__text");
const HOME_CHROME_HIDE_SCROLL_Y = 100;
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
let homeExpandedViewportHeight = null;
let homeCollapsedViewportHeight = null;
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

  rotation = window.scrollY * 0.45;
  homeWheelSpokes.style.transform = `rotate(${rotation}deg)`;
}

function getVisualViewportHeight() {
  const visualHeight = window.visualViewport?.height ?? 0;
  const layoutHeight = window.innerHeight ?? 0;
  return Math.max(visualHeight, layoutHeight);
}

function isHomeChromeExpanded() {
  return getPageScrollTop() < HOME_CHROME_HIDE_SCROLL_Y * 0.5;
}

function resetHomeViewportHeightCache() {
  homeExpandedViewportHeight = null;
  homeCollapsedViewportHeight = null;
}

function captureHomeViewportHeights() {
  const viewportHeight = getVisualViewportHeight();

  if (isHomeChromeExpanded()) {
    homeExpandedViewportHeight =
      homeExpandedViewportHeight === null
        ? viewportHeight
        : Math.max(homeExpandedViewportHeight, viewportHeight);
    return;
  }

  homeCollapsedViewportHeight =
    homeCollapsedViewportHeight === null
      ? viewportHeight
      : Math.max(homeCollapsedViewportHeight, viewportHeight);
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

  const liveHeight = getVisualViewportHeight();
  const cachedHeight = isHomeChromeExpanded()
    ? homeExpandedViewportHeight
    : homeCollapsedViewportHeight;
  const height = Math.max(cachedHeight ?? 0, liveHeight);

  homeIndex.style.setProperty("--home-mobile-vh", `${height}px`);
  document.documentElement.style.setProperty("--home-mobile-vh", `${height}px`);
  homeIndex.style.height = `${height}px`;
  homeIndex.style.minHeight = `${height}px`;
}

function syncMobileHomeChromeState() {
  if (!isMobileHomeScrollPage || !HOME_MOBILE_MQ.matches) return;
  if (!document.documentElement.classList.contains("home-mobile-scroll")) return;

  homeIndex.classList.toggle("is-browser-chrome-visible", isHomeChromeExpanded());
}

function syncHomeMobileScrollState() {
  syncMobileHomeViewportHeight();
  syncMobileHomeChromeState();
  syncHomeScrollHint();
  syncHomeWheelRotationFromScroll();
}

function snapHomeMobileScroll() {
  if (!document.documentElement.classList.contains("home-mobile-scroll")) return;
  if (homeIndex.classList.contains("is-menu-open")) return;

  const scrollTop = getPageScrollTop();

  if (scrollTop <= 1) {
    if (scrollTop !== 0) {
      setPageScrollTop(0);
      syncHomeMobileScrollState();
    }
    return;
  }

  const target =
    scrollTop >= HOME_CHROME_HIDE_SCROLL_Y * 0.5 ? HOME_CHROME_HIDE_SCROLL_Y : 0;

  if (Math.abs(scrollTop - target) <= 2) return;

  setPageScrollTop(target);
  window.requestAnimationFrame(syncHomeMobileScrollState);
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
  setPageScrollTop(HOME_CHROME_HIDE_SCROLL_Y);
  window.requestAnimationFrame(syncHomeMobileScrollState);
}

function commitHomeChromeOpenScroll() {
  setPageScrollTop(0);
  window.requestAnimationFrame(syncHomeMobileScrollState);
}

function isAboutMobileScrollControl() {
  return (
    isMobileHomeWheelPage &&
    HOME_MOBILE_MQ.matches &&
    document.documentElement.classList.contains("home-mobile-scroll") &&
    aboutScrollTrack
  );
}

function ensureAboutScrollTrack() {
  if (!aboutScroll) return null;

  let track = aboutScroll.querySelector(".wheel-about-scroll-track");
  if (!track) {
    track = document.createElement("div");
    track.className = "wheel-about-scroll-track";
    while (aboutScroll.firstChild) {
      track.appendChild(aboutScroll.firstChild);
    }
    aboutScroll.appendChild(track);
  }

  aboutScrollTrack = track;
  return track;
}

function syncAboutScrollTrackTransform() {
  if (!aboutScrollTrack) return;
  aboutScrollTrack.style.transform = `translate3d(0, ${-aboutContentOffset}px, 0)`;
}

function getAboutContentMaxScroll() {
  if (!aboutScroll || !aboutScrollTrack) return 0;
  return Math.max(0, aboutScrollTrack.scrollHeight - aboutScroll.clientHeight);
}

function initAboutMobileScrollControl() {
  if (!isMobileHomeWheelPage || !aboutScroll) return;

  if (!HOME_MOBILE_MQ.matches) {
    const track = aboutScroll.querySelector(".wheel-about-scroll-track");
    if (track) {
      track.style.removeProperty("transform");
    }
    aboutScrollTrack = null;
    aboutContentOffset = 0;
    return;
  }

  ensureAboutScrollTrack();
  aboutScroll.scrollTop = 0;
  aboutContentOffset = Math.min(aboutContentOffset, getAboutContentMaxScroll());
  syncAboutScrollTrackTransform();
}

function applyAboutInnerScrollDelta(delta) {
  if (!delta || !aboutScroll || !isAboutMobileScrollControl()) return;

  if (delta > 0) {
    const innerRoom = Math.max(0, getAboutContentMaxScroll() - aboutContentOffset);
    aboutContentOffset += Math.min(delta, innerRoom);
  } else {
    aboutContentOffset = Math.max(0, aboutContentOffset + delta);
  }

  syncAboutScrollTrackTransform();
}

function applyAboutScrollWheelDelta(delta, syncState = false) {
  if (!delta || !aboutScroll) return;

  if (isAboutMobileScrollControl()) {
    applyAboutInnerScrollDelta(delta);
    if (syncState) syncHomeMobileScrollState();
    return;
  }

  aboutScroll.scrollTop += delta;
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

  const maxScroll = Math.max(0, ridesDetailsScroll.scrollHeight - ridesDetailsScroll.clientHeight);
  ridesDetailsScroll.scrollTop = Math.max(0, Math.min(maxScroll, ridesDetailsScroll.scrollTop + delta));
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

  if (homeTouchOnAboutWheel) {
    event.preventDefault();

    if (!isHomeChromeExpanded()) {
      if (isAboutMobileScrollControl()) {
        applyAboutInnerScrollDelta(delta);
      } else if (isRidesMobileScrollControl() && homeTouchOnRidesTextArea) {
        applyRidesInnerScrollDelta(delta);
      }
    }
  }
}

function onHomeMobileTouchEnd(event) {
  if (!homeTouchActive) return;
  homeTouchActive = false;

  const accum = homeTouchAccum;
  homeTouchAccum = 0;
  const fromAboutWheel = homeTouchOnAboutWheel;
  const fromRidesTextArea = homeTouchOnRidesTextArea;
  homeTouchOnAboutWheel = false;
  homeTouchOnRidesTextArea = false;

  if (accum > 18) {
    commitHomeChromeHideScroll();

    if (fromAboutWheel && isAboutMobileScrollControl()) {
      const innerExtra = Math.max(0, accum - HOME_CHROME_HIDE_SCROLL_Y);
      if (innerExtra > 0) {
        applyAboutInnerScrollDelta(innerExtra);
      }
    } else if (fromAboutWheel && isRidesMobileScrollControl() && fromRidesTextArea) {
      const innerExtra = Math.max(0, accum - HOME_CHROME_HIDE_SCROLL_Y);
      if (innerExtra > 0) {
        applyRidesInnerScrollDelta(innerExtra);
      }
    }
  } else if (accum < -18) {
    if (fromAboutWheel && isAboutMobileScrollControl() && aboutContentOffset > 0) {
      applyAboutInnerScrollDelta(accum);
    } else if (
      fromAboutWheel &&
      isRidesMobileScrollControl() &&
      fromRidesTextArea &&
      ridesDetailsScroll.scrollTop > 0
    ) {
      applyRidesInnerScrollDelta(accum);
    } else {
      commitHomeChromeOpenScroll();
    }
  } else {
    snapHomeMobileScroll();
  }

  syncHomeMobileScrollState();
}

function hideHomeScrollHintImmediately() {
  if (!homeScrollHint) return;

  homeScrollHint.classList.remove("is-hiding");
  homeScrollHint.hidden = true;
  homeScrollHint.setAttribute("aria-hidden", "true");
}

function dismissHomeScrollHint() {
  if (!homeScrollHint || homeScrollHint.hidden) return;

  homeScrollHint.classList.add("is-hiding");

  window.setTimeout(() => {
    homeScrollHint.hidden = true;
    homeScrollHint.setAttribute("aria-hidden", "true");
    homeScrollHint.classList.remove("is-hiding");
  }, 380);
}

function syncHomeScrollHint() {
  if (!homeScrollHint || !isMainMobileHome || !HOME_MOBILE_MQ.matches) {
    if (homeScrollHint) {
      homeScrollHint.hidden = true;
      homeScrollHint.setAttribute("aria-hidden", "true");
    }
    return;
  }

  if (!document.documentElement.classList.contains("home-mobile-scroll")) {
    homeScrollHint.hidden = true;
    homeScrollHint.setAttribute("aria-hidden", "true");
    return;
  }

  if (homeScrollHintText) {
    homeScrollHintText.textContent =
      getSiteLang() === "ko" ? "위로 스와이프" : "Swipe up";
  }

  if (homeIndex.classList.contains("is-menu-open")) {
    hideHomeScrollHintImmediately();
    return;
  }

  const shouldShow = window.scrollY <= 1;

  if (shouldShow) {
    homeScrollHint.classList.remove("is-hiding");
    homeScrollHint.hidden = false;
    homeScrollHint.setAttribute("aria-hidden", "false");
    return;
  }

  if (!homeScrollHint.hidden) {
    dismissHomeScrollHint();
  }
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
    syncHomeScrollHint();
    syncMobileCopyrightPlacement();
    return;
  }

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

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

function setHomeMenuOpen(open) {
  if (!homeIndex || homeMenuAnimating) return;
  if (open === homeIndex.classList.contains("is-menu-open")) return;

  if (homeMenuToggle) {
    homeMenuToggle.setAttribute("aria-expanded", String(open));
    homeMenuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (open) {
    hideHomeScrollHintImmediately();

    if (homeSiteMenu) homeSiteMenu.hidden = false;
    if (homeMenuBackdrop) {
      homeMenuBackdrop.hidden = false;
      homeMenuBackdrop.setAttribute("aria-hidden", "false");
    }

    syncMobileHomeScrollLock();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        homeIndex.classList.add("is-menu-open");
        syncHomeScrollHint();
      });
    });
    return;
  }

  homeIndex.classList.remove("is-menu-open");
  syncMobileHomeScrollLock();
  syncHomeScrollHint();
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
