import '@friends-library/env/load';
import { GatsbyNode, SourceNodesArgs } from 'gatsby';
import filesize from 'filesize';
import { PrintSize } from '@friends-library/types';
import { allFriends } from '@friends-library/friends/query';
import { price } from '@friends-library/lulu';
import { fetch } from '@friends-library/document-meta';
import { query, hydrate } from '@friends-library/dpc-fs';
import { red } from 'x-chalk';
import { htmlShortTitle, htmlTitle, utf8ShortTitle } from '@friends-library/adoc-utils';
import { allDocsMap, audioDurationStr } from './helpers';
import { getDpcCache, persistDpcCache, EditionCache } from './dpc-cache';
import residences from './residences';
import * as url from '../lib/url';
import { documentDate, periodFromDate, published } from '../lib/date';
import { documentRegion } from '../lib/region';
import { APP_ALT_URL, LANG } from '../env';
import { getNewsFeedItems } from './news-feed';

const humansize = filesize.partial({ round: 0, spacer: `` });

const sourceNodes: GatsbyNode['sourceNodes'] = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}: SourceNodesArgs) => {
  const meta = await fetch();
  const friends = allFriends().filter((f) => f.lang === LANG && f.hasNonDraftDocument);
  const docs = allDocsMap();
  const dpcCache = getDpcCache();

  const newsFeedItems = getNewsFeedItems(allFriends(), meta, LANG);
  newsFeedItems.forEach((feedItem) => {
    createNode({
      ...feedItem,
      id: createNodeId(`feed-item-${feedItem.date}${feedItem.title}${feedItem.url}`),
      internal: {
        type: `NewsFeedItem`,
        contentDigest: createContentDigest(feedItem),
      },
    });
  });

  friends.forEach((friend) => {
    const documents = friend.documents.filter((doc) => doc.hasNonDraftEdition);
    const friendProps = {
      ...friend.toJSON(),
      friendId: friend.id,
      residences: residences(friend.residences),
      url: url.friendUrl(friend),
    };

    createNode({
      ...friendProps,
      id: createNodeId(`friend-${friend.id}`),
      children: documents.map((d) => createNodeId(`document-${d.id}`)),
      internal: {
        type: `Friend`,
        contentDigest: createContentDigest(friendProps),
      },
    });

    documents.forEach((document) => {
      const documentProps: Record<string, any> = {
        ...document.toJSON(),
        htmlTitle: htmlTitle(document.title),
        htmlShortTitle: htmlShortTitle(document.title),
        utf8ShortTitle: utf8ShortTitle(document.title),
        region: documentRegion(document),
        date: documentDate(document),
        period: periodFromDate(documentDate(document)),
        url: url.documentUrl(document),
        authorUrl: url.friendUrl(friend),
        documentId: document.id,
        friendSlug: friend.slug,
        authorName: friend.name,
        ogImageUrl: `https://flp-assets.nyc3.digitaloceanspaces.com/${document.path}/${document.primaryEdition.type}/images/cover-3d--w700.png`,
      };

      if (document.altLanguageId) {
        const altDoc = docs.get(document.altLanguageId);
        if (!altDoc) throw new Error(`Missing alt language doc from ${document.path}`);
        if (altDoc.hasNonDraftEdition) {
          documentProps.altLanguageUrl = `${APP_ALT_URL}${url.documentUrl(altDoc)}`;
        }
      }

      const filteredEditions = document.editions.filter((ed) => !ed.isDraft);
      const editions = filteredEditions.map((edition) => {
        const editionMeta = meta.get(edition.path);
        let printSize: PrintSize = `m`;
        let pages = [175];
        if (editionMeta) {
          printSize = editionMeta.paperback.size;
          pages = editionMeta.paperback.volumes;
        } else {
          red(`Edition meta not found for ${edition.path}`);
          process.exit(1);
        }

        let dpcData: EditionCache = dpcCache.get(edition.path) || {
          initialized: false,
          customCode: { css: {}, html: {} },
        };
        if (!dpcData.initialized) {
          const [dpc] = query.getByPattern(edition.path);
          if (dpc) {
            hydrate.customCode(dpc);
            dpcData = {
              initialized: true,
              customCode: dpc.customCode,
            };
            dpcCache.set(edition.path, dpcData);
            persistDpcCache(dpcCache);
          }
        }

        if (edition.audio && !editionMeta.audio) {
          red(`Unexpected missing audio meta data: ${edition.path}`);
        }

        if (!editionMeta.published) {
          red(`Unexpected missing publish date for edition: ${edition.path}`);
          process.exit(1);
        }

        return {
          ...edition.toJSON(),
          ...published(editionMeta.published, LANG),
          friendSlug: friend.slug,
          documentSlug: document.slug,
          printSize,
          pages,
          downloadUrl: {
            web_pdf: url.artifactDownloadUrl(edition, `web-pdf`),
            epub: url.artifactDownloadUrl(edition, `epub`),
            mobi: url.artifactDownloadUrl(edition, `mobi`),
            speech: url.artifactDownloadUrl(edition, `speech`),
          },
          price: price(printSize, pages),
          customCode: dpcData.customCode,
          numChapters: editionMeta.numSections,
          audio: edition.audio
            ? {
                reader: edition.audio.reader,
                added: edition.audio.added.toISOString(),
                complete: edition.audio.complete,
                duration: audioDurationStr(editionMeta.audio?.durations ?? [0]),
                publishedDate: published(edition.audio.added.toISOString(), LANG)
                  .publishedDate,
                parts: edition.audio.parts.map((part) => part.toJSON()),
                m4bFilesizeHq: humansize(editionMeta.audio?.HQ.m4bSize ?? 0),
                m4bFilesizeLq: humansize(editionMeta.audio?.LQ.m4bSize ?? 0),
                mp3ZipFilesizeHq: humansize(editionMeta.audio?.HQ.mp3ZipSize ?? 0),
                mp3ZipFilesizeLq: humansize(editionMeta.audio?.LQ.mp3ZipSize ?? 0),
                m4bUrlHq: url.m4bDownloadUrl(edition.audio, `HQ`),
                m4bUrlLq: url.m4bDownloadUrl(edition.audio, `LQ`),
                mp3ZipUrlHq: url.mp3ZipDownloadUrl(edition.audio, `HQ`),
                mp3ZipUrlLq: url.mp3ZipDownloadUrl(edition.audio, `LQ`),
                podcastUrlHq: url.podcastUrl(edition.audio, `HQ`),
                podcastUrlLq: url.podcastUrl(edition.audio, `LQ`),
                externalPlaylistIdHq: edition.audio.externalPlaylistIdHq || null,
                externalPlaylistIdLq: edition.audio.externalPlaylistIdLq || null,
              }
            : undefined,
        };
      });

      createNode({
        ...documentProps,
        editions,
        id: createNodeId(`document-${document.id}`),
        parent: createNodeId(`friend-${friend.id}`),
        internal: {
          type: `Document`,
          contentDigest: createContentDigest(documentProps),
        },
      });
    });
  });
};

export default sourceNodes;
