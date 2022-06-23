import { expect, describe, it } from '@jest/globals';
import { EditionType } from '../../graphql/globalTypes';
import { sortDocuments, sortFriends } from '../query';
import { Friend } from '../types';

describe(`sortFriends()`, () => {
  it(`sorts residences by duration`, () => {
    const friend = {
      relatedDocuments: [],
      quotes: [],
      documents: [],
      residences: [
        {
          __typename: 'FriendResidence',
          city: `Aberdeen`,
          region: `Scotland`,
          durations: [{ __typename: `FriendResidenceDuration`, start: 1700, end: 1710 }],
        },
        {
          __typename: 'FriendResidence',
          city: `London`,
          region: `England`,
          durations: [{ __typename: `FriendResidenceDuration`, start: 1690, end: 1700 }],
        },
      ],
    } as Pick<Friend, 'residences' | 'quotes' | 'documents' | 'relatedDocuments'>;

    const sorted = sortFriends([friend as Friend]);
    expect(sorted[0].residences[0].durations[0].start).toBe(1690);
    expect(sorted[0].residences[1].durations[0].start).toBe(1700);
  });
});

describe(`sortDocuments()`, () => {
  let docs: Array<Parameters<typeof sortDocuments>[0]> = [];

  it(`prefers updated edition`, () => {
    docs = [
      { primaryEdition: { type: EditionType.original }, title: `aaa` },
      { primaryEdition: { type: EditionType.updated }, title: `zzz` },
    ];

    docs.sort(sortDocuments);

    expect(docs[0].title).toBe(`zzz`);
  });

  it(`sorts by title if editions equal`, () => {
    docs = [
      { primaryEdition: { type: EditionType.original }, title: `zzz` },
      { primaryEdition: { type: EditionType.original }, title: `aaa` },
    ];

    docs.sort(sortDocuments);

    expect(docs[0].title).toBe(`aaa`);
  });
});
