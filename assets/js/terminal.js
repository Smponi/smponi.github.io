/* Homepage terminal: spinning monogram + a tiny shell that knows the blog. */
(function () {
  var term = document.querySelector("[data-term]");
  if (!term) return;
  var screen = term.querySelector(".term__screen"), log = term.querySelector(".term__log");
  var promptLine = term.querySelector("[data-term-prompt]"), live = term.querySelector("[data-term-live]");
  var hints = term.querySelector("[data-term-hints]"), neo = term.querySelector(".term__neofetch");
  var art = term.querySelector(".term__art"), posts = JSON.parse(term.querySelector("[data-term-posts]").textContent || "[]");
  var lead = document.querySelector(".hero__lead");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  var since = term.querySelector("[data-since]");
  if (since) since.textContent = Math.floor((Date.now() - Date.parse(since.dataset.since)) / 864e5) + " Tage";

  /* ---------- Monogram: idles in a slow spin, drag to throw it ---------- */
  if (art && window.renderMonogram) (function () {
    var cols = +art.dataset.cols, rows = +art.dataset.rows, BASE = 0.6;
    var yaw = -0.45, vel = BASE, clock = 0, last = 0, raf = 0, visible = false, drag = null;

    function draw() { art.textContent = window.renderMonogram(cols, rows, yaw, 0.14 + Math.sin(clock * 0.7) * 0.12); }
    function running() { return art.isConnected && visible && !document.hidden && (!reduceMotion.matches || drag); }
    function schedule() { if (running()) { if (!raf) raf = requestAnimationFrame(tick); } else last = 0; }
    function tick(now) {
      raf = 0;
      if (now - last >= 33) { // ~30 fps is plenty for ASCII
        var dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
        last = now;
        if (!drag) { vel += (BASE - vel) * Math.min(1, dt * 1.2); yaw += vel * dt; clock += dt; }
        draw();
      }
      schedule();
    }

    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; schedule(); }).observe(art);
    document.addEventListener("visibilitychange", schedule);
    art.addEventListener("pointerdown", function (event) {
      drag = { x: event.clientX, t: event.timeStamp };
      art.setPointerCapture(event.pointerId);
      art.classList.add("is-dragging");
      schedule();
    });
    art.addEventListener("pointermove", function (event) {
      if (!drag) return;
      var step = (event.clientX - drag.x) * 0.012, dt = Math.max(event.timeStamp - drag.t, 8) / 1000;
      yaw += step;
      vel = Math.max(-14, Math.min(14, step / dt));
      drag.x = event.clientX; drag.t = event.timeStamp;
    });
    function release() { drag = null; art.classList.remove("is-dragging"); schedule(); }
    art.addEventListener("pointerup", release);
    art.addEventListener("pointercancel", release);
  })();

  /* ---------- Shell ---------- */
  var history = [], cursor = 0, spoken = [], input = null;

  function line(parts, cls) {
    var el = document.createElement("div");
    el.className = "term__line" + (cls ? " " + cls : "");
    [].concat(parts).forEach(function (part) {
      if (typeof part === "string") { el.append(part); return; }
      var node = document.createElement(part.href ? "a" : "span");
      if (part.href) node.href = part.href;
      if (part.cls) node.className = part.cls;
      node.textContent = part.text;
      el.append(node);
    });
    log.append(el);
    spoken.push(el.textContent);
    return el;
  }
  function pad(text, width) { return text + " ".repeat(Math.max(1, width - text.length)); }
  function err(text) { line(text, "term__err"); }
  function go(url) { setTimeout(function () { location.href = url; }, 220); }

  function findPost(name, args) {
    var arg = (args[0] || "").toLowerCase();
    if (!arg) { err(name + ": Welcher Post? Zum Beispiel: " + name + " 1"); return null; }
    var post = /^\d+$/.test(arg) ? posts[+arg - 1] : posts.filter(function (p) { return p.slug.indexOf(arg) === 0; })[0];
    if (!post) err(name + ": Kein Post „" + args[0] + "“. ls zeigt alle.");
    return post;
  }

  var commands = {
    help: function () {
      [["ls", "Alle Posts auflisten"], ["open <nr>", "Einen Post lesen"], ["cat <nr>", "Worum geht es im Post?"],
       ["search <wort>", "Den Blog durchsuchen"], ["whoami", "Kurz über mich"], ["cd about", "Zur About-Seite"],
       ["neofetch", "Systeminfo, nochmal"], ["clear", "Terminal leeren"]].forEach(function (c) {
        line([{ text: pad(c[0], 15), cls: "term__key" }, c[1]]);
      });
      line({ text: "Tab vervollständigt, ↑ holt den letzten Befehl zurück.", cls: "term__dim" });
    },
    ls: function () {
      posts.forEach(function (p, i) {
        line([{ text: pad("[" + (i + 1) + "]", 5) + p.date + "  ", cls: "term__dim" }, { text: p.title, href: p.url }]);
      });
    },
    open: function (args) {
      var post = findPost("open", args);
      if (!post) return;
      line(["Öffne ", { text: post.title, cls: "term__key" }, " …"]);
      go(post.url);
    },
    cat: function (args) {
      var post = findPost("cat", args);
      if (!post) return;
      line({ text: post.title, cls: "term__key" });
      line(post.desc || "Keine Beschreibung.");
      line({ text: post.min + " min Lesezeit. Lesen mit: open " + (posts.indexOf(post) + 1), cls: "term__dim" });
    },
    whoami: function () { line(lead ? lead.textContent.trim().replace(/\s+/g, " ") : "philipp"); },
    neofetch: function () { log.append(neo); },
    clear: function () { log.replaceChildren(); },
    search: function (args) {
      var button = document.getElementById("search-button") || document.getElementById("search-button-mobile");
      var query = document.getElementById("search-query");
      if (!button || !query) { err("search: Suche ist nicht verfügbar."); return; }
      button.click();
      query.value = args.join(" ");
      query.dispatchEvent(new Event("input"));
    },
    cd: function (args) {
      var dir = (args[0] || "~").replace(/\/$/, "");
      if (dir === "~" || dir === ".") return;
      if (dir === "..") { err("cd: Weiter nach oben geht es nicht."); return; }
      if (/^(posts|blog)$/.test(dir)) { go("/posts/"); return; }
      if (dir === "about") { go("/about/"); return; }
      err("cd: Verzeichnis nicht gefunden: " + dir);
    },
    pwd: function () { line("/home/philipp"); },
    date: function () { line(new Date().toLocaleString("de-DE", { dateStyle: "full", timeStyle: "short" })); },
    echo: function (args) { line(args.join(" ")); },
    history: function () { history.forEach(function (h, i) { line({ text: pad(String(i + 1), 4) + h, cls: "term__dim" }); }); },
    sudo: function () { err("philipp ist nicht in der sudoers-Datei. Dieser Vorfall wird gemeldet."); },
    exit: function () { line("Hier gibt es kein Entkommen. Versuch es mit ls."); },
    vim: function () { line(":q! – keine Sorge, hier kommst du wieder raus."); },
    rm: function () {
      term.classList.remove("is-shaking");
      void term.offsetWidth;
      term.classList.add("is-shaking");
      err("rm: Nur-Lese-Dateisystem. Das hier ist ein statischer Blog.");
    }
  };
  var aliases = { ll: "ls", dir: "ls", man: "help", "?": "help", less: "cat", more: "cat", logout: "exit", vi: "vim", nvim: "vim", nano: "vim", emacs: "vim", find: "search", grep: "search", fastfetch: "neofetch" };

  function run(raw) {
    var text = raw.trim();
    spoken = [];
    line([{ text: "~ $", cls: "term__ps1" }, " " + text], "term__echo");
    if (text) {
      history.push(text); cursor = history.length;
      var words = text.split(/\s+/), name = words[0].toLowerCase(), fn = commands[aliases[name] || name];
      if (fn) fn(words.slice(1).filter(function (w) { return w.charAt(0) !== "-"; }));
      else err("zsh: command not found: " + words[0] + " – tippe help");
    }
    live.textContent = spoken.slice(1).join(". ");
    screen.scrollTop = screen.scrollHeight;
  }

  function complete() {
    var value = input.value, words = value.split(/\s+/), pool, prefix;
    if (words.length === 1) { pool = Object.keys(commands); prefix = words[0]; }
    else if (/^(open|cat|less)$/.test(words[0])) { pool = posts.map(function (p) { return p.slug; }); prefix = words[words.length - 1]; }
    else return;
    var hits = pool.filter(function (w) { return w.indexOf(prefix.toLowerCase()) === 0; });
    if (hits.length === 1) input.value = value.slice(0, value.length - prefix.length) + hits[0] + " ";
    else if (hits.length > 1) { spoken = []; line([{ text: "~ $", cls: "term__ps1" }, " " + value], "term__echo"); line({ text: hits.join("   "), cls: "term__dim" }); screen.scrollTop = screen.scrollHeight; }
    size();
  }
  function size() { input.style.width = Math.max(input.value.length + 1, 2) + "ch"; }

  function ready() {
    hints.hidden = false;
    hints.addEventListener("click", function (event) {
      var button = event.target.closest("[data-cmd]");
      if (button) run(button.dataset.cmd);
    });
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    input = document.createElement("input");
    input.className = "term__input";
    input.type = "text";
    input.spellcheck = false;
    input.autocomplete = "off";
    input.setAttribute("autocapitalize", "off");
    input.setAttribute("aria-label", "Befehl eingeben, zum Beispiel help");
    input.maxLength = 60;
    promptLine.querySelector(".term__cursor").before(input);
    term.classList.add("is-interactive");
    size();

    input.addEventListener("input", size);
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") { run(input.value); input.value = ""; }
      else if (event.key === "Tab" && input.value) { event.preventDefault(); complete(); return; }
      else if (event.key === "ArrowUp" && cursor > 0) { event.preventDefault(); input.value = history[--cursor]; }
      else if (event.key === "ArrowDown") { event.preventDefault(); cursor = Math.min(cursor + 1, history.length); input.value = history[cursor] || ""; }
      else if (event.ctrlKey && event.key.toLowerCase() === "l") { event.preventDefault(); commands.clear(); }
      else if (event.ctrlKey && event.key.toLowerCase() === "c") { line([{ text: "~ $", cls: "term__ps1" }, " " + input.value + "^C"], "term__echo"); input.value = ""; }
      else return;
      size();
    });
    screen.addEventListener("click", function (event) {
      if (!event.target.closest("a, button, .term__art") && !String(window.getSelection())) input.focus({ preventScroll: true });
    });
  }

  setTimeout(ready, reduceMotion.matches ? 0 : 2300);
})();
