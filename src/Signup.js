
import './style.css';

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

        <div class="brand-illustration">🌱</div>

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


        <form id="signupForm">

          <div class="signup-field">
            <label>Full Name</label>

            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              required
            >
          </div>


          <div class="signup-field">
            <label>Email Address</label>

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            >
          </div>


          <div class="signup-field">
            <label>Phone Number</label>

            <input
              type="tel"
              id="phone"
              placeholder="Enter your 10-digit number"
              pattern="[0-9]{10}"
              required
            >
          </div>


          <div class="signup-field">
            <label>Password</label>

            <div class="password-box">

              <input
                type="password"
                id="password"
                placeholder="Create a password"
                minlength="8"
                required
              >

              <button
                type="button"
                id="togglePassword"
              >
                Show
              </button>

            </div>

            <div
              class="password-strength"
              id="strengthText"
            >
              Use at least 8 characters.
            </div>

          </div>


          <div class="signup-field">
            <label>Confirm Password</label>

            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              required
            >
          </div>


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


          <button
            type="submit"
            class="signup-submit"
          >
            Create Account →
          </button>

        </form>


        <p class="signup-login">
          Already have an account?

          <a href="Login.html">
            Login
          </a>
        </p>

      </div>

    </section>

  </div>

`;


// SHOW / HIDE PASSWORD

const password = document.getElementById('password');

const togglePassword =
  document.getElementById('togglePassword');

togglePassword.addEventListener('click', () => {

  const hidden = password.type === 'password';

  password.type = hidden ? 'text' : 'password';

  togglePassword.textContent = hidden ? 'Hide' : 'Show';

});


// PASSWORD STRENGTH

const strengthText =
  document.getElementById('strengthText');

password.addEventListener('input', () => {

  const value = password.value;

  if (value.length === 0) {

    strengthText.textContent =
      'Use at least 8 characters.';

  } else if (value.length < 8) {

    strengthText.textContent =
      'Weak - add more characters.';

  } else if (
    /[A-Z]/.test(value) &&
    /[0-9]/.test(value) &&
    /[^A-Za-z0-9]/.test(value)
  ) {

    strengthText.textContent =
      'Strong password ✓';

  } else {

    strengthText.textContent =
      'Medium - add uppercase, number and symbol.';

  }

});


// SIGNUP FORM VALIDATION

const signupForm =
  document.getElementById('signupForm');

signupForm.addEventListener('submit', (event) => {

  event.preventDefault();

  const confirmPassword =
    document.getElementById('confirmPassword').value;

  if (password.value !== confirmPassword) {

    alert('Passwords do not match!');

    return;

  }

  alert('Signup form validated successfully!');

});
