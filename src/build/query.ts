/// <reference path="../components/globals.d.ts" />
import gql from 'x-syntax';
import { EditionType } from '@friends-library/types';
import { Friend } from './types';

export function sortFriends(friends: Friend[]): Friend[] {
  friends.sort((a, b) => (a.id < b.id ? -1 : 1));
  for (const friend of friends) {
    friend.relatedDocuments.sort((a, b) => (a.document.id < b.document.id ? -1 : 1));
    friend.quotes.sort(byOrder);
    friend.documents.sort(sortDocuments);

    for (const residence of friend.residences) {
      residence.durations.sort((a, b) => a.start - b.start);
    }

    friend.residences.sort((a, b) => {
      if (a.durations.length === 1 && b.durations.length === 1) {
        return a.durations[0].start < b.durations[0].start ? -1 : 1;
      } else {
        return a.city < b.city ? -1 : 1;
      }
    });

    for (const document of friend.documents) {
      document.editions.sort(editionsByType);
      document.tags.sort((a, b) => (a.type < b.type ? -1 : 1));
      document.relatedDocuments.sort((a, b) => (a.document.id < b.document.id ? -1 : 1));
      for (const edition of document.editions) {
        edition.chapters.sort((a, b) => (a.id < b.id ? -1 : 1));
        if (edition.audio?.isPublished === false) {
          edition.audio = null;
        } else if (edition.audio) {
          edition.audio.parts = edition.audio.parts.filter((part) => part.isPublished);
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

export const QUERY = gql`
  query Friends {
    friends: getFriends {
      id
      lang
      slug
      gender
      name
      born
      died
      description
      isCompilations
      published
      hasNonDraftDocument
      primaryResidence {
        region
        city
      }
      documents {
        id
        title
        htmlTitle
        htmlShortTitle
        utf8ShortTitle
        originalTitle
        slug
        published
        incomplete
        directoryPath
        description
        partialDescription
        featuredDescription
        hasNonDraftEdition
        tags {
          type
        }
        altLanguageDocument {
          slug
          htmlShortTitle
          hasNonDraftEdition
          friend {
            slug
          }
        }
        editions {
          id
          type
          isDraft
          path: directoryPath
          chapters {
            id
          }
          isbn {
            code
          }
          images {
            square {
              w1400 {
                url
              }
            }
          }
          impression {
            paperbackPriceInCents
            paperbackSize
            paperbackVolumes
            createdAt
            files {
              ebook {
                pdf {
                  logUrl
                }
                mobi {
                  logUrl
                }
                epub {
                  logUrl
                }
                speech {
                  logUrl
                }
              }
            }
          }
          audio {
            reader
            isPublished
            isIncomplete
            externalPlaylistIdHq
            externalPlaylistIdLq
            m4bSizeHq
            m4bSizeLq
            mp3ZipSizeHq
            mp3ZipSizeLq
            humanDurationClock
            createdAt
            parts {
              title
              isPublished
              order
              chapters
              duration
              externalIdHq
              externalIdLq
              mp3SizeHq
              mp3SizeLq
              mp3File {
                hq {
                  logUrl
                }
                lq {
                  logUrl
                }
              }
            }
            files {
              m4b {
                hq {
                  logUrl
                }
                lq {
                  logUrl
                }
              }
              mp3s {
                hq {
                  logUrl
                }
                lq {
                  logUrl
                }
              }
              podcast {
                hq {
                  logUrl
                  sourcePath
                }
                lq {
                  logUrl
                  sourcePath
                }
              }
            }
          }
        }
        primaryEdition {
          id
          type
          images {
            threeD {
              w700 {
                url
              }
            }
          }
        }
        relatedDocuments {
          description
          document {
            id
            htmlShortTitle
            description
          }
        }
      }
      relatedDocuments {
        description
        document {
          id
          htmlShortTitle
          description
        }
      }
      quotes {
        order
        source
        text
      }
      residences {
        city
        region
        durations {
          start
          end
        }
      }
    }
  }
`;
