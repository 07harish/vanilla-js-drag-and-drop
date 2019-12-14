const empties = document.querySelectorAll('.tasks');

const Addhere = document.getElementById('Addhere');

// Fill listeners


// Loop through empty boxes and add listeners
for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}

// Drag Functions

function dragStart() {
    this.className += ' hold';
    setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
    this.className = ' empty';
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered';
}

function dragLeave() {
    this.className = 'tasks';
}

function dragDrop() {
    this.className = 'tasks';
    this.append(Addhere);
}


function Addtask() {

    console.log("added")
    var fragment = document.createDocumentFragment();
    var newTextarea = document.createElement('textarea');
    newTextarea.setAttribute('draggable', 'true');
    newTextarea.setAttribute('class', 'inputTextArea fill');
    newTextarea.setAttribute('rows', '3');


    console.log("added", newTextarea)
    // Addhere.textContent = newTextarea;

    fragment.appendChild(newTextarea);

    Addhere.appendChild(fragment);

    setTimeout(() => {
        const fill = document.querySelector('.inputTextArea');

        fill.addEventListener('dragstart', dragStart);
        fill.addEventListener('dragend', dragEnd);
    }, 0)
}