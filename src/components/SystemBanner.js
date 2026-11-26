
export function SystemBanner() {

  const appName = import.meta.env.VITE_APP_NAME || 'LifeLoop';

  const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0';

  const environment = import.meta.env.VITE_APP_ENV || 'development';

  return `
    <div id="systemBanner"
         class="bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600
                text-white px-5 py-3 rounded-xl shadow-md mb-6">

      <div class="flex flex-wrap items-center justify-between gap-3">

        <div class="flex items-center gap-3">

          <span class="text-2xl">🌱</span>

          <div>
            <h3 class="font-bold text-sm sm:text-base">
              ${appName} System Status
            </h3>

            <p class="text-xs text-green-100">
              Version ${appVersion} | ${environment} environment
            </p>
          </div>

        </div>

        <div class="flex items-center gap-2">

          <span class="w-2 h-2 bg-green-300 rounded-full"></span>

          <span class="text-sm font-semibold">
            System Operational
          </span>

          <button
            id="closeBanner"
            type="button"
            class="ml-3 text-white hover:text-green-200 text-xl"
            aria-label="Close banner"
          >
            &times;
          </button>

        </div>

      </div>

      <div class="mt-2 text-xs text-green-100">
        ♻ Keep track of your products and help reduce waste!
      </div>

    </div>
  `;
}

export function initializeSystemBanner() {

  const closeButton = document.getElementById('closeBanner');

  const banner = document.getElementById('systemBanner');

  if (closeButton && banner) {

    closeButton.addEventListener('click', () => {

      banner.remove();

    });

  }

}