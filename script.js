const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name");

  statusText.textContent = `Thanks, ${name || "there"}! Your message has been received.`;
  statusText.style.color = "#0f172a";

  form.reset();
});
