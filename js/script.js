let todoItems = [];

function renderTodo(todo) {
  localStorage.setItem("todoItemsRef", JSON.stringify(todoItems));

  const list = document.querySelector(".state__list");
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) list.innerHTML = "";
    return;
  }
  // Make the li item appear

  const isChecked = todo.checked ? "done" : "";
  const node = document.createElement("li");
  node.setAttribute("class", `state__list__item ${isChecked}`);
  node.setAttribute("data-key", todo.id);
  node.innerHTML = `<input id="${todo.id}" type="checkbox" />
    <label for="${todo.id}" class="tick"></label>
    <span>${todo.text}</span>
    <button class="edit">
      <i class="fa-regular fa-pen-to-square"></i>
    </button>
    <button class="delete">
      <i class="fa-regular fa-circle-xmark"></i>
    </button>
    `;
  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
}

function toggleDone(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

function deleteTodo(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index],
  };
  todoItems = todoItems.filter((item) => item.id !== Number(key));
  renderTodo(todo);
}

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector(".form__input");

  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});

// Mark task as completed and Delete
const list = document.querySelector(".state__list");
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.classList.contains("delete")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const ref = localStorage.getItem("todoItemsRef");
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach((t) => {
      renderTodo(t);
    });
  }
});
