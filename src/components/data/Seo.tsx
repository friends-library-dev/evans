import React from 'react';
import { Helmet } from 'react-helmet';
import { t } from '@friends-library/locale';
import { LANG } from '../env';

interface Props {
  title: string;
  description: string | [string, string];
}

const Seo: React.FC<Props> = ({ title, description }) => {
  const metaDesc = Array.isArray(description)
    ? description[LANG === `en` ? 0 : 1]
    : description;
  return (
    <Helmet>
      <title>
        {title} | {t`Friends Library`}
      </title>
      <meta name="description" content={metaDesc} />
      <meta property="og:title" content={`${title} | ${t`Friends Library`}`} />
      <meta property="og:description" content={metaDesc} />
    </Helmet>
  );
};

export default Seo;
