import React from 'react';
import Link from 'gatsby-link';
import { graphql } from 'gatsby';
import { FluidImageObject } from '@friends-library/types';
import Image from 'gatsby-image';
import BooksBgBlock, { WhiteOverlay } from '../components/data/BooksBgBlock';
import { t } from '@friends-library/locale';
import { PAGE_META_DESCS } from '../lib/seo';
import { Layout, Seo } from '../components/data';
import Dual from '../components/Dual';
import { LANG } from '../env';

interface Screenshot {
  image: { fluid: FluidImageObject };
}

interface Props {
  data: {
    audioBooks: { totalCount: number };
    splashEn: Screenshot;
    splashEs: Screenshot;
    audioEn: Screenshot;
    audioEs: Screenshot;
    audioListEn: Screenshot;
    audioListEs: Screenshot;
  };
}

const AppPage: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Seo title={`Friends Library App`} description={PAGE_META_DESCS.app[LANG]} />
      <BooksBgBlock bright>
        <WhiteOverlay>
          <h1 className="heading-text text-2xl sm:text-4xl bracketed text-flprimary">
            Friends Library App
          </h1>
        </WhiteOverlay>
      </BooksBgBlock>
      <div className="p-10 flex flex-col items-center md:py-16">
        <h2 className="text-flgray-900 text-3xl tracking-widest mb-6">
          Now available for iOS and Android
        </h2>
        <p className="body-text text-xl pb-8 max-w-screen-md leading-loose">
          <b>November 10, 2020</b> &mdash; Friends Library now has iPhone and Android apps
          available for free on the Apple App Store and Google Play Store. Use one of the
          links below to download the right app for your phone or device.
        </p>
        <div className="max-w-xs sm:max-w-lg px-6 flex flex-col sm:flex-row space-y-6  sm:space-y-0 sm:space-x-8 items-center mb-10">
          <a
            href={`https://apps.apple.com/us/app/friends-library/id${
              LANG === `en` ? `1537124207` : `1538800203`
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={`/app-store.${LANG}.png`} alt="Download on the App Store" />
          </a>
          <a
            href={`https://play.google.com/store/apps/details?id=com.friendslibrary.FriendsLibrary.${LANG}.release`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={`/google-play.${LANG}.png`} alt="Download on the App Store" />
          </a>
        </div>
        <h3 className="text-flgray-900 text-2xl tracking-widest mb-6">
          Easier <span className="underline">audiobooks</span> now, with more to come
          soon!
        </h3>
        <p className="body-text pb-12 max-w-screen-md leading-loose">
          Friends Library currently has {data.audioBooks.totalCount} titles recorded as
          audiobooks, with more being added regularly. Unfortunately, downloading and
          listening to our audiobooks directly from this website is quite difficult, even
          for knowledgable users. The first version of our iPhone and Android apps are
          focused on making is super easy to download and listen to any of our audiobooks,
          wherever you are. Just select an audiobook from the list and press play. You can
          download whole books while you're connected to Wifi, and listen to them
          conveniently later when you may or may not have internet.
        </p>
        <Dual.Div className="flex space-x-4 mb-10">
          <>
            <Image className="w-48" fluid={data.splashEn.image.fluid} alt="" />
            <Image className="w-48" fluid={data.audioEn.image.fluid} alt="" />
            <Image className="w-48" fluid={data.audioListEn.image.fluid} alt="" />
          </>
          <>
            <Image className="w-48" fluid={data.splashEs.image.fluid} alt="" />
            <Image className="w-48" fluid={data.audioEs.image.fluid} alt="" />
            <Image className="w-48" fluid={data.audioListEs.image.fluid} alt="" />
          </>
        </Dual.Div>
        <p className="body-text pb-12 max-w-screen-md leading-loose">
          In the future, we plan to add a number of useful features to the app, all with
          goal of making it easier for everyone to find, listen, read and benefit from
          these invaluable writings. It is our hope that many would be encouraged to
          faithfully and fervently follow in the footsteps of these exemplary men and
          women who ran well and fought the good fight, leaving us many precious
          testimonies of lives fully surrendered to the grace, light and spirit of our
          Lord Jesus Christ.
        </p>
        <h3 className="text-flgray-900 text-2xl tracking-widest mb-6">
          Getting help or suggesting features
        </h3>
        <p className="body-text pb-12 max-w-screen-md leading-loose">
          If you come across anything that is confusing or seems to not work for you,
          please reach out using our{` `}
          <Link className="text-flprimary fl-underline" to={t`/contact`}>
            contact page.
          </Link>
          {` `}
          Or, just let us know if you find the app useful, or what other features you
          think we should be working on. Thanks for trying it out! For details on our app
          privacy policy,{` `}
          <Link
            to={`/app-privacy` /* TODO: translate */}
            className="text-flprimary fl-underline"
          >
            see here.
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default AppPage;

export const query = graphql`
  query AppPage {
    audioBooks: allDocument(filter: { hasAudio: { eq: true } }) {
      totalCount
    }
    splashEn: file(relativePath: { eq: "app-screens/app-splash.en.jpg" }) {
      image: childImageSharp {
        fluid(quality: 90, maxHeight: 400) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    splashEs: file(relativePath: { eq: "app-screens/app-splash.es.jpg" }) {
      image: childImageSharp {
        fluid(quality: 90, maxHeight: 400) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    audioEn: file(relativePath: { eq: "app-screens/app-audio.en.jpg" }) {
      image: childImageSharp {
        fluid(quality: 90, maxHeight: 400) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    audioEs: file(relativePath: { eq: "app-screens/app-splash.es.jpg" }) {
      image: childImageSharp {
        fluid(quality: 90, maxHeight: 400) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    audioListEn: file(relativePath: { eq: "app-screens/app-audio-list.en.jpg" }) {
      image: childImageSharp {
        fluid(quality: 90, maxHeight: 600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    audioListEs: file(relativePath: { eq: "app-screens/app-audio-list.es.jpg" }) {
      image: childImageSharp {
        fluid(quality: 90, maxHeight: 600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
