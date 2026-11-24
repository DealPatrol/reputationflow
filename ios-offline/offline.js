/* Offline Counter Kit for the ReputationFlow iOS app. Plain ES5-compatible script; no network calls.
   Reads the cache the dashboard saved with @capacitor/preferences (key rf.counter.v1) through the
   Capacitor native bridge, and uses the app's own native plugin for the share sheet and QR codes. */
(function () {
  'use strict';
  var SITE = 'https://tryreputationflow.com';
  var CACHE_KEY = 'rf.counter.v1';
  var cache = null;

  function $(id) { return document.getElementById(id); }
  function native(plugin, method, options) {
    var cap = window.Capacitor;
    if (!cap || typeof cap.nativePromise !== 'function') return Promise.reject(new Error('Native bridge unavailable'));
    return cap.nativePromise(plugin, method, options || {});
  }
  function say(text) { $('message').textContent = text || ''; }
  function tap() { native('Haptics', 'impact', { style: 'LIGHT' }).catch(function () {}); }

  function isSafeUrl(value) {
    try { var u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password; } catch { return false; }
  }
  function parse(raw) {
    if (!raw) return null;
    try {
      var d = JSON.parse(raw);
      if (d.version !== 1 || !isSafeUrl(d.reviewUrl)) return null;
      if (typeof d.qrDataUrl !== 'string' || d.qrDataUrl.indexOf('data:image/png;base64,') !== 0) d.qrDataUrl = null;
      d.requestScripts = Array.isArray(d.requestScripts) ? d.requestScripts : [];
      d.replyTemplates = Array.isArray(d.replyTemplates) ? d.replyTemplates : [];
      return d;
    } catch { return null; }
  }

  function copy(text) {
    var done = function () { tap(); say('Copied.'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else { fallbackCopy(text); done(); }
  }
  function fallbackCopy(text) {
    var area = document.createElement('textarea');
    area.value = text; area.setAttribute('readonly', ''); area.style.position = 'fixed'; area.style.opacity = '0';
    document.body.appendChild(area); area.select();
    try { document.execCommand('copy'); } catch { /* ignore */ }
    document.body.removeChild(area);
  }
  function share(options) {
    tap();
    native('ReputationFlowNative', 'share', options).catch(function () { say('The share sheet did not open. Use Copy instead.'); });
  }

  function renderList(listId, sectionId, scripts) {
    var list = $(listId);
    list.textContent = '';
    scripts.slice(0, 20).forEach(function (s) {
      if (!s || typeof s.text !== 'string') return;
      var li = document.createElement('li');
      var label = document.createElement('p'); label.className = 'label'; label.textContent = String(s.label || '');
      var body = document.createElement('p'); body.textContent = s.text;
      var actions = document.createElement('div'); actions.className = 'actions';
      var c = document.createElement('button'); c.type = 'button'; c.textContent = 'Copy';
      c.addEventListener('click', function () { copy(s.text); });
      var sh = document.createElement('button'); sh.type = 'button'; sh.className = 'dark'; sh.textContent = 'Share';
      sh.addEventListener('click', function () { share({ text: s.text, subject: s.subject || undefined }); });
      actions.appendChild(c); actions.appendChild(sh);
      li.appendChild(label); li.appendChild(body); li.appendChild(actions);
      list.appendChild(li);
    });
    $(sectionId).hidden = list.children.length === 0;
  }

  function setQr(src) { $('qr').src = src; $('overlay-qr').src = src; }

  function render() {
    if (!cache) { $('empty').hidden = false; return; }
    $('kit').hidden = false;
    $('business').textContent = cache.businessName || 'Your business';
    $('overlay-name').textContent = cache.businessName || '';
    $('link').textContent = cache.reviewUrl;
    if (cache.savedAt) $('saved').textContent = 'Saved on this iPhone ' + new Date(cache.savedAt).toLocaleString();
    if (cache.qrDataUrl) setQr(cache.qrDataUrl);
    else native('ReputationFlowNative', 'qrCode', { text: cache.reviewUrl, size: 1024 })
      .then(function (r) { cache.qrDataUrl = 'data:image/png;base64,' + r.base64; setQr(cache.qrDataUrl); })
      .catch(function () { say('Could not draw the QR code. Share the link instead.'); });
    renderList('request-list', 'requests', cache.requestScripts);
    renderList('reply-list', 'replies', cache.replyTemplates);
  }

  $('share').addEventListener('click', function () {
    if (!cache) return;
    var b64 = cache.qrDataUrl ? cache.qrDataUrl.split(',')[1] : undefined;
    share({ url: cache.reviewUrl, text: 'Leave a review for ' + (cache.businessName || 'us') + ': ' + cache.reviewUrl, imageBase64: b64 });
  });
  $('fullscreen').addEventListener('click', function () { tap(); $('overlay').hidden = false; });
  $('close').addEventListener('click', function () { $('overlay').hidden = true; });
  $('retry').addEventListener('click', function () {
    tap(); say('Connecting…');
    window.location.replace(SITE + '/dashboard?tab=counter');
  });
  window.addEventListener('online', function () { $('status').textContent = 'Online'; $('status').className = 'pill online'; });

  // Capacitor also shows this page when a navigation is merely interrupted. If the site answers,
  // go straight back (at most once every 20 seconds, so a failing page cannot loop).
  function returnIfReachable() {
    var last = Number(sessionStorage.getItem('rf.offline.retry') || 0);
    if (Date.now() - last < 20000 || typeof fetch !== 'function') return;
    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = setTimeout(function () { if (controller) controller.abort(); }, 2500);
    fetch(SITE + '/robots.txt', { mode: 'no-cors', cache: 'no-store', signal: controller ? controller.signal : undefined })
      .then(function () {
        clearTimeout(timer);
        sessionStorage.setItem('rf.offline.retry', String(Date.now()));
        window.location.replace(SITE + '/dashboard');
      })
      .catch(function () { clearTimeout(timer); });
  }
  returnIfReachable();

  native('Preferences', 'get', { key: CACHE_KEY })
    .then(function (r) { cache = parse(r && r.value); render(); })
    .catch(function () { render(); });
  native('SplashScreen', 'hide', {}).catch(function () {});
})();
