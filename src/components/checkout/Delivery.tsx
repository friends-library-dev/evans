import React, { useState } from 'react';
import Link from 'gatsby-link';
import cx from 'classnames';
import { t } from '@friends-library/locale';
import Dual from '../Dual';
import Button from '../Button';
import Header from './Header';
import Progress from './Progress';
import MessageThrobber from './MessageThrobber';
import Input from './Input';
import Back from './Back';
import NoProfit from './NoProfit';
import ErrorMsg from './ErrorMsg';
import { Address } from './types';
import countries from './countries';
import './Delivery.css';

type AddressWithEmail = Address & { email: string };

const Delivery: React.FC<{
  onSubmit: (address: AddressWithEmail) => void;
  onBack: () => void;
  stored?: Partial<AddressWithEmail>;
  throbbing?: boolean;
  error?: boolean;
}> = ({ onSubmit, onBack, stored = {}, error, throbbing }) => {
  const [email, setEmail] = useState<string>(stored.email || ``);
  const [emailBlurred, setEmailBlurred] = useState<boolean>(false);
  const [name, setName] = useState<string>(stored.name || ``);
  const [nameBlurred, setNameBlurred] = useState<boolean>(false);
  const [street, setStreet] = useState<string>(stored.street || ``);
  const [streetBlurred, setStreetBlurred] = useState<boolean>(false);
  const [street2, setStreet2] = useState<string>(stored.street2 || ``);
  const [city, setCity] = useState<string>(stored.city || ``);
  const [cityBlurred, setCityBlurred] = useState<boolean>(false);
  const [state, setState] = useState<string>(stored.state || ``);
  const [stateBlurred, setStateBlurred] = useState<boolean>(false);
  const [zip, setZip] = useState<string>(stored.zip || ``);
  const [zipBlurred, setZipBlurred] = useState<boolean>(false);
  const [country, setCountry] = useState<string>(stored.country || ``);
  const [countryBlurred, setCountryBlurred] = useState<boolean>(false);

  const allFieldsValid = !!(
    name &&
    street &&
    street.length < 30 &&
    street2.length < 30 &&
    city &&
    state &&
    zip &&
    country &&
    email
  );

  return (
    <div className={cx(throbbing && `pointer-events-none`)}>
      <Header>{t`Delivery`}</Header>
      {!error && <NoProfit className="hidden md:block" />}
      <Progress step="Delivery" />
      {error && <ShippingError />}
      <form
        className="mt-8 relative"
        onSubmit={(e) => {
          e.preventDefault();
          if (allFieldsValid && !throbbing) {
            onSubmit({
              name,
              street,
              street2,
              city,
              state,
              zip,
              country,
              email,
            });
          }
        }}
      >
        {throbbing && <MessageThrobber />}
        <div
          className={cx(
            `InputWrap md:flex flex-wrap justify-between`,
            throbbing && `blur`,
          )}
        >
          <Input
            {...(throbbing ? {} : { autofocus: true })}
            className="order-1"
            onChange={(val) => setName(val)}
            onBlur={() => setNameBlurred(true)}
            onFocus={() => setNameBlurred(false)}
            value={name}
            valid={!nameBlurred || !!name}
            placeholder={t`Full name`}
            invalidMsg={t`Name is required`}
            autoComplete="name"
            name="name"
          />
          <Input
            className="order-3"
            onChange={(val) => setStreet(val)}
            onFocus={() => setStreetBlurred(false)}
            onBlur={() => setStreetBlurred(true)}
            value={street}
            placeholder={t`Street address, P.O. Box, C/O`}
            invalidMsg={
              street.trim() === ``
                ? t`Street address is required`
                : t`Must be less than 30 characters`
            }
            valid={!streetBlurred || (!!street && street.length < 30)}
            autoComplete="address-line1"
            name="address"
          />
          <Input
            className="order-4"
            onChange={(val) => setStreet2(val)}
            value={street2}
            placeholder={t`Apartment, suite, unit, etc.`}
            invalidMsg={t`Must be less than 30 characters`}
            valid={street2.length < 30}
            autoComplete="address-line2"
          />
          <Input
            className="order-5"
            invalidMsg={t`City is required`}
            valid={!cityBlurred || !!city}
            onChange={(val) => setCity(val)}
            onFocus={() => setCityBlurred(false)}
            onBlur={() => setCityBlurred(true)}
            value={city}
            placeholder={t`City`}
            autoComplete="locality"
            name="city"
          />
          <Input
            className="order-6"
            invalidMsg={t`State / Province / Region is required`}
            valid={!stateBlurred || !!state}
            onChange={(val) => setState(val)}
            onFocus={() => setStateBlurred(false)}
            onBlur={() => setStateBlurred(true)}
            value={state}
            placeholder={t`State / Province / Region`}
            autoComplete="shippping region"
            name="region"
          />
          <Input
            className="order-7"
            invalidMsg={t`ZIP / Postal Code is required`}
            valid={!zipBlurred || !!zip}
            onChange={(val) => setZip(val)}
            onFocus={() => setZipBlurred(false)}
            onBlur={() => setZipBlurred(true)}
            value={zip}
            placeholder={t`ZIP / Postal Code`}
            autoComplete="postal-code"
            name="postal"
          />
          <select
            value={country}
            className={cx(
              `CartInput text-gray-500 order-8`,
              countryBlurred && !country && `invalid text-red-600`,
            )}
            onBlur={() => setCountryBlurred(true)}
            onChange={(e) => setCountry(e.target.value)}
            autoComplete="country"
            name="country"
          >
            <option value="">
              {!countryBlurred || country ? t`Select Country` : t`Select a Country`}
            </option>
            {(Object.keys(countries) as Array<keyof typeof countries>).map((code) => (
              <option key={code} value={code}>
                {countries[code]}
              </option>
            ))}
          </select>
          <Input
            className="order-2"
            invalidMsg={email ? t`Valid email is required` : t`Email is required`}
            valid={!emailBlurred || !!email.match(/^\S+@\S+$/)}
            onChange={(val) => setEmail(val)}
            onFocus={() => setEmailBlurred(false)}
            onBlur={() => setEmailBlurred(true)}
            value={email}
            placeholder={t`Email`}
            type="email"
          />
        </div>
        <Back className={cx(throbbing && `blur`)} onClick={onBack}>
          {t`Back to Order`}
        </Back>
        <Button shadow className="mx-auto" disabled={!allFieldsValid || throbbing}>
          {t`Payment`} &nbsp;&rsaquo;
        </Button>
      </form>
    </div>
  );
};

export default Delivery;

const ShippingError: React.FC = () => (
  <ErrorMsg>
    <Dual.Frag>
      <>
        Sorry, we’re not able to ship to that address. Please double-check for any{` `}
        <i>errors,</i> or try an <i>alternate address</i> where you could receive a
        shipment. Still no luck? We might not be able to ship directly to your location,
        but you can{` `}
        <Link to={t`/contact`} className="underline">
          contact us
        </Link>
        {` `}
        to arrange an alternate shipment.
      </>
      <>
        Lo sentimos, no podemos hacer envíos a esa dirección. Por favor, comprueba si hay
        algún <em>error,</em> o intenta una <em>dirección alternativa</em> donde puedas
        recibir el envío. ¿Todavía no lo has logrado? Es posible que no podamos enviar
        directamente a esa ubicación, pero{` `}
        <Link to={t`/contact`} className="underline">
          contáctanos
        </Link>
        {` `}
        para acordar un envío alternativo.
      </>
    </Dual.Frag>
  </ErrorMsg>
);
