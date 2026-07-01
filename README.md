# jrsnorth.co.uk

Personal website built as a fake retro desktop OS. Windows 95-ish aesthetic, no frameworks, no build step — just HTML, CSS, and vanilla JS.

Live at [jrsnorth.co.uk](https://jrsnorth.co.uk) — hosted on Netlify, deployed automatically on push.

---

## Structure

```
index.html        — desktop shell and window HTML
css/style.css     — all styling
js/content.js     — your content: tracks, projects, links, posts, bio
js/app.js         — site logic (windowing, drag, snake, easter eggs)
```

---

## Updating content

**`js/content.js` is the only file you need to edit for day-to-day updates.**

### Add a blog post
Open `js/content.js` and add a new object at the top of the `blogPosts` array:

```js
{
  title: 'Post title',
  date: '29 June 2026',
  body: `Your post text here.

Line breaks work fine. Just leave a blank line between paragraphs.`,
},
```

### Add a project
Add to the `projects` array in `js/content.js`:

```js
{
  icon: '🔧',
  title: 'Project name',
  description: 'One or two sentences.',
  status: 'Live',       // Live | WIP | Concept | Abandoned — whatever fits
  tags: 'music, web',
  url: 'https://...',   // leave empty string if there's no URL yet
},
```

### Add a link
Add to the `links` array in `js/content.js`:

```js
{ icon: '🐦', label: 'Twitter', url: 'https://twitter.com/yourhandle' },
```

### Update the bio
Edit the `bioText` string in `js/content.js`. Line breaks are preserved as-is.

### Update music tracks
Edit the `tracks` array in `js/content.js`. The player is cosmetic for now — it doesn't play audio files. Future plan: embed SoundCloud or Bandcamp players per track.

---

## First-time setup

### Contact form
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy the form ID
3. In `index.html`, find `YOUR_FORM_ID` and replace it with your ID:
   ```html
   action="https://formspree.io/f/abcd1234"
   ```

### Custom domain (Netlify)
1. Go to your Netlify site dashboard
2. Domain management → Add custom domain → `jrsnorth.co.uk`
3. Follow the DNS instructions Netlify gives you — update your registrar accordingly
4. Netlify handles HTTPS automatically once DNS propagates (usually under an hour)

---

## Deployment

Push to `main` and Netlify deploys automatically. No build step, no dependencies. The site is plain static files.

---

## Easter eggs

There are three. Finding them is the point.

---

## Adding features

The codebase is intentionally simple. Some natural next steps:

- **Real audio playback** — Web Audio API or embedded SoundCloud iframes per track
- **More desktop apps** — copy the window HTML pattern from `index.html` and add a case to `windowLabels` in `app.js`
- **Static site generator** — if the blog gets serious, Eleventy can take over from the `blogPosts` array and let you write posts as markdown files
- **More easter eggs** — the konami code handler in `app.js` is a good model to follow
