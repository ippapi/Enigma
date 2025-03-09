// Hàm booking
function booking() {
    alert("Bạn đã booking thành công!");
}
const buttons = document.getElementsByClassName("other_button");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", booking);
}
