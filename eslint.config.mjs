import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * ESLint configuration with enhanced rules for better code quality
 */
const eslintConfig = [
  // Extend base configurations
  ...compat.extends(
    "next/core-web-vitals", 
    "next/typescript", 
    "plugin:prettier/recommended"
  ),
  
  // Custom rules
  {
    rules: {
      // Prevent unused variables and imports
      "no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_", 
        "varsIgnorePattern": "^_" 
      }],
      
      // Enforce consistent imports
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
            "type"
          ],
          "newlines-between": "always",
          "alphabetize": { "order": "asc", "caseInsensitive": true }
        }
      ],
      
      // React specific rules
      "react/prop-types": "off", // Using TypeScript instead
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      
      // Enforce consistent JSX quotes
      "jsx-quotes": ["error", "prefer-double"],
      
      // Accessibility rules
      "jsx-a11y/alt-text": ["warn", { "elements": ["img"] }],
      "jsx-a11y/aria-props": "warn",
      
      // TypeScript specific rules
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_", 
        "varsIgnorePattern": "^_" 
      }],
    }
  }
];

export default eslintConfig;
