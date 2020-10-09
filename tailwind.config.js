// @ts-check
const { getTailwindConfig } = require(`@friends-library/theme`);

const lang = process.env.GATSBY_LANG === `es` ? `es` : `en`;

module.exports = {
  ...getTailwindConfig(lang),
  purge: [`./src/**/*.tsx`],
};
