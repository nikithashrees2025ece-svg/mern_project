
export function TaskManager() {

  return `

    <div class="max-w-6xl mx-auto">

      <div class="mb-8">

        <h1 class="text-3xl font-bold text-green-900">
          Task Management 📋
        </h1>

        <p class="text-gray-600 mt-2">
          Organize your sustainability activities.
        </p>

      </div>


      <!-- ADD TASK FORM -->

      <div class="bg-white p-6 rounded-2xl shadow-lg mb-8">

        <h2 class="text-xl font-bold text-green-800 mb-5">
          Create New Task
        </h2>

        <form id="taskForm"
              class="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label class="block font-semibold mb-2">
              Task Name
            </label>

            <input
              id="taskName"
              type="text"
              placeholder="Enter task name"
              required
              class="w-full border rounded-lg p-3"
            >
          </div>


          <div>
            <label class="block font-semibold mb-2">
              Priority
            </label>

            <select id="taskPriority"
                    class="w-full border rounded-lg p-3">

              <option value="Low">Low</option>
              <option value="Medium" selected>Medium</option>
              <option value="High">High</option>

            </select>
          </div>


          <div>
            <label class="block font-semibold mb-2">
              Due Date
            </label>

            <input
              id="taskDueDate"
              type="date"
              required
              class="w-full border rounded-lg p-3"
            >
          </div>


          <button
            type="submit"
            class="bg-gradient-to-r from-green-600
                   to-emerald-500 text-white
                   rounded-lg p-3 font-bold
                   hover:from-green-700 hover:to-emerald-600">

            + Add Task

          </button>

        </form>

      </div>


      <!-- TASK LIST -->

      <div class="bg-white p-6 rounded-2xl shadow-lg">

        <h2 class="text-xl font-bold text-green-800 mb-5">
          My Tasks
        </h2>

        <div id="taskList" class="space-y-4">

        </div>

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

  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');


  function saveTasks() {

    localStorage.setItem(
      'lifeloopTasks',
      JSON.stringify(tasks)
    );

  }


  function displayTasks() {

    taskList.innerHTML = '';

    if (tasks.length === 0) {

      taskList.innerHTML = `
        <p class="text-center text-gray-500 p-6">
          No tasks yet. Create your first task!
        </p>
      `;

      return;

    }


    tasks.forEach((task, index) => {

      const priorityColor = {

        High: 'bg-red-100 text-red-700',

        Medium: 'bg-orange-100 text-orange-700',

        Low: 'bg-green-100 text-green-700'

      };


      const taskElement = document.createElement('div');

      taskElement.className =
        'border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4';


      const details = document.createElement('div');

      details.className = 'flex items-center gap-3';


      const checkbox = document.createElement('input');

      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.dataset.index = index;
      checkbox.className = 'w-5 h-5 accent-green-600';


      const information = document.createElement('div');

      const name = document.createElement('h3');

      name.textContent = task.name;

      name.className = task.completed
        ? 'font-bold text-gray-400 line-through'
        : 'font-bold text-gray-800';


      const date = document.createElement('p');

      date.textContent = 'Due: ' + task.dueDate;

      date.className = 'text-sm text-gray-500 mt-1';


      const priority = document.createElement('span');

      priority.textContent = task.priority;

      priority.className =
        'inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ' +
        (priorityColor[task.priority] || priorityColor.Low);


      information.append(name, date, priority);

      details.append(checkbox, information);


      const deleteButton = document.createElement('button');

      deleteButton.textContent = 'Delete';

      deleteButton.dataset.delete = index;

      deleteButton.className =
        'bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg';


      taskElement.append(details, deleteButton);

      taskList.appendChild(taskElement);

    });

  }


  // ADD TASK

  taskForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const name = document.getElementById('taskName').value.trim();

    const priority = document.getElementById('taskPriority').value;

    const dueDate = document.getElementById('taskDueDate').value;


    if (!name || !dueDate) {

      alert('Please fill in all fields.');

      return;

    }


    tasks.push({

      id: Date.now(),

      name,

      priority,

      dueDate,

      completed: false

    });


    saveTasks();

    displayTasks();

    taskForm.reset();

    document.getElementById('taskPriority').value = 'Medium';

  });


  // COMPLETE OR DELETE TASK

  taskList.addEventListener('click', function(event) {

    const deleteIndex = event.target.dataset.delete;

    if (deleteIndex !== undefined) {

      tasks.splice(Number(deleteIndex), 1);

      saveTasks();

      displayTasks();

    }

  });


  taskList.addEventListener('change', function(event) {

    if (event.target.type === 'checkbox') {

      const index = Number(event.target.dataset.index);

      tasks[index].completed = event.target.checked;

      saveTasks();

      displayTasks();

    }

  });


  displayTasks();

}