import React from 'react';
import { graphql, Link } from 'gatsby';
import { FluidBgImageObject } from '@friends-library/types';
import { t } from '@friends-library/locale';
import { coverPropsFromQueryData, CoverData } from '../lib/covers';
import { PAGE_META_DESCS } from '../lib/seo';
import { LANG } from '../components/env';
import { Layout, Seo } from '../components/data';
import AudiobooksHero from '../components/blocks/AudiobooksHero';
import BookTeaserCard from '../components/BookTeaserCard';
import Dual from '../components/Dual';
import Stack from '../components/layout/Stack';
import Audiobook from '../components/pages/audiobooks/Audiobook';

type AudioBookNode = CoverData & {
  authorUrl: string;
  documentUrl: string;
  description: string;
  htmlShortTitle: string;
  editions: {
    audio: {
      added: string;
      duration: string;
      publishedDate: string;
    };
  }[];
};

interface Props {
  data: {
    headphones: {
      image: {
        fluid: FluidBgImageObject;
      };
    };
    audioBooks: {
      nodes: AudioBookNode[];
    };
  };
}

const AudiobooksPage: React.FC<Props> = ({ data: { audioBooks, headphones } }: Props) => {
  const sortedBooks = audioBooks.nodes.sort((a, b) =>
    a.editions[0].audio.added < b.editions[0].audio.added ? 1 : -1,
  );

  return (
    <Layout>
      <Seo
        title={t`Audio Books`}
        description={PAGE_META_DESCS.audiobooks[LANG].replace(
          /%NUM_AUDIOBOOKS%/g,
          String(sortedBooks.length),
        )}
      />
      <AudiobooksHero
        bgImg={headphones.image.fluid}
        className="p-16 pb-48 md:pb-56"
        numBooks={sortedBooks.length}
      />
      <div className="bg-flgray-200 py-12 xl:pb-6">
        <Dual.H2 className="sans-wider text-center text-2xl md:text-3xl mb-12 px-10">
          <>Recently Added Audio Books</>
          <>Audiolibros añadidos recientemente</>
        </Dual.H2>
        <Stack
          // purgeCSS: mb-16 xl:mb-0
          space="16"
          xl="0"
          className="md:px-6 lg:px-24 xl:px-0 xl:flex flex-wrap justify-center"
        >
          {sortedBooks.slice(0, 2).map((book) => (
            <BookTeaserCard
              key={book.documentUrl}
              className="xl:w-2/5 xl:mx-8 xl:mb-12"
              {...coverPropsFromQueryData(book)}
              htmlShortTitle={book.htmlShortTitle}
              audioDuration={book.editions[0].audio.duration}
              badgeText={book.editions[0].audio.publishedDate}
              authorUrl={book.authorUrl}
              documentUrl={book.documentUrl}
              description={
                book.description ||
                `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequ`
              }
            />
          ))}
        </Stack>
      </div>
      <div className="pt-16">
        <h2 className="sans-wider text-center text-3xl mb-8 px-8">{t`All Audio Books`}</h2>
        <Dual.P className="body-text text-center text-lg mb-12 px-8 sm:px-10">
          <>
            Browse all {sortedBooks.length} audiobooks below, or{` `}
            <Link to={t`/audio-help`} className="subtle-link">
              get help with listening here
            </Link>
            .
          </>
          <>
            Explora los {sortedBooks.length} audiolibros a continuación u{` `}
            <Link to={t`/audio-help`} className="subtle-link">
              obtén ayuda aquí para escuchar
            </Link>
            .
          </>
        </Dual.P>
        <div className="flex flex-col md:flex-row flex-wrap items-center md:items-stretch justify-center">
          {sortedBooks.map((book, idx) => (
            <Audiobook
              key={book.documentUrl}
              className="mb-12 sm:w-4/5 md:w-2/5 md:box-content md:mx-4 xl:w-1/4 xl:max-w-3xl"
              {...coverPropsFromQueryData(book)}
              htmlShortTitle={book.htmlShortTitle}
              bgColor={[`blue`, `green`, `gold`][idx % 3] as 'blue' | 'green' | 'gold'}
              duration={
                (book.editions[0].audio || { duration: book.documentUrl }).duration
              }
              authorUrl={book.authorUrl}
              documentUrl={book.documentUrl}
              description={book.description}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AudiobooksPage;

export const query = graphql`
  {
    audioBooks: allDocument(filter: { hasAudio: { eq: true } }) {
      nodes {
        ...CoverProps
        documentUrl: url
        htmlShortTitle
        authorUrl
        description: partialDescription
        editions {
          audio {
            added
            duration
            publishedDate
          }
        }
      }
    }
    headphones: file(relativePath: { eq: "headphones.jpg" }) {
      image: childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
