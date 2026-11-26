
export function ExpiryTracker() {

  return `

    <div class="max-w-6xl mx-auto">

      <div class="text-center mb-10">

        <h1 class="text-4xl font-bold text-green-800">
          Expiry Tracker 🌿
        </h1>

        <p class="text-gray-600 mt-3">
          Track your products and reduce unnecessary waste.
        </p>

      </div>

      <!-- ADD PRODUCT FORM -->

      <div class="bg-white p-8 rounded-2xl shadow-lg mb-10">

        <h2 class="text-2xl font-bold text-green-800 mb-6">
          Add New Product
        </h2>

        <form id="productForm"
              class="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label class="block font-semibold mb-2">
              Product Name
            </label>

            <input type="text" id="productName"
              placeholder="Enter product name"
              required
              class="w-full border rounded-lg p-3">
          </div>

          <div>
            <label class="block font-semibold mb-2">
              Category
            </label>

            <select id="category" required
              class="w-full border rounded-lg p-3">

              <option value="">Select Category</option>
              <option>Food</option>
              <option>Medicine</option>
              <option>Household</option>
              <option>Personal Care</option>
              <option>Other</option>

            </select>
          </div>

          <div>
            <label class="block font-semibold mb-2">
              Purchase Date
            </label>

            <input type="date" id="purchaseDate"
              required
              class="w-full border rounded-lg p-3">
          </div>

          <div>
            <label class="block font-semibold mb-2">
              Expiry Date
            </label>

            <input type="date" id="expiryDate"
              required
              class="w-full border rounded-lg p-3">
          </div>

          <div>
            <label class="block font-semibold mb-2">
              Quantity
            </label>

            <input type="number" id="quantity"
              min="1"
              placeholder="Enter quantity"
              required
              class="w-full border rounded-lg p-3">
          </div>

          <div class="flex items-end">

            <button type="submit"
              class="w-full bg-gradient-to-r
                     from-green-600 to-emerald-500
                     text-white p-3 rounded-lg
                     font-bold hover:from-green-700
                     hover:to-emerald-600">

              + Add Product

            </button>

          </div>

        </form>

      </div>

      <!-- PRODUCT TABLE -->

      <div class="bg-white p-8 rounded-2xl shadow-lg">

        <h2 class="text-2xl font-bold text-green-800 mb-6">
          My Products
        </h2>

        <div class="overflow-x-auto">

          <table class="w-full text-left">

            <thead class="bg-green-100 text-green-900">

              <tr>
                <th class="p-4">Product</th>
                <th class="p-4">Category</th>
                <th class="p-4">Purchase Date</th>
                <th class="p-4">Expiry Date</th>
                <th class="p-4">Quantity</th>
                <th class="p-4">Status</th>
                <th class="p-4">Action</th>
              </tr>

            </thead>

            <tbody id="productTableBody"></tbody>

          </table>

        </div>

      </div>

    </div>

  `;
}


// ===================================
// INITIALIZE EXPIRY TRACKER
// ===================================

export function initializeExpiryTracker() {

  let products = JSON.parse(
    localStorage.getItem('lifeloopProducts') || '[]'
  );

  const productForm = document.getElementById('productForm');
  const productTableBody =
    document.getElementById('productTableBody');

  function saveProducts() {

    localStorage.setItem(
      'lifeloopProducts',
      JSON.stringify(products)
    );

  }


  function getProductStatus(expiryDate) {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiry = new Date(expiryDate + 'T00:00:00');

    const difference = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    if (difference < 0) {
      return {
        text: 'Expired',
        className: 'status-expired'
      };
    }

    if (difference <= 7) {
      return {
        text: 'Expiring Soon',
        className: 'status-warning'
      };
    }

    return {
      text: 'Fresh',
      className: 'status-safe'
    };

  }


  function displayProducts() {

    productTableBody.innerHTML = '';

    if (products.length === 0) {

      productTableBody.innerHTML = `
        <tr>
          <td colspan="7"
              class="text-center p-6 text-gray-500">
            No products added yet.
          </td>
        </tr>
      `;

      return;

    }

    products.forEach((product, index) => {

      const status = getProductStatus(product.expiryDate);

      const row = document.createElement('tr');

      const values = [
        product.name,
        product.category,
        product.purchaseDate,
        product.expiryDate,
        product.quantity
      ];

      values.forEach(value => {

        const cell = document.createElement('td');

        cell.className = 'p-4';
        cell.textContent = value;

        row.appendChild(cell);

      });


      const statusCell = document.createElement('td');
      statusCell.className = 'p-4';

      const statusLabel = document.createElement('span');

      statusLabel.className = status.className;
      statusLabel.textContent = status.text;

      statusCell.appendChild(statusLabel);
      row.appendChild(statusCell);


      const actionCell = document.createElement('td');
      actionCell.className = 'p-4';

      const deleteButton = document.createElement('button');

      deleteButton.textContent = 'Delete';

      deleteButton.className =
        'bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg';

      deleteButton.dataset.index = index;

      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);

      productTableBody.appendChild(row);

    });

  }


  // ADD PRODUCT

  productForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const name =
      document.getElementById('productName').value.trim();

    const category =
      document.getElementById('category').value;

    const purchaseDate =
      document.getElementById('purchaseDate').value;

    const expiryDate =
      document.getElementById('expiryDate').value;

    const quantity =
      document.getElementById('quantity').value;

    if (!name || !category || !purchaseDate ||
        !expiryDate || !quantity) {

      alert('Please fill in all fields.');
      return;

    }

    if (expiryDate < purchaseDate) {

      alert('Expiry date cannot be before purchase date!');
      return;

    }

    products.push({
      name,
      category,
      purchaseDate,
      expiryDate,
      quantity
    });

    saveProducts();
    displayProducts();

    productForm.reset();

    alert('Product added successfully!');

  });


  // DELETE PRODUCT

  productTableBody.addEventListener('click', function(event) {

    if (event.target.dataset.index !== undefined) {

      const index = Number(event.target.dataset.index);

      products.splice(index, 1);

      saveProducts();
      displayProducts();

    }

  });


  displayProducts();

}