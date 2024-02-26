// Get the product id from the URL
const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get("id");
// function to fetch product details from the API

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((product) => {
    updateProductPage(product);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// function to populate page with product and its attributes

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
// Add to cart

const AddToCartButton = document.getElementById("addToCart");

AddToCartButton.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // constants to get the selected color and quantity
  const selectedColor = document.getElementById("colors").value;
  const selectedQuantity = parseInt(document.getElementById("quantity").value);

  // Create a new product object in the cart
  const newProduct = { id, selectedColor, selectedQuantity };

  // Find existing product in the cart based on selected color
  const existingProduct = cart.find(
    (product) =>
      product.selectedColor === newProduct.selectedColor &&
      product.id === newProduct.id
  );

  if (existingProduct) {
    // If existing product is found, update the quantity
    existingProduct.selectedQuantity += newProduct.selectedQuantity;
  } else {
    // If no existing product is found, add the new product to the cart
    cart.push(newProduct);
  }
  // Update the local storage with the modified cart
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item Added to Cart");
});

// product quantity selected cannot be 0 or negetive  and should be a number
const productQuantity = document.getElementById("quantity");
productQuantity.addEventListener("change", () => {
  if (productQuantity.value <= 0 || isNaN(productQuantity.value)) {
    productQuantity.value = 1;
  }
});

// quantity selected may not exceed 100 or an error message
productQuantity.addEventListener("change", () => {
  if (productQuantity.value > 100) {
    alert("Maximum quanity of items is 100");
    productQuantity.value = 100;
  }
});

// function to prevent adding to cart if not colour is selected
const colorSelected = document.getElementById("colors");
colorSelected.addEventListener("change", () => {
  if (colorSelected.value === "") {
    AddToCartButton.disabled = true;
    console.log("please select a colour!");
  } else {
    AddToCartButton.disabled = false;
  }
});
