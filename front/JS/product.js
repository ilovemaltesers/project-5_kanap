// Get the product id from the URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Function to fetch product details from the API
fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((product) => {
    updateProductPage(product);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Function to populate page with product and its attributes
function updateProductPage(product) {
  const productImg = document.querySelector(".item__img");
  productImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

  const productName = document.getElementById("title");
  productName.innerText = product.name;

  const productPrice = document.getElementById("price");
  productPrice.innerText = product.price;

  const productDescription = document.getElementById("description");
  productDescription.innerText = product.description;

  const productColors = document.getElementById("colors");
  product.colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    productColors.appendChild(option);
  });
}

// Function to update the cart

function updateCart(cartItem) {
  // Get the current cart from local storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // See if there is already an existing item in the cart w/ the same id and colour
  let index = cart.findIndex(
    (item) => item.id === cartItem.id && item.color === cartItem.color
  );

  if (index !== -1) {
    // If the product is already in the cart, update the quantity
    cart[index].quantity += cartItem.quantity;
  } else {
    // If the product is not in the cart, add it
    cart.push(cartItem);
  }

  // Save the updated cart back to local storage
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to add product to cart only if certain conditions are met
window.onload = function () {
  const colorInput = document.getElementById("colors");
  const quantityInput = document.getElementById("quantity");
  const addToCartButton = document.getElementById("addToCart");

  // Initially disable the button
  addToCartButton.disabled = true;

  function checkConditions() {
    // Check colour selection
    const selectedColor = colorInput.value;
    if (selectedColor === "") {
      alert("Please select a colour");
      return;
    }

    // Check quantity is between 1 and 100 and in fact a number
    const selectedQuantity = Number(quantityInput.value);
    if (
      isNaN(selectedQuantity) ||
      selectedQuantity < 1 ||
      selectedQuantity > 100
    ) {
      alert("Quantity needs to be between 1 and 100");
      return;
    }

    // If all conditions are met, enable the button
    addToCartButton.disabled = false;
  }

  // Check conditions whenever the colour or quantity changes
  colorInput.onchange = checkConditions;
  quantityInput.onchange = checkConditions;

  addToCartButton.onclick = function () {
    if (!addToCartButton.disabled) {
      addToCartButton.innerText = "Added to cart";
      alert("Your selected items have been added to cart");

      // Get the selected colour and quantity
      const selectedColor = colorInput.value;
      const selectedQuantity = Number(quantityInput.value);

      // Create an object for the cart item
      const cartItem = {
        id: id,
        color: selectedColor,
        quantity: selectedQuantity,
      };

      // Call to update the cart
      updateCart(cartItem);
    }
  };
};
