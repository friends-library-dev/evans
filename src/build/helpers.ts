import { Friend, Document } from '@friends-library/friends';
import { allFriends } from '@friends-library/friends/query';
import { Slug, ISBN, Asciidoc } from '@friends-library/types';

export function justHeadings(adoc: Asciidoc): Asciidoc {
  return adoc.split(`\n\n`).slice(0, 1).join(``);
}

const friendsMap: Map<Slug, Friend> = new Map();

export function allFriendsMap(): Map<Slug, Friend> {
  if (friendsMap.size === 0) {
    for (const friend of allFriends()) {
      friendsMap.set(friend.path, friend);
    }
  }
  return friendsMap;
}

const docsMap: Map<Slug | ISBN, Document> = new Map();

export function allDocsMap(): Map<Slug | ISBN, Document> {
  if (docsMap.size === 0) {
    for (const friend of allFriends()) {
      for (const document of friend.documents) {
        docsMap.set(document.slug, document);
        docsMap.set(document.id, document);
      }
    }
  }
  return docsMap;
}

export function audioDurationStr(partDurations: number[]): string {
  const totalSeconds = Math.floor(partDurations.reduce((x, y) => x + y));
  const hours = Math.floor(totalSeconds / (60 * 60));
  const minutes = Math.floor((totalSeconds - hours * 60 * 60) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .filter((num, idx, parts) => {
      if (num !== 0) {
        return true;
      }
      return parts.slice(idx + 1).every((part) => part === 0);
    })
    .map(String)
    .map((part) => part.padStart(2, `0`))
    .join(`:`)
    .replace(/^0/, ``);
}
