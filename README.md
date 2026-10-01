# Chelsea Hong — portfolio

Portfolio of Chelsea Hong, Immersive Experience Designer, built as a lab notebook in Vue 3 + Vite.

```bash
npm install
npm run dev      # local dev server
npm run build    # static build → dist/ (works on any static host, uses hash routing)
npm run deploy   # build + publish to https://chelsea-hong.surge.sh
```

The first `npm run deploy` asks you to log in or create a free surge account. To use a different
address, change `chelsea-hong.surge.sh` in the `deploy` script in `package.json`.

## Where things live

- `src/data/projects.js` — **all content** (projects, profile, education). Edit text here.
- `public/media/` — images (converted to WebP from the original Google Site).
- `src/components/demos/` — interactive modules embedded in project pages
  (question deck, Q-card density, cardholder weight, food-truck model, teleport hub, scent array).
- `src/components/SensorField.vue` — interactive hero canvas.

To add a demo to a project, add `{ t: 'demo', name: 'MyDemo' }` to a section and register it in `src/components/Blocks.vue`.
