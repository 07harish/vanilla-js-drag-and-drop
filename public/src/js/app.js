const empties = document.querySelectorAll(".tasks");
// Get all tasks from LocalStorage
let allTasks = {};

// Get the element for dnd
let getElement;

let count;

window.onload = () => {
  // IF empty, add local storage
  if (localStorage.getItem("todoTasks") === null) {
    localStorage.setItem("todoTasks", JSON.stringify({}));
    localStorage.setItem("total", JSON.stringify(0));
  }
  getElement = null;

  const todoTasks = document.getElementById("todoTasks");
  const doneTasks = document.getElementById("doneTasks");
  const progressTasks = document.getElementById("progressTasks");
  count = JSON.parse(localStorage.getItem("total"));
  allTasks = JSON.parse(localStorage.getItem("todoTasks"));
  Object.values(allTasks).forEach(task => {
    if (task.status === "todoTasks") {
      todoTasks.appendChild(createTaskCard(task));
    }
    if (task.status === "doneTasks") {
      doneTasks.appendChild(createTaskCard(task));
    }
    if (task.status === "progressTasks") {
      progressTasks.appendChild(createTaskCard(task));
    }
  });
  console.log("count", count);
};

// Loop through empty boxes and add listeners
for (const tasks of empties) {
  tasks.addEventListener("dragover", dragOver);
  tasks.addEventListener("dragenter", dragEnter);
  tasks.addEventListener("dragleave", dragLeave);
  tasks.addEventListener("drop", dragDrop);
}

const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("drop", deleteTask);
deleteBtn.addEventListener("dragover", dragOver);
deleteBtn.addEventListener("dragenter", deletedragEnter);
deleteBtn.addEventListener("dragleave", deletedragLeave);

// Drag Functions
function dragStart(e) {
  deleteBtn.style.display = "block";
  getElement = document.getElementById(e.target.id);

  getElement.className += " hold";
  setTimeout(() => (getElement.className = "invisible"), 0);
  console.log("eeee", e.target.id);
}

function dragEnd(e) {
  getElement.className = "fill";
  deleteBtn.style.display = "none";
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.className += " hovered";
}

function dragLeave(e) {
  this.className = "tasks";
}

function deletedragLeave(e) {
  // console.log("dsdsdsd", database)
  this.className = "deleteBtn Btn";
}

function deletedragEnter(e) {
  this.className += " deleteBtnHovered";
}

function addOrReplace(object) {
  // console.log("sdsss", object);
  if (!allTasks[object.id]) count++;
  allTasks[object.id] = object;
  updateTasks();
}

let updateTasks = () => {
  localStorage.setItem("total", JSON.stringify(count));
  localStorage.setItem("todoTasks", JSON.stringify(allTasks));
};

function dragDrop(e) {
  // console.log("get1212", e.currentTarget)
  this.className = "tasks";
  this.append(getElement);

  addOrReplace({
    id: getElement.id,
    title: getElement.querySelector(".title").value,
    desc: getElement.querySelector(".desc").value,
    status: e.currentTarget.id
  });
}

// #######################################################################

let createTaskCard = Task => {
  console.log("task", Task);

  let NewTaskCard, taskTitle, taskDescribe;

  NewTaskCard = document.createElement("div");
  NewTaskCard.setAttribute("class", "fill");
  NewTaskCard.setAttribute("id", Task && Task.id ? Task.id : count);
  NewTaskCard.setAttribute("draggable", "true");

  taskTitle = document.createElement("input");
  taskTitle.setAttribute("type", "text");
  taskTitle.setAttribute("placeholder", "Title");
  taskTitle.setAttribute("class", "title");

  taskDescribe = document.createElement("textArea");
  taskDescribe.setAttribute("placeholder", "Describe");
  taskDescribe.setAttribute("class", "desc");

  let dragMe = document.createElement("div");
  dragMe.setAttribute("class", "dragMe");

  if (Task) {
    taskTitle.value = Task.title;
    taskDescribe.value = Task.desc;
  }

  NewTaskCard.appendChild(dragMe);
  NewTaskCard.appendChild(taskTitle);
  NewTaskCard.appendChild(taskDescribe);

  NewTaskCard.addEventListener("dragstart", dragStart);
  NewTaskCard.addEventListener("dragend", dragEnd);
  return NewTaskCard;
};

function addTask() {
  // Add new card in the below
  console.log("count addtask", count);
  let addTaskHere = document.getElementById("Addhere");
  if (addTaskHere.firstChild) {
    return 0;
  }

  const newtask = createTaskCard();

  let fragment = new DocumentFragment();
  fragment.appendChild(newtask);
  addTaskHere.appendChild(fragment);
}

function deleteTask(e) {
  console.log("id", e.target.id, getElement);
  delete allTasks[getElement.id];
  // getElement.style.display = 'none'
  getElement.parentNode.removeChild(getElement);
  this.className = "deleteBtn Btn";
  // localStorage.setItem('total', JSON.stringify(count - 1))
  // count--;
  updateTasks();
}
