
import { useNavigate } from 'react-router-dom';
import { RecentActivity } from '../Activity.js';

// ======================================
// LIFELOOP DASHBOARD
// ======================================

function Dashboard() {

  const navigate = useNavigate();

  // Read saved data safely
  function getSavedData(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch {
      return [];
    }
  }

  const products = getSavedData('lifeloopProducts');
  const resources = getSavedData('lifeloopResources');
  const tasks = getSavedData('lifeloopTasks');

  // ======================================
  // TASK STATISTICS
  // ======================================

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    task => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  // ======================================
  // EXPIRY STATISTICS
  // ======================================

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiredProducts = products.filter(product => {
    if (!product.expiryDate) return false;

    const expiry = new Date(product.expiryDate + 'T00:00:00');

    return !isNaN(expiry.getTime()) && expiry < today;
  }).length;

  const expiringSoon = products.filter(product => {
    if (!product.expiryDate) return false;

    const expiry = new Date(product.expiryDate + 'T00:00:00');

    if (isNaN(expiry.getTime())) return false;

    const days = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    return days >= 0 && days <= 7;
  }).length;

  // ======================================
  // TASK COMPLETION
  // ======================================

  const completionRate = totalTasks > 0
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  // ======================================
  // STATISTICS
  // ======================================

  const statistics = [
    {
      title: 'Total Products',
      value: products.length,
      description: 'Products being tracked',
      icon: '📦',
      color: 'border-green-500',
      text: 'text-green-700'
    },
    {
      title: 'Expiring Soon',
      value: expiringSoon,
      description: 'Products expiring soon',
      icon: '⏰',
      color: 'border-orange-500',
      text: 'text-orange-600'
    },
    {
      title: 'Expired Products',
      value: expiredProducts,
      description: 'Products past expiry',
      icon: '⚠️',
      color: 'border-red-500',
      text: 'text-red-600'
    },
    {
      title: 'Shared Resources',
      value: resources.length,
      description: 'Resources shared',
      icon: '🤝',
      color: 'border-purple-500',
      text: 'text-purple-700'
    }
  ];

  // ======================================
  // DASHBOARD UI
  // ======================================

  return (

    <div className="w-full max-w-none mx-auto">

      {/* SYSTEM STATUS BANNER */}

      <div className="bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600
                      text-white rounded-2xl shadow-lg
                      p-6 md:p-7 mb-9">

        <div className="flex flex-wrap justify-between items-center gap-5">

          <div className="flex items-center gap-5">

            <span className="text-4xl">
              🌱
            </span>

            <div>

              <h2 className="text-xl font-extrabold">
                LifeLoop System Status
              </h2>

              <p className="text-sm md:text-base mt-1">
                Version 1.0.0 | development environment
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3 font-bold text-base">

            <span className="w-3 h-3 bg-green-300 rounded-full"></span>

            System Operational

            <span className="ml-3 text-xl">✓</span>

          </div>

        </div>

        <p className="mt-4 text-sm md:text-base">
          ♻️ Keep track of your products and help reduce waste!
        </p>

      </div>

      {/* WELCOME SECTION */}

      <div className="mb-10">

        <h1 className="text-3xl md:text-4xl lg:text-5xl
                       font-extrabold text-green-900">

          Welcome to LifeLoop! 🌱

        </h1>

        <p className="text-gray-600 mt-3 text-base md:text-xl">

          Manage your products, track expiry dates and share
          resources with your community.

        </p>

      </div>

      {/* PRODUCT AND RESOURCE STATISTICS */}

      <div className="grid grid-cols-1 sm:grid-cols-2
                      xl:grid-cols-4 gap-6 lg:gap-8 mb-12">

        {statistics.map(item => (

          <div
            key={item.title}
            className={`bg-white rounded-3xl shadow-lg
                        p-7 md:p-8 min-h-64
                        border-l-[6px] ${item.color}
                        hover:-translate-y-1
                        transition duration-200`}
          >

            <div className="flex justify-between items-center gap-3">

              <div>

                <p className="text-gray-500 text-lg font-medium">
                  {item.title}
                </p>

                <h2 className={`text-5xl font-extrabold mt-5 ${item.text}`}>
                  {item.value}
                </h2>

                <p className="text-gray-500 text-base mt-3">
                  {item.description}
                </p>

              </div>

              <span className="text-4xl md:text-5xl">
                {item.icon}
              </span>

            </div>

          </div>

        ))}

      </div>

      {/* TASK STATISTICS */}

      <div className="grid grid-cols-1 sm:grid-cols-2
                      xl:grid-cols-3 gap-6 lg:gap-8 mb-12">

        <div className="bg-white rounded-2xl shadow-md
                        border-l-[6px] border-blue-500 p-7">

          <p className="text-gray-500 text-lg">
            Total Tasks
          </p>

          <h2 className="text-4xl font-extrabold text-blue-700 mt-4">
            {totalTasks}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-md
                        border-l-[6px] border-green-500 p-7">

          <p className="text-gray-500 text-lg">
            Completed Tasks
          </p>

          <h2 className="text-4xl font-extrabold text-green-700 mt-4">
            {completedTasks}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-md
                        border-l-[6px] border-orange-500 p-7">

          <p className="text-gray-500 text-lg">
            Pending Tasks
          </p>

          <h2 className="text-4xl font-extrabold text-orange-600 mt-4">
            {pendingTasks}
          </h2>

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="bg-white rounded-3xl shadow-lg
                      p-6 md:p-8 mb-10">

        <h2 className="text-2xl font-extrabold text-green-900 mb-7">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2
                        xl:grid-cols-3 gap-6">

          <button
            onClick={() => navigate('/expiry')}
            className="p-6 rounded-2xl bg-green-50
                       hover:bg-green-100 text-left
                       transition hover:-translate-y-1"
          >

            <span className="text-4xl">⏰</span>

            <h3 className="font-bold text-green-800 mt-4 text-lg">
              Track Expiry
            </h3>

            <p className="text-gray-600 mt-2">
              Add and manage your products.
            </p>

          </button>

          <button
            onClick={() => navigate('/sharing')}
            className="p-6 rounded-2xl bg-emerald-50
                       hover:bg-emerald-100 text-left
                       transition hover:-translate-y-1"
          >

            <span className="text-4xl">♻️</span>

            <h3 className="font-bold text-green-800 mt-4 text-lg">
              Share Resources
            </h3>

            <p className="text-gray-600 mt-2">
              Share resources with your community.
            </p>

          </button>

          <button
            onClick={() => navigate('/tasks')}
            className="p-6 rounded-2xl bg-blue-50
                       hover:bg-blue-100 text-left
                       transition hover:-translate-y-1"
          >

            <span className="text-4xl">📝</span>

            <h3 className="font-bold text-blue-800 mt-4 text-lg">
              Manage Tasks
            </h3>

            <p className="text-gray-600 mt-2">
              Create and complete your daily tasks.
            </p>

          </button>

        </div>

      </div>

      {/* RECENT ACTIVITY */}

      <div className="bg-white rounded-3xl shadow-lg
                      p-6 md:p-8 mb-10 overflow-hidden">

        <h2 className="text-2xl font-extrabold text-green-800 mb-6">
          Recent Activity 📋
        </h2>

        <div
          className="w-full overflow-x-auto"
          dangerouslySetInnerHTML={{
            __html: RecentActivity()
          }}
        />

      </div>

      {/* TASK PROGRESS */}

      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">

        <h2 className="text-2xl font-extrabold text-green-900 mb-6">
          Task Progress
        </h2>

        <div className="flex justify-between items-center mb-3">

          <span className="text-gray-600">
            Completion Rate
          </span>

          <span className="font-bold text-green-700 text-lg">
            {completionRate}%
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

          <div
            className="bg-gradient-to-r from-green-500 to-emerald-500
                       h-4 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />

        </div>

        <p className="text-gray-500 mt-4">
          Keep completing your tasks to make LifeLoop more sustainable!
        </p>

      </div>

    </div>

  );
}

export default Dashboard;
