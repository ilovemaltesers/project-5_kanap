// retrieve cart from local storage and log it to the console

const cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart);

//if cart is empty then display a message to console and redirect to the homepage
if (cart.length === 0) {
  console.log("Cart is empty");
  window.location.href = "/";
}
//if cart is not empty then display the cart items to the console
else {
  console.log("Cart items:", cart);
}

// display items dynamically in the cart
const cartItems = document.getElementById("cart__tems");
cart.forEach((product) => {
  const productDiv = document.createElement("div");
  productDiv.innerHTML = `
    <div class="cart-item">
      <div class="cart-item-details">
        <img src="${product.image}" alt="${product.name}" />
        <div>
          <h3>${product.name}</h3>
          <p>Color: ${product.selectedColor}</p>
          <p>Quantity: ${product.selectedQuantity}</p>
        </div>
      </div>
      <div class="cart-item-price">
        <p>Price: $${product.price}</p>
      </div>
    </div>
  `;
  cartItems.appendChild(productDiv);
});
