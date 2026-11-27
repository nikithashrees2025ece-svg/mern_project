
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();

  function handleLogout() {
    const confirmLogout = window.confirm(
      'Are you sure you want to logout?'
    );

    if (confirmLogout) {
      window.location.href = '/Login.html';
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md px-4 md:px-8 py-4 flex items-center justify-between">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-2xl text-green-800"
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* LOGO */}
        <Link to="/dashboard" className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
            ♻️
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-green-800">
              LifeLoop
            </h1>

            <p className="hidden sm:block text-sm text-gray-500">
              Smart Living, Less Waste
            </p>
          </div>

        </Link>

      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3 md:gap-7">

        {/* NOTIFICATIONS */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-2xl hover:bg-green-100 transition"
          title="Notifications"
        >
          🔔

          <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-red-500 text-white text-sm font-bold flex items-center justify-center">
            3
          </span>
        </button>

        {/* USER PROFILE */}
        <Link to="/profile" className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xl font-bold">
            U
          </div>

          <div className="hidden sm:block">
            <p className="font-bold text-gray-800">
              User
            </p>

            <p className="text-sm text-gray-500">
              LifeLoop Member
            </p>
          </div>

        </Link>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-50 hover:bg-red-100 text-red-600 px-4 md:px-7 py-3 rounded-xl font-bold transition"
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;
