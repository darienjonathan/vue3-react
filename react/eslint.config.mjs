import tseslint from "typescript-eslint";
import eslintjs from "@eslint/js";

import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import path from "path";

import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default tseslint.config(
  eslintjs.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends("plugin:react-hooks/recommended"),
  {
    ignores: ["dist"],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      "react-refresh": eslintPluginReactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  eslintConfigPrettier
);
