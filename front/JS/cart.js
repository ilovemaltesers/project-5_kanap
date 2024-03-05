let productsInLocalStorage = localStorage.getItem("cart");
try {
  if (productsInLocalStorage) {
    productsInLocalStorage = JSON.parse(productsInLocalStorage);
  }
} catch (error) {
  console.error("Error parsing products from local storage:", error);
  productsInLocalStorage = null;
}

if (productsInLocalStorage) {
  for (let i = 0; i < productsInLocalStorage.length; i++) {
    const product = productsInLocalStorage[i];
    console.log(product);
    // Now can use product for whatever you need
  }
}

fetch("http://localhost:3000/api/products")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((products) => {
    console.log(products);
  })
  .catch((error) => {
    console.error("Error fetching products:", error);
  });

if (productsInLocalStorage) {
  productsInLocalStorage.forEach((product) => {
    try {
      const section = document.getElementById("cart__items");

      const article = document.createElement("article");
      article.classList.add("cart__item");
      article.setAttribute("data-id", product._id);
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
    } catch (error) {
      console.error("Error creating product elements:", error);
    }
  });
} else {
  console.log("No products in local storage.");
}
