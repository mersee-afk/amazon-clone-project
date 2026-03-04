import { cart, saveToStorage } from '../data/cart.js';
import { products } from '../data/products.js';

let productHTML = '';

products.forEach((product) => {
  productHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector">
          ${[...Array(10).keys()].map(i =>
            `<option value="${i + 1}">${i + 1}</option>`
          ).join('')}
        </select>
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productHTML;

//  cart logic 

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;

    const quantitySelector =
      button.closest('.product-container')
        .querySelector('.js-quantity-selector');

    const quantity = Number(quantitySelector.value);

    let matchingItem = cart.find(item => item.productId === productId);

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity
      });
    }

    saveToStorage();
    updateCartQuantity();
  });
});

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach(item => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

updateCartQuantity();