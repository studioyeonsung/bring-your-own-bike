(function () {
  var PREF_KEY = "byob-lang-pref";
  var GEO_KEY = "byob-lang-geo";
  var path = window.location.pathname || "/";
  var isKoPath = /^\/ko(?=\/|$)/.test(path);
  var currentLang = isKoPath ? "ko" : "en";

  function normalizePath(value) {
    return (value || "/").replace(/\/$/, "") || "/";
  }

  function pathForLang(lang) {
    var withoutKo = path.replace(/^\/ko(?=\/|$)/, "") || "/";
    withoutKo = normalizePath(withoutKo);

    if (lang === "ko") {
      return withoutKo === "/" ? "/ko/" : "/ko" + withoutKo + "/";
    }

    return withoutKo === "/" ? "/" : withoutKo + "/";
  }

  function redirectTo(lang) {
    if (lang !== "ko" && lang !== "en") return;
    if (lang === currentLang) return;

    var target = pathForLang(lang);
    if (normalizePath(target) === normalizePath(path)) return;

    window.location.replace(target + window.location.search + window.location.hash);
  }

  function readStorage(storage, key) {
    try {
      return storage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeStorage(storage, key, value) {
    try {
      storage.setItem(key, value);
    } catch (error) {
      /* ignore */
    }
  }

  function applyLang(lang, persistPref) {
    if (persistPref) writeStorage(window.localStorage, PREF_KEY, lang);
    redirectTo(lang);
  }

  // Remember explicit language switches (header ENG/KO + mobile toggle).
  document.addEventListener(
    "click",
    function (event) {
      var link = event.target.closest?.(
        "a.home-lang-toggle, .menu-ml a.menu-link, .menu-mr a.menu-link"
      );
      if (!link) return;

      var href = link.getAttribute("href") || "";
      if (!href || href === "#") return;

      var toKo = /^\/ko(?=\/|$)/.test(href) || href.indexOf("/ko/") !== -1;
      writeStorage(window.localStorage, PREF_KEY, toKo ? "ko" : "en");
    },
    true
  );

  var pref = readStorage(window.localStorage, PREF_KEY);
  if (pref === "ko" || pref === "en") {
    redirectTo(pref);
    return;
  }

  var cachedGeo = readStorage(window.sessionStorage, GEO_KEY);
  if (cachedGeo === "ko" || cachedGeo === "en") {
    redirectTo(cachedGeo);
    return;
  }

  var finished = false;
  function finish(lang) {
    if (finished) return;
    finished = true;
    if (lang !== "ko" && lang !== "en") lang = "en";
    writeStorage(window.sessionStorage, GEO_KEY, lang);
    redirectTo(lang);
  }

  var timer = window.setTimeout(function () {
    var navLang = String(navigator.language || navigator.userLanguage || "").toLowerCase();
    finish(navLang.indexOf("ko") === 0 ? "ko" : "en");
  }, 1600);

  fetch("https://api.country.is/", { credentials: "omit", cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("geo failed");
      return response.json();
    })
    .then(function (data) {
      window.clearTimeout(timer);
      var country = String((data && data.country) || "").toUpperCase();
      finish(country === "KR" ? "ko" : "en");
    })
    .catch(function () {
      window.clearTimeout(timer);
      var navLang = String(navigator.language || navigator.userLanguage || "").toLowerCase();
      finish(navLang.indexOf("ko") === 0 ? "ko" : "en");
    });
})();
