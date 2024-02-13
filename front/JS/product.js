const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const couchId = params.get("id");

console.log("Couch ID:", couchId);

const fetchCouch = async () => {
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
};

function updateProductPage(couchData) {
  const couchImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(couchImg);
  couchImg.setAttribute("src", couchData.imageurl);
  couchImg.setAttribute("alt", couchData.imagealt);
}

fetchCouch();
