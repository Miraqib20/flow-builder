import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),

  {
    files: ["**/*.{ts,tsx}"],

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },

    rules: {
      /* ✅ React + TS Practical Rules */

      // ReactFlow passes unused params often
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" }
      ],

      // Allow console during development
      "no-console": "off",

      // Zustand pattern friendly
      "@typescript-eslint/no-explicit-any": "off",

      // Prevent accidental infinite hooks loops
      "react-hooks/exhaustive-deps": "warn",

      // Vite fast refresh rule
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ],
    },
  },
]);