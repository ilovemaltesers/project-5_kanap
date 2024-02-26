// retrieve cart from local storage and log it to the console

const cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart);
