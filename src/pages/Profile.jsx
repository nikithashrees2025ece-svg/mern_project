
import { useEffect, useState } from 'react';

function getSavedProfile() {
  try {
    return JSON.parse(
      localStorage.getItem('lifeloopProfile') || '{}'
    );
  } catch {
    return {};
  }
}

function Profile() {
  const [profile, setProfile] = useState(getSavedProfile);

  const [notificationsEnabled, setNotificationsEnabled] = useState(
    () => localStorage.getItem('lifeloopNotifications') !== 'false'
  );

  const [profileMessage, setProfileMessage] = useState('');
  const [settingsMessage, setSettingsMessage] = useState('');

  // Update profile fields
  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value
    }));

    setProfileMessage('');
  }

  // Save profile
  function handleSubmit(event) {
    event.preventDefault();

    const updatedProfile = {
      name: (profile.name || '').trim(),
      email: (profile.email || '').trim(),
      phone: (profile.phone || '').trim(),
      location: (profile.location || '').trim()
    };

    localStorage.setItem(
      'lifeloopProfile',
      JSON.stringify(updatedProfile)
    );

    setProfile(updatedProfile);
    setProfileMessage('Profile updated successfully!');
  }

  // Update notification setting
  function handleNotificationChange(event) {
    const enabled = event.target.checked;

    setNotificationsEnabled(enabled);

    localStorage.setItem(
      'lifeloopNotifications',
      String(enabled)
    );

    setSettingsMessage(
      enabled
        ? 'Notifications enabled!'
        : 'Notifications disabled!'
    );
  }

  return (
    <div className="p-4 md:p-6">

      {/* PAGE HEADING */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-900">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your personal information and settings.
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 max-w-3xl">

        {/* PROFILE HEADER */}
        <div className="flex items-center gap-5 mb-8">

          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl shrink-0">
            👤
          </div>

          <div className="min-w-0">
            <h2 className="text-xl font-bold text-gray-800 break-words">
              {profile.name || 'LifeLoop User'}
            </h2>

            <p className="text-gray-500">
              LifeLoop Member
            </p>
          </div>

        </div>

        {/* PROFILE FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* FULL NAME */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={profile.name || ''}
              onChange={handleChange}
              maxLength="100"
              required
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={profile.email || ''}
              onChange={handleChange}
              maxLength="150"
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={profile.phone || ''}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength="10"
              placeholder="Enter 10-digit phone number"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={profile.location || ''}
              onChange={handleChange}
              maxLength="150"
              placeholder="Enter your location"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* SAVE BUTTON */}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Save Profile
          </button>

          {/* SUCCESS MESSAGE */}
          {profileMessage && (
            <p className="text-green-600 font-semibold">
              {profileMessage}
            </p>
          )}

        </form>
      </div>

      {/* ACCOUNT SETTINGS */}
      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 max-w-3xl mt-6">

        <h2 className="text-xl font-bold text-green-900 mb-5">
          Account Settings ⚙️
        </h2>

        <div className="flex items-center justify-between gap-4">

          <div>
            <h3 className="font-semibold text-gray-800">
              Notifications
            </h3>

            <p className="text-sm text-gray-500">
              Enable or disable notifications.
            </p>
          </div>

          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleNotificationChange}
            className="w-5 h-5 accent-green-600 cursor-pointer shrink-0"
            aria-label="Enable notifications"
          />

        </div>

        {settingsMessage && (
          <p className="text-sm text-green-600 mt-3">
            {settingsMessage}
          </p>
        )}

      </div>

    </div>
  );
}

export default Profile;
