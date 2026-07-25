# Tracewell marketing site

Static site, no build step and no framework — 4 pages that share a header/footer
via two Web Components (`assets/components.js`), so adding or renaming a nav
link means editing one array, not four HTML files.

## Structure
- `index.html`, `product.html`, `pricing.html`, `contact.html`
- `assets/styles.css` — all design tokens and layout
- `assets/components.js` — `<site-header>` / `<site-footer>`, nav + footer link data in one place
- `assets/main.js` — contact form validation/feedback (no backend; static demo)
