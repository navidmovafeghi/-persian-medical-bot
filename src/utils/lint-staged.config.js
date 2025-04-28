module.exports = {
  // Run ESLint on JavaScript and TypeScript files
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix'],
  
  // Run Prettier on all relevant files
  '**/*.{js,jsx,ts,tsx,json,md,mdx,css,html,yml,yaml,scss,sass}': [
    'prettier --write'
  ],
}; 