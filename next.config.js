import "./src/env.js";

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
