const registrationForm = document.querySelector("#registration-form");
const formStatus = document.querySelector("#form-status");

const fieldRules = [
    {
        id: "full-name",
        errorId: "full-name-error",
        validate: (value) => value.trim().length >= 2 && value.trim().length <= 100
            ? ""
            : "Enter a name between 2 and 100 characters."
    },
    {
        id: "email",
        errorId: "email-error",
        validate: (value, input) => value.trim() && input.validity.valid
            ? ""
            : "Enter a valid email address."
    },
    {
        id: "phone",
        errorId: "phone-error",
        validate: (value) => {
            const digitCount = value.replace(/\D/g, "").length;
            return /^[+\d\s().-]+$/.test(value) && digitCount >= 7 && digitCount <= 15
                ? ""
                : "Enter a valid phone number with 7 to 15 digits."
        }
    },
    {
        id: "date-of-birth",
        errorId: "date-of-birth-error",
        validate: (value) => {
            if (!value) return "Enter your date of birth.";
            const date = new Date(`${value}T00:00:00`);
            return Number.isNaN(date.getTime()) || date > new Date()
                ? "Choose a valid date that is not in the future."
                : ""
        }
    },
    {
        id: "program",
        errorId: "program-error",
        validate: (value) => value ? "" : "Select a program of interest."
    },
    {
        id: "password",
        errorId: "password-error",
        validate: (value) => value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value)
            ? ""
            : "Use at least 8 characters, including a letter and a number."
    },
    {
        id: "confirm-password",
        errorId: "confirm-password-error",
        validate: (value) => value && value === document.querySelector("#password").value
            ? ""
            : "Passwords do not match."
    },
    {
        id: "address",
        errorId: "address-error",
        validate: (value) => value.trim().length >= 5
            ? ""
            : "Enter an address with at least 5 characters."
    }
];

function setFieldError(errorId, input, message) {
    document.querySelector(`#${errorId}`).textContent = message;
    if (input) {
        input.setAttribute("aria-invalid", String(Boolean(message)));
    }
    return !message;
}

function validateField(rule) {
    const input = document.querySelector(`#${rule.id}`);
    const error = rule.validate(input.value, input);
    return setFieldError(rule.errorId, input, error);
}

function validateGender() {
    const selectedGender = registrationForm.querySelector('input[name="gender"]:checked');
    const genderField = registrationForm.querySelector(".gender-field");
    const error = selectedGender ? "" : "Select a gender option.";
    document.querySelector("#gender-error").textContent = error;
    genderField.setAttribute("aria-invalid", String(Boolean(error)));
    return !error;
}

function validateTerms() {
    const terms = document.querySelector("#terms");
    const error = terms.checked ? "" : "You must confirm the information to continue.";
    document.querySelector("#terms-error").textContent = error;
    terms.setAttribute("aria-invalid", String(Boolean(error)));
    return !error;
}

function validateForm() {
    const fieldResults = fieldRules.map(validateField);
    const genderIsValid = validateGender();
    const termsAreValid = validateTerms();
    return fieldResults.every(Boolean) && genderIsValid && termsAreValid;
}

function clearStatus() {
    formStatus.textContent = "";
}

fieldRules.forEach((rule) => {
    const input = document.querySelector(`#${rule.id}`);
    input.addEventListener("input", () => {
        validateField(rule);
        if (rule.id === "password") {
            validateField(fieldRules.find((candidate) => candidate.id === "confirm-password"));
        }
        clearStatus();
    });
    input.addEventListener("blur", () => validateField(rule));
});

registrationForm.querySelectorAll('input[name="gender"]').forEach((input) => {
    input.addEventListener("change", () => {
        validateGender();
        clearStatus();
    });
});

document.querySelector("#terms").addEventListener("change", () => {
    validateTerms();
    clearStatus();
});

registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearStatus();

    if (!validateForm()) {
        const firstInvalid = registrationForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) {
            const focusTarget = firstInvalid.matches(".gender-field")
                ? firstInvalid.querySelector('input[name="gender"]')
                : firstInvalid;
            focusTarget.focus();
        }
        formStatus.textContent = "Please correct the highlighted fields before submitting.";
        return;
    }

    const studentName = document.querySelector("#full-name").value.trim();
    formStatus.textContent = `Registration details for ${studentName} are valid.`;
    window.alert(`Registration details for ${studentName} are valid. This demo does not submit or store your information.`);
});

registrationForm.addEventListener("reset", () => {
    registrationForm.querySelectorAll(".field-error").forEach((message) => {
        message.textContent = "";
    });
    registrationForm.querySelectorAll("[aria-invalid]").forEach((field) => {
        field.removeAttribute("aria-invalid");
    });
    clearStatus();
});
