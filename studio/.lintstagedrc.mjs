export default {
  '*.{mjs,js,jsx,ts,mts,tsx,css}': ['prettier --write', 'eslint --cache --fix'],
  '*.{json,md}': ['prettier --write'],
};
