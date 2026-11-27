
import './style.css';

// ======================================
// USER PROFILE MODULE
// ======================================

export function UserProfile() {

    const profile = JSON.parse(
        localStorage.getItem('lifeloopProfile') || '{}'
    );

    const name = profile.name || 'LifeLoop User';
    const email = profile.email || '';
    const phone = profile.phone || '';
    const location = profile.location || '';

    return `

        <div class="p-6">

            <!-- PAGE HEADING -->

            <div class="mb-8">

                <h1 class="text-3xl font-bold text-green-900">
                    My Profile
                </h1>

                <p class="text-gray-500 mt-2">
                    Manage your personal information and settings.
                </p>

            </div>


            <!-- PROFILE CARD -->

            <div class="bg-white rounded-2xl shadow-lg p-8
                        max-w-3xl">

                <div class="flex items-center gap-5 mb-8">

                    <div class="w-20 h-20 rounded-full
                                bg-green-100 flex items-center
                                justify-center text-4xl">

                        👤

                    </div>

                    <div>

                        <h2 class="text-xl font-bold text-gray-800">
                            ${escapeHTML(name)}
                        </h2>

                        <p class="text-gray-500">
                            LifeLoop Member
                        </p>

                    </div>

                </div>


                <!-- PROFILE FORM -->

                <form id="profileForm" class="space-y-5">

                    <div>

                        <label class="block font-semibold mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            id="profileName"
                            value="${escapeHTML(name)}"
                            required
                            class="w-full border rounded-lg p-3
                                   focus:outline-none focus:ring-2
                                   focus:ring-green-500"
                        >

                    </div>


                    <div>

                        <label class="block font-semibold mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="profileEmail"
                            value="${escapeHTML(email)}"
                            required
                            class="w-full border rounded-lg p-3
                                   focus:outline-none focus:ring-2
                                   focus:ring-green-500"
                        >

                    </div>


                    <div>

                        <label class="block font-semibold mb-2">
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            id="profilePhone"
                            value="${escapeHTML(phone)}"
                            pattern="[0-9]{10}"
                            maxlength="10"
                            placeholder="Enter 10-digit phone number"
                            class="w-full border rounded-lg p-3
                                   focus:outline-none focus:ring-2
                                   focus:ring-green-500"
                        >

                    </div>


                    <div>

                        <label class="block font-semibold mb-2">
                            Location
                        </label>

                        <input
                            type="text"
                            id="profileLocation"
                            value="${escapeHTML(location)}"
                            placeholder="Enter your location"
                            class="w-full border rounded-lg p-3
                                   focus:outline-none focus:ring-2
                                   focus:ring-green-500"
                        >

                    </div>


                    <button
                        type="submit"
                        class="bg-green-600 hover:bg-green-700
                               text-white px-6 py-3 rounded-lg
                               font-semibold transition">

                        Save Profile

                    </button>

                    <p id="profileMessage"
                       class="text-green-600 font-semibold">
                    </p>

                </form>

            </div>


            <!-- SETTINGS CARD -->

            <div class="bg-white rounded-2xl shadow-lg
                        p-8 max-w-3xl mt-6">

                <h2 class="text-xl font-bold text-green-900 mb-5">
                    Account Settings ⚙️
                </h2>

                <div class="flex items-center justify-between
                            gap-4">

                    <div>

                        <h3 class="font-semibold">
                            Notifications
                        </h3>

                        <p class="text-sm text-gray-500">
                            Enable or disable notifications.
                        </p>

                    </div>

                    <input
                        type="checkbox"
                        id="notificationToggle"
                        class="w-5 h-5 accent-green-600"
                    >

                </div>

                <p id="settingsMessage"
                   class="text-sm text-green-600 mt-3">
                </p>

            </div>

        </div>

    `;
}


// ======================================
// INITIALIZE PROFILE
// ======================================

export function initializeUserProfile() {

    const form = document.getElementById('profileForm');

    if (!form) return;


    // SAVE PROFILE

    form.addEventListener('submit', function(e) {

        e.preventDefault();

        const profile = {

            name: document.getElementById('profileName').value.trim(),

            email: document.getElementById('profileEmail').value.trim(),

            phone: document.getElementById('profilePhone').value.trim(),

            location: document.getElementById('profileLocation').value.trim()

        };

        localStorage.setItem(
            'lifeloopProfile',
            JSON.stringify(profile)
        );

        document.getElementById('profileMessage').textContent =
            'Profile updated successfully!';

    });


    // NOTIFICATION SETTINGS

    const notificationToggle =
        document.getElementById('notificationToggle');

    const settingsMessage =
        document.getElementById('settingsMessage');

    notificationToggle.checked =
        localStorage.getItem('lifeloopNotifications') !== 'false';

    notificationToggle.addEventListener('change', function() {

        localStorage.setItem(
            'lifeloopNotifications',
            String(this.checked)
        );

        settingsMessage.textContent = this.checked
            ? 'Notifications enabled!'
            : 'Notifications disabled!';

    });

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
