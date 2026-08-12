(function () {
  var path = window.location.pathname || "/";
  var currentLang = /^\/ko(?=\/|$)/.test(path) ? "ko" : "en";

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

  fetch("https://api.country.is/", { credentials: "omit", cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("geo failed");
      return response.json();
    })
    .then(function (data) {
      var country = String((data && data.country) || "").toUpperCase();
      redirectTo(country === "KR" ? "ko" : "en");
    })
    .catch(function () {
      // On geo failure, keep current URL language (do not persist anything).
    });
})();
