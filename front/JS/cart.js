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
