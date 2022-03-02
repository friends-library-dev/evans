import React, { useState, useEffect, useReducer } from 'react';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import cx from 'classnames';
import { Helmet } from 'react-helmet';
import { t } from '@friends-library/locale';
import Checkout from './Checkout';
import Slideover from '../Slideover';
import { LANG } from '../env';
import ErrorBoundary from '../ErrorBoundary';
import './Layout.css';
import Dual from '../Dual';
import Footer from '../Footer';
import Nav from '../Nav';
import CartStore from '../checkout/services/CartStore';
import { useNumCartItems } from '../checkout/hooks';
import { useEscapeable } from '../lib/hooks';
import PopUnder from '../PopUnder';
import { appReducer, appInitialState, AppDispatch } from '../lib/app-state';
import RequestFreeBooks from '../RequestFreeBooks';
import { APP_URL } from '../../env';
import { FluidBgImageObject, NumPublishedBooks } from '../../types';

const store = CartStore.getSingleton();

const Layout: React.FC = ({ children }) => {
  const { pathname } = useLocation();
  const [appState, dispatch] = useReducer(appReducer, appInitialState);
  const [numCartItems] = useNumCartItems();
  const [jsEnabled, setJsEnabled] = useState<boolean>(false);
  const [webp, setWebp] = useState<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [itemJustAdded, setItemJustAdded] = useState<boolean>(false);

  useEffect(() => setJsEnabled(true), []);

  // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/img/webp.js
  useEffect(() => {
    const img = new Image();
    img.onerror = () => setWebp(false);
    img.onload = (event) => {
      setWebp(event?.type === `load` ? img.width === 1 : false);
    };
    img.src = `data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=`;
  }, []);

  useEffect(() => {
    function onCartItemAdded(): void {
      setItemJustAdded(true);
      setTimeout(() => setItemJustAdded(false), 4000);
    }
    function setCheckoutModalOpen(open: boolean): void {
      dispatch(open ? { type: `show--modal:checkout` } : { type: `show--app` });
    }
    store.on(`toggle:visibility`, setCheckoutModalOpen);
    store.on(`cart:item-added`, onCartItemAdded);
    return () => {
      store.off(`toggle:visibility`, setCheckoutModalOpen);
      store.off(`cart:item-added`, onCartItemAdded);
    };
  }, []);

  useEscapeable(`.Slideover`, menuOpen, setMenuOpen);

  type QueryData = NumPublishedBooks & {
    mountains: { image: { fluid: FluidBgImageObject } };
  };

  const data = useStaticQuery<QueryData>(graphql`
    query LayoutQuery {
      numPublished: publishedCounts {
        ...PublishedBooks
      }
      mountains: file(relativePath: { eq: "mountains.jpg" }) {
        image: childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  const metaDesc = [
    `Friends Library exists to freely share the writings of early members of the Religious Society of Friends (Quakers), believing that no other collection of Christian writings more accurately communicates or powerfully illustrates the soul-transforming power of the gospel of Jesus Christ. We have ${data.numPublished.books.en} books available for free download in multiple editions and digital formats (including PDF, MOBI, and EPUB), and a growing number of them are also recorded as audiobooks. Paperback copies are also available at very low cost.`,
    `La Biblioteca de los Amigos ha sido creada para compartir gratuitamente los escritos de los primeros miembros de la Sociedad de Amigos (Cuáqueros), ya que creemos que no existe ninguna otra colección de escritos cristianos que comunique con mayor precisión, o que ilustre con más pureza, el poder del evangelio de Jesucristo que transforma el alma. Actualmente tenemos ${data.numPublished.books.es} libros disponibles para descargarse gratuitamente en múltiples ediciones y formatos digitales, y un número creciente de estos libros están siendo grabados como audiolibros. Libros impresos también están disponibles por un precio muy económico. `,
  ][LANG === `en` ? 0 : 1];

  return (
    <ErrorBoundary location="root">
      <AppDispatch.Provider value={dispatch}>
        <Helmet>
          <html lang={LANG} className={cx({ 'Menu--open': menuOpen })} />
          <title>{t`Friends Library`}</title>
          <meta name="referrer" content="unsafe-url" />
          <meta name="description" content={metaDesc} />
          <meta property="og:title" content={`${t`Friends Library`}`} />
          <meta property="og:description" content={metaDesc} />
          <meta property="og:url" content={`${APP_URL}${pathname}`} />
          <meta
            property="og:image"
            content={`https://raw.githubusercontent.com/friends-library-dev/native/eb1c41fe86792a61a9ef9383a36b1e62df11616e/release-assets/android/${LANG}/feature.png`}
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com/"
            crossOrigin="anonymous"
          />
          {process.env.GATSBY_NETLIFY_CONTEXT === `preview` && (
            <meta name="robots" content="noindex, nofollow" />
          )}
          <body
            className={cx({ webp, 'no-webp': webp === false, 'no-js': !jsEnabled })}
          />
        </Helmet>
        {itemJustAdded && (
          <PopUnder
            alignRight
            style={{ position: `fixed`, right: 7, top: 73, zIndex: 1000 }}
            tailwindBgColor="flprimary"
          >
            <Dual.P className="text-white px-8 py-4 font-sans antialiased">
              <>An item was added to your cart</>
              <>Un artículo fue añadido a tu carrito</>
            </Dual.P>
          </PopUnder>
        )}
        {appState.view === `modal:checkout` && <Checkout />}
        {appState.view === `modal:request-free` && (
          <RequestFreeBooks currentPageBook={appState.book} />
        )}
        {appState.view === `app` && (
          <>
            <Slideover close={() => setMenuOpen(false)} />
            <Nav
              onHamburgerClick={() => setMenuOpen(!menuOpen)}
              onCartBadgeClick={() => store.open()}
              showCartBadge={numCartItems > 0}
            />
            <div
              style={{ paddingTop: 70 }}
              className="Content flex flex-col relative overflow-hidden bg-white min-h-screen"
            >
              {children}
              <Footer bgImg={data.mountains.image.fluid} />
            </div>
          </>
        )}
      </AppDispatch.Provider>
    </ErrorBoundary>
  );
};

export default Layout;
