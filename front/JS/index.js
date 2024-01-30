const apiUrl = "http://localhost:3000/api/products";

// function to populate front page//

const fetchCouches = () => {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error", error));
};

fetchCouches();
