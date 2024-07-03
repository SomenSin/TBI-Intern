const scrollToTopButton = document.getElementsByClassName("scroll-to-top")[0];
window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    // Adjust scroll threshold as needed
    scrollToTopButton.style.display = "block"; // Show the button
  } else {
    scrollToTopButton.style.display = "none"; // Hide the button
  }
});
scrollToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
