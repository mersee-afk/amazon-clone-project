import { cart } from '../data/cart.js';
import { products } from '../data/products.js';

//  render cart items 

const orderSummary = document.querySelector('.order-summary');

let cartHTML = '';
let itemsTotalCents = 0;

cart.forEach(cartItem => {
  const matchingProduct = products.find(
    product => product.id === cartItem.productId
  );

  if (!matchingProduct) return;

  const itemTotalCents =
    matchingProduct.priceCents * cartItem.quantity;

  itemsTotalCents += itemTotalCents;

  cartHTML += `
    <div class="cart-item-container">
      <div class="delivery-date">
        Delivery date: Coming soon
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>

          <div class="product-price">
            $${(matchingProduct.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity">
            <span>
              Quantity:
              <span class="quantity-label">
                ${cartItem.quantity}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
});

orderSummary.innerHTML = cartHTML;

// payment summary 

const itemsCount = cart.reduce(
  (total, item) => total + item.quantity, 0
);

const shippingCents = itemsTotalCents > 0 ? 499 : 0;
const taxCents = Math.round(itemsTotalCents * 0.1);
const orderTotalCents =
  itemsTotalCents + shippingCents + taxCents;

document.querySelector('.payment-summary').innerHTML = `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${itemsCount}):</div>
    <div class="payment-summary-money">
      $${(itemsTotalCents / 100).toFixed(2)}
    </div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping & handling:</div>
    <div class="payment-summary-money">
      $${(shippingCents / 100).toFixed(2)}
    </div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">
      $${((itemsTotalCents + shippingCents) / 100).toFixed(2)}
    </div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">
      $${(taxCents / 100).toFixed(2)}
    </div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">
      $${(orderTotalCents / 100).toFixed(2)}
    </div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
`;