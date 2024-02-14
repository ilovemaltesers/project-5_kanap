const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const couchId = params.get("id");
const productLink = `http://localhost:3000/api/products/${couchId}`;

if (couchId) {
  fetchCouch();
} else {
  console.error("No couch ID found in the URL");
}

async function fetchCouch() {
  try {
    const response = await fetch(productLink);
    if (!response.ok) {
      throw new Error("Failed to retrieve server data");
    }
    const couchData = await response.json();

    updateProductPage(couchData);
  } catch (error) {
    console.error("Failed to update requested data:", error);
  }
}

function updateProductPage(couchData) {
  const couchImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(couchImg);
  couchImg.setAttribute("src", couchData.imageurl);
  couchImg.setAttribute("alt", couchData.imagealt);

  const couchTitle = document.getElementById("title");
  couchTitle.innerText = couchData.title;

  const couchPrice = document.getElementById("price");
  couchPrice.innerText = couchData.price;

  const couchDescription = document.getElementById("description");
  couchDescription.innerText = couchData.description;
}
