import "./src/env.js";

const config = {
  images: {
    remotePatterns: [
      new URL("https://github.com/**"),
      new URL("https://s.pinimg.com/**"),
      new URL("https://cdn.dribbble.com/**"),
      new URL("https://alignui.com/**"),
      // new URL("https://cdn.discordapp.com/**"),
      {
        protocol: "https",
        hostname: "mm.acidintegrations.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/avatars/**",
      },
    ],
  },
};

export default config;
