// retrieves the query string portion of the current URL
const urlSearch = window.location.search;

// creates a new URLSearchParams object
const urlParams = new URLSearchParams(urlSearch);

// retrieves the value of the parameter "id" from the query string
const couchId = urlParams.get("id");

// constructs a URL for a product endpoint
const productLink = `http://localhost:3000/api/products/${couchId}`;

// to test if issue with couchId. (problem solving. will remove later)
if (couchId) {
  fetchCouch();
} else {
  console.error("No couch ID found in the URL");
}

/*asynchronous function to fetch data from the server including
errors if fail. Function asks for the response in json stored in a 
constant called couchData. The function also initialises the updateproductpage funtion
with a catch error included */

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

// function retrieving elements from the Dom in order to display content

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
