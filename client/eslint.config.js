import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": "error",
      "no-unused-vars": "warn",
      "no-console": "warn",
      "no-debugger": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "warn", // types de retour non déclarés
      "@typescript-eslint/no-explicit-any": "error", // any utilisé comme type
      "@typescript-eslint/no-unused-vars": "warn", // variables non utilisées
      "@typescript-eslint/no-non-null-assertion": "error", // opérateur '!' utilisé
      "@typescript-eslint/no-empty-function": "warn", // fonctions vides
      "@typescript-eslint/no-floating-promises": "error", // promesses non traitées
      "@typescript-eslint/no-misused-promises": "error", // Erreur si mauvaise utilisation des promesses
      "@typescript-eslint/no-var-requires": "warn", //import plutot que require
    },
  }
);
