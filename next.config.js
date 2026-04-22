/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      new URL("https://github.com/**"),
      new URL("https://s.pinimg.com/**"),
      new URL("https://cdn.dribbble.com/**"),
      new URL("https://alignui.com/**"),
    ],
  },
};

export default config;
