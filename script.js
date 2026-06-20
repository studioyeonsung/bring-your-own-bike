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
const ridesHome = document.querySelector(".home--rides");
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

function syncLanguageLinks() {
  const engLink = document.querySelector(".menu-ml .menu-link");
  const koLink = document.querySelector(".menu-mr .menu-link");
  const isKo = getSiteLang() === "ko";

  if (engLink) {
    engLink.href = localizedPath("en");
    engLink.classList.toggle("menu-link--plain", isKo);
  }

  if (koLink) {
    koLink.href = localizedPath("ko");
    koLink.classList.toggle("menu-link--plain", !isKo);
  }
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
    ...rideDetailText,
  },
  {
    image: rideCover("02"),
    gallery: rideGallery("02", 13),
    number: "02",
    alt: "Bring Your Own Bike ride 02",
    ...rideDetailText,
  },
  {
    image: rideCover("03"),
    gallery: rideGallery("03", 10),
    number: "03",
    alt: "Bring Your Own Bike ride 03",
    ...rideDetailText,
  },
  {
    image: rideCover("04"),
    gallery: rideGallery("04", 5),
    number: "04",
    alt: "Bring Your Own Bike ride 04",
    ...rideDetailText,
  },
  {
    image: rideCover("05"),
    gallery: rideGallery("05", 3),
    number: "05",
    alt: "Bring Your Own Bike ride 05",
    ...rideDetailText,
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

function renderRide(index) {
  const ride = rides[index];
  if (!ride) return;

  if (ridesPreviewPhoto) {
    ridesPreviewPhoto.src = ride.image;
    ridesPreviewPhoto.alt = ride.alt || "";
  }

  if (ridesPreviewNumber) ridesPreviewNumber.textContent = ride.number;
  if (ridesPreviewDate) ridesPreviewDate.textContent = ride.date || "";
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
  if (ridesDetailCity) ridesDetailCity.textContent = ride.city || "";
  if (ridesDetailTitle) ridesDetailTitle.textContent = ride.title || "";
  if (ridesDetailSubtitle) ridesDetailSubtitle.textContent = ride.subtitle || "";
  if (ridesTitleBlock) {
    ridesTitleBlock.classList.toggle("is-hidden", !ride.title && !ride.subtitle);
  }
  if (ridesDetailTime) ridesDetailTime.textContent = ride.time || "";
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

function openRideDetail({ pushHistory = true, animateHeader = true } = {}) {
  if (!ridesStage || !ridesDuo || ridesDetailOpen) return;

  galleryIndex = 0;
  renderRide(rideIndex);
  ridesDetailOpen = true;
  syncRidesHeaderMode({ animate: animateHeader, direction: "out" });

  const revealDetailUI = () => {
    ridesDuo.hidden = false;
    ridesDuo.classList.remove("is-closing", "is-open");
    ridesDuo.classList.add("is-opening");
    ridesStage.classList.add("is-detail");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ridesDuo.classList.add("is-open");
      });
    });
  };

  if (animateHeader) {
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

if (ridesStage) {
  const route = getRidesRouteFromLocation();
  rideIndex = route.rideIndex;
  renderRide(rideIndex);

  if (route.detail) {
    openRideDetail({ pushHistory: false, animateHeader: false });
    syncRidesHistory("detail", rideIndex);
  } else {
    syncRidesHistory("list", rideIndex);
    syncRidesHeaderMode({ animate: false });
  }

  syncRidesAutoAdvance();
}

window.addEventListener(
  "wheel",
  (event) => {
    const pageScroll = aboutScroll || panel;
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
