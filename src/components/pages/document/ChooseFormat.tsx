import React from 'react';
import { t } from '@friends-library/locale';
import ChoiceStep from './ChoiceStep';
import ChoiceItem from './ChoiceItem';
import Ebook from '../../icons/Ebook';
import Pdf from '../../icons/Pdf';
import { LANG } from '../../env';

interface Props {
  onChoose: (choice: 'ebook' | 'web_pdf' | 'speech') => any;
}
const ChooseFormat: React.FC<Props> = ({ onChoose }) => (
  <ChoiceStep title={t`Choose Download Format`}>
    <ChoiceItem
      label={t`E-Book`}
      description={t`Best for reading on a computer, phone, or tablet.`}
      recommended
      Icon={Ebook}
      onChoose={() => onChoose(`ebook`)}
    />
    <ChoiceItem
      label="PDF"
      description={t`Best for printing out your own copy.`}
      Icon={Pdf}
      onChoose={() => onChoose(`web_pdf`)}
    />
    <ChoiceItem
      label={LANG === `es` ? `Texto Sin Formato` : `Plain Text`}
      description={t`Best for text-to-speech apps like “Voice Dream.”`}
      Icon={() => <i className="fa-commenting-o fa text-4xl pl-1" />}
      onChoose={() => onChoose(`speech`)}
    />
  </ChoiceStep>
);

export default ChooseFormat;
