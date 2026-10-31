const eligibilityForm = document.querySelector("#eligibility-form");

eligibilityForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(eligibilityForm);
    const age = Number(formData.get("age"));
    const attendance = Number(formData.get("attendance"));
    const marks = Number(formData.get("marks"));
    const studentName = String(formData.get("student_name") || "").trim();
    const name = studentName || "The student";

    const reasons = [];

    if (age < 16) {
        reasons.push("age must be at least 16");
    }
    if (attendance < 75) {
        reasons.push("attendance must be at least 75%");
    }
    if (marks < 40) {
        reasons.push("marks must be at least 40%");
    }

    if (reasons.length === 0) {
        window.alert(`${name} is eligible for the examination. All eligibility requirements are met.`);
    } else {
        window.alert(`${name} is not eligible for the examination because ${reasons.join(", and ")}.`);
    }
});
