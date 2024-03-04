const productsInLocalStorage = JSON.parse(localStorage.getItem("cart"));

for (let i = 0; i < productsInLocalStorage.length; i++) {
  const product = productsInLocalStorage[i];
  console.log(product);
  // Now you can use oneProduct for whatever you need
}

productsInLocalStorage.forEach((product) => {
  const section = document.createElement("cart__items");
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.setAttribute("data-id", products._id);
  article.setAttribute("data-price", products.price);
  section.appendChild(article);

  const imgDiv = document.createElement("div");
  imgDiv.classList.add("cart__item__img");
  const img = document.createElement("img");
  img.setAttribute("src", products.imageUrl);
  img.setAttribute("alt", products.altTxt);
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
});
