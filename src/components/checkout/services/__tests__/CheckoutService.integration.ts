import { cartPlusData } from '../../models/__tests__/fixtures';
import Cart from '../../models/Cart';
import CheckoutService from '../CheckoutService';
import CheckoutApi from '../CheckoutApi';
import { ShippingLevel } from '../../../../graphql/globalTypes';

const { endpoint, origin } = urls();

describe(`CheckoutService()`, () => {
  let service: CheckoutService;
  let api: CheckoutApi;
  let cart: Cart;

  console.log(`Running integration tests against: ${origin}`);

  beforeEach(() => {
    cart = getCart();
    api = new CheckoutApi(endpoint);
    service = new CheckoutService(cart, api);
  });

  test(`sequential, stateful checkout fns`, async () => {
    let err: string | void;

    // step 1: calculate fees -- skip on CI, lulu sandbox is flaky
    if (!process.env.CI) {
      err = await service.getExploratoryMetadata();
      expect(err).toBeUndefined();
      expect(service.metadata).toEqual({ shipping: 399, taxes: 0, ccFeeOffset: 42 });
      expect(service.shippingLevel).toBe(ShippingLevel.mail);
      expect(service.orderId).toBe(``);
    } else {
      service.metadata = { fees: 0, shipping: 399, taxes: 0, ccFeeOffset: 42 };
      service.shippingLevel = ShippingLevel.mail;
    }

    // step 2, create payment intent
    err = await service.createOrderInitialization();
    expect(err).toBeUndefined();
    expect(service.paymentIntentId).toMatch(/^pi_\w+$/i);
    expect(service.paymentIntentClientSecret).toMatch(/^pi_\w+?_secret_\w+$/i);
    expect(service.orderId).toMatch(/^[a-f\d-]{36}$/i);

    // step 2.5: at this point from the client we charge the credit card
    // using `stripe.confirmCardPayment()` but no need to spoof that here

    // step 3: verify that the order was created
    err = await service.createOrder();
    expect(err).toBeUndefined();

    // step 4: send order confirmation email
    err = await service.sendOrderConfirmationEmail();
    expect(err).toBeUndefined();
  }, 40000);
});

function getCart(): Cart {
  const testCart = cartPlusData();
  const item = testCart.items[0];
  item.title = `Journal of Ambrose Rigge (modernized)`;
  item.numPages = [166];
  item.printSize = `m`;
  testCart.items = [item];
  testCart.email = `integration@test.com`;
  return testCart;
}

export function urls(): { endpoint: string; origin: string } {
  let endpoint = `http://localhost:2345`;
  if (process.env.FNS_INTEGRATION_TEST_URL) {
    endpoint = process.env.FNS_INTEGRATION_TEST_URL;
  }
  endpoint += `/.netlify/functions/site`;
  const origin = endpoint.split(`/.netlify`)[0];
  return { endpoint, origin };
}
