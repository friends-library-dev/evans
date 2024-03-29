import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/data/Layout';
import ExploreBooksBlock from '../components/data/ExploreBooksBlock';
import { LANG } from '../env';
import { coverPropsFromQueryData } from '../lib/covers';
import HomeHeroBlock from '../components/pages/home/HeroBlock';
import HomeGettingStartedBlock from '../components/pages/home/GettingStartedBlock';
import HomeSubHeroBlock from '../components/pages/home/SubHeroBlock';
import NewsFeedBlock from '../components/pages/home/news-feed/NewsFeedBlock';
import HomeWhoWereTheQuakersBlock from '../components/pages/home/WhoWereTheQuakersBlock';
import HomeFeaturedBooksBlock from '../components/pages/home/FeaturedBooksBlock';
import HomeFormatsBlock from '../components/pages/home/FormatsBlock';
import {
  NumPublishedBooks,
  FluidBgImageObject,
  FluidImageObject,
  NewsFeedType,
} from '../types';

const HomePage: React.FC<Props> = ({ data }) => {
  const {
    numPublished,
    newsFeed,
    books11,
    london,
    deviceArray,
    paperback,
    iPad,
    iPhone,
    formats,
    formatsMobile,
    ...featured
  } = data;
  const numBooks = numPublished.books[LANG];
  return (
    <Layout>
      <HomeHeroBlock />
      <HomeSubHeroBlock
        imgDeviceArray={deviceArray.image.fluid}
        imgCover={paperback.image.fluid}
        imgIPad={iPad.image.fluid}
        imgIPhone={iPhone.image.fluid}
        numTotalBooks={numBooks}
      />
      <NewsFeedBlock bgImg={books11.image.fluid} items={newsFeed.items} />
      <HomeFeaturedBooksBlock
        books={Object.values(featured)
          .filter(Boolean)
          .map((doc: any) => ({
            ...coverPropsFromQueryData(doc),
            featuredDesc: doc.featuredDesc,
            documentUrl: doc.url,
            authorUrl: doc.authorUrl,
            htmlShortTitle: doc.htmlShortTitle,
          }))}
      />
      <HomeGettingStartedBlock />
      <HomeWhoWereTheQuakersBlock bgImg={london.image.fluid} />
      <HomeFormatsBlock img={formats.image.fluid} imgMobile={formatsMobile.image.fluid} />
      <ExploreBooksBlock numTotalBooks={numBooks} />
    </Layout>
  );
};

export default HomePage;

interface Props {
  data: NumPublishedBooks & {
    newsFeed: {
      items: {
        title: string;
        day: string;
        month: string;
        year: string;
        description: string;
        url: string;
        type: NewsFeedType;
      }[];
    };
    en_titip: any | null;
    en_turford: any | null;
    en_ip_1: any | null;
    en_ip_2: any | null;
    en_penn_ncnc: any | null;
    en_sewel: any | null;
    es_titip: any | null;
    es_ip_1: any | null;
    es_ip_2: any | null;
    es_penn_ncnc: any | null;
    books11: { image: { fluid: FluidBgImageObject } };
    london: { image: { fluid: FluidBgImageObject } };
    deviceArray: { image: { fluid: FluidImageObject } };
    iPad: { image: { fluid: FluidImageObject } };
    iPhone: { image: { fluid: FluidImageObject } };
    paperback: { image: { fluid: FluidImageObject } };
    formats: { image: { fluid: FluidImageObject } };
    formatsMobile: { image: { fluid: FluidImageObject } };
  };
}

export const query = graphql`
  query HomePage {
    numPublished: publishedCounts {
      ...PublishedBooks
    }
    newsFeed: allNewsFeedItem {
      items: nodes {
        title
        day
        month
        year
        description
        type
        url
      }
    }
    en_titip: document(
      slug: { eq: "truth-in-the-inward-parts-v1" }
      friendSlug: { eq: "compilations" }
    ) {
      ...RecommendedBook
      featuredDesc: featuredDescription
    }
    en_turford: document(
      slug: { eq: "walk-in-the-spirit" }
      friendSlug: { eq: "hugh-turford" }
    ) {
      ...RecommendedBook
      featuredDesc: featuredDescription
    }
    en_ip_1: document(
      slug: { eq: "writings-volume-1" }
      friendSlug: { eq: "isaac-penington" }
    ) {
      ...RecommendedBook
      featuredDesc: featuredDescription
    }
    en_ip_2: document(
      slug: { eq: "writings-volume-2" }
      friendSlug: { eq: "isaac-penington" }
    ) {
      ...RecommendedBook
      featuredDesc: featuredDescription
    }
    en_penn_ncnc: document(
      slug: { eq: "no-cross-no-crown" }
      friendSlug: { eq: "william-penn" }
    ) {
      ...RecommendedBook
      featuredDesc: featuredDescription
    }
    en_sewell: document(
      slug: { eq: "history-of-quakers" }
      friendSlug: { eq: "william-sewel" }
    ) {
      ...RecommendedBook
      featuredDesc: featuredDescription
    }
    es_titip: document(
      slug: { eq: "verdad-en-lo-intimo" }
      friendSlug: { eq: "compilaciones" }
    ) {
      ...RecommendedBook
      featuredDesc: featuredDescription
    }
    es_ip_1: document(
      slug: { eq: "escritos-volumen-1" }
      friendSlug: { eq: "isaac-penington" }
    ) {
      ...RecommendedBook
      featuredDesc: featuredDescription
    }
    es_ip_2: document(
      slug: { eq: "escritos-volumen-2" }
      friendSlug: { eq: "isaac-penington" }
    ) {
      ...RecommendedBook
      featuredDesc: featuredDescription
    }
    es_penn_ncnc: document(
      slug: { eq: "no-cruz-no-corona" }
      friendSlug: { eq: "william-penn" }
    ) {
      ...RecommendedBook
      featuredDesc: featuredDescription
    }
    london: file(relativePath: { eq: "london.jpg" }) {
      image: childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    books11: file(relativePath: { eq: "Books11.jpg" }) {
      image: childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    deviceArray: file(relativePath: { eq: "device-array.png" }) {
      image: childImageSharp {
        fluid(quality: 90, maxWidth: 920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    paperback: file(relativePath: { eq: "samuel-fothergill-cover.jpg" }) {
      image: childImageSharp {
        fluid(quality: 90, maxWidth: 440) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    iPhone: file(relativePath: { eq: "iphone.png" }) {
      image: childImageSharp {
        fluid(quality: 90, maxWidth: 700) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    iPad: file(relativePath: { eq: "ipad.png" }) {
      image: childImageSharp {
        fluid(quality: 90, maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    formats: file(relativePath: { eq: "formats-books.png" }) {
      image: childImageSharp {
        fluid(quality: 90, maxWidth: 867) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    formatsMobile: file(relativePath: { eq: "formats-books-mobile.png" }) {
      image: childImageSharp {
        fluid(quality: 90, maxWidth: 586) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
