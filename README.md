# Andrés Alvarez Portfolio — Personality and Interaction Polish (v25)

## Navigation improvements
- Header: Work, About and CV; the branded logo links home.
- Home: View selected work is the primary action; Game UI is a secondary route.
- Work: four filters (All, UX/UI, Game UI, 3D), visible result count and a focused Game UI link near the introduction.
- Project cards: explicit action labels; Yoolmi carries an In progress badge.
- Long project pages: sticky section shortcuts, a mobile Jump to section menu and current-section indication.
- Project endings: a named next project plus an All projects link.
- All changes have Spanish counterparts. Update shared CSS and JavaScript alongside the HTML.

A buildless, bilingual HTML/CSS/JavaScript site for the existing AndyAADesignPortfolio GitHub Pages repository.

## What changed
- Homepage: visual introduction, Yoolmi, Lobster Loader, Monster Route and Xapontic featured together.
- game-ui.html: focused UI and interaction selection for applications.
- yoolmi.html: current Figma screens, project context, contribution, research questions and work-in-progress status.
- monster-route.html: curated menu, HUD and four results mockups, with limitations and next iteration notes.
- Matching Spanish pages under es/.
- Work filters, navigation and sitemap updated. Existing case studies, 3D work and CV retained.
- Original screenshot exports were not redesigned. Empty Monster Route options, pause and credits screens are omitted from the curated selection.

## Preview
Open index.html in a browser after extracting the whole archive. A local static server is also supported; there is no install or build step.

## Publish to your existing GitHub Pages site
1. Open your andyaadesign/AndyAADesignPortfolio repository.
2. Upload the CONTENTS of this folder to the repository's existing publishing source, preserving the assets/ and es/ folders.
3. Include all new HTML pages and assets/css/portfolio-ui.css; replace matching existing files.
4. Commit the update. Keep the repository's current GitHub Pages settings.
5. Once the deployment succeeds, check the home, game-ui.html, yoolmi.html and monster-route.html pages, including the language switch.

This archive has not been published automatically.

## Languages
English pages live at the root; manually translated Spanish counterparts live under es/.
Each language link goes to the same page in the other language. No translation service or data-en/data-es attributes are used.

## Content and credits
- Yoolmi is ongoing work. Research questions and intended testing are not presented as completed research or measured outcomes.
- Yoolmi screenshots are exported design states from the provided Figma file. Their metrics and form values are mock UI content, not actual product analytics.
- Monster Route is shown as UI mockups, without claims that these exact designs are implemented in-engine.
- The work credits UX/UI and production roles while identifying team artwork. Confirm any more detailed icon/illustration authorship before adding individual art claims.
- 103 Lobster Loader responses means submitted playtest responses, not a claim of 103 unique participants.
- The existing CV and older case-study content were retained; review the CV separately if you need a different application version.
- No new claims of shader authoring, advanced Unreal implementation or animation expertise were added.

## Maintenance
Shared baseline styles: assets/css/styles.css.
New UI presentation styles: assets/css/portfolio-ui.css.
Navigation, filters and image viewer: assets/js/site.js.
New images: assets/images/yoolmi/current-*.webp and assets/images/monster-route/ui-*.webp.

## v24 update

- Yoolmi and Xapontic lead the homepage and Work gallery.
- Both case studies open with screens, role, challenge and current status.
- Yoolmi connects assumptions to proposed research and possible design changes; findings are not invented.
- Xapontic documents five ordering steps with annotated screenshots.
- English and Spanish updated; Game UI application route retained.
- Static files for deployment; no live-site publishing performed.

## v25 update

- About copy connects games QA to the proposed Yoolmi login recovery state, in English and Spanish.
- Subtle card lift, consistent hover feedback and keyboard focus; reduced-motion support.
- Pending: Yoolmi interaction demo, awaiting Andy’s work. No demo added in this version.
