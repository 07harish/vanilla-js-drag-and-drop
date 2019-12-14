// const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.tasks');

var fill;


// Loop through empty boxes and add listeners
for (const tasks of empties) {
    tasks.addEventListener('dragover', dragOver);
    tasks.addEventListener('dragenter', dragEnter);
    tasks.addEventListener('dragleave', dragLeave);
    tasks.addEventListener('drop', dragDrop);
}

// Drag Functions
var getElement;
function dragStart(e) {
    console.log("osssasa", e)
    getElement = document.getElementById(e.target.id)

    getElement.className += ' hold';
    setTimeout(() => (getElement.className = 'invisible'), 0);
    console.log("eeee", e.target.id)
}

function dragEnd(e) {
    getElement.className = 'fill';
    console.log("eeee", getElement, " xxxxxxx", e.target.id)
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered';
}

function dragLeave(e) {

    this.className = 'tasks';
}
var newTextArea;

function dragDrop(e) {
    // console.log("get", e.target.id)
    this.className = 'tasks';
    this.append(getElement);
}

// #######################################################################
var count = 1;
function addTask() {
    var addTaskHere = document.getElementById("Addhere");
    newTextArea = newTextArea + count;
    newTextArea = document.createElement('textarea');
    newTextArea.setAttribute('class', 'newTextArea fill');
    newTextArea.setAttribute('id', count);
    newTextArea.setAttribute('draggable', 'true')

    newTextArea.addEventListener('dragstart', dragStart);
    newTextArea.addEventListener('dragend', dragEnd);
    count++;
    console.log("fsdf", newTextArea);
    var fragment = new DocumentFragment();
    fragment.appendChild(newTextArea);
    addTaskHere.appendChild(fragment);
}