import { useEffect, useState } from 'react';
import { AddressWithEmail } from '../../types';
import { Props as AddressProps } from '../ShippingAddress';

export function useEscapeable(
  selector: string,
  isOpen: boolean,
  setIsOpen: (newVal: boolean) => any,
): void {
  useEffect(() => {
    const node = document.querySelector(selector);
    const click: (event: any) => any = (event) => {
      if (isOpen && node && !node.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const escape: (e: KeyboardEvent) => any = ({ keyCode }) => {
      isOpen && keyCode === 27 && setIsOpen(false);
    };
    document.addEventListener(`click`, click);
    document.addEventListener(`keydown`, escape);
    return () => {
      document.removeEventListener(`click`, click);
      window.removeEventListener(`keydown`, escape);
    };
  }, [isOpen, setIsOpen, selector]);
}

export function useAddress(
  initial: Partial<AddressWithEmail>,
): [
  props: Omit<AddressProps, 'autoFocusFirst'>,
  address: AddressWithEmail,
  isValid: boolean,
] {
  const [email, setEmail] = useState<string>(initial.email || ``);
  const [name, setName] = useState<string>(initial.name || ``);
  const [street, setStreet] = useState<string>(initial.street || ``);
  const [street2, setStreet2] = useState<string>(initial.street2 || ``);
  const [city, setCity] = useState<string>(initial.city || ``);
  const [state, setState] = useState<string>(initial.state || ``);
  const [zip, setZip] = useState<string>(initial.zip || ``);
  const [country, setCountry] = useState<string>(initial.country || ``);
  return [
    {
      email,
      setEmail,
      name,
      setName,
      street,
      setStreet,
      street2,
      setStreet2,
      city,
      setCity,
      state,
      setState,
      zip,
      setZip,
      country,
      setCountry,
    },
    {
      email,
      name,
      street,
      street2,
      city,
      state,
      zip,
      country,
    },
    !!(
      name &&
      street &&
      street.length < 30 &&
      street2.length < 30 &&
      city &&
      state &&
      zip &&
      country &&
      email
    ),
  ];
}
