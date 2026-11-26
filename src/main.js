import './style.css'
document.querySelector('#app').innerHTML = `

  <!-- Navigation Bar -->
  <header class="navbar">

    <div class="logo">
      <span>Life</span>Loop
    </div>

    <nav>
      <a href="#">Home</a>
      <a href="#about">About</a>
      <a href="#expiry">Expiry Tracker</a>
      <a href="#sharing">Resource Sharing</a>
      <a href="#contact">Contact</a>
    </nav>

    <button class="login-btn">Login</button>

  </header>


  <!-- Hero Section -->
  <section class="hero">
  

    <div class="hero-content">

      <p class="tagline">♻ SMART LIVING, LESS WASTE</p>

      <h1>
        Don't Waste It.<br>
        <span>Share It.</span>
      </h1>

      <p class="description">
        Track product expiry dates, reduce waste and share
        useful resources with people who need them.
        Together, let's build a sustainable future.
      </p>

      <div class="hero-buttons">
        <button class="explore-btn">Explore Products</button>
        <button class="share-btn">Share Resources</button>
      </div>

    </div>

  </section>


  <!-- About Section -->
  <section class="about" id="about">

    <div class="section-heading">

      <p>ABOUT LIFELOOP</p>

      <h2>Small Actions, <span>Big Impact</span></h2>

      <p>
        LifeLoop helps people manage resources wisely
        and create a world with less waste.
      </p>

    </div>

    <div class="features">

      <div class="feature-card">
        <div class="feature-icon">📅</div>
        <h3>Expiry Tracking</h3>
        <p>
          Monitor product expiry dates and get information
          about products that are nearing expiry.
        </p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🤝</div>
        <h3>Resource Sharing</h3>
        <p>
          Share unused resources with people who need
          them instead of throwing them away.
        </p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🌱</div>
        <h3>Waste Reduction</h3>
        <p>
          Reduce unnecessary waste and encourage
          responsible resource management.
        </p>
      </div>

    </div>

  </section>


  <!-- Expiry Tracker Section -->
  <section class="expiry-section" id="expiry">

    <div class="section-heading">

      <p>SMART PRODUCT MANAGEMENT</p>

      <h2>Expiry <span>Tracker</span></h2>

      <p>
        Keep track of your products and monitor
        their expiry dates before they expire.
      </p>

    </div>


    <!-- Add Product Form -->
    <div class="product-form">

      <h3>+ Add New Product</h3>

      <form id="productForm">

        <div class="form-group">
          <label for="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            required
          >
        </div>

        <div class="form-group">
          <label for="category">Category</label>
          <select id="category" required>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Medicine">Medicine</option>
            <option value="Household">Household</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label for="expiryDate">Expiry Date</label>
          <input
            type="date"
            id="expiryDate"
            required
          >
        </div>

        <div class="form-group">
          <label for="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            placeholder="Enter quantity"
            min="1"
            step="1"
            required
          >
        </div>

        <button type="submit" class="add-product-btn">
          Add Product
        </button>

      </form>

    </div>


    <!-- Product Table -->
    <div class="product-list">

      <h3>My Products</h3>

      <div class="table-container">

        <table>

          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Expiry Date</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody id="productTable">

            <tr id="emptyMessage">
              <td colspan="5">No products added yet.</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </section>

`;


// ==================================
// JAVASCRIPT FUNCTIONALITY
// ==================================


// Selecting HTML elements

const productForm = document.getElementById("productForm");

const productName = document.getElementById("productName");

const category = document.getElementById("category");

const expiryDate = document.getElementById("expiryDate");

const quantity = document.getElementById("quantity");

const productTable = document.getElementById("productTable");


// Creating an array to store products

let products = [];


// Function to calculate expiry status

function getExpiryStatus(date) {

  const parts = date.split("-").map(Number);

  const expiry = Date.UTC(
    parts[0],
    parts[1] - 1,
    parts[2]
  );

  const todayDate = new Date();

  const today = Date.UTC(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    todayDate.getDate()
  );

  const difference = Math.round(
    (expiry - today) / (1000 * 60 * 60 * 24)
  );

  if (difference < 0) {
    return "Expired";
  }

  else if (difference <= 7) {
    return "Expiring Soon";
  }

  else {
    return "Safe";
  }

}


// Function to display products

function displayProducts() {

  productTable.innerHTML = "";

  if (products.length === 0) {

    productTable.innerHTML = `
      <tr>
        <td colspan="5">No products added yet.</td>
      </tr>

  <!-- Resource Sharing Section -->
  <section class="sharing-section" id="sharing">

    <div class="section-heading">

      <p>SHARE AND CARE</p>

      <h2>Resource <span>Sharing</span></h2>

      <p>
        Share your unused resources and help
        someone in your community.
      </p>

    </div>


    <!-- Resource Sharing Form -->
    <div class="sharing-form">

      <h3>+ Share a Resource</h3>

      <form id="sharingForm">

        <div class="form-group">

          <label for="resourceName">Resource Name</label>

          <input
            type="text"
            id="resourceName"
            placeholder="Enter resource name"
            required
          >

        </div>


        <div class="form-group">

          <label for="resourceCategory">Category</label>

          <select id="resourceCategory" required>

            <option value="">Select Category</option>
            <option value="Books">Books</option>
            <option value="Food">Food</option>
            <option value="Clothing">Clothing</option>
            <option value="Stationery">Stationery</option>
            <option value="Household">Household Items</option>
            <option value="Other">Other</option>

          </select>

        </div>


        <div class="form-group">

          <label for="resourceQuantity">Quantity</label>

          <input
            type="number"
            id="resourceQuantity"
            placeholder="Enter quantity"
            min="1"
            step="1"
            required
          >

        </div>


        <div class="form-group">

          <label for="resourceLocation">Pickup Location</label>

          <input
            type="text"
            id="resourceLocation"
            placeholder="Enter your area"
            required
          >

        </div>


        <div class="form-group full-width">

          <label for="resourceDescription">Description</label>

          <textarea
            id="resourceDescription"
            placeholder="Describe the resource..."
            rows="4"
            required
          ></textarea>

        </div>


        <button type="submit" class="share-resource-btn">
          Share Resource
        </button>

      </form>

    </div>


    <!-- Available Resources -->
    <div class="available-resources">

      <h3>Available Resources</h3>

      <div class="resource-cards" id="resourceCards">

        <div class="resource-card">

          <div class="resource-icon">📚</div>

          <h3>Engineering Books</h3>

          <p>Category: Books</p>

          <p>Quantity: 5</p>

          <p>Location: Coimbatore</p>

          <p>Useful engineering reference books.</p>

          <span class="available-label">Available</span>

        </div>


        <div class="resource-card">

          <div class="resource-icon">✏️</div>

          <h3>Stationery Items</h3>

          <p>Category: Stationery</p>

          <p>Quantity: 10</p>

          <p>Location: Salem</p>

          <p>Unused notebooks and stationery.</p>

          <span class="available-label">Available</span>

        </div>

      </div>

    </div>

  </section>

    `;

    return;
  }


  products.forEach(function(product) {

    const row = document.createElement("tr");

    const status = getExpiryStatus(product.expiry);

    let statusClass = "";

    if (status === "Expired") {
      statusClass = "status-expired";
    }

    else if (status === "Expiring Soon") {
      statusClass = "status-warning";
    }

    else {
      statusClass = "status-safe";
    }


    const values = [
      product.name,
      product.category,
      product.expiry,
      product.quantity
    ];

    values.forEach(function(value) {

      const cell = document.createElement("td");

      cell.textContent = value;

      row.appendChild(cell);

    });


    const statusCell = document.createElement("td");

    const statusSpan = document.createElement("span");

    statusSpan.className = statusClass;

    statusSpan.textContent = status;

    statusCell.appendChild(statusSpan);

    row.appendChild(statusCell);

    productTable.appendChild(row);

  });

}


// Form Submit Event

productForm.addEventListener("submit", function(event) {

  // Prevent page refresh

  event.preventDefault();


  // Get input values

  const name = productName.value.trim();

  const selectedCategory = category.value;

  const expiry = expiryDate.value;

  const productQuantity = Number(quantity.value);


  // Validate product details

  if (
    name === "" ||
    selectedCategory === "" ||
    expiry === "" ||
    !Number.isInteger(productQuantity) ||
    productQuantity <= 0
  ) {

    alert("Please enter valid product details.");

    return;

  }


  // Create product object

  const newProduct = {

    name: name,

    category: selectedCategory,

    expiry: expiry,

    quantity: productQuantity

  };


  // Add product to array

  products.push(newProduct);


  // Display updated products

  displayProducts();


  // Reset form

  productForm.reset();


  alert("Product added successfully!");

});

// ==================================
// RESOURCE SHARING FUNCTIONALITY
// ==================================

// Selecting HTML elements

const sharingForm = document.getElementById("sharingForm");

const resourceName = document.getElementById("resourceName");

const resourceCategory = document.getElementById("resourceCategory");

const resourceQuantity = document.getElementById("resourceQuantity");

const resourceLocation = document.getElementById("resourceLocation");

const resourceDescription = document.getElementById("resourceDescription");

const resourceCards = document.getElementById("resourceCards");


// Creating an array

let resources = [];


// Form Submit Event

sharingForm.addEventListener("submit", function(event) {

  event.preventDefault();

  // Getting input values

  const name = resourceName.value.trim();

  const category = resourceCategory.value;

  const quantity = Number(resourceQuantity.value);

  const location = resourceLocation.value.trim();

  const description = resourceDescription.value.trim();


  // Validation

  if (
    name === "" ||
    category === "" ||
    !Number.isInteger(quantity) ||
    quantity <= 0 ||
    location === "" ||
    description === ""
  ) {

    alert("Please enter valid resource details.");

    return;

  }


  // Creating resource object

  const newResource = {

    name: name,

    category: category,

    quantity: quantity,

    location: location,

    description: description

  };


  // Adding resource to array

  resources.push(newResource);


  // Creating resource card

  const card = document.createElement("div");

  card.className = "resource-card";


  const icon = document.createElement("div");

  icon.className = "resource-icon";

  icon.textContent = "🎁";


  const title = document.createElement("h3");

  title.textContent = newResource.name;


  const categoryText = document.createElement("p");

  categoryText.textContent = "Category: " + newResource.category;


  const quantityText = document.createElement("p");

  quantityText.textContent = "Quantity: " + newResource.quantity;


  const locationText = document.createElement("p");

  locationText.textContent = "Location: " + newResource.location;


  const descriptionText = document.createElement("p");

  descriptionText.textContent = newResource.description;


  const status = document.createElement("span");

  status.className = "available-label";

  status.textContent = "Available";


  // Adding elements to card

  card.appendChild(icon);

  card.appendChild(title);

  card.appendChild(categoryText);

  card.appendChild(quantityText);

  card.appendChild(locationText);

  card.appendChild(descriptionText);

  card.appendChild(status);


  // Adding card to webpage

  resourceCards.appendChild(card);


  // Reset form

  sharingForm.reset();


  alert("Resource shared successfully!");

});

const test = document.createElement("h2");

test.textContent = "Tailwind CSS Working!";

test.className = "text-4xl font-bold text-green-600 text-center underline";

document.querySelector("#app").appendChild(test);

