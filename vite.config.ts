import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import Icons from "unplugin-icons/vite";
import version from "vite-plugin-package-version";
import basicSsl from "@vitejs/plugin-basic-ssl";
import Unfonts from "unplugin-fonts/vite";

export default defineConfig({
  plugins: [
    sveltekit(),
    enhancedImages(),
    Icons({
      compiler: "svelte",
    }),
    version(),
    basicSsl({
      certDir: "~",
    }),
    Unfonts({
      custom: {
        families: [
          {
            name: "BigNoodleTitling",
            local: "BigNoodleTitling",
            src: "./src/assets/fonts/*.ttf",
            transform(font) {
              return font;
            },
          },
        ],
        display: "auto",
        preload: true,
        prefetch: false,
        injectTo: "head-prepend",
      },
    }),
  ],
  server: {
    proxy: {},
  },
});
