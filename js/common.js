// adobe 폰트를 위한 스크립트
(function (d) {
  var config = {
      kitId: "vyd2lmo",
      scriptTimeout: 3000,
      async: true,
    },
    h = d.documentElement,
    t = setTimeout(function () {
      h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
    }, config.scriptTimeout),
    tk = d.createElement("script"),
    f = false,
    s = d.getElementsByTagName("script")[0],
    a;
  h.className += " wf-loading";
  tk.src = "https://use.typekit.net/" + config.kitId + ".js";
  tk.async = true;
  tk.onload = tk.onreadystatechange = function () {
    a = this.readyState;
    if (f || (a && a != "complete" && a != "loaded")) return;
    f = true;
    clearTimeout(t);
    try {
      Typekit.load(config);
    } catch (e) {}
  };
  s.parentNode.insertBefore(tk, s);
})(document);

// login page eye Icon control
function pwShow() {
  var elem = document.getElementById("eyeChange");
  var passwordInput = document.getElementById("userPassword");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    elem.classList = "fa-regular fa-eye-slash";
  } else {
    passwordInput.type = "password";
    elem.classList = "fa-regular fa-eye";
  }
}
function pwCheckShow() {
  var elem = document.getElementById("eyeChangeCheck");
  var passwordInput = document.getElementById("pwCheck");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    elem.classList = "fa-regular fa-eye-slash";
  } else {
    passwordInput.type = "password";
    elem.classList = "fa-regular fa-eye";
  }
}
