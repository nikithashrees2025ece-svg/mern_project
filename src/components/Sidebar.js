
export function Sidebar() {

  return `

    <aside id="sidebar"
      class="bg-gradient-to-b from-slate-900
             via-purple-950 to-indigo-950
             text-white w-48 md:w-64
             min-h-screen p-4 md:p-5
             flex flex-col shrink-0">

      <!-- SIDEBAR HEADING -->

      <div class="mb-8">

        <p class="text-purple-300 uppercase
                  text-xs tracking-widest font-bold">
          MAIN MENU
        </p>

        <h2 class="text-xl font-extrabold mt-2 text-white">
          Workspace
        </h2>

        <div class="h-1 w-12 bg-emerald-400 rounded-full mt-3"></div>

      </div>

      
<nav class="flex flex-col gap-3">

  <button data-page="dashboard" class="sidebar-link bg-emerald-500 text-white rounded-xl px-4 py-3 text-left font-bold">
    🏠 Dashboard
  </button>

  <button data-page="expiry" class="sidebar-link text-white hover:bg-purple-700 rounded-xl px-4 py-3 text-left">
    ⏰ Expiry Tracker
  </button>

  <button data-page="sharing" class="sidebar-link text-white hover:bg-purple-700 rounded-xl px-4 py-3 text-left">
    ♻️ Resource Sharing
  </button>

  <button data-page="home" class="sidebar-link text-white hover:bg-purple-700 rounded-xl px-4 py-3 text-left">
    📦 Home
  </button>

</nav>

      <!-- BOTTOM SECTION -->

      <div class="mt-auto pt-8">

        <div class="bg-purple-800/70
                    border border-purple-500/40
                    rounded-xl p-4">

          <p class="font-bold text-emerald-300">
            🌿 Go Green!
          </p>

          <p class="text-purple-100 text-xs mt-2 leading-relaxed">
            Small actions create a better tomorrow.
          </p>

        </div>

        <p class="text-purple-300 text-xs
                  text-center mt-6">
          LifeLoop © 2026
        </p>

      </div>

    </aside>

  `;
}