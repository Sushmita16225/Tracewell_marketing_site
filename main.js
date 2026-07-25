(function () {
  "use strict";

  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");

  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("blur", () => {
      field.setAttribute("data-touched", "true");
      field.setAttribute("aria-invalid", String(!field.checkValidity()));
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let firstInvalid = null;
    form.querySelectorAll("input[required], textarea[required]").forEach((field) => {
      field.setAttribute("data-touched", "true");
      const valid = field.checkValidity();
      field.setAttribute("aria-invalid", String(!valid));
      if (!valid && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      status.textContent = "Please fill in the highlighted fields before sending.";
      status.setAttribute("data-visible", "true");
      status.style.background = "rgba(192, 80, 59, 0.1)";
      status.style.borderColor = "rgba(192, 80, 59, 0.35)";
      return;
    }

    // This is a static demo site — there is no backend, so we simply
    // confirm receipt in place rather than performing a real submit.
    status.textContent = "Thanks — a Tracewell engineer will reply within one business day.";
    status.style.background = "";
    status.style.borderColor = "";
    status.setAttribute("data-visible", "true");
    form.reset();
  });
})();
