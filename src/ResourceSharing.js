
export function ResourceSharing() {

  return `

    <div class="max-w-6xl mx-auto">

      <!-- HEADING -->

      <div class="text-center mb-10">

        <h1 class="text-4xl font-bold text-green-800">
          Resource Sharing ♻️
        </h1>

        <p class="text-gray-600 mt-3">
          Share useful resources and help your community.
        </p>

      </div>

      <!-- SHARING FORM -->

      <div class="bg-white p-8 rounded-2xl shadow-lg mb-10">

        <h2 class="text-2xl font-bold text-green-800 mb-6">
          Share a Resource
        </h2>

        <form id="sharingForm"
              class="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label class="block font-semibold mb-2">
              Resource Name
            </label>

            <input type="text" id="resourceName"
              placeholder="Enter resource name"
              required
              class="w-full border rounded-lg p-3">
          </div>

          <div>
            <label class="block font-semibold mb-2">
              Resource Category
            </label>

            <select id="resourceCategory" required
              class="w-full border rounded-lg p-3">

              <option value="">Select Category</option>
              <option>Food</option>
              <option>Clothing</option>
              <option>Books</option>
              <option>Household Items</option>
              <option>Other</option>

            </select>
          </div>

          <div>
            <label class="block font-semibold mb-2">
              Quantity
            </label>

            <input type="number" id="resourceQuantity"
              min="1"
              placeholder="Enter quantity"
              required
              class="w-full border rounded-lg p-3">
          </div>

          <div>
            <label class="block font-semibold mb-2">
              Location
            </label>

            <input type="text" id="resourceLocation"
              placeholder="Enter your location"
              required
              class="w-full border rounded-lg p-3">
          </div>

          <div class="md:col-span-2">

            <label class="block font-semibold mb-2">
              Description
            </label>

            <textarea id="resourceDescription"
              rows="3"
              placeholder="Describe the resource..."
              required
              class="w-full border rounded-lg p-3"></textarea>

          </div>

          <button type="submit"
            class="md:col-span-2 bg-gradient-to-r
                   from-green-600 to-emerald-500
                   text-white p-3 rounded-lg
                   font-bold hover:from-green-700
                   hover:to-emerald-600">

            + Share Resource

          </button>

        </form>

      </div>

      <!-- AVAILABLE RESOURCES -->

      <div>

        <h2 class="text-2xl font-bold text-green-800 mb-6">
          Available Resources
        </h2>

        <div id="resourceList"
             class="grid grid-cols-1 md:grid-cols-2
                    xl:grid-cols-3 gap-6">

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

  const sharingForm = document.getElementById('sharingForm');
  const resourceList = document.getElementById('resourceList');


  // SAVE RESOURCES

  function saveResources() {

    localStorage.setItem(
      'lifeloopResources',
      JSON.stringify(resources)
    );

  }


  // DISPLAY RESOURCES

  function displayResources() {

    resourceList.innerHTML = '';

    if (resources.length === 0) {

      resourceList.innerHTML = `
        <div class="bg-white p-6 rounded-xl shadow
                    text-gray-500 md:col-span-2 xl:col-span-3
                    text-center">
          No resources shared yet.
        </div>
      `;

      return;

    }

    resources.forEach((resource, index) => {

      const card = document.createElement('div');

      card.className =
        'bg-white p-6 rounded-2xl shadow-lg border border-green-100';

      const heading = document.createElement('h3');
      heading.className = 'text-xl font-bold text-green-800';
      heading.textContent = resource.name;

      const category = document.createElement('p');
      category.className = 'text-purple-600 font-semibold mt-2';
      category.textContent = resource.category;

      const quantity = document.createElement('p');
      quantity.className = 'text-gray-600 mt-3';
      quantity.textContent = 'Quantity: ' + resource.quantity;

      const location = document.createElement('p');
      location.className = 'text-gray-600 mt-2';
      location.textContent = '📍 ' + resource.location;

      const description = document.createElement('p');
      description.className = 'text-gray-500 mt-3';
      description.textContent = resource.description;

      const status = document.createElement('span');
      status.className =
        'inline-block mt-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm';
      status.textContent = 'Available';

      const deleteButton = document.createElement('button');
      deleteButton.className =
        'block mt-5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg';

      deleteButton.textContent = 'Delete';
      deleteButton.dataset.index = index;

      card.append(
        heading,
        category,
        quantity,
        location,
        description,
        status,
        deleteButton
      );

      resourceList.appendChild(card);

    });

  }


  // ADD RESOURCE

  sharingForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const name =
      document.getElementById('resourceName').value.trim();

    const category =
      document.getElementById('resourceCategory').value;

    const quantity =
      document.getElementById('resourceQuantity').value;

    const location =
      document.getElementById('resourceLocation').value.trim();

    const description =
      document.getElementById('resourceDescription').value.trim();

    if (!name || !category || !quantity || !location || !description) {

      alert('Please fill in all fields.');
      return;

    }

    resources.push({
      name,
      category,
      quantity,
      location,
      description
    });

    saveResources();
    displayResources();

    sharingForm.reset();

    alert('Resource shared successfully!');

  });


  // DELETE RESOURCE

  resourceList.addEventListener('click', function(event) {

    if (event.target.dataset.index !== undefined) {

      const index = Number(event.target.dataset.index);

      resources.splice(index, 1);

      saveResources();
      displayResources();

    }

  });


  displayResources();

}