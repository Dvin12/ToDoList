let todoItems = [];

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
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

function renderTodo(todo) {
  const list = document.querySelector(".state__list");
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

  list.append(node);
}
