const listEl = document.querySelector('.todo__list');
const createBtnEl = document.querySelector('.app__button--create');
const filterCompletedBtn = document.querySelector('#filterCompleted');
const filterIncompleteBtn = document.querySelector('#filterIncomplete');
const filterAllBtn = document.querySelector('#filterAll');
let todos = [];

function createNewTodo() {
    const item = {
        id: new Date().getTime(),
        text: '',
        complete: false
    };

    todos.unshift(item);
    const { itemEl, inputEl, editBtnEl, removeBtnEl } = createTodoElement(item);
    listEl.prepend(itemEl);

    inputEl.removeAttribute('disabled');
    inputEl.focus();

    save();
}

function createTodoElement(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('todo__item');
    itemEl.dataset.itemId = item.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.complete;

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';
    editBtnEl.setAttribute('title', 'Edit');
    editBtnEl.setAttribute('aria-label', 'Edit');

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = 'remove';
    removeBtnEl.setAttribute('title', 'Remove');
    removeBtnEl.setAttribute('aria-label', 'Remove');

    actionsEl.appendChild(editBtnEl);
    actionsEl.appendChild(removeBtnEl);

    itemEl.appendChild(checkbox);
    itemEl.appendChild(inputEl);
    itemEl.appendChild(actionsEl);

    checkbox.addEventListener('change', () => {
        item.complete = checkbox.checked;
        if (checkbox.checked) {
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }
        save();
    });

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
        save();
    });

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');
        save();
    });

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    });

    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== item.id);
        itemEl.remove();
        save();
    });

    return { itemEl, inputEl, editBtnEl, removeBtnEl };
}

function save() {
    localStorage.setItem('my_todos', JSON.stringify(todos));
}

function load() {
    const data = localStorage.getItem('my_todos');
    todos = data ? JSON.parse(data) : [];
}

function displayTodos() {
    listEl.innerHTML = '';
    load();

    todos.forEach(item => {
        const { itemEl } = createTodoElement(item);
        listEl.append(itemEl);
    });
}

function showCompletedTasks() {
    const allTasks = document.querySelectorAll('.todo__item');
    allTasks.forEach(task => {
        if (!task.classList.contains('complete')) {
            task.classList.add('hidden');
        } else {
            task.classList.remove('hidden');
        }
    });
}

function showIncompleteTasks() {
    const allTasks = document.querySelectorAll('.todo__item');
    allTasks.forEach(task => {
        if (task.classList.contains('complete')) {
            task.classList.add('hidden');
        } else {
            task.classList.remove('hidden');
        }
    });
}

function showAllTasks() {
    const allTasks = document.querySelectorAll('.todo__item');
    allTasks.forEach(task => {
        task.classList.remove('hidden');
    });
}

function save() {
    localStorage.setItem('my_todos', JSON.stringify(todos));
}

function load() {
    const data = localStorage.getItem('my_todos');
    todos = data ? JSON.parse(data) : [];
}

filterCompletedBtn.addEventListener('click', showCompletedTasks);
filterIncompleteBtn.addEventListener('click', showIncompleteTasks);
filterAllBtn.addEventListener('click', showAllTasks);
// Event listeners
createBtnEl.addEventListener('click', createNewTodo);

// Initial load
displayTodos();
