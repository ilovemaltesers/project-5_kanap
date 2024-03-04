const productsInLocalStorage = JSON.parse(localStorage.getItem("cart"));

function updateCartPage(productsInLocalStorage) {
  for (let i = 0; i < productsInLocalStorage.length; i++) {
    const product = productsInLocalStorage[i];

    // for each product in the local storage, create a new article in the cart

    const section = document.getElementById("cart__items");
    const article = document.createElement("article");

    article.classList.add("cart__item");
    article.setAttribute("data-id", product.id);
    article.setAttribute("data-color", product.selectedColor);
    article.setAttribute("data-price", product.price);
    article.innerHTML = `
      <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${product.name}</h2>
          <p>${product.selectedColor}</p>
          <p>${product.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    `;
    section.appendChild(article);
  }
}

updateCartPage(productsInLocalStorage);
