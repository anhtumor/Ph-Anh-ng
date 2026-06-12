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

function openLogin(){
  document.getElementById("auth-modal").style.display="flex";
  document.getElementById("auth-title").innerText="Đăng nhập";
  document.getElementById("auth-btn").innerText="Đăng nhập";
}

function openRegister(){
  document.getElementById("auth-modal").style.display="flex";
  document.getElementById("auth-title").innerText="Đăng ký";
  document.getElementById("auth-btn").innerText="Đăng ký";
}

function closeAuth(){
  document.getElementById("auth-modal").style.display="none";
}

let authMode = "login";

function openLogin(){
  authMode = "login";
  document.getElementById("auth-title").innerText = "Đăng nhập";
  document.getElementById("auth-btn").innerText = "Đăng nhập";
  document.getElementById("auth-modal").style.display = "flex";
}

function openRegister(){
  authMode = "register";
  document.getElementById("auth-title").innerText = "Đăng ký";
  document.getElementById("auth-btn").innerText = "Đăng ký";
  document.getElementById("auth-modal").style.display = "flex";
}

function closeAuth(){
  document.getElementById("auth-modal").style.display = "none";
}

function handleAuth(){

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if(!username || !password){
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  if(authMode === "register"){

    localStorage.setItem(
      "user_" + username,
      password
    );

    alert("Đăng ký thành công!");

    closeAuth();

  }else{

    const savedPassword =
      localStorage.getItem("user_" + username);

    if(savedPassword === password){

      localStorage.setItem(
        "loggedUser",
        username
      );

      updateNavbar();

      alert("Đăng nhập thành công!");

      closeAuth();

    }else{

      alert("Sai tài khoản hoặc mật khẩu");

    }

  }
}

function updateNavbar(){

  const user = localStorage.getItem("loggedUser");
  const display = document.getElementById("user-display");

  if(user){

    display.innerHTML = `
      👤 Xin chào, ${user}
      <a href="#" class="logout-btn" onclick="logout()">
        Đăng xuất
      </a>
    `;

  }else{

    display.innerHTML = `
      <a href="#" onclick="openLogin()">Đăng nhập</a>
      <a href="#" onclick="openRegister()">Đăng ký</a>
    `;

  }
}

window.addEventListener("click", function () {
  const music = document.getElementById("bg-music");
  if (music) {
    music.play();
  }
}, { once: true });

const playlist = [
  "music/Podcast.mp3",
  "music/Chocon.mp3"
];

let index = 0;
const audio = document.getElementById("bg-music");

function playSong() {
  audio.src = playlist[index];
  audio.play().catch(err => console.log(err));
}

// khi hết bài → chuyển bài tiếp
audio.addEventListener("ended", () => {
  index = (index + 1) % playlist.length;
  playSong();
});

// bắt đầu khi user click (Chrome bắt buộc)
window.addEventListener("click", () => {
  playSong();
}, { once: true });

window.addEventListener("click", () => {
  playSong();
}, { once: true });