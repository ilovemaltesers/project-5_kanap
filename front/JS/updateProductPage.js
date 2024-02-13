const updateProductPage = (couchData) => {
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

    fetchCouch(couchId);

    //function to display different colours
    function populateColourOptions(couchId) {
      const product = products.find((prod) => prod._id === couchId);
      const colourDropdown = document.getElementById("colors");
      colourDropdown.innerHTML = "";
      const defaultOption = document.createElement("option");
      defaultOption.text = "Please select a colour";
      defaultOption.value = "";
      colourDropdown.add(defaultOption);
    }
  } finally {
  }
};
