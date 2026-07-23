const panel = document.getElementById("panel");
const closeButton = document.getElementById("closePanel");

closeButton.addEventListener("click", () => {
    panel.classList.add("hidden");
});

console.log("Portfolio loaded.");