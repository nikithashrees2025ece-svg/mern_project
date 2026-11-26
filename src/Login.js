
import './style.css';

document.querySelector('#loginApp').innerHTML = `

  <div class="min-h-screen flex items-center justify-center p-5">

   <div class="bg-white shadow-xl rounded-2xl
            w-full max-w-md p-8 sm:p-10">
      <!-- Logo -->

      <div class="text-center mb-8">

        <h1 class="text-4xl font-bold text-green-800">
          Life<span class="text-green-500">Loop</span>
        </h1>

        <p class="text-gray-500 mt-2">
          Smart Living, Less Waste
        </p>

      </div>


      <!-- Heading -->

      <div class="mb-7">

        <h2 class="text-2xl font-bold text-gray-800">
          Welcome Back!
        </h2>

        <p class="text-gray-500 mt-2">
          Login to continue your journey.
        </p>

      </div>


      <!-- Login Form -->

      <form id="loginForm" class="space-y-5">

        <!-- Email -->

        <div class="mb-5">

          <label class="block text-gray-700
                        font-semibold mb-2">

            Email Address

          </label>

          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            class="w-full border border-gray-300
                   rounded-lg p-3 outline-none
                   focus:ring-2 focus:ring-green-500"
          >

        </div>


        <div class="mb-4">

  <label class="block text-gray-700 font-semibold mb-2">
    Password
  </label>

  <div class="relative">

    <input
      type="password"
      id="password"
      placeholder="Enter your password"
      required
      class="w-full border border-gray-300 rounded-lg p-3 pr-20 outline-none focus:ring-2 focus:ring-green-500"
    >

    <button
      type="button"
      id="togglePassword"
      class="absolute right-3 top-3 text-green-700 text-sm font-semibold"
    >
      Show
    </button>

  </div>

</div>


        <!-- Remember Me -->

        <div class="flex justify-between
                    items-center mb-6">

          <label class="flex items-center
                        gap-2 text-sm text-gray-600">

            <input type="checkbox">

            Remember Me

          </label>

          <a href="#"
             class="text-green-700 text-sm
                    hover:underline">

            Forgot Password?

          </a>

        </div>


        <!-- Login Button -->

        <button
          type="submit"
          class="w-full bg-green-700
                 hover:bg-green-800
                 text-white font-semibold
                 p-3 rounded-lg transition">

          Login

        </button>

      </form>


      <!-- Signup Link -->

      <p class="text-center text-gray-600
                mt-7 text-sm">

        Don't have an account?

        <a href="Signup.html"
           class="text-green-700
                  font-bold hover:underline">

          Sign Up

        </a>

      </p>

    </div>

  </div>

`;


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

  alert("Login form submitted successfully!");

});
// Show / Hide Password

const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function() {

  if (passwordInput.type === "password") {

    passwordInput.type = "text";

    togglePassword.textContent = "Hide";

  } else {

    passwordInput.type = "password";

    togglePassword.textContent = "Show";

  }

});
