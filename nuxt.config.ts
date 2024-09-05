export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      mapbox_access_token: process.env.MAPBOX_ACCESS_TOKEN,
      iss_position_url: process.env.ISS_POSITION_URL,
      iss_sun_url: process.env.ISS_SUN_URL,
      update_wait: process.env.UPDATE_WAIT
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
