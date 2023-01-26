import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import BooksBgBlock, { WhiteOverlay } from '../components/data/BooksBgBlock';
import components from '../components/Mdx';
import { Layout, Seo } from '../components/data';
import { NumPublishedBooks } from '../types';

interface Props {
  data: NumPublishedBooks & {
    audioBooks: {
      totalCount: number;
    };
    mdx: {
      body: string;
      frontmatter: {
        title: string;
        description: string;
      };
    };
  };
}

const StaticPage: React.FC<Props> = ({ data }) => {
  const { mdx, audioBooks } = data;
  const { body, frontmatter } = mdx;
  function replaceCounts(str: string): string {
    return str
      .replace(/%NUM_AUDIOBOOKS%/g, String(audioBooks.totalCount))
      .replace(/%NUM_SPANISH_BOOKS%/g, String(data.numPublished.books.es))
      .replace(/%NUM_ENGLISH_BOOKS%/g, String(data.numPublished.books.en))
      .replace(/ -- /g, ` — `);
  }
  return (
    <Layout>
      <Seo
        title={frontmatter.title}
        description={replaceCounts(frontmatter.description)}
      />
      <BooksBgBlock bright>
        <WhiteOverlay>
          <h1 className="heading-text text-2xl sm:text-4xl bracketed text-flprimary">
            {frontmatter.title}
          </h1>
        </WhiteOverlay>
      </BooksBgBlock>
      <div className="MDX p-10 md:px-16 lg:px-24 body-text max-w-6xl mx-auto mt-4">
        <MDXProvider components={components}>
          <MDXRenderer>{replaceCounts(body)}</MDXRenderer>
        </MDXProvider>
      </div>
    </Layout>
  );
};

export default StaticPage;

export const pageQuery = graphql`
  query ($path: String!) {
    numPublished: publishedCounts {
      ...PublishedBooks
    }
    audioBooks: allDocument(filter: { hasAudio: { eq: true } }) {
      totalCount
    }
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      frontmatter {
        title
        description
      }
    }
  }
`;
