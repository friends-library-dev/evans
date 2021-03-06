import { eachEdition } from '@friends-library/friends/query';
import { GatsbyNode, CreateDevServerArgs } from 'gatsby';
import { podcast } from '../lib/xml';

const onCreateDevServer: GatsbyNode['onCreateDevServer'] = ({
  app,
}: CreateDevServerArgs) => {
  eachEdition(({ document, edition }) => {
    if (!edition.audio) {
      return;
    }
    app.get(edition.audio.podcastRelFilepath(`HQ`), async (req: any, res: any) => {
      res.type(`application/xml`);
      res.send(await podcast(document, edition, `HQ`));
    });
    app.get(edition.audio.podcastRelFilepath(`LQ`), async (req: any, res: any) => {
      res.type(`application/xml`);
      res.send(await podcast(document, edition, `LQ`));
    });
  });
};

export default onCreateDevServer;
