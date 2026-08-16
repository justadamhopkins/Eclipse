/** @type {import("stylelint").Config} */
export default {
  plugins: ['stylelint-selector-bem-pattern'],
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  rules: {
    'selector-class-pattern': null,
    'plugin/selector-bem-pattern': {
      preset: 'bem',
    },
  },
};
