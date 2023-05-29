const addItemForm = document.getElementById("add-item-form");
const newItemInput = document.getElementById("new-item-input");
const toDoList = document.getElementById("to-do-list");
let list = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];

addItemForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const newItemText = newItemInput.value.trim();

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
    list = list.filter(item => item !== newItemText);
    saveListToLocalStorage();
  });

  saveListToLocalStorage();
});

function loadList() {
  for (let i = 0; i < list.length; i++) {
    const newItemText = list[i];

    const newItem = document.createElement("li");
    newItem.innerHTML = `
      <span>${newItemText}</span>
      <button>Delete</button>
    `;

    toDoList.appendChild(newItem);

    const deleteBtn = newItem.querySelector("button");
    deleteBtn.addEventListener("click", function() {
      newItem.remove();
      list = list.filter(item => item !== newItemText);
      saveListToLocalStorage();
    });
  }
}

function saveListToLocalStorage() {
  localStorage.setItem('list', JSON.stringify(list));
}

loadList();