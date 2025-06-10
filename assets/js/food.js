// assets/js/food.js

const listContainer = document.getElementById("dynamic-list");

export async function list() {
  listContainer.innerHTML = "";

  const res = await fetch("backend/food/list.php");
  const foods = await res.json();

  foods.forEach(food => render(food));
}

export async function add(data) {
  const res = await fetch("backend/food/add.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (result.success) {
    render({ ...data, id: result.id });
  } else {
    alert(result.message || "Failed to add food.");
  }
}

export async function remove(id, element) {
  const res = await fetch("backend/food/delete.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const result = await res.json();

  if (result.success) {
    element.remove();
  } else {
    alert(result.message || "Failed to delete.");
  }
}

export async function edit(id, updatedData, element) {
  const res = await fetch("backend/food/edit.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...updatedData }),
  });

  const result = await res.json();

  if (result.success) {
    const span = element.querySelector(".task-text");
    span.textContent = `Name: ${updatedData.name}, Price: $${updatedData.price}`;
  } else {
    alert(result.message || "Update failed.");
  }
}

export function render(food) {
  const li = document.createElement("li");
  li.className = "task-item";
  li.dataset.id = food.id;

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = `Name: ${food.name}, Price: $${food.price}`;
  li.appendChild(span);

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.innerHTML = "&#9998;";
  editBtn.title = "Edit";

  editBtn.addEventListener("click", () => {
    const newName = prompt("New name:", food.name);
    const newPrice = prompt("New price:", food.price);
    if (newName && newPrice) {
      edit(food.id, { name: newName, price: parseInt(newPrice) }, li);
    }
  });

  const delBtn = document.createElement("button");
  delBtn.className = "delete-btn";
  delBtn.innerHTML = "&times;";
  delBtn.title = "Delete";

  delBtn.addEventListener("click", () => remove(food.id, li));

  li.appendChild(editBtn);
  li.appendChild(delBtn);

  listContainer.appendChild(li);
}
