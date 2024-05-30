document.getElementById("togglePassword").addEventListener("click", function() {
    const passwordInput = document.getElementById("pass");
    const eyeIcon = document.getElementById("togglePassword");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    }
});

function isValidContactNumber(contactNum) {
    return !isNaN(contactNum) && contactNum.trim() !== "";
}

document.getElementById("signUp").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    const requiredFields = document.querySelectorAll(".required");
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.nextElementSibling.style.display = "inline";
        } else {
            field.nextElementSibling.style.display = "none";
        }
    });

    const contactNumField = document.getElementById("contactNum");
    if (contactNumField.value && !isValidContactNumber(contactNumField.value)) {
        isValid = false;
        alert("Please enter a valid contact number.");
    }

    if (isValid) {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        localStorage.setItem("formData", JSON.stringify(data));

        const queryString = new URLSearchParams(formData).toString();
        window.location.href = `profile.html?${queryString}`;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const savedFormData = JSON.parse(localStorage.getItem("formData"));
    if (savedFormData) {
        for (const [key, value] of Object.entries(savedFormData)) {
            const input = document.querySelector(`[name=${key}]`);
            if (input) {
                if (input.type === "radio" || input.type === "checkbox") {
                    input.checked = input.value === value;
                } else {
                    input.value = value;
                }
            }
        }
    }
});

