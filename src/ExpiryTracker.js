
import './style.css';
import { addActivity } from './Activity.js';
import { addNotification } from './Notifications.js';

// ======================================
// LIFELOOP EXPIRY TRACKER
// ======================================

export function ExpiryTracker() {

  return `

    <div class="max-w-7xl mx-auto w-full min-w-0">

      <!-- PAGE HEADING -->

      <div class="mb-6 md:mb-8">

        <h1 class="text-2xl sm:text-3xl font-extrabold text-green-900">
          Expiry Tracker ⏰
        </h1>

        <p class="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
          Track product expiry dates and reduce unnecessary waste.
        </p>

      </div>


      <!-- STATISTICS -->

      <div class="grid grid-cols-1 sm:grid-cols-3
                  gap-3 sm:gap-5 mb-7 md:mb-8">

        <div class="bg-white rounded-xl shadow p-4 sm:p-5
                    border-l-4 border-green-500">

          <p class="text-gray-500 font-medium text-sm sm:text-base">
            Total Products
          </p>

          <h2 id="totalProducts"
              class="text-2xl sm:text-3xl font-bold text-green-700 mt-2">
            0
          </h2>

        </div>


        <div class="bg-white rounded-xl shadow p-4 sm:p-5
                    border-l-4 border-orange-500">

          <p class="text-gray-500 font-medium text-sm sm:text-base">
            Expiring Soon
          </p>

          <h2 id="soonProducts"
              class="text-2xl sm:text-3xl font-bold text-orange-600 mt-2">
            0
          </h2>

        </div>


        <div class="bg-white rounded-xl shadow p-4 sm:p-5
                    border-l-4 border-red-500">

          <p class="text-gray-500 font-medium text-sm sm:text-base">
            Expired Products
          </p>

          <h2 id="expiredProducts"
              class="text-2xl sm:text-3xl font-bold text-red-600 mt-2">
            0
          </h2>

        </div>

      </div>


      <!-- ADD PRODUCT FORM -->

      <div class="bg-white rounded-2xl shadow-lg
                  p-4 sm:p-6 mb-7 md:mb-8 min-w-0">

        <h2 class="text-lg sm:text-xl font-bold text-green-800 mb-5">
          ➕ Add New Product
        </h2>

        <form id="productForm"
              class="grid grid-cols-1 sm:grid-cols-2
                     gap-4 sm:gap-5">

          <div class="min-w-0">

            <label for="productName"
                   class="block font-semibold text-gray-700
                          text-sm sm:text-base mb-2">
              Product Name
            </label>

            <input
              type="text"
              id="productName"
              placeholder="Enter product name"
              maxlength="100"
              required
              class="w-full min-w-0 border border-gray-300
                     rounded-lg p-3 text-base outline-none
                     focus:ring-2 focus:ring-green-500"
            >

          </div>


          <div class="min-w-0">

            <label for="productCategory"
                   class="block font-semibold text-gray-700
                          text-sm sm:text-base mb-2">
              Category
            </label>

            <select
              id="productCategory"
              required
              class="w-full min-w-0 border border-gray-300
                     rounded-lg p-3 text-base outline-none
                     focus:ring-2 focus:ring-green-500">

              <option value="Food">Food</option>
              <option value="Dairy">Dairy Products</option>
              <option value="Beverages">Beverages</option>
              <option value="Medicine">Medicine</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Other">Other</option>

            </select>

          </div>


          <div class="min-w-0">

            <label for="manufacturingDate"
                   class="block font-semibold text-gray-700
                          text-sm sm:text-base mb-2">
              Manufacturing Date
            </label>

            <input
              type="date"
              id="manufacturingDate"
              class="w-full min-w-0 border border-gray-300
                     rounded-lg p-3 text-base outline-none
                     focus:ring-2 focus:ring-green-500"
            >

          </div>


          <div class="min-w-0">

            <label for="expiryDate"
                   class="block font-semibold text-gray-700
                          text-sm sm:text-base mb-2">
              Expiry Date
            </label>

            <input
              type="date"
              id="expiryDate"
              required
              class="w-full min-w-0 border border-gray-300
                     rounded-lg p-3 text-base outline-none
                     focus:ring-2 focus:ring-green-500"
            >

          </div>


          <div class="min-w-0">

            <label for="productQuantity"
                   class="block font-semibold text-gray-700
                          text-sm sm:text-base mb-2">
              Quantity
            </label>

            <input
              type="number"
              id="productQuantity"
              min="1"
              max="100000"
              value="1"
              required
              class="w-full min-w-0 border border-gray-300
                     rounded-lg p-3 text-base outline-none
                     focus:ring-2 focus:ring-green-500"
            >

          </div>


          <div class="flex items-end">

            <button
              type="submit"
              class="w-full bg-gradient-to-r
                     from-green-600 to-emerald-500
                     hover:from-green-700 hover:to-emerald-600
                     text-white font-bold rounded-lg
                     p-3 transition text-sm sm:text-base">

              + Add Product

            </button>

          </div>

        </form>

      </div>


      <!-- PRODUCT LIST -->

      <div class="bg-white rounded-2xl shadow-lg
                  p-4 sm:p-6 min-w-0">

        <div class="flex flex-col sm:flex-row
                    justify-between sm:items-center
                    gap-3 sm:gap-4 mb-5 sm:mb-6">

          <h2 class="text-lg sm:text-xl font-bold text-green-800">
            My Products 📦
          </h2>

          <input
            type="search"
            id="productSearch"
            placeholder="Search products..."
            class="border border-gray-300 rounded-lg
                   p-3 text-base outline-none
                   focus:ring-2 focus:ring-green-500
                   w-full sm:max-w-xs"
          >

        </div>


        <!-- FILTER BUTTONS -->

        <div class="flex flex-wrap gap-2 mb-5 sm:mb-6">

          <button data-filter="all"
                  class="expiry-filter px-3 sm:px-4 py-2
                         rounded-lg bg-green-600 text-white
                         font-semibold text-sm sm:text-base">
            All
          </button>

          <button data-filter="safe"
                  class="expiry-filter px-3 sm:px-4 py-2
                         rounded-lg bg-gray-100 text-gray-700
                         font-semibold text-sm sm:text-base">
            Safe
          </button>

          <button data-filter="soon"
                  class="expiry-filter px-3 sm:px-4 py-2
                         rounded-lg bg-gray-100 text-gray-700
                         font-semibold text-sm sm:text-base">
            Expiring Soon
          </button>

          <button data-filter="expired"
                  class="expiry-filter px-3 sm:px-4 py-2
                         rounded-lg bg-gray-100 text-gray-700
                         font-semibold text-sm sm:text-base">
            Expired
          </button>

        </div>


        <!-- RESPONSIVE PRODUCT CARDS -->

        <div id="productList"
             class="grid grid-cols-1 sm:grid-cols-2
                    xl:grid-cols-3 gap-3 sm:gap-5">
        </div>

      </div>

    </div>

  `;

}


// ======================================
// INITIALIZE EXPIRY TRACKER
// ======================================

export function initializeExpiryTracker() {

  let products = JSON.parse(
    localStorage.getItem('lifeloopProducts') || '[]'
  );

  let currentFilter = 'all';
  let searchText = '';


  // GET ELEMENTS

  const productForm = document.getElementById('productForm');
  const productName = document.getElementById('productName');
  const productCategory = document.getElementById('productCategory');
  const manufacturingDate = document.getElementById('manufacturingDate');
  const expiryDate = document.getElementById('expiryDate');
  const productQuantity = document.getElementById('productQuantity');
  const productList = document.getElementById('productList');
  const productSearch = document.getElementById('productSearch');


  // LOCAL DATE

  function getTodayString() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, '0');

    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;

  }

  const todayString = getTodayString();

  manufacturingDate.max = todayString;
  expiryDate.min = todayString;


  // SAVE PRODUCTS

  function saveProducts() {

    localStorage.setItem(
      'lifeloopProducts',
      JSON.stringify(products)
    );

  }


  // GET PRODUCT STATUS

  function getProductStatus(product) {

    const today = new Date(
      getTodayString() + 'T00:00:00'
    );

    const expiry = new Date(
      product.expiryDate + 'T00:00:00'
    );

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


  // UPDATE STATISTICS

  function updateStatistics() {

    let soon = 0;
    let expired = 0;

    products.forEach(product => {

      const status = getProductStatus(product);

      if (status.type === 'soon') soon++;

      if (status.type === 'expired') expired++;

    });

    document.getElementById('totalProducts').textContent = products.length;

    document.getElementById('soonProducts').textContent = soon;

    document.getElementById('expiredProducts').textContent = expired;

  }


  // FORMAT DATE

  function formatDate(date) {

    if (!date) return 'Not specified';

    const parts = date.split('-');

    if (parts.length !== 3) return date;

    return `${parts[2]}/${parts[1]}/${parts[0]}`;

  }


  // DISPLAY PRODUCTS

  function displayProducts() {

    productList.innerHTML = '';

    updateStatistics();

    const filteredProducts = products.filter(product => {

      const name =
        product.name || product.productName || 'Unnamed Product';

      const matchesSearch =
        name.toLowerCase().includes(searchText) ||
        (product.category || '').toLowerCase().includes(searchText);

      const status = getProductStatus(product);

      const matchesFilter =
        currentFilter === 'all' ||
        status.type === currentFilter;

      return matchesSearch && matchesFilter;

    });


    // EMPTY MESSAGE

    if (filteredProducts.length === 0) {

      const empty = document.createElement('div');

      empty.className =
        'col-span-full text-center py-10 sm:py-12 text-gray-500';

      empty.innerHTML = `
        <div class="text-4xl sm:text-5xl mb-3">📦</div>
        <p class="font-bold">No products found!</p>
        <p class="text-sm mt-2">
          Add a product or change your search/filter.
        </p>
      `;

      productList.appendChild(empty);

      return;

    }


    // STATUS COLORS

    const statusColors = {

      safe: 'bg-green-100 text-green-700 border-green-500',

      soon: 'bg-orange-100 text-orange-700 border-orange-500',

      expired: 'bg-red-100 text-red-700 border-red-500'

    };


    // PRODUCT CARDS

    filteredProducts.forEach(product => {

      const status = getProductStatus(product);

      const name =
        product.name || product.productName || 'Unnamed Product';

      const card = document.createElement('div');

      card.className =
        'bg-gray-50 border border-gray-200 ' +
        'border-l-4 rounded-xl p-4 sm:p-5 shadow-sm ' +
        'hover:shadow-lg transition min-w-0 ' +
        statusColors[status.type].split(' ').pop();


      // PRODUCT NAME

      const heading = document.createElement('h3');

      heading.textContent = name;

      heading.className =
        'text-base sm:text-lg font-bold text-gray-800 break-words';


      // CATEGORY

      const category = document.createElement('p');

      category.textContent =
        'Category: ' + (product.category || 'Other');

      category.className = 'text-sm text-gray-500 mt-2 break-words';


      // MANUFACTURING DATE

      const mfg = document.createElement('p');

      mfg.textContent =
        'Manufacturing: ' + formatDate(product.manufacturingDate);

      mfg.className = 'text-sm text-gray-600 mt-2';


      // EXPIRY DATE

      const expiry = document.createElement('p');

      expiry.textContent =
        'Expiry Date: ' + formatDate(product.expiryDate);

      expiry.className = 'text-sm text-gray-600 mt-2';


      // QUANTITY

      const quantity = document.createElement('p');

      quantity.textContent =
        'Quantity: ' + (product.quantity || 1);

      quantity.className = 'text-sm text-gray-600 mt-2';


      // STATUS BADGE

      const badge = document.createElement('span');

      badge.textContent = status.label;

      badge.className =
        'inline-block px-3 py-1 rounded-full ' +
        'text-xs font-bold mt-3 ' +
        statusColors[status.type];


      // DAYS MESSAGE

      const daysMessage = document.createElement('p');

      if (status.type === 'expired') {

        daysMessage.textContent =
          `Expired ${status.days} day(s) ago`;

      }

      else if (status.type === 'soon' && status.days === 0) {

        daysMessage.textContent = 'Expires today!';

      }

      else if (status.type === 'soon') {

        daysMessage.textContent =
          `Expires in ${status.days} day(s)`;

      }

      else {

        daysMessage.textContent =
          `${status.days} days remaining`;

      }

      daysMessage.className =
        'text-sm font-semibold mt-2 ' +
        (status.type === 'expired'
          ? 'text-red-600'
          : status.type === 'soon'
            ? 'text-orange-600'
            : 'text-green-600');


      // BUTTON CONTAINER

      const buttons = document.createElement('div');

      buttons.className =
        'grid grid-cols-2 gap-2 mt-4';


      // EDIT BUTTON

      const editButton = document.createElement('button');

      editButton.textContent = '✏️ Edit';

      editButton.dataset.action = 'edit';

      editButton.dataset.id = product.id;

      editButton.className =
        'w-full bg-blue-100 hover:bg-blue-200 ' +
        'text-blue-700 rounded-lg py-2 px-2 ' +
        'text-sm font-semibold transition';


      // DELETE BUTTON

      const deleteButton = document.createElement('button');

      deleteButton.textContent = '🗑️ Delete';

      deleteButton.dataset.action = 'delete';

      deleteButton.dataset.id = product.id;

      deleteButton.className =
        'w-full bg-red-100 hover:bg-red-200 ' +
        'text-red-700 rounded-lg py-2 px-2 ' +
        'text-sm font-semibold transition';


      buttons.append(editButton, deleteButton);

      card.append(
        heading,
        category,
        mfg,
        expiry,
        quantity,
        badge,
        daysMessage,
        buttons
      );

      productList.appendChild(card);

    });

  }


  // ======================================
  // ADD PRODUCT
  // ======================================

  productForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const name = productName.value.trim();

    const category = productCategory.value;

    const mfgDate = manufacturingDate.value;

    const expDate = expiryDate.value;

    const quantity = Number(productQuantity.value);


    if (!name || !expDate ||
        !Number.isInteger(quantity) ||
        quantity < 1 || quantity > 100000) {

      alert('Please enter valid product details.');

      return;

    }

    if (expDate < todayString) {

      alert('Expiry date cannot be in the past.');

      return;

    }

    if (mfgDate && mfgDate > todayString) {

      alert('Manufacturing date cannot be in the future.');

      return;

    }

    if (mfgDate && mfgDate > expDate) {

      alert('Manufacturing date cannot be after expiry date.');

      return;

    }


    const newProduct = {

      id: Date.now(),

      name,

      category,

      manufacturingDate: mfgDate,

      expiryDate: expDate,

      quantity

    };


    // SAVE THE NEW PRODUCT

    products.push(newProduct);

    saveProducts();


    // RECORD THE ACTIVITY

    addActivity(`Added product: ${name}`, 'product');


    // CREATE A NOTIFICATION

    addNotification(`New product added: ${name}`, 'product');


    // REFRESH THE PRODUCT LIST

    displayProducts();

    productForm.reset();

    expiryDate.min = todayString;

    manufacturingDate.max = todayString;

  });


  // ======================================
  // SEARCH PRODUCTS
  // ======================================

  productSearch.addEventListener('input', function() {

    searchText = this.value.trim().toLowerCase();

    displayProducts();

  });


  // ======================================
  // FILTER PRODUCTS
  // ======================================

  document.querySelectorAll('.expiry-filter')
    .forEach(button => {

      button.addEventListener('click', function() {

        currentFilter = this.dataset.filter;

        document.querySelectorAll('.expiry-filter')
          .forEach(filter => {

            filter.classList.remove(
              'bg-green-600',
              'text-white'
            );

            filter.classList.add(
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

        displayProducts();

      });

    });


  // ======================================
  // EDIT AND DELETE PRODUCTS
  // ======================================

  productList.addEventListener('click', function(event) {

    const button = event.target.closest('button');

    if (!button) return;

    const productId = button.dataset.id;

    const index = products.findIndex(
      product => String(product.id) === String(productId)
    );

    if (index === -1) return;

    const product = products[index];


    // DELETE

    if (button.dataset.action === 'delete') {

      const confirmed = confirm(
        'Are you sure you want to delete this product?'
      );

      if (!confirmed) return;

      products.splice(index, 1);

      saveProducts();

      displayProducts();

    }


    // EDIT

    if (button.dataset.action === 'edit') {

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

      const parsedDate = new Date(
        updatedExpiry + 'T00:00:00'
      );

      if (
        isNaN(parsedDate.getTime()) ||
        parsedDate.getFullYear() !== Number(updatedExpiry.slice(0, 4)) ||
        parsedDate.getMonth() + 1 !== Number(updatedExpiry.slice(5, 7)) ||
        parsedDate.getDate() !== Number(updatedExpiry.slice(8, 10))
      ) {

        alert('Please enter a valid calendar date.');

        return;

      }

      product.name = updatedName.trim();

      product.expiryDate = updatedExpiry;

      saveProducts();

      displayProducts();

    }

  });


  // ======================================
  // INITIAL DISPLAY
  // ======================================

  displayProducts();

}
