/** @typedef {import("prettier").Config} PrettierConfig */

/** @type {PrettierConfig } */
const config = {
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  useTabs: false,
  singleQuote: false,
  bracketSameLine: false,
  arrowParens: "always",
  trailingComma: "all",
  endOfLine: "lf",
};

module.exports = config;
