let productsInLocalStorage = localStorage.getItem("cart");
if (!productsInLocalStorage) {
  productsInLocalStorage = [];
} else {
  productsInLocalStorage = JSON.parse(productsInLocalStorage);
}

for (let i = 0; i < productsInLocalStorage.length; i++) {
  const product = productsInLocalStorage[i];
  if (product) {
    const productId = product.id;
    const productColor = product.color;
    const productQuantity = product.quantity;

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
          (color) => color === productsInLocalStorage[i].color
        );
        productData.quantity = productsInLocalStorage[i].quantity;
        displayProducts(productData);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  function displayProducts(product) {
    const productId = product.id;
    const productQuantity = product.quantity;

    const section = document.getElementById("cart__items");

    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.setAttribute("data-id", product._id);

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
    quantityInput.setAttribute("data-id", product._id);

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

    // Update quantity in cart function

    quantityInput.addEventListener("change", function (event) {
      const itemId = event.target.getAttribute("data-id");

      const newQuantity = event.target.value;

      if (newQuantity > 100) {
        alert("Max quantity of items exceeded!");
        return;
      }

      const index = productsInLocalStorage.findIndex(
        (item) => item.id === itemId && item.color === product.colors[0]
      );
      console.log("index", index);

      if (index !== -1) {
        productsInLocalStorage[index].quantity = newQuantity;
        localStorage.setItem("cart", JSON.stringify(productsInLocalStorage));
      }
    });
  }
}

// form validation

let ExpFirstName = /^[a-zA-Z]{2,20}$/;
let ExpLastName = /^[a-zA-Z]{2,20}$/;
let ExpAddress = /^[a-zA-Z0-9\s.,#-]{1,30}$/;

let ExpCity = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
let ExpEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// individual field validations

const firstName = document.querySelector("#firstName");

ExpFirstName = /^[a-zA-Z]{2,20}$/;

firstName.addEventListener("input", function (e) {
  const isValid = ExpFirstName.test(e.target.value);
  if (isValid) {
    console.log("First name is valid");
    firstName.style.border = "2px solid green";
  } else {
    console.log("First name is invalid");
    firstName.style.border = "2px solid red";
    if (e.target.value.length > 20) {
      alert("Please enter a name that does not exceed 20 characters");
    }
  }
});

const lastName = document.querySelector("#lastName");

lastName.addEventListener("input", function (e) {
  const isValid = ExpLastName.test(e.target.value);
  if (isValid) {
    console.log("Last name is valid");
    lastName.style.border = "2px solid green";
  } else {
    console.log("Last name is invalid");
    lastName.style.border = "2px solid red";
    if (e.target.value.length > 20) {
      alert("Please enter a name that does not exceed 20 characters");
    }
  }
});

const address = document.querySelector("#address");

address.addEventListener("input", function (e) {
  const isValid = ExpAddress.test(e.target.value);
  if (isValid) {
    console.log("Address is valid");
    address.style.border = "2px solid green";
  } else {
    console.log("Address is invalid");
    address.style.border = "2px solid red";
    if (e.target.value.length > 20) {
      alert("Please enter an address that does not exceed 30 characters");
    }
  }
});

const city = document.querySelector("#city");

city.addEventListener("input", function (e) {
  const inputValue = e.target.value;

  if (inputValue.length > 20) {
    alert("Please enter a city that does not exceed 20 characters");
    city.style.border = "2px solid red";
    return;
  }

  const isValid = ExpCity.test(inputValue);
  if (isValid) {
    console.log("City is valid");
    city.style.border = "2px solid green";
  } else {
    console.log("City is invalid");
    city.style.border = "2px solid red";
  }
});

const email = document.querySelector("#email");

email.addEventListener("input", function (e) {
  const isValid = ExpEmail.test(e.target.value);
  if (isValid) {
    console.log("Email is valid");
    email.style.border = "2px solid green";
  } else {
    console.log("Email is invalid");
    email.style.border = "2px solid red";
  }
});

/// form submit

const orderButton = document.getElementById("order");
const form = document.querySelector(".cart__order__form");

orderButton.addEventListener("click", function (e) {
  if (
    firstName.value.length === 0 ||
    lastName.value.length === 0 ||
    address.value.length === 0 ||
    city.value.length === 0 ||
    email.value.length === 0
  ) {
    e.preventDefault();
    alert("Please fill in all the fields");
    console.log("Please fill in all the fields");
  } else {
    e.preventDefault();
    console.log("Form submitted");

    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };
    console.log("Contact:", contact);

    const finalProductsInLocalStorage = JSON.parse(
      localStorage.getItem("cart")
    );
    console.log(
      "Final Products in Local Storage:",
      finalProductsInLocalStorage
    );

    // Place and post order

    function placeOrder(finalProductsInLocalStorage) {
      const productsOrdered = finalProductsInLocalStorage.map((product) => {
        return {
          _id: product.id,
          color: product.color,
          quantity: product.quantity,
        };
      });
      console.log("Products Ordered:", productsOrdered);

      const order = {
        contact: contact,
        products: productsOrdered,
      };

      const url = "http://localhost:3000/api/products/order";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((response) => response.json())
        .then((data) => console.log("Your order has been placed!:", data))
        .catch((error) => console.error("Error:", error));
    }
    placeOrder(finalProductsInLocalStorage);
  }
});
