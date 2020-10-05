import React from 'react';
import cx from 'classnames';

interface Props {
  tailwindColor?: string;
  className?: string;
}

const DownloadIcon: React.FC<Props> = ({ tailwindColor = `flgray-900`, className }) => {
  return (
    <svg
      className={cx(className, `inline-block`)}
      width="19"
      height="14"
      viewBox="0 0 19 14"
    >
      <path
        className={cx(`text-${tailwindColor}`, `fill-current`)}
        d="M9.49989674,0 C8.02198587,0 6.53527717,0.562157631 5.40828804,1.68564937 C4.57009891,2.52123734 4.06186957,3.55788854 3.84646739,4.63880413 C1.65940217,5.06182749 0,6.96628701 0,9.2647407 C0,11.8728392 2.13378261,14 4.75,14 L14.8695652,14 C17.1468804,14 19,12.152693 19,9.88238322 C19,7.73998721 17.3437989,5.99473533 15.2437826,5.80347203 C15.2534633,4.31324476 14.7226457,2.81984691 13.5851652,1.68585525 C12.4589815,0.563166447 10.9778283,0.000205880839 9.4999587,0.000205880839 L9.49989674,0 Z M9.49989674,1.23528503 C10.6639978,1.23528503 11.8176902,1.66716127 12.7073859,2.55419887 C13.7359674,3.57958839 14.1715837,4.9724752 14.0110543,6.30514187 C13.9892725,6.48046176 14.0433234,6.6573834 14.1602993,6.79009419 C14.2780808,6.92279057 14.446683,6.99918677 14.6241678,6.99998971 L14.8694124,6.99998971 C16.482058,6.99998971 17.7607167,8.27468033 17.7607167,9.88232145 C17.7607167,11.4899626 16.482058,12.7646532 14.8694124,12.7646532 L4.74984717,12.7646532 C2.80321457,12.7646532 1.23897761,11.2052705 1.23897761,9.26467894 C1.23897761,7.43266888 2.63702652,5.93929162 4.42726022,5.77746928 C4.71686565,5.74932125 4.94759174,5.52413291 4.98228739,5.23703208 C5.09603543,4.25829516 5.53085043,3.30689921 6.28595587,2.55419887 C7.17497,1.66794362 8.33584935,1.23528503 9.49984717,1.23528503 L9.49989674,1.23528503 Z M9.49989674,4.94114014 C9.15785543,4.94114014 8.88033152,5.21780281 8.88033152,5.55878266 L8.88033152,9.5156065 L7.64764457,8.39612944 C7.40723261,8.17898692 6.98855109,8.19668238 6.76992717,8.4347321 C6.55130326,8.67278182 6.54647065,9.06684804 6.80865,9.30972566 L9.08038913,11.3685341 C9.1844575,11.4634328 9.29335435,11.5293785 9.49987609,11.5293785 C9.70639783,11.5293785 9.79675109,11.4803212 9.91936304,11.3685341 L12.1911022,9.30972566 C12.4290772,9.09017434 12.4742641,8.67277152 12.229825,8.4347321 C11.9982935,8.2087367 11.5925196,8.17898692 11.3521076,8.39612944 L10.1194207,9.5156065 L10.1194207,5.55878266 C10.1194207,5.21780281 9.84189674,4.94114014 9.49985543,4.94114014 L9.49989674,4.94114014 Z"
      />
    </svg>
  );
};

export default DownloadIcon;
