const newItemInput = document.getElementById("new-item-input");
const addItemBtn = document.getElementById("add-item-btn");
const toDoList = document.getElementById("to-do-list");
let list = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];

addItemBtn.addEventListener("click", function() {
  const newItemText = newItemInput.value;

  if (newItemText === "") {
    return; 
  }

  list.push(newItemText);

  const newItem = document.createElement("li");
  newItem.innerHTML = `
    <span>${newItemText}</span>
    <button>Delete</button>
  `;

  toDoList.appendChild(newItem);

  newItemInput.value = "";

  const deleteBtn = newItem.querySelector("button");
  deleteBtn.addEventListener("click", function() {
    newItem.remove();
  });

  localStorage.setItem('list', JSON.stringify(list));
});

pressed = false;

function load() {
  for (let i = 0; i < list.length; i++) {
    const newItemText = list[i];

    const newItem = document.createElement("li");
    newItem.innerHTML = `
      <span>${newItemText}</span>
      <button>Delete</button>
    `;

    toDoList.appendChild(newItem);

    newItemInput.value = "";

    const deleteBtn = newItem.querySelector("button");
    deleteBtn.addEventListener("click", function() {
      newItem.remove();
    });
  }
}

load();
// When you press enter for the "add a new item" box, it reloads the page instead of adding - Baron