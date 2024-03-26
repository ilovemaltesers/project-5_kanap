//get the order id from the url
function getOrderId() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");
  return orderId;
}

// Path: front/JS/confirmation-page.js
// function to display the order id on the page
function displayOrderId() {
  const orderId = getOrderId();
  const orderIdElement = document.getElementById("order-id");
  orderIdElement.textContent = orderId;
}

// Path: front/JS/confirmation-page.js
// function to display the total price on the page
function displayTotalPrice() {
  const totalPrice = localStorage.getItem("totalPrice");
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.textContent = totalPrice;
}

// Path: front/JS/confirmation-page.js
// function to display the order id and total price on the page
function displayConfirmation() {
  displayOrderId();
  displayTotalPrice();
}

// Path: front/JS/confirmation-page.js
// function to remove the cart from the local storage
function removeCart() {
  localStorage.removeItem("cart");
}
