
import './style.css';

// ======================================
// LIFELOOP SIGNUP PAGE
// ======================================

document.querySelector('#signupApp').innerHTML = `

  <div class="signup-wrapper">

    <!-- LEFT BRANDING SECTION -->

    <section class="signup-brand">

      <div class="brand-content">

        <h1 class="brand-logo">
          Life<span>Loop</span>
        </h1>

        <p class="brand-tag">
          SMART LIVING, LESS WASTE
        </p>

        <h2>
          Small Steps.
          <br>
          <span>Greener Future.</span>
        </h2>

        <p class="brand-description">
          Join our community and make a difference.
          Track expiry dates, share useful resources
          and help build a sustainable future.
        </p>

        <div class="brand-illustration">
          🌱
        </div>

        <p class="brand-footer">
          TRACK. SHARE. SUSTAIN.
        </p>

      </div>

    </section>


    <!-- RIGHT SIGNUP SECTION -->

    <section class="signup-form-section">

      <div class="signup-card">

        <div class="signup-heading">

          <span class="signup-icon">🌿</span>

          <h2>Create Your Account</h2>

          <p>
            Start your sustainable journey today!
          </p>

        </div>


        <!-- SIGNUP FORM -->

        <form id="signupForm">


          <!-- FULL NAME -->

          <div class="signup-field">

            <label for="fullName">
              Full Name
            </label>

            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              minlength="3"
              maxlength="60"
              autocomplete="name"
              pattern="[A-Za-z ]{3,60}"
              title="Enter a name using letters and spaces."
              required
            >

          </div>


          <!-- EMAIL -->

          <div class="signup-field">

            <label for="email">
              Email Address
            </label>

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              autocomplete="email"
              required
            >

          </div>


          <!-- PHONE NUMBER -->

          <div class="signup-field">

            <label for="phone">
              Phone Number
            </label>

            <input
              type="tel"
              id="phone"
              placeholder="Enter your 10-digit number"
              pattern="[0-9]{10}"
              maxlength="10"
              minlength="10"
              inputmode="numeric"
              autocomplete="tel"
              title="Enter exactly 10 digits."
              required
            >

          </div>


          <!-- PASSWORD -->

          <div class="signup-field">

            <label for="password">
              Password
            </label>

            <div class="password-box">

              <input
                type="password"
                id="password"
                placeholder="Create a password"
                minlength="8"
                maxlength="64"
                autocomplete="new-password"
                required
              >

              <button
                type="button"
                id="togglePassword"
                aria-label="Show password"
              >
                Show
              </button>

            </div>


            <!-- PASSWORD STRENGTH -->

            <div
              class="password-strength"
              id="strengthText"
              aria-live="polite"
            >

              Use at least 8 characters.

            </div>

          </div>


          <!-- CONFIRM PASSWORD -->

          <div class="signup-field">

            <label for="confirmPassword">
              Confirm Password
            </label>

            <div class="password-box">

              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                minlength="8"
                maxlength="64"
                autocomplete="new-password"
                required
              >

              <button
                type="button"
                id="toggleConfirmPassword"
                aria-label="Show confirm password"
              >
                Show
              </button>

            </div>

          </div>


          <!-- TERMS AND CONDITIONS -->

          <div class="terms-row">

            <input
              type="checkbox"
              id="terms"
              required
            >

            <label for="terms">
              I agree to the Terms and Conditions
            </label>

          </div>


          <!-- MESSAGE -->

          <p
            id="signupMessage"
            class="text-center text-sm my-3"
            role="status"
            aria-live="polite"
          >

          </p>


          <!-- SUBMIT BUTTON -->

          <button
            type="submit"
            class="signup-submit"
          >

            Create Account →

          </button>


        </form>


        <!-- LOGIN LINK -->

        <p class="signup-login">

          Already have an account?

          <a href="/Login.html">
            Login
          </a>

        </p>


      </div>

    </section>

  </div>

`;


// ======================================
// GET FORM ELEMENTS
// ======================================

const signupForm =
  document.getElementById('signupForm');

const fullName =
  document.getElementById('fullName');

const email =
  document.getElementById('email');

const phone =
  document.getElementById('phone');

const password =
  document.getElementById('password');

const confirmPassword =
  document.getElementById('confirmPassword');

const terms =
  document.getElementById('terms');

const strengthText =
  document.getElementById('strengthText');

const signupMessage =
  document.getElementById('signupMessage');


// ======================================
// SHOW / HIDE PASSWORD
// ======================================

function setupPasswordToggle(input, button) {

  button.addEventListener('click', () => {

    const isHidden = input.type === 'password';

    input.type = isHidden ? 'text' : 'password';

    button.textContent = isHidden ? 'Hide' : 'Show';

    button.setAttribute(
      'aria-label',
      isHidden ? 'Hide password' : 'Show password'
    );

  });

}

setupPasswordToggle(
  password,
  document.getElementById('togglePassword')
);

setupPasswordToggle(
  confirmPassword,
  document.getElementById('toggleConfirmPassword')
);


// ======================================
// PASSWORD STRENGTH CHECKER
// ======================================

password.addEventListener('input', () => {

  const value = password.value;

  if (value.length === 0) {

    strengthText.textContent =
      'Use at least 8 characters.';

    strengthText.style.color = '#6B7280';

  }

  else if (value.length < 8) {

    strengthText.textContent =
      'Weak - add more characters.';

    strengthText.style.color = '#DC2626';

  }

  else if (
    /[A-Z]/.test(value) &&
    /[a-z]/.test(value) &&
    /[0-9]/.test(value) &&
    /[^A-Za-z0-9]/.test(value)
  ) {

    strengthText.textContent =
      'Strong password ✓';

    strengthText.style.color = '#16A34A';

  }

  else {

    strengthText.textContent =
      'Medium - add uppercase, lowercase, number and symbol.';

    strengthText.style.color = '#D97706';

  }

});


// ======================================
// CONFIRM PASSWORD CHECK
// ======================================

confirmPassword.addEventListener('input', () => {

  if (confirmPassword.value === '') return;

  if (password.value === confirmPassword.value) {

    confirmPassword.setCustomValidity('');

  }

  else {

    confirmPassword.setCustomValidity(
      'Passwords do not match.'
    );

  }

});

password.addEventListener('input', () => {

  if (confirmPassword.value !== '') {

    confirmPassword.setCustomValidity(
      password.value === confirmPassword.value
        ? ''
        : 'Passwords do not match.'
    );

  }

});


// ======================================
// DISPLAY MESSAGE
// ======================================

function showMessage(message, type) {

  signupMessage.textContent = message;

  signupMessage.style.color =
    type === 'success' ? '#16A34A' : '#DC2626';

}


// ======================================
// PHONE NUMBER VALIDATION
// ======================================

phone.addEventListener('input', () => {

  phone.value = phone.value.replace(/\D/g, '').slice(0, 10);

});


// ======================================
// SIGNUP FORM SUBMISSION
// ======================================

signupForm.addEventListener('submit', (event) => {

  event.preventDefault();


  // GET USER DETAILS

  const nameValue = fullName.value.trim();

  const emailValue = email.value.trim().toLowerCase();

  const phoneValue = phone.value.trim();

  const passwordValue = password.value;

  const confirmValue = confirmPassword.value;


  // CHECK NAME

  if (!/^[A-Za-z ]{3,60}$/.test(nameValue)) {

    showMessage(
      'Please enter a valid full name.',
      'error'
    );

    return;

  }


  // CHECK EMAIL

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailValue)) {

    showMessage(
      'Please enter a valid email address.',
      'error'
    );

    return;

  }


  // CHECK PHONE

  if (!/^[0-9]{10}$/.test(phoneValue)) {

    showMessage(
      'Please enter a valid 10-digit phone number.',
      'error'
    );

    return;

  }


  // CHECK PASSWORD

  if (passwordValue.length < 8) {

    showMessage(
      'Password must contain at least 8 characters.',
      'error'
    );

    return;

  }


  // CHECK CONFIRM PASSWORD

  if (passwordValue !== confirmValue) {

    showMessage(
      'Passwords do not match.',
      'error'
    );

    return;

  }


  // CHECK TERMS

  if (!terms.checked) {

    showMessage(
      'Please accept the Terms and Conditions.',
      'error'
    );

    return;

  }


  // SAVE NON-SENSITIVE PROFILE INFORMATION

  const userProfile = {

    name: nameValue,

    email: emailValue,

    phone: phoneValue

  };

  localStorage.setItem(
    'lifeloopProfile',
    JSON.stringify(userProfile)
  );


  // DO NOT STORE PASSWORD IN LOCAL STORAGE.
  // REAL ACCOUNT CREATION REQUIRES BACKEND AUTHENTICATION.


  // SUCCESS MESSAGE

  showMessage(
    'Account details validated successfully! Redirecting to Login...',
    'success'
  );


  // REDIRECT TO LOGIN PAGE

  setTimeout(() => {

    window.location.href = '/Login.html';

  }, 1500);

});
