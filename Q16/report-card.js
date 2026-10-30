const marksForm = document.querySelector("#marks-form");
const resultPanel = document.querySelector("#result-panel");
const formMessage = document.querySelector("#form-message");

const markFields = [
    { name: "entrepreneurship", label: "Entrepreneurship" },
    { name: "mathematics1", label: "Mathematics 1" },
    { name: "aoc", label: "Architectural Of Computer" },
    { name: "pp1", label: "Programming Practice 1" },
    { name: "bwd_theory", label: "Basics of Web Development" },
    { name: "es", label: "Environmental Science" }
];

function calculateGrade(percentage) {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    return "F";
}

function formatNumber(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function showError(message) {
    formMessage.textContent = message;
    formMessage.hidden = false;
    resultPanel.hidden = true;
}

marksForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.hidden = true;

    const formData = new FormData(marksForm);
    const marks = markFields.map(({ name, label }) => {
        const rawValue = formData.get(name);
        const value = typeof rawValue === "string" && rawValue.trim() !== ""
            ? Number(rawValue)
            : Number.NaN;
        return { label, value };
    });

    const invalidMark = marks.find(({ value }) => !Number.isFinite(value) || value < 0 || value > 100);
    if (invalidMark) {
        showError(`Enter a valid mark from 0 to 100 for ${invalidMark.label}.`);
        return;
    }

    const total = marks.reduce((sum, mark) => sum + mark.value, 0);
    const percentage = (total / (marks.length * 100)) * 100;
    const grade = calculateGrade(percentage);
    const studentName = String(formData.get("student_name") || "").trim();

    document.querySelector("#total-value").textContent = `${formatNumber(total)} / ${marks.length * 100}`;
    document.querySelector("#percentage-value").textContent = `${percentage.toFixed(2)}%`;
    document.querySelector("#grade-value").textContent = grade;
    document.querySelector("#student-result-name").textContent = studentName ? `For ${studentName}` : "Your overall performance";
    document.querySelector("#grade-note").textContent = grade === "F"
        ? "Keep practicing — every step forward counts."
        : "Great work — keep building on this achievement.";
    resultPanel.hidden = false;
});

marksForm.addEventListener("reset", () => {
    formMessage.hidden = true;
    resultPanel.hidden = true;
});
