// Objective: Fetch the products from the API and display them on the home page

const apiUrl = "http://localhost:3000/api/products";
let productContainer = document.getElementById("items");

// Fetch the products from the API

const fetchProducts = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    displayProducts(data);
  } catch (error) {
    console.error("Error", error);
  }
};

// Display the products on the home page

function displayProducts(products) {
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.innerHTML = `<a href="./product.html?id=${product._id}">
             <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
    productContainer.appendChild(productCard);
  });
}

fetchProducts();
