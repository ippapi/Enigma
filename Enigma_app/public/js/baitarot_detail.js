// Define the number of cards to show initially and incrementally
let cardsToShow = 12;
const cardContainer = document.querySelector(".product-cards");
const loadMoreButton = document.getElementById("load-more-button");
const productCards = Array.from(document.querySelectorAll(".product-card"));
// Function to show the next batch of product cards
function showMoreCards() {
  for (let i = 0; i < cardsToShow; i++) {
    if (productCards.length > 0) {
      productCards.shift().style.display = "block";
    } else {
      loadMoreButton.style.display = "none";
      break;
    }
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-bar button");
  const productCards = document.querySelectorAll(".product-card");
  const noResultsMessage = document.querySelector(".no-results");
  const filterName = document.querySelector("#filter-name");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.getAttribute("data-filter");

      // Ẩn tất cả sản phẩm
      productCards.forEach((card) => {
        card.style.display = "none";
        card.classList.remove("show");
      });

      // Hiển thị sản phẩm theo danh mục được chọn
      if (filterValue === "all") {
        productCards.forEach((card) => {
          card.style.display = "block";
          card.classList.add("show");
        });
        // Initially, hide all product cards and show the first batch
        productCards.forEach((card, index) => {
          if (index >= cardsToShow) {
            card.style.display = "none";
          }
        });

        // Add a click event listener to the "Load More" button
        loadMoreButton.addEventListener("click", showMoreCards);

        // Show the initial batch of product cards
        showMoreCards();
        noResultsMessage.style.display = "none";
        loadMoreButton.style.display = "block";
      } else {
        const filteredCards = document.querySelectorAll(
          `[data-category="${filterValue}"]`
        );
        if (filteredCards.length === 0) {
          noResultsMessage.style.display = "block";
          loadMoreButton.style.display = "none";
          filterName.textContent = button.textContent;
        } else {
          filteredCards.forEach((card) => {
            card.style.display = "block";
            card.classList.add("show");
          });
          noResultsMessage.style.display = "none";
          loadMoreButton.style.display = "none";
        }
      }
    });
  });
});

$(document).ready(function () {
  $(".filter-button").click(function () {
    $(".filter-button").removeClass("active"); // Loại bỏ lớp "active" từ tất cả các nút
    $(this).addClass("active"); // Thêm lớp "active" cho nút được chọn
  });
});
// Initially, hide all product cards and show the first batch
productCards.forEach((card, index) => {
  if (index >= cardsToShow) {
    card.style.display = "none";
  }
});

// Add a click event listener to the "Load More" button
loadMoreButton.addEventListener("click", showMoreCards);

// Show the initial batch of product cards
showMoreCards();
