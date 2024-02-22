// retrieve query string portion of URL
const keysValues = window.location.search;

if (keysValues) {
  // create new search params object
  const urlParams = new URLSearchParams(keysValues);
  // retrieve value of query param id from url params object
  const id = urlParams.get("id");

  if (id) {
    // contruct a url for api endpoint
    const productLink = `http://localhost:3000/api/products/${id}`;

    fetch(productLink)
      .then((data) => {
        return data.json();
      })
      .then((product) => {
        updateProductPage(product);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  } else {
    console.error("No id parameter found in the URL");
    // Handle the case where 'id' parameter is missing
  }
  console.error("No URL parameters found");
  // Handle the case where no URL parameters are present
}

// function to populate page with product and its  attributes

function updateProductPage(product) {
  const productImg = document.querySelector(".item__img");
  productImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

  const productTitle = document.getElementById("title");
  productTitle.innerText = product.title;

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
