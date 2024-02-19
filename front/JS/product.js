const keysValues = window.location.search;

if (keysValues) {
  const urlParams = new URLSearchParams(keysValues);
  const id = urlParams.get("id");

  if (id) {
    const productLink = `http://localhost:3000/api/products/${id}`;

    fetch(productLink)
      .then((data) => {
        return data.json();
      })
      .then((product) => {
        updateProductPage(product);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        // Handle error (e.g., show an error message to the user)
      });
  } else {
    console.error("No id parameter found in the URL");
    // Handle the case where 'id' parameter is missing (e.g., redirect to an error page)
  }
} else {
  console.error("No URL parameters found");
  // Handle the case where no URL parameters are present (e.g., redirect to an error page)
}

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
