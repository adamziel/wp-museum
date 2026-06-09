/* =====================================================================
   WordPress Museum · Tune Through Time — the PLAYABLE archive
   You don't read about old WordPress. You BOOT it. Scrub the time deck;
   each era is a period device whose screen boots the real WordPress of
   that year, live in your browser, via WordPress Playground
   (?wp=<v>&php=<era-php> makes the old releases actually run).
   Static, no build. Vanilla JS.
   ===================================================================== */

(() => {
  'use strict';

  // ---------- release data (researched; jazz codenames) -----------------
  // php = the era-appropriate PHP that lets that WordPress actually boot
  //       in Playground. device = the period machine its screen lives in.

  const RELEASES = [
    {
      slug: 'prologue', version: '0.70', codename: 'b2 fork', musician: '— pre-jazz era',
      date: 'May 27, 2003', year: 2003, eraLabel: 'pre-blog · the fork', themeKey: 'prologue',
      tint: '#2dff9e', php: null, device: 'crt', bootable: false,
      why: 'The fork of b2/cafelog that started everything. Two devs, one mailing list, zero codename.',
      trivia: 'Matt posted to his blog on Jan 24 2003 looking for a co-conspirator. Mike Little replied within hours.',
      musicianNote: 'Jazz-musician codenames begin at 1.0 “Davis”. 0.70 is the cold open — too early for Playground to boot.',
      playUrl: 'https://wordpress.org/news/2003/05/wordpress-now-available/',
      sourceUrl: 'https://wordpress.org/news/2003/05/wordpress-now-available/'
    },
    {
      slug: '1-2-mingus', version: '1.2', codename: 'Mingus', musician: 'Charles Mingus',
      date: 'May 22, 2004', year: 2004, eraLabel: 'tables · GeoCities glow', themeKey: 'mingus',
      tint: '#c46a2a', php: '5.2', device: 'crt', bootable: true,
      why: 'Plugins. The hook system that turned a blog into a platform.',
      trivia: 'add_action() and add_filter() ship here. The first published plugin — “Hello Dolly” — is one line of jazz.',
      musicianNote: 'Mingus arranged complex layered ensembles — fitting for a release built around layered hooks.',
      sourceUrl: 'https://wordpress.org/news/2004/05/new-version-of-wordpress/'
    },
    {
      slug: '1-5-strayhorn', version: '1.5', codename: 'Strayhorn', musician: 'Billy Strayhorn',
      date: 'February 17, 2005', year: 2005, eraLabel: 'Kubrick · the blogosphere', themeKey: 'strayhorn',
      tint: '#2f6db0', php: '5.2', device: 'crt', bootable: true,
      why: 'The theme system arrived — and with it, Kubrick, the blue-skied default that defined a decade of blogs.',
      trivia: 'Static Pages also debuted. Suddenly your blog could pretend to be a website.',
      musicianNote: 'Strayhorn wrote Take the “A” Train for Ellington. Quiet co-pilot energy.',
      sourceUrl: 'https://wordpress.org/news/2005/02/strayhorn/'
    },
    {
      slug: '2-0-duke', version: '2.0', codename: 'Duke', musician: 'Duke Ellington',
      date: 'December 31, 2005', year: 2005, eraLabel: 'Aqua gloss · Web 2.0', themeKey: 'duke',
      tint: '#4aa3e0', php: '5.2', device: 'gloss', bootable: true,
      why: 'TinyMCE rich editor. Image uploads. The admin learned to be friendly.',
      trivia: 'Shipped on New Year’s Eve. Yes, really. Imagine the wp-admin merge party.',
      musicianNote: 'Ellington led the most polished big band in jazz — apt patron saint of a polish release.',
      sourceUrl: 'https://wordpress.org/news/2005/12/wordpress-20/'
    },
    {
      slug: '2-7-coltrane', version: '2.7', codename: 'Coltrane', musician: 'John Coltrane',
      date: 'December 11, 2008', year: 2008, eraLabel: 'Vista / Aero glass', themeKey: 'coltrane',
      tint: '#2f73b3', php: '5.2', device: 'gloss', bootable: true,
      why: 'The wp-admin we still recognise: left-rail navigation, dashboard widgets, one-click upgrades.',
      trivia: 'Designed by Happy Cog (Jeffrey Zeldman’s shop). Crowd-sourced via the “Crazyhorse” prototype.',
      musicianNote: 'Coltrane reinvented his own sound mid-career. Same energy as redesigning wp-admin from scratch.',
      sourceUrl: 'https://wordpress.org/news/2008/12/coltrane/'
    },
    {
      slug: '3-0-thelonious', version: '3.0', codename: 'Thelonious', musician: 'Thelonious Monk',
      date: 'June 17, 2010', year: 2010, eraLabel: 'skeuomorphism · the CMS turn', themeKey: 'thelonious',
      tint: '#8a5a22', php: '5.2', device: 'alu', bootable: true,
      why: 'Multisite merged in. Custom post types and menus arrived. WordPress stopped pretending to be just a blog.',
      trivia: 'Twenty Ten kicks off the annual default-theme tradition — one theme per year, named after the year.',
      musicianNote: 'Monk played the corners of the piano nobody else found. Multisite is the corner of the codebase nobody else found.',
      sourceUrl: 'https://wordpress.org/news/2010/06/thelonious/'
    },
    {
      slug: '3-8-parker', version: '3.8', codename: 'Parker', musician: 'Charlie Parker',
      date: 'December 12, 2013', year: 2013, eraLabel: 'flat design · MP6', themeKey: 'parker',
      tint: '#0073aa', php: '5.2', device: 'alu', bootable: true,
      why: 'The MP6 plugin landed in core: flat icons, responsive admin, eight admin colour schemes.',
      trivia: 'First wp-admin that worked properly on a phone. Also: Open Sans everywhere.',
      musicianNote: 'Bird invented bebop — fast, sharp, modern. Parker the release is the “fast & sharp” admin.',
      sourceUrl: 'https://wordpress.org/news/2013/12/parker/'
    },
    {
      slug: '4-4-clifford', version: '4.4', codename: 'Clifford', musician: 'Clifford Brown',
      date: 'December 8, 2015', year: 2015, eraLabel: 'material design · responsive images', themeKey: 'clifford',
      tint: '#b3884a', php: '5.2', device: 'book', bootable: true,
      why: 'Responsive images by default (srcset!), embeddable posts, and the REST API infrastructure quietly landed.',
      trivia: 'Twenty Sixteen ships — the “classic blog as art” theme. Shortcodes get embed parity.',
      musicianNote: 'Clifford Brown made hard bop pretty. This release made the front-end pretty and polite to mobile data plans.',
      sourceUrl: 'https://wordpress.org/news/2015/12/clifford/'
    },
    {
      slug: '4-7-vaughan', version: '4.7', codename: 'Vaughan', musician: 'Sarah “Sassy” Vaughan',
      date: 'December 6, 2016', year: 2016, eraLabel: 'cinematic hero · the REST API', themeKey: 'vaughan',
      tint: '#22d98a', php: '7.0', device: 'book', bootable: true,
      why: 'REST API content endpoints went stable. WordPress became a back-end you could talk to from anywhere.',
      trivia: 'Twenty Seventeen — full-screen header video, business-y vibe. The “WordPress can be your website too” theme.',
      musicianNote: 'Sassy Vaughan had a four-octave range. So does a CMS that ships both wp-admin and an API.',
      sourceUrl: 'https://wordpress.org/news/2016/12/vaughan/'
    },
    {
      slug: '5-0-bebo', version: '5.0', codename: 'Bebo', musician: 'Bebo Valdés',
      date: 'December 6, 2018', year: 2018, eraLabel: 'Gutenberg · the block editor', themeKey: 'bebo',
      tint: '#007cba', php: '7.2', device: 'modern', bootable: true,
      why: 'Gutenberg replaced the classic editor. Posts became trees of blocks.',
      trivia: 'Most divisive release in WordPress history — and the most-watched. Twenty Nineteen is the first block-friendly theme.',
      musicianNote: 'Bebo Valdés rebuilt his career after a 30-year exile. Gutenberg is WordPress rebuilding its editor after 15.',
      sourceUrl: 'https://wordpress.org/news/2018/12/bebo/'
    },
    {
      slug: '5-9-josephine', version: '5.9', codename: 'Josephine', musician: 'Joséphine Baker',
      date: 'January 25, 2022', year: 2022, eraLabel: 'glassmorphism · Full Site Editing', themeKey: 'josephine',
      tint: '#6b54c8', php: '7.4', device: 'modern', bootable: true,
      why: 'Full Site Editing arrived. Headers, footers, templates — all blocks, all editable.',
      trivia: 'Twenty Twenty-Two: the first default theme designed from scratch for the Site Editor.',
      musicianNote: 'Joséphine Baker invented stage shows that were equal parts spectacle and architecture. FSE’s vibe exactly.',
      sourceUrl: 'https://wordpress.org/news/2022/01/josephine/'
    },
    {
      slug: '6-2-dolphy', version: '6.2', codename: 'Dolphy', musician: 'Eric Dolphy',
      date: 'March 29, 2023', year: 2023, eraLabel: 'dark IDE · command palette', themeKey: 'dolphy',
      tint: '#6cd2ff', php: '8.0', device: 'modern', bootable: true,
      why: 'The Site Editor lost its “beta” label. Style Book, distraction-free writing, and the dev command palette landed.',
      trivia: 'Press ⌘K in the editor and it feels like VS Code. The browser became an IDE.',
      musicianNote: 'Dolphy played notes nobody else heard inside the chord. The command palette finds commands nobody else remembers.',
      sourceUrl: 'https://wordpress.org/news/2023/03/dolphy/'
    },
    {
      slug: '6-5-regina', version: '6.5', codename: 'Regina', musician: 'Regina Carter',
      date: 'April 2, 2024', year: 2024, eraLabel: 'editorial type · Font Library', themeKey: 'regina',
      tint: '#c79a3a', php: '8.2', device: 'modern', bootable: true,
      why: 'A real Font Library — install Google Fonts (or your own) into the Site Editor without copying CSS.',
      trivia: 'Also: AVIF support, the Interactivity API, and revision counts that no longer lie.',
      musicianNote: 'Regina Carter plays jazz violin — typography for the ear. Regina the release is typography for the screen.',
      sourceUrl: 'https://wordpress.org/news/2024/04/wordpress-6-5-regina/'
    },
    {
      slug: '7-0-armstrong', version: '7.0', codename: 'Armstrong', musician: 'Louis Armstrong',
      date: 'May 20, 2026', year: 2026, eraLabel: 'now · ambient AI', themeKey: 'armstrong',
      tint: '#ff8b3c', php: '8.3', device: 'holo', bootable: true,
      why: 'The first 7.x. A round-number release that closes the loop on the jazz codenames started in 1.0.',
      trivia: 'The codename most fans would have bet on for 1.0. Took 23 years to land.',
      musicianNote: 'Satchmo basically invented the jazz solo. The patron saint that was always going to get the seven.',
      sourceUrl: 'https://wordpress.org/news/2026/05/wordpress-7-0-armstrong/'
    }
  ];

  const INTRO = {
    slug: 'intro', version: '', codename: 'WordPress Museum',
    musician: 'A Playable Release Odyssey', year: 2003, themeKey: 'intro',
    tint: '#7b6cff', isIntro: true
  };

  const PANELS = [INTRO, ...RELEASES];

  // the web-design movement each era belongs to — shown on a wall plaque
  const MOVEMENTS = {
    prologue:   { name: 'Pre-Web · The Fork',         years: '2003' },
    mingus:     { name: 'GeoCities · Web 1.0',        years: '2004' },
    strayhorn:  { name: 'The Blogosphere',            years: '2005' },
    duke:       { name: 'Web 2.0 Gloss',              years: '2005–08' },
    coltrane:   { name: 'Aero Glass',                 years: '2008' },
    thelonious: { name: 'Skeuomorphism',              years: '2010' },
    parker:     { name: 'Flat Design · Metro',        years: '2013' },
    clifford:   { name: 'Material Design',            years: '2015' },
    vaughan:    { name: 'Cinematic Hero',             years: '2016' },
    bebo:       { name: 'The Block Editor',           years: '2018' },
    josephine:  { name: 'Glassmorphism · FSE',        years: '2022' },
    dolphy:     { name: 'Dark IDE',                   years: '2023' },
    regina:     { name: 'Editorial Typography',       years: '2024' },
    armstrong:  { name: 'Ambient AI',                 years: '2026' }
  };

  // ---------- helpers ---------------------------------------------------

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const rep = (s, n) => Array.from({ length: n }, () => s).join('');

  const hexRgb = h => { const x = h.replace('#',''); return { r: parseInt(x.slice(0,2),16), g: parseInt(x.slice(2,4),16), b: parseInt(x.slice(4,6),16) }; };
  const lerp = (a, b, t) => a + (b - a) * t;
  const mix = (h1, h2, t) => { const a = hexRgb(h1), b = hexRgb(h2); return `rgb(${Math.round(lerp(a.r,b.r,t))}, ${Math.round(lerp(a.g,b.g,t))}, ${Math.round(lerp(a.b,b.b,t))})`; };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- the playground URLs --------------------------------------
  // The whole trick: pinning the era's PHP makes the old WordPress boot.

  function bootUrl(r, seamless) {
    const base = `https://playground.wordpress.net/?wp=${encodeURIComponent(r.version)}`
      + `&php=${encodeURIComponent(r.php)}&login=yes&url=/wp-admin/`;
    return seamless ? base + '&mode=seamless' : base;
  }

  // ---------- room markup ----------------------------------------------

  function introHTML() {
    return `
      <div class="intro">
        <div class="intro__rays" aria-hidden="true"></div>
        <div class="intro__marq" aria-hidden="true"><div class="intro__marqIn">${
          rep('1.2 MINGUS &nbsp;✦&nbsp; 1.5 STRAYHORN &nbsp;✦&nbsp; 2.0 DUKE &nbsp;✦&nbsp; 2.7 COLTRANE &nbsp;✦&nbsp; 3.0 THELONIOUS &nbsp;✦&nbsp; 3.8 PARKER &nbsp;✦&nbsp; 4.4 CLIFFORD &nbsp;✦&nbsp; 4.7 VAUGHAN &nbsp;✦&nbsp; 5.0 BEBO &nbsp;✦&nbsp; 5.9 JOSEPHINE &nbsp;✦&nbsp; 6.2 DOLPHY &nbsp;✦&nbsp; 6.5 REGINA &nbsp;✦&nbsp; 7.0 ARMSTRONG &nbsp;✦&nbsp; ', 4)
        }</div></div>
        <div class="intro__center">
          <p class="intro__kicker">◍ A PLAYABLE RELEASE ODYSSEY</p>
          <h1 class="intro__title">Boot 20 years<br><span>of WordPress.</span></h1>
          <p class="intro__sub">Not screenshots. Not mock-ups. Scrub through time and the <b>real WordPress
            of each year boots in your browser</b> — from 1.2 (2004) to 7.0 — powered by
            <a href="https://wordpress.github.io/wordpress-playground/" target="_blank" rel="noopener">WordPress&nbsp;Playground</a>.</p>
          <p class="intro__how">No buttons. <b>Scroll</b>, <b>swipe</b>, press <b>◂ ▸</b>, or grab the deck to travel.
            Then hit <b>Boot</b> and click around the actual software.</p>
          <div class="intro__dial"><span class="intro__arrow">▸</span> TRAVEL THIS WAY</div>
        </div>
      </div>`;
  }

  // A "Boot live" trigger. Bootable releases get a button that drops a live
  // Playground iframe over the room; the prologue (pre-1.0) just links out.
  function bootCta(r, cls, label) {
    return `<button class="cta ${cls}" type="button" data-boot="${esc(bootUrl(r, true))}" data-ver="${esc(r.version)}">${esc(label)}</button>`;
  }

  // One period-authentic room per era. Class names match styles.css.
  const ROOMS = {
    prologue: r => `
      <div class="crt">
        <div class="crt__glow"></div><div class="crt__scan"></div>
        <pre class="crt__out"><span class="c">b2/cafelog v0.6 — connection established — tty/blogosphere</span>
============================================================

<span class="c">&gt; FROM:</span> m@photomatt.net
<span class="c">&gt; DATE:</span> Fri, 24 Jan 2003
<span class="c">&gt; SUBJ:</span> the blogging software dilemma

   "My logging software hasn't been updated for months.
    A fork of b2 would be nice."

<span class="c">&gt; FROM:</span> mike@zed1.com
<span class="c">&gt; SUBJ:</span> re: the dilemma

   "I'm game. Where do we start?"

<span class="c">&gt; ${esc(r.why)}</span>
   ${esc(r.trivia)}

[ ${esc(r.codename)} · v${esc(r.version)} · ${esc(r.date)} ]  <span class="cur">▮</span></pre>
        <a class="cta cta--crt" href="${esc(r.playUrl)}" target="_blank" rel="noopener">Read the 2003 launch post ↗</a>
      </div>`,

    mingus: r => `
      <div class="geo">
        <div class="geo__marq"><span>★ Welcome to my WordPress 1.2 homepage!! ★ Sign my guestbook! ★ Best viewed in Netscape ★ You are visitor #00012409 ★ This site is Y2K compliant ★&nbsp;&nbsp;</span></div>
        <div class="geo__page">
          <div class="geo__wordart">WordPress 1.2 “Mingus”</div>
          <div class="geo__nav"><a>Home</a><a>Plugins!</a><a>Guestbook</a><a>Webring</a><a>E-mail me</a></div>
          <table class="geo__layout"><tr>
            <td class="geo__main">
              <h3>★ Plugins have arrived! ★</h3>
              <p>${esc(r.why)}</p>
              <p>${esc(r.trivia)}</p>
              <div class="geo__hello">♫ “Hello, Dolly… it's so nice to have you back where you belong” — the very first plugin ships as one line of jazz.</div>
              <p><b>Musician note:</b> ${esc(r.musicianNote)}</p>
              ${bootCta(r, 'cta--bevel', 'Boot WordPress 1.2 live »')}
            </td>
            <td class="geo__side">
              <div class="geo__counter">visitors<b>00012409</b></div>
              <div class="geo__box"><h4>» About this plug-in</h4><ul><li>Hello Dolly</li><li>Version 1.0</li><li>by Matt</li><li>Active ✓</li></ul></div>
              <div class="geo__ring">‹ WP Webring ›<br>[prev] · [random] · [next]</div>
            </td>
          </tr></table>
          <div class="geo__construction">🚧 UNDER CONSTRUCTION 🚧</div>
          <ul class="geo__badges"><li>Valid XHTML 1.0</li><li>800×600</li><li>Made in Notepad</li><li>♥ CSS</li></ul>
        </div>
      </div>`,

    strayhorn: r => `
      <div class="kub">
        <div class="kub__header"><div class="kub__sky"></div><h1>WordPress 1.5 “Strayhorn”</h1><p>Just another WordPress weblog</p></div>
        <div class="kub__body">
          <div class="kub__main">
            <p class="kub__date">Thursday, February 17, 2005</p>
            <h2>The Theme System</h2>
            <p class="why">${esc(r.why)}</p>
            <p>${esc(r.trivia)}</p>
            <p><b>${esc(r.codename)} · ${esc(r.musician)}.</b> ${esc(r.musicianNote)}</p>
            ${bootCta(r, 'cta--kubrick', 'Boot WordPress 1.5 live →')}
            <p class="kub__meta">Posted in Releases · 3 Comments »</p>
          </div>
          <div class="kub__side">
            <h3>Pages</h3><ul><li>About</li><li>Colophon</li></ul>
            <h3>Archives</h3><ul><li>February 2005</li><li>December 2004</li></ul>
            <h3>Blogroll</h3><ul><li>Photo Matt</li><li>Mike Little</li><li>Donncha</li></ul>
          </div>
        </div>
        <div class="kub__foot">Powered by WordPress.</div>
      </div>`,

    duke: r => `
      <div class="w2">
        <div class="w2__beta">2.0<small>NEW!</small></div>
        <p class="w2__eyebrow">Web 2.0 · now with gloss</p>
        <h1 class="w2__h1">Duke.</h1>
        <p class="w2__tag">Rich editing, finally — shipped New Year's Eve, 2005.</p>
        <div class="w2__panes">
          <div class="w2__pane"><h3>What shipped</h3><p>${esc(r.why)}</p></div>
          <div class="w2__pane w2__pane--dark"><h3>${esc(r.codename)} · ${esc(r.musician)}</h3><p>${esc(r.musicianNote)}</p></div>
        </div>
        <div class="w2__editor">
          <div class="w2__tb"><button>B</button><button><i>I</i></button><button>U</button><span class="sep"></span><button>•</button><button>1.</button><span class="sep"></span><button>🔗</button><button>🖼</button></div>
          <div class="w2__ta">${esc(r.trivia)}</div>
        </div>
        ${bootCta(r, 'cta--aqua', 'Boot WordPress 2.0 live →')}
      </div>`,

    coltrane: r => `
      <div class="vista">
        <div class="vista__glass">
          <div class="vista__bar">wp-admin · Dashboard — Coltrane <span class="vista__btns"><i></i><i></i><i class="x"></i></span></div>
          <div class="vista__inner">
            <div class="vista__rail"><span class="on">▦ Dashboard</span><span>✎ Posts</span><span>🖼 Media</span><span>📄 Pages</span><span>💬 Comments</span><span>🎨 Appearance</span><span>🔌 Plugins</span><span>⚙ Settings</span></div>
            <div class="vista__main">
              <h2>Welcome to the new Dashboard.</h2>
              <p class="why">${esc(r.why)}</p>
              <div class="vista__widgets"><div class="vista__w"><h4>Right Now</h4><p>2 Posts · 1 Page<br>1 Comment · 0 Spam</p></div><div class="vista__w"><h4>Did you know</h4><p>${esc(r.trivia)}</p></div></div>
              <p class="vista__note"><b>${esc(r.codename)}.</b> ${esc(r.musicianNote)}</p>
              ${bootCta(r, 'cta--vista', 'Boot WordPress 2.7 live →')}
            </div>
          </div>
        </div>
        <div class="wmp"><div class="wmp__sheen"></div><span class="wmp__logo">▣</span><span class="wmp__b">⏮</span><span class="wmp__b wmp__b--play">▶</span><span class="wmp__b">⏭</span><div class="wmp__viz"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><span class="wmp__np">♪ Coltrane — A Love Supreme</span></div>
      </div>`,

    thelonious: r => `
      <div class="skeu">
        <div class="skeu__leather">
          <div class="skeu__tape">Est. 2010</div>
          <span class="skeu__plate">WordPress 3.0 · Thelonious</span>
          <h2>One install, many sites.</h2>
          <p class="why">${esc(r.why)}</p>
          <p>${esc(r.trivia)}</p>
          <p class="skeu__note"><b>${esc(r.codename)} · ${esc(r.musician)}.</b> ${esc(r.musicianNote)}</p>
          ${bootCta(r, 'cta--skeu', 'Boot WordPress 3.0 live →')}
        </div>
      </div>`,

    parker: r => `
      <div class="metro">
        <h2 class="metro__h">Parker · 3.8 — the flat admin</h2>
        <div class="metro__grid">
          <button class="tile tile--wide tile--blue" type="button" data-boot="${esc(bootUrl(r, true))}" data-ver="${esc(r.version)}">
            <span class="tile__ico">⊞</span>
            <span class="tile__big">${esc(r.why)}</span>
            <span class="tile__cta">Boot WordPress 3.8 live →</span>
          </button>
          <div class="tile tile--green"><span class="tile__ico">📱</span><h4>Responsive</h4><p>${esc(r.trivia)}</p></div>
          <div class="tile tile--orange"><span class="tile__ico">🎷</span><h4>${esc(r.codename)}</h4><p>${esc(r.musicianNote)}</p></div>
          <div class="tile tile--purple"><span class="tile__ico">🎨</span><h4>Eight schemes</h4><span class="tile__swatch"><span style="--c:#23282d"></span><span style="--c:#0073aa"></span><span style="--c:#52accc"></span><span style="--c:#9c5d90"></span><span style="--c:#1a8f6f"></span><span style="--c:#dd382d"></span><span style="--c:#ec9543"></span><span style="--c:#82878c"></span></span></div>
          <div class="tile tile--red"><span class="tile__ico">📅</span><h4>Released</h4><p>${esc(r.date)}</p></div>
        </div>
      </div>`,

    clifford: r => `
      <div class="mat">
        <div class="mat__appbar"><span class="mat__menu">☰</span><span class="mat__ttl">Clifford · 4.4</span><span class="mat__kebab">⋮</span></div>
        <div class="mat__body">
          <div class="mat__card mat__card--hero">
            <div class="mat__media"><span class="mat__chip">srcset · responsive images</span></div>
            <div class="mat__txt"><h3>Responsive images, by default.</h3><p class="why">${esc(r.why)}</p></div>
          </div>
          <div class="mat__card"><h4>Did you know</h4><p>${esc(r.trivia)}</p></div>
          <div class="mat__card mat__card--accent"><h4>${esc(r.codename)} · ${esc(r.musician)}</h4><p>${esc(r.musicianNote)}</p></div>
          <div class="mat__card"><h4>Released</h4><p>${esc(r.date)} — tap ▶ to boot it.</p></div>
        </div>
        <button class="mat__fab" type="button" data-boot="${esc(bootUrl(r, true))}" data-ver="${esc(r.version)}" aria-label="Boot WordPress 4.4 live">▶</button>
      </div>`,

    vaughan: r => `
      <div class="hero">
        <div class="hero__photo"></div><div class="hero__grad"></div>
        <div class="hero__bar"><span class="hero__brand">VAUGHAN</span><span class="hero__menu"><a>Work</a><a>Studio</a><a>Journal</a><a>Contact</a></span></div>
        <div class="hero__mid">
          <p class="hero__eyebrow">WordPress 4.7 · the REST API</p>
          <h1 class="hero__h">Your site,<br>now an API.</h1>
          <p class="hero__sub">${esc(r.why)} ${esc(r.trivia)}</p>
          ${bootCta(r, 'cta--ghost', 'Boot WordPress 4.7 live')}
        </div>
        <div class="hero__foot"><span><b>${esc(r.codename)} · ${esc(r.musician)}</b> — ${esc(r.musicianNote)}</span><span class="hero__scroll">▾</span></div>
      </div>`,

    bebo: r => `
      <div class="brut">
        <div class="brut__row brut__row--mega"><span class="brut__lbl">5.0 / 2018</span><h2>BEBO &amp; THE BLOCKS.</h2></div>
        <div class="brut__row"><span class="brut__lbl">What</span><p>${esc(r.why)}</p></div>
        <div class="brut__row brut__row--accent"><span class="brut__lbl">Drama</span><blockquote>${esc(r.trivia)}</blockquote></div>
        <div class="brut__row"><span class="brut__lbl">${esc(r.codename)}</span><p>${esc(r.musicianNote)}</p></div>
        <div class="brut__row brut__row--cta"><span class="brut__lbl">Boot</span>${bootCta(r, 'cta--brut', 'Boot WordPress 5.0 live →')}</div>
      </div>`,

    josephine: r => `
      <div class="glass">
        <div class="glass__bg"></div>
        <div class="glass__stack">
          <div class="glass__card glass__card--lg"><span class="glass__pill">5.9 · Full Site Editing</span><h2>Josephine</h2><p class="why">${esc(r.why)}</p></div>
          <div class="glass__card"><h4>Did you know</h4><p>${esc(r.trivia)}</p></div>
          <div class="glass__card"><h4>${esc(r.codename)} · ${esc(r.musician)}</h4><p>${esc(r.musicianNote)}</p></div>
          <button class="glass__card glass__card--cta" type="button" data-boot="${esc(bootUrl(r, true))}" data-ver="${esc(r.version)}">Boot WordPress 5.9 live →</button>
        </div>
      </div>`,

    dolphy: r => `
      <div class="cmd">
        <div class="cmd__editor">
          <p class="cmd__crumbs">Site Editor · Templates · Single</p>
          <div class="cmd__ghost"></div><div class="cmd__ghost short"></div><div class="cmd__ghost"></div><div class="cmd__ghost short"></div><div class="cmd__ghost"></div>
        </div>
        <div class="cmd__overlay">
          <div class="cmd__modal">
            <div class="cmd__input"><span class="cmd__k"><kbd>⌘</kbd><kbd>K</kbd></span><span class="cmd__typed">boot wordpress 6.2</span><span class="cur">▮</span></div>
            <ul class="cmd__list">
              <li class="on"><span class="i">⏻</span>Boot WordPress 6.2, live<b>↵</b></li>
              <li><span class="i">🎨</span>Open Style Book</li>
              <li><span class="i">⌥</span>Toggle distraction-free</li>
              <li><span class="i">＋</span>Insert pattern…</li>
            </ul>
            <div class="cmd__foot">${esc(r.why)}</div>
          </div>
          <p class="cmd__triv">${esc(r.trivia)} — <b>${esc(r.codename)}:</b> ${esc(r.musicianNote)}</p>
          ${bootCta(r, 'cta--palette', '⏻ Boot WordPress 6.2 live')}
        </div>
      </div>`,

    regina: r => `
      <div class="spec">
        <div class="spec__hdr"><span class="spec__no">№ 65 · Spring 2024</span><span class="spec__nm">Regina · the Font Library</span></div>
        <div class="spec__hero"><span class="spec__big">Aa</span><span class="spec__sz">6.5</span></div>
        <div class="spec__row">
          <div class="spec__cut spec__cut--sans"><b>Aa</b><span>Grotesque</span></div>
          <div class="spec__cut"><b>Aa</b><span>Serif</span></div>
          <div class="spec__cut spec__cut--mono"><b>Aa</b><span>Mono</span></div>
          <div class="spec__cut spec__cut--script"><b>Aa</b><span>Script</span></div>
        </div>
        <div class="spec__cols"><p class="spec__lede">${esc(r.why)}</p><p>${esc(r.trivia)}</p><p><b>${esc(r.codename)} · ${esc(r.musician)}.</b> ${esc(r.musicianNote)}</p></div>
        ${bootCta(r, 'cta--specimen', 'Boot WordPress 6.5 live →')}
      </div>`,

    armstrong: r => `
      <div class="amb">
        <div class="amb__mesh"></div>
        <div class="amb__top"><p class="amb__kicker">${esc(r.date)} · ambient AI</p><h1 class="amb__h1">Armstrong <span>7.0</span></h1><p class="amb__sub">${esc(r.why)}</p></div>
        <div class="amb__cards">
          <div class="amb__card"><h3>Twenty-three years, one full chorus.</h3><p>${esc(r.trivia)}</p></div>
          <div class="amb__card"><h4>${esc(r.codename)} · ${esc(r.musician)}</h4><p>${esc(r.musicianNote)}</p></div>
          <button class="amb__card amb__card--cta" type="button" data-boot="${esc(bootUrl(r, true))}" data-ver="${esc(r.version)}"><span class="cta cta--ambient">Boot WordPress 7.0 live →</span></button>
        </div>
        <div class="amb__keys"><div class="keys">${rep('<i class="kw"></i>', 18)}${[0,1,3,4,5,7,8,10,11,12,14,15].map(n => `<span class="kb" style="--n:${n}"></span>`).join('')}</div></div>
      </div>`
  };

  function exhibitHTML(r) {
    const room = (ROOMS[r.themeKey] || (() => ''))(r);
    return `
      <div class="exhibit">
        ${room}
        <a class="panel__credit" href="${esc(r.sourceUrl)}" target="_blank" rel="noopener">WordPress ${esc(r.version)} release post ↗</a>
        <div class="screen" data-screen aria-hidden="true"></div>
      </div>`;
  }

  // ---------- DOM refs --------------------------------------------------

  const track = $('#track'), body = document.body;
  const tintEl = $('#backdrop-tint'), staticEl = $('#backdrop-static');
  const yearEl = $('#deck-year'), verEl = $('#deck-ver'), codeEl = $('#deck-code'), musoEl = $('#deck-muso');
  const railEl = $('#deck-rail'), playheadEl = $('#deck-playhead'), playEl = $('#deck-play');
  const liveEl = $('#live');

  // ---------- build panels + rail --------------------------------------

  function buildPanels() {
    track.innerHTML = PANELS.map((p, i) => {
      const inner = p.isIntro ? introHTML() : exhibitHTML(p);
      const m = MOVEMENTS[p.themeKey];
      const plaque = p.isIntro ? '' : `
        <div class="plaque">
          <span class="plaque__tag">EXHIBIT ${String(i).padStart(2,'0')}</span>
          <span class="plaque__name">${esc(p.codename)}</span>
          <span class="plaque__years">WordPress ${esc(p.version)} · ${esc(p.date)}</span>
          <span class="plaque__chars">${esc(m.name)} · ${esc(m.years)}</span>
        </div>`;
      return `
        <section class="panel panel--${p.themeKey}${p.isIntro ? ' panel--intro' : ''}"
                 data-i="${i}" data-era="${p.themeKey}"
                 role="group" aria-roledescription="exhibit room"
                 aria-label="${p.isIntro ? 'Entrance' : esc(p.version + ' ' + p.codename + ', ' + p.year)}">
          <div class="panel__frame">
            <div class="panel__content">${inner}</div>
            ${plaque}
          </div>
        </section>`;
    }).join('');
  }

  function buildRail() {
    const n = PANELS.length;
    PANELS.forEach((p, i) => {
      const tick = document.createElement('button');
      tick.type = 'button';
      tick.className = 'deck__tick' + (p.isIntro ? ' deck__tick--intro' : '');
      tick.style.left = (i / (n - 1) * 100) + '%';
      tick.dataset.i = i;
      tick.setAttribute('aria-label', p.isIntro ? 'Entrance' : `${p.version} ${p.codename} (${p.year})`);
      tick.innerHTML = `<span class="deck__tickDot"></span><span class="deck__tickLbl">${p.isIntro ? '⏻' : esc(p.version)}</span>`;
      tick.addEventListener('click', () => travelTo(i));
      railEl.appendChild(tick);
    });
  }

  // ---------- live boot engine -----------------------------------------

  function bootScreen(btn) {
    const panel = btn.closest('.panel');
    const screen = panel && panel.querySelector('[data-screen]');
    if (!screen || screen.querySelector('iframe')) return;
    const ver = btn.dataset.ver || '';
    panel.classList.add('is-live');
    screen.setAttribute('aria-hidden', 'false');
    screen.innerHTML =
      `<div class="screen__bar"><span class="screen__dot"></span>live · real WordPress ${esc(ver)} in your browser`
      + `<button class="screen__close" type="button" aria-label="Exit live WordPress">✕ exit ${esc(ver)}</button></div>`
      + `<div class="screen__load"><span class="screen__spin"></span>booting WordPress ${esc(ver)}… give it a few seconds</div>`;
    const f = document.createElement('iframe');
    f.className = 'screen__frame';
    f.src = btn.dataset.boot;
    f.title = `WordPress ${ver} — live in WordPress Playground`;
    f.setAttribute('allow', 'clipboard-read; clipboard-write; fullscreen');
    f.setAttribute('loading', 'eager');
    f.addEventListener('load', () => screen.classList.add('is-ready'));
    screen.appendChild(f);
  }

  function closeScreen(screen) {
    const panel = screen.closest('.panel');
    screen.innerHTML = '';
    screen.classList.remove('is-ready');
    screen.setAttribute('aria-hidden', 'true');
    if (panel) panel.classList.remove('is-live');
  }

  // tear down a live boot when you leave its room (keeps memory in check)
  function teardownExcept(activeIdx) {
    $$('.panel', track).forEach((pl, pi) => {
      if (pi === activeIdx) return;
      const s = pl.querySelector('[data-screen]');
      if (s && s.querySelector('iframe')) closeScreen(s);
    });
  }

  // ---------- travel core ----------------------------------------------

  let panelW = window.innerWidth;
  const ticks = () => $$('.deck__tick', railEl);
  function maxScroll() { return track.scrollWidth - track.clientWidth; }
  function travelTo(i, smooth = true) {
    i = clamp(i, 0, PANELS.length - 1);
    track.scrollTo({ left: i * panelW, behavior: (smooth && !reduceMotion) ? 'smooth' : 'auto' });
  }
  function currentIndex() { return clamp(Math.round(track.scrollLeft / panelW), 0, PANELS.length - 1); }

  function render() {
    const max = maxScroll();
    const frac = max > 0 ? track.scrollLeft / max : 0;
    const pos = frac * (PANELS.length - 1);
    const lo = Math.floor(pos), hi = Math.min(lo + 1, PANELS.length - 1), t = pos - lo;
    const yr = Math.round(lerp(PANELS[lo].year, PANELS[hi].year, t));
    if (yearEl.textContent !== String(yr)) yearEl.textContent = yr;
    const c = mix(PANELS[lo].tint, PANELS[hi].tint, t);
    tintEl.style.background =
      `radial-gradient(120% 90% at 50% 8%, ${c} 0%, transparent 62%),` +
      `radial-gradient(90% 70% at 85% 100%, ${c} 0%, transparent 60%)`;
    body.style.setProperty('--era', PANELS[Math.round(pos)].tint);
    playheadEl.style.left = (frac * 100) + '%';
  }

  let settleTimer = null, lastSettled = -1, ticksRaf = 0;
  function onScroll() {
    if (!ticksRaf) ticksRaf = requestAnimationFrame(() => { render(); ticksRaf = 0; });
    clearTimeout(settleTimer);
    settleTimer = setTimeout(settle, 110);
  }
  function settle() {
    const i = currentIndex();
    if (i === lastSettled) return;
    lastSettled = i;
    focusEra(i);
  }

  function focusEra(i) {
    const p = PANELS[i];
    body.dataset.era = p.themeKey;

    if (p.isIntro) {
      verEl.textContent = '—'; codeEl.textContent = 'WordPress Museum';
      musoEl.textContent = 'a playable release odyssey'; playEl.classList.add('is-hidden');
    } else {
      verEl.textContent = p.version; codeEl.textContent = '“' + p.codename + '”'; musoEl.textContent = p.musician;
      playEl.href = p.bootable ? bootUrl(p, false) : p.playUrl;
      playEl.querySelector('.deck__playTxt').textContent = p.bootable ? 'OPEN ' + p.version : 'READ';
      playEl.classList.remove('is-hidden');
    }

    ticks().forEach((tk, ti) => tk.classList.toggle('is-on', ti === i));
    teardownExcept(i);
    $$('.panel', track).forEach((pl, pi) => pl.classList.toggle('is-active', pi === i));

    if (!reduceMotion) { staticEl.classList.remove('flash'); void staticEl.offsetWidth; staticEl.classList.add('flash'); }

    liveEl.textContent = p.isIntro
      ? 'Entrance. WordPress Museum.'
      : `WordPress ${p.version}, codename ${p.codename}, ${p.year}.`;
  }

  // ---------- input: wheel → horizontal travel -------------------------

  function wheelToTravel(e) {
    // never hijack the wheel while pointing at a live, booted WordPress
    if (e.target.closest('.screen')) return;
    const frame = e.target.closest('.panel__frame');
    if (frame) {
      const canV = frame.scrollHeight > frame.clientHeight + 1;
      if (canV) {
        const atTop = frame.scrollTop <= 0;
        const atBot = frame.scrollTop + frame.clientHeight >= frame.scrollHeight - 1;
        if (!((e.deltaY < 0) ? atTop : atBot)) return;
      }
    }
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (delta === 0) return;
    e.preventDefault();
    track.scrollLeft += delta;
    firstMove();
  }

  // ---------- input: keyboard ------------------------------------------

  function onKey(e) {
    if (e.target.matches('input, textarea, [contenteditable]')) return;
    const i = currentIndex();
    switch (e.key) {
      case 'ArrowRight': case 'PageDown': e.preventDefault(); travelTo(i + 1); firstMove(); break;
      case 'ArrowLeft':  case 'PageUp':   e.preventDefault(); travelTo(i - 1); firstMove(); break;
      case 'Home': e.preventDefault(); travelTo(0); firstMove(); break;
      case 'End':  e.preventDefault(); travelTo(PANELS.length - 1); firstMove(); break;
    }
  }

  // ---------- input: drag-to-pan + rail scrub --------------------------

  function dragPan(startX, startScroll, snapOnEnd) {
    let movedLocal = false;
    const move = ev => {
      const x = ev.touches ? ev.touches[0].clientX : ev.clientX;
      const dx = x - startX;
      if (Math.abs(dx) > 3) movedLocal = true;
      track.scrollLeft = startScroll - dx;
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      body.classList.remove('is-dragging');
      if (movedLocal && snapOnEnd) travelTo(currentIndex());
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }
  function onTrackPointerDown(e) {
    if (e.pointerType === 'touch') return;
    if (e.target.closest('a, button, input, textarea, [contenteditable], iframe, .screen')) return;
    body.classList.add('is-dragging');
    dragPan(e.clientX, track.scrollLeft, true);
    firstMove();
  }
  function onRailPointerDown(e) {
    if (e.target.closest('.deck__tick')) return;
    e.preventDefault();
    scrubRail(e);
    const move = ev => scrubRail(ev);
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); body.classList.remove('is-scrubbing'); };
    body.classList.add('is-scrubbing');
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    firstMove();
  }
  function scrubRail(e) {
    const rect = railEl.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    track.scrollLeft = clamp((x - rect.left) / rect.width, 0, 1) * maxScroll();
  }

  // ---------- first move dismisses the hint ----------------------------

  let moved = false;
  function firstMove() { if (moved) return; moved = true; body.classList.add('has-moved'); }

  // ---------- bootstrap -------------------------------------------------

  function onResize() { const i = currentIndex(); panelW = window.innerWidth; track.scrollLeft = i * panelW; render(); }

  function init() {
    buildPanels();
    buildRail();

    track.addEventListener('scroll', onScroll, { passive: true });
    track.addEventListener('wheel', wheelToTravel, { passive: false });
    track.addEventListener('pointerdown', onTrackPointerDown);
    track.addEventListener('click', e => {
      const close = e.target.closest('.screen__close');
      if (close) { e.preventDefault(); const s = close.closest('[data-screen]'); if (s) closeScreen(s); return; }
      const b = e.target.closest('[data-boot]');
      if (b) { e.preventDefault(); bootScreen(b); }
    });
    railEl.addEventListener('pointerdown', onRailPointerDown);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);

    track.scrollLeft = 0;
    render();
    focusEra(0);
    requestAnimationFrame(() => body.classList.remove('is-booting'));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
