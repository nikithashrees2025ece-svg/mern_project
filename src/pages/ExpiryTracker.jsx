
import { useEffect, useMemo, useState } from 'react';
import { addActivity } from '../Activity.js';
import { addNotification } from '../Notifications.js';

// Get today's date in YYYY-MM-DD format
function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Read saved products safely
function getSavedProducts() {
  try {
    return JSON.parse(localStorage.getItem('lifeloopProducts') || '[]');
  } catch {
    return [];
  }
}

// Calculate product expiry status
function getProductStatus(product) {
  const today = new Date(`${getTodayString()}T00:00:00`);
  const expiry = new Date(`${product.expiryDate}T00:00:00`);

  const difference = Math.round(
    (expiry - today) / (1000 * 60 * 60 * 24)
  );

  if (difference < 0) {
    return {
      type: 'expired',
      label: 'Expired',
      days: Math.abs(difference)
    };
  }

  if (difference <= 7) {
    return {
      type: 'soon',
      label: 'Expiring Soon',
      days: difference
    };
  }

  return {
    type: 'safe',
    label: 'Safe',
    days: difference
  };
}

// Format date as DD/MM/YYYY
function formatDate(date) {
  if (!date) return 'Not specified';

  const parts = date.split('-');

  if (parts.length !== 3) return date;

  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function ExpiryTracker() {
  const todayString = getTodayString();

  const [products, setProducts] = useState(getSavedProducts);

  const [form, setForm] = useState({
    name: '',
    category: 'Food',
    manufacturingDate: '',
    expiryDate: '',
    quantity: '1'
  });

  const [searchText, setSearchText] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');

  // Save products whenever they change
  useEffect(() => {
    localStorage.setItem(
      'lifeloopProducts',
      JSON.stringify(products)
    );
  }, [products]);

  // Calculate statistics
  const statistics = useMemo(() => {
    let soon = 0;
    let expired = 0;

    products.forEach((product) => {
      const status = getProductStatus(product);

      if (status.type === 'soon') soon++;
      if (status.type === 'expired') expired++;
    });

    return {
      total: products.length,
      soon,
      expired
    };
  }, [products]);

  // Search and filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const name =
        product.name || product.productName || 'Unnamed Product';

      const matchesSearch =
        name.toLowerCase().includes(searchText.toLowerCase()) ||
        (product.category || '')
          .toLowerCase()
          .includes(searchText.toLowerCase());

      const status = getProductStatus(product);

      const matchesFilter =
        currentFilter === 'all' ||
        status.type === currentFilter;

      return matchesSearch && matchesFilter;
    });
  }, [products, searchText, currentFilter]);

  // Update form fields
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value
    }));
  }

  // Add a new product
  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const quantity = Number(form.quantity);

    if (
      !name ||
      !form.expiryDate ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 100000
    ) {
      alert('Please enter valid product details.');
      return;
    }

    if (form.expiryDate < todayString) {
      alert('Expiry date cannot be in the past.');
      return;
    }

    if (
      form.manufacturingDate &&
      form.manufacturingDate > todayString
    ) {
      alert('Manufacturing date cannot be in the future.');
      return;
    }

    if (
      form.manufacturingDate &&
      form.manufacturingDate > form.expiryDate
    ) {
      alert('Manufacturing date cannot be after expiry date.');
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      category: form.category,
      manufacturingDate: form.manufacturingDate,
      expiryDate: form.expiryDate,
      quantity
    };

    setProducts((previousProducts) => [
      ...previousProducts,
      newProduct
    ]);

    addActivity(`Added product: ${name}`, 'product');
    addNotification(`New product added: ${name}`, 'product');

    setForm({
      name: '',
      category: 'Food',
      manufacturingDate: '',
      expiryDate: '',
      quantity: '1'
    });
  }

  // Edit product details
  function handleEdit(product) {
    const updatedName = prompt(
      'Enter product name:',
      product.name || product.productName || ''
    );

    if (updatedName === null) return;

    if (!updatedName.trim()) {
      alert('Product name cannot be empty.');
      return;
    }

    const updatedExpiry = prompt(
      'Enter expiry date (YYYY-MM-DD):',
      product.expiryDate
    );

    if (updatedExpiry === null) return;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(updatedExpiry)) {
      alert('Enter date in YYYY-MM-DD format.');
      return;
    }

    const parsedDate = new Date(`${updatedExpiry}T00:00:00`);

    if (
      isNaN(parsedDate.getTime()) ||
      parsedDate.getFullYear() !== Number(updatedExpiry.slice(0, 4)) ||
      parsedDate.getMonth() + 1 !== Number(updatedExpiry.slice(5, 7)) ||
      parsedDate.getDate() !== Number(updatedExpiry.slice(8, 10))
    ) {
      alert('Please enter a valid calendar date.');
      return;
    }

    setProducts((previousProducts) =>
      previousProducts.map((item) =>
        String(item.id) === String(product.id)
          ? {
              ...item,
              name: updatedName.trim(),
              expiryDate: updatedExpiry
            }
          : item
      )
    );

    addActivity(`Updated product: ${updatedName.trim()}`, 'product');
  }

  // Delete product
  function handleDelete(product) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmed) return;

    setProducts((previousProducts) =>
      previousProducts.filter(
        (item) => String(item.id) !== String(product.id)
      )
    );

    addActivity(
      `Deleted product: ${product.name || product.productName}`,
      'product'
    );
  }

  const statusColors = {
    safe: 'bg-green-100 text-green-700 border-green-500',
    soon: 'bg-orange-100 text-orange-700 border-orange-500',
    expired: 'bg-red-100 text-red-700 border-red-500'
  };

  function getDaysMessage(status) {
    if (status.type === 'expired') {
      return `Expired ${status.days} day(s) ago`;
    }

    if (status.type === 'soon' && status.days === 0) {
      return 'Expires today!';
    }

    if (status.type === 'soon') {
      return `Expires in ${status.days} day(s)`;
    }

    return `${status.days} days remaining`;
  }

  return (
    <div className="max-w-7xl mx-auto w-full min-w-0">

      {/* PAGE HEADING */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-green-900">
          Expiry Tracker ⏰
        </h1>

        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Track product expiry dates and reduce unnecessary waste.
        </p>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mb-7 md:mb-8">

        <div className="bg-white rounded-xl shadow p-4 sm:p-5 border-l-4 border-green-500">
          <p className="text-gray-500 font-medium">Total Products</p>
          <h2 className="text-3xl font-bold text-green-700 mt-2">
            {statistics.total}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-5 border-l-4 border-orange-500">
          <p className="text-gray-500 font-medium">Expiring Soon</p>
          <h2 className="text-3xl font-bold text-orange-600 mt-2">
            {statistics.soon}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-5 border-l-4 border-red-500">
          <p className="text-gray-500 font-medium">Expired Products</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">
            {statistics.expired}
          </h2>
        </div>

      </div>

      {/* ADD PRODUCT FORM */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-7 md:mb-8">

        <h2 className="text-xl font-bold text-green-800 mb-5">
          ➕ Add New Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
        >

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
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
              <option value="Food">Food</option>
              <option value="Dairy">Dairy Products</option>
              <option value="Beverages">Beverages</option>
              <option value="Medicine">Medicine</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Manufacturing Date
            </label>

            <input
              type="date"
              name="manufacturingDate"
              value={form.manufacturingDate}
              onChange={handleChange}
              max={todayString}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Expiry Date
            </label>

            <input
              type="date"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              min={todayString}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
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

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold rounded-lg p-3 transition"
            >
              + Add Product
            </button>
          </div>

        </form>
      </div>

      {/* PRODUCT LIST */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5 sm:mb-6">

          <h2 className="text-xl font-bold text-green-800">
            My Products 📦
          </h2>

          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value.trimStart())}
            placeholder="Search products..."
            className="border border-gray-300 rounded-lg p-3 w-full sm:max-w-xs focus:ring-2 focus:ring-green-500 outline-none"
          />

        </div>

        {/* FILTER BUTTONS */}
        <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">

          {[
            { value: 'all', label: 'All' },
            { value: 'safe', label: 'Safe' },
            { value: 'soon', label: 'Expiring Soon' },
            { value: 'expired', label: 'Expired' }
          ].map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setCurrentFilter(filter.value)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm transition ${
                currentFilter === filter.value
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}

        </div>

        {/* PRODUCT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">

          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-10 sm:py-12 text-gray-500">
              <div className="text-5xl mb-3">📦</div>
              <p className="font-bold">No products found!</p>
              <p className="text-sm mt-2">
                Add a product or change your search/filter.
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => {
              const status = getProductStatus(product);

              const name =
                product.name ||
                product.productName ||
                'Unnamed Product';

              return (
                <div
                  key={product.id}
                  className={`bg-gray-50 border border-gray-200 border-l-4 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition min-w-0 ${statusColors[status.type]}`}
                >

                  <h3 className="text-lg font-bold text-gray-800 break-words">
                    {name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Category: {product.category || 'Other'}
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    Manufacturing: {formatDate(product.manufacturingDate)}
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    Expiry Date: {formatDate(product.expiryDate)}
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    Quantity: {product.quantity || 1}
                  </p>

                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-3 ${statusColors[status.type]}`}>
                    {status.label}
                  </span>

                  <p className={`text-sm font-semibold mt-2 ${
                    status.type === 'expired'
                      ? 'text-red-600'
                      : status.type === 'soon'
                        ? 'text-orange-600'
                        : 'text-green-600'
                  }`}>
                    {getDaysMessage(status)}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-4">

                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg py-2 px-2 text-sm font-semibold transition"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      className="w-full bg-red-100 hover:bg-red-200 text-red-700 rounded-lg py-2 px-2 text-sm font-semibold transition"
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>
              );
            })
          )}

        </div>
      </div>

    </div>
  );
}

export default ExpiryTracker;
