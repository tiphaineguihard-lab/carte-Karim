function findAPI(win) {
  var attempts = 0;
  try {
    while ((win.API == null) && (win.parent != null) && (win.parent != win) && (attempts <= 500)) {
      attempts++;
      win = win.parent;
    }
  } catch (e) { return null; }
  return win.API || null;
}
function getAPI() {
  try {
    var theAPI = findAPI(window);
    if ((theAPI == null) && (window.opener != null) && (typeof(window.opener) != "undefined")) {
      theAPI = findAPI(window.opener);
    }
    return theAPI;
  } catch (e) { return null; }
}
try {
  var API = getAPI();
  if (API) {
    try { API.LMSInitialize(""); } catch (e) {}
    try { API.LMSSetValue("cmi.core.lesson_status", "completed"); } catch (e) {}
    try { API.LMSCommit(""); } catch (e) {}
  }
} catch (e) {}
window.addEventListener("beforeunload", function () {
  try { if (typeof API !== "undefined" && API) { API.LMSFinish(""); } } catch (e) {}
});
