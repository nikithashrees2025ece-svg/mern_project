
export function Navbar() {

  return `
    <header class="bg-white shadow-md px-6 py-4
                   flex items-center justify-between
                   sticky top-0 z-40">

      <!-- LOGO -->

      <div class="flex items-center gap-3">

        <span class="text-3xl">♻</span>

        <h1 class="text-2xl font-extrabold text-green-800">
          Life<span class="text-emerald-500">Loop</span>
        </h1>

      </div>

      <!-- RIGHT SIDE -->

      <div class="flex items-center gap-5">

        <!-- Notification -->

        <button
          id="notificationBtn"
          type="button"
          class="relative text-2xl hover:scale-110 transition"
          aria-label="Notifications"
        >
          🔔

          <span class="absolute -top-1 -right-1
                       bg-red-500 text-white text-xs
                       rounded-full w-4 h-4
                       flex items-center justify-center">
            3
          </span>

        </button>

        <!-- Profile -->

        <div class="flex items-center gap-3">

          <div class="w-10 h-10 rounded-full
                      bg-gradient-to-r from-green-500
                      to-emerald-400 text-white
                      flex items-center justify-center
                      font-bold text-lg">
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

        <!-- LOGOUT -->

        <button
          id="logoutBtn"
          type="button"
          class="bg-red-50 text-red-600
                 px-4 py-2 rounded-lg
                 font-semibold hover:bg-red-100
                 transition text-sm"
        >
          Logout
        </button>

      </div>

    </header>
  `;
}


// NAVBAR FUNCTIONALITY

export function initializeNavbar() {

  const logoutBtn = document.getElementById('logoutBtn');

  const notificationBtn =
    document.getElementById('notificationBtn');

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

  if (notificationBtn) {

    notificationBtn.addEventListener('click', () => {

      alert('You have 3 LifeLoop notifications!');

    });

  }

}