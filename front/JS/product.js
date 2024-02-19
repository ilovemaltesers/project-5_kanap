const keysValues = window.location.search;
console.log("key and values", keysValues);
const urlParams = new URLSearchParams(keysValues);
const id = urlParams.get("id");
console.log(id);

const productLink = `http://localhost:3000/api/products/${id}`;

fetch(productLink)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    updateProductPage(product);
  });

function updateProductPage(product) {
  const productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.setAttribute("src", product.imageurl);
  productImg.setAttribute("alt", product.imagealt);

  const productTitle = document.getElementById("title");
  productTitle.innerText = product.title;
  const productPrice = document.getElementById("price");
  productPrice.innerText = product.price;

  const productDescription = document.getElementById("description");
  productDescription.innerText = product.description;
}

// function to display different colours
// function populateColourOptions(couchId) {
//   const product = products.find((prod) => prod._id === couchId); // Assuming `products` is defined elsewhere
//   const colourDropdown = document.getElementById("colors");
//   colourDropdown.innerHTML = "";
//   const defaultOption = document.createElement("option");
//   defaultOption.text = "Please select a colour";
//   defaultOption.value = "";
//   colourDropdown.add(defaultOption);
// }
