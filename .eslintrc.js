module.exports = {
  extends: ["@kachkaev/eslint-config-react", "plugin:@next/next/recommended"],
  rules: {
    "@next/next/no-img-element": "off",
    "import/no-default-export": "error",
    "func-style": "off",
    "@typescript-eslint/naming-convention": "off",
    "import/no-default-export": "off",
  },
  overrides: [
    {
      files: ["src/pages/**"],
      rules: {
        "import/no-default-export": "off",
        "@typescript-eslint/naming-convention": "off",
        "import/no-default-export": "off",
      },
    },
  ],
};
