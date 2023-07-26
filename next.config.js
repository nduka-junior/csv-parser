/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_KEY: "AIzaSyCMyt5tkzFBF4qfYr_wV231-Ql4UiBtSIc",
    AUTH_DOMAIN: "attendx-5b2a9.firebaseapp.com",
    PROJECT_ID: "attendx-5b2a9",
    STORAGE_BUCKET: "attendx-5b2a9.appspot.com",
    MESSAGING_SENDER_ID: "839794535538",
    APP_ID: "1:839794535538:web:28177800478b44af48e6eb",
  },
};

module.exports = nextConfig;
