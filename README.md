# auth0-sveltekit-edge-issue

Stub repository for investigating edge issue when using `@auth0/nextjs-auth0`.

Create a local `.dev.vars` file containing the necessary environment variables.

```
AUTH0_SECRET=<someverylongrandomstring>
APP_URL=http://localhost:5173
AUTH0_CLIENT_ID=<auth0 application client ID>
AUTH0_CLIENT_SECRET=<auth0 application client secret>
AUTH0_DOMAIN=<auth0 application domain>
```

Install dependencies with `npm install` (or `pnpm install` or `yarn`) and start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

`npm run build`

```text
> sveltekit-auth0-edge-issue@0.0.1 build
> vite build

vite v5.2.11 building SSR bundle for production...
"confetti" is imported from external module "@neoconfetti/svelte" but never used in "src/routes/sverdle/+page.svelte".
✓ 110 modules transformed.

/opt/buildhome/auth0-sveltekit-edge-issue/node_modules/wrangler/wrangler-dist/cli.js:29749
            throw a;
            ^
Error [ERR_REQUIRE_ESM]: require() of ES Module /opt/buildhome/auth0-sveltekit-edge-issue/node_modules/oauth4webapi/build/index.js from /opt/buildhome/auth0-sveltekit-edge-issue/node_modules/@auth0/nextjs-auth0/dist/auth0-session/client/edge-client.js not supported.
Instead change the require of index.js in /opt/buildhome/auth0-sveltekit-edge-issue/node_modules/@auth0/nextjs-auth0/dist/auth0-session/client/edge-client.js to a dynamic import() which is available in all CommonJS modules.
    at Object.<anonymous> (/opt/buildhome/auth0-sveltekit-edge-issue/node_modules/@auth0/nextjs-auth0/dist/auth0-session/client/edge-client.js:5:36)
Emitted 'error' event on Worker instance at:
    at [kOnErrorMessage] (node:internal/worker:326:10)
    at [kOnMessage] (node:internal/worker:337:37)
    at MessagePort.<anonymous> (node:internal/worker:232:57)
    at [nodejs.internal.kHybridDispatch] (node:internal/event_target:814:20)
    at exports.emitMessage (node:internal/per_context/messageport:23:28) {
  code: 'ERR_REQUIRE_ESM'
}

Node.js v20.10.0
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
