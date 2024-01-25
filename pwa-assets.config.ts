import {
  defineConfig,
  minimal2023Preset as preset,
} from "@vite-pwa/assets-generator/config";

const ICON = "public/icon-light.jpg";

export default defineConfig({
  headLinkOptions: { preset: "2023" },
  preset,
  images: [ICON],
});
