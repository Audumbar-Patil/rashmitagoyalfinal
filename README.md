Mis Pintas — Static Clone
=========================

This repository contains a static, responsive clone of the Mis Pintas homepage (for personal/demo use). It is implemented using plain HTML, CSS, and a sprinkle of JavaScript so it can be hosted on GitHub Pages without a build step.

Important: This is an educational/portfolio clone and is not affiliated with the original brand. All brand names and testimonials are used as sample content.

Project structure
-----------------

- `index.html` — single-page layout with sections (hero, services, features, founder, testimonials, blog, CTA, footer)
- `404.html` — custom not-found page (used by GitHub Pages)
- `assets/css/styles.css` — base styles, responsive grid, components
- `assets/js/main.js` — mobile navigation and smooth scrolling
- `.nojekyll` — disables Jekyll processing on GitHub Pages

Local preview
-------------

You can use any static server or simply open `index.html` in your browser. For a local server:

```bash
# Python 3
python -m http.server 8080
# then visit http://localhost:8080
```

Deploying to GitHub Pages
-------------------------

Option A — User/Org Pages (recommended for a personal site)

1. Create a new public repository named `<your-username>.github.io`.
2. Add all files from this project to the repository root and push to the `main` branch.
3. Pages will auto-publish at `https://<your-username>.github.io/`.

Option B — Project Pages (repo can have any name)

1. Create a public repository (any name).
2. Push this project to the `main` branch.
3. In GitHub → Settings → Pages:
   - Source: Deploy from a branch
   - Branch: `main` / folder: `/ (root)`
4. Your site will be available at `https://<your-username>.github.io/<repo-name>/`.

Custom domain (optional)
------------------------

1. Buy/point a domain to GitHub Pages following the official docs.
2. In your repo root, create a `CNAME` file containing only your domain, e.g.:

```
example.com
```

3. Configure DNS with a `CNAME` to `<your-username>.github.io`.

Notes
-----

- If your project is published to a subpath (Project Pages), make sure any absolute links use relative paths or the repo subpath. The included links are relative-safe.
- The email in the "Book Service" CTA is a placeholder. Update `mailto:` in `index.html` to your email.
- You can customize colors and spacing in `assets/css/styles.css` via the `:root` CSS variables.

License
-------

This project code is MIT licensed. The brand content it references belongs to their respective owners and is used here for educational/demo purposes only.


