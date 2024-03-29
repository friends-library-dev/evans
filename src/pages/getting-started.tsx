import React from 'react';
import cx from 'classnames';
import { graphql } from 'gatsby';
import { t } from '@friends-library/locale';
import { LANG } from '../components/env';
import { PAGE_META_DESCS } from '../lib/seo';
import { Layout, Seo } from '../components/data';
import GettingStartedPaths from '../components/data/GettingStartedPaths';
import BooksBgBlock from '../components/data/BooksBgBlock';
import DuoToneWaveBlock from '../components/blocks/DuoToneWaveBlock';
import Dual from '../components/Dual';
import EmbeddedAudio from '../components/EmbeddedAudio';
import Heading from '../components/Heading';
import { makeScroller } from '../components/lib/scroll';
import { NumPublishedBooks } from '../types';

interface Props {
  data: NumPublishedBooks;
}

const GettingStartedPage: React.FC<Props> = ({ data: { numPublished } }) => (
  <Layout>
    <Seo
      title={t`Getting Started`}
      description={PAGE_META_DESCS[`getting-started`][LANG].replace(
        /%NUM_ENGLISH_BOOKS%/g,
        String(numPublished.books.en),
      )}
    />
    <BooksBgBlock className="flex flex-col items-center">
      <Heading darkBg className="text-white">
        <Dual.Frag>
          <>Not sure where to get started?</>
          <>¿No estás seguro de dónde empezar?</>
        </Dual.Frag>
      </Heading>
      <Dual.P className="text-center body-text text-white text-lg leading-loose max-w-4xl md:text-left">
        <>
          Interested in reading something from the early Quakers, but picking from{` `}
          {numPublished.books[LANG]} books seems daunting? No worries&mdash;on this page
          we’ve selected some of our favorite books and arranged them into four
          categories. Plus we’ve got an introductory audio to help introduce you to the
          early Friends.
        </>
        <>
          ¿Estás interesado en leer algo de los primeros Cuáqueros, pero no estás seguro
          de dónde empezar? ¡No hay problema! En esta página hemos seleccionado algunos de
          nuestros libros favoritos y los hemos organizado en categorías para ayudarte a
          decidir. Además, hemos puesto un audio introductorio para ayudarte a conocer
          quienes fueron los primeros Amigos.
        </>
      </Dual.P>
    </BooksBgBlock>
    <DuoToneWaveBlock className="pt-12 px-6 pb-32">
      <div className="flex flex-col sm:items-center">
        <Dual.H2 className="font-sans text-3xl px-6 text-center mb-6 tracking-wide md:text-left">
          <>Step 1: Audio Introduction</>
          <>Paso 1: Audio Introductorio</>
        </Dual.H2>
        <Dual.P className="body-text text-center px-6 mb-10 text-lg leading-loose max-w-3xl md:pr-20">
          <>
            If you haven’t listened to our introductory audio explaining who the early
            Quakers were, we recommend you start here by clicking the play button below:
          </>
          <>
            Si nunca has escuchado nuestro audio introductorio que explica quienes fueron
            los primeros Cuáqueros, te recomendamos que empieces por aquí, haciendo clic
            al botón de reproducir a continuación:
          </>
        </Dual.P>
        <div className="max-w-3xl sm:w-3/4">
          <EmbeddedAudio
            trackId={LANG === `es` ? 783137959 : 242345955}
            title={
              LANG === `es`
                ? `¿Quienes Eran Los Primeros Cuáqueros?`
                : `Introduction to the Early Quakers`
            }
            showArtwork={false}
          />
        </div>
      </div>
    </DuoToneWaveBlock>
    <div className="bg-flgray-100 py-12 px-16">
      <Dual.H2 className="font-sans text-3xl text-center mb-6 tracking-wide">
        <>Step 2: Choose A Path</>
        <>Paso 2: Escoge un Camino</>
      </Dual.H2>
      <Dual.P className="body-text text-lg text-center max-w-3xl mx-auto">
        <>
          Now for the only decision you need to make: of the four categories below, which
          one interests you the most? Click one of the colored boxes below to see our
          recommendations for that particular category.
        </>
        <>
          La única decisión que tienes que tomar es la siguiente: de las categorías a
          continuación ¿Cuál es la que más te interesa? Haz clic en uno de los cuadros a
          continuación para ver nuestras recomendaciones para esa categoría en particular.
        </>
      </Dual.P>
    </div>
    <div className="md:flex flex-wrap">
      <PathIntro
        title={t`History`}
        color="maroon"
        onClick={() => makeScroller(`.PathBlock--history`)()}
      >
        <HistoryBlurb />
      </PathIntro>
      <PathIntro
        title={t`Doctrine`}
        color="blue"
        onClick={() => makeScroller(`.PathBlock--doctrinal`)()}
      >
        <DoctrineBlurb />
      </PathIntro>
      <PathIntro
        title={t`Spiritual Life`}
        color="green"
        onClick={() => makeScroller(`.PathBlock--spiritual-life`)()}
      >
        <DevotionalBlurb />
      </PathIntro>
      <PathIntro
        title={LANG === `en` ? `Journals` : `Biográfico`}
        color="gold"
        onClick={() => makeScroller(`.PathBlock--journal`)()}
      >
        <JournalsBlurb />
      </PathIntro>
    </div>
    <GettingStartedPaths
      {...{ HistoryBlurb, DoctrineBlurb, DevotionalBlurb, JournalsBlurb }}
    />
  </Layout>
);

export default GettingStartedPage;

interface PathIntroProps {
  title: string;
  className?: string;
  color: 'blue' | 'maroon' | 'gold' | 'green';
  onClick: () => void;
  noBooks?: boolean;
}

const PathIntro: React.FC<PathIntroProps> = ({
  className,
  color,
  title,
  children,
  onClick,
  noBooks,
}) => (
  <section
    onClick={onClick}
    className={cx(
      className,
      !noBooks && `cursor-pointer`,
      `bg-fl${color}`,
      `p-8 pb-4 md:w-1/2 lg:w-1/4 flex flex-col justify-start`,
    )}
  >
    <h3 className="font-sans text-white text-center text-3xl tracking-wide mb-8">
      {title}
    </h3>
    <p className="body-text text-white text-md mb-8">{children}</p>
    {!noBooks && (
      <div className="flex flex-col items-center mb-10 text-xl mt-auto">
        <button className="text-white uppercase font-sans tracking-wider text-base">
          {t`Learn More`}
        </button>
        <i className="fa fa-chevron-down text-white antialiased pt-2" />
      </div>
    )}
  </section>
);

export const query = graphql`
  query GettingStartedPage {
    numPublished: publishedCounts {
      ...PublishedBooks
    }
  }
`;

export const DevotionalBlurb: React.FC = () => (
  <Dual.Frag>
    <>
      Early Friends left behind a precious treasury of devotional writings which, when
      read by hungry hearts, greatly tend to kindle love towards God, faithfulness in
      obedience, meekness towards all fellow-creatures, and a deep sense of humility and
      sobriety during this time of our sojourning in the body.
    </>
    <>
      Los primeros Amigos dejaron un tesoro de ricos escritos espirituales que, cuando son
      leídos por corazones hambrientos, tienden grandemente a despertar amor hacia Dios,
      fidelidad en la obediencia, mansedumbre para con todos, y un profundo sentido de
      humildad y sobriedad durante el tiempo de nuestra estancia en el cuerpo.
    </>
  </Dual.Frag>
);

export const JournalsBlurb: React.FC = () => (
  <Dual.Frag>
    <>
      The most common of all Quaker writings are their journals. These are incredibly
      inspiring and instructive records of real men and women who walked in the
      &ldquo;ancient path&rdquo; of obedience, humility, faith, and love&mdash;overcoming
      the world not by their own strength, but by clinging to the grace of Jesus Christ
      that springs up in the heart.
    </>
    <>
      De todos los escritos de los Cuáqueros, sus diarios y biografías son los más
      comunes. Estos son relatos increíblemente inspiradores e instructivos de hombres y
      mujeres que caminaron en la “senda antigua” de obediencia, humildad, fe y
      amor—venciendo al mundo, no por su propia fuerza, sino por aferrarse a la gracia de
      Jesucristo que brota en el corazón.
    </>
  </Dual.Frag>
);

export const DoctrineBlurb: React.FC = () => (
  <Dual.Frag>
    <>
      Although they hold much in common with other Bible-believing Christian groups, there
      are a number of distinctive doctrines, principles, and testimonies that they were
      led by the Spirit of Truth to embrace and maintain, and which set them apart from
      other Christian communities.
    </>
    <>
      Aunque ellos tienen mucho en común con otros grupos cristianos que creen en la
      Biblia, hay una cantidad de doctrinas, principios y testimonios distintivos que los
      Cuáqueros fueron llevados por el Espíritu de la Verdad a abrazar y mantener, cosas
      que los diferenciaban de otras comunidades cristianas.
    </>
  </Dual.Frag>
);

export const HistoryBlurb: React.FC = () => (
  <Dual.Frag>
    <>
      Get a feel for the history of the early Society of Friends from their own
      contemporary historians. Learn about the context in which they emerged, the great
      sufferings of the early generations, the spread and progress of Truth in Great
      Britain, colonial America, and beyond, and become familiar with many of the notable
      figures among early Friends.
    </>
    <>
      Actualmente tenemos dos libros históricos disponibles en español; uno que está
      completo, y otro que se encuentra en proceso de traducción. Estos excelentes libros
      te ayudarán a aprender acerca de la historia de la primera Sociedad de Amigos, cómo
      fue su surgimiento, sus grandes sufrimientos y fidelidad, y la difusión de la Verdad
      en Gran Bretaña, Europa, las colonias de América y más allá.
    </>
  </Dual.Frag>
);
