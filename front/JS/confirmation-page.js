let url = new URL(window.location.href);

console.log(url);

let orderId = url.searchParams.get("id");

console.log(orderId);

let confirmOrderId = document.getElementById("orderId");

confirmOrderId.innerHTML = orderId;
