document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const demoForm = document.querySelector("[data-demo-form]");

if (demoForm) {
  demoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = demoForm.querySelector("[data-form-note]");
    note.textContent = "The form preview is complete. No message was sent or stored.";
  });
}
