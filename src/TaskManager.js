
import './style.css';
import { addActivity } from './Activity.js';
import { addNotification } from './Notifications.js';

// ======================================
// LIFELOOP TASK MANAGER
// ======================================

export function TaskManager() {
  return `

    <div class="max-w-7xl mx-auto w-full min-w-0">

      <!-- PAGE HEADING -->

      <div class="mb-6 md:mb-8">

        <h1 class="text-2xl sm:text-3xl font-extrabold text-green-900">
          Task Management 📋
        </h1>

        <p class="text-gray-600 mt-2 text-sm sm:text-base">
          Organize your activities and achieve your goals.
        </p>

      </div>


      <!-- TASK STATISTICS -->

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mb-6 md:mb-8">

        <div class="bg-white rounded-xl shadow p-4 sm:p-5 border-l-4 border-blue-500">
          <p class="text-gray-500 font-medium text-sm sm:text-base">Total Tasks</p>
          <h2 id="totalTaskCount"
              class="text-2xl sm:text-3xl font-bold text-blue-700 mt-2">
            0
          </h2>
        </div>

        <div class="bg-white rounded-xl shadow p-4 sm:p-5 border-l-4 border-green-500">
          <p class="text-gray-500 font-medium text-sm sm:text-base">Completed</p>
          <h2 id="completedTaskCount"
              class="text-2xl sm:text-3xl font-bold text-green-700 mt-2">
            0
          </h2>
        </div>

        <div class="bg-white rounded-xl shadow p-4 sm:p-5 border-l-4 border-orange-500">
          <p class="text-gray-500 font-medium text-sm sm:text-base">Pending</p>
          <h2 id="pendingTaskCount"
              class="text-2xl sm:text-3xl font-bold text-orange-600 mt-2">
            0
          </h2>
        </div>

      </div>


      <!-- ADD TASK FORM -->

      <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-lg mb-6 md:mb-8">

        <h2 class="text-lg sm:text-xl font-bold text-green-800 mb-5">
          ➕ Create New Task
        </h2>

        <form id="taskForm"
              class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

          <!-- TASK NAME -->

          <div class="min-w-0">

            <label for="taskName"
                   class="block font-semibold mb-2 text-gray-700 text-sm sm:text-base">
              Task Name
            </label>

            <input
              id="taskName"
              type="text"
              maxlength="100"
              placeholder="Enter task name"
              required
              class="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-green-500"
            >

          </div>


          <!-- PRIORITY -->

          <div class="min-w-0">

            <label for="taskPriority"
                   class="block font-semibold mb-2 text-gray-700 text-sm sm:text-base">
              Priority
            </label>

            <select
              id="taskPriority"
              class="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-green-500">

              <option value="Low">🟢 Low</option>
              <option value="Medium" selected>🟠 Medium</option>
              <option value="High">🔴 High</option>

            </select>

          </div>


          <!-- DESCRIPTION -->

          <div class="md:col-span-2 min-w-0">

            <label for="taskDescription"
                   class="block font-semibold mb-2 text-gray-700 text-sm sm:text-base">
              Task Description
            </label>

            <textarea
              id="taskDescription"
              rows="3"
              maxlength="300"
              placeholder="Describe your task..."
              class="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-green-500 resize-y"></textarea>

          </div>


          <!-- DUE DATE -->

          <div class="min-w-0">

            <label for="taskDueDate"
                   class="block font-semibold mb-2 text-gray-700 text-sm sm:text-base">
              Due Date
            </label>

            <input
              id="taskDueDate"
              type="date"
              required
              class="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-green-500"
            >

          </div>


          <!-- ADD BUTTON -->

          <div class="flex items-end">

            <button
              type="submit"
              class="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg p-3 text-sm sm:text-base font-bold hover:from-green-700 hover:to-emerald-600 transition">
              + Add Task
            </button>

          </div>

        </form>

      </div>


      <!-- MY TASKS -->

      <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">

        <div class="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">

          <h2 class="text-lg sm:text-xl font-bold text-green-800">
            My Tasks
          </h2>


          <!-- TASK FILTER -->

          <div class="grid grid-cols-3 sm:flex gap-2 w-full lg:w-auto">

            <button
              data-filter="all"
              class="task-filter px-2 sm:px-4 py-2 rounded-lg bg-green-600 text-white font-semibold text-xs sm:text-sm">
              All
            </button>

            <button
              data-filter="pending"
              class="task-filter px-2 sm:px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold text-xs sm:text-sm">
              Pending
            </button>

            <button
              data-filter="completed"
              class="task-filter px-2 sm:px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold text-xs sm:text-sm">
              Completed
            </button>

          </div>

        </div>


        <!-- TASK LIST -->

        <div id="taskList" class="space-y-3 sm:space-y-4 min-w-0"></div>

      </div>

    </div>

  `;
}


// ======================================
// INITIALIZE TASK MANAGER
// ======================================

export function initializeTaskManager() {

  let tasks = JSON.parse(
    localStorage.getItem('lifeloopTasks') || '[]'
  );

  let currentFilter = 'all';


  // GET ELEMENTS

  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');
  const taskName = document.getElementById('taskName');
  const taskDescription = document.getElementById('taskDescription');
  const taskPriority = document.getElementById('taskPriority');
  const taskDueDate = document.getElementById('taskDueDate');


  // SET MINIMUM DATE

  const localToday = new Date();

  const year = localToday.getFullYear();

  const month = String(
    localToday.getMonth() + 1
  ).padStart(2, '0');

  const day = String(
    localToday.getDate()
  ).padStart(2, '0');

  const todayString = `${year}-${month}-${day}`;

  taskDueDate.min = todayString;


  // SAVE TASKS

  function saveTasks() {

    localStorage.setItem(
      'lifeloopTasks',
      JSON.stringify(tasks)
    );

  }


  // UPDATE STATISTICS

  function updateStatistics() {

    const total = tasks.length;

    const completed = tasks.filter(
      task => task.completed
    ).length;

    const pending = total - completed;

    document.getElementById('totalTaskCount')
      .textContent = total;

    document.getElementById('completedTaskCount')
      .textContent = completed;

    document.getElementById('pendingTaskCount')
      .textContent = pending;

  }


  // DISPLAY TASKS

  function displayTasks() {

    taskList.innerHTML = '';

    updateStatistics();


    // FILTER TASKS

    const filteredTasks = tasks.filter(task => {

      if (currentFilter === 'pending') {
        return !task.completed;
      }

      if (currentFilter === 'completed') {
        return task.completed;
      }

      return true;

    });


    // EMPTY STATE

    if (filteredTasks.length === 0) {

      const emptyMessage = document.createElement('div');

      emptyMessage.className =
        'text-center text-gray-500 py-8 sm:py-10';

      emptyMessage.innerHTML = `
        <div class="text-4xl sm:text-5xl mb-3">🌱</div>
        <p class="font-semibold">No tasks found!</p>
        <p class="text-sm mt-2">
          Add a new task or select another filter.
        </p>
      `;

      taskList.appendChild(emptyMessage);

      return;

    }


    // PRIORITY COLORS

    const priorityColor = {

      High: 'bg-red-100 text-red-700',

      Medium: 'bg-orange-100 text-orange-700',

      Low: 'bg-green-100 text-green-700'

    };


    // CREATE TASK CARDS

    filteredTasks.forEach(task => {

      const taskElement = document.createElement('div');

      taskElement.className =
        'border border-gray-200 rounded-xl p-4 sm:p-5 ' +
        'flex flex-col md:flex-row md:items-center ' +
        'justify-between gap-4 hover:shadow-md transition min-w-0';


      // LEFT DETAILS

      const details = document.createElement('div');

      details.className =
        'flex items-start gap-3 sm:gap-4 flex-1 min-w-0';


      // CHECKBOX

      const checkbox = document.createElement('input');

      checkbox.type = 'checkbox';

      checkbox.checked = Boolean(task.completed);

      checkbox.dataset.action = 'toggle';

      checkbox.dataset.id = task.id;

      checkbox.className =
        'w-5 h-5 mt-1 accent-green-600 cursor-pointer shrink-0';


      // INFORMATION

      const information = document.createElement('div');

      information.className = 'flex-1 min-w-0';


      // TASK TITLE

      const name = document.createElement('h3');

      name.textContent = task.name;

      name.className = task.completed
        ? 'font-bold text-gray-400 line-through text-base sm:text-lg break-words'
        : 'font-bold text-gray-800 text-base sm:text-lg break-words';


      // DESCRIPTION

      const description = document.createElement('p');

      description.textContent =
        task.description || 'No description provided';

      description.className =
        'text-sm text-gray-500 mt-1 break-words';


      // DUE DATE

      const date = document.createElement('p');

      date.textContent =
        '📅 Due: ' + (task.dueDate || 'Not specified');

      date.className =
        'text-xs sm:text-sm text-gray-500 mt-2';


      // PRIORITY

      const priority = document.createElement('span');

      priority.textContent = task.priority || 'Medium';

      priority.className =
        'inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ' +
        (priorityColor[task.priority] || priorityColor.Medium);


      // STATUS

      const status = document.createElement('span');

      status.textContent =
        task.completed ? 'Completed ✓' : 'Pending';

      status.className =
        task.completed
          ? 'block text-xs text-green-600 mt-2 font-bold'
          : 'block text-xs text-orange-600 mt-2 font-bold';


      information.append(
        name,
        description,
        date,
        priority,
        status
      );

      details.append(checkbox, information);


      // RIGHT BUTTONS

      const buttons = document.createElement('div');

      buttons.className =
        'grid grid-cols-2 md:flex gap-2 w-full md:w-auto md:shrink-0';


      // EDIT BUTTON

      const editButton = document.createElement('button');

      editButton.textContent = '✏️ Edit';

      editButton.dataset.action = 'edit';

      editButton.dataset.id = task.id;

      editButton.className =
        'w-full bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition';


      // DELETE BUTTON

      const deleteButton = document.createElement('button');

      deleteButton.textContent = '🗑️ Delete';

      deleteButton.dataset.action = 'delete';

      deleteButton.dataset.id = task.id;

      deleteButton.className =
        'w-full bg-red-100 hover:bg-red-200 text-red-700 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition';


      buttons.append(editButton, deleteButton);

      taskElement.append(details, buttons);

      taskList.appendChild(taskElement);

    });

  }


  // ======================================
  // ADD NEW TASK
  // ======================================

  taskForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const name = taskName.value.trim();

    const description = taskDescription.value.trim();

    const priority = taskPriority.value;

    const dueDate = taskDueDate.value;


    if (!name || !dueDate) {

      alert('Please fill in the task name and due date.');

      return;

    }


    if (dueDate < todayString) {

      alert('Due date cannot be in the past.');

      return;

    }


    const newTask = {

      id: Date.now(),

      name,

      description,

      priority,

      dueDate,

      completed: false

    };


    tasks.push(newTask);

    saveTasks();


    // ACTIVITY TRACKING

    addActivity(
      `Added task: ${name}`,
      'task'
    );


    // AUTOMATIC NOTIFICATION

    addNotification(
      `New task created: ${name}`,
      'task'
    );

    displayTasks();

    taskForm.reset();

    taskPriority.value = 'Medium';

    taskDueDate.min = todayString;

  });


  // ======================================
  // FILTER BUTTONS
  // ======================================

  document.querySelectorAll('.task-filter')
    .forEach(button => {

      button.addEventListener('click', function() {

        currentFilter = this.dataset.filter;


        // UPDATE ACTIVE FILTER STYLE

        document.querySelectorAll('.task-filter')
          .forEach(filterButton => {

            filterButton.classList.remove(
              'bg-green-600',
              'text-white'
            );

            filterButton.classList.add(
              'bg-gray-100',
              'text-gray-700'
            );

          });


        this.classList.remove(
          'bg-gray-100',
          'text-gray-700'
        );

        this.classList.add(
          'bg-green-600',
          'text-white'
        );


        displayTasks();

      });

    });


  // ======================================
  // EDIT, DELETE AND COMPLETE TASKS
  // ======================================

  taskList.addEventListener('click', function(event) {

    const button = event.target.closest('button');

    if (!button) return;


    const taskId = Number(button.dataset.id);

    const taskIndex = tasks.findIndex(
      task => task.id === taskId
    );

    if (taskIndex === -1) return;


    const action = button.dataset.action;


    // DELETE TASK

    if (action === 'delete') {

      const confirmed = confirm(
        'Are you sure you want to delete this task?'
      );

      if (!confirmed) return;

      tasks.splice(taskIndex, 1);

      saveTasks();

      displayTasks();

    }


    // EDIT TASK

    if (action === 'edit') {

      const task = tasks[taskIndex];


      const updatedName = prompt(
        'Edit task name:',
        task.name
      );

      if (updatedName === null) return;

      if (!updatedName.trim()) {

        alert('Task name cannot be empty.');

        return;

      }


      const updatedDescription = prompt(
        'Edit task description:',
        task.description || ''
      );

      if (updatedDescription === null) return;


      const updatedDate = prompt(
        'Edit due date (YYYY-MM-DD):',
        task.dueDate
      );

      if (updatedDate === null) return;


      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(updatedDate) ||
        isNaN(Date.parse(updatedDate + 'T00:00:00'))
      ) {

        alert('Please enter a valid date in YYYY-MM-DD format.');

        return;

      }


      const parsedDate = new Date(
        updatedDate + 'T00:00:00'
      );

      if (
        parsedDate.getFullYear() !== Number(updatedDate.slice(0, 4)) ||
        parsedDate.getMonth() + 1 !== Number(updatedDate.slice(5, 7)) ||
        parsedDate.getDate() !== Number(updatedDate.slice(8, 10))
      ) {

        alert('Please enter a valid calendar date.');

        return;

      }


      task.name = updatedName.trim();

      task.description = updatedDescription.trim();

      task.dueDate = updatedDate;


      saveTasks();

      displayTasks();

    }

  });


  // ======================================
  // COMPLETE OR UNCOMPLETE TASK
  // ======================================

  taskList.addEventListener('change', function(event) {

    if (
      event.target.dataset.action !== 'toggle'
    ) return;


    const taskId = Number(
      event.target.dataset.id
    );

    const task = tasks.find(
      item => item.id === taskId
    );

    if (!task) return;


    task.completed = event.target.checked;

    saveTasks();


    // NOTIFY ONLY WHEN TASK IS COMPLETED

    if (task.completed) {

      addActivity(
        `Completed task: ${task.name}`,
        'task'
      );

      addNotification(
        `Task completed: ${task.name}`,
        'task'
      );

    }

    displayTasks();

  });


  // ======================================
  // INITIAL DISPLAY
  // ======================================

  displayTasks();

}
