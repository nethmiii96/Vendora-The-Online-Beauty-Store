/* ------------------ GLOBAL PAGE DETECTION ------------------ */
const path = window.location.pathname;
const isRoutinePage = path.includes("routine.html");
const isDeliveryPage = path.includes("delivery.html");

/* ------------------ CANCEL BUTTON ------------------ */
window.cancelForm = function () {
    const confirmCancel = confirm(
        "Are you sure you want to cancel the registration? All entered information will be lost."
    );
    if (confirmCancel) {
        window.location.href = "index.html";
    }
};

/* ------------------ DOM CONTENT LOADED ------------------ */
document.addEventListener("DOMContentLoaded", () => {

    /* ------------------ PROFILE DROPDOWN ------------------ */
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    const profileImg = document.getElementById("navProfileImg");
    const dropdown = document.getElementById("profileDropdown");
    const navUserName = document.getElementById("navUserName");

    if (user && profileImg) {
        // Set name
        if (navUserName) navUserName.textContent = user.name;

        // Set profile image
        if (user.image) profileImg.src = user.image;

        // Toggle dropdown
        profileImg.addEventListener("click", () => {
            dropdown.classList.toggle("hidden");
        });

        // Go to profile page
        document.getElementById("goProfile")?.addEventListener("click", () => {
            window.location.href = "profile.html";
        });

        // Logout
        document.getElementById("logoutBtn")?.addEventListener("click", () => {
            localStorage.removeItem("loggedUser");
            window.location.href = "login.html";
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".profile-menu")) {
                dropdown.classList.add("hidden");
            }
        });
    }

    /* ------------------ HOME PAGE FEEDBACK GRID ------------------ */
    const grid = document.getElementById("homeFeedbackGrid");
      if (!grid) return;

      let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

      // Add test feedback only if empty
      if(feedbacks.length === 0){
        feedbacks.push({
          name: "Test User",
          email: "test@gmail.com",
          role: "customer",
          rating: "5",
          message: "This is a test feedback. It should display nicely in the grid layout.",
          image: "",
          source: "routine",
          date: new Date().toLocaleDateString()
        });
        localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
      }

      // Show latest 4
      const latest = feedbacks.slice(-4).reverse();

      grid.innerHTML = latest.map(f => `
        <div class="feedback-card">
          <div class="user">
            <img src="${f.image || '../images/default-user.png'}">
            <span>${f.email}</span>
          </div>
          <div class="rating">⭐ ${f.rating}/5</div>
          <p class="message">${f.message}</p>
        </div>
      `).join("");
    });

    /* ------------------ ROUTINE PAGE FLAG ------------------ */
    if (isRoutinePage) {
        console.log("Routine page loaded");
        // Routine page JS can be initialized here or imported separately
    }

    /* ------------------ DELIVERY PAGE FLAG ------------------ */
    if (isDeliveryPage) {
        console.log("Delivery page loaded");
        // Delivery page JS can be initialized here or imported separately
    }

});