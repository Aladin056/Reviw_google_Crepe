# Copilot Instructions for spin-review

- This is a minimal React + Vite SPA scaffold. The app entrypoint is `src/main.jsx`, which renders `<App />` inside `StrictMode`.
- The primary UI lives in `src/App.jsx`; expect component logic, asset imports, and layout to be maintained there.
- Styling is imported from `src/App.css` and `src/index.css`. `src/assets/` contains image assets used directly in JSX imports.
- Vite configuration is simple: `vite.config.js` only enables `@vitejs/plugin-react`. No SSR or custom server behavior is present.
- The repo uses ESM (`type: module` in `package.json`), so imports and config files should follow standard ES module syntax.

## Commands
- `npm run dev` - start Vite development server with HMR.
- `npm run build` - create production bundles via Vite.
- `npm run preview` - preview the production build locally.
- `npm run lint` - validate JS/JSX with `eslint` using `eslint.config.js`.

## Key patterns
- Asset import: `import heroImg from './assets/hero.png'` and use as `src={heroImg}`.
- Public root assets can be referenced by absolute path, e.g. `/icons.svg` inside JSX.
- React hooks are used directly in `src/App.jsx`; follow the `react-hooks` lint rules already configured.

## What to avoid
- Do not introduce a custom backend or server framework; this project is purely a frontend Vite app.
- There are currently no test frameworks configured in `package.json`.
- Keep configuration changes scoped to `vite.config.js`, `package.json`, or `eslint.config.js` unless adding a real app feature.

## Useful files
- `package.json` - scripts, React/Vite dependencies, ESM mode.
- `src/main.jsx` - render bootstrap.
- `src/App.jsx` - main component and application behavior.
- `vite.config.js` - build tool plugin setup.
- `eslint.config.js` - lint rules and browser globals.
