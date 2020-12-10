import fs from 'fs-extra';
import { GatsbyNode } from 'gatsby';
import env from '@friends-library/env';
import { eachEdition } from '@friends-library/friends/query';
import { podcast } from '../lib/xml';
import { sendSearchDataToAlgolia } from './algolia';
import { LANG } from '../env';

const onPostBuild: GatsbyNode['onPostBuild'] = async () => {
  eachEdition(async ({ friend, document, edition }) => {
    if (friend.lang === LANG && edition.audio) {
      const xmlHq = await podcast(document, edition, `HQ`);
      fs.outputFileSync(`./public/${edition.audio.podcastRelFilepath(`HQ`)}`, xmlHq);
      const xmlLq = await podcast(document, edition, `LQ`);
      fs.outputFileSync(`./public/${edition.audio.podcastRelFilepath(`LQ`)}`, xmlLq);
    }
  });

  const { GATSBY_NETLIFY_CONTEXT, DEPLOYING } = env.get(
    `GATSBY_NETLIFY_CONTEXT`,
    `DEPLOYING`,
  );
  if (DEPLOYING && GATSBY_NETLIFY_CONTEXT === `production`) {
    await sendSearchDataToAlgolia();
  }
};

export default onPostBuild;
