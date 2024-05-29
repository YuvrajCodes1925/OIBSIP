const pendingTasksList = document.getElementById('pending-tasks');
const completedTasksList = document.getElementById('completed-tasks');
const newTaskTitleInput = document.getElementById('new-task-title');
const newTaskDescriptionInput = document.getElementById('new-task-description');
const dueDateInput = document.getElementById('due-date');
const prioritySelect = document.getElementById('priority');
const addTaskButton = document.getElementById('add-task-btn');
const searchInput = document.getElementById('search');
const sortDateButton = document.getElementById('sort-date-btn');
const sortPriorityButton = document.getElementById('sort-priority-btn');
const toggleDarkModeButton = document.getElementById('toggle-dark-mode');

let tasks = []; // Array to store tasks

function addTask(title, description, dueDate, priority, completed = false) {
  const task = {
    id: Date.now(), // Unique identifier for each task
    title,
    description,
    dueDate,
    priority,
    completed,
  };
  tasks.push(task);
  renderTasks();
}

function renderTasks() {
  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  for (const task of tasks) {
    if (!taskMatchesSearch(task)) continue;

    const listItem = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    const dueDateLabel = document.createElement('span');
    const priorityLabel = document.createElement('span');

    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    label.innerText = task.title;
    deleteButton.innerText = 'Delete';
    editButton.innerText = 'Edit';
    deleteButton.classList.add('delete-btn');
    editButton.classList.add('edit-btn');
    dueDateLabel.classList.add('due-date');
    dueDateLabel.innerText = task.dueDate ? `Due: ${task.dueDate}` : '';
    priorityLabel.classList.add('priority');
    priorityLabel.innerText = task.priority ? `Priority: ${task.priority}` : '';

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(dueDateLabel);
    listItem.appendChild(priorityLabel);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    if (task.description) {
      const descriptionParagraph = document.createElement('p');
      descriptionParagraph.classList.add('description');
      descriptionParagraph.innerText = task.description;
      listItem.appendChild(descriptionParagraph);
    }

    if (task.completed) {
      listItem.classList.add('completed');
      completedTasksList.appendChild(listItem);
    } else {
      pendingTasksList.appendChild(listItem);
    }

    // Mark task complete/pending on checkbox click
    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
      renderTasks();
    });

    // Delete task on delete button click
    deleteButton.addEventListener('click', () => {
      const taskIndex = tasks.findIndex((t) => t.id === task.id);
      tasks.splice(taskIndex, 1);
      renderTasks();
    });

    // Edit task on edit button click
    editButton.addEventListener('click', () => {
      const newTitle = prompt("Edit Task Title:", task.title);
      const newDescription = prompt("Edit Task Description (optional):", task.description || "");
      const newDueDate = prompt("Edit Due Date:", task.dueDate || "");
      const newPriority = prompt("Edit Priority (Low, Medium, High):", task.priority || "Low");
      if (newTitle) {
        task.title = newTitle;
        task.description = newDescription;
        task.dueDate = newDueDate;
        task.priority = newPriority;
        renderTasks();
      }
    });
  }
}

function taskMatchesSearch(task) {
  const searchText = searchInput.value.toLowerCase();
  return task.title.toLowerCase().includes(searchText) || (task.description && task.description.toLowerCase().includes(searchText));
}

addTaskButton.addEventListener('click', () => {
  const title = newTaskTitleInput.value.trim();
  const description = newTaskDescriptionInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = prioritySelect.value;
  if (title) {
    addTask(title, description, dueDate, priority);
    newTaskTitleInput.value = '';
    newTaskDescriptionInput.value = '';
    dueDateInput.value = '';
    prioritySelect.value = 'Low';
  }
});

searchInput.addEventListener('input', renderTasks);

sortDateButton.addEventListener('click', () => {
  tasks.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
  renderTasks();
});

sortPriorityButton.addEventListener('click', () => {
  const priorityOrder = { "Low": 1, "Medium": 2, "High": 3 };
  tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  renderTasks();
});

toggleDarkModeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Render tasks on initial load
renderTasks();
