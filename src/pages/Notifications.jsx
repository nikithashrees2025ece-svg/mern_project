
import { useEffect, useMemo, useState } from 'react';

// Load notifications safely from localStorage
function getSavedNotifications() {
  try {
    return JSON.parse(
      localStorage.getItem('lifeloopNotificationItems') || '[]'
    );
  } catch {
    return [];
  }
}

function Notifications() {
  const [notifications, setNotifications] = useState(
    getSavedNotifications
  );

  // Save notifications whenever they change
  useEffect(() => {
    localStorage.setItem(
      'lifeloopNotificationItems',
      JSON.stringify(notifications)
    );
  }, [notifications]);

  // Count unread notifications
  const unreadCount = useMemo(() => {
    return notifications.filter(
      (notification) => !notification.read
    ).length;
  }, [notifications]);

  // Mark all notifications as read
  function handleMarkAllRead() {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) => ({
        ...notification,
        read: true
      }))
    );
  }

  // Delete a notification
  function handleDelete(id) {
    setNotifications((previousNotifications) =>
      previousNotifications.filter(
        (notification) => String(notification.id) !== String(id)
      )
    );
  }

  // Notification icons
  const notificationIcons = {
    product: '📦',
    task: '📝',
    resource: '♻️',
    general: '🔔'
  };

  return (
    <div className="max-w-5xl mx-auto p-2 w-full">

      {/* PAGE HEADING */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-green-900">
          Notifications 🔔
        </h1>

        <p className="text-gray-500 mt-2">
          Stay updated with your LifeLoop activities.
        </p>
      </div>

      {/* SUMMARY CARD */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-2xl p-6 mb-6 shadow-lg">

        <p className="text-green-100 font-medium">
          Unread Notifications
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {unreadCount}
        </h2>

      </div>

      {/* NOTIFICATION LIST */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">

          <h2 className="text-xl font-bold text-green-900">
            All Notifications
          </h2>

          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Mark All as Read
          </button>

        </div>

        {/* NOTIFICATIONS */}
        <div className="space-y-4">

          {notifications.length === 0 ? (

            /* EMPTY STATE */
            <div className="text-center py-12">

              <div className="text-5xl mb-4">
                🔔
              </div>

              <h3 className="text-lg font-bold text-gray-700">
                No Notifications Yet
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Your important updates will appear here.
              </p>

            </div>

          ) : (

            notifications.map((notification) => (

              <div
                key={notification.id}
                className={`flex flex-col sm:flex-row items-start gap-4 p-4 rounded-xl border ${
                  notification.read
                    ? 'bg-gray-50 border-gray-100'
                    : 'bg-green-50 border-green-200'
                }`}
              >

                {/* NOTIFICATION ICON */}
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl shrink-0">
                  {notificationIcons[notification.type] || '🔔'}
                </div>

                {/* NOTIFICATION DETAILS */}
                <div className="flex-1 min-w-0">

                  <p className="font-semibold text-gray-800 break-words">
                    {notification.message}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    {notification.date
                      ? new Date(notification.date).toLocaleString()
                      : 'Date not available'}
                  </p>

                  <p className={`text-xs mt-2 ${
                    notification.read
                      ? 'text-gray-500'
                      : 'text-green-600 font-bold'
                  }`}>
                    {notification.read ? 'Read' : 'Unread'}
                  </p>

                </div>

                {/* DELETE BUTTON */}
                <button
                  type="button"
                  onClick={() => handleDelete(notification.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-semibold transition"
                >
                  🗑️ Delete
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default Notifications;
