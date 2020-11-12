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
import * as AppBadges from '../components/AppBadges';
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
          <Dual.H1 className="heading-text text-2xl sm:text-4xl bracketed text-flprimary">
            <>Friends Library App</>
            <>Aplicación de Bibliotecas de Los Amigos</>
          </Dual.H1>
        </WhiteOverlay>
      </BooksBgBlock>
      <div className="p-10 flex flex-col items-center md:py-16">
        <Dual.H2 className="text-flgray-900 text-3xl tracking-widest mb-6">
          <>Now available for iOS and Android</>
          <>Ya se encuentra disponible en iOS y Android</>
        </Dual.H2>
        <Dual.P className="body-text text-xl pb-8 max-w-screen-md leading-loose">
          <>
            <b>November 12, 2020</b> &mdash; Friends Library now has iPhone and Android
            apps available for free on the Apple App Store and Google Play Store. Use one
            of the links below to download the right app for your phone or device.
          </>
          <>
            <b>Noviembre 12, 2020</b> &mdash; La Biblioteca de los Amigos ahora tiene una
            aplicación gratuita disponible en la App Store y en Google Play Store. Haz
            clic en uno de los enlaces a continuación para descargar la aplicación que
            corresponda a tu teléfono o dispositivo.
          </>
        </Dual.P>
        <div className="max-w-xs sm:max-w-lg px-6 flex flex-col sm:flex-row space-y-6  sm:space-y-0 sm:space-x-8 items-center mb-10">
          <AppBadges.Ios />
          <AppBadges.Android />
        </div>
        <Dual.H3 className="text-flgray-900 text-2xl tracking-widest mb-6">
          <>
            Easier <span className="underline">audiobooks</span> now, with more to come
            soon!
          </>
          <>¡Ahora es más fácil escuchar los audios, y pronto habrán más disponibles!</>
        </Dual.H3>
        <Dual.P className="body-text pb-12 max-w-screen-md leading-loose">
          <>
            Friends Library currently has {data.audioBooks.totalCount} titles recorded as
            audiobooks, with more being added regularly. Unfortunately, downloading and
            listening to our audiobooks directly from this website is quite difficult,
            even for knowledgable users. The first version of our iPhone and Android apps
            are focused on making is super easy to download and listen to any of our
            audiobooks, wherever you are. Just select an audiobook from the list and press
            play. You can download whole books while you&rsquo;re connected to Wifi, and
            listen to them conveniently later when you may or may not have internet.
          </>
          <>
            Actualmente, La Biblioteca de los Amigos tiene {data.audioBooks.totalCount}
            {` `}
            libros grabados en forma de Audiolibros, y ese número seguirá creciendo.
            Desafortunadamente, descargar y escuchar nuestros audiolibros directamente
            desde este sitio web puede ser difícil, incluso para usuarios con cierto
            conocimiento. El objetivo principal de esta primera versión de nuestra
            aplicación (disponible en Iphone y Android) es hacer que sea muy sencillo
            descargar y escuchar cualquiera de nuestros audiolibros, sin importar donde
            estés. Solo tienes que seleccionar un audiolibro de la lista y darle a
            reproducir. Puedes descargar libros enteros mientras estés conectado a un
            Wifi, y escucharlos luego a tu conveniencia, sin conexión de internet.
          </>
        </Dual.P>
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
        <Dual.P className="body-text pb-12 max-w-screen-md leading-loose">
          <>
            In the future, we plan to add a number of useful features to the app, all with
            goal of making it easier for everyone to find, listen, read and benefit from
            these invaluable writings. It is our hope that many would be encouraged to
            faithfully and fervently follow in the footsteps of these exemplary men and
            women who ran well and fought the good fight, leaving us many precious
            testimonies of lives fully surrendered to the grace, light and spirit of our
            Lord Jesus Christ.
          </>
          <>
            En el futuro, planeamos añadirle a la aplicación unas cuántas funciones muy
            útiles, todas con el objetivo de hacer que sea más sencillo para todos
            encontrar, escuchar, leer y beneficiarse de estos invaluables escritos.
            Tenemos la esperanza de que muchos se animen a seguir fiel y fervientemente
            las pisadas de estos ejemplares hombres y mujeres que corrieron bien y
            pelearon la buena batalla, dejándonos muchos testimonios preciosos de vidas
            entregadas completamente a la gracia, luz y Espíritu de nuestro Señor
            Jesucristo.
          </>
        </Dual.P>
        <Dual.H3 className="text-flgray-900 text-2xl tracking-widest mb-6">
          <>Getting help or suggesting features</>
          <>Obtener ayuda o sugerir funciones</>
        </Dual.H3>
        <Dual.P className="body-text pb-12 max-w-screen-md leading-loose">
          <>
            If you come across anything that is confusing or seems to not work for you,
            please reach out using our{` `}
            <Link className="text-flprimary fl-underline" to={t`/contact`}>
              contact page.
            </Link>
            {` `}
            Or, just let us know if you find the app useful, or what other features you
            think we should be working on. Thanks for trying it out! For details on our
            app privacy policy,{` `}
            <Link to={`/app-privacy`} className="text-flprimary fl-underline">
              see here.
            </Link>
          </>
          <>
            Si te encuentras con algo que sea confuso o parezca no funcionarte, por favor
            háznoslo saber por medio de nuestra{` `}
            <Link className="text-flprimary fl-underline" to={t`/contact`}>
              página de contacto.
            </Link>
            {` `}
            O, simplemente coméntanos si la aplicación te ha sido útil, o qué otra función
            te parece que deberíamos añadir. ¡Gracias por probarla! Para conocer los
            detalles de la política de privacidad de nuestra aplicación,{` `}
            <Link to={`/app-privacy`} className="text-flprimary fl-underline">
              ngresa aquí.
            </Link>
          </>
        </Dual.P>
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
