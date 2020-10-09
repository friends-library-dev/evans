// @ts-check
const { getTailwindConfig } = require(`@friends-library/theme`);

const lang = process.env.GATSBY_LANG === `es` ? `es` : `en`;

module.exports = {
  ...getTailwindConfig(lang),
  purge: {
    printRejected: true,
    enabled: process.env.ANALYZE_BUNDLE_SIZE !== `true`,
    content: [`./src/**/*.{ts,tsx}`],
  },
};
