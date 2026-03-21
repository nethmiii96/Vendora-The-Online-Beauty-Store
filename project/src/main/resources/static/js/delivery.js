document.addEventListener("DOMContentLoaded", () => {
    // Vehicle Sections
    const vehicleSelect = document.getElementById("vehicleFilter");
    const sections = {
        bike: document.querySelector(".bike"),
        car: document.querySelector(".car"),
        van: document.querySelector(".van")
    };
    const inputs = {
        bike: ["bikeModel", "bikePlate"],
        car: ["carModel", "carPlate"],
        van: ["vanModel", "vanPlate"]
    };

    // Hide all sections initially
    Object.values(sections).forEach(sec => sec.style.display = "none");

    vehicleSelect.addEventListener("change", () => {
        Object.keys(sections).forEach(type => {
            sections[type].style.display = "none";
            inputs[type].forEach(id => {
                const input = document.getElementById(id);
                input.required = false;
                input.value = ""; // clear previous input
            });
        });

        const selected = vehicleSelect.value;
        if (sections[selected]) {
            sections[selected].style.display = "block";
            inputs[selected].forEach(id => {
                document.getElementById(id).required = true;
            });
        }
    });

    // Province → District logic
    const province = document.getElementById("deliveryProvince");
    const district = document.getElementById("district");

    const districts = {
        western: ["Colombo", "Gampaha", "Kalutara"],
        central: ["Kandy", "Matale", "Nuwara Eliya"],
        southern: ["Galle", "Matara", "Hambantota"],
        eastern: ["Ampara", "Batticaloa", "Trincomalee"],
        northCentral: ["Anuradhapura", "Polonnaruwa"],
        northern: ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
        northWestern: ["Kurunegala", "Puttalam"],
        uva: ["Badulla", "Moneragala"],
        sabaragamuwa: ["Ratnapura", "Kegalle"]
    };

    province.addEventListener("change", () => {
        district.innerHTML = '<option value="">Select District</option>';
        if (districts[province.value]) {
            districts[province.value].forEach(d => {
                const opt = document.createElement("option");
                opt.value = d;
                opt.textContent = d;
                district.appendChild(opt);
            });
        }
    });
});