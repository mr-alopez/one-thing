/* ============================================================
   One Thing — app logic
   All state lives in localStorage on this device. Nothing leaves.
   ============================================================ */
(function () {
  'use strict';

  var STORE_KEY = 'oneThing.v1';
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- dates (local, never UTC — a UTC day key rolls over
       at the wrong hour and silently breaks streaks) ---------- */

  function dayKey(d) {
    d = d || new Date();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + day;
  }
  function keyToDate(k) {
    var p = k.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function shiftKey(k, days) {
    var d = keyToDate(k);
    d.setDate(d.getDate() + days);
    return dayKey(d);
  }

  /* ---------- state ---------- */

  var blank = {
    version: 1,
    queue: [],       // upcoming task ids, front first
    days: {},        // dayKey -> { current, swaps, done: [ids] }
    completed: [],   // { id, title, zone, date } oldest first
    custom: []       // user-added task objects
  };

  var state;

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return JSON.parse(JSON.stringify(blank));
      var s = JSON.parse(raw);
      // fill in anything a future/older version left out
      Object.keys(blank).forEach(function (k) {
        if (s[k] === undefined) s[k] = JSON.parse(JSON.stringify(blank[k]));
      });
      return s;
    } catch (e) {
      return JSON.parse(JSON.stringify(blank));
    }
  }

  var saveWarned = false;
  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) {
      if (!saveWarned) {
        saveWarned = true;
        toast("Couldn't save — is private browsing on?");
      }
    }
  }

  /* ---------- task pool ---------- */

  function pool() { return TASKS.concat(state.custom); }

  function byId(id) {
    var all = pool();
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }

  function lastDoneMap() {
    var m = {};
    state.completed.forEach(function (c) { m[c.id] = c.date; });
    return m;
  }

  /* Rebuild the queue: never-done tasks first (shuffled), then
     everything else oldest-completion first, so a full cycle takes
     a long time to come back around. */
  function rebuildQueue() {
    var last = lastDoneMap();
    var fresh = [], seen = [];
    pool().forEach(function (t) {
      if (last[t.id]) seen.push(t); else fresh.push(t);
    });
    for (var i = fresh.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = fresh[i]; fresh[i] = fresh[j]; fresh[j] = tmp;
    }
    seen.sort(function (a, b) { return last[a.id] < last[b.id] ? -1 : 1; });
    state.queue = fresh.concat(seen).map(function (t) { return t.id; });
  }

  function nextFromQueue(exclude) {
    exclude = exclude || [];
    for (var guard = 0; guard < 4; guard++) {
      while (state.queue.length) {
        var id = state.queue.shift();
        if (exclude.indexOf(id) !== -1) continue;
        if (!byId(id)) continue;          // task was deleted from tasks.js
        return id;
      }
      rebuildQueue();
      // if everything in the pool is excluded, give up and reuse
      if (state.queue.length && state.queue.every(function (id) {
        return exclude.indexOf(id) !== -1;
      })) return state.queue.shift();
    }
    return pool()[0] ? pool()[0].id : null;
  }

  function today() {
    var k = dayKey();
    if (!state.days[k]) {
      state.days[k] = { current: nextFromQueue(), swaps: 0, done: [] };
      save();
    }
    var d = state.days[k];
    // guard against a current id that no longer exists
    if (d.current && !byId(d.current)) {
      d.current = nextFromQueue(d.done);
      save();
    }
    return d;
  }

  /* ---------- streaks ---------- */

  function doneDates() {
    var set = {};
    state.completed.forEach(function (c) { set[c.date] = true; });
    return Object.keys(set).sort();
  }

  function currentStreak() {
    var set = {};
    state.completed.forEach(function (c) { set[c.date] = true; });
    var k = dayKey();
    // a day that hasn't happened yet shouldn't read as a broken streak
    if (!set[k]) k = shiftKey(k, -1);
    var n = 0;
    while (set[k]) { n++; k = shiftKey(k, -1); }
    return n;
  }

  function bestStreak() {
    var dates = doneDates();
    var best = 0, run = 0, prev = null;
    dates.forEach(function (d) {
      run = (prev && shiftKey(prev, 1) === d) ? run + 1 : 1;
      if (run > best) best = run;
      prev = d;
    });
    return best;
  }

  /* ---------- rendering ---------- */

  function fmtDate(d) {
    return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  }

  function renderToday() {
    var d = today();
    var streak = currentStreak();

    $('dateStrip').textContent = fmtDate(new Date());
    $('streakChip').hidden = streak < 2;
    $('streakNum').textContent = streak + ' day' + (streak === 1 ? '' : 's');

    if (d.current) {
      var t = byId(d.current);
      var z = ZONES[t.zone] || ZONES.anywhere;
      $('taskCard').hidden = false;
      $('finishedCard').hidden = true;
      $('taskCard').style.setProperty('--zone-hue', z.hue);
      $('zoneLabel').textContent = z.label;
      $('taskTitle').textContent = t.title;
      $('taskEst').textContent = 'About ' + t.mins + ' minutes';
      $('taskDone').textContent = t.done;
      $('btnSwap').hidden = false;
    } else {
      $('taskCard').hidden = true;
      $('finishedCard').hidden = false;
      var lastTitle = '';
      for (var i = state.completed.length - 1; i >= 0; i--) {
        if (state.completed[i].date === dayKey()) { lastTitle = state.completed[i].title; break; }
      }
      var n = d.done.length;
      $('finishedHead').textContent = n > 1 ? "That's " + n + " today." : "That's today.";
      $('finishedWhat').textContent = lastTitle;
      $('finishedTally').textContent = streak >= 2
        ? streak + ' days in a row.'
        : (state.completed.length + ' done so far.');
    }
  }

  function renderHistory() {
    $('sCurrent').textContent = currentStreak();
    $('sBest').textContent = bestStreak();
    $('sTotal').textContent = state.completed.length;

    var list = $('historyList');
    list.innerHTML = '';
    var items = state.completed.slice(-60).reverse();
    $('historyWrap').hidden = items.length === 0;
    $('historyEmpty').hidden = items.length !== 0;

    items.forEach(function (c) {
      var li = document.createElement('li');
      var t = document.createElement('span');
      t.className = 'ht';
      t.textContent = c.title;
      var d = document.createElement('span');
      d.className = 'hd';
      d.textContent = keyToDate(c.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      li.appendChild(t); li.appendChild(d);
      list.appendChild(li);
    });
  }

  function renderMore() {
    var n = state.custom.length;
    $('customCount').textContent = n
      ? n + ' of your own ' + (n === 1 ? 'task is' : 'tasks are') + ' in the rotation.'
      : 'These get mixed in with the built-in ones.';
    $('poolNote').textContent = pool().length + ' tasks in the rotation. At one a day, that\'s about '
      + Math.round(pool().length / 30) + ' months before anything repeats.';
  }

  /* ---------- actions ---------- */

  function complete() {
    var d = today();
    if (!d.current) return;
    var t = byId(d.current);
    state.completed.push({ id: t.id, title: t.title, zone: t.zone, date: dayKey() });
    d.done.push(t.id);
    d.current = null;
    save();
    renderToday();
    if (navigator.vibrate) { try { navigator.vibrate(18); } catch (e) {} }
  }

  function undo() {
    var d = today();
    if (!d.done.length) return;
    var id = d.done.pop();
    for (var i = state.completed.length - 1; i >= 0; i--) {
      if (state.completed[i].id === id && state.completed[i].date === dayKey()) {
        state.completed.splice(i, 1);
        break;
      }
    }
    if (d.current) state.queue.unshift(d.current);
    d.current = id;
    save();
    renderToday();
  }

  function swap() {
    var d = today();
    if (!d.current) return;
    state.queue.push(d.current);          // back of the line, not gone
    d.current = nextFromQueue(d.done.concat([d.current]));
    d.swaps++;
    save();
    renderToday();
  }

  function bonus() {
    var d = today();
    d.current = nextFromQueue(d.done);
    save();
    renderToday();
  }

  function addCustom() {
    var title = $('newTitle').value.trim();
    var doneTxt = $('newDone').value.trim();
    if (!title) { toast('Give it a name first.'); $('newTitle').focus(); return; }
    var t = {
      id: 'u-' + Date.now().toString(36),
      zone: $('newZone').value,
      mins: parseInt($('newMins').value, 10) || 15,
      title: title,
      done: doneTxt || 'Finished when it looks the way you pictured it.'
    };
    state.custom.push(t);
    state.queue.splice(Math.min(2, state.queue.length), 0, t.id);
    save();
    $('newTitle').value = '';
    $('newDone').value = '';
    renderMore();
    toast('Added — it\'ll come up soon.');
  }

  function exportData() {
    var blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'one-thing-backup-' + dayKey() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    toast('Backup saved to your downloads.');
  }

  function importData(file) {
    var r = new FileReader();
    r.onload = function () {
      try {
        var s = JSON.parse(r.result);
        if (!s || !Array.isArray(s.completed)) throw new Error('bad file');
        if (!confirm('Replace everything on this device with the backup? ' +
                     s.completed.length + ' completed tasks in it.')) return;
        state = s;
        Object.keys(blank).forEach(function (k) {
          if (state[k] === undefined) state[k] = JSON.parse(JSON.stringify(blank[k]));
        });
        save();
        renderToday(); renderHistory(); renderMore();
        toast('Restored.');
      } catch (e) {
        toast("That file didn't look right.");
      }
    };
    r.readAsText(file);
  }

  function resetAll() {
    if (!confirm('Erase your streak, history, and custom tasks? This cannot be undone.')) return;
    if (!confirm('Really sure? Save a backup first if you might want it.')) return;
    state = JSON.parse(JSON.stringify(blank));
    save();
    renderToday(); renderHistory(); renderMore();
    toast('Starting fresh.');
  }

  /* ---------- toast ---------- */

  var toastTimer;
  function toast(msg) {
    var el = $('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }

  /* ---------- tabs ---------- */

  function showView(name) {
    ['today', 'done', 'more'].forEach(function (v) {
      $('view-' + v).hidden = v !== name;
    });
    Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (b) {
      b.setAttribute('aria-selected', b.dataset.view === name ? 'true' : 'false');
    });
    if (name === 'done') renderHistory();
    if (name === 'more') renderMore();
    if (name === 'today') renderToday();
    window.scrollTo(0, 0);
  }

  /* ---------- wire up ---------- */

  state = load();

  var zoneSel = $('newZone');
  Object.keys(ZONES).forEach(function (k) {
    if (k === 'custom') return;
    var o = document.createElement('option');
    o.value = k; o.textContent = ZONES[k].label;
    zoneSel.appendChild(o);
  });
  zoneSel.value = 'anywhere';

  $('btnDone').addEventListener('click', complete);
  $('btnSwap').addEventListener('click', swap);
  $('btnUndo').addEventListener('click', undo);
  $('btnBonus').addEventListener('click', bonus);
  $('btnAdd').addEventListener('click', addCustom);
  $('btnExport').addEventListener('click', exportData);
  $('btnReset').addEventListener('click', resetAll);
  $('btnImport').addEventListener('click', function () { $('fileInput').click(); });
  $('fileInput').addEventListener('change', function (e) {
    if (e.target.files && e.target.files[0]) importData(e.target.files[0]);
    e.target.value = '';
  });
  Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (b) {
    b.addEventListener('click', function () { showView(b.dataset.view); });
  });

  // Coming back to the app after midnight should roll over to the new day.
  var loadedOn = dayKey();
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && dayKey() !== loadedOn) {
      loadedOn = dayKey();
      renderToday();
    }
  });

  renderToday();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
})();
