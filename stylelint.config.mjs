/** @type {import("stylelint").Config} */
export default {
  plugins: ['stylelint-selector-bem-pattern'],
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  rules: {
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]*$',
    'selector-id-pattern': '^[a-z][a-zA-Z0-9]*$',
  },
};
