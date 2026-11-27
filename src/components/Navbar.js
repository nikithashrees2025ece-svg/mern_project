
// ======================================
// LIFELOOP RESPONSIVE NAVBAR
// ======================================

export function Navbar() {

  return `

    <header class="bg-white shadow-md
                   px-3 sm:px-4 md:px-8
                   py-3 md:py-4
                   flex items-center justify-between
                   gap-2
                   sticky top-0 z-40
                   w-full">


      <!-- LOGO -->

      <div class="flex items-center gap-2 md:gap-3 min-w-0">

        <div class="w-9 h-9 md:w-11 md:h-11
                    rounded-xl bg-green-100
                    flex items-center justify-center
                    text-xl md:text-2xl shrink-0">

          ♻️

        </div>

        <div class="min-w-0">

          <h1 class="text-xl md:text-2xl
                     font-extrabold text-green-800">

            Life<span class="text-emerald-500">Loop</span>

          </h1>

          <p class="text-xs text-gray-500 hidden sm:block">
            Smart Living, Less Waste
          </p>

        </div>

      </div>


      <!-- RIGHT SIDE -->

      <div class="flex items-center
                  gap-2 sm:gap-3 md:gap-6 shrink-0">


        <!-- NOTIFICATION BUTTON -->

        <button
          id="notificationBtn"
          type="button"

          class="relative w-9 h-9 md:w-10 md:h-10
                 rounded-full bg-green-50
                 hover:bg-green-100
                 flex items-center justify-center
                 text-lg md:text-xl transition"

          aria-label="Notifications"
          title="Notifications">

          🔔

          <span class="absolute -top-1 -right-1
                       bg-red-500 text-white
                       text-xs rounded-full
                       w-4 h-4 md:w-5 md:h-5
                       flex items-center justify-center">

            3

          </span>

        </button>


        <!-- USER PROFILE -->

        <div class="flex items-center gap-2 md:gap-3">

          <div class="w-9 h-9 md:w-10 md:h-10
                      rounded-full
                      bg-gradient-to-r from-green-500
                      to-emerald-400 text-white
                      flex items-center justify-center
                      font-bold text-base md:text-lg
                      shrink-0">

            U

          </div>

          <div class="hidden sm:block">

            <p class="font-bold text-gray-800 text-sm">
              User
            </p>

            <p class="text-xs text-gray-500">
              LifeLoop Member
            </p>

          </div>

        </div>


        <!-- LOGOUT BUTTON -->

        <button
          id="logoutBtn"
          type="button"

          class="bg-red-50 text-red-600
                 px-2 sm:px-3 md:px-5
                 py-2 rounded-lg
                 font-semibold hover:bg-red-100
                 transition text-xs sm:text-sm">

          Logout

        </button>


      </div>

    </header>

  `;

}


// ======================================
// NAVBAR FUNCTIONALITY
// ======================================

export function initializeNavbar() {

  const logoutBtn =
    document.getElementById('logoutBtn');

  const notificationBtn =
    document.getElementById('notificationBtn');


  // LOGOUT FUNCTIONALITY

  if (logoutBtn) {

    logoutBtn.addEventListener('click', () => {

      const confirmLogout = confirm(
        'Are you sure you want to logout?'
      );

      if (confirmLogout) {

        window.location.href = '/Login.html';

      }

    });

  }


  // NOTIFICATION FUNCTIONALITY

  if (notificationBtn) {

    notificationBtn.addEventListener('click', () => {

      alert(
        '🔔 LifeLoop Notifications\n\n' +
        '1. Check your upcoming product expiry dates.\n' +
        '2. Complete your pending tasks.\n' +
        '3. Explore shared community resources.'
      );

    });

  }

}
