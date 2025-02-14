document.querySelector(".gameInstructions").addEventListener("click", function() {
    let dropdownContent = document.querySelector(".instructionMsg");
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }
});