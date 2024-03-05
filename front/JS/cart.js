let productsInLocalStorage = localStorage.getItem("cart");
try {
  if (productsInLocalStorage) {
    productsInLocalStorage = JSON.parse(productsInLocalStorage);
    console.log("Products from local storage:", productsInLocalStorage);
  }
} catch (error) {
  console.error("Error parsing products from local storage:", error);
  productsInLocalStorage = null;
}

if (productsInLocalStorage) {
  productsInLocalStorage.forEach(function (product, index) {
    fetch(`http://localhost:3000/api/products/${product.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((productData) => {
        displayProducts(productData); // Call displayProducts with fetched product data
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  });
}

function displayProducts(product) {
  const section = document.getElementById("cart__items");

  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.setAttribute("data-id", product.id);
  article.setAttribute("data-price", product.price);
  section.appendChild(article);

  const imgDiv = document.createElement("div");
  imgDiv.classList.add("cart__item__img");
  const img = document.createElement("img");
  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);
  imgDiv.appendChild(img);
  article.appendChild(imgDiv);

  const cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");
  article.appendChild(cartItemContent);

  const cartDescription = document.createElement("div");
  cartDescription.classList.add("cart__item__content__description");
  cartItemContent.appendChild(cartDescription);

  const productName = document.createElement("h2");
  productName.innerHTML = product.name;
  cartDescription.appendChild(productName);

  const productColour = document.createElement("p");
  productColour.innerHTML = product.colors;
  cartDescription.appendChild(productColour);

  const productPrice = document.createElement("p");
  productPrice.innerHTML = product.price;
  cartDescription.appendChild(productPrice);
}
