
import './style.css';

// ======================================
// ACTIVITY STORAGE
// ======================================

export function addActivity(message, type = 'general') {

  const activities = JSON.parse(
    localStorage.getItem('lifeloopActivities') || '[]'
  );

  activities.unshift({

    id: Date.now(),

    message,

    type,

    date: new Date().toISOString()

  });

  // Keep only latest 30 activities

  localStorage.setItem(
    'lifeloopActivities',
    JSON.stringify(activities.slice(0, 30))
  );

}


// ======================================
// DISPLAY RECENT ACTIVITY
// ======================================

export function RecentActivity() {

  const activities = JSON.parse(
    localStorage.getItem('lifeloopActivities') || '[]'
  );

  if (activities.length === 0) {

    return `

      <div class="text-center py-10 text-gray-500">

        <div class="text-5xl mb-3">📋</div>

        <p class="font-semibold">
          No recent activity yet!
        </p>

        <p class="text-sm mt-2">
          Your actions will appear here.
        </p>

      </div>

    `;

  }


  return `

    <div class="space-y-4">

      ${activities.map(activity => {

        const icons = {

          product: '📦',

          resource: '♻️',

          task: '✅',

          general: '🔔'

        };

        const date = new Date(activity.date);

        const formattedDate = date.toLocaleString();

        return `

          <div class="flex items-start gap-4
                      border-b border-gray-100
                      pb-4">

            <div class="w-11 h-11 rounded-full
                        bg-green-100 flex
                        items-center justify-center
                        text-xl shrink-0">

              ${icons[activity.type] || '🔔'}

            </div>

            <div class="flex-1 min-w-0">

              <p class="font-semibold text-gray-800">
                ${escapeHTML(activity.message)}
              </p>

              <p class="text-xs text-gray-500 mt-1">
                ${formattedDate}
              </p>

            </div>

          </div>

        `;

      }).join('')}

    </div>

  `;

}


// ======================================
// HTML ESCAPING
// ======================================

function escapeHTML(value) {

  return String(value).replace(/[&<>"']/g, char => ({

    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'

  })[char]);

}
