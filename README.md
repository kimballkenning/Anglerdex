# Anglerdex

The complete source of **[app.theanglerdex.com](https://app.theanglerdex.com)** —
a pocket fishing journal single-page app. Vanilla JS, no build step: open
`index.html` through any static file server.

Recovered from the production deploy on 2026-11-05 (verified byte-identical
to the live site) after the original authoring session was lost.

## Layout

| Path | What it is |
|---|---|
| `index.html` | App shell: header, nav, footer, settings/onboarding dialogs |
| `app.js` | All application logic — screens, routing, state, events, auth flow |
| `api.js` | API client for `https://api.theanglerdex.com` + unit conversions |
| `art.js` | Original pixel-art sprites (trout, clown, tang, sturgeon) + the Retro/Unedited photo effect |
| `catalog-art.js` | Procedural sprite engine for the extended species catalog |
| `grayling-art.js`, `bass-art.js` | Higher-resolution grayling / bass sprite art |
| `species.js` | Offline fallback species catalog (used until the API list loads) |
| `themes.js` | The 8 display palettes |
| `app.css`, `connected.css`, `themes.css` | All styles |
| `sprites/` | Supplied PNG artwork for 16 catalog species |
| `backgrounds/` | Water-scene background photos (freshwater / saltwater) |

## Run locally

```sh
python3 -m http.server 8080
# open http://localhost:8080
```

## Backend connectivity

`app.js` calls the live API at `https://api.theanglerdex.com`. The API
enforces an origin allowlist and currently answers unknown origins with
`403 "Origin is not allowed"`, so from `localhost`:

- **Explore** works fully (the offline fallback catalog loads; the remote
  species list silently falls back).
- Sign-in, catches, and the remote species list require your dev origin to
  be added to the API's CORS allowlist — or point `API` at the top of
  `api.js` at a backend that accepts your origin.

## Deploy

Static site — deploy the repo root to any static host (Cloudflare Pages,
Netlify, GitHub Pages). The live site additionally runs behind Cloudflare
and pairs with the separate `api.theanglerdex.com` backend service.
