export default {
  '*.{mjs,js,jsx,ts,mts,tsx,css}': ['prettier --write', 'eslint --cache --fix'],
  '*.{css}': ['prettier --write', 'stylelint --fix'],
  '*.{json,md}': ['prettier --write'],
};
