// Function to set up the user display on page load
function setupUserDisplay() {
  var usernameShow = document.getElementById("username_show");
  var userIcon = document.querySelector("#user i");

  // Retrieve login information from local storage
  var storedLogin = localStorage.getItem("login");

  // Check if login information exists in local storage
  if (storedLogin) {
    // Parse the JSON string to get the login object
    var login = JSON.parse(storedLogin);

    // Thay đổi nội dung và hiển thị tên người dùng
    if (login.username.length > 7) {
      usernameShow.innerText = login.username.slice(0, 6) + "...";
    } else {
      usernameShow.innerText = login.username;
    }

    // Ẩn icon user
    userIcon.style.display = "none";
    usernameShow.style.display = "block";
  }
}

// Call the setupUserDisplay function on page load
setupUserDisplay();
let cartItems = [];
let cartCount = 0;

// Hàm kiểm tra và cập nhật giỏ hàng từ localStorage
function updateCartFromLocalStorage() {
  const storedCartItems = localStorage.getItem("cartItems");
  const storedCartCount = localStorage.getItem("cartCount");

  if (storedCartItems && storedCartCount) {
    cartItems = JSON.parse(storedCartItems);
    cartCount = parseInt(storedCartCount);
    updateCartDropdown();
    updateCartCount();
  }
}

// Hàm cập nhật localStorage từ giỏ hàng hiện tại
function updateLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("cartCount", cartCount.toString());
}

function addItem(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const productDetails = $(event.currentTarget).closest(".product-card");
  const productName = productDetails.find("h2").text();
  const productPriceText = productDetails.find(".discount-price").text();
  const productPrice = parseFloat(productPriceText.replaceAll(",", ""));
  const productImage = productDetails.find(".original-image").attr("src");

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingItem = cartItems.find(
    (item) =>
      item.name === productName &&
      item.price === productPrice &&
      item.image === productImage
  );

  if (existingItem) {
    // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
    existingItem.quantity += 1;
  } else {
    // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
    cartItems.push({
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1, // Số lượng ban đầu là 1
    });
  }

  cartCount++;
  updateCartCount();
  updateCartDropdown();
  updateLocalStorage();
}

function removeItem(index) {
  const removedItem = cartItems[index];
  cartItems.splice(index, 1);

  // Subtract the quantity of the removed item from cartCount
  cartCount -= removedItem.quantity;

  updateCartCount();
  updateCartDropdown();
  updateLocalStorage();
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cartCount;
}

function updateCartDropdown() {
  const cartDropdown = document.getElementById("cart-dropdown");
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

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
  cartTotal.innerText = `Total: ${formattedTotal}`;

  // Hiển thị dropdown giỏ hàng
  cartDropdown.style.display = "block";
}

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

  updateCartCount();
  updateCartDropdown();
  updateLocalStorage();
}
//Show cart popup
$(document).ready(function () {
  // Gọi hàm cập nhật từ localStorage khi trang được load
  updateCartFromLocalStorage();
  $("#cart-dropdown").hide();
  $("#cart_show").click(function () {
    $("#cart-dropdown").slideToggle();
  });
});

function addToCart() {
  // Get the selected options and other relevant information
  const beds = document.getElementById("beds").value;
  const kitchen = document.getElementById("kitchen").value;
  const packageName = document.getElementById("package-heading").innerText;
  const packagePrice = document.getElementById("package-price").innerText;
  const packageImage = document.getElementById("package-image").src;

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa

  const existingItem = cartItems.find(
    (item) =>
      item.name === packageName &&
      item.price === packagePrice &&
      item.image === packageImage
  );
  if (existingItem) {
    // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
    existingItem.quantity += 1;
  } else {
    // Create an object representing the package
    const packageItem = {
      name: packageName,
      price: parseFloat(packagePrice.replace(/\D/g, "")), // Remove non-numeric characters
      beds: beds,
      kitchen: kitchen,
      image: packageImage,
      quantity: 1,
    };

    // Add the package to the shopping cart (you need to have the cartItems array defined globally)
    cartItems.push(packageItem);
  }

  cartCount++;
  // Call the function to update the cart count and dropdown
  updateCartCount();
  updateCartDropdown();
  updateLocalStorage(); // Assuming you want to store the cart in local storage
}

// Function to add the item to the shopping cart
function addToProductCart() {
  // Get product details
  const productName = document.querySelector(".content-header h1").innerText;
  const productPriceText =
    document.querySelector(".content-header h3").innerText;
  const productPrice = parseInt(productPriceText.replace(/[^\d]/g, ""), 10); // Remove non-numeric characters
  const productImage = document.querySelector(".image-slideshow img").src;
  // You may want to get the selected color and quantity as well
  const quantity = parseInt(
    document.querySelector(".content-footer input").value,
    10
  );
  const existingItem = cartItems.find(
    (item) =>
      item.name === productName &&
      item.price === productPrice &&
      item.image === productImage
  );

  if (existingItem) {
    // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
    existingItem.quantity += quantity;
  } else {
    // Create an object representing the product
    const productItem = {
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: quantity,
    };
    // Add the product to the shopping cart (you need to have the cartItems array defined globally)
    cartItems.push(productItem);
  }
  cartCount += quantity;
  // Call the function to update the cart count and dropdown
  updateCartCount();
  updateCartDropdown();
  updateLocalStorage(); // Assuming you want to store the cart in local storage
}
function Thanhtoan(event) {
  let cartCount = parseFloat(localStorage.getItem("cartCount"));
  if (cartCount == 0) {
    alert("Giỏ hàng rỗng. Vui lòng mua hàng để thanh toán!");
    event.preventDefault();
  }
}
$(document).ready(function () {
  $(".search_icon").click(function (event) {
    if ($(".hidden").css("display") === "none") {
      event.preventDefault();
      $(".hidden").show();
      $(".header_right_search").css("border-bottom", "1px solid black");
      $(".header_right_search i").css("top", "0%");
    } else {
      window.location.href = "./sanpham_tarot.html";
    }
  });
});
