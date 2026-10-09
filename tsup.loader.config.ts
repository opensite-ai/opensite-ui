import { defineConfig } from "tsup";
import { sharedConfig } from "./tsup.config";

export default defineConfig({
  ...sharedConfig,
  entry: {
    "registry/loader": "src/registry/block-loader.ts",
  },
  format: ["esm"],
  splitting: true,
  clean: false,
});