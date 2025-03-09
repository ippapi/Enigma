$(document).ready(function () {
  $("#cod").click(function () {
    $("#cod-description").slideDown();
  });
  $("#online").click(function () {
    $("#cod-description").slideUp();
  });
});
let cartCount = parseFloat(localStorage.getItem("cartCount"));
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
function updateQuantity(index, delta) {
  // Lưu số lượng trước khi cập nhật
  const previousQuantity = cartItems[index].quantity;

  // Cập nhật số lượng sản phẩm theo delta (tăng hoặc giảm)
  cartItems[index].quantity += delta;

  // Nếu số lượng giảm về 0, xóa sản phẩm khỏi giỏ hàng
  if (cartItems[index].quantity === 0) {
    cartItems.splice(index, 1);
    cartCount--;
  } else {
    // Cập nhật cartCount dựa trên sự thay đổi của số lượng
    cartCount += cartItems[index].quantity - previousQuantity;
  }
 
  updateCartSession();
  updateLocalStorage();
}

function removeItem(index) {
  const removedItem = cartItems[index];
  cartItems.splice(index, 1);

  // Subtract the quantity of the removed item from cartCount
  cartCount -= removedItem.quantity;

  updateCartSession();
  updateLocalStorage();
}

function updateCartFromLocalStorage() {
  const storedCartItems = localStorage.getItem("cartItems");
  const storedCartCount = localStorage.getItem("cartCount");

  if (storedCartItems && storedCartCount) {
    cartItems = JSON.parse(storedCartItems);
    cartCount = parseInt(storedCartCount);
    updateCartSession();
  }
}

function updateLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("cartCount", cartCount.toString());
}

function updateCartSession() {
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const finalPrice = document.getElementById("final-price");
  const delivery = parseFloat(
    document.getElementById("right-detail2").textContent
  );

  // Xóa các mục hiện tại
  cartItemsList.innerHTML = "";

  // Hiển thị sản phẩm trong giỏ hàng
  cartItems.forEach((item, index) => {
    const li = document.createElement("li");

    // Hiển thị ảnh sản phẩm
    const productImage = document.createElement("img");
    productImage.src = item.image;
    productImage.alt = "Product Image";
    li.appendChild(productImage);

    // Hiển thị thông tin sản phẩm và nút +/-, nút xóa
    const detailsDiv = document.createElement("div");
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(item.price);
    detailsDiv.innerHTML = `
      <span>${item.name} - ${formattedPrice}</span>
      <div class="quantity-controls">
        <button onclick="updateQuantity(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${index}, 1)">+</button>
      </div>
    
    `;
    const removeIcon = document.createElement("i");
    removeIcon.className = "fa-solid fa-trash-can fa-xl";
    removeIcon.id = "rm-btn";
    removeIcon.onclick = function () {
      removeItem(index);
    };

    detailsDiv.appendChild(removeIcon);
    li.appendChild(detailsDiv);

    cartItemsList.appendChild(li);
  });

  // Tính tổng giá trị giỏ hàng
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const formattedTotal = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(total);
  cartTotal.innerText = formattedTotal;

  finalPrice.innerText = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(total + delivery);
}
document.getElementById("right-detail2").innerText = new Intl.NumberFormat(
  "vi-VN",
  {
    style: "currency",
    currency: "VND",
  }
).format(parseFloat(document.getElementById("right-detail2").textContent));
updateCartSession();
function payment() {
  alert("Bạn đã thanh toán thành công!");
}
function discount() {
  let dsc = document.getElementById("discount-code").value;
  let delivery = document.getElementById("right-detail2");
  if (dsc === "123") {
    delivery.innerText = 50000;
  } else {
    delivery.innerText = 150000;
    alert("Mã giảm giá không tồn tại!");
  }
  document.getElementById("right-detail2").innerText = new Intl.NumberFormat(
    "vi-VN",
    {
      style: "currency",
      currency: "VND",
    }
  ).format(parseFloat(document.getElementById("right-detail2").textContent));
  updateCartSession();
}
