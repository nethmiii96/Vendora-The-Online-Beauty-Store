document.addEventListener("DOMContentLoaded", () => {

    // Handle both deliveryForm and registrationForm
    const forms = ["deliveryForm", "registrationForm"];

    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Phone vs emergency phone check (only deliveryForm)
            const phone = form.querySelector("#phone")?.value.trim();
            const emergencyPhone = form.querySelector("#emergencyPhone")?.value.trim();
            if (phone && emergencyPhone && phone === emergencyPhone) {
                alert("Emergency phone number cannot be the same as your phone number.");
                return;
            }

            // Profile picture size check (<2MB)
            const profileInput = form.querySelector("#profilePicture");
            if (profileInput?.files[0] && profileInput.files[0].size > 2 * 1024 * 1024) {
                alert("Profile picture must be less than 2MB");
                return;
            }

            // Supplier: Ensure at least one product category is selected
            const productCategories = form.querySelectorAll('input[name="productCategories[]"]');
            if (productCategories.length > 0) {
                const checked = Array.from(productCategories).some(cb => cb.checked);
                if (!checked) {
                    alert("Please select at least one product category.");
                    return;
                }

                // Ensure required product textareas are filled
                const sections = form.querySelectorAll(".routine");
                for (let sec of sections) {
                    const textarea = sec.querySelector("textarea");
                    if (sec.style.display !== "none" && textarea.value.trim() === "") {
                        alert(`Please enter product details for ${textarea.id.replace("Products", "")}.`);
                        return;
                    }
                }
            }

            // Vehicle inputs required check (deliveryForm)
            const vehicleSection = form.querySelector(".partner[style*='block']");
            if (vehicleSection) {
                const inputs = vehicleSection.querySelectorAll("input");
                for (let inp of inputs) {
                    if (inp.required && inp.value.trim() === "") {
                        alert(`Please fill ${inp.previousElementSibling.textContent}`);
                        return;
                    }
                }
            }

            // Success
            alert("Registration submitted successfully!");
            window.location.href = "index.html"; // redirect to home
        });
    });
});

// Global cancel function
function cancelForm() {
    if (confirm("Cancel registration? All entered data will be lost.")) {
        window.location.href = "index.html";
    }
}