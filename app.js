(function () {
  "use strict";
  var SITE = window.SITE || { name: "Aiyana", year: new Date().getFullYear() };

  function photosOf(c) {
    if (c.photos && c.photos.length) {
      return c.photos.map(function (p) {
        if (typeof p === "string") return { src: p, caption: "", focus: "" };
        return { src: p.src || p.photo || "", caption: p.caption || "", focus: p.focus || "" };
      }).filter(function (p) { return p.src; });
    }
    if (c.photo) {
      return [{ src: c.photo, caption: c.caption || "", focus: c.focus || "" }];
    }
    return [];
  }

  var CARDS = (window.CARDS || []).filter(function (c) { return c && photosOf(c).length; });
  var $ = function (s, r) { return (r || document).querySelector(s); };

  var cover = $("#cover"), deck = $("#deck"), track = $("#track");
  var segments = $("#segments"), counter = $("#counter"), hint = $("#hint");
  var prevBtn = $("#prev-btn"), nextBtn = $("#next-btn");
  var total = CARDS.length;
  var current = 0;

  /* ---------- cover ---------- */
  var title = SITE.title || "Happy 30th, " + SITE.name;
  var parts = title.split(",");
  var h1 = $("#cover-title");
  if (parts.length > 1) {
    h1.textContent = parts[0] + ",";
    var em = document.createElement("em");
    em.textContent = parts.slice(1).join(",").trim();
    h1.appendChild(em);
  } else { h1.textContent = title; }
  $("#cover-sub").textContent = SITE.subtitle || "Postcards from the people who love you";
  $("#cover-year").textContent = SITE.year;
  $("#cover-count").textContent = total;

  var fan = $("#fan");
  // first card sits on top, the next two peek out behind it
  var fanPos = [
    { r: "-3deg", x: "0px", y: "-6px", z: 3 },
    { r: "-15deg", x: "-40px", y: "10px", z: 1 },
    { r: "11deg", x: "40px", y: "0px", z: 2 },
  ];
  CARDS.slice(0, 3).forEach(function (c, i) {
    var m = document.createElement("div");
    m.className = "mini";
    var p = fanPos[i];
    m.style.setProperty("--r", p.r); m.style.setProperty("--x", p.x); m.style.setProperty("--y", p.y);
    m.style.setProperty("--d", 0.45 - i * 0.15 + "s");
    m.style.zIndex = p.z;
    var img = document.createElement("img");
    var first = photosOf(c)[0];
    img.src = first.src; img.alt = "";
    if (first.focus) img.style.objectPosition = first.focus;
    m.appendChild(img);
    fan.appendChild(m);
  });
  var heart = document.createElement("div");
  heart.className = "heart"; heart.style.zIndex = 4; heart.textContent = "30";
  fan.appendChild(heart);

  function stopFlip(el, fn) {
    el.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      if (fn) fn();
    });
  }

  function setupCarousel(node, cardEl, photos, from) {
    var img = $(".photo", node);
    var nav = $(".photo-nav", node);
    var dotsEl = $(".photo-dots", node);
    var captionEl = $(".photo-caption", node);
    var multi = photos.length > 1;
    var idx = 0;

    function show(n) {
      idx = (n + photos.length) % photos.length;
      var p = photos[idx];
      img.src = p.src;
      img.alt = (p.caption ? p.caption + " — " : "") + "Photo from " + from;
      img.style.objectPosition = p.focus || "";
      if (multi) {
        captionEl.hidden = false;
        captionEl.textContent = p.caption || "";
      } else if (p.caption) {
        captionEl.hidden = false;
        captionEl.textContent = p.caption;
      } else {
        captionEl.hidden = true;
        captionEl.textContent = "";
      }
      if (multi) {
        Array.prototype.forEach.call(dotsEl.children, function (d, i) {
          d.classList.toggle("on", i === idx);
          d.setAttribute("aria-current", i === idx ? "true" : "false");
        });
      }
    }

    if (multi) {
      cardEl.classList.add("has-carousel");
      nav.hidden = false;
      photos.forEach(function (p, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", "Photo " + (i + 1) + " of " + photos.length);
        stopFlip(dot, function () { show(i); });
        dotsEl.appendChild(dot);
        if (i > 0) {
          var pre = new Image();
          pre.src = p.src;
        }
      });
      stopFlip($(".photo-prev", node), function () { show(idx - 1); });
      stopFlip($(".photo-next", node), function () { show(idx + 1); });
      stopFlip($(".photo-zone-prev", node), function () { show(idx - 1); });
      stopFlip($(".photo-zone-next", node), function () { show(idx + 1); });
    }

    show(0);
    return show;
  }

  /* ---------- build cards ---------- */
  var tpl = $("#card-tpl");
  var tilts = ["-1.2deg", "0.9deg", "-0.6deg", "1.3deg", "-1deg", "0.5deg"];
  CARDS.forEach(function (c, i) {
    var node = tpl.content.firstElementChild.cloneNode(true);
    var card = $(".card", node);
    var photos = photosOf(c);
    card.style.setProperty("--tilt", tilts[i % tilts.length]);
    var aria = "Postcard " + (i + 1) + " of " + total + " from " + c.from + ". Tap to flip.";
    if (photos.length > 1) {
      aria += " Arrows or side taps change photos.";
    }
    card.setAttribute("aria-label", aria);

    var img = $(".photo", node);
    if (i > 1) img.loading = "lazy";
    if (c.placeholder) $(".ribbon", node).hidden = false;
    setupCarousel(node, card, photos, c.from);

    // unique id for postmark text path
    var pid = "pm-" + i;
    $("path[id]", node).id = pid;
    $("textPath", node).setAttribute("href", "#" + pid);
    var ring = "★ " + SITE.name.toUpperCase() + " ★ TURNING 30 ★ HAPPY BIRTHDAY";
    $("textPath", node).textContent = ring;
    $(".pm-year", node).textContent = SITE.year;

    $(".from-big", node).textContent = c.from;
    $(".back-foot b", node).textContent = SITE.name;

    var structured = $(".structured", node);
    var letterEl = $(".letter", node);
    if (c.letter != null && String(c.letter).length) {
      structured.hidden = true;
      letterEl.hidden = false;
      letterEl.textContent = c.letter;
    } else {
      letterEl.hidden = true;
      $(".at30", node).textContent = c.at30 || "";
      $(".wish", node).textContent = c.wish || "";
      $(".closing", node).textContent = c.closing || "With love,";
      $(".sig-name", node).textContent = c.from;
      var labels = node.querySelectorAll(".section-label");
      labels[1].textContent = "For you, " + SITE.name;
      if (!c.at30) { labels[0].hidden = true; $(".at30", node).hidden = true; }
      if (c.signoff) { var ps = $(".ps", node); ps.hidden = false; ps.textContent = c.signoff; }
    }

    var flip = function () {
      var on = !card.classList.contains("flipped");
      card.classList.toggle("flipped", on);
      card.setAttribute("aria-pressed", on ? "true" : "false");
      if (on) { hint.style.opacity = 0; markFlipped(); checkMore(); }
    };
    var body = $(".back-body", node), cue = $(".back-foot .flip-cue", node);
    var checkMore = function () {
      var more = body.scrollHeight - body.clientHeight - body.scrollTop > 6;
      cue.textContent = more ? "more ↓" : "↻";
    };
    body.addEventListener("scroll", checkMore, { passive: true });
    card.addEventListener("click", function (e) {
      if (e.target.closest(".photo-nav")) return;
      flip();
    });
    card.addEventListener("keydown", function (e) {
      if (e.target !== card) return;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
    });
    track.appendChild(node);

    var seg = document.createElement("span");
    segments.appendChild(seg);
  });

  // closing slide
  var end = document.createElement("div");
  end.className = "slide";
  end.innerHTML =
    '<div class="end"><div class="big">🎂</div><h2></h2><p>That’s every postcard (for now).</p>' +
    '<button type="button">Read them again</button></div>';
  $("h2", end).textContent = "Happy 30th, " + SITE.name + "!";
  $("button", end).addEventListener("click", function () { goTo(0); });
  track.appendChild(end);

  var flippedOnce = false;
  function markFlipped() {
    if (flippedOnce) return;
    flippedOnce = true;
    setTimeout(function () { hint.textContent = "Swipe for the next postcard →"; hint.style.opacity = 1; }, 700);
  }

  /* ---------- progress ---------- */
  function slideWidth() { return track.clientWidth || 1; }
  function update() {
    var idx = Math.round(track.scrollLeft / slideWidth());
    if (idx === current && counter.dataset.init) return;
    counter.dataset.init = "1";
    // un-flip cards that scrolled away
    if (idx !== current) {
      var prev = track.children[current];
      var pc = prev && prev.querySelector(".card.flipped");
      if (pc) setTimeout(function () { pc.classList.remove("flipped"); pc.setAttribute("aria-pressed", "false"); }, 250);
    }
    current = idx;
    var shown = Math.min(idx + 1, total);
    counter.textContent = idx >= total ? "The end ♡" : shown + " / " + total;
    Array.prototype.forEach.call(segments.children, function (s, i) { s.classList.toggle("on", i <= idx); });
    hint.style.visibility = idx >= total ? "hidden" : "visible";
    prevBtn.disabled = idx <= 0;
    nextBtn.disabled = idx >= total;
  }
  var raf = 0;
  track.addEventListener("scroll", function () {
    if (raf) return;
    raf = requestAnimationFrame(function () { raf = 0; update(); });
  }, { passive: true });
  window.addEventListener("resize", function () { goTo(current, true); });

  function goTo(i, instant) {
    i = Math.max(0, Math.min(total, i));
    track.scrollTo({ left: i * slideWidth(), behavior: instant ? "auto" : "smooth" });
  }
  prevBtn.addEventListener("click", function () { goTo(current - 1); });
  nextBtn.addEventListener("click", function () { goTo(current + 1); });
  document.addEventListener("keydown", function (e) {
    if (deck.hidden) { if (e.key === "Enter") openDeck(); return; }
    if (e.key === "ArrowRight") goTo(current + 1);
    if (e.key === "ArrowLeft") goTo(current - 1);
  });

  /* ---------- open / close ---------- */
  var pushed = false;
  function openDeck() {
    cover.classList.add("leaving");
    deck.hidden = false;
    requestAnimationFrame(function () {
      deck.classList.add("shown");
      update();
    });
    setTimeout(function () { cover.hidden = true; stopConfetti(); }, 450);
    if (location.hash !== "#cards") { history.pushState(null, "", "#cards"); pushed = true; }
  }
  function closeDeck() {
    cover.hidden = false;
    requestAnimationFrame(function () { cover.classList.remove("leaving"); });
    deck.classList.remove("shown");
    setTimeout(function () { deck.hidden = true; }, 450);
    startConfetti();
  }
  $("#open-btn").addEventListener("click", openDeck);
  $("#home-btn").addEventListener("click", function () {
    if (pushed && location.hash === "#cards") { pushed = false; history.back(); }
    else { history.replaceState(null, "", location.pathname + location.search); closeDeck(); }
  });
  window.addEventListener("popstate", function () {
    if (location.hash === "#cards") openDeck(); else { pushed = false; closeDeck(); }
  });

  /* ---------- confetti (subtle, cover only) ---------- */
  var canvas = $("#confetti"), ctx = canvas.getContext("2d");
  var pieces = [], confRaf = 0, confStart = 0;
  var colors = ["#c4553b", "#e3a54a", "#7d9b7f", "#2f4a6d", "#f3cfc6"];
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function sizeCanvas() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function startConfetti() {
    if (reduce) return;
    sizeCanvas();
    pieces = [];
    for (var i = 0; i < 70; i++) {
      pieces.push({
        x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * 0.9,
        w: 5 + Math.random() * 5, h: 8 + Math.random() * 6,
        vy: 0.7 + Math.random() * 1.3, vx: -0.4 + Math.random() * 0.8,
        a: Math.random() * Math.PI, va: -0.06 + Math.random() * 0.12,
        sway: Math.random() * 6.28, c: colors[i % colors.length],
      });
    }
    confStart = performance.now();
    cancelAnimationFrame(confRaf);
    confRaf = requestAnimationFrame(tick);
  }
  function tick(t) {
    var elapsed = t - confStart;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    var alive = 0;
    pieces.forEach(function (p) {
      p.y += p.vy; p.x += p.vx + Math.sin(p.sway + p.y / 40) * 0.4; p.a += p.va;
      if (p.y > innerHeight + 20) { if (elapsed < 5000) { p.y = -20; p.x = Math.random() * innerWidth; } else return; }
      alive++;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a);
      ctx.globalAlpha = 0.85; ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.a)) + 1);
      ctx.restore();
    });
    if (alive) confRaf = requestAnimationFrame(tick);
  }
  function stopConfetti() { cancelAnimationFrame(confRaf); ctx.clearRect(0, 0, innerWidth, innerHeight); }

  if (location.hash === "#cards") { cover.hidden = true; deck.hidden = false; deck.classList.add("shown"); update(); }
  else startConfetti();
})();
