# nikhil.dev — personal portfolio (v3)

Plain HTML, CSS and JavaScript. No framework, no build step, no libraries — even the 3D blob is hand-written WebGL.

```
index.html        Home
relayforge.html   RelayForge case study
css/style.css     All styles
js/main.js        All behaviour + CONFIG (your links)
assets/           Résumé PDF, screenshots
```

## Before publishing
Open `js/main.js` and fill in `CONFIG` (email, LinkedIn, LeetCode, résumé, repo/demo links).
Empty links show as disabled instead of breaking. In `relayforge.html`, write the problem and
trade-offs in your own words.

## Effects (and how to explain them)
| Effect | How it works |
|---|---|
| Preloader | Counts 0→100 with an ease-out curve, then a `clip-path` curtain lifts. Shown once per session. |
| Liquid blob | Raw WebGL fragment shader: ray-marches a sphere whose surface is displaced by layered sine noise; colour comes from the Fresnel angle. Follows the mouse, zooms out on scroll, pauses off-screen. |
| Kinetic name | Variable font **Anybody** (width + weight axes). Each frame, letters near the cursor get wider and thinner (`font-variation-settings`). |
| Difference blend | The hero name uses `mix-blend-mode: difference`, so it inverts over the blob. |
| Custom cursor | Dot follows the mouse with linear interpolation; grows over links and shows a label on `[data-cursor]` elements. Hidden on touch screens. |
| Word-by-word reveal | The About paragraph is split into words; scroll progress decides how many are lit. |
| Velocity marquee | Base speed + scroll velocity; it also skews in the scroll direction. |
| Pinned horizontal gallery | Section height = track width; a sticky inner box translates the track by scroll progress. Stacks vertically on phones. |
| Tone flip | Each section declares `data-tone`; the body swaps dark ⇄ light CSS variables when a section reaches mid-screen. |
| Hover preview | Hovering a row shows a floating card that trails the cursor and tilts with its speed. |
| Text scramble | Links shuffle through random glyphs before settling. |
| Live clock | `Intl.DateTimeFormat` with `Asia/Kolkata`. |

All motion is turned off when the visitor's OS has "reduce motion" enabled.

## Run locally
Double-click `index.html`, or `python -m http.server 8000`.

## Deploy free (GitHub Pages)
1. Create a repo named `nick10-05.github.io` and push these files to `main`.
2. Settings → Pages → Deploy from branch → `main` / root.
3. Live at `https://nick10-05.github.io`.
