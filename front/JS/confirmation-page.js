let url = new URL(window.location.href);

let orderId = url.searchParams.get("id");

let confirmOrderId = document.getElementById("orderId");

confirmOrderId.innerHTML = orderId;
