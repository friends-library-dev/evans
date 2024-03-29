import React, { useState, useRef, useEffect } from 'react';
import Link from 'gatsby-link';
import { bookDims } from '@friends-library/lulu';
import { t } from '@friends-library/locale';
import type { CoverProps, PrintSize, EditionType } from '@friends-library/types';
import Dual from '../../Dual';
import { LANG } from '../../env';
import CartItem from '../../checkout/models/CartItem';
import CartStore from '../../checkout/services/CartStore';
import SpanishFreeBooksNote from '../../SpanishFreeBooksNote';
import { makeScroller } from '../../lib/scroll';
import RotatableCover from './RotatableCover';
import AddToCartWizard from './AddToCartWizard';
import DocActions from './DocActions';
import DownloadWizard from './DownloadWizard';
import './DocBlock.css';

type Props = Omit<CoverProps, 'pages'> & {
  htmlTitle: string;
  htmlShortTitle: string;
  utf8ShortTitle: string;
  originalTitle?: string;
  authorUrl: string;
  editionId: string;
  author: string;
  price: number;
  hasAudio: boolean;
  description: string;
  numChapters: number;
  numDownloads: number;
  altLanguageUrl?: string | null;
  pages: number[];
  isComplete: boolean;
  editions: {
    id: string;
    title: string;
    type: EditionType;
    printSize: PrintSize;
    numPages: number[];
    downloadUrl: {
      web_pdf: string;
      mobi: string;
      epub: string;
      speech: string;
    };
  }[];
};

const store = CartStore.getSingleton();

const DocBlock: React.FC<Props> = (props) => {
  const { authorUrl, pages, author, description, editions } = props;
  const wrap = useRef<HTMLDivElement | null>(null);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const [wizardOffset, setWizardOffset] = useState<{ top: number; left: number }>({
    top: -9999,
    left: -9999,
  });

  const positionWizard: () => void = () => {
    if (!wrap.current || (!downloading && !addingToCart)) {
      return;
    }
    // i should lose my React license for this
    let visibleBtnRect: DOMRect | undefined;
    document.querySelectorAll(`.DocBlock .MultiPill > button`).forEach((btn) => {
      const rect = btn.getBoundingClientRect();
      if (!rect.width && !rect.height) {
        return;
      }
      const text = (btn.textContent || ``).toLowerCase();
      if (
        (downloading && text.match(/download|descargar/)) ||
        (addingToCart && text.includes(`.`))
      ) {
        visibleBtnRect = rect;
      }
    });

    if (!visibleBtnRect) {
      return;
    }

    const wrapRect = wrap.current.getBoundingClientRect();
    const top =
      visibleBtnRect.top -
      wrapRect.top +
      visibleBtnRect.height +
      POPUNDER_TRIANGLE_HEIGHT;
    const left = visibleBtnRect.x + visibleBtnRect.width / 2;
    setWizardOffset({ top, left });
    setTimeout(ensureWizardInViewport, 0);
  };

  useEffect(positionWizard, [downloading, addingToCart]);

  useEffect(() => {
    window.addEventListener(`resize`, positionWizard);
    return () => window.removeEventListener(`resize`, positionWizard);
  }, [downloading, addingToCart]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const escape: (e: KeyboardEvent) => void = ({ keyCode }) => {
      if (keyCode === 27 && (downloading || addingToCart)) {
        setDownloading(false);
        setAddingToCart(false);
      }
    };
    document.addEventListener(`keydown`, escape);
    return () => window.removeEventListener(`keydown`, escape);
  }, [downloading, addingToCart]);

  const addToCart = (editionType: EditionType): void => {
    const edition = editions.find((e) => e.type === editionType);
    if (!edition) throw new Error(`Error selecting edition: ${editionType}`);
    store.cart.addItem(
      new CartItem({
        displayTitle: props.htmlShortTitle,
        title: edition.title,
        editionId: edition.id,
        edition: edition.type,
        quantity: 1,
        printSize: edition.printSize,
        numPages: edition.numPages,
        author,
      }),
    );
  };

  return (
    <section
      ref={wrap}
      className="DocBlock relative bg-white pt-8 pb-12 px-10 md:px-12 lg:pb-24 xl:flex xl:flex-col xl:items-center"
    >
      {addingToCart && (
        <AddToCartWizard
          {...wizardOffset}
          editions={props.editions.map((e) => e.type)}
          onSelect={(editionType) => {
            addToCart(editionType);
            setAddingToCart(false);
            setWizardOffset({ top: -9999, left: -9999 });
          }}
        />
      )}
      {downloading && (
        <DownloadWizard
          {...wizardOffset}
          onSelect={(editionType, fileType) => {
            const edition = props.editions.find((e) => e.type === editionType);
            if (edition) {
              setTimeout(() => {
                setDownloading(false);
                setWizardOffset({ top: -9999, left: -9999 });
              }, 4000);
              const referer = `${window.location.origin}${window.location.pathname}`;
              window.location.href = `${edition.downloadUrl[fileType]}?referer=${referer}`;
            }
          }}
          editions={props.editions.map((e) => e.type)}
        />
      )}
      <div className="TopWrap md:flex">
        <RotatableCover className="order-1" coverProps={{ ...props, pages: pages[0] }} />
        <div className="Text mb-8 md:px-12 bg-white md:mr-6 xl:mr-10">
          <h1
            className="font-sans text-3xl md:text-2-5xl font-bold leading-snug mt-8 tracking-wider mb-6"
            dangerouslySetInnerHTML={{ __html: titleHtml(props) }}
          />
          {!props.isCompilation && (
            <h2 className="font-sans text-1-5xl md:text-xl subpixel-antialiased leading-loose mb-8">
              <i className="font-serif tracking-widest pr-1">{t`by`}:</i>
              {` `}
              <Link className="strong-link" to={authorUrl}>
                {author}
              </Link>
            </h2>
          )}
          {!props.isComplete && (
            <Dual.P className="font-serif text-xl md:text-lg antialiased italic leading-relaxed mb-4 text-flprimary-800">
              <>
                <sup>*</sup>
                This book is not yet completely published. Since individual chapters are
                valuable on their own, they will be made available as they are completed.
              </>
              <>
                <sup>*</sup>
                Este libro aún está siendo traducido, sin embargo, dado que cada capítulo
                es muy valioso, estarán disponibles a medida que se vayan completando.
              </>
            </Dual.P>
          )}
          <p
            className="font-serif text-xl md:text-lg antialiased leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: props.originalTitle
                ? `${description} (${t`Original title`}: <em>${props.originalTitle}</em>)`
                : description,
            }}
          />
          <LinksAndMeta
            className="hidden xl:block xl:mt-10"
            onClickAddToCart={() => {
              if (editions.length === 1) {
                return addToCart(editions[0].type);
              }
              setAddingToCart(!addingToCart);
              setDownloading(false);
            }}
            onClickDownload={() => {
              setDownloading(!downloading);
              setAddingToCart(false);
            }}
            {...props}
          />
        </div>
      </div>
      <LinksAndMeta
        className="xl:hidden mt-6"
        onClickAddToCart={() => {
          if (editions.length === 1) {
            return addToCart(editions[0].type);
          }
          setAddingToCart(!addingToCart);
          setDownloading(false);
        }}
        onClickDownload={() => {
          setDownloading(!downloading);
          setAddingToCart(false);
        }}
        {...props}
      />
    </section>
  );
};

export default DocBlock;

function LinksAndMeta(
  props: Props & {
    className: string;
    onClickDownload: () => any;
    onClickAddToCart: () => any;
  },
): JSX.Element {
  const {
    price,
    hasAudio,
    size,
    author,
    edition,
    numChapters,
    numDownloads,
    pages,
    altLanguageUrl,
    className,
    onClickDownload,
    onClickAddToCart,
    utf8ShortTitle,
  } = props;
  return (
    <div className={className}>
      <DocActions
        download={onClickDownload}
        addToCart={onClickAddToCart}
        gotoAudio={makeScroller(`#audiobook`)}
        className="mb-8 flex flex-col md:flex-row items-center md:items-start lg:mx-24 xl:mx-0"
        price={price}
        hasAudio={hasAudio}
      />
      <div className="DocMeta flex flex-col items-center">
        <ul className="diamonds text-sans text-gray-600 leading-loose antialiased">
          <li>{author}</li>
          {LANG === `en` && <li className="capitalize">{edition} Edition</li>}
          <li>{dimensions(size, pages)}</li>
          <li>{numChapters > 1 ? t`${numChapters} chapters` : t`1 chapter`}</li>
          <li>{pages.map((p) => t`${p} pages`).join(`, `)}</li>
          {numDownloads > 10 && (
            <li>
              <Dual.Frag>
                <>{numDownloads.toLocaleString()} downloads</>
                <>{numDownloads.toLocaleString().replace(/,/g, `.`)} descargas</>
              </Dual.Frag>
            </li>
          )}
          <li>
            <Dual.Frag>
              <>Language: English</>
              <>Idioma: Español</>
            </Dual.Frag>
          </li>
          {altLanguageUrl && (
            <li>
              <Dual.A href={altLanguageUrl}>
                <>Spanish Version</>
                <>Versión en inglés</>
              </Dual.A>
            </li>
          )}
        </ul>
      </div>
      <SpanishFreeBooksNote
        bookTitle={`${utf8ShortTitle} — ${author}`}
        className="body-text mt-8 md:mt-10 sm:px-8 md:px-16 mx-auto max-w-screen-md opacity-75"
      />
    </div>
  );
}

function dimensions(size: PrintSize, pages: number[]): string {
  return (
    pages
      .map((p) => bookDims(size, p))
      .map((dims) =>
        [dims.width, dims.height, dims.depth]
          .map((n) => (LANG === `en` ? n : n * CENTIMETERS_IN_INCH))
          .map((n) => n.toPrecision(2))
          .map((s) => s.replace(/\.0+$/, ``))
          .join(` x `),
      )
      .join(`, `) + `${LANG === `en` ? ` in` : ` cm`}`
  );
}

function ensureWizardInViewport(): void {
  const wizard = document.querySelector(`.ChoiceWizard`);
  if (!wizard) {
    return;
  }

  const { bottom } = wizard.getBoundingClientRect();
  if (bottom > window.innerHeight) {
    const extraSpace = 25;
    const scrollTo = bottom - window.innerHeight + window.scrollY + extraSpace;
    window.scrollTo({ top: scrollTo, behavior: `smooth` });
  }
}

function titleHtml({ htmlTitle, isComplete }: Props): string {
  let html = htmlTitle;
  if (!isComplete) {
    html += `<sup class="text-flprimary-800">*</sup>`;
  }
  return html;
}

const POPUNDER_TRIANGLE_HEIGHT = 16;
const CENTIMETERS_IN_INCH = 2.54;
