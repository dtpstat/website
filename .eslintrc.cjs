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
      files: ["src/components/inherited-map/**/*.js"],
      env: {
        browser: true,
      },
    },
    {
      files: ["src/components/inherited-map/**"],
      rules: {
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "func-style": "off",
        "id-length": "off",
        "no-param-reassign": "off",
        "unicorn/consistent-destructuring": "off",
        "unicorn/consistent-function-scoping": "off",
        "unicorn/no-array-callback-reference": "off",
        "unicorn/no-array-for-each": "off",
        "unicorn/no-null": "off",
      },
    },
  ],
};
