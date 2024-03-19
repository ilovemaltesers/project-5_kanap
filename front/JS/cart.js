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

for (let i = 0; i < productsInLocalStorage.length; i++) {
  const product = productsInLocalStorage[i];
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
      displayProducts(productData); // Call displayProducts with fetched product data
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
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
  console.log("Product ID:", product.id); // Log the product ID
  quantityInput.setAttribute("data-id", product.id);

  cartQuantity.appendChild(quantityInput);

  // Update quantity in cart function

  document.addEventListener("change", function (event) {
    const inputElement = event.target.closest(".itemQuantity");
    if (inputElement) {
      console.log("Quantity changed");
      const newQuantity = event.target.value; // The new quantity
      const productId = event.target.dataset.product.id;
      ("data-id"); // The id of the product

      console.log("Product ID:", productId); // Log the product ID

      // Retrieve the latest cart data from local storage
      let latestCart = JSON.parse(localStorage.getItem("cart"));

      console.log("Latest cart:", latestCart); // Log the latest cart

      // Find the product in the array
      const product = latestCart.find(
        (product) => product.id.toString() === productId
      );

      if (product) {
        console.log("Product found:", product); // Log the product that was found
        // Update the quantity
        product.quantity = Number(newQuantity);
        console.log("Updated product:", product); // Log the product after updating the quantity
        // Save the updated array back to local storage
        localStorage.setItem("cart", JSON.stringify(latestCart));
        console.log("Updated cart:", latestCart); // Log the updated cart
      } else {
        console.log("Product not found"); // Log if the product was not found
      }
    }
  });

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

// form validation

let ExpFirstName = /^[a-zA-Z]{2,20}$/;
let ExpLastName = /^[a-zA-Z]{2,20}$/;
let ExpAddress = /^[a-zA-Z0-9\s.,#-]{1,30}$/;

let ExpCity = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
let ExpEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

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

// form submit

const submitOrder = document.getElementById("order");
submitOrder.addEventListener("submit", function (e) {
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

  const productsOrdered = productsInLocalStorage.map((product) => {
    return {
      _id: product.id,
      color: product.color,
      quantity: product.quantity,
    };
  });
  prompt("Thank you for your order", productsOrdered);
  console.log("Products ordered:", products);

  const completeOrderSummary = {
    contact: contact,
    products: products,
  };
  console.log("Order:", order);

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      localStorage.setItem("orderId", data.orderId);
      window.location.href = "confirmation.html";
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
});
