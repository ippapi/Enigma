// JavaScript code for image selection
document.addEventListener("DOMContentLoaded", function () {
  const slideshowImages = document.querySelectorAll(".image-slideshow img");
  const productImages = document.querySelectorAll(".product-img img");

  // Show the first image in the slideshow when the page loads
  slideshowImages[0].style.opacity = 1;
  slideshowImages[0].style.display = "block";

  productImages.forEach((productImage, index) => {
    productImage.addEventListener("click", () => {
      productImages.forEach((img) => {
        img.classList.remove("selected");
      });

      productImage.classList.add("selected");

      slideshowImages.forEach((slideshowImage, i) => {
        if (i === index) {
          slideshowImage.style.display = "block";
          slideshowImage.style.opacity = 1;
        } else {
          slideshowImage.style.display = "none";
          slideshowImage.style.opacity = 0;
        }
      });
    });
  });
});
function selectColor(colorId) {
  var colors = document.getElementsByClassName("color");

  // Xóa lớp "selected" khỏi tất cả các màu
  for (var i = 0; i < colors.length; i++) {
    colors[i].classList.remove("selected");
  }

  // Thêm lớp "selected" vào màu được chọn
  var selectedColor = document.getElementById(colorId);
  selectedColor.classList.add("selected");
}
document.addEventListener("DOMContentLoaded", function () {
  // Chọn tùy chọn đầu tiên khi trang web được tải
  var defaultOption = document.querySelector(".filter p:first-child");
  defaultOption.click();
});
function showContent(contentId) {
  // Ẩn tất cả các nội dung và loại bỏ lớp "selected" từ tất cả các filter-item
  var filterContents = document.getElementsByClassName("filter-content");
  var filterItems = document.getElementsByClassName("filter-item");

  for (var i = 0; i < filterContents.length; i++) {
    filterContents[i].style.display = "none";
    filterItems[i].classList.remove("selected");
  }

  // Hiển thị nội dung tương ứng với mục được chọn và thêm lớp "selected" vào filter-item
  var selectedContent = document.getElementById(contentId);
  selectedContent.style.display = "block";

  // Tìm filter-item tương ứng và thêm lớp "selected"
  for (var i = 0; i < filterItems.length; i++) {
    if (filterItems[i].getAttribute("onclick").includes(contentId)) {
      filterItems[i].classList.add("selected");
      break; // Dừng vòng lặp sau khi thêm lớp "selected" vào filter-item
    }
  }
}
