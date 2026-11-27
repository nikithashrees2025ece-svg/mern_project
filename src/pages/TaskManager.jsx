
import { useEffect, useMemo, useState } from 'react';
import { addActivity } from '../Activity.js';
import { addNotification } from '../Notifications.js';

// Get today's local date
function getTodayString() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Load saved tasks safely
function getSavedTasks() {
  try {
    return JSON.parse(localStorage.getItem('lifeloopTasks') || '[]');
  } catch {
    return [];
  }
}

function TaskManager() {
  const todayString = getTodayString();

  const [tasks, setTasks] = useState(getSavedTasks);

  const [form, setForm] = useState({
    name: '',
    priority: 'Medium',
    description: '',
    dueDate: ''
  });

  const [currentFilter, setCurrentFilter] = useState('all');

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem('lifeloopTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const completed = tasks.filter(
      (task) => task.completed
    ).length;

    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed
    };
  }, [tasks]);

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (currentFilter === 'pending') {
        return !task.completed;
      }

      if (currentFilter === 'completed') {
        return task.completed;
      }

      return true;
    });
  }, [tasks, currentFilter]);

  // Handle form changes
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value
    }));
  }

  // Add new task
  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const description = form.description.trim();
    const dueDate = form.dueDate;

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
      priority: form.priority,
      dueDate,
      completed: false
    };

    setTasks((previousTasks) => [
      ...previousTasks,
      newTask
    ]);

    addActivity(`Added task: ${name}`, 'task');
    addNotification(`New task created: ${name}`, 'task');

    setForm({
      name: '',
      priority: 'Medium',
      description: '',
      dueDate: ''
    });
  }

  // Complete or uncomplete task
  function handleToggle(task) {
    const updatedCompleted = !task.completed;

    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        String(item.id) === String(task.id)
          ? { ...item, completed: updatedCompleted }
          : item
      )
    );

    if (updatedCompleted) {
      addActivity(`Completed task: ${task.name}`, 'task');
      addNotification(`Task completed: ${task.name}`, 'task');
    }
  }

  // Delete task
  function handleDelete(task) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    );

    if (!confirmed) return;

    setTasks((previousTasks) =>
      previousTasks.filter(
        (item) => String(item.id) !== String(task.id)
      )
    );

    addActivity(`Deleted task: ${task.name}`, 'task');
  }

  // Edit task
  function handleEdit(task) {
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

    if (!/^\d{4}-\d{2}-\d{2}$/.test(updatedDate)) {
      alert('Please enter a valid date in YYYY-MM-DD format.');
      return;
    }

    const parsedDate = new Date(`${updatedDate}T00:00:00`);

    if (
      isNaN(parsedDate.getTime()) ||
      parsedDate.getFullYear() !== Number(updatedDate.slice(0, 4)) ||
      parsedDate.getMonth() + 1 !== Number(updatedDate.slice(5, 7)) ||
      parsedDate.getDate() !== Number(updatedDate.slice(8, 10))
    ) {
      alert('Please enter a valid calendar date.');
      return;
    }

    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        String(item.id) === String(task.id)
          ? {
              ...item,
              name: updatedName.trim(),
              description: updatedDescription.trim(),
              dueDate: updatedDate
            }
          : item
      )
    );

    addActivity(`Updated task: ${updatedName.trim()}`, 'task');
  }

  const priorityColors = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-orange-100 text-orange-700',
    Low: 'bg-green-100 text-green-700'
  };

  return (
    <div className="max-w-7xl mx-auto w-full min-w-0">

      {/* PAGE HEADING */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-green-900">
          Task Management 📋
        </h1>

        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Organize your activities and achieve your goals.
        </p>
      </div>

      {/* TASK STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mb-6 md:mb-8">

        <div className="bg-white rounded-xl shadow p-4 sm:p-5 border-l-4 border-blue-500">
          <p className="text-gray-500 font-medium">Total Tasks</p>
          <h2 className="text-3xl font-bold text-blue-700 mt-2">
            {statistics.total}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-5 border-l-4 border-green-500">
          <p className="text-gray-500 font-medium">Completed</p>
          <h2 className="text-3xl font-bold text-green-700 mt-2">
            {statistics.completed}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-5 border-l-4 border-orange-500">
          <p className="text-gray-500 font-medium">Pending</p>
          <h2 className="text-3xl font-bold text-orange-600 mt-2">
            {statistics.pending}
          </h2>
        </div>

      </div>

      {/* ADD TASK FORM */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg mb-6 md:mb-8">

        <h2 className="text-xl font-bold text-green-800 mb-5">
          ➕ Create New Task
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
        >

          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Task Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              maxLength="100"
              placeholder="Enter task name"
              required
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Priority
            </label>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟠 Medium</option>
              <option value="High">🔴 High</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-2 text-gray-700">
              Task Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              maxLength="300"
              placeholder="Describe your task..."
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500 resize-y"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              min={todayString}
              required
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg p-3 font-bold hover:from-green-700 hover:to-emerald-600 transition"
            >
              + Add Task
            </button>
          </div>

        </form>
      </div>

      {/* MY TASKS */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">

          <h2 className="text-xl font-bold text-green-800">
            My Tasks
          </h2>

          {/* TASK FILTERS */}
          <div className="grid grid-cols-3 sm:flex gap-2 w-full lg:w-auto">

            {[
              { value: 'all', label: 'All' },
              { value: 'pending', label: 'Pending' },
              { value: 'completed', label: 'Completed' }
            ].map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setCurrentFilter(filter.value)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition ${
                  currentFilter === filter.value
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}

          </div>

        </div>

        {/* TASK LIST */}
        <div className="space-y-3 sm:space-y-4 min-w-0">

          {filteredTasks.length === 0 ? (
            <div className="text-center text-gray-500 py-8 sm:py-10">
              <div className="text-5xl mb-3">🌱</div>
              <p className="font-semibold">No tasks found!</p>
              <p className="text-sm mt-2">
                Add a new task or select another filter.
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition min-w-0"
              >

                {/* TASK DETAILS */}
                <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">

                  <input
                    type="checkbox"
                    checked={Boolean(task.completed)}
                    onChange={() => handleToggle(task)}
                    className="w-5 h-5 mt-1 accent-green-600 cursor-pointer shrink-0"
                    aria-label={`Mark ${task.name} as completed`}
                  />

                  <div className="flex-1 min-w-0">

                    <h3 className={`font-bold text-base sm:text-lg break-words ${
                      task.completed
                        ? 'text-gray-400 line-through'
                        : 'text-gray-800'
                    }`}>
                      {task.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 break-words">
                      {task.description || 'No description provided'}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      📅 Due: {task.dueDate || 'Not specified'}
                    </p>

                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                      priorityColors[task.priority] || priorityColors.Medium
                    }`}>
                      {task.priority || 'Medium'}
                    </span>

                    <span className={`block text-xs mt-2 font-bold ${
                      task.completed
                        ? 'text-green-600'
                        : 'text-orange-600'
                    }`}>
                      {task.completed ? 'Completed ✓' : 'Pending'}
                    </span>

                  </div>
                </div>

                {/* TASK ACTIONS */}
                <div className="grid grid-cols-2 md:flex gap-2 w-full md:w-auto md:shrink-0">

                  <button
                    type="button"
                    onClick={() => handleEdit(task)}
                    className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(task)}
                    className="w-full bg-red-100 hover:bg-red-200 text-red-700 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition"
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>
      </div>

    </div>
  );
}

export default TaskManager;
