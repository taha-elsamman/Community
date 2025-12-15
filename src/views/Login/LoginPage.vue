<template>
  <div class="login-bg">
    <div class="login-card">
      <div class="login-logo-row">
        <img src="/Projectlifetyle_Logo.webp" alt="Project Lifestyle Logo" class="login-logo-big" />
        <div class="login-content">
          <span class="login-logo-text">Project Lifestyle</span>
          <h1 class="login-title mt-4">Inloggen</h1>
          <form class="login-form">
            <div class="login-group">
              <label for="email" class="login-label">E-mail</label>
              <input id="email" type="email" class="login-input" placeholder="Voer je e-mail in" />
            </div>
            <div class="login-group">
              <label for="password" class="login-label">Wachtwoord</label>
              <input id="password" type="password" class="login-input" placeholder="Voer je wachtwoord in" />
            </div>
            <button type="submit" class="login-btn">Inloggen</button>
          </form>
          <div class="login-footer">
            <a href="#" class="login-link">Wachtwoord vergeten?</a>
            <div class="register-link-row">
              <span>Nog geen account?</span>
              <a href="/register" class="register-link">Registreren</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No logic for now
</script>

<style scoped>
.login-bg {
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  background: #ffffff;
  border-radius: 1.2rem;
  box-shadow: 0 12px 24px 0 rgba(60,60,60,0.06);
  padding: 3.5rem 2.5rem 2.5rem 2.5rem;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px #e0e0e0;
}

.login-logo-row {
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 2.5rem;
}

.login-logo-big {
  width: 500px;
  height: 500px;
  object-fit: contain;
  flex-shrink: 0;
  border-radius: 1rem;
  background: #fff;
  margin-bottom: 0;
}

.login-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.login-logo-text {
  font-family: 'Indie Flower', cursive, sans-serif;
  font-size: 1.7rem;
  color: #9bb89c;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 0.5rem;
    display: block;
  width: 100%;
  text-align: center;
}


.login-title {
  font-family: 'Indie Flower', cursive, sans-serif;
  color: #8ebc8b;
  font-size: 2rem;
  margin-bottom: 2.2rem;
  font-weight: 400;
  text-align: left;
    width: 100%;
  text-align: center;
}


.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
}

.login-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.login-label {
  font-size: 1.05rem;
  color: #757575;
  font-family: inherit;
}

.login-input {
  width: 100%;
  border: none;
  border-bottom: 2px dashed #e06ca9;
  background: transparent;
  font-size: 1.1rem;
  color: #757575;
  outline: none;
  padding: 0.3rem 0;
  border-radius: 0 0 12px 12px;
  transition: border-color 0.2s;
  font-family: inherit;
}

.login-input:focus {
  border-bottom: 2px dashed #e06ca9;
}

.login-btn {
  margin-top: 1.2rem;
  width: 100%;
  background: #e06ca9;
  border: none;
  color: #fff;
  font-size: 1.15rem;
  font-family: 'Indie Flower', cursive, sans-serif;
  cursor: pointer;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  transition: color 0.2s, background 0.2s;
  font-weight: 500;
}

.login-btn:hover {
  color: #fff;
  background: #da2c89;
  border: solid 0px #e06ca9;
}

.login-footer {
  margin-top: 1.5rem;
  text-align: center; /* Center all footer content */
  width: 100%;
}

.login-link {
  color: #e06ca9;
  font-size: 1rem;
  text-decoration: none;
  font-family: inherit;
  transition: color 0.2s;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.login-link:hover {
  text-decoration: underline;
  color: #f2c2d7;
}

.register-link-row {
  margin-top: 1.2rem;
  width: 100%;
  font-size: 1rem;
  color: #757575;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
}

.register-link {
  color: #e06ca9;
  font-size: 1rem;
  text-decoration: none;
  font-family: inherit;
  transition: color 0.2s;
}

.register-link:hover {
  text-decoration: underline;
  color: #f2c2d7;
}

@media (max-width: 900px) {
  .login-card {
    max-width: 98vw;
    padding: 2rem 1rem 1.5rem 1rem;
  }
  .login-logo-row {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .login-logo-big {
    width: 220px;
    height: 220px;
  }
}

@media (max-width: 600px) {
  .login-card {
    max-width: 100vw;
    padding: 1rem 0.5rem 1rem 0.5rem;
    border-radius: 0.7rem;
  }
  .login-logo-big {
    width: 120px;
    height: 120px;
  }
  .login-title,
  .login-logo-text {
    font-size: 1.2rem;
  }
}

@media (max-width: 400px) {
  .login-card {
    padding: 0.5rem 0.1rem 0.5rem 0.1rem;
  }
  .login-logo-big {
    width: 70px;
    height: 70px;
  }
}
</style>
