import gql from 'x-syntax';

const QUERY = gql`
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

export default QUERY;
