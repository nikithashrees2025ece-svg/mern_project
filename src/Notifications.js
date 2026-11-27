
import './style.css';

// ======================================
// ADD NOTIFICATION
// ======================================

export function addNotification(message, type = 'general') {

    // Check notification preference

    if (localStorage.getItem('lifeloopNotifications') === 'false') {
        return;
    }

    const notifications = JSON.parse(
        localStorage.getItem('lifeloopNotificationItems') || '[]'
    );

    const newNotification = {

        id: Date.now(),

        message,

        type,

        date: new Date().toISOString(),

        read: false

    };

    notifications.unshift(newNotification);

    // Keep latest 50 notifications

    localStorage.setItem(
        'lifeloopNotificationItems',
        JSON.stringify(notifications.slice(0, 50))
    );

}


// ======================================
// NOTIFICATION PAGE
// ======================================

export function Notifications() {

    const notifications = JSON.parse(
        localStorage.getItem('lifeloopNotificationItems') || '[]'
    );

    const unreadCount = notifications.filter(
        notification => !notification.read
    ).length;


    return `

        <div class="max-w-5xl mx-auto p-2">

            <!-- PAGE HEADING -->

            <div class="mb-8">

                <h1 class="text-3xl font-extrabold text-green-900">

                    Notifications 🔔

                </h1>

                <p class="text-gray-500 mt-2">

                    Stay updated with your LifeLoop activities.

                </p>

            </div>


            <!-- SUMMARY CARD -->

            <div class="bg-gradient-to-r from-green-600
                        to-emerald-500 text-white
                        rounded-2xl p-6 mb-6 shadow-lg">

                <p class="text-green-100 font-medium">

                    Unread Notifications

                </p>

                <h2 class="text-4xl font-bold mt-2">

                    ${unreadCount}

                </h2>

            </div>


            <!-- NOTIFICATION LIST -->

            <div class="bg-white rounded-2xl shadow-lg p-6">

                <div class="flex justify-between items-center
                            flex-wrap gap-3 mb-6">

                    <h2 class="text-xl font-bold text-green-900">

                        All Notifications

                    </h2>

                    <button
                        id="markAllRead"
                        class="bg-green-100 text-green-700
                               px-4 py-2 rounded-lg
                               hover:bg-green-200 transition">

                        Mark All as Read

                    </button>

                </div>


                <div id="notificationsList"
                     class="space-y-4">

                    ${notifications.length > 0

                        ? notifications.map(notification => {

                            const icons = {

                                product: '📦',

                                task: '📝',

                                resource: '♻️',

                                general: '🔔'

                            };

                            return `

                                <div class="flex items-start gap-4
                                            p-4 rounded-xl border
                                            ${notification.read
                                                ? 'bg-gray-50 border-gray-100'
                                                : 'bg-green-50 border-green-200'}">

                                    <div class="w-12 h-12 rounded-full
                                                bg-white flex items-center
                                                justify-center text-2xl shrink-0">

                                        ${icons[notification.type] || '🔔'}

                                    </div>


                                    <div class="flex-1 min-w-0">

                                        <p class="font-semibold text-gray-800">

                                            ${escapeHTML(notification.message)}

                                        </p>

                                        <p class="text-xs text-gray-500 mt-2">

                                            ${new Date(notification.date).toLocaleString()}

                                        </p>

                                        <p class="text-xs mt-2
                                                  ${notification.read
                                                    ? 'text-gray-500'
                                                    : 'text-green-600 font-bold'}">

                                            ${notification.read
                                                ? 'Read'
                                                : 'Unread'}

                                        </p>

                                    </div>


                                    <button
                                        data-delete-notification="${notification.id}"
                                        class="text-red-500 hover:text-red-700
                                               text-sm font-semibold">

                                        Delete

                                    </button>

                                </div>

                            `;

                        }).join('')

                        : `

                            <div class="text-center py-12">

                                <div class="text-5xl mb-4">

                                    🔔

                                </div>

                                <h3 class="text-lg font-bold text-gray-700">

                                    No Notifications Yet

                                </h3>

                                <p class="text-gray-500 text-sm mt-2">

                                    Your important updates will appear here.

                                </p>

                            </div>

                        `

                    }

                </div>

            </div>

        </div>

    `;

}


// ======================================
// INITIALIZE NOTIFICATIONS
// ======================================

export function initializeNotifications() {

    const list = document.getElementById('notificationsList');

    const markAllButton = document.getElementById('markAllRead');

    if (!list || !markAllButton) return;


    // MARK ALL AS READ

    markAllButton.addEventListener('click', function() {

        const notifications = JSON.parse(
            localStorage.getItem('lifeloopNotificationItems') || '[]'
        );

        const updatedNotifications = notifications.map(notification => ({

            ...notification,

            read: true

        }));

        localStorage.setItem(
            'lifeloopNotificationItems',
            JSON.stringify(updatedNotifications)
        );

        refreshNotifications();

    });


    // DELETE NOTIFICATION

    list.addEventListener('click', function(event) {

        const button = event.target.closest(
            '[data-delete-notification]'
        );

        if (!button) return;

        const id = Number(button.dataset.deleteNotification);

        const notifications = JSON.parse(
            localStorage.getItem('lifeloopNotificationItems') || '[]'
        );

        const updatedNotifications = notifications.filter(
            notification => notification.id !== id
        );

        localStorage.setItem(
            'lifeloopNotificationItems',
            JSON.stringify(updatedNotifications)
        );

        refreshNotifications();

    });

}


// ======================================
// REFRESH NOTIFICATION PAGE
// ======================================

function refreshNotifications() {

    const container = document.getElementById('mainContent');

    if (!container) return;

    container.innerHTML = Notifications();

    initializeNotifications();

}


// ======================================
// HTML ESCAPING
// ======================================

function escapeHTML(value) {

    return String(value ?? '').replace(/[&<>"']/g, character => ({

        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'

    })[character]);

}
