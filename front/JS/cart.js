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
        // Filter productData.colors to only include the color from localStorage
        productData.colors = productData.colors.filter(
          (color) => color === product.color
        );
        productData.quantity = product.quantity;
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
  article.setAttribute("data-color", product.colors);
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

  const productColor = document.createElement("p");
  productColor.innerHTML = product.colors;
  cartDescription.appendChild(productColor);

  const productPrice = document.createElement("p");
  productPrice.innerHTML = "€" + product.price;
  cartDescription.appendChild(productPrice);

  const cartSettings = document.createElement("div");
  cartSettings.classList.add("cart__item__content__settings");
  cartItemContent.appendChild(cartSettings);

  const cartQuantity = document.createElement("div");
  cartQuantity.classList.add("cart__item__content__settings__quantity");
  cartSettings.appendChild(cartQuantity);

  const quantityP = document.createElement("p");
  quantityP.innerHTML = "Quantity:";
  cartQuantity.appendChild(quantityP);

  const quantityInput = document.createElement("input");
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("name", "itemQuantity");
  quantityInput.setAttribute("min", "1");
  quantityInput.setAttribute("value", product.quantity); // set the value to product.quantity
  quantityInput.setAttribute("max", "100");
  quantityInput.classList.add("itemQuantity");
  cartQuantity.appendChild(quantityInput);

  const divDelete = document.createElement("div");
  divDelete.classList.add("cart__item__content__settings__delete");
  cartSettings.appendChild(divDelete);

  const deleteButton = document.createElement("p");
  deleteButton.classList.add("cart__item__content__settings__delete__btn");
  deleteButton.innerHTML = "Delete";
  divDelete.appendChild(deleteButton);

  // delete item from cart

  deleteButton.addEventListener("click", function () {
    const index = productsInLocalStorage.findIndex(
      (item) => item.id === product.id && item.color === product.colors
    );
    productsInLocalStorage.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(productsInLocalStorage));
    article.remove();
  });
}
