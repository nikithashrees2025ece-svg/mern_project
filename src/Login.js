
import './style.css';

// ======================================
// LIFELOOP LOGIN PAGE
// ======================================

document.querySelector('#loginApp').innerHTML = `

  <div class="min-h-screen flex items-center justify-center
              p-5 bg-gradient-to-br from-green-100
              via-emerald-50 to-teal-100">

    <div class="bg-white shadow-2xl rounded-3xl
                w-full max-w-md p-8 sm:p-10
                border border-green-100">


      <!-- LOGO -->

      <div class="text-center mb-8">

        <div class="text-5xl mb-3">
          ♻️
        </div>

        <h1 class="text-4xl font-extrabold text-green-800">

          Life<span class="text-emerald-500">Loop</span>

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

          <label for="email"
                 class="block text-gray-700
                        font-semibold mb-2">

            Email Address

          </label>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            autocomplete="email"
            required

            class="w-full border border-gray-300
                   rounded-xl p-3 outline-none
                   focus:ring-2 focus:ring-emerald-500
                   focus:border-emerald-500
                   transition"
          >

        </div>


        <!-- PASSWORD -->

        <div>

          <label for="password"
                 class="block text-gray-700
                        font-semibold mb-2">

            Password

          </label>


          <div class="relative">

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              autocomplete="current-password"
              minlength="8"
              required

              class="w-full border border-gray-300
                     rounded-xl p-3 pr-20 outline-none
                     focus:ring-2 focus:ring-emerald-500
                     focus:border-emerald-500
                     transition"
            >


            <button
              type="button"
              id="togglePassword"

              class="absolute right-3 top-3
                     text-emerald-700 font-semibold
                     text-sm hover:text-green-900">

              Show

            </button>

          </div>

        </div>


        <!-- REMEMBER ME -->

        <div class="flex justify-between
                    items-center text-sm">

          <label class="flex items-center
                        gap-2 text-gray-600">

            <input
              type="checkbox"
              id="rememberMe"
              class="accent-green-600 w-4 h-4"
            >

            Remember Me

          </label>


          <button
            type="button"
            id="forgotPassword"

            class="text-emerald-700
                   font-semibold hover:underline">

            Forgot Password?

          </button>

        </div>


        <!-- ERROR / SUCCESS MESSAGE -->

        <p id="loginMessage"
           class="text-sm text-center hidden"
           role="status"
           aria-live="polite">

        </p>


        <!-- LOGIN BUTTON -->

        <button
          type="submit"

          class="w-full bg-gradient-to-r
                 from-green-600 to-emerald-500
                 hover:from-green-700
                 hover:to-emerald-600
                 text-white font-bold p-3
                 rounded-xl shadow-lg
                 transition duration-300
                 hover:-translate-y-1">

          Login →

        </button>


      </form>


      <!-- SIGNUP LINK -->

      <p class="text-center text-gray-600
                mt-7 text-sm">

        Don't have an account?

        <a
          href="/Signup.html"
          class="text-emerald-700
                 font-bold hover:underline">

          Sign Up

        </a>

      </p>


      <!-- FOOTER -->

      <p class="text-center text-xs
                text-gray-400 mt-6">

        Together for a greener tomorrow 🌱

      </p>


    </div>

  </div>

`;


// ======================================
// GET ELEMENTS
// ======================================

const loginForm =
  document.getElementById('loginForm');

const emailInput =
  document.getElementById('email');

const passwordInput =
  document.getElementById('password');

const togglePassword =
  document.getElementById('togglePassword');

const rememberMe =
  document.getElementById('rememberMe');

const loginMessage =
  document.getElementById('loginMessage');


// ======================================
// REMEMBER PREVIOUS EMAIL
// ======================================

const savedEmail =
  localStorage.getItem('rememberedEmail');

if (savedEmail) {

  emailInput.value = savedEmail;

  rememberMe.checked = true;

}


// ======================================
// SHOW / HIDE PASSWORD
// ======================================

togglePassword.addEventListener('click', function() {

  if (passwordInput.type === 'password') {

    passwordInput.type = 'text';

    togglePassword.textContent = 'Hide';

  } else {

    passwordInput.type = 'password';

    togglePassword.textContent = 'Show';

  }

});


// ======================================
// FORGOT PASSWORD
// ======================================

document.getElementById('forgotPassword')
  .addEventListener('click', function() {

    alert(
      'Password recovery feature will be available soon!'
    );

  });


// ======================================
// LOGIN MESSAGE FUNCTION
// ======================================

function showMessage(message, type) {

  loginMessage.textContent = message;

  loginMessage.classList.remove(
    'hidden',
    'text-red-600',
    'text-green-600'
  );

  loginMessage.classList.add(
    type === 'success'
      ? 'text-green-600'
      : 'text-red-600'
  );

}


// ======================================
// LOGIN FORM VALIDATION
// ======================================

loginForm.addEventListener('submit', function(event) {

  event.preventDefault();

  const email = emailInput.value.trim();

  const password = passwordInput.value;


  // CHECK EMPTY FIELDS

  if (email === '' || password.trim() === '') {

    showMessage(
      'Please enter your email and password.',
      'error'
    );

    return;

  }


  // CHECK EMAIL FORMAT

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {

    showMessage(
      'Please enter a valid email address.',
      'error'
    );

    return;

  }


  // CHECK PASSWORD LENGTH

  if (password.length < 8) {

    showMessage(
      'Password must contain at least 8 characters.',
      'error'
    );

    return;

  }


  // REMEMBER EMAIL

  if (rememberMe.checked) {

    localStorage.setItem(
      'rememberedEmail',
      email
    );

  } else {

    localStorage.removeItem('rememberedEmail');

  }


  // SAVE FRONTEND LOGIN STATUS

  localStorage.setItem('isLoggedIn', 'true');

  localStorage.setItem('userEmail', email);


  // DISPLAY SUCCESS MESSAGE

  showMessage(
    'Login successful! Redirecting to Dashboard...',
    'success'
  );


  // REDIRECT TO DASHBOARD

  setTimeout(() => {

    window.location.href = '/Dashboard.html';

  }, 1000);

});
