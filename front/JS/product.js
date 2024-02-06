const queryString = window.location.search;
const params = new URLSearchParams(queryString);

const couchId = params.get("id");

// function to enable search by id//

const fetchCouch = async () => {
  let response;

  try {
    response = await fetch(`http://localhost:3000/api/products/${couchId}`);
    const couchData = await response.json();

    if (!response.ok) {
      throw new Error("Failed to retrieve selected item");
    }

    console.log(couchData);
  } catch (error) {
    console.error(error);
  }
};

//

const updateUi = (couchData) => {
  const couchImg = document.createElement("img");
  couchImg.setAttribute("src", couchData.imageUrl);

  const imgContainer = document.querySelector(".item__img");
  imgContainer.appendChild(couchImg);

  document.getElementById("title").innerHTML = couchData.name;
  document.getElementById("price").innerHTML = couchData.price;
  document.getElementById("colors").innerHTML = couchData.colours;
  document.getElementById("quantity").innerHTML = couchData.quantity;
};
