// assets/script.js

import * as Food from './js/food.js';

const handlers = {
  foods: Food,
  waiters: {
    add: () => alert("Waiter add not implemented."),
    list: () => { },
  },
  orders: {
    add: () => alert("Order add not implemented."),
    list: () => { },
  }
};


document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn");
  const form = document.getElementById("dynamic-form");
  const list = document.getElementById("dynamic-list");
  const summary = document.getElementById("summary");
  const sectionTitle = document.getElementById("section-title");


  let currentSection = "waiters";

  const schemas = {
    waiters: [
      { label: "Name", name: "Name", type: "text", required: true }
    ],
    foods: [
      { label: "Name", name: "Name", type: "text", required: true },
      { label: "Price", name: "Price", type: "number", min: 1, required: true }
    ],
    orders: [
      { label: "Waiter ID", name: "waiter_id", type: "number", required: true }
    ]
  };

  const renderForm = (section) => {
    form.innerHTML = "";

    schemas[section].forEach(field => {
      const input = document.createElement("input");
      input.placeholder = field.label;
      input.name = field.name;
      input.type = field.type;
      if (field.required) input.required = true;
      if (field.min) input.min = field.min;
      input.className = "form-field";
      form.appendChild(input);
    });

    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "+";
    submit.className = "button";
    form.appendChild(submit);
  };

  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      navButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      currentSection = button.dataset.section;
      sectionTitle.textContent = button.textContent;
      renderForm(currentSection);
      handlers[currentSection]?.list?.();
      summary.textContent = "";
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    handlers[currentSection]?.add?.(formData);
    form.reset();
  });
  renderForm(currentSection);
  handlers[currentSection]?.list?.();
});