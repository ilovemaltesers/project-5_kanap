const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const couchId = params.get("id");

const fetchCouch = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${couchId}`
    );
    if (!response.ok) {
      throw new Error("Failed to retrieve server data");
    }
    const couchData = await response.json();
    updateUi(couchData);
  } catch (error) {
    console.error("Failed to retrieve server data:", error);
  }
};

// modifying the Dom function to display each product

const updateUi = (couchData) => {
  try {
    const couchImg = document.createElement("img");
    couchImg.setAttribute("src", couchData.imageUrl);
    const imgContainer = document.querySelector(".item__img");
    imgContainer.appendChild(couchImg);

    const couchTitle = document.getElementById("title");
    const couchPrice = document.getElementById("price");
    const couchColour = document.getElementById("colors");
    const couchQuantity = document.getElementById("quantity");

    // Populate attributes
    couchTitle.textContent = couchData.title;
    couchPrice.textContent = `Price: $${couchData.price}`;
    couchColour.textContent = `Colors: ${couchData.colors.join(", ")}`;
    couchQuantity.textContent = `Quantity: ${couchData.quantity}`;
  } catch (error) {
    console.error("Error retrieving selected product", error);
  }
};

//calling fetch function

fetchCouch();

//function to display different colours
