const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const couchId = params.get("id");

if (couchId) {
  fetchCouch();
} else {
  console.error("No couch ID found in the URL");
}

async function fetchCouch() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${couchId}`
    );
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

  const couchTxt = document.getElementById("title");
  couchTxt.innerText = couchData.title;

  const couchPriceTxt = document.getElementById("price");
  couchPriceTxt.innerText = couchData.price;

  const couchDescriptionTxt = document.getElementById("description");
  couchDescriptionTxt.innerText = couchData.description;
}
