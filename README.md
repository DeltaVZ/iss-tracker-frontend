# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Then create an `.env` file and insert the following env variables:

```
MAPBOX_ACCESS_TOKEN=pk.fakeaccesstoken
ISS_POSITION_URL=http://localhost:8000/iss/position
ISS_SUN_URL=http://localhost:8000/iss/sun
UPDATE_WAIT=20000
```

The first is the mapbox access token, while the others are the endpoints for getting the ISS' live position, the ISS' daylight time windows and the amount of seconds to wait between requests for the position and time windows


## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
