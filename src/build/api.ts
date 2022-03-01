import fetch from 'cross-fetch';
import { c, log } from 'x-chalk';
import { EditionType } from '@friends-library/types';
import { gql, getClient, ClientType, ClientConfig } from '@friends-library/db';
import { Document, Edition, Friend, PublishedCounts } from './types';
import { Friends } from '../graphql/Friends';
import QUERY from './query';

type DocumentEntities = {
  document: Document;
  friend: Friend;
};

type EditionEntities = DocumentEntities & {
  edition: Edition;
};

let cachedFriends: Friend[] | null = null;

export async function queryFriends(): Promise<Friend[]> {
  if (cachedFriends) return cachedFriends;
  const { data } = await client().query<Friends>({ query: gql(QUERY) });
  // break all of the apollo read-only stuff with JSON dance
  cachedFriends = sortChildren(JSON.parse(JSON.stringify(data.friends)));
  return data.friends;
}

export async function queryDocuments(): Promise<DocumentEntities[]> {
  const friends = await queryFriends();
  const entities: DocumentEntities[] = [];
  for (const friend of friends) {
    for (const document of friend.documents) {
      entities.push({ document, friend });
    }
  }
  return entities;
}

export async function queryEditions(): Promise<EditionEntities[]> {
  const friends = await queryFriends();
  const entities: EditionEntities[] = [];
  for (const friend of friends) {
    for (const document of friend.documents) {
      for (const edition of document.editions) {
        entities.push({ edition, document, friend });
      }
    }
  }
  return entities;
}

let publishedCounts: PublishedCounts = {
  friends: { en: -1, es: -1 },
  books: { en: -1, es: -1 },
  updatedEditions: { en: -1, es: -1 },
  audioBooks: { en: -1, es: -1 },
};

export async function queryPublishedCounts(): Promise<PublishedCounts> {
  if (publishedCounts.friends.en !== -1) {
    return publishedCounts;
  }

  const friends = await queryFriends();
  const documentEntities = await queryDocuments();
  const editionEntities = await queryEditions();

  publishedCounts.friends.en = friends.filter(
    (f) => f.lang === `en` && f.hasNonDraftDocument,
  ).length;

  publishedCounts.friends.es = friends.filter(
    (f) => f.lang === `es` && f.hasNonDraftDocument,
  ).length;

  publishedCounts.books.en = documentEntities.filter(
    (e) => e.friend.lang === `en` && e.document.hasNonDraftEdition,
  ).length;

  publishedCounts.books.es = documentEntities.filter(
    (e) => e.friend.lang === `es` && e.document.hasNonDraftEdition,
  ).length;

  publishedCounts.updatedEditions.en = editionEntities.filter(
    (e) => e.friend.lang === `en` && !e.edition.isDraft && e.edition.type === `updated`,
  ).length;

  publishedCounts.updatedEditions.es = editionEntities.filter(
    (e) => e.friend.lang === `es` && !e.edition.isDraft && e.edition.type === `updated`,
  ).length;

  publishedCounts.audioBooks.en = editionEntities.filter(
    (e) => e.friend.lang === `en` && !e.edition.isDraft && e.edition.audio,
  ).length;

  publishedCounts.audioBooks.es = editionEntities.filter(
    (e) => e.friend.lang === `es` && !e.edition.isDraft && e.edition.audio,
  ).length;

  return publishedCounts;
}

function sortChildren(friends: Friend[]): Friend[] {
  for (const friend of friends) {
    friend.quotes.sort(byOrder);
    friend.documents.sort(sortDocuments);
    for (const document of friend.documents) {
      document.editions.sort(editionsByType);
      for (const edition of document.editions) {
        if (edition.audio?.isPublished === false) {
          edition.audio = null;
        } else if (edition.audio) {
          edition.audio.parts.sort(byOrder);
        }
      }
    }
  }
  return friends;
}

function editionsByType<T extends { type: EditionType }>(a: T, b: T): number {
  if (a.type === `updated`) {
    return -1;
  }
  if (a.type === `modernized`) {
    return b.type === `updated` ? 1 : -1;
  }
  return 1;
}

function byOrder<T extends { order: number }>(a: T, b: T): number {
  return a.order < b.order ? -1 : 1;
}

type SortableDoc = {
  primaryEdition: null | { type: EditionType };
  title: string;
};

export function sortDocuments(a: SortableDoc, b: SortableDoc): number {
  if (a.primaryEdition?.type !== b.primaryEdition?.type) {
    if (a.primaryEdition?.type === `updated`) {
      return -1;
    }
    if (a.primaryEdition?.type === `modernized`) {
      return b.primaryEdition?.type === `updated` ? 1 : -1;
    }
    return 1;
  }
  return a.title < b.title ? -1 : 1;
}

function client(): ClientType {
  return getClient(clientConfig());
}

let config: ClientConfig | null = null;

export function clientConfig(): ClientConfig {
  if (config) return config;

  // default to assuming we want to talk to the production API
  let env: 'dev' | 'staging' | 'production' = `production`;
  let key = `FLP_API_TOKEN_PROD`;

  if (
    process.env.API_STAGING ||
    process.env.GATSBY_NETLIFY_CONTEXT === `preview` ||
    process.argv.includes(`--api-staging`)
  ) {
    env = `staging`;
    key = `FLP_API_TOKEN_STAGING`;
  } else if (process.env.API_DEV || process.argv.includes(`--api-dev`)) {
    env = `dev`;
    key = `FLP_API_TOKEN_DEV`;
  }

  const token = process.env[key];
  if (!token) {
    console.error(`Missing required api token process.env.${key}`);
    process.exit(1);
  }

  log(c`\n{magenta [,]} FLP API client configured for env: {green ${env}}\n`);
  config = { env, fetch, token };
  return config!;
}
