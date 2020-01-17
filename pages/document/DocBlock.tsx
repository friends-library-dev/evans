import React, { useState, useRef, useEffect } from 'react';
import Link from 'gatsby-link';
import { CoverProps, PrintSize, EditionType } from '@friends-library/types';
import { bookDims } from '@friends-library/lulu';
import { ThreeD } from '@friends-library/cover-component';
import { DownloadWizard, AddToCartWizard } from '@friends-library/ui';
import DocActions from './DocActions';
import CartItem from '../../checkout/models/CartItem';
import CartStore from '../../checkout/services/CartStore';
import SpinBook from '../../images/spin-book.png';
import './DocBlock.css';

type Props = Omit<CoverProps, 'pages'> & {
  authorUrl: string;
  documentId: string;
  author: string;
  price: number;
  hasAudio: boolean;
  description: string;
  numChapters: number;
  altLanguageUrl?: string | null;
  pages: number[];
  editions: {
    title: string[];
    interiorPdfUrl: string[];
    coverPdfUrl: string[];
    type: EditionType;
    printSize: PrintSize;
    numPages: number[];
    downloadUrl: {
      web_pdf: string;
      mobi: string;
      epub: string;
    };
  }[];
};

type Perspective = 'back' | 'front' | 'spine' | 'angle-front' | 'angle-back';

const store = CartStore.getSingleton();

const DocBlock: React.FC<Props> = props => {
  const { title, authorUrl, pages, author, description, editions } = props;
  const wrap = useRef<HTMLDivElement | null>(null);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const [perspective, setPerspective] = useState<Perspective>('angle-front');
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
    document.querySelectorAll('.DocBlock .MultiPill > button').forEach(btn => {
      if (visibleBtnRect && downloading) return;
      const rect = btn.getBoundingClientRect();
      if (rect.width && rect.height) {
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
    setTimeout(() => {}, 0);
  };

  useEffect(positionWizard, [downloading, addingToCart, wrap.current]);
  useEffect(() => {
    window.addEventListener('resize', positionWizard);
    return () => window.removeEventListener('resize', positionWizard);
  }, [downloading, addingToCart, wrap.current]);

  useEffect(() => {
    const escape: (e: KeyboardEvent) => any = ({ keyCode }) => {
      if (keyCode === 27 && (downloading || addingToCart)) {
        setDownloading(false);
        setAddingToCart(false);
      }
    };
    document.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [downloading]);

  const addToCart = (editionType: EditionType): void => {
    const edition = editions.find(e => e.type === editionType);
    if (!edition) throw new Error(`Error selecting edition: ${editionType}`);
    store.cart.addItem(
      new CartItem({
        title: edition.title,
        documentId: props.documentId,
        edition: edition.type,
        quantity: 1,
        printSize: edition.printSize,
        numPages: edition.numPages,
        author,
        interiorPdfUrl: edition.interiorPdfUrl,
        coverPdfUrl: edition.coverPdfUrl,
      }),
    );
  };

  return (
    <section
      ref={wrap}
      className="DocBlock relative bg-white pt-8 pb-12 px-10 md:px-12 xl:flex xl:flex-col xl:items-center"
    >
      {addingToCart && (
        <AddToCartWizard
          {...wizardOffset}
          editions={props.editions.map(e => e.type)}
          onSelect={editionType => {
            addToCart(editionType);
            setAddingToCart(false);
          }}
        />
      )}
      {downloading && (
        <DownloadWizard
          {...wizardOffset}
          eBookTypeRecommendation="epub"
          onSelect={(editionType, fileType) => {
            const edition = props.editions.find(e => e.type === editionType);
            if (edition) {
              setTimeout(() => setDownloading(false), 4000);
              window.location.href = edition.downloadUrl[fileType];
            }
          }}
          editions={props.editions.map(e => e.type)}
        />
      )}
      <div className="TopWrap md:flex">
        <div className="flex flex-col items-center order-1">
          <div className="hidden xl:block">
            <ThreeD
              {...props}
              pages={pages[0]}
              perspective={perspective}
              scaler={4 / 5}
              scope="4-5"
            />
          </div>
          <div className="xl:hidden">
            <ThreeD
              {...props}
              pages={pages[0]}
              perspective={perspective}
              scaler={3 / 5}
              scope="3-5"
            />
          </div>
          <button
            className="focus:outline-none pt-1"
            onClick={() => setPerspective(nextPerspective(perspective))}
          >
            <img src={SpinBook} alt="Spin Book" />
          </button>
        </div>
        <div className="Text mb-8 md:px-12 bg-white md:mr-6 xl:mr-10">
          <h1 className="font-sans text-3xl md:text-2-5xl font-bold leading-snug mt-8 tracking-wider mb-6">
            {title}
          </h1>
          <h2 className="font-sans text-1-5xl md:text-xl subpixel-antialiased leading-loose mb-8">
            <i className="font-serif tracking-widest pr-1">by:</i>{' '}
            <Link className="strong-link" to={authorUrl}>
              {author}
            </Link>
          </h2>
          <p className="font-serif text-xl md:text-lg antialiased leading-relaxed">
            {description}
          </p>
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
    pages,
    altLanguageUrl,
    className,
    onClickDownload,
    onClickAddToCart,
  } = props;
  return (
    <div className={className}>
      <DocActions
        download={onClickDownload}
        addToCart={onClickAddToCart}
        className="mb-8 lg:mx-24 xl:mx-0"
        price={price}
        hasAudio={hasAudio}
      />
      <div className="DocMeta flex flex-col items-center">
        <ul className="text-sans text-gray-600 leading-loose antialiased">
          <li>{author}</li>
          <li className="capitalize">{edition} Edition</li>
          <li>{dimensions(size, pages)}</li>
          <li>{numChapters} Chapters</li>
          <li>{pages.map(p => `${p} pages`).join(', ')}</li>
          <li>112 Downloads</li>
          <li>English Language</li>
          {altLanguageUrl && (
            <li>
              <a href={altLanguageUrl}>Spanish Version</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function dimensions(size: PrintSize, pages: number[]): string {
  return pages
    .map(p => bookDims(size, p))
    .map(dims => `${dims.width} x ${dims.height} x ${dims.depth.toPrecision(2)} in`)
    .join(', ');
}

function nextPerspective(perspective: Perspective): Perspective {
  switch (perspective) {
    case 'angle-front':
      return 'spine';
    case 'spine':
      return 'angle-back';
    case 'angle-back':
      return 'back';
    default:
      return 'angle-front';
  }
}

function ensureWizardInViewport(): void {
  const wizard = document.querySelector('.ChoiceWizard');
  if (!wizard) {
    return;
  }

  const { bottom } = wizard.getBoundingClientRect();
  if (bottom > window.innerHeight) {
    const extraSpace = 25;
    const scrollTo = bottom - window.innerHeight + window.scrollY + extraSpace;
    window.scrollTo({ top: scrollTo, behavior: 'smooth' });
  }
}

const POPUNDER_TRIANGLE_HEIGHT = 16;
