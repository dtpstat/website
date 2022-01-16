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
      files: ["**/inherited/**"],
      rules: {
        "@typescript-eslint/naming-convention": "off",
        "func-style": "off",
        "import/no-default-export": "off",
        "unicorn/file-case": "off",
      },
    },
  ],
};
