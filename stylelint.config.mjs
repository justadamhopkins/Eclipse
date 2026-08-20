/** @type {import("stylelint").Config} */
export default {
  plugins: ['stylelint-selector-bem-pattern'],
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  rules: {
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]*$',
    'selector-id-pattern': '^[a-z][a-zA-Z0-9]*$',
  },
  overrides: [
    {
      // Global stylesheets hold utility classes, which are kebab/BEM named
      // rather than the camelCase that CSS Modules require.
      files: ['frontend/src/styles/**/*.css'],
      rules: {
        'selector-class-pattern': '^[a-z][a-zA-Z0-9]*(-{1,2}[a-z0-9]+)*$',
      },
    },
  ],
};
