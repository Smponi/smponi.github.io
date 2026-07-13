(function () {
  var dialog = document.getElementById("search-dialog");
  if (!dialog) return;
  var input = document.getElementById("search-query");
  var output = document.getElementById("search-results");
  var status = document.getElementById("search-status");
  var close = document.getElementById("close-search-button");
  var triggers = [document.getElementById("search-button"), document.getElementById("search-button-mobile")].filter(Boolean);
  var opener = null, fuse = null, indexPromise = null;

  function focusables() { return dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href]'); }
  function open(trigger) { if (document.querySelector('dialog[open]:not(#search-dialog)')) return; opener = trigger || document.activeElement; dialog.showModal(); input.focus(); buildIndex(); }
  function hide() { if (!dialog.open) return; dialog.close(); input.value = ""; output.replaceChildren(); status.textContent = ""; if (opener && opener.focus) opener.focus(); }
  function buildIndex() {
    if (indexPromise) return indexPromise;
    var base = dialog.dataset.url.replace(/\/?$/, "/");
    indexPromise = fetch(base + "index.json").then(function (r) { if (!r.ok) throw new Error("index"); return r.json(); }).then(function (data) {
      fuse = new Fuse(data, { shouldSort: true, ignoreLocation: true, threshold: 0, keys: [{ name: "title", weight: .8 }, { name: "section", weight: .2 }, { name: "summary", weight: .6 }, { name: "content", weight: .4 }] });
      return fuse;
    }).catch(function () { status.textContent = "Suche ist derzeit nicht verfügbar."; });
    return indexPromise;
  }
  function announce(count) { status.textContent = count ? count + (count === 1 ? " Suchergebnis" : " Suchergebnisse") : "Keine Suchergebnisse"; }
  function results(term) {
    if (!fuse) { buildIndex().then(function () { if (input.value === term) results(term); }); return; }
    output.replaceChildren(); if (!term.trim()) { status.textContent = ""; return; }
    var found = fuse.search(term); announce(found.length);
    found.forEach(function (entry) {
      var item = entry.item, li = document.createElement("li"), link = document.createElement("a"), box = document.createElement("div"), title = document.createElement("div"), meta = document.createElement("div"), summary = document.createElement("div");
      li.className = "mb-2"; link.className = "flex items-center px-3 py-2 rounded-md appearance-none bg-neutral-100 dark:bg-neutral-700 focus:bg-primary-100 hover:bg-primary-100 dark:hover:bg-primary-900 dark:focus:bg-primary-900 focus:outline-dotted focus:outline-transparent focus:outline-2";
      link.href = item.externalUrl || item.permalink; if (item.externalUrl) { link.target = "_blank"; link.rel = "noopener"; link.setAttribute("aria-label", item.title + " (öffnet in einem neuen Fenster)"); }
      box.className = "grow"; title.className = "-mb-1 text-lg font-bold"; title.textContent = item.title; meta.className = "text-sm text-neutral-500 dark:text-neutral-400"; meta.textContent = [item.section, item.date].filter(Boolean).join(" · "); summary.className = "text-sm italic"; summary.textContent = item.summary || "";
      box.append(title, meta, summary); link.append(box); li.append(link); output.append(li);
    });
  }
  triggers.forEach(function (trigger) { trigger.addEventListener("click", function () { open(trigger); }); });
  close.addEventListener("click", hide); dialog.addEventListener("cancel", function (event) { event.preventDefault(); hide(); });
  dialog.addEventListener("keydown", function (event) { if (event.key === "Escape") { event.preventDefault(); hide(); } });
  dialog.addEventListener("click", function (event) { if (event.target === dialog) hide(); });
  input.addEventListener("input", function () { results(input.value); });
  dialog.addEventListener("keydown", function (event) { if (event.key !== "Tab") return; var all = focusables(); if (!all.length) return; var first = all[0], last = all[all.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } });
  document.addEventListener("keydown", function (event) { var active = document.activeElement, tag = active && active.tagName; if ((event.key === "/" || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")) && !dialog.open && !(tag === "INPUT" || tag === "TEXTAREA" || active.isContentEditable)) { event.preventDefault(); open(triggers[0]); } });
}());
