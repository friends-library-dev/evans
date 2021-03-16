import React from 'react';
import CartStore from '../checkout/services/CartStore';
import CheckoutApi from '../checkout/services/CheckoutApi';
import CheckoutService from '../checkout/services/CheckoutService';
import CheckoutMachine from '../checkout/services/CheckoutMachine';
import CheckoutModal from '../checkout/Modal';
import CheckoutFlow from '../checkout/Flow';
import ErrorBoundary from '../ErrorBoundary';

const store = CartStore.getSingleton();
const api = new CheckoutApi(`/.netlify/functions/site`);
const service = new CheckoutService(store.cart, api);
const machine = new CheckoutMachine(service);
machine.on(`close`, () => store.close());

interface Props {
  recommended: {
    Cover: JSX.Element;
    title: string;
    path: string;
  }[];
}

const CheckoutLazy: React.FC<Props> = ({ recommended }) => {
  return (
    <CheckoutModal onClose={() => machine.close()}>
      <ErrorBoundary location="checkout">
        <CheckoutFlow machine={machine} recommendedBooks={recommended} />
      </ErrorBoundary>
    </CheckoutModal>
  );
};

export default CheckoutLazy;
