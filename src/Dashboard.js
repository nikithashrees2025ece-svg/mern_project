
import './style.css';

import { RecentActivity } from './Activity.js';

import {
  UserProfile,
  initializeUserProfile
} from './Profile.js';

import {
  Notifications,
  initializeNotifications
} from './Notifications.js';

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

  <div class="min-h-screen w-full overflow-x-hidden
              bg-gradient-to-br from-green-50 to-emerald-100">

    ${Navbar()}

    <div class="flex min-h-screen w-full">

      ${Sidebar()}

      <main id="mainContent"
            class="flex-1 min-w-0
                   p-3 sm:p-5 md:p-8
                   overflow-x-hidden">

      </main>

    </div>

  </div>

`;

const mainContent = document.getElementById('mainContent');


// ======================================
// HELPER FUNCTION
// ======================================

function escapeHTML(value) {

  return String(value ?? '').replace(/[&<>"']/g, character => {

    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    return entities[character];

  });

}


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

  const tasks = JSON.parse(
    localStorage.getItem('lifeloopTasks') || '[]'
  );


  // TASK STATISTICS

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    task => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;


  // TODAY'S DATE

  const today = new Date();

  today.setHours(0, 0, 0, 0);


  // EXPIRED PRODUCTS

  const expiredProducts = products.filter(product => {

    if (!product.expiryDate) return false;

    const expiry = new Date(
      product.expiryDate + 'T00:00:00'
    );

    return !isNaN(expiry.getTime()) && expiry < today;

  }).length;


  // EXPIRING SOON

  const expiringSoon = products.filter(product => {

    if (!product.expiryDate) return false;

    const expiry = new Date(
      product.expiryDate + 'T00:00:00'
    );

    if (isNaN(expiry.getTime())) return false;

    const days = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    return days >= 0 && days <= 7;

  }).length;


  // COMPLETION PERCENTAGE

  const completionRate = totalTasks > 0
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;


  // DASHBOARD CONTENT

  mainContent.innerHTML = `

    <div class="max-w-7xl mx-auto w-full min-w-0">

      <!-- SYSTEM BANNER -->

      ${SystemBanner()}


      <!-- WELCOME SECTION -->

      <div class="mb-6 md:mb-8">

        <h1 class="text-2xl sm:text-3xl
                   font-extrabold text-green-900
                   leading-tight">

          Welcome to LifeLoop! 🌱

        </h1>

        <p class="text-gray-600 mt-2
                  text-sm sm:text-base
                  leading-relaxed">

          Manage your products, track expiry dates
          and share resources with your community.

        </p>

      </div>


      <!-- STATISTICS CARDS -->

      <div class="grid grid-cols-1
                  sm:grid-cols-2
                  xl:grid-cols-4
                  gap-3 sm:gap-5 lg:gap-6
                  mb-7 md:mb-10">

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


      <!-- TASK OVERVIEW -->

      <div class="grid grid-cols-1
                  sm:grid-cols-3
                  gap-3 sm:gap-5
                  mb-7 md:mb-8">


        <!-- TOTAL TASKS -->

        <div class="bg-white rounded-xl shadow
                    p-4 sm:p-5
                    border-l-4 border-blue-500
                    min-w-0">

          <p class="text-gray-500 font-medium text-sm sm:text-base">
            Total Tasks
          </p>

          <h2 class="text-2xl sm:text-3xl
                     font-bold text-blue-700 mt-2">

            ${totalTasks}

          </h2>

        </div>


        <!-- COMPLETED TASKS -->

        <div class="bg-white rounded-xl shadow
                    p-4 sm:p-5
                    border-l-4 border-green-500
                    min-w-0">

          <p class="text-gray-500 font-medium text-sm sm:text-base">
            Completed Tasks
          </p>

          <h2 class="text-2xl sm:text-3xl
                     font-bold text-green-700 mt-2">

            ${completedTasks}

          </h2>

        </div>


        <!-- PENDING TASKS -->

        <div class="bg-white rounded-xl shadow
                    p-4 sm:p-5
                    border-l-4 border-orange-500
                    min-w-0">

          <p class="text-gray-500 font-medium text-sm sm:text-base">
            Pending Tasks
          </p>

          <h2 class="text-2xl sm:text-3xl
                     font-bold text-orange-600 mt-2">

            ${pendingTasks}

          </h2>

        </div>

      </div>


      <!-- QUICK ACTIONS -->

      <div class="bg-white rounded-2xl shadow-lg
                  p-4 sm:p-6
                  mb-7 md:mb-8
                  min-w-0">

        <h2 class="text-lg sm:text-xl
                   font-bold text-green-900 mb-4 sm:mb-5">

          Quick Actions

        </h2>

        <div class="grid grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-3
                    gap-3 sm:gap-5">


          <!-- EXPIRY TRACKER -->

          <button
            id="expiryQuickAction"
            type="button"

            class="p-4 sm:p-5 rounded-xl
                   bg-green-50 hover:bg-green-100
                   text-left transition duration-300
                   hover:-translate-y-1
                   min-w-0">

            <span class="text-2xl sm:text-3xl">⏰</span>

            <h3 class="font-bold text-green-800 mt-3">
              Track Expiry
            </h3>

            <p class="text-sm text-gray-600 mt-1">
              Add and manage your products.
            </p>

          </button>


          <!-- RESOURCE SHARING -->

          <button
            id="sharingQuickAction"
            type="button"

            class="p-4 sm:p-5 rounded-xl
                   bg-emerald-50 hover:bg-emerald-100
                   text-left transition duration-300
                   hover:-translate-y-1
                   min-w-0">

            <span class="text-2xl sm:text-3xl">♻️</span>

            <h3 class="font-bold text-green-800 mt-3">
              Share Resources
            </h3>

            <p class="text-sm text-gray-600 mt-1">
              Share resources with your community.
            </p>

          </button>


          <!-- TASK MANAGER -->

          <button
            id="taskQuickAction"
            type="button"

            class="p-4 sm:p-5 rounded-xl
                   bg-blue-50 hover:bg-blue-100
                   text-left transition duration-300
                   hover:-translate-y-1
                   min-w-0">

            <span class="text-2xl sm:text-3xl">📝</span>

            <h3 class="font-bold text-blue-800 mt-3">
              Manage Tasks
            </h3>

            <p class="text-sm text-gray-600 mt-1">
              Create and complete your daily tasks.
            </p>

          </button>

        </div>

      </div>


      <!-- RECENT ACTIVITY -->

      <div class="bg-white rounded-2xl shadow-lg
                  p-4 sm:p-6
                  mb-7 md:mb-8
                  min-w-0 overflow-hidden">

        <h2 class="text-lg sm:text-xl
                   font-bold text-green-800 mb-4 sm:mb-5">

          Recent Activity 📋

        </h2>

        <div class="w-full min-w-0 overflow-x-auto">

          ${RecentActivity()}

        </div>

      </div>


      <!-- TASK PROGRESS -->

      <div class="bg-white rounded-2xl shadow-lg
                  p-4 sm:p-6
                  min-w-0">

        <h2 class="text-lg sm:text-xl
                   font-bold text-green-900 mb-4">

          Task Progress

        </h2>

        <div class="flex justify-between
                    items-center gap-2
                    text-xs sm:text-sm mb-2">

          <span class="text-gray-600">
            Completion Rate
          </span>

          <span class="font-bold text-green-700
                       whitespace-nowrap">

            ${completionRate}%

          </span>

        </div>


        <!-- PROGRESS BAR -->

        <div class="w-full bg-gray-200
                    rounded-full h-3 overflow-hidden">

          <div
            class="bg-gradient-to-r from-green-500 to-emerald-500
                   h-3 rounded-full transition-all duration-500"
            style="width: ${completionRate}%">

          </div>

        </div>

        <p class="text-xs sm:text-sm
                  text-gray-500 mt-3 leading-relaxed">

          Keep completing your tasks to make
          LifeLoop more sustainable!

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


  document.getElementById('taskQuickAction')
    .addEventListener('click', () => {
      navigateTo('tasks');
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


// ======================================
// TASK MANAGER PAGE
// ======================================

function showTasks() {

  mainContent.innerHTML = TaskManager();

  initializeTaskManager();

}


// ======================================
// PROFILE PAGE
// ======================================

function showProfile() {

  mainContent.innerHTML = UserProfile();

  initializeUserProfile();

}


// ======================================
// NOTIFICATIONS PAGE
// ======================================

function showNotifications() {

  mainContent.innerHTML = Notifications();

  initializeNotifications();

}


// ======================================
// HOME PAGE
// ======================================

function showHome() {

  mainContent.innerHTML = `

    <div class="max-w-7xl mx-auto w-full">

      <h1 class="text-2xl sm:text-3xl
                 font-extrabold text-green-900 mb-4">

        Welcome to LifeLoop 🌿

      </h1>

      <p class="text-sm sm:text-base text-gray-600
                leading-relaxed">

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

  else if (page === 'tasks') {

    showTasks();

  }

  else if (page === 'profile') {

    showProfile();

  }

  else if (page === 'notifications') {

    showNotifications();

  }

  else if (page === 'home') {

    showHome();

  }


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
