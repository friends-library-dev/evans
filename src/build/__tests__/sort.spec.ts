import { expect, describe, it } from '@jest/globals';
import { EditionType } from '../../graphql/globalTypes';
import { sortDocuments } from '../query';

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
