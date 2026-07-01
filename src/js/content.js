/* =============================================================
   jrsnorth.co.uk — YOUR CONTENT
   This is the only file you need to edit to update the site.
   ============================================================= */


/* -------------------------------------------------------------
   MUSIC PLAYER
   Add your tracks here. The player is cosmetic for now —
   link to SoundCloud/Bandcamp embeds in a future update.
   ------------------------------------------------------------- */

const tracks = [
  { title: 'Track Name',     artist: 'Artist', duration: '3:42' },
  { title: 'Another Track',  artist: 'Artist', duration: '4:15' },
  { title: 'B-side',         artist: 'Artist', duration: '2:58' },
];


/* -------------------------------------------------------------
   PROJECTS
   Add as many as you like. Status can be anything: Live, WIP,
   Concept, Abandoned, etc.
   ------------------------------------------------------------- */

const projects = [
  {
    icon: '🎛️',
    title: 'Modular Synth Patch Builder',
    description: 'Web-based modular synth environment. Drag, connect, make noise.',
    status: 'WIP',
    tags: 'music, web, audio',
    url: '',
  },
  {
    icon: '🌐',
    title: 'This Website',
    description: "A retro OS in the browser. You're looking at it.",
    status: 'Live',
    tags: 'web, creative, meta',
    url: '',
  },
  {
    icon: '📻',
    title: 'Generative Radio',
    description: 'Algorithmically generated ambient radio station. Never repeats.',
    status: 'Concept',
    tags: 'music, generative',
    url: '',
  },
];


/* -------------------------------------------------------------
   LINKS
   Replace the url values with your real profiles.
   Remove any rows you don't want.
   ------------------------------------------------------------- */

const links = [
  { icon: '🐦', label: 'Twitter / X',  url: 'https://twitter.com/' },
  { icon: '📸', label: 'Instagram',     url: 'https://instagram.com/' },
  { icon: '💻', label: 'GitHub',        url: 'https://github.com/jrsnorth-oss' },
  { icon: '🎵', label: 'SoundCloud',    url: 'https://soundcloud.com/' },
  { icon: '🎧', label: 'Bandcamp',      url: 'https://bandcamp.com/' },
  { icon: '💼', label: 'LinkedIn',      url: 'https://linkedin.com/' },
  { icon: '📺', label: 'YouTube',       url: 'https://youtube.com/' },
];


/* -------------------------------------------------------------
   BLOG POSTS
   Add new posts at the top (newest first).
   Body text supports line breaks — just use \n\n between paragraphs.
   ------------------------------------------------------------- */

const blogPosts = [
  {
    title: 'Why I built a fake OS for my website',
    date: '14 June 2025',
    body: `Because real websites are boring. Or at least, most of them are.

Everyone has the same hero section, the same "about me" paragraph, the same project cards in a grid. I wanted something you'd actually poke around in.

Building this was genuinely fun. Window dragging, a working snake game, a blue screen easter egg. None of it necessary. All of it worth it.`,
  },
  {
    title: "Making music with code: a beginner's descent",
    date: '2 May 2025',
    body: `It starts innocuously. You write a little script to generate some beats. Then you're reading about synthesis algorithms at 2am.

The Web Audio API is surprisingly powerful once you stop fighting it. Oscillators, filters, gain nodes — all wired together like a modular synth in code.

I'm still bad at it. But the interesting stuff rarely requires being good at it first.`,
  },
  {
    title: 'The internet used to be weirder. I miss it.',
    date: '18 March 2025',
    body: `In 1999, someone built a website that was just a MIDI file of All Star playing while animated gifs spun. For no reason. Because they could.

The modern internet is slicker, faster, more accessible, and almost completely devoid of that energy.

Personal websites used to be weird. I'm making mine weird again.`,
  },
];


/* -------------------------------------------------------------
   BIO
   Plain text, line breaks preserved.
   ------------------------------------------------------------- */

const bioText = `=================================
  ABOUT.TXT
  Last modified: today
=================================

Hi. I'm Jonathan.

I make music, build things on the internet,
and generally find it hard to do just one thing.

This site is a little home for projects,
experiments, and whatever I'm into at the moment.

If something here is broken, that's probably
on purpose. Probably.

---

SKILLS.EXE
  Music production
  Web development
  Making things that didn't need to exist
  but are better for existing

---

CURRENTLY:
  Listening to: [whatever you're into]
  Building:     something weird
  Reading:      [book]
  Mood:         ████████░░ good

=================================`;
