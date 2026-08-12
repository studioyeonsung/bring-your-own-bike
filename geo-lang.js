(function () {
  var PREF_KEY = "byob-lang-override-session";

  var path = window.location.pathname || "/";
  var currentLang = /^\/ko(?=\/|$)/.test(path) ? "ko" : "en";

  // If the user explicitly reloads the page, drop any previous language override
  // so geo (IP) can re-apply.
  try {
    var navEntry = performance
      .getEntriesByType("navigation")
      .map(function (e) {
        return e && e.type;
      })[0];
    if (navEntry === "reload") {
      window.sessionStorage.removeItem(PREF_KEY);
    }
  } catch (e) {
    /* ignore */
  }

  function normalizePath(value) {
    return (value || "/").replace(/\/$/, "") || "/";
  }

  function pathForLang(lang) {
    var withoutKo = path.replace(/^\/ko(?=\/|$)/, "") || "/";
    withoutKo = normalizePath(withoutKo);

    if (lang === "ko") return withoutKo === "/" ? "/ko/" : "/ko" + withoutKo + "/";
    return withoutKo === "/" ? "/" : withoutKo + "/";
  }

  function redirectTo(lang) {
    if (lang !== "ko" && lang !== "en") return;
    if (lang === currentLang) return;

    var target = pathForLang(lang);
    if (normalizePath(target) === normalizePath(path)) return;

    window.location.replace(target + window.location.search + window.location.hash);
  }

  // Remember explicit language switches for this tab/session only.
  // This prevents geo/IP redirects from "fighting" with the user's choice.
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
      try {
        window.sessionStorage.setItem(
          PREF_KEY,
          toKo ? "ko" : "en"
        );
      } catch (e) {
        /* ignore */
      }
    },
    true
  );

  var override = null;
  try {
    override = window.sessionStorage.getItem(PREF_KEY);
  } catch (e) {
    override = null;
  }
  if (override === "ko" || override === "en") {
    redirectTo(override);
    return;
  }

  function getOverride() {
    try {
      var v = window.sessionStorage.getItem(PREF_KEY);
      return v === "ko" || v === "en" ? v : null;
    } catch (e) {
      return null;
    }
  }

  fetch("https://api.country.is/", { credentials: "omit", cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("geo failed");
      return response.json();
    })
    .then(function (data) {
      var country = String((data && data.country) || "").toUpperCase();
      var picked = getOverride();
      if (picked) return redirectTo(picked);
      redirectTo(country === "KR" ? "ko" : "en");
    })
    .catch(function () {
      // On geo failure, keep current URL language (do not persist anything).
    });
})();
