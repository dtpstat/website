module.exports = {
  extends: [
    "@kachkaev/eslint-config-react",
    "@kachkaev/eslint-config-react/extra-type-checking",
    "plugin:@next/next/recommended",
  ],
  rules: {
    "@next/next/no-img-element": "off",
  },
  overrides: [
    {
      files: ["*.config.{,c,m}js"],
      env: {
        node: true,
      },
    },
  ],
};
