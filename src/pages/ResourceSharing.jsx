
import { useEffect, useMemo, useState } from 'react';
import { addActivity } from '../Activity.js';
import { addNotification } from '../Notifications.js';

// Read saved resources safely
function getSavedResources() {
  try {
    return JSON.parse(localStorage.getItem('lifeloopResources') || '[]');
  } catch {
    return [];
  }
}

function ResourceSharing() {
  const [resources, setResources] = useState(getSavedResources);

  const [form, setForm] = useState({
    name: '',
    category: 'Books',
    description: '',
    quantity: '1',
    contact: ''
  });

  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Save resources whenever they change
  useEffect(() => {
    localStorage.setItem(
      'lifeloopResources',
      JSON.stringify(resources)
    );
  }, [resources]);

  // Calculate resource statistics
  const statistics = useMemo(() => {
    return {
      total: resources.length,
      available: resources.filter(
        (item) => item.status === 'Available'
      ).length,
      claimed: resources.filter(
        (item) => item.status === 'Claimed'
      ).length
    };
  }, [resources]);

  // Search and filter resources
  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const search = searchText.toLowerCase();

      const matchesSearch =
        (item.name || '').toLowerCase().includes(search) ||
        (item.description || '').toLowerCase().includes(search) ||
        (item.category || '').toLowerCase().includes(search);

      const matchesCategory =
        categoryFilter === 'all' ||
        item.category === categoryFilter;

      const matchesStatus =
        statusFilter === 'all' ||
        item.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [resources, searchText, categoryFilter, statusFilter]);

  const categoryIcons = {
    Books: '📚',
    Clothes: '👕',
    Food: '🥗',
    Electronics: '💻',
    Furniture: '🪑',
    Household: '🏠',
    Other: '📦'
  };

  // Handle form changes
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value
    }));
  }

  // Add a resource
  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const description = form.description.trim();
    const quantity = Number(form.quantity);
    const contact = form.contact.trim();

    if (!name) {
      alert('Please enter a resource name.');
      return;
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 100000
    ) {
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
      category: form.category,
      description,
      quantity,
      contact,
      status: 'Available'
    };

    setResources((previousResources) => [
      ...previousResources,
      newResource
    ]);

    addActivity(`Shared resource: ${name}`, 'resource');

    addNotification(`New resource shared: ${name}`, 'resource');

    setForm({
      name: '',
      category: 'Books',
      description: '',
      quantity: '1',
      contact: ''
    });
  }

  // Mark resource as claimed or available
  function handleToggle(resource) {
    const updatedStatus =
      resource.status === 'Available' ? 'Claimed' : 'Available';

    setResources((previousResources) =>
      previousResources.map((item) =>
        String(item.id) === String(resource.id)
          ? { ...item, status: updatedStatus }
          : item
      )
    );

    if (updatedStatus === 'Claimed') {
      addActivity(`Resource claimed: ${resource.name}`, 'resource');

      addNotification(`Resource claimed: ${resource.name}`, 'resource');
    }
  }

  // Delete resource
  function handleDelete(resource) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this resource?'
    );

    if (!confirmed) return;

    setResources((previousResources) =>
      previousResources.filter(
        (item) => String(item.id) !== String(resource.id)
      )
    );

    addActivity(`Deleted resource: ${resource.name}`, 'resource');
  }

  // Edit resource
  function handleEdit(resource) {
    const updatedName = prompt(
      'Enter resource name:',
      resource.name
    );

    if (updatedName === null) return;

    if (!updatedName.trim()) {
      alert('Resource name cannot be empty.');
      return;
    }

    const updatedDescription = prompt(
      'Enter description:',
      resource.description || ''
    );

    if (updatedDescription === null) return;

    const updatedQuantity = prompt(
      'Enter quantity:',
      resource.quantity
    );

    if (updatedQuantity === null) return;

    const quantity = Number(updatedQuantity);

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 100000
    ) {
      alert('Enter a valid quantity.');
      return;
    }

    const updatedContact = prompt(
      'Enter contact number:',
      resource.contact
    );

    if (updatedContact === null) return;

    if (!/^[0-9]{10}$/.test(updatedContact.trim())) {
      alert('Enter a valid 10-digit contact number.');
      return;
    }

    setResources((previousResources) =>
      previousResources.map((item) =>
        String(item.id) === String(resource.id)
          ? {
              ...item,
              name: updatedName.trim(),
              description: updatedDescription.trim(),
              quantity,
              contact: updatedContact.trim()
            }
          : item
      )
    );

    addActivity(`Updated resource: ${updatedName.trim()}`, 'resource');
  }

  return (
    <div className="max-w-7xl mx-auto w-full min-w-0">

      {/* PAGE HEADING */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-green-900">
          Resource Sharing ♻️
        </h1>

        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Share useful resources and build a sustainable community.
        </p>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mb-6 md:mb-8">

        <div className="bg-white rounded-xl shadow p-4 sm:p-5 border-l-4 border-blue-500">
          <p className="text-gray-500 font-medium">Total Resources</p>
          <h2 className="text-3xl font-bold text-blue-700 mt-2">
            {statistics.total}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-5 border-l-4 border-green-500">
          <p className="text-gray-500 font-medium">Available</p>
          <h2 className="text-3xl font-bold text-green-700 mt-2">
            {statistics.available}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-5 border-l-4 border-orange-500">
          <p className="text-gray-500 font-medium">Claimed</p>
          <h2 className="text-3xl font-bold text-orange-600 mt-2">
            {statistics.claimed}
          </h2>
        </div>

      </div>

      {/* ADD RESOURCE FORM */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 md:mb-8">

        <h2 className="text-xl font-bold text-green-800 mb-5">
          ➕ Share a Resource
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
        >

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Resource Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Example: Books, Clothes, Furniture"
              maxLength="100"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="Books">📚 Books</option>
              <option value="Clothes">👕 Clothes</option>
              <option value="Food">🥗 Food</option>
              <option value="Electronics">💻 Electronics</option>
              <option value="Furniture">🪑 Furniture</option>
              <option value="Household">🏠 Household Items</option>
              <option value="Other">📦 Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold text-gray-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              maxLength="300"
              placeholder="Describe the resource you want to share..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none resize-y"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Quantity
            </label>

            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              min="1"
              max="100000"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Contact Number
            </label>

            <input
              type="tel"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              maxLength="10"
              minLength="10"
              pattern="[0-9]{10}"
              inputMode="numeric"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition"
            >
              + Share Resource
            </button>
          </div>

        </form>
      </div>

      {/* COMMUNITY RESOURCE LIST */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

          <h2 className="text-xl font-bold text-green-800">
            Community Resources 🤝
          </h2>

          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value.trimStart())}
            placeholder="Search resources..."
            className="border border-gray-300 rounded-lg p-3 w-full lg:max-w-xs focus:ring-2 focus:ring-green-500 outline-none"
          />

        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Filter by Category
            </label>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            >
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
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Filter by Status
            </label>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="all">All Status</option>
              <option value="Available">Available</option>
              <option value="Claimed">Claimed</option>
            </select>
          </div>

        </div>

        {/* RESOURCE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 min-w-0">

          {filteredResources.length === 0 ? (
            <div className="col-span-full text-center py-10 sm:py-12 text-gray-500">
              <div className="text-5xl mb-3">♻️</div>
              <p className="font-bold">No resources found!</p>
              <p className="text-sm mt-2">
                Share a resource with your community.
              </p>
            </div>
          ) : (
            filteredResources.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition min-w-0 flex flex-col"
              >

                <div className="text-4xl mb-3">
                  {categoryIcons[item.category] || '📦'}
                </div>

                <h3 className="text-xl font-bold text-green-900 break-words">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Category: {item.category}
                </p>

                <p className="text-sm text-gray-600 mt-3 break-words">
                  {item.description || 'No description provided'}
                </p>

                <p className="text-sm text-gray-600 mt-3">
                  Quantity: {item.quantity}
                </p>

                <p className="text-sm text-gray-600 mt-2 break-all">
                  📞 Contact: {item.contact}
                </p>

                <span
                  className={`inline-block self-start mt-3 px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {item.status}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5">

                  <button
                    type="button"
                    onClick={() => handleToggle(item)}
                    className="sm:col-span-2 w-full bg-green-100 hover:bg-green-200 text-green-800 rounded-lg px-3 py-2.5 text-sm font-semibold transition"
                  >
                    {item.status === 'Available'
                      ? 'Mark as Claimed'
                      : 'Mark Available'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg px-3 py-2.5 text-sm font-semibold transition"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    className="w-full bg-red-100 hover:bg-red-200 text-red-700 rounded-lg px-3 py-2.5 text-sm font-semibold transition"
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

export default ResourceSharing;
