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

    // function to calculate the total quantity of articles in the cart and the total price

    function calculateTotal() {
      let totalQuantity = 0;
      let totalPrice = 0;

      for (let i = 0; i < productsInLocalStorage.length; i++) {
        totalQuantity += parseInt(productsInLocalStorage[i].quantity);
        totalPrice +=
          parseInt(productsInLocalStorage[i].quantity) * product.price;
      }

      document.getElementById("totalQuantity").innerHTML = totalQuantity;
      document.getElementById("totalPrice").innerHTML = totalPrice;
    }
    calculateTotal();

    // Update quantity in local storage function

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
let ExpAddress = /^[a-zA-Z0-9\s.,#-]{1,40}$/;

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

function placeOrder() {
  const orderButton = document.getElementById("order");

  orderButton.addEventListener("click", function (e) {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;

    const contact = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    };

    const cart = localStorage.getItem("cart");
    if (!cart) {
      console.error('No "cart" item in local storage');
      return;
    }

    const finalProductsInLocalStorage = JSON.parse(cart);
    const url = "http://localhost:3000/api/products/order";

    const productsOrdered = finalProductsInLocalStorage.map((product) => {
      return {
        _id: product.id,
        color: product.color,
        quantity: product.quantity,
      };
    });

    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      address.length === 0 ||
      city.length === 0 ||
      email.length === 0
    ) {
      e.preventDefault();
      alert("Please fill in all the fields");
      console.log("Please fill in all the fields");
    } else {
      e.preventDefault();
      console.log("Form submitted");
      console.log("contact", contact);

      const orderObject = {
        contact: contact,
        products: productsOrdered,
      };
      console.log("orderObject", orderObject);

      const options = {
        method: "POST",
        body: JSON.stringify(orderObject),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(url, options)
        .then((data) => {
          if (!data.ok) {
            throw Error(data.status);
          }
          return data.json();
        })
        .then((update) => {
          console.log(update);
          productsInLocalStorage.clear();
          window.location.href = `confirmation.html?id=${update.orderId}`;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
}

placeOrder();
