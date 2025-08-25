```md
# Sharon Gacheri – Multipage Portfolio

A responsive, accessible, and interactive portfolio built with semantic HTML5, modern CSS, and vanilla JavaScript.

## Purpose
Showcase skills, projects, and contact information with real‑time widgets and a clean UX.

## Pages
- **Home** (`index.html`): Hero, highlights, live clock & weather, featured projects.
- **About** (`about.html`): Bio, timeline, skills with progress.
- **Projects** (`projects.html`): Filterable project grid.
- **Contact** (`contact.html`): Accessible form with custom JS validation.


## Features
- Mobile‑first, responsive layout (Grid & Flex).
- Accessible landmarks, skip link, focusable controls.
- Dark/Light theme with persistence.
- IntersectionObserver reveal animations.
- Filterable projects (no frameworks).
- Real‑time clock & weather (OpenWeatherMap API).

## Setup
1. Clone or download this repo.
2. Replace images in `/images/` with your own.
3. In `js/script.js`, set your OpenWeatherMap key: `REPLACE_WITH_YOUR_OPENWEATHER_KEY`.
4. Open `index.html` in a browser.

## Deploy
### GitHub Pages
1. Push to a GitHub repo.
2. Settings → Pages → Source: **Deploy from a branch** (e.g., `main` / root).
3. Open the provided URL.

### Netlify
- Drag & drop the project folder to https://app.netlify.com/drop or connect your Git repo.

### Vercel
- `Import Project` from Git and deploy. Ensure `index.html` at root.

## License
MIT
```

---

### Notes
- Replace placeholder links and images with real ones.
- For weather, create a free API key at OpenWeatherMap and insert it in `main.js`.
- Validate HTML/CSS via W3C validators and test across devices.