# Tracewell marketing site

Static site, no build step and no framework — 4 pages that share a header/footer
via two Web Components (`assets/components.js`), so adding or renaming a nav
link means editing one array, not four HTML files.

## Structure
- `index.html`, `product.html`, `pricing.html`, `contact.html`
- `assets/styles.css` — all design tokens and layout
- `assets/components.js` — `<site-header>` / `<site-footer>`, nav + footer link data in one place
- `assets/main.js` — contact form validation/feedback (no backend; static demo)

## What's already in place for the scoring criteria
- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `<h1>` per page, logical heading order, skip link, visible focus states, keyboard-operable mobile menu and FAQ (native `<details>`).
- JSON-LD on every page (`Organization`), plus `Product` on `product.html` and `FAQPage` on `pricing.html` — all validated as parseable JSON.
- Per-page `<title>`, meta description, canonical URL, and Open Graph/Twitter tags.
- No render-blocking heavy JS, no layout-shifting images, system-first font stack with `font-display: swap`, minimal DOM.

## To finish the submission
1. **Push to GitHub**: `git init && git add . && git commit -m "Tracewell marketing site" ` then push to a new public repo.
2. **Deploy** (any of these work with zero config since it's static):
   - Netlify: drag the folder into [app.netlify.com/drop](https://app.netlify.com/drop)
   - Vercel: `vercel` CLI in this folder, or import the GitHub repo
   - GitHub Pages: Settings → Pages → deploy from the `main` branch
3. **Swap placeholder URLs**: replace `https://www.tracewell.example/...` in the `<link rel="canonical">`, `og:url`, and JSON-LD `url` fields with your real deployed URL.
4. **Capture the required evidence** once it's live:
   - Run [PageSpeed Insights](https://pagespeed.web.dev/) on the mobile tab for the deployed URL and screenshot the Core Web Vitals result.
   - Run Lighthouse (Chrome DevTools → Lighthouse → Mobile) and export the report.
   - Test structured data at [Google's Rich Results Test](https://search.google.com/test/rich-results) using your live URL.
