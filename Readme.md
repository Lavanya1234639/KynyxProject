# Kynyx Solutions — Website

A 5-page marketing website for Kynyx Solutions, a technology consulting and software development studio. Built with plain HTML, CSS, and vanilla JavaScript — no build step, no framework, no dependencies beyond two Google Fonts.

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, about summary, stats, services overview, featured projects, process, CTA, contact form |
| About | `about.html` | Company story, mission/vision, values, team |
| Services | `services.html` | Detailed breakdown of all 6 services |
| Projects | `projects.html` | Filterable grid of project case studies |
| Contact | `contact.html` | Contact details, contact form, location, FAQ |

## File Structure

```
KynyxProject/
├── index.html
├── about.html
├── services.html
├── projects.html
├── contact.html
│
├── style.css                  (shared — index.html + about.html)
├── responsive.css             (shared — index.html + about.html)
├── main.js                    (shared — index.html + about.html)
│
├── services.css               (standalone — services.html only)
├── services-responsive.css
├── services.js
│
├── projects.css                (standalone — projects.html only)
├── projects-responsive.css
├── projects.js
│
├── contact.css                 (standalone — contact.html only)
├── contact-responsive.css
└── contact.js

### Why some pages share files and others don't

`index.html` and `about.html` were built first and share `style.css` / `responsive.css` / `main.js`, since they reuse the same components (hero, stats, feature grids, etc.).

`services.html`, `projects.html`, and `contact.html` were added later as **fully standalone pages** — each has its own CSS/JS files containing only the styles and scripts that page actually needs. This means:

- You can delete any one of these three pages (HTML + its 3 files) without affecting the others.
- Each page's CSS file repeats the shared design tokens (colors, fonts, spacing) at the top, so it never depends on `style.css` being present.

No page depends on a file outside its own group. Removing `projects.html` and its three files, for example, has zero effect on the rest of the site (aside from a dead nav link, which you'd update manually).

## How to run it

No build tools or server required.

1. Download/copy all files into one folder, keeping the flat structure above (don't put CSS/JS in subfolders — paths are relative).
2. Open `index.html` directly in a browser, **or** for the most reliable experience (some browsers restrict local file access for fonts/scripts), serve the folder locally:
   ```bash
   # Python 3
   python -m http.server 8000
   # then visit http://localhost:8000
   ```
3. To deploy on GitHub Pages: push the folder to a repo, enable Pages on the `main` branch, and it will work as-is since all links are relative.

## Design system

- **Theme:** Light. Background is white/off-white (`--paper`, `--paper-dim`); dark sections (stats strip, footer, CTA band) are used sparingly for contrast.
- **Colors:** Defined as CSS variables at the top of every stylesheet — `--ink`, `--paper`, `--slate`, `--signal` (orange accent), `--line` (borders).
- **Fonts:** [Fraunces](https://fonts.google.com/specimen/Fraunces) (serif, headings), [Inter](https://fonts.google.com/specimen/Inter) (body text), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (labels, eyebrows, nav).
- **Images:** No stock photos. All visual placeholders (`.viz-panel`) are CSS-drawn grid/blueprint-style panels — replace these with real screenshots or photos when available.
- **Responsive breakpoints:** 1024px (tablet), 768px (mobile nav switches to a slide-in drawer), 480px (small phones).

## Known placeholders to update before going live

- **Phone number** — currently reads "Available on request via email" on `index.html` and `contact.html`. Replace with a real number if you have one.
- **Social links** (`href="#"`) in the footer and contact page — point these to real LinkedIn/GitHub/Twitter profiles.
- **Project case studies** — `projects.html` has 6 cards; 3 are real (Attendance System, Volunteer Platform, Analytics Dashboard) and 3 are generic placeholders (Inventory Tracker, Booking Platform, Local Marketplace). Swap placeholder ones out as real projects become available, or remove them.
- **Contact form** — the forms are front-end only (no backend). They validate input and show a success message, but don't actually send anywhere yet. Wire up a backend (e.g. Formspree, a serverless function, or your own API) before relying on them.

## Browser support

Built with standard CSS (Grid, custom properties, `aspect-ratio`) and vanilla JS (`IntersectionObserver`). Works in all current versions of Chrome, Firefox, Safari, and Edge. No IE11 support.
