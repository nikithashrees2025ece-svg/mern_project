
import { NavLink } from 'react-router-dom';

function Sidebar({ isOpen, onNavigate }) {

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Task Manager', path: '/tasks', icon: '📝' },
    { name: 'Expiry Tracker', path: '/expiry', icon: '⏰' },
    { name: 'Resource Sharing', path: '/sharing', icon: '♻️' },
    { name: 'My Profile', path: '/profile', icon: '👤' },
    { name: 'Notifications', path: '/notifications', icon: '🔔' }
  ];

  return (
    <aside
      className={`
        fixed md:sticky top-0 left-0 z-40
        w-[22rem] max-w-[85vw] min-h-screen
        bg-gradient-to-b from-slate-900 via-green-950 to-emerald-950
        text-white p-7 flex flex-col
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
    >

      {/* SIDEBAR HEADING */}
      <div className="mb-11">

        <p className="text-sm font-extrabold tracking-widest text-emerald-300 mb-4">
          MAIN MENU
        </p>

        <h2 className="text-3xl font-extrabold text-white">
          Workspace
        </h2>

        <div className="w-16 h-1.5 bg-emerald-400 rounded-full mt-5"></div>

      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-8">

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) => `
              flex items-center gap-3
              px-6 py-5 rounded-2xl
              text-lg font-semibold
              transition-all duration-200
              ${
                isActive
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'text-white hover:bg-emerald-900 hover:text-white'
              }
            `}
          >

            <span className="text-xl">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>

          </NavLink>

        ))}

      </nav>

      {/* BOTTOM MESSAGE */}
      <div className="mt-auto bg-green-900/80 p-5 rounded-2xl">

        <h3 className="font-bold text-emerald-300 text-lg">
          🌿 Go Green!
        </h3>

        <p className="text-sm text-gray-300 mt-2 leading-relaxed">
          Small actions create a better tomorrow.
        </p>

      </div>

      <p className="text-xs text-gray-400 text-center mt-6">
        LifeLoop © 2026
      </p>

    </aside>
  );
}

export default Sidebar;
