module.exports = {
  extends: ["@kachkaev/eslint-config-react", "plugin:@next/next/recommended"],
  rules: {
    "@next/next/no-img-element": "off",
    "import/no-default-export": "error",
    "func-style": "off",
  },
  overrides: [
    {
      files: ["src/pages/**"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
