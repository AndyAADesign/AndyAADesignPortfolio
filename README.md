# Andrés Álvarez Portfolio — GitHub Pages v2

This folder is ready to be used as the root of a GitHub Pages repository.

## Pages
- `index.html` — Home
- `work.html` — Work hub / expandable project index
- `xapontic.html` — Xapontic case study
- `lobster-loader.html` — Lobster Loader case study
- `3d-work.html` — Selected 3D work
- `about.html` — About + contact

## Bilingual toggle
The EN / ES buttons are manual translations, not Google Translate. The choice is saved in the visitor's browser with `localStorage`, so the same language persists between pages.

To translate future text, add both attributes to the element:

```html
<p data-en="English copy" data-es="Texto en español">English copy</p>
```

The JavaScript in `assets/js/site.js` handles the switch automatically.

## Publish / update
1. Unzip this folder.
2. Open your `theDIVIDERyt.github.io` repository.
3. Replace the existing site files with the CONTENTS of this folder (do not upload the outer folder itself).
4. Commit to `main` and push.
5. GitHub Pages will redeploy automatically.

## Before final launch polish
- Replace `assets/docs/andres-alvarez-cv.pdf` with the exact CV you want public.
- Add your preferred email and LinkedIn to `about.html` and/or `index.html` when ready.
- New case studies can be added as new `.html` files and linked from `work.html`.
- Current/in-progress work can stay on `work.html` without needing a full case study.
