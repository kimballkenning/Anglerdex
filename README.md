# Anglerdex — local recreation (no images)

A complete local recreation of the **app.theanglerdex.com** frontend — the
pocket fishing journal single-page app — with all imagery removed.

Everything in the original app is reproduced (structure, styling, themes,
navigation, auth flow, onboarding tour, explore/collection/catch screens,
search, filters, pagination, units, density layouts, settings, and the
Retro/Unedited photo display effect). The only differences are where images
lived:

| Original | In this recreation |
|---|---|
| Pixel-art sprite code (`art.js`, `catalog-art.js`, `grayling-art.js`, `bass-art.js`) | `art.js` draws a neutral, theme-aware "image" placeholder glyph on every sprite canvas |
| `/sprites/*.png` supplied artwork loader (`drawSuppliedSpecies`) | removed; those species get the placeholder too |
| Canvas sturgeon logo mark (`drawLogoMark`) | removed; the header shows the text wordmark with its `[F]` CSS fallback mark |
| `/backgrounds/freshwater.webp` / `saltwater.webp` water-scene backgrounds in `app.css` | removed; the framed water-scene box remains |
| User-uploaded catch photos | **kept** — `paintPhoto` is unchanged (Retro/Unedited is a feature that operates on your own photos) |

## Files

- `index.html` — app shell (header, nav, footer, settings/onboarding dialogs)
- `app.js` — full application logic (screens, routing, state, event handling)
- `art.js` — placeholder sprite renderers + original `paintPhoto`
- `api.js` — API client (`https://api.theanglerdex.com`), auth, unit conversion
- `species.js` — offline fallback species catalog (5 species)
- `themes.js` — the 8 display palettes
- `app.css`, `connected.css`, `themes.css` — original styles

## Run it

Any static file server works:

```sh
python3 -m http.server 8080
# open http://localhost:8080
```

## Backend connectivity

`app.js` talks to the real backend at `https://api.theanglerdex.com`.
The API enforces an origin allowlist and currently answers unknown origins
with `403 "Origin is not allowed"`, so from `localhost`:

- **Explore** works fully offline (local fallback catalog, search, filters,
  themes, onboarding tour).
- Sign-in / catches / the remote species list will not succeed until you
  add your dev origin to the API's CORS allowlist, or change `API` at the
  top of `api.js` to point at a backend that accepts your origin.
