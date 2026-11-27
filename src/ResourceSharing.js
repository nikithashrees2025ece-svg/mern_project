
import './style.css';
import { addActivity } from './Activity.js';
import { addNotification } from './Notifications.js';

// ======================================
// LIFELOOP RESOURCE SHARING
// ======================================

export function ResourceSharing() {

  return `

    <div class="max-w-7xl mx-auto w-full min-w-0">

      <!-- PAGE HEADING -->

      <div class="mb-6 md:mb-8">

        <h1 class="text-2xl sm:text-3xl font-extrabold text-green-900">
          Resource Sharing ♻️
        </h1>

        <p class="text-gray-600 mt-2 text-sm sm:text-base">
          Share useful resources and build a sustainable community.
        </p>

      </div>


      <!-- STATISTICS -->

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mb-6 md:mb-8">

        <div class="bg-white rounded-xl shadow p-4 sm:p-5 border-l-4 border-blue-500">
          <p class="text-gray-500 font-medium text-sm sm:text-base">
            Total Resources
          </p>
          <h2 id="totalResources" class="text-2xl sm:text-3xl font-bold text-blue-700 mt-2">0</h2>
        </div>

        <div class="bg-white rounded-xl shadow p-4 sm:p-5 border-l-4 border-green-500">
          <p class="text-gray-500 font-medium text-sm sm:text-base">
            Available
          </p>
          <h2 id="availableResources" class="text-2xl sm:text-3xl font-bold text-green-700 mt-2">0</h2>
        </div>

        <div class="bg-white rounded-xl shadow p-4 sm:p-5 border-l-4 border-orange-500">
          <p class="text-gray-500 font-medium text-sm sm:text-base">
            Claimed
          </p>
          <h2 id="claimedResources" class="text-2xl sm:text-3xl font-bold text-orange-600 mt-2">0</h2>
        </div>

      </div>


      <!-- ADD RESOURCE FORM -->

      <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 md:mb-8">

        <h2 class="text-lg sm:text-xl font-bold text-green-800 mb-5">
          ➕ Share a Resource
        </h2>

        <form id="resourceForm"
              class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

          <div class="min-w-0">

            <label for="resourceName" class="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
              Resource Name
            </label>

            <input
              type="text"
              id="resourceName"
              placeholder="Example: Books, Clothes, Furniture"
              maxlength="100"
              required
              class="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-green-500 outline-none"
            >

          </div>


          <div class="min-w-0">

            <label for="resourceCategory" class="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
              Category
            </label>

            <select
              id="resourceCategory"
              required
              class="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-green-500 outline-none">

              <option value="Books">📚 Books</option>
              <option value="Clothes">👕 Clothes</option>
              <option value="Food">🥗 Food</option>
              <option value="Electronics">💻 Electronics</option>
              <option value="Furniture">🪑 Furniture</option>
              <option value="Household">🏠 Household Items</option>
              <option value="Other">📦 Other</option>

            </select>

          </div>


          <div class="md:col-span-2 min-w-0">

            <label for="resourceDescription" class="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
              Description
            </label>

            <textarea
              id="resourceDescription"
              rows="3"
              maxlength="300"
              placeholder="Describe the resource you want to share..."
              class="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-green-500 outline-none resize-y"></textarea>

          </div>


          <div class="min-w-0">

            <label for="resourceQuantity" class="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
              Quantity
            </label>

            <input
              type="number"
              id="resourceQuantity"
              min="1"
              max="100000"
              value="1"
              required
              class="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-green-500 outline-none"
            >

          </div>


          <div class="min-w-0">

            <label for="resourceContact" class="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
              Contact Number
            </label>

            <input
              type="tel"
              id="resourceContact"
              placeholder="10-digit mobile number"
              maxlength="10"
              minlength="10"
              pattern="[0-9]{10}"
              inputmode="numeric"
              required
              class="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-green-500 outline-none"
            >

          </div>


          <div class="md:col-span-2">

            <button
              type="submit"
              class="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition text-sm sm:text-base">
              + Share Resource
            </button>

          </div>

        </form>

      </div>


      <!-- RESOURCE LIST -->

      <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6">

        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

          <h2 class="text-lg sm:text-xl font-bold text-green-800">
            Community Resources 🤝
          </h2>

          <input
            type="search"
            id="resourceSearch"
            placeholder="Search resources..."
            class="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500 w-full lg:max-w-xs text-sm sm:text-base"
          >

        </div>


        <!-- FILTERS -->

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

          <div>

            <label for="categoryFilter" class="block text-sm font-semibold text-gray-600 mb-2">
              Filter by Category
            </label>

            <select id="categoryFilter"
                    class="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base">

              <option value="all">All Categories</option>
              <option value="Books">Books</option>
              <option value="Clothes">Clothes</option>
              <option value="Food">Food</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Household">Household Items</option>
              <option value="Other">Other</option>

            </select>

          </div>


          <div>

            <label for="statusFilter" class="block text-sm font-semibold text-gray-600 mb-2">
              Filter by Status
            </label>

            <select id="statusFilter"
                    class="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base">

              <option value="all">All Status</option>
              <option value="Available">Available</option>
              <option value="Claimed">Claimed</option>

            </select>

          </div>

        </div>


        <!-- RESOURCE CARDS -->

        <div id="resourceList"
             class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 min-w-0">
        </div>

      </div>

    </div>

  `;

}


// ======================================
// INITIALIZE RESOURCE SHARING
// ======================================

export function initializeResourceSharing() {

  let resources = JSON.parse(
    localStorage.getItem('lifeloopResources') || '[]'
  );

  const resourceForm = document.getElementById('resourceForm');
  const resourceName = document.getElementById('resourceName');
  const resourceCategory = document.getElementById('resourceCategory');
  const resourceDescription = document.getElementById('resourceDescription');
  const resourceQuantity = document.getElementById('resourceQuantity');
  const resourceContact = document.getElementById('resourceContact');
  const resourceList = document.getElementById('resourceList');
  const resourceSearch = document.getElementById('resourceSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  const statusFilter = document.getElementById('statusFilter');


  // SAVE RESOURCES

  function saveResources() {

    localStorage.setItem(
      'lifeloopResources',
      JSON.stringify(resources)
    );

  }


  // UPDATE STATISTICS

  function updateStatistics() {

    const total = resources.length;

    const available = resources.filter(
      item => item.status === 'Available'
    ).length;

    const claimed = resources.filter(
      item => item.status === 'Claimed'
    ).length;

    document.getElementById('totalResources').textContent = total;
    document.getElementById('availableResources').textContent = available;
    document.getElementById('claimedResources').textContent = claimed;

  }


  // DISPLAY RESOURCES

  function displayResources() {

    resourceList.innerHTML = '';

    updateStatistics();

    const searchValue = resourceSearch.value.trim().toLowerCase();
    const categoryValue = categoryFilter.value;
    const statusValue = statusFilter.value;

    const filteredResources = resources.filter(item => {

      const matchesSearch =
        (item.name || '').toLowerCase().includes(searchValue) ||
        (item.description || '').toLowerCase().includes(searchValue) ||
        (item.category || '').toLowerCase().includes(searchValue);

      const matchesCategory =
        categoryValue === 'all' || item.category === categoryValue;

      const matchesStatus =
        statusValue === 'all' || item.status === statusValue;

      return matchesSearch && matchesCategory && matchesStatus;

    });


    // EMPTY MESSAGE

    if (filteredResources.length === 0) {

      const empty = document.createElement('div');

      empty.className = 'col-span-full text-center py-10 sm:py-12 text-gray-500';

      empty.innerHTML = `
        <div class="text-4xl sm:text-5xl mb-3">♻️</div>
        <p class="font-bold">No resources found!</p>
        <p class="text-sm mt-2">
          Share a resource with your community.
        </p>
      `;

      resourceList.appendChild(empty);

      return;

    }


    // CATEGORY ICONS

    const categoryIcons = {
      Books: '📚',
      Clothes: '👕',
      Food: '🥗',
      Electronics: '💻',
      Furniture: '🪑',
      Household: '🏠',
      Other: '📦'
    };


    // CREATE RESOURCE CARDS

    filteredResources.forEach(item => {

      const card = document.createElement('div');

      card.className =
        'bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition min-w-0 flex flex-col';


      // RESOURCE ICON

      const icon = document.createElement('div');

      icon.textContent = categoryIcons[item.category] || '📦';

      icon.className = 'text-3xl sm:text-4xl mb-3';


      // RESOURCE NAME

      const name = document.createElement('h3');

      name.textContent = item.name;

      name.className = 'text-lg sm:text-xl font-bold text-green-900 break-words';


      // CATEGORY

      const category = document.createElement('p');

      category.textContent = 'Category: ' + item.category;

      category.className = 'text-sm text-gray-500 mt-2';


      // DESCRIPTION

      const description = document.createElement('p');

      description.textContent = item.description || 'No description provided';

      description.className = 'text-sm text-gray-600 mt-3 break-words';


      // QUANTITY

      const quantity = document.createElement('p');

      quantity.textContent = 'Quantity: ' + item.quantity;

      quantity.className = 'text-sm text-gray-600 mt-3';


      // CONTACT

      const contact = document.createElement('p');

      contact.textContent = '📞 Contact: ' + item.contact;

      contact.className = 'text-sm text-gray-600 mt-2 break-all';


      // STATUS

      const status = document.createElement('span');

      status.textContent = item.status;

      status.className =
        item.status === 'Available'
          ? 'inline-block self-start mt-3 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700'
          : 'inline-block self-start mt-3 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700';


      // BUTTON CONTAINER

      const buttons = document.createElement('div');

      buttons.className =
        'grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5';


      // STATUS BUTTON

      const statusButton = document.createElement('button');

      statusButton.textContent =
        item.status === 'Available' ? 'Mark as Claimed' : 'Mark Available';

      statusButton.dataset.action = 'toggle';

      statusButton.dataset.id = item.id;

      statusButton.className =
        'sm:col-span-2 w-full bg-green-100 hover:bg-green-200 text-green-800 rounded-lg px-3 py-2.5 text-sm font-semibold transition';


      // EDIT BUTTON

      const editButton = document.createElement('button');

      editButton.textContent = '✏️ Edit';

      editButton.dataset.action = 'edit';

      editButton.dataset.id = item.id;

      editButton.className =
        'w-full bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg px-3 py-2.5 text-sm font-semibold transition';


      // DELETE BUTTON

      const deleteButton = document.createElement('button');

      deleteButton.textContent = '🗑️ Delete';

      deleteButton.dataset.action = 'delete';

      deleteButton.dataset.id = item.id;

      deleteButton.className =
        'w-full bg-red-100 hover:bg-red-200 text-red-700 rounded-lg px-3 py-2.5 text-sm font-semibold transition';


      buttons.append(statusButton, editButton, deleteButton);

      card.append(
        icon,
        name,
        category,
        description,
        quantity,
        contact,
        status,
        buttons
      );

      resourceList.appendChild(card);

    });

  }


  // ======================================
  // ADD RESOURCE + NOTIFICATION
  // ======================================

  resourceForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const name = resourceName.value.trim();
    const category = resourceCategory.value;
    const description = resourceDescription.value.trim();
    const quantity = Number(resourceQuantity.value);
    const contact = resourceContact.value.trim();

    if (!name) {
      alert('Please enter a resource name.');
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100000) {
      alert('Please enter a valid quantity.');
      return;
    }

    if (!/^[0-9]{10}$/.test(contact)) {
      alert('Enter a valid 10-digit contact number.');
      return;
    }

    const newResource = {
      id: Date.now(),
      name,
      category,
      description,
      quantity,
      contact,
      status: 'Available'
    };

    resources.push(newResource);

    saveResources();


    // RECORD ACTIVITY

    addActivity(
      `Shared resource: ${name}`,
      'resource'
    );


    // CREATE NOTIFICATION

    addNotification(
      `New resource shared: ${name}`,
      'resource'
    );

    displayResources();

    resourceForm.reset();

    resourceQuantity.value = 1;

  });


  // ======================================
  // SEARCH AND FILTERS
  // ======================================

  resourceSearch.addEventListener('input', displayResources);

  categoryFilter.addEventListener('change', displayResources);

  statusFilter.addEventListener('change', displayResources);


  // ======================================
  // EDIT, DELETE AND STATUS UPDATE
  // ======================================

  resourceList.addEventListener('click', function(event) {

    const button = event.target.closest('button');

    if (!button) return;

    const resourceId = button.dataset.id;

    const index = resources.findIndex(
      item => String(item.id) === String(resourceId)
    );

    if (index === -1) return;

    const item = resources[index];

    const action = button.dataset.action;


    // MARK AS CLAIMED / AVAILABLE

    if (action === 'toggle') {

      item.status =
        item.status === 'Available' ? 'Claimed' : 'Available';

      saveResources();

      if (item.status === 'Claimed') {

        addActivity(
          `Resource claimed: ${item.name}`,
          'resource'
        );

        addNotification(
          `Resource claimed: ${item.name}`,
          'resource'
        );

      }

      displayResources();

    }


    // DELETE RESOURCE

    else if (action === 'delete') {

      const confirmed = confirm(
        'Are you sure you want to delete this resource?'
      );

      if (!confirmed) return;

      resources.splice(index, 1);

      saveResources();

      displayResources();

    }


    // EDIT RESOURCE

    else if (action === 'edit') {

      const updatedName = prompt(
        'Enter resource name:',
        item.name
      );

      if (updatedName === null) return;

      if (!updatedName.trim()) {
        alert('Resource name cannot be empty.');
        return;
      }

      const updatedDescription = prompt(
        'Enter description:',
        item.description || ''
      );

      if (updatedDescription === null) return;

      const updatedQuantity = prompt(
        'Enter quantity:',
        item.quantity
      );

      if (updatedQuantity === null) return;

      const quantity = Number(updatedQuantity);

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100000) {
        alert('Enter a valid quantity.');
        return;
      }

      const updatedContact = prompt(
        'Enter contact number:',
        item.contact
      );

      if (updatedContact === null) return;

      if (!/^[0-9]{10}$/.test(updatedContact.trim())) {
        alert('Enter a valid 10-digit contact number.');
        return;
      }

      item.name = updatedName.trim();

      item.description = updatedDescription.trim();

      item.quantity = quantity;

      item.contact = updatedContact.trim();

      saveResources();

      displayResources();

    }

  });


  // INITIAL DISPLAY

  displayResources();

}
