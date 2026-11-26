
import './style.css';

document.querySelector('#signupApp').innerHTML = `

  <div class="signup-page">

    <div class="signup-card">

      <!-- Logo -->

      <div class="text-center mb-7">

        <h1 class="text-4xl font-bold text-green-800">
          Life<span class="text-green-500">Loop</span>
        </h1>

        <p class="text-gray-500 mt-2">
          Smart Living, Less Waste
        </p>

      </div>

      <!-- Heading -->

      <div class="mb-6">

        <h2 class="text-2xl font-bold text-gray-800">
          Create Your Account
        </h2>

        <p class="text-gray-500 mt-2">
          Join LifeLoop and make a difference!
        </p>

      </div>

      <!-- Signup Form -->

      <form id="signupForm" class="space-y-4">

        <!-- Full Name -->

        <div>
          <label class="block text-gray-700 font-semibold mb-2">
            Full Name
          </label>

          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            required
            class="w-full border border-gray-300 rounded-lg p-3
                   outline-none focus:ring-2 focus:ring-green-500"
          >
        </div>

        <!-- Email -->

        <div>
          <label class="block text-gray-700 font-semibold mb-2">
            Email Address
          </label>

          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            class="w-full border border-gray-300 rounded-lg p-3
                   outline-none focus:ring-2 focus:ring-green-500"
          >
        </div>

        <!-- Phone -->

        <div>
          <label class="block text-gray-700 font-semibold mb-2">
            Phone Number
          </label>

          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            required
            class="w-full border border-gray-300 rounded-lg p-3
                   outline-none focus:ring-2 focus:ring-green-500"
          >
        </div>

        <!-- Password -->

        <div>
          <label class="block text-gray-700 font-semibold mb-2">
            Password
          </label>

          <input
            type="password"
            id="password"
            placeholder="Create a password"
            minlength="6"
            required
            class="w-full border border-gray-300 rounded-lg p-3
                   outline-none focus:ring-2 focus:ring-green-500"
          >
        </div>

        <!-- Confirm Password -->

        <div>
          <label class="block text-gray-700 font-semibold mb-2">
            Confirm Password
          </label>

          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            minlength="6"
            required
            class="w-full border border-gray-300 rounded-lg p-3
                   outline-none focus:ring-2 focus:ring-green-500"
          >
        </div>

        <!-- Terms -->

        <div class="flex items-center gap-2 text-sm text-gray-600">

          <input type="checkbox" id="terms" required>

          <label for="terms">
            I agree to the Terms and Conditions
          </label>

        </div>

        <!-- Button -->

        <button
          type="submit"
          class="w-full bg-green-700 hover:bg-green-800
                 text-white font-semibold p-3 rounded-lg transition"
        >
          Create Account
        </button>

      </form>

      <!-- Login Link -->

      <p class="text-center text-gray-600 mt-6 text-sm">

        Already have an account?

        <a href="Login.html"
           class="text-green-700 font-bold hover:underline">
          Login
        </a>

      </p>

    </div>

  </div>

`;

// Signup Form Functionality

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(event) {

  event.preventDefault();

  const password = document.getElementById("password").value;

  const confirmPassword =
    document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {

    alert("Passwords do not match!");

    return;

  }

  alert("Registration form submitted successfully!");

});
