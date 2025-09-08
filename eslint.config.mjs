import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintPluginJest from "eslint-plugin-jest";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["**/*.test.js"],
    plugins: { jest: eslintPluginJest },
    languageOptions: { globals: eslintPluginJest.environments.globals.globals },
    rules: { ...eslintPluginJest.configs.recommended.rules },
  },
]);
