let url = new URL(window.location.href);

// retrieve the value of the query parameter named "id" from url

let orderId = url.searchParams.get("id");

// retrieve the element with the id "orderId" from the DOM

let confirmOrderId = document.getElementById("orderId");

// set the innerHTML of the element to the value of the orderId

confirmOrderId.innerHTML = orderId;
