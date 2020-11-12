import React from 'react';
import { t } from '@friends-library/locale';
import { LANG } from './env';

interface Props {
  className?: string;
}

export const Ios: React.FC<Props> = ({ className }) => (
  <a
    className={className}
    href={`.netlify/functions/site/app/download/${LANG}/ios`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={`/app-store.${LANG}.png`} alt={t`Download on the App Store`} />
  </a>
);

export const Android: React.FC<Props> = ({ className }) => (
  <a
    className={className}
    href={`.netlify/functions/site/app/download/${LANG}/android`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={`/google-play.${LANG}.png`} alt={t`Get it on Google Play`} />
  </a>
);
