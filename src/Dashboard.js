
import './style.css';

import { Navbar, initializeNavbar } from './components/Navbar.js';
import { Sidebar } from './components/Sidebar.js';

import {
  SystemBanner,
  initializeSystemBanner
} from './components/SystemBanner.js';

import { TaskCard } from './components/TaskCard.js';

import {
  ExpiryTracker,
  initializeExpiryTracker
} from './ExpiryTracker.js';

import {
  ResourceSharing,
  initializeResourceSharing
} from './ResourceSharing.js';
import {
  TaskManager,
  initializeTaskManager
} from './TaskManager.js';


// ======================================
// DASHBOARD LAYOUT
// ======================================

document.querySelector('#dashboardApp').innerHTML = `

  <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">

    ${Navbar()}

    <div class="flex min-h-screen">

      ${Sidebar()}

      <main id="mainContent"
            class="flex-1 p-5 md:p-8 min-w-0">

      </main>

    </div>

  </div>

`;

const mainContent = document.getElementById('mainContent');


// ======================================
// DASHBOARD PAGE
// ======================================

function showDashboard() {

  const products = JSON.parse(
    localStorage.getItem('lifeloopProducts') || '[]'
  );

  const resources = JSON.parse(
    localStorage.getItem('lifeloopResources') || '[]'
  );
    // TASK STATISTICS

  const tasks = JSON.parse(
    localStorage.getItem('lifeloopTasks') || '[]'
  );

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    task => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const today = new Date();
  today.setHours(0, 0, 0, 0);


  // EXPIRED PRODUCTS

  const expiredProducts = products.filter(product => {

    const expiry = new Date(product.expiryDate + 'T00:00:00');

    return expiry < today;

  }).length;


  // EXPIRING SOON

  const expiringSoon = products.filter(product => {

    const expiry = new Date(product.expiryDate + 'T00:00:00');

    const days = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    return days >= 0 && days <= 7;

  }).length;


  // DASHBOARD CONTENT

  mainContent.innerHTML = `

    <div class="max-w-7xl mx-auto">

      <!-- SYSTEM BANNER -->

      ${SystemBanner()}


      <!-- WELCOME SECTION -->

      <div class="mb-8">

        <h1 class="text-3xl font-extrabold text-green-900">
          Welcome to LifeLoop! 🌱
        </h1>

        <p class="text-gray-600 mt-2">
          Manage your products, track expiry dates
          and share resources with your community.
        </p>

      </div>


      <!-- DYNAMIC TASK CARDS -->

      <div class="grid grid-cols-1 sm:grid-cols-2
                  xl:grid-cols-4 gap-6 mb-10">

        ${TaskCard(
          'Total Products',
          products.length,
          'Products being tracked',
          '📦',
          'green'
        )}

        ${TaskCard(
          'Expiring Soon',
          expiringSoon,
          'Products expiring soon',
          '⏰',
          'orange'
        )}

        ${TaskCard(
          'Expired Products',
          expiredProducts,
          'Products past expiry',
          '⚠️',
          'red'
        )}

        ${TaskCard(
          'Shared Resources',
          resources.length,
          'Resources shared',
          '🤝',
          'purple'
        )}

      </div>


      <!-- QUICK ACTIONS -->

      <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <h2 class="text-xl font-bold text-green-900 mb-5">
          Quick Actions
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">

          <button
            id="expiryQuickAction"
            class="p-5 rounded-xl bg-green-50
                   hover:bg-green-100 text-left transition">

            <span class="text-3xl">⏰</span>

            <h3 class="font-bold text-green-800 mt-3">
              Track Expiry
            </h3>

            <p class="text-sm text-gray-600 mt-1">
              Add and manage your products.
            </p>

          </button>


          <button
            id="sharingQuickAction"
            class="p-5 rounded-xl bg-emerald-50
                   hover:bg-emerald-100 text-left transition">

            <span class="text-3xl">♻️</span>

            <h3 class="font-bold text-green-800 mt-3">
              Share Resources
            </h3>

            <p class="text-sm text-gray-600 mt-1">
              Share resources with your community.
            </p>

          </button>

        </div>

      </div>


      <!-- RECENT ACTIVITY -->

      <div class="bg-white rounded-2xl shadow-lg p-6">

        <h2 class="text-xl font-bold text-green-900 mb-4">
          Recent Activity
        </h2>

        <p class="text-gray-500 text-sm">
          Your recent activities will appear here.
        </p>

      </div>

    </div>

  `;


  // INITIALIZE SYSTEM BANNER

  initializeSystemBanner();


  // QUICK ACTION EVENTS

  document.getElementById('expiryQuickAction')
    .addEventListener('click', () => {
      navigateTo('expiry');
    });

  document.getElementById('sharingQuickAction')
    .addEventListener('click', () => {
      navigateTo('sharing');
    });

}


// ======================================
// EXPIRY TRACKER PAGE
// ======================================

function showExpiry() {

  mainContent.innerHTML = ExpiryTracker();

  initializeExpiryTracker();

}


// ======================================
// RESOURCE SHARING PAGE
// ======================================

function showSharing() {

  mainContent.innerHTML = ResourceSharing();

  initializeResourceSharing();

}
function showTasks() {

  mainContent.innerHTML = TaskManager();

  initializeTaskManager();

}


// ======================================
// HOME PAGE
// ======================================

function showHome() {

  mainContent.innerHTML = `

    <div class="max-w-7xl mx-auto">

      <h1 class="text-3xl font-extrabold text-green-900 mb-4">
        Welcome to LifeLoop 🌿
      </h1>

      <p class="text-gray-600">
        Smart Living, Less Waste. Together we can make
        our community sustainable.
      </p>

    </div>

  `;

}


// ======================================
// NAVIGATION FUNCTIONALITY
// ======================================

function navigateTo(page) {

  if (page === 'dashboard') {
    showDashboard();
  }

  else if (page === 'expiry') {
    showExpiry();
  }

  else if (page === 'sharing') {
    showSharing();
  }

  // ADD THIS
  else if (page === 'tasks') {
    showTasks();
  }

  else if (page === 'home') {
    showHome();
  }

  // Keep your existing active sidebar code below


  // UPDATE ACTIVE SIDEBAR BUTTON

  document.querySelectorAll('[data-page]').forEach(link => {

    link.classList.remove(
      'bg-emerald-500',
      'font-bold'
    );

    if (link.dataset.page === page) {

      link.classList.add(
        'bg-emerald-500',
        'font-bold'
      );

    }

  });

}


// ======================================
// SIDEBAR NAVIGATION
// ======================================

document.addEventListener('click', function(event) {

  const link = event.target.closest('[data-page]');

  if (!link) return;

  event.preventDefault();

  navigateTo(link.dataset.page);

});


// ======================================
// INITIALIZE NAVBAR
// ======================================

initializeNavbar();


// ======================================
// LOAD DASHBOARD
// ======================================

navigateTo('dashboard');