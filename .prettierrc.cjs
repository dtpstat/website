module.exports = {
  trailingComma: "all",

  plugins: [
    require("prettier-plugin-packagejson"),
    require("prettier-plugin-prisma"),
    require("prettier-plugin-sh"),
  ],
};
