let cart = [];
let total = 0;

function addToCart(name, price) {
  price = Number(price);

  cart.push({ name, price });
  total += price;

  console.log(cart); // debug xem có vào không

  renderCart();
}

function renderCart() {
  let box = document.getElementById("cart-items");
  let totalEl = document.getElementById("cart-total");

  if (!box || !totalEl) return;

  box.innerHTML = "";

  cart.forEach((item) => {
    box.innerHTML += `
      <div style="display:flex;justify-content:space-between;margin:10px 0;">
        <span>${item.name}</span>
        <span>${item.price.toLocaleString()}đ</span>
      </div>
    `;
  });

  totalEl.innerText = total.toLocaleString();
}

function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("active");
  document.getElementById("overlay").style.display =
    document.getElementById("cart-panel").classList.contains("active")
      ? "block"
      : "none";
}

function openQR() {
  if (cart.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }

  document.getElementById("qr-money").innerText =
    "Tổng thanh toán: " + total.toLocaleString() + "đ";

  document.getElementById("qr-modal").classList.add("active");
}

function closeQR() {
  document.getElementById("qr-modal").classList.remove("active");
}