module.exports = {
  extends: [
    "@kachkaev/eslint-config-react",
    "@kachkaev/eslint-config-react/extra-type-checking",
    "plugin:@next/next/recommended",
  ],
  rules: {
    "@next/next/no-img-element": "off",
    "unicorn/consistent-function-scoping": "off", // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/392#issuecomment-935931598
    "unicorn/no-useless-undefined": "off", // clashes with unicorn/no-null and React.createContext(undefined)
  },
};
