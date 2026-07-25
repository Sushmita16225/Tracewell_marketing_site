/* =========================================================
   Shared site chrome, implemented as Web Components.
   Editing NAV_LINKS or FOOTER_COLUMNS is the only thing a
   content editor needs to touch to add/rename a page — no
   HTML is duplicated or hand-edited across the four pages.
   ========================================================= */
(function () {
  "use strict";

  const NAV_LINKS = [
    { label: "Home", href: "index.html", id: "home" },
    { label: "Product", href: "product.html", id: "product" },
    { label: "Pricing", href: "pricing.html", id: "pricing" },
    { label: "Contact", href: "contact.html", id: "contact" },
  ];

  const FOOTER_COLUMNS = [
    {
      title: "Product",
      links: [
        { label: "Overview", href: "product.html" },
        { label: "Pricing", href: "pricing.html" },
        { label: "Changelog", href: "product.html#changelog" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Contact sales", href: "contact.html" },
        { label: "Status page", href: "contact.html" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Docs", href: "product.html#integrations" },
        { label: "FAQ", href: "pricing.html#faq" },
      ],
    },
  ];

  const BRAND_MARK = `
    <svg class="brand__mark" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="6" fill="#14181B"/>
      <rect x="6" y="9" width="9" height="3" rx="1.5" fill="#0EA5A0"/>
      <rect x="6" y="14" width="16" height="3" rx="1.5" fill="#F2A93B"/>
      <rect x="6" y="19" width="6" height="3" rx="1.5" fill="#0EA5A0"/>
    </svg>`;

  function currentPageId() {
    const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    const match = NAV_LINKS.find((l) => l.href === file || (file === "" && l.id === "home"));
    return match ? match.id : "home";
  }

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      const current = this.getAttribute("current") || currentPageId();
      const navItems = NAV_LINKS.map(
        (l) => `<li><a href="${l.href}" ${l.id === current ? 'aria-current="page"' : ""}>${l.label}</a></li>`
      ).join("");

      this.innerHTML = `
        <div class="site-header">
          <div class="container site-header__bar">
            <a class="brand" href="index.html">
              ${BRAND_MARK}
              <span>Tracewell</span>
            </a>
            <nav class="primary-nav" id="primary-nav" data-open="false" aria-label="Primary">
              <ul class="primary-nav__list">${navItems}</ul>
            </nav>
            <div class="site-header__actions">
              <a class="btn btn--ghost btn--small" href="contact.html">Contact sales</a>
              <a class="btn btn--primary btn--small" href="pricing.html">Start free trial</a>
              <button class="nav-toggle" type="button" aria-controls="primary-nav" aria-expanded="false" aria-label="Open menu">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M2 4.5H16M2 9H16M2 13.5H16" stroke="#14181B" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>`;

      const toggle = this.querySelector(".nav-toggle");
      const nav = this.querySelector("#primary-nav");
      toggle.addEventListener("click", () => {
        const isOpen = nav.getAttribute("data-open") === "true";
        nav.setAttribute("data-open", String(!isOpen));
        toggle.setAttribute("aria-expanded", String(!isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
      });

      // Collapse the mobile menu again once the viewport grows past the breakpoint.
      const mq = window.matchMedia("(min-width: 761px)");
      mq.addEventListener("change", (e) => {
        if (e.matches) {
          nav.setAttribute("data-open", "false");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      const columns = FOOTER_COLUMNS.map(
        (col) => `
          <div>
            <h2>${col.title}</h2>
            <ul>${col.links.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("")}</ul>
          </div>`
      ).join("");

      this.innerHTML = `
        <footer class="site-footer">
          <div class="container">
            <div class="site-footer__grid">
              <div>
                <a class="brand" href="index.html" style="margin-bottom:14px;">
                  ${BRAND_MARK}
                  <span>Tracewell</span>
                </a>
                <p style="max-width:32ch;">Distributed tracing built for backend teams who ship fast and can't afford blind spots.</p>
              </div>
              ${columns}
            </div>
            <div class="site-footer__bottom">
              <p>&copy; ${new Date().getFullYear()} Tracewell, Inc. All rights reserved.</p>
              <p class="site-footer__credit">Built for Digital Heroes Training Task &middot; <a href="https://digitalheroesco.com">digitalheroesco.com</a></p>
            </div>
          </div>
        </footer>`;
    }
  }

  customElements.define("site-header", SiteHeader);
  customElements.define("site-footer", SiteFooter);
})();
