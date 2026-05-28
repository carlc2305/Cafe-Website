const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thank you! Your message has been sent.");
  });
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const cartCount = document.getElementById("cart-count");

  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    const cart = getCart();
    cart.push({ name, price });
    saveCart(cart);
    updateCartCount();
    
  });
});

const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function addToCart(product) {
  cart.push(product);

  const message = document.getElementById("toast");
  message.classList.add("show");

  setTimeout(() => {
    message.classList.remove("show");
  }, 2000);
}

function renderCart() {
  if (!cartItemsContainer || !cartTotal) return;

  const cart = getCart();
  let total = 0;

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item, index) => {
      total += item.price;

      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.innerHTML = `
        <p>${item.name} - £${item.price.toFixed(2)}</p>
        <button class="remove-item" data-index="${index}">Remove</button>
      `;

      cartItemsContainer.appendChild(div);
    });
  }

  cartTotal.textContent = `Total: £${total.toFixed(2)}`;

  const removeButtons = document.querySelectorAll(".remove-item");

  removeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const index = parseInt(button.dataset.index);
      const cart = getCart();

      cart.splice(index, 1);
      saveCart(cart);
      updateCartCount();
      renderCart();
    });
  });
}

renderCart();
updateCartCount();

const checkoutForm = document.querySelector(".checkout-form");

if (checkoutForm) {
  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    updateCartCount();
    window.location.href = "index.html";
  });
}