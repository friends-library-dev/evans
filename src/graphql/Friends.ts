/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Lang, Gender, TagType, EditionType, PrintSize } from './globalTypes';

// ====================================================
// GraphQL query operation: Friends
// ====================================================

export interface Friends_friends_primaryResidence {
  __typename: 'FriendResidence';
  region: string;
  city: string;
}

export interface Friends_friends_documents_tags {
  __typename: 'DocumentTag';
  type: TagType;
}

export interface Friends_friends_documents_altLanguageDocument_friend {
  __typename: 'Friend';
  slug: string;
}

export interface Friends_friends_documents_altLanguageDocument {
  __typename: 'Document';
  slug: string;
  htmlShortTitle: string;
  hasNonDraftEdition: boolean;
  friend: Friends_friends_documents_altLanguageDocument_friend;
}

export interface Friends_friends_documents_editions_chapters {
  __typename: 'EditionChapter';
  id: string;
}

export interface Friends_friends_documents_editions_isbn {
  __typename: 'Isbn';
  code: string;
}

export interface Friends_friends_documents_editions_images_square_w1400 {
  __typename: 'EditionImage';
  url: string;
}

export interface Friends_friends_documents_editions_images_square {
  __typename: 'EditionSquareImages';
  w1400: Friends_friends_documents_editions_images_square_w1400;
}

export interface Friends_friends_documents_editions_images {
  __typename: 'EditionImages';
  square: Friends_friends_documents_editions_images_square;
}

export interface Friends_friends_documents_editions_impression_files_ebook_pdf {
  __typename: 'DownloadableFile';
  logUrl: string;
}

export interface Friends_friends_documents_editions_impression_files_ebook_mobi {
  __typename: 'DownloadableFile';
  logUrl: string;
}

export interface Friends_friends_documents_editions_impression_files_ebook_epub {
  __typename: 'DownloadableFile';
  logUrl: string;
}

export interface Friends_friends_documents_editions_impression_files_ebook_speech {
  __typename: 'DownloadableFile';
  logUrl: string;
}

export interface Friends_friends_documents_editions_impression_files_ebook {
  __typename: 'EditionImpressionEbookFiles';
  pdf: Friends_friends_documents_editions_impression_files_ebook_pdf;
  mobi: Friends_friends_documents_editions_impression_files_ebook_mobi;
  epub: Friends_friends_documents_editions_impression_files_ebook_epub;
  speech: Friends_friends_documents_editions_impression_files_ebook_speech;
}

export interface Friends_friends_documents_editions_impression_files {
  __typename: 'EditionImpressionFiles';
  ebook: Friends_friends_documents_editions_impression_files_ebook;
}

export interface Friends_friends_documents_editions_impression {
  __typename: 'EditionImpression';
  paperbackPriceInCents: number;
  paperbackSize: PrintSize;
  paperbackVolumes: number[];
  createdAt: string;
  files: Friends_friends_documents_editions_impression_files;
}

export interface Friends_friends_documents_editions_audio_parts_mp3File_hq {
  __typename: 'DownloadableFile';
  logUrl: string;
}

export interface Friends_friends_documents_editions_audio_parts_mp3File_lq {
  __typename: 'DownloadableFile';
  logUrl: string;
}

export interface Friends_friends_documents_editions_audio_parts_mp3File {
  __typename: 'AudioFileQualities';
  hq: Friends_friends_documents_editions_audio_parts_mp3File_hq;
  lq: Friends_friends_documents_editions_audio_parts_mp3File_lq;
}

export interface Friends_friends_documents_editions_audio_parts {
  __typename: 'AudioPart';
  title: string;
  order: number;
  chapters: number[];
  duration: number;
  externalIdHq: Int64;
  externalIdLq: Int64;
  mp3SizeHq: number;
  mp3SizeLq: number;
  mp3File: Friends_friends_documents_editions_audio_parts_mp3File;
}

export interface Friends_friends_documents_editions_audio_files_m4b_hq {
  __typename: 'DownloadableFile';
  logUrl: string;
}

export interface Friends_friends_documents_editions_audio_files_m4b_lq {
  __typename: 'DownloadableFile';
  logUrl: string;
}

export interface Friends_friends_documents_editions_audio_files_m4b {
  __typename: 'AudioFileQualities';
  hq: Friends_friends_documents_editions_audio_files_m4b_hq;
  lq: Friends_friends_documents_editions_audio_files_m4b_lq;
}

export interface Friends_friends_documents_editions_audio_files_mp3s_hq {
  __typename: 'DownloadableFile';
  logUrl: string;
}

export interface Friends_friends_documents_editions_audio_files_mp3s_lq {
  __typename: 'DownloadableFile';
  logUrl: string;
}

export interface Friends_friends_documents_editions_audio_files_mp3s {
  __typename: 'AudioFileQualities';
  hq: Friends_friends_documents_editions_audio_files_mp3s_hq;
  lq: Friends_friends_documents_editions_audio_files_mp3s_lq;
}

export interface Friends_friends_documents_editions_audio_files_podcast_hq {
  __typename: 'DownloadableFile';
  logUrl: string;
  sourcePath: string;
}

export interface Friends_friends_documents_editions_audio_files_podcast_lq {
  __typename: 'DownloadableFile';
  logUrl: string;
  sourcePath: string;
}

export interface Friends_friends_documents_editions_audio_files_podcast {
  __typename: 'AudioFileQualities';
  hq: Friends_friends_documents_editions_audio_files_podcast_hq;
  lq: Friends_friends_documents_editions_audio_files_podcast_lq;
}

export interface Friends_friends_documents_editions_audio_files {
  __typename: 'AudioFiles';
  m4b: Friends_friends_documents_editions_audio_files_m4b;
  mp3s: Friends_friends_documents_editions_audio_files_mp3s;
  podcast: Friends_friends_documents_editions_audio_files_podcast;
}

export interface Friends_friends_documents_editions_audio {
  __typename: 'Audio';
  reader: string;
  isPublished: boolean;
  isIncomplete: boolean;
  externalPlaylistIdHq: Int64 | null;
  externalPlaylistIdLq: Int64 | null;
  m4bSizeHq: number;
  m4bSizeLq: number;
  mp3ZipSizeHq: number;
  mp3ZipSizeLq: number;
  humanDurationClock: string;
  createdAt: string;
  parts: Friends_friends_documents_editions_audio_parts[];
  files: Friends_friends_documents_editions_audio_files;
}

export interface Friends_friends_documents_editions {
  __typename: 'Edition';
  id: string;
  type: EditionType;
  isDraft: boolean;
  path: string;
  chapters: Friends_friends_documents_editions_chapters[];
  isbn: Friends_friends_documents_editions_isbn | null;
  images: Friends_friends_documents_editions_images;
  impression: Friends_friends_documents_editions_impression | null;
  audio: Friends_friends_documents_editions_audio | null;
}

export interface Friends_friends_documents_primaryEdition_images_threeD_w700 {
  __typename: 'EditionImage';
  url: string;
}

export interface Friends_friends_documents_primaryEdition_images_threeD {
  __typename: 'EditionThreeDImages';
  w700: Friends_friends_documents_primaryEdition_images_threeD_w700;
}

export interface Friends_friends_documents_primaryEdition_images {
  __typename: 'EditionImages';
  threeD: Friends_friends_documents_primaryEdition_images_threeD;
}

export interface Friends_friends_documents_primaryEdition {
  __typename: 'Edition';
  id: string;
  type: EditionType;
  images: Friends_friends_documents_primaryEdition_images;
}

export interface Friends_friends_documents_relatedDocuments_document {
  __typename: 'Document';
  id: string;
  htmlShortTitle: string;
  description: string;
}

export interface Friends_friends_documents_relatedDocuments {
  __typename: 'RelatedDocument';
  description: string;
  document: Friends_friends_documents_relatedDocuments_document;
}

export interface Friends_friends_documents {
  __typename: 'Document';
  id: string;
  title: string;
  htmlTitle: string;
  htmlShortTitle: string;
  utf8ShortTitle: string;
  originalTitle: string | null;
  slug: string;
  published: number | null;
  incomplete: boolean;
  directoryPath: string;
  description: string;
  partialDescription: string;
  featuredDescription: string | null;
  hasNonDraftEdition: boolean;
  tags: Friends_friends_documents_tags[];
  altLanguageDocument: Friends_friends_documents_altLanguageDocument | null;
  editions: Friends_friends_documents_editions[];
  primaryEdition: Friends_friends_documents_primaryEdition | null;
  relatedDocuments: Friends_friends_documents_relatedDocuments[];
}

export interface Friends_friends_relatedDocuments_document {
  __typename: 'Document';
  id: string;
  htmlShortTitle: string;
  description: string;
}

export interface Friends_friends_relatedDocuments {
  __typename: 'RelatedDocument';
  description: string;
  document: Friends_friends_relatedDocuments_document;
}

export interface Friends_friends_quotes {
  __typename: 'FriendQuote';
  order: number;
  source: string;
  text: string;
}

export interface Friends_friends_residences_durations {
  __typename: 'FriendResidenceDuration';
  start: number;
  end: number;
}

export interface Friends_friends_residences {
  __typename: 'FriendResidence';
  city: string;
  region: string;
  durations: Friends_friends_residences_durations[];
}

export interface Friends_friends {
  __typename: 'Friend';
  id: string;
  lang: Lang;
  slug: string;
  gender: Gender;
  name: string;
  born: number | null;
  died: number | null;
  description: string;
  isCompilations: boolean;
  published: string | null;
  hasNonDraftDocument: boolean;
  primaryResidence: Friends_friends_primaryResidence | null;
  documents: Friends_friends_documents[];
  relatedDocuments: Friends_friends_relatedDocuments[];
  quotes: Friends_friends_quotes[];
  residences: Friends_friends_residences[];
}

export interface Friends {
  friends: Friends_friends[];
}
