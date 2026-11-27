
// ======================================
// LIFELOOP RESPONSIVE SIDEBAR
// ======================================

export function Sidebar() {

  return `

    <aside id="sidebar"

      class="bg-gradient-to-b
             from-slate-900
             via-green-950
             to-emerald-950

             text-white

             w-16 md:w-64
             min-h-screen

             p-2 md:p-5

             flex flex-col
             shrink-0
             transition-all duration-300">


      <!-- SIDEBAR HEADING -->

      <div class="mb-8 text-center md:text-left">

        <p class="text-emerald-300 uppercase
                  text-xs tracking-widest font-bold">

          <span class="md:hidden">🌿</span>
          <span class="hidden md:inline">MAIN MENU</span>

        </p>

        <h2 class="hidden md:block text-xl font-extrabold mt-2 text-white">

          Workspace

        </h2>

        <div class="hidden md:block h-1 w-12 bg-emerald-400
                    rounded-full mt-3">
        </div>

      </div>


      <!-- NAVIGATION MENU -->

      <nav class="flex flex-col gap-3">


        <!-- DASHBOARD -->

        <button
          data-page="dashboard"
          title="Dashboard"
          aria-label="Dashboard"

          class="sidebar-link bg-emerald-500
                 text-white rounded-xl
                 px-1 md:px-4 py-3
                 text-center md:text-left
                 font-bold text-xs md:text-base
                 hover:bg-emerald-600
                 transition">

          <span>🏠</span>
          <span class="hidden md:inline">Dashboard</span>

        </button>


        <!-- TASK MANAGER -->

        <button
          data-page="tasks"
          title="Task Manager"
          aria-label="Task Manager"

          class="sidebar-link text-white
                 hover:bg-emerald-700
                 rounded-xl px-1 md:px-4 py-3
                 text-center md:text-left
                 text-xs md:text-base transition">

          <span>📝</span>
          <span class="hidden md:inline">Task Manager</span>

        </button>


        <!-- EXPIRY TRACKER -->

        <button
          data-page="expiry"
          title="Expiry Tracker"
          aria-label="Expiry Tracker"

          class="sidebar-link text-white
                 hover:bg-emerald-700
                 rounded-xl px-1 md:px-4 py-3
                 text-center md:text-left
                 text-xs md:text-base transition">

          <span>⏰</span>
          <span class="hidden md:inline">Expiry Tracker</span>

        </button>


        <!-- RESOURCE SHARING -->

        <button
          data-page="sharing"
          title="Resource Sharing"
          aria-label="Resource Sharing"

          class="sidebar-link text-white
                 hover:bg-emerald-700
                 rounded-xl px-1 md:px-4 py-3
                 text-center md:text-left
                 text-xs md:text-base transition">

          <span>♻️</span>
          <span class="hidden md:inline">Resource Sharing</span>

        </button>


        <!-- MY PROFILE -->

        <button
          data-page="profile"
          title="My Profile"
          aria-label="My Profile"

          class="sidebar-link text-white
                 hover:bg-emerald-700
                 rounded-xl px-1 md:px-4 py-3
                 text-center md:text-left
                 text-xs md:text-base transition">

          <span>👤</span>
          <span class="hidden md:inline">My Profile</span>

        </button>


        <!-- NOTIFICATIONS -->

        <button
          data-page="notifications"
          title="Notifications"
          aria-label="Notifications"

          class="sidebar-link text-white
                 hover:bg-emerald-700
                 rounded-xl px-1 md:px-4 py-3
                 text-center md:text-left
                 text-xs md:text-base transition">

          <span>🔔</span>
          <span class="hidden md:inline">Notifications</span>

        </button>


        <!-- HOME -->

        <button
          data-page="home"
          title="Home"
          aria-label="Home"

          class="sidebar-link text-white
                 hover:bg-emerald-700
                 rounded-xl px-1 md:px-4 py-3
                 text-center md:text-left
                 text-xs md:text-base transition">

          <span>📦</span>
          <span class="hidden md:inline">Home</span>

        </button>


      </nav>


      <!-- BOTTOM SECTION -->

      <div class="hidden md:block mt-auto pt-8">


        <!-- GREEN MESSAGE CARD -->

        <div class="bg-emerald-800/70
                    border border-emerald-500/40
                    rounded-xl p-4">

          <p class="font-bold text-emerald-300">

            🌿 Go Green!

          </p>

          <p class="text-emerald-50 text-xs
                    mt-2 leading-relaxed">

            Small actions create a better tomorrow.

          </p>

        </div>


        <!-- COPYRIGHT -->

        <p class="text-emerald-300 text-xs
                  text-center mt-6">

          LifeLoop © 2026

        </p>


      </div>

    </aside>

  `;

}
