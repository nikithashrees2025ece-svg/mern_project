
import './style.css';

// ==========================================
// LOGIN PAGE DESIGN
// ==========================================

document.querySelector('#loginApp').innerHTML = `

  <div class="min-h-screen flex items-center justify-center p-5
              bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100">

    <div class="bg-white shadow-2xl rounded-3xl w-full max-w-md
                p-8 sm:p-10 border border-green-100">

      <!-- LOGO -->

      <div class="text-center mb-8">

        <h1 class="text-4xl font-extrabold text-green-800">
          Life<span class="text-emerald-500">Loop</span> ♻
        </h1>

        <p class="text-gray-500 mt-2">
          Smart Living, Less Waste
        </p>

      </div>

      <!-- HEADING -->

      <div class="mb-7 text-center">

        <h2 class="text-3xl font-bold text-gray-800">
          Welcome Back!
        </h2>

        <p class="text-gray-500 mt-2">
          Login to continue your sustainable journey.
        </p>

      </div>

      <!-- LOGIN FORM -->

      <form id="loginForm" class="space-y-5">

        <!-- EMAIL -->

        <div>

          <label class="block text-gray-700 font-semibold mb-2">
            Email Address
          </label>

          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            class="w-full border border-gray-300 rounded-xl p-3
                   outline-none focus:ring-2 focus:ring-emerald-500
                   focus:border-emerald-500"
          >

        </div>

        <!-- PASSWORD -->

        <div>

          <label class="block text-gray-700 font-semibold mb-2">
            Password
          </label>

          <div class="relative">

            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              class="w-full border border-gray-300 rounded-xl
                     p-3 pr-20 outline-none
                     focus:ring-2 focus:ring-emerald-500"
            >

            <button
              type="button"
              id="togglePassword"
              class="absolute right-3 top-3
                     text-emerald-700 font-semibold text-sm"
            >
              Show
            </button>

          </div>

        </div>

        <!-- REMEMBER ME AND FORGOT PASSWORD -->

        <div class="flex justify-between items-center text-sm">

          <label class="flex items-center gap-2 text-gray-600">

            <input
              type="checkbox"
              id="rememberMe"
              class="accent-green-600"
            >

            Remember Me

          </label>

          <a
            href="#"
            id="forgotPassword"
            class="text-emerald-700 font-semibold hover:underline"
          >
            Forgot Password?
          </a>

        </div>

        <!-- LOGIN BUTTON -->

        <button
          type="submit"
          class="w-full bg-gradient-to-r from-green-600 to-emerald-500
                 hover:from-green-700 hover:to-emerald-600
                 text-white font-bold p-3 rounded-xl shadow-lg
                 transition duration-300"
        >
          Login →
        </button>

      </form>

      <!-- SIGNUP LINK -->

      <p class="text-center text-gray-600 mt-7 text-sm">

        Don't have an account?

        <a
          href="/Signup.html"
          class="text-emerald-700 font-bold hover:underline"
        >
          Sign Up
        </a>

      </p>

      <!-- FOOTER -->

      <p class="text-center text-xs text-gray-400 mt-6">
        Together for a greener tomorrow 🌱
      </p>

    </div>

  </div>

`;


// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

const passwordInput = document.getElementById('password');

const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', function() {

  if (passwordInput.type === 'password') {

    passwordInput.type = 'text';

    togglePassword.textContent = 'Hide';

  } else {

    passwordInput.type = 'password';

    togglePassword.textContent = 'Show';

  }

});


// ==========================================
// FORGOT PASSWORD
// ==========================================

document.getElementById('forgotPassword')
  .addEventListener('click', function(event) {

    event.preventDefault();

    alert('Password recovery will be available soon!');

  });


// ==========================================
// LOGIN FORM VALIDATION
// ==========================================


// Login Form Functionality

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email.trim() === "" || password.trim() === "") {
    alert("Please enter your email and password.");
    return;
  }

  // Save login information
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", email);

  // Navigate to Dashboard
  window.location.href = "/Dashboard.html";

});
